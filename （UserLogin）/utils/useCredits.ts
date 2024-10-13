import { db } from "@/db";
import { credits, creditsUsage, userCreditsAllocation } from "@/db/schema";
import { eq, gte, gt, and } from "drizzle-orm";

export async function useCredits(userId: string, creditsToUse: number) {
  const now = new Date();

  // 更新 credits 表中的剩余积分
  const currentCredits = await db
    .select()
    .from(credits)
    .where(and(eq(credits.userId, userId), gt(credits.remainingCredits, 0)))
    .orderBy(credits.createdAt)
    .limit(1);

  if (!currentCredits.length) {
    return "User's credit record does not exist";
  }
  //剩余积分足够使用时
  if (currentCredits[0].remainingCredits - creditsToUse >= 0) {
    await db
      .update(credits)
      .set({
        remainingCredits: currentCredits[0].remainingCredits - creditsToUse,
      })
      .where(eq(credits.id, currentCredits[0].id));
  } else {
    return "Not enough credits";
  }

  // 查找用户的积分分配记录
  let allocation = await db
    .select()
    .from(userCreditsAllocation)
    .where(
      and(
        eq(userCreditsAllocation.userId, userId),
        gt(userCreditsAllocation.creditsRemaining, 0),
        gte(userCreditsAllocation.expirationDate, now)
      )
    )
    .orderBy(userCreditsAllocation.expirationDate)
    .limit(1);

  if (!allocation.length) {
    return "Not enough credits or credits have expired";
  }

  // 减少积分
  let remainingCreditsToUse = creditsToUse;

  while (remainingCreditsToUse > 0) {
    const currentAllocation = allocation[0];
    const creditsToDeduct = Math.min(
      currentAllocation.creditsRemaining,
      remainingCreditsToUse
    );

    await db
      .update(userCreditsAllocation)
      .set({
        creditsRemaining: currentAllocation.creditsRemaining - creditsToDeduct,
      })
      .where(
        eq(userCreditsAllocation.allocationId, currentAllocation.allocationId)
      );

    remainingCreditsToUse -= creditsToDeduct;

    // 如果还有剩余积分需要使用，查找下一条记录
    if (remainingCreditsToUse > 0) {
      // 查找下一条记录
      allocation = await db
        .select()
        .from(userCreditsAllocation)
        .where(
          and(
            eq(userCreditsAllocation.userId, userId),
            gt(userCreditsAllocation.creditsRemaining, 0),
            gte(userCreditsAllocation.expirationDate, now)
          )
        )
        .orderBy(userCreditsAllocation.expirationDate)
        .limit(1);

      // 如果没有更多记录，退出循环
      if (!allocation.length) {
        break;
      }
    }
  }

  // 记录积分使用
  await db.insert(creditsUsage).values({
    allocationId: allocation[0].allocationId,
    userId,
    categoryId: allocation[0].categoryId,
    creditsUsed: creditsToUse,
    usageDate: now,
    description: "Credit consumption description",
  });
  return "User's credit used successfully";
}

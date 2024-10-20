'use server'
import { db } from "@/db";
import { userCreditsAllocation, creditsUsage, creditsCategories, userSubscriptions, subscriptionPlans } from "@/db/schema";
import { eq, and, gte, desc } from "drizzle-orm";

export async function creditsUseForDetail() {
  const session = await auth();
  if (!session?.user) {
    throw new Error("User not authenticated");
  }

  const now = new Date();

  // 检查用户的订阅状态
  const [subscription] = await db
    .select({
      subscriptionId: userSubscriptions.subscriptionId,
      planName: subscriptionPlans.name,
      endDate: userSubscriptions.endDate,
    })
    .from(userSubscriptions)
    .innerJoin(subscriptionPlans, eq(userSubscriptions.planId, subscriptionPlans.planId))
    .where(and(
      eq(userSubscriptions.userId, session.user.id)      
    ))
    .orderBy(desc(userSubscriptions.startDate))
    .limit(1);

  if (!subscription) {
    throw new Error("No active subscription found");
  }

  // 对于 Pro 和 Premium 订阅，检查是否在有效期内
  if ((subscription.planName === 'pro' || subscription.planName === 'premium') && subscription.endDate) {
    if (now > subscription.endDate) {
      throw new Error("Subscription has expired");
    }
  }

  // 获取 Email 类别的 ID
  const [emailCategory] = await db
    .select()
    .from(creditsCategories)
    .where(eq(creditsCategories.name, 'email'))
    .limit(1);

  if (!emailCategory) {
    throw new Error("Email category not found");
  }

  // 查找用户有效的积分分配，按过期时间升序排序
  const allocations = await db
    .select()
    .from(userCreditsAllocation)
    .where(and(
      eq(userCreditsAllocation.userId, session.user.id),
      eq(userCreditsAllocation.categoryId, emailCategory.categoryId),
      gte(userCreditsAllocation.creditsRemaining, 1),
      gte(userCreditsAllocation.expirationDate, now)
    ))
    .orderBy(userCreditsAllocation.expirationDate)
    .limit(10);

  if (allocations.length === 0) {
    throw new Error("No available credits");
  }

  // 选择最快过期的有效积分分配
  const allocation = allocations[0];

  console.log('allocation------------------', allocation);

  // 更新积分分配记录
  await db
    .update(userCreditsAllocation)
    .set({ creditsRemaining: allocation.creditsRemaining - 1 })
    .where(eq(userCreditsAllocation.allocationId, allocation.allocationId));

  console.log('更新积分分配记录------------------ success');

  // 创建积分使用记录
  await db.insert(creditsUsage).values({
    allocationId: allocation.allocationId,
    userId: session.user.id,
    categoryId: emailCategory.categoryId,
    creditsUsed: 1,
    description: "View prospect detail",
  });

  return { success: true };
}
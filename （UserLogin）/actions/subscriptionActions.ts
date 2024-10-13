"use server";

import { db } from "@/db";
import {
  userSubscriptions,
  subscriptionPlans,
  subscriptionBenefitsRules,
  userCreditsAllocation,
} from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function subscribe(planId: number, userId: string, renewsAt: any) {
  // 检查用户是否已有活跃订阅
  const [existingSubscription] = await db
    .select()
    .from(userSubscriptions)
    .where(
      and(
        eq(userSubscriptions.userId, userId),
        eq(userSubscriptions.isActive, true)
      )
    )
    .limit(1);

  let subscriptionId;
  if (existingSubscription) {
    // 如果存在活跃订阅，更新它
    await db
      .update(userSubscriptions)
      .set({
        planId: planId,
        startDate: new Date(),
        endDate: renewsAt, // 设置为返回的截止时间
      })
      .where(
        eq(
          userSubscriptions.subscriptionId,
          existingSubscription.subscriptionId
        )
      );
    subscriptionId = existingSubscription.subscriptionId;
  } else {
    // 如果不存在活跃订阅，创建新的订阅
    const [newSubscription] = await db
      .insert(userSubscriptions)
      .values({
        userId: userId,
        planId: planId,
        startDate: new Date(),
        endDate: renewsAt, // 设置为31天后
        isActive: true,
      })
      .returning();
    subscriptionId = newSubscription.subscriptionId;
  }

  // 获取订阅计划的权益规则
  const benefitRules = await db
    .select()
    .from(subscriptionBenefitsRules)
    .where(eq(subscriptionBenefitsRules.planId, planId));

  // 为每个权益规则分配积分
  for (const rule of benefitRules) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + rule.validityDays);
    await db.insert(userCreditsAllocation).values({
      userId: userId,
      subscriptionId: subscriptionId,
      categoryId: rule.categoryId,
      creditsAllocated: rule.credits,
      creditsRemaining: rule.credits,
      allocationDate: new Date(),
      expirationDate: expirationDate,
    });
  }

  // revalidatePath("/subscription");
}

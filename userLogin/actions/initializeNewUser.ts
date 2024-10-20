'use server'

import { db } from "@/db";
import { userSubscriptions, subscriptionPlans, subscriptionBenefitsRules, userCreditsAllocation } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function initializeNewUser(userId: string) {

  // 检查用户是否已有订阅记录
  const existingSubscription = await db
    .select()
    .from(userSubscriptions)
    .where(eq(userSubscriptions.userId, userId))
    .limit(1);

  // 如果用户已有订阅记录，不执行初始化
  if (existingSubscription.length > 0) {
    console.log(`User ${userId} already has a subscription. Skipping initialization.`);
    return { success: true, message: "User already initialized" };
  }
  console.log(`Fetching free plan for user ${userId}`);
  // 获取免费计划  
  const [freePlan] = await db
    .select()
    .from(subscriptionPlans)
    .where(eq(subscriptionPlans.name, 'free'))
    .limit(1);

  if (!freePlan) {
    console.error("Free plan not found in the database");
    throw new Error("Free plan not found");
  }

  console.log(`Creating subscription for user ${userId} with plan ${freePlan.planId}`);
  // 创建用户订阅
  const [newSubscription] = await db.insert(userSubscriptions)
    .values({
      userId: userId,
      planId: freePlan.planId,
      startDate: new Date(),
      endDate: null, // 免费计划可能没有结束日期
      isActive: true,
    })
    .returning();

  console.log(`Fetching benefit rules for plan ${freePlan.planId}`);
  // 获取订阅计划的权益规则
  const benefitRules = await db
    .select()
    .from(subscriptionBenefitsRules)
    .where(eq(subscriptionBenefitsRules.planId, freePlan.planId));

  console.log(`Allocating credits for user ${userId}`);
  // 为每个权益规则分配积分
  for (const rule of benefitRules) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + rule.validityDays);

    await db.insert(userCreditsAllocation).values({
      userId: userId,
      subscriptionId: newSubscription.subscriptionId,
      categoryId: rule.categoryId,
      creditsAllocated: rule.credits,
      creditsRemaining: rule.credits,
      allocationDate: new Date(),
      expirationDate: expirationDate,
    });
    console.log(`Allocated ${rule.credits} credits for category ${rule.categoryId}, expiring on ${expirationDate}`);
  }

  console.log(`User ${userId} successfully initialized with free plan`);
  return { success: true, message: "New user initialized with free plan" };
}
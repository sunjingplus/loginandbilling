"use server"
import { db } from "@/db";
import {
  credits,
  creditsUsage,
  userCreditsAllocation,
  orders,
} from "@/db/schema";
import { eq, gte, gt, and } from "drizzle-orm";

export async function Creditsstate(userId: string ) {
  const now = new Date();

  // 查找用户的积分分配记录
  const allocation = await db
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

  // 查找用户的未过期订单
  const activeOrders = await db
    .select()
    .from(orders)
    .where(
      and(
        eq(orders.userId, userId),
        gte(orders.validUntil, now) // 检查订单是否未过期
      )
    );
  if (!activeOrders) {
    return "Not Order exists";
  }
  if (!allocation.length) {
    return "Not enough credits or credits have expired";
  }

  if (
    activeOrders.length > 0 &&
    allocation[0].creditsRemaining > 0
  ) {
    return "Order exists and credits are available for use";
  } else if (activeOrders.length > 0) {
    return "Order exists but credits are insufficient";
  } else {
    return "ok";
  }
}

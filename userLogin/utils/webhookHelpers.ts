// events.js
import {
  credits,
  creditsCategories,
  orders,
  subscriptionBenefitsRules,
  subscriptionPlans,
} from "@/db/schema";
import { getCreditsForPlan } from "./planCredits";
import { subscribe } from "../actions/subscriptionActions";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { eq } from "drizzle-orm";

export async function handleOrderCreated(event: any) {
  const { meta, data } = event;
  const { order_number, total, status } = data.attributes;
  const user_id = meta.custom_data.userId;
  const variant_id = data.attributes.first_order_item.variant_id;

  try {
    const monthlyCredits = getCreditsForPlan(variant_id);
    // Insert order record
    await db.insert(orders).values({
      userId: user_id,
      orderId: order_number,
      productId: variant_id,
      creditsGranted: monthlyCredits,
      status,
      totalAmount: total,
    });
    const categoryData = await db
      .select()
      .from(credits)
      .where(eq(credits.userId, user_id))
      .limit(1);
    // Insert credits record
    if (categoryData.length > 0) {
      // Update existing credits record
      await db
        .update(credits)
        .set({
          orderId: order_number,
          totalCredits: monthlyCredits + categoryData[0].totalCredits,
          remainingCredits: monthlyCredits + categoryData[0].remainingCredits,
        })
        .where(eq(credits.userId, user_id));
    } else {
      await db.insert(credits).values({
        userId: user_id,
        orderId: order_number,
        totalCredits: monthlyCredits,
        remainingCredits: monthlyCredits,
        creditType: "search",
        isPermanent: true,
      });
    }
  } catch (error) {
    console.error("Database operation error:", error);
    return NextResponse.json(
      { error: "Database operation failed" },
      { status: 500 }
    );
  }
}

export async function handleSubscriptionCreated(event: any) {
  const { meta, data } = event;
  const { variant_id, product_name, variant_name } = data.attributes;
  const user_id = meta.custom_data.userId;
  const planName = `${product_name} - ${variant_name}`;
  const price = data.attributes.first_subscription_item.price_id;

  const monthlyCredits = getCreditsForPlan(variant_id);
  const createdAt = new Date(data.attributes.created_at);
  const renewsAt = new Date(data.attributes.renews_at);
  const validityDays = Math.ceil(
    (renewsAt.getTime() - createdAt.getTime()) / (1000 * 3600 * 24)
  );
  try {
    // Upsert subscription plan
    const result = await db
      .insert(subscriptionPlans)
      .values({
        planId: variant_id,
        name: planName,
        price,
      })
      .onConflictDoUpdate({
        target: subscriptionPlans.planId,
        set: { name: planName, price },
      }).returning();

    // Initialize credits_categories
    const categoryData = await db
      .insert(creditsCategories)
      .values({
        name: product_name,
        categoryId: variant_id,
      })
      .onConflictDoUpdate({
        target: creditsCategories.categoryId,
        set: { name: product_name },
      })
      .returning();
    const categoryId = categoryData[0]?.categoryId;
    // Upsert subscription_benefits_rules
    await db
      .insert(subscriptionBenefitsRules)
      .values({
        ruleId: variant_id,
        planId: variant_id,
        categoryId,
        credits: monthlyCredits,
        validityDays,
      })
      .onConflictDoUpdate({
        target: subscriptionBenefitsRules.ruleId,
        set: { credits: monthlyCredits, validityDays },
      });

    await subscribe(result[0].planId, user_id, renewsAt);
  } catch (error) {
    console.error("Error processing subscription creation:", error);
    throw new Error("Failed to process subscription creation");
  }
}

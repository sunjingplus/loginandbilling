"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

// 提取环境变量检查逻辑
function checkRequiredEnvVars(envVars: string[]) {
  for (const envVar of envVars) {
    if (!process.env[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar}`);
    }
  }
}
// 使用映射对象简化 variantId 的选择
const variantIdMap = {
  yearly: {
    2: process.env.MYAPP_PLAN_STARTER_YEARLY_ID || "",
    3: process.env.MYAPP_PLAN_PREMIUM_YEARLY_ID || "",
    4: process.env.MYAPP_PLAN_ADVANCED_YEARLY_ID || "",
  },
  monthly: {
    2: process.env.MYAPP_PLAN_STARTER_MONTHLY_ID || "",
    3: process.env.MYAPP_PLAN_PREMIUM_MONTHLY_ID || "",
    4: process.env.MYAPP_PLAN_ADVANCED_MONTHLY_ID || "",
  },
};

export async function createCheckout(
  isYearly: boolean,
  plan: { id: number; name: string } // 定义 plan 的类型
) {
  try {
    let variantId:any;
    const session = await getServerSession(authOptions);
    const userData = session?.user || null;

    if (!userData || !userData.email) {
      throw new Error("User not authenticated or email not found");
    }

    const result = await db
      .select()
      .from(users)
      .where(eq(users.email, userData.email))
      .limit(1);

    const userdb = result[0];
    if (!userdb) {
      throw new Error("User not found in database");
    }

    // 检查环境变量
    checkRequiredEnvVars([
      "LEMON_SQUEEZY_HOST",
      "LEMON_SQUEEZY_API_KEY",
      "LEMON_SQUEEZY_STORE_ID",
    ]);

    const apiUrl = `${process.env.LEMON_SQUEEZY_HOST}/checkouts`;
    const apiKey = process.env.LEMON_SQUEEZY_API_KEY;
    const storeId = process.env.LEMON_SQUEEZY_STORE_ID;

    // 根据 isYearly 和 plan.id 决定 variantId
    const planType = isYearly ? "yearly" : "monthly";
    let ID=plan.id as keyof typeof variantIdMap[typeof planType]
    variantId = variantIdMap[planType][ID]; // 将 plan.id 转换为字符串
    console.log(
      "variantId",
      isYearly,
      planType,
      variantId,
      apiUrl,
      storeId,
      variantIdMap[planType],
      plan.id
    );
    if (!variantId) {
      throw new Error("Variant ID is not defined");
    }
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        data: {
          type: "checkouts",
          attributes: {
            checkout_data: {
              custom: {
                email: userdb.email,
                userId: userdb.id as string,
                username: userdb.name,
                planName: plan.name,
              },
            },
          },
          relationships: {
            store: {
              data: { type: "stores", id: storeId },
            },
            variant: { data: { type: "variants", id: variantId as string } },
          },
        },
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("LemonSqueezy API error:", errorData);
      throw new Error(`Failed to create checkout: ${response.statusText}`);
    }

    const checkoutData = await response.json();
    return checkoutData.data.attributes.url;
  } catch (error) {
    console.error("Error in createCheckout:", error);
    throw error;
  }
}

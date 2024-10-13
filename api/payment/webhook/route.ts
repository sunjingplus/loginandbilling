import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { handleOrderCreated, handleSubscriptionCreated } from "@/components/（UserLogin）/utils/webhookHelpers";

const secret = process.env.LEMONS_SQUEEZY_SIGNATURE_SECRET!;

function verifyWebhookSignature(payload: string, signature: string): boolean {
  
  const hmac = crypto.createHmac("sha256", secret);
  const digest = hmac.update(payload).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}

export async function POST(req: NextRequest) {
  
  const payload = await req.text();
  const signature = req.headers.get("x-signature") ?? "";
 
  if (!verifyWebhookSignature(payload, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 402 });
  }

  const event = JSON.parse(payload);
  const { meta } = event;

  switch (meta.event_name) {
    case "order_created": 
      await handleOrderCreated(event); // 调用处理订单创建的函数
      break;
    case "subscription_created": 
      await handleSubscriptionCreated(event); // 调用处理订阅创建的函数
      break;
    default:
      console.log(`Unhandled event type: ${meta.event_name}`);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}

"use client";
import { SubscriptionPlans } from "@/components/userLogin/SubscriptionPlans";
import { SessionProvider } from "next-auth/react";

export default function SubscriptionPage() {
  return (
    <SessionProvider>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Choose Your Plan
        </h1>
        <SubscriptionPlans />
      </div>
    </SessionProvider>
  );
}

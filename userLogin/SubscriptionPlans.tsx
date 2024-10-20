"use client";

import React, { useState, useEffect } from "react";
// import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useToast } from "./hooks/use-toast";
import { createCheckout } from "./actions/actions";
import { subscriptionPlans } from "./utils/plans"; // 导入合并后的计划
import { useSession } from "next-auth/react";

export function SubscriptionPlans() {
  const { toast } = useToast();
  const { data: session } = useSession();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [isYearly, setIsYearly] = useState(false); // 新状态用于切换
  const [showToggle, setShowToggle] = useState(true); // 新状态控制切换按钮的显示,当不需要年度订阅的时候可以将该按钮隐藏
  
const theme='#f26714'
  const handleSubscribe = async (planName: string, plan: any) => {
    if (session?.user?.email) {
      setLoadingPlan(planName);
      try {
        const checkoutUrl = await createCheckout(isYearly, plan);
        window.location.href = checkoutUrl;
      } catch (error) {
        toast({
          title: "Subscription failed",
          description:
            "An error occurred while processing your subscription. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoadingPlan(null);
      }
    } else {
      alert("Please log in first");
    }
  };
  //主题色
  return (
    <div>
      {showToggle && ( // 根据 showToggle 控制切换按钮的显示
        <div className="flex justify-center mb-4 rounded-full overflow-hidden">
          <button
            onClick={() => setIsYearly(false)}
            className={`toggle-button rounded-l-full px-4 py-2 transition-colors duration-300 ${
              !isYearly
                ? `bg-theme text-white`
                : "bg-transparent border border-gray-200"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsYearly(true)}
            className={`toggle-button rounded-r-full px-4 py-2 transition-colors duration-300 ${
              isYearly
                ? `bg-theme text-white`
                : "bg-transparent border border-gray-200"
            }`}
          >
            Yearly
          </button>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">
        {subscriptionPlans.map((plan) => (
          <Card
            key={plan.id} // 使用唯一ID作为key
            style={{
              border: `2px solid ${plan.isHighlighted ? `${theme}` : "white"}`,
            }} // 使用内联样式设置边框
            className={`flex flex-col ${
              plan.isHighlighted ? "border-10" : "border-5"
            }`} // 根据 isHighlighted 设置式
          >
            <CardHeader>
              <CardTitle className="text-xl">
                {plan.name} {/* 确保 plan.name 是字符串 */}
              </CardTitle>
              <CardTitle className="text-slate-400">
                {plan.credits} {/* 确保 plan.name 是字符串 */}
              </CardTitle>
              <CardDescription>
                ${isYearly ? plan.priceYearly : plan.priceMonthly}
                /month
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="list-disc list-inside space-y-2">
                {plan.features.map((feature, index) => (
                  <li
                    key={index}
                    className={feature.isStrikethrough ? "line-through" : ""}
                  >
                    {feature.text}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <button
                className={`w-full font-bold   px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap border-theme border-2 ${
                  // 添加 font-bold 类
                  plan.isHighlighted
                    ? `bg-theme text-white `
                    : `bg-transparent text-theme hover:bg-theme hover:text-white `
                }`} // 根据 isHighlighted 设置按钮样式
              
                onClick={() => handleSubscribe(plan.name, plan)} // 传递 plan
                disabled={loadingPlan === plan.name || plan.id === 1} // 根据ID禁用免费计划的按钮
              >
                {loadingPlan === plan.name ? (
                  <>
                    {/* <Loader2 className="mr-2 h-4 w-4 animate-spin" /> */}
                    Processing...
                  </>
                ) : plan.id === 1 ? (
                  "Get Started" // 免费计划按钮文本
                ) : (
                  "Subscribe"
                )}
              </button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

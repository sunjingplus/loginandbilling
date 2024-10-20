"use client";

import { useRouter } from "next/navigation";
import { SubscribeInfo } from "../types/subscribe";
import SubscribeCard from "./SubscribeCard";
import { SINGLE_VARIANT_KEY } from "../lib/constants";

export const subscribeInfo: SubscribeInfo = {
  free: {
    title: "20 Image Credits",
    description: "Begin Your Exploration Journey",
    amount: 5.9,
    expireType: "month",
    possess: ["Upload your photo", "Valid for 1 month", "Fast generation"],
    buttonText: "One-time payment",
  },
  membership: {
    isPopular: true,
    title: "100 Image Credits",
    description: "A more affordable option",
    amount: 12.9,
    expireType: "month",
    possess: ["Upload your photo", "Valid for 1 month", "Fast generation"],
    buttonText: "One-time payment",
    mainClassName: "purple-500",
    buttonClassName: "bg-gradient-to-r from-pink-500 to-purple-500",
  },
  boostPack: {
    title: "200 Image Credits",
    description: "Enough for a worry-free month",
    amount: 19.9,
    expireType: "month",
    possess: ["Upload your photo", "Valid for 1 month", "Fast generation"],
    buttonText: "One-time payment",
  },
};

export default async function Subscribe({ user }: { user: any }) {
  const userId = user?.userId as string;

  const router = useRouter();
  //第一种5.9
  const getStartFreeVersion = async () => {
    if (!user || !user.userId) {
      router.push("/login");
      return;
    }
    try {
      const response = await fetch("/api/payment/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: user.accessToken,
        },
        body: JSON.stringify({
          userId: user.userId,
          type: SINGLE_VARIANT_KEY,
          BoostPackID: 1,
        }),
      });
      const { checkoutURL } = await response.json();
      window.location.href = checkoutURL;
    } catch (e) {
      console.log(e);
    }
  };
  //第二种12.9
  const subscribe = async () => {
    if (!user || !user.userId) {
      router.push("/login");
      return;
    }
    try {
      const response = await fetch("/api/payment/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: user.accessToken,
        },
        body: JSON.stringify({
          userId: user.userId,
          type: SINGLE_VARIANT_KEY,
          BoostPackID: 2,
        }),
      });
      const { checkoutURL } = await response.json();
      window.location.href = checkoutURL;
      // window.open(checkoutURL, "_blank", "noopener, noreferrer");
    } catch (err) {
      console.log(err);
    }
  };
  //第三种：19.9
  const purchase = async () => {
    if (!user || !user.userId) {
      router.push("/login");
      return;
    }
    try {
      const response = await fetch("/api/payment/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: user.accessToken,
        },
        body: JSON.stringify({
          userId: user.userId,
          type: SINGLE_VARIANT_KEY,
          BoostPackID: 3,
        }),
      });
      const { checkoutURL } = await response.json();
      window.location.href = checkoutURL;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-4xl font-bold mb-8 text-zinc-800 text-center">
          Pricing
        </h1>
      </div>
      <section className="w-full py-0 flex items-center justify-center">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            <SubscribeCard
              info={subscribeInfo.free}
              clickButton={getStartFreeVersion}
            />
            <SubscribeCard
              id="subscription-card"
              info={subscribeInfo.membership}
              clickButton={subscribe}
            />
            <SubscribeCard
              id="bootsPack-card"
              info={subscribeInfo.boostPack}
              clickButton={purchase}
            />
          </div>
        </div>
      </section>
      {/* <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ duration: 2000 }}
      /> */}
    </div>
  );
}

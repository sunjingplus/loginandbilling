"use client";
import { useSession } from "next-auth/react";
import React from "react";
import { Creditsstate } from "@/components/（UserLogin）/utils/userCrediteState"; // 引入 useCredits 函数

const CreditButton: React.FC = () => {
  const { data: session } = useSession();
  const userId = session ? ((session.user as any).id as string) : null;
  const token = session ? ((session.user as any).accessToken as string) : null;

  const fetchCreditsStatus = async () => {
    if (userId) {
      const message = await Creditsstate(userId);

      if (message === "ok") {
        alert("ok");
        return true;
      } else {
        alert(message); // 弹框显示状态
        return false;
      }
    }
  };

  const handleUseCredits = async () => {
    try {
      // 如果成功，继续使用积分的逻辑
      const state = await fetchCreditsStatus();
      if (state) {
        const response = await fetch("/api/usecresite", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token || "",
          },
        });
        const data = await response.json();
        if (response.ok) {
          alert(data.message);
        } else {
          alert(data.message);
          console.error(data.message);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <button onClick={handleUseCredits}>Use Credits</button>
    </>
  );
};

export default CreditButton;

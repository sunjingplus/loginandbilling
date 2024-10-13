/*
 * @Author: Zane
 * @Date: 2024-03-21 15:46:54
 * @Description:
 * @LastEditors: Zane zanekwok73@gmail.com
 * @LastEditTime: 2024-03-21 18:45:50
 */

import { NextRequest, NextResponse } from "next/server";
import { useCredits } from "@/components/（UserLogin）/utils/useCredits";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();
    const creditsToUse = Number(process.env.DEFAULT_CREDITS_TO_USE);
    let result;
    if (isNaN(creditsToUse)) {
      throw new Error("DEFAULT_CREDITS_TO_USE must be a valid number.");
    }
    if (userId) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      result = await useCredits(userId, creditsToUse); // Call abstract function
    }

    return NextResponse.json({ message: result }, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}

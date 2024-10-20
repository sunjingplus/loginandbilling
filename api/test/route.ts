/*
 * @Author: Zane
 * @Date: 2024-03-21 15:46:54
 * @Description:
 * @LastEditors: Zane zanekwok73@gmail.com
 * @LastEditTime: 2024-03-21 18:45:50
 */

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request) {
  return NextResponse.json({ message: "tsnakska" }, { status: 200 });
}

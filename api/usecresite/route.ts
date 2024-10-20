/*
 * @Author: Zane
 * @Date: 2024-03-21 16:17:41
 * @Description:
 * @LastEditors: Zane zanekwok73@gmail.com
 * @LastEditTime: 2024-03-21 18:46:21
 */
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db"; // 导入数据库连接
import { verificationTokens, sessions } from "@/db/schema"; // 导入相关表的 schema
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  const apiUrl = `${process.env.NEXTAUTH_URL}/api/usecresite/predictions`;
  const userId = await verifyToken(req); // 验证 token

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = { userId }; // 构建 payload

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "X-API-Key": process.env.X_API_KEY } as HeadersInit,
      body: JSON.stringify(payload),
    });

    if (response.status !== 201) {
      return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Something went wrong 1012." }, { status: 500 });
  }
}

export async function verifyToken(request: Request) {
  const token = request.headers.get("token");
  if (!token) return false; // 没有 token，返回 false

  // 验证 token
  const verificationRecord = await db
    .select()
    .from(verificationTokens)
    .where(eq(verificationTokens.token, token))
    .limit(1);

  if (!verificationRecord.length) return false; // 未找到记录，返回 false

  const identifier = verificationRecord[0].identifier; // 获取 identifier

  // 根据 identifier 查询 sessions 表以获取 userId
  const sessionRecord = await db
    .select()
    .from(sessions)
    .where(eq(sessions.sessionToken, token))
    .limit(1);
  if (!sessionRecord.length) return false; // 未找到会话记录，返回 false

  return sessionRecord[0].userId; // 返回 userId
}

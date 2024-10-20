"use server"
import { db } from '@/db';
import { credits, creditsCategories, userCreditsAllocation, users } from '@/db/schema';
import { eq, sum } from 'drizzle-orm';

export async function getUserCredits(email: string) {
  try {
    // 首先根据 email 查询用户 ID
    const userResult = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!userResult.length) {
      throw new Error('User not found');
    }

    const userId = userResult[0].id;

    // 获取用户的总积分
    const totalCreditsResult = await db
      .select({ total: sum(credits.remainingCredits) })
      .from(credits)
      .where(eq(credits.userId, userId));

    // Ensure totalCredits is always a number
    const totalCredits = Number(totalCreditsResult[0]?.total) || 0;

    // 获取用户的积分详情
    
    // 计算总分配积分
    // const totalAllocatedCredits = creditDetails.reduce((sum, detail) => sum + Number(detail.creditsAllocated), 0);

    return {
      totalCredits,
     
    };
  } catch (error) {
    console.error('Error fetching user credits:', error);
    throw new Error('Failed to fetch user credits');
  }
}

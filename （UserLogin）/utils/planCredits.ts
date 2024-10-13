// 定义计划 ID 和对应积分的映射
const planCredits = {
  [process.env.MYAPP_PLAN_STARTER_MONTHLY_ID!]: Number(process.env.MYAPP_PLAN_STARTER_MONTHLY_CREDITS!), // 入门月度计划积分
  [process.env.MYAPP_PLAN_STARTER_YEARLY_ID!]: Number(process.env.MYAPP_PLAN_STARTER_YEARLY_CREDITS!),  // 入门年度计划积分
  [process.env.MYAPP_PLAN_PREMIUM_MONTHLY_ID!]: Number(process.env.MYAPP_PLAN_PREMIUM_MONTHLY_CREDITS!), // 高级月度计划积分
  [process.env.MYAPP_PLAN_PREMIUM_YEARLY_ID!]: Number(process.env.MYAPP_PLAN_PREMIUM_YEARLY_CREDITS!),  // 高级年度计划积分
  [process.env.MYAPP_PLAN_ADVANCED_MONTHLY_ID!]: Number(process.env.MYAPP_PLAN_ADVANCED_MONTHLY_CREDITS!), // 进阶月度计划积分
  [process.env.MYAPP_PLAN_ADVANCED_YEARLY_ID!]: Number(process.env.MYAPP_PLAN_ADVANCED_YEARLY_CREDITS!),  // 进阶年度计划积分
};

// 获取计划 ID 对应的积分
export function getCreditsForPlan(planId: string): number {
  return planCredits[planId] || 0; // 如果没有找到，返回 0 积分
}

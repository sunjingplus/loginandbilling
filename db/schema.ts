import { uuid, text, integer, timestamp, boolean, bigint, pgSchema,serial } from 'drizzle-orm/pg-core';

export const auth = pgSchema('next_auth');

export const users = auth.table('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name'),
  email: text('email').unique(),
  emailVerified: timestamp('emailVerified', { withTimezone: true }),
  // role: integer('role').notNull().default(1), // 假设默认权限为1
  image: text('image'),
});

export const sessions = auth.table('sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  expires: timestamp('expires', { withTimezone: true }).notNull(),
  sessionToken: text('sessionToken').notNull().unique(),
  userId: uuid('userId').references(() => users.id, { onDelete: 'cascade' }),
});

export const accounts = auth.table('accounts', {
  id: uuid('id').primaryKey().defaultRandom(),
  type: text('type').notNull(),
  provider: text('provider').notNull(),
  providerAccountId: text('providerAccountId').notNull(),
  refresh_token: text('refresh_token'),
  access_token: text('access_token'),
  expires_at: bigint('expires_at', { mode: 'number' }),
  token_type: text('token_type'),
  scope: text('scope'),
  id_token: text('id_token'),
  session_state: text('session_state'),
  oauth_token_secret: text('oauth_token_secret'),
  oauth_token: text('oauth_token'),
  userId: uuid('userId').references(() => users.id, { onDelete: 'cascade' }),
});

export const verificationTokens = auth.table('verification_tokens', {
  identifier: text('identifier'),
  token: text('token').primaryKey(),
  expires: timestamp('expires', { withTimezone: true }).notNull(),
});

export const orders = auth.table('orders', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  orderId: text('order_id').unique().notNull(),
  productId: text('product_id').notNull(),
  creditsGranted: bigint('credits_granted', { mode: 'number' }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  validFrom: timestamp('valid_from', { withTimezone: true }).defaultNow().notNull(),
  validUntil: timestamp('valid_until', { withTimezone: true }),
  status: text('status').notNull(),
  totalAmount: text('total_amount').notNull(), // Using text for decimal to avoid precision issues
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const credits = auth.table('credits', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  orderId: text('order_id'),
  totalCredits: integer('total_credits').notNull(),
  remainingCredits: integer('remaining_credits').notNull(),
  validFrom: timestamp('valid_from', { withTimezone: true }).defaultNow().notNull(),
  validUntil: timestamp('valid_until', { withTimezone: true }),
  isPermanent: boolean('is_permanent').default(false),
  creditType: text('credit_type').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});


//subscription_plans 表（订阅计划）
export const subscriptionPlans = auth.table("subscription_plans", {
  planId: serial("plan_id").primaryKey(),
  name: text("name").notNull(),             // 订阅名称 (Free, Pro, Premium)
  price: integer("price").notNull(),        // 每月价格，单位是美分
  createdAt: timestamp("created_at").defaultNow().notNull(),  // 创建时间
});


//user_subscriptions 表（用户订阅记录）
export const userSubscriptions = auth.table("user_subscriptions", {
  subscriptionId: serial("subscription_id").primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  planId: integer("plan_id").references(() => subscriptionPlans.planId), // 外键，关联订阅计划
  startDate: timestamp("start_date").defaultNow().notNull(),   // 订阅开始日期
  endDate: timestamp("end_date"),                              // 订阅结束日期
  isActive: boolean("is_active").default(true).notNull()       // 订阅是否有效
});
export const creditsCategories = auth.table("credits_categories", {
  categoryId: serial("category_id").primaryKey(),
  name: text("name").notNull()  // 积分类别名称 (Email, Photo)
});
export const subscriptionBenefitsRules = auth.table("subscription_benefits_rules", {
  ruleId: serial("rule_id").primaryKey(),
  planId: integer("plan_id").references(() => subscriptionPlans.planId), // 订阅计划外键
  categoryId: integer("category_id").references(() => creditsCategories.categoryId), // 积分类别外键
  credits: integer("credits").notNull(),  // 每月分配的积分
  validityDays: integer("validity_days").notNull(),         // 积分有效期
});
//user_credits_allocation 表（用户积分分配记录）
export const userCreditsAllocation = auth.table("user_credits_allocation", {
  allocationId: serial("allocation_id").primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),                             // 用户ID
  subscriptionId: integer("subscription_id").references(() => userSubscriptions.subscriptionId), // 外键，关联订阅记录
  categoryId: integer("category_id").references(() => creditsCategories.categoryId), // 外键，关联积分类别
  creditsAllocated: integer("credits_allocated").notNull(),           // 分配的积分数量
  creditsRemaining: integer("credits_remaining").notNull(),           // 剩余积分数量
  allocationDate: timestamp("allocation_date").defaultNow().notNull(),  // 积分分配日期
  expirationDate: timestamp("expiration_date")                      // 积分到期日期
});
// credits_usage 表（积分使用记录）
export const creditsUsage = auth.table("credits_usage", {
  usageId: serial("usage_id").primaryKey(),
  allocationId: integer("allocation_id").references(() => userCreditsAllocation.allocationId), // 外键，关联积分分配批次
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),// 用户ID
  categoryId: integer("category_id").references(() => creditsCategories.categoryId), // 外键，关联积分类别
  creditsUsed: integer("credits_used").notNull(),                  // 使用的积分数量
  usageDate: timestamp("usage_date").defaultNow().notNull(),     // 使用时间
  description: text("description")                               // 使用描述
});
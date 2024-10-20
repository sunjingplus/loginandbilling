# 谷歌OAuth2.0开发配置步骤

## 背景

在开发需要调用谷歌APIs的产品时，必须通过谷歌OAuth2.0进行验证和授权。由于网络环境的限制，相关开发文章较少。本文将分享使用谷歌OAuth2.0和APIs的前置操作步骤。

## 步骤

1. **注册成为谷歌开发者**：
   访问 [谷歌开发者控制台](https://console.cloud.google.com/) 并注册。

2. **新建项目**：
   登录后，创建一个新的项目。

   ![新建项目](https://weijunext.com/assets/001/01.png)

3. **填写项目信息**：

   ![项目信息](https://weijunext.com/assets/001/02.png)

4. **配置同意屏幕**：
   同意屏幕是请求用户授权的页面。

   ![同意屏幕](https://weijunext.com/assets/001/03.png)

5. **选择“外部”**：

   ![选择外部](https://weijunext.com/assets/001/04.png)

6. **配置同意屏幕信息**：

   ![配置信息1](https://weijunext.com/assets/001/05.png)
   ![配置信息2](https://weijunext.com/assets/001/06.png)

7. **创建凭据 - 客户端ID**：
   这里填写的信息是开发过程中需要用到的。

8. **填写客户端ID配置信息**：
   注意配置JavaScript来源，需要同时配置localhost和localhost:port（开发环境端口），以便在开发环境调试API。

   ![客户端ID配置](https://weijunext.com/assets/001/07.png)

9. **创建凭据后查看客户端ID和密钥**。

## 结语

本教程是谷歌OAuth2.0开发的前置操作，更多详细开发流程将在下一篇文章中分享。

[第二篇教程链接](https://weijunext.com/article/integrate-google-oauth2-1)

---

# 项目配置

## 文件夹结构
如果文件位置不按照此放置，可能有些文件引入需要从新引入

```
project-root/
|- app
|  |- api
|  |  |- pricing
|  components
|  |  |- (userlogin)
|  db
|  drizzle.config.ts
|- .env
```

## 完善 `.env` 文件

`.env` 文件需要以下数据：

```plaintext
NEXTAUTH_SECRET="DN12chza0vkL8N5oFs8H0XBNGQ02OmHFHwfLfzTok6rzuERz-_ogGaNiKbuR_pSaZ_ZBTz-lgCWtJyQcjABPfw" # NextAuth.js的加密密钥
NEXTAUTH_URL=http://localhost:3000/ # NextAuth.js的回调URL

DATABASE_URL="" # PostgreSQL数据库的连接字符串

GOOGLE_CLIENT_ID=564664161615-trp3pidu5lm5e6rlf80nor06jitapgdp.apps.googleusercontent.com # Google OAuth客户端ID
GOOGLE_CLIENT_SECRET=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 # Google OAuth客户端密钥

NODE_ENV=production # 应用的运行环境

# Subscriptions
LEMON_SQUEEZY_HOST=https://api.lemonsqueezy.com/v1 
LEMON_SQUEEZY_API_KEY=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9... # Lemon Squeezy订阅服务的API密钥
LEMON_SQUEEZY_STORE_ID=74952 # Lemon Squeezy订阅服务的商店ID
LEMON_SQUEEZY_PRODUCT_ID=367892 # Lemon Squeezy订阅服务的产品ID
LEMON_SQUEEZY_MEMBERSHIP_MONTHLY_VARIANT_ID=548033 # Lemon Squeezy订阅服务的月度会员变体ID
LEMON_SQUEEZY_MEMBERSHIP_SINGLE_TIME_VARIANT_ID_ONE=312649 # Lemon Squeezy订阅服务的单次会员变体ID（一）
LEMON_SQUEEZY_MEMBERSHIP_SINGLE_TIME_VARIANT_ID_TWO=285269 # Lemon Squeezy订阅服务的单次会员变体ID（二）
LEMON_SQUEEZY_MEMBERSHIP_SINGLE_TIME_VARIANT_ID_ONE_THREE=285293 # Lemon Squeezy订阅服务的单次会员变体ID（三）
LEMONS_SQUEEZY_SIGNATURE_SECRET=qz20010612 # Lemon Squeezy订阅服务的签名密钥
CREDITS_ALLOCATED=100 # 分配的信用额度
VALIDITY_DAYS=31 # 信用额度的有效天数

X_API_KEY= # 用于API请求的身份验证密钥

MYAPP_PLAN_STARTER_MONTHLY_ID=548033 # 入门月度计划ID
MYAPP_PLAN_STARTER_YEARLY_ID=550713 # 入门年度计划ID

MYAPP_PLAN_PREMIUM_MONTHLY_ID=548073 # 高级月度计划ID
MYAPP_PLAN_PREMIUM_YEARLY_ID=551357 # 高级年度计划ID

MYAPP_PLAN_ADVANCED_MONTHLY_ID=548078 # 进阶月度计划ID
MYAPP_PLAN_ADVANCED_YEARLY_ID=551358 # 进阶年度计划ID

MYAPP_PLAN_STARTER_MONTHLY_CREDITS=10 # 入门月度计划的信用额度
MYAPP_PLAN_STARTER_YEARLY_CREDITS=20 # 入门年度计划的信用额度
MYAPP_PLAN_PREMIUM_MONTHLY_CREDITS=30 # 高级月度计划的信用额度
MYAPP_PLAN_PREMIUM_YEARLY_CREDITS=40 # 高级年度计划的信用额度
MYAPP_PLAN_ADVANCED_MONTHLY_CREDITS=50 # 进阶月度计划的信用额度
MYAPP_PLAN_ADVANCED_YEARLY_CREDITS=60 # 进阶年度计划的信用额度

DEFAULT_CREDITS_TO_USE=10 # 默认使用一次功能用掉的积分的信用额度
```

## 配置方法

1. **数据库**：`DATABASE_URL`
2. **登录**：
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - 配置方法：[谷歌OAuth2.0集成](https://weijunext.com/article/integrate-google-oauth2-1)
   - 重定向 URI：`/api/auth/callback/google`

3. **支付**：
   - [Lemon Squeezy支付配置](https://app.lemonsqueezy.com/)
   - 内网穿透设置
在初始化文档里面有支付的带图详解
## 产品创建时配置

- `LEMON_SQUEEZY_API_KEY`
- `LEMON_SQUEEZY_STORE_ID`
- `LEMON_SQUEEZY_PRODUCT_ID`
- `LEMON_SQUEEZY_MEMBERSHIP_MONTHLY_VARIANT_ID`
- `LEMONS_SQUEEZY_SIGNATURE_SECRET`
- Webhooks设置：`/api/payment/webhook`

## 添加主题色

在 `globals.css` 中添加：

```css
:root {
  --theme: #f26714;
}
```

在 `tailwind.config.ts` 中配置。

## 安装依赖

```bash
pnpm add drizzle-orm @neondatabase/serverless dotenv
pnpm add -D drizzle-kit
pnpm add postgres

npx drizzle-kit generate
npx drizzle-kit migrate

pnpm add next-auth
pnpm add react-loader-spinner
pnpm add vaul
pnpm add @radix-ui/react-dialog
pnpm add @radix-ui/react-icons
pnpm add @radix-ui/react-toast
pnpm add clsx
pnpm add tailwind-merge

Pnpm add @radix-ui/react-dropdown-menu
pnpm add lucide-react

pnpm add lemonsqueezy.ts

上面语句合并语句是也可只运行下面几条条语句
pnpm add drizzle-orm @neondatabase/serverless dotenv postgres next-auth react-loader-spinner vaul @radix-ui/react-dialog @radix-ui/react-icons @radix-ui/react-toast clsx tailwind-merge @radix-ui/react-dropdown-menu lucide-react
pnpm add lemonsqueezy.ts;
pnpm add -D drizzle-kit;
npx drizzle-kit generate;
npx drizzle-kit migrate


```

## 组件引入

在需要的地方引入组件：

```jsx
// 用户登录
<UserLoginIn></UserLoginIn>
// 用户积分数量
<Credites></Credites>
// 使用积分
<CreditButton></CreditButton>
```

使用这些组件的地方需要 `<SessionProvider>` 包裹。

## 修改支付卡片内容

在 `Userlogin->utils->plans.ts` 中修改。

## 数据库表的作用

- `Users`, `sessions`, `accounts`：用户登录时初始化使用。
- `verification_tokens`：用户登录时初始化使用。
- `orders`：记录订单，在 webhooks 里面获取到新的订单时创建。
- `credits`：记录积分使用，一个用户第一次订单时创建，之后更新该用户的积分。
- `subscription_plans`：记录各种订阅计划，webhooks 回调会根据发送的产品的 id 选择创建还是更新。
- `user_subscriptions`：用户的订阅状态过期时间等，第一次创建，之后用户有新的订阅更新。
- `credits_categories`：积分类别表，会根据订阅产品创建积分类别，一个订阅产品一个积分类别。
- `subscription_benefits_rules`：积分分配规则表，订阅产品创建成功的时候会根据 env 文件里面去识别订阅产品的变体 id 获取对应的积分规则进行初始化创建。
- `user_credits_allocation

详细带图解释看初始化查看doc文档



将文件夹按照下图位置放置
app
--api
--pricing
components
--(userlogin)
db
drizzle.config.ts

完善.env文件数据
.env文件需要以下数据
NEXTAUTH_SECRET="DN12chza0vkL8N5oFs8H0XBNGQ02OmHFHwfLfzTok6rzuERz-_ogGaNiKbuR_pSaZ_ZBTz-lgCWtJyQcjABPfw" # NextAuth.js的加密密钥，用于保护用户会话
NEXTAUTH_URL=http://localhost:3000/ # NextAuth.js的回调URL，用于处理身份验证流程

DATABASE_URL="postgresql://neondb_owner:zA5W0Egrhutk@ep-billowing-moon-a6bih0ah.us-west-2.aws.neon.tech/neondb?sslmode=require" # PostgreSQL数据库的连接字符串

GOOGLE_CLIENT_ID=564664161615-trp3pidu5lm5e6rlf80nor06jitapgdp.apps.googleusercontent.com # Google OAuth客户端ID
GOOGLE_CLIENT_SECRET=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 # Google OAuth客户端密钥

NODE_ENV=production # 应用的运行环境，这里设置为生产环境

# Subscriptions
LEMON_SQUEEZY_HOST=https://api.lemonsqueezy.com/v1 # Lemon Squeezy订阅服务的主机地址
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

X_API_KEY=0e10e773a4aafa500663ae71d27d9d6f140d869b2c388e7926b603f98af19a6b # 用于API请求的身份验证密钥

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



里面需要单独重新配置的有

数据库：DATABASE_URL

登录：
GOOGLE_CLIENT_ID=564664161615-trp3pidu5lm5e6rlf80nor06jitapgdp.apps.googleusercontent.com # Google OAuth客户端ID
GOOGLE_CLIENT_SECRET=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 # Google OAuth客户端密钥

配置方法
https://weijunext.com/article/integrate-google-oauth2-1

重定向 URI 填写：/api/auth/callback/google




支付：
https://app.lemonsqueezy.com/

在vscode控制台中打开内网穿透并且设置public网络
内网穿透：


在创建产品的时候botton link填写该内网穿透的地址，可以点击botton回调到现在的网站，以及在webhhoks的填写回调地址都使用该内网穿透地址

产品创建时：

EMON_SQUEEZY_API_KEY=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9... # Lemon Squeezy订阅服务的API密钥
LEMON_SQUEEZY_STORE_ID=74952 # Lemon Squeezy订阅服务的商店ID
LEMON_SQUEEZY_PRODUCT_ID=367892 # Lemon Squeezy订阅服务的产品ID
LEMON_SQUEEZY_MEMBERSHIP_MONTHLY_VARIANT_ID=548033 # Lemon Squeezy订阅服务的月度会员变体ID
LEMONS_SQUEEZY_SIGNATURE_SECRET:
webhooks设置在设置webhooks的时候需要设置的地址是内网穿透地址加上
/api/payment/webhook
例如：
bxcj3bf2-3000.asse.devtunnels.ms/api/payment/webhook
添加主题色
--theme:#f26714;
在globals.css

在tailwind.config.ts
控制台运行下面的命令
pnpm add drizzle-orm @neondatabase/serverless dotenv
pnpm add -D drizzle-kit
pnpm add postgres
npx drizzle-kit generate
npx drizzle-kit migrate  （第一次推送数据库到远程需要）
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
pnpm  add lemonsqueezy.ts
 


在需要的地方引入组件
//用户登录
<UserLoginIn></UserLoginIn>
//用户积分数量
 <Credites></Credites>
//使用积分
<CreditButton></CreditButton>

使用这三个组件的地方需要<SessionProvider>包裹使用
修改支付卡片内容
Userlogin->utils->plans.ts

当需要更改

运行代码可以顺利登录支付

如果有多语言设置，应该确保api位置能够访问的到，否则可能造成支付回调失败

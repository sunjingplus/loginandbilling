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

DATABASE_URL="" # PostgreSQL数据库的连接字符串

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

X_API_KEY= # 用于API请求的身份验证密钥，设置一个随机字符串

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



数据库各个表的作用以及使用
Users，sessions，accounts，
verification_tokens这几张表在用户登录的时候初始化使用
orders记录订单，在webhooks里面获取到新的订单的时候创建
credits记录积分使用，一个用户第一次订单时创建，之后是更新该用户的字
subscription_plans记录各种订阅计划，webhooks回调会根据发送的产品的id选择创建还是更新
user_subscriptions，用户的订阅状态过期时间等，第一次创建，之后用户有新的订阅更新
credits_categories积分类别表，会根据订阅产品创建积分类别，一个订阅产品一个积分类别
subscription_benefits_rules积分分配规则表，订阅产品创建成功的时候会根据env文件里面去识别订阅产品的变体id获取对应的积分规则进行初始化创建
user_credits_allocation，根据webhooks里面获取的产品id去获取subscription_benefits_rules里面的分配规则去记录用户的积分分配以及分配之后剩余积分
credits_usage用户使用积分的时候进行记录积分的使用

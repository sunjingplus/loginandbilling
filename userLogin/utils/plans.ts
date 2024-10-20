// 订阅计划展示
//isStrikethrough为true的时候用删除线展示
export const subscriptionPlans = [
  {
    id: 1, // 唯一ID
    name: "Free",
    priceMonthly: 0,
    priceYearly: 0,
    credits: "0 Credits", // 新增字段展示积分
    features: [
      { text: "Access to public datasets", isStrikethrough: false },
      { text: "Normal speed generation", isStrikethrough: false },
      { text: "Character consistency", isStrikethrough: true },
      { text: "Upload your own character", isStrikethrough: true },
      { text: "Faster image generation", isStrikethrough: true },
      { text: "Stable storytelling output", isStrikethrough: true },
      { text: "Single/Double page mode", isStrikethrough: true },
      { text: "Custom caption language and caption editing", isStrikethrough: true },
      { text: "Prompt editing", isStrikethrough: true },
      { text: "Ads free", isStrikethrough: true },
    ],
    isHighlighted: false,
  },
  {
    id: 2, // 唯一ID
    name: "Starter plan",
    priceMonthly: 19.99,
    priceYearly: 13.99,
    credits: "600 Credits", // 新增字段展示积分
    features: [
      { text: "600 credits per month", isStrikethrough: false },
      { text: "Faster image generation", isStrikethrough: false },
      { text: "Stable storytelling output", isStrikethrough: false },
      { text: "Ads free", isStrikethrough: false },
      { text: "Custom caption language and caption editing", isStrikethrough: false },
      { text: "Character consistency", isStrikethrough: true },
      { text: "Upload your own character", isStrikethrough: true },
      { text: "Prompt editing", isStrikethrough: true },
      { text: "Single/Double page mode", isStrikethrough: true },
    ],
    isHighlighted: false,
  },
  {
    id: 3, // 唯一ID
    name: "Premium plan",
    priceMonthly: 49.99,
    priceYearly: 45.99,
    credits: "1200 Credits", // 新增字段展示积分
    features: [
      { text: "1200 credits per month", isStrikethrough: false },
      { text: "Support for FLUX.1", isStrikethrough: false },
      { text: "Character consistency", isStrikethrough: false },
      { text: "Upload your own character", isStrikethrough: false },
      { text: "Faster image generation", isStrikethrough: false },
      { text: "Stable storytelling output", isStrikethrough: false },
      { text: "Single/Double page mode", isStrikethrough: false },
      { text: "Prompt editing", isStrikethrough: false },
      { text: "Custom caption language and caption editing", isStrikethrough: false },
    ],
    isHighlighted: true,
  },
  {
    id: 4, // 唯一ID
    name: "Pro Yearly",
    priceMonthly: 19.99,
    priceYearly: 11.99,
    credits: "Unlimited Credits", // 新增字段展示积分
    features: [
      { text: "Unlimited credits", isStrikethrough: false },
      { text: "Support for FLUX.1", isStrikethrough: false },
      { text: "Character consistency", isStrikethrough: false },
      { text: "Upload your own character", isStrikethrough: false },
      { text: "Faster image generation", isStrikethrough: false },
      { text: "Stable storytelling output", isStrikethrough: false },
      { text: "Single/Double page mode", isStrikethrough: false },
      { text: "Prompt editing", isStrikethrough: false },
      { text: "Custom caption language and caption editing", isStrikethrough: false },
    ],
    isHighlighted: false,
  },
  ];

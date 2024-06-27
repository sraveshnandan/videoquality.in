import { IFeatureCard, INavMenu, IPricingCard } from "@/types";

const NavMenu: INavMenu[] = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Features",
    link: "/Features",
  },
  {
    name: "Pricing",
    link: "/Pricing",
  },
  {
    name: "Contact",
    link: "/Contact",
  },
];

const FeatureCards: IFeatureCard[] = [
  {
    title: "AI-Powered Video Enhancements",
    subTitle: "Automatically Improve Video Quality",
    desc: "Our advanced AI technology analyzes your video and applies enhancements to deliver crisp, clear, and vibrant visuals.",
  },
  {
    title: "Customizable Edits with Simple Prompts",
    subTitle: "Describe, Upload, Enhance",
    desc: "Simply describe how you want your video edited and our platform will handle the rest, making professional video editing accessible to everyone.",
  },
  {
    title: "Wide Range of Editing Options",
    subTitle: "Versatile Editing Capabilities",
    desc: "From color correction and stabilization to special effects and audio enhancements, our platform offers a wide array of editing tools.",
  },
  {
    title: "User-Friendly Interface",
    subTitle: "Easy to Use",
    desc: "No complicated software or steep learning curve. Our intuitive platform makes video editing straightforward and hassle-free.",
  },
];

const loggedInUserMenu: INavMenu[] = [
  {
    name: "Dashboard",
    link: "/dashboard",
  },
  {
    name: "Tasks",
    link: "/dashboard/tasks",
  },
  {
    name: "Refer & Earn",
    link: "/dashboard/refer-earn",
  },
  {
    name: "Buy Credit",
    link: "/dashboard/upgrade",
  },
];

const PricingCards: IPricingCard[] = [
  {
    name: "Starter",
    amount: 9,
    credit: 100,
    benifits: [
      "credit: 100 credits",
      "validity: 1 month",
      "All features unlocked.",
      "Premium membership.",
      "Fast Processing.",
    ],
  },
  {
    name: "Basic",
    amount: 19,
    credit: 220,
    benifits: [
      "credit: 220 credits",
      "validity: 1 month",
      "All features unlocked.",
      "Premium membership.",
      "Fast Processing.",
    ],
  },
  {
    name: "Standred",
    amount: 49,
    credit: 430,
    benifits: [
      "credit: 430 credits",
      "validity: 1 month",
      "All features unlocked.",
      "Premium membership.",
      "Fast Processing.",
    ],
  },
  {
    name: "Standred",
    amount: 99,
    credit: 870,
    benifits: [
      "credit: 870 credits",
      "validity: 1 month",
      "All features unlocked.",
      "Premium membership.",
      "Fast Processing.",
    ],
  },
  {
    name: "Custom",
    custom: true,
  },
];

const Editing_Types: { name: string }[] = [
  {
    name: "Auto Inhance",
  },
  {
    name: "Color Grading",
  },
  {
    name: "Video Upscale",
  },
  {
    name: "Ai Cartoonise",
  },
  {
    name: "Ai",
  },
];

const deviceTokens: string[] = [
  "dF_GFdOLdwmNxHWM_oQL0j:APA91bF4V61hLee6Ecg0j2l3EuMigPT3aQt_PT_K_LaU_h2Q7q4Dt4VEqXMFadV67-JC-Fs53wxK9Rs1-s76AdHULr4IAFRVFSZxT9BLM9cAb5lOoNorOrb1JCITq3ZCw05BOT7Oq7Dt",
  "e36J4XEokrfREYyzo7_zWX:APA91bHIvVltYZRSeUQdH_4m9hnWr_Yfw1eccHBdRh_S7attKRrBikEfCxDYj6XNFDNLQqdwef6Uo_5qe440N71f8PV-BQP0cwT6NHNTwLy6BQRI0SO9AeKkuRS22PeBTUazFQuhemUj",
  "c44-OlvjNauFojmh7uTKV6:APA91bHk9O6bHIkIF5Wzb0zWSCF-mvq89q3i8MHReHE-oNEeRpfFfoMMXLTvnrPScw3Fs4UOH2gXyVt97_0uRD7UPtEUA8EwjKqFE9MDf-vW9oTshGIXuWwPEPzxUWccgr3-nDfNOxLP",
];

const VideoTypes: { name: string; url: string }[] = [
  {
    name: "Auto Inhance",
    url: "https://d2zga9r8admji.cloudfront.net/landings/video-upscale/video_upscale_demo_1.mp4",
  },
  {
    name: "Video Upscale",
    url: "https://d2zga9r8admji.cloudfront.net/landings/video-slo-mo/slo-mo-1.mp4",
  },
  {
    name: "Color Grading",
    url: "https://d2zga9r8admji.cloudfront.net/landings/video-colorization/colorization_landing_palette.mp4",
  },
  {
    name: "Ai",
    url: "https://d2zga9r8admji.cloudfront.net/landings/video-face-recovery/fr_2_web.mp4",
  },
];

export {
  NavMenu,
  FeatureCards,
  loggedInUserMenu,
  PricingCards,
  Editing_Types,
  deviceTokens,
  VideoTypes,
};

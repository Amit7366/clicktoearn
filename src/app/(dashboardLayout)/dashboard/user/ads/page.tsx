"use client";
import {
  AppWindowMacIcon,
  ChartNoAxesCombined,
  FileType,
  FileType2,
  User2Icon,
  UserIcon,
  CheckCircle,
  Briefcase,
  Rocket,
  Shield,
  Globe,
  CreditCard,
  Cloud,
  Box,
  Layers,
  Zap,
  Users,
  DollarSign,
  TrendingUp,
  Activity,
} from "lucide-react";
const adsData = [
  {
    title: "Holiday Helpers",
    price: 0.1,
    description:
      "Choose this plan if your team wants more storage space, flexible options for each member.",
    duration: "30s",
    icon: <Users className="w-9 h-9" />,
    url: "https://www.airbnb.com/",
  },
  {
    title: "Starter Pack",
    price: 0.25,
    description: "Perfect for teams just getting started with ad campaigns.",
    duration: "45s",
    icon: <Briefcase className="w-9 h-9" />,
    url: "https://www.shopify.com/",
  },
  {
    title: "Boost Reach",
    price: 0.35,
    description: "Reach more users with boosted visibility on your ads.",
    duration: "60s",
    icon: <Rocket className="w-9 h-9" />,
    url: "https://ads.google.com/",
  },
  {
    title: "Security First",
    price: 0.15,
    description: "Promote safety and security tools with this low-cost plan.",
    duration: "20s",
    icon: <Shield className="w-9 h-9" />,
    url: "https://www.norton.com/",
  },
  {
    title: "Global Push",
    price: 0.5,
    description: "Expand your reach with ads shown globally.",
    duration: "90s",
    icon: <Globe className="w-9 h-9" />,
    url: "https://www.google.com/",
  },
  {
    title: "Payment Plans",
    price: 0.3,
    description: "Drive adoption of your payment services efficiently.",
    duration: "40s",
    icon: <CreditCard className="w-9 h-9" />,
    url: "https://www.stripe.com/",
  },
  {
    title: "Cloud Sync",
    price: 0.18,
    description: "Highlight your cloud storage or backup services.",
    duration: "35s",
    icon: <Cloud className="w-9 h-9" />,
    url: "https://www.dropbox.com/",
  },
  {
    title: "Smart Storage",
    price: 0.22,
    description: "Cost-effective storage options for modern teams.",
    duration: "33s",
    icon: <Box className="w-9 h-9" />,
    url: "https://www.box.com/",
  },
  {
    title: "Layered Strategy",
    price: 0.27,
    description: "Multichannel campaign coverage for all devices.",
    duration: "38s",
    icon: <Layers className="w-9 h-9" />,
    url: "https://mailchimp.com/",
  },
  {
    title: "Fast Launch",
    price: 0.45,
    description: "Quick and optimized ad delivery for launches.",
    duration: "55s",
    icon: <Zap className="w-9 h-9" />,
    url: "https://www.producthunt.com/",
  },
  // Duplicates with real but generic tech/productivity URLs
  {
    title: "Campaign 11",
    price: "0.48",
    description: "Auto-generated campaign data for testing layouts.",
    duration: "32s",
    icon: <Users className="w-9 h-9" />,
    url: "https://www.trello.com/",
  },
  {
    title: "Campaign 12",
    price: "0.52",
    description: "Auto-generated campaign data for testing layouts.",
    duration: "28s",
    icon: <Users className="w-9 h-9" />,
    url: "https://slack.com/",
  },
  {
    title: "Campaign 13",
    price: "0.41",
    description: "Auto-generated campaign data for testing layouts.",
    duration: "36s",
    icon: <Users className="w-9 h-9" />,
    url: "https://www.figma.com/",
  },
  {
    title: "Campaign 14",
    price: "0.43",
    description: "Auto-generated campaign data for testing layouts.",
    duration: "48s",
    icon: <Users className="w-9 h-9" />,
    url: "https://www.notion.so/",
  },
  {
    title: "Campaign 15",
    price: "0.39",
    description: "Auto-generated campaign data for testing layouts.",
    duration: "42s",
    icon: <Users className="w-9 h-9" />,
    url: "https://asana.com/",
  },
  {
    title: "Campaign 16",
    price: "0.33",
    description: "Auto-generated campaign data for testing layouts.",
    duration: "30s",
    icon: <Users className="w-9 h-9" />,
    url: "https://zoom.us/",
  },
  {
    title: "Campaign 17",
    price: "0.36",
    description: "Auto-generated campaign data for testing layouts.",
    duration: "44s",
    icon: <Users className="w-9 h-9" />,
    url: "https://www.canva.com/",
  },
  {
    title: "Campaign 18",
    price: "0.40",
    description: "Auto-generated campaign data for testing layouts.",
    duration: "38s",
    icon: <Users className="w-9 h-9" />,
    url: "https://www.hubspot.com/",
  },
  {
    title: "Campaign 19",
    price: "0.31",
    description: "Auto-generated campaign data for testing layouts.",
    duration: "46s",
    icon: <Users className="w-9 h-9" />,
    url: "https://buffer.com/",
  },
  {
    title: "Campaign 20",
    price: "0.37",
    description: "Auto-generated campaign data for testing layouts.",
    duration: "50s",
    icon: <Users className="w-9 h-9" />,
    url: "https://zapier.com/",
  },
];


const AdsPage = () => {
  const runAds = (data: any) => {
    window.open(`/${data}`, "_blank");
    // console.log("running ads", data);
  }
  return (
    
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-6">
        {adsData.map(({ title, price, description, duration, icon,url }: any) => (
          <div key={title} className="max-w-sm rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-md border border-blue-100 bg-blue-50 text-blue-600">
                {icon}
              </div>
              <div className="text-lg font-semibold text-gray-800 mb-2">
                <h3 className="text-base font-semibold">{title}</h3>${price}
                <span className="text-sm font-normal text-gray-500">/user</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-4">{description}</p>
            <div className="flex items-center justify-between gap-2 text-sm text-gray-700">
              <div className="flex items-center gap-2 text-xs">
                <CheckCircle className="w-4 h-4 text-green-700" />
                {duration}
              </div>
              <button onClick={()=>runAds(title)} className="px-5 py-2 rounded-md text-white bg-cyan-700 cursor-pointer">
                View Ad
              </button>
            </div>
          </div>
        ))}
      </div>
  )
}

export default AdsPage

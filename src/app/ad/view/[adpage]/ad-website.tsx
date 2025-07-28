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
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
const adsData = [
  {
    title: "Holiday Helpers",
    price: 0.1,
    description:
      "Choose this plan if your team wants more storage space, flexible options for each member.",
    duration: "30s",
    icon: <Users className="w-9 h-9" />,
    url: "https://www.findlocaldate.com/9508/",
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
    url: "https://www.ylaw.ca/",
  },
  {
    title: "Security First",
    price: 0.15,
    description: "Promote safety and security tools with this low-cost plan.",
    duration: "20s",
    icon: <Shield className="w-9 h-9" />,
    url: "https://www.staceyanntaylorlaw.com/",
  },
  {
    title: "Global Push",
    price: 0.5,
    description: "Expand your reach with ads shown globally.",
    duration: "90s",
    icon: <Globe className="w-9 h-9" />,
    url: "https://www.bicklawllp.com/",
  },
  {
    title: "Payment Plans",
    price: 0.3,
    description: "Drive adoption of your payment services efficiently.",
    duration: "40s",
    icon: <CreditCard className="w-9 h-9" />,
    url: "https://www.rasa-legal.com/",
  },
  {
    title: "Cloud Sync",
    price: 0.18,
    description: "Highlight your cloud storage or backup services.",
    duration: "35s",
    icon: <Cloud className="w-9 h-9" />,
    url: "https://bigfirelaw.com/",
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
export default function AdLoader() {
  const params = useParams();
  const adTitle = params.adpage
    ? decodeURIComponent(params.adpage as string)
    : "";
  const ad = adsData.find((item) => item.title === adTitle);
  const [progress, setProgress] = useState(0);
  const [adsLoaded, setAdsLoaded] = useState(false);
  const [captchaInput, setCaptchaInput] = useState("");
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);

  useEffect(() => {
    if (!adsLoaded) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setAdsLoaded(true);
            setNum1(Math.floor(Math.random() * 10) + 1);
            setNum2(Math.floor(Math.random() * 10) + 1);
            return 100;
          }
          return prev + 1;
        });
      }, 100);
    }
  }, [adsLoaded]);

  const handleConfirm = () => {
    if (parseInt(captchaInput) === num1 + num2) {
      alert("✅ Earn confirmed!");
    } else {
      alert("❌ Wrong answer!");
    }
  };

  // Optional: Basic URL safety check
  const isValidUrl = (url: string) => {
    try {
      const parsed = new URL(url);
      return parsed.protocol === "https:" || parsed.protocol === "http:";
    } catch {
      return false;
    }
  };

  return (
    <section>
      <div className="w-full fixed top-0 bg-gradient-to-r from-indigo-800 to-purple-700 flex flex-row py-5 items-center justify-between gap-6 px-4 z-50">
        <div className="w-full max-w-md h-10 bg-purple-400 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-indigo-900 text-white flex items-center justify-center text-sm font-medium transition-all duration-300 ease-linear"
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
        </div>

        {!adsLoaded ? (
          <button className="bg-rose-500 text-white font-semibold px-4 py-2 rounded">
            Loading Ads
          </button>
        ) : (
          <div className="flex justify-between items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-900 text-white px-3 py-2 rounded text-xl">
                {num1}
              </div>
              <span className="text-white text-xl font-bold">+</span>
              <div className="bg-indigo-900 text-white px-3 py-2 rounded text-xl">
                {num2}
              </div>
              <span className="text-white text-xl font-bold">=</span>
              <input
                type="number"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                className="w-16 px-2 py-2 rounded bg-purple-400 text-white text-center font-bold focus:outline-none"
              />
            </div>
            <button
              onClick={handleConfirm}
              className="bg-rose-500 text-white font-semibold px-4 py-2 rounded"
            >
              Confirm Earn
            </button>
          </div>
        )}
      </div>

      <div className="w-full mt-24 h-[calc(100vh-6rem)]">
        <div className="h-full w-full">
          {isValidUrl(ad?.url ?? "") ? (
            <iframe
              src={ad?.url}
              className="w-full h-full"
              frameBorder="0"
              allowFullScreen
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white bg-red-500">
              Invalid or missing ad URL!
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

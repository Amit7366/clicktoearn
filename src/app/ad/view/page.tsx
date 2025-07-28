"use client";

import { getFromLocalStorage } from "@/utils/local-storage";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function AdLoader() {
  const searchParams = useSearchParams();

  const userId = searchParams.get("userId");
  const taskId = searchParams.get("taskId");
  const videoUrl = searchParams.get("videoUrl");
  const adDuration = searchParams.get("adDuration");
  const encodedData = searchParams.get("encodedData");

  const durationInSeconds = parseFloat(adDuration || "1") * 60;

  const [progress, setProgress] = useState(0);
  const [adsLoaded, setAdsLoaded] = useState(false);
  const [captchaInput, setCaptchaInput] = useState("");
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [iframeReady, setIframeReady] = useState(false);

  const playerRef = useRef<any>(null);
  const playerInitialized = useRef(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const isValidUrl = (url: string) => {
    try {
      const parsed = new URL(url);
      return parsed.protocol === "https:" || parsed.protocol === "http:";
    } catch {
      return false;
    }
  };

  const getYouTubeVideoId = (url: string): string | null => {
    try {
      const parsed = new URL(url);
      if (parsed.hostname.includes("youtube.com")) {
        return parsed.searchParams.get("v");
      } else if (parsed.hostname === "youtu.be") {
        return parsed.pathname.slice(1);
      }
      return null;
    } catch {
      return null;
    }
  };

  const videoId =
    videoUrl && isValidUrl(videoUrl) ? getYouTubeVideoId(videoUrl) : null;

  useEffect(() => {
    if (encodedData) {
      const [a, b] = encodedData.split("_").map(Number);
      setNum1(a);
      setNum2(b);
    }
  }, [encodedData]);

  useEffect(() => {
    if (!videoId || playerInitialized.current) return;

    playerInitialized.current = true;

    const loadYouTubeAPI = () => {
      window.onYouTubeIframeAPIReady = () => {
        createPlayer();
      };

      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(script);
    };

    const createPlayer = () => {
      playerRef.current = new window.YT.Player("yt-player", {
        height: "100%",
        width: "100%",
        videoId: videoId,
        events: {
          onReady: () => setIframeReady(true),
          onStateChange: handlePlayerStateChange,
        },
      });
    };

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      loadYouTubeAPI();
    }
  }, [videoId]);

  const handlePlayerStateChange = (event: any) => {
    const YT = window.YT;

    if (event.data === YT.PlayerState.PLAYING && !adsLoaded) {
      if (progress < 100 && !intervalRef.current) {
        const totalDuration = durationInSeconds * 1000;
        const intervalTime = totalDuration / 100;

        intervalRef.current = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 100) {
              clearInterval(intervalRef.current!);
              intervalRef.current = null;
              setAdsLoaded(true);
              return 100;
            }
            return prev + 1;
          });
        }, intervalTime);
      }
    }

    if (
      (event.data === YT.PlayerState.PAUSED ||
        event.data === YT.PlayerState.ENDED) &&
      !adsLoaded
    ) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  };

  const handleConfirm = async () => {
    if (parseInt(captchaInput) === num1 + num2) {
      const authToken = getFromLocalStorage("accessToken");

      const payload = {
        taskId: taskId,
        userId: userId,
      };

      const promise = fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/daily-tasks/user/complete`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${authToken}`,
          },
          body: JSON.stringify(payload),
        }
      ).then(async (res) => {
        if (!res.ok) throw new Error("Failed to complete task");
        return res.json();
      });

      toast.promise(promise, {
        loading: "Confirming your reward...",
        success: (data) => `✅ ${data?.message || "Reward confirmed!"}`,
        error: (err) => `❌ ${err.message}`,
      });
    } else {
      alert("❌ Wrong answer!");
    }
  };

  return (
    <section>
      {/* Progress Bar & Captcha */}
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
            {iframeReady ? "Waiting for Play" : "Loading..."}
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

      {/* YouTube Iframe */}
      <div className="w-full mt-24 h-[calc(100vh-6rem)] flex items-center justify-center">
        <div className="w-full max-w-3xl aspect-video bg-black rounded-lg overflow-hidden shadow-lg relative">
          {!iframeReady && (
            <div className="absolute inset-0 flex items-center justify-center text-white z-10 bg-black bg-opacity-80">
              Loading YouTube Player...
            </div>
          )}
          <div id="yt-player" className="w-full h-full"></div>
        </div>
      </div>
    </section>
  );
}

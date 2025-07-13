import { useState, useEffect } from "react";
import { Download, Share } from "lucide-react";

export const InstallPWA = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if iOS
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent));

    const handler = (e: any) => {
      e.preventDefault();
      setPromptInstall(e);
      setSupportsPWA(true);
    };
    window.addEventListener("beforeinstallprompt", handler);

    const checkInstalled = () => {
      const isStandalone = window.matchMedia(
        "(display-mode: standalone)"
      ).matches;
      setIsInstalled(isStandalone);
    };
    checkInstalled();
    window.addEventListener("appinstalled", () => setIsInstalled(true));

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!promptInstall) return;
    promptInstall.prompt();
    const result = await promptInstall.userChoice;
    if (result.outcome === "accepted") {
      setPromptInstall(null);
    }
  };

  if (isInstalled) return null;

  if (isIOS) {
    return (
      <div className="fixed bottom-20 right-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg max-w-[250px] z-50">
        <div className="flex items-center gap-2 mb-2">
          <Share size={20} className="text-brand-red" />
          <span className="font-medium text-gray-800 dark:text-white">
            Install App
          </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Please open in Safari, tap Share, then 'Add to Home Screen'
        </p>
      </div>
    );
  }

  if (!supportsPWA) return null;

  return (
    <button
      onClick={handleInstall}
      className="fixed bottom-20 right-4 bg-brand-red text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-colors z-50"
    >
      <Download size={24} />
    </button>
  );
};

import { useState, useEffect } from "react";
import { Download } from "lucide-react";

export const InstallPWA = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      console.log("PWA install prompt detected");
      e.preventDefault();
      setPromptInstall(e);
      setSupportsPWA(true);
    };
    window.addEventListener("beforeinstallprompt", handler);

    // Check if installed
    const checkInstalled = () => {
      const isStandalone = window.matchMedia(
        "(display-mode: standalone)"
      ).matches;
      console.log("PWA status:", { isStandalone, supportsPWA });
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

  if (!supportsPWA || isInstalled) {
    console.log("PWA button hidden:", { supportsPWA, isInstalled });
    return null;
  }

  return (
    <button
      onClick={handleInstall}
      className="fixed bottom-20 right-4 bg-brand-red text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-colors z-50"
    >
      <Download size={24} />
    </button>
  );
};

import { Download } from "lucide-react";

export const InstallPrompt = () => (
  <div className="fixed bottom-20 left-4 right-4 bg-gray-800 rounded-xl p-3 flex items-center gap-3 text-sm text-white">
    <Download size={20} />
    <span>Add to Home Screen</span>
  </div>
);

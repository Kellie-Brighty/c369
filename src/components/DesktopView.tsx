import logo from "../assets/logo.jpg";
import { Smartphone } from "lucide-react";

const DesktopView = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-center p-4">
      <img src={logo} alt="C369 Fitness Logo" className="w-32 h-32 rounded-2xl mb-8" />
      <div className="max-w-md mx-auto bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700">
        <div className="flex justify-center mb-6">
          <Smartphone size={48} className="text-brand-red" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-3">
          Please View on Mobile
        </h1>
        <p className="text-gray-300 mb-4">
          For the best experience, please open this application on your mobile device.
        </p>
        <p className="text-gray-400 text-sm">
          Access via your phone's browser or install as a PWA for the full experience.
        </p>
      </div>
    </div>
  );
};

export default DesktopView;

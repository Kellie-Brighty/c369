import { QRCodeSVG } from "qrcode.react";
import { format } from "date-fns";

interface MembershipQRProps {
  qrData: string;
  expiryDate: string;
  isOpen: boolean;
  onClose: () => void;
}

export const MembershipQR = ({
  qrData,
  expiryDate,
  isOpen,
  onClose,
}: MembershipQRProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-sm w-full">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          Your Membership QR
        </h3>
        <div className="bg-white p-4 rounded-xl flex items-center justify-center mb-4">
          <QRCodeSVG value={qrData} size={200} level="H" />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Valid until: {format(new Date(expiryDate), "PPP")}
        </p>
        <button
          onClick={onClose}
          className="w-full bg-brand-red text-white py-3 rounded-xl hover:bg-red-700 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

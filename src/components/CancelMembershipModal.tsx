import { AlertTriangle } from "lucide-react";

interface CancelMembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

export const CancelMembershipModal = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}: CancelMembershipModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-sm w-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-red-50 dark:bg-red-500/10 rounded-xl">
            <AlertTriangle className="text-brand-red" size={24} />
          </div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">
            Cancel Membership?
          </h3>
        </div>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Are you sure you want to cancel your membership? You'll lose access to
          premium features.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Keep Membership
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-brand-red text-white rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            Yes, Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

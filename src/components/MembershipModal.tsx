import { Check, Loader2 } from "lucide-react";
import type { PlanId } from "../services/membershipService";

const PLANS = [
  {
    id: "monthly",
    name: "Monthly",
    price: "₦20,000",
    features: ["Full gym access", "Personal trainer", "Locker access"],
  },
  {
    id: "quarterly",
    name: "Quarterly",
    price: "₦54,000",
    features: [
      "All Monthly features",
      "Fitness classes",
      "10% off supplements",
    ],
  },
  {
    id: "yearly",
    name: "Yearly",
    price: "₦192,000",
    features: ["All Quarterly features", "Free supplements", "Guest passes"],
  },
];

interface MembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: (planId: PlanId) => Promise<void>;
  isLoading: boolean;
  currentPlan?: PlanId;
}

export const MembershipModal = ({
  isOpen,
  onClose,
  onUpgrade,
  isLoading,
  currentPlan,
}: MembershipModalProps) => {
  if (!isOpen) return null;

  const availablePlans = PLANS.filter((plan) => {
    if (!currentPlan || currentPlan === "free") return true;
    const planIndex = PLANS.findIndex((p) => p.id === plan.id);
    const currentPlanIndex = PLANS.findIndex((p) => p.id === currentPlan);
    return planIndex > currentPlanIndex;
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-lg w-full">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          {currentPlan && currentPlan !== "free"
            ? "Upgrade Membership"
            : "Choose a Plan"}
        </h3>
        <div className="space-y-4">
          {availablePlans.map((plan) => (
            <div
              key={plan.id}
              className="border border-gray-200 dark:border-gray-700 rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {plan.name}
                </h4>
                <span className="text-xl font-bold text-brand-red">
                  {plan.price}
                </span>
              </div>
              <ul className="space-y-2 mb-4">
                {plan.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                  >
                    <Check size={16} className="text-brand-red" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => onUpgrade(plan.id as PlanId)}
                disabled={isLoading}
                className="w-full bg-brand-red text-white py-2 rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Select Plan"
                )}
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={onClose}
          disabled={isLoading}
          className="w-full mt-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

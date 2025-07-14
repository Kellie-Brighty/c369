import { useSearchParams } from "react-router-dom";
import { format } from "date-fns";
import { Crown, Calendar, User } from "lucide-react";

const VerifyMembership = () => {
  const [searchParams] = useSearchParams();
  const qrData = searchParams.get("data");

  if (!qrData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-sm w-full text-center">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
            Invalid QR Code
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            This QR code is invalid or has expired.
          </p>
        </div>
      </div>
    );
  }

  try {
    const membershipData = JSON.parse(qrData);
    const isExpired = new Date(membershipData.expiryDate) < new Date();

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-sm w-full">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Membership Status
            </h2>
            <div
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                isExpired
                  ? "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                  : "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400"
              }`}
            >
              {isExpired ? "Expired" : "Active"}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div className="p-2 bg-red-50 dark:bg-red-500/10 rounded-lg">
                <Crown className="text-brand-red" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Plan</p>
                <p className="font-medium text-gray-800 dark:text-white">
                  {membershipData.type.charAt(0).toUpperCase() +
                    membershipData.type.slice(1)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div className="p-2 bg-red-50 dark:bg-red-500/10 rounded-lg">
                <Calendar className="text-brand-red" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Valid Until
                </p>
                <p className="font-medium text-gray-800 dark:text-white">
                  {format(new Date(membershipData.expiryDate), "PPP")}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div className="p-2 bg-red-50 dark:bg-red-500/10 rounded-lg">
                <User className="text-brand-red" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Member ID
                </p>
                <p className="font-medium text-gray-800 dark:text-white">
                  {membershipData.userId}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-sm w-full text-center">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
            Invalid QR Code
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Unable to read membership data.
          </p>
        </div>
      </div>
    );
  }
};

export default VerifyMembership;

import { useRouteError } from "react-router-dom";
import { XCircle } from "lucide-react";

const ErrorPage = () => {
  const error = useRouteError() as any;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="text-center">
        <XCircle className="w-16 h-16 text-brand-red mx-auto mb-4" />
        <h1 className="text-4xl font-black text-gray-800 dark:text-white mb-2 font-luviic">
          {error.status || "404"}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 font-opensans">
          {error.statusText || "Page Not Found"}
        </p>
        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8 font-opensans">
          {error.data ||
            "The page you're looking for doesn't exist or has been moved."}
        </p>
        <a
          href="/"
          className="inline-flex items-center px-6 py-3 bg-brand-red hover:bg-red-700 text-white font-semibold rounded-xl transition-colors font-opensans"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default ErrorPage;

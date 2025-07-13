import type { ReactNode } from "react";
import {
  Dumbbell,
  Clock,
  Zap,
  ChevronRight,
  Trophy,
  Activity,
} from "lucide-react";
import logo from "../assets/logo.jpg";

const HomePage = () => {
  const Card = ({
    icon,
    title,
    children,
    highlight = false,
  }: {
    icon: ReactNode;
    title: string;
    children: ReactNode;
    highlight?: boolean;
  }) => (
    <div
      className={`relative overflow-hidden ${
        highlight
          ? "bg-brand-red text-white"
          : "bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
      } p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group`}
    >
      <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 bg-gradient-to-br from-white/10 to-transparent rounded-full" />
      <div
        className={`flex items-center gap-4 mb-4 ${
          highlight ? "text-white" : ""
        }`}
      >
        <div
          className={`${
            highlight ? "bg-white/20" : "bg-red-50 dark:bg-red-500/10"
          } p-3 rounded-xl`}
        >
          {icon}
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <div
        className={
          highlight ? "text-white/90" : "text-gray-600 dark:text-gray-300"
        }
      >
        {children}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sticky Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-b border-gray-100 dark:border-gray-800 z-10">
        <div className="flex items-center justify-between p-4 max-w-2xl mx-auto">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="C369 Fitness Logo"
              className="w-10 h-10 rounded-xl shadow-lg"
            />
            <div>
              <h1 className="text-lg font-black text-brand-dark dark:text-white tracking-tight">
                C369 FITNESS
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Your Ultimate Fitness Partner
              </p>
            </div>
          </div>
          <button className="p-2 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 rounded-xl transition-colors">
            <Activity className="text-brand-red" size={20} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 px-4 pb-24 space-y-6 max-w-2xl mx-auto">
        {/* Welcome Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-brand-red to-red-700 p-6 rounded-2xl shadow-lg text-white">
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-white/10 to-transparent rounded-full transform translate-x-16 -translate-y-16" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-white/10 to-transparent rounded-full transform -translate-x-16 translate-y-16" />
          <div className="relative">
            <h2 className="text-3xl font-extrabold mb-2">Welcome Back!</h2>
            <p className="text-white/90 mb-4">Ready for today's workout?</p>
            <button className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 transition-colors rounded-xl px-4 py-2 text-sm font-medium">
              View Schedule <ChevronRight size={16} className="text-white" />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <Card
            icon={<Dumbbell size={24} className="text-brand-red" />}
            title="Today's Goal"
          >
            <p>Complete 3 sets of strength training</p>
          </Card>
          <Card
            icon={<Clock size={24} className="text-white" />}
            title="Gym Hours"
            highlight
          >
            <p>Open until 10 PM</p>
          </Card>
        </div>

        {/* Activity Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
              Recent Activity
            </h3>
            <button className="text-sm text-brand-red font-medium hover:text-red-700 transition-colors">
              View All
            </button>
          </div>
          <div className="grid gap-4">
            <Card
              icon={<Trophy size={24} className="text-brand-red" />}
              title="New Achievement"
            >
              <p>Completed 10 workouts this month!</p>
            </Card>
            <Card
              icon={<Zap size={24} className="text-white" />}
              title="Streak"
              highlight
            >
              <p>You're on a 3-day streak! Keep it up!</p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;

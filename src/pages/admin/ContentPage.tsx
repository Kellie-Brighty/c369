import {
  Image,
  Type,
  Link as LinkIcon,
  Clock,
  Dumbbell,
  Trophy,
  Zap,
} from "lucide-react";

type BannerContent = {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  isActive: boolean;
};

type HeroContent = {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
};

type GridItem = {
  icon: string;
  title: string;
  text: string;
  highlight: boolean;
};

type Section = {
  id: string;
  title: string;
  type: "banner" | "hero" | "grid";
  content: BannerContent | HeroContent | GridItem[];
};

const ContentPage = () => {
  const isBannerContent = (
    content: BannerContent | HeroContent | GridItem[]
  ): content is BannerContent => {
    return "isActive" in content;
  };

  const isHeroContent = (
    content: BannerContent | HeroContent | GridItem[]
  ): content is HeroContent => {
    return "subtitle" in content;
  };

  const isGridContent = (
    content: BannerContent | HeroContent | GridItem[]
  ): content is GridItem[] => {
    return Array.isArray(content);
  };

  const sections: Section[] = [
    {
      id: "banner",
      title: "Banner Advertisement",
      type: "banner",
      content: {
        title: "Special Offer",
        description: "Join now and get 20% off!",
        buttonText: "Learn More",
        buttonLink: "#",
        isActive: true,
      },
    },
    {
      id: "welcome",
      title: "Welcome Section",
      type: "hero",
      content: {
        title: "Welcome Back!",
        subtitle: "Ready for today's workout?",
        buttonText: "View Schedule",
        buttonLink: "#",
      },
    },
    {
      id: "stats",
      title: "Stats Grid",
      type: "grid",
      content: [
        {
          icon: "dumbbell",
          title: "Today's Goal",
          text: "Complete 3 sets of strength training",
          highlight: false,
        },
        {
          icon: "clock",
          title: "Gym Hours",
          text: "Open until 10 PM",
          highlight: true,
        },
      ],
    },
    {
      id: "activity",
      title: "Activity Section",
      type: "grid",
      content: [
        {
          icon: "trophy",
          title: "New Achievement",
          text: "Completed 10 workouts this month!",
          highlight: false,
        },
        {
          icon: "zap",
          title: "Streak",
          text: "You're on a 3-day streak! Keep it up!",
          highlight: true,
        },
      ],
    },
  ];

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "dumbbell":
        return <Dumbbell size={24} className="text-brand-red" />;
      case "clock":
        return <Clock size={24} className="text-white" />;
      case "trophy":
        return <Trophy size={24} className="text-brand-red" />;
      case "zap":
        return <Zap size={24} className="text-white" />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {sections.map((section) => (
        <div
          key={section.id}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden"
        >
          <div className="p-4 border-b border-gray-100 dark:border-gray-700">
            <h3 className="font-medium text-gray-800 dark:text-white">
              {section.title}
            </h3>
          </div>
          <div className="p-4 space-y-4">
            {section.type === "banner" && isBannerContent(section.content) && (
              <>
                <div className="flex items-center gap-2 mb-4">
                  <input
                    type="checkbox"
                    checked={section.content.isActive}
                    className="rounded-lg text-brand-red focus:ring-brand-red"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Active
                  </span>
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Type size={16} />
                    Title
                  </label>
                  <input
                    type="text"
                    defaultValue={section.content.title}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 text-gray-800 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    defaultValue={section.content.description}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 text-gray-800 dark:text-gray-100"
                    rows={2}
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Image size={16} />
                    Banner Image
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="w-32 h-20 bg-gray-100 dark:bg-gray-900 rounded-xl flex items-center justify-center">
                      <Image className="text-gray-400" size={24} />
                    </div>
                    <button className="px-4 py-2 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                      Upload
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Button Text
                    </label>
                    <input
                      type="text"
                      defaultValue={section.content.buttonText}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 text-gray-800 dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <LinkIcon size={16} />
                      Button Link
                    </label>
                    <input
                      type="text"
                      defaultValue={section.content.buttonLink}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 text-gray-800 dark:text-gray-100"
                    />
                  </div>
                </div>
              </>
            )}

            {section.type === "hero" && isHeroContent(section.content) && (
              <>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Type size={16} />
                    Title
                  </label>
                  <input
                    type="text"
                    defaultValue={section.content.title}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 text-gray-800 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    defaultValue={section.content.subtitle}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 text-gray-800 dark:text-gray-100"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Button Text
                    </label>
                    <input
                      type="text"
                      defaultValue={section.content.buttonText}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 text-gray-800 dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <LinkIcon size={16} />
                      Button Link
                    </label>
                    <input
                      type="text"
                      defaultValue={section.content.buttonLink}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 text-gray-800 dark:text-gray-100"
                    />
                  </div>
                </div>
              </>
            )}

            {section.type === "grid" && isGridContent(section.content) && (
              <div className="space-y-6">
                {section.content.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div
                          className={`p-2 rounded-xl ${
                            item.highlight
                              ? "bg-brand-red"
                              : "bg-red-50 dark:bg-red-500/10"
                          }`}
                        >
                          {getIconComponent(item.icon)}
                        </div>
                        <input
                          type="text"
                          defaultValue={item.title}
                          className="font-medium bg-transparent border-none focus:outline-none focus:ring-0 text-gray-800 dark:text-gray-100 w-full"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={item.highlight}
                          className="rounded-lg text-brand-red focus:ring-brand-red"
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          Highlight
                        </span>
                      </div>
                    </div>
                    <div>
                      <textarea
                        defaultValue={item.text}
                        className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 text-gray-800 dark:text-gray-100"
                        rows={2}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContentPage;

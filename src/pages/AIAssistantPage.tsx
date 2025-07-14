import { useState } from "react";
import { Bot, Send, User, Sparkles } from "lucide-react";
import { useAuthProtected } from "../hooks/useAuthProtected";
import AuthModal from "../components/AuthModal";

const AIAssistantPage = () => {
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hello! How can I help you with your fitness goals today?",
    },
    { from: "user", text: "What's a good workout for beginners?" },
  ]);
  const [input, setInput] = useState("");
  const { showAuthModal, setShowAuthModal, protectedAction } =
    useAuthProtected("AI Assistant");

  const sendMessage = () => {
    if (input.trim() === "") return;
    protectedAction(() => {
      // Add user message
      setMessages((prev) => [...prev, { from: "user", text: input.trim() }]);

      // Simulate bot response (replace with actual AI call)
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            from: "bot",
            text: "I'm processing your request. This is a placeholder response. In production, this will be connected to the AI backend.",
          },
        ]);
      }, 1000);

      setInput("");
    });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      <header className="fixed top-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-b border-gray-100 dark:border-gray-800 z-10">
        <div className="flex items-center justify-between p-4 max-w-2xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-red flex items-center justify-center shadow-lg shadow-red-500/20">
              <Bot className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800 dark:text-white">
                AI Health Assistant
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Powered by C369 Fitness
              </p>
            </div>
          </div>
          <button className="p-2 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 rounded-xl transition-colors">
            <Sparkles className="text-brand-red" size={20} />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pt-24 px-4 pb-24">
        <div className="max-w-2xl mx-auto space-y-6">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-end gap-3 ${
                msg.from === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.from === "bot" && (
                <div className="w-8 h-8 rounded-xl bg-brand-red flex items-center justify-center flex-shrink-0 shadow-lg shadow-red-500/20">
                  <Bot size={18} className="text-white" />
                </div>
              )}
              <div
                className={`px-4 py-3 rounded-2xl max-w-[80%] ${
                  msg.from === "user"
                    ? "bg-brand-red text-white rounded-br-none shadow-lg shadow-red-500/20"
                    : "bg-white dark:bg-gray-800 shadow-md rounded-bl-none"
                }`}
              >
                <p
                  className={
                    msg.from === "user"
                      ? "text-white"
                      : "text-gray-800 dark:text-gray-200"
                  }
                >
                  {msg.text}
                </p>
              </div>
              {msg.from === "user" && (
                <div className="w-8 h-8 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0 shadow-md">
                  <User
                    size={18}
                    className="text-gray-600 dark:text-gray-400"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      <div className="fixed bottom-16 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-t border-gray-100 dark:border-gray-800 p-4">
        <div className="max-w-2xl mx-auto flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask about workouts, diet, etc..."
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-brand-red focus:ring-2 focus:ring-red-100 dark:focus:ring-red-900 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
          />
          <button
            onClick={sendMessage}
            className="p-3 bg-brand-red text-white rounded-xl hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20 active:scale-95"
          >
            <Send size={20} />
          </button>
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        // feature="AI Assistant"
      />
    </div>
  );
};

export default AIAssistantPage;

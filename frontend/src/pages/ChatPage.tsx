import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { api } from "../utils/api";
import { useAuthStore } from "../context/authStore";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  sources?: { schemeId: string; name: string }[];
}

const ChatPage: React.FC = () => {
  const { user } = useAuthStore();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState(user?.language || "en");

  const mutation = useMutation({
    mutationFn: async (payload: { message: string; language: string }) => {
      const res = await api.post("/chat", payload);
      return res.data as {
        reply: string;
        language: string;
        sources: { schemeId: string; name: string }[];
      };
    },
    onSuccess: (data) => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply, sources: data.sources }
      ]);
    }
  });

  const handleSend = () => {
    if (!input.trim()) return;
    const text = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    mutation.mutate({ message: text, language });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Chat with SchemeSathi</h1>
        <select
          className="border rounded px-2 py-1 text-sm"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="hi">हिन्दी</option>
          <option value="mr">मराठी</option>
          <option value="bn">বাংলা</option>
        </select>
      </div>

      <div className="border rounded-lg bg-white h-[60vh] flex flex-col">
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex ${
                m.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                  m.role === "user"
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                <div>{m.content}</div>
                {m.sources && m.sources.length > 0 && (
                  <div className="mt-1 text-[10px] opacity-80">
                    Sources:{" "}
                    {m.sources.map((s) => s.name).join(", ")}
                  </div>
                )}
              </div>
            </div>
          ))}
          {mutation.isPending && (
            <div className="text-xs text-gray-500">SchemeSathi is typing…</div>
          )}
        </div>
        <div className="border-t p-2 flex gap-2">
          <input
            className="flex-1 border rounded px-2 py-1 text-sm"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question here..."
          />
          <button
            onClick={handleSend}
            className="px-3 py-1 bg-secondary text-white text-sm rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;

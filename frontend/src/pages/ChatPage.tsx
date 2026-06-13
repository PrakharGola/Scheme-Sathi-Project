import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { api } from "../utils/api";
import { AppLanguage, languageOptions, useLanguage } from "../i18n/LanguageContext";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  sources?: { schemeId: string; name: string }[];
}

const ChatPage: React.FC = () => {
  const { language: appLanguage, setLanguage, t } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: t("chatGreeting")
    }
  ]);
  const [input, setInput] = useState("");
  const language = appLanguage;
  const starterPrompts = [t("chatPrompt1"), t("chatPrompt2"), t("chatPrompt3")];

  useEffect(() => {
    setMessages((prev) =>
      prev.length === 1 && prev[0].role === "assistant"
        ? [{ role: "assistant", content: t("chatGreeting") }]
        : prev
    );
  }, [t]);

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
    },
    onError: () => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: t("chatError")
        }
      ]);
    }
  });

  const handleSend = (text = input) => {
    if (!text.trim() || mutation.isPending) return;
    const message = text.trim();
    setMessages((prev) => [...prev, { role: "user", content: message }]);
    setInput("");
    mutation.mutate({ message, language });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="grid lg:grid-cols-[280px_1fr] gap-4">
        <aside className="rounded border border-white/80 bg-white/85 p-4 h-fit shadow-xl shadow-teal-900/5 backdrop-blur">
          <div className="text-xs uppercase font-semibold text-primary">{t("chatMode")}</div>
          <h1 className="mt-1 text-xl font-semibold">{t("chatTitle")}</h1>
          <label className="mt-4 block text-sm">
            <span className="text-slate-600">{t("language")}</span>
            <select
              className="mt-1 w-full rounded border border-teal-200 bg-teal-50 px-3 py-2 text-sm shadow-sm"
              value={language}
              onChange={(e) => setLanguage(e.target.value as AppLanguage)}
            >
              {languageOptions.map((option) => (
                <option key={option.code} value={option.code}>
                  {option.nativeName}
                </option>
              ))}
            </select>
          </label>

          <div className="mt-5 space-y-2">
            {starterPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                className="w-full rounded border border-teal-100 bg-gradient-to-r from-white to-teal-50 px-3 py-2 text-left text-sm text-slate-700 shadow-sm hover:border-teal-300 hover:from-teal-50 hover:to-sky-50"
              >
                {prompt}
              </button>
            ))}
          </div>
        </aside>

        <section className="rounded border border-white/80 bg-white/90 shadow-xl shadow-slate-900/10 h-[72vh] min-h-[560px] flex flex-col overflow-hidden backdrop-blur">
          <div className="border-b border-teal-100 bg-gradient-to-r from-teal-600 via-sky-600 to-indigo-600 px-4 py-3 text-white">
            <div className="font-semibold">{t("chatConversation")}</div>
            <div className="text-xs text-white/80">{t("chatSourcesHint")}</div>
          </div>

          <div className="flex-1 overflow-y-auto bg-gradient-to-br from-sky-50 via-white to-orange-50 p-4 space-y-4">
            {messages.map((message, idx) => (
              <div
                key={idx}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[86%] rounded px-4 py-3 text-sm leading-6 shadow-sm ${
                    message.role === "user"
                      ? "bg-gradient-to-br from-primary to-secondary text-white"
                      : "bg-white border border-teal-100 text-slate-900"
                  }`}
                >
                  <div className="whitespace-pre-line">{message.content}</div>
                  {message.sources && message.sources.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2 text-xs">
                      {message.sources.map((source) => (
                        <span
                          key={source.schemeId}
                          className="rounded bg-amber-50 px-2 py-1 text-amber-700"
                        >
                          {source.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {mutation.isPending && (
              <div className="text-sm text-slate-500">{t("chatThinking")}</div>
            )}
          </div>

          <div className="border-t border-teal-100 bg-white p-3">
            <div className="flex gap-2">
              <input
                className="flex-1 rounded border border-teal-200 bg-teal-50/40 px-3 py-2 text-sm focus:border-primary focus:bg-white focus:outline-none"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
                placeholder={t("chatPlaceholder")}
              />
              <button
                onClick={() => handleSend()}
                disabled={mutation.isPending || !input.trim()}
                className="rounded bg-gradient-to-r from-secondary to-primary px-4 py-2 text-sm font-medium text-white shadow-sm disabled:cursor-not-allowed disabled:from-slate-300 disabled:to-slate-300"
              >
                {t("chatSend")}
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ChatPage;

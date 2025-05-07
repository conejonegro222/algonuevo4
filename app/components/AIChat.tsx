import { useState, useRef, useEffect } from "react";
import { MessageSquareIcon, SendIcon, Volume2Icon, BotIcon } from "lucide-react";
import { getAIResponse } from "~/services/ai.client";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
}

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "initial", text: "Hello! Ask me about Kick or how to use this tool.", sender: "ai" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
    };
    setMessages(prev => [...prev, newUserMessage]);

    const aiResponseText = getAIResponse(inputValue);
    const newAIMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: aiResponseText,
      sender: "ai",
    };
    
    // Simulate AI thinking time
    setTimeout(() => {
      setMessages(prev => [...prev, newAIMessage]);
    }, 500);

    setInputValue("");
  };

  const handleSpeak = (text: string) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      if (isAISpeaking) {
        window.speechSynthesis.cancel();
        setIsAISpeaking(false);
        return;
      }
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onstart = () => setIsAISpeaking(true);
      utterance.onend = () => setIsAISpeaking(false);
      utterance.onerror = () => setIsAISpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Sorry, your browser doesn't support text-to-speech.");
    }
  };

  return (
    <div className="bg-gray-800 shadow-xl rounded-lg p-6 flex flex-col h-[500px] max-h-[70vh]">
      <h3 className="text-xl font-semibold mb-4 text-purple-400 flex items-center">
        <BotIcon className="h-6 w-6 mr-2" /> AI Assistant
      </h3>
      <div className="flex-grow overflow-y-auto mb-4 pr-2 space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                msg.sender === "user"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-700 text-gray-200"
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              {msg.sender === "ai" && (
                <button 
                  onClick={() => handleSpeak(msg.text)} 
                  className="mt-1 text-xs text-gray-400 hover:text-purple-300 flex items-center"
                  aria-label="Speak AI response"
                >
                  <Volume2Icon className="h-3 w-3 mr-1" /> {isAISpeaking ? "Stop" : "Listen"}
                </button>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="mt-auto flex items-center bg-gray-700 rounded-lg overflow-hidden">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Ask something..."
          className="w-full p-3 bg-gray-700 text-gray-100 focus:outline-none placeholder-gray-400"
          aria-label="Chat input"
        />
        <button
          onClick={handleSendMessage}
          className="p-3 bg-purple-600 hover:bg-purple-700 text-white focus:outline-none"
          aria-label="Send message"
        >
          <SendIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

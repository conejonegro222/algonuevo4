import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable, json } from "@remix-run/node";
import { RemixServer, Link, Outlet, Meta, Links, ScrollRestoration, Scripts, Form, useLoaderData, useSearchParams } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { TvIcon, SearchIcon, CalendarDaysIcon, EyeIcon, UsersIcon, MessageSquareIcon, MessageCircleIcon, BotIcon, Volume2Icon, SendIcon, BarChart3Icon } from "lucide-react";
import { useState, useRef, useEffect } from "react";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
function Navbar() {
  return /* @__PURE__ */ jsx("nav", { className: "bg-gray-900 text-white p-4 shadow-md", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto flex items-center justify-between", children: /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center space-x-2 text-xl font-bold", children: [
    /* @__PURE__ */ jsx(TvIcon, { className: "h-7 w-7 text-purple-400" }),
    /* @__PURE__ */ jsx("span", { children: "KickView Pro" })
  ] }) }) });
}
const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous"
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
  }
];
function Layout({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", className: "dark", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { className: "bg-gray-950 text-gray-100 min-h-screen flex flex-col", children: [
      /* @__PURE__ */ jsx(Navbar, {}),
      /* @__PURE__ */ jsx("main", { className: "flex-grow container mx-auto p-4 md:p-6", children }),
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Layout,
  default: App,
  links
}, Symbol.toStringTag, { value: "Module" }));
const mockUsers = {
  "user123": {
    id: "user123",
    username: "User123",
    bio: "Streaming all the cool games! Join the fun.",
    isLive: true,
    viewers: 1250,
    followers: 15e3,
    avatarUrl: "https://via.placeholder.com/150/8A2BE2/FFFFFF?text=U1",
    streamTitle: "Epic Gameplay Session!",
    category: "Gaming",
    lastChatters: [
      { id: "chatter1", username: "ChattyCathy", messagesSent: 150, avatarUrl: "https://via.placeholder.com/50/FFC0CB/000000?text=CC" },
      { id: "chatter2", username: "SuperFan", messagesSent: 120, avatarUrl: "https://via.placeholder.com/50/ADD8E6/000000?text=SF" },
      { id: "chatter3", username: "LurkerLou", messagesSent: 90 },
      { id: "chatter4", username: "ModMike", messagesSent: 85 },
      { id: "chatter5", username: "NewbieNick", messagesSent: 70 },
      { id: "chatter6", username: "ProPlayerPat", messagesSent: 60 },
      { id: "chatter7", username: "QuietQuinn", messagesSent: 50 },
      { id: "chatter8", username: "RaidBossRon", messagesSent: 40 },
      { id: "chatter9", username: "StreamSniperSam", messagesSent: 30 },
      { id: "chatter10", username: "ViewerVivian", messagesSent: 20 }
    ]
  },
  "anotherstreamer": {
    id: "anotherstreamer",
    username: "AnotherStreamer",
    bio: "Just chatting and good vibes.",
    isLive: false,
    viewers: 0,
    followers: 5e3,
    avatarUrl: "https://via.placeholder.com/150/32CD32/FFFFFF?text=AS",
    streamTitle: "Offline - Back Soon!",
    category: "Just Chatting",
    lastChatters: [
      { id: "chatterA", username: "TalkativeTom", messagesSent: 200 },
      { id: "chatterB", username: "FriendlyFran", messagesSent: 180 }
    ]
  }
};
async function searchKickUser(username) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const foundUser = Object.values(mockUsers).find(
    (user) => user.username.toLowerCase() === username.toLowerCase()
  );
  return foundUser || null;
}
function SearchBar({ initialQuery = "" }) {
  return /* @__PURE__ */ jsx(Form, { method: "get", action: "/", className: "mb-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center bg-gray-800 rounded-lg shadow-md overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "search",
        name: "username",
        defaultValue: initialQuery,
        placeholder: "Search Kick Username...",
        className: "w-full p-3 bg-gray-800 text-gray-100 focus:outline-none placeholder-gray-500",
        "aria-label": "Search Kick Username"
      }
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "submit",
        className: "p-3 bg-purple-600 hover:bg-purple-700 text-white focus:outline-none",
        "aria-label": "Search",
        children: /* @__PURE__ */ jsx(SearchIcon, { className: "h-6 w-6" })
      }
    )
  ] }) });
}
function KickUserCard({ user }) {
  return /* @__PURE__ */ jsxs("div", { className: "bg-gray-800 shadow-xl rounded-lg p-6 mb-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: user.avatarUrl,
          alt: `${user.username}'s avatar`,
          className: "w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-purple-500 object-cover"
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex-grow", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-purple-400", children: user.username }),
        user.isLive && user.streamTitle && /* @__PURE__ */ jsxs("p", { className: "text-lg text-gray-300 mt-1 flex items-center", children: [
          /* @__PURE__ */ jsx(TvIcon, { className: "h-5 w-5 mr-2 text-green-400" }),
          " ",
          user.streamTitle
        ] }),
        user.category && /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400 mt-1 flex items-center", children: [
          /* @__PURE__ */ jsx(CalendarDaysIcon, { className: "h-4 w-4 mr-2 text-gray-500" }),
          " Playing ",
          user.category
        ] }),
        user.bio && /* @__PURE__ */ jsx("p", { className: "text-gray-400 mt-2", children: user.bio })
      ] }),
      user.isLive && /* @__PURE__ */ jsx("div", { className: "flex items-center space-x-2 bg-red-600 px-3 py-1 rounded-full text-sm font-semibold", children: /* @__PURE__ */ jsx("span", { children: "LIVE" }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-gray-700 p-3 rounded-lg", children: [
        /* @__PURE__ */ jsx(EyeIcon, { className: "h-6 w-6 mx-auto mb-1 text-purple-400" }),
        /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold", children: user.viewers.toLocaleString() }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "Live Viewers" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-gray-700 p-3 rounded-lg", children: [
        /* @__PURE__ */ jsx(UsersIcon, { className: "h-6 w-6 mx-auto mb-1 text-purple-400" }),
        /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold", children: user.followers.toLocaleString() }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "Followers" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-gray-700 p-3 rounded-lg", children: [
        /* @__PURE__ */ jsx(MessageSquareIcon, { className: "h-6 w-6 mx-auto mb-1 text-purple-400" }),
        /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold", children: user.lastChatters.length > 0 ? user.lastChatters[0].messagesSent : 0 }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "Top Chatter Msgs" })
      ] })
    ] })
  ] });
}
function ChattersList({ chatters }) {
  if (!chatters || chatters.length === 0) {
    return /* @__PURE__ */ jsx("p", { className: "text-gray-500", children: "No recent chatters data." });
  }
  return /* @__PURE__ */ jsxs("div", { className: "bg-gray-800 shadow-xl rounded-lg p-6", children: [
    /* @__PURE__ */ jsxs("h3", { className: "text-xl font-semibold mb-4 text-purple-400 flex items-center", children: [
      /* @__PURE__ */ jsx(MessageCircleIcon, { className: "h-6 w-6 mr-2" }),
      " Top 10 Chatters"
    ] }),
    /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: chatters.slice(0, 10).map((chatter, index) => /* @__PURE__ */ jsxs("li", { className: "flex items-center justify-between p-3 bg-gray-700 rounded-md", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        chatter.avatarUrl ? /* @__PURE__ */ jsx("img", { src: chatter.avatarUrl, alt: chatter.username, className: "w-8 h-8 rounded-full mr-3 object-cover" }) : /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full mr-3 bg-gray-600 flex items-center justify-center text-sm", children: chatter.username.substring(0, 1).toUpperCase() }),
        /* @__PURE__ */ jsxs("span", { className: "text-gray-200", children: [
          index + 1,
          ". ",
          chatter.username
        ] })
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "text-sm text-gray-400", children: [
        chatter.messagesSent,
        " msgs"
      ] })
    ] }, chatter.id)) })
  ] });
}
const getAIResponse = void 0;
function AIChat() {
  const [messages, setMessages] = useState([
    { id: "initial", text: "Hello! Ask me about Kick or how to use this tool.", sender: "ai" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    var _a;
    (_a = messagesEndRef.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);
  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;
    const newUserMessage = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user"
    };
    setMessages((prev) => [...prev, newUserMessage]);
    const aiResponseText = getAIResponse(inputValue);
    const newAIMessage = {
      id: (Date.now() + 1).toString(),
      text: aiResponseText,
      sender: "ai"
    };
    setTimeout(() => {
      setMessages((prev) => [...prev, newAIMessage]);
    }, 500);
    setInputValue("");
  };
  const handleSpeak = (text) => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
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
  return /* @__PURE__ */ jsxs("div", { className: "bg-gray-800 shadow-xl rounded-lg p-6 flex flex-col h-[500px] max-h-[70vh]", children: [
    /* @__PURE__ */ jsxs("h3", { className: "text-xl font-semibold mb-4 text-purple-400 flex items-center", children: [
      /* @__PURE__ */ jsx(BotIcon, { className: "h-6 w-6 mr-2" }),
      " AI Assistant"
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex-grow overflow-y-auto mb-4 pr-2 space-y-3", children: [
      messages.map((msg) => /* @__PURE__ */ jsx("div", { className: `flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`, children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: `max-w-[70%] p-3 rounded-lg ${msg.sender === "user" ? "bg-purple-600 text-white" : "bg-gray-700 text-gray-200"}`,
          children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm", children: msg.text }),
            msg.sender === "ai" && /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => handleSpeak(msg.text),
                className: "mt-1 text-xs text-gray-400 hover:text-purple-300 flex items-center",
                "aria-label": "Speak AI response",
                children: [
                  /* @__PURE__ */ jsx(Volume2Icon, { className: "h-3 w-3 mr-1" }),
                  " ",
                  isAISpeaking ? "Stop" : "Listen"
                ]
              }
            )
          ]
        }
      ) }, msg.id)),
      /* @__PURE__ */ jsx("div", { ref: messagesEndRef })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-auto flex items-center bg-gray-700 rounded-lg overflow-hidden", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          value: inputValue,
          onChange: (e) => setInputValue(e.target.value),
          onKeyPress: (e) => e.key === "Enter" && handleSendMessage(),
          placeholder: "Ask something...",
          className: "w-full p-3 bg-gray-700 text-gray-100 focus:outline-none placeholder-gray-400",
          "aria-label": "Chat input"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleSendMessage,
          className: "p-3 bg-purple-600 hover:bg-purple-700 text-white focus:outline-none",
          "aria-label": "Send message",
          children: /* @__PURE__ */ jsx(SendIcon, { className: "h-5 w-5" })
        }
      )
    ] })
  ] });
}
const meta = () => {
  return [
    { title: "KickView Pro - Kick User Stats & AI Chat" },
    { name: "description", content: "Search Kick users, view live stats, top chatters, and chat with an AI assistant." }
  ];
};
async function loader({ request }) {
  const url = new URL(request.url);
  const username = url.searchParams.get("username");
  if (!username) {
    return json({ kickUser: null, query: null });
  }
  const kickUser = await searchKickUser(username);
  return json({ kickUser, query: username });
}
function Index() {
  const { kickUser, query } = useLoaderData();
  const [searchParams] = useSearchParams();
  const currentQuery = searchParams.get("username") || query || "";
  return /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxs("header", { className: "text-center py-4", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold text-purple-400", children: "Kick User Insights" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 mt-2", children: "Search for a Kick streamer to see their stats or chat with our AI assistant." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-2 space-y-6", children: /* @__PURE__ */ jsx("section", { id: "kick-stats", "aria-labelledby": "kick-stats-heading", children: /* @__PURE__ */ jsxs("div", { className: "bg-gray-800 p-6 rounded-lg shadow-xl", children: [
        /* @__PURE__ */ jsxs("h2", { id: "kick-stats-heading", className: "text-2xl font-semibold text-purple-400 mb-4 flex items-center", children: [
          /* @__PURE__ */ jsx(BarChart3Icon, { className: "h-7 w-7 mr-2" }),
          "Streamer Stats"
        ] }),
        /* @__PURE__ */ jsx(SearchBar, { initialQuery: currentQuery }),
        kickUser ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(KickUserCard, { user: kickUser }),
          /* @__PURE__ */ jsx(ChattersList, { chatters: kickUser.lastChatters })
        ] }) : query ? /* @__PURE__ */ jsxs("p", { className: "text-center text-gray-400 py-4", children: [
          'User "',
          query,
          '" not found. Try another username.'
        ] }) : /* @__PURE__ */ jsx("p", { className: "text-center text-gray-400 py-4", children: "Enter a Kick username above to see their stats." })
      ] }) }) }),
      /* @__PURE__ */ jsx("aside", { className: "lg:col-span-1 space-y-6", children: /* @__PURE__ */ jsx("section", { id: "ai-chat", "aria-labelledby": "ai-chat-heading", children: /* @__PURE__ */ jsx(AIChat, {}) }) })
    ] })
  ] });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  loader,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-3hjkv4a-.js", "imports": ["/assets/components-D5gszA7z.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-BlRsrs_t.js", "imports": ["/assets/components-D5gszA7z.js", "/assets/tv-kVllbvi6.js"], "css": ["/assets/root-kCVf2Wx6.css"] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-Bn6OQ_RX.js", "imports": ["/assets/components-D5gszA7z.js", "/assets/tv-kVllbvi6.js"], "css": [] } }, "url": "/assets/manifest-f6de9d86.js", "version": "f6de9d86" };
const mode = "production";
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v3_fetcherPersist": true, "v3_relativeSplatPath": true, "v3_throwAbortReason": true, "v3_routeConfig": false, "v3_singleFetch": false, "v3_lazyRouteDiscovery": false, "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};

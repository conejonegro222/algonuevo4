// Mock AI Chat Service (Client-Side)

const responses: Record<string, string> = {
  "hello": "Hello there! How can I help you with Kick stats today?",
  "hi": "Hi! Looking for info on a Kick streamer?",
  "how are you": "I'm doing great, ready to fetch some data!",
  "help": "You can ask me to find a Kick user, or ask general questions about this tool.",
  "what can you do": "I can help you find Kick user statistics. Try searching for a username.",
  "bye": "Goodbye! Come back soon for more stats.",
};

const defaultResponse = "I'm not sure how to respond to that. Try asking about Kick users or stats.";

export function getAIResponse(message: string): string {
  const lowerMessage = message.toLowerCase().trim();
  if (responses[lowerMessage]) {
    return responses[lowerMessage];
  }

  if (lowerMessage.includes("search for") || lowerMessage.includes("find")) {
    const parts = lowerMessage.split(" ");
    const usernameIndex = parts.findIndex(part => part === "for" || part === "find") + 1;
    if (usernameIndex > 0 && usernameIndex < parts.length) {
      const username = parts[usernameIndex];
      return `If you want to search for "${username}", please use the search bar above!`;
    }
  }
  
  // Simple keyword matching
  if (lowerMessage.includes("kick")) return "Kick is a popular streaming platform. What would you like to know?";
  if (lowerMessage.includes("stats")) return "I can show you live viewers, followers, and top chatters for Kick users.";
  if (lowerMessage.includes("viewers")) return "Live viewer counts are displayed on the user's card after you search for them.";
  if (lowerMessage.includes("chatters")) return "The top 10 chatters are listed below the user's card.";


  return defaultResponse;
}

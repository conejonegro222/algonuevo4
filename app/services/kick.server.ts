// Mock Kick API service
// In a real application, you would fetch data from Kick's actual API.

export interface KickChatter {
  id: string;
  username: string;
  messagesSent: number;
  avatarUrl?: string;
}

export interface KickUser {
  id: string;
  username: string;
  bio?: string;
  isLive: boolean;
  viewers: number;
  followers: number;
  avatarUrl: string;
  streamTitle?: string;
  category?: string;
  lastChatters: KickChatter[];
}

const mockUsers: Record<string, KickUser> = {
  "user123": {
    id: "user123",
    username: "User123",
    bio: "Streaming all the cool games! Join the fun.",
    isLive: true,
    viewers: 1250,
    followers: 15000,
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
      { id: "chatter10", username: "ViewerVivian", messagesSent: 20 },
    ],
  },
  "anotherstreamer": {
    id: "anotherstreamer",
    username: "AnotherStreamer",
    bio: "Just chatting and good vibes.",
    isLive: false,
    viewers: 0,
    followers: 5000,
    avatarUrl: "https://via.placeholder.com/150/32CD32/FFFFFF?text=AS",
    streamTitle: "Offline - Back Soon!",
    category: "Just Chatting",
    lastChatters: [
      { id: "chatterA", username: "TalkativeTom", messagesSent: 200 },
      { id: "chatterB", username: "FriendlyFran", messagesSent: 180 },
    ],
  },
};

export async function searchKickUser(username: string): Promise<KickUser | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  const foundUser = Object.values(mockUsers).find(
    user => user.username.toLowerCase() === username.toLowerCase()
  );
  return foundUser || null;
}

// These functions could be expanded if needed, but searchKickUser provides all data for now.
export async function getLiveStats(userId: string): Promise<{ viewers: number } | null> {
  const user = mockUsers[userId];
  if (user) {
    return { viewers: user.viewers };
  }
  return null;
}

export async function getTopChatters(userId: string): Promise<KickChatter[] | null> {
  const user = mockUsers[userId];
  if (user) {
    return user.lastChatters.slice(0, 10);
  }
  return null;
}

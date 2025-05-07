import type { KickChatter } from "~/services/kick.server";
import { MessageCircleIcon } from "lucide-react";

interface ChattersListProps {
  chatters: KickChatter[];
}

export default function ChattersList({ chatters }: ChattersListProps) {
  if (!chatters || chatters.length === 0) {
    return <p className="text-gray-500">No recent chatters data.</p>;
  }

  return (
    <div className="bg-gray-800 shadow-xl rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4 text-purple-400 flex items-center">
        <MessageCircleIcon className="h-6 w-6 mr-2" /> Top 10 Chatters
      </h3>
      <ul className="space-y-3">
        {chatters.slice(0, 10).map((chatter, index) => (
          <li key={chatter.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-md">
            <div className="flex items-center">
              {chatter.avatarUrl ? (
                <img src={chatter.avatarUrl} alt={chatter.username} className="w-8 h-8 rounded-full mr-3 object-cover"/>
              ) : (
                <div className="w-8 h-8 rounded-full mr-3 bg-gray-600 flex items-center justify-center text-sm">
                  {chatter.username.substring(0, 1).toUpperCase()}
                </div>
              )}
              <span className="text-gray-200">{index + 1}. {chatter.username}</span>
            </div>
            <span className="text-sm text-gray-400">{chatter.messagesSent} msgs</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

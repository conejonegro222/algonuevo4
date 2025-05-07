import type { KickUser } from "~/services/kick.server";
import { EyeIcon, UsersIcon, TvIcon, MessageSquareIcon, CalendarDaysIcon } from "lucide-react";

interface KickUserCardProps {
  user: KickUser;
}

export default function KickUserCard({ user }: KickUserCardProps) {
  return (
    <div className="bg-gray-800 shadow-xl rounded-lg p-6 mb-6">
      <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
        <img 
          src={user.avatarUrl} 
          alt={`${user.username}'s avatar`} 
          className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-purple-500 object-cover"
        />
        <div className="flex-grow">
          <h2 className="text-3xl font-bold text-purple-400">{user.username}</h2>
          {user.isLive && user.streamTitle && (
            <p className="text-lg text-gray-300 mt-1 flex items-center">
              <TvIcon className="h-5 w-5 mr-2 text-green-400" /> {user.streamTitle}
            </p>
          )}
          {user.category && (
             <p className="text-sm text-gray-400 mt-1 flex items-center">
              <CalendarDaysIcon className="h-4 w-4 mr-2 text-gray-500" /> Playing {user.category}
            </p>
          )}
          {user.bio && <p className="text-gray-400 mt-2">{user.bio}</p>}
        </div>
        {user.isLive && (
          <div className="flex items-center space-x-2 bg-red-600 px-3 py-1 rounded-full text-sm font-semibold">
            <span>LIVE</span>
          </div>
        )}
      </div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-center">
        <div className="bg-gray-700 p-3 rounded-lg">
          <EyeIcon className="h-6 w-6 mx-auto mb-1 text-purple-400" />
          <p className="text-2xl font-bold">{user.viewers.toLocaleString()}</p>
          <p className="text-sm text-gray-400">Live Viewers</p>
        </div>
        <div className="bg-gray-700 p-3 rounded-lg">
          <UsersIcon className="h-6 w-6 mx-auto mb-1 text-purple-400" />
          <p className="text-2xl font-bold">{user.followers.toLocaleString()}</p>
          <p className="text-sm text-gray-400">Followers</p>
        </div>
        <div className="bg-gray-700 p-3 rounded-lg">
          <MessageSquareIcon className="h-6 w-6 mx-auto mb-1 text-purple-400" />
          <p className="text-2xl font-bold">{user.lastChatters.length > 0 ? user.lastChatters[0].messagesSent : 0}</p>
          <p className="text-sm text-gray-400">Top Chatter Msgs</p>
        </div>
      </div>
    </div>
  );
}

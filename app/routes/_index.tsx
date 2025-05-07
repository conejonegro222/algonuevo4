import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { searchKickUser, type KickUser } from "~/services/kick.server";
import SearchBar from "~/components/SearchBar";
import KickUserCard from "~/components/KickUserCard";
import ChattersList from "~/components/ChattersList";
import AIChat from "~/components/AIChat";
import { UsersIcon, BarChart3Icon } from "lucide-react";

export const meta: MetaFunction = () => {
  return [
    { title: "KickView Pro - Kick User Stats & AI Chat" },
    { name: "description", content: "Search Kick users, view live stats, top chatters, and chat with an AI assistant." },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const username = url.searchParams.get("username");

  if (!username) {
    return json({ kickUser: null, query: null });
  }

  const kickUser = await searchKickUser(username);
  return json({ kickUser, query: username });
}

export default function Index() {
  const { kickUser, query } = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const currentQuery = searchParams.get("username") || query || "";

  return (
    <div className="space-y-8">
      <header className="text-center py-4">
        <h1 className="text-4xl font-bold text-purple-400">Kick User Insights</h1>
        <p className="text-lg text-gray-400 mt-2">
          Search for a Kick streamer to see their stats or chat with our AI assistant.
        </p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <section id="kick-stats" aria-labelledby="kick-stats-heading">
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
              <h2 id="kick-stats-heading" className="text-2xl font-semibold text-purple-400 mb-4 flex items-center">
                <BarChart3Icon className="h-7 w-7 mr-2" />
                Streamer Stats
              </h2>
              <SearchBar initialQuery={currentQuery} />
              {kickUser ? (
                <>
                  <KickUserCard user={kickUser as KickUser} />
                  <ChattersList chatters={(kickUser as KickUser).lastChatters} />
                </>
              ) : query ? (
                <p className="text-center text-gray-400 py-4">
                  User "{query}" not found. Try another username.
                </p>
              ) : (
                <p className="text-center text-gray-400 py-4">
                  Enter a Kick username above to see their stats.
                </p>
              )}
            </div>
          </section>
        </div>

        <aside className="lg:col-span-1 space-y-6">
          <section id="ai-chat" aria-labelledby="ai-chat-heading">
             <AIChat />
          </section>
        </aside>
      </div>
    </div>
  );
}

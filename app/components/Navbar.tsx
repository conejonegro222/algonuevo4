import { Link } from "@remix-run/react";
import { TvIcon } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
          <TvIcon className="h-7 w-7 text-purple-400" />
          <span>KickView Pro</span>
        </Link>
        {/* Add other nav links here if needed */}
      </div>
    </nav>
  );
}

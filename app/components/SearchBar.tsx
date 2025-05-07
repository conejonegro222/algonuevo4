import { Form } from "@remix-run/react";
import { SearchIcon } from "lucide-react";

interface SearchBarProps {
  initialQuery?: string;
}

export default function SearchBar({ initialQuery = "" }: SearchBarProps) {
  return (
    <Form method="get" action="/" className="mb-6">
      <div className="flex items-center bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <input
          type="search"
          name="username"
          defaultValue={initialQuery}
          placeholder="Search Kick Username..."
          className="w-full p-3 bg-gray-800 text-gray-100 focus:outline-none placeholder-gray-500"
          aria-label="Search Kick Username"
        />
        <button
          type="submit"
          className="p-3 bg-purple-600 hover:bg-purple-700 text-white focus:outline-none"
          aria-label="Search"
        >
          <SearchIcon className="h-6 w-6" />
        </button>
      </div>
    </Form>
  );
}

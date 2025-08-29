// src/pages/Landing.tsx
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6">
      <h1 className="text-3xl font-bold">🚀 Choose a Page</h1>

      <div className="space-x-4">
        <Link
          to="/welcome"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Welcome Page
        </Link>

        <Link
          to="/calendar"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Meeting Calendar
        </Link>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="font-bold text-xl">SlotSwapper</h1>
      <div className="flex gap-4">
        <Link to="/" className="hover:underline">Dashboard</Link>
        <Link to="/marketplace" className="hover:underline">Marketplace</Link>
        <Link to="/requests" className="hover:underline">Requests</Link>
        <Link to="/login" className="hover:underline">Logout</Link>
      </div>
    </nav>
  );
}

export default function EventCard({ title, time, status }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-gray-600">{time}</p>
      <span
        className={`text-sm px-2 py-1 rounded ${
          status === "SWAPPABLE"
            ? "bg-green-100 text-green-700"
            : "bg-gray-200 text-gray-600"
        }`}
      >
        {status}
      </span>
    </div>
  );
}

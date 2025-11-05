import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../features/eventSlice";
import { useEffect } from "react";
import EventCard from "../components/EventCard";
import Loader from "../components/Loader";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">My Events</h1>
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {list.map((event) => (
            <EventCard
              key={event._id}
              title={event.title}
              time={`${event.startTime} - ${event.endTime}`}
              status={event.status}
            />
          ))}
        </div>
      )}
    </div>
  );
}

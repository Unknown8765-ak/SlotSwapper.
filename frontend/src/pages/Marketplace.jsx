import { useDispatch, useSelector } from "react-redux";
import { getSwappableSlots } from "../features/swapSlice";
import { useEffect } from "react";

export default function Marketplace() {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.swaps);

  useEffect(() => {
    dispatch(getSwappableSlots());
  }, [dispatch]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Swappable Slots</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {list.map((slot) => (
            <li key={slot._id} className="border-b py-2">
              <strong>{slot.title}</strong> – {slot.startTime}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

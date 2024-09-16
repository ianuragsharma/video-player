import { formatTime } from "@/utils/time";

interface KeyMomentsListProps {
  keyMoments: KeyMoment[];
  currentMoment: number | null;
  handleMomentClick: (time: number) => void;
}

export default function KeyMomentsList({
  keyMoments,
  currentMoment,
  handleMomentClick,
}: KeyMomentsListProps) {
  return (
    <div className="md:col-span-1 border p-4 rounded shadow-lg overflow-auto h-80">
      <h4 className="font-semibold mb-4">Key Moments</h4>
      <ul className="space-y-5">
        {keyMoments.map((moment, index) => (
          <li
            key={index}
            className={`cursor-pointer border-b-[1px] border-opacity-30 ${
              currentMoment === moment.start_time
                ? "text-blue-500 font-semibold"
                : ""
            }`}
            onClick={() => handleMomentClick(moment.start_time)}
          >
            {formatTime(moment.start_time)} - {formatTime(moment.end_time)}:{" "}
            {moment.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

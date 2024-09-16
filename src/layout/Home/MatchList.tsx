interface MatchListProps {
  highlights: Match[];
  selectedMatch: Match | null;
  handleMatchSelect: (match: Match) => void;
}

export default function MatchList({
  highlights,
  selectedMatch,
  handleMatchSelect,
}: MatchListProps) {
  return (
    <div className="overflow-y-auto h-80">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {highlights.map((match) => (
          <div
            key={match.match_id}
            className={`border p-4 rounded shadow ${
              match.match_id === selectedMatch?.match_id ? "bg-blue-50" : ""
            }`}
          >
            <img
              src={match.thumbnail_url}
              alt={`Match ${match.match_id} Thumbnail`}
              className="w-full h-40 object-cover mb-4 rounded"
            />
            <h2 className="font-semibold">{`Match ${match.match_id}`}</h2>
            <p className="capitalize text-gray-700">{match.sport}</p>
            <button
              className="mt-2 text-blue-500 underline"
              onClick={() => handleMatchSelect(match)}
            >
              View Highlights
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

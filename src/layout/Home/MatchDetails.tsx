import { useRef } from "react";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

interface MatchDetailsProps {
  selectedMatch: Match;
  handleProgress: (progress: { playedSeconds: number }) => void;
  handleShare: () => void;
  showShareableCard: boolean;
}

export default function MatchDetails({
  selectedMatch,
  handleProgress,
  handleShare,
  showShareableCard,
}: MatchDetailsProps) {
  const playerRef = useRef(null);

  return (
    <div className="md:col-span-2">
      <h2 className="text-xl font-bold mb-4">Match Details</h2>
      <div id="match-card" className="border p-4 rounded shadow-lg mb-4">
        <h3 className="font-semibold">{`Match ${selectedMatch.match_id} Highlights`}</h3>
        <ReactPlayer
          ref={playerRef}
          url={selectedMatch.video_url}
          controls
          width="100%"
          onProgress={handleProgress}
        />
        <div className="mt-4">
          <h4 className="font-semibold">Statistics</h4>
          {Object.keys(selectedMatch.teams).map((team, index) => (
            <div key={index}>
              <p>
                Team {team} Score: {selectedMatch.teams[team].score}
              </p>
              {selectedMatch.teams[team].players.map(
                (playerStats, playerIndex) => (
                  <div key={playerIndex}>
                    <p>Calories Burned: {playerStats.calories_burned}</p>
                    <p>Shot Accuracy: {playerStats.shot_accuracy}%</p>
                  </div>
                )
              )}
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={handleShare}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {showShareableCard ? "Share Match Card" : "Show Match Card"}
      </button>
    </div>
  );
}

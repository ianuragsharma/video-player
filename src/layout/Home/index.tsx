import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { fetchHighlights } from "@/utils/api";
import html2canvas from "html2canvas";
import MatchList from "./MatchList";
import MatchDetails from "./MatchDetails";
import KeyMomentsList from "./KeyMomentsList";

const ShareableCard = dynamic(() => import("@/components/ShareableCard"), {
  ssr: false,
});

export default function HomePage() {
  const [highlights, setHighlights] = useState<Match[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [currentMoment, setCurrentMoment] = useState<number | null>(null);
  const [showShareableCard, setShowShareableCard] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchHighlights();
      setHighlights(data);
    };
    fetchData();
  }, []);

  const handleMomentClick = (time: number) => {
    setCurrentMoment(time);
  };

  const handleProgress = (progress: { playedSeconds: number }) => {
    if (selectedMatch) {
      const currentTime = progress.playedSeconds;
      const activeMoment = selectedMatch.key_moments.find(
        (moment) =>
          currentTime >= moment.start_time && currentTime <= moment.end_time
      );
      if (activeMoment) {
        setCurrentMoment(activeMoment.start_time);
      }
    }
  };

  const handleShare = async () => {
    setShowShareableCard(true);
    const cardElement = document.getElementById("shareable-card");
    if (cardElement) {
      const canvas = await html2canvas(cardElement);
      const image = canvas.toDataURL("image/png");
      const imageFile = await fetch(image).then((res) => res.blob());
      if (navigator.share) {
        await navigator.share({
          title: `Match ${selectedMatch?.match_id} Highlights`,
          text: "Check out this match!",
          files: [
            new File(
              [imageFile],
              `match_${selectedMatch?.match_id}_highlight.png`,
              { type: "image/png" }
            ),
          ],
        });
      }
    }
  };

  const handleMatchSelect = (match: Match) => {
    setSelectedMatch(match);
    setShowShareableCard(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Match Highlights</h1>

      <MatchList
        highlights={highlights}
        selectedMatch={selectedMatch}
        handleMatchSelect={handleMatchSelect}
      />

      {selectedMatch && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <MatchDetails
            selectedMatch={selectedMatch}
            handleProgress={handleProgress}
            handleShare={handleShare}
            showShareableCard={showShareableCard}
          />
          <KeyMomentsList
            keyMoments={selectedMatch.key_moments}
            currentMoment={currentMoment}
            handleMomentClick={handleMomentClick}
          />
        </div>
      )}

      {selectedMatch && showShareableCard && (
        <div
          id="shareable-card"
          className="fixed max-md:top-0 md:bottom-4 right-4 bg-white p-4 rounded shadow-lg"
        >
          <ShareableCard match={selectedMatch} />
        </div>
      )}
    </div>
  );
}

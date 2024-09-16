"use client";
import { useState, useEffect, useRef } from "react";
import { fetchHighlights } from "../utils/api";
import ReactPlayer from "react-player";
import html2canvas from "html2canvas";
import ShareableCard from "@/components/ShareableCard";

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
};

const HomePage = () => {
  const [highlights, setHighlights] = useState<Match[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [currentMoment, setCurrentMoment] = useState<number | null>(null);
  const [showShareableCard, setShowShareableCard] = useState<boolean>(false);
  const playerRef = useRef<ReactPlayer>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchHighlights();
      setHighlights(data);
    };

    fetchData();
  }, []);

  const handleMomentClick = (time: number) => {
    if (playerRef.current) {
      playerRef.current.seekTo(time, "seconds");
      setCurrentMoment(time);
    }
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
    if (selectedMatch) {
      setShowShareableCard(true);

      const cardElement = document.getElementById("shareable-card");
      if (cardElement) {
        try {
          const canvas = await html2canvas(cardElement);
          const image = canvas.toDataURL("image/png");
          const imageFile = await fetch(image).then((res) => res.blob());

          if (navigator.share) {
            await navigator.share({
              title: `Match ${selectedMatch.match_id} Highlights`,
              text: "Check out this match!",
              files: [
                new File(
                  [imageFile],
                  `match_${selectedMatch.match_id}_highlight.png`,
                  { type: "image/png" }
                ),
              ],
            });
          } else {
            const downloadLink = document.createElement("a");
            downloadLink.href = image;
            downloadLink.download = `match_${selectedMatch.match_id}_highlight.png`;
            downloadLink.click();
          }
        } catch (error) {
          console.error("Sharing failed:", error);
        } finally {
          setShowShareableCard(false);
        }
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
      <div className="relative pb-4 border-b-[1px]">
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
      </div>

      {selectedMatch && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={handleShare}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {showShareableCard ? "Share Match Card " : "Show Match Card"}
            </button>
          </div>

          <div className="md:col-span-1 border p-4 rounded shadow-lg overflow-auto h-80">
            <h4 className="font-semibold mb-4">Key Moments</h4>
            <ul className="space-y-5">
              {selectedMatch.key_moments.map((moment, index) => (
                <li
                  key={index}
                  className={`cursor-pointer border-b-[1px] border-opacity-30 ${
                    currentMoment === moment.start_time
                      ? "text-blue-500 font-semibold"
                      : ""
                  }`}
                  onClick={() => handleMomentClick(moment.start_time)}
                >
                  {formatTime(moment.start_time)} -{" "}
                  {formatTime(moment.end_time)}: {moment.description}
                </li>
              ))}
            </ul>
          </div>
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
};

export default HomePage;

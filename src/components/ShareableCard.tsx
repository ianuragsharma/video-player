"use client";
import React from "react";

const ShareableCard = ({ match }: { match: Match }) => {
  return (
    <div className="p-4 border rounded shadow-lg bg-white max-w-80">
      <h3 className="font-semibold text-lg">{`Match ${match.match_id} Highlights`}</h3>

      <p className=" text-sm">Sport: {match.sport}</p>
      <img src={match.thumbnail_url} className="h-24 mt-4" />
      <p className="text-[8px]">
        Due to youtube policy image will not be shown in screenshoot *
      </p>
      <div className="mt-4">
        <h4 className="font-semibold">Teams</h4>
        {Object.keys(match.teams).map((team) => (
          <p key={team}>
            Team {team}: Score - {match.teams[team].score}
          </p>
        ))}
      </div>
      <div className="mt-2">
        <h4 className="font-semibold">Key Moments</h4>
        {match.key_moments.slice(0, 3).map((moment, index) => (
          <p key={index}>
            {formatTime(moment.start_time)} - {formatTime(moment.end_time)}:{" "}
            {moment.description}
          </p>
        ))}
      </div>
    </div>
  );
};

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
};

export default ShareableCard;

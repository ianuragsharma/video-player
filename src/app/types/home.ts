type KeyMoment = {
  time: number;
  description: string;
  start_time: number;
  end_time: number;
};

type TeamStatistics = {
  calories_burned: number;
  shot_accuracy: number;
};

type Match = {
  session_id: number;
  match_id: number;
  video_url: string;
  sport: string;
  type: string;
  teams: Record<string, { players: TeamStatistics[]; score: number }>;
  key_moments: KeyMoment[];
  start_time: string;
  thumbnail_url: string;
  end_time: string;
};

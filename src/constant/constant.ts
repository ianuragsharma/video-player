export const mockData = [
  {
    session_id: 1,
    match_id: 1,
    type: "1v1",
    sport: "badminton",
    thumbnail_url: "https://img.youtube.com/vi/QXCJYdN_ko8/maxresdefault.jpg",
    video_url: "https://www.youtube.com/watch?v=QXCJYdN_ko8",
    teams: {
      Sudeep: {
        players: [
          {
            statistics: {
              calories_burned: 100,
              shot_accuracy: 90,
            },
          },
        ],
        score: 21,
      },
      Saket: {
        players: [
          {
            statistics: {
              calories_burned: 80,
              shot_accuracy: 85,
            },
          },
        ],
        score: 19,
      },
    },
    key_moments: [
      {
        time: 10,
        description: "Sudeep makes an aggressive serve and scores",
        start_time: 5,
        end_time: 18,
      },
      {
        time: 45,
        description: "Saket delivers a smash, gaining a point",
        start_time: 42,
        end_time: 48,
      },
      {
        time: 90,
        description: "Sudeep wins the rally with a quick return",
        start_time: 85,
        end_time: 95,
      },
      {
        time: 120,
        description: "Saket attempts a comeback but misses the point",
        start_time: 115,
        end_time: 125,
      },
    ],
    start_time: "2024-01-01T17:00:00Z",
    end_time: "2024-01-01T17:15:12Z",
  },
  {
    session_id: 2,
    match_id: 2,
    type: "2v2",
    sport: "badminton",
    thumbnail_url: "https://img.youtube.com/vi/5uGaG-Qb7wA/maxresdefault.jpg",
    video_url: "https://www.youtube.com/watch?v=5uGaG-Qb7wA",
    teams: {
      "Player A | Player B": {
        players: [
          {
            name: "Player A",
            statistics: {
              calories_burned: 120,
              shot_accuracy: 88,
            },
          },
          {
            name: "Player B",
            statistics: {
              calories_burned: 90,
              shot_accuracy: 82,
            },
          },
        ],
        score: 21,
      },
      "Player C | Player D": {
        players: [
          {
            name: "Player C",
            statistics: {
              calories_burned: 100,
              shot_accuracy: 85,
            },
          },
          {
            name: "Player D",
            statistics: {
              calories_burned: 95,
              shot_accuracy: 80,
            },
          },
        ],
        score: 18,
      },
    },
    key_moments: [
      {
        time: 15,
        description: "Player A delivers a fantastic smash",
        start_time: 4,
        end_time: 23,
      },
      {
        time: 60,
        description: "Player B scores with a smart drop shot",
        start_time: 58,
        end_time: 65,
      },
      {
        time: 110,
        description: "Player C makes an amazing save but Player A counters",
        start_time: 105,
        end_time: 115,
      },
      {
        time: 160,
        description:
          "Player D misses a crucial shot, giving a point to Player B",
        start_time: 157,
        end_time: 162,
      },
    ],
    start_time: "2024-01-01T16:47:34Z",
    end_time: "2024-01-01T16:58:24Z",
  },
  {
    session_id: 3,
    match_id: 3,
    type: "1v1",
    sport: "badminton",
    thumbnail_url: "https://img.youtube.com/vi/gUi1f1tIWE8/maxresdefault.jpg",
    video_url: "https://www.youtube.com/watch?v=gUi1f1tIWE8",
    teams: {
      "PV Sindhu": {
        players: [
          {
            statistics: {
              calories_burned: 110,
              shot_accuracy: 89,
            },
          },
        ],
        score: 21,
      },
      "Tai Tzu-Ying": {
        players: [
          {
            statistics: {
              calories_burned: 95,
              shot_accuracy: 83,
            },
          },
        ],
        score: 20,
      },
    },
    key_moments: [
      {
        time: 670,
        description: "PV Sindhu executes a perfect serve",
        start_time: 660,
        end_time: 700,
      },
      {
        time: 1020,
        description: "Tai Tzu-Ying dives and wins an incredible rally",
        start_time: 1000,
        end_time: 1100,
      },
      {
        time: 1500,
        description: "PV Sindhu dominates the rally with back-to-back smashes",
        start_time: 1480,
        end_time: 1580,
      },
    ],
    start_time: "2024-01-02T17:30:00Z",
    end_time: "2024-01-02T17:45:12Z",
  },
];

import axios from "axios";

export const fetchHighlights = async () => {
  const response = await axios.get("/api/highlights");
  console.log(response);

  return response.data;
};

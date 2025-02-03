import axios from "axios";

const API_URL = "https://gsi.fly.dev";

const apiClient = axios.create({
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// API call to get all characters
export const getCharacters = async () => {
  try {
    const response = await apiClient.get("https://gsi.fly.dev/characters");
    return response.data;
  } catch (error) {
    console.error("Error getting characters", error);
    throw error;
  }
};

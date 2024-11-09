import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const getMasterData = async (types: string[]) => {
  try {
    const typeQuery = types.join(",");
    const response = await axios.get(`${API_URL}/master?type=${typeQuery}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching master data:", error);
    throw new Error("Failed to fetch master data");
  }
};

export default { getMasterData };

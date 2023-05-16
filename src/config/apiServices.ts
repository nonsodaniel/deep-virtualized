import axios from "axios";

export const Get = async (url: string) => {
  try {
    return await axios.get(url);
  } catch (error) {
    throw error;
  }
};

import axios from "axios";

const API = "http://localhost:5000/api/auth";

export const registerUser = async (email, password) => {
  try {
    const res = await axios.post(`${API}/register`, {
      email,
      password,
    });
    return res.data;
  } catch (error) {
    console.error("Registration error:", error.response?.data || error.message);
    throw error;
  }
};

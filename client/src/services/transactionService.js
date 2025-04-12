import axios from "axios";
import API_URL from "../config/api";

const TRANSACTIONS_URL = `${API_URL}/transactions`;

// ✅ Earn Credits
export const earnCredits = async (skillId) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No authentication token found");
  }
  
  console.log(`Earning credits for skill: ${skillId}`);
  
  const res = await axios.post(
    `${TRANSACTIONS_URL}/earn`,
    { skillId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  
  console.log("Earn credits response:", res.data);
  return res.data;
};

// ✅ Spend Credits
export const spendCredits = async (skillId) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No authentication token found");
  }
  
  console.log(`Spending credits for skill: ${skillId}`);
  
  const res = await axios.post(
    `${TRANSACTIONS_URL}/spend`,
    { skillId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  
  console.log("Spend credits response:", res.data);
  return res.data;
};

// ✅ Get Transaction History
export const getTransactionHistory = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No authentication token found");
  }
  
  console.log("Fetching transaction history...");
  
  const response = await axios.get(TRANSACTIONS_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  console.log("Transaction history response:", response.data);
  return response.data;
};

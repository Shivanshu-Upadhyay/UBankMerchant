import axios from "axios";
const Token = localStorage.getItem('user');
console.log(Token);
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  headers: {
    "content-type": "multipart/form-data",
    Authorization: `Bearer ${Token}`,
  },
});

// 🧑‍💻 Dashboard Endpoints 🧑‍💻
export const card_data = () => api.post("card_data");
export const success_rate = () => api.post("success_rate");
export const payment_type = () => api.post("payment_type");
export const dbycurrency = (data) => api.post("dbycurrency", data);
export const top_transaction_today = (data) =>api.post("top_transaction_today", data);
// ❌ Dashboard Endpoints End ❌

export const statusResult = () => api.post("statusResult");
// CHANGEPASSWORD
export const changePass = (data) => api.post("changePassword-merchant", data);
export const subMerchant = () => api.post("submerchant");

export default api;

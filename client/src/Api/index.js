import axios from "axios";
import baseUrl from "../components/config/baseUrl";
const Token = localStorage.getItem('user');
const Api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  headers: {
    "content-type": "multipart/form-data",
    Authorization: `Bearer ${Token}`,
  },
});

// 🧑‍💻 Dashboard Endpoints 🧑‍💻
export const card_data = () => Api.post("card_data");
export const success_rate = () => Api.post("success_rate");
export const payment_type = () => Api.post("payment_type");
export const dbycurrency = (data) => Api.post("dbycurrency", data);
export const top_transaction_today = (data) =>Api.post("top_transaction_today", data);
// ❌ Dashboard Endpoints End ❌

export const statusResult = () => Api.post("statusResult");
// CHANGEPASSWORD
export const changePass = (data) => Api.post("changePassword-merchant", data);

export default Api;

import axios from "axios";

const api = axios.create({
  baseURL: "https://my-finance-neto.azurewebsites.net",
});


export default api;
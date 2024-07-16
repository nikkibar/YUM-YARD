import axios from "axios";

// export const API_URL = "http://localhost:5454";
export const API_URL = "https://sincere-dream-production.up.railway.app:5454";

export const api = axios.create({
    baseURL: API_URL, // Corrected from baseURl to baseURL
    headers: {
        "Content-Type": "application/json",
    }
});

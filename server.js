import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const BASE_URL = "https://api.wetravel.com/v2";
const API_KEY = process.env.VITE_API_KEY;

async function getAccessToken() {
  const response = await fetch(`${BASE_URL}/auth/tokens/access`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({ grant_type: "client_credentials" }),
  });
  const data = await response.json();
  if (!data.access_token) {
    throw new Error("Failed to get access token: " + JSON.stringify(data));
  }
  return data.access_token;
}

app.get("/api/draft_trips", async (req, res) => {
  try {
    const accessToken = await getAccessToken();
    const tripsResponse = await fetch(`${BASE_URL}/draft_trips`, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
    });
    const tripsData = await tripsResponse.json();
    if (!tripsResponse.ok) {
      console.error("Trips API error:", tripsData);
      return res.status(500).json({ error: "Failed to fetch draft trips", details: tripsData });
    }
    res.json(tripsData);
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Failed to get draft trips", details: err.message });
  }
});

app.get("/api/draft_trips/:uuid/images", async (req, res) => {
  try {
    const accessToken = await getAccessToken();
    const { uuid } = req.params;
    const imagesResponse = await fetch(`${BASE_URL}/draft_trips/${uuid}/images`, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
    });
    const imagesData = await imagesResponse.json();
    if (!imagesResponse.ok) {
      console.error("Images API error:", imagesData);
      return res.status(500).json({ error: "Failed to fetch images", details: imagesData });
    }
    res.json(imagesData);
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Failed to get images", details: err.message });
  }
});



app.listen(3001, () => console.log("Proxy server running on port 3001"));
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

// Obtener todos los párrafos de un trip
app.get("/api/draft_trips/:uuid/paragraphs", async (req, res) => {
  try {
    const accessToken = await getAccessToken();
    const { uuid } = req.params;
    console.log('Buscando párrafos para el trip:', uuid);
    const paragraphsResponse = await fetch(`${BASE_URL}/draft_trips/${uuid}/paragraphs`, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
    });
    const paragraphsData = await paragraphsResponse.json();
    console.log('Respuesta de párrafos:', JSON.stringify(paragraphsData, null, 2));
    if (!paragraphsResponse.ok) {
      console.error("Paragraphs API error:", paragraphsData);
      return res.status(500).json({ error: "Failed to fetch paragraphs", details: paragraphsData });
    }
    res.json(paragraphsData);
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Failed to get paragraphs", details: err.message });
  }
});

// Obtener un párrafo específico por ID
app.get("/api/draft_trips/:uuid/paragraphs/:id", async (req, res) => {
  try {
    const accessToken = await getAccessToken();
    const { uuid, id } = req.params;
    console.log('Buscando párrafo específico - Trip:', uuid, 'Párrafo ID:', id);
    const paragraphResponse = await fetch(`${BASE_URL}/draft_trips/${uuid}/paragraphs/${id}`, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
    });
    const paragraphData = await paragraphResponse.json();
    console.log('Respuesta de párrafo específico:', JSON.stringify(paragraphData, null, 2));
    if (!paragraphResponse.ok) {
      console.error("Paragraph API error:", paragraphData);
      return res.status(500).json({ error: "Failed to fetch paragraph", details: paragraphData });
    }
    res.json(paragraphData);
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Failed to get paragraph", details: err.message });
  }
});

// Obtener detalles del trip
app.get("/api/draft_trips/:uuid", async (req, res) => {
  try {
    const accessToken = await getAccessToken();
    const { uuid } = req.params;
    console.log('Buscando detalles del trip:', uuid);
    const response = await fetch(`${BASE_URL}/draft_trips/${uuid}`, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    console.log('Respuesta de detalles del trip:', JSON.stringify(data, null, 2));
    if (!response.ok) {
      console.error("Trip details API error:", data);
      return res.status(500).json({ error: "Failed to fetch trip details", details: data });
    }
    res.json(data);
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Failed to get trip details", details: err.message });
  }
});

// Obtener items incluidos
app.get("/api/draft_trips/:uuid/included_items", async (req, res) => {
  try {
    const accessToken = await getAccessToken();
    const { uuid } = req.params;
    console.log('Buscando items incluidos del trip:', uuid);
    const response = await fetch(`${BASE_URL}/draft_trips/${uuid}/included_items`, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    console.log('Respuesta de items incluidos:', JSON.stringify(data, null, 2));
    if (!response.ok) {
      console.error("Included items API error:", data);
      return res.status(500).json({ error: "Failed to fetch included items", details: data });
    }
    res.json(data);
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Failed to get included items", details: err.message });
  }
});

// Obtener paquetes del trip
app.get("/api/draft_trips/:uuid/packages", async (req, res) => {
  try {
    const accessToken = await getAccessToken();
    const { uuid } = req.params;
    console.log('Buscando paquetes del trip:', uuid);
    const response = await fetch(`${BASE_URL}/draft_trips/${uuid}/packages`, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    console.log('Respuesta de paquetes:', JSON.stringify(data, null, 2));
    if (!response.ok) {
      console.error("Packages API error:", data);
      return res.status(500).json({ error: "Failed to fetch packages", details: data });
    }
    res.json(data);
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Failed to get packages", details: err.message });
  }
});

// Obtener plan de pago de un paquete
app.get("/api/draft_trips/:uuid/packages/:packageId/payment_plan", async (req, res) => {
  try {
    const accessToken = await getAccessToken();
    const { uuid, packageId } = req.params;
    console.log('Buscando plan de pago - Trip:', uuid, 'Package ID:', packageId);
    const response = await fetch(`${BASE_URL}/draft_trips/${uuid}/packages/${packageId}/payment_plan`, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    console.log('Respuesta de plan de pago:', JSON.stringify(data, null, 2));
    if (!response.ok) {
      console.error("Payment plan API error:", data);
      return res.status(500).json({ error: "Failed to fetch payment plan", details: data });
    }
    res.json(data);
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Failed to get payment plan", details: err.message });
  }
});

// Obtener descripciones del trip
app.get("/api/trips/:uuid/content/descriptions", async (req, res) => {
  try {
    const accessToken = await getAccessToken();
    const { uuid } = req.params;
    console.log('Buscando descripciones del trip:', uuid);
    const response = await fetch(`${BASE_URL}/trips/${uuid}/content/descriptions`, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    console.log('Respuesta de descripciones:', JSON.stringify(data, null, 2));
    if (!response.ok) {
      console.error("Descriptions API error:", data);
      return res.status(500).json({ error: "Failed to fetch descriptions", details: data });
    }
    res.json(data);
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Failed to get descriptions", details: err.message });
  }
});

// Obtener disponibilidad del trip
app.get("/api/trips/:uuid/availability", async (req, res) => {
  try {
    const accessToken = await getAccessToken();
    const { uuid } = req.params;
    console.log('Buscando disponibilidad del trip:', uuid);
    const response = await fetch(`${BASE_URL}/trips/${uuid}/availability`, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    console.log('Respuesta de disponibilidad:', JSON.stringify(data, null, 2));
    if (!response.ok) {
      console.error("Availability API error:", data);
      return res.status(500).json({ error: "Failed to fetch availability", details: data });
    }
    res.json(data);
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Failed to get availability", details: err.message });
  }
});

// Obtener opciones de precio del trip
app.get("/api/trips/:uuid/pricing", async (req, res) => {
  try {
    const accessToken = await getAccessToken();
    const { uuid } = req.params;
    console.log('Buscando opciones de precio del trip:', uuid);
    const response = await fetch(`${BASE_URL}/trips/${uuid}/pricing`, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    console.log('Respuesta de opciones de precio:', JSON.stringify(data, null, 2));
    if (!response.ok) {
      console.error("Pricing options API error:", data);
      return res.status(500).json({ error: "Failed to fetch pricing options", details: data });
    }
    res.json(data);
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Failed to get pricing options", details: err.message });
  }
});

// Obtener políticas del trip
app.get("/api/trips/:uuid/policies", async (req, res) => {
  try {
    const accessToken = await getAccessToken();
    const { uuid } = req.params;
    console.log('Buscando políticas del trip:', uuid);
    const response = await fetch(`${BASE_URL}/trips/${uuid}/policies`, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    console.log('Respuesta de políticas:', JSON.stringify(data, null, 2));
    if (!response.ok) {
      console.error("Policies API error:", data);
      return res.status(500).json({ error: "Failed to fetch policies", details: data });
    }
    res.json(data);
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Failed to get policies", details: err.message });
  }
});

// Endpoint para recibir datos de contacto y enviar correo
app.post("/api/contact", async (req, res) => {
  const { nombre, email, select_country, phone, mensaje } = req.body;
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "Nuevo mensaje de contacto desde la web",
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>País:</strong> ${select_country}</p>
        <p><strong>Teléfono:</strong> ${phone}</p>
        <p><strong>Mensaje:</strong><br/>${mensaje}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.json({ ok: true, message: "Mensaje enviado correctamente" });
  } catch (error) {
    console.error("Error enviando correo:", error);
    res.status(500).json({ ok: false, error: "No se pudo enviar el mensaje" });
  }
});

app.listen(3001, () => console.log("Proxy server running on port 3001"));
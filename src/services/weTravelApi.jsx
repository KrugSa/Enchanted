// Constantes para la API
const BASE_URL = 'http://localhost:3001/api';

// Obtener todas las imágenes individuales de un tour (con detalles)
export async function getAllTripImages(uuid, imageId) {
  const response = await fetch(`${BASE_URL}/draft_trips/${uuid}/images/${imageId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch all images");
  }
  return response.json();
}
// Obtener un párrafo específico por su ID
export async function getTripParagraphById(uuid, paragraphId) {
  const response = await fetch(`${BASE_URL}/draft_trips/${uuid}/paragraphs/${paragraphId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch paragraph by id");
  }
  return response.json();
}

export async function getDraftTrips() {
  const response = await fetch(`${BASE_URL}/draft_trips`);
  if (!response.ok) {
    throw new Error("Failed to fetch draft trips");
  }
  return response.json();
}

export async function getDraftTripImages(uuid) {
  const response = await fetch(`${BASE_URL}/draft_trips/${uuid}/images`);
  if (!response.ok) {
    throw new Error("Failed to fetch images");
  }
  return response.json();
}

export async function getTripDetails(uuid) {
  const response = await fetch(`${BASE_URL}/draft_trips/${uuid}`);
  if (!response.ok) {
    throw new Error("Failed to fetch trip details");
  }
  return response.json();
}


export async function getTripParagraphs(uuid) {
  const response = await fetch(`${BASE_URL}/draft_trips/${uuid}/paragraphs`);
  if (!response.ok) {
    throw new Error("Failed to fetch trip paragraphs");
  }
  return response.json();
}




// Items incluidos en el tour
export async function getTripIncludedItems(uuid) {
  const response = await fetch(`${BASE_URL}/draft_trips/${uuid}/included_items`);
  if (!response.ok) {
    throw new Error("Failed to fetch included items");
  }
  return response.json();
}

// Paquetes del tour
export async function getTripPackages(uuid) {
  const response = await fetch(`${BASE_URL}/draft_trips/${uuid}/packages`);
  if (!response.ok) {
    throw new Error("Failed to fetch packages");
  }
  return response.json();
}

// Plan de pago de un paquete
export async function getTripPackagePaymentPlan(uuid, packageId) {
  const response = await fetch(`${BASE_URL}/draft_trips/${uuid}/packages/${packageId}/payment_plan`);
  if (!response.ok) {
    throw new Error("Failed to fetch payment plan");
  }
  return response.json();
}

export async function getTripDescriptions(uuid) {
  const response = await fetch(`${BASE_URL}/trips/${uuid}/content/descriptions`, {
    method: 'GET',
    headers: HEADERS
  });
  if (!response.ok) {
    throw new Error("Failed to fetch trip descriptions");
  }
  return response.json();
}

// Nuevo endpoint para obtener la disponibilidad
export async function getTripAvailability(uuid) {
  const response = await fetch(`${BASE_URL}/trips/${uuid}/availability`, {
    method: 'GET',
    headers: HEADERS
  });
  if (!response.ok) {
    throw new Error("Failed to fetch trip availability");
  }
  return response.json();
}

// Nuevo endpoint para obtener los precios y opciones
export async function getTripPricingOptions(uuid) {
  const response = await fetch(`${BASE_URL}/trips/${uuid}/pricing`, {
    method: 'GET',
    headers: HEADERS
  });
  if (!response.ok) {
    throw new Error("Failed to fetch trip pricing options");
  }
  return response.json();
}

// Nuevo endpoint para obtener las políticas del tour
export async function getTripPolicies(uuid) {
  const response = await fetch(`${BASE_URL}/trips/${uuid}/policies`, {
    method: 'GET',
    headers: HEADERS
  });
  if (!response.ok) {
    throw new Error("Failed to fetch trip policies");
  }
  return response.json();
}
export async function getDraftTrips() {
  const response = await fetch("http://localhost:3001/api/draft_trips");
  if (!response.ok) {
    throw new Error("Failed to fetch draft trips");
  }
  return response.json();
}


export async function getDraftTripImages(uuid) {
  const response = await fetch(`http://localhost:3001/api/draft_trips/${uuid}/images`);
  if (!response.ok) {
    throw new Error("Failed to fetch images");
  }
  return response.json();
}
import axios from "axios";

const ai21Api = axios.create({
  baseURL: "https://api.ai21.com/studio/v1",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
  },
});

const unsplashApi = axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    Authorization: `Client-ID ${import.meta.env.VITE_ACCESS_KEY}`,
  },
});

// Fetch Itinerary from OpenAI
export const fetchItinerary = async (params) => {
  const { destination, preferences, duration, budget, dateOfTravel } = params;
  const dateRange = Object.values(dateOfTravel);
  const response = await ai21Api.post("/chat/completions", {
    model: "jamba-1.5-large",
    messages: [
      {
        role: "user",
        content: `You are an AI travel planner. Please generate a detailed travel itinerary based on the following user inputs:

1. **City/Country Name(s)**: ${destination}
2. **Duration of Stay**: ${duration}
3. **Date of Travel**: from ${dateRange[0]} to ${
          dateRange[1]
        } (ps: it will be date range)
4. **Travel Preferences**: ${preferences} (e.g., adventure, relaxation, family, solo)
5. **Budget Constraints**: ${budget} (e.g., low-budget, mid-range, luxury)

Your response should include the following sections:

1. **Destination_Overview**:
   - Name: combination of ${destination
     .split(/[,|-]/)[0]
     .trim()}, ${duration}, ${preferences} and ${budget}. 
   - Description: A brief description of the ${destination}.

2. **Itinerary**:
   - **Day 1**:
     - Activities: List of activities with descriptions and time using 12 hours system also include the activities which will be happening between date of travel.
   - **Day 2**:
     - Activities: List of activities with descriptions and time from moring to night also include the activities which will be happening between date of travel.
   - (Continue for the ${duration} of the stay)

3. **Nearby_Attractions**:
   - Name: The name of the attraction.
   - Description: A brief description of the attraction.

4. **Restaurants**:
   - Name: The name of the restaurant.
   - Description: A brief description of the restaurant.

5. **Travel_Tips**:
   - Tips: Practical travel tips specific to the ${destination}, including transportation and local customs, use friendly and casual tone.
6. **Commute_Options**:
   - Tips: Availabe commute options inside ${destination}, use friendly and casual tone.

Please ensure that each section is clearly labeled and formatted as a JSON object with keys for each piece of information. Use a descriptive and engaging tone to provide a comprehensive travel plan.
`,
      },
    ],
    max_tokens: 4096,
    n: 1,
    top_p: 1,
    temperature: 0.7,
  });
  return JSON.parse(response.data.choices[0].message.content);
};

// Fetch Images from Unsplash
export const fetchImages = async (query) => {
  const response = await unsplashApi.get("/search/photos", {
    params: { query, per_page: 1 }, // Adjust `per_page` as needed
  });
  return response.data.results[0].urls.regular; // Adjust the size as needed
};

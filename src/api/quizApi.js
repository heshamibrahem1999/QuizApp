const API_URL = 'https://quizapi.io/api/v1/questions';
const API_KEY = 'C1Neco1IYvLHOb8oGvQnoQzoWHYyDRbYF3sRj48G';

export async function fetchQuestions(options = {}) {
  const {
    limit = 10,
    category,
    difficulty,
    tags,
  } = options;

  const params = new URLSearchParams();
  params.append('apiKey', API_KEY);

  if (limit) params.append('limit', limit);
  if (category) params.append('category', category);
  if (difficulty) params.append('difficulty', difficulty.toLowerCase());
  if (tags) params.append('tags', tags);

  const url = `${API_URL}?${params.toString()}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  const data = await res.json();
  return data || [];
}

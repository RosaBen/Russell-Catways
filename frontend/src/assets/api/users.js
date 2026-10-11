const API_URL = "http://localhost:3000/api";

// AUTH

/**
 * Login
 *
 * @export
 * @async
 * @param {credentials} 
 * @returns {Promise} 
 */
export async function login (credentials) {
  const response = await fetch(`${API_URL}/login`, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(credentials)
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "erreur lors de la connexion");
  }

  return response.json();

}
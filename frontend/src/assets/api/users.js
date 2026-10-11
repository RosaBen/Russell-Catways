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

/**
 * 
 * 
 * @function logout
 * @returns promise
 */
export async function logout () {
  const response = await fetch(`${API_URL}/logout`, {
    method: "get",
    credentials: "include"
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "erreur lors de la déconnexion");
  }

  return data;
}

// USERS

/**
 * Create a user
 *
 * @export
 * @async
 * @param {FormData} user 
 * @returns {Promise} 
 */
export async function createUser (user) {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(user)
  });
  if (!response.ok) {
    throw new Error("unable to create user");
  }

  return response.json();
}

/**
 * get all users
 *
 * @export
 * @async
 * @returns {Promise} 
 */
export async function getAllUsers () {
  const response = await fetch(`${API_URL}/users`, {
    method: "get",
    credentials: "include",
    cache: "no-store"
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}
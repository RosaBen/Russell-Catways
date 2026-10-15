const API_URL = "http://localhost:3000/api";



// CATWAYS

/**
 * Create a catway
 *
 * @export
 * @async
 * @param {FormData} catway 
 * @returns {Promise} 
 */
export async function createCatway (catway) {
  const response = await fetch(`${API_URL}/catways`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(catway)
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
}

/**
 * get all catways
 *
 * @export
 * @async
 * @returns {Promise} 
 */
export async function getAllCatways () {
  const response = await fetch(`${API_URL}/catways`, {
    method: "get",
    credentials: "include",
    cache: "no-store"
  });

  const data = await response.json();
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return data;
}

/**
 * get a catway with catwayNumber
 *
 * @export
 * @param {catwayNumber}catwayNumber
 * @async
 * @returns {Promise} 
 */
export async function getCatway (catwayNumber) {
  const response = await fetch(`${API_URL}/catways/${catwayNumber}`, {
    method: "get",
    credentials: "include",
    cache: "no-store"
  });

  const data = await response.json();
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return data;
}

/**
 * edit a catway
 *
 * @export
 * @param {catwayNumber, catwaydata}
 * @async
 * @returns {Promise} 
 */
export async function EditCatway (catwayNumber, catway) {
  const response = await fetch(`${API_URL}/catways/${catwayNumber}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(catway)
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
}

/**
 * delete a catway
 *
 * @export
 * @param {catwayNumber}
 * @async
 * @returns {Promise} 
 */
export async function deleteCatway (catwayNumber) {
  const response = await fetch(`${API_URL}/catways/${catwayNumber}`, {
    method: "delete",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("unable to delete catway");
  }

  return response.json();
}
const BASE_URL = "http://test.ecomdata.co.uk/api";

// Login Function
export const login = async (username, password) => {

  console.log({ username, password });

  const res = await fetch(`${BASE_URL}/token/`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  return await res.json();
};

// Refresh Token Functionr
export const refreshToken = async (refreshToken) => {
  try {
    const response = await fetch(`${BASE_URL}/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });
    return response.json();
  } catch (error) {
    console.error("Error during token refresh:", error);
  }
};

// Other API calls...

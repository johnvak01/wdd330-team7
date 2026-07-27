const baseURL = import.meta.env.VITE_SERVER_URL;
const checkoutURL = `${baseURL}checkout`;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ExternalServices {
  constructor() { }

  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);

    return data.Result;
  }

  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);

    return data.Result;
  }

  // search logic
  async searchProducts(query) {

    const response = await fetch(
      `${baseURL}products/search/${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      return [];
    }

    const data = await convertToJson(response);

    return data.Result;
  }

  // Checkout Order Submission
  async checkout(order) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    };

    const response = await fetch(checkoutURL, options);

    return convertToJson(response);
  }
}

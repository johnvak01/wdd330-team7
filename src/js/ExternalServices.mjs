const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  let result = res.json();
  console.log(result);
  if (res.ok) {
    return result;
  } else {
    throw { message: "Bad Response", status: res.status, statusText: result };
  };
}

export default class ExternalServices {
  constructor() { }

  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);

    return data.Result
  }

  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);

    return data.Result;
  }
  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    return await fetch(`${baseURL}checkout/`, options).then(convertToJson);
  }
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
}

const baseURL = import.meta.env.VITE_SERVER_URL
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor(category) {
  }
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`)
      .then(convertToJson)
      .then((data) => data);
    return response.Result;
  }
  async findProductById(id) {
    const product = await fetch(`${baseURL}product/${id}`).then(convertToJson).then((data) => data.Result);
    console.log(product);
    return product;
  }
}

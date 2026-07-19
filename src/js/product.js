import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const dataSource = new ProductData();
const productId = getParam("product");

const product = new ProductDetails(productId, dataSource);
product.init();

loadHeaderFooter();

// add to cart button event handler
// async function addToCartHandler(e) {
//   const productData = await dataSource.findProductById(e.target.dataset.id);
//   addProductToCart(productData);
//     console.log("test");
// }

// // add listener to Add to Cart button
// document
//   .getElementById("addToCart")
//   .addEventListener("click", addToCartHandler);

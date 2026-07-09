import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProjectDetails.mjs";


const dataSource = new ProductData("tents");
const productId = getParam("product");

const product = new ProductDetails(productId, dataSource);
product.init();

// add to cart button event handler
// async function addToCartHandler(e) {
//   const productData = await dataSource.findProductById(e.target.dataset.id);
//   addProductToCart(productData);
// }

// add listener to Add to Cart button

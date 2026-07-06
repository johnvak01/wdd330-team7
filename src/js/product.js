import { setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import { getLocalStorage } from "./utils.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  const cart = getLocalStorage("so-cart");
  let cartArray;
  if (cart == null) {
    cartArray = [product];
  } else {
    cart.push(product);
    cartArray = cart;
  }
  setLocalStorage("so-cart", cartArray);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
//setLocalStorage("so-cart", product);

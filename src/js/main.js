import Alert from "./alerts.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import ProductSort from "./ProductSort.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const productData = new ProductData("tents");
const alert = new Alert("/json/alerts.json");
alert.init();

const productList = new ProductList(
  "tents",
  productData,
  document.querySelector(".product-list"),
);

async function init() {
  // Load and display products
  const products = await productList.init();

  // Create sorting object
  const productSort = new ProductSort(products);

  // Listen for sorting option changes
  const sortSelect = document.querySelector("#sort-products");

  sortSelect.addEventListener("change", (event) => {
    const sortedProducts = productSort.sort(event.target.value);

    productList.renderList(sortedProducts);
  });

  loadHeaderFooter();
}

init();

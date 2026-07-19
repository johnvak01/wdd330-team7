import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import ProductSort from "./ProductSort.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");

const title = document.querySelector("#product-title");

if (title && category) {
  const formattedCategory = category
    .replace("-", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

  title.textContent = `Top Products: ${formattedCategory}`;
}

const productData = new ProductData();

const productList = new ProductList(
  category,
  productData,
  document.querySelector(".product-list"),
);

async function init() {
  const products = await productList.init();

  const productSort = new ProductSort(products);

  const sortSelect = document.querySelector("#sort-products");

  if (sortSelect) {
    sortSelect.addEventListener("change", (event) => {
      const sortedProducts = productSort.sort(event.target.value);

      productList.renderList(sortedProducts);
    });
  }
}

init();

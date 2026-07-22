import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import ProductSort from "./ProductSort.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");
const searchTerm = getParam("search");

const title = document.querySelector("#product-title");

if (title) {
  if (searchTerm) {
    title.textContent = `Search Results: ${searchTerm}`;
  } else if (category) {
    const formattedCategory = category
      .replace("-", " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());

    title.textContent = `Top Products: ${formattedCategory}`;
  }
}

const productData = new ProductData();

const productList = new ProductList(
  category,
  productData,
  document.querySelector(".product-list"),
);

async function init() {
  let products;

  if (searchTerm) {
    products = await productData.searchProducts(searchTerm);

    if (!products || products.length === 0) {
      document.querySelector(".product-list").innerHTML = `
      <li class="no-results">No products found for "${searchTerm}"</li>
      `;

      return;
    }

    productList.renderList(products);
  } else {
    products = await productList.init();
  }

  const productSort = new ProductSort(products);

  const sortSelect = document.querySelector("#sort-products");

  if (sortSelect) {
    sortSelect.addEventListener("change", (event) => {
      productList.renderList(productSort.sort(event.target.value));
    });
  }
}

init();

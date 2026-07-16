import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

// pass the product data as a string
const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");

const productList = new ProductList("tents", dataSource, listElement);

productList.init();

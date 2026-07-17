import { loadHeaderFooter, getParam} from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();
const category = getParam('category');
console.log(category);
const dataSource = new ProductData(category);
const listElement = document.querySelector(".product-list");
const myList = new ProductList(category, dataSource, listElement);

const listTitle = document.querySelector(".products h2");
listTitle.textContent = `Top Products: ${category}`;

myList.init();

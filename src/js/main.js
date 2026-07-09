import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';

const PData = new ProductData("tents");
const element = document.querySelector(".product-list");
const PList = new ProductList("Tents", PData, element);
PList.init();

console.log(PList);
console.log("finished");
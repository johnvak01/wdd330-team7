import { getCurrentLocation, displayLocation } from "./location.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

// pass the product data as a string
const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");

const productList = new ProductList("tents", dataSource, listElement);

// display the current location of the user/visitor
async function initLocation() {
  try {
    await getCurrentLocation();
    displayLocation("#location-message");

    // Only load products after location is granted
    productList.init();
  } catch (error) {
    document.querySelector("main").innerHTML = `
        <div class="location-denied">
            <h2>Location Access Required</h2>
            <p>You must allow location access to use this website.</p>
            <p>Please enable location permission in your browser settings and reload the page.</p>
        </div>
    `;
  }
}

initLocation();

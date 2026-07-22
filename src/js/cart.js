import { getLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  document.querySelectorAll(".remove-item").forEach((button) => {
  button.addEventListener("click", removeFromCart);
  });

  const cartFooter = document.querySelector(".cart-footer");

  if (cartItems.length > 0) {
    cartFooter.classList.remove("hide");
  }

  const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);

  document.querySelector(".cart-total").innerHTML =
    `Total: $${total.toFixed(2)}`;
}

function removeFromCart(event) {
  const productId = event.target.dataset.id;

  const cartItems = getLocalStorage("so-cart") || [];

  const itemIndex = cartItems.findIndex((item) => item.Id === productId);

  if (itemIndex !== -1) {
    cartItems.splice(itemIndex, 1);
  }

  localStorage.setItem("so-cart", JSON.stringify(cartItems));

  renderCartContents();
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <button class="remove-item" data-id="${item.Id}" type="button">
    X
  </button>

  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimaryMedium}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
loadHeaderFooter();

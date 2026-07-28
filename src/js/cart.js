import { getLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", removeFromCart);
  });

  document.querySelectorAll(".quantity-input").forEach((input) => {
    input.addEventListener("change", updateQuantity);
  });

  const cartFooter = document.querySelector(".cart-footer");

  if (cartItems.length > 0) {
    cartFooter.classList.remove("hide");
  }

  const total = cartItems.reduce(
    (sum, item) => sum + item.FinalPrice * item.quantity,
    0,
  );

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

function updateQuantity(event) {
  const productId = event.target.dataset.id;
  const newQuantity = Number(event.target.value);

  const cartItems = getLocalStorage("so-cart") || [];

  const cartItem = cartItems.find((product) => product.Id === productId);

  if (cartItem && newQuantity >= 1) {
    cartItem.quantity = newQuantity;
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
    <label class="cart-card__quantity">
      Qty:
      <input
        type="number"
        class="quantity-input"
        data-id="${item.Id}"
        value="${item.quantity}"
        min="1"
      />
    </label>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
loadHeaderFooter();

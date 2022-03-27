import data from "./data.js";

const productsContainer = document.querySelector(".all-product");
//const cartContainer = document.querySelector(".cartContainer");
//const listOfCarts = document.querySelector(".cart-list");
//const totalPrice = document.querySelector(".totalPrice");
const cartInfo = document.querySelector(".cart-info");
let dataTORender = data;

function generateHtml() {
  dataTORender.forEach(function (data) {
    productsContainer.innerHTML += `<div class = "products">
                                          <div style= "background-image: url(${data.image})"
                                          class="image-products" alt = "${data.category}"></div>
                                          <h4>${data.title}</h4>
                                          <p>US $${data.price}</p>
                                          <button class="cart" data-result="${data.id}" >Add to cart</button>
                                    </div>`;
  });
}
generateHtml();

let cartArray = [];
const addToCart = document.querySelectorAll(".cart");
for (let i = 0; i < addToCart.length; i++) {
  addToCart[i].addEventListener("click", (event) => {
    if (
      cartArray.some((product) => product.id == event.target.dataset.result)
    ) {
      alert("product is already in the cart");
    } else {
      const itemToAdd = dataTORender.find(
        (product) => product.id == event.target.dataset.result
      );
      cartArray.push(itemToAdd);
      cartInfo.innerHTML = cartArray.length;
      cartNumbers(itemToAdd[i]);
      localStorage.setItem("cartNumber", JSON.stringify(cartArray.length));
    }
  });
}
function counterIFOnLoad() {
  const cartCounter = cartInfo;
  let storedCartCount = localStorage.getItem("cartNumbers");

  if (storedCartCount) {
    cartCounter.textContent = storedCartCount;
  }
}
function cartNumbers() {
  let productNumbers = parseInt(localStorage.getItem("cartNumbers", 1));

  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    cartInfo.textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    cartInfo.textContent = productNumbers = 1;
  }
}
counterIFOnLoad();

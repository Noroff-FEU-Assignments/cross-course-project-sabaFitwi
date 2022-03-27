import data from "./data.js";

const productsContainer = document.querySelector(".all-product");
const cartInfo = document.querySelector(".cart-info");
let dataTORender = data;
let cartArray = [];
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

const addToCart = document.querySelectorAll(".cart");
for (let i = 0; i < addToCart.length; i++) {
  addToCart[i].addEventListener("click", (event) => {
    if (
      cartArray.find((product) => product.id == event.target.dataset.result)
    ) {
      alert("product is already in the cart");
    } else {
      const itemToAdd = dataTORender.find(
        (product) => product.id == event.target.dataset.result
      );
      cartArray.push(itemToAdd);
      cartInfo.innerHTML = cartArray.length;
      localStorage.setItem("cart", JSON.stringify(cartArray));
    }
  });
}

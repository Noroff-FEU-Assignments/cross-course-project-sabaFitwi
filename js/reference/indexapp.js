const productsContainer = document.querySelector(".all-product");
const cartItemsButton = document.querySelector("div.shopping-cart");

const url = "https://fakestoreapi.com/products";

let cartArray = [];

getProducts();

async function getProducts() {
  try {
    const response = await fetch(url);
    const data = await response.json();

    generateHtml(data);
  } catch (error) {
    productsContainer.innerHTML = displayError(
      "Sorry, unexpected error occurred!"
    );
    productsContainer.classList.add("error");
  }
}

function generateHtml(results) {
  productsContainer.innerHTML = "";

  if (results) {
    results.map(function (result) {
      productsContainer.innerHTML += `<div class = "products">
                                        <div style= "background-image: url(${result.image})" class="image-products" alt = "${result.category}" class=p></div>
                                          <h4>${result.title}</h4>
                                          <p>USD ${result.price}</p>
                                          <button class="cart" data-result="${result.id}" >Add to cart</button>
                                     </div>`;
    });

    productsContainer.classList.remove("error");
  }
  // add to cart

  const addToCart = document.querySelectorAll(".cart");
  for (let i = 0; i < addToCart.length; i++) {
    addToCart[i].addEventListener("click", (event) => {
      //cartNumbers(results[i]);
      //totalCost(results[i]);
      //createCartItem(results[i]);
      if (
        cartArray.some((product) => product.id == event.target.dataset.result)
      ) {
        alert("product is already in the cart");
      } else {
        const itemToAdd = results.find(
          (product) => product.id == event.target.dataset.result
        );
        cartArray.push({
          ...itemToAdd,
          inCart: 1,
        });
        console.log(cartArray);
      }
    });
    updateCartItem();
  }
}

function updateCartItem() {
  createCartItem();
  // createSubTotal();
}
//create cart Items

function createCartItem() {
  cartItemsButton.innerHTML = "";

  cartArray.forEach((item) => {
    cartItemsButton.innerHTML += `<div class="shopping-cart_checkbox">
    <input type="checkbox" />
  </div>
  <div class="checkout-product-image">
    <h3 class="title">product</h3>
    <img src="images/W1.jpg" alt="Hiking Jackets for Men's" />
  </div>
  <div class="checkout-product_size">
    <h3 class="title">detail</h3>
    <h2 class="title-margin">Hiking Jacket</h2>
    <p>Size : S</p>
  </div>
  <div class="quantity">
    <h3 class="title">quantity</h3>
    <label for="quantity"></label>
    <input
      id="quantity"
      class="title-margin"
      type="number"
      value="1"
    />
  </div>
  <div class="checkout-product_price">
    <h3 class="title">price</h3>
    <p class="title-margin">$500</p>
  </div>

    `;
  });
}

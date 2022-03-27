import data from "./data.js";

const productsContainer = document.querySelector(".all-product");

let dataTORender = data;

function generateHtml() {
  dataTORender.forEach(function (data) {
    productsContainer.innerHTML += `<div class = "products">
                                   <div style= "background-image: url(${data.image})" class="image-products" alt = "${data.category}" class=p></div>
                                   <h4>${data.title}</h4>
                                   <p>USD ${data.price}</p>
                                   <button class="cart" data-result="${data.id}" >Add to cart</button>
                                   </div>`;
  });
}
generateHtml();

let cartArray = [];
const addToCart = document.querySelectorAll(".cart");
for (let i = 0; i < addToCart.length; i++) {
  addToCart[i].addEventListener("click", (event) => {
    //cartNumbers();
    //totalCost(results[i]);
    //createCartItem(dataTORender[i]);

    if (
      cartArray.some((product) => product.id == event.target.dataset.result)
    ) {
      alert("product is already in the cart");
    } else {
      const itemToAdd = dataTORender.find(
        (product) => product.id == event.target.dataset.result
      );
      cartArray.push({
        ...itemToAdd,
        inCart: 1,
      });
      console.log(cartArray);
    }
    console.log("hi");
  });
  onLoadCartNumber();
}

function onLoadCartNumber(product) {
  const cartCounter = document.querySelector(".cart-icon span");
  let productNumbers = localStorage.getItem("cartNumbers");

  if (productNumbers) {
    cartCounter.textContent = productNumbers;
  }
}
function cartNumbers(product) {
  // console.log("hi", product);
  let productNumbers = localStorage.getItem("cartNumbers", 1);
  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".cart-icon span").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".cart-icon span").textContent = productNumbers = 1;
  }
  setItems(product);
}

function setItems(product) {
  let cartItems = localStorage.getItem("cart");
  cartItems = JSON.parse(cartItems);
  if (cartItems != null) {
    if (cartItems[product.id] == undefined) {
      cartItems = {
        ...cartItems,
        [product.id]: product,
      };
    }
    cartItems[product.id].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      ...cartItems,
      [product.id]: product,
    };
  }
  localStorage.setItem("cart", JSON.stringify(cartItems));
}
// function updateCartItem() {
//   createCartItem();
//   // createSubTotal();
// }
// //create cart Items

// function createCartItem() {
//   //cartItemsButton.innerHTML = "";
//   const cartItemsButton = document.querySelector("div.shopping-cart");
//   cartArray.forEach((item) => {
//     cartItemsButton.innerHTML += `<div class="shopping-cart_checkbox">
//     <input type="checkbox" />
//   </div>
//   <div class="checkout-product-image">
//     <h3 class="title">product</h3>
//     <div style= "background-image: url(${item.image})"  alt="Hiking Jackets for Men's" />
//   </div>
//   <div class="checkout-product_size">
//     <h3 class="title">detail</h3>
//     <h2 class="title-margin">${item.title}</h2>
//     <p>Size : S</p>
//   </div>
//   <div class="quantity">
//     <h3 class="title">quantity</h3>
//     <label for="quantity"></label>
//     <input
//       id="quantity"
//       class="title-margin"
//       type="number"
//       value="1"
//     />
//   </div>
//   <div class="checkout-product_price">
//     <h3 class="title">price</h3>
//     <p class="title-margin">$500</p>
//   </div>

//     `;
//   });
// }

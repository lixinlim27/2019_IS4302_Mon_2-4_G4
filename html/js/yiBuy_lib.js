const url = "http://localhost:8080/YiBuy-war/webresources";


/**
 * Product
 */
function getDisplayProducts(cb) {
    $.get(url + "/products/displayItems")
        .done(cb);
}

function getProductById(id, cb) {
    $.get(url + "/products/" + id)
    .done(cb);
}

function searchProducts(input, cb) {
    var keyword = input.keyword;
    var sId = input.sId;
    $.get(url + "/products/search?keyword=" + keyword)
    .done(cb);
}

function getProductsByShop(cb){
    var user = localStorage.getItem("user");
    user = JSON.parse(user);
    if (user.role !== "seller"){
        return
    }
    $.get(url + "/sellers/products/" + user.id)
    .done(cb);
}

function getProductHtml(id, name, price, rating) {
    let productLink = "product.html?id=" + id;

    let ratingStr = "";
    for (var i = 0; i < 5; i++) {
        if (i < rating) {
            if (rating - i > 1) {
                ratingStr = ratingStr + ` <i class="fa fa-star red"></i>`;
            } else {
                ratingStr = ratingStr + ` <i class="fa fa-star-half-o red" aria-hidden="true"></i>`;
            }
        } else {
            ratingStr = ratingStr + `<i class="fa fa-star-o empty"></i>`;
        }
    }
    return ` <div class="col-md-3 col-xs-6">
               <div class="product">
               <div class="product-img">
                 <img src="./img/product07.png" alt="" />
               </div>
               <div class="product-body">
                 <p class="product-category">Category</p>
                 <h3 class="product-name">
                   <a href="${productLink}"> ${name} </a>
                 </h3>
                 <h4 class="product-price"> $${price}</h4>
                 <div class="product-rating"> ${ratingStr}</div>
               </div>
               <div class="add-to-cart">
                 <button class="add-to-cart-btn" productId=${id} price=${price} productName=${name}>
                   <i class="fa fa-shopping-cart"></i> add to cart
                 </button>
               </div>
             </div>
           </div>`;
}

function appendProducts(data){
    $("#products").html(function () {
        const largeNewLine = `<div class="clearfix visible-lg visible-md"></div>`;
        const smallNewLine = ` <div class="clearfix visible-sm visible-xs"></div>`;
        let products = "";
        data.forEach((p, i) => {
            products = products + getProductHtml(p.id, p.name, p.price, 3.5);
            if ((i + 1) % 4 === 0) {
                products = products.concat(largeNewLine);
            }
            if ((i + 1) % 2 === 0) {
                products = products.concat(smallNewLine);
            }
        })
        return products;
    });
}

function getProductSellerHtml(id, name, price, rating) {
  let productLink = "product.html?id=" + id;

  let ratingStr = "";
  for (var i = 0; i < 5; i++) {
    if (i < rating) {
      if (rating - i > 1) {
        ratingStr = ratingStr + ` <i class="fa fa-star red"></i>`;
      } else {
        ratingStr =
          ratingStr +
          ` <i class="fa fa-star-half-o red" aria-hidden="true"></i>`;
      }
    } else {
      ratingStr = ratingStr + `<i class="fa fa-star-o"></i>`;
    }
  }
  return ` <div class="col-md-3 col-xs-6">
               <div class="product">
               <div class="product-img">
                 <img src="./img/product07.png" alt="" />
               </div>
               <div class="product-body">
                 <p class="product-category">Category</p>
                 <h3 class="product-name">
                   <a href="${productLink}"> ${name} </a>
                 </h3>
                 <h4 class="product-price"> $${price}</h4>
                 <div class="product-rating"> ${ratingStr}</div>
               </div>
               <div class="add-to-cart">
                 <button class="add-to-cart-btn" productId=${id} price=${price} productName=${name}>
                   <i class="fa fa-edit"></i> Edit
                 </button>
               </div>
             </div>
           </div>`;
}

function appendProductsSeller(data) {
    $("#products").html(function () {
        const largeNewLine = `<div class="clearfix visible-lg visible-md"></div>`;
        const smallNewLine = ` <div class="clearfix visible-sm visible-xs"></div>`;
        let products = "";
        data.forEach((p, i) => {
            products = products + getProductSellerHtml(p.id, p.name, p.price, 3.5);
            if ((i + 1) % 4 === 0) {
                products = products.concat(largeNewLine);
            }
            if ((i + 1) % 2 === 0) {
                products = products.concat(smallNewLine);
            }
        })
        return products;
    });
}

function addToCart(id, amount, price, name) {
    var purchase = {
        product: {
            id: id,
            price: price,
            name: name
        },
        amount: amount
    }
    var cart = localStorage.getItem("cart");
    if (cart) {
        cart = JSON.parse(cart)
    } else {
        cart = [];
    }
    cart.push(purchase);
    localStorage.setItem("cart", JSON.stringify(cart));
    var cartStore = localStorage.getItem("cart")
    console.log(JSON.parse(cartStore))
}

function checkout(cb) {
    var cart = localStorage.getItem("cart");
    var payload = {
        list: JSON.parse(cart)
    }
    $.post(url + "/buyers/checkout", JSON.stringify(payload))
    .done(cb)
}

function pay(cb) {
    var cart = localStorage.getItem("cart");
    cart = JSON.parse(cart);
    order = {
        list: cart,
        card: {
            number: 1234567890,
            expiryYear: 2019,
            expiryMonth: 9,
            issuer: "VISA",
            holderName: "Joe Doe"
        },
        isNewCard: false
    }
    var payload = order
    var user = localStorage.getItem("user");
    user = JSON.parse(user);
    console.log(payload)
    $.ajax({
        type: "PUT",
        url: url + "/buyers/pay/" + user.id,
        data: JSON.stringify(payload),
        dataType: 'json',
        contentType: 'application/json',
        success: function () {
            localStorage.removeItem("cart")      
            window.location.href = "index.html"
            $.notify("Order has been successfully placed.", "success")
        },
        error: function () {
            $.notify("Payment Failed")
        }
    });
}

function updateCart() {
    var cart = localStorage.getItem("cart");
    if (!cart){
        return
    }
    cart = JSON.parse(cart);
    var size = cart.length;
    $("#cart-list").html(function () {
        $("#cart-qty").removeAttr("hidden").html(size);
        var itemStr = "";
        console.log(cart)
        cart.forEach(e => {
            console.log(e)
            itemStr = itemStr + cartItemHtml(e.product.name, e.product.price, e.amount);
        })
        return itemStr;
    })
    $(".cart-summary").html(function (){
        var total = 0;
        cart.forEach(e => {
            total += e.amount * e.product.price;
        })
        return ` <small>${size} Item(s) selected</small>
            <h5>SUBTOTAL: $${total}</h5>`
    })
}

function cartItemHtml(name, price, qty) {
    return `<div class="product-widget">
						<div class="product-body">
							<h3 class="product-name">
								<a href="#">${name}</a>
							</h3>
							<h4 class="product-price">
								<span class="qty">${qty}x</span>$${price}
												</h4>
						</div>
						<button class="delete">
							<i class="fa fa-close"></i>
						</button>
					</div>`
}

function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

function getFeedbacks(pId, cb) {
    $.get(url + "/products/feedbacks/" + pId)
        .done(cb);
}

/**
 * Buyer
 */

 function getOrderHistory(cb) {
     var user = localStorage.getItem("user");
     user = JSON.parse(user);
     var api = url;
     if (user.role === "buyer") {
         api = api + "/buyers";
     } else {
         api = api + "/sellers";
     }
     $.get(api + "/orders/" + user.id)
         .done(cb);
 }
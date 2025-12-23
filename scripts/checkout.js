import {cart,deletefromcart} from'../data/cart.js';
import { products } from '../data/product.js';
import dayjs from'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryoptions } from '../data/deliveryoptions.js';

let matchingproduct;
let cartsummaryHtml='';

cart.forEach((cartitem)=>{
    const productId =cartitem.productId;

    products.forEach((product)=>{
        if(product.id===productId){
            matchingproduct=product;
        }
    })

    const deliveryOptionId=cartitem.deliveryOptionId;
    let deliveryoption;
    deliveryoptions.forEach((option)=>{
      if(option.id==deliveryOptionId){
        deliveryoption=option;
      }
    })
    const today=dayjs();
    const deliveryDate=today.add(deliveryoption.deliveryDays,'days');

    const datestring =deliveryDate.format('dddd,MMMM D');

    cartsummaryHtml+=`<div class="cart-item-container js-cart-item-container-${matchingproduct.id}">
            <div class="delivery-date">
              Delivery date: ${datestring}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingproduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingproduct.name};
                </div>
                <div class="product-price">
                  $${(matchingproduct.priceCents/100).toFixed(2)};
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartitem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingproduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryoptionsHtml(matchingproduct,cartitem)}
              </div>
            </div>
          </div>`;

})

function deliveryoptionsHtml(matchingproduct,cartitem){
  let html='';

  deliveryoptions.forEach((deliveryoption)=>{
    const today=dayjs();
    const deliveryDate=today.add(deliveryoption.deliveryDays,'days');

    const datestring =deliveryDate.format('dddd,MMMM D');

    const pricestring=deliveryoption.priceCents === 0
    ? 'FREE'
    : `$${(deliveryoption.priceCents / 100).toFixed(2)}`

    const ischecked=deliveryoption.id === cartitem.deliveryOptionId;

    html+=`
    <div class="delivery-option">
                  <input type="radio"
                    ${ischecked?'checked':''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingproduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${datestring}
                    </div>
                    <div class="delivery-option-price">
                      ${pricestring} - Shipping
                    </div>
                  </div>
                </div>`
  })
  return html;
}

document.querySelector('.js-order-summary').innerHTML=cartsummaryHtml;

document.querySelectorAll('.js-delete-link')
.forEach((link)=>{
  link.addEventListener('click',()=>{
    const productId=link.dataset.productId;
    deletefromcart(productId);
    const container=document.querySelector(`.js-cart-item-container-${productId}`);
    container.remove();
  })
})
console.log(cart);

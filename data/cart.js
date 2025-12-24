export let cart=JSON.parse(localStorage.getItem('cart'));

if(!cart){
  cart=[{
  productId:'54e0eccd-8f36-462b-b68a-8182611d9add',
  quantity:2,
  deliveryOptionId:'1'
},{
  productId:'3ebe75dc-64d2-4137-8860-1f5a963e534b',
  quantity:2,
  deliveryOptionId:'2'
}];
}



function saveToStorage(){
  localStorage.setItem("cart",JSON.stringify(cart))
}

export function deletefromcart(productId){
    const newcart=[];
    cart.forEach((cartitem)=>{
        if(productId!==cartitem.productId){
          newcart.push(cartitem);
        }
    })
    cart=newcart;
    saveToStorage();
}
export function addtocart(productId){
  let matchingitem;
    cart.forEach((cartitem)=>{
      if(productId===cartitem.productId){
        matchingitem=cartitem;
      }
    })
    if(matchingitem){
      matchingitem.quantity+=1;
    }else{
      cart.push({
      productId:productId,
      quantity:1,
      deliveryOptionId:'1'
    })
    }
    saveToStorage();
}

export function updatedeliveryoption(productId,deliveryOptionId){
  let matchingitem;
    cart.forEach((cartitem)=>{
      if(productId===cartitem.productId){
        matchingitem=cartitem;
      }
    })
    matchingitem.deliveryOptionId=deliveryOptionId;

    saveToStorage();  

}
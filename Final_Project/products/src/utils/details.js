export function showAddedToCartMessage(productName) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('added-to-cart-message');
    messageContainer.textContent = `The product, "${productName}", has been added to the cart!`;
 
    const detailsContainer = document.getElementById('details');
    detailsContainer.parentNode.insertBefore(messageContainer, detailsContainer);
    
    setTimeout(() => {
       messageContainer.parentNode.removeChild(messageContainer);
    }, 3000);
 }	

//  export function showAlreadyInCartMessage(productName) {
//     const messageContainer = document.createElement('div');
//     messageContainer.classList.add('added-to-cart-message');
//     messageContainer.textContent = `Produsul "${productName}" se află deja în coșul de cumpărături.`;
 
//     const detailsContainer = document.getElementById('details');
//     detailsContainer.parentNode.insertBefore(messageContainer, detailsContainer);
 
//     setTimeout(() => {
//        messageContainer.parentNode.removeChild(messageContainer);
//     }, 3000);
//  }
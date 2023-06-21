import { getProductById } from '../../api/getProductById';
import { createProductDetailsCard } from '../../components/productDetailsCard';
import { addProductToCart } from '../../utils/cart';
import {showAddedToCartMessage} from '../../utils/details';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get('id');

window.addEventListener('load', async () => {
   const product = await getProductById(productId);

   document.getElementById('details').innerHTML =
      createProductDetailsCard(product);
});

document.getElementById('details').addEventListener('click', async (e) => {
   if (e.target.classList.contains('add-to-cart-btn')) {
      addProductToCart(productId);
      const productName = document.getElementById('details').querySelector('p:first-child').textContent;
      showAddedToCartMessage(productName);
   }
});




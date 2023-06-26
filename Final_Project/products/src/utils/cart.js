import { getProductById } from "../api/getProductById";

export const addProductToCart = (id) => {
	const cart = localStorage.getItem('cart');
	let cartArray = [];
	if (cart == null) {
		cartArray.push({ id: id, quantity: 1 });
		localStorage.setItem('cart', JSON.stringify(cartArray));
	} else {
		cartArray = JSON.parse(cart);
		if (isProductAlreadyInCart(id, cartArray)) {
			incrementProductQuantity(id, cartArray);
		} else {
			cartArray.push({ id: id, quantity: 1 });
		}
		localStorage.setItem('cart', JSON.stringify(cartArray));
	}
};

function isProductAlreadyInCart(id, cartArray) {
	const product = cartArray.find((product) => product.id === id);

	return product !== undefined;
}

export function incrementProductQuantity(id, cartArray) {
	const product = cartArray.find((product) => product.id === id);

	if (product != undefined) {
		product.quantity++;
	}
}

export function decrementProductQuantity(id, cartArray) {
	const product = cartArray.find((product) => product.id === id);

	if (product != undefined) {
		product.quantity--;
	}

	if (product.quantity === 0) {
		removeProductFromCart(id, cartArray);
	}
}

export function removeProductFromCart(id, cartArray) {
	if (!Array.isArray(cartArray)) {
	  return;
	}
  
	const productIndex = cartArray.findIndex((item) => item.id === id);
	if (productIndex !== -1) {
	  cartArray.splice(productIndex, 1);
	}
  }

  export const calculateTotal = async () => {
	const cartArray = JSON.parse(localStorage.getItem('cart')) || [];
	let total = 0;
  
	for (const product of cartArray) {
	  const productInfo = await getProductById(product.id);
	  total += productInfo.price * product.quantity;
	}
  
	const totalElement = document.getElementById('total');
	totalElement.textContent = `Total: $ ${total.toFixed(2)}`;
  };

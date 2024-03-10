const Products = [
    { id: 1, name: 'Product-1', price: 100 },
    { id: 2, name: 'Product-2', price: 200 },
    { id: 3, name: 'Product-3', price: 300 },
  ];
  
  const productList = document.getElementById('productList');
  const cart = document.getElementById('cart');
  const totalAmount = document.getElementById('totalPrice');
  
  let cartItems = [];
  
  const addToCart = (product) => {
    const existingCartItem = cartItems.find(item => item.id === product.id);
    if (existingCartItem) {
      existingCartItem.quantity++;
    } else {
      cartItems.push({ ...product, quantity: 1 });
    }
    renderCart();
  };
  
  const removeFromCart = (product) => {
    const existingCartItemIndex = cartItems.findIndex(item => item.id === product.id);
    if (existingCartItemIndex !== -1) {
      const existingCartItem = cartItems[existingCartItemIndex];
      if (existingCartItem.quantity === 1) {
        cartItems.splice(existingCartItemIndex, 1);
      } else {
        existingCartItem.quantity--;
      }
    }
    renderCart();
  };
  
  const renderCart = () => {
    cart.innerHTML = '';
    let totalPrice = 0;
  
    cartItems.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.innerHTML = `
        <span>${item.name} - ${item.price.toFixed(2)}</span>
        <button class="removeBtn">-</button>
        <span class="quantity">${item.quantity}</span>
      `;
      cart.appendChild(cartItem);
  
      const removeBtn = cartItem.querySelector('.removeBtn');
      removeBtn.addEventListener('click', () => removeFromCart(item));
  
      totalPrice += item.price * item.quantity;
    });
  
    // Update totalAmount textContent without the dollar sign
    totalAmount.textContent = totalPrice.toFixed(2);
  };
  
  Products.forEach(product => {
    const productItem = document.createElement('div');
    productItem.classList.add('product-item');
    productItem.innerHTML = `
      <span>${product.name} - ${product.price.toFixed(2)}</span>
      <button class="addBtn">+</button>
    `;
    productList.appendChild(productItem);
  
    const addBtn = productItem.querySelector('.addBtn');
    addBtn.addEventListener('click', () => addToCart(product));
  });
  
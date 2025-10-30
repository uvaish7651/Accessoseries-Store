import express from 'express';
import { addToCart, clearCart, decreaseProductQty, removeProductFromCart, userCart } from '../Controllers/cart.js';
import { Authenticated } from '../Middlewares/auth.js';

const router = express.Router();

// Add to cart
router.post('/add', Authenticated, addToCart);

// Get user cart
router.get('/user', Authenticated, userCart);

// Remove product from cart
router.delete('/remove/:productId', Authenticated, removeProductFromCart);

// Clear cart
router.delete('/clear', Authenticated, clearCart);

// Decrease product qty
router.post('/--qty', Authenticated, decreaseProductQty);

export default router;

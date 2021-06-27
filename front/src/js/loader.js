import {cartload, fetchCartload, renderCart, setCartload} from "./cart.js";
import {getCatalog} from "./catalog.js";

fetchCartload();
getCatalog().then();
renderCart();

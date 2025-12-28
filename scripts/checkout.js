import {cart,deletefromcart,updatedeliveryoption} from'../data/cart.js';
import { products } from '../data/product.js';
import dayjs from'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryoptions } from '../data/deliveryoptions.js';

import { renderdeliveryoption } from './checkout/ordersummary.js';
import { renderpaymentsummary } from './checkout/paymentsummary.js';



renderdeliveryoption();
renderpaymentsummary();
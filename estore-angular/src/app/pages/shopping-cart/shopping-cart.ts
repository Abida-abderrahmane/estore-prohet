import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './shopping-cart.html',
  styleUrls: ['./shopping-cart.scss']
})
export class ShoppingCartComponent {
  cartItems = [
    { id: 1, name: 'Lumina X1 Headphones', category: 'Electronics', price: 299.99, quantity: 1 },
    { id: 2, name: 'Apex Running Shoes', category: 'Sports', price: 149.99, quantity: 2 },
    { id: 3, name: 'Smart Watch Pro', category: 'Electronics', price: 399.99, quantity: 1 },
  ];
  couponCode = '';
  discount = 0;

  get subtotal(): number {
    return this.cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  }
  get shipping(): number { return this.subtotal > 50 ? 0 : 9.99; }
  get total(): number { return this.subtotal + this.shipping - this.discount; }

  updateQty(item: any, qty: number) {
    if (qty >= 1 && qty <= 10) item.quantity = qty;
  }
  removeItem(id: number) {
    this.cartItems = this.cartItems.filter(i => i.id !== id);
  }
  applyCoupon() {
    if (this.couponCode.toUpperCase() === 'SAVE10') this.discount = this.subtotal * 0.1;
  }
}

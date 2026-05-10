import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './my-orders.html',
  styleUrls: ['./my-orders.scss']
})
export class MyOrdersComponent {
  activeTab = 'all';
  tabs = ['all', 'processing', 'shipped', 'delivered', 'cancelled'];

  orders = [
    { id: 'ORD-001245', date: 'Jun 12, 2024', items: 3, total: 749.97, status: 'delivered', products: ['Lumina X1 Headphones', '+2 more'] },
    { id: 'ORD-001180', date: 'Jun 5, 2024', items: 1, total: 149.99, status: 'shipped', products: ['Apex Running Shoes'] },
    { id: 'ORD-001103', date: 'May 28, 2024', items: 2, total: 489.98, status: 'processing', products: ['Smart Watch Pro', '+1 more'] },
    { id: 'ORD-001055', date: 'May 15, 2024', items: 1, total: 89.99, status: 'delivered', products: ['Minimal Desk Lamp'] },
    { id: 'ORD-000989', date: 'May 1, 2024', items: 2, total: 114.99, status: 'cancelled', products: ['Casual Linen Shirt', '+1 more'] },
  ];

  get filteredOrders() {
    if (this.activeTab === 'all') return this.orders;
    return this.orders.filter(o => o.status === this.activeTab);
  }

  statusClass(status: string): string {
    const map: Record<string, string> = {
      delivered: 'bg-green-100 text-green-700',
      shipped: 'bg-blue-100 text-blue-700',
      processing: 'bg-yellow-100 text-yellow-700',
      cancelled: 'bg-red-100 text-red-700',
    };
    return map[status] || 'bg-gray-100 text-gray-700';
  }
}

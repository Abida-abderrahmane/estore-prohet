import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent {
  categories = [
    { name: 'Electronics', icon: 'devices', count: '1,240 items' },
    { name: 'Fashion', icon: 'checkroom', count: '3,580 items' },
    { name: 'Home & Living', icon: 'weekend', count: '890 items' },
    { name: 'Sports', icon: 'sports_soccer', count: '560 items' },
    { name: 'Books', icon: 'menu_book', count: '2,100 items' },
    { name: 'Beauty', icon: 'spa', count: '740 items' },
  ];

  featuredProducts = [
    { id: 1, name: 'Lumina X1 Headphones', price: 299.99, category: 'Electronics', rating: 4.8, reviews: 1240, badge: 'Best Seller' },
    { id: 2, name: 'Apex Running Shoes', price: 149.99, category: 'Sports', rating: 4.6, reviews: 832, badge: 'New' },
    { id: 3, name: 'Minimal Desk Lamp', price: 89.99, category: 'Home & Living', rating: 4.7, reviews: 567, badge: null },
    { id: 4, name: 'Smart Watch Pro', price: 399.99, category: 'Electronics', rating: 4.9, reviews: 2100, badge: 'Top Rated' },
  ];
}

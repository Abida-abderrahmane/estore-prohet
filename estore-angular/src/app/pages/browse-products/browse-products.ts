import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-browse-products',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './browse-products.html',
  styleUrls: ['./browse-products.scss']
})
export class BrowseProductsComponent {
  searchQuery = '';
  selectedSort = 'popular';

  categories = ['Electronics', 'Fashion', 'Home & Living', 'Sports', 'Books', 'Beauty'];
  selectedCategories: string[] = [];
  priceRange = 500;

  products = [
    { id: 1, name: 'Lumina X1 Headphones', price: 299.99, category: 'Electronics', rating: 4.8, reviews: 1240, badge: 'Best Seller' },
    { id: 2, name: 'Apex Running Shoes', price: 149.99, category: 'Sports', rating: 4.6, reviews: 832, badge: 'New' },
    { id: 3, name: 'Minimal Desk Lamp', price: 89.99, category: 'Home & Living', rating: 4.7, reviews: 567, badge: null },
    { id: 4, name: 'Smart Watch Pro', price: 399.99, category: 'Electronics', rating: 4.9, reviews: 2100, badge: 'Top Rated' },
    { id: 5, name: 'Casual Linen Shirt', price: 59.99, category: 'Fashion', rating: 4.3, reviews: 310, badge: null },
    { id: 6, name: 'Yoga Mat Premium', price: 45.00, category: 'Sports', rating: 4.5, reviews: 780, badge: null },
    { id: 7, name: 'Scented Candle Set', price: 34.99, category: 'Home & Living', rating: 4.4, reviews: 220, badge: 'New' },
    { id: 8, name: 'Wireless Charger Pad', price: 29.99, category: 'Electronics', rating: 4.2, reviews: 450, badge: null },
    { id: 9, name: 'Novel: The Last Light', price: 18.99, category: 'Books', rating: 4.8, reviews: 1560, badge: 'Best Seller' },
    { id: 10, name: 'Face Serum Vitamin C', price: 55.00, category: 'Beauty', rating: 4.6, reviews: 690, badge: null },
    { id: 11, name: 'Trail Running Jacket', price: 179.00, category: 'Sports', rating: 4.7, reviews: 340, badge: null },
    { id: 12, name: 'Leather Wallet Slim', price: 49.99, category: 'Fashion', rating: 4.5, reviews: 508, badge: null },
  ];

  get filteredProducts() {
    return this.products.filter(p =>
      p.price <= this.priceRange &&
      (this.selectedCategories.length === 0 || this.selectedCategories.includes(p.category)) &&
      (this.searchQuery === '' || p.name.toLowerCase().includes(this.searchQuery.toLowerCase()))
    );
  }

  toggleCategory(cat: string) {
    const idx = this.selectedCategories.indexOf(cat);
    if (idx === -1) this.selectedCategories.push(cat);
    else this.selectedCategories.splice(idx, 1);
  }

  isCategorySelected(cat: string): boolean {
    return this.selectedCategories.includes(cat);
  }
}

import { Component, signal } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.scss']
})
export class ProductDetailsComponent {
  quantity = 1;
  selectedImage = 0;
  selectedColor = 'Midnight Black';
  addedToCart = false;

  product = {
    name: 'Lumina X1 High-Fidelity Headphones',
    category: 'Electronics',
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.8,
    reviews: 1240,
    description: 'Experience audio in its purest form. The Lumina X1 headphones deliver studio-quality sound with an innovative hybrid driver system. Crafted from premium aerospace aluminum and memory foam cushions for all-day comfort.',
    features: [
      '40-hour battery life with ANC enabled',
      'Hybrid Active Noise Cancellation',
      'Hi-Res Audio certified (up to 96kHz/24bit)',
      'Multi-device Bluetooth 5.3 connectivity',
      'Premium aluminum build with memory foam cushions',
    ],
    colors: ['Midnight Black', 'Pearl White', 'Cobalt Blue'],
    images: [0, 1, 2, 3],
  };

  increaseQty() { if (this.quantity < 10) this.quantity++; }
  decreaseQty() { if (this.quantity > 1) this.quantity--; }

  addToCart() {
    this.addedToCart = true;
    setTimeout(() => this.addedToCart = false, 2000);
  }
}

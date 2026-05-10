import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent) },
  { path: 'products', loadComponent: () => import('./pages/browse-products/browse-products').then(m => m.BrowseProductsComponent) },
  { path: 'products/:id', loadComponent: () => import('./pages/product-details/product-details').then(m => m.ProductDetailsComponent) },
  { path: 'cart', loadComponent: () => import('./pages/shopping-cart/shopping-cart').then(m => m.ShoppingCartComponent) },
  { path: 'orders', loadComponent: () => import('./pages/my-orders/my-orders').then(m => m.MyOrdersComponent) },
  { path: 'profile', loadComponent: () => import('./pages/my-profile/my-profile').then(m => m.MyProfileComponent) },
  { path: 'register', loadComponent: () => import('./pages/register/register').then(m => m.RegisterComponent) },
  { path: 'login', loadComponent: () => import('./pages/login/login').then(m => m.LoginComponent) },
  { path: '**', redirectTo: 'home' },
];

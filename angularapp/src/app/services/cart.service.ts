import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OrderItem } from '../models/order-item.model';
import { Product } from '../models/product.model';
 
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: OrderItem[] = [];
  private readonly cartSubject = new BehaviorSubject<OrderItem[]>(this.cartItems);
 
  constructor() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cartItems = JSON.parse(storedCart);
      this.cartSubject.next(this.cartItems);
    }
  }
 
  private updateStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }
 
  addToCart(product: Product, quantity: number): void {
    const existingItem = this.cartItems.find(item => item.productId === product.productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      const orderItem: OrderItem = {
        productId: product.productId,
        productName: product.productName,
        quantity: quantity,
        price: product.price
      };
      this.cartItems.push(orderItem);
    }
    this.cartSubject.next(this.cartItems);
    this.updateStorage();
  }
 
  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.productId !== productId);
    this.cartSubject.next(this.cartItems);
    this.updateStorage();
  }
 
  getCartItems(): OrderItem[] {
    return [...this.cartItems];
  }
 
  clearCart(): void {
    this.cartItems = [];
    this.cartSubject.next(this.cartItems);
    localStorage.removeItem('cart');
  }
}
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderItem } from 'src/app/models/order-item.model';
import { Order } from 'src/app/models/order.model';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
declare var bootstrap: any; // Bootstrap modal handling
 
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems: OrderItem[] = [];
  userId: number;
  checkoutForm: FormGroup;
  orderId!: number;
  orderStatus!: string;
 
  constructor(
    private readonly cartService: CartService,
    private readonly orderService: OrderService,
    private readonly fb: FormBuilder
  ) {}
 
  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.userId = +localStorage.getItem('userId');
 
    this.checkoutForm = this.fb.group({
      shippingAddress: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9,-\\s]+$')]],
      billingAddress: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9,-\\s]+$')]]
    });
  }
 
  placeOrder(): void {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }
 
    const order: Order = {
      orderDate: new Date().toISOString().split('T')[0],
      orderStatus: 'CONFIRMED', // Ensure the status is CONFIRMED
      shippingAddress: this.checkoutForm.value.shippingAddress,
      billingAddress: this.checkoutForm.value.billingAddress,
      totalAmount: this.getTotalPrice(),
      userId: this.userId,
      orderItems: this.cartItems
    };
 
    this.orderService.placeOrder(order).subscribe(
      (response) => {
        console.log('Order placed successfully', response);
        this.cartService.clearCart();
        this.cartItems = [];
        this.checkoutForm.reset();
 
        // Capture Order ID and Status dynamically
        this.orderId = response.orderId; // Assuming API returns orderId
        this.orderStatus = response.orderStatus;
 
        // Update modal content dynamically
        const modalElement = document.getElementById('orderSuccessModal');
        if (modalElement) {
          modalElement.querySelector('.modal-body')!.innerHTML = `
            <p>Your order has been placed successfully!</p>
            <p><strong>Order ID:</strong> ${this.orderId}</p>
            <p><strong>Status:</strong> ${this.orderStatus}</p>
          `;
        }
 
        // Show the modal
        const modalInstance = new bootstrap.Modal(modalElement);
        modalInstance.show();
      },
      (error) => {
        console.error('Failed to place order:', error);
      }
    );
  }
 
  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.cartItems = this.cartService.getCartItems();
  }
 
  clearCart(): void {
    this.cartService.clearCart();
    this.cartItems = [];
  }
 
  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}
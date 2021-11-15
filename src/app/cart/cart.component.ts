import { Component, OnInit } from '@angular/core';
import {BackendService} from '../service/backend.service';
import {Cart, Product} from '../entities/product';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart: Cart[];
  products: Product[]=[];
  product: Product;
  total_price: number;
  total_quantity: number;
  total: string;
  loading: boolean = true;

  constructor(private backend: BackendService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.backend.getCartProducts().then(res =>{
      this.loading = false;
      this.products = res;
      this.calculate();
    })
  }

  removeItem(id){
    this.calculate();
    this.backend.removeProduct(id).then(()=>{
      this.products = this.products.filter(product => product.id !== id);
    });
  }

  placeOrder(){
    this.backend.placeOrder(this.products).then(()=>{
      this.products = [];
    });
  }

  calculate(){
    this.total_price=0;
    this.total_quantity=0;
    this.products.forEach(product=>{
      this.total_price=this.total_price+(product.price*product.quantity);
      this.total_quantity+=product.quantity;
    });
    this.total=this.total_price.toFixed(2);
  }

}

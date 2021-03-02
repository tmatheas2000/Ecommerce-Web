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

  constructor(private backend: BackendService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.backend.getAllCart().then(res=>{
      this.cart=res;
      this.cart=this.cart.filter(res=>res.userId==3);
      this.cart.forEach(res=>{
        res.products.forEach(product=>{
          this.backend.getProductDetails(product.productId).then(data=>{
            this.product=data;
            this.product.quantity=product.quantity;
            this.products.push(this.product);
          })
        })
      })
    });
    setTimeout(() => {
      this.calculate();
    }, 5000)
  }

  removeItem(id){
    this.products = this.products.filter(product => product.id !== id);
    this.calculate();
    this.openSnackBar("Item Removed Successfully !");
  }

  removeAll(){
    this.products=[];
    this.calculate();
    this.openSnackBar("Items Removed Successfully !");

  }

  placeOrder(){
    this.openSnackBar("Order Placed Successfully !");
  }

  calculate(){
    this.total_price=0;
    this.total_quantity=0;
    this.products.forEach(product=>{
      this.total_price=this.total_price+(product.price*product.quantity);
      this.total_quantity+=product.quantity;
    })
    this.total=this.total_price.toFixed(2);
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 4000,
      verticalPosition: 'bottom',
    });
  }

}

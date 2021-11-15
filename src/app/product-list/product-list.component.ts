import { Component, OnInit } from '@angular/core';
import {Product} from '../entities/product';
import {BackendService} from '../service/backend.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[];

  constructor(private backend: BackendService) { }

  ngOnInit(): void {
    this.backend.getProducts().then(res=>this.products=res);
  }

  addToCart(product: Product){
    product.quantity = 1;
    this.backend.addToCart(product);
  }

}

import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Product} from '../entities/product';
import {BackendService} from '../service/backend.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[];

  constructor(private backend: BackendService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.backend.getProducts().then(res=>this.products=res);
  }

  addToCart(product:Product){
    console.log(product);
    this.openSnackBar("Item Added To Cart !");
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 4000,
      verticalPosition: 'bottom',
    });
  }

}

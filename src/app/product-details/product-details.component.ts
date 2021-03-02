import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from '../entities/product';
import { BackendService } from '../service/backend.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  id:any;
  product: Product;

  constructor(private backend: BackendService,
    private router: ActivatedRoute,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.router.params.subscribe((params: Params) => {
      this.id = params.id;
    });
    this.backend.getProductDetails(this.id).then(data=>{
      this.product=data;
    })
  }

  addToCart(){
    this.openSnackBar("Item Added To Cart !");
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 4000,
      verticalPosition: 'bottom',
    });
  }

}

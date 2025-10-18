import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from '../entities/product';
import { BackendService } from '../service/backend.service';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss'],
    standalone: false
})
export class ProductDetailsComponent implements OnInit {

  id:any;
  product: Product;

  constructor(private backend: BackendService,
    private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.params.subscribe((params: Params) => {
      this.id = params.id;
    });
    this.backend.getProductDetails(this.id).then(data=>{
      this.product=data;
    })
  }

  addToCart(){
    this.product.quantity = 1;
    this.backend.addToCart(this.product);
  }
}

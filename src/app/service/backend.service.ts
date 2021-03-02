import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor() { }

  getProducts(){
    return fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
  }

  getAllCart(){
    return fetch('https://fakestoreapi.com/carts')
            .then(res=>res.json())
  }

  getProductDetails(id){
    return fetch('https://fakestoreapi.com/products/'+id)
            .then(res=>res.json())
  }
}

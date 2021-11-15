import { Injectable, NgZone } from '@angular/core';
import { environment } from '../../environments/environment';
import { initializeApp } from "firebase/app";
import { Firestore, collection, getDocs, query, doc, deleteDoc, setDoc } from '@angular/fire/firestore';
import {Product} from '../entities/product'; 
import { MatSnackBar } from '@angular/material/snack-bar';
initializeApp(environment.firebaseConfig);

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(public ngZone: NgZone, private firestore: Firestore, private _snackBar: MatSnackBar) { }

  getProducts(){
    return fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
  }

  getProductDetails(id){
    return fetch('https://fakestoreapi.com/products/'+id)
            .then(res=>res.json())
  }

  async addToCart(data: Product): Promise<void> {
    try{
      await setDoc(doc(this.firestore, "cart",  'Product_' + data.id), data);
      this.openSnackBar("Item Added To Cart !");
    }
    catch(err){
      this.openSnackBar('Something went wrong !');
    };
  }

  async getCartProducts(): Promise<Product[]>{
    const products: Array<Product> = [];
    try{
      const q = query(collection(this.firestore, 'cart'));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const temp: Product = doc.data();
        products.push(temp);
      });
    }
    catch(err){
      this.openSnackBar('Something went wrong !');
    }
    return products;
  }

  async removeProduct(id): Promise<void>{
    try{
      await deleteDoc(doc(this.firestore, "cart", 'Product_'+ id));
      this.openSnackBar('Removed Successfully !');
    }
    catch(err){
      this.openSnackBar('Something went wrong !');
    };
  }

  async placeOrder(products: Product[]): Promise<void>{
    try{
      await products.forEach(product => {
        deleteDoc(doc(this.firestore, "cart", 'Product_'+ product.id));
      });
      this.openSnackBar('Order Placed Successfully !');
    }
    catch(err){
      this.openSnackBar('Something went wrong !');
    };
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 4000,
      verticalPosition: 'bottom',
    });
  }
}

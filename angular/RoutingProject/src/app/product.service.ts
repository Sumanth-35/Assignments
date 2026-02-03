import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private products = [
    { id: 1, name: 'laptop', price: '45000' },
    { id: 2, name: 'mobile', price: '25000' },
    { id: 3, name: 'tablet', price: '15000' },
  ];
  getProducts() {
    return this.products;
  }
  getProductById(id: number) {
    return this.products.find(product => product.id === id);
  }
  constructor() { }
}

import { Component } from '@angular/core';
 
@Component({
  selector: 'app-root',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
 
  productsNew = [
    {
      id:1,
      name:'Laptop',
      description: 'Laptop leovno',
      price: 34000,
      category:'Electronics'
    },
    {
      id:2,
      name:'SmartPhone',
      description: 'megapixel smartphone',
      price: 8000,
      category:'Electronics'
    },
    {
      id:3,
      name:'LED TV hd',
      description: 'Samsung LED TV',
      price: 10000,
      category:'Electronics'
    }
  ]
 
  selectedProduct = this.productsNew[0];  //default product
 
  selectProduct(product: any){
    this.selectedProduct = product
  }
 
}
 
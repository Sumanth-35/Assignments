import { Component } from '@angular/core';
import { ProductService } from './services/product.service';
import { Product } from './models/product.model';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  selectedCategory = 'All';
  sortOption = '';
  products: Product[] = [];  // empty array going to storethe product coming from the service class
 
  constructor(private productService: ProductService){} // injecting service into the component
 
  // GET: calling the service getProduct() method
  getAllProducts(){
    this.productService.getProducts().subscribe(data =>{
      console.log('GET:', data);
      this.products = data; //storing the data coming from service into the array declared above
    })
  }
 
  // POST: calling the service addProduct() method
  addProduct(){
    const newProduct:Product = { // this newProduct will be added to the server
       id:0,
       name:' Smart Watch',
       description : 'Wearable Device',
       price: 250,
       category:'Electronics'
    }
    this.productService.addProduct(newProduct).subscribe(data =>{
      console.log('POST:', data);
      this.getAllProducts();
    })
  }
 
  //PUT: callign the service updateProduct() method
  updateProduct(){
     const updatedProduct:Product = { // this newProduct will be added to the server
       id:1,
       name:' Smart Watch X series',
       description : 'Wearable Device with latest AI tech',
       price: 950,
       category:'Electronics'
    }
    this.productService.updateProduct(updatedProduct).subscribe(data =>{
      console.log('PUT:', data);
      this.getAllProducts();
    })
  }
 
  // DELETE: calling the service deelteProduct() method
  deleteProduct(){
  this.productService.deleteProduct(2).subscribe(() =>{
    console.log('DELETE: Product successfull');
    this.getAllProducts();
  })
  }
 
 
}

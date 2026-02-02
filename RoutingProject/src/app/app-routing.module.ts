import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

const routes: Routes = [
 { path:'products',component: ProductsComponent},
  { path:'products/:id',component: ProductDetailComponent},
{path:'',redirectTo:'/products',pathMatch:'full'},
{path:'**',redirectTo:'/products',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

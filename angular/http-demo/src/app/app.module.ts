import { NgModule } from '@angular/core';
import { BrowserModule,  } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductCategoryPipe } from './product-category.pipe';
import { FormsModule } from '@angular/forms';
import { ProductSortPipe } from './product-sort.pipe';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductCategoryPipe,
    ProductSortPipe,
    ProductListComponent,
    ProductDetailComponent
  ],
imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [ProductListComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from 'src/app/components/products/products.component';
import { ProductsListComponent } from 'src/app/components/products-list/products-list.component';
import { ProductsListItemComponent } from 'src/app/components/products-list-item/products-list-item.component';
import { ProductViewComponent } from 'src/app/components/product-view/product-view.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsRoutingModule } from './products-routing.module';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductsListComponent,
    ProductsListItemComponent,
    ProductViewComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ProductsRoutingModule,
  ],
})
export class ProductsModule {}

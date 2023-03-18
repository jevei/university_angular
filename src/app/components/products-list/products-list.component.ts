import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductApiRequestService } from 'src/app/services/product-api-request.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  get products(): Product[] {
    return this.apiService.products;
  }

  constructor(private apiService: ProductApiRequestService) {
    this.apiService.listProducts().subscribe((success) => {
      if (success) {
        console.log('OK');
      } else {
        console.log('ERROR', success);
        alert('ERROR!!!');
      }
    });
  }

  ngOnInit(): void {
    console.log('TEST:', this.products);
  }
}

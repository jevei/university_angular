import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductApiRequestService } from 'src/app/services/product-api-request.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css'],
})
export class ProductViewComponent implements OnInit {
  private _product: Product | null = null;

  get product(): Product {
    return this._product!;
  }

  constructor(
    private route: ActivatedRoute,
    private apiService: ProductApiRequestService,
    private router: Router
  ) {
    console.log('Product Input : ', this.route.snapshot.params['id']);
    this.apiService
      .showProduct(this.route.snapshot.params['id'])
      .subscribe((success) => {
        if (success) {
          console.log('OK', success);
          this._product = success as Product;
          console.log(this._product);
        } else {
          console.log('ERROR', success);
          alert('Produit innexistant.');
          this.router.navigate(['/products']);
        }
      });
  }

  ngOnInit(): void {}
}

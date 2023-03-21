import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProductApiRequestService } from 'src/app/services/product-api-request.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css'],
})
export class ProductViewComponent implements OnInit {
  deleteProductForm: FormGroup;

  private _product: Product | null = null;

  get product(): Product {
    return this._product!;
  }

  constructor(
    private authService: AuthService,
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
    this.deleteProductForm = new FormGroup({});
  }

  ngOnInit(): void {}

  isAdmin(): boolean {
    return this.authService.currentUser?.is_admin!;
  }

  deleteProduct() {
    console.log(this.product);
    this.apiService.deleteProduct(this.product).subscribe((success) => {
      if (success) {
        console.log('OK', success);
        this.apiService.listProducts().subscribe((success) => {
          if (success) {
            console.log('OK');
            this.router.navigate(['/products']);
          } else {
            console.log('ERROR');
            alert('ERROR!!!');
          }
        });
      } else {
        console.log('ERROR');
        alert('ERROR!!!');
      }
    });
  }
}

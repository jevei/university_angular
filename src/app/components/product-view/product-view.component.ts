import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  get stockQuantity(): number {
    return <number>this._stockQuantity;
  }

  set stockQuantity(value: number) {
    this._stockQuantity = value;
  }
  deleteProductForm: FormGroup;
  updateProductForm: FormGroup;


  private _product: Product | null = null;

  stockText: string = '';
  private _stockQuantity: number | undefined =this._product?.stock;
  checkStock(): void {
    if (this.stockQuantity > 0) {
      this.stockText = 'In stock';
    } else {
      this.stockText = 'Out of stock';
    }
  }


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
    this.updateProductForm = new FormGroup({
      name: new FormControl(''),
      stock: new FormControl(''),
      price: new FormControl(''),
      expiration: new FormControl(''),
      description: new FormControl(''),
      last_input: new FormControl(''),
      last_output: new FormControl(''),
    });
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

  updateProduct() {
    console.log(this.product);
    if (this.updateProductForm.get('name')?.value != '') {
      this.product.name = this.updateProductForm.get('name')?.value;
    }
    if (this.updateProductForm.get('stock')?.value != '') {
      this.product.stock = this.updateProductForm.get('stock')?.value;
    }
    if (this.updateProductForm.get('price')?.value != '') {
      this.product.price = this.updateProductForm.get('price')?.value;
    }
    if (this.updateProductForm.get('expiration')?.value != '') {
      this.product.expiration = this.updateProductForm.get('expiration')?.value;
    }
    if (this.updateProductForm.get('description')?.value != '') {
      this.product.description =
        this.updateProductForm.get('description')?.value;
    }
    if (this.updateProductForm.get('last_input')?.value != '') {
      this.product.last_input = this.updateProductForm.get('last_input')?.value;
    }
    if (this.updateProductForm.get('last_output')?.value != '') {
      this.product.last_output =
        this.updateProductForm.get('last_output')?.value;
    }
    this.apiService
      .updateProduct(this.product.id.toString(), this.product)
      .subscribe((success) => {
        if (success) {
          console.log('OK', success);
          this.apiService.listProducts().subscribe((success) => {
            if (success) {
              console.log('OK');
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

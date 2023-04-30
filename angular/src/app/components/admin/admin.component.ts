import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProductApiRequestService } from 'src/app/services/product-api-request.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  addProductForm: FormGroup;

  constructor(
    private apiService: ProductApiRequestService,
    private router: Router
  ) {
    this.addProductForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      stock: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      expiration: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      last_input: new FormControl('', [Validators.required]),
      last_output: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit(): void {}

  addProduct() {
    let newProduct: Product = new Product();
    newProduct.name = this.addProductForm.get('name')?.value;
    newProduct.stock = this.addProductForm.get('stock')?.value;
    newProduct.price = this.addProductForm.get('price')?.value;
    newProduct.expiration = this.addProductForm.get('expiration')?.value;
    newProduct.description = this.addProductForm.get('description')?.value;
    newProduct.last_input = this.addProductForm.get('last_input')?.value;
    newProduct.last_output = this.addProductForm.get('last_output')?.value;
    this.apiService.addProduct(newProduct).subscribe((success) => {
      if (success) {
        this.router.navigate(['/products']);
        console.log('OK');
      } else {
        console.log('ERROR');
        alert("Erreur dans le formulaire d'inscription");
      }
    });
  }
}

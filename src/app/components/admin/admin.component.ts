import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/models/product.model';

@Component({
selector: 'app-admin',
templateUrl: './admin.component.html',
styleUrls: ['./admin.component.css']
})
export class AdminComponent {
addingProduct = false;
newProduct: Product = {
id: 0,
name: '',
description: '',
price: 0,
stock: 0,
expiration: new Date(),
    last_input: new Date(),
    last_output: '',
    picture_url: ''
  };
  products: Product[] = [];

  @ViewChild('productForm', { static: false }) productForm!: NgForm;


  addProduct() {
    this.products.push(this.newProduct);
    this.newProduct = {
      id: 0,
      name: '',
      description: '',
      price: 0,
      stock: 0,
      expiration: new Date(),
      last_input: new Date(),
      last_output: '',
      picture_url: ''
    };
    this.productForm.resetForm();
    this.addingProduct = false;
  }

  cancel() {
    this.newProduct = {
      id: 0,
      name: '',
      description: '',
      price: 0,
      stock: 0,
      expiration: new Date(),
      last_input: new Date(),
      last_output: '',
      picture_url: ''
    };
    this.productForm.resetForm();
    this.addingProduct = false;
  }
}

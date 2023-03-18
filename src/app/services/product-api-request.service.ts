import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductApiRequestService {
  private productsUrl = 'api/products';
  private _products: Product[] = [];

  get products(): Product[] {
    return this._products;
  }

  constructor(private http: HttpClient) {}

  private handleError<T>(_operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  listProducts(): Observable<any> {
    return this.http.get<Product[]>(this.productsUrl).pipe(
      map((response) => {
        console.log('Products list : ', response);
        this._products = response;
        return true;
      }),
      catchError(this.handleError<Product[]>('getProducts', []))
    );
  }

  showProduct(id: number): Observable<any> {
    return this.http.get<any>(this.productsUrl + '/' + id).pipe(
      map((response) => {
        if (response.id == id) {
          return response;
        }
        /*if (response.success) {
          console.log("Product : ", response.product);
          return response.product;
        }
        else {
          console.log(response);
          return false;
        }*/

        return false;
      }),
      catchError((error) => {
        console.log('Error', error);

        return of(null);
      })
    );
  }
}

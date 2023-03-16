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

  constructor(private http: HttpClient, private router: Router) {}

  private handleError<T>(operation = 'operation', result?: T) {
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
}

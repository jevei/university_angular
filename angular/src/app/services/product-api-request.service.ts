import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductApiRequestService {
  //private productsUrl = 'http://localhost:8080/api/products';
  private productsUrl =
    'https://fathomless-bastion-22084.herokuapp.com/api/products';
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
        if (response.product_id == id) {
          return response;
        }
        return false;
      }),
      catchError((error) => {
        console.log('Error', error);

        return of(null);
      })
    );
  }

  deleteProduct(product: Product): Observable<any> {
    return this.http
      .delete<any>(this.productsUrl + '/' + product.product_id)
      .pipe(
        map((response) => {
          console.log(response);
          if (response == null) {
            return true;
          }
          return false;
        }),
        catchError((error) => {
          console.log('Error', error);

          return of(null);
        })
      );
  }

  updateProduct(productId: string, product: Product): Observable<any> {
    return this.http.put(this.productsUrl + '/' + productId, product).pipe(
      map((response) => {
        if (response != null) {
          console.log(response);
          return true;
        } else {
          console.log(response);
          return false;
        }
      }),
      catchError((error) => {
        console.log('Error', error);

        return of(null);
      })
    );
  }

  addProduct(newProduct: Product): Observable<any> {
    return this.http.post(this.productsUrl, newProduct).pipe(
      map((response) => {
        console.log('Product added : ', response);
        if (response) {
          return true;
        } else {
          return false;
        }
      }),
      catchError(this.handleError<any>('addProduct'))
    );
  }
}

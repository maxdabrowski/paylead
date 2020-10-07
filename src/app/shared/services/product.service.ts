import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map} from 'rxjs/operators'

export interface Product {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  description: string
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _url: string = "../../../data/products.json";

  constructor(private http:HttpClient) { }

  getAll(): Observable<Product[]>{
    return this.http.get<Product[]>(this._url);
  }
  handleError(handleError: any): import("rxjs").OperatorFunction<Product[], any> {
    throw new Error('Method not implemented.');
  }

  getById(productId: number): Observable<Product> {
    return this.http.get<Product[]>(this._url)
    .pipe(
      map(products => <Product>products.find(p => p.id === productId))
    );
  }
}

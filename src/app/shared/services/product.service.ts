import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap} from 'rxjs/operators'

export interface Product {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  description: string;
  categories: string[];
};

export interface ProductSearchParams {
  title?: string;
  minPrice?: number;
  maxPrice?: number;
}

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

  getByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(this._url).pipe(
      map(products => products.filter(p => p.categories.includes(category))));
  }

  getDistinctCategories(): Observable<string[]> {
    return this.http.get<Product[]>(this._url)
      .pipe(
        tap(value => console.log('Przed zredukowaniem kategorii', JSON.stringify(value[0]['categories']))),
        map(this.reduceCategories),
        tap(value => console.log(`Po zredukowaniu kategorii ${value}`)),
        map(categories => Array.from(new Set(categories))),
        tap(value => console.log(`Po utworzeniu tablicy kategorii ${value}`))
      );
  }
  search(params: ProductSearchParams): Observable<Product[]> {
    return this.http.get<Product[]>(this._url).pipe(
      map(products => this.filterProducts(products, params))
    );
  }

  // Populate an array with categories values of each product
  private reduceCategories(products: Product[]): string[] {
    return products.reduce((all, product) => all.concat(product.categories), new Array<string>());
  }

  // Keep only those product that meet the criteria from search params
  private filterProducts(products: Product[], params: ProductSearchParams): Product[] {
    return products
      .filter(p => params.title ? p.title.toLowerCase().includes((<string>params.title).toLowerCase()) : products)
      .filter(p => params.minPrice ? p.price >= params.minPrice : products)
      .filter(p => params.maxPrice ? p.price <= params.maxPrice : products);
  }

}

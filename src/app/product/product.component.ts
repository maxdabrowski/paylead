import { Component } from '@angular/core';
import { filter, map, switchMap} from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Product, ProductService } from '../shared/services';

@Component({
  selector: 'nga-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  product$: Observable<Product>;
  suggestedProducts$: Observable<Product[]>;

  constructor(private route: ActivatedRoute, private productService: ProductService) {

    this.product$ = this.route.paramMap
      .pipe(
        map(params => parseInt(params.get('productId') || '', 10)),
        filter(productId => !!productId),
        switchMap(productId => this.productService.getById(productId))
      );

    this.suggestedProducts$ = this.productService.getAll()
   }


}

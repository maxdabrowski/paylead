import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import {MediaObserver} from '@angular/flex-layout';
import { Product, ProductService } from '../shared/services';
import { map} from 'rxjs/operators';

@Component({
  selector: 'nga-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{

  readonly columns$: Observable<number>;
  readonly products$: Observable<Product[]>;


  readonly breakpointsToColumnsNumber = new Map([
    ['xs', 1 ],
    ['sm', 2 ],
    ['md', 3 ],
    ['lg', 4 ],
    ['xl', 5 ]
  ])

  constructor(private media: MediaObserver, private productService: ProductService) {
      this.products$ = this.productService.getAll()
      this.columns$ = this.media.asObservable()
        .pipe(
          map(mc => <number>this.breakpointsToColumnsNumber.get(mc[0].mqAlias))
        );
    }
}

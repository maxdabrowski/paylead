import { LoadProducts, LoadProductsSuccess} from '../actions';
import { initialState, reducer } from './products';

describe('Strona główna', () => {
  describe('reduktor produktów', () => {
    it('ustawia flagę dla wskaźnika postępu podczas ładowania produktów', () => {
      const loadAction = new LoadProducts();
      const loadSuccessAction = new LoadProductsSuccess({ products: [] });

      const beforeLoadingState = reducer(initialState, {} as any);
      expect(beforeLoadingState.loading).toBe(false);

      const whileLoadingState = reducer(beforeLoadingState, loadAction);
      expect(whileLoadingState.loading).toBe(true);

      const afterLoadingState = reducer(whileLoadingState, loadSuccessAction);
      expect(afterLoadingState.loading).toBe(false);
    });
  });
});

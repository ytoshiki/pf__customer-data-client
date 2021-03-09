import { CategoryActionName } from '../actionName';
import { Category } from '../../../reducers/category/categoryReducer';

interface FETCH_CATEGORIES {
  type: CategoryActionName.FETCH_CATEGORIES;
  payload: Category[];
}

interface INIT {
  type: CategoryActionName.START_CATEGORIES_ACTION;
}

export type ActionTypes = FETCH_CATEGORIES | INIT;

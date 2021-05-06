import { CategoryActionName } from '../actionName';
import { Category } from '../../../reducers/category/categoryReducer';

interface FETCH_CATEGORIES {
  type: CategoryActionName.FETCH_CATEGORIES;
  payload: Category[];
}

interface INIT {
  type: CategoryActionName.START_CATEGORIES_ACTION;
}

interface ADD_CATEGORY {
  type: CategoryActionName.ADD_CATEGORY;
  payload: Category;
}

interface UPDATE_CATEGORY {
  type: CategoryActionName.UPDATE_CATEGORY;
  payload: Category;
}

interface DELETE_CATEGORY {
  type: CategoryActionName.DELETE_CATEGORY;
  payload: { _id: string };
}

export type ActionTypes = FETCH_CATEGORIES | INIT | ADD_CATEGORY | UPDATE_CATEGORY | DELETE_CATEGORY;

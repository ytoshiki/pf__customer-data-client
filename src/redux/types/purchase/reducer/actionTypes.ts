import { Purchase } from '../../../reducers/purchase/purchaseReducer';
import { PurchaseActionNames } from '../actionNames';

interface FETCH_PURCHASES {
  type: PurchaseActionNames.FETCH_PURCHASES;
  payload: Purchase[];
}

interface INIT {
  type: PurchaseActionNames.START_PURCHASES_ACTION;
}

export type ActionTypes = FETCH_PURCHASES | INIT;

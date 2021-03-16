import axios from 'axios';
import { PurchaseActionNames } from '../types/purchase/actionNames';

interface PurchaseData {
  _id: string;
  createdAt: Date;
  product: any;
  customer: any;
}

export const fetchAllPurchases = () => {
  return async (dispatch: any) => {
    dispatch({
      type: PurchaseActionNames.START_PURCHASES_ACTION
    });

    try {
      const response_01 = await axios(`${process.env.REACT_APP_API_ENDPOINT}/purchase`);

      const data_01 = response_01.data;

      if (!data_01.success) {
        throw new Error(data_01.message || 'Fetch Error');
      }

      const purchases_01: PurchaseData[] = data_01.purchases;

      const purchases_02 = purchases_01.map((purchase) => {
        return {
          id: purchase._id,
          createdAt: purchase.createdAt,
          customer: purchase.customer,
          product: purchase.product
        };
      });

      dispatch({
        type: PurchaseActionNames.FETCH_PURCHASES,
        payload: purchases_02
      });
    } catch (error) {}
  };
};

import axios from 'axios';

export const getAllPurchases = async () => {
  try {
    const response = await axios(`${process.env.REACT_APP_API_ENDPOINT}/purchase`);
    const data = await response.data;

    if (!data.success) {
      throw new Error(data.message || 'Fetch Error');
    }

    const purchases = data.purchases;

    return purchases;
  } catch (error) {}
};

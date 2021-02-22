import { createSelector } from 'reselect';
import { StoreTypes } from '../../store/storeTypes';

const customersSelector = (state: StoreTypes) => state.customers.customers;

export const genderSelector = createSelector(customersSelector, (customers) => {
  let male = 0;
  let female = 0;

  for (let customer of customers) {
    if (customer.gender === 'male') {
      male++;
    } else if (customer.gender === 'female') {
      female++;
    }
  }

  return [
    {
      name: 'male',
      value: male
    },
    {
      name: 'female',
      value: female
    }
  ];
});

export const ageSelector = createSelector(customersSelector, (customers) => {
  let lowest = 0;
  let low = 0;
  let high = 0;
  let highest = 0;

  for (let customer of customers) {
    const age = customer.age;

    if (age < 20) {
      lowest++;
    } else if (age >= 20 && age < 30) {
      low++;
    } else if (age >= 30 && age < 40) {
      high++;
    } else {
      highest++;
    }
  }

  return [
    {
      name: '<20',
      value: lowest
    },
    {
      name: '20-29',
      value: low
    },
    {
      name: '30-39',
      value: high
    },
    {
      name: '>40',
      value: highest
    }
  ];
});

export const natSelector = createSelector(customersSelector, (customers) => {
  let GB = 0;
  let DK = 0;
  let FR = 0;

  let NL = 0;
  let NO = 0;

  for (let customer of customers) {
    const nat = customer.nationality;

    if (nat === 'GB') {
      GB++;
    } else if (nat === 'DK') {
      DK++;
    } else if (nat === 'FR') {
      FR++;
    } else if (nat === 'NO') {
      NO++;
    } else if (nat === 'NL') {
      NL++;
    }
  }

  return [
    {
      name: 'GB',
      number: GB
    },
    {
      name: 'FR',
      number: FR
    },
    {
      name: 'DK',
      number: DK
    },
    {
      name: 'NO',
      number: NO
    },
    {
      name: 'NL',
      number: NL
    }
  ];
});

export const purchaseSelector = createSelector(customersSelector, (customers) => {
  const reducer = (a: number, b: number): number => a + b;

  const topTenCustomers = customers
    .sort((a, b) => b.purchase.reduce(reducer) - a.purchase.reduce(reducer))
    .slice(0, 10)
    .map((customer) => {
      return {
        name: customer.name,
        purchase: customer.purchase.reduce(reducer)
      };
    });

  return topTenCustomers;
  // returns
  // [ { name, purchase}, {}]
});

import { createSelector } from 'reselect';
import { StoreTypes } from '../../store/storeTypes';

const customersSelector = (state: StoreTypes) => state.customers.customers;

// For newly Added Registered Customers

export const newlyRegisteredSelector = createSelector(customersSelector, (customers) => {
  const now = new Date().setMonth(new Date().getMonth() - 1);

  const newlyRegistered = customers.filter((customer) => {
    const date = new Date(customer.dateRegistered);
    return date > new Date(now);
  }).length;

  return newlyRegistered;
});

// Percentage Increase In a year

export const percentageSelector = createSelector(customersSelector, (customers) => {
  const currYear = new Date().getFullYear();
  const lastYear = currYear - 1;

  const lastNumber = customers.filter((customer) => {
    const date = new Date(customer.dateRegistered).getFullYear();
    return date === lastYear;
  }).length;

  const currNumber = customers.length;

  const percentageIncrease = ((currNumber - lastNumber) / lastNumber) * 100;
  return Math.round(percentageIncrease);
});

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
  let natContainer: string[] = [];

  customers.forEach((customer) => {
    if (!natContainer.includes(customer.nationality)) {
      natContainer.push(customer.nationality);
    }
  });

  const dataArray = natContainer.map((nat) => {
    return {
      country: nat,
      number: 0
    };
  });

  for (let customer of customers) {
    const nat = customer.nationality;

    dataArray.map((data) => {
      if (data.country === nat) {
        data.number += 1;
      }

      return data;
    });
  }

  return dataArray.sort((a, b) => b.number - a.number);
});

// export const purchaseSelector = createSelector(customersSelector, (customers) => {
//   const reducer = (a: number, b: number): number => a + b;

//   const topTenCustomers = customers
//     .sort((a, b) => b.purchase.reduce(reducer) - a.purchase.reduce(reducer))
//     .slice(0, 10)
//     .map((customer) => {
//       return {
//         name: customer.name,
//         purchase: customer.purchase.reduce(reducer)
//       };
//     });

//   return topTenCustomers;
//   // returns
//   // [ { name, purchase}, {}]
// });

export const membershipSelector = createSelector(customersSelector, (customers) => {
  const currYear = new Date().getFullYear();
  const lastYear = currYear - 1;

  const lastNumber = customers.filter((customer) => {
    const date = new Date(customer.dateRegistered).getFullYear();
    return date === lastYear;
  }).length;
  const currNumber = customers.length;

  return [
    {
      year: lastYear,
      number: lastNumber
    },
    {
      year: currYear,
      number: currNumber
    }
  ];
});

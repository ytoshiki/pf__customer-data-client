import { createSelector } from 'reselect';
import { StoreTypes } from '../../store/storeTypes';

const purchasesSelector = (store: StoreTypes) => store.purchases.purchases;

export const thisWeekProfitSelector = createSelector(purchasesSelector, (purchases) => {
  const now = new Date().setDate(new Date().getDate() - 7);

  const profits = purchases
    .filter((purchase) => {
      if (purchase.product !== null) {
        return true;
      }

      return false;
    })
    .filter((purchase) => {
      return new Date(purchase.createdAt) > new Date(now);
    })
    .reduce((acc, pur) => acc + (pur.product as any).price, 0);

  const rowProfit = Math.floor(profits * 10) / 10;

  let profit = Number(String(rowProfit).split('.')[0]);

  return profit;
});

export const lastWeekProfitSelector = createSelector(purchasesSelector, (purchases) => {
  const start = new Date().setDate(new Date().getDate() - 14);
  const end = new Date().setDate(new Date().getDate() - 7);

  const profits = purchases
    .filter((purchase) => {
      if (purchase.product !== null) {
        return true;
      }

      return false;
    })
    .filter((purchase) => {
      if (new Date(purchase.createdAt) > new Date(start) && new Date(purchase.createdAt) < new Date(end)) {
        return true;
      }

      return false;
    })
    .reduce((acc, pur) => acc + (pur.product as any).price, 0);

  return profits;
});

export const thisMonthProfitSelector = createSelector(purchasesSelector, (purchases) => {
  let today = new Date();
  let start = new Date(today.getFullYear(), today.getMonth(), 1, 0, 0, 0);

  const endDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();

  let end = new Date(today.getFullYear(), today.getMonth(), endDate, 23, 59, 59);

  const profits = purchases
    .filter((purchase) => {
      if (purchase.product !== null) {
        return true;
      }

      return false;
    })
    .filter((purchase) => {
      if (new Date(purchase.createdAt) > new Date(start) && new Date(purchase.createdAt) < new Date(end)) {
        return true;
      }

      return false;
    })
    .reduce((acc, pur) => acc + (pur.product as any).price, 0);

  return profits;
});

export const lastMonthProfitSelector = createSelector(purchasesSelector, (purchases) => {
  let today = new Date();
  let start = new Date(today.getFullYear(), today.getMonth() - 1, 1, 0, 0, 0);

  const endDate = new Date(new Date().getFullYear(), new Date().getMonth(), 0).getDate();

  let end = new Date(today.getFullYear(), today.getMonth() - 1, endDate, 23, 59, 59);

  const profits = purchases
    .filter((purchase) => {
      if (purchase.product !== null) {
        return true;
      }

      return false;
    })
    .filter((purchase) => {
      if (new Date(purchase.createdAt) > new Date(start) && new Date(purchase.createdAt) < new Date(end)) {
        return true;
      }

      return false;
    })
    .reduce((acc, pur) => acc + (pur.product as any).price, 0);

  return profits;
});

export const thisYearProfitSelector = createSelector(purchasesSelector, (purchases) => {
  let today = new Date();
  let start = new Date(today.getFullYear(), 1, 1, 0, 0, 0);

  const profits = purchases
    .filter((purchase) => {
      if (purchase.product !== null) {
        return true;
      }

      return false;
    })
    .filter((purchase) => {
      if (new Date(purchase.createdAt) > new Date(start)) {
        return true;
      }

      return false;
    })
    .reduce((acc, pur) => acc + (pur.product as any).price, 0);

  return profits;
});

// export const lastTwelveDataSelector = createSelector(purchasesSelector, (purchases) => {
//   // Tools
//   const today = new Date();
//   const endDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();

//   // Date
//   let start = new Date(today.getFullYear(), today.getMonth(), 1, 0, 0, 0);
//   let end = new Date(today.getFullYear(), today.getMonth(), endDate, 23, 59, 59);

//   // let output = {};

//   // (output as any).date = `${today.getFullYear()}-${today.getMonth}`;

//   // output data
//   let data: {
//     date: string;
//     profit: number;
//   }[] = [];

//   purchases
//     .filter((purchase) => purchase.product !== null)
//     .forEach((purchase) => {
//       // date purchased
//       const purchaseDate = new Date(purchase.createdAt);

//       if (purchaseDate < end && purchaseDate > start) {
//         const dateLabel = `${start.getFullYear()}-${start.getMonth() + 1}`;
//         if (data.some((obj) => obj.date === dateLabel)) {
//           data.forEach((obj) => {
//             if (obj.date === dateLabel) {
//               obj.profit += (purchase.product as any).price;
//             }
//           });
//         } else {
//           let newObj = {
//             date: dateLabel,
//             profit: (purchase.product as any).price
//           };

//           data.push(newObj);
//         }
//       } else if (purchaseDate < new Date(end.setMonth(end.getMonth() - 1)) && purchaseDate > new Date(start.setMonth(start.getMonth() - 1))) {
//         const dateLabel = `${start.getFullYear()}-${start.getMonth()}`;
//         if (data.some((obj) => obj.date === dateLabel)) {
//           data.forEach((obj) => {
//             if (obj.date === dateLabel) {
//               obj.profit += (purchase.product as any).price;
//             }
//           });
//         } else {
//           let newObj = {
//             date: dateLabel,
//             profit: (purchase.product as any).price
//           };

//           data.push(newObj);
//         }
//       } else {
//       }
//     });

//   console.log(data);
// });

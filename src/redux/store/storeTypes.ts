export interface StoreTypes {
  customers: {
    customers: {
      id: string;
      name: string;
      age: number;
      purchase: any[];
      nationality: string;
      avator: null | string;
      email: string;
      dateRegistered: string;
      gender: string;
    }[];
    loading: boolean;
  };
}

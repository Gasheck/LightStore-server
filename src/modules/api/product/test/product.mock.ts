export const ProductMock = {
  id: "1",
  name: 'car_car',
  price: "$33000.00",
  quantity: 1,
  description: 'car_car',
  type: {
    id: "2",
    name: 'car_car',
  },
};

export const ProductsMock = [
  ProductMock,
  {
    id: 2,
    name: 'table',
    price: 33000.00,
    quantity: 3,
    description: 'table',
    type: {
      id: 1,
      name: 'table',
    },
  },
];

export const ProductInputMock = {
  name: 'car_car',
  price: 33000.00,
  quantity: 1,
  description: 'car_car',
  type: 1,
};

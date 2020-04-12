export const CreateProductGraphqlMock = `
  mutation {
    createProduct(productInput: [{
      name: "car_car",
      price: 33000.00,
      quantity: 1,
      description: "car_car",
      type: 1,
    }]) {
      id
      name
      price
      quantity
      description
      type {
        id
        name
      }
    }
  }`;

export const UpdateProductGraphqlMock = `
  mutation {
    updateProduct(productInput: {
      id: "1",
      name: "car_car",
      price: 33000.00,
      quantity: 1,
      description: "car_car",
      type: 1,
    }) {
      id
      name
      price
      quantity
      description
      type {
        id
        name
      }
    }
  }`;

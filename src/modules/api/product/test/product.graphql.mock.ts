const ProductFragment = `
  id
  name
  price
  quantity
  description
  type {
    id
    name
    attributes {
      id
      name
    }
  }
  attributes {
    id
    value
  }
`;

export const CreateProductGraphqlMock = `
  mutation {
    createProduct(productInput: [{
      name: "car_car",
      price: 33000.00,
      quantity: 1,
      description: "car_car",
      type: 1,
      attributes: [
        {id: 1, value: "attr_value" }, {id: 2, value: 111 }
      ]
    }]) {
      ${ProductFragment}
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
      ${ProductFragment}
    }
  }`;

export const RemoveProductGraphqlMock = `
  mutation {
    removeProduct(id: [1]) {
      ${ProductFragment}
    }
  }
`;

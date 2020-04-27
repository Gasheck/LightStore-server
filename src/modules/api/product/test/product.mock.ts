export const ProductMock = {
  id: '1',
  name: 'car_car',
  price: '$33000.00',
  quantity: 1,
  description: 'car_car',
  type: {
    id: '1',
    name: 'car_car',
    attributes: [
      {
        id: '1',
        name: 'attr_1',
      },
      {
        id: '2',
        name: 'attr_2',
      },
    ],
  },
  attributes: [
    {
      id: '1',
      value: 'attr_value',
    },
    {
      id: '2',
      value: 111,
    },
  ],
};

export const QueryBuilderFindManyMock = [
  {
    p_id: 1,
    p_quantity: 1,
    p_name: 'car_car',
    p_price: '$33000.00',
    p_description: 'car_car',
    p_type: 1,
    av_id: 1,
    av_string_value: 'attr_value',
    av_number_value: null,
    a_id: 1,
    a_name: 'attr_1',
    at_id: 1,
    at_name: 'attr_1',
    pt_id: 1,
    pt_name: 'car_car',
  },
  {
    p_id: 1,
    p_quantity: 1,
    p_name: 'car_car',
    p_price: '$33000.00',
    p_description: 'car_car',
    p_type: 1,
    av_id: 2,
    av_string_value: null,
    av_number_value: 111,
    a_id: 2,
    a_name: 'attr_2',
    at_id: 1,
    at_name: 'attr_2',
    pt_id: 1,
    pt_name: 'car_car',
  },
];

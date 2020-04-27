import { reduce, mapKeys, find } from 'lodash';
import { Product as ProductSchema } from '../../../../common/graphql/schemas/graphql';

const processRawProduct: (
  foundItems: ProductRawData[],
) => ProductSchema[] = foundItems =>
  reduce(
    foundItems,
    (acc, derivedItem) => {
      // TODO: FIX TYPES
      const item: any = mapKeys(derivedItem, (value, key) => {
        return key.replace('p_', '');
      });

      const product_type: any = mapKeys(derivedItem, (value, key) => {
        return key.replace('pt_', '');
      });

      const newItem: ProductSchema = {
        ...item,
        type: {
          ...product_type,
          attributes: [
            {
              id: item.a_id,
              name: item.a_name,
              type: item.at_id,
            },
          ],
        },
        attributes: [
          {
            id: item.av_id,
            value: item.av_number_value || item.av_string_value,
          },
        ],
      };

      const existing = find(acc, { id: item.id });

      if (existing) {
        const existing_attribute = find(existing.attributes, {
          id: item.av_id,
        });

        const existing_type = find(existing.type.attributes, {
          id: item.a_id,
        });

        if (!existing_type) {
          existing.type.attributes = [
            ...existing.type.attributes,
            {
              id: item.a_id,
              name: item.a_name,
              type: item.at_id,
            },
          ];
        }

        if (!existing_attribute) {
          existing.attributes = [
            ...existing.attributes,
            {
              id: item.av_id,
              value: item.av_number_value || item.av_string_value,
            },
          ];
        }

        return acc;
      }

      return [...acc, newItem];
    },
    [],
  );

export default processRawProduct;

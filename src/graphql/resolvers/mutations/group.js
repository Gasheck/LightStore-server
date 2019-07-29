import { createProductSet } from '../helpers';
import Group from '../../../models/Group';

// eslint-disable-next-line import/prefer-default-export
export const { createGroup } = {
  /*
  mutation {
    createGroup(groupInput: {name: "group1"}) {
      name
    }
  }
  */
  createGroup: ({ groupInput: { name } }) => createProductSet(Group, name),
};

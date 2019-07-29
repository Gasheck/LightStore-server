import Group from '../../../models/Group';
import { getProductSet } from '../helpers';

const getGroupsById = id => getProductSet(Group, id);

// eslint-disable-next-line import/prefer-default-export
export const { getGroups } = {
  /*
  query($id: ID) {
    groups(id: $id) {
      name
    }
  }

  {
    "id": "5cc7796eb8e8a60008c6477b"
  }
  */
  getGroups: ({ id }) => getGroupsById(id),
};

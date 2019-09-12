import { adminUser } from '../../cfg/auth';

export const { getProductSet, createProductSet, isUserAdmin } = {
  getProductSet: async (SetModel, id) => {
    try {
      const setData = id
        ? await SetModel.find({ _id: { $in: id } })
        : await SetModel.find();
      return setData.map(setItem => ({
        ...setItem._doc,
        id: setItem.id,
      }));
    } catch (err) {
      throw err;
    }
  },

  createProductSet: async (SetModel, name) => {
    const set = new SetModel({ name });
    const result = await set.save();

    return {
      ...result._doc,
      _id: result._doc._id.toString(),
    };
  },

  isUserAdmin: userId =>
    Array.isArray(adminUser)
      ? adminUser.includes(userId)
      : adminUser === userId,
};

import {originPageInfoList, originPageInfo, now} from './PrismaDataMock';

export const PrismaServiceMock = {
  page: {
    create: async ({ data }) => {
      return { id: 1, status: 1, ...data };
    },
    update: async ({ data, where, select }) => {
      if (
        Object.keys(where).every((key) => originPageInfo[key] === where[key])
      ) {
        const updatedPage = Object.assign({}, originPageInfo, data, {
          updatedAt: now,
        });
        return updatedPage;
      }
      return null;
    },
    findMany: async ({ where }) => {
      if (where.id) return [originPageInfo];
      else return originPageInfoList;
    },
  },
};

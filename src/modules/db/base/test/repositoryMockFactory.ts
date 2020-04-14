import {Repository} from "typeorm";

// @ts-ignore
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  find: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
}));
export type MockType<T> = {
  [P in keyof T]: jest.Mock<{}>;
};

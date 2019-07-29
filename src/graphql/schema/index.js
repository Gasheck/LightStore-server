import { buildSchema } from 'graphql';

export default buildSchema(`
  type Product {
    _id: ID!
    name: String!
    price: Float!
    description: String!
    category: [Category!]!
  }
  type Group {
    _id: ID!
    name: String!
  }
  type Category {
    _id: ID!
    name: String!
  }
  type User {
    email: String!
  }
  type AuthData {
    isAdmin: Boolean!
  }
  input CreateProductInput {
    name: String!
    quantity: Int
    price: Float!
    description: String!
    preview: String
    photos: [String]
    group: ID!
  }
  input UpdateProductInput {
    id: ID!
    name: String
    quantity: Int
    price: Float
    description: String
    preview: String
    photos: [String]
    group: ID
  }
  input GroupInput {
    name: String!
  }
  input CreateUserInput {
    email: String!
    password: String!
  }
  type RootQuery {
    getProducts(groupId: ID): [Product!]!
    getGroups(id: ID): [Group!]!
    login(email: String!, password: String!): AuthData!
  }
  type RootMutation {
    createProduct(productInput: CreateProductInput): Product
    updateProduct(productInput: UpdateProductInput): Product
    deleteProduct(id: ID!): Product
    createGroup(groupInput: GroupInput): Group
    createUser(userInput: CreateUserInput): User
  }
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);

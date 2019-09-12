import { gql } from 'apollo-server-express';

export default gql`
  type TypeAttribute {
    id: ID!
    name: String!
    values: [String!]!
  }
  type Type {
    id: ID!
    name: String!
    attributes: [TypeAttribute!]!
  }
  type Category {
    id: ID!
    name: String!
  }
  type Product {
    id: ID!
    name: String!
    price: Float!
    type: [ID!]!
    quantity: Int!
    description: String!
  }
  type User {
    email: String!
  }
  type AuthData {
    isAdmin: Boolean!
  }
  input TypeAttributeInput {
    name: String!
    values: [String!]!
  }
  input CreateProductInput {
    name: String!
    quantity: Int!
    price: Float!
    description: String!
    type: [ID!]!
    mainPhoto: Int
    photos: [Upload!]!
  }
  input CreateTypeInput {
    name: String!
    attributes: [TypeAttributeInput]!
  }
  input UpdateProductInput {
    id: ID!
    name: String
    quantity: Int
    price: Float
    description: String
    preview: String
    photos: [String]
  }
  input CategoryInput {
    name: String!
  }
  input CreateUserInput {
    email: String!
    password: String!
  }
  type Query {
    getProducts(groupId: ID): [Product!]!
    getTypes: [Type!]!
    getCategories(id: [ID]): [Category!]!
    login(email: String!, password: String!): AuthData!
  }
  type Mutation {
    createProduct(productInput: CreateProductInput): Product
    updateProduct(productInput: UpdateProductInput): Product
    deleteProduct(id: ID!): Product
    createCategory(categoryInput: CategoryInput): Category
    createType(typeInput: CreateTypeInput): Type
    createUser(userInput: CreateUserInput): User
  }
`;

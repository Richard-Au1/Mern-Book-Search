const typeDefs = `
input BookInput {
    bookId: String
    authors: [String]
    title: String
    image: String
    link: String
    description: String

  }

  type Query {
    me: User
  }

  type Book {
    bookId: String
    authors: [String]
    title: String
    image: String
    link: String
    description: String
  }

  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Auth {
    token: String!
    user: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookData: BookInput!): User
    removeBook(bookId: String!): User
    # Add more Mutation types if needed
  }`

module.exports = typeDefs;
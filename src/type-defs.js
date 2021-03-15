import { gql } from "apollo-server"

export const typeDefs = gql`
  type Plant {
    id: ID
    common_name: String
  }

  type Query {
    plants: [Plant]
  }
`

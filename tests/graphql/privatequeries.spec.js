import 'dotenv/config'
import { GraphQLClient, request, gql } from 'graphql-request'

const endpoint = 'http://localhost:4000/graphql'
let token = ''

describe("Test with private queries", () => {
    beforeEach(async () => {
        const query = gql`mutation{
            auth: doLogin(email: "frmichetti@gmail.com", password: "${process.env.ADMIN_PASSWORD}"){
              token
              auth
            }
          }`

        const response = await request(endpoint, query)

        token = response.auth.token
    })

    it("should create a category", async () => {

        const graphQLClient = new GraphQLClient(endpoint, {
            headers: {
                authorization: `Bearer ${token}`
            },
        })

        const query = gql`
        mutation createCategory ($slugname: String!,$name: String!){
            createCategory(input:{
              slugname: $slugname
              name: $name
            }){
              id
              slugname
              name
            }
          }
          `

          const variables = {
              slugname: "teste_2",
              name: "Teste 2"
          }

        const response = await graphQLClient.request(query, variables)
        expect(response.data).not.toBeNull
    })

})
import 'dotenv/config'
import { request, gql } from 'graphql-request'
const endpoint = 'http://localhost:4000/graphql'

describe("Test with mutation doLogin", () => {
    it("should return a token", async () => {

        const query = gql`mutation{
            auth: doLogin(email: "frmichetti@gmail.com", password: "${process.env.ADMIN_PASSWORD}"){
              token
              auth
            }
          }`

        const response = await request(endpoint, query)        

        expect(response.auth.token).not.toBeNull
    })   

})
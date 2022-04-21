import { request, gql } from 'graphql-request'
const endpoint = 'http://localhost:4000/graphql'



describe("Test with public queries", () => {
    it("should return a hello", async () => {

        const query = gql`{hello}`

        const response = await request(endpoint, query)

        expect(response.data).not.toBeNull

    })

    it("should return all Wii Games", async () => {

        const query = gql`
        {
            games: allWiiGames {
              id
              app_id
              title
            }
          }          
          `

        const response = await request(endpoint, query)        

        expect(response.games).not.toBeNull
        expect(response.games).not.toBeEmpty

    })


})
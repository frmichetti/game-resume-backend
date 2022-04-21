const request = require('supertest')
const baseUrl = 'http://localhost:4000'

const get_routes = ['', 'test', 'statistics', 'categories', 'game/123', 'game/123/categories', 'game/123/dlcs', 'game/123/codes',
    'game/123/system', 'game/123/playing', 'origin', 'ubisoft', 'steam', 'steam_api', 'all', 'gamecube', 'virtualconsole', 'tobuy',
    'wii', 'wiiu', 'pc', 'console', 'dlcs', 'playing', 'trash']

// TODO implements tests with params
const get_with_params = ['csv', 'pdf', 'xls', 'search', 'report', 'genre_search', 'charts']


describe('Test Public Routes', () => {
    it("should return 200 when access GET routes", () => {
        for (let route of get_routes) {
            request(baseUrl)
                .get(`/${route}`)
                .set('Accept', 'application/json')
                .expect(200)
                .then(resp => {
                    expect(resp.body).not.toBeNull
                }).catch(error => console.error(error))
        }

    }, 50_000)


})
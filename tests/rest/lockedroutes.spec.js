const request = require('supertest')
const baseUrl = 'http://localhost:4000'

const post_routes = ['load_games', 'import_data', 'create', 'categories', 'game/123/categories', 'dlc_finished',
'finished', 'code', 'restore', 'mail', 'sync_steam', 'user']

const put_routes = ['update', 'categories', 'game/123/categories', 'code']

const delete_routes = ['remove', 'trash']

describe('Test Locked Routes', () => {
    it("should return 401 when access POST routes", () => {
        for (let route of post_routes) {
            request(baseUrl)
                .post(`/${route}`)
                .set('Accept', 'application/json')
                .expect(401)
                .then(resp => {
                    expect(resp.body).not.toBeNull
                })
        }

    }, 50_000)

    it("should return 401 when access PUT routes", () => {
        for (let route of put_routes) {
            request(baseUrl)
                .put(`/${route}`)
                .set('Accept', 'application/json')
                .expect(401)
                .then(resp => {
                    expect(resp.body).not.toBeNull
                })
        }

    }, 50_000)

    it("should return 401 when access DELETE routes", () => {
        for (let route of delete_routes) {
            request(baseUrl)
                .delete(`/${route}`)
                .set('Accept', 'application/json')
                .expect(401)
                .then(resp => {
                    expect(resp.body).not.toBeNull
                })
        }

    }, 50_000)
})
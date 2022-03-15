
import db from '../src/models/index';
import { getMockReq, getMockRes } from '@jest-mock/express'

const { requests } = require('../src/requests');

const DEFAULT_TIMEOUT = 50000;
const connection = db;





describe('requests', () => {
    it('showWelcome', () => {
        const req = getMockReq();
        const { res, next, clearMockRes } = getMockRes({
            message: "Games Resume Backend",
        });
        requests(connection).showWelcome(req, res)
        expect(res.status).toHaveBeenCalledWith(200)
    }, DEFAULT_TIMEOUT);

    it('showTest', () => {
        const req = getMockReq();
        const { res, next, clearMockRes } = getMockRes({
            games: []
        });
        requests(connection).showTest(req, res)
        expect(res.status).toHaveBeenCalledWith(200)
    }, DEFAULT_TIMEOUT)
});
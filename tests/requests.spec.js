
import db from '../src/models/index';

const { requests } = require('../src/requests');

const DEFAULT_TIMEOUT = 50000;
const connection = db;

const req = jest.fn()
const res = {};
res.status = jest.fn().mockReturnThis();
res.json = jest.fn().mockReturnValue(res);
res.send = jest.fn().mockReturnValue(res);



describe('requests', () => {
    it('showWelcome', () => {
        requests(connection).showWelcome(req, res)
        expect(res.status).toHaveBeenCalledWith(200)
    }, DEFAULT_TIMEOUT);

    it('showTest', () => {
        requests(connection).showTest(req, res)
        expect(res.status).toHaveBeenCalledWith(200)
    }, DEFAULT_TIMEOUT)
});
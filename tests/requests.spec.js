
import db from '../src/models/index';

const sinon = require('sinon');

const { requests } = require('../src/requests');

const DEFAULT_TIMEOUT = 50000;
const connection = db;

const req = {}
const res = {};
res.status = sinon.stub().returns(res);
res.json = sinon.stub().returns(res);
res.send = sinon.stub().returns(res);

describe('requests', () => {
    it('showWelcome', () => {
        requests(connection).showWelcome(req, res)
        expect(res.status.calledWith(200)).toBeTruthy()
    }, DEFAULT_TIMEOUT);

    it('showTest', () => {
        requests(connection).showTest(req, res)
        expect(res.status.calledWith(200)).toBeTruthy()
    }, DEFAULT_TIMEOUT)
});
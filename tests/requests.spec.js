
import db from '../src/models/index';

const sinon = require('sinon');

const { requests } = require('../src/requests');

const DEFAULT_TIMEOUT = 50000;
const connection = db;

let req = {}
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
    }, DEFAULT_TIMEOUT);

    describe('showStatistics', () => {
        it('cause error with no param query', () => {            
            requests(connection).showStatistics(req, res)
            expect(res.status.calledWith(400)).toBeTruthy()
        }, DEFAULT_TIMEOUT);

        it('return total_finished_games_for_dashboard', () => {
            req.query = { from: 'finished' }
            requests(connection).showStatistics(req, res)
            expect(res.status.calledWith(200)).toBeTruthy()
        }, DEFAULT_TIMEOUT);

        it('return total_games_for_dashboard', () => {
            req.query = { from: 'totals' }
            requests(connection).showStatistics(req, res)
            expect(res.status.calledWith(200)).toBeTruthy()
        }, DEFAULT_TIMEOUT);


        it('return total_of_finished_by_system_percentual_over_system', () => {
            req.query = { from: 'finished_over_system' }
            requests(connection).showStatistics(req, res)
            expect(res.status.calledWith(200)).toBeTruthy()
        }, DEFAULT_TIMEOUT);
    });


});
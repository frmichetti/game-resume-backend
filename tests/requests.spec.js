
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

    it('showCategories', () => {
        requests(connection).showCategories(req, res)
        expect(res.status.calledWith(200)).toBeTruthy()
    }, DEFAULT_TIMEOUT);

    it('showOriginGames', () => {
        requests(connection).showOriginGames(req, res)
        expect(res.status.calledWith(200)).toBeTruthy()
    }, DEFAULT_TIMEOUT);

    it('showUbisoftGames', () => {
        requests(connection).showUbisoftGames(req, res)
        expect(res.status.calledWith(200)).toBeTruthy()
    }, DEFAULT_TIMEOUT);

    it('showSteamGames', () => {
        requests(connection).showSteamGames(req, res)
        expect(res.status.calledWith(200)).toBeTruthy()
    }, DEFAULT_TIMEOUT);

    describe('getSteamGames from STEAM API', () => {
        it('on Sucess', () => {
            requests(connection).getSteamGames(req, res)
            expect(res.status.calledWith(200)).toBeTruthy()
        }, DEFAULT_TIMEOUT);

        it('on Error', () => {
            process.env.STEAM_KEY = "";
            process.env.STEAM_ID = "";
            requests(connection).getSteamGames(req, res)
            expect(res.status.calledWith(400)).toBeTruthy()
        }, DEFAULT_TIMEOUT);
    });

    it('showAllGames', () => {
        requests(connection).showAllGames(req, res)
        expect(res.status.calledWith(200)).toBeTruthy()
    }, DEFAULT_TIMEOUT);

    it('showWiiGames', () => {
        requests(connection).showWiiGames(req, res)
        expect(res.status.calledWith(200)).toBeTruthy()
    }, DEFAULT_TIMEOUT);

    it('showWiiUGames', () => {
        requests(connection).showWiiUGames(req, res)
        expect(res.status.calledWith(200)).toBeTruthy()
    }, DEFAULT_TIMEOUT);

    it('showGameCubeGames', () => {
        requests(connection).showGameCubeGames(req, res)
        expect(res.status.calledWith(200)).toBeTruthy()
    }, DEFAULT_TIMEOUT);

    it('showVirtualConsoleGames', () => {
        requests(connection).showVirtualConsoleGames(req, res)
        expect(res.status.calledWith(200)).toBeTruthy()
    }, DEFAULT_TIMEOUT);

    it('showToBuyGames', () => {
        requests(connection).showToBuyGames(req, res)
        expect(res.status.calledWith(200)).toBeTruthy()
    }, DEFAULT_TIMEOUT);

    it('showPCGames', () => {
        requests(connection).showPCGames(req, res)
        expect(res.status.calledWith(200)).toBeTruthy()
    }, DEFAULT_TIMEOUT);

    it('showConsoleGames', () => {
        requests(connection).showConsoleGames(req, res)
        expect(res.status.calledWith(200)).toBeTruthy()
    }, DEFAULT_TIMEOUT);

    it('showDLCs', () => {
        requests(connection).showDLCs(req, res)
        expect(res.status.calledWith(200)).toBeTruthy()
    }, DEFAULT_TIMEOUT);

    describe('showDLCsById', () => {
        it('on success', () => {
            req.query = { id: 1 }
            requests(connection).showDLCsByID(req, res)
            expect(res.status.calledWith(200)).toBeTruthy()
        }, DEFAULT_TIMEOUT);

        it('on error', () => {            
            requests(connection).showDLCsByID(req, res)
            expect(res.status.calledWith(400)).toBeTruthy()
        }, DEFAULT_TIMEOUT);
    });






});
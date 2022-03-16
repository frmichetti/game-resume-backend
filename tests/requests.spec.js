
import 'dotenv/config'
import db from '../src/models/index';

const sinon = require('sinon');

const { requests } = require('../src/requests');

const DEFAULT_TIMEOUT = 50000;
const connection = db;

let req = {}
let res = {};

const mockResponse = () => {
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    res.send = sinon.stub().returns(res);
    return res;
};

describe('requests', () => {
    beforeEach(() => {
        res = mockResponse();
    })

    it('showWelcome', async () => {
        await requests(connection).showWelcome(req, res)
        expect(res.status.calledWith(200)).toBeTruthy()
    }, DEFAULT_TIMEOUT);

    it('showTest', async () => {
        await requests(connection).showTest(req, res)
        expect(res.status.calledWith(200)).toBeTruthy()
    }, DEFAULT_TIMEOUT);

    describe('showStatistics', () => {
        it('cause error with no param query', async () => {
            await requests(connection).showStatistics(req, res)
            expect(res.status.calledWith(400)).toBeTruthy()
        }, DEFAULT_TIMEOUT);

        it('return total_finished_games_for_dashboard', async () => {
            req.query = { from: 'finished' }
            await requests(connection).showStatistics(req, res)
            expect(res.status.calledWith(200)).toBeTruthy()
        }, DEFAULT_TIMEOUT);

        it('return total_games_for_dashboard', async () => {
            req.query = { from: 'totals' }
            await requests(connection).showStatistics(req, res)
            expect(res.status.calledWith(200)).toBeTruthy()
        }, DEFAULT_TIMEOUT);


        it('return total_of_finished_by_system_percentual_over_system', async () => {
            req.query = { from: 'finished_over_system' }
            await requests(connection).showStatistics(req, res)
            expect(res.status.calledWith(200)).toBeTruthy()
        }, DEFAULT_TIMEOUT);
    });

    it('showCategories', async () => {
        await requests(connection).showCategories(req, res)
        expect(res.status.calledWith(200)).toBeTruthy()
    }, DEFAULT_TIMEOUT);

    it('showOriginGames', async () => {
        await requests(connection).showOriginGames(req, res)
        expect(res.status.calledWith(200)).toBeTruthy()
    }, DEFAULT_TIMEOUT);

    it('showUbisoftGames', async () => {
        await requests(connection).showUbisoftGames(req, res)
        expect(res.status.calledWith(200)).toBeTruthy()
    }, DEFAULT_TIMEOUT);

    it('showSteamGames', async () => {
        await requests(connection).showSteamGames(req, res)
        expect(res.status.calledWith(200)).toBeTruthy()
    }, DEFAULT_TIMEOUT);

    describe('getSteamGames from STEAM API', () => {
        it('on Sucess', async () => {
            await requests(connection).getSteamGames(req, res)
            expect(res.status.calledWith(200)).toBeTruthy()
        }, DEFAULT_TIMEOUT);

        it('on Error', async () => {
            process.env.STEAM_KEY = "";
            process.env.STEAM_ID = "";
            await requests(connection).getSteamGames(req, res)
            expect(res.status.calledWith(400)).toBeTruthy()
        }, DEFAULT_TIMEOUT);
    });

    it('showAllGames', async () => {
        await requests(connection).showAllGames(req, res)
        expect(res.status.calledWith(200)).toBeTruthy()
    }, DEFAULT_TIMEOUT);

    it('showWiiGames', async () => {
        await requests(connection).showWiiGames(req, res)
        expect(res.status.calledWith(200)).toBeTruthy()
    }, DEFAULT_TIMEOUT);

    it('showWiiUGames', async () => {
        await requests(connection).showWiiUGames(req, res)
        expect(res.status.calledWith(200)).toBeTruthy()
    }, DEFAULT_TIMEOUT);

    it('showGameCubeGames', async () => {
        await requests(connection).showGameCubeGames(req, res)
        expect(res.status.calledWith(200)).toBeTruthy()
    }, DEFAULT_TIMEOUT);

    it('showVirtualConsoleGames', async () => {
        await requests(connection).showVirtualConsoleGames(req, res)
        expect(res.status.calledWith(200)).toBeTruthy()
    }, DEFAULT_TIMEOUT);

    it('showToBuyGames', async () => {
        await requests(connection).showToBuyGames(req, res)
        expect(res.status.calledWith(200)).toBeTruthy()
    }, DEFAULT_TIMEOUT);

    it('showPCGames', async () => {
        await requests(connection).showPCGames(req, res)
        expect(res.status.calledWith(200)).toBeTruthy()
    }, DEFAULT_TIMEOUT);

    it('showConsoleGames', async () => {
        await requests(connection).showConsoleGames(req, res)
        expect(res.status.calledWith(200)).toBeTruthy()
    }, DEFAULT_TIMEOUT);

    it('showDLCs', async () => {
        await requests(connection).showDLCs(req, res)
        expect(res.status.calledWith(200)).toBeTruthy()
    }, DEFAULT_TIMEOUT);

    describe('showDLCsById', () => {
        it('on success', async () => {
            req.query = { id: 1 }
            await requests(connection).showDLCsByID(req, res)
            expect(res.status.calledWith(200)).toBeTruthy()
        }, DEFAULT_TIMEOUT);

        it('on error', async () => {
            req.query = {}
            await requests(connection).showDLCsByID(req, res)
            expect(res.status.calledWith(400)).toBeTruthy()
        }, DEFAULT_TIMEOUT);
    });

    describe('showCharts', () => {
        it('on error', async () => {
            await requests(connection).showCharts(req, res)
            expect(res.status.calledWith(400)).toBeTruthy()
        }, DEFAULT_TIMEOUT);

        it('when total', async () => {
            req.query = { type: 'total' }
            await requests(connection).showCharts(req, res)
            expect(res.status.calledWith(200)).toBeTruthy()
        }, DEFAULT_TIMEOUT);

        it('when finished', async () => {
            req.query = { type: 'finished' }
            await requests(connection).showCharts(req, res)
            expect(res.status.calledWith(200)).toBeTruthy()
        }, DEFAULT_TIMEOUT);

        it('when total_percent', async () => {
            req.query = { type: 'total_percent' }
            await requests(connection).showCharts(req, res)
            expect(res.status.calledWith(200)).toBeTruthy()
        }, DEFAULT_TIMEOUT);

        it('when finished_percent', async () => {
            req.query = { type: 'finished_percent' }
            await requests(connection).showCharts(req, res)
            expect(res.status.calledWith(200)).toBeTruthy()
        }, DEFAULT_TIMEOUT);
    });

    it('showPlayingGames', async () => {
        await requests(connection).showPlayingGames(req, res)
        expect(res.status.calledWith(200)).toBeTruthy()
    }, DEFAULT_TIMEOUT);

    describe('Create Games', () => {
        it('error if no table is provided', async () => {
            await requests(connection).createGames(req, res)
            expect(res.status.calledWith(400)).toBeTruthy()
        }, DEFAULT_TIMEOUT)
    });

});

import 'dotenv/config'
import db from '../src/models/index';
import { v4 as uuidv4 } from 'uuid';

const sinon = require('sinon');

const { requests } = require('../src/requests');
const { batchInsert, insert, update, insertOrUpdate, select, exclude } = require('../src/_query');
const { clearTables } = require('./dbclear');

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

const getRandomArbitrary = (min, max) => {
    return (Math.random() * (max - min) + min).toString().split('.')[0];
}

const now = () => {
    return new Date().toISOString();
}

describe('requests', () => {
    beforeEach(() => {
        req = {}
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
        describe('errors', () => {
            it('error if no table is provided', async () => {
                req.body = {}
                await requests(connection).createGames(req, res)
                expect(res.status.calledWith(400)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('error in validations if create invalid Steam Game', async () => {
                req.body = { table: 'steam', app_id: null, system_id: null, title: null, finished: null, finished_at: null, collection: null, genuine: null, fisical_disc: null };
                await requests(connection).createGames(req, res)
                expect(res.status.calledWith(400)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('error in validations if create invalid Origin Game', async () => {
                req.body = { table: 'origin', app_id: null, system_id: null, title: null, finished: null, finished_at: null, collection: null, genuine: null, fisical_disc: null };
                await requests(connection).createGames(req, res)
                expect(res.status.calledWith(400)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('error in validations if create invalid Ubisoft Game', async () => {
                req.body = { table: 'ubisoft', app_id: null, system_id: null, title: null, finished: null, finished_at: null, collection: null, genuine: null, fisical_disc: null };
                await requests(connection).createGames(req, res)
                expect(res.status.calledWith(400)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('error in validations if create invalid GameCube Game', async () => {
                req.body = { table: 'gamecube', app_id: null, system_id: null, title: null, finished: null, finished_at: null, collection: null, genuine: null, fisical_disc: null };
                await requests(connection).createGames(req, res)
                expect(res.status.calledWith(400)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('error in validations if create invalid Wii Game', async () => {
                req.body = { table: 'wii', app_id: null, system_id: null, title: null, finished: null, finished_at: null, collection: null, genuine: null, fisical_disc: null };
                await requests(connection).createGames(req, res)
                expect(res.status.calledWith(400)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('error in validations if create invalid WiiU Game', async () => {
                req.body = { table: 'wiiu', app_id: null, system_id: null, title: null, finished: null, finished_at: null, collection: null, genuine: null, fisical_disc: null };
                await requests(connection).createGames(req, res)
                expect(res.status.calledWith(400)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('error in validations if create invalid Virtual Console Game', async () => {
                req.body = { table: 'virtualconsole', app_id: null, system_id: null, title: null, finished: null, genuine: null };
                await requests(connection).createGames(req, res)
                expect(res.status.calledWith(400)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('error in validations if create invalid Playing', async () => {
                req.body = { table: 'playing', app_id: null, title: null, started_at: null, finished: null, finished_at: null };
                await requests(connection).createGames(req, res)
                expect(res.status.calledWith(400)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('error in validations if create invalid ToBuy', async () => {
                req.body = { table: 'tobuy', title: null, finished: null, genuine: null, system: null, magnetic_link: null };
                await requests(connection).createGames(req, res)
                expect(res.status.calledWith(400)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('error in validations if create invalid DLC', async () => {
                req.body = { table: 'dlcs', app_id: null, title: null, finished: null, finished_at: null, collection: null };
                await requests(connection).createGames(req, res)
                expect(res.status.calledWith(400)).toBeTruthy()
            }, DEFAULT_TIMEOUT);
        });

        describe('success', () => {
            it('create a valid Steam Game not Finished', async () => {
                req.body = { table: 'steam', app_id: 'TT' + getRandomArbitrary(9999, 99999), system_id: 2, title: 'Test 1' + getRandomArbitrary(9999, 99999), finished: false, finished_at: null, collection: false, genuine: false, fisical_disc: false };
                await requests(connection).createGames(req, res)
                expect(res.status.calledWith(201)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('create a valid Steam Game Finished', async () => {
                req.body = { table: 'steam', app_id: 'TT' + getRandomArbitrary(9999, 99999), system_id: 2, title: 'Test 2' + getRandomArbitrary(9999, 99999), finished: true, finished_at: now(), collection: false, genuine: false, fisical_disc: false };
                await requests(connection).createGames(req, res)
                expect(res.status.calledWith(201)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('create a valid Origin Game not Finished', async () => {
                req.body = { table: 'origin', app_id: 'TT' + getRandomArbitrary(9999, 99999), system_id: 1, title: 'Test 1' + getRandomArbitrary(9999, 99999), finished: false, finished_at: null, collection: false, genuine: false, fisical_disc: false };
                await requests(connection).createGames(req, res)
                expect(res.status.calledWith(201)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('create a valid Origin Game Finished', async () => {
                req.body = { table: 'origin', app_id: 'TT' + getRandomArbitrary(9999, 99999), system_id: 1, title: 'Test 2' + getRandomArbitrary(9999, 99999), finished: true, finished_at: now(), collection: false, genuine: false, fisical_disc: false };
                await requests(connection).createGames(req, res)
                expect(res.status.calledWith(201)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('create a valid Ubisoft Game not Finished', async () => {
                req.body = { table: 'ubisoft', app_id: 'TT' + getRandomArbitrary(9999, 99999), system_id: 3, title: 'Test 1' + getRandomArbitrary(9999, 99999), finished: false, finished_at: null, collection: false, genuine: false, fisical_disc: false };
                await requests(connection).createGames(req, res)
                expect(res.status.calledWith(201)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('create a valid Ubisoft Game Finished', async () => {
                req.body = { table: 'ubisoft', app_id: 'TT' + getRandomArbitrary(9999, 99999), system_id: 3, title: 'Test 2' + getRandomArbitrary(9999, 99999), finished: true, finished_at: now(), collection: false, genuine: false, fisical_disc: false };
                await requests(connection).createGames(req, res)
                expect(res.status.calledWith(201)).toBeTruthy()
            }, DEFAULT_TIMEOUT);


            it('create a valid GameCube Game not Finished', async () => {
                req.body = { table: 'gamecube', app_id: 'TT' + getRandomArbitrary(9999, 99999), system_id: 4, title: 'Test 1' + getRandomArbitrary(9999, 99999), finished: false, finished_at: null, collection: false, genuine: false, fisical_disc: false };
                await requests(connection).createGames(req, res)
                expect(res.status.calledWith(201)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('create a valid GameCube Game Finished', async () => {
                req.body = { table: 'gamecube', app_id: 'TT' + getRandomArbitrary(9999, 99999), system_id: 4, title: 'Test 2' + getRandomArbitrary(9999, 99999), finished: true, finished_at: now(), collection: false, genuine: false, fisical_disc: false };
                await requests(connection).createGames(req, res)
                expect(res.status.calledWith(201)).toBeTruthy()
            }, DEFAULT_TIMEOUT);


            it('create a valid Wii Game not Finished', async () => {
                req.body = { table: 'wii', app_id: 'TT' + getRandomArbitrary(9999, 99999), system_id: 5, title: 'Test 1' + getRandomArbitrary(9999, 99999), finished: false, finished_at: null, collection: false, genuine: false, fisical_disc: false };
                await requests(connection).createGames(req, res)
                expect(res.status.calledWith(201)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('create a valid Wii Game Finished', async () => {
                req.body = { table: 'wii', app_id: 'TT' + getRandomArbitrary(9999, 99999), system_id: 5, title: 'Test 2' + getRandomArbitrary(9999, 99999), finished: true, finished_at: now(), collection: false, genuine: false, fisical_disc: false };
                await requests(connection).createGames(req, res)
                expect(res.status.calledWith(201)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('create a valid WiiU Game not Finished', async () => {
                req.body = { table: 'wiiu', app_id: 'TT' + getRandomArbitrary(9999, 99999), system_id: 6, title: 'Test 1' + getRandomArbitrary(9999, 99999), finished: false, finished_at: null, collection: false, genuine: false, fisical_disc: false };
                await requests(connection).createGames(req, res)
                expect(res.status.calledWith(201)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('create a valid WiiU Game Finished', async () => {
                req.body = { table: 'wiiu', app_id: 'TT' + getRandomArbitrary(9999, 99999), system_id: 6, title: 'Test 2' + getRandomArbitrary(9999, 99999), finished: true, finished_at: now(), collection: false, genuine: false, fisical_disc: false };
                await requests(connection).createGames(req, res)
                expect(res.status.calledWith(201)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('create a valid Virtual Console Game not Finished', async () => {
                req.body = { table: 'virtualconsole', app_id: 'TT' + getRandomArbitrary(9999, 99999), system_id: 7, title: 'Test 3' + getRandomArbitrary(9999, 99999), finished: false, finished_at: null, genuine: true };
                await requests(connection).createGames(req, res)
                expect(res.status.calledWith(201)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('create a valid Virtual Console Game Finished', async () => {
                req.body = { table: 'virtualconsole', app_id: 'TT' + getRandomArbitrary(9999, 99999), system_id: 7, title: 'Test 3' + getRandomArbitrary(9999, 99999), finished: true, finished_at: now(), genuine: true };
                await requests(connection).createGames(req, res)
                expect(res.status.calledWith(201)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('create a valid To Buy Game not Finished', async () => {
                req.body = { table: 'tobuy', title: 'Test 4' + getRandomArbitrary(9999, 99999), finished: false, finished_at: null, genuine: false, system: 'Test System', magnetic_link: 'XXXXXXXXXXXXXX' };
                await requests(connection).createGames(req, res)
                expect(res.status.calledWith(201)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('create a valid To Buy Game Finished', async () => {
                req.body = { table: 'tobuy', title: 'Test 4' + getRandomArbitrary(9999, 99999), finished: true, finished_at: now(), genuine: false, system: 'Test System', magnetic_link: 'XXXXXXXXXXXXXX' };
                await requests(connection).createGames(req, res)
                expect(res.status.calledWith(201)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('create a valid Playing not Finished', async () => {
                req.body = { table: 'playing', app_id: 'GUGE69', title: 'Test 5' + getRandomArbitrary(9999, 99999), started_at: now(), finished: false, finished_at: null };
                await requests(connection).createGames(req, res)
                expect(res.status.calledWith(201)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('create a valid Playing Finished', async () => {
                req.body = { table: 'playing', app_id: 'GUGE69', title: 'Test 5' + getRandomArbitrary(9999, 99999), started_at: now(), finished: true, finished_at: now() };
                await requests(connection).createGames(req, res)
                expect(res.status.calledWith(201)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('create a valid DLC not Finished', async () => {
                req.body = { table: 'dlcs', app_id: '12210', title: 'Test 6' + getRandomArbitrary(9999, 99999), finished: false, finished_at: null, collection: false };
                await requests(connection).createGames(req, res)
                expect(res.status.calledWith(201)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('create a valid DLC Finished', async () => {
                req.body = { table: 'dlcs', app_id: '12210', title: 'Test 6' + getRandomArbitrary(9999, 99999), finished: true, finished_at: now(), collection: false };
                await requests(connection).createGames(req, res)
                expect(res.status.calledWith(201)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

        });
    });

    describe('finishDLC', () => {
        it('error if no params is provided', async () => {
            req.body = {}
            await requests(connection).finishDLC(req, res)
            expect(res.status.calledWith(400)).toBeTruthy()
        }, DEFAULT_TIMEOUT);

        it('success', async () => {
            req.body = { id: 1, app_id: '12210', finished: true }
            await requests(connection).finishDLC(req, res)
            expect(res.status.calledWith(200)).toBeTruthy()
        }, DEFAULT_TIMEOUT);
    });

    describe('finishGame', () => {
        describe('errors', () => {
            it('error if no params is provided', async () => {
                req.body = {}
                await requests(connection).finishGame(req, res)
                expect(res.status.calledWith(400)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('error if table is not provided', async () => {
                req.body = { table: null }
                await requests(connection).finishGame(req, res)
                expect(res.status.calledWith(400)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('error if finished is not provided', async () => {
                req.body = { table: 'playing', finished: null }
                await requests(connection).finishGame(req, res)
                expect(res.status.calledWith(400)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('error if id is not provided', async () => {
                req.body = { table: 'playing', finished: true, id: null }
                await requests(connection).finishGame(req, res)
                expect(res.status.calledWith(400)).toBeTruthy()
            }, DEFAULT_TIMEOUT);
        });

        describe('success', () => {
            beforeEach(async () => {
                let data1 = [
                    {
                        app_id: `237110`,
                        title: `Title`,
                        started_at: new Date(),
                        finished: true,
                        finished_at: new Date(),
                        created_at: new Date(),
                        updated_at: new Date(),
                    },
                ];

                await batchInsert('Playing', data1, connection.sequelize);
            });

            afterEach(async () => {
                await clearTables(connection.sequelize, ['Playing']);
            });


            it('should update Playing sets finished', async () => {
                const rows = await select('Playing', {}, connection.sequelize);
                req.body = { table: 'playing', finished: true, id: rows[0].id }
                await requests(connection).finishGame(req, res)
                expect(res.status.calledWith(200)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('should update Playing unset finished', async () => {
                const rows = await select('Playing', {}, connection.sequelize);
                req.body = { table: 'playing', finished: false, id: rows[0].id }
                await requests(connection).finishGame(req, res)
                expect(res.status.calledWith(200)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('should update DLC sets finished', async () => {
                const rows = await select('DLC', {}, connection.sequelize);
                req.body = { table: 'dlcs', finished: true, id: rows[0].id }
                await requests(connection).finishGame(req, res)
                expect(res.status.calledWith(200)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('should update DLC unset finished', async () => {
                const rows = await select('DLC', {}, connection.sequelize);
                req.body = { table: 'dlcs', finished: false, id: rows[0].id }
                await requests(connection).finishGame(req, res)
                expect(res.status.calledWith(200)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('should update ToBuy sets finished', async () => {
                const rows = await select('ToBuy', {}, connection.sequelize);
                req.body = { table: 'tobuy', finished: true, id: rows[0].id }
                await requests(connection).finishGame(req, res)
                expect(res.status.calledWith(200)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('should update ToBuy unset finished', async () => {
                const rows = await select('ToBuy', {}, connection.sequelize);
                req.body = { table: 'tobuy', finished: false, id: rows[0].id }
                await requests(connection).finishGame(req, res)
                expect(res.status.calledWith(200)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('should update VirtualConsole sets finished', async () => {
                const rows = await select('VirtualConsole', {}, connection.sequelize);
                req.body = { table: 'virtualconsole', finished: true, id: rows[0].id }
                await requests(connection).finishGame(req, res)
                expect(res.status.calledWith(200)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('should update VirtualConsole unset finished', async () => {
                const rows = await select('VirtualConsole', {}, connection.sequelize);
                req.body = { table: 'virtualconsole', finished: false, id: rows[0].id }
                await requests(connection).finishGame(req, res)
                expect(res.status.calledWith(200)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('should update Games sets finished without app_id', async () => {
                const rows = await select('Games', {}, connection.sequelize);
                req.body = { table: 'steam', finished: true, id: rows[0].id }
                await requests(connection).finishGame(req, res)
                expect(res.status.calledWith(200)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('should update Games unset finished without app_id', async () => {
                const rows = await select('Games', {}, connection.sequelize);
                req.body = { table: 'steam', finished: false, id: rows[0].id }
                await requests(connection).finishGame(req, res)
                expect(res.status.calledWith(200)).toBeTruthy()
            }, DEFAULT_TIMEOUT);


            it('should update Games sets finished with app_id', async () => {
                const rows = await select('Games', {}, connection.sequelize);
                req.body = { table: 'steam', finished: true, id: rows[0].id, app_id: rows[0].app_id }
                await requests(connection).finishGame(req, res)
                expect(res.status.calledWith(200)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('should update Games unset finished with app_id', async () => {
                const rows = await select('Games', {}, connection.sequelize);
                req.body = { table: 'steam', finished: false, id: rows[0].id, app_id: rows[0].app_id }
                await requests(connection).finishGame(req, res)
                expect(res.status.calledWith(200)).toBeTruthy()
            }, DEFAULT_TIMEOUT);
        });
    });

    describe('searchGame', () => {
        it('success', async () => {
            req.query = { query: 'Mario' }
            await requests(connection).searchGame(req, res)
            expect(res.status.calledWith(200)).toBeTruthy()
        }, DEFAULT_TIMEOUT);

        it('error', async () => {
            req.query = {}
            await requests(connection).searchGame(req, res)
            expect(res.status.calledWith(400)).toBeTruthy()
        }, DEFAULT_TIMEOUT);
    });

    describe('genreSearchGame', () => {
        it('success', async () => {
            req.query = { query: 'Platform' }
            await requests(connection).genreSearchGame(req, res)
            expect(res.status.calledWith(200)).toBeTruthy()
        }, DEFAULT_TIMEOUT);

        it('error', async () => {
            req.query = {}
            await requests(connection).genreSearchGame(req, res)
            expect(res.status.calledWith(400)).toBeTruthy()
        }, DEFAULT_TIMEOUT);
    });

    describe('Update Games', () => {
        describe('errors', () => {
            it('error if no table is provided', async () => {
                req.body = {}
                await requests(connection).updateGame(req, res)
                expect(res.status.calledWith(400)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('error if no ID is provided', async () => {
                req.body = { table: 'steam' }
                await requests(connection).updateGame(req, res)
                expect(res.status.calledWith(400)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('error in validations if update invalid Steam Game', async () => {
                req.body = { id: 0, table: 'steam', app_id: null, system_id: null, title: null, finished: null, finished_at: null, collection: null, genuine: null, fisical_disc: null };
                await requests(connection).updateGame(req, res)
                expect(res.status.calledWith(400)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('error in validations if update invalid Origin Game', async () => {
                req.body = { id: 0, table: 'origin', app_id: null, system_id: null, title: null, finished: null, finished_at: null, collection: null, genuine: null, fisical_disc: null };
                await requests(connection).updateGame(req, res)
                expect(res.status.calledWith(400)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('error in validations if update invalid Ubisoft Game', async () => {
                req.body = { id: 0, table: 'ubisoft', app_id: null, system_id: null, title: null, finished: null, finished_at: null, collection: null, genuine: null, fisical_disc: null };
                await requests(connection).updateGame(req, res)
                expect(res.status.calledWith(400)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('error in validations if update invalid GameCube Game', async () => {
                req.body = { id: 0, table: 'gamecube', app_id: null, system_id: null, title: null, finished: null, finished_at: null, collection: null, genuine: null, fisical_disc: null };
                await requests(connection).updateGame(req, res)
                expect(res.status.calledWith(400)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('error in validations if update invalid Wii Game', async () => {
                req.body = { id: 0, table: 'wii', app_id: null, system_id: null, title: null, finished: null, finished_at: null, collection: null, genuine: null, fisical_disc: null };
                await requests(connection).updateGame(req, res)
                expect(res.status.calledWith(400)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('error in validations if update invalid WiiU Game', async () => {
                req.body = { id: 0, table: 'wiiu', app_id: null, system_id: null, title: null, finished: null, finished_at: null, collection: null, genuine: null, fisical_disc: null };
                await requests(connection).updateGame(req, res)
                expect(res.status.calledWith(400)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('error in validations if update invalid Virtual Console Game', async () => {
                req.body = { id: 0, table: 'virtualconsole', app_id: null, system_id: null, title: null, finished: null, genuine: null };
                await requests(connection).updateGame(req, res)
                expect(res.status.calledWith(400)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('error in validations if update invalid Playing', async () => {
                req.body = { id: 0, table: 'playing', app_id: null, title: null, started_at: null, finished: null, finished_at: null };
                await requests(connection).updateGame(req, res)
                expect(res.status.calledWith(400)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('error in validations if update invalid ToBuy', async () => {
                req.body = { id: 0, table: 'tobuy', title: null, finished: null, genuine: null, system: null, magnetic_link: null };
                await requests(connection).updateGame(req, res)
                expect(res.status.calledWith(400)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('error in validations if update invalid DLC', async () => {
                req.body = { id: 0, table: 'dlcs', app_id: null, title: null, finished: null, finished_at: null, collection: null };
                await requests(connection).updateGame(req, res)
                expect(res.status.calledWith(400)).toBeTruthy()
            }, DEFAULT_TIMEOUT);
        });

        describe('success', () => {
            it('update a valid Steam Game not Finished', async () => {
                const rows = await select('Games', { where: `"Games".system_id = 2` }, connection.sequelize);
                req.body = { table: 'steam', id: rows[rows.length -1].id, app_id: 'TT' + getRandomArbitrary(9999, 99999), system_id: 2, title: 'Test 1' + getRandomArbitrary(9999, 99999), finished: false, finished_at: null, collection: false, genuine: false, fisical_disc: false };
                await requests(connection).updateGame(req, res)
                expect(res.status.calledWith(200)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('update a valid Steam Game Finished', async () => {
                const rows = await select('Games', { where: `"Games".system_id = 2` }, connection.sequelize);
                req.body = { table: 'steam', id: rows[rows.length -1].id, app_id: 'TT' + getRandomArbitrary(9999, 99999), system_id: 2, title: 'Test 2' + getRandomArbitrary(9999, 99999), finished: true, finished_at: now(), collection: false, genuine: false, fisical_disc: false };
                await requests(connection).updateGame(req, res)
                expect(res.status.calledWith(200)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('update a valid Origin Game not Finished', async () => {
                const rows = await select('Games', { where: `"Games".system_id = 1` }, connection.sequelize);
                req.body = { table: 'origin', id: rows[rows.length -1].id, app_id: 'TT' + getRandomArbitrary(9999, 99999), system_id: 1, title: 'Test 1' + getRandomArbitrary(9999, 99999), finished: false, finished_at: null, collection: false, genuine: false, fisical_disc: false };
                await requests(connection).updateGame(req, res)
                expect(res.status.calledWith(200)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('update a valid Origin Game Finished', async () => {
                const rows = await select('Games', { where: `"Games".system_id = 1` }, connection.sequelize);
                req.body = { table: 'origin', id: rows[rows.length -1].id, app_id: 'TT' + getRandomArbitrary(9999, 99999), system_id: 1, title: 'Test 2' + getRandomArbitrary(9999, 99999), finished: true, finished_at: now(), collection: false, genuine: false, fisical_disc: false };
                await requests(connection).updateGame(req, res)
                expect(res.status.calledWith(200)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('update a valid Ubisoft Game not Finished', async () => {
                const rows = await select('Games', { where: `"Games".system_id = 3` }, connection.sequelize);
                req.body = { table: 'ubisoft', id: rows[rows.length -1].id, app_id: 'TT' + getRandomArbitrary(9999, 99999), system_id: 3, title: 'Test 1' + getRandomArbitrary(9999, 99999), finished: false, finished_at: null, collection: false, genuine: false, fisical_disc: false };
                await requests(connection).updateGame(req, res)
                expect(res.status.calledWith(200)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('update a valid Ubisoft Game Finished', async () => {
                const rows = await select('Games', { where: `"Games".system_id = 3` }, connection.sequelize);
                req.body = { table: 'ubisoft', id: rows[rows.length -1].id, app_id: 'TT' + getRandomArbitrary(9999, 99999), system_id: 3, title: 'Test 2' + getRandomArbitrary(9999, 99999), finished: true, finished_at: now(), collection: false, genuine: false, fisical_disc: false };
                await requests(connection).updateGame(req, res)
                expect(res.status.calledWith(200)).toBeTruthy()
            }, DEFAULT_TIMEOUT);


            it('update a valid GameCube Game not Finished', async () => {
                const rows = await select('Games', { where: `"Games".system_id = 4` }, connection.sequelize);
                req.body = { table: 'gamecube', id: rows[rows.length -1].id, app_id: 'TT' + getRandomArbitrary(9999, 99999), system_id: 4, title: 'Test 1' + getRandomArbitrary(9999, 99999), finished: false, finished_at: null, collection: false, genuine: false, fisical_disc: false };
                await requests(connection).updateGame(req, res)
                expect(res.status.calledWith(200)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('update a valid GameCube Game Finished', async () => {
                const rows = await select('Games', { where: `"Games".system_id = 4` }, connection.sequelize);
                req.body = { table: 'gamecube', id: rows[rows.length -1].id, app_id: 'TT' + getRandomArbitrary(9999, 99999), system_id: 4, title: 'Test 2' + getRandomArbitrary(9999, 99999), finished: true, finished_at: now(), collection: false, genuine: false, fisical_disc: false };
                await requests(connection).updateGame(req, res)
                expect(res.status.calledWith(200)).toBeTruthy()
            }, DEFAULT_TIMEOUT);


            it('update a valid Wii Game not Finished', async () => {
                const rows = await select('Games', { where: `"Games".system_id = 5` }, connection.sequelize);
                req.body = { table: 'wii', id: rows[rows.length -1].id, app_id: 'TT' + getRandomArbitrary(9999, 99999), system_id: 5, title: 'Test 1' + getRandomArbitrary(9999, 99999), finished: false, finished_at: null, collection: false, genuine: false, fisical_disc: false };
                await requests(connection).updateGame(req, res)
                expect(res.status.calledWith(200)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('update a valid Wii Game Finished', async () => {
                const rows = await select('Games', { where: `"Games".system_id = 5` }, connection.sequelize);
                req.body = { table: 'wii', id: rows[rows.length -1].id, app_id: 'TT' + getRandomArbitrary(9999, 99999), system_id: 5, title: 'Test 2' + getRandomArbitrary(9999, 99999), finished: true, finished_at: now(), collection: false, genuine: false, fisical_disc: false };
                await requests(connection).updateGame(req, res)
                expect(res.status.calledWith(200)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('update a valid WiiU Game not Finished', async () => {
                const rows = await select('Games', { where: `"Games".system_id = 6` }, connection.sequelize);
                req.body = { table: 'wiiu', id: rows[rows.length -1].id, app_id: 'TT' + getRandomArbitrary(9999, 99999), system_id: 6, title: 'Test 1' + getRandomArbitrary(9999, 99999), finished: false, finished_at: null, collection: false, genuine: false, fisical_disc: false };
                await requests(connection).updateGame(req, res)
                expect(res.status.calledWith(200)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('update a valid WiiU Game Finished', async () => {
                const rows = await select('Games', { where: `"Games".system_id = 6` }, connection.sequelize);
                req.body = { table: 'wiiu', id: rows[rows.length -1].id, app_id: 'TT' + getRandomArbitrary(9999, 99999), system_id: 6, title: 'Test 2' + getRandomArbitrary(9999, 99999), finished: true, finished_at: now(), collection: false, genuine: false, fisical_disc: false };
                await requests(connection).updateGame(req, res)
                expect(res.status.calledWith(200)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('update a valid Virtual Console Game not Finished', async () => {
                const rows = await select('VirtualConsole', { where: `"VirtualConsole".system_id = 7` }, connection.sequelize);
                req.body = { table: 'virtualconsole', id: rows[rows.length -1].id, app_id: 'TT' + getRandomArbitrary(9999, 99999), system_id: 7, title: 'Test 3' + getRandomArbitrary(9999, 99999), finished: false, finished_at: null, genuine: true };
                await requests(connection).updateGame(req, res)
                expect(res.status.calledWith(200)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('update a valid Virtual Console Game Finished', async () => {
                const rows = await select('VirtualConsole', { where: `"VirtualConsole".system_id = 7` }, connection.sequelize);
                req.body = { table: 'virtualconsole', id: rows[rows.length -1].id, app_id: 'TT' + getRandomArbitrary(9999, 99999), system_id: 7, title: 'Test 3' + getRandomArbitrary(9999, 99999), finished: true, finished_at: now(), genuine: true };
                await requests(connection).updateGame(req, res)
                expect(res.status.calledWith(200)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('update a valid To Buy Game not Finished', async () => {
                const rows = await select('ToBuy', {}, connection.sequelize);
                req.body = { table: 'tobuy', id: rows[rows.length - 1].id, title: 'Test 4' + getRandomArbitrary(9999, 99999), finished: false, finished_at: null, genuine: false, system: 'Test System', magnetic_link: 'XXXXXXXXXXXXXX' };
                await requests(connection).updateGame(req, res)
                expect(res.status.calledWith(200)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('update a valid To Buy Game Finished', async () => {
                const rows = await select('ToBuy', {}, connection.sequelize);
                req.body = { table: 'tobuy', id: rows[rows.length - 1].id, title: 'Test 4' + getRandomArbitrary(9999, 99999), finished: true, finished_at: now(), genuine: false, system: 'Test System', magnetic_link: 'XXXXXXXXXXXXXX' };
                await requests(connection).updateGame(req, res)
                expect(res.status.calledWith(200)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('update a valid Playing not Finished', async () => {

                let data1 = [
                    {
                        app_id: `237110`,
                        title: `Title`,
                        started_at: new Date(),
                        finished: true,
                        finished_at: new Date(),
                        created_at: new Date(),
                        updated_at: new Date(),
                    },
                ];


                let [rows, metadata] = await batchInsert('Playing', data1, connection.sequelize);

                req.body = { table: 'playing', id: rows[0].id, app_id: '237110', title: 'Test 5' + getRandomArbitrary(9999, 99999), started_at: now(), finished: false, finished_at: null };
                await requests(connection).updateGame(req, res)
                expect(res.status.calledWith(200)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('update a valid Playing Finished', async () => {

                let data1 = [
                    {
                        app_id: `237110`,
                        title: `Title`,
                        started_at: new Date(),
                        finished: true,
                        finished_at: new Date(),
                        created_at: new Date(),
                        updated_at: new Date(),
                    },
                ];



                let [rows, metadata] = await batchInsert('Playing', data1, connection.sequelize);
                req.body = { table: 'playing', id: rows[0].id, app_id: '237110', title: 'Test 5' + getRandomArbitrary(9999, 99999), started_at: now(), finished: true, finished_at: now() };
                await requests(connection).updateGame(req, res)
                expect(res.status.calledWith(200)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('update a valid DLC not Finished', async () => {
                const rows = await select('DLC', { where: `app_id = '12210'` }, connection.sequelize);
                req.body = { table: 'dlcs', id: rows[0].id, app_id: '12210', title: 'Test 6' + getRandomArbitrary(9999, 99999), finished: false, finished_at: null, collection: false };
                await requests(connection).updateGame(req, res)
                expect(res.status.calledWith(200)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

            it('update a valid DLC Finished', async () => {
                const rows = await select('DLC', { where: `app_id = '12210'` }, connection.sequelize);
                req.body = { table: 'dlcs', id: rows[0].id, app_id: '12210', title: 'Test 6' + getRandomArbitrary(9999, 99999), finished: true, finished_at: now(), collection: false };
                await requests(connection).updateGame(req, res)
                expect(res.status.calledWith(200)).toBeTruthy()
            }, DEFAULT_TIMEOUT);

        });
    });


});
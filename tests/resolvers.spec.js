import 'dotenv/config'
import db from '../src/models/index';
import { v4 as uuidv4 } from 'uuid';

import * as resolvers from '../src/resolvers';

const sinon = require('sinon');

const DEFAULT_TIMEOUT = 50000;
const connection = db;

let ctx = {}

const mockContext = () => {
    const res = {};
    res.orm = connection;
    res.requestedFields = { getFields: sinon.stub().returns(res) }
    return res;
};

describe("resolvers", () => {

    beforeEach(() => {
        ctx = {}
        ctx = mockContext();
    });

    it('getConsoleFinishedGames', async () => {
        const parent = {}, args = { finished: true }, info = {}
        const result = await resolvers.getConsoleFinishedGames(parent, args, ctx, info)
        expect(result).not.toBeNull;
        expect(result.length).toBeGreaterThanOrEqual(1);
    }, DEFAULT_TIMEOUT);

});
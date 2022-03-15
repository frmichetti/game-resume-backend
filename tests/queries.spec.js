/** @format */
import * as db from '../src/models/index';
import { v4 as uuidv4 } from 'uuid';

const DEFAULT_TIMEOUT = 50000;
const { clearTables } = require('./dbclear');


let connection = db.sequelize;

const { batchInsert, insert, update, insertOrUpdate, select, exclude } = require('../src/_query');

const _cleanFn = async () => {
	return await clearTables(connection, ['Playing']);
};

describe('Query Util', () => {
	beforeEach(_cleanFn);
	afterEach(_cleanFn);

	describe('batchInsert', () => {
		it('should generate a single insert statement and insert data', async () => {
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



			let [rows, metadata] = await batchInsert('Playing', data1, connection);
			expect(rows).not.toBeNull;
			expect(rows.length).toBeGreaterThanOrEqual(1);

			let query2 = `(select id from "System" where system = '{system}' limit 1)`;

			let data2 = [
				{
					app_id: uuidv4(),
					system_id: query2.replace('{system}', 'Origin'),
					title: "Teste 1",
					finished: false,
					finished_at: null,
					collection: false,
					genuine: true,
					fisical_disc: false,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					app_id: uuidv4(),
					system_id: query2.replace('{system}', 'Origin'),
					title: "Teste 2",
					finished: false,
					finished_at: null,
					collection: false,
					genuine: true,
					fisical_disc: false,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					app_id: uuidv4(),
					system_id: query2.replace('{system}', 'Origin'),
					title: "Teste 3",
					finished: false,
					finished_at: null,
					collection: false,
					genuine: true,
					fisical_disc: false,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					app_id: uuidv4(),
					system_id: query2.replace('{system}', 'Origin'),
					title: "Teste 4",
					finished: false,
					finished_at: null,
					collection: false,
					genuine: true,
					fisical_disc: false,
					created_at: new Date(),
					updated_at: new Date(),
				},
			];

			[rows, metadata] = await batchInsert('Games', data2, connection);
			expect(rows).not.toBeNull;
			expect(rows.length).toBeGreaterThanOrEqual(1);
		}, DEFAULT_TIMEOUT);
	});

	describe('insert', () => {
		it('should generate a insert statement and execute', async () => {
			const data = {
				app_id: `237110`,
				title: `Title`,
				started_at: new Date(),
				finished: true,
				finished_at: new Date(),
				created_at: new Date(),
				updated_at: new Date(),
			};

			const [rows, metadata] = await insert('Playing', data, connection);
			expect(rows).not.toBeNull;
			expect(rows.length).toEqual(1);
		}, DEFAULT_TIMEOUT);
	});

	describe('update', () => {
		it('should generate a update statement and execute', async () => {
			let data = {
				app_id: `237110`,
				title: `Title`,
				started_at: new Date(),
				finished: true,
				finished_at: new Date(),
				created_at: new Date(),
				updated_at: new Date(),
			};
			const [res, meta] = await insert('Playing', data, connection);

			data.id = res[0].id;
			const [rows, metadata] = await update('Playing', data, connection);
			expect(rows).not.toBeNull;
			expect(rows.length).toEqual(1);
		}, DEFAULT_TIMEOUT);
	});

	describe('insertOrUpdate', () => {
		it('should generate a update statement and execute', async () => {
			let data = {
				app_id: `237110`,
				title: `Title`,
				started_at: new Date(),
				finished: true,
				finished_at: new Date(),
				created_at: new Date(),
				updated_at: new Date(),
			};
			const [res, meta] = await insertOrUpdate('Playing', data, connection);

			data.id = res[0].id;
			const [rows, metadata] = await insertOrUpdate('Playing', data, connection);
			expect(rows).not.toBeNull;
			expect(rows.length).toEqual(1);
		}, DEFAULT_TIMEOUT);

		it('should generate a insert statement and execute', async () => {
			const data = {
				app_id: `237110`,
				title: `Title`,
				started_at: new Date(),
				finished: true,
				finished_at: new Date(),
				created_at: new Date(),
				updated_at: new Date(),
			};

			const [rows, metadata] = await insertOrUpdate('Playing', data, connection);
			expect(rows).not.toBeNull;
			expect(rows.length).toBeGreaterThanOrEqual(1);
		}, DEFAULT_TIMEOUT);
	});

	describe('select', () => {
		beforeEach(() => {
			const promises = [1, 2, 3, 4, 5].map(n =>
				insert(
					'Playing',
					{
						app_id: `237110`,
						title: `n${n}`,
						started_at: new Date(),
						finished: true,
						finished_at: new Date(),
						created_at: new Date(),
						updated_at: new Date(),
					},
					connection
				)
			);
			return Promise.all(promises);
		});

		// afterEach(_cleanFn);

		it(
			'should return all rows when no options is specified',
			async () => {
				const rows = await select('Playing', {}, connection);
				expect(rows).not.toBeNull;
				expect(rows.length).toEqual(5);
			},
			DEFAULT_TIMEOUT
		);

		it(
			'should return all rows when options join is specified',
			async () => {
				const options = { join: [{ target: 'Games', on: '"Playing".app_id = "Games".app_id', type: 'INNER JOIN' }] };
				const rows = await select('Playing', options, connection);
				expect(rows).not.toBeNull;
				expect(rows.length).toEqual(5);
			},
			DEFAULT_TIMEOUT
		);

		it(
			'should return all rows when multiple options join is specified',
			async () => {
				const options = {
					join: [
						{ target: 'Games', on: '"Playing".app_id = "Games".app_id', type: 'INNER JOIN' },
						{ target: 'System', on: '"Games".system_id = "System".id', type: 'INNER JOIN' },
						{ target: 'CodeAndTip', on: '"Playing".app_id = "CodeAndTip".app_id', type: 'LEFT JOIN' }]
				};
				const rows = await select('Playing', options, connection);
				expect(rows).not.toBeNull;
				expect(rows.length).toEqual(5)
			},
			DEFAULT_TIMEOUT
		);

		it(
			'should return all rows when multiple options join and selects is specified',
			async () => {
				const options = {
					join: [
						{ target: 'Games', on: '"Playing".app_id = "Games".app_id', type: 'INNER JOIN' },
						{ target: 'System', on: '"Games".system_id = "System".id', type: 'INNER JOIN' },
						{ target: 'CodeAndTip', on: '"Playing".app_id = "CodeAndTip".app_id', type: 'LEFT JOIN' }],
					select: [
						{ table: 'Games', column: 'id', as: 'game_id' },
						{ table: 'Games', column: 'app_id', as: 'game_app_id' },
						{ table: 'System', column: 'id', as: 'system_id' },
						{ table: 'CodeAndTip', column: 'id', as: 'code_id' }],
				};
				const rows = await select('Playing', options, connection);
				expect(rows).not.toBeNull;
				expect(rows.length).toEqual(5);
			},
			DEFAULT_TIMEOUT
		);

		it(
			'should return all rows when multiple options join, selects and where is specified',
			async () => {
				const options = {
					join: [
						{ target: 'Games', on: '"Playing".app_id = "Games".app_id', type: 'INNER JOIN' },
						{ target: 'System', on: '"Games".system_id = "System".id', type: 'INNER JOIN' },
						{ target: 'CodeAndTip', on: '"Playing".app_id = "CodeAndTip".app_id', type: 'LEFT JOIN' }],
					select: [
						{ table: 'Games', column: 'id', as: 'game_id' },
						{ table: 'Games', column: 'app_id', as: 'game_app_id' },
						{ table: 'System', column: 'id', as: 'system_id' },
						{ table: 'CodeAndTip', column: 'id', as: 'code_id' }],
					where: '"Games".id > 0',
				};
				const rows = await select('Playing', options, connection);
				expect(rows).not.toBeNull;
				expect(rows.length).toEqual(5);
			},
			DEFAULT_TIMEOUT
		);

		it(
			'should return all rows when multiple options join, selects, where, limit and offset is specified',
			async () => {
				const options = {
					join: [
						{ target: 'Games', on: '"Playing".app_id = "Games".app_id', type: 'INNER JOIN' },
						{ target: 'System', on: '"Games".system_id = "System".id', type: 'INNER JOIN' },
						{ target: 'CodeAndTip', on: '"Playing".app_id = "CodeAndTip".app_id', type: 'LEFT JOIN' }],
					select: [
						{ table: 'Games', column: 'id', as: 'game_id' },
						{ table: 'Games', column: 'app_id', as: 'game_app_id' },
						{ table: 'System', column: 'id', as: 'system_id' },
						{ table: 'CodeAndTip', column: 'id', as: 'code_id' }],
					where: '"Games".id > 0',
					limit: 3,
					offset: 2,
				};
				const rows = await select('Playing', options, connection);
				expect(rows).not.toBeNull;
				expect(rows.length).toEqual(3);
			},
			DEFAULT_TIMEOUT
		);
	});

	describe('exclude', () => {
		it('should generate a delete statement and execute when no options is provided', async () => {
			const data = {
				app_id: '208650',
				title: 'Title',
				finished: true,
				started_at: new Date(),
				finished_at: new Date(),
				created_at: new Date(),
				updated_at: new Date(),
			};

			let [rows, metadata] = await insert('Playing', data, connection);
			expect(rows).not.toBeNull;
			expect(rows.length).toEqual(1);

			(rows = await exclude('Playing', {}, connection));
			expect(rows).not.toBeNull;
			expect(rows.length).toEqual(1);
		}, DEFAULT_TIMEOUT);

		it('should generate a delete statement and execute when literal condition is provided', async () => {
			const data = [
				{
					app_id: '208650',
					title: 'Title 1',
					finished: true,
					started_at: new Date(),
					finished_at: new Date(),
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					app_id: '208650',
					title: 'Title 1',
					finished: false,
					started_at: new Date(),
					finished_at: null,
					created_at: new Date(),
					updated_at: new Date(),
				},
			];

			let [rows, metadata] = await batchInsert('Playing', data, connection);
			expect(rows).not.toBeNull;
			expect(rows.length).toEqual(2);

			const conditions = { literal: 'id > 0' };
			(rows = await exclude('Playing', conditions, connection));
			expect(rows).not.toBeNull;
			expect(rows.length).toEqual(2);
		}, DEFAULT_TIMEOUT);

		it('should generate a delete statement and execute when id condition is provided', async () => {
			const data = [
				{
					app_id: '208650',
					title: 'Title 1',
					finished: true,
					started_at: new Date(),
					finished_at: new Date(),
					created_at: new Date(),
					updated_at: new Date(),
				},
			];

			let [rows, metadata] = await batchInsert('Playing', data, connection);
			expect(rows).not.toBeNull;
			expect(rows.length).toEqual(1);

			const conditions = { id: rows[0].id };
			(rows = await exclude('Playing', conditions, connection));
			expect(rows).not.toBeNull;
			expect(rows.length).toEqual(1);
		}, DEFAULT_TIMEOUT);
	});
});

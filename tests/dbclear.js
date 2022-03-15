/** @format */
const { QueryTypes } = require('sequelize');
const TABLE_NAMES_QUERY = `SELECT tablename FROM "pg_tables" WHERE schemaname='public' AND tablename NOT LIKE('%migration%')`;

const clearAllTables = async connection => {

  const { rows } = await connection.query(TABLE_NAMES_QUERY);

  const statements = rows.map(r => `TRUNCATE TABLE "${r.tablename}" CASCADE`).join(';');
  return await connection.query(statements, { type: QueryTypes.SELECT });
};

const clearTables = async (connection, tableNames) => {
  const statements = tableNames.map(n => `DELETE FROM "${n}" WHERE id > 0`).join(';');
  return await connection.query(statements, { type: QueryTypes.DELETE });
};

const methods = {
  clearAllTables,
  clearTables,
};

module.exports = methods;

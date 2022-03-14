/** @format */

const TABLE_NAMES_QUERY = "SELECT tablename FROM pg_tables WHERE schemaname='public' AND tablename NOT LIKE('%migration%')";

const clearAllTables = async connection => {
  try {
    const { rows } = await connection.query(TABLE_NAMES_QUERY);

    const statements = rows.map(r => `TRUNCATE TABLE ${r.tablename} CASCADE`).join(';');
    await connection.query(statements);

    return true;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const clearTables = async (connection, tableNames) => {
  try {
    const statements = tableNames.map(n => `DELETE FROM ${n}`).join(';');
    await connection.query(statements);
    return true;
  } catch (e) {
    throw e;
  }
};

const methods = {
  clearAllTables,
  clearTables,
};

module.exports = methods;

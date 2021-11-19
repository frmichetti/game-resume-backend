import DataLoader from "dataloader"


class DLCLoader {
    static async batchDlcs(connection, ids) {
        let idsString = ids.map(v => `"${v}"`).toString();
        let sql = `SELECT * FROM [dlcs] WHERE id IN (${idsString}) ORDER BY id ASC;`;
        console.log("data loader sql: ", sql)
        const dlcs = await connection.query(sql);


        const ordened = new Map()

        dlcs.forEach(dlc=>{
            ordened.set(dlc.id, [])
        })

        let id;
        dlcs.forEach(dlc => {
            id = dlc.id
            ordened.get(id).push(dlc)
        })

        let response = ids.map(id => ordened.get(id))
        response = response.map(i => i == undefined ? [] : i)
        return Promise.resolve(response);
    }
}

export class DataLoaderFactory {
    constructor(connection) {
        this.db = connection;
    }

    getLoaders() {
        return {
            dlcLoader: new DataLoader((ids) => {
                return DLCLoader.batchDlcs(this.db, ids)
            })
        }
    }
}
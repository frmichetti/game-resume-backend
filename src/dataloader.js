import DataLoader from "dataloader"

class DLCLoader {
    /**
     * TODO: FIXME only works on getWiiUGame(id: "")
     */    
    static async batchDlcs(connection, ids) {
        let idsString = ids.map(v => `"${v}"`).toString();
        let sql = `SELECT * FROM [dlcs] WHERE id IN (${idsString}) ORDER BY id ASC;`;
        console.log("data loader sql: ", sql)
        const result = await connection.query(sql);
        
        return Promise.resolve([result]);
    }
}

export class DataLoaderFactory {    
    constructor(connection){
        this.db = connection;
    }

    getLoaders() {        
        return {
            dlcLoader : new DataLoader((ids)=> {
                return DLCLoader.batchDlcs(this.db, ids)
            })
        }
    }
}
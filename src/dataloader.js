import DataLoader from "dataloader"
import _ from "lodash";
class DLCLoader {    
    static async batchDlcs(connection, ids) {
        let idsString = ids.map(v => `"${v}"`).toString();
        let sql = `SELECT * FROM [dlcs] WHERE id IN (${idsString}) ORDER BY id ASC;`;
        console.log("data loader sql: ", sql)
        const dlcs = await connection.query(sql);

        const arr = []

        // cria um objeto js onde cada chave é um id de dlc
        // e o valor, o dlc em si
        const dlcsMap = dlcs.reduce((prev, dlc) => {            
            return { ...prev, [dlc.id]: [prev, dlc] }
        }
        );
        
        let ordened;

        // garante que os dlcs serão retornados na mesma ordem
        // do array de ids
        ordened = ids.map(id => dlcsMap[id])
        
        ordened = ordened.map(o => o == undefined ? [] : o)

        return Promise.resolve(ordened);
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
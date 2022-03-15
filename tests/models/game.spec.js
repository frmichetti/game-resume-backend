
import * as db from '../../src/models/index';
import { v4 as uuidv4 } from 'uuid';


describe('tests with Game model', () => {
    test('should to be reject to create a Game Model', ()  => {
        
        const payload = {            
            app_id: "T3",
            title: "Teste 3",
            finished: true,
            finished_at: new Date(),
            system_id: 2,
            collection: false,
            genuine: true,
            fisical_disc: false
        }


        expect(db.Game.create(payload)).rejects
    });
    
    test('should to be resolves to create a Game Model', ()  => {
        
        const payload = {            
            app_id: uuidv4(),
            title: "Teste 3",
            finished: false,
            finished_at: null,
            system_id: 2,
            collection: false,
            genuine: false,
            fisical_disc: false
        }


        expect(db.Game.create(payload)).resolves
    })
})
// The root provides a resolver function for each API endpoint
export const root = {    
    allWiiUGames: async (_,ctx) => {        
        const games = await ctx.db.query('SELECT * FROM [wiiu_games]')
        return games;
    },
    allWiiGCGames: async (_,ctx) => {        
      const games = await ctx.db.query('SELECT * FROM [wii_gc_games]')
      return games;
    },
    allOriginGames: async (_,ctx) => {        
      const games = await ctx.db.query('SELECT * FROM [origin_games]')
      return games;
    },
    allUbisoftGames: async (_,ctx) => {        
      const games = await ctx.db.query('SELECT * FROM [ubisoft_games]')
      return games;
    },
    getWiiUGame: async ({id}, ctx) => {      
        const game = await ctx.db.query(`SELECT * FROM [wiiu_games] WHERE [id] = '${id}'`)
        return game[0];        
    },
    getWiiGCGame: async ({id}, ctx) => {      
      const game = await ctx.db.query(`SELECT * FROM [wii_gc_games] WHERE [id] = '${id}'`)
      return game[0];        
    },
    getOriginGame: async ({idx}, ctx) => {      
      const game = await ctx.db.query(`SELECT * FROM [origin_games] WHERE [idx] = ${idx}`)
      return game[0];        
    },
    getUbisoftGame: async ({idx}, ctx) => {      
      const game = await ctx.db.query(`SELECT * FROM [ubisoft_games] WHERE [idx] = ${idx}`)
      return game[0];        
    },
    createWiiUGame: async (_, ctx) => {
      const {id,title,finished,fisical_disc} = _.input;
      await ctx.db.execute(`INSERT INTO [wiiu_games] (id,title,finished,fisical_disc) VALUES ('${id}','${title}',${finished},${fisical_disc});`)
      const game = await ctx.db.query(`SELECT * FROM [wiiu_games] WHERE [id] = '${id}' AND [title] = '${title}'`)      
      return game[0];        
    },
    createWiiGCGame: async (_, ctx) => {
      const {id,title,finished,fisical_disc, size_gb, iso_type, console} = _.input;
      await ctx.db.execute(`INSERT INTO [wii_gc_games] (id,title,finished,fisical_disc,size_gb,iso_type,console) VALUES ('${id}','${title}',${finished},${fisical_disc},'${size_gb}', '${iso_type}', '${console}');`)
      const game = await ctx.db.query(`SELECT * FROM [wii_gc_games] WHERE [id] = '${id}' AND [title] = '${title}'`)      
      return game[0];        
    },
    createOriginGame: async (_, ctx) => {
      const {id,title,finished} = _.input;
      await ctx.db.execute(`INSERT INTO [origin_games] (id,title,finished) VALUES ('${id}','${title}',${finished});`)
      const game = await ctx.db.query(`SELECT * FROM [origin_games] WHERE [id] = '${id}' AND [title] = '${title}'`)      
      return game[0];        
    },
    createUbisoftGame: async (_, ctx) => {
      const {id,title,finished} = _.input;
      await ctx.db.execute(`INSERT INTO [ubisoft_games] (id,title,finished) VALUES ('${id}','${title}',${finished});`)
      const game = await ctx.db.query(`SELECT * FROM [ubisoft_games] WHERE [id] = '${id}' AND [title] = '${title}'`)      
      return game[0];        
    },
    updateWiiUGame: async (_, ctx) => {
      const {id,idx,title,finished,fisical_disc} = _.input;
      await ctx.db.execute(`UPDATE [wiiu_games] SET [id] = '${id}',[title] = '${title}', [finished] = ${finished}, [fisical_disc] = ${fisical_disc} WHERE [idx] = ${idx};`)
      const game = await ctx.db.query(`SELECT * FROM [wiiu_games] WHERE [idx] = ${idx}`)      
      return game[0];        
    },
    updateWiiGCGame: async (_, ctx) => {
      const {id,idx,title,finished,fisical_disc, size_gb, iso_type, console} = _.input;
      await ctx.db.execute(`UPDATE [wii_gc_games] SET [id] = '${id}',[title] = '${title}', [finished] = ${finished}, [fisical_disc] = ${fisical_disc}, [size_gb] = '${size_gb}', [iso_type] = '${iso_type}', [console] = '${console}' WHERE [idx] = ${idx};`)
      const game = await ctx.db.query(`SELECT * FROM [wii_gc_games] WHERE [idx] = ${idx}`)      
      return game[0];        
    },
    updateOriginGame: async (_, ctx) => {
      const {id,idx,title,finished} = _.input;
      await ctx.db.execute(`UPDATE [origin_games] SET [id] = '${id}',[title] = '${title}', [finished] = ${finished} WHERE [idx] = ${idx};`)
      const game = await ctx.db.query(`SELECT * FROM [origin_games] WHERE [idx] = ${idx}`)      
      return game[0];        
    },
    updateUbisoftGame: async (_, ctx) => {
      const {id,idx,title,finished} = _.input;
      await ctx.db.execute(`UPDATE [ubisoft_games] SET [id] = '${id}',[title] = '${title}', [finished] = ${finished} WHERE [idx] = ${idx};`)
      const game = await ctx.db.query(`SELECT * FROM [ubisoft_games] WHERE [idx] = ${idx}`)      
      return game[0];        
    },
    deleteWiiUGame: async ({idx}, ctx) => {
      let resp;
      try {
        await ctx.db.execute(`DELETE FROM [wiiu_games] WHERE [idx] = ${idx};`)  
        resp = true;
      } catch (error) {
        console.error(error)
        resp = false
      }      
      return resp;
    },
    deleteWiiGCGame: async ({idx}, ctx) => {
      let resp;
      try {
        await ctx.db.execute(`DELETE FROM [wii_gc_games] WHERE [idx] = ${idx};`)  
        resp = true;
      } catch (error) {
        console.error(error)
        resp = false
      }      
      return resp;
    },
    deleteOriginGame: async ({idx}, ctx) => {
      let resp;
      try {
        await ctx.db.execute(`DELETE FROM [origin_games] WHERE [idx] = ${idx};`)  
        resp = true;
      } catch (error) {
        console.error(error)
        resp = false
      }      
      return resp;
    },
    deleteUbisoftGame: async ({idx}, ctx) => {
      let resp;
      try {
        await ctx.db.execute(`DELETE FROM [ubisoft_games] WHERE [idx] = ${idx};`)  
        resp = true;
      } catch (error) {
        console.error(error)
        resp = false
      }      
      return resp;
    }
  };  
import express from 'express';
import * as requests from './requests';

import db from './models/index';
import cors from 'cors';
import bodyParser from "body-parser";

import { graphqlHTTP } from 'express-graphql';

import schema from './schema';
import { DataLoaderFactory } from './dataloader';
import { RequestedFiels } from './RequestedFields';

const json2xls = require('json2xls');

process.env.TZ = 'America/Sao_Paulo';


const app = express();
const dataLoaderFactory = new DataLoaderFactory(db);
const requestedFields = new RequestedFiels();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));
app.use(json2xls.middleware);

function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}

app.use(errorHandler);

/* process.on('uncaughtException', function (error) {
  console.log(error.stack);
  console.log("Node NOT Exiting...");
}); */

app.use('/graphql',
  (req, res, next) => {
    req["context"] = {}      
    req["context"].orm = db;  
    req["context"].dataloaders = dataLoaderFactory.getLoaders();
    req["context"].requestedFields = requestedFields;
    next();
  }
  , graphqlHTTP((req) => ({
    schema,
    graphiql: true,
    context: req['context']
  })));


//Here we are configuring express to use body-parser as middle-ware.

const port = 4000;

app.get('/', requests.showWelcome);
app.get('/test', requests.showTest);
app.get('/statistics', requests.showStatistics);
app.get('/categories', requests.showCategories);
app.get('/game/:app_id', requests.showGame);
app.get('/game/:app_id/categories', requests.showCategoriesOfGame);
app.get('/game/:app_id/dlcs', requests.showDLCsOfGame);
app.get('/game/:app_id/codes', requests.showCodesOfGame);
app.get('/origin', requests.showOriginGames);
app.get('/ubisoft', requests.showUbisoftGames);
app.get('/steam', requests.showSteamGames);
app.get('/steam_api', requests.getSteamGames);
app.get('/all', requests.showAllGames);
app.get('/gamecube', requests.showGameCubeGames);
app.get('/virtualconsole', requests.showVirtualConsoleGames);
app.get('/tobuy', requests.showToBuyGames);
app.get('/wii', requests.showWiiGames);
app.get('/wiiu', requests.showWiiUGames);
app.get('/pc', requests.showPCGames);
app.get('/console', requests.showConsoleGames);
app.get('/dlcs', requests.showDLCs);
app.get('/charts', requests.showCharts);
app.get('/playing', requests.showPlayingGames);
app.get('/report', requests.showReport);
app.get('/csv', requests.exportToCsv);
app.get('/pdf', requests.exportToPDF);
app.get('/xls', requests.exportToXls)
app.get('/search', requests.searchGame);
app.get('/genre_search', requests.genreSearchGame);
app.get('/trash', requests.showTrash);

app.post('/create', requests.createGames);
app.post('/categories', requests.createCategory);
app.post('/game/:app_id/categories', requests.addCategoriesToGame);
app.post('/dlc_finished', requests.finishDLC);
app.post('/finished', requests.finishGame);
app.post('/code', requests.saveCode);
app.post('/restore', requests.restore);

app.put('/update', requests.updateGame);
app.put('/categories', requests.updateCategory);
app.put('/game/:app_id/categories', requests.updateCategoriesToGame);
app.put('/code', requests.updateCode);

app.delete('/remove', requests.deleteGame);
app.delete('/trash', requests.deleteTrash);


app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
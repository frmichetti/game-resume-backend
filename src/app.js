import express from 'express';
import * as requests from './requests';
import { connection } from './queries';
import cors from 'cors';
import bodyParser from "body-parser";

import { graphqlHTTP } from 'express-graphql';

import schema from './schema';
import { DataLoaderFactory } from './dataloader';
import { RequestedFiels } from './RequestedFields';


const app = express();
const dataLoaderFactory = new DataLoaderFactory(connection);
const requestedFields = new RequestedFiels();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.use('/graphql',
  (req, res, next) => {
    req["context"] = {}
    req["context"].db = connection;
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
app.get('/origin', requests.showOriginGames);
app.get('/ubisoft', requests.showUbisoftGames);
app.get('/steam', requests.showSteamGames);
app.get('/all', requests.showAllGames);
app.get('/gamecube', requests.showGameCubeGames);
app.get('/virtualconsole', requests.showVirtualConsoleGames);
app.get('/tobuy', requests.showToBuyGames);
app.get('/wii', requests.showWiiGames);
app.get('/wiiu', requests.showWiiUGames);
app.get('/pc', requests.showPCGames);
app.get('/console', requests.showConsoleGames);
app.get('/dlcs', requests.showDLCs)
app.get('/charts', requests.showCharts)

app.post('/create', requests.createGames);
app.post('/dlc_finished', requests.finishDLC);
app.post('/finished', requests.finishGame);
app.post('/search', requests.searchGame)

app.put('/update', requests.updateGame);

app.delete('/remove', requests.deleteGame);


app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
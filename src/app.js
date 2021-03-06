import 'dotenv/config'

import express from 'express';
const { requests } = require('./requests');

import db from './models/index';
import cors from 'cors';
import bodyParser from "body-parser";

import { graphqlHTTP } from 'express-graphql';

import schema from './schema';
import { DataLoaderFactory } from './dataloader';
import { RequestedFiels } from './RequestedFields';

const morgan = require('morgan');
const errorHandler = require('errorhandler');

const middleware = require('./middleware/validation_middleware');
import * as schemas from './schema/validation_schema'

const json2xls = require('json2xls');
const jwt = require('jsonwebtoken');

const multer = require('multer')
// Configuração de armazenamento
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    // Extração da extensão do arquivo original:
    const extension = file.originalname.split('.')[1];
    const originalName = file.originalname.split('.')[0];

    // Cria um código randômico que será o nome do arquivo
    const novoNomeArquivo = require('crypto')
      .randomBytes(64)
      .toString('hex');

    // Indica o novo nome do arquivo:
    cb(null, `${originalName}.${extension}`)
  }
});
const upload = multer({ storage })

process.env.TZ = 'America/Sao_Paulo';


const app = express();
const dataLoaderFactory = new DataLoaderFactory(db);
const requestedFields = new RequestedFiels();

app.use(cors());
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(json2xls.middleware);
app.use(errorHandler({ log: errorNotification }));
app.use(morgan(':method :url :status :response-time ms - :res[content-length]'));

function errorNotification(err, str, req) {
  var title = 'Error in ' + req.method + ' ' + req.url

  notifier.notify({
    title: title,
    message: str
  })
}

process.on('uncaughtException', function (error) {
  console.log(error.stack);
  console.log("uncaughtException Node NOT Exiting...");
});

const enableGraphiQL = !(process.env.NODE_ENV === 'production')

const port = process.env.PORT || 4000;

// For Use in Graphql
const extractJWTMiddleware = () => {
  return (req, res, next) => {
    let authorization = req.headers['authorization']
    let token = authorization ? authorization.split(' ')[1] : undefined

    req['context'] = {}
    req['context']['authorization'] = authorization;

    if (!token) { return next() }

    jwt.verify(token, process.env.SECRET, async (err, decoded) => {
      if (err) { return next() }

      const user = await db.User.findByPk(decoded.sub, { attributes: ['id', 'name', 'email', 'role'] })

      if (user) {
        req['context']['user'] = {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      }

      return next();
    })
  }
}

// For Use in Rest
const verifyJWT = (req, res, next) => {
  let authorization = req.headers['authorization']
  let token = authorization ? authorization.split(' ')[1] : undefined
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, process.env.SECRET, async (err, decoded) => {
    if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });

    const user = await db.User.findByPk(decoded.sub, { attributes: ['id', 'name', 'email', 'role'] })

    if (user) {
      req.user = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    }
    next();
  });
}

app.use('/graphql',
  extractJWTMiddleware(),
  (req, res, next) => {
    req["context"]['orm'] = db;
    req["context"]['dataloaders'] = dataLoaderFactory.getLoaders();
    req["context"]['requestedFields'] = requestedFields;
    next();
  }
  , graphqlHTTP((req) => ({
    schema,
    graphiql: enableGraphiQL,
    context: req['context']
  })));

app.get('/', requests(db).showWelcome);
app.get('/test', requests(db).showTest);
app.get('/statistics', requests(db).showStatistics);
app.get('/categories', requests(db).showCategories);
app.get('/game/:app_id', requests(db).showGame);
app.get('/game/:app_id/categories', requests(db).showCategoriesOfGame);
app.get('/game/:app_id/dlcs', requests(db).showDLCsOfGame);
app.get('/game/:app_id/codes', requests(db).showCodesOfGame);
app.get('/game/:app_id/system', requests(db).showSystemOfGame);
app.get('/game/:app_id/playing', requests(db).showPlayTimesOfGame);
app.get('/origin', requests(db).showOriginGames);
app.get('/ubisoft', requests(db).showUbisoftGames);
app.get('/steam', requests(db).showSteamGames);
app.get('/steam_api', requests(db).getSteamGames);
app.get('/all', requests(db).showAllGames);
app.get('/gamecube', requests(db).showGameCubeGames);
app.get('/virtualconsole', requests(db).showVirtualConsoleGames);
app.get('/tobuy', requests(db).showToBuyGames);
app.get('/wii', requests(db).showWiiGames);
app.get('/wiiu', requests(db).showWiiUGames);
app.get('/pc', requests(db).showPCGames);
app.get('/console', requests(db).showConsoleGames);
app.get('/dlcs', requests(db).showDLCs);
app.get('/charts', requests(db).showCharts);
app.get('/playing', requests(db).showPlayingGames);
app.get('/report', requests(db).showReport);
app.get('/csv', requests(db).exportToCsv);
app.get('/pdf', requests(db).exportToPDF);
app.get('/xls', requests(db).exportToXls)
app.get('/search', requests(db).searchGame);
app.get('/genre_search', requests(db).genreSearchGame);
app.get('/trash', requests(db).showTrash);

app.post('/load_games', verifyJWT, upload.single('sheet'), requests(db).processXLSToJson);
app.post('/import_data', verifyJWT, requests(db).importData);
app.post('/create', verifyJWT, requests(db).createGames);
app.post('/categories', [verifyJWT, middleware(schemas.category_schema, 'body')], requests(db).createCategory);
app.post('/game/:app_id/categories', verifyJWT, requests(db).addCategoriesToGame);
app.post('/dlc_finished', verifyJWT, requests(db).finishDLC);
app.post('/finished', verifyJWT, requests(db).finishGame);
app.post('/code', verifyJWT, requests(db).saveCode);
app.post('/restore', verifyJWT, requests(db).restore);
app.post('/mail', verifyJWT, requests(db).sendMail);
app.post('/sync_steam', verifyJWT, requests(db).syncSteam)
app.post('/login', requests(db).doLogin)
app.post('/logout', requests(db).doLogout)
app.post('/user', verifyJWT, requests(db).createUser)

app.put('/update', verifyJWT, requests(db).updateGame);
app.put('/categories', [verifyJWT, middleware(schemas.category_schema, 'body')], requests(db).updateCategory);
app.put('/game/:app_id/categories', verifyJWT, requests(db).updateCategoriesToGame);
app.put('/code', verifyJWT, requests(db).updateCode);

app.delete('/remove', verifyJWT, requests(db).deleteGame);
app.delete('/trash', verifyJWT, requests(db).deleteTrash);


app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});


const server = require('http').createServer();
const express = require('express');
const bodyParser = require('body-parser');
const tickers = require('./tickers');
const WebSocketServer = require('ws').Server;
const { Subscription } = require('rxjs');
const getSymbolStream = require('./getSymbolStream');
const cors = require('cors');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

/**
 * THIS IS NOT AT ALL A BEST PRACTICE FOR ANYTHING.
 *
 * THIS IS A BIG, HACKY, LUMP OF GARBAGE TOSSED TOGETHER SO WE HAD SOMETHING TO HIT.
 *
 * DO NOT USE THIS AS AN EXAMPLE OF ANYTHING.
 *
 * EVER. <3
 */

const app = express();
const PORT = 8080;

const wss = new WebSocketServer({ server });

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method, req.body);
  next();
});

app.use((req, res, next) => {
  if (Math.random() < 0.1) {
    next('Womp womp, random error');
  } else {
    next();
  }
});

app.get('/search/', (req, res) => {
  const q = req.query.q;
  console.log(q);
  if (!q) {
    res.send([]);
    return;
  }
  const data = tickers
    .filter(d => d.symbol.indexOf(q.toUpperCase()) === 0)
    .slice(0, 50);
  res.send(data);
});

const todos = {};
let _id = 1;

function todosArray() {
  return Object.keys(todos).map(id => ({
    ...todos[id],
    id: +id
  }));
}

function setTodo(id, data) {
  todos[id] = {
    description: data.description || '',
    done: !!data.done
  };
}

// GET /todos
app.get('/todos/', (req, res) => {
  const arr = todosArray();
  artificialDelay(() => res.send(arr));
});

// PUT: /todos/123
app.put('/todos/:id', upload.array(), (req, res) => {
  const id = req.params.id;
  setTodo(id, req.body);
  const arr = todosArray();
  artificialDelay(() => res.send(arr));
});

// POST: /todos/
app.post('/todos/', upload.array(), (req, res) => {
  const id = _id++;
  setTodo(id, req.body);
  const arr = todosArray();
  artificialDelay(() => res.send(arr));
});

// DELETE /todos/123
app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;
  delete todos[id];
  const arr = todosArray();
  artificialDelay(() => res.send(arr));
});

// Web Sockety stuff
let cid = 0;
wss.on('connection', (ws) => {
  const clientId = cid++;
  let symbolStreams = {};
  const subscription = new Subscription();

  console.log(`client ${clientId} CONNECTED`);

  ws.on('close', () => {
    console.log(`client ${clientId} CLOSED`);
    subscription.unsubscribe();
    symbolStreams = {};
  });

  ws.on('error', (error) => {
    console.log(`client ${clientId} ERROR`);
    console.error(error);
    subscription.unsubscribe();
    symbolStreams = {};
  });

  ws.on('message', (msg) => {
    let payload;
    console.log(`client ${clientId} -> ${msg}`);

    try {
      payload = JSON.parse(msg);
    } catch (err) {
      console.error(`ERROR: client ${clientId} - unable to parse message "${msg}"`);
    }
    const { type, symbol } = payload;
    switch (type) {
      case 'sub':
        if (!symbolStreams[symbol]) {
          symbolStreams[symbol] = subscription.add(
            getSymbolStream(symbol).subscribe(
              price => {
                if (ws.readyState === 1) {
                  const payload = JSON.stringify({ symbol, price });
                  console.log(`client ${clientId} <- ${payload}`);
                  ws.send(payload);
                }
              }
            )
          );
        }
        break;
      case 'unsub':
        if (symbolStreams[symbol]) {
          symbolStreams[symbol].unsubscribe();
          symbolStreams[symbol] = null;
        }
        break;
      default:
        console.error(`ERROR: client ${clientId}: unknown payload type: ${payload.type}`);
        break;
    }
  });
});


server.listen(PORT, () => console.log(`server listening on port ${PORT}`));
server.on('request', app);


function artificialDelay(fn) {
  if (Math.random() < 0.9) {
    fn();
  } else {
    setTimeout(fn, 3000);
  }
}

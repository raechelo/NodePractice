const http = require('http');
const url = require('url');
const server = http.createServer();

server.listen(3000, () => {
  console.log('The http server is listening at Port 3000');
});

server.on('request', (req, res) => {
  if (req.method === 'GET') {
    getAllMessages();
  }
  else if (req.method === 'POST') {
    let newMsg = { 'id': new Date() }

    req.on('data', data => {
      newMsg = Object.assign(newMsg, JSON.parse(data))
    })
  }
  req.on('end'), () => {
    addMessage(newMsg, res)
  }
});

let messages = [
  {'id': 1, 'user': 'brittany storoz', 'message': 'hi there!'},
  {'id': 2, 'user': 'capn pam', 'message': 'whoa!'},
  {'id': 3, 'user': 'bobo', 'message': 'caw!'}
]

const getAllMessages = (res) => {
  res.setHeader('Content-Type', 'application/json')
  res.statusCode = 201
  res.write(JSON.stringify(messages))
  res.end()
}

const addMessage = (newMsg, res) => {
  messages = [...messages, newMsg]
  res.setHeader('Content-Type', 'application/json')
  res.statusCode = 201
  res.write(JSON.stringify(messages))
  res.end()
}
const http = require('http');

var server = http.createServer(function(req, res) {
  let path = join(root, req.url);
  let stream = fs.createReadStream(path);
  stream.pipe(res);
});

server.listen(3001);

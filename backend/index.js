const express = require('express');
const { PORT = 3001 } = process.env;
var cors = require('cors')
const app = express();
app.use(cors())
app.get("/test", function(req, res){     
  res.sendFile(__dirname + "/test1.json");
});
app.listen(PORT, () => {})
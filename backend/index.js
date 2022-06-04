const express = require('express');
const PORT = process.env.PORT || 3001;
var cors = require('cors')
const app = express();
app.use(cors())
app.get("/test", function(req, res){     
  res.sendFile(__dirname + "/test1.json");
});
app.listen(PORT, () => {})
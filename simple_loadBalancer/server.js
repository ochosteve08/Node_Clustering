const express = require("express");
const app = express();
const axios = require("axios");

const servers = ["http://localhost:4000", "http://localhost:4001"];

let current = 0,
  server;
const handler = (req, res) => {
  const { method, url, header, body: data } = req;
  server = servers[current];
  current === servers.length - 1 ? (current = 0) : current++;
  try {
    const response = await({
      url: `{${server}${url}}`,
      method,
      header,
      data,
    });
    console.log(`proxy to ${server} succeeded`);
    res.send(response.data);
  } catch (err) {
    console.log(`proxy to ${server} failed`);
    handler(req, res);
  }
};

app.use((req, res) => {
  handler(req, res);
});

app.listen(8080);

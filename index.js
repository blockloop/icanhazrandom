const express = require("express");
const Chance = require("chance");

const app = express();
const chance = new Chance();
const PORT = 3000;


app.get("/", (req, res) => {
	res.end("coming soon");
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));

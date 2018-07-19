const express = require("express");
const chance = require("chance").Chance();
const autoParse = require("auto-parse");

const app = express();
const PORT = 3000;

app.get("/help", help);
app.get("/:kind", handle);
app.get("/", handle);

app.listen(PORT, () => console.log(`listening at :${PORT}`));

function help(req, res) {
        let keys = []
        for (var prop in chance) {
                keys.push(prop)
        }
        keys = keys.
                filter((k) => (typeof chance[k] === "function")).
                map((k) => `    /${k}`).
                join("\n")
        res.status(200).end(`<pre>available options are:\n${keys}\n</pre>`);
}

function handle(req, res) {
	const kind = req.params.kind || "string";
	const fn = chance[kind];
	if (typeof fn !== "function") {
		res.status(404).end("not found");
		return;
	}

	const q = autoParse(req.query);
	if (q.length && q.length > 1000) {
		return res.status(400).end("error: max length is 1000");
	}

	const val = Reflect.apply(fn, chance, [q]);
	res.status(200).end(`${val}`);
}


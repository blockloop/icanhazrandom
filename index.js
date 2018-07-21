const express = require("express");
const chance = require("chance").
	Chance();
const autoParse = require("auto-parse");
const words = require("random-words");

const app = express();
const PORT = 3000;
const blacklist = ["unique", "n", "pad", "pick", "pickone", "pickset",
	"shuffle", "weighted", "nationalities", "capitalize", "get", "locales",
	"luhn_calculate", "luhn_check", "normal_pool", "provinces",
	"street_suffixes", "md5", "months", "name_prefixes", "name_suffixes",
	"countries", "currency_types", "cc_types", "counties", "countries",
	"states", "timezones", "tlds",
];

app.get("/help", help);
app.get("/password", password);
app.get("/", handle);

keys().
	forEach((key) => app.get(`/${key}`, handle));

app.listen(PORT, () => console.log(`listening at :${PORT}`));

function help(req, res) {
	const paths = app._router.stack.
		filter((m) => m.route != null).
		map((mw) => mw.route.path).
		sort().
		map((p) => `    ${p}`).
		join("\n");
	res.send(`<pre>Available routes:\n${paths}</pre>`);
}

function keys() {
	const props = [];
	for (const prop in chance) {
		props.push(prop);
	}
	return props.
		filter((k) => typeof chance[k] === "function").
		filter((k) => blacklist.indexOf(k) === -1).
		sort();
}

function password(req, res) {
	const w = words({min: 3,
		max: 6}).
		join("-").
		toLowerCase();
	res.send(w);
}

function handle(req, res) {
	const kind = req.path.split("/")[1] || "string";
	const fn = chance[kind];
	if (typeof fn !== "function") {
		res.status(404).
			end("not found");
		return;
	}

	const q = autoParse(req.query);
	if (q.length && q.length > 1000) {
		res.status(400).
			end("error: max length is 1000");
		return;
	}

	const val = Reflect.apply(fn, chance, [q]);
	res.status(200).
		end(`${val}`);
}


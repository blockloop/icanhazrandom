const express = require("express");
const Chance = require("chance");

const app = express();
const chance = new Chance();
const PORT = 3000;

app.get("/:kind", (req, res) => {
	const kind = req.params.kind || "string";
	const fn = chance[kind];
	if (typeof fn === "function") {
		const str = `${fn.call(chance)}`;
		res.status(200).end(str);
		return;
	}
	res.status(404).end("not found");
});

app.listen(PORT, () => console.log(`listening at :${PORT}`));

const { React } = BdApi;

module.exports = class Plugin {
	start() {
		console.log("Hey.", <div>Supports JSX.</div>);
	}
	stop() {
		console.log("Bye.");
	}
};

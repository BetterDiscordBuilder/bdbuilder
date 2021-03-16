import machineUuid from "machine-uuid";
const { React } = BdApi;

export default class Plugin {
	start() {
		// console.log("Hey.", <div>Supports JSX.</div>);
		machineUuid().then((uuid) => console.log("UUID", uuid));
	}
	stop() {
		console.log("Bye.");
	}
}

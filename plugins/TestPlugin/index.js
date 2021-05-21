const { React } = BdApi;
import classes from "./main.scss";
import stylesheet from "styles";
import testClasses from "./test.scss";
import {joinClassNames} from "@discord/utils";

export default class Plugin {
	start() {
		console.log(testClasses, joinClassNames);
		stylesheet.inject();
		// console.log(classes);
		// console.log(test);
		// // console.log("Hey.", <div>Supports JSX.</div>);
		// BdApi.alert(<div className={classes.test}>
		// 	hi
		// 	<div className={classes.label}>hello</div>
		// </div>);
	}
	stop() {
		console.log("Bye.");
		stylesheet.remove();
	}
}

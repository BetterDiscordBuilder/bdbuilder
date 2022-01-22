import BasePlugin from "@zlibrary/plugin";
import {Patcher} from "@zlibrary";
import styles from "styles";
import classNames from "./style.scss";

console.log(styles, classNames);
export default class test extends BasePlugin {
    onStart() {Patcher.after();}
    onStop() {
        console.log()
    }
}
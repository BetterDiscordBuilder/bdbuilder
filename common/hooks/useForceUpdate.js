import {useReducer} from "react";

export default function useForceUpdate() {return useReducer(n => n + 1, 0)[1];}
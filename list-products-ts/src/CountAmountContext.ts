import React from "react";
import { IPropsCountContext } from "./App";

const props = {
    allAmount: [],
    setAllAmount: () => {},
    listProducts: [],
    setListProducts: () => {},
    textSearch: '',
    setTextSearch: () => {}
};

const CountAmountContext = React.createContext<IPropsCountContext>(props);

export default CountAmountContext;
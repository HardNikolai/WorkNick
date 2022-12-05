import React from "react";
import { IListProduct } from "./App";

const product: IListProduct = {
    category: {
        id: 0,
        name: '',
        image: ''
    },
    count: 0,
    description: '',
    id: 0,
    images: [],
    price: 0,
    title: '',
    total: 0
};

const ProductContext = React.createContext(product);

export default ProductContext;
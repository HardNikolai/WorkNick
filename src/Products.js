import React, { useContext, useMemo } from "react";
import axios from 'axios';
import { useEffect } from 'react';
import Product from "./Product";
import './Products.scss';
import TextErrorContext from "./TextErrorContext";
import CountAmountContext from "./CountAmountContext";

const Products = ({ onFlagNotification }) => {
    const setTextError = useContext(TextErrorContext);
    const state = useContext(CountAmountContext);
    const listProducts = state.listProducts;
    const setListProducts = state.setListProducts;
    const textSearch = state.textSearch;

    const getProducts = async () => {
        try {
            let list = [];
            const resp = await axios.get('https://api.escuelajs.co/api/v1/products');
            if (resp.status === 200) {
                for (let i = 0; i < 20; i++) {
                    list.push(resp.data[i]);
                    list[i].total = Math.round(Math.random()*100);
                    list[i].count = 0;
                };
                setListProducts(list);
            } else {
                throw new Error();
            }
        } catch (error) {
            setTextError('Data loading error');
            onFlagNotification();
        }
    };

    const newList = useMemo(() => {
        return listProducts.filter(item => item.category.name.includes(textSearch));
    }, [listProducts, textSearch]);

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className="block-main-products">
            {
                newList.map((product, index) =>
                    <div key={`index=${index}`}>
                        <Product product={product}/>
                    </div>
                )
            }
        </div>
    );
}

export default Products;
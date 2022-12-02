import React, { useContext, useMemo } from "react";
import axios, { AxiosResponse } from 'axios';
import { useEffect } from 'react';
import Product from "./Product";
import './Products.scss';
import TextErrorContext from "./TextErrorContext";
import CountAmountContext from "./CountAmountContext";
import { IPropsProducts } from "./App";
import { IListProduct } from "./App";
import ProductContext from "./PropuctContext";

const Products = ({ onFlagNotification }:IPropsProducts) => {
    const setTextError = useContext(TextErrorContext);
    const state = useContext(CountAmountContext);
    const listProducts = state.listProducts;
    const setListProducts = state.setListProducts;
    const textSearch = state.textSearch;

    const getProducts = async () => {
        try {
            let list:IListProduct[] = [];
            const resp:AxiosResponse = await axios.get('https://api.escuelajs.co/api/v1/products');
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
            onFlagNotification(true);
        }
    };

    const newList:IListProduct[] = useMemo(() => {
        return listProducts.filter(item => item.category.name.includes(textSearch));
    }, [listProducts, textSearch]);

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className="block-main-products">
            {
                newList.map((product:IListProduct, index:number) =>
                    <div key={`index=${index}`}>
                        <ProductContext.Provider value={product}>
                            <Product />
                        </ProductContext.Provider>
                    </div>
                )
            }
        </div>
    );
}

export default Products;
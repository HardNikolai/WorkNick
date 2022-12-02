import React, { useState } from 'react';
import './App.scss';
import CountAmountContext from './CountAmountContext';
import Search from './Search';
import Notification from './Notification';
import AllAmount from './AllAmount';
import TextErrorContext from './TextErrorContext';
import Products from './Products';

export interface IAllAmount {
    id: number
    name: string
    price: number
    count: number
    total: number
};

export interface ICategory {
    id: number
    name: string
    image: string
};

export interface IListProduct {
    category: ICategory
    count: number
    description: string
    id: number
    images: string[]
    price: number
    title: string
    total: number
};

export interface IPropsCountContext {
    allAmount: IAllAmount[]
    setAllAmount: React.Dispatch<React.SetStateAction<IAllAmount[]>>
    listProducts: IListProduct[]
    setListProducts: React.Dispatch<React.SetStateAction<IListProduct[]>>
    textSearch: string
    setTextSearch: React.Dispatch<React.SetStateAction<string>>
};

export interface IPropsSearch {
    onFlagNotification: React.Dispatch<React.SetStateAction<boolean>>
    flag: boolean
    setFlag: React.Dispatch<React.SetStateAction<boolean>>
};

export interface IPropsNotification {
    flagNotification: boolean
    setFlagNotification: React.Dispatch<React.SetStateAction<boolean>>
    textError: string
    setTextError: React.Dispatch<React.SetStateAction<string>>
};

export interface IPropsProducts {
    onFlagNotification: React.Dispatch<React.SetStateAction<boolean>>
};

function App() {
    const [allAmount, setAllAmount] = useState<Array<IAllAmount>>([]);
    const [flagNotification, setFlagNotification] = useState<boolean>(false);
    const [textError, setTextError] = useState<string>('');
    const [listProducts, setListProducts] = useState<Array<IListProduct>>([]);
    const [textSearch, setTextSearch] = useState<string>('');
    const [flag, setFlag] = useState<boolean>(false);

    const propsCountContext:IPropsCountContext = {
        allAmount,
        setAllAmount,
        listProducts,
        setListProducts,
        textSearch,
        setTextSearch
    };

    const propsNotification: IPropsNotification = {
        flagNotification,
        setFlagNotification,
        textError,
        setTextError
    };

    const onFlagNotification = async ():Promise<void> => {
        setFlagNotification(true);
    };

    const propsSearch: IPropsSearch = {
        onFlagNotification,
        flag,
        setFlag
    };

    const propsProducts:IPropsProducts = {
        onFlagNotification
    }

    return (
        <CountAmountContext.Provider value={propsCountContext}>
        <div className='block-main'>
            <div className='block-tagline'>
                <p className='block-text-tagline'>
                    Entertain yourself with shopping
                </p>
            </div>
            <div className='block-main-search'>
                <Search {...propsSearch}/>
            </div>
            <div className='block-notification'>
                <Notification {...propsNotification}/>
            </div>
            <div className='block-all-amount'>
                <AllAmount />
            </div>
            <div className='block-products'>
                <TextErrorContext.Provider value={setTextError}>
                    <Products {...propsProducts}/>
                </TextErrorContext.Provider>
            </div>
        </div>
        </CountAmountContext.Provider>
    );
};

export default App;

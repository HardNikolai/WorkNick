import React, { useContext, useState } from "react";
import CountAmountContext from "./CountAmountContext";
import './Search.scss';
import { IPropsSearch } from "./App";

const Search = ({onFlagNotification, flag, setFlag}:IPropsSearch) => {
    const state = useContext(CountAmountContext);
    const [textInput, setTextInput] = useState('');
    const setTextSearch = state.setTextSearch;

    const onChangeInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        if (e.target) {
            setTextInput(e.target.value);    
        };
    };

    const Move = () => {
        setTextSearch(textInput);
        onFlagNotification(true);
        setFlag(true);
        setTimeout(() => {
            setFlag(false);
        }, 2000);
    };

    return (
        <div className="block-search">
            <div className="block-loader">
                {flag ? <img src="loader.gif" alt="Not found" className="block-mail"/> : <div className="block-mail-off"/>}
            </div>
            <div className="block-inner-main-search">
                <div className='block-form-search'>
                    <input name='product' onChange={(e) => onChangeInput(e)} className="block-input" placeholder="What kind of product?"/>
                    <button className="block-button" onClick={() => Move()}>
                        <img src="LUPA.png" alt="Not found" className="image-lupa"/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Search;
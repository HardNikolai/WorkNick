import './App.scss';
import Search from './Search';
import AllAmount from './AllAmount';
import Products from './Products';
import Notification from './Notification';
import { useState } from 'react';
import TextErrorContext from './TextErrorContext';
import CountAmountContext from './CountAmountContext';

function App() {
    const [allAmount, setAllAmount] = useState([]);
    const [flagNotification, setFlagNotification] = useState(false);
    const [textError, setTextError] = useState('');
    const [listProducts, setListProducts] = useState([]);
    const [textSearch, setTextSearch] = useState('');
    const [flag, setFlag] = useState(false);
    
    const propsCountContext = {
        allAmount,
        setAllAmount,
        listProducts,
        setListProducts,
        textSearch,
        setTextSearch
    };

    const propsNotification = {
        flagNotification,
        setFlagNotification,
        textError,
        setTextError
    };

    const onFlagNotification = async () => {
        setFlagNotification(true);
    };

    const propsSearch = {
        onFlagNotification,
        flag,
        setFlag
    };

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
                        <Products onFlagNotification={onFlagNotification}/>
                    </TextErrorContext.Provider>
                </div>
            </div>
        </CountAmountContext.Provider>
    );
}

export default App;

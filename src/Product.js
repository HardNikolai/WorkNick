import React, { useContext, useState } from "react";
import CountAmountContext from "./CountAmountContext";
import './Product.scss';

const Product = ({product}) => {
    const state = useContext(CountAmountContext);
    const allAmount = state.allAmount;
    const setAllAmount = state.setAllAmount;
    const textSrcImage = product.images[0];
    const textNameProduct = product.category.name;
    const textPrice = `Price: ${product.price}$`;
    const [textNameClass, setTextNameClass] = useState('block-textName-product');

    let all = product.total - product.count;
    let textTotal = `Total: ${all}`;

    const addOneCount = () => {
        let checkNum = 0;
        if (allAmount.length === 0) {
            const count = 1;
            const newListAmaount = [];
            const newProduct = {
                id: product.id,
                name: textNameProduct,
                price: product.price,
                count: count,
                total: count*product.price
            };
            const countCard = 1;
            product.count = countCard;
            newListAmaount.push(newProduct);
            setAllAmount(newListAmaount);
            setTextNameClass('block-textName-product green');
        } else {
            const newListAmaount = [];
            for (let i = 0; i < allAmount.length; i++) {
                if (allAmount[i].id === product.id) {
                    const changeProduct = allAmount[i];
                    const count = changeProduct.count + 1;
                    const newTotal = count*changeProduct.price;
                    product.count = count;

                    changeProduct.count = count;
                    changeProduct.total = newTotal;
                    newListAmaount.push(changeProduct);
                    setAllAmount(newListAmaount);
                    setTextNameClass('block-textName-product green');
                } else {
                    checkNum += 1;
                    newListAmaount.push(allAmount[i]);
                    if (checkNum === allAmount.length) {
                        const count = 1;
                        product.count = count;
                        const newProduct = {
                            id: product.id,
                            name: textNameProduct,
                            price: product.price,
                            count: count,
                            total: count*product.price
                        };
                        newListAmaount.push(newProduct);
                        setAllAmount(newListAmaount);
                        setTextNameClass('block-textName-product green');
                    };
                };
            };
        };
    };

    const deleteOneCount = () => {
        const newListAmaount = [];
        for (let i = 0; i < allAmount.length; i++) {
            if (allAmount[i].id === product.id) {
                const count = allAmount[i].count - 1;
                product.count = count;
                const total = count * allAmount[i].price;
                allAmount[i].count = count;
                allAmount[i].total = total;
                newListAmaount.push(allAmount[i]);
                if (count === 0) {
                    setTextNameClass('block-textName-product');
                };
            } else {
                newListAmaount.push(allAmount[i]);
            }
        };
        setAllAmount(newListAmaount);
    };

    const clickBlock = () => {
        if (product.count === 0) {
            let checkNum = 0;
            if (allAmount.length === 0) {
                const count = 1;
                const newListAmaount = [];
                const newProduct = {
                    id: product.id,
                    name: textNameProduct,
                    price: product.price,
                    count: count,
                    total: count*product.price
                };
                const countCard = 1;
                product.count = countCard;
                newListAmaount.push(newProduct);
                setAllAmount(newListAmaount);
                setTextNameClass('block-textName-product green');
            } else {
                const newListAmaount = [];
                for (let i = 0; i < allAmount.length; i++) {
                    if (allAmount[i].id === product.id) {
                        const changeProduct = allAmount[i];
                        const count = changeProduct.count + 1;
                        const newTotal = count*changeProduct.price;
                        product.count = count;

                        changeProduct.count = count;
                        changeProduct.total = newTotal;
                        newListAmaount.push(changeProduct);
                        setAllAmount(newListAmaount);
                        setTextNameClass('block-textName-product green');
                    } else {
                        checkNum += 1;
                        newListAmaount.push(allAmount[i]);
                        if (checkNum === allAmount.length) {
                            const count = 1;
                            product.count = count;
                            const newProduct = {
                                id: product.id,
                                name: textNameProduct,
                                price: product.price,
                                count: count,
                                total: count*product.price
                            };
                            newListAmaount.push(newProduct);
                            setAllAmount(newListAmaount);
                            setTextNameClass('block-textName-product green');
                        };
                    };
                };
            };
        } else if (product.count === 1) {
            const newListAmaount = [];
            for (let i = 0; i < allAmount.length; i++) {
                if (allAmount[i].id === product.id) {
                    const count = allAmount[i].count - 1;
                    product.count = count;
                    const total = count * allAmount[i].price;
                    allAmount[i].count = count;
                    allAmount[i].total = total;
                    newListAmaount.push(allAmount[i]);
                    if (count === 0) {
                        setTextNameClass('block-textName-product');
                    };
                } else {
                    newListAmaount.push(allAmount[i]);
                }
            };
            setAllAmount(newListAmaount);
        };
    };

    return(
        <>
            {
                product.count 
                ?
                <div className="block-product" >
                    <div className='block-textName-product green' onClick={() => clickBlock()}>
                        <p>{textNameProduct}</p>
                    </div>
                    <div className="block-image-product" onClick={() => clickBlock()}>
                        <img src={textSrcImage} alt="Not found" className="image-product"/>
                    </div>
                    <div className="block-content" onClick={() => clickBlock()}>
                        <div className="block-textPrice-product">
                            <p>{textPrice}</p>
                        </div>
                        <div className="block-textTotal-product">
                            <p>{textTotal}</p>
                        </div>
                    </div>
                    <div className="block-changeAmount-product">
                        <div className="block-delete-count" onClick={() => deleteOneCount()}>
                            <img src="minus.png" alt="Not found" className="block-change-total"/>
                        </div>
                        <div className="block-total">
                            <p className="block-textTotal">{product.count}</p>
                        </div>
                        {
                            product.count === product.total
                            ?
                            <div className="off-block"></div>
                            :
                            <div className="block-add-count" onClick={() => addOneCount()}>
                                <img src="plus.png" alt="Not found" className="block-change-total"/>
                            </div>
                        }
                    </div>
                </div>
                :
                <div className="block-product">
                <div className='block-textName-product' onClick={() => clickBlock()}>
                    <p>{textNameProduct}</p>
                </div>
                <div className="block-image-product" onClick={() => clickBlock()}>
                    <img src={textSrcImage} alt="Not found" className="image-product"/>
                </div>
                <div className="block-content" onClick={() => clickBlock()}>
                    <div className="block-textPrice-product">
                        <p>{textPrice}</p>
                    </div>
                    <div className="block-textTotal-product">
                        <p>{textTotal}</p>
                    </div>
                </div>
                <div className="block-changeAmount-product">
                    {
                        product.count === 0
                        ?                 
                        <div className="off-block"></div>
                        : 
                        <div className="block-delete-count" onClick={() => deleteOneCount()}>
                            <img src="minus.png" alt="Not found" className="block-change-total"/>
                        </div>
                    }
                    <div className="block-total">
                        <p className="block-textTotal">{product.count}</p>
                    </div>        
                    <div className="block-add-count" onClick={() => addOneCount()}>
                        <img src="plus.png" alt="Not found" className="block-change-total"/>
                    </div>
                </div>
            </div>
            }
        </>
    );
}

export default Product;
import React, { useContext } from "react";
import CountAmountContext from "./CountAmountContext";
import './Product.scss';
import ProductContext from "./PropuctContext";
import { IAllAmount } from "./App";

const Product = () => {
    const product = useContext(ProductContext);
    const state = useContext(CountAmountContext);
    const allAmount = state.allAmount;
    const setAllAmount = state.setAllAmount;
    const textSrcImage = product.images[0];
    const textNameProduct = product.category.name;
    const textPrice = `Price: ${product.price}$`;

    let all:number = product.total - product.count;
    let textTotal:string = `Total: ${all}`;

    const addOneCount = () => {
        let checkNum:number = 0;
        if (allAmount.length === 0) {
            const count:number = 1;
            const newListAmaount:Array<IAllAmount> = [];
            const newProduct:IAllAmount = {
                id: product.id,
                name: textNameProduct,
                price: product.price,
                count: count,
                total: count*product.price
            };
            const countCard:number = 1;
            product.count = countCard;
            newListAmaount.push(newProduct);
            setAllAmount(newListAmaount);
        } else {
            const newListAmaount:Array<IAllAmount> = [];
            for (let i = 0; i < allAmount.length; i++) {
                if (allAmount[i].id === product.id) {
                    const changeProduct:IAllAmount = allAmount[i];
                    const count:number = changeProduct.count + 1;
                    const newTotal:number = count*changeProduct.price;
                    product.count = count;

                    changeProduct.count = count;
                    changeProduct.total = newTotal;
                    newListAmaount.push(changeProduct);
                    setAllAmount(newListAmaount);
                } else {
                    checkNum += 1;
                    newListAmaount.push(allAmount[i]);
                    if (checkNum === allAmount.length) {
                        const count:number = 1;
                        product.count = count;
                        const newProduct:IAllAmount = {
                            id: product.id,
                            name: textNameProduct,
                            price: product.price,
                            count: count,
                            total: count*product.price
                        };
                        newListAmaount.push(newProduct);
                        setAllAmount(newListAmaount);
                    };
                };
            };
        };
    };

    const deleteOneCount = () => {
        const newListAmaount:Array<IAllAmount> = [];
        for (let i = 0; i < allAmount.length; i++) {
            if (allAmount[i].id === product.id) {
                const count:number = allAmount[i].count - 1;
                product.count = count;
                const total:number = count * allAmount[i].price;
                allAmount[i].count = count;
                allAmount[i].total = total;
                newListAmaount.push(allAmount[i]);
            } else {
                newListAmaount.push(allAmount[i]);
            }
        };
        setAllAmount(newListAmaount);
    };

    const clickBlock = () => {
        if (product.count === 0) {
            let checkNum:number = 0;
            if (allAmount.length === 0) {
                const count:number = 1;
                const newListAmaount:Array<IAllAmount> = [];
                const newProduct:IAllAmount = {
                    id: product.id,
                    name: textNameProduct,
                    price: product.price,
                    count: count,
                    total: count*product.price
                };
                const countCard:number = 1;
                product.count = countCard;
                newListAmaount.push(newProduct);
                setAllAmount(newListAmaount);
            } else {
                const newListAmaount:Array<IAllAmount> = [];
                for (let i = 0; i < allAmount.length; i++) {
                    if (allAmount[i].id === product.id) {
                        const changeProduct:IAllAmount = allAmount[i];
                        const count:number = changeProduct.count + 1;
                        const newTotal:number = count*changeProduct.price;
                        product.count = count;

                        changeProduct.count = count;
                        changeProduct.total = newTotal;
                        newListAmaount.push(changeProduct);
                        setAllAmount(newListAmaount);
                    } else {
                        checkNum += 1;
                        newListAmaount.push(allAmount[i]);
                        if (checkNum === allAmount.length) {
                            const count:number = 1;
                            product.count = count;
                            const newProduct:IAllAmount = {
                                id: product.id,
                                name: textNameProduct,
                                price: product.price,
                                count: count,
                                total: count*product.price
                            };
                            newListAmaount.push(newProduct);
                            setAllAmount(newListAmaount);
                        };
                    };
                };
            };
        } else if (product.count === 1) {
            const newListAmaount:Array<IAllAmount> = [];
            for (let i = 0; i < allAmount.length; i++) {
                if (allAmount[i].id === product.id) {
                    const count:number = allAmount[i].count - 1;
                    product.count = count;
                    const total:number = count * allAmount[i].price;
                    allAmount[i].count = count;
                    allAmount[i].total = total;
                    newListAmaount.push(allAmount[i]);
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
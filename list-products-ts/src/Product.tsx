import React, { useContext } from "react";
import CountAmountContext from "./CountAmountContext";
import './Product.scss';
import ProductContext from "./PropuctContext";
import { IAllAmount, IPropsCountContext } from "./App";

const Product = () => {
    const product = useContext(ProductContext);
    const {allAmount, setAllAmount} = useContext(CountAmountContext);
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
            allAmount.map((item:IAllAmount) => {
                if (item.id === product.id) {
                    const changeProduct:IAllAmount = item;
                    const count:number = changeProduct.count + 1;
                    const newTotal:number = count*changeProduct.price;
                    product.count = count;

                    changeProduct.count = count;
                    changeProduct.total = newTotal;
                    newListAmaount.push(changeProduct);
                    setAllAmount(newListAmaount);
                } else {
                    checkNum += 1;
                    newListAmaount.push(item);
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
            });
        };
    };

    const deleteOneCount = () => {
        const newListAmount:Array<IAllAmount> = [];
        allAmount.map((item:IAllAmount) => {
            if (item.id === product.id) {
                const count:number = item.count - 1;
                product.count = count;
                const total:number = count * item.price;
                item.count = count;
                item.total = total;
                newListAmount.push(item);
            } else {
                newListAmount.push(item);
            }
        });
        setAllAmount(newListAmount);
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
                allAmount.map((item:IAllAmount) => {
                    if(item.id === product.id) {
                        const changeProduct:IAllAmount = item;
                        const count:number = changeProduct.count + 1;
                        const newTotal:number = count*changeProduct.price;
                        product.count = count;

                        changeProduct.count = count;
                        changeProduct.total = newTotal;
                        newListAmaount.push(changeProduct);
                        setAllAmount(newListAmaount);
                    } else {
                        checkNum += 1;
                        newListAmaount.push(item);
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
                    }
                });
            };
        } else if (product.count === 1) {
            const newListAmaount:Array<IAllAmount> = [];
            allAmount.map((item:IAllAmount) => {
                if (item.id === product.id) {
                    const count:number = item.count - 1;
                    product.count = count;
                    const total:number = count * item.price;
                    item.count = count;
                    item.total = total;
                    newListAmaount.push(item);
                } else {
                    newListAmaount.push(item)
                };
            });
            console.log(newListAmaount);
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
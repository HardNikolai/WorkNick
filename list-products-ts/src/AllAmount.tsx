import React, { useContext } from "react";
import './AllAmount.scss';
import { IAllAmount } from "./App";
import CountAmountContext from "./CountAmountContext";

let total:number = 0;

const recalculation = (list:IAllAmount[]) => {
    total = list.reduce((acc:number, item:IAllAmount) => acc + item.total, 0);
};

const AllAmount = () => {
    const {allAmount} = useContext(CountAmountContext);

    recalculation(allAmount);

    return(
        <div className="block-main-allAmount">
            <p className="allAmount-text">{`Your basket: ${total}$`}</p>
        </div>
    );
};

export default AllAmount;
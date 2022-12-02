import React, { useContext } from "react";
import './AllAmount.scss';
import { IAllAmount, IPropsCountContext } from "./App";
import CountAmountContext from "./CountAmountContext";

const AllAmount = () => {
    const state:IPropsCountContext = useContext(CountAmountContext);
    const allAmount:IAllAmount[] = state.allAmount;
    let total:number = 0;

    for (let i = 0; i < allAmount.length; i++) {
        total += allAmount[i].total;
    };

    return(
        <div className="block-main-allAmount">
            <p className="text-allAmount">{`Your basket: ${total}$`}</p>
        </div>
    );
};

export default AllAmount;
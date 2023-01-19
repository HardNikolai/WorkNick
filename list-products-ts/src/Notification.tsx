import React, { useMemo } from "react";
import './Notification.scss';
import { IPropsNotification } from "./App";

const Notification = ({ isFlagNotification, setFlagNotification, textError, setTextError }: IPropsNotification) => {
    let textNotification:string = textError|| 'eeeeemmmm';

    if (textError) {
        textNotification = textError;
    } else {
        textNotification = 'eeeeemmmm';
    };

    const setConfig = () => {
        setFlagNotification(false);
        setTextError('');
    };

    useMemo(() => {
        if (isFlagNotification) {
            setTimeout(setConfig, 2000);
        };
    }, [isFlagNotification]);

    return (
        <>
            {   
                isFlagNotification 
                ? 
                <div className="block-notification-main">
                    <div>
                        <p className="notofication-text">
                            {textNotification}
                        </p>
                    </div>
                    <div>
                        <img src="ETO_PONCHIK.gif" className="notification-image" alt="Not found"/>
                    </div>
                </div>
                :<div></div>
            }
        </>
    );
};

export default Notification;
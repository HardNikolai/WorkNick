import React, { useEffect } from "react";
import './Notification.scss';

const Notification = ({ flagNotification, setFlagNotification, textError, setTextError }) => {
    let textNotofication = '';

    if (textError) {
        textNotofication = textError;
    } else {
        textNotofication = 'eeeeemmmm';
    };

    useEffect(() => {
        if (flagNotification) {
            setTimeout(() => {
                setFlagNotification(false);
                setTextError('');
            }, 2000);
        }
    });

    return (
        <>
            {   
                flagNotification 
                ? 
                <div className="block-notification-main">
                    <div>
                        <p className="block-text-notification">
                            {textNotofication}
                        </p>
                    </div>
                    <div>
                        <img src="ETO_PONCHIK.gif" className="block-image-notification" alt="Not found"/>
                    </div>
                </div>
                :<div></div>
            }
        </>
    );
};

export default Notification;
import React from 'react';
import { usePromiseTracker } from "react-promise-tracker";
import BeatLoader from "react-spinners/BeatLoader";

export const LoadingSpinerComponent = (props) => {
     const { promiseInProgress } = usePromiseTracker();
    return (
        <div className="d-flex justify-content-center">
            {
                    (promiseInProgress === true) ?
                        <BeatLoader/>
                    :
                        null
            }
        </div>
    )
};

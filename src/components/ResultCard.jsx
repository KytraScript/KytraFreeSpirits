import React from 'react';

const ResultCard = (props) => {

    return (
        <div className={'result-card'} onClick={props.query}>
            <div className={'result-info'}>
                <div className={'result-name'}>{props.result}</div>
            </div>
        </div>
    )
};

export default ResultCard;
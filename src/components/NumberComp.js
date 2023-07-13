import * as React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import CurrencyFormat from 'react-currency-format';

function isNumeric(str) {
    if (typeof str != "string") return false 
    return !isNaN(str) && 
        !isNaN(parseFloat(str))
}


export default function NumberComp(props) {
    console.log("PROPS",props)
    return (
        <React.Fragment>
            <Tooltip title={props.value} aria-label="add">
                <React.Fragment>
                    <div className="" data-type={isNumeric(props.value)} data-value={props.value}>
                        {isNumeric(props.value) == false ? props.value
                            :
                            <CurrencyFormat value={props.value} displayType={'text'} thousandSeparator={true} renderText={value => <div>{value}</div>} />
                        }
                    </div>
                </React.Fragment>
            </Tooltip>
        </React.Fragment>
    );
}
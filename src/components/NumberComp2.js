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
          
                <React.Fragment>
                 
                            <CurrencyFormat value={props.value} displayType={'text'} thousandSeparator={true} renderText={value => <div>{value}</div>} />
                    
                </React.Fragment>
     
        </React.Fragment>
    );
}
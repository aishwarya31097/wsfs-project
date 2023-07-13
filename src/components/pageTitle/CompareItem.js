import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import match from '../../images/match.png';
import mismatch from '../../images/mismatch.png';
import * as moment from 'moment';
import Tooltip from '@material-ui/core/Tooltip';

function myFunction(str) {
    //var str = "Hello world!";
    if (str.length > 2) {
        var res = str.substring(2, str.length);
        var rep = res.replace(/[a-z]/gi, 'x')
        return str.replace(res, rep);
    }
  
    return str;
  }


export default class CompareItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                lmsLoan: this.props.lmsLoan,
                agreementLoan: this.props.agreementLoan
            },
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
            fields,
        });
        console.log('fields', this.state.fields);
    }

    componentDidMount() {
        console.log(this.props.title + "-" + this.props.lmsLoan + "-" + this.state.fields.agreementLoan)
    }


    render() {
        return (
            <React.Fragment>
                {/* <tr>
                    <td colSpan="3">{this.props.title}</td>
                </tr> */}
                <tr>
                    <td>
                        <Tooltip title={this.state.fields.lmsLoan}>

                            <React.Fragment>
                        <label>{this.props.title}</label>
                            <TextField 
                                // label={this.props.title}
                                id={"outlined-basic-lmsLoan"+this.props.id}
                                name="lmsLoan"
                                value={this.props.mask == false?  this.state.fields.lmsLoan : myFunction(this.state.fields.lmsLoan)}
                                onChange={this.handleChange}
                                variant="outlined"
                                size="small"
                                disabled={this.state.fields.agreementLoan === this.state.fields.lmsLoan ? true : false}
                                disabled={this.state.fields.agreementLoan?.length == 0 ? true : this.state.fields.agreementLoan === this.state.fields.lmsLoan ? true : false}
                            />
                            </React.Fragment>
                        </Tooltip>
                    </td>
                    <td>
                        <Tooltip title={this.state.fields.lmsLoan}>
                        <React.Fragment>
                            <label>{this.props.title}</label>
                            <TextField 
                                // label={this.props.title}
                                id={"outlined-basic-agreementLoan"+this.props.id}
                                name="agreementLoan"
                                value={this.props.mask == false?  this.state.fields.agreementLoan : myFunction(this.state.fields.agreementLoan)}
                                onChange={this.handleChange}
                                variant="outlined"
                                size="small"
                                disabled={this.state.fields.agreementLoan?.length == 0 ? true : this.state.fields.agreementLoan === this.state.fields.lmsLoan ? true : false}
                            />
                            </React.Fragment>
                        </Tooltip>
                    </td>
                    <td>
                        <span id="lmsLoanContractNumberIcon" ></span>
                        {this.state.fields.agreementLoan?.length == 0 ? <img src={match} /> : this.state.fields.agreementLoan === this.state.fields.lmsLoan ? <img src={match} /> : <img src={mismatch} />}

                    </td>
                </tr>
            </React.Fragment>
        )
    }
}

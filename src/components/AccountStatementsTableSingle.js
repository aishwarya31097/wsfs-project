import React from 'react';
import NumberComp from './NumberComp';
class AccountStatementsTableSingle extends React.PureComponent {
    render() {
        console.log("AccountStatementsTable", this.props.section_title + "------------ " + JSON.stringify(this.props.data))
        return (
            <React.Fragment>
<div class="beforeClass"></div>
                <div className="wrapper-pdf" id={this.props.section_id}>
                    <h4 class="sectiontitle">{this.props.section_title.replace(/([a-z])([A-Z])/g, '$1 $2')}</h4>
                    <table class="table100 nopadding noborder">
                        <tbody><tr>
                           

                            <td class="w50">

                                <table className="table table-bordered">
                                    {this.props.data[1] == null ? '' :
                                        this.props.data[1] == null ? '' :
                                            Object.entries(this.props.data[1]).map(([key, value]) => {
                                                return (
                                                    <React.Fragment>
                                                        {value.length == 0  && key.length != 0 && key.length !== 1?
                                                            <thead className="">
                                                                <tr>
                                                                    <th className="" colSpan="2">{key.replace(/([a-z])([A-Z])/g, '$1 $2')}</th>
                                                                </tr>
                                                            </thead>
                                                            :
                                                            key.length == 1 || key.length == 0 ?

                                                            <tr>
                                                                        <td colSpan="2" className="extrarow" ></td>
                                                                {/* <td><NumberComp value={value}></NumberComp></td> */}
                                                            </tr>
                                                            :
                                                            <tr>
                                                                <td className={key == "Total:" ? 'total' : key == "Total: " ? 'total' : key == "Total" ? 'total' : key == "BeginningBalance" ? 'bolditem' : key == "EndingBalance" ? 'bolditem' : key == "AdjustedEndingBalance" ? 'bolditem' : key == "AdjustedEndingBalance " ? 'bolditem' : key == "AdjustedEndingBalance " ? 'bolditem':''}>{key.replace(/([a-z])([A-Z])/g, '$1 $2')}</td>
                                                                <td>
                                                                    <NumberComp value={value}></NumberComp></td>
                                                            </tr>
                                                        }

                                                    </React.Fragment>
                                                );
                                            })
                                    }
                                </table>

                            </td>
                            <td class="w50">
                                <table className="table table-bordered">
                                    {this.props.data[2] == null ? '' :
                                        this.props.data[2] == null ? '' :
                                            Object.entries(this.props.data[2]).map(([key, value]) => {
                                                return (
                                                    <React.Fragment>
                                                        {value.length == 0  && key.length != 0 && key.length !== 1?
                                                            <thead className="">
                                                                <tr>
                                                                    <th className="" colSpan="2">{key.replace(/([a-z])([A-Z])/g, '$1 $2')}</th>
                                                                </tr>
                                                            </thead>
                                                            :
                                                            key.length == 1 || key.length == 0 ?

                                                            <tr>
                                                                        <td colSpan="2" className="extrarow" ></td>
                                                                {/* <td><NumberComp value={value}></NumberComp></td> */}
                                                            </tr>
                                                            :
                                                            <tr>
                                                                <td className={key == "Total:" ? 'total' : key == "Total: " ? 'total' : key == "Total" ? 'total' : key == "BeginningBalance" ? 'bolditem' : key == "EndingBalance" ? 'bolditem' : key == "AdjustedEndingBalance" ? 'bolditem' : key == "AdjustedEndingBalance " ? 'bolditem' : key == "AdjustedEndingBalance " ? 'bolditem':''}>{key.replace(/([a-z])([A-Z])/g, '$1 $2')}</td>
                                                                <td>
                                                                    <NumberComp value={value}></NumberComp></td>
                                                            </tr>
                                                        }

                                                    </React.Fragment>
                                                );
                                            })
                                    }
                                </table>
                            </td>
                        </tr>
                        </tbody></table>
                        <div class="beforeClass"></div>
                    <table class="table100 nopadding noborder">
                        <tbody><tr>
                           
                            <td class="w50">
                                <table className="table table-bordered">
                                    {this.props.data[3] == null ? '' :
                                        this.props.data[3] == null ? '' :
                                            Object.entries(this.props.data[3]).map(([key, value]) => {
                                                return (
                                                    <React.Fragment>
                                                        {value.length == 0  && key.length != 0 && key.length !== 1?
                                                            <thead className="">
                                                                <tr>
                                                                    <th className="" colSpan="2">{key.replace(/([a-z])([A-Z])/g, '$1 $2')}</th>
                                                                </tr>
                                                            </thead>
                                                            :
                                                            key.length == 1 || key.length == 0 ?

                                                            <tr>
                                                                        <td colSpan="2" className="extrarow" ></td>
                                                                {/* <td><NumberComp value={value}></NumberComp></td> */}
                                                            </tr>
                                                            :
                                                            <tr>
                                                                <td className={key == "Total:" ? 'total' : key == "Total: " ? 'total' : key == "Total" ? 'total' : key == "BeginningBalance" ? 'bolditem' : key == "EndingBalance" ? 'bolditem' : key == "AdjustedEndingBalance" ? 'bolditem' : key == "AdjustedEndingBalance " ? 'bolditem' : key == "AdjustedEndingBalance " ? 'bolditem':''}>{key.replace(/([a-z])([A-Z])/g, '$1 $2')}</td>
                                                                <td>
                                                                    <NumberComp value={value}></NumberComp></td>
                                                            </tr>
                                                        }

                                                    </React.Fragment>
                                                );
                                            })
                                    }
                                </table>
                            </td>
                            <td class="w50">

<table className="table table-bordered">
    {this.props.data[0] == null ? '' :
        this.props.data[0].map((tr_item) => {
            return (
                <React.Fragment>
                    {tr_item.value1.length == 0 && tr_item.value2.length == 0 && tr_item.key.length != 0 && tr_item.key.length != 1 ?
                        <thead className="">
                            <tr>
                                <React.Fragment>
                                    <th colSpan="3">{tr_item.key.replace(/([a-z])([A-Z])/g, '$1 $2')}</th>
                                </React.Fragment>
                            </tr>
                        </thead>
                        :
                        (  tr_item.key.length == 1 || tr_item.key.length == 0 ) && tr_item.value1.length == 0 ?
                        <tr>
                                    <td colSpan="3" className="extrarow" ></td>
                            {/* <td><NumberComp value={value}></NumberComp></td> */}
                        </tr>
                        :
                        <tbody>
                            <tr>
                                <React.Fragment>
                                    {tr_item == null ? '' :
                                        Object.entries(tr_item).map(([key, value]) => {
                                            return (
                                                <td className={value == "Total:" ? 'total' : value == "Total: " ? 'total' : value == "Total" ? 'total' : value == "Beginning Balance" ? 'bolditem' : value == "Ending Balance" ? 'bolditem' : value == "Adjusted Ending Balance" ? 'bolditem' : value == "Number of Loans" ? 'centeritem' : value == "Principal Balance" ? 'centeritem' :''}><NumberComp value={value}></NumberComp></td>
                                            );
                                        })
                                    }
                                </React.Fragment>
                            </tr>
                        </tbody>
                    }
                </React.Fragment>
            );
        })
    }
</table>



</td>
                        </tr>
                        </tbody></table>
                </div>
            </React.Fragment>
        )
    }
}

export default AccountStatementsTableSingle;

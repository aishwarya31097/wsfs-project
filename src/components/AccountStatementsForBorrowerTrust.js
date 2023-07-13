import React from 'react';
import NumberComp from './NumberComp';
class AcquisitionCriteriaTable extends React.PureComponent {
    render() {
        console.log("Props AccountStatementsTable", this.props.section_title + "------------ " + JSON.stringify(this.props.data[0]))

       
        let CollateralBalance = this.props.data[0]
        let RevolvingPeriod = this.props.data[1]
        let ReserveAccount = this.props.data[2]
        let AvailableFunds = this.props.data[3]



        return (
            <React.Fragment>
                {/* {JSON.stringify(AccountStatements1)}
                <br></br>
                {JSON.stringify(ActivitiesSinceCutOff1)}
                <br></br>
                {JSON.stringify(AccountStatements2)}
                <br></br>
                {JSON.stringify(ActivitiesSinceCutOff2)}
                <br></br>
                {JSON.stringify(AccountStatements4)}
                <br></br>
                {JSON.stringify(ActivitiesSinceCutOff3)} */}
                <div class="beforeClass"></div>
                <div className="wrapper-pdf" id={this.props.section_id + "saludapack"}>
                    <h4 class="sectiontitle">{this.props.section_title.replace(/([a-z])([A-Z])/g, '$1 $2')}</h4>


                   
                    <table class="table100 nopadding noborder">
                        <tr>
                           
                            <td class="w50">
                                <table class="table table-bordered" id="AccountStatements4">
                                    {CollateralBalance == null ? '' :
                                        CollateralBalance.map((tr_item) => {
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
                                                                                <td className={value == "Total:" ? 'total' : value == "Total: " ? 'total' : value == "Total:  " ? 'total' : value == "Total:   " ? 'total' : value == "Beginning Balance" ? 'bolditem' : value == "Ending Balance" ? 'bolditem' : value == "Adjusted Ending Balance" ? 'bolditem' : value == "Number of Loans" ? 'centeritem' : value == "Principal Balance" ? 'centeritem' : ''}><NumberComp value={value}></NumberComp></td>
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
                            <td class="w50">
                                </td>
                        </tr>
                    </table>
                    <div class="beforeClass"></div>
                    <table class="table100 nopadding noborder">
                        <tr>
                            <td class="w50">
                                <table class="table table-bordered" id="AccountStatements1">

                                    {RevolvingPeriod == null ? '' :
                                        RevolvingPeriod == null ? '' :
                                            Object.entries(RevolvingPeriod).map(([key, value]) => {
                                                return (
                                                    <React.Fragment>
                                                        {value.length == 0 && key.length !== 0 && key.length !== 1 ?
                                                            <thead className="">
                                                                <tr>
                                                                    <th className="" colSpan="2" data-title={key}>
                                                                        {/* {key.replace(/([a-z])([A-Z])/g, '$1 $2')} */}
                                                                        {key.replace(/([a-z])([A-Z])/g, '$1 $2')}

                                                                    </th>
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
                                                                    <td className={key == "Total:" ? 'total' : key == "Total: " ? 'total' : key == "Total:  " ? 'total' : key == "Total:   " ? 'total' : key == "BeginningBalance" ? 'bolditem' : key == "EndingBalance" ? 'bolditem' : key == "AdjustedEndingBalance" ? 'bolditem' : key == "AdjustedEndingBalance " ? 'bolditem' : key == "AdjustedEndingBalance " ? 'bolditem' : key == "Ending Balance Post-Payment" ? 'bolditem' : key == "Ending Balance Pre-Payment" ? 'bolditem' :key == "Ending Balance Post POP" ? 'bolditem' : ''}>{key.replace(/([a-z])([A-Z])/g, '$1 $2')}</td>
                                                                    <td><NumberComp value={value}></NumberComp></td>
                                                                </tr>
                                                        }

                                                    </React.Fragment>
                                                );
                                            })
                                    }

                                </table>

                            </td>

                            <td class="w50">
                                <table class="table table-bordered" id="AccountStatements2" >
                                    {ReserveAccount == null ? '' :
                                        ReserveAccount == null ? '' :
                                            Object.entries(ReserveAccount).map(([key, value]) => {
                                                return (
                                                    <React.Fragment>
                                                        {value.length == 0 && key.length !== 0 && key.length !== 1 ?
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
                                                                <td className={key == "Total:" ? 'total' : key == "Total: " ? 'total' : key == "Total:  " ? 'total' : key == "Total:   " ? 'total' : key == "BeginningBalance" ? 'bolditem' : key == "EndingBalance" ? 'bolditem' : key == "AdjustedEndingBalance" ? 'bolditem' : key == "AdjustedEndingBalance " ? 'bolditem' : key == "AdjustedEndingBalance " ? 'bolditem' : key == "Ending Balance Post POP" ? 'bolditem' : key == "Ending Balance Post-Payment" ? 'bolditem' :''}>{key.replace(/([a-z])([A-Z])/g, '$1 $2')}</td>
                                                                <td><NumberComp value={value}></NumberComp></td>
                                                            </tr>
                                                        }

                                                    </React.Fragment>
                                                );
                                            })
                                    }

                                </table>

                            </td>
                        </tr>
                    </table>

                    <div class="beforeClass"></div>
                    <table class="table100 nopadding noborder">
                        <tr>
                            <td class="w50">
                                <table class="table table-bordered" id="AccountStatements1">

                                    {AvailableFunds == null ? '' :
                                        AvailableFunds == null ? '' :
                                            Object.entries(AvailableFunds).map(([key, value]) => {
                                                return (
                                                    <React.Fragment>
                                                        {value.length == 0 && key.length !== 0 && key.length !== 1 ?
                                                            <thead className="">
                                                                <tr>
                                                                    <th className="" colSpan="2" data-title={key}>
                                                                        {/* {key.replace(/([a-z])([A-Z])/g, '$1 $2')} */}
                                                                        {key.replace(/([a-z])([A-Z])/g, '$1 $2')}

                                                                    </th>
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
                                                                    <td className={key == "Total:" ? 'total' : key == "Total: " ? 'total' : key == "Total:  " ? 'total' : key == "Total:   " ? 'total' : key == "BeginningBalance" ? 'bolditem' : key == "EndingBalance" ? 'bolditem' : key == "AdjustedEndingBalance" ? 'bolditem' : key == "AdjustedEndingBalance " ? 'bolditem' : key == "AdjustedEndingBalance " ? 'bolditem' : key == "Ending Balance Post-Payment" ? 'bolditem' : key == "Ending Balance Pre-Payment" ? 'bolditem' :key == "Ending Balance Post POP" ? 'bolditem' : ''}>{key.replace(/([a-z])([A-Z])/g, '$1 $2')}</td>
                                                                    <td><NumberComp value={value}></NumberComp></td>
                                                                </tr>
                                                        }

                                                    </React.Fragment>
                                                );
                                            })
                                    }

                                </table>

                            </td>

                            <td class="w50">
                               
                            </td>
                        </tr>
                    </table>

                   


                </div>
                <div class="beforeClass"></div>

            </React.Fragment>
        )
    }
}

export default AcquisitionCriteriaTable;

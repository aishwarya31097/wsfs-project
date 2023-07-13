import React from 'react';
import NumberComp from './NumberComp';
class AcquisitionCriteriaTable extends React.PureComponent {
    render() {
        console.log("Props AccountStatementsTable", this.props.section_title + "------------ " + JSON.stringify(this.props.data[0]))

        let ReserveFund = this.props.data[0]
        let AvailableFund = this.props.data[1]


  



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
                                <table class="table table-bordered" id="AccountStatements1">

                                    {ReserveFund == null ? '' :
                                        ReserveFund == null ? '' :
                                            Object.entries(ReserveFund).map(([key, value]) => {
                                                return (
                                                    <React.Fragment>
                                                        {value.length == 0 && key.length != 0 && key.length !== 1 ?
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
                                                                <td className={key == "Total:" ? 'total' : key == "Total: " ? 'total' : key == "Total:  " ? 'total' : key == "Total:   " ? 'total' : key == "BeginningBalance" ? 'bolditem' : key == "EndingBalance" ? 'bolditem' : key == "AdjustedEndingBalance" ? 'bolditem' : key == "AdjustedEndingBalance " ? 'bolditem': key == "Ending Balance Post-Payment" ? 'bolditem' : ''}>{key.replace(/([a-z])([A-Z])/g, '$1 $2')}</td>
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
                                    {AvailableFund == null ? '' :
                                        AvailableFund == null ? '' :
                                            Object.entries(AvailableFund).map(([key, value]) => {
                                                return (
                                                    <React.Fragment>
                                                        {value.length == 0 && key.length != 0 && key.length !== 1 ?
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
                                                                <td className={key == "Total:" ? 'total' : key == "Total: " ? 'total' : key == "Total:  " ? 'total' : key == "Total:   " ? 'total' : key == "BeginningBalance" ? 'bolditem' : key == "EndingBalance" ? 'bolditem' : key == "AdjustedEndingBalance" ? 'bolditem' : key == "AdjustedEndingBalance " ? 'bolditem' : ''}>{key.replace(/([a-z])([A-Z])/g, '$1 $2')}</td>
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


                  
                   

                </div>
                <div class="beforeClass"></div>

            </React.Fragment>
        )
    }
}

export default AcquisitionCriteriaTable;

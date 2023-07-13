import React from 'react';
import NumberComp from './NumberComp';
class AcquisitionCriteriaTable extends React.PureComponent {
    render() {
        console.log("Props AccountStatementsTable", this.props.section_title + "------------ " + JSON.stringify(this.props.data[0]))
        let AccountStatements1 = this.props.data[0][1]

        let ActivitiesSinceCutOff1 = this.props.data[1]
        let AccountStatements2 = this.props.data[0][2]
        let ActivitiesSinceCutOff2 = this.props.data[2]

        let AccountStatements4 = this.props.data[0][0]
        let ActivitiesSinceCutOff3 = this.props.data[3]
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
                <div className="wrapper-pdf" id={this.props.section_id+"saludapack"}>
                    <h4 class="sectiontitle">{this.props.section_title.replace(/([a-z])([A-Z])/g, '$1 $2')}</h4>


                  <table class="table100 nopadding noborder">
                    <tr>
                      <td class="w50">
                        <table class="table table-bordered" id="AccountStatements1">
                       
                        {AccountStatements1 == null ? '' :
                                        AccountStatements1 == null ? '' :
                                            Object.entries(AccountStatements1).map(([key, value]) => {
                                                return (
                                                    <React.Fragment>
                                                        {value.length == 0 ?
                                                            <thead className="">
                                                                <tr>
                                                                    <th className="" colSpan="2"  data-title={key}>
                                                                    {/* {key.replace(/([a-z])([A-Z])/g, '$1 $2')} */}
                                                                    {key.replace(/([a-z])([A-Z])/g, '$1 $2')}
                                                                    
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            :
                                                            <tr>
                                                                <td className={key == "Total:" ? 'total' : key == "Total: " ? 'total' : key == "BeginningBalance" ? 'bolditem' : key == "EndingBalance" ? 'bolditem' : key == "AdjustedEndingBalance" ? 'bolditem' : key == "AdjustedEndingBalance " ? 'bolditem' : key == "AdjustedEndingBalance " ? 'bolditem':''}>{key.replace(/([a-z])([A-Z])/g, '$1 $2')}</td>
                                                                <td><NumberComp value={value}></NumberComp></td>
                                                            </tr>
                                                        }

                                                    </React.Fragment>
                                                );
                                            })
                                    }
                      
                        </table>
                        <table class="table table-bordered" id="ActivitiesSinceCutOff1">
                            {/* {JSON.stringify(ActivitiesSinceCutOff1)} */}
                        
                        {ActivitiesSinceCutOff1[0] == null ? '' :
                                        ActivitiesSinceCutOff1[0] == null ? '' :
                                            Object.entries(ActivitiesSinceCutOff1[0]).map(([key, value]) => {
                                                return (
                                                    <React.Fragment>
                                                        {value.length == 0 ?
                                                            <thead className="">
                                                                <tr>
                                                                    <th className="" colSpan="2">{key.replace(/([a-z])([A-Z])/g, '$1 $2')}</th>
                                                                </tr>
                                                            </thead>
                                                            :
                                                            <tr>
                                                                <td className={key == "Total:" ? 'total' : key == "Total: " ? 'total'  : key == "BeginningBalance" ? 'bolditem' : key == "EndingBalance" ? 'bolditem' : key == "AdjustedEndingBalance" ? 'bolditem' : key == "AdjustedEndingBalance " ? 'bolditem' : key == "AdjustedEndingBalance " ? 'bolditem':''}>{key.replace(/([a-z])([A-Z])/g, '$1 $2')}</td>
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
                        {AccountStatements2 == null ? '' :
                                        AccountStatements2 == null ? '' :
                                            Object.entries(AccountStatements2).map(([key, value]) => {
                                                return (
                                                    <React.Fragment>
                                                        {value.length == 0 ?
                                                            <thead className="">
                                                                <tr>
                                                                    <th className="" colSpan="2">{key.replace(/([a-z])([A-Z])/g, '$1 $2')}</th>
                                                                </tr>
                                                            </thead>
                                                            :
                                                            <tr>
                                                                <td className={key == "Total:" ? 'total' : key == "Total: " ? 'total'  : key == "BeginningBalance" ? 'bolditem' : key == "EndingBalance" ? 'bolditem' : key == "AdjustedEndingBalance" ? 'bolditem' : key == "AdjustedEndingBalance " ? 'bolditem' : key == "AdjustedEndingBalance " ? 'bolditem':''}>{key.replace(/([a-z])([A-Z])/g, '$1 $2')}</td>
                                                                <td><NumberComp value={value}></NumberComp></td>
                                                            </tr>
                                                        }

                                                    </React.Fragment>
                                                );
                                            })
                                    }
                      
                        </table>
                        <table class="table table-bordered" id="ActivitiesSinceCutOff2">
                        {ActivitiesSinceCutOff2[0] == null ? '' :
                                        ActivitiesSinceCutOff2[0] == null ? '' :
                                            Object.entries(ActivitiesSinceCutOff2[0]).map(([key, value]) => {
                                                return (
                                                    <React.Fragment>
                                                        {value.length == 0 ?
                                                            <thead className="">
                                                                <tr>
                                                                    <th className="" colSpan="2">{key.replace(/([a-z])([A-Z])/g, '$1 $2')}</th>
                                                                </tr>
                                                            </thead>
                                                            :
                                                            <tr>
                                                                <td className={key == "Total:" ? 'total' : key == "Total: " ? 'total' : key == "BeginningBalance" ? 'bolditem' : key == "EndingBalance" ? 'bolditem' : key == "AdjustedEndingBalance" ? 'bolditem' : key == "AdjustedEndingBalance " ? 'bolditem' : key == "AdjustedEndingBalance " ? 'bolditem':''}>{key.replace(/([a-z])([A-Z])/g, '$1 $2')}</td>
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
                        <table class="table table-bordered"  id="AccountStatements4">
                        {AccountStatements4 == null ? '' :
                                        AccountStatements4.map((tr_item) => {
                                            return (
                                                <React.Fragment>
                                                    {tr_item.value1.length == 0 && tr_item.value2.length == 0 ?
                                                        <thead className="">
                                                            <tr>
                                                                <React.Fragment>
                                                                    <th colSpan="3">{tr_item.key.replace(/([a-z])([A-Z])/g, '$1 $2')}</th>
                                                                </React.Fragment>
                                                            </tr>
                                                        </thead>
                                                        :
                                                        <tbody>
                                                            <tr>
                                                                <React.Fragment>
                                                                    {tr_item == null ? '' :
                                                                        Object.entries(tr_item).map(([key, value]) => {
                                                                            return (
                                                                                <td className={value == "Total:" ? 'total' : value == "Total: " ? 'total'  : value == "Beginning Balance" ? 'bolditem' : value == "Ending Balance" ? 'bolditem' : value == "Adjusted Ending Balance" ? 'bolditem' : value == "Number of Loans" ? 'centeritem' : value == "Principal Balance" ? 'centeritem' :'' }><NumberComp value={value}></NumberComp></td>
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
                        <table class="table table-bordered"  id="ActivitiesSinceCutOff3">
                        {ActivitiesSinceCutOff3 == null ? '' :
                                        ActivitiesSinceCutOff3.map((tr_item) => {
                                            return (
                                                <React.Fragment>
                                                    {tr_item.value1.length == 0 && tr_item.value2.length == 0 ?
                                                        <thead className="">
                                                            <tr>
                                                                <React.Fragment>
                                                                    <th colSpan="3">{tr_item.key.replace(/([a-z])([A-Z])/g, '$1 $2')}</th>
                                                                </React.Fragment>
                                                            </tr>
                                                        </thead>
                                                        :
                                                        <tbody>
                                                            <tr>
                                                                <React.Fragment>
                                                                    {tr_item == null ? '' :
                                                                        Object.entries(tr_item).map(([key, value]) => {
                                                                            return (
                                                                                <td className={value == "Total:" ? 'total' : value == "Total: " ? 'total'  : value == "Beginning Balance" ? 'bolditem' : value == "Ending Balance" ? 'bolditem' : value == "Adjusted Ending Balance" ? 'bolditem' : value == "Number of Loans" ? 'centeritem' : value == "Principal Balance" ? 'centeritem' :''}><NumberComp value={value}></NumberComp></td>
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
                        <table class="table table-bordered" id="AccountStatements3">
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

import React from 'react';
import NumberComp from './NumberComp';
class AcquisitionCriteriaTable extends React.PureComponent {
    render() {
        console.log("Props AccountStatementsTable", this.props.section_title + "------------ " + JSON.stringify(this.props.data[0]))
        let Details = this.props.data[0]

        let Collections = this.props.data[1]
        let EligibleLoanBalance = this.props.data[2]
        let Statistics = this.props.data[3]

        let ConcentrationLimitaions = this.props.data[4]
        return (
            <React.Fragment>
                {/* {JSON.stringify(Details)}
                <br></br>
                {JSON.stringify(Collections)}
                <br></br>
                {JSON.stringify(EligibleLoanBalance)}
                <br></br>
                {JSON.stringify(Statistics)}
                <br></br>
                {JSON.stringify(ConcentrationLimitaions)} */}



                <div className="wrapper-pdf" id={this.props.section_id}>
                    <h4 class="sectiontitle">{this.props.section_title.replace(/([a-z])([A-Z])/g, '$1 $2')}</h4>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                {Object.entries(Details[0]).map(([key, value]) => {
                                    return (
                                        <React.Fragment>
                                            <th>
                                                {key.replace(/([a-z])([A-Z])/g, '$1 $2')}
                                            </th>
                                        </React.Fragment>
                                    );
                                })
                                }
                            </tr>
                        </thead>
                        <tbody>

                            {Details.map((tr_item) => {
                                return (
                                    <React.Fragment>
                                        <tr>
                                            <React.Fragment>
                                                {tr_item == null ? '' :
                                                    Object.entries(tr_item).map(([key, value]) => {
                                                        return (
                                                            <React.Fragment>

                                                                <td
                                                                    className={value == "Total:" ? 'total' : value == "Total: " ? 'total' : ''}
                                                                >
                                                                    <NumberComp value={value}></NumberComp>
                                                                </td>

                                                            </React.Fragment>
                                                        );
                                                    })
                                                }
                                            </React.Fragment>
                                        </tr>
                                    </React.Fragment>
                                );
                            })
                            }


                        </tbody>
                    </table>



                    <table class="table100 nopadding noborder">
                        <tr>
                            <td class="w50">
                                <table class="table table-bordered" id="AccountStatements1">

                                    {Collections == null ? '' :
                                        Collections == null ? '' :
                                            Object.entries(Collections).map(([key, value]) => {
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
                                                                <td className={key == "Total:" ? 'total' : key == "Total: " ? 'total' : ''}>{key.replace(/([a-z])([A-Z])/g, '$1 $2')}</td>
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
                                    {EligibleLoanBalance == null ? '' :
                                        EligibleLoanBalance == null ? '' :
                                            Object.entries(EligibleLoanBalance).map(([key, value]) => {
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
                                                                <td className={key == "Total:" ? 'total' : key == "Total: " ? 'total' : ''}>{key.replace(/([a-z])([A-Z])/g, '$1 $2')}</td>
                                                                <td><NumberComp value={value}></NumberComp></td>
                                                            </tr>
                                                        }

                                                    </React.Fragment>
                                                );
                                            })
                                    }

                                </table>
                            </td>

                        </tr>     </table>

                    <div class="beforeClass"></div>

                    <table class="table100 nopadding noborder">
                        <tr>
                            <td class="w50">
                                <table class="table table-bordered" id="AccountStatements1">

                                    {Statistics == null ? '' :
                                        Statistics == null ? '' :
                                            Object.entries(Statistics).map(([key, value]) => {
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
                                                                <td className={key == "Total:" ? 'total' : key == "Total: " ? 'total' : ''}>{key.replace(/([a-z])([A-Z])/g, '$1 $2')}</td>
                                                                <td><NumberComp value={value}></NumberComp></td>
                                                            </tr>
                                                        }

                                                    </React.Fragment>
                                                );
                                            })
                                    }

                                </table>
                        
                                {this.props.notes !== undefined ?
                        this.props.notes.map((notesItem) => {
                            return (
                                <React.Fragment>
                                    {notesItem.dealId == this.props.dealType ?
                                        <React.Fragment>
                                            {notesItem.tableName == this.props.section_id ?
                                                <React.Fragment>
                                                    <p>{notesItem.note}</p>
                                                    {notesItem.note1 !== undefined ? <p>{notesItem.note1}</p> : ''}
                                                </React.Fragment>
                                                : ''
                                            }
                                        </React.Fragment>
                                        : ''}
                                </React.Fragment>
                            )
                        }
                        )
                        : ''}
                            </td>
                           


                            <td class="w50">
                                <table class="table table-bordered" id="AccountStatements2" >
                                    <thead>
                                        <tr >
                                            {Object.entries(ConcentrationLimitaions[0]).map(([key, value]) => {
                                                return (
                                                    <React.Fragment>
                                                        <th >
                                                            {value.replace(/([a-z])([A-Z])/g, '$1 $2')}
                                                        </th>
                                                    </React.Fragment>
                                                );
                                            })
                                            }
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {ConcentrationLimitaions.slice(1).map((tr_item) => {
                                            return (
                                                <React.Fragment>
                                                    <tr>
                                                        <React.Fragment>
                                                            {tr_item == null ? '' :
                                                                Object.entries(tr_item).map(([key, value]) => {
                                                                    return (
                                                                        <React.Fragment>

                                                                            <td
                                                                                className={value == "Total:" ? 'total' : value == "Total: " ? 'total' : ''}
                                                                            >
                                                                                <NumberComp value={value}></NumberComp>
                                                                            </td>

                                                                        </React.Fragment>
                                                                    );
                                                                })
                                                            }
                                                        </React.Fragment>
                                                    </tr>
                                                </React.Fragment>
                                            );
                                        })
                                        }


                                    </tbody>
                                </table>
                            </td>

                        </tr>    
                         </table>
                         <div class="beforeClass"></div>









                </div>
                {/*
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
                                                                                <td className={value == "Total:" ? 'total' : value == "Total: " ? 'total' : ''}><NumberComp value={value}></NumberComp></td>
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
                                                                                <td className={value == "Total:" ? 'total' : value == "Total: " ? 'total' : ''}><NumberComp value={value}></NumberComp></td>
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
                  </div> */}


            </React.Fragment>
        )
    }
}

export default AcquisitionCriteriaTable;

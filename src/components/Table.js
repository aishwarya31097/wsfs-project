import React from 'react';
import NumberComp from './NumberComp';
import $ from 'jquery';
// $(".total").parent().addClass('total_tr')

class PercentageStat extends React.PureComponent {


    tabledata = (tabledata) => {
        return (
            tabledata.map((tr_item) => {
                return (
                    <React.Fragment>
                        <tr>
                            <React.Fragment>
                                {tr_item == null ? '' :
                                    Object.entries(tr_item).map(([key, value]) => {
                                        return (
                                            <React.Fragment>
                                                <td style={{ "white-space": "pre-wrap" }}
                                                    className={value == "Total:" ? 'total' : value == "Total: " ? 'total' : value == "Total:*" ? 'total' : value == "Total" ? 'total' : value == "Grand Total" ? 'total' : value == "SUBI 2021-A" ? 'total' : value == "SUBI 2021-B" ? 'total' :''}
                                                >
                                                    {key == "Loan ID" || key == "LoanID" ? value :
                                                        <NumberComp value={value}></NumberComp>}
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
        );
    }

    render() {
        console.log("View Trustee Report")
        // alert(this.props.data.length)
        console.log('year',this.props.month,this.props.year)
        let arrayLength = this.props.data.length
        let firstLine
        let tableLength
        let tableColLength
        if (arrayLength != 0) {
            firstLine = this.props.data[0]
            tableLength = this.props.data.length
            tableColLength = Object.keys(this.props.data[0]).length;
        }



        return (
            <React.Fragment>
                {/* {JSON.stringify(tableLength)}
                {JSON.stringify(tableColLength)} */}
                {this.props.data == null ? '' :
                this.props.section_id =="MiscellaneousReportingItems"?
                <div className="wrapper-pdf" id={this.props.section_id}>
                <h4 class="sectiontitle" data-title={this.props.section_title}>
                    {this.props.section_title.replace(/([a-z])([A-Z])/g, '$1 $2').replace("_", " ").replace("-"," - ")}
                </h4>
                </div>
                :
                    this.props.data.length != 0 ?
                        <div className="wrapper-pdf" id={this.props.section_id}>
                            <h4 class="sectiontitle" data-title={this.props.section_title}>
                                {this.props.section_id == "ClassFactorsper1000" || this.props.section_id == "ClassFactorsPer1000" || this.props.section_id == "ClassFactors" ? "Factors Per $1,000" :
                                    this.props.section_title.replace(/([a-z])([A-Z])/g, '$1 $2').replace("_", " ").replace("-"," - ")}
                            </h4>
                            <table className="table table-bordered">
                                {/* {JSON.stringify(this.props.type)}
                                {JSON.stringify(this.props.channelname)}
                                {JSON.stringify(this.props.section_title)} */}
                                {this.props.type == "summery" ?
                                    <thead>
                                        {this.props.channelname == "LimaOne" && this.props.section_title != "ByPIF" ?
                                       <React.Fragment>
                                            <tr>
                                                <th></th>
                                                <th></th>
                                                <th colSpan="3" id="NoLoanDisplay">Unpaid Principal Balance</th>
                                                <th id="NoLoanDisplay">Weighted Average</th>
                                            </tr>

                                            <tr>
                                                {Object.entries(firstLine).map(([key, value]) => {
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
                                            </React.Fragment>
                                            :
                                            this.props.channelname == "Saluda PAC1" || this.props.channelname == "Reigo" ?
                                            <React.Fragment>
                                            <tr>
                                                <th></th>
                                                <th></th>
                                                <th colSpan="3" id="NoLoanDisplay">Unpaid Principal Balance</th>
                                                <th colSpan="4" id="NoLoanDisplay">Non-Zero Weighted Average</th>
                                            </tr>

                                            <tr>
                                                {Object.entries(firstLine).map(([key, value]) => {
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
                                            </React.Fragment>
                                            :
                                            this.props.channelname == "AlphaFlow" && this.props.month<=11 && this.props.year<=2022 ?
                                            <React.Fragment>
                                             
                                            <tr>
                                                <th></th>
                                                <th></th>
                                                <th colSpan="3" id="NoLoanDisplay">Unpaid Principal Balance</th>
                                                <th colSpan="4" id="NoLoanDisplay">Non- Weighted Average</th>
                                            </tr>

                                            <tr>
                                                {Object.entries(firstLine).map(([key, value]) => {
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
                                            </React.Fragment>
                                            :
                                            
                                            this.props.channelname == "AlphaFlow" && this.props.month >= 12 && this.props.year >= 2022 ?
                                            <React.Fragment>
                                            <tr>
                                                <th></th>
                                                <th></th>
                                                <th colSpan="3" id="NoLoanDisplay">Unpaid Principal Balance</th>
                                                {/* <th colSpan="4" id="NoLoanDisplay">Non-Zero Weighted Average</th> */}
                                            </tr>

                                            <tr>
                                                {Object.entries(firstLine).map(([key, value]) => {
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
                                            </React.Fragment>
                                            :
                                            this.props.channelname == "Saluda FIG1" ||  this.props.channelname == "Saluda FIG2"?
                                            <React.Fragment>
                                            <tr>
                                                <th></th>
                                                <th></th>
                                                <th colSpan="3" id="NoLoanDisplay">Unpaid Principal Balance</th>
                                                <th colSpan="5" id="NoLoanDisplay">Non-Zero Weighted Average</th>
                                            </tr>

                                            <tr>
                                                {Object.entries(firstLine).map(([key, value]) => {
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
                                            </React.Fragment>
                                            :
                                            this.props.channelname == "Spruce Hill" ?
                                            <React.Fragment>
                                            <tr>
                                                <th></th>
                                                <th></th>
                                                <th colSpan="3" id="NoLoanDisplay">Unpaid Principal Balance</th>
                                                <th colSpan="v" id="NoLoanDisplay">Non-Zero Weighted Average</th>
                                            </tr>

                                            <tr>
                                                {Object.entries(firstLine).map(([key, value]) => {
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
                                            </React.Fragment>
                                            :
                                            this.props.channelname == "Dominion" ||this.props.channelname == "Saluda SEQ1" ||this.props.channelname == "Saluda WL1"||this.props.channelname == "Saluda RTL1"||this.props.channelname == "Saluda MF1"||this.props.channelname == "Saluda PRE1"||this.props.channelname == "Saluda BC2"||this.props.channelname == "Palisades"||this.props.channelname == "Stoa 2021"||this.props.channelname == "Saluda Builders"||this.props.channelname == "Unlock"||this.props.channelname == "Stoa 2022" || this.props.channelname == "NPL"?
                                            <React.Fragment>
                                            <tr>
                                                <th></th>
                                                <th></th>
                                                <th colSpan="3" id="NoLoanDisplay">Unpaid Principal Balance</th>
                                                {/* <th colSpan="1" id="NoLoanDisplay">Non-Zero Weighted Average</th> */}
                                            </tr>

                                            <tr>
                                                {Object.entries(firstLine).map(([key, value]) => {
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
                                            </React.Fragment>
                                            :
                                            this.props.channelname == "Tildene" ?
                                            <React.Fragment>
                                            <tr>
                                                
                                                <th></th>
                                                <th colSpan="4" id="NoLoanDisplay">Principal Payment</th>
                                                <th colSpan="4" id="NoLoanDisplay">Interest Payment</th>
                                            </tr>

                                            <tr>
                                                {Object.entries(firstLine).map(([key, value]) => {
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
                                            </React.Fragment>
                                            :
                                            <tr>
                                                {Object.entries(firstLine).map(([key, value]) => {
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
                                        }
                                    </thead>
                                    :
                                    //investorreport
                                    <thead>
                                        <tr>
                                            {Object.entries(firstLine).map(([key, value]) => {
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
                                }
                                <tbody>

                                    {this.props.section_title == "Date"||this.props.section_title == "AdditionalReporting"   || this.props.section_title == "ClassFactors"|| this.props.section_title == "Non-CutoffOriginatorData" ?
                                        this.tabledata(this.props.data)
                                        :

                                        tableLength == 1 ?

                                            <React.Fragment>




                                                <tr>
                                                    <td colSpan={tableColLength} id="NoLoanDisplay">
                                                        No Loan Details to display.
                                        </td>
                                                </tr>

                                            </React.Fragment>
                                            :

                                            this.tabledata(this.props.data)

                                    }


                                </tbody>
                            </table>
                            {this.props.notes !== undefined ?
                        this.props.notes.map((notesItem) => {
                            return (
                                <React.Fragment>
                                    {notesItem.dealId == this.props.dealType && notesItem.month.includes(this.props.month) ?
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
                            {/* {this.props.section_id == "PrincipalPayments" ? <div class="beforeClass"></div> : ''} */}

                        </div> : ''
                }

            </React.Fragment>
        )
    }
}

export default PercentageStat;


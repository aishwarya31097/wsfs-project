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
                                                <td
                                                    className={value == "Total:" ? 'total' : value == "Total: " ? 'total' : value == "Total:*" ? 'total' : ''}
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
        );
    }

    render() {
        // console.log("View Trustee Report", this.props.section_title + "------------ " + JSON.stringify(this.props.data))
        // alert(this.props.data.length)
        // var this.props.data=[
        //     [
        //       {
        //         "key": "Constant Prepayments Rates (CPR)",
        //         "value1": "Current(%)",
        //         "value2": "Last 3-Month(%)",
        //         "value3": "Since Cut-Off(%)"
        //       },
        //       {
        //         "key": "January-2022",
        //         "value1": "55.26",
        //         "value2": "50.91",
        //         "value3": "49.95"
        //       },
        //       {
        //         "key": "December-2021",
        //         "value1": "39.06",
        //         "value2": "49.04",
        //         "value3": "49.52"
        //       },
        //       {
        //         "key": "November-2021",
        //         "value1": "56.75",
        //         "value2": "53.37",
        //         "value3": "50.31"
        //       },
        //       {
        //         "key": "October-2021",
        //         "value1": "49.92",
        //         "value2": "53.40",
        //         "value3": "49.69"
        //       },
        //       {
        //         "key": "September-2021",
        //         "value1": "53.22",
        //         "value2": "58.14",
        //         "value3": "49.66"
        //       },
        //       {
        //         "key": "August-2021",
        //         "value1": "56.82",
        //         "value2": "57.83",
        //         "value3": "49.25"
        //       },
        //       {
        //         "key": "July-2021",
        //         "value1": "63.73",
        //         "value2": "58.41",
        //         "value3": "48.23"
        //       },
        //       {
        //         "key": "June-2021",
        //         "value1": "52.21",
        //         "value2": "54.51",
        //         "value3": "45.57"
        //       },
        //       {
        //         "key": "May-2021",
        //         "value1": "58.58",
        //         "value2": "49.37",
        //         "value3": "44.39"
        //       },
        //       {
        //         "key": "April-2021",
        //         "value1": "52.48",
        //         "value2": "42.76",
        //         "value3": "41.06"
        //       },
        //       {
        //         "key": "March-2021",
        //         "value1": "34.37",
        //         "value2": "38.14",
        //         "value3": "37.84"
        //       },
        //       {
        //         "key": "February-2021",
        //         "value1": "40.00",
        //         "value2": "38.96",
        //         "value3": "38.96"
        //       },
        //       {
        //         "key": "January-2021",
        //         "value1": "39.91",
        //         "value2": "38.44",
        //         "value3": "38.44"
        //       },
        //       {
        //         "key": "December-2020",
        //         "value1": "36.93",
        //         "value2": "36.93",
        //         "value3": "36.93"
        //       }
        //     ],
        //     [
        //       {
        //         "key": "Constant Default Rates (CDR)",
        //         "value1": "Current(%)",
        //         "value2": "Last 3-Month(%)",
        //         "value3": "Since Cut-Off(%)"
        //       },
        //       {
        //         "key": "January-2022",
        //         "value1": "-1.89",
        //         "value2": "-0.03",
        //         "value3": "0.41"
        //       },
        //       {
        //         "key": "December-2021",
        //         "value1": "0.00",
        //         "value2": "0.13",
        //         "value3": "0.59"
        //       },
        //       {
        //         "key": "November-2021",
        //         "value1": "1.78",
        //         "value2": "-0.14",
        //         "value3": "0.64"
        //       },
        //       {
        //         "key": "October-2021",
        //         "value1": "-1.42",
        //         "value2": "0.62",
        //         "value3": "0.53"
        //       },
        //       {
        //         "key": "September-2021",
        //         "value1": "-0.82",
        //         "value2": "0.94",
        //         "value3": "0.73"
        //       },
        //       {
        //         "key": "August-2021",
        //         "value1": "4.01",
        //         "value2": "2.34",
        //         "value3": "0.90"
        //       },
        //       {
        //         "key": "July-2021",
        //         "value1": "-0.44",
        //         "value2": "0.80",
        //         "value3": "0.50"
        //       },
        //       {
        //         "key": "June-2021",
        //         "value1": "3.41",
        //         "value2": "1.48",
        //         "value3": "0.64"
        //       },
        //       {
        //         "key": "May-2021",
        //         "value1": "-0.62",
        //         "value2": "0.33",
        //         "value3": "0.17"
        //       },
        //       {
        //         "key": "April-2021",
        //         "value1": "1.61",
        //         "value2": "0.54",
        //         "value3": "0.32"
        //       },
        //       {
        //         "key": "March-2021",
        //         "value1": "0.00",
        //         "value2": "0.00",
        //         "value3": "0.00"
        //       },
        //       {
        //         "key": "February-2021",
        //         "value1": "0.00",
        //         "value2": "0.00",
        //         "value3": "0.00"
        //       },
        //       {
        //         "key": "January-2021",
        //         "value1": "0.00",
        //         "value2": "0.00",
        //         "value3": "0.00"
        //       },
        //       {
        //         "key": "December-2020",
        //         "value1": "0.00",
        //         "value2": "0.00",
        //         "value3": "0.00"
        //       }
        //     ],
        //     [
        //       {
        //         "Constant Prepayment Rate (CPR) Calculations": "",
        //         "Beginning Balance": "68230575.67",
        //         "Scheduled Principal": "125371.23",
        //         "Unscheduled Principal": "4415683.56",
            
        //         "Single Monthly Mortality (SMM)": "6.48%",
        //         "CPR": "55.26%"
        //       }
        //     ],
        //     [
        //       {
        //         "Constant Prepayment Rate (CDR) Calculations": "",
        //         "Beginning Balance": "68230575.67",
        //         "120+ defaults of Current Month": "553159.99",
        //         "120+ defaults of Previous Month": "659653.06",
        //         "New Defaults": "-106493.07",
           
        //         "Default SMM": "-0.16%",
        //         "CDR": "-1.89%"
        //       }
        //     ]
        //   ]
        let arrayLength = this.props.data.length
        let firstLine
        let tableLength
        let tableColLength
        let secondLine
        let length1
        let length2
        console.log("outside if-----------------------------------------", this.props.month)

        if ((((parseInt(this.props.month) <= 10 && parseInt(this.props.year) == 2021) || parseInt(this.props.year) == 2020)) && this.props.dealType != "AlphaFlow") {
            console.log("inside if-----------------------------------------", this.props.month)

            if (arrayLength != 0) {
                firstLine = this.props.data[0]
                secondLine = this.props.data[3]
                tableLength = this.props.data.length
                tableColLength = Object.keys(this.props.data[0]).length;
            }
        }
        else if(parseInt(this.props.month) <= 12 && parseInt(this.props.year) == 2021) 
        {
                firstLine = this.props.data[0][0]
                secondLine = this.props.data[1][0]
                tableLength = this.props.data.length
                length1 = this.props.data[0].length
                length2 = this.props.data[1].length
                tableColLength = Object.keys(this.props.data[0]).length;
        }
        else{
            console.log("ELSEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
            length1 = this.props.data[0].length
            length2 = this.props.data[1].length

            firstLine = this.props.data[0][0]
            secondLine = this.props.data[1][0]
        }




        return (
            <React.Fragment>
                {/* {JSON.stringify(tableLength)}
                {JSON.stringify(tableColLength)} */}
                {this.props.data == null ? '' :
                    this.props.data.length != 0 ?
                        <div className="wrapper-pdf" id={this.props.section_id}>
                            <h4 class="sectiontitle" data-title={this.props.section_title}>
                                {this.props.section_title.replace(/([a-z])([A-Z])/g, '$1 $2').replace("_", " ")}
                            </h4>

                            {(((parseInt(this.props.month) <= 10 && parseInt(this.props.year) == 2021) || parseInt(this.props.year) == 2020) && this.props.dealType != "AlphaFlow") ?

                                <React.Fragment>


                                    <table className="table table-bordered">
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
                                        <tbody>

                                            {this.tabledata(this.props.data.slice(0, 3))}

                                        </tbody>
                                    </table>

                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                {Object.entries(secondLine).map(([key, value]) => {
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

                                            {this.tabledata(this.props.data.slice(3, 6))}

                                        </tbody>
                                    </table>

                                </React.Fragment>
:
(parseInt(this.props.month) <= 12 && parseInt(this.props.year) == 2021)   ?

                                <React.Fragment>
                                    
                                 
                                     
                                        {/* <div class="beforeClass"></div> */}
                                   
                                                <table className="table table-bordered" id="Prepayments">
                                                    <thead>
                                                        <tr>
                                                            {Object.entries(firstLine).map(([key, value]) => {
                                                                return (
                                                                    <React.Fragment>
                                                                        <th>
                                                                            {value.replace(/([a-z])([A-Z])/g, '$1 $2')}
                                                                        </th>
                                                                    </React.Fragment>
                                                                );
                                                            })
                                                            }
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.tabledata(this.props.data[0].slice(1, length1))}

                                                    </tbody>
                                                </table>
                                         
                                                <table className="table table-bordered" id="Prepayments2">
                                                    <thead>
                                                        <tr>
                                                            {Object.entries(secondLine).map(([key, value]) => {
                                                                return (
                                                                    <React.Fragment>
                                                                        <th>
                                                                            {value.replace(/([a-z])([A-Z])/g, '$1 $2')}
                                                                        </th>
                                                                    </React.Fragment>
                                                                );
                                                            })
                                                            }
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                        {this.tabledata(this.props.data[1].slice(1, length2))}

                                                    </tbody>
                                                </table>
                                           
                                </React.Fragment>
                                : 
                                
                                <React.Fragment>
                                    
                                <table class="table100 nopadding noborder">
                                    <tbody><tr>


                                        <td class="w50">
                                        <table className="table table-bordered">
                                {this.props.data[2][0] == null ? '' :
                                    this.props.data[2][0] == null ? '' :
                                        Object.entries(this.props.data[2][0]).map(([key, value]) => {
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
                                        <table className="table table-bordered">
                                {this.props.data[3][0] == null ? '' :
                                    this.props.data[3][0] == null ? '' :
                                        Object.entries(this.props.data[3][0]).map(([key, value]) => {
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
                                    </tr>
                                    </tbody></table>
                                 
                                    {/* <div class="beforeClass"></div> */}
                                <table class="table100 nopadding noborder">
                                    <tbody><tr>


                                        <td class="w50">
                                            <table className="table table-bordered" id="Prepayments">
                                                <thead>
                                                    <tr>
                                                        {Object.entries(firstLine).map(([key, value]) => {
                                                            return (
                                                                <React.Fragment>
                                                                    <th>
                                                                        {value.replace(/([a-z])([A-Z])/g, '$1 $2')}
                                                                    </th>
                                                                </React.Fragment>
                                                            );
                                                        })
                                                        }
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.tabledata(this.props.data[0].slice(1, length1))}

                                                </tbody>
                                            </table>
                                        </td>
                                        <td class="w50">
                                            <table className="table table-bordered" id="Prepayments2">
                                                <thead>
                                                    <tr>
                                                        {Object.entries(secondLine).map(([key, value]) => {
                                                            return (
                                                                <React.Fragment>
                                                                    <th>
                                                                        {value.replace(/([a-z])([A-Z])/g, '$1 $2')}
                                                                    </th>
                                                                </React.Fragment>
                                                            );
                                                        })
                                                        }
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {this.tabledata(this.props.data[1].slice(1, length2))}

                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    </tbody></table>
                            </React.Fragment>
                            
                            }


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

                        </div> : ''
                }

            </React.Fragment>
        )
    }
}

export default PercentageStat;

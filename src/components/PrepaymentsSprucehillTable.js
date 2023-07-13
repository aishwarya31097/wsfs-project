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
                                        className={value == "Total:" ? 'total' : value == "Total: " ? 'total' :value == "Total:*" ? 'total' :''}
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
        // let data1= [
        //     [
        //         {"key":"Constant Prepayments Rates (CPR)","value1":"Current","value2":"Last 3-Month","value3":"Since Cut-Off"},
        //         {"key":"October-2021","value1":"0.31","value2":"0.31","value3":"0.31"},
        //         {"key":"October-2021","value1":"0.31","value2":"0.31","value3":"0.31"},
        //         {"key":"October-2021","value1":"0.41","value2":"0.31","value3":"0.31"}
        //     ],
        //     [
        //         {"key":"Constant Default Rates (CDR)","value1":"Current","value2":"Last 3-Month","value3":"Since Cut-Off"},
        //         {"key":"October-2021","value1":"0.00","value2":"0.00","value3":"0.00"},
        //         {"key":"October-2021","value1":"0.00","value2":"0.00","value3":"0.00"}
        //     ]
        // ]

        
        let firstLine
        let secondLine
        let length1 = this.props.data[0].length
        let length2 = this.props.data[1].length
        
            firstLine = this.props.data[0][0]
            secondLine=this.props.data[1][0]
            

        // let arrayLength = this.props.data.length
        // let firstLine
        // let tableLength
        // let tableColLength
        // let secondLine
        // if(arrayLength != 0){
        //     firstLine = this.props.data[0]
        //     secondLine=this.props.data[3]
        //     tableLength = this.props.data.length
        //     tableColLength = Object.keys(this.props.data[0]).length;
        // }
        

     
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
                          
                            <table className="table table-bordered">
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
                                {this.tabledata(this.props.data[0].slice(1,length1))}

                               {/* { this.tabledata(this.props.data.slice(0,3))} */}

                                
                                </tbody>
                            </table>
                                    


                            <table className="table table-bordered">
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

                                        {this.tabledata(this.props.data[1].slice(1,length2))}
                               {/* { this.tabledata(this.props.data.slice(3,6))} */}

                                
                                </tbody>
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
                                
                        </div> : ''
                }
                
            </React.Fragment>
        )
    }
}

export default PercentageStat;


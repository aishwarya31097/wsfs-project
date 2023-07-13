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
      

        let arrayLength = this.props.data.length
        let firstLine
        let first
        let tableLength
        let tableColLength
        let secondLine
        let second
        if(arrayLength != 0){
            firstLine = this.props.data[0]; 
            secondLine= this.props.data[8];

            tableLength = this.props.data.length
            tableColLength = Object.keys(this.props.data[0]).length;
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
                          
                            {(parseInt(this.props.month) >= 3 && parseInt(this.props.year) >= 2023) ?
                            <table className="table table-bordered">
                            <thead>
                            <tr>
                                <th colSpan="4" style={{"textAlign":"center"}} >SUBI A</th>
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
                            </thead>
                            <tbody>

                          
                           { this.tabledata(this.props.data.slice(0,10))}

                            
                            </tbody>
                        </table>:
                            <table className="table table-bordered">
                                <thead>
                                <tr>
                                    <th colSpan="4" style={{"textAlign":"center"}} >SUBI A</th>
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
                                </thead>
                                <tbody>

                              
                               { this.tabledata(this.props.data.slice(0,8))}

                                
                                </tbody>
                            </table>}
                                    


                            {(parseInt(this.props.month) >= 3 && parseInt(this.props.year) >= 2023) ?
                             <table className="table table-bordered">
                             <thead>
                             <tr>
                                 <th colSpan="4" style={{"textAlign":"center"}} >SUBI B</th>
                             </tr>
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

                             {/* { this.tabledata(second)} */}
                            { this.tabledata(this.props.data.slice(10,18))}

                             
                             </tbody>
                         </table>:
                            <table className="table table-bordered">
                                <thead>
                                <tr>
                                    <th colSpan="4" style={{"textAlign":"center"}} >SUBI B</th>
                                </tr>
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

                                {/* { this.tabledata(second)} */}
                               { this.tabledata(this.props.data.slice(8,16))}

                                
                                </tbody>
                            </table>}
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


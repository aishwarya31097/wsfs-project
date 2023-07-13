import React from 'react';
import NumberComp from './NumberComp';

class DealEventTable extends React.PureComponent {
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
        console.log("PercentageStat", this.props.section_title + "------------ " + JSON.stringify(this.props.data))

        let firstLine
        let tableLength
        let tableColLength
        let secondLine
        let length1
        let length2

        if ((parseInt(this.props.month) <= 10 && parseInt(this.props.year) == 2021) || parseInt(this.props.year) == 2020) {

            tableLength = this.props.data.length
            tableColLength = Object.keys(this.props.data[0]).length;
        }
        else if(parseInt(this.props.month) <= 12 && parseInt(this.props.year) == 2021) 
        {
            tableLength = this.props.data.length
            tableColLength = Object.keys(this.props.data[0]).length;
            length1 = this.props.data[0].length
            length2 = this.props.data[1].length

            firstLine = this.props.data[0][0]
            secondLine = this.props.data[1][0]
        }
        else {

            length1 = this.props.data[0].length
            length2 = this.props.data[1].length

            firstLine = this.props.data[0][0]
            secondLine = this.props.data[1][0]
        }
   


        return (
            <React.Fragment>
                <div className="wrapper-pdf" id={this.props.section_id}>
                    <h4 class="sectiontitle">{this.props.section_title.replace(/([a-z])([A-Z])/g, '$1 $2')}</h4>

                    {((parseInt(this.props.month) <= 10 && parseInt(this.props.year) == 2021) || parseInt(this.props.year) == 2020) ?

                        <React.Fragment>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        {Object.entries(this.props.data[0]).map(([key, value]) => {
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
                                    {this.props.data == null ? '' :
                                        this.props.data.slice(1).map((tr_item) => {

                                            return (
                                                <React.Fragment>

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
                                                </React.Fragment>
                                            );
                                        })
                                    }
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
                </div>
            </React.Fragment>
        )
    }
}

export default DealEventTable;
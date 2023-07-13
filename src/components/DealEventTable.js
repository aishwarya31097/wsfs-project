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
                                                    className={value == "Total:" ? 'total' : value == "Total: " ? 'total' : value == "Total:*" ? 'total' : value == "Description" ? 'centeritem' :''}
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
        let DealEvents1
        let tableLength
        let firstLine
        let tableColLength
        let length1 

        if(((parseInt(this.props.month) <= 12 && parseInt(this.props.year) == 2021) || parseInt(this.props.year) == 2020)){
            tableLength = this.props.data.length
            tableColLength = Object.keys(this.props.data[0]).length;
        }else{
            DealEvents1 = this.props.data
            length1 = this.props.data.length
            firstLine = this.props.data[0]
            
        }
        return (
            <React.Fragment>


{(((parseInt(this.props.month) <= 12 && parseInt(this.props.year) == 2021) || parseInt(this.props.year) == 2020)) ?
    <React.Fragment>
                <div class="beforeClass"></div>
                <div className="wrapper-pdf" id={this.props.section_id}>
                    <h4 class="sectiontitle">{this.props.section_title.replace(/([a-z])([A-Z])/g, '$1 $2')}</h4>
                    <table className="table table-bordered">
                        <thead>
                            <tr>

                                <React.Fragment>
                                    <th colSpan={tableColLength}>
                                        Deal Events
                                                    </th>
                                </React.Fragment>


                            </tr>
                        </thead>




                        <tbody>
                            {this.props.data == null ? '' :
                                this.props.data.map((tr_item) => {



                                    return (
                                        <React.Fragment>

                                            <tr>
                                                <React.Fragment>
                                                    {tr_item == null ? '' :
                                                        Object.entries(tr_item).map(([key, value]) => {
                                                            return (
                                                                <td className={value == "Total:" ? 'total' : value == "Total: " ? 'total': value == "Description" ? 'centeritem': ''}><NumberComp value={value}></NumberComp></td>
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
                <div class="beforeClass"></div>
                </React.Fragment>
                :
                <React.Fragment>
                {this.props.section_id=="Events / MiscellaneousReporting"?'':
                    <div class="beforeClass"></div>
                }
                <div className="wrapper-pdf" id={this.props.section_id}>
                    <h4 class="sectiontitle">{this.props.section_title.replace(/([a-z])([A-Z])/g, '$1 $2')}</h4>
                    <table className="table table-bordered">
                        {DealEvents1 == null ? '' :
                            DealEvents1.length != 0 ?
                                
                                    <React.Fragment>

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
                                            {this.tabledata(DealEvents1.slice(1, length1))}

                                        </tbody>

                                    </React.Fragment>
                                
                            :''
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
                </div>

          


            </React.Fragment>
        }

            </React.Fragment>
        )
    }
}

export default DealEventTable;

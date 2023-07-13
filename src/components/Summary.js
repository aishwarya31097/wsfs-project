import React from 'react';
import NumberComp from './NumberComp';
import $ from 'jquery';
// $(".total").parent().addClass('total_tr')

class PercentageStat extends React.PureComponent {
    render() {
        console.log("View Trustee Report", this.props.section_title + "------------ " + JSON.stringify(this.props.data))
        const firstLine = this.props.data[0]
        return (
            <React.Fragment>

                {this.props.data == null ? '' :
                    this.props.data.length != 0 ?
                        <div className="wrapper-pdf" id={this.props.section_id}>
                            <h4 class="sectiontitle" data-title={this.props.section_title}>
                                {this.props.section_title.replace(/([a-z])([A-Z])/g, '$1 $2').replace("_", " ")}
                            </h4>

         
                                        {this.props.data.map((item) => {
                                            return (
                                                <React.Fragment>
                                                   {/* {JSON.stringify(item)} */}

                                                   <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        {Object.entries(item[0]).map(([key, value]) => {
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

                                    {item.map((tr_item) => {
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
                                                </React.Fragment>
                                            );
                                        })
                                        }

                            

                            {this.props.section_id == "PrincipalPayments" ? <div class="beforeClass"></div> : ''}

                        </div> : ''
                }

            </React.Fragment>
        )
    }
}

export default PercentageStat;


import React from 'react';
import NumberComp from './NumberComp';
class PercentageStat extends React.PureComponent {
    render() {
        console.log("View Trustee Report++++++++++++++++", this.props.section_title + "------------ " + JSON.stringify(this.props.data))
        const firstLine = this.props.data[0]
        return (
            <React.Fragment>
                {this.props.data == null ? '' :
                    this.props.data.length != 0 ?
                        <div className="wrapper-pdf" id={this.props.section_id}>
                            <h4 class="sectiontitle" data-title="Definitions">
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

                                    {this.props.data.slice(1).map((tr_item) => {
                                        return (
                                            <React.Fragment>
                                                <tr>
                                                    <React.Fragment>
                                                        {tr_item == null ? '' :
                                                            Object.entries(tr_item).map(([key, value]) => {
                                                                return (
                                                                    <td>
                                                                        <NumberComp value={value}></NumberComp>
                                                                    </td>
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
                                    
                                    {/* {this.props.section_id == "PrincipalPayments" ? <div class="beforeClass"></div> : ''} */}

                        </div> : ''
                }
            </React.Fragment>
        )
    }
}

export default PercentageStat;


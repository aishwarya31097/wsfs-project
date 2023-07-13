import React from 'react';
class FirstTable extends React.PureComponent {
    render() {
        return (
            <React.Fragment>
                <div class="index">
                    <div class="wrapper-pdf">

                        {this.props.type == "summery" ?

                            <ul>


                                <React.Fragment>
                                    {Object.entries(this.props.data).slice(1).map(([key, value]) => {
                                        return (
                                            <React.Fragment>

                                                {key == "Definitions" ?
                                                    this.props.data.Definitions.length != 0 ?
                                                        <li> <a> <div class="inner">{key.replace(/([a-z])([A-Z])/g, '$1 $2')}</div> </a> </li> : '' :


                                                    <li> <a> <div class="inner">{key.replace(/([a-z])([A-Z])/g, '$1 $2')}</div> </a> </li>}
                                            </React.Fragment>
                                        );
                                    })
                                    }

                                </React.Fragment>
                            </ul>

                            :


                            <ul>


                                <React.Fragment>

                                    {Object.entries(this.props.data).map(([columnId, column], index) => {

                                        return (
                                            <React.Fragment>

                                                {column.items.map((item, index) => {
                                                    return (
                                                        <React.Fragment>
                                                            {/* {JSON.stringify(item.data.length)} */}
                                                            {item.content != "DealContactInformation" ?
                                                                item.content == "MiscellaneousReportingItems" ?
                                                                    <li> <a> <div class="inner">Miscellaneous Reporting Items</div> </a> </li>
                                                                    :
                                                                    item.data.length != 0 ?
                                                                    item.content == "ClassFactorsper1000" || item.content == "ClassFactorsPer1000" || item.content == "ClassFactors" ?
                                                                    <li> <a> <div class="inner">Factors Per $1,000</div> </a> </li>
                                                                    :

                                                                        <li> <a> <div class="inner">{item.content.replace(/([a-z])([A-Z])/g, '$1 $2')}</div> </a> </li>
                                                                        : ''
                                                                : ''}

                                                        </React.Fragment>
                                                    )
                                                })
                                                }


                                            </React.Fragment>
                                        );
                                    })
                                    }

                                </React.Fragment>
                            </ul>
                        }

                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default FirstTable;

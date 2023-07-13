import React from 'react';
class FirstTable extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            ChannelName: localStorage.getItem('ChannelName') || null,

        };
    }
    render() {
        return (
            <React.Fragment>

                <div class="nav">
                    <div id="pageHeader">
                        <div class="page-header-bottom">
                            <div class="page-header-left">
                                <div class="header-title"><span id="header-title">{this.props.data.dealid}</span></div>
                                <div class="header-distribution-date "> <label>Distribution Date</label>
                                    <span id="header-distribution-date">{this.props.data.distributiondate}</span> </div>
                                <div class="header-report-type"> <label>Report Type</label> <span id="header-report-type">{this.props.data.reporttype}</span> </div>
                            </div>
                            <div class="page-header-right">
                                <div class="logo"><a href="#nogo"> <img id="wsfs_logo_first"
                                    src={this.state.ChannelName == "WSFS" ? "https://in-d.ai/wp-content/uploads/2020/11/WSFSLogo.png" :
                                        this.state.ChannelName == "UMB" ? process.env.react_app_base_url_image + 'umb-logo.jpg' :
                                            process.env.react_app_base_url_image + 'logo.jpg'}
                                /> </a> </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default FirstTable;

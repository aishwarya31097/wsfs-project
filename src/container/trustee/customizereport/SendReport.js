import React, { Component } from 'react';
import Header from '../../../components/header';
import Sidebar from '../../../components/sidebar';
import Button from '@material-ui/core/Button';
import { withTheme } from 'react-jsonschema-form';
import { Theme as MuiTheme } from 'rjsf-material-ui';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';
import { withSnackbar } from 'notistack';
import LinearLoader from '../../../components/loader/LinearLoader';
import Loader from '../../../components/loader';
import { widgets, CustomFieldTemplate, customStyles, customStylesauto, ObjectFieldTemplate } from '../../../components/customscripts/customscript';
import { GetAllDeals, generateYears, months, ServicerDataBlockchain } from '../../../servies/services';

import ReactModal from 'react-modal';

const Form = withTheme(MuiTheme);
const schema = require('./SendReport.json');

class SendReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schema: schema,
            years: generateYears(),
            months: months,
            getLoansLoader: false,
            open: false,
            InvestorReportBox: false,
            onboardservicerdata: null,
            getLoader: false,
            pageTitle: "View Servicer Blockchain Data",
            formData: {
                dealId: null,
                month: null,
                year: null
            },
            token: localStorage.getItem("token"),
            userid: localStorage.getItem("userid"),
            OrgName: localStorage.getItem('OrgName'),
            DealType: localStorage.getItem('DealType'),
            peers: localStorage.getItem('peers'),
            loadingForm: true,
            report_loader: false,
            report_box: false,
            open1: null

        };
    }

    handleDoc = (e) => {

        this.setState({ file: e.target.files[0] });

    }


    onOpenModal1(value) {
        console.log("MODAL " + value);
        this.setState({ open1: true, value: value });
    };

    onCloseModal1 = () => {
        this.setState({ open1: false, loadingmodal: false });
        this.props.parentCallback(false);
    };





    async componentWillReceiveProps(nextProps) {
        console.log("nextProps", nextProps)
        this.setState({ open1: nextProps.popup })
    }

    async shouldComponentUpdate(nextProps, nextState){
        console.log("shouldComponentUpdate", nextProps.popup, nextState)
        // this.setState({ open1: nextProps.popup })
        if (nextProps.popup !== this.props.popup) { 
            return true; 
          } else { 
            return false; 
          } 
      

    }
 


    async componentDidMount() {


        
        this.setState({ open1: this.props.popup })

        // console.log("GroupByLima", this.state.groupby)
        // console.log("componentDidMount DealId", this.props.match.params.DealId, this.props.match.params.DealMonth, this.props.match.params.DealYear);

        // const DealId = this.props.match.params.DealId;
        // const DealMonth = this.props.match.params.DealMonth;
        // const DealYear = this.props.match.params.DealYear;
        // this.callMethod(DealId, DealMonth, DealYear);

    }



    onSubmit = async (value) => {
        // this.setState({ report_loader: true })

        let data = value.formData;
        let dealname = this.props.dealname;
        let month = this.props.month;
        let year = this.props.year;

        data.dealname = dealname
        data.month = month
        data.year = year

        console.log("onSubmit data", data)

        // const DealType = this.state.DealType
        // const APIResponse = await ServicerDataBlockchain(DealType, dealId, month, year)
        // console.log("ServicerDataBlockchain", APIResponse.data)
        // this.setState({ tableData: APIResponse.data.DTOServicerReport, report_loader: false, report_box: true })

        // const LoanTapeData = await ViewLoanTapeData(DealType, dealId, month, year, groupby, OrgName);
        // console.log("LoanTapeData", LoanTapeData)
        // this.setState({ report_data: LoanTapeData.data, report_loader: false })

    }



    render() {
        return (
            <React.Fragment>



                <ReactModal
                    isOpen={this.state.open1}
                    contentLabel="Minimal Modal Example"
                    style={customStyles}
                    onRequestClose={this.onCloseModal1}
                >
                    <React.Fragment>
                        <div className="modalPopup">
                            <h2>Send Report</h2>
                            <Button className="closePopup" style={{ minWidth: '30px' }} variant="text" color="primary" onClick={this.onCloseModal1}> <CloseIcon></CloseIcon> </Button>
                            <div>
                                <div class="onecolform">
                                    {this.state.loadingForm == true ?
                                        <Form
                                            schema={this.state.schema}
                                            onSubmit={this.onSubmit}
                                            onChange={this.onFormChanged}
                                            widgets={widgets}
                                            omitExtraData={true}
                                            liveOmit={true}
                                            FieldTemplate={CustomFieldTemplate}
                                            formData={this.state.formData}
                                            uiSchema={this.state.uiSchema}
                                            ObjectFieldTemplate={ObjectFieldTemplate}
                                        >
                                            <div className='row justify-content-center'>
                                                <Button variant='contained' color='primary' type='submit'>
                                                    Send Report {' '}
                                                </Button>
                                                {this.state.getLoansLoader === true ? (
                                                    <CircularProgress size='30px' color='primary' />
                                                ) : (
                                                        ''
                                                    )}
                                            </div>
                                        </Form>
                                        : <Loader></Loader>}

                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                </ReactModal>




            </React.Fragment>
        );
    }
}

export default withSnackbar(SendReport)
import React, { Component } from 'react';
import Header from '../../../components/header';
import Sidebar from '../../../components/sidebar';
import { withSnackbar } from 'notistack';
import { withTheme } from 'react-jsonschema-form';
import { Theme as MuiTheme } from 'rjsf-material-ui';
// import Draggable from 'react-draggable';
import Modal from 'react-bootstrap/Modal';
import TextField from '@material-ui/core/TextField';
// import MUIDataTable from "mui-datatables";
import { GetAllDeals, generateYears, months, CustomizeReportAPI, GetCustomizationReport } from '../../../servies/services';
import { widgets, CustomFieldTemplate, customStyles, customStylesauto, ObjectFieldTemplate } from '../../../components/customscripts/customscript';
import DragNDrop from './DragNDrop';
import Loader from '../../../components/loader';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import $ from 'jquery';
import {
    Redirect
} from "react-router-dom";
import LinearLoader from '../../../components/loader/LinearLoader';

const Form = withTheme(MuiTheme);
const schema = require('./schema.json');


class CustomizeReport extends Component {
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
            pageTitle: "Customize Report",
            formData: {
                dealId: "",
                month: "",
                year: ""
            },
            token: localStorage.getItem("token"),
            userid: localStorage.getItem("userid"),
            OrgName: localStorage.getItem('OrgName'),
            DealType: localStorage.getItem('DealType'),
            peers: JSON.parse(localStorage.getItem('peers')),
            loadingForm: false,
            report_loader: false,
            report_box: false,
            tableData: null,
            all_deals: JSON.parse(localStorage.getItem("all_deals")),
            customization_type:null,
        }
    }

    onFormChanged = (value) => {
        console.log("onFormChanged", value)
        this.setState({ formData: value.formData})
    }

    proceed = () => {
        if (this.props.match.params.DealId != "null" && this.props.match.params.DealId != undefined && this.props.match.params.DealMonth != "null" && this.props.match.params.DealMonth != undefined && this.props.match.params.DealYear != "null" && this.props.match.params.DealYear!= undefined) {
          this.props.history.push("/report/" + this.state.DealType + "/issuer-view-loan-data-tape/monthly-trustee-report/" + this.props.match.params.DealId + "/" + this.props.match.params.DealMonth + "/" + this.props.match.params.DealYear);
        }
        else{
          this.props.history.push("/report/" + this.state.DealType + "/issuer-view-loan-data-tape/monthly-trustee-report/" +  this.state.formData.dealId + "/" + this.state.formData.month + "/" + this.state.formData.year);
        }
    }

    async componentDidMount() {
        if(localStorage.getItem("token") == "" || localStorage.getItem("token") == undefined) {
            window.location.assign("/")
      }
        console.log("GroupByLima", this.state.groupby)
        console.log("componentDidMount DealId", this.props.match.params.DealId, this.props.match.params.DealMonth, this.props.match.params.DealYear);

        const DealId = this.props.match.params.DealId;
        const DealMonth = this.props.match.params.DealMonth;
        const DealYear = this.props.match.params.DealYear;
        this.callMethod(DealId, DealMonth, DealYear);

        this.onSubmitFunction(DealId, DealMonth, DealYear)

    }

    async componentWillReceiveProps(nextProps) {

        this.setState({
            loadingForm: false,
            report_loader: false,
            report_box: false,
            tableData: null,
            customization_type:null,
        })
        
        console.log("nextProps", nextProps)
        let DealId = nextProps.match.params.DealId;
        let DealMonth = nextProps.match.params.DealMonth;
        let DealYear = nextProps.match.params.DealYear;
        this.callMethod(DealId, DealMonth, DealYear);

        this.onSubmitFunction(DealId, DealMonth, DealYear)

        
    }


    onSubmitFunction = (DealId, DealMonth, DealYear) => {
        
        if (DealId != "null" && DealId != undefined &&  DealMonth != "null"  && DealMonth != undefined && DealYear != "null" && DealYear != undefined) {
            let value = {
                "formData": {
                    "dealId": DealId,
                    "month": DealMonth,
                    "year": DealYear,
                }
            }
            this.onSubmit(value);
        } else {

        }
    }


    callMethod(DealId, DealMonth, DealYear) {
        const formData = {
            dealId: DealId,
            month: DealMonth,
            year: DealYear
        }

        this.setState({ formData: formData })
        const DealType = this.state.DealType
        this.GetAllDeals(DealType)
    }

    onSubmit = async (value) => {
        this.setState({ report_loader: true, formData: value.formData, tableData: null })
        let data = value.formData;

        let dealId = value.formData.dealId;
        let month = value.formData.month;
        let year = value.formData.year;

        const DealType = this.state.DealType;

        // GetCustomizationReport

        const APIResponseGetCustomizationReport = await GetCustomizationReport(DealType, dealId, month, year)
        console.log("GetCustomizationReport", APIResponseGetCustomizationReport)

        if(APIResponseGetCustomizationReport !== null ){
        
        if (APIResponseGetCustomizationReport.data.isSuccess == false) {

            const APIResponse = await CustomizeReportAPI(DealType, dealId, month, year)
            console.log("CustomizeReportAPI", APIResponse.data)
            this.setState({ tableData: APIResponse.data, report_loader: false, report_box: true, customization_type:"New"  })

        } else {

            this.setState({ tableData: APIResponseGetCustomizationReport.data, report_loader: false, report_box: true, customization_type:"Update" })
        }

    }

        // this.setState({ tableData: APIResponse.data, report_loader: false, report_box: true })


    }

    GetAllDeals = async (DealType) => {

        // const APIResponse = await GetAllDeals(DealType)
        // console.log("APIResponse", APIResponse, this.state.years, this.state.months)

        let all_deals = this.state.all_deals;

        let deal_name = []

        if (all_deals.length !== 0) {
            all_deals.map((item) => {
                console.log("all_deals item", item.deal_id);
                deal_name.push(item.deal_id);
            })
        }

        let month_name = []
        let month_value = []
        if (this.state.months.length !== 0) {
            this.state.months.map((item) => {
                console.log("item", item);
                month_name.push(item.label);
                month_value.push(item.value);
            })
        }

        let year_name = []
        let year_value = []
        if (this.state.years.length !== 0) {
            this.state.years.map((item) => {
                console.log("item", item);
                year_name.push(item.key);
                year_value.push(item.value);
            })
        }

        // console.log("currency_list_static", currency_list_static);
        let oldSchema = this.state.schema;
        console.log("oldstagedata", oldSchema);
        oldSchema.properties.dealId.enum = deal_name;
        oldSchema.properties.dealId.enumNames = deal_name;

        oldSchema.properties.month.enum = month_value;
        oldSchema.properties.month.enumNames = month_name;

        oldSchema.properties.year.enum = year_value;
        oldSchema.properties.year.enumNames = year_name;

        const newSchema = Object.assign({}, oldSchema);
        console.log("WRITE oldSchema", newSchema);
        // this.setState({ schema: newSchema});
        this.setState({ schema: newSchema, loadingForm: true });
    };





    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }

    render() {

        return (

            <React.Fragment>
                <div className="page">
                    <div className="content">
                        <div className="header"><Header pageTitle={this.state.pageTitle}></Header>
                            {this.state.getLoader == false ? '' : <LinearLoader></LinearLoader>}
                        </div>
                        <div className="page-content text-center">
                            <div className="row">
                                <div className="col-md-12 text-left">
                                    <h3 className="title-page">{!this.state.pageTitle ? '' : this.state.pageTitle}</h3>
                                </div>
                                <div className="col-md-12">
                                    <div class="threecolform">
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
                                                    Customize Report
                                                    {this.state.report_loader === true ? (
                                                        <CircularProgress size='25px' color='primary' />
                                                    ) : (
                                                            ''
                                                        )}
                                                    </Button>
                                                    {this.state.tableData !== null ?'':
                                                        <div className="col-md-1">
                                                            <Button variant="outlined" color="primary" onClick={this.proceed}>Next</Button> 
                                                        </div> 
                                                    }
                                                </div>
                                            </Form>
                                            : <Loader></Loader>}

                                    </div>
                                    <React.Fragment>


                                        {this.state.tableData !== null ?

                                            <DragNDrop
                                                customize_data={this.state.tableData}
                                                dealname={this.state.formData.dealId}
                                                month={this.state.formData.month}
                                                year={this.state.formData.year}
                                                peers={this.state.peers}
                                                token={this.state.token}
                                                dealType={this.state.DealType}
                                                customization_type={this.state.customization_type}
                                            ></DragNDrop>

                                            : ''}




                                    </React.Fragment>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>


        )
    }
}
export default withSnackbar(CustomizeReport)
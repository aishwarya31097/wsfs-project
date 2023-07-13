import React, { Component } from 'react';
import Header from '../../../components/header';
import Sidebar from '../../../components/sidebar';
import Button from '@material-ui/core/Button';
import { withTheme } from 'react-jsonschema-form';
import { Theme as MuiTheme } from 'rjsf-material-ui';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';

import { withSnackbar } from 'notistack';
import LinearLoader from '../../../components/loader/LinearLoader';
import Loader from '../../../components/loader';
import { widgets, CustomFieldTemplate, customStyles, customStylesauto, ObjectFieldTemplate } from '../../../components/customscripts/customscript';
import { GetAllDeals, generateYears, months, ServicerDataBlockchain } from '../../../servies/services';
import NumberComp from '../../../components/NumberComp';
import CurrencyFormat from 'react-currency-format';

const Form = withTheme(MuiTheme);
const schema = require('./schema.json');

class servicerDataDB extends Component {
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
            pageTitle: "View Servicer Data From Network",
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
            loadingForm: false,
            report_loader: false,
            report_box: false,
            all_deals: JSON.parse(localStorage.getItem("all_deals"))
        };
    }

    onFormChanged = (value) => {
        console.log("onFormChanged", value)
        this.setState({ formData: value.formData})
    }

    proceed = (e) => {
        let month = null
        let year = null
        if(this.state.formData.month==12)
        {
         month=1; 
        year =parseInt(this.state.formData.year)+1
        }
        else
        {
          month=parseInt(this.state.formData.month)+1;
        year = parseInt(this.state.formData.year);
        }
        this.props.history.push("/report/" + this.state.DealType + "/generate-investor-report/" + this.state.formData.dealId + "/" +month + "/" + year);
    }




    async componentDidMount() {
        if(localStorage.getItem("token") == "" || localStorage.getItem("token") == undefined) {
            window.location.assign("/")
      }
        console.log("GroupByLima", this.state.groupby)
        console.log("componentDidMount DealId", typeof (this.props.match.params.DealId), this.props.match.params.DealMonth, this.props.match.params.DealYear);
        const DealId = this.props.match.params.DealId;
        const DealMonth = this.props.match.params.DealMonth;
        const DealYear = this.props.match.params.DealYear;
        this.callMethod(DealId, DealMonth, DealYear);

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

    async componentWillReceiveProps(nextProps) {
        console.log("nextProps", nextProps)
        let DealId = nextProps.match.params.DealId;
        let DealMonth = nextProps.match.params.DealMonth;
        let DealYear = nextProps.match.params.DealYear;
        this.callMethod(DealId, DealMonth, DealYear);
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

        this.props.history.push("/report/" + this.state.DealType + "/view-servicer-blockchain-data/" + value.formData.dealId + "/" + value.formData.month + "/" + value.formData.year);

        this.setState({ report_loader: true, formData: value.formData })
        let data = value.formData;

        let dealId = value.formData.dealId;
        let month = value.formData.month;
        let year = value.formData.year;

        const DealType = this.state.DealType
        const APIResponse = await ServicerDataBlockchain(DealType, dealId, month, year);
        if (APIResponse !== null) {
            console.log("ServicerDataBlockchain", APIResponse.data)
            this.setState({ tableData: APIResponse.data.DTOServicerReport, report_loader: false, report_box: true })

            // const LoanTapeData = await ViewLoanTapeData(DealType, dealId, month, year, groupby, OrgName);
            // console.log("LoanTapeData", LoanTapeData)
            // this.setState({ report_data: LoanTapeData.data, report_loader: false })
        } else{
            this.setState({ report_loader: false, report_box: false })
          
            const message = "Could not fetch data";
            this.props.enqueueSnackbar(message, {
                variant: 'error',
                autoHideDuration: 3000,
            });
    
        }
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

                                                    View Data From Network

                                                        {this.state.report_loader === true ? (
                                                            <CircularProgress size='25px' color='primary' />
                                                        ) : (
                                                                ''
                                                            )}
                                                   
                                                    </Button>
                                                    <div className="col-md-1">
                                                        <Button variant="outlined" color="primary" onClick={this.proceed}>Next</Button> 
                                                    </div>   
                                                </div>
                                            </Form>
                                            : <Loader></Loader>}

                                    </div>
                                    <React.Fragment>
                                        {this.state.report_box ?
                                            <div className="InvestorReportBox">
                                                {/* <div className="row justify-content-end">
                                                    <div className="col-md-12 text-right">
                                                        <Button variant="contained" color="primary" type="submit" onClick={this.proceed}> Proceed </Button>
                                                        {this.state.getLoansLoader === true ? < CircularProgress size="30px" color="primary" /> : ''}
                                                    </div>
                                                </div> */}
                                                {this.state.tableData ?
                                                    <React.Fragment>
                                                       
                                                        <table className="table table-bordered text-left" id="viewServicerData" >
                                                            <tbody>
                                                                {this.state.tableData.map((item, index) => (
                                                                    <React.Fragment>
                                                                        {item.srValue.length == 0 ?
                                                                            <React.Fragment>
                                                                                <tr className="thead-light" key={item.srKey}>

                                                                                    {item.srValue1 !== undefined ?
                                                                                        <th colSpan="3">
                                                                                            {item.srKey}
                                                                                        </th>
                                                                                        :
                                                                                        <th colSpan="2">
                                                                                            {item.srKey}
                                                                                        </th>
                                                                                    }
                                                                                </tr>
                                                                            </React.Fragment>
                                                                            :
                                                                            <React.Fragment>
                                                                                <tr key={item.key}>
                                                                                    <td>
                                                                                        {item.srKey}
                                                                                    </td>
                                                                                    {item.srValue1 !== undefined ?
                                                                                        <td data-value={item.srValue1} className={item.srKey==""? 'centeritem':''}>
                                                                                            
                                                                                            <NumberComp value={item.srValue1}></NumberComp> 
                                                                                        </td>
                                                                                        : ''}
                                                                                    <td data-value={item.srValue} className={item.srKey==""? 'centeritem':''}>
                                                                                        {/* <NumberComp value={item.srValue}></NumberComp>  */}
                                                                                    <CurrencyFormat  displayType={'text'} thousandSeparator={true}  decimalSeparator={'.'} decimalScale={2}   value={item.srValue}></CurrencyFormat>

                                                                                    </td>

                                                                               

                                                                                </tr>
                                                                            </React.Fragment>
                                                                        }
                                                                    </React.Fragment>
                                                                ))
                                                                }
                                                            </tbody>
                                                        </table>

                                                    </React.Fragment>
                                                    : null}

                                            </div>

                                            : ''}

                                    </React.Fragment>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default withSnackbar(servicerDataDB)
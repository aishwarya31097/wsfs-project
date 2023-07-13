import React, { Component } from 'react';
import UserHeader from '../../../components/header/UserHeader';
import Button from '@material-ui/core/Button';
import { withTheme } from 'react-jsonschema-form';
import { Theme as MuiTheme } from 'rjsf-material-ui';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withSnackbar } from 'notistack';
import LinearLoader from '../../../components/loader/LinearLoader';
import Loader from '../../../components/loader';
import { widgets, CustomFieldTemplate, ObjectFieldTemplate } from '../../../components/customscripts/customscript';
import { GetAllDeals, generateYears, months } from '../../../servies/services';
import Header from '../../../components/header';

const Form = withTheme(MuiTheme);
const schema = require('./schema.json');

class servicerDataDB extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schema: schema,
            getLoansLoader: false,
            years: generateYears(),
            months: months,
            getLoader: false,
            loadingForm: false,
            DealType: localStorage.getItem('DealType'),
            pageTitle: "Download Servicer Data",
            all_deals: JSON.parse(localStorage.getItem("all_deals")),
            button:1
        };
    }

    async componentDidMount() {
        if(localStorage.getItem("token") == "" || localStorage.getItem("token") == undefined) {
            window.location.assign("/")
      }
        console.log("componentDidMount DealId", this.props.match.params.DealId, this.props.match.params.DealMonth, this.props.match.params.DealYear);

        const DealId = this.props.match.params.DealId;
        const DealMonth = this.props.match.params.DealMonth;
        const DealYear = this.props.match.params.DealYear;

        this.callMethod(DealId, DealMonth, DealYear);
        this.onSubmitFunction(DealId, DealMonth, DealYear)

    }

    async componentWillReceiveProps(nextProps) {
        console.log("nextProps", nextProps)
        let DealId = nextProps.match.params.DealId;
        let DealMonth = nextProps.match.params.DealMonth;
        let DealYear = nextProps.match.params.DealYear;
        this.callMethod(DealId, DealMonth, DealYear);
        this.onSubmitFunction(DealId, DealMonth, DealYear)
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


    onSubmitFunction = (DealId, DealMonth, DealYear) => {
        
        if (DealId != "null" && DealId != undefined &&  DealMonth != "null"  && DealMonth != undefined && DealYear != "null" && DealYear != undefined) {
            let value = {
                "formData": {
                    "dealId": DealId,
                    "month": DealMonth,
                    "year": DealYear,
                }
            }
            // this.onSubmit(value);
        } else {

        }
    }


    onSubmit = async (value) => {
        if(this.state.button==1){
        this.setState({formData:value.formData})
        let data = value.formData;
        let m = parseInt(data.month);
        console.log("month" + m)
        let file = null;
        let file2 = null;

        if (m < 10) {

            file = data.dealId + "-0" + data.month + "-" + data.year + ".xlsx"
            file2 = data.dealId + "-0" + data.month + "-" + data.year + ".xls"
            console.log("file====" + file)
        }
        else {
            file = data.dealId + "-" + data.month + "-" + data.year + ".xlsx"
            file2 = data.dealId + "-" + data.month + "-" + data.year + ".xls"
            console.log("file====" + file)
        }
        let APIResponse ="";

        if (this.state.DealType == "LimaOne") {
            APIResponse = process.env.react_app_base_url + 'backendapilima/downloadfile?file=' + file + '&file2=' + file2
        } else if(this.state.DealType == "Bawag"){
            APIResponse =process.env.react_app_base_url + 'backendapibawag/downloadfile?file=' + file + '&file2=' + file2
        } 
        else if(this.state.DealType == "Saluda PAC1"){
            // window.open(process.env.react_app_base_url + 'backendapisaluda/downloadfile?file=' + file + '&file2=' + file2, '_blank');

            APIResponse = process.env.react_app_base_url + 'backendapisaluda/downloadfile?file=' + file + '&file2=' + file2
           
        } 
        else if(this.state.DealType == "Saluda FIG1"){
            APIResponse =process.env.react_app_base_url + 'backendapisaludagrade/downloadfile?file=' + file + '&file2=' + file2
        } 
        else if(this.state.DealType == "Saluda SEQ1"){
            APIResponse =process.env.react_app_base_url + 'backendapisaludagradeseq1/downloadfile?file=' + file + '&file2=' + file2
        }
        else if(this.state.DealType == "AlphaFlow"){
            APIResponse =process.env.react_app_base_url + 'backendapialphaflow/downloadfile?file=' + file + '&file2=' + file2
        } 
        else if(this.state.DealType == "Saluda FIG2"){
            APIResponse =process.env.react_app_base_url + 'backendapisaludafig2/downloadfile?file=' + file + '&file2=' + file2
        }
        else if(this.state.DealType == "Saluda BC1"){
            APIResponse =process.env.react_app_base_url + 'backendapibc1/downloadfile?file=' + file + '&file2=' + file2
        }   
        else if(this.state.DealType == "Reigo"){
            APIResponse =process.env.react_app_base_url + 'backendapireigo/downloadfile?file=' + file + '&file2=' + file2
        }
        else if(this.state.DealType == "Dominion"){
            APIResponse =process.env.react_app_base_url + 'backendapidominion/downloadfile?file=' + file + '&file2=' + file2
        }
        else if(this.state.DealType == "Saluda WL1"){
            APIResponse =process.env.react_app_base_url + 'backendapisaludawl1/downloadfile?file=' + file + '&file2=' + file2
        }
        else if(this.state.DealType == "Spruce Hill"){
            APIResponse =process.env.react_app_base_url + 'backendapisprucehill/downloadfile?file=' + file + '&file2=' + file2
        }
        else if(this.state.DealType == "Saluda RTL1"){
            APIResponse =process.env.react_app_base_url + 'backendapisaludartl1/downloadfile?file=' + file + '&file2=' + file2
        }
        else if(this.state.DealType == "Stoa 2021"){
            APIResponse =process.env.react_app_base_url + 'backendapistoa/downloadfile?file=' + file + '&file2=' + file2
        }
        else if(this.state.DealType == "Tildene"){
            APIResponse =process.env.react_app_base_url + 'backendapitildene/downloadfile?file=' + file + '&file2=' + file2
        }
        else if(this.state.DealType == "Saluda MF1"){
            APIResponse =process.env.react_app_base_url + 'backendapisaludamf1/downloadfile?file=' + file + '&file2=' + file2
        }
        else if(this.state.DealType == "Palisades"){
            APIResponse =process.env.react_app_base_url + 'backendapipalisades/downloadfile?file=' + file + '&file2=' + file2
        }
        else if(this.state.DealType == "Saluda RTL2"){
            APIResponse =process.env.react_app_base_url + 'backendapisaludartl2/downloadfile?file=' + file + '&file2=' + file2
        }
        else if(this.state.DealType == "Saluda PRE1"){
            APIResponse =process.env.react_app_base_url + 'backendapisaludapre/downloadfile?file=' + file + '&file2=' + file2
        }
        else if(this.state.DealType == "MFA"){
            APIResponse =process.env.react_app_base_url + 'backendapimfa/downloadfile?file=' + file + '&file2=' + file2
        }
        else if(this.state.DealType == "Setpoint"){
            APIResponse =process.env.react_app_base_url + 'backendapisetpoint/downloadfile?file=' + file + '&file2=' + file2
        }
        else {
            APIResponse =process.env.react_app_base_url + 'downloadfile?file=' + file + '&file2=' + file2
        }

  
        downloadFile(APIResponse);
    
        function downloadFile(urlToSend) {
            var req = new XMLHttpRequest();
            req.open("GET", urlToSend, true);
            req.responseType = "blob";
            req.onload = function (event) {
                var blob = req.response;
                console.log(blob.type)
                if(blob.type=="application/json"){
                    const message = "No File Found";
                    alert(message)

                }
                else{
                var fileName = file //if you have the fileName header available
                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = fileName;
                link.click();
                }
            };

            req.send();
        }
    }
    else{
        this.setState({formData:value.formData})
        let data = value.formData;
        let m = parseInt(data.month);
        console.log("month" + m)
        let file = null;
        let file2 = null;

        if (m < 10) {

            file = data.dealId + "-0" + data.month + "-" + data.year + ".xlsx"
            file2 = data.dealId + "-0" + data.month + "-" + data.year + ".xls"
            console.log("file====" + file)
        }
        else {
            file = data.dealId + "-" + data.month + "-" + data.year + ".xlsx"
            file2 = data.dealId + "-" + data.month + "-" + data.year + ".xls"
            console.log("file====" + file)
        }
        let APIResponse ="";

        if (this.state.DealType == "LimaOne") {
            APIResponse = process.env.react_app_base_url + 'backendapilima/downloadfilepost?file=' + file + '&file2=' + file2
        } else if(this.state.DealType == "Bawag"){
            APIResponse =process.env.react_app_base_url + 'backendapibawag/downloadfilepost?file=' + file + '&file2=' + file2
        } 
        else if(this.state.DealType == "Saluda PAC1"){
            // window.open(process.env.react_app_base_url + 'backendapisaluda/downloadfilepost?file=' + file + '&file2=' + file2, '_blank');

            APIResponse = process.env.react_app_base_url + 'backendapisaluda/downloadfilepost?file=' + file + '&file2=' + file2
           
        } 
        else if(this.state.DealType == "Saluda FIG1"){
            APIResponse =process.env.react_app_base_url + 'backendapisaludagrade/downloadfilepost?file=' + file + '&file2=' + file2
        } 
        else if(this.state.DealType == "Saluda SEQ1"){
            APIResponse =process.env.react_app_base_url + 'backendapisaludagradeseq1/downloadfilepost?file=' + file + '&file2=' + file2
        }
        else if(this.state.DealType == "AlphaFlow"){
            APIResponse =process.env.react_app_base_url + 'backendapialphaflow/downloadfilepost?file=' + file + '&file2=' + file2
        } 
        else if(this.state.DealType == "Saluda FIG2"){
            APIResponse =process.env.react_app_base_url + 'backendapisaludafig2/downloadfilepost?file=' + file + '&file2=' + file2
        }
        else if(this.state.DealType == "Saluda BC1"){
            APIResponse =process.env.react_app_base_url + 'backendapibc1/downloadfilepost?file=' + file + '&file2=' + file2
        }   
        else if(this.state.DealType == "Reigo"){
            APIResponse =process.env.react_app_base_url + 'backendapireigo/downloadfilepost?file=' + file + '&file2=' + file2
        }
        else if(this.state.DealType == "Dominion"){
            APIResponse =process.env.react_app_base_url + 'backendapidominion/downloadfilepost?file=' + file + '&file2=' + file2
        }
        else if(this.state.DealType == "Saluda WL1"){
            APIResponse =process.env.react_app_base_url + 'backendapisaludawl1/downloadfilepost?file=' + file + '&file2=' + file2
        }
        else if(this.state.DealType == "Spruce Hill"){
            APIResponse =process.env.react_app_base_url + 'backendapisprucehill/downloadfilepost?file=' + file + '&file2=' + file2
        }
        else if(this.state.DealType == "Saluda RTL1"){
            APIResponse =process.env.react_app_base_url + 'backendapisaludartl1/downloadfilepost?file=' + file + '&file2=' + file2
        }
        else if(this.state.DealType == "Stoa 2021"){
            APIResponse =process.env.react_app_base_url + 'backendapistoa/downloadfilepost?file=' + file + '&file2=' + file2
        }
        else if(this.state.DealType == "Tildene"){
            APIResponse =process.env.react_app_base_url + 'backendapitildene/downloadfilepost?file=' + file + '&file2=' + file2
        }
        else if(this.state.DealType == "Saluda MF1"){
            APIResponse =process.env.react_app_base_url + 'backendapisaludamf1/downloadfilepost?file=' + file + '&file2=' + file2
        }
        else if(this.state.DealType == "Palisades"){
            APIResponse =process.env.react_app_base_url + 'backendapipalisades/downloadfilepost?file=' + file + '&file2=' + file2
        }
        else if(this.state.DealType == "Saluda RTL2"){
            APIResponse =process.env.react_app_base_url + 'backendapisaludartl2/downloadfilepost?file=' + file + '&file2=' + file2
        }
        else if(this.state.DealType == "Saluda PRE1"){
            APIResponse =process.env.react_app_base_url + 'backendapisaludapre/downloadfilepost?file=' + file + '&file2=' + file2
        }
        else if(this.state.DealType == "MFA"){
            APIResponse =process.env.react_app_base_url + 'backendapimfa/downloadfilepost?file=' + file + '&file2=' + file2
        }
        else if(this.state.DealType == "Setpoint"){
            APIResponse =process.env.react_app_base_url + 'backendapisetpoint/downloadfilepost?file=' + file + '&file2=' + file2
        }
        else {
            APIResponse =process.env.react_app_base_url + 'downloadfilepost?file=' + file + '&file2=' + file2
        }
console.log("APIResponse",APIResponse)

          
                downloadFile(APIResponse);
        
        function downloadFile(urlToSend) {
            var req = new XMLHttpRequest();
            req.open("GET", urlToSend, true);
            req.responseType = "blob";
            req.onload = function (event) {
                var blob = req.response;
                console.log(blob.type)
                if(blob.type=="application/json"){
                    const message = "No File Found";
                    alert(message)
                }
                else{
                var fileName = file //if you have the fileName header available
                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = fileName;
                link.click();
                }
            };

            req.send();
        }
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
                                            <div className='row justify-content-center' style={{marginTop:"20px"}}>
                                                    <Button variant='contained'color='primary' onClick={() => (this.state.button = 1)}  type='submit'>
                                                       Raw Loan Tape{' '}
                                                    </Button>
                                                    {this.state.getLoansLoader === true ? (
                                                        <CircularProgress size='30px' color='primary' />
                                                    ) : (
                                                            ''
                                                        )}
                                                         <Button variant='contained' style={{marginLeft:"15px"}}    onClick={() => (this.state.button = 2)} color='primary' type='submit'>
                                                       Standard Loan Tape{' '}
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
                        </div>
                    </div>
                </div>
            </React.Fragment>


        );
    }
}

export default withSnackbar(servicerDataDB)
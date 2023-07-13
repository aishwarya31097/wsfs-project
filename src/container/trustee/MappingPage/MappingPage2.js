import React, { Component } from 'react';
import UserHeader from '../../../components/header/header';
import Button from '@material-ui/core/Button';
import { withTheme } from 'react-jsonschema-form';
import { Theme as MuiTheme } from 'rjsf-material-ui';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withSnackbar } from 'notistack';
import LinearLoader from '../../../components/loader/LinearLoader';
import Loader from '../../../components/loader';
import { widgets, CustomFieldTemplate, ObjectFieldTemplate, customStylesauto } from '../../../components/customscripts/customscript';
import { GetAllDeals, Notes, generateYears, months, UploadServicerReport, ServicerData, UploadToggle, getassettype, restrictdefn, showcolumns, getactivedefinition, getdefinition, updatedefinition } from '../../../servies/services';
import Table from '../../../components/Table';
import FirstTable from '../../../components/FirstTable';
import IndexTable from '../../../components/IndexTable';
import TableDefinitions from '../../../components/TableDefinitions';
import Header from '../../../components/header';
import ReactModal from 'react-modal';
import DoneIcon from '@material-ui/icons/Done';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import Box from '@material-ui/core/Box';
import MUIDataTable from 'mui-datatables';
import { Form as form } from 'react-bootstrap';
import $ from 'jquery';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import DescriptionIcon from '@material-ui/icons/Description';
import PublishIcon from '@material-ui/icons/Publish';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import axios from "axios";
import CustomFooter from '../customize-footer/CustomFooter';
import Tooltip from '@material-ui/core/Tooltip';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import moment from 'moment';
import MapComp from './MapComp2'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';

import Select from '@material-ui/core/Select';
import AddStandardFields from './AddStandardFields'

const Form = withTheme(MuiTheme);
const schema = require('./schema.json');
// const LoanStratSchema = require('./LoanStratSchema.json');
// const TrusteeReportSchema = require('./TrusteeReportSchema.json');
// const LoanDetails=require('./LoanDetails.json');
// const LoanAnalysis=require('./LoanAnalysis.json');
// const SelfService=require('./SelfService.json');
let dealTypeMain = localStorage.getItem('DealType');

// const [month, setMonth] = useState(props.month);
// const [year, setYear] = useState(props.year);
// const [dealType, setDealType] = useState(props.dealType);
// const [channelname, setChannelname] = useState(props.channelname);
// const A = ["loan_id", "borrower_fico", "property_city", "loan_type", "loan_rate"]
const A = [
    {
        "id": "2e8c53a5-3171-4ee9-ac42-78de4e148951",
        "key": "Loan Number",
        "value": "loan_trade_date",
        "descp": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
        "id": "b8d0a962-0bee-48b0-8429-8acbf2ea19d4",
        "key": "Date Sold",
        "value": "unique_field",
        "descp": "loan_id_details1"
    },
    {
        "id": "60eb5deb-d690-4ee2-9cf1-6073dd12f943",
        "key": "Address",
        "value": "",
        "descp": ""
    },
    {
        "id": "d0bea45d-5830-4ee4-887e-e0007b6b0f16",
        "key": "City",
        "value": "property_city",
        "descp": "loan_id_details3"
    },
    {
        "id": "1535158b-b4cf-4927-a923-51463f4d80ed",
        "key": "State",
        "value": "",
        "descp": ""
    },

    {
        "id": "2e8c53a5-3171-4ee9-ac42-78de4e148951",
        "key": "Loan Number",
        "value": "loan_trade_date",
        "descp": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
        "id": "b8d0a962-0bee-48b0-8429-8acbf2ea19d4",
        "key": "Date Sold",
        "value": "unique_field",
        "descp": "loan_id_details1"
    },
    {
        "id": "60eb5deb-d690-4ee2-9cf1-6073dd12f943",
        "key": "Address",
        "value": "",
        "descp": ""
    },
    {
        "id": "d0bea45d-5830-4ee4-887e-e0007b6b0f16",
        "key": "City",
        "value": "property_city",
        "descp": "loan_id_details3"
    },
    {
        "id": "1535158b-b4cf-4927-a923-51463f4d80ed",
        "key": "State",
        "value": "",
        "descp": ""
    },
    {
        "id": "2e8c53a5-3171-4ee9-ac42-78de4e148951",
        "key": "Loan Number",
        "value": "loan_trade_date",
        "descp": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
        "id": "b8d0a962-0bee-48b0-8429-8acbf2ea19d4",
        "key": "Date Sold",
        "value": "unique_field",
        "descp": "loan_id_details1"
    },
    {
        "id": "60eb5deb-d690-4ee2-9cf1-6073dd12f943",
        "key": "Address",
        "value": "",
        "descp": ""
    },
    {
        "id": "d0bea45d-5830-4ee4-887e-e0007b6b0f16",
        "key": "City",
        "value": "property_city",
        "descp": "loan_id_details3"
    },
    {
        "id": "1535158b-b4cf-4927-a923-51463f4d80ed",
        "key": "State",
        "value": "",
        "descp": ""
    }
]
class ViewLoanDataTape extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DealType: localStorage.getItem('DealType'),
            OrgName: localStorage.getItem('OrgName'),
            pageTitle: "Map Standard Fields",
            all_deals: JSON.parse(localStorage.getItem("all_deals")),
            channelname: localStorage.getItem('ChannelName'),
            user_id: localStorage.getItem('user_id'),
            token: localStorage.getItem('token'),
            peers: JSON.parse(localStorage.getItem('peers')),
            schema: schema,

            years: generateYears(),
            months: months,


            formDataTrusteeReport: {
                dealId: null,
                month: null,
                year: null
            },
            fields: {
                dealId: null,
                assetclass: null
            },
            formData: {
                dealId: null,
                month: null,
                year: null
            },
            formDataLoanStrat: {
                dealId: null,
                month: null,
                year: null,
                groupby: null
            },
            formDataLoanAnalysis: {
                dealId: null,
                month: null,

                groupby: null
            },
            formDataSelfService: {
                dealId: null,

                groupby: null
            },
            formDataLoanDetails: {
                dealId: null,
                month: null,
                year: null,
                groupby: null
            },
            mapping_page: false,
            setup_page: false,
            trustee_report: false,
            report_data: null,
            report_data_LoanTapeData: null,
            getReportLoader: false,

            loadingFormschema: false,
            loadingFormLoanStratSchema: false,
            loadingFormTrusteeReportSchema: false,
            switchType: "mapping_page",
            deal_name: [],
            bdb_loader: false,
            report_loader: false,
            version_display: false,
            report_box: false,
            verison_displayed: false,
            total_deals: null,
            header_dealId: null,
            bdbUrl: null,
            formDataLoanStratmonth: null,
            standard_box: false,
            hideshow: false,
            A: A,
            file: null,
            AddStandardFields: false,
            restrict: false,
            AddStdBtn: true,
            getdatabtn: false,
            getLoader: false
        };
        this.handleChange = this.handleChange.bind(this);

    }

    async componentDidMount() {
        if (localStorage.getItem("token") == "" || localStorage.getItem("token") == undefined) {
            window.location.assign("/")
        }
        const DealId = this.props.match.params.DealId;
        const switchType = this.props.match.params.type;
        const assetclass = this.props.match.params.assetclass;
        const DealYear = this.props.match.params.DealYear;
        const groupby = this.props.match.params.groupBy;

        let formData = {
            dealId: DealId,
            // month: DealMonth,
            year: DealYear,
            groupby: groupby,
        }
        const fields = {
            dealId: DealId,
            // month: DealMonth,
            // year: DealYear,
            assetclass: assetclass

        }

        this.setState({ fields: fields });
        this.setState({ groupby: this.state.groupby, switchType: switchType, header_dealId: DealId })
        // this.switchType(switchType, formData)
        const DealType = this.state.DealType;
        this.setTimeout(DealType)


    }

    onOpenModal1 = () => {
        console.log("inside modal1");
        this.setState({ open1: true });
    };
    onCloseModal1 = () => {
        // this.pond.removeFiles();
        this.setState({ open1: false });
    };

    async UploadToggle2() {
        this.setState({ uploadsaveloader: true })
        const DealType = this.state.DealType;
        const newdata = new FormData();
        newdata.append('filename', this.state.file);
      
        newdata.append('peers', this.state.peers)
        newdata.append('peers', this.state.peers)
        newdata.append('dealId', this.state.fields.dealId)
        newdata.append('assetclass', this.state.fields.assetclass)
        // newdata.append('year', this.props.year)
        newdata.append('channelname', this.state.channelname)
        const constUploadServicerReport = await UploadToggle(newdata, DealType);
        if (constUploadServicerReport != null) {
            console.log("UploadServicerReport", constUploadServicerReport.data);
            if (constUploadServicerReport.data.success == true) {
                this.setState({ uploadsaveloader: false })
                const message = "Data saved successfully";
                this.props.enqueueSnackbar(message, {
                    variant: 'info',
                    autoHideDuration: 3000,
                });
            } else {
                const message = "Data not saved successfully";
                this.setState({ uploadsaveloader: false })
                this.props.enqueueSnackbar(message, {
                    variant: 'error',
                    autoHideDuration: 3000,
                });
            }
        }
    }
    setTimeout = (DealType) => (

        this.setState({ getLoader: true }),

        setTimeout(() => {
            console.log("setTimeout", Date().toLocaleString())
            this.GetAllDeals(DealType)
        }, 3000)

    );

    GetAllDeals = async (DealType) => {


        this.setState({ getLoader: true })
        let Role=localStorage.getItem("OrgName");
        let UserName=localStorage.getItem("user_name");
            const APIResponse = await GetAllDeals(DealType,Role,UserName)
        console.log("APIResponse GetAllDeals GetAllDeals", APIResponse, this.state.years, this.state.months)
        if (APIResponse != null) {

            let deal_name = []
            if (APIResponse.data.length !== 0) {
                APIResponse.data.map((item) => {
                    console.log("item", item);
                    deal_name.push({ "deal_id": item });
                })
            }

            localStorage.setItem('all_deals', JSON.stringify(deal_name));
            this.setState({ getLoader: false })
            console.log("deal_name", deal_name)
            this.setState({ deal_name: deal_name })
            console.log("deal_name", this.state.deal_name)
        }

    };
    async componentWillReceiveProps(nextProps) {
        let DealId = nextProps.match.params.DealId;
        let assetclass = nextProps.match.params.assetclass;

        let DealYear = nextProps.match.params.DealYear;
        let switchType = nextProps.match.params.type;
        let groupby = nextProps.match.params.groupBy;
        this.setState({
            // report_data: null,
            mapping_page: false,
            setup_page: false,
            // trustee_report: false,
            // report_data_LoanTapeData: null,
            // getReportLoader: false,
            // loadingFormschema: false,
            // loadingFormLoanStratSchema: false,
            // loadingFormTrusteeReportSchema: false,
            // bdb_loader: false,
            report_loader: false,
            // version_display: false,
            // report_box: false,
            // verison_displayed: false,
            // bdbUrl: null,
        })

        let formData = {
            dealId: DealId,
            // month: DealMonth,
            year: DealYear,
            groupby: groupby,
        }

        const fields = {
            dealId: DealId,
            // month: DealMonth,
            // year: DealYear,
            assetclass: assetclass
        }

        this.setState({ fields: fields });
        this.setState({ groupby: this.state.groupby, switchType: switchType, header_dealId: DealId })
        // this.switchType(switchType, fields)
        const DealType = this.state.DealType;
        this.setTimeout(DealType);
    }

    hideshow = () => {
        var hideshow = this.state.hideshow;
        if (hideshow == false) {
            this.setState({ hideshow: true })

        }
        else {
            this.setState({ hideshow: false })

        }
    }
    handleChange(e) {
        const fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        console.log("FIRSTFIELDS"+JSON.stringify(fields))
        if(fields.dealId!="" && fields.assetclass==undefined){
        this.getassettype(fields);
        }
        this.setState({
            fields,
        });

        console.log('fields', this.state.fields);
        // this.getassettype(fields);
    }


    getassettype = async (fields) => {
        console.log("getassettype", getassettype)
        let channelname = this.state.channelname;
        let dealId = this.state.fields.dealId
        let DealType = this.state.DealType
        // Restrict api
        this.setState({ report_loader: true, standard_box: false })

        const APIResponse = await getassettype(DealType, dealId, channelname)
        if (APIResponse != null) {

            console.log("restrictdefn", APIResponse)
            if (APIResponse.status == 204) {
                // this.setState({ form_loader: false })
                const message = "Missing Parameter or No content";
                this.props.enqueueSnackbar(message, {
                    variant: 'error',
                    autoHideDuration: 4000,
                });
            }
            else if (APIResponse.status !== 200) {
                // this.setState({ form_loader: false })
                const message = "Something went wrong, please try again";
                this.props.enqueueSnackbar(message, {
                    variant: 'error',
                    autoHideDuration: 5000,
                });
            }
            else {

                this.setState({ form_loader: false })
                // this.setState({ AddStdBtn: true, getdatabtn: true })
                const result = APIResponse.data
            //    const result = "RRE"

                console.log("result", result)
                var a = this.state.fields;
                a.assetclass = result
                console.log("A", a)
                this.setState({ fields: a })

            }
        }
    }

    handleDoc = (e) => {
console.log(e.target.files[0])
        console.log("{JSON.stringify(e.target.files[0])}", JSON.stringify(e.target.files[0]))
        this.setState({ file: e.target.files[0] });

    }
    // switchType = async (switchType, formData) => {

    //     if (switchType == "mapping_page") {

    //         this.mapping_page();
    //         this.setState({ fields: formData, header_dealId: formData.dealId });


    //         if (formData.dealId != null && formData.dealId != undefined && formData.month != null && formData.month != undefined && formData.year != null && formData.year != undefined) {
    //             // this.onSubmitMapping(formData)
    //         }

    //     } else if (switchType == "setup_page") {

    //         this.trustee_report();
    //         this.setState({ formDataTrusteeReport: formData, header_dealId: formData.dealId });

    //         if (formData.dealId != null && formData.dealId != undefined && formData.month != null && formData.month != undefined && formData.year != null && formData.year != undefined) {
    //             let value = {
    //                 formData
    //             }

    //             if (this.state.OrgName == "wsfstrustee") {
    //                 this.onSubmitTrustee(value)
    //             } else {

    //                 this.onSubmitInvestor(value)
    //             }
    //         }

    //     } else {

    //         this.mapping_page();
    //         this.setState({ fields: formData, header_dealId: formData.dealId });


    //         if (formData.dealId != null && formData.dealId != undefined && formData.month != null && formData.month != undefined && formData.year != null && formData.year != undefined) {
    //             // this.onSubmitMapping(formData)
    //         }

    //     }
    // }

    // GetAllDeals = async () => {
    //     let all_deals = this.state.all_deals;
    //     this.setState({ total_deals: all_deals.length })
    // }

    // mapping_page = async () => {

    //     this.setState({
    //         mapping_page: true,
    //         setup_page: false,
    //         pageTitle: 'Map Standard Fields'
    //     })
    //     // this.LoanAnalysis();



    // }


    // setup_page = async () => {
    //     this.setState({
    //         form_loader:false,
    //         mapping_page: false,
    //         setup_page: true,
    //         pageTitle: 'Add Standard Fields'
    //     })
    //     let all_deals = this.state.all_deals;

    //     let deal_name = []

    //     if (all_deals.length !== 0) {
    //         all_deals.map((item) => {
    //             console.log("all_deals item", item.deal_id);
    //             deal_name.push(item.deal_id);
    //         })
    //     }

    //     let month_name = []
    //     let month_value = []
    //     if (this.state.months.length !== 0) {
    //         this.state.months.map((item) => {
    //             console.log("item", item);
    //             month_name.push(item.label);
    //             month_value.push(item.value);
    //         })
    //     }

    //     let year_name = []
    //     let year_value = []
    //     if (this.state.years.length !== 0) {
    //         this.state.years.map((item) => {
    //             console.log("item", item);
    //             year_name.push(item.key);
    //             year_value.push(item.value);
    //         })
    //     }

    //     // console.log("currency_list_static", currency_list_static);
    //     let oldSchema = this.state.schema;
    //     console.log("oldstagedata", oldSchema);
    //     oldSchema.properties.dealId.enum = deal_name;
    //     oldSchema.properties.dealId.enumNames = deal_name;

    //     oldSchema.properties.month.enum = month_value;
    //     oldSchema.properties.month.enumNames = month_name;

    //     oldSchema.properties.year.enum = year_value;
    //     oldSchema.properties.year.enumNames = year_name;

    //     const newSchema = Object.assign({}, oldSchema);
    //     console.log("WRITE oldSchema", newSchema);
    //     // this.setState({ schema: newSchema});
    //     this.setState({ schema: newSchema, loadingForm: true });
    //     // this.setState({ TrusteeReportSchema: newSchema, loadingFormTrusteeReportSchema: true });

    // }



    GenerateBDBReport = async (value) => {
        console.log("GenerateBDBReport", value.formData.dealId)
        this.setState({ formDataBDB: value.formData, header_dealId: value.formData.dealId })
        this.BDBReport(value.formData);
    }


    onSubmitMapping = () => {
        console.log("fields", this.state.fields);
        const fields = this.state.fields

        if (this.state.fields.dealId == "null" || this.state.fields.month == "null" || this.state.fields.year == "null" || this.state.fields.assetclass == undefined || this.state.file == null) {

            const message = "Please fill the required fields";
            this.props.enqueueSnackbar(message, {
                variant: 'error',
                autoHideDuration: 4000,
            });

        } else {

            // this.props.history.push("/report/" + this.state.DealType + "/mapping-page/" + this.state.fields.dealId + "/" + this.state.fields.assetclass);
            this.setState({ form_loader: true })
            const data = {
                "dealId": this.state.fields.dealId,
                "month": this.state.fields.month,
                "year": this.state.fields.year,
                "assetclass": this.state.fields.assetclass,
                "userId": this.state.user_id,
                "peers": this.state.peers,
                "filetype": ".xlsx",
                "updatedBy": this.state.user_id,
                "channelname": this.state.channelname,
            }
            let dealId = this.state.fields.dealId;
            let month = this.state.fields.month;
            let year = this.state.fields.year;
            let assetclass = this.state.fields.assetclass;
            let DealType = this.state.DealType
            // this.servicerdata(data);
            console.log("DATAAAA", data)
            this.UploadServicerReportMethod(DealType, dealId, month, year, assetclass, data);

        }

    }



    async Restrict(DealType, dealId, assetclass, data) {

        let channelname = this.state.channelname;

        //Restrict api
        this.setState({ report_loader: true, standard_box: false })
        let restrictresult = "";
        const APIResponse = await restrictdefn(DealType, dealId, assetclass, channelname)
        if (APIResponse != null) {

            console.log("restrictdefn", APIResponse)
            if (APIResponse.status == 204) {
                this.setState({ form_loader: false })
                const message = "Missing Parameter or No content";
                this.props.enqueueSnackbar(message, {
                    variant: 'error',
                    autoHideDuration: 4000,
                });
            }
            else if (APIResponse.status !== 200) {
                this.setState({ form_loader: false })
                const message = "Something went wrong, please try again";
                this.props.enqueueSnackbar(message, {
                    variant: 'error',
                    autoHideDuration: 5000,
                });
            }
            else {

                console.log("APIResponse.data.Success", APIResponse.data);
                if (APIResponse.data.success == 1) {
                    restrictresult = "1";
                    this.UploadServicerReportMethod(DealType, dealId, assetclass, data)

                } else if (APIResponse.data.success == 0) {
                    restrictresult = "0";
                    this.getdata(DealType, dealId, assetclass, channelname, restrictresult)
                }
                else {
                    this.setState({ form_loader: false })
                    this.setState({ AddStdBtn: true, getdatabtn: true })
                    const message = APIResponse.data.result
                    this.props.enqueueSnackbar(message, {
                        variant: 'error',
                        autoHideDuration: 3000,
                    });
                }
            }
        }
        //end
    }

    async UploadServicerReportMethod(DealType, dealId, month, year, assetclass, data) {
        this.setState({
       
            standard_box: false,
       
        })
        // const DealType = this.state.DealType;
        const newdata = new FormData();
        newdata.append('filename', this.state.file);
        newdata.append('dealId', dealId);
        newdata.append('month', month);
        newdata.append('year', year);
        console.log("FILE", newdata)
        const constUploadServicerReport = await UploadServicerReport(newdata, DealType);
        if (constUploadServicerReport != null) {
            console.log("UploadServicerReport", constUploadServicerReport.data);
            if (constUploadServicerReport.data.isSuccess == true) {
                var filetype = constUploadServicerReport.data.filetype
                var month = constUploadServicerReport.data.month
                var year = constUploadServicerReport.data.year
                var filename = constUploadServicerReport.data.filename
                localStorage.setItem("month", month);
                localStorage.setItem("year", year);
                this.setState({ month: month, year: year, filename: filename, filetype: filetype })
                this.showcolumn(DealType, dealId, assetclass, filetype, filename, month, year);
            } else {
                const message = "Data not saved successfully";
                this.props.enqueueSnackbar(message, {
                    variant: 'error',
                    autoHideDuration: 3000,
                });
            }
        }
        else {
            const message = "Data not saved successfully";
            this.props.enqueueSnackbar(message, {
                variant: 'error',
                autoHideDuration: 3000,
            });
        }
    }
     showcolumn= async (DealType, dealId, assetclass, filetype, filename, month, year)=> {
         console.log("YESSSSS")
        let channelname = this.state.channelname;

        const APIResponse = await showcolumns(DealType, dealId, assetclass, filetype, filename, month, year, channelname)
        if (APIResponse != null) {
            console.log("restrictdefn", APIResponse)
            if (APIResponse.status == 204) {
                const message = "Missing Parameter or No content";
                this.props.enqueueSnackbar(message, {
                    variant: 'error',
                    autoHideDuration: 4000,
                });
            }
            else if (APIResponse.status !== 200) {
                const message = "Something went wrong, please try again";
                this.props.enqueueSnackbar(message, {
                    variant: 'error',
                    autoHideDuration: 5000,
                });
            }
            else {
                // console.log("APIResponse.data.Success", APIResponse.data);
                // if (APIResponse.data.success == true) {
                var result = APIResponse.data.key;
                var StdFields = APIResponse.data.stdfields;

                this.setState({
                    A: result,
                    // rightresult: result2,
                    stdfields: StdFields,
                    standard_box: true,
                    form_loader: false,
                    hideshow: true
                })

                // this.getactivedefinition(DealType, dealId, month, year, result)
                // }
                // else {
                //     this.setState({ AddStdBtn: true, getdatabtn: true })
                //     const message = "Could not fetch data!"
                //     this.props.enqueueSnackbar(message, {
                //         variant: 'error',
                //         autoHideDuration: 3000,
                //     });
                // }
            }
        }
    }

    async getactivedefinition(DealType, dealId, month, year, result) {
        const APIResponse = await getactivedefinition(DealType, dealId, month, year)
        if (APIResponse != null) {
            console.log("restrictdefn", APIResponse)
            if (APIResponse.status == 204) {
                const message = "Missing Parameter or No content";
                this.props.enqueueSnackbar(message, {
                    variant: 'error',
                    autoHideDuration: 4000,
                });
            }
            else if (APIResponse.status !== 200) {
                const message = "Something went wrong, please try again";
                this.props.enqueueSnackbar(message, {
                    variant: 'error',
                    autoHideDuration: 5000,
                });
            }
            else {
                console.log("APIResponse.data.Success", APIResponse.data);
                if (APIResponse.status == 200) {
                    var result2 = APIResponse.data;
                    this.prompt(result, result2)
                }
                else {
                    this.setState({ AddStdBtn: true, getdatabtn: true })
                    const message = APIResponse.data.result
                    this.props.enqueueSnackbar(message, {
                        variant: 'error',
                        autoHideDuration: 3000,
                    });
                }
            }
        }
    }

    async prompt(result, result2) {

        this.setState({
            leftresult: result, rightresult: result2,
            standard_box: true,
            form_loader: false,
            hideshow: true
        })


    }

    addstdfieldsbtn = async (value) => {
        this.setState({ AddStandardFields: true })
    }
    onSubmit = async (value) => {

        // this.props.history.push("/report/" + this.state.DealType + "/setup-page/" + value.formData.dealId + "/" + value.formData.month + "/" + value.formData.year);

        this.setState({ report_loader: true, formData: value.formData })
        let data = value.formData;

        let dealId = value.formData.dealId;
        let month = value.formData.month;
        let year = value.formData.year;
        let DealType = this.state.DealType
        const formData = {
            dealId: dealId,
            month: month,
            year: year
        }

        this.setState({ formData: formData });
        this.ServicerDataMongodbMethod(DealType, dealId, month, year)
        // const APIResponse = await ServicerDataMongodb(DealType, dealId, month, year)
        // if (APIResponse != null) {
        //     console.log("ServicerDataMongodb", APIResponse)
        //     this.setState({ tableData: APIResponse.data, report_loader: false, report_box: true })
        // }
    }

    async ServicerDataMongodbMethod(DealType, dealId, month, year) {

        let channelname = this.state.channelname;

        //Restrict api
        this.setState({ report_loader: true })
        let restrictresult = "";
        const APIResponse = await restrictdefn(DealType, dealId, month, year, channelname)
        if (APIResponse != null) {
            console.log("restrictdefn", APIResponse)
            if (APIResponse.status == 204) {
                const message = "Missing Parameter or No content";
                this.props.enqueueSnackbar(message, {
                    variant: 'error',
                    autoHideDuration: 4000,
                });
            }
            else if (APIResponse.status !== 200) {
                const message = "Something went wrong, please try again";
                this.props.enqueueSnackbar(message, {
                    variant: 'error',
                    autoHideDuration: 5000,
                });
            }
            else {
                console.log("APIResponse.data.Success", APIResponse.data);
                if (APIResponse.data.success == 1) {
                    restrictresult = "1";

                    this.getdata(DealType, dealId, month, year, channelname, restrictresult)
                    this.setState({ rectrict: false, AddStdBtn: false })


                } else if (APIResponse.data.success == 0) {
                    restrictresult = "0";
                    this.getdata(DealType, dealId, month, year, channelname, restrictresult)
                }
                else {
                    this.setState({ AddStdBtn: true, getdatabtn: true })
                    const message = APIResponse.data.result
                    this.props.enqueueSnackbar(message, {
                        variant: 'error',
                        autoHideDuration: 3000,
                    });
                }
            }
        }
        //end





    }

    getdata = async (DealType, dealId, month, year, channelname, restrictresult) => {
        //     this.setState({ report_loader: true })

        const APIResponse = await getdefinition(DealType, dealId, month, year, channelname)
        if (APIResponse != null) {
            this.setState({ report_loader: false })

            console.log("restrictdefn", APIResponse)
            if (APIResponse.status == 204) {
                const message = "No content available";
                this.props.enqueueSnackbar(message, {
                    variant: 'error',
                    autoHideDuration: 4000,
                });
            }
            else if (APIResponse.status !== 200) {
                const message = "Something went wrong, please try again";
                this.props.enqueueSnackbar(message, {
                    variant: 'error',
                    autoHideDuration: 5000,
                });
            }
            else {
                console.log("APIResponse.data.Success", APIResponse.data);
                console.log("restrictdefn ", typeof (restrictresult));
                if (APIResponse.status == 200) {
                    this.setState({
                        tableData: APIResponse.data
                        , report_loader: false, report_box: true
                    })
                    if (restrictresult == "1") {
                        this.setState({ rectrict: false, AddStdBtn: false })
                    }
                    else if (restrictresult == "0") {
                        this.setState({ rectrict: true, AddStdBtn: true })
                    }


                } else if (APIResponse.data.success == 0) {
                    restrictresult = APIResponse.data.success;
                    this.getdata(restrictresult)

                }
                else {
                    const message = "Could not fetch data";
                    this.props.enqueueSnackbar(message, {
                        variant: 'error',
                        autoHideDuration: 3000,
                    });
                }
            }
        }
    }

    Edit = async () => {
        this.setState({ actionType: 'edit' });
    }
    Cancel = async () => {
        this.setState({ actionType: 'add' });
    }
    SaveData = async () => {
        // this.setState({ actionType : 'add' });

        var senddata = []
        $('#viewServicerData2 tbody tr').each(function (row, tr) {
            senddata[row] = {

                'def': $(tr).find("td:eq(0) input[type='text']").val(),
                'descp': $(tr).find("td:eq(1) input[type='text']").val(),
                'type': $(tr).find('td:eq(2)').find('select').val(),
                'status': $(tr).find('td:eq(3)').find('select').val(),

            };
        });
        console.log("save button::" + JSON.stringify(senddata))

        var data = {};
    
        data.peers = JSON.parse(localStorage.getItem('peers'));
        data.dealId = this.state.formData.dealId;
        data.month = this.state.formData.month;
        data.year = this.state.formData.year;
        data.channelname = this.state.channelname;

        data.tabledata = senddata;
        console.log("++++++++data+++++++" + JSON.stringify(data));
        let DealType = this.state.DealType
        const APIResponse = await updatedefinition(DealType, data);
        if (APIResponse != null) {
            if (APIResponse.status == 204) {
                const message = "Missing Parameter or No content";
                this.props.enqueueSnackbar(message, {
                    variant: 'error',
                    autoHideDuration: 4000,
                });
            }
            else if (APIResponse.status !== 200) {
                const message = "Something went wrong, please try again";
                this.props.enqueueSnackbar(message, {
                    variant: 'error',
                    autoHideDuration: 5000,
                });
            }
            else {
                console.log("APIResponse.data.Success", APIResponse.data);
                if (APIResponse.data.success == true) {
                    // this.props.history.push("/report/" + this.state.DealType + "/setup-page/" + this.state.formData.dealId + "/" + this.state.formData.month + "/" + this.state.formData.year);

                    this.setState({ actionType: 'add' });
                    const message = "Data saved successfully";
                    this.props.enqueueSnackbar(message, {
                        variant: 'info',
                        autoHideDuration: 3000,
                    });
                    this.ServicerDataMongodbMethod(this.state.DealType, this.state.formData.dealId, this.state.formData.month, this.state.formData.year)

                } else {
                    const message = "Data not saved successfully";
                    this.props.enqueueSnackbar(message, {
                        variant: 'error',
                        autoHideDuration: 3000,
                    });
                }
            }
        }



    }


    proceed = () => {
        this.props.history.push("/report/" + this.state.DealType + "/add-new/" + this.state.fields.dealId + "/" + this.state.fields.month + "/" + this.state.fields.year);
    }
    // onSubmit = async (value) => {
    //     this.setState({ report_loader: true, formDataLoanStrat: value.formData, header_dealId: value.formData.dealId })
    //     let data = value.formData;
    //     let month
    //     let dealId = value.formData.dealId;
    //     if (this.state.DealType == "Bawag") {
    //         month = value.formData.month;

    //     }
    //     else {
    //         month = value.formData.month - 1;
    //     }
    //     let year = value.formData.year;
    //     let groupby = value.formData.groupby;
    //     let OrgName = this.state.OrgName;

    //     this.setState({ formDataLoanStratmonth: month + 1 })

    //     const DealType = this.state.DealType;
    //     // const APIResponse = await ReportStatusStrat(DealType, dealId, month, year, groupby, OrgName)
    //     // if (APIResponse != null) {

    //     //     if (parseInt(APIResponse.data) === 0) {

    //     //         const message = "Report Not Published";
    //     //         this.props.enqueueSnackbar(message, {
    //     //             variant: 'error',
    //     //             autoHideDuration: 5000,
    //     //         });
    //     //         this.setState({ report_loader: false })


    //     //     } else {

    //     //         console.log("ReportStatusStrat", APIResponse.data)
    //     //         const LoanTapeData = await ViewLoanTapeData(DealType, dealId, month, year, groupby, OrgName);
    //     //         if (LoanTapeData != null) {
    //     //             console.log("LoanTapeData", LoanTapeData)
    //     //             this.setState({ report_data_LoanTapeData: LoanTapeData.data, report_loader: false })
    //     //             this.setState({ mapping_page: false, setup_page: true })



    //     //         }


    //     //     }


    //     // }

    // }













    render() {



        return (
            <React.Fragment>
                <div className="page">
                    <div className="content">
                        <div className="header"><Header pageTitle={this.state.pageTitle}></Header>
                            {this.state.getLoader == false ? '' : <LinearLoader></LinearLoader>}

                        </div>
                        <div className="ExtraHeader">

                            <div className="col-md-12">
                                {
                                    this.state.loading == false ? <Loader msg={"Loading Modules..."} /> :
                                        <React.Fragment>
                                            <div className="fourColunm">
                                                <div className="rjsf">
                                                    <div className="row mb-3 MapMain">
                                                        <div className="col-md-2">
                                                            {/* <InputLabel id="demo-simple-select-label">Deal Name</InputLabel> */}
                                                            {/* <InputLabel htmlFor="circle">Circle</InputLabel> */}
                                                            <TextField
                                                                label={'Deal Name*'}
                                                                variant="filled"
                                                                size="medium"
                                                                name="dealId"
                                                                select
                                                                labelId="demo-controlled-open-select-label"
                                                                id="demo-simple-select-helper"
                                                                value={this.state.fields.dealId}
                                                                onChange={this.handleChange}
                                                                // input={<Input name="circle" id="circle" />}
                                                                shrink="true"
                                                            >


                                                                {this.state.deal_name.map((item) => {
                                                                    return (
                                                                        <MenuItem value={item.deal_id}> {item.deal_id} </MenuItem>
                                                                    );
                                                                })
                                                                }
                                                            </TextField>

                                                        </div>
                                                        <div className="col-md-2 ">
                                                            {/* <InputLabel id="demo-simple-select-label">Deal Name</InputLabel> */}
                                                            {/* <InputLabel htmlFor="circle">Circle</InputLabel> */}
                                                            <TextField
                                                                label={'Month*'}
                                                                variant="filled"
                                                                name="month"
                                                                id="standard-select-currency"
                                                                select
                                                                value={this.state.fields.month}
                                                                onChange={this.handleChange}
                                                            >
                                                                {months.map((option) => (
                                                                    <MenuItem key={option.value} value={option.value}>
                                                                        {option.label}
                                                                    </MenuItem>
                                                                ))}
                                                            </TextField>
                                                        </div>
                                                        <div className="col-md-2 ">
                                                            {/* <InputLabel id="demo-simple-select-label">Deal Name</InputLabel> */}
                                                            {/* <InputLabel htmlFor="circle">Circle</InputLabel> */}
                                                            <TextField
                                                                label={'Year*'}
                                                                variant="filled"
                                                                name="year"
                                                                id="standard-select-currency"
                                                                select
                                                                value={this.year}
                                                                value={this.state.fields.year}
                                                                onChange={this.handleChange}
                                                            >
                                                                {this.state.years.map((option) => (
                                                                    <MenuItem key={option.value} value={option.value}>
                                                                        {option.label}
                                                                    </MenuItem>
                                                                ))}
                                                            </TextField>

                                                        </div>
                                                        <div className="col-md-1">

                                                            <TextField
                                                        InputLabelProps={{ shrink: true }}  

                                                                label={'Asset Class*'}
                                                                variant="filled"
                                                                name="assetclass"
                                                                id="standard-select-currency"
                                                                select
                                                                autoFocus="false"
                                                                value={this.state.fields.assetclass}
                                                                onChange={this.handleChange}
                                                            >
                                                                <MenuItem value={'RRE'} > RRE</MenuItem>
                                                                <MenuItem value={'CRE'}> CRE</MenuItem>
                                                                <MenuItem value={'CRP'}> CRP</MenuItem>
                                                                <MenuItem value={'AUT'}> AUT</MenuItem>
                                                                <MenuItem value={'CMR'}> CMR</MenuItem>
                                                                <MenuItem value={'CCD'}> CCD</MenuItem>
                                                                <MenuItem value={'LES'}> LES</MenuItem>
                                                                <MenuItem value={'EST'}> EST</MenuItem>
                                                                <MenuItem value={'NPE'}> NPE</MenuItem>
                                                                <MenuItem value={'NON-ABCP_INV_REP'}> NON-ABCP_INV_REP</MenuItem>
                                                            </TextField>
                                                            {/* <Select
                                                                     label={'Asset Class'}
                                                                    variant="filled"
                                                                    size="medium"
                                                                    name="assetclass"
                                                               
                                                                    labelId="demo-controlled-open-select-label"
                                                                    id="demo-simple-select-helper"
                                                                    value={this.state.fields.assetclass}
                                                                    onChange={this.handleChange}
                                                                >
                                                               
                                                                     
                                                                            <MenuItem value={'RRE'}> RRE</MenuItem>
                                                                  
                                                                </Select> */}
                                                        </div>
                                                        <div className="col-md-2">

                                                            <div id="browseexcel2" style={{ marginTop: "20px" }}>
                                                                <form.Group controlId="formGrid">
                                                                    <form.Control type="file"
                                                                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                                                        onChange={this.handleDoc}
                                                                        placeholder="" />
                                                                </form.Group>
                                                            </div>
                                                        </div>

                                                        <div className="col-md-1" style={{ marginTop: "13px", marginLeft: "-25px", marginRight: "55px" }}>
                                                            <Tooltip title={'Click to upload the servicer raw loan tape and standardize the data'} placement="center">
                                                                <Button onClick={this.onSubmitMapping} variant='contained' color='primary' type='submit'>
                                                                    Standardize {this.state.form_loader === true ? (
                                                                        <CircularProgress size='25px' color='primary' />
                                                                    ) : (
                                                                            ''
                                                                        )}
                                                                </Button>
                                                            </Tooltip>
                                                        </div>
                                                        <div className="col-md-1" style={{ marginTop: "13px" }}>
                                                            <Button variant="outlined" color="primary" onClick={this.proceed}>Next</Button>
                                                        </div>
                                                        {/* <div className="col-md-1" style={{marginTop:"15px"}}>
                                                            <p>(Or)</p>
                                                                </div>
                                                            <div className="col-md-3" style={{marginTop:"13px"}}>
                            <Button variant="contained" color="primary" type="submit" onClick={this.onOpenModal1.bind(this)}> UPLOAD </Button>
                            <p style={{fontSize:"12px", marginLeft:"-30px"}}>(Predefined mapping excel sheet)</p>
                        </div> */}
                                                                        <span className="small_text" style={{marginLeft:"15px"}}>Loan Tape month should be one month prior to Report month</span>

                                                    </div>




                                                </div>
                                            </div>
                                        </React.Fragment>

                                }
                            </div>
                        </div>

                        <div className="page-content" id="formElements">
                            {/* <div className="row">
                                <div className="col-md-12 text-left">
                                    <ul className="navigation_top">
                                        <li className="float-left"> <Button variant={this.state.mapping_page == true ? 'contained' : 'outlined'} onClick={this.mapping_page} color='primary' type='submit'>Map Standard Fields</Button> </li>
                                        <li className="float-left"> <Button variant={this.state.setup_page == true ? 'contained' : 'outlined'} onClick={this.setup_page} color='primary' type='submit'> Add Standard Fields  </Button> </li>
                                    </ul>
                                </div>
                            </div> */}

                            {/* {this.state.mapping_page == true?
                            <div className="row">
                                <div className="col-md-12 text-left">
                                    <ul className="navigation_top">
                                         <Button variant={this.state.LoanAnalysis == true ? 'contained' : 'outlined'} onClick={this.LoanAnalysis} className="bdb3button" color='primary' type='submit'> Loan Analysis</Button> 
                                       <Button variant={this.state.SelfService == true ? 'contained' : 'outlined'} onClick={this.SelfService}className="bdb3button"  color='primary' type='submit'>  Loan Strat Analytics </Button>
                                       <Button variant={this.state.LoanDetails == true ? 'contained' : 'outlined'} onClick={this.LoanDetails} className="bdb3button" color='primary' type='submit'> Loan Strat Summary</Button> 
                                    </ul>
                                </div>
                            </div>
                            :''}  */}

                        </div>

                        {/* {this.state.mapping_page == true ? */}
                        <div className="page-content text-center">
                            <div className="row">
                                {/* <div className="col-md-12 text-left">
                                    <h3 className="title-page" style={{ border: "none" }}>{!this.state.pageTitle ? '' : this.state.pageTitle}         <Button style={{ float: "right" }} onClick={this.hideshow} variant='contained' color='primary' type='submit'>
                                        <KeyboardArrowDownIcon></KeyboardArrowDownIcon>

                                    </Button></h3>
                                </div> */}





                            </div>

                            {console.log("+++", JSON.stringify(this.state.leftresult))}

                            {this.state.standard_box == true ?


                                <MapComp
                                    // leftresult={this.state.leftresult}
                                    // rightresult={this.state.rightresult}
                                    standard_box={this.state.standard_box}
                                    showcolumn={()=>this.showcolumn(this.state.DealType, this.state.fields.dealId, this.state.fields.assetclass, this.state.filetype, this.state.filename, this.state.month, this.state.year)}
                                    dealId={this.state.fields.dealId}
                                    assetclass={this.state.fields.assetclass}
                                    filename={this.state.filename}
                                    filetype={this.state.filetype}
                                    month={this.state.month}
                                    year={this.state.year}
                                    peers={this.state.peers}
                                    token={this.state.token}
                                    DealType={this.state.DealType}
                                    A={this.state.A}
                                    stdfields={this.state.stdfields}
                                    channelname={this.state.channelname}
                                ></MapComp>
                                : ''}

                        </div>
                        {/* : ''}  */}

                        <div id="modal">
                            <ReactModal
                                isOpen={this.state.open1}
                                onRequestClose={this.onCloseModal1}
                                // contentLabel="Minimal Modal Example"
                                style={customStylesauto}
                            >
                                <React.Fragment>

                                    <div className="shifting">
                                        <h5 className="text-secondary"> Upload Mapped Excel </h5>
                                        <div className="row ">
                                            <div className="col text-center">
                                                <Box className="dashed">
                                                    <SaveAltIcon className="upper"></SaveAltIcon>

                                                    <div className="col-md-12">
                                                        <div id="browseexcel">
                                                            <form.Group controlId="formGrid">
                                                                <form.Label
                                                                    style={{ color: '#28a745', fontWeight: '700' }}

                                                                >Browse Excel Sheet:</form.Label>
                                                                <form.Control type="file"
                                                                    onChange={this.handleDoc}
                                                                    placeholder=""
                                                                    style={{ marginLeft: "200px" }} />
                                                            </form.Group>

                                                            {/* <Button variant='outlined' color='primary'
                                                    onClick={() => this.UploadToggle()}
                                            > Upload
            
                                                {this.state.uploadsaveloader == true ? (
                                                    <CircularProgress size='25px' color='primary' />
                                                        ) : (
                                                            ''
                                                )}

                                            </Button> */}
                                                        </div>
                                                    </div>

                                                </Box>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row topping">

                                        <div className="spacing">
                                            <Button variant="outlined" id="optionalbutton" onClick={this.onCloseModal1} > Cancel  </Button>
                                        </div>
                                        <Button variant="contained" color="primary" type="submit" onClick={() => this.UploadToggle2()} >Upload
                          {this.state.uploadsaveloader === true ? (
                                                <CircularProgress size='25px' color='primary' />
                                            ) : (
                                                    ''
                                                )}
                                        </Button>
                                    </div>
                                </React.Fragment>
                            </ReactModal>
                        </div>


                        {/* //  {this.state.mapping_page==true? 
//     this.state.LoanAnalysis == true ?
//     <div className="page-content" id="formElements2">
//         <div className="row">
//             <div className="col-md-12">
//                 <div class="deal_form_setup_page">
//                     {this.state.loadingFormschema == true ?
//                         <Form
//                             schema={this.state.schema}
//                             onSubmit={this.GenerateBDBReport}
//                             onChange={this.onFormChanged}
//                             widgets={widgets}
//                             omitExtraData={true}
//                             liveOmit={true}
//                             FieldTemplate={CustomFieldTemplate}
//                             formData={this.state.formDataLoanAnalysis}
//                             uiSchema={this.state.uiSchema}
//                             ObjectFieldTemplate={ObjectFieldTemplate}
//                         >
//                             <Button className="deal_form_button" variant='contained' color='primary' type='submit'>
//                                 View Report
//                                 {this.state.bdb_loader === true ? (
//                                     <CircularProgress size='25px' color='primary' />
//                                 ) : (
//                                         ''
//                                     )}
//                             </Button>

//                         </Form>
//                         : <Loader></Loader>}
//                 </div>
//             </div>
//         </div>
//     </div>
//     : 
//     this.state.SelfService == true ?
//                             <div className="page-content" id="formElements2">
//                                 <div className="row">
//                                     <div className="col-md-12">
//                                         <div class="deal_form">
//                                             {this.state.loadingFormschema == true ?
//                                                 <Form
//                                                     schema={this.state.schema}
//                                                     onSubmit={this.GenerateBDBReport}
//                                                     onChange={this.onFormChanged}
//                                                     widgets={widgets}
//                                                     omitExtraData={true}
//                                                     liveOmit={true}
//                                                     FieldTemplate={CustomFieldTemplate}
//                                                     formData={this.state.formDataSelfService}
//                                                     uiSchema={this.state.uiSchema}
//                                                     ObjectFieldTemplate={ObjectFieldTemplate}
//                                                 >
//                                                     <Button className="deal_form_button" variant='contained' color='primary' type='submit'>
//                                                         View Report
//                                                         {this.state.bdb_loader === true ? (
//                                                             <CircularProgress size='25px' color='primary' />
//                                                         ) : (
//                                                                 ''
//                                                             )}
//                                                     </Button>

//                                                 </Form>
//                                                 : <Loader></Loader>}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             : 
//                             this.state.LoanDetails == true ?
//                             <div className="page-content" id="formElements2">
//                                 <div className="row">
//                                     <div className="col-md-12">
//                                         <div class="deal_form_loan_details">
//                                             {this.state.loadingFormschema == true ?
//                                                 <Form
//                                                     schema={this.state.schema}
//                                                     onSubmit={this.GenerateBDBReport}
//                                                     onChange={this.onFormChanged}
//                                                     widgets={widgets}
//                                                     omitExtraData={true}
//                                                     liveOmit={true}
//                                                     FieldTemplate={CustomFieldTemplate}
//                                                     formData={this.state.formDataBDBDashboard}
//                                                     uiSchema={this.state.uiSchema}
//                                                     ObjectFieldTemplate={ObjectFieldTemplate}
//                                                 >
//                                                     <Button className="deal_form_button" variant='contained' color='primary' type='submit'>
//                                                         View Report
//                                                         {this.state.bdb_loader === true ? (
//                                                             <CircularProgress size='25px' color='primary' />
//                                                         ) : (
//                                                                 ''
//                                                             )}
//                                                     </Button>

//                                                 </Form>
//                                                 : <Loader></Loader>}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
// :''
// :''}  */}


                        {this.state.setup_page == true ?
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
                                                        <Button variant='contained' color='primary' disabled={this.state.getdatabtn == true ? true : false} type='submit'>
                                                            Get Data
                                                                 {/* {JSON.stringify(this.state.report_loader)/} */}
                                                            {this.state.report_loader === true ? (

                                                                <CircularProgress size='25px' color='primary' />
                                                            ) : (
                                                                    ''
                                                                )}
                                                        </Button>

                                                    </div>
                                                </Form>
                                                : <Loader></Loader>}

                                        </div>
                                        <React.Fragment>
                                            <div className="view-report-header">
                                                {/* {this.state.restrict == true ? ''  : */}
                                                <AddStandardFields
                                                    StandardForm={this.state.formData}
                                                    DealType={this.state.DealType}
                                                    AddStdBtn={this.state.AddStdBtn}
                                                ></AddStandardFields>
                                                {/* } */}
                                                {/* <Button variant="outlined" color="primary" onClick={this.export_excel}> <DescriptionIcon></DescriptionIcon> Export Excel</Button> */}
                                            </div>
                                            <div className="clearfix"></div>
                                            {this.state.report_box ?
                                                <div className="InvestorReportBox">
                                                    <div className="table-responsive">
                                                        <table className="table table-bordered text-left" id="viewServicerData2" >
                                                            <thead className="thead-light" >
                                                                <tr >
                                                                    <th>Standard Fields</th>
                                                                    <th>Description</th>
                                                                    <th>Type</th>
                                                                    <th>Status</th>
                                                                    {this.state.restrict == true ? '' :
                                                                        <th className="OptionColumn">Option</th>
                                                                    }
                                                                </tr>
                                                            </thead>
                                                            <tbody>

                                                                {this.state.tableData ?

                                                                    this.state.tableData.map((item, index) => (
                                                                        <React.Fragment>

                                                                            {/* {JSON.stringify(item)} */}




                                                                            <React.Fragment>
                                                                                <tr key={item.key}>
                                                                                    <td>

                                                                                        {this.state.actionType == "edit" ?
                                                                                            <input class="Form-control" type="text" defaultValue={item.def || ''}></input>
                                                                                            :
                                                                                            <input class="Form-control" type="text" disabled value={item.def}></input>
                                                                                        }



                                                                                    </td>

                                                                                    <td>
                                                                                        {this.state.actionType == "edit" ?
                                                                                            <input class="Form-control" type="text" defaultValue={item.descp || ''}></input>
                                                                                            :
                                                                                            <input class="Form-control" type="text" disabled value={item.descp}></input>
                                                                                        }
                                                                                    </td>

                                                                                    <td>
                                                                                        {this.state.actionType == "edit" ?
                                                                                            <select className="Form-control">
                                                                                                <option hidden selected value={item.type}>{item.type}</option>

                                                                                                <option value='String'>String</option>
                                                                                                <option value='Integer'>Integer</option>
                                                                                                <option value='Float'>Float</option>
                                                                                                <option value='Date'>Date</option>
                                                                                                <option value='Boolean'>Boolean</option>
                                                                                            </select>
                                                                                            :
                                                                                            <select disabled className="Form-control">
                                                                                                <option value={item.type}>{item.type}</option>
                                                                                                {/* <option value=''>Integer</option>
                                                                                                     <option value='Float'>Float</option>
                                                                                                     <option value='Date'>Date</option>
                                                                                                     <option value='Boolean'>Boolean</option> */}
                                                                                            </select>
                                                                                        }
                                                                                    </td>

                                                                                    <td className="OptionColumn">
                                                                                        {this.state.actionType == "edit" ?
                                                                                            <select className="Form-control">
                                                                                                <option hidden selected value={item.status}>{item.status}</option>

                                                                                                <option value='Active'>Active</option>
                                                                                                <option value='Inactive'>Inactive</option>
                                                                                            </select>
                                                                                            :
                                                                                            <select disabled className="Form-control">
                                                                                                <option value={item.status}>{item.status}</option>

                                                                                                {/* <option value='Active'>Active</option>
                                                                                                     <option value='Inactive'>Inactive</option> */}
                                                                                            </select>
                                                                                        }
                                                                                    </td>
                                                                                    {this.state.restrict == true ? '' :
                                                                                        <td>
                                                                                            <div>
                                                                                                <Button className="float-center" color="primary" style={{ padding: "1px", fontSize: "12px" }} variant="outlined" onClick={this.Edit}>Edit</Button>
                                                                                                {this.state.actionType == "edit" ?
                                                                                                    <React.Fragment>
                                                                                                        <Button className="float-center" style={{ marginLeft: "5px", padding: "1px", fontSize: "12px" }} color="primary" variant="outlined" onClick={this.SaveData}>Save</Button>
                                                                                                        <Button className="float-center" style={{ marginLeft: "5px", padding: "1px", fontSize: "12px" }} color="primary" variant="outlined" onClick={this.Cancel}>Cancel</Button>
                                                                                                    </React.Fragment>
                                                                                                    : ''}
                                                                                            </div>
                                                                                            {/* <span class="btn_save"> <a href="#" class="btn btn-link" > Save</a> | </span>
                                                                                             <span class="btn_cancel"> <a href="#" class="btn btn-link" > Cancel</a> | </span> */}
                                                                                        </td>
                                                                                    }
                                                                                </tr>
                                                                            </React.Fragment>



                                                                        </React.Fragment>
                                                                    ))

                                                                    : null}

                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    {/* <div className="row justify-content-center" >
         
                                                             <Button variant="contained" color="primary" type="submit"
                                                                 onClick={this.storetobc} >
                                                                 Proceed
                                                             </Button>
         
                                                         </div>
          */}


                                                </div>
                                                : ''}

                                        </React.Fragment>
                                    </div>
                                </div>
                            </div>
                            : ''}



                        {this.state.setup_page == false ? '' :

                            <React.Fragment>

                                {this.state.report_data_LoanTapeData == null ? '' :

                                    <React.Fragment>

                                        <div className="page-content" id="setup_page">

                                            {this.state.setup_page == true ?
                                                <div className="wrapper-pdf-container">
                                                    <React.Fragment>
                                                        <div className="view-report-header">
                                                            <Button variant="outlined" color="primary" disabled onClick={this.publish_report}> <PublishIcon></PublishIcon> Publish Report</Button>
                                                            <Button variant="outlined" color="primary" onClick={this.export_summery_pdf}> <PictureAsPdfIcon></PictureAsPdfIcon> Export PDF</Button>
                                                            {/* <Button variant="outlined" color="primary" onClick={this.export_excel}> <DescriptionIcon></DescriptionIcon> Export Excel</Button> */}
                                                        </div>
                                                        <div className="clearfix"></div>

                                                        <div id="">

                                                            <div id="pdfdata2">
                                                                <div data-channelname={this.state.channelname}
                                                                    data-month={this.state.formDataLoanStrat.month}
                                                                    data-year={this.state.formDataLoanStrat.year}
                                                                    className={this.state.channelname + "-" + this.state.formDataLoanStrat.month + "-" + this.state.formDataLoanStrat.year + " " + this.state.channelname + " " + this.state.channelname + "-" + this.state.formDataLoanStrat.month}
                                                                >
                                                                    {Object.entries(this.state.report_data_LoanTapeData).map(([key, value], index) => {
                                                                        return (
                                                                            <React.Fragment>
                                                                                <React.Fragment>
                                                                                    {/* {key!=="Definitions"? */}
                                                                                    <div className="wrapper-pdf-container">
                                                                                        <table>
                                                                                            {key == "DealContactInformation" ?
                                                                                                <React.Fragment>
                                                                                                    <tr>
                                                                                                        <td><FirstTable report_type="Loan Stratification Report" section_id={key} data={value} section_title={key} ></FirstTable>
                                                                                                            {/* <div class="beforeClass"></div> */}
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                    <tr>
                                                                                                        <td>
                                                                                                            <IndexTable section_id={'index_page'} type="summery" data={this.state.report_data_LoanTapeData} section_title={''} ></IndexTable>
                                                                                                            {/* <div class="beforeClass"></div> */}

                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </React.Fragment> :

                                                                                                <React.Fragment>
                                                                                                    {key == "Definitions" ?
                                                                                                        <React.Fragment>
                                                                                                            {value.length != 0 ?
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        <div class="beforeClass"></div>
                                                                                                                        <TableDefinitions section_id={key} data={value} section_title={key} ></TableDefinitions>
                                                                                                                        {/* <div class="beforeClass"></div> */}

                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                : ''}
                                                                                                        </React.Fragment>
                                                                                                        :
                                                                                                        <React.Fragment>
                                                                                                            <tr>
                                                                                                                <td>
                                                                                                                    <div class="beforeClass"></div>
                                                                                                                    <Table section_id={key} channelname={this.state.channelname} type="summery" data={value} section_title={key} ></Table>


                                                                                                                </td>
                                                                                                            </tr>
                                                                                                        </React.Fragment>
                                                                                                    }
                                                                                                </React.Fragment>
                                                                                            }
                                                                                        </table>
                                                                                    </div>
                                                                                    {/* :''} */}
                                                                                </React.Fragment>



                                                                            </React.Fragment>
                                                                        )
                                                                    }
                                                                    )}
                                                                </div>
                                                            </div>


                                                        </div>
                                                    </React.Fragment>
                                                </div>
                                                : ''}
                                        </div>
                                    </React.Fragment>
                                }
                            </React.Fragment>
                        }



                    </div>
                </div >
            </React.Fragment >
        );
    }
}

export default withSnackbar(ViewLoanDataTape)
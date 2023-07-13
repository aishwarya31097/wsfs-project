import React, { Component } from 'react';
import UserHeader from '../../../components/header/header';
import Button from '@material-ui/core/Button';
import { withTheme } from 'react-jsonschema-form';
import { Theme as MuiTheme } from 'rjsf-material-ui';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withSnackbar } from 'notistack';
import LinearLoader from '../../../components/loader/LinearLoader';
import Loader from '../../../components/loader';
import { widgets, CustomFieldTemplate, ObjectFieldTemplate } from '../../../components/customscripts/customscript';
import { GetAllDeals, Notes, generateYears, months, ExcelExport, monthsselfservice, GroupByLima,GroupByPre, GroupByBawag, GroupByWL1, GroupByRTL1, GroupBySaludaseq, GroupBySaluda,GroupBySetpoint, GroupByAlphaflow, GroupByFig2, GroupByBC1,GroupByBC2, GroupByReigo, GroupByDominion, GroupByMF1, GroupByMFA,GenerateLoanstratpdf, GroupBySaludaGrade, GroupBySprucehill, GroupByTildene, GroupByStoa, GroupByPalisades, InvestorVersion, PublishReport, InvestorReportStatus, ViewInvestorReport, ReportStatusStrat, ViewLoanTapeData, SaludaLoanStratReport, GeneratePDF, dummydata, CrateTable, loanstraitdata, SaludaIndexData, LimaIndexData } from '../../../servies/services';
import Table from '../../../components/Table';
import FirstTable from '../../../components/FirstTable';
import IndexTable from '../../../components/IndexTable';
import TableDefinitions from '../../../components/TableDefinitions';
import ViewDragNDrop from './ViewDragNDrop';
import MUIDataTable from 'mui-datatables';
import $ from 'jquery';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import DescriptionIcon from '@material-ui/icons/Description';
import PublishIcon from '@material-ui/icons/Publish';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import axios from "axios";
import CustomFooter from '../customize-footer/CustomFooter';
import fs from 'fs';

import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import moment from 'moment';

const Form = withTheme(MuiTheme);
const schema = require('./schema.json');
const LoanStratSchema = require('./LoanStratSchema.json');
const TrusteeReportSchema = require('./TrusteeReportSchema.json');
const LoanDetails = require('./LoanDetails.json');
const LoanAnalysis = require('./LoanAnalysis.json');
const SelfService = require('./SelfService.json');
let dealTypeMain = localStorage.getItem('DealType');
let groupby = null;

if (dealTypeMain == "LimaOne") {
    groupby = GroupByLima;
} else if (dealTypeMain == "Bawag") {
    groupby = GroupByBawag;
} else if (dealTypeMain == "Saluda PAC1") {
    groupby = GroupBySaluda;
} else if (dealTypeMain == "Saluda FIG1") {
    groupby = GroupBySaludaGrade;
} else if (dealTypeMain == "Saluda SEQ1") {
    groupby = GroupBySaludaseq;
}
else if (dealTypeMain == "AlphaFlow") {
    groupby = GroupByAlphaflow;
}
else if (dealTypeMain == "Saluda FIG2") {
    groupby = GroupByFig2;
}
else if (dealTypeMain == "Saluda BC1") {
    groupby = GroupByBC1;
}
else if (dealTypeMain == "Reigo") {
    groupby = GroupByReigo;
}
else if (dealTypeMain == "Dominion") {
    groupby = GroupByDominion;
}
else if (dealTypeMain == "Saluda WL1") {
    groupby = GroupByWL1;
}
else if (dealTypeMain == "Spruce Hill") {
    groupby = GroupBySprucehill;
}
else if (dealTypeMain == "Saluda RTL1") {
    groupby = GroupByRTL1;
}
else if (dealTypeMain == "Stoa 2021") {
    groupby = GroupByStoa;
}
else if (dealTypeMain == "Tildene") {
    groupby = GroupByTildene;
}
else if (dealTypeMain == "Saluda MF1") {
    groupby = GroupByMF1;
}
else if (dealTypeMain == "Palisades") {
    groupby = GroupByPalisades;
}
else if (dealTypeMain == "Saluda RTL2") {
    groupby = GroupByRTL1;
}
else if (dealTypeMain == "MFA") {
    groupby = GroupByMFA;
}
else if (dealTypeMain == "Saluda PRE1") {
    groupby = GroupByPre;
}
else if (dealTypeMain == "Setpoint") {
    groupby = GroupBySetpoint;
}
// const [month, setMonth] = useState(props.month);
// const [year, setYear] = useState(props.year);
// const [dealType, setDealType] = useState(props.dealType);
// const [channelname, setChannelname] = useState(props.channelname);

const DUMMY = { "DealContactInformation": { "dealid": "saludaseqtestdeal3", "distributiondate": "12/28/2020", "reporttype": "Test Report", "relationshipmanager": "Test", "address": "Test", "email": "Test", "websitereporting": "Test" }, "delinquency_status": [{ "Delinquency Status": "C", "Count": 2439, "$ Aggregate": "140643181.78", "% Aggregate": "100.00", "$ Average": "57664.28", "% Mortgage Net Interest Rate": "8.13", "% Initial Combined Loan-to-Value Ratio": "NaN", "Credit Score": "0", "Remaining Term": "0" }, { "Delinquency Status": "Total:", "Count": "2439", "$ Aggregate": "140643181.78", "% Aggregate": "100.00", "$ Average": "57664.28", "% Mortgage Net Interest Rate": "8.13", "% Initial Combined Loan-to-Value Ratio": "NaN", "Credit Score": "0", "Remaining Term": "0" }], "current_rate": [{ "% Interest Rate": "4.75 - 4.99", "Count": 20, "$ Aggregate": "1283387.93", "% Aggregate": "0.91", "$ Average": "64169.40", "% Mortgage Net Interest Rate": "2715.54", "% Initial Combined Loan-to-Value Ratio": "0.00", "Credit Score": "0", "Remaining Term": "0" }, { "% Interest Rate": "5.00 - 5.24", "Count": 49, "$ Aggregate": "3751769.10", "% Aggregate": "2.67", "$ Average": "76566.72", "% Mortgage Net Interest Rate": "2250.43", "% Initial Combined Loan-to-Value Ratio": "0.00", "Credit Score": "0", "Remaining Term": "0" }, { "% Interest Rate": "5.25 - 5.49", "Count": 37, "$ Aggregate": "2896558.49", "% Aggregate": "2.06", "$ Average": "78285.36", "% Mortgage Net Interest Rate": "3298.82", "% Initial Combined Loan-to-Value Ratio": "0.00", "Credit Score": "0", "Remaining Term": "0" }, { "% Interest Rate": "5.50 - 5.74", "Count": 38, "$ Aggregate": "3221688.27", "% Aggregate": "2.29", "$ Average": "84781.27", "% Mortgage Net Interest Rate": "2896.61", "% Initial Combined Loan-to-Value Ratio": "0.00", "Credit Score": "0", "Remaining Term": "0" }, { "% Interest Rate": "5.75 - 5.99", "Count": 58, "$ Aggregate": "3764894.81", "% Aggregate": "2.68", "$ Average": "64911.98", "% Mortgage Net Interest Rate": "2165.54", "% Initial Combined Loan-to-Value Ratio": "0.00", "Credit Score": "0", "Remaining Term": "0" }, { "% Interest Rate": "6.00 - 6.24", "Count": 89, "$ Aggregate": "5679025.09", "% Aggregate": "4.04", "$ Average": "63809.27", "% Mortgage Net Interest Rate": "1521.61", "% Initial Combined Loan-to-Value Ratio": "0.00", "Credit Score": "0", "Remaining Term": "0" }, { "% Interest Rate": "6.25 - 6.49", "Count": 96, "$ Aggregate": "6387419.78", "% Aggregate": "4.54", "$ Average": "66535.62", "% Mortgage Net Interest Rate": "2324.45", "% Initial Combined Loan-to-Value Ratio": "0.00", "Credit Score": "0", "Remaining Term": "0" }, { "% Interest Rate": "6.50 - 6.74", "Count": 210, "$ Aggregate": "12116833.55", "% Aggregate": "8.62", "$ Average": "57699.21", "% Mortgage Net Interest Rate": "1543.08", "% Initial Combined Loan-to-Value Ratio": "0.00", "Credit Score": "0", "Remaining Term": "0" }, { "% Interest Rate": "6.75 - 6.99", "Count": 157, "$ Aggregate": "9974374.02", "% Aggregate": "7.09", "$ Average": "63531.04", "% Mortgage Net Interest Rate": "2437.59", "% Initial Combined Loan-to-Value Ratio": "0.00", "Credit Score": "0", "Remaining Term": "0" }, { "% Interest Rate": "7.00 - 7.24", "Count": 121, "$ Aggregate": "7009121.38", "% Aggregate": "4.98", "$ Average": "57926.62", "% Mortgage Net Interest Rate": "1471.57", "% Initial Combined Loan-to-Value Ratio": "0.00", "Credit Score": "0", "Remaining Term": "0" }, { "% Interest Rate": "7.25 - 7.49", "Count": 108, "$ Aggregate": "5757667.43", "% Aggregate": "4.09", "$ Average": "53311.74", "% Mortgage Net Interest Rate": "1681.56", "% Initial Combined Loan-to-Value Ratio": "0.00", "Credit Score": "0", "Remaining Term": "0" }, { "% Interest Rate": "7.50 - 7.74", "Count": 122, "$ Aggregate": "6301965.85", "% Aggregate": "4.48", "$ Average": "51655.46", "% Mortgage Net Interest Rate": "2105.73", "% Initial Combined Loan-to-Value Ratio": "0.00", "Credit Score": "0", "Remaining Term": "0" }, { "% Interest Rate": "7.75 - 7.99", "Count": 80, "$ Aggregate": "4094400.20", "% Aggregate": "2.91", "$ Average": "51180.00", "% Mortgage Net Interest Rate": "1907.28", "% Initial Combined Loan-to-Value Ratio": "0.00", "Credit Score": "0", "Remaining Term": "0" }, { "% Interest Rate": "8.00 - 8.24", "Count": 46, "$ Aggregate": "2147634.45", "% Aggregate": "1.53", "$ Average": "46687.71", "% Mortgage Net Interest Rate": "1142.95", "% Initial Combined Loan-to-Value Ratio": "0.00", "Credit Score": "0", "Remaining Term": "0" }, { "% Interest Rate": "8.25 - 8.49", "Count": 36, "$ Aggregate": "2290583.67", "% Aggregate": "1.63", "$ Average": "63627.32", "% Mortgage Net Interest Rate": "1514.32", "% Initial Combined Loan-to-Value Ratio": "0.00", "Credit Score": "0", "Remaining Term": "0" }, { "% Interest Rate": "8.50 - 8.74", "Count": 60, "$ Aggregate": "4573796.91", "% Aggregate": "3.25", "$ Average": "76229.95", "% Mortgage Net Interest Rate": "2528.61", "% Initial Combined Loan-to-Value Ratio": "0.00", "Credit Score": "0", "Remaining Term": "0" }, { "% Interest Rate": "8.75 - 8.99", "Count": 38, "$ Aggregate": "2492786.08", "% Aggregate": "1.77", "$ Average": "65599.63", "% Mortgage Net Interest Rate": "1810.42", "% Initial Combined Loan-to-Value Ratio": "0.00", "Credit Score": "0", "Remaining Term": "0" }, { "% Interest Rate": "9.00 - 9.24", "Count": 73, "$ Aggregate": "5471811.94", "% Aggregate": "3.89", "$ Average": "74956.33", "% Mortgage Net Interest Rate": "2003.17", "% Initial Combined Loan-to-Value Ratio": "0.00", "Credit Score": "0", "Remaining Term": "0" }, { "% Interest Rate": "9.25 - 9.49", "Count": 87, "$ Aggregate": "5598233.49", "% Aggregate": "3.98", "$ Average": "64347.51", "% Mortgage Net Interest Rate": "1865.05", "% Initial Combined Loan-to-Value Ratio": "0.00", "Credit Score": "0", "Remaining Term": "0" }, { "% Interest Rate": "9.50 - 9.74", "Count": 146, "$ Aggregate": "8453508.42", "% Aggregate": "6.01", "$ Average": "57900.74", "% Mortgage Net Interest Rate": "1615.82", "% Initial Combined Loan-to-Value Ratio": "0.00", "Credit Score": "0", "Remaining Term": "0" }, { "% Interest Rate": "9.75 - 9.99", "Count": 189, "$ Aggregate": "10258818.74", "% Aggregate": "7.29", "$ Average": "54279.46", "% Mortgage Net Interest Rate": "1642.43", "% Initial Combined Loan-to-Value Ratio": "0.00", "Credit Score": "0", "Remaining Term": "0" }, { "% Interest Rate": "10.00 - 10.24", "Count": 182, "$ Aggregate": "9799661.09", "% Aggregate": "6.97", "$ Average": "53844.29", "% Mortgage Net Interest Rate": "1352.59", "% Initial Combined Loan-to-Value Ratio": "0.00", "Credit Score": "0", "Remaining Term": "0" }, { "% Interest Rate": "10.25 - 10.49", "Count": 130, "$ Aggregate": "5981611.44", "% Aggregate": "4.25", "$ Average": "46012.40", "% Mortgage Net Interest Rate": "1111.72", "% Initial Combined Loan-to-Value Ratio": "0.00", "Credit Score": "0", "Remaining Term": "0" }, { "% Interest Rate": "10.50 - 10.74", "Count": 145, "$ Aggregate": "6553831.99", "% Aggregate": "4.66", "$ Average": "45198.84", "% Mortgage Net Interest Rate": "1003.01", "% Initial Combined Loan-to-Value Ratio": "0.00", "Credit Score": "0", "Remaining Term": "0" }, { "% Interest Rate": "10.75 - 10.99", "Count": 78, "$ Aggregate": "3176041.86", "% Aggregate": "2.26", "$ Average": "40718.49", "% Mortgage Net Interest Rate": "976.89", "% Initial Combined Loan-to-Value Ratio": "0.00", "Credit Score": "0", "Remaining Term": "0" }, { "% Interest Rate": "11.00 - 11.24", "Count": 34, "$ Aggregate": "1296529.78", "% Aggregate": "0.92", "$ Average": "38133.23", "% Mortgage Net Interest Rate": "725.43", "% Initial Combined Loan-to-Value Ratio": "0.00", "Credit Score": "0", "Remaining Term": "0" }, { "% Interest Rate": "11.25 - 11.49", "Count": 9, "$ Aggregate": "268162.20", "% Aggregate": "0.19", "$ Average": "29795.80", "% Mortgage Net Interest Rate": "537.71", "% Initial Combined Loan-to-Value Ratio": "0.00", "Credit Score": "0", "Remaining Term": "0" }, { "% Interest Rate": "11.50 +", "Count": 1, "$ Aggregate": "41063.82", "% Aggregate": "0.03", "$ Average": "41063.82", "% Mortgage Net Interest Rate": "695.55", "% Initial Combined Loan-to-Value Ratio": "0.00", "Credit Score": "0", "Remaining Term": "0" }, { "% Interest Rate": "Total:", "Count": "2439", "$ Aggregate": "140643181.78", "% Aggregate": "100.00", "$ Average": "57664.28", "% Mortgage Net Interest Rate": "1785.73", "% Initial Combined Loan-to-Value Ratio": "0.00", "Credit Score": "0", "Remaining Term": "0" }], "principal_balance": [{ "$ Principal Balance": "0 - 249999", "Count": 2407, "$ Aggregate": "129462650.83", "% Aggregate": "92.05", "$ Average": "53785.90", "% Mortgage Net Interest Rate": "1412.46", "% Initial Combined Loan-to-Value Ratio": "0.00", "Credit Score": "0", "Remaining Term": "0" }, { "$ Principal Balance": "250000 - 499999", "Count": 32, "$ Aggregate": "11180530.95", "% Aggregate": "7.95", "$ Average": "349391.59", "% Mortgage Net Interest Rate": "6107.87", "% Initial Combined Loan-to-Value Ratio": "0.00", "Credit Score": "0", "Remaining Term": "0" }, { "$ Principal Balance": "Total:", "Count": "2439", "$ Aggregate": "140643181.78", "% Aggregate": "100.00", "$ Average": "57664.28", "% Mortgage Net Interest Rate": "1785.73", "% Initial Combined Loan-to-Value Ratio": "0.00", "Credit Score": "0", "Remaining Term": "0" }] }
class ViewLoanDataTape extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DealType: localStorage.getItem('DealType'),
            OrgName: localStorage.getItem('OrgName'),
            pageTitle: "Deals",
            all_deals: JSON.parse(localStorage.getItem("all_deals")),
            channelname: localStorage.getItem('ChannelName'),
            user_id: localStorage.getItem('user_id'),
            emailid: localStorage.getItem('emailid'),
            Pass: localStorage.getItem("Pass"),
            schema: schema,
            LoanStratSchema: LoanStratSchema,
            TrusteeReportSchema: TrusteeReportSchema,
            LoanAnalysisSchema: LoanAnalysis,
            SelfServiceSchema: SelfService,
            LoanDetailsSchema: LoanDetails,
            years: generateYears(),
            months: months,
            monthsselfservice: monthsselfservice,
            groupby: groupby,

            formDataTrusteeReport: {
                dealId: null,
                month: null,
                year: null
            },
            formDataBDB: {
                dealId: null,
                groupby: null
            },

            formDataLoanStrat: {
                dealId: null,
                month: null,
                year: null,
                groupby: null
            },
            // formDataLoanAnalysis: {
            //     dealId: null,
            //     month: null,

            //     groupby: null
            // },
            // formDataSelfService: {
            //     dealId: null,

            //     groupby: null
            // },
            // formDataLoanDetails: {
            //     dealId: null,
            //     month: null,
            //     year: null,
            //     groupby: null
            // },
            dashboard_bdb: false,
            loan_strat_report: false,
            trustee_report: false,
            report_data: null,
            report_data_LoanTapeData: null,
            getReportLoader: false,

            loadingFormschema: false,
            loadingFormLoanStratSchema: false,
            loadingFormTrusteeReportSchema: false,
            switchType: "loan-strat-analytics",

            bdb_loader: false,
            report_loader: false,
            version_display: false,
            report_box: false,
            verison_displayed: false,
            total_deals: null,
            header_dealId: null,
            bdbUrl: null,
            test: null,
            formDataLoanStratmonth: null,
            button: 1,


        };
    }

    async componentDidMount() {
        if (localStorage.getItem("token") == "" || localStorage.getItem("token") == undefined) {
            window.location.assign("/")
        }
        // encryptFun()
        const DealId = this.props.match.params.DealId;
        const switchType = this.props.match.params.type;
        const DealMonth = this.props.match.params.DealMonth;
        const DealYear = this.props.match.params.DealYear;
        const groupby = this.props.match.params.groupBy;

        let formData = {
            dealId: DealId,
            month: DealMonth,
            year: DealYear,
            groupby: groupby,
        }
        let formDataBDB = {
            dealId: DealId,
            // month: DealMonth,
            // year: DealYear,
            groupby: groupby,
        }

        this.setState({
            groupby: this.state.groupby, formDataBDB: formDataBDB
            , switchType: switchType, header_dealId: DealId
        })
        this.switchType(switchType, formData)
        this.GetAllDeals();



    }

    async componentWillReceiveProps(nextProps) {
        let DealId = nextProps.match.params.DealId;
        let DealMonth = nextProps.match.params.DealMonth;
        let DealYear = nextProps.match.params.DealYear;
        let switchType = nextProps.match.params.type;
        let groupby = nextProps.match.params.groupBy;
        this.setState({
            report_data: null,
            dashboard_bdb: false,
            loan_strat_report: false,
            trustee_report: false,
            report_data_LoanTapeData: null,
            getReportLoader: false,
            loadingFormschema: false,

            loadingFormLoanStratSchema: false,
            loadingFormTrusteeReportSchema: false,
            bdb_loader: false,
            report_loader: false,
            version_display: false,
            report_box: false,
            verison_displayed: false,
            bdbUrl: null,
        })

        let formData = {
            dealId: DealId,
            month: DealMonth,
            year: DealYear,
            groupby: groupby,
        }
        let formDataBDB = {
            dealId: DealId,
            // month: DealMonth,
            // year: DealYear,
            groupby: groupby,
        }
        this.setState({ groupby: this.state.groupby, formDataBDB: formDataBDB, switchType: switchType, header_dealId: DealId })
        this.switchType(switchType, formData)
        this.GetAllDeals();
    }

    switchType = async (switchType, formData) => {

        if (switchType == "loan-strat-analytics") {

            this.dashboard_bdb();
            // this.setState({ formDataBDB: formData, header_dealId: formData.dealId });


            // if (formData.dealId != null && formData.dealId != undefined && formData.month != null && formData.month != undefined && formData.year != null && formData.year != undefined) {
            //     // this.BDBReport(formData)
            // }

        } else if (switchType == "monthly-trustee-report") {

            this.trustee_report();
            this.setState({ formDataTrusteeReport: formData, header_dealId: formData.dealId });

            if (formData.dealId != null && formData.dealId != undefined && formData.month != null && formData.month != undefined && formData.year != null && formData.year != undefined) {
                let value = {
                    formData
                }

                if (this.state.OrgName == "wsfstrustee") {
                    this.onSubmitTrustee(value)
                } else {

                    this.onSubmitInvestor(value)
                }
            }

        } else {

            this.loan_strat_report();
            this.setState({ formDataLoanStrat: formData, header_dealId: formData.dealId, formDataLoanStratmonth: formData.month });

            let value = {
                formData
            }

            if (formData.dealId != null && formData.dealId != undefined && formData.month != null && formData.month != undefined && formData.year != null && formData.year != undefined) {
                this.onSubmit(value)
            }

        }
    }

    GetAllDeals = async () => {
        let all_deals = this.state.all_deals;
        this.setState({ total_deals: all_deals.length })
    }

    dashboard_bdb = async () => {

        this.setState({
            dashboard_bdb: true,
            loan_strat_report: false,
            trustee_report: false,
        })
        this.LoanAnalysis();

        // let all_deals = this.state.all_deals;
        // let deal_name = []
        // if (all_deals.length !== 0) {
        //     all_deals.map((item) => {
        //         console.log("all_deals item", item.deal_id);
        //         deal_name.push(item.deal_id);
        //     })
        // }
        // console.log("GroupByLima", this.state.groupby)
        // let groupby_name = []
        // let groupby_value = []
        // if (this.state.groupby.length !== 0) {
        //     this.state.groupby.map((item) => {
        //         console.log("GroupByLima item", item);
        //         groupby_name.push(item.label);
        //         groupby_value.push(item.value);
        //     })
        // }

        // let oldSchema = this.state.schema;
        // console.log("oldstagedata", oldSchema);
        // oldSchema.properties.dealId.enum = deal_name;
        // oldSchema.properties.dealId.enumNames = deal_name;

        // oldSchema.properties.groupby.enum = groupby_value;
        // oldSchema.properties.groupby.enumNames = groupby_name;

        // const newSchema = Object.assign({}, oldSchema);
        // console.log("insight oldSchema", newSchema);
        // this.setState({ schema: newSchema, loadingFormschema: true });

    }

    LoanAnalysis = async () => {
        this.setState({
            LoanAnalysis: true,
            SelfService: false,
            LoanDetails: false,
        })

        this.setState({ bdbUrl: null, test: null, bdb_loader: true })

        let mailid = this.state.emailid;
        let password = this.state.Pass;


        // if (this.state.OrgName == "wsfstrustee") {
        //     mailid = this.state.emailid;
        //     password = "Inta!n@123";
        // }
        // else {
        //     if (this.state.DealType == "Saluda PAC1") {

        //         mailid = "shruthie.sridhar@intainft.com";
        //         password = "IntainAVB";

        //     }
        //     else if (this.state.DealType == "Saluda FIG1") {
        //         mailid = "shruthie.sridhar@intainft.com";
        //         password = "IntainAVB";
        //     }
        //     else if (this.state.DealType == "Saluda SEQ1") {
        //         mailid = "shruthie.sridhar@intainft.com";
        //         password = "IntainAVB";
        //     }
        //     else if (this.state.DealType == "AlphaFlow") {
        //         mailid = "somia.sakthiganeshan@intainft.com";
        //         password = "IntainAVB";
        //     }
        //     else if (this.state.DealType == "Saluda FIG2") {
        //         mailid = "manju.venkatachalam@intainft.com";
        //         password = "IntainAVB";
        //     }
        //     else if (this.state.DealType == "Saluda BC1") {
        //         mailid = "manju.venkatachalam@intainft.com";
        //         password = "IntainAVB";
        //     }
        //     else if (this.state.DealType == "Reigo") {
        //         mailid = "soundarya.ayyappan@intainft.com";
        //         password = "IntainAVB";
        //     }
        //     else if (this.state.DealType == "Dominion") {
        //         mailid = "monisha.subramanian@intainft.com";
        //         password = "IntainAVB";
        //     }
        //     else if (this.state.DealType == "Saluda WL1") {
        //         mailid = "manju.venkatachalam@intainft.com";
        //         password = "IntainAVB";
        //     }
        //     else if (this.state.DealType == "Spruce Hill") {
        //         mailid = "aishwarya.mohan@intainft.com";
        //         password = "IntainAVB1!";
        //     }
        //     else if (this.state.DealType == "Saluda RTL1") {
        //         mailid = "manju.venkatachalam@intainft.com";
        //         password = "IntainAVB";
        //     }
        //     else if (this.state.DealType == "Stoa 2021") {
        //         mailid = "pavithra.v@intainft.com";
        //         password = "IntainAVB1!";
        //     }
        //     else if (this.state.DealType == "Saluda MF1") {
        //         mailid = "manju.venkatachalam@intainft.com";
        //         password = "IntainAVB";
        //     }
        //     else if (this.state.DealType == "Palisades") {
        //         mailid = "srihari.sardena@intainft.com";
        //         password = "IntainAVB1!";
        //     }
        //     else if (this.state.DealType == "Tildene") {
        //         mailid = "harsha.tejwani@intainft.com";
        //         password = "IntainAVB1!";
        //     }
        //     else if (this.state.DealType == "Saluda RTL2") {
        //         mailid = "manju.venkatachalam@intainft.com";
        //         password = "IntainAVB";
        //     }
        // }

        const res = await axios.get(process.env.react_app_base_url + "backendapi_wsfs_bdb/api/v1/saluda/link?groupby=" + "dashboard" + '&mailid=' + mailid + '&password=' + password + '&month=' + "" + '&year=' + "" + '&DealName=' + "");
        let UrlBdbNew = 'https://analytics.intainabs.com/home/#/opendocument?data=' + res.data + '&choice=loan_analysis'
        this.setState({ bdbUrl: UrlBdbNew, test: "UrlBdbNew", bdb_loader: false })
        // this.setState({ formDataTrusteeReport: formData, header_dealId: formData.dealId });

        // let all_deals = this.state.all_deals;
        // let deal_name = []
        // if (all_deals.length !== 0) {
        //     all_deals.map((item) => {
        //         console.log("all_deals item", item.deal_id);
        //         deal_name.push(item.deal_id);
        //     })
        // }
        // console.log("GroupByLima", this.state.groupby)
        // let groupby_name = []
        // let groupby_value = []
        // if (this.state.groupby.length !== 0) {
        //     this.state.groupby.map((item) => {
        //         console.log("GroupByLima item", item);
        //         groupby_name.push(item.label);
        //         groupby_value.push(item.value);
        //     })
        // }

        // let oldSchema = this.state.LoanAnalysisSchema;
        // console.log("oldstagedata", oldSchema);
        // oldSchema.properties.dealId.enum = deal_name;
        // oldSchema.properties.dealId.enumNames = deal_name;

        // oldSchema.properties.groupby.enum = groupby_value;
        // oldSchema.properties.groupby.enumNames = groupby_name;

        // const newSchema = Object.assign({}, oldSchema);
        // console.log("insight oldSchema", newSchema);
        // this.setState({ schema: newSchema, loadingFormschema: true });
    }
    SelfService = async () => {
        this.setState({
            LoanAnalysis: false,
            SelfService: true,
            LoanDetails: false,
        })
        this.setState({ bdbUrl: null, test: null, bdb_loader: false })

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
        if (this.state.monthsselfservice.length !== 0) {
            this.state.monthsselfservice.map((item) => {
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
        console.log("GroupByLima", this.state.groupby)
        let groupby_name = []
        let groupby_value = []
        if (this.state.groupby.length !== 0) {
            this.state.groupby.map((item) => {
                console.log("GroupByLima item", item);
                groupby_name.push(item.label);
                groupby_value.push(item.value);
            })
        }

        let oldSchema = this.state.SelfServiceSchema;
        console.log("oldstagedata", oldSchema);
        oldSchema.properties.dealId.enum = deal_name;
        oldSchema.properties.dealId.enumNames = deal_name;

        oldSchema.properties.month.enum = month_value;
        oldSchema.properties.month.enumNames = month_name;

        oldSchema.properties.year.enum = year_value;
        oldSchema.properties.year.enumNames = year_name;

        oldSchema.properties.groupby.enum = groupby_value;
        oldSchema.properties.groupby.enumNames = groupby_name;

        const newSchema = Object.assign({}, oldSchema);
        console.log("insight oldSchema", newSchema);
        this.setState({ schema: newSchema, loadingFormschema: true });
        // this.setState({ bdb_loader: true })
        // console.log("getSummery", formData.dealId)
        // let poolidold = JSON.stringify({
        //     // 'Deal Name': {
        //     //     'type': 'in',
        //     //     'value': [formData.dealId.toLowerCase()],
        //     // },
        //     // 'Month': {
        //     //     'type': 'in',
        //     //     'value': value.month,
        //     // },
        //     // 'Year': {
        //     //     'type': 'in',
        //     //     'value': value.year,
        //     // },
        //     // 'ChannelName': {
        //     //     'type': 'in',
        //     //     'value': [this.state.channelname],
        //     // },
        // });
        // let mailid="manirathinavelu.m@bdb.ai";
        // let password= "admin@123";
        // try {
        //     const res = await axios.get(process.env.react_app_base_url + "backendapi_wsfs_bdb/api/v1/saluda/link?groupby=" + "selfservice" + '&mailid='+mailid+'&password='+password );
        //     let UrlBdbNew = 'https://analytics.intainabs.com/home/#/opendocument?data=' + res.data + '&customGlobalFilter=' + encodeURIComponent(poolidold);
        //     console.log("+++++",UrlBdbNew)
        //     this.setState({ bdbUrl: UrlBdbNew, bdb_loader: false })

        // } catch (error) {
        //     alert("Failed");
        //     console.log("getLoans API error", error);
        // }
    }

    selfservicesubmit = async () => {
        let poolidold = JSON.stringify({
            // 'Deal Name': {
            //     'type': 'in',
            //     'value': [formData.dealId.toLowerCase()],
            // },
            // 'Month': {
            //     'type': 'in',
            //     'value': value.month,
            // },
            // 'Year': {
            //     'type': 'in',
            //     'value': value.year,
            // },
            // 'ChannelName': {
            //     'type': 'in',
            //     'value': [this.state.channelname],
            // },
        });
        let mailid = "manirathinavelu.m@bdb.ai";
        let password = "admin@123";
        try {
            const res = await axios.get(process.env.react_app_base_url + "backendapi_wsfs_bdb/api/v1/saluda/link?groupby=" + "selfservice" + '&mailid=' + mailid + '&password=' + password);
            let UrlBdbNew = 'https://analytics.intainabs.com/home/#/opendocument?data=' + res.data + '&customGlobalFilter=' + encodeURIComponent(poolidold);
            console.log("+++++", UrlBdbNew)
            this.setState({ bdbUrl: UrlBdbNew, bdb_loader: false })

        } catch (error) {
            alert("Failed");
            console.log("getLoans API error", error);
        }
    }
    LoanDetails = async () => {
        this.setState({
            LoanAnalysis: false,
            SelfService: false,
            LoanDetails: true,
        })

        this.setState({ bdbUrl: null, bdb_loader: true })
        const res = await axios.get(process.env.react_app_base_url + "backendapi_wsfs_bdb/api/v1/saluda/link");
        let UrlBdbNew = 'https://bdb.intainavb.com/home/#/opendocument?data=' + res.data + '&choice=loan_details'
        this.setState({ bdbUrl: UrlBdbNew, bdb_loader: false })
        console.log(UrlBdbNew)
        //    let all_deals = this.state.all_deals;
        //    let deal_name = []
        //    if (all_deals.length !== 0) {
        //        all_deals.map((item) => {
        //            console.log("all_deals item", item.deal_id);
        //            deal_name.push(item.deal_id);
        //        })
        //    }

        //    let month_name = []
        //    let month_value = []
        //    if (this.state.months.length !== 0) {
        //        this.state.months.map((item) => {
        //            console.log("item", item);
        //            month_name.push(item.label);
        //            month_value.push(item.value);
        //        })
        //    }



        //    console.log("GroupByLima", this.state.groupby)
        //    let groupby_name = []
        //    let groupby_value = []
        //    if (this.state.groupby.length !== 0) {
        //        this.state.groupby.map((item) => {
        //            console.log("GroupByLima item", item);
        //            groupby_name.push(item.label);
        //            groupby_value.push(item.value);
        //        })
        //    }

        //    let oldSchema = this.state.LoanDetailsSchema;
        //    console.log("oldstagedata", oldSchema);
        //    oldSchema.properties.dealId.enum = deal_name;
        //    oldSchema.properties.dealId.enumNames = deal_name;

        //    oldSchema.properties.month.enum = month_value;
        //    oldSchema.properties.month.enumNames = month_name;

        //    oldSchema.properties.groupby.enum = groupby_value;
        //    oldSchema.properties.groupby.enumNames = groupby_name;

        //    const newSchema = Object.assign({}, oldSchema);
        //    console.log("insight oldSchema", newSchema);
        //    this.setState({ schema: newSchema, loadingFormschema: true });
    }

    //bdbend
    trustee_report = async () => {
        this.setState({
            dashboard_bdb: false,
            loan_strat_report: false,
            trustee_report: true,
        })
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
        let oldSchema = this.state.TrusteeReportSchema;
        console.log("TrusteeReportSchema", oldSchema);
        oldSchema.properties.dealId.enum = deal_name;
        oldSchema.properties.dealId.enumNames = deal_name;

        oldSchema.properties.month.enum = month_value;
        oldSchema.properties.month.enumNames = month_name;

        oldSchema.properties.year.enum = year_value;
        oldSchema.properties.year.enumNames = year_name;

        const newSchema = Object.assign({}, oldSchema);
        console.log("TrusteeReportSchema oldSchema", newSchema);
        // this.setState({ schema: newSchema});
        this.setState({ TrusteeReportSchema: newSchema, loadingFormTrusteeReportSchema: true });

    }

    loan_strat_report = async () => {
        this.setState({
            dashboard_bdb: false,
            loan_strat_report: true,
            trustee_report: false,
        })

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

        console.log("GroupByLima", this.state.groupby)
        let groupby_name = []
        let groupby_value = []
        if (this.state.groupby.length !== 0) {
            this.state.groupby.map((item) => {
                console.log("GroupByLima item", item);
                groupby_name.push(item.label);
                groupby_value.push(item.value);
            })
        }

        // console.log("currency_list_static", currency_list_static);
        let oldSchema = this.state.LoanStratSchema;
        console.log("loan_strat_report", oldSchema);
        oldSchema.properties.dealId.enum = deal_name;
        oldSchema.properties.dealId.enumNames = deal_name;

        oldSchema.properties.month.enum = month_value;
        oldSchema.properties.month.enumNames = month_name;

        oldSchema.properties.year.enum = year_value;
        oldSchema.properties.year.enumNames = year_name;

        // oldSchema.properties.groupby.enum = groupby_value;
        // oldSchema.properties.groupby.enumNames = groupby_name;

        const newSchema = Object.assign({}, oldSchema);
        console.log("loan_strat_report oldSchema", newSchema);
        // this.setState({ schema: newSchema});
        this.setState({ LoanStratSchema: newSchema, loadingFormLoanStratSchema: true });

    }


    GenerateBDBReport = async (value) => {
        console.log("GenerateBDBReport", value.formData)
        // let formData=value.formData
        // this.setState({ 
        //     formDataBDB: value.formData,
        //      header_dealId: value.formData.dealId 
        //     })
        this.BDBReport(value.formData);

    }

    BDBReport = async (formData) => {
        // let formData=this.state.formDataBDB
        // console.log(formData)


        this.setState({ bdb_loader: true, formDataSelfService: formData })
        console.log("getSummery", formData.dealId)
        // let poolidold = JSON.stringify({
        //     'DealId': {
        //         'type': 'in',
        //         'value': [formData.dealId.toLowerCase()],
        //     },



        // });



        try {
            //oldone
            let res = "";

            if (this.state.OrgName == "wsfstrustee") {
                let poolidold = JSON.stringify({
                    'Deal Name': {
                        'type': 'in',
                        'value': [formData.dealId.replace(/[^a-zA-Z0-9]+/g, "").toLowerCase()],
                    },
                    'Month': {
                        'type': 'in',
                        'value': [formData.month],
                    },
                    'Year': {
                        'type': 'in',
                        'value': [formData.year],
                    },



                });
                console.log("poolidold", poolidold)
                let mailid = this.state.emailid;
                let password = this.state.Pass;
                const res = await axios.get(process.env.react_app_base_url + "backendapi_wsfs_bdb/api/v1/trustee/link?groupby=" + formData.groupby + '&mailid=' + mailid + '&password=' + password + '&month=' + formData.month + '&year=' + formData.year + '&DealName=' + formData.dealId);
                if (res.status == 204) {
                    this.setState({ bdbUrl: "UrlBdbNew", test: null, bdb_loader: false })

                }
                else {
                    let UrlBdbNew = 'https://analytics.intainabs.com/home/#/opendocument?data=' + res.data + '&customGlobalFilter=' + encodeURIComponent(poolidold);
                    this.setState({ bdbUrl: UrlBdbNew, test: "UrlBdbNew", bdb_loader: false })
                }
                // this.setState({ bdbUrl: UrlBdbNew, bdb_loader: false })
            }

            else if (this.state.DealType == "LimaOne") {
                let poolidold = JSON.stringify({
                    'DealId': {
                        'type': 'in',
                        'value': [formData.dealId.toLowerCase()],
                    },



                });
                res = await axios.get(process.env.react_app_base_url + "backendapilimabdb/api/v1/lima/link?groupby=" + formData.groupby);
                let UrlBdbNew = 'https://analytics.intainabs.com/home/#/opendocument?data=' + res.data + '&customGlobalFilter=' + encodeURIComponent(poolidold);
                this.setState({ bdbUrl: UrlBdbNew, bdb_loader: false })

            } else if (this.state.DealType == "Bawag") {
                let poolidold = JSON.stringify({
                    'DealID': {
                        'type': 'in',
                        'value': [formData.dealId.toLowerCase()],
                    },



                });
                res = await axios.get(process.env.react_app_base_url + "backendapibawagbdb/api/v1/bawag/link?groupby=" + formData.groupby);
                let UrlBdbNew = 'https://analytics.intainabs.com/home/#/opendocument?data=' + res.data + '&customGlobalFilter=' + encodeURIComponent(poolidold);
                this.setState({ bdbUrl: UrlBdbNew, bdb_loader: false })

            } else if (this.state.DealType == "Saluda PAC1") {
                let poolidold = JSON.stringify({
                    'Deal Name': {
                        'type': 'in',
                        'value': [formData.dealId.replace(/[^a-zA-Z0-9]+/g, "").toLowerCase()],
                    },
                    'Month': {
                        'type': 'in',
                        'value': [formData.month],
                    },
                    'Year': {
                        'type': 'in',
                        'value': [formData.year],
                    },



                });
                console.log("POOLID", poolidold)
                let mailid = this.state.emailid;
                let password = this.state.Pass;
                const res = await axios.get(process.env.react_app_base_url + "backendapi_wsfs_bdb/api/v1/saluda/link?groupby=" + formData.groupby + '&mailid=' + mailid + '&password=' + password + '&month=' + formData.month + '&year=' + formData.year + '&DealName=' + formData.dealId);
                if (res.status == 204) {
                    this.setState({ bdbUrl: "UrlBdbNew", test: null, bdb_loader: false })

                }
                else {
                    let UrlBdbNew = 'https://analytics.intainabs.com/home/#/opendocument?data=' + res.data + '&customGlobalFilter=' + encodeURIComponent(poolidold);
                    this.setState({ bdbUrl: UrlBdbNew, test: "UrlBdbNew", bdb_loader: false })
                }
            } else if (this.state.DealType == "Saluda FIG1") {
                let poolidold = JSON.stringify({
                    'Deal Name': {
                        'type': 'in',
                        'value': [formData.dealId.replace(/[^a-zA-Z0-9]+/g, "").toLowerCase()],
                    },
                    'Month': {
                        'type': 'in',
                        'value': [formData.month],
                    },
                    'Year': {
                        'type': 'in',
                        'value': [formData.year],
                    },



                });
                let mailid = this.state.emailid;
                let password = this.state.Pass;
                const res = await axios.get(process.env.react_app_base_url + "backendapi_wsfs_bdb/api/v1/saluda2/link?groupby=" + formData.groupby + '&mailid=' + mailid + '&password=' + password + '&month=' + formData.month + '&year=' + formData.year + '&DealName=' + formData.dealId);
                if (res.status == 204) {
                    this.setState({ bdbUrl: "UrlBdbNew", test: null, bdb_loader: false })

                }
                else {
                    let UrlBdbNew = 'https://analytics.intainabs.com/home/#/opendocument?data=' + res.data + '&customGlobalFilter=' + encodeURIComponent(poolidold);
                    this.setState({ bdbUrl: UrlBdbNew, test: "UrlBdbNew", bdb_loader: false })
                }

            } else if (this.state.DealType == "Saluda SEQ1") {
                let poolidold = JSON.stringify({
                    'Deal Name': {
                        'type': 'in',
                        'value': [formData.dealId.replace(/[^a-zA-Z0-9]+/g, "").toLowerCase()],
                    },
                    'Month': {
                        'type': 'in',
                        'value': [formData.month],
                    },
                    'Year': {
                        'type': 'in',
                        'value': [formData.year],
                    },



                });
                let mailid = this.state.emailid;
                let password = this.state.Pass;
                console.log("password", password)
                const res = await axios.get(process.env.react_app_base_url + "backendapi_wsfs_bdb/api/v1/saludaseq1/link?groupby=" + formData.groupby + '&mailid=' + mailid + '&password=' + password + '&month=' + formData.month + '&year=' + formData.year + '&DealName=' + formData.dealId);
                if (res.status == 204) {
                    this.setState({ bdbUrl: "UrlBdbNew", test: null, bdb_loader: false })

                }
                else {
                    let UrlBdbNew = 'https://analytics.intainabs.com/home/#/opendocument?data=' + res.data + '&customGlobalFilter=' + encodeURIComponent(poolidold);
                    this.setState({ bdbUrl: UrlBdbNew, test: "UrlBdbNew", bdb_loader: false })
                }

            }
            else if (this.state.DealType == "AlphaFlow") {
                // let poolidold = JSON.stringify({
                //     'DealID': {
                //         'type': 'in',
                //         'value': [formData.dealId.toLowerCase()],
                //     },



                // });
                // res = await axios.get(process.env.react_app_base_url + "backendapialphaflowbdb/api/v1/alphaflow/link?groupby=" + formData.groupby);
                // let UrlBdbNew = 'https://analytics.intainabs.com/home/#/opendocument?data=' + res.data + '&customGlobalFilter=' + encodeURIComponent(poolidold);
                // this.setState({ bdbUrl: UrlBdbNew, bdb_loader: false })
                let poolidold = JSON.stringify({
                    'Deal Name': {
                        'type': 'in',
                        'value': [formData.dealId.replace(/[^a-zA-Z0-9]+/g, "").toLowerCase()],
                    },
                    'Month': {
                        'type': 'in',
                        'value': [formData.month],
                    },
                    'Year': {
                        'type': 'in',
                        'value': [formData.year],
                    },
                    // 'ChannelName': {
                    //     'type': 'in',
                    //     'value': [this.state.channelname],
                    // },
                });
                let mailid = this.state.emailid;
                let password = this.state.Pass;
                try {
                    const res = await axios.get(process.env.react_app_base_url + "backendapi_wsfs_bdb/api/v1/alpha/link?groupby=" + formData.groupby + '&mailid=' + mailid + '&password=' + password + '&month=' + formData.month + '&year=' + formData.year + '&DealName=' + formData.dealId);
                    if (res.status == 204) {
                        this.setState({ bdbUrl: "UrlBdbNew", test: null, bdb_loader: false })

                    }
                    else {
                        let UrlBdbNew = 'https://analytics.intainabs.com/home/#/opendocument?data=' + res.data + '&customGlobalFilter=' + encodeURIComponent(poolidold);
                        this.setState({ bdbUrl: UrlBdbNew, test: "UrlBdbNew", bdb_loader: false })
                    }

                } catch (error) {
                    alert("Failed");
                    console.log("getLoans API error", error);
                }

            }
            else if (this.state.DealType == "Saluda FIG2") {
                let poolidold = JSON.stringify({
                    'Deal Name': {
                        'type': 'in',
                        'value': [formData.dealId.replace(/[^a-zA-Z0-9]+/g, "").toLowerCase()],
                    },
                    'Month': {
                        'type': 'in',
                        'value': [formData.month],
                    },
                    'Year': {
                        'type': 'in',
                        'value': [formData.year],
                    },



                });
                let mailid = this.state.emailid;
                let password = this.state.Pass;
                const res = await axios.get(process.env.react_app_base_url + "backendapi_wsfs_bdb/api/v1/saludafig2/link?groupby=" + formData.groupby + '&mailid=' + mailid + '&password=' + password + '&month=' + formData.month + '&year=' + formData.year + '&DealName=' + formData.dealId);
                if (res.status == 204) {
                    this.setState({ bdbUrl: "UrlBdbNew", test: null, bdb_loader: false })

                }
                else {
                    let UrlBdbNew = 'https://analytics.intainabs.com/home/#/opendocument?data=' + res.data + '&customGlobalFilter=' + encodeURIComponent(poolidold);
                    this.setState({ bdbUrl: UrlBdbNew, test: "UrlBdbNew", bdb_loader: false })
                }

            }
            else if (this.state.DealType == "Saluda BC1") {
                let poolidold = JSON.stringify({
                    'Deal Name': {
                        'type': 'in',
                        'value': [formData.dealId.replace(/[^a-zA-Z0-9]+/g, "").toLowerCase()],
                    },
                    'Month': {
                        'type': 'in',
                        'value': [formData.month],
                    },
                    'Year': {
                        'type': 'in',
                        'value': [formData.year],
                    },



                });
                let mailid = this.state.emailid;
                let password = this.state.Pass;
                const res = await axios.get(process.env.react_app_base_url + "backendapi_wsfs_bdb/api/v1/bc1/link?groupby=" + formData.groupby + '&mailid=' + mailid + '&password=' + password + '&month=' + formData.month + '&year=' + formData.year + '&DealName=' + formData.dealId);
                if (res.status == 204) {
                    this.setState({ bdbUrl: "UrlBdbNew", test: null, bdb_loader: false })

                }
                else {
                    let UrlBdbNew = 'https://analytics.intainabs.com/home/#/opendocument?data=' + res.data + '&customGlobalFilter=' + encodeURIComponent(poolidold);
                    this.setState({ bdbUrl: UrlBdbNew, test: "UrlBdbNew", bdb_loader: false })
                }

            }
            else if (this.state.DealType == "Reigo") {
                let poolidold = JSON.stringify({
                    'Deal Name': {
                        'type': 'in',
                        'value': [formData.dealId.replace(/[^a-zA-Z0-9]+/g, "").toLowerCase()],
                    },
                    'Month': {
                        'type': 'in',
                        'value': [formData.month],
                    },
                    'Year': {
                        'type': 'in',
                        'value': [formData.year],
                    },



                });
                let mailid = this.state.emailid;
                let password = this.state.Pass;
                const res = await axios.get(process.env.react_app_base_url + "backendapi_wsfs_bdb/api/v1/reigo/link?groupby=" + formData.groupby + '&mailid=' + mailid + '&password=' + password + '&month=' + formData.month + '&year=' + formData.year + '&DealName=' + formData.dealId);
                if (res.status == 204) {
                    this.setState({ bdbUrl: "UrlBdbNew", test: null, bdb_loader: false })

                }
                else {
                    let UrlBdbNew = 'https://analytics.intainabs.com/home/#/opendocument?data=' + res.data + '&customGlobalFilter=' + encodeURIComponent(poolidold);
                    this.setState({ bdbUrl: UrlBdbNew, test: "UrlBdbNew", bdb_loader: false })
                }

            }
            else if (this.state.DealType == "Dominion") {
                let poolidold = JSON.stringify({
                    'Deal Name': {
                        'type': 'in',
                        'value': [formData.dealId.replace(/[^a-zA-Z0-9]+/g, "").toLowerCase()],
                    },
                    'Month': {
                        'type': 'in',
                        'value': [formData.month],
                    },
                    'Year': {
                        'type': 'in',
                        'value': [formData.year],
                    },



                });
                let mailid = this.state.emailid;
                let password = this.state.Pass;
                const res = await axios.get(process.env.react_app_base_url + "backendapi_wsfs_bdb/api/v1/dominion/link?groupby=" + formData.groupby + '&mailid=' + mailid + '&password=' + password + '&month=' + formData.month + '&year=' + formData.year + '&DealName=' + formData.dealId);
                if (res.status == 204) {
                    this.setState({ bdbUrl: "UrlBdbNew", test: null, bdb_loader: false })

                }
                else {
                    let UrlBdbNew = 'https://analytics.intainabs.com/home/#/opendocument?data=' + res.data + '&customGlobalFilter=' + encodeURIComponent(poolidold);
                    this.setState({ bdbUrl: UrlBdbNew, test: "UrlBdbNew", bdb_loader: false })
                }

            }
            else if (this.state.DealType == "Saluda WL1") {
                let poolidold = JSON.stringify({
                    'Deal Name': {
                        'type': 'in',
                        'value': [formData.dealId.replace(/[^a-zA-Z0-9]+/g, "").toLowerCase()],
                    },
                    'Month': {
                        'type': 'in',
                        'value': [formData.month],
                    },
                    'Year': {
                        'type': 'in',
                        'value': [formData.year],
                    },



                });
                let mailid = this.state.emailid;
                let password = this.state.Pass;
                const res = await axios.get(process.env.react_app_base_url + "backendapi_wsfs_bdb/api/v1/saludawl1/link?groupby=" + formData.groupby + '&mailid=' + mailid + '&password=' + password + '&month=' + formData.month + '&year=' + formData.year + '&DealName=' + formData.dealId);
                if (res.status == 204) {
                    this.setState({ bdbUrl: "UrlBdbNew", test: null, bdb_loader: false })

                }
                else {
                    let UrlBdbNew = 'https://analytics.intainabs.com/home/#/opendocument?data=' + res.data + '&customGlobalFilter=' + encodeURIComponent(poolidold);
                    this.setState({ bdbUrl: UrlBdbNew, test: "UrlBdbNew", bdb_loader: false })
                }

            }
            else if (this.state.DealType == "Spruce Hill") {
                let poolidold = JSON.stringify({
                    'Deal Name': {
                        'type': 'in',
                        'value': [formData.dealId.replace(/[^a-zA-Z0-9]+/g, "").toLowerCase()],
                    },
                    'Month': {
                        'type': 'in',
                        'value': [formData.month],
                    },
                    'Year': {
                        'type': 'in',
                        'value': [formData.year],
                    },



                });
                let mailid = this.state.emailid;
                let password = this.state.Pass;
                const res = await axios.get(process.env.react_app_base_url + "backendapi_wsfs_bdb/api/v1/sprucehill/link?groupby=" + formData.groupby + '&mailid=' + mailid + '&password=' + password + '&month=' + formData.month + '&year=' + formData.year + '&DealName=' + formData.dealId);
                if (res.status == 204) {
                    this.setState({ bdbUrl: "UrlBdbNew", test: null, bdb_loader: false })

                }
                else {
                    let UrlBdbNew = 'https://analytics.intainabs.com/home/#/opendocument?data=' + res.data + '&customGlobalFilter=' + encodeURIComponent(poolidold);
                    this.setState({ bdbUrl: UrlBdbNew, test: "UrlBdbNew", bdb_loader: false })
                }
            }
            else if (this.state.DealType == "Saluda RTL1") {
                let poolidold = JSON.stringify({
                    'Deal Name': {
                        'type': 'in',
                        'value': [formData.dealId.replace(/[^a-zA-Z0-9]+/g, "").toLowerCase()],
                    },
                    'Month': {
                        'type': 'in',
                        'value': [formData.month],
                    },
                    'Year': {
                        'type': 'in',
                        'value': [formData.year],
                    },



                });
                let mailid = this.state.emailid;
                let password = this.state.Pass;
                console.log("password", password)
                const res = await axios.get(process.env.react_app_base_url + "backendapi_wsfs_bdb/api/v1/saludartl1/link?groupby=" + formData.groupby + '&mailid=' + mailid + '&password=' + password + '&month=' + formData.month + '&year=' + formData.year + '&DealName=' + formData.dealId);
                if (res.status == 204) {
                    this.setState({ bdbUrl: "UrlBdbNew", test: null, bdb_loader: false })

                }
                else {
                    let UrlBdbNew = 'https://analytics.intainabs.com/home/#/opendocument?data=' + res.data + '&customGlobalFilter=' + encodeURIComponent(poolidold);
                    this.setState({ bdbUrl: UrlBdbNew, test: "UrlBdbNew", bdb_loader: false })
                }
            }
            else if (this.state.DealType == "Stoa 2021") {
                let poolidold = JSON.stringify({
                    'Deal Name': {
                        'type': 'in',
                        'value': [formData.dealId.replace(/[^a-zA-Z0-9]+/g, "").toLowerCase()],
                    },
                    'Month': {
                        'type': 'in',
                        'value': [formData.month],
                    },
                    'Year': {
                        'type': 'in',
                        'value': [formData.year],
                    },



                });
                let mailid = this.state.emailid;
                let password = this.state.Pass;
                const res = await axios.get(process.env.react_app_base_url + "backendapi_wsfs_bdb/api/v1/stoa/link?groupby=" + formData.groupby + '&mailid=' + mailid + '&password=' + password + '&month=' + formData.month + '&year=' + formData.year + '&DealName=' + formData.dealId);
                if (res.status == 204) {
                    this.setState({ bdbUrl: "UrlBdbNew", test: null, bdb_loader: false })

                }
                else {
                    let UrlBdbNew = 'https://analytics.intainabs.com/home/#/opendocument?data=' + res.data + '&customGlobalFilter=' + encodeURIComponent(poolidold);
                    this.setState({ bdbUrl: UrlBdbNew, test: "UrlBdbNew", bdb_loader: false })
                }
            }

            else if (this.state.DealType == "Tildene") {
                let poolidold = JSON.stringify({
                    'Deal Name': {
                        'type': 'in',
                        'value': [formData.dealId.replace(/[^a-zA-Z0-9]+/g, "").toLowerCase()],
                    },
                    'Month': {
                        'type': 'in',
                        'value': [formData.month],
                    },
                    'Year': {
                        'type': 'in',
                        'value': [formData.year],
                    },



                });
                let mailid = this.state.emailid;
                let password = this.state.Pass;
                const res = await axios.get(process.env.react_app_base_url + "backendapi_wsfs_bdb/api/v1/tildene/link?groupby=" + formData.groupby + '&mailid=' + mailid + '&password=' + password + '&month=' + formData.month + '&year=' + formData.year + '&DealName=' + formData.dealId);
                if (res.status == 204) {
                    this.setState({ bdbUrl: "UrlBdbNew", test: null, bdb_loader: false })

                }
                else {
                    let UrlBdbNew = 'https://analytics.intainabs.com/home/#/opendocument?data=' + res.data + '&customGlobalFilter=' + encodeURIComponent(poolidold);
                    this.setState({ bdbUrl: UrlBdbNew, test: "UrlBdbNew", bdb_loader: false })
                }
            }
            else if (this.state.DealType == "Saluda MF1") {
                let poolidold = JSON.stringify({
                    'Deal Name': {
                        'type': 'in',
                        'value': [formData.dealId.replace(/[^a-zA-Z0-9]+/g, "").toLowerCase()],
                    },
                    'Month': {
                        'type': 'in',
                        'value': [formData.month],
                    },
                    'Year': {
                        'type': 'in',
                        'value': [formData.year],
                    },



                });
                let mailid = this.state.emailid;
                let password = this.state.Pass;
                const res = await axios.get(process.env.react_app_base_url + "backendapi_wsfs_bdb/api/v1/saludamf1/link?groupby=" + formData.groupby + '&mailid=' + mailid + '&password=' + password + '&month=' + formData.month + '&year=' + formData.year + '&DealName=' + formData.dealId);
                if (res.status == 204) {
                    this.setState({ bdbUrl: "UrlBdbNew", test: null, bdb_loader: false })

                }
                else {
                    let UrlBdbNew = 'https://analytics.intainabs.com/home/#/opendocument?data=' + res.data + '&customGlobalFilter=' + encodeURIComponent(poolidold);
                    this.setState({ bdbUrl: UrlBdbNew, test: "UrlBdbNew", bdb_loader: false })
                }
            }
            else if (this.state.DealType == "Palisades") {
                let poolidold = JSON.stringify({
                    'Deal Name': {
                        'type': 'in',
                        'value': [formData.dealId.replace(/[^a-zA-Z0-9]+/g, "").toLowerCase()],
                    },
                    'Month': {
                        'type': 'in',
                        'value': [formData.month],
                    },
                    'Year': {
                        'type': 'in',
                        'value': [formData.year],
                    },



                });
                let mailid = this.state.emailid;
                let password = this.state.Pass;
                const res = await axios.get(process.env.react_app_base_url + "backendapi_wsfs_bdb/api/v1/palisades/link?groupby=" + formData.groupby + '&mailid=' + mailid + '&password=' + password + '&month=' + formData.month + '&year=' + formData.year + '&DealName=' + formData.dealId);
                if (res.status == 204) {
                    this.setState({ bdbUrl: "UrlBdbNew", test: null, bdb_loader: false })

                }
                else {
                    let UrlBdbNew = 'https://analytics.intainabs.com/home/#/opendocument?data=' + res.data + '&customGlobalFilter=' + encodeURIComponent(poolidold);
                    this.setState({ bdbUrl: UrlBdbNew, test: "UrlBdbNew", bdb_loader: false })
                }
            }
            else if (this.state.DealType == "Saluda RTL2") {
                let poolidold = JSON.stringify({
                    'Deal Name': {
                        'type': 'in',
                        'value': [formData.dealId.replace(/[^a-zA-Z0-9]+/g, "").toLowerCase()],
                    },
                    'Month': {
                        'type': 'in',
                        'value': [formData.month],
                    },
                    'Year': {
                        'type': 'in',
                        'value': [formData.year],
                    },



                });
                let mailid = this.state.emailid;
                let password = this.state.Pass;
                const res = await axios.get(process.env.react_app_base_url + "backendapi_wsfs_bdb/api/v1/saludartl2/link?groupby=" + formData.groupby + '&mailid=' + mailid + '&password=' + password + '&month=' + formData.month + '&year=' + formData.year + '&DealName=' + formData.dealId);
                if (res.status == 204) {
                    this.setState({ bdbUrl: "UrlBdbNew", test: null, bdb_loader: false })

                }
                else {
                    let UrlBdbNew = 'https://analytics.intainabs.com/home/#/opendocument?data=' + res.data + '&customGlobalFilter=' + encodeURIComponent(poolidold);
                    this.setState({ bdbUrl: UrlBdbNew, test: "UrlBdbNew", bdb_loader: false })
                }
            }

            else if (this.state.DealType == "MFA") {
                let poolidold = JSON.stringify({
                    'Deal Name': {
                        'type': 'in',
                        'value': [formData.dealId.replace(/[^a-zA-Z0-9]+/g, "").toLowerCase()],
                    },
                    'Month': {
                        'type': 'in',
                        'value': [formData.month],
                    },
                    'Year': {
                        'type': 'in',
                        'value': [formData.year],
                    },



                });
                let mailid = this.state.emailid;
                let password = this.state.Pass;
                const res = await axios.get(process.env.react_app_base_url + "backendapi_wsfs_bdb/api/v1/mfa/link?groupby=" + formData.groupby + '&mailid=' + mailid + '&password=' + password + '&month=' + formData.month + '&year=' + formData.year + '&DealName=' + formData.dealId);
                if (res.status == 204) {
                    this.setState({ bdbUrl: "UrlBdbNew", test: null, bdb_loader: false })

                }
                else {
                    let UrlBdbNew = 'https://analytics.intainabs.com/home/#/opendocument?data=' + res.data + '&customGlobalFilter=' + encodeURIComponent(poolidold);
                    this.setState({ bdbUrl: UrlBdbNew, test: "UrlBdbNew", bdb_loader: false })
                }
            }
            else if (this.state.DealType == "Saluda PRE1") {
                let poolidold = JSON.stringify({
                    'Deal Name': {
                        'type': 'in',
                        'value': [formData.dealId.replace(/[^a-zA-Z0-9]+/g, "").toLowerCase()],
                    },
                    'Month': {
                        'type': 'in',
                        'value': [formData.month],
                    },
                    'Year': {
                        'type': 'in',
                        'value': [formData.year],
                    },



                });
                let mailid = this.state.emailid;
                let password = this.state.Pass;
                console.log("password", password)
                const res = await axios.get(process.env.react_app_base_url + "backendapi_wsfs_bdb/api/v1/saludapre/link?groupby=" + formData.groupby + '&mailid=' + mailid + '&password=' + password + '&month=' + formData.month + '&year=' + formData.year + '&DealName=' + formData.dealId);
                if (res.status == 204) {
                    this.setState({ bdbUrl: "UrlBdbNew", test: null, bdb_loader: false })

                }
                else {
                    let UrlBdbNew = 'https://analytics.intainabs.com/home/#/opendocument?data=' + res.data + '&customGlobalFilter=' + encodeURIComponent(poolidold);
                    this.setState({ bdbUrl: UrlBdbNew, test: "UrlBdbNew", bdb_loader: false })
                }
            }
            else if (this.state.DealType == "Setpoint") {
                let poolidold = JSON.stringify({
                    'Deal Name': {
                        'type': 'in',
                        'value': [formData.dealId.replace(/[^a-zA-Z0-9]+/g, "").toLowerCase()],
                    },
                    'Month': {
                        'type': 'in',
                        'value': [formData.month],
                    },
                    'Year': {
                        'type': 'in',
                        'value': [formData.year],
                    },



                });
                let mailid = this.state.emailid;
                let password = this.state.Pass;
                console.log("password", password)
                const res = await axios.get(process.env.react_app_base_url + "backendapi_wsfs_bdb/api/v1/setpoint/link?groupby=" + formData.groupby + '&mailid=' + mailid + '&password=' + password + '&month=' + formData.month + '&year=' + formData.year + '&DealName=' + formData.dealId);
                if (res.status == 204) {
                    this.setState({ bdbUrl: "UrlBdbNew", test: null, bdb_loader: false })

                }
                else {
                    let UrlBdbNew = 'https://analytics.intainabs.com/home/#/opendocument?data=' + res.data + '&customGlobalFilter=' + encodeURIComponent(poolidold);
                    this.setState({ bdbUrl: UrlBdbNew, test: "UrlBdbNew", bdb_loader: false })
                }
            }
            // dashboard design
            // const res = await axios.get("https://saludabdb-dashboard.production.trurep.emulya.com/api/v1/saluda/link?groupby=" + formData.groupby);
            // let UrlBdbNew = 'https://bdb.intainavb.com/home/#/opendocument?data=' + res.data + '&customGlobalFilter=' + encodeURIComponent(poolidold);
            // this.setState({ bdbUrl: UrlBdbNew, bdb_loader: false })

        } catch (error) {
            alert("Failed");
            console.log("getLoans API error", error);
        }
    }

    version_history = () => {
        if (this.state.verison_displayed == true) {
            this.setState({ verison_displayed: false })
        } else {
            this.setState({ verison_displayed: true })
        }
    }


    onSubmit = async (value) => {
        console.log("ALl", value)
        this.setState({ report_loader: true, formDataLoanStrat: value.formData, header_dealId: value.formData.dealId })
        let data = value.formData;
        let month, year
        let dealId = value.formData.dealId;
        if (this.state.DealType == "Bawag") {
            month = value.formData.month;

        }
        else {
            if (value.formData.month == 1) {
                month = 12;
                year = value.formData.year - 1;
            }
            else {
                month = value.formData.month - 1;
                year = value.formData.year;
            }
        }
        // let year = value.formData.year;
        let groupby = value.formData.groupby;
        let OrgName = this.state.OrgName;

        this.setState({ formDataLoanStratmonth: month + 1 })

        const DealType = this.state.DealType;
        const APIResponse = await ReportStatusStrat(DealType, dealId, month, year, groupby, OrgName)
        if (APIResponse != null) {

            if (parseInt(APIResponse.data) === 0) {

                const message = "Report Not Published";
                this.props.enqueueSnackbar(message, {
                    variant: 'error',
                    autoHideDuration: 5000,
                });
                this.setState({ report_loader: false })


            } else {

                console.log("ReportStatusStrat", APIResponse.data)
                const LoanTapeData = await ViewLoanTapeData(DealType, dealId, month, year, groupby, OrgName);
                if (LoanTapeData != null) {
                    console.log("LoanTapeData", LoanTapeData)
                    this.setState({ report_data_LoanTapeData: LoanTapeData.data, report_loader: false })
                    this.setState({ dashboard_bdb: false, loan_strat_report: true })



                }


            }


        }

    }


    onSubmitTrustee = async (value) => {



        this.setState({ version_loader: true, formDataTrusteeReport: value.formData, header_dealId: value.formData.dealId, report_box: false })
        let data = value.formData;
        let dealId = value.formData.dealId;
        let month = value.formData.month;
        let year = value.formData.year;
        let groupby = value.formData.groupby;
        let OrgName = this.state.OrgName;
        let DealType = this.state.DealType;
        // alert("before")
        const APIResponse = await InvestorVersion(DealType, dealId, month, year, groupby, OrgName)
        // alert(APIResponse)
        // alert("after")
        if (APIResponse != null) {

            console.log("InvestorVersion", APIResponse.data)
            this.setState({ version_data: APIResponse.data, version_loader: false, version_display: true, loading: true, verison_displayed: true, report_box: false })

            let version_list = []
            if (APIResponse.data.length !== 0) {
                APIResponse.data.reverse().map((item) => {
                    console.log("item irVersion", item.irVersion);
                    version_list.push(item.irVersion);
                })
            }

            console.log("version_list", version_list)
            this.setState({ version_list: version_list })
        }
    }


    onSubmitInvestor = async (value) => {

        this.setState({ version_loader: true, formDataTrusteeReport: value.formData, header_dealId: value.formData.dealId, report_box: false })
        let dealId = value.formData.dealId;
        let month = value.formData.month;
        let year = value.formData.year;
        let groupby = value.formData.groupby;
        let OrgName = this.state.OrgName;
        const DealType = this.state.DealType;
        const version = null
        const data = null
        const userid = this.state.user_id;
        const role = this.state.OrgName;

        const APIResponse = await InvestorReportStatus(DealType, dealId, month, year, version, data)
        if (APIResponse != null) {
            console.log("InvestorReportStatus", APIResponse)

            if (APIResponse.data == "1") {
                this.setState({ report_status: APIResponse.data })
                const InvestorData = await ViewInvestorReport(DealType, dealId, month, year, version, role, userid)
                if (InvestorData != null) {
                    console.log("InvestorData ", InvestorData.data.status1)
                    if (InvestorData.data.status1 == 2) {
                        alert("Something went wrong please try again")
                        this.setState({ report_data: [], getReportLoader: true, report_box: true, getReportLoaderTable: null })
                        this.setState({ version_loader: false })

                    } else {

                        this.setState({ report_data: InvestorData.data, getReportLoader: true, report_box: true, getReportLoaderTable: null })
                        this.setState({ version_loader: false })
                    }
                    this.setState({ report_data: InvestorData.data, getReportLoader: true, report_box: true, getReportLoaderTable: null })
                    this.setState({ version_loader: false })

                }
            } else {

                const message = "Report not published";
                this.props.enqueueSnackbar(message, {
                    variant: 'error',
                    autoHideDuration: 5000,
                });

                this.setState({ version_loader: false })

            }
        }
    }


    getReport = async (dealId, month, year, version) => {

        console.log("getReport getReport getReport getReport getReport ", dealId, month, year, version)
        this.setState({ getReportLoaderTable: version, report_box: false })

        const DealType = this.state.DealType;
        // this.props.history.push("/report/" + DealType + "/view-loan-data-tape/monthly-trustee-report/" + dealId + "/" + month + "/" + year);

        // const version = this.state.version_name;
        const userid = this.state.user_id;
        const role = this.state.OrgName;
        this.setState({ version_name: version })

        const data = this.state.version_list.toString();
        const APIResponse = await InvestorReportStatus(DealType, dealId, month, year, version, data)
        if (APIResponse != null) {
            console.log("InvestorVersion", APIResponse.data)
            this.setState({ report_status: APIResponse.data })

            const InvestorData = await ViewInvestorReport(DealType, dealId, month, year, version, role, userid)
            if (InvestorData != null) {
                console.log("InvestorData", InvestorData.data)
                // this.setState({ report_data: InvestorData.data, getReportLoader: true, report_box: true, getReportLoaderTable: null, verison_displayed: false })
                if (InvestorData.data.status1 == 2) {
                    const message = "Couldnt Fetch the investor Report";
                    this.props.enqueueSnackbar(message, {
                        variant: 'error',
                        autoHideDuration: 5000,
                    });
                    this.setState({ report_data: [], getReportLoader: true, report_box: true, getReportLoaderTable: null })
                    this.setState({ version_loader: false })

                }
                else if (InvestorData.data.status1 == 3) {
                    const message = "Customisation not saved for this month";
                    this.props.enqueueSnackbar(message, {
                        variant: 'error',
                        autoHideDuration: 5000,
                    });
                    this.setState({ report_data: [], getReportLoader: true, report_box: true, getReportLoaderTable: null })
                    this.setState({ version_loader: false })

                } else {

                    this.setState({ report_data: InvestorData.data, getReportLoader: true, report_box: true, getReportLoaderTable: null, verison_displayed: false })
                    this.setState({ version_loader: false })
                }
                this.setState({ report_data: InvestorData.data, getReportLoader: true, report_box: true, getReportLoaderTable: null })
                this.setState({ version_loader: false })


            }
            if (APIResponse.data == "1") {


            } else {

            }

        }



    }


    publish_report = async (event) => {

        var Status = "1";
        const peers = JSON.parse(localStorage.getItem("peers"));
        const token = localStorage.getItem('token');
        const DealType = this.state.DealType;
        var input = {
            "DealID": this.state.formDataTrusteeReport.dealId,
            "month": this.state.formDataTrusteeReport.month,
            "year": this.state.formDataTrusteeReport.year,
            "version": this.state.version_name,
            "Status": Status,
            "peers": peers,
          
            "channelname": this.state.channelname
        }

        const ConstGeneratePDF = await PublishReport(input, DealType)
        console.log("ConstGeneratePDF", ConstGeneratePDF)
        if (ConstGeneratePDF != null) {
            this.setState({ report_status: ConstGeneratePDF.data })

            const message = "Report published";
            this.props.enqueueSnackbar(message, {
                variant: 'info',
                autoHideDuration: 5000,
            });
        }
    }


    export_excel = async (event) => {
        console.log("hitttt")
        let input = this.state.report_data
        let DealType = this.state.DealType
        const ExcelExport1 = await ExcelExport(input, DealType)
        console.log("ExcelExport", ExcelExport1)
        if (ExcelExport1 != null) {
            // alert(ConstGeneratePDF.data.filename)


            //             const url = window.URL.createObjectURL(new Blob([ExcelExport1.data],{ type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
            // const link = document.createElement('a');
            // link.href = url;
            // link.setAttribute('download', 'file.xlsx');
            // document.body.appendChild(link);
            // link.click();
            const file_name = this.state.formDataTrusteeReport.dealId + '-' + this.state.formDataTrusteeReport.month + '-' + this.state.formDataTrusteeReport.year + '.xlsx'
            startDownload(ExcelExport1.data, file_name)

            function startDownload(file, fileName) {
                const url = window.URL.createObjectURL(new Blob([file]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
            }
            // const outputFilename = `${Date.now()}.xls`;
            // fs.writeFileSync(outputFilename, ExcelExport1.data);

            // downloadFile(filepath);

            // function downloadFile(urlToSend) {
            //     var req = new XMLHttpRequest();
            //     req.open("GET", urlToSend, true);
            //     req.responseType = "blob";
            //     req.onload = function (event) {
            //         var blob = req.response;
            //         // var fileName = file_name //if you have the fileName header available
            //         var link = document.createElement('a');
            //         link.href = window.URL.createObjectURL(blob);
            //         // link.download = fileName;
            //         link.click();
            //     };

            //     req.send();
            //}
        }
    }

    export_pdf = async (event) => {
        let DealType = this.state.DealType
        var dealId = this.state.formDataTrusteeReport.dealId
        var month = this.state.formDataTrusteeReport.month;
        var year = this.state.formDataTrusteeReport.year;
        const data = $("#pdfdata").html();
        console.log("data", JSON.stringify(data))
        var input = {
            "dealId": dealId,
            "month": month,
            "year": year,
            "data": JSON.stringify(data),
            "channelname": localStorage.getItem('ChannelName'),
        }
        // var result = JSON.stringify(input);
        console.log("input input", input);

        const ConstGeneratePDF = await GeneratePDF(input, DealType)
        console.log("ConstGeneratePDF", ConstGeneratePDF)
        if (ConstGeneratePDF != null) {
            // alert(ConstGeneratePDF.data.filename)
            const file_name = ConstGeneratePDF.data.filename
            let filepath = "";

            if (this.state.DealType == "LimaOne") {

                filepath = process.env.react_app_base_url + "backendapilima/" + file_name
                // filepath = "http://localhost:3005/" + file_name
            } else if (this.state.DealType == "Bawag") {

                filepath = process.env.react_app_base_url + "backendapibawag/" + file_name
                // filepath = "http://localhost:3005/" + file_name

            } else if (this.state.DealType == "Saluda PAC1") {
                filepath = process.env.react_app_base_url + "backendapisaluda/" + file_name
                // filepath = "http://localhost:3005/" + file_name


            } else if (this.state.DealType == "Saluda FIG1") {

                filepath = process.env.react_app_base_url + "backendapisaludagrade/" + file_name
                // filepath = "http://localhost:3005/" + file_name

            } else if (this.state.DealType == "Saluda SEQ1") {
                filepath = process.env.react_app_base_url + "backendapisaludagradeseq1/" + file_name
                // filepath = "http://localhost:3005/" + file_name

            }
            else if (this.state.DealType == "AlphaFlow") {
                filepath = process.env.react_app_base_url + "backendapialphaflow/" + file_name
                // filepath = "http://localhost:3005/" + file_name
            }
            else if (this.state.DealType == "Saluda FIG2") {
                filepath = process.env.react_app_base_url + "backendapisaludafig2/" + file_name
                // filepath = "http://localhost:3005/" + file_name
            }
            else if (this.state.DealType == "Saluda BC1") {
                filepath = process.env.react_app_base_url + "backendapibc1/" + file_name
                // filepath = "http://localhost:3005/" + file_name
            }
            else if (this.state.DealType == "Reigo") {
                filepath = process.env.react_app_base_url + "backendapireigo/" + file_name
                // filepath = "http://localhost:3005/" + file_name
            }
            else if (this.state.DealType == "Dominion") {
                filepath = process.env.react_app_base_url + "backendapidominion/" + file_name
                // filepath = "http://localhost:3005/" + file_name
            }
            else if (this.state.DealType == "Saluda WL1") {
                filepath = process.env.react_app_base_url + "backendapisaludawl1/" + file_name
                // filepath = "http://localhost:3005/" + file_name
            }
            else if (this.state.DealType == "Spruce Hill") {
                filepath = process.env.react_app_base_url + "backendapisprucehill/" + file_name
                // filepath = "http://localhost:3005/" + file_name
            }
            else if (this.state.DealType == "Saluda RTL1") {
                filepath = process.env.react_app_base_url + "backendapisaludartl1/" + file_name
                // filepath = "http://localhost:3005/" + file_name
            }
            else if (this.state.DealType == "Stoa 2021") {
                filepath = process.env.react_app_base_url + "backendapistoa/" + file_name
                // filepath = "http://localhost:3005/" + file_name
            }
            else if (this.state.DealType == "Tildene") {
                filepath = process.env.react_app_base_url + "backendapitildene/" + file_name
                // filepath = "http://localhost:3005/" + file_name
            }
            else if (this.state.DealType == "Saluda MF1") {
                filepath = process.env.react_app_base_url + "backendapisaludamf1/" + file_name
                // filepath = "http://localhost:3005/" + file_name
            }
            else if (this.state.DealType == "Palisades") {
                filepath = process.env.react_app_base_url + "backendapipalisades/" + file_name
                // filepath = "http://localhost:3005/" + file_name
            }
            else if (this.state.DealType == "Saluda RTL2") {
                filepath = process.env.react_app_base_url + "backendapisaludartl2/" + file_name
                // filepath = "http://localhost:3005/" + file_name
            }
            else if (this.state.DealType == "Saluda PRE1") {
                filepath = process.env.react_app_base_url + "backendapisaludapre/" + file_name
                // filepath = "http://localhost:3005/" + file_name
            }
            else if (this.state.DealType == "MFA") {
                filepath = process.env.react_app_base_url + "backendapimfa/" + file_name
                // filepath = "http://localhost:3005/" + file_name
            }
            else if (this.state.DealType == "Setpoint") {
                filepath = process.env.react_app_base_url + "backendapisetpoint/" + file_name
                // filepath = "http://localhost:3005/" + file_name
            }
            downloadFile(filepath);

            function downloadFile(urlToSend) {
                var req = new XMLHttpRequest();
                req.open("GET", urlToSend, true);
                req.responseType = "blob";
                req.onload = function (event) {
                    var blob = req.response;
                    var fileName = file_name //if you have the fileName header available
                    var link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    link.download = fileName;
                    link.click();
                };

                req.send();
            }
        }
    }


    export_summery_pdf = async (event) => {
        let DealType = this.state.DealType
        var dealId = this.state.formDataLoanStrat.dealId;
        var month = this.state.formDataLoanStrat.month;
        var year = this.state.formDataLoanStrat.year;
        const data = $("#pdfdata2").html();
        console.log("data", JSON.stringify(data))
        var input = {
            "dealId": dealId,
            "month": month,
            "year": year,
            "data": JSON.stringify(data),
            "channelname": localStorage.getItem('ChannelName'),
        }
        // var result = JSON.stringify(input);
        console.log("input input", input);

        const ConstGeneratePDF = await GenerateLoanstratpdf(input, DealType)
        console.log("ConstGeneratePDF", ConstGeneratePDF)
        if (ConstGeneratePDF != null) {
            // alert(ConstGeneratePDF.data.filename)
            const file_name = ConstGeneratePDF.data.filename
            let filepath = "";
            if (this.state.DealType == "LimaOne") {

                filepath = process.env.react_app_base_url + "backendapilima/" + file_name
                // filepath = "http://localhost:3005/" + file_name
            } else if (this.state.DealType == "Bawag") {

                filepath = process.env.react_app_base_url + "backendapibawag/" + file_name
                // filepath = "http://localhost:3005/" + file_name

            } else if (this.state.DealType == "Saluda PAC1") {
                filepath = process.env.react_app_base_url + "backendapisaluda/" + file_name
                // filepath = "http://localhost:3005/" + file_name


            } else if (this.state.DealType == "Saluda FIG1") {

                filepath = process.env.react_app_base_url + "backendapisaludagrade/" + file_name
                // filepath = "http://localhost:3005/" + file_name

            } else if (this.state.DealType == "Saluda SEQ1") {
                filepath = process.env.react_app_base_url + "backendapisaludagradeseq1/" + file_name
                // filepath = "http://localhost:3005/" + file_name

            }
            else if (this.state.DealType == "AlphaFlow") {

                filepath = process.env.react_app_base_url + "backendapialphaflow/" + file_name
                // filepath = "http://localhost:3005/" + file_name

            } else if (this.state.DealType == "Saluda FIG2") {
                filepath = process.env.react_app_base_url + "backendapisaludafig2/" + file_name
                // filepath = "http://localhost:3005/" + file_name

            }
            else if (this.state.DealType == "Saluda BC1") {
                filepath = process.env.react_app_base_url + "backendapibc1/" + file_name
                // filepath = "http://localhost:3005/" + file_name
            }
            else if (this.state.DealType == "Reigo") {
                filepath = process.env.react_app_base_url + "backendapireigo/" + file_name
                // filepath = "http://localhost:3005/" + file_name
            }
            else if (this.state.DealType == "Dominion") {
                filepath = process.env.react_app_base_url + "backendapidominion/" + file_name
                // filepath = "http://localhost:3005/" + file_name
            }
            else if (this.state.DealType == "Saluda WL1") {
                filepath = process.env.react_app_base_url + "backendapisaludawl1/" + file_name
                // filepath = "http://localhost:3005/" + file_name
            }
            else if (this.state.DealType == "Spruce Hill") {
                filepath = process.env.react_app_base_url + "backendapisprucehill/" + file_name
                // filepath = "http://localhost:3005/" + file_name
            }
            else if (this.state.DealType == "Saluda RTL1") {
                filepath = process.env.react_app_base_url + "backendapisaludartl1/" + file_name
                // filepath = "http://localhost:3005/" + file_name
            }
            else if (this.state.DealType == "Stoa 2021") {
                filepath = process.env.react_app_base_url + "backendapistoa/" + file_name
                // filepath = "http://localhost:3005/" + file_name
            }
            else if (this.state.DealType == "Tildene") {
                filepath = process.env.react_app_base_url + "backendapitildene/" + file_name
                // filepath = "http://localhost:3005/" + file_name
            }
            else if (this.state.DealType == "Saluda MF1") {
                filepath = process.env.react_app_base_url + "backendapisaludamf1/" + file_name
                // filepath = "http://localhost:3005/" + file_name
            }
            else if (this.state.DealType == "Palisades") {
                filepath = process.env.react_app_base_url + "backendapipalisades/" + file_name
                // filepath = "http://localhost:3005/" + file_name
            }
            else if (this.state.DealType == "Saluda RTL2") {
                filepath = process.env.react_app_base_url + "backendapisaludartl2/" + file_name
                // filepath = "http://localhost:3005/" + file_name
            }
            else if (this.state.DealType == "Saluda PRE1") {
                filepath = process.env.react_app_base_url + "backendapisaludapre/" + file_name
                // filepath = "http://localhost:3005/" + file_name
            }
            else if (this.state.DealType == "MFA") {
                filepath = process.env.react_app_base_url + "backendapimfa/" + file_name
                // filepath = "http://localhost:3005/" + file_name
            }
            else if (this.state.DealType == "Setpoint") {
                filepath = process.env.react_app_base_url + "backendapisetpoint/" + file_name
                // filepath = "http://localhost:3005/" + file_name
            }
            downloadFile(filepath);


            function downloadFile(urlToSend) {
                var req = new XMLHttpRequest();
                req.open("GET", urlToSend, true);
                req.responseType = "blob";
                req.onload = function (event) {
                    var blob = req.response;
                    var fileName = file_name //if you have the fileName header available
                    var link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    link.download = fileName;
                    link.click();
                };

                req.send();
            }
        }
    }

    // onFormChanged1 = (value) => {
    //     console.log("onFormChanged", value)
    //     this.setState({ formDataSelfService: value.formData})
    // }

    render() {
        const columns = [
            {
                name: 'irDealId',
                label: 'Deal Name',
                options: {
                    filter: false,
                    sort: true,
                    customBodyRender: (value, tableMeta) => (
                        <div>
                            {value}
                        </div>
                    ),
                },
            },
            {
                name: 'irVersion',
                label: 'Version',
                options: {
                    filter: false,
                    sort: true,
                    customBodyRender: (value, tableMeta) => (
                        <div>
                            {value}
                        </div>
                    ),
                },
            },
            {
                name: 'irMonth',
                label: 'Month',
                options: {
                    filter: false,
                    sort: true,
                    customBodyRender: (value, tableMeta) => (
                        <div>
                            {this.state.DealType == "Bawag" ?

                                parseInt(value) : (parseInt(value) % 12) + 1}
                        </div>
                    ),
                },
            },
            {
                name: 'irYear',
                label: 'Year',
                options: {
                    filter: false,
                    sort: true,
                    customBodyRender: (value, tableMeta) => (
                        <div>
                            {parseInt(value) + (parseInt(tableMeta.rowData[2]) == 12 ? 1 : 0)}
                        </div>
                    ),
                },
            },
            {
                name: 'irCreatedDate',
                label: 'Created Date',
                options: {
                    filter: false,
                    sort: true,
                    customBodyRender: (value, tableMeta) => (
                        <div>
                            {value}
                        </div>
                    ),
                },
            },
            {
                name: 'irCreatedBy',
                label: 'Created By',
                options: {
                    filter: false,
                    sort: true,
                    customBodyRender: (value, tableMeta) => (
                        <div className="createdByName">
                            {value}
                        </div>
                    ),
                },
            },
            {
                name: 'irVersion',
                label: 'Action',
                options: {
                    filter: false,
                    sort: true,
                    customBodyRender: (value, tableMeta) => (
                        <div>
                            {this.state.DealType == "Bawag" ?
                                <Button variant='text' onClick={() => this.getReport(tableMeta.rowData[0], parseInt(tableMeta.rowData[2]), tableMeta.rowData[3], value)} color='primary' type='submit'>

                                    {this.state.getReportLoaderTable == value ? (
                                        <React.Fragment>
                                            Getting Report <CircularProgress size='20px' color='primary' />
                                        </React.Fragment>

                                    ) : (
                                            'View Report'
                                        )}

                                </Button>
                                :
                                <Button variant='text' onClick={() => this.getReport(tableMeta.rowData[0], (parseInt(tableMeta.rowData[2]) % 12) + 1, (parseInt(tableMeta.rowData[3]) + (parseInt(tableMeta.rowData[2]) == 12 ? 1 : 0)), value)} color='primary' type='submit'>

                                    {this.state.getReportLoaderTable == value ? (
                                        <React.Fragment>
                                            Getting Report <CircularProgress size='20px' color='primary' />
                                        </React.Fragment>

                                    ) : (
                                            'View Report'
                                        )}

                                </Button>
                            }
                        </div>
                    ),
                },
            },
        ];

        const options = {
            responsive: 'stacked',
            filterType: 'dropdown',
            search: true,
            print: true,
            viewColumns: true,
            download: true,
            rowHover: false,
            selectableRowsOnClick: false,
            selectableRows: false,
            // onRowClick: this.onRowClick,
            onRowsSelect: this.onRowsSelect,
            rowsSelected: this.state.rowsSelected,
            onRowsSelect: (rowsSelected, allRows) => {
                console.log("allRows", allRows);
                console.log("rowsSelected", rowsSelected);
                this.setState({ rowsSelected: allRows.map(row => row.dataIndex) });
                const selected = allRows.map(row => row.dataIndex);
                console.log("selected" + selected);
                this.selectedpoolid(selected);
            },

            customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage, textLabels) => {
                return (
                    <CustomFooter
                        count={count}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        changeRowsPerPage={changeRowsPerPage}
                        changePage={changePage}
                        textLabels={textLabels}
                    />
                );
            },

            searchText: this.state.searchText,
            searchPlaceholder: 'Search Platform',
            customSearch: (searchQuery, currentRow, columns) => {
                let isFound = false;
                currentRow.forEach(col => {
                    if (col.toString().indexOf(searchQuery) >= 0) {
                        isFound = true;
                    }
                });
                return isFound;
            },


            loading: true,
            textLabels: {
                body: {
                    noMatch: this.state.loading === true ?
                        'Sorry, there is no matching data to display' :
                        <Loader msg={"Please wait, loading data"} />,
                    toolTip: 'Sort',
                    columnHeaderTooltip: (column) => `Sort for ${column.label}`,
                },
                filter: {
                    all: 'All',
                    title: 'FILTERS',
                    reset: 'RESET',
                },

                selectedRows: {
                    text: 'row(s) selected',
                    delete: 'Delete',
                    deleteAria: 'Delete Selected Rows',
                },
            },
        };


        return (
            <React.Fragment>
                <div className="page">
                    <div className="content">
                        <div className="header"><UserHeader pageTitle={this.state.pageTitle}
                            total_deals={this.state.total_deals}
                            dealId={this.state.header_dealId}
                        ></UserHeader>
                        </div>



                        <div className="page-content" id="formElements">
                            <div className="row">
                                <div className="col-md-12 text-left">
                                    {/* <h3 className="title-page">{!this.state.pageTitle ? '' : this.state.pageTitle}</h3> */}
                                    <ul className="navigation_top">

                                        <li className="float-left"> <Button variant={this.state.dashboard_bdb == true ? 'contained' : 'outlined'} onClick={this.dashboard_bdb} color='primary' type='submit'> Loan Strat Analytics</Button> </li>
                                        <li className="float-left"> <Button variant={this.state.loan_strat_report == true ? 'contained' : 'outlined'} onClick={this.loan_strat_report} color='primary' type='submit'> Loan Strat Summary  </Button> </li>
                                        <li className="float-left"> <Button variant={this.state.trustee_report == true ? 'contained' : 'outlined'} onClick={this.trustee_report} color='primary' type='submit'> Monthly Trustee Report </Button> </li>

                                    </ul>
                                </div>
                            </div>


                            {/* {this.state.dashboard_bdb == true?
                            <div className="row">
                                <div className="col-md-12 text-left">
                                    <ul className="navigation_top">
                                         <Button variant={this.state.LoanAnalysis == true ? 'contained' : 'outlined'} onClick={this.LoanAnalysis} className="bdb3button" color='primary' type='submit'> Loan Analysis</Button> 
                                       <Button variant={this.state.LoanDetails == true ? 'contained' : 'outlined'} onClick={this.LoanDetails} className="bdb3button" color='primary' type='submit'> Loan Strat Summary</Button> 
                                       <Button variant={this.state.SelfService == true ? 'contained' : 'outlined'} onClick={this.SelfService}className="bdb3button"  color='primary' type='submit'>  Loan Strat Analytics </Button>

                                    </ul>
                                </div>
                            </div>
                            :''}  */}

                        </div>

                        {/* {this.state.dashboard_bdb == true ?
                            <div className="page-content" id="formElements2">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div class="deal_form">
                                            {this.state.loadingFormschema == true ?
                                                <Form
                                                    schema={this.state.schema}
                                                    onSubmit={this.GenerateBDBReport}
                                                    onChange={this.onFormChanged}
                                                    widgets={widgets}
                                                    omitExtraData={true}
                                                    liveOmit={true}
                                                    FieldTemplate={CustomFieldTemplate}
                                                    formData={this.state.formDataBDB}
                                                    uiSchema={this.state.uiSchema}
                                                    ObjectFieldTemplate={ObjectFieldTemplate}
                                                >
                                                    <Button className="deal_form_button" variant='contained' color='primary' type='submit'>
                                                        View Report
                                                        {this.state.bdb_loader === true ? (
                                                            <CircularProgress size='25px' color='primary' />
                                                        ) : (
                                                            ''
                                                        )}
                                                    </Button>

                                                </Form>
                                                : <Loader></Loader>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : ''} */}
                        {this.state.dashboard_bdb == true ?
                            <div className="page-content" id="formElements2">


                                <div className="row">
                                    <div className="col-md-12">
                                        <ul className="navigation_top">
                                            <Button variant={this.state.LoanAnalysis == true ? 'contained' : 'outlined'} onClick={this.LoanAnalysis} className="bdb3button" color='primary' type='submit'> Loan Analysis</Button>
                                            {/* <Button variant={this.state.LoanDetails == true ? 'contained' : 'outlined'} onClick={this.LoanDetails} className="bdb3button" color='primary' type='submit'> Loan Details</Button>  */}
                                            <Button variant={this.state.SelfService == true ? 'contained' : 'outlined'} onClick={this.SelfService} className="bdb3button" color='primary' type='submit'>  Self Service </Button>

                                        </ul>
                                        <div className="clearfix"></div>


                                        {/* {this.state.LoanAnalysis == true ?
   <div className="page-content"  id="formElements2">
      <div className="row">
           <div className="col-md-12">
              <div class="deal_form_loan_strat_report">
                  {this.state.loadingFormschema == true ? 
                      <Form
                           schema={this.state.schema}
                           onSubmit={this.GenerateBDBReport}
                            onChange={this.onFormChanged}
                           widgets={widgets}
                           omitExtraData={true}
                            liveOmit={true}
                          FieldTemplate={CustomFieldTemplate}
                         formData={this.state.formDataLoanAnalysis}
                         uiSchema={this.state.uiSchema}
                             ObjectFieldTemplate={ObjectFieldTemplate}
                         >
                             <Button className="deal_form_button" variant='contained' color='primary' type='submit'>
                               View Report
                           {this.state.bdb_loader === true ? (
                               <CircularProgress size='25px' color='primary' />
                              ) : (
                                     ''
                                  )}
                          </Button>

  </Form>
                       : <Loader></Loader>}
               </div>
           </div>
       </div>
    </div>
    : */}


                                        {
                                            this.state.SelfService == true ?





                                                <div class="deal_form">
                                                    {this.state.loadingFormschema == true ?
                                                        <Form
                                                            schema={this.state.schema}
                                                            onSubmit={this.GenerateBDBReport}
                                                            onChange={this.onFormChanged}
                                                            widgets={widgets}
                                                            omitExtraData={true}
                                                            liveOmit={true}
                                                            FieldTemplate={CustomFieldTemplate}
                                                            formData={this.state.formDataSelfService}
                                                            uiSchema={this.state.uiSchema}
                                                            ObjectFieldTemplate={ObjectFieldTemplate}
                                                        >
                                                            <Button className="deal_form_button" variant='contained' color='primary' type='submit'>
                                                                View Report
                                                        {this.state.bdb_loader === true ? (
                                                                    <CircularProgress size='25px' color='primary' />
                                                                ) : (
                                                                        ''
                                                                    )}
                                                            </Button>

                                                        </Form>
                                                        : <Loader></Loader>}
                                                </div> : ''}

                                        {/* //                           : 
//                           this.state.LoanDetails == true ?
//                             <div className="page-content" id="formElements2">
//                                 <div className="row">
//                                     <div className="col-md-12">
//                                         <div class="deal_form_loan_details">
//                                              {this.state.loadingFormschema == true ? 
//                                                  <Form
//                                                      schema={this.state.schema}
//                                                      onSubmit={this.GenerateBDBReport}
//                                                      onChange={this.onFormChanged}
//                                                      widgets={widgets}
//                                                     omitExtraData={true}
//                                                    liveOmit={true}
//                                                     FieldTemplate={CustomFieldTemplate}
//                                                    formData={this.state.formDataBDBDashboard}
//                                                      uiSchema={this.state.uiSchema}
//                                                      ObjectFieldTemplate={ObjectFieldTemplate}
// >
//                                                     <Button className="deal_form_button" variant='contained' color='primary' type='submit'>
//                                                         View Report
//                                                          {this.state.bdb_loader === true ? (
//                                                              <CircularProgress size='25px' color='primary' />
//                                                          ) : (
//                                                                  ''
//                                                            )}
//                                                    </Button>

//                                                 </Form>
//                                                  : <Loader></Loader>}
//                                         </div>
//                                     </div>
// </div>
//                         </div>


// :''}  */}

                                    </div>

                                </div>
                            </div>
                            : ''}



                        {this.state.loan_strat_report == true ?
                            <div className="page-content" id="formElements2">
                                <div className="row align-items-center">
                                    <div className="col-md-4">
                                        View Report
                                            {this.state.formDataLoanStrat.dealId ?
                                            <React.Fragment>
                                                &nbsp;-&nbsp;<strong>{this.state.formDataLoanStrat.dealId}</strong>,&nbsp;
                                                {moment(this.state.formDataLoanStrat.month).format('MMMM')},&nbsp;
                                                {this.state.formDataLoanStrat.year}
                                                <span className="small_text">{moment(this.state.formDataLoanStrat.month).format('MMMM')} report is based on&nbsp;{moment(this.state.formDataLoanStrat.month).subtract(1).format('MMMM')} &nbsp;month-end data</span>
                                            </React.Fragment>
                                            : ''}
                                    </div>

                                    <div className="col-md-8">
                                        <div class="deal_form_loan_strat_report">
                                            {this.state.loadingFormLoanStratSchema == true ?
                                                <Form
                                                    schema={this.state.LoanStratSchema}
                                                    onSubmit={this.onSubmit}
                                                    onChange={this.onFormChanged}
                                                    widgets={widgets}
                                                    omitExtraData={true}
                                                    liveOmit={true}
                                                    FieldTemplate={CustomFieldTemplate}
                                                    formData={this.state.formDataLoanStrat}
                                                    uiSchema={this.state.uiSchema}
                                                    ObjectFieldTemplate={ObjectFieldTemplate}
                                                >
                                                    {/* {this.state.DealType == "Tildene" ?
                                                        <React.Fragment>
                                                            <Button variant='contained' className="deal_form_button" onClick={() => (this.state.button = 1)}color='primary' type='submit'>
                                                                All
                                                        {this.state.report_loader === true ? (
                                                                    <CircularProgress size='25px' color='primary' />
                                                                ) : (
                                                                        ''
                                                                    )}
                                                            </Button>
                                                            <Button variant='contained' style={{ marginLeft: "2px" }} className="deal_form_button" color='primary' onClick={() => (this.state.button = 2)} type='submit'>
                                                                SUBI A
                                                        {this.state.report_loader === true ? (
                                                                    <CircularProgress size='25px' color='primary' />
                                                                ) : (
                                                                        ''
                                                                    )}
                                                            </Button>
                                                            <Button variant='contained' style={{ marginLeft: "2px" }} className="deal_form_button" onClick={() => (this.state.button = 3)} color='primary' type='submit'>
                                                                SUBI B
                                                        {this.state.report_loader === true ? (
                                                                    <CircularProgress size='25px' color='primary' />
                                                                ) : (
                                                                        ''
                                                                    )}
                                                            </Button>
                                                        </React.Fragment>
                                                        : */}
                                                    <Button variant='contained' className="deal_form_button" color='primary' type='submit'>
                                                        View Report
                                                        {this.state.report_loader === true ? (
                                                            <CircularProgress size='25px' color='primary' />
                                                        ) : (
                                                                ''
                                                            )}
                                                    </Button>
                                                    {/* } */}
                                                </Form>
                                                : <Loader></Loader>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : ''}

                        {this.state.trustee_report == true ?
                            <div className="page-content" id="formElements2">
                                <div className="row align-items-center">
                                    <div className="col-md-4">
                                        View Report
                                            {this.state.formDataTrusteeReport.dealId ?
                                            <React.Fragment>
                                                &nbsp;-&nbsp;<strong>{this.state.formDataTrusteeReport.dealId}</strong>, &nbsp;
                                                {moment(this.state.formDataTrusteeReport.month).format('MMMM')}, &nbsp;
                                                {this.state.formDataTrusteeReport.year}

                                            </React.Fragment>
                                            : ''}
                                    </div>

                                    <div className="col-md-8">
                                        <div class="deal_form_loan_strat_report">
                                            {/* {JSON.stringify(this.state.formDataTrusteeReport)} */}
                                            {this.state.loadingFormTrusteeReportSchema == true ?
                                                <Form
                                                    schema={this.state.TrusteeReportSchema}
                                                    onSubmit={this.state.OrgName == "wsfstrustee" ? this.onSubmitTrustee : this.onSubmitInvestor}
                                                    onChange={this.onFormChanged}
                                                    widgets={widgets}
                                                    omitExtraData={true}
                                                    liveOmit={true}
                                                    FieldTemplate={CustomFieldTemplate}
                                                    formData={this.state.formDataTrusteeReport}
                                                    uiSchema={this.state.uiSchema}
                                                    ObjectFieldTemplate={ObjectFieldTemplate}
                                                >

                                                    <Button className="deal_form_button" variant='contained' color='primary' type='submit'>
                                                        {this.state.OrgName == "wsfstrustee" ? 'Display Versions' : 'View Report'}
                                                        {this.state.version_loader == true ? <CircularProgress size='25px' color='primary' /> : ''}
                                                    </Button>
                                                </Form>
                                                : <Loader></Loader>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : ''}

                        {this.state.dashboard_bdb == true ?
                            <React.Fragment>
                                {this.state.bdbUrl !== null && this.state.test !== null ?
                                    <React.Fragment>
                                        {this.state.bdb_loader === false ?
                                            <div className="page-content with_loader" id="bdb_dashboard">
                                                <div className="dealinfo">
                                                    <div className="row">
                                                        {/* <div className="col-md-3"><label>Deal Name</label> {this.state.formDataBDB.dealId} </div>
                                                        <div className="col-md-3"><label>Group By</label>  {this.state.formDataBDB.groupby} </div> */}
                                                        {this.state.SelfService == true ?
                                                            <div className="col-md-8">To  guide you through all the essential functionalities,  click on START TOUR (Last Icon)under right widget. </div>

                                                            : ''}      </div>

                                                </div>
                                                <div className="wrapper-pdf-container">
                                                    <React.Fragment>
                                                        <iframe
                                                            src={this.state.bdbUrl}
                                                            width="100%"
                                                            height="700px"
                                                            id="myId"
                                                            className="iframeOuter"
                                                            display="initial"
                                                            position="relative"
                                                            frameBorder="0"
                                                        >
                                                        </iframe>
                                                    </React.Fragment>
                                                </div>
                                            </div>
                                            : ''}

                                    </React.Fragment>
                                    : this.state.bdbUrl !== null && this.state.test == null ?
                                        <React.Fragment>
                                            {this.state.bdb_loader === false ?
                                                <div className="page-content with_loader" id="bdb_dashboard">
                                                    <div className="dealinfo">
                                                        <div className="row">
                                                            {/* <div className="col-md-3"><label>Deal Name</label> {this.state.formDataBDB.dealId} </div>
                                                    <div className="col-md-3"><label>Group By</label>  {this.state.formDataBDB.groupby} </div> */}
                                                            {this.state.SelfService == true ?
                                                                <div className="col-md-8" >Self Service Charts are not available for Test Deal </div>

                                                                : ''}      </div>

                                                    </div>

                                                </div>
                                                : ''}

                                        </React.Fragment>
                                        : ''}
                            </React.Fragment>
                            : ''}

                        {this.state.loan_strat_report == false ? '' :

                            <React.Fragment>

                                {this.state.report_data_LoanTapeData == null ? '' :

                                    <React.Fragment>

                                        <div className="page-content" id="loan_strat_report">

                                            {this.state.loan_strat_report == true ?
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

                        {this.state.trustee_report == false ? '' :
                            <React.Fragment>
                                {this.state.version_display == true ?
                                    <React.Fragment>
                                        <div className="page-content" id="version_display">
                                            <h2 className="version_btn" onClick={() => { this.version_history(this.state.verison_displayed) }}>
                                                <Button variant="outlined" color="primary" >
                                                    Versions
                                                    {this.state.verison_displayed == false ?
                                                        <KeyboardArrowUpIcon></KeyboardArrowUpIcon>
                                                        :
                                                        <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
                                                    }


                                                </Button>
                                            </h2>
                                            <div className="clearfix"></div>
                                            {this.state.verison_displayed == false ? '' :
                                                <div className="row custom-input justify-content-center">
                                                    <div className="col-md-12 mb-4" id="version_loader">
                                                        <MUIDataTable
                                                            title={''}
                                                            data={this.state.version_data}
                                                            columns={columns}
                                                            options={options}
                                                        />
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </React.Fragment>
                                    : ' '}


                                {this.state.report_box == false ? '' :
                                    <React.Fragment>
                                        {this.state.getReportLoader !== false ?
                                            <React.Fragment>
                                                {this.state.report_data == null ? '' :
                                                    <React.Fragment>
                                                        <div className="page-content" id="ViewDragNDrop">
                                                            <div className="wrapper-pdf-container"></div>
                                                            <div className="view-report-header">
                                                                {this.state.OrgName == "investor" || this.state.OrgName == "issuer" ? '' : <Button variant="outlined" color="primary" disabled={this.state.report_status == 0 ? false : true} onClick={this.publish_report}> <PublishIcon></PublishIcon> Publish Report</Button>}
                                                                <Button variant="outlined" color="primary" onClick={this.export_pdf}> <PictureAsPdfIcon></PictureAsPdfIcon> Export PDF</Button>
                                                                <Button variant="outlined" color="primary" onClick={this.export_excel}> <DescriptionIcon></DescriptionIcon> Export Excel</Button>

                                                            </div>
                                                            <div className="clearfix"></div>
                                                            <ViewDragNDrop
                                                                customize_data={this.state.report_data}
                                                                dealname={this.state.formDataTrusteeReport.dealId}
                                                                month={this.state.formDataTrusteeReport.month}
                                                                year={this.state.formDataTrusteeReport.year}
                                                                peers={this.state.peers}
                                                                token={this.state.token}
                                                                dealType={this.state.DealType}
                                                                channelname={this.state.channelname}
                                                                Notes={Notes}
                                                            >
                                                            </ViewDragNDrop>
                                                        </div>
                                                    </React.Fragment>
                                                }
                                            </React.Fragment>
                                            : ''}
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

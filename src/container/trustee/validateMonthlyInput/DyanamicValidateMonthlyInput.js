import React, { Component } from 'react';
import Header from '../../../components/header';
import Button from '@material-ui/core/Button';
import { withTheme } from 'react-jsonschema-form';
import { Theme as MuiTheme } from 'rjsf-material-ui';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import { withSnackbar } from 'notistack';
import LinearLoader from '../../../components/loader/LinearLoader';
import Loader from '../../../components/loader';
import { widgets, CustomFieldTemplate, ObjectFieldTemplate } from '../../../components/customscripts/customscript';
import { generateYears, months, ValidateMonthlyInput, UpdateValidateMonthlyInput } from '../../../servies/services';
import $ from 'jquery';
import NumberComp from '../../../components/NumberComp';
import CurrencyFormat from 'react-currency-format';

const Form = withTheme(MuiTheme);
const schema = require('./schema.json');
const schemaLima = require('./LimaValidateSchema.json');
const schemaSaludaPacFirstMonth = require('./SaludaPacFirstMonthValidateSchema.json');
const schemaSaludaPacNextMonth = require('./SaludaPacNextMonthValidateSchema.json');
const schemaSaludaPacAfterApril = require('./SaludaPacAfterAprilValidateSchema.json');
const schemaSaludaPacAfterOctober = require('./SaludaPacAfterOctoberValidateSchema.json');
const schemaSaludaPac11 = require('./SaludaPac11monthValidateSchema.json');
const schemaSaludaPacLatest = require('./SaludaPacLatestMonthValidateSchema.json');
const schemaSaludaPacJan22 = require('./SaludaPacJan22ValidateSchema.json');


const schemaSaludaGradeFirstMonth = require('./SaludaGradeFirstMonthValidateSchema.json');
const schemaSaludaGradeNextMonth = require('./SaludaGradeNextMonthValidateSchema.json');
const schemaSaludaGradeAprilMonth = require('./SaludaGradeAprilMonthValidateSchema.json');
const schemaSaludaGradeFebMonth = require('./SaludaGradeFebMonthValidateSchema.json');


const schemaSaludaSeqFirstMonth = require('./SaludaSeqFirstMonthValidateSchema.json');
const schemaSaludaSeqMidMonth = require('./SaludaSeqMidMonthValidateSchema.json');
const schemaSaludaSeqNextMonth = require('./SaludaSeqNextMonthValidateSchema.json');
const schemaSaludaSeq6Month = require('./SaludaSeq6MonthValidateSchema.json');
const schemaSaludaSeqAugustMonth = require('./SaludaSeqAugustValidateSchema.json');

const schemaAlphaflow = require('./AlphaflowValidateSchema.json');
const schemaAlphaflowMidMonth = require('./AlphaflowMidMonthValidateSchema.json');
const schemaAlphaflowNextMonth = require('./AlphaflowNextMonthValidateSchema.json');
const schemaAlphaflowMay = require('./AlphaflowMayValidateSchema.json');
const schemaAlphaflowAugust = require('./AlphaflowAugustValidateSchema.json');
const schemaAlphaflowSeptember = require('./AlphaflowSeptemberValidateSchema.json');
const schemaAlphaflowDecember = require('./AlphaflowDecemberValidateSchema.json');



const schemaFig2 = require('./Fig2ValidateSchema.json');
const schemaFig2NextMonth = require('./Fig2NextMonthValidateSchema.json');
const schemaFig26Month = require('./Fig26MonthValidateSchema.json');
const schemaFig210Month = require('./Fig210monthValidateSchema.json');


const schemaBc1FirstMonth = require('./Bc1FirstMonthValidateSchema.json');
const schemaBc1NextMonth = require('./Bc1NextMonthValidateSchema.json');
const schemaBcOctMonth = require('./Bc1OctMonthValidateSchema.json')
const schemaBcLatestMonth = require('./Bc1LatestMonthValidateSchema.json')

const schemaReigoFirstMonth = require('./ReigoFirstMonthValidateSchema.json');
const schemaReigoMidMonth = require('./ReigoMidMonthValidateSchema.json');
const schemaReigoNextMonth = require('./ReigoNextMonthValidateSchema.json');
const schemaReigoLatestMonth = require('./ReigoLatestMonthValidateSchema.json');
const schemaReigoAprilMonth = require('./ReigoAprilMonthValidateSchema.json');

const schemaSaludawl1FirstMonth = require('./Saludawl1FirstMonthValidateSchema.json');
const schemaSaludawl1SecondMonth = require('./Saludawl1SecondMonthValidateSchema.json');
const schemaSaludawl1NextMonth = require('./Saludawl1NextMonthValidateSchema.json');
const schemaSaludawl1FebMonth = require('./Saludawl1FebMonthValidateSchema.json');
const schemaSaludawl1AprilMonth = require('./Saludawl1AprilMonthValidateSchema.json');
const schemaSaludawl1OctMonth = require('./Saludawl1OctMonthValidateSchema.json');


const schemaDominionFirstMonth = require('./DominionFirstMonthValidateSchema.json');
const schemaDominionMidMonth = require('./DominionMidMonthValidateSchema.json');
const schemaDominionOctMonth = require('./DominionOctMonthValidateSchema.json');
const schemaDominionMarchMonth=require('./DominionMarchMonthValidateSchema.json');
const schemaDominionAprilMonth=require('./DominionAprilMonthValidateSchema.json');

const schemaSprucehillFirstMonth = require('./SprucehillFirstMonthValidateSchema.json');

const schemaSaludartl1FirstMonth = require('./Saludartl1FirstMonthValidateSchema.json');
const schemaSaludartl1NextMonth = require('./Saludartl1NextMonthValidateSchema.json');
const schemaSaludartl1AprilMonth = require('./Saludartl1AprilMonthValidateSchema.json');
const schemaSaludartl1MayMonth = require('./Saludartl1MayMonthValidateSchema.json');
const schemaSaludartl1JuneMonth = require('./Saludartl1JuneMonthValidateSchema.json');
const schemaSaludartl1OctMonth = require('./Saludartl1OctMonthValidateSchema.json');


const schemaStoaFirstMonth = require('./StoaFirstMonthValidateSchema.json');

const schemaSaludamf1FirstMonth = require('./Saludamf1FirstMonthValidateSchema.json');
const schemaSaludamf1NextMonth = require('./Saludamf1NextMonthValidateSchema.json');
const schemaSaludamf1AprilMonth = require('./Saludamf1AprilMonthValidateSchema.json');
const schemaSaludamf1OctMonth = require('./Saludamf1OctMonthValidateSchema.json');


const schemaPalisadesFirstMonth = require('./PalisadesFirstMonthValidateSchema.json');
const schemaPalisadesNextMonth = require('./PalisadesNextMonthValidateSchema.json');
const schemaPalisadesAprilMonth = require('./PalisadesAprilMonthValidateSchema.json');

const schemaSaludartl2FirstMonth = require('./Saludartl2FirstMonthValidateSchema.json');
const schemaSaludartl2NextMonth = require('./Saludartl2NextMonthValidateSchema.json');
const schemaSaludartl2OctMonth = require('./Saludartl2OctMonthValidateSchema.json');

const schemaSaludaPreFirstMonth = require('./SaludaPreFirstMonthValidateSchema.json');
const schemaSaludaPreNextMonth = require('./SaludaPreNextMonthValidateSchema.json');
const schemaSaludaPreSeptMonth = require('./SaludaPreSeptMonthValidateSchema.json');
const schemaSaludaPreOctMonth = require('./SaludaPreOctMonthValidateSchema.json');
const schemaSaludaPreDecMonth = require('./SaludaPreDecMonthValidateSchema.json');



const schemamfaFirstMonth = require('./SaludaMfaFirstMonthValidateSchema.json');
const schemamfaNextMonth = require('./SaludaMfaNextMonthValidateSchema.json');

const schemaSetpointFirstMonth = require('./SetpointFirstMonthValidateSchema.json');
const schemaSetpointNextMonth = require('./SetpointNextMonthValidateSchema.json');

const schemaBc2FirstMonth = require('./Bc2FirstMonthValidateSchema.json')

const schemaBuildersFirstMonth = require('./BuildersFirstMonthValidateSchema.json')
const schemaStoa2022FirstMonth = require('./Stoa2022FirstMonthValidateSchema.json')
const schemaUnlockFirstMonth = require('./UnlockFirstMonthValidateSchema.json')
const schemaNPLFirstMonth = require('./NPLFirstMonthValidateSchema.json')

// const formDataLimaSchema = require('./formdata-lima.json');

// let dealTypeMain = localStorage.getItem('DealType');
// let validateSchema = null;
// let uiSchema = null;
// let formData = null;
// if (dealTypeMain == "LimaOne") {

//     validateSchema = schemaLima;
//     // uiSchema = uiSchemaLima;
//     // formData = formDataLima;
// } else if (dealTypeMain == "Bawag") {
//     // schema = schemaBawag;
//     // uiSchema = uiSchemaBawag;
//     // formData = formDataBawag;
// } else if (dealTypeMain == "Saluda PAC1") {
//     // schema = schemaSaluda;
//     // uiSchema = uiSchemaSaluda;
//     // formData = formDataSaluda;
// } else if (dealTypeMain == "Saluda FIG1") {
//     // schema = uiSchemaSaludaGrade;
//     // uiSchema = uiSchemaSaluda;
//     // formData = formDataSaluda;
// } else if (dealTypeMain == "Saluda SEQ1") {
//     validateSchema = schemaSaludaSeqNextMonth;
//     // schema = schemaSaludaSeq1;
//     // uiSchema = uiSchemaSaludaSeq1;
//     // formData = formDataSaludaSeq1;
// }

class DyanamicValidateMonthlyInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schema: schema,
            validateSchema: [],
            // formDataSchema: formDataLimaSchema,
            getLoansLoader: false,
            open: false,
            InvestorReportBox: false,
            onboardservicerdata: null,
            getLoader: false,
            pageTitle: "Validate Monthly Inputs",
            formData: {
                dealId: null,
                month: null,
                year: null
            },
            years: generateYears(),
            months: months,
            DealType: localStorage.getItem('DealType'),
            loadingForm: false,
            loadingForm2: false,
            validate_data: null,
            report_loader: false,
            all_deals: JSON.parse(localStorage.getItem("all_deals")),
            fields: [],
            token: localStorage.getItem('token'),
            peer: localStorage.getItem('peer'),
            ValidateMonthlyInputDealsLoader: false,
            peers: JSON.parse(localStorage.getItem('peers')),
            channelname: localStorage.getItem('ChannelName'),
            ValidateMonthlyInputState: [],
            ValidateMonthlyInputStateLoader: false


        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleDoc = (e) => {

        this.setState({ file: e.target.files[0] });

    }
    proceed = () => {
        this.props.history.push("/report/" + this.state.DealType + "/view-servicer-blockchain-data/" + this.state.formData.dealId + "/" + this.state.formData.month + "/" + this.state.formData.year);
    }


    async componentDidMount() {
        if (localStorage.getItem("token") == "" || localStorage.getItem("token") == undefined) {
            window.location.assign("/")
        }
        console.log("GroupByLima", this.state.groupby)
        console.log("componentDidMount DealId", this.props.match.params.DealId, this.props.match.params.DealMonth, this.props.match.params.DealYear);
        const DealId = this.props.match.params.DealId;
        const DealMonth = this.props.match.params.DealMonth;
        const DealYear = this.props.match.params.DealYear;
        this.callMethod(DealId, DealMonth, DealYear);
        const DealType = this.state.DealType;
        this.Validateschemamethod(DealMonth, DealYear)

        if (!DealId && !DealMonth && !DealYear) {


        } else {
            this.setState({ formData: { dealId: DealId, month: DealMonth.toString(), year: DealYear.toString() } })
            this.servicerdata(DealId, DealMonth, DealYear)

        }
    }

    Validateschemamethod(DealMonth, DealYear) {
        let dealTypeMain = localStorage.getItem('DealType');
        let validateSchema = null;
        let uiSchema = null;
        let formData = null;
        if (dealTypeMain == "LimaOne") {

            validateSchema = schemaLima;
            // uiSchema = uiSchemaLima;
            // formData = formDataLima;
        } else if (dealTypeMain == "Bawag") {
            // schema = schemaBawag;
            // uiSchema = uiSchemaBawag;
            // formData = formDataBawag;
        } else if (dealTypeMain == "Saluda PAC1") {
            if (parseInt(DealMonth) == 7 && parseInt(DealYear) == 2020) {
                validateSchema = schemaSaludaPacFirstMonth
            } else if ((parseInt(DealMonth) >= 8 && parseInt(DealYear) == 2020) || (parseInt(DealMonth) <= 4 && parseInt(DealYear) == 2021)) {
                validateSchema = schemaSaludaPacNextMonth;
            }
            else if ((parseInt(DealMonth) <= 9 && parseInt(DealMonth) >= 5 && parseInt(DealYear) == 2021)) {
                validateSchema = schemaSaludaPacAfterApril;
            }
            else if ((parseInt(DealMonth) == 11 && parseInt(DealYear) == 2021)) {
                validateSchema = schemaSaludaPac11;
            }
            else if (((parseInt(DealMonth) == 10 || parseInt(DealMonth) == 12 )&& parseInt(DealYear) == 2021)) {
                validateSchema = schemaSaludaPacLatest;
            }
            else {
                validateSchema = schemaSaludaPacJan22;
            }
            // schema = schemaSaluda;
            // uiSchema = uiSchemaSaluda;
            // formData = formDataSaluda;
        } else if (dealTypeMain == "Saluda FIG1") {
            if ((parseInt(DealMonth) == 8 || parseInt(DealMonth) == 9) && parseInt(DealYear) == 2020) {
                validateSchema = schemaSaludaGradeFirstMonth
            } else if((parseInt(DealMonth) <= 3 && parseInt(DealYear) == 2022) || parseInt(DealYear) < 2022) {
                validateSchema = schemaSaludaGradeNextMonth;
            }
           
            else if((parseInt(DealMonth) <= 12 && parseInt(DealYear) == 2022)){
                validateSchema = schemaSaludaGradeAprilMonth;

            }
            else{
                validateSchema = schemaSaludaGradeFebMonth;
            }
            // schema = uiSchemaSaludaGrade;
            // uiSchema = uiSchemaSaluda;
            // formData = formDataSaluda;
        } else if (dealTypeMain == "Saluda SEQ1") {
            if (parseInt(DealMonth) == 11 && parseInt(DealYear) == 2020) {
                validateSchema = schemaSaludaSeqFirstMonth
            } else if ((parseInt(DealMonth) == 12 && parseInt(DealYear) == 2020) || (parseInt(DealMonth) < 3 && parseInt(DealYear) == 2021)) {
                validateSchema = schemaSaludaSeqMidMonth;
            }
            else if ((parseInt(DealMonth) == 3 || parseInt(DealMonth) == 4 || parseInt(DealMonth) == 5 ) && parseInt(DealYear) == 2021) {
                validateSchema = schemaSaludaSeqNextMonth;
            }
            else if (parseInt(DealMonth) == 6 && parseInt(DealYear) == 2021) {
                validateSchema = schemaSaludaSeq6Month;
            }
            else {
                validateSchema = schemaSaludaSeqAugustMonth;

            }
            // schema = schemaSaludaSeq1;
            // uiSchema = uiSchemaSaludaSeq1;
            // formData = formDataSaludaSeq1;
        }
        else if (dealTypeMain == "AlphaFlow") {


            if ((parseInt(DealMonth) == 1 || parseInt(DealMonth) == 2) && parseInt(DealYear) == 2021) {
                validateSchema = schemaAlphaflow;
            } else if (parseInt(DealMonth) == 3 && parseInt(DealYear) == 2021) {
                validateSchema = schemaAlphaflowMidMonth;
            }
            else if (parseInt(DealMonth) == 4 && parseInt(DealYear) == 2021) {
                validateSchema = schemaAlphaflowNextMonth;
            }
            else if (parseInt(DealMonth) == 5 || parseInt(DealMonth) == 6) {
                validateSchema = schemaAlphaflowMay;
            }
             else if(parseInt(DealMonth) == 7 || parseInt(DealMonth) == 8 || parseInt(DealMonth) == 9){
               validateSchema=schemaAlphaflowAugust;

           }
           else if(parseInt(DealMonth) == 10 && parseInt(DealYear) == 2022){
            validateSchema=schemaAlphaflowSeptember;

        }
            else {
                validateSchema = schemaAlphaflowDecember;
            }
            // schema = schemaSaludaSeq1;
            // uiSchema = uiSchemaSaludaSeq1;
            // formData = formDataSaludaSeq1;
        }
        else if (dealTypeMain == "Saluda FIG2") {

            if (parseInt(DealMonth) == 2 && parseInt(DealYear) == 2021) {
                validateSchema = schemaFig2;
            }
            else if ((parseInt(DealMonth) == 3 || parseInt(DealMonth) == 4 || parseInt(DealMonth) == 5) && parseInt(DealYear) == 2021) {
                validateSchema = schemaFig2NextMonth;
            }
            else if ((parseInt(DealMonth) == 6 || parseInt(DealMonth) == 7 || parseInt(DealMonth) == 8 || parseInt(DealMonth) == 9) && parseInt(DealYear) == 2021) {
                validateSchema = schemaFig26Month;
            }
            else {
                validateSchema = schemaFig210Month;
            }
        }

        else if (dealTypeMain == "Saluda BC1") {

            if ((parseInt(DealMonth) == 3 || parseInt(DealMonth) == 4) && parseInt(DealYear) == 2021) {
                validateSchema = schemaBc1FirstMonth;
            }
            else if (parseInt(DealMonth) <= 8 && parseInt(DealYear) == 2021) {
                validateSchema = schemaBc1NextMonth;
            }

            else if (parseInt(DealMonth) <= 11 && parseInt(DealYear) == 2021) {
                validateSchema = schemaBcOctMonth
            }
            else {
                validateSchema = schemaBcLatestMonth
            }
        }
        else if (dealTypeMain == "Reigo") {

            if ((parseInt(DealMonth) == 6 || parseInt(DealMonth) == 7) && parseInt(DealYear) == 2021) {
                validateSchema = schemaReigoFirstMonth
            }
            else if (parseInt(DealMonth) == 8 && parseInt(DealYear) == 2021) {
                validateSchema = schemaReigoMidMonth;
            }
            else if (parseInt(DealMonth) <= 11 && parseInt(DealYear) == 2021) {
                validateSchema = schemaReigoNextMonth;
            }
            else if (parseInt(DealMonth) == 12 && parseInt(DealYear) == 2021 || parseInt(DealMonth) <= 3 && parseInt(DealYear) == 2022) {
                validateSchema = schemaReigoLatestMonth;
            }
            else{
                 console.log("hiiiiiiiiiii")
                validateSchema = schemaReigoAprilMonth;

            }

        }
        else if (dealTypeMain == "Saluda WL1") {
            if (parseInt(DealMonth) == 8 && parseInt(DealYear) == 2021) {
                validateSchema = schemaSaludawl1FirstMonth;
            }
            else if (parseInt(DealMonth) <= 11 && parseInt(DealYear) == 2021) {
                validateSchema = schemaSaludawl1SecondMonth;
            }
            else if ((parseInt(DealMonth) == 12 && parseInt(DealYear) == 2021) || (parseInt(DealMonth) == 1 && parseInt(DealYear) == 2022)) {
                validateSchema = schemaSaludawl1NextMonth;
            }
            else if (parseInt(DealMonth) <= 3 && parseInt(DealYear) == 2022) {
                validateSchema = schemaSaludawl1FebMonth;
            }
            else if (parseInt(DealMonth) <= 9 && parseInt(DealYear) == 2022) {
                validateSchema = schemaSaludawl1AprilMonth;

            }
            else{
                validateSchema = schemaSaludawl1OctMonth;

            }

        }
        else if (dealTypeMain == "Dominion") {
            if (parseInt(DealMonth) == 8 && parseInt(DealYear) == 2021) {
                validateSchema = schemaDominionFirstMonth;
            }
            else if (parseInt(DealMonth) == 9 && parseInt(DealYear) == 2021) {
                validateSchema = schemaDominionMidMonth
            }
            else if ((parseInt(DealMonth) <= 12 && parseInt(DealYear) == 2021)|| (parseInt(DealMonth) <= 2 && parseInt(DealYear) == 2022)) {
                validateSchema = schemaDominionOctMonth
            }
            else if (parseInt(DealMonth) == 3 && parseInt(DealYear) == 2022) {
                validateSchema = schemaDominionMarchMonth

            }
            else{
                validateSchema = schemaDominionAprilMonth

            }
        }
        else if (dealTypeMain == "Spruce Hill") {


            validateSchema = schemaSprucehillFirstMonth;

        }
        else if (dealTypeMain == "Saluda RTL1") {
            if (parseInt(DealYear) <= 2021) {

                validateSchema = schemaSaludartl1FirstMonth;
            }
            else if (parseInt(DealMonth) <= 2 && parseInt(DealYear) == 2022) {

                validateSchema = schemaSaludartl1NextMonth;

            }
            else if (parseInt(DealMonth) <= 4 && parseInt(DealYear) == 2022) {
                validateSchema = schemaSaludartl1AprilMonth;

            }
            else if (parseInt(DealMonth) <= 5 && parseInt(DealYear) == 2022){
                validateSchema = schemaSaludartl1MayMonth;

            }
            else if (parseInt(DealMonth) <= 9 && parseInt(DealYear) == 2022){
                validateSchema = schemaSaludartl1JuneMonth;

            }
            else{
                validateSchema = schemaSaludartl1OctMonth;

            }
        }
        else if (dealTypeMain == "Stoa 2021") {

            validateSchema = schemaStoaFirstMonth;
        }
        else if (dealTypeMain == "Saluda MF1") {
            if (parseInt(DealMonth) == 11 && parseInt(DealYear) == 2021) {
                validateSchema = schemaSaludamf1FirstMonth;
            }
            else if ((parseInt(DealMonth) <= 3 && parseInt(DealYear) == 2022) || parseInt(DealYear) == 2021) {
                validateSchema = schemaSaludamf1NextMonth
            }
            else if(parseInt(DealMonth) <=9 && parseInt(DealYear) == 2022){
            
                validateSchema = schemaSaludamf1AprilMonth;
            }
            else{
                validateSchema = schemaSaludamf1OctMonth;

            }
        }
        else if (dealTypeMain == "Palisades") {
            if (parseInt(DealMonth) == 11 && parseInt(DealYear) == 2021) {
                validateSchema = schemaPalisadesFirstMonth;
            }
            else if (parseInt(DealMonth) == 12 && parseInt(DealYear) == 2021 || parseInt(DealMonth) <= 3 && parseInt(DealYear) == 2022) {

                validateSchema = schemaPalisadesNextMonth;
            }
            else{
                validateSchema = schemaPalisadesAprilMonth;

            }
        }
        else if (dealTypeMain == "Saluda RTL2") {
            if(parseInt(DealMonth) <=3 && parseInt(DealYear) == 2022)

            validateSchema = schemaSaludartl2FirstMonth;
            else if(parseInt(DealMonth) <=9 && parseInt(DealYear) == 2022){
                validateSchema = schemaSaludartl2NextMonth;

            }
            else{
                validateSchema = schemaSaludartl2OctMonth;
            }

        }

        else if (dealTypeMain == "Saluda PRE1") {

            if(parseInt(DealMonth) <=4 && parseInt(DealYear) == 2022){

            validateSchema = schemaSaludaPreFirstMonth;
            }
            else if(parseInt(DealMonth) <=8 && parseInt(DealYear) == 2022){
                validateSchema = schemaSaludaPreNextMonth;

            }
            else if(parseInt(DealMonth) == 9 && parseInt(DealYear) == 2022){
                validateSchema = schemaSaludaPreSeptMonth;

            }
            else if(parseInt(DealMonth) == 10 && parseInt(DealYear) == 2022){
                validateSchema = schemaSaludaPreOctMonth;

            }
            else{
                validateSchema = schemaSaludaPreDecMonth;

            }

        }
        else if (dealTypeMain == "MFA") {
            if ((parseInt(DealMonth) <= 5 && parseInt(DealYear) == 2022) || parseInt(DealYear) == 2021) {

            validateSchema = schemamfaFirstMonth;
            }
            else{
                validateSchema = schemamfaNextMonth;

            }

        }
        else if (dealTypeMain == "Setpoint") {
            if ((parseInt(DealMonth) <= 5 && parseInt(DealYear) == 2022) || parseInt(DealYear) == 2021) {


            validateSchema = schemaSetpointFirstMonth;
            }
            else{
                validateSchema = schemaSetpointNextMonth;

            }

        }
        else if (dealTypeMain == "Saluda BC2") {

            validateSchema = schemaBc2FirstMonth;

        }
        else if (dealTypeMain == "Saluda Builders") {

            validateSchema = schemaBuildersFirstMonth;

        }
        else if (dealTypeMain == "NPL") {

            validateSchema = schemaNPLFirstMonth;

        }
        else if (dealTypeMain == "Stoa 2022") {

            validateSchema = schemaStoa2022FirstMonth;

        }
        else if (dealTypeMain == "Unlock") {

            validateSchema = schemaUnlockFirstMonth;

        }
        this.setState({ validateSchema: validateSchema, ValidateMonthlyInputStateLoader: false })
    }


    onFormChanged = (value) => {
        console.log("onFormChanged", value)
        this.setState({ formData: value.formData, ValidateMonthlyInputStateLoader: false })
        // alert("onFormChanged")
        this.Validateschemamethod(value.formData.month, value.formData.year)
        // if (this.state.formData.month == value.formData.month) {      
        //   this.nextPaymentDate(value.formData.month)
        // } else {

        // }


    }
    async componentWillReceiveProps(nextProps) {
        console.log("nextProps", nextProps)
        let DealId = nextProps.match.params.DealId;
        let DealMonth = nextProps.match.params.DealMonth;
        let DealYear = nextProps.match.params.DealYear;
        this.callMethod(DealId, DealMonth, DealYear);
        this.Validateschemamethod(DealMonth, DealYear)

        this.setState({ fields: [] })

        // fields: [],
        if (!DealId && !DealMonth && !DealYear) {

        } else {
            this.setState({ formData: { dealId: DealId, month: DealMonth.toString(), year: DealYear.toString() } })
            this.servicerdata(DealId, DealMonth, DealYear)
        }
    }


    callMethod(DealId, DealMonth, DealYear) {
        const formData = {
            dealId: DealId,
            month: DealMonth,
            year: DealYear
        }

        this.setState({ formData: formData })
        const DealType = this.state.DealType;
        this.GetAllDeals(DealType)
    }

    GetAllDeals = async (DealType) => {


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

    handleChange(MainJSON, key) {
        console.log(MainJSON)
        console.log(key)
        //   console.log(e.target.name)
        // console.log(e.target.value)
        const ValidateMonthlyInputState = this.state.ValidateMonthlyInputState;
        ValidateMonthlyInputState[key] = MainJSON.value;
        this.setState({
            ValidateMonthlyInputState,
        });
        // const ValidateMonthlyInputState = this.state.ValidateMonthlyInputState;
        // ValidateMonthlyInputState[e.target.name] = e.target.value;
        // this.setState({
        //     ValidateMonthlyInputState,
        // });

        console.log('ValidateMonthlyInputState', this.state.ValidateMonthlyInputState);
        // this.setState({ValidateMonthlyInputState:ValidateMonthlyInputState})

    }



    onSubmit = async (value) => {

        this.setState({ formData: value.formData })
        this.props.history.push("/report/" + this.state.DealType + "/validate-monthly-inputs/" + value.formData.dealId + "/" + value.formData.month + "/" + value.formData.year);

        let data = value.formData;
        console.log(data);
        let dealId = data.dealId;
        let month = data.month;
        let year = data.year;
        await this.servicerdata(dealId, month, year)

        this.setState({ formData: { dealId: dealId, month: month, year: year }, report_loader: false })

    }


    async servicerdata(dealId, month, year) {
        this.setState({ report_loader: true, ValidateMonthlyInputStateLoader: false })
        const DealType = this.state.DealType;
        let channelname = this.state.channelname;
        const APIResponse = await ValidateMonthlyInput(DealType, dealId, month, year, channelname)

        this.setState({ report_loader: false })
        if (APIResponse.status == 204) {
            const message = "Data Not Available";
            this.props.enqueueSnackbar(message, {
                variant: 'error',
                autoHideDuration: 4000,
            });

        }
        else if (APIResponse != null) {
            console.log("ValidateMonthlyInput", APIResponse)
            let ValidateMonthlyInputState = {}

            if (APIResponse.data.length != 0) {

                this.state.validateSchema.map((item) => {

                    // console.log("ValidateMonthlyInputState", JSON.stringify(item))
                    // console.log("ValidateMonthlyInputState",<NumberComp value={APIResponse.data[item.key].value1}></NumberComp>)
                    // ValidateMonthlyInputState.push({
                    //     [item.key + "_value1"]: APIResponse.data[item.key].value1
                    // })
                    console.log("============" + JSON.stringify(APIResponse.data[item.key]))
                    if (APIResponse.data[item.key].value1 != undefined) {
                        ValidateMonthlyInputState[item.key + "_value1"] = APIResponse.data[item.key].value1.length == 0 ? "0.00" : APIResponse.data[item.key].value1
                    }

                    if (APIResponse.data[item.key].value2 != undefined) {
                        ValidateMonthlyInputState[item.key + "_value2"] = APIResponse.data[item.key].value2.length == 0 ? "0" : APIResponse.data[item.key].value2
                    }






                })

            }
            console.log("ValidateMonthlyInputState", JSON.stringify(ValidateMonthlyInputState))
            this.setState({ ValidateMonthlyInputState: ValidateMonthlyInputState, ValidateMonthlyInputStateLoader: true })

        }

    }



    ValidateMonthlyInputDeals = async () => {

        this.setState({ ValidateMonthlyInputDealsLoader: true });

        var $table = $("#ValidationTable")
        var rows = []
        $table.find("tbody tr").each(function (i) {

            // alert($(this).find("td").length)

            var tdLength = $(this).find("td").length;
            var result = null
            if (tdLength == "3") {

                result = {
                    "key": $(this).find("td").text(),
                    "value": $(this).find("td:nth-child(3) input").val().replace(/,/g, ''),
                    "value1": $(this).find("td:nth-child(2) input").val().replace(/,/g, ''),
                }

            } else {
                result = {
                    "key": $(this).find("td").text(),
                    "value": $(this).find("td input").val().replace(/,/g, ''),
                }
            }

            // var key = "key"+":"+$(this).find("th").html();
            //     value = "value"+":"+$(this).find("td input").val();
            // var result = {
            //     "key": $(this).find("td").html(),
            //     "value": $(this).find("td input").val(),
            // }

            console.log("result result ", result)
            // row = result;
            rows.push(result);
        });




        console.log("rows", JSON.stringify(rows))





        let data = {
            "dealId": this.state.formData.dealId,
            "input": rows,
            "month": this.state.formData.month,
            "peers": this.state.peers,
          
            "year": this.state.formData.year,
            "channelname": this.state.channelname
        }

        console.log("data", data)
        // UpdateValidateMonthlyInput

        let DealType = this.state.DealType
        const APIResponse = await UpdateValidateMonthlyInput(DealType, data)
        console.log("UpdateValidateMonthlyInput", APIResponse)
        console.log("SaveCustomizeReportAPI", APIResponse.data.isSuccess)
        if (APIResponse.data.isSuccess == true) {
            const message = "Data Saved Successfully!";
            this.props.enqueueSnackbar(message, {
                variant: 'info',
                autoHideDuration: 4000,
            });
            let month = this.state.formData.month;
            let year = this.state.formData.year;
            this.props.history.push("/report/" + this.state.DealType + "/view-servicer-blockchain-data/" + this.state.formData.dealId + "/" + month + "/" + year);
        } else {
            const message = "Data  not Saved Successfully!";
            this.props.enqueueSnackbar(message, {
                variant: 'error',
                autoHideDuration: 4000,
            });
        }
        this.setState({ ValidateMonthlyInputDealsLoader: false })

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
                                        {/* {JSON.stringify(this.state.validateSchema)} */}
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

                                                        Validate

                                                        {this.state.report_loader === true ? (
                                                            <CircularProgress size='25px' color='primary' />
                                                        ) : (
                                                                ''
                                                            )}

                                                    </Button>
                                                    {this.state.ValidateMonthlyInputStateLoader == true ?
                                                <Button variant='contained' color='primary' onClick={this.ValidateMonthlyInputDeals}  style={{float:"right", marginLeft:"10px"}}>
                                                    {this.state.ValidateMonthlyInputDealsLoader === true ? (
                                                        <CircularProgress size='25px' color='primary' />
                                                    ) : (
                                                            ''
                                                        )} Onboard to Network </Button>
                                                : ''}
                                                    <div className="col-md-1">
                                                        <Button variant="outlined" color="primary" onClick={this.proceed}>Next</Button>
                                                    </div>

                                                </div>
                                            </Form>
                                            : <Loader></Loader>}
                                    </div>
                                </div>
                            </div>

                            {this.state.ValidateMonthlyInputState.length !== 0 ?
                                <div className="row">
                                    <div className="col-md-12">
                                        <div class="twocolform">
                                        {/* {this.state.ValidateMonthlyInputStateLoader == true ?
                                                <Button variant='contained' color='primary' onClick={this.ValidateMonthlyInputDeals}  style={{float:"right", marginBottom:"10px"}}type='submit'>
                                                    {this.state.ValidateMonthlyInputDealsLoader === true ? (
                                                        <CircularProgress size='25px' color='primary' />
                                                    ) : (
                                                            ''
                                                        )} Onboard to Network </Button>
                                                : ''} */}
                                            <table className="table table-bordered text-left" id="ValidationTable">
                                                <tbody>
                                                    {/* {JSON.stringify(this.state.ValidateMonthlyInputState)} */}

                                                    {this.state.ValidateMonthlyInputStateLoader == true ?
                                                        this.state.validateSchema.length != 0 ?
                                                            this.state.validateSchema.map((item) => {
                                                                return (
                                                                    <React.Fragment>
                                                                        <tr>
                                                                            <td>{item.title}</td>
                                                                            {item.value2 == undefined ? '' :
                                                                                <td>
                                                                                    <CurrencyFormat className="form-control" thousandSeparator={','} onValueChange={(e) => this.handleChange(e, item.key + "_value2")} decimalSeparator={'.'} value={this.state.ValidateMonthlyInputState[item.key + "_value2"]} />

                                                                                    {/* <input name={item.key + "_value2"} type="text" onChange={this.handleChange} className="form-control" value={this.state.ValidateMonthlyInputState[item.key + "_value2"]} /> */}
                                                                                </td>
                                                                            }
                                                                            {item.value1 == undefined ? '' :
                                                                                <td>
                                                                                    <CurrencyFormat className="form-control" thousandSeparator={','} decimalSeparator={'.'} onValueChange={(e) => this.handleChange(e, item.key + "_value1")} value={this.state.ValidateMonthlyInputState[item.key + "_value1"]} />
                                                                                    {/* <input name={item.key + "_value1"} type="text" onChange={this.handleChange} className="form-control" value={this.state.ValidateMonthlyInputState[item.key + "_value1"]} /> */}
                                                                                </td>
                                                                            }

                                                                        </tr>
                                                                    </React.Fragment>
                                                                );
                                                            })
                                                            : ''
                                                        : ''
                                                    }
                                                </tbody>
                                            </table>
                                            {/* {this.state.ValidateMonthlyInputStateLoader == true ?
                                                <Button variant='contained' color='primary' onClick={this.ValidateMonthlyInputDeals} type='submit'>
                                                    {this.state.ValidateMonthlyInputDealsLoader === true ? (
                                                        <CircularProgress size='25px' color='primary' />
                                                    ) : (
                                                            ''
                                                        )} Onboard to Network </Button>
                                                : ''} */}
                                        </div>
                                    </div>
                                </div>
                                : ''
                            }
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default withSnackbar(DyanamicValidateMonthlyInput)

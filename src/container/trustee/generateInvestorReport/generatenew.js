import React, { Component } from 'react';
import Header from '../../../components/header';
import Sidebar from '../../../components/sidebar';
import Button from '@material-ui/core/Button';
import { withTheme } from 'react-jsonschema-form';
import { Theme as MuiTheme, Fields } from 'rjsf-material-ui';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import { widgets, CustomFieldTemplate, customStyles, ObjectFieldTemplate } from '../../../components/customscripts/customscript'
import { withSnackbar } from 'notistack';
import LinearLoader from '../../../components/loader/LinearLoader';
import Loader from '../../../components/loader';
import { InvestorList, GetAllDeals, generateYears, months, AdjustmentMonth, getbegbal, getservicerdata, savecategory, savecollateralactivity, GetTableNames, AdjustmentCondition, OpenForm, EnableDisable, Prompt, GenerateReport, GetAdditionalDetails } from '../../../servies/services';
import DataDictionary from '../../../components/DataDictionary';
import ReactSelect from "react-select";
import MySelect from "./MySelect.js";
import { components } from "react-select";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Switch from '@material-ui/core/Switch';
import $ from 'jquery';
import CurrencyFormat from 'react-currency-format';
import NumberComp from '../../../components/NumberComp';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            isNumericString
            // decimalScale={2}
        />
    );
});

NumberFormatCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};
const Form = withTheme(MuiTheme);
const schema1 = require('./schema1.json');

const LimaSchema = require('./LimaSchema.json');
const BawagSchema = require('./BawagSchema.json');

const SaludaSchema = require('./SaludaSchema.json');
const SaludaSchema2 = require('./SaludaSchema2.json');


const SaludagradeSchema = require('./SaludagradeSchema.json');
const SaludagradeSchema2 = require('./SaludagradeSchema2.json');


const SaludaSeqSchema = require('./SaludaSeqSchema.json');
const SaludaSeqSchema2 = require('./SaludaSeqSchema2.json');


const AlphaflowSchema = require('./AlphaflowSchema.json');
const AlphaflowSchema2 = require('./AlphaflowSchema2.json');

const Fig2Schema = require('./Fig2Schema.json');
const Fig2Schema2 = require('./Fig2Schema2.json');

const Bc1Schema = require('./Bc1Schema.json');
const Bc1Schema2 = require('./Bc1Schema2.json');

const ReigoSchema = require('./ReigoSchema.json');
const ReigoSchema2 = require('./ReigoSchema2.json');

const Saludawl1Schema = require('./Saludawl1Schema.json');
const Saludawl1Schema2 = require('./Saludawl1Schema2.json');

const DominionSchema = require('./DominionSchema.json');
const DominionSchema2 = require('./DominionSchema2.json');

const SprucehillSchema = require('./SprucehillSchema.json')
const SprucehillSchema2 = require('./SprucehillSchema2.json')

const Saludartl1Schema = require('./Saludartl1Schema.json');
const Saludartl1Schema2 = require('./Saludartl1Schema2.json');

const StoaSchema = require('./StoaSchema.json');
const StoaSchema2 = require('./StoaSchema2.json');

const TildeneSchema = require('./TildeneSchema.json')

const Saludamf1Schema = require('./Saludamf1Schema.json');
const Saludamf1Schema2 = require('./Saludamf1Schema2.json');

const PalisadesSchema = require('./PalisadesSchema.json');
const PalisadesSchema2 = require('./PalisadesSchema2.json');

const Saludartl2Schema = require('./Saludartl2Schema.json');
const Saludartl2Schema2 = require('./Saludartl2Schema2.json');


const MfaSchema = require('./MfaSchema.json');
const MfaSchema2 = require('./Mfademoschema.json');

const SaludapreSchema = require('./SaludapreSchema.json');
const SaludapreSchema2 = require('./SaludapreSchema2.json');

const SetpointSchema2 = require('./SetpointSchema2.json');

const Bc2Schema2 = require('./Bc2Schema2.json');

const BuildersSchema2 = require('./BuildersSchema2.json');
const NPLSchema2 = require('./NPLSchema.json');
const Stoa2022Schema2 = require('./Stoa2022Schema2.json');

const UnlockSchema2 = require('./UnlockSchema2.json');


Number.prototype.noExponents = () => {
    var data = String(this).split(/[eE]/);
    if (data.length == 1) return data[0];

    var z = '',
        sign = this < 0 ? '-' : '',
        str = data[0].replace('.', ''),
        mag = Number(data[1]) + 1;

    if (mag < 0) {
        z = sign + '0.';
        while (mag++) z += '0';
        return z + str.replace(/^\-/, '');
    }
    mag -= str.length;
    while (mag--) z += '0';
    return str + z;
}

// SaludaSeqSchema.json
const uiDateSchema = {



    "nextpaymentdate": {
        "ui:widget": "date",
        "ui:options": {
            "inline": true
        }
    },
    "newlogic": {

        "ui:help": "(Any new change in the trustee report)"
    },
    "investorid": {

        "ui:help": "(Select the investor id for which this report needs to be published)"
    }

}

const uiSchemaSprucehill = {

    // "distributiondate": {
    //   "ui:widget": "date",
    //   "ui:options": {
    //     "inline": true
    //   }
    // },
    "nextpaymentdate": {
        "ui:widget": "date",
        "ui:options": {
            "inline": true
        }
    },
    "recorddate": {
        "ui:widget": "date",
        "ui:options": {
            "inline": true
        }
    },
    "newlogic": {

        "ui:help": "(Any new change in the trustee report)"
    },
    "investorid": {

        "ui:help": "(Select the investor id for which this report needs to be published)"
    }
}
const uiDateBawagSchema = {

    "distributiondate": {
        "ui:widget": "date",
        "ui:options": {
            "inline": true
        }
    },


    "nextinterestpaymentdate": {
        "ui:widget": "date",
        "ui:options": {
            "inline": true
        }
    },
    "newlogic": {

        "ui:help": "(Any new change in the trustee report)"
    },
    "investorid": {

        "ui:help": "(Select the investor id for which this report needs to be published)"
    }

}

const uiSchemaLima = {
    dealId: {
        classNames: "task-title foo-bar"
    },
    servicingexpenses: {
        "ui:readonly": true
    },
    backupexpenses: {
        "ui:readonly": true
    },
    documentexpenses: {
        "ui:readonly": true
    },
    payingagentexpenses: {
        "ui:readonly": true
    }

};
const uiSchema2 = {
    dealId: {
        classNames: "task-title foo-bar"
    },
    servicingexpenses: {
        "ui:readonly": false
    },
    backupexpenses: {
        "ui:readonly": false
    },
    documentexpenses: {
        "ui:readonly": false
    },
    payingagentexpenses: {
        "ui:readonly": false
    }

};

// let dealTypeMain = localStorage.getItem('DealType');
// let schema = null
// if (dealTypeMain == "LimaOne") {
//   schema = LimaSchema;
// }

let dealTypeMain = localStorage.getItem('DealType');
let schema = null;
let uiSchema = null;
let formData = null;
// if (dealTypeMain == "LimaOne") {
//   schema = LimaSchema;
//   uiSchema = uiDateSchema;
//   // formData = formDataLima;
// } else if (dealTypeMain == "Bawag") {
//   schema = BawagSchema;
//   uiSchema = uiDateBawagSchema;
//   // formData = formDataBawag;
// } else if (dealTypeMain == "Saluda PAC1") {
//   schema = SaludaSchema;
//   uiSchema = uiDateSchema;
//   // formData = formDataSaluda;
// } else if (dealTypeMain == "Saluda FIG1") {
//   schema = SaludagradeSchema;
//   uiSchema = uiDateSchema;
//   // formData = formDataSaluda;
// } else if (dealTypeMain == "Saluda SEQ1") {
//   schema = SaludaSeqSchema;
//   uiSchema = uiDateSchema;
//   // formData = formDataSaludaGrade;
// }
// else if (dealTypeMain == "AlphaFlow") {
//   schema = AlphaflowSchema;
//   uiSchema = uiDateSchema;
//   // formData = formDataSaludaGrade;
// }
// else if (dealTypeMain == "Saluda FIG2") {
//   schema = Fig2Schema;
//   uiSchema = uiDateSchema;
//   // formData = formDataSaludaGrade;
// }
// else if (dealTypeMain == "Saluda BC1") {
//   schema = Bc1Schema;
//   uiSchema = uiDateSchema;
//   // formData = formDataSaludaGrade;
// }
// else if (dealTypeMain == "Reigo") {
//   schema = ReigoSchema;
//   uiSchema = uiDateSchema;
//   // formData = formDataSaludaGrade;
// }
// else if (dealTypeMain == "Saluda WL1") {
//   schema = Saludawl1Schema;
//   uiSchema = uiDateSchema;
//   // formData = formDataSaludaGrade;
// }
// else if (dealTypeMain == "Dominion") {
//   schema = DominionSchema;
//   uiSchema = uiDateSchema;
//   // formData = formDataSaludaGrade;
// }
// else if (dealTypeMain == "Spruce Hill") {
//   schema = SprucehillSchema;
//   uiSchema = uiSchemaSprucehill;
//   // formData = formDataSaludaGrade;
// }
// else if (dealTypeMain == "Saluda RTL1") {
//   schema = Saludartl1Schema;
//   uiSchema = uiDateSchema;
//   // formData = formDataSaludaGrade;
// }
// else if (dealTypeMain == "Stoa 2021") {
//   schema = StoaSchema;
//   uiSchema = uiDateSchema;
//   // formData = formDataSaludaGrade;
// }
// else if (dealTypeMain == "Tildene") {
//   schema = TildeneSchema;
//   uiSchema = uiDateSchema;
//   // formData = formDataSaludaGrade;
// }
// else if (dealTypeMain == "Saluda MF1") {
//   schema = Saludamf1Schema;
//   uiSchema = uiDateSchema;
//   // formData = formDataSaludaGrade;
// }
// else if (dealTypeMain == "Palisades") {
//   schema = PalisadesSchema;
//   uiSchema = uiDateSchema;
//   // formData = formDataSaludaGrade;
// }
// else if (dealTypeMain == "Saluda RTL2") {
//   schema = Saludartl2Schema;
//   uiSchema = uiDateSchema;
//   // formData = formDataSaludaGrade;
// }
const customStyle = {
    option: (provided, state) => ({
        ...provided,
        // minHeight: 20,
        // height: 20,
        color: state.isSelected ? 'black' : 'black',
        backgroundColor: state.isSelected ? "#eee" : "#fff",

        padding: 2,
    }),
    control: (base, state) => ({
        ...base,
        height: 58,
        minHeight: 58,
        // marginRight: '',
        boxShadow: '#144e4a', // no box-shadow

        fontWeight: 'bold',
        // borderColor: state.isSelected ? "grey" : "grey",
        border: '1px solid grey',
        // borderStyle: 'solid',
        "&:hover": {
            borderColor: "#144e4a"
        }

    })
};

const Option = (props) => {
    return (
        <div>
            <components.Option {...props}>
                <input
                    className="checkcolor"
                    type="checkbox"
                    checked={props.isSelected}
                    onChange={() => null}
                />{" "}
                <label className="setup">{props.label}</label>
            </components.Option>
        </div>
    );
};
const allOption = {
    label: "Select all",
    value: "*"
};
const ValueContainer = ({ children, ...props }) => {
    const currentValues = props.getValue();
    let toBeRendered = children;
    if (currentValues.some(val => val.value === allOption.value)) {
        toBeRendered = [[children[0][0]], children[1]];
    }

    return (
        <components.ValueContainer {...props}>
            {toBeRendered}
        </components.ValueContainer>
    );
};

const MultiValue = props => {
    let labelToBeDisplayed = `${props.data.label} `;
    if (props.data.value === allOption.value) {
        labelToBeDisplayed = "All is selected";
    }
    return (
        <components.MultiValue {...props}>
            <span>{labelToBeDisplayed}</span>
        </components.MultiValue>
    );
};
class generateInvestorReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schema: [],
            schema1: schema1,
            schemaLoader: false,
            years: generateYears(),
            months: months,
            getLoansLoader: false,
            open: false,
            uiSchema: [],
            formData1: {},
            pageTitle: "Generate Trustee Report",
            investorLoader: false,
            DealType: localStorage.getItem('DealType'),
            token: localStorage.getItem('token'),
            formData: {
                dealId: null,
                month: null,
                year: null,

            },
            generatebutton: false,
            all_deals: JSON.parse(localStorage.getItem("all_deals")),
            channelname: localStorage.getItem('ChannelName'),
            nextPaymentDateLoader: false,
            report_loader: false,
            FormRender: false,
            processorarrray: null,
            processoroption: [],
            GetTableNames: [],
            getfieldloader: false,
            fields: {
                tablename: null,
                // category: null,
                begbal: null,
                begbal1: null,
                hashcount: null,
                hashcount1: null,
                deferredbalance: null,
            },
            AdditionalFields: {
                relationshipmanager: "",
                address: "",
                email: "",
                websitereporting: "",
                addtionalfirst: "",
                additionallast: "",
                newlogic: "true"
            },
            tableData: [{
                "key": "Z-SXV_CURT1",
                "value1": "RREI",
                "value2": "Underlying exposures information section",

            }, {
                "key": "Z-SXV_CURT1",
                "value1": "RREI",
                "value2": "Underlying exposures information section",

            }, {
                "key": "Z-SXV_CURT1",
                "value1": "RREI",
                "value2": "Underlying exposures information section",

            }, {
                "key": "Z-SXV_CURT1",
                "value1": "RREI",
                "value2": "Underlying exposures information section",

            }, {
                "key": "Z-SXV_CURT1",
                "value1": "RREI",
                "value2": "Underlying exposures information section",

            }],
            showTable: false,
            DisplayTable: true,
            row: "",
            NewChanges: false,
            getservicerdatabtn: true
        };
        this.FieldChange = this.FieldChange.bind(this);
        this.AdditonalFieldChange = this.AdditonalFieldChange.bind(this);

    }

    // handleChange = (event) => {
    //   const { formData1 } = this.state;
    //   formData1[event.target.name] = event.target.value;
    //   this.setState({ formData1 });
    //   console.log(formData1);

    // }
    AdditonalFieldChange(e) {
        const AdditionalFields = this.state.AdditionalFields;
        AdditionalFields[e.target.name] = e.target.value;

        this.setState({
            AdditionalFields,
        });

        console.log('fields', this.state.AdditionalFields);

    }
    FieldChange(e) {
        const fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.getbegbal(fields);
        this.setState({
            fields,
            Shrink: true,
            showTable: false
        });

        console.log('fields', this.state.fields);

    }
    getbegbal = async (fields) => {
        console.log("getbegbal", fields)
        var data = {};
     
        data.peers = JSON.parse(localStorage.getItem("peers"));
        data.dealId = this.state.formData.dealId;
        data.isInitialAccrualPeriod = this.state.formData.isInitialAccrualPeriod;
        data.year = this.state.formData.year;
        data.month = this.state.formData.month;
        data.tablename = fields.tablename;
        this.setState({ getservicerdatabtn: true })

        // data.channelname=this.props.channelname;
        // Restrict api
        // this.setState({ report_loader: true, standard_box: false })

        const APIResponse = await getbegbal(this.state.DealType, data)
        if (APIResponse != null) {
            this.setState({ getservicerdatabtn: false })

            console.log("restrictdefn", APIResponse)
            if (APIResponse.status == 204) {
                // this.setState({ form_loader: false })
                const message = "Missing Parameter or No content";
                this.props.enqueueSnackbar(message, {
                    variant: 'error',
                    autoHideDuration: 4000,
                });
            }
            else if (APIResponse.status == 400) {


                const message = "Missing Parameter!";
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
                if (result.isSuccess == false) {
                    const message = "Enter correct deal, month, year & accural period to get beginning balance ";
                    this.props.enqueueSnackbar(message, {
                        variant: 'error',
                        autoHideDuration: 4000,
                    });
                }
                else if (result.status == 1) {
                    const message = "Missing arguments!";
                    this.props.enqueueSnackbar(message, {
                        variant: 'error',
                        autoHideDuration: 4000,
                    });
                }
                else {
                    console.log("result", result)
                    var a = this.state.fields;
                    // var a;
                    if (this.state.DealType == "Spruce Hill") {
                        if (data.tablename == "COLLATERAL BALANCE") {

                            a.begbal = result.beginningbalance
                            a.begbal1 = result.beginningbalance1
                            a.hashcount = result.count
                            a.hashcount1 = result.count1
                            console.log("AA", a.begbal)
                        }
                        else {
                            a.begbal = result.beginningbalance
                            a.begbal1 = result.beginningbalance1
                            a.hashcount = undefined
                            a.hashcount1 = undefined
                            console.log("A", a)
                        }
                    }
                    else if (this.state.DealType == "NPL") {
                        if (data.tablename == "COLLATERAL BALANCE") {

                            a.begbal = result.beginningbalance
                            a.begbal1 = result.beginningbalance1
                            a.hashcount = result.count
                            a.hashcount1 = result.count1
                            a.deferredbalance = result.deferredbalance
                            console.log("AAA", a.deferredbalance)
                        }
                        else {
                            a.begbal = result.beginningbalance
                            a.begbal1 = result.beginningbalance1
                            a.hashcount = undefined
                            a.hashcount1 = undefined
                            a.deferredbalance =undefined
                            console.log("A", a)
                        }
                    }
                    else if (this.state.DealTYpe == "SetPoint") {
                        if(data.tablename == "Principle Remittance"){

                        }

                    }
                    else {
                        a.begbal = result.beginningbalance
                        a.hashcount = result.count
                        a.begbal1 = undefined
                        a.hashcount1 = undefined
                        console.log("AB", a.begbal)
                    }
                    this.setState({ fields: a })

                }
            }
        }
    }

    handleChange = (selected) => {
        this.setState({
            processorarrray: selected
        });
        console.log('selecteddd', selected)
    };
    proceed = () => {
        if (this.props.match.params.DealId != "null" && this.props.match.params.DealId != undefined && this.props.match.params.DealMonth != "null" && this.props.match.params.DealMonth != undefined && this.props.match.params.DealYear != "null" && this.props.match.params.DealYear != undefined) {
            this.props.history.push("/report/" + this.state.DealType + "/customize-investor-report/" + this.props.match.params.DealId + "/" + this.props.match.params.DealMonth + "/" + this.props.match.params.DealYear);
        }
        else {
            this.props.history.push("/report/" + this.state.DealType + "/customize-investor-report/" + this.state.formData.dealId + "/" + this.state.formData.month + "/" + this.state.formData.year);
        }
    }



    async componentDidMount() {
        if (localStorage.getItem("token") == "" || localStorage.getItem("token") == undefined) {
            window.location.assign("/")
        }
        const DealId = this.props.match.params.DealId;
        const DealMonth = this.props.match.params.DealMonth;
        const DealYear = this.props.match.params.DealYear;
        // console.log("dealid", dealid)
        const DealType = this.state.DealType;
        this.selectSchema(DealId, DealMonth, DealYear, DealType)
        // this.GetAdditionalDetails( DealType,DealId, DealMonth, DealYear)
        console.log("schema", schema)
        let formData = {
            dealId: DealId,
            month: DealMonth,
            year: DealYear,

        }

        this.setState({ formData: formData })
        let fields = {
            tablename: null,
            // category: null,
            begbal: null,
            hashcount: null,
            deferredbalance: null
        }
        this.setState({ fields: fields })

    }



    async componentWillReceiveProps(nextProps) {
        console.log("nextProps", nextProps)

        const DealId = this.props.match.params.DealId;
        const DealMonth = this.props.match.params.DealMonth;
        const DealYear = this.props.match.params.DealYear;
        const DealType = this.state.DealType;
        this.selectSchema(DealId, DealMonth, DealYear, DealType);
        // this.GetAdditionalDetails( DealType,DealId, DealMonth, DealYear)

        let formData = {
            dealId: DealId,
            month: DealMonth,
            year: DealYear,

        }

        this.setState({ formData: formData })

        // this.callMethod(DealId, DealMonth, DealYear);
        let fields = {
            tablename: null,
            // category: null,
            begbal: null,
            hashcount: null,
            deferredbalance: null
        }
        this.setState({ fields: fields })
    }
    callMethod(DealId, DealMonth, DealYear) {

        let DealType = this.state.DealType
        this.GetAllDeals(DealType)
        this.nextPaymentDate(DealMonth)
    }

    // AdjustmentMonth = async (DealType) => {
    //   const selectedMonth = this.state.formData.month;
    //   if (selectedMonth == "5") {
    //     this.setState({ uiSchema: uiSchema2 })
    //   }
    //   else {
    //     this.setState({ uiSchema: LimaSchema })
    //   }
    // }


    onBlur = async (value) => {
        console.log("onBlur", value)
    }

    onFormChanged1 = (value) => {
        let DealType = this.state.DealType
        console.log("onFormChanged", value.formData)
        // console.log("onFormChanged", value.formData.nextpaymentdate)
        this.setState({ formData1: value.formData })
        // alert("onFormChanged")
        // this.nextPaymentDate(value.formData.month)
        // this.GetAdditionalDetails(DealType,value.formData.dealId, value.formData.month, value.formData.year)

        //   if (this.state.formData.newlogic == value.formData.newlogic) {      
        //  this.newlogic();
        //   } else {

        //   }





    }
    onFormChanged = (value) => {
        let DealType = this.state.DealType
        console.log("onFormChanged", value.formData)
        console.log("onFormChanged", value.formData.nextpaymentdate)
        this.setState({ formData: value.formData })
        // alert("onFormChanged")
        // this.nextPaymentDate(value.formData.month)
        // this.GetAdditionalDetails(DealType,value.formData.dealId, value.formData.month, value.formData.year)

        //   if (this.state.formData.newlogic == value.formData.newlogic) {      
        //  this.newlogic();
        //   } else {

        //   }





    }

    nextPaymentDate = (month) => {
        // let formData = this.state.formData
        // console.log("this.state.schema.properties.distributiondate.default", this.state.schema.properties.distributiondate.default +"-------"+this.state.formData.distributiondate);
        // this.setState({ nextPaymentDateLoader: false })

        // // distributiondate

        // let updateddistributiondate
        // if (month == undefined) {
        //   let fullDate = this.state.schema.properties.distributiondate.default;
        //   let getMonth = new Date(fullDate);
        //   let monthFromSchema = getMonth.getMonth() + 1;
        //   let day = getMonth.getDate();
        //   let year = getMonth.getFullYear();
        //   console.log("date getMonth", getMonth)
        //   console.log("date", monthFromSchema + "--------------" + day + "--------------" + year)
        //   updateddistributiondate = monthFromSchema + "/" + day + "/" + year;
        // }
        // else {

        //   let fullDate = this.state.schema.properties.distributiondate.default;
        //   let getMonth = new Date(fullDate);
        //   let monthFromSchema = month
        //   let day = getMonth.getDate();
        //   let year = getMonth.getFullYear();
        //   console.log("date getMonth", getMonth)
        //   console.log("date", monthFromSchema + "--------------" + day + "--------------" + year)
        //   updateddistributiondate = monthFromSchema + "/" + day + "/" + year;

        // }



        // // let curyear = new Date();
        // // let myselectMonthDate = parseInt(updatedMonth)

        // let nextpaymentdate
        // let distributiondate
        // if (this.state.DealType == "Bawag") {
        //   nextpaymentdate = updateddistributiondate;
        //   distributiondate = updateddistributiondate;
        // }
        // else {
        //   nextpaymentdate = updateddistributiondate;
        //   distributiondate = updateddistributiondate;
        // }

        // formData.nextpaymentdate = nextpaymentdate
        // formData.distributiondate = distributiondate

        this.setState({ nextPaymentDateLoader: true });
        // console.log("updateddistributiondate", updateddistributiondate + "------------" + formData.distributiondate)
        // this.setState({ formData })
        // console.log("nextPaymentDate after", this.state.formData);

    }


    // onChange = async (value) => {
    //   const selectedMonth = value.formData.month;
    //   if (selectedMonth == "5") {
    //     this.setState({ uiSchema: uiSchema2 })
    //   }
    //   else {
    //     this.setState({ uiSchema: LimaSchema })
    //   }




    // }




    selectSchema = (DealId, DealMonth, DealYear, DealType) => {


        // thisgetservicerdatasetState({ schema: LimaSchema, uiSchema: uiSchemaLima, schemaLoader: true });
        this.callMethod(DealId, DealMonth, DealYear);
        // this.InvestorList(DealType);
        // this.GetAdditionalDetails(DealType,DealId, DealMonth, DealYear)

        // this.setState({ schema: SaludagradeSchema, uiSchema: uiSchemaLima, schemaLoader: true });
        // this.callMethod(DealId, DealMonth, DealYear);
        // this.InvestorList(DealType);





    }
    GetAdditionalDetails = async (DealType, DealId, DealMonth, DealYear) => {
        const APIResponse = await GetAdditionalDetails(DealType, DealId, DealMonth, DealYear)
        if (APIResponse !== null) {
            console.log("InvestorList", APIResponse.data);
            if (APIResponse.data.relationshipmanager != undefined) {
                var data = this.state.AdditionalFields
                data.relationshipmanager = APIResponse.data.relationshipmanager;
                data.address = APIResponse.data.address;
                data.email = APIResponse.data.email;
                data.websitereporting = APIResponse.data.websitereporting;
                // data.additionalDetailsTemplate["additionalfirst"] = APIResponse.data.websitereporting;
                // data.additionalDetailsTemplate["additionallast"] = APIResponse.data.websitereporting;

                this.setState({ AdditionalFields: data })
                console.log("AFTER API ADDTIONAL", data)
            }
        }
    };

    InvestorList = async (DealType) => {

        const APIResponse = await InvestorList(DealType)
        if (APIResponse !== null) {
            console.log("InvestorList", APIResponse.data);
            this.setState({ InvestorList: APIResponse.data });
            let UserID = []
            let UserName = []
            let y = []
            if (APIResponse.data.length !== 0) {
                APIResponse.data.forEach(function (key, value) {
                    console.log("key", key.UserID)
                    console.log("value", value)
                    // var obj = { name: key, label: key }
                    y.push({ label: key.UserName, value: key.UserID })
                    UserID.push(key.UserID);
                    UserName.push(key.UserName);
                });
            }

            console.log("APIResponse.data", APIResponse.data);
            console.log("yyyyyy", y);

            // let oldSchema = this.state.schema;
            // console.log("oldstagedata", oldSchema);
            // oldSchema.properties.investorid.enum = UserID;
            // oldSchema.properties.investorid.enumNames = UserName;
            // const newSchema = Object.assign({}, oldSchema);
            // console.log("WRITE oldSchema", newSchema);
            this.setState({ processoroption: y, investorLoader: true, report_loader: false });
        }

    };

    GetTableNames = async (DealType) => {

        const APIResponse = await GetTableNames(DealType)
        if (APIResponse !== null) {
            console.log("InvestorList", APIResponse.data);
            this.setState({ GetTableNames: APIResponse.data, getfieldloader: false });
            // let UserID = []
            // let UserName = []
            // let y = []
            // if (APIResponse.data.length !== 0) {
            //     APIResponse.data.forEach(function (key, value) {
            //         console.log("key", key.UserID)
            //         console.log("value", value)
            //         // var obj = { name: key, label: key }
            //         y.push({ label: key.UserName, value: key.UserID })
            //         UserID.push(key.UserID);
            //         UserName.push(key.UserName);
            //     });
            // }

            // console.log("APIResponse.data", APIResponse.data);
            // console.log("yyyyyy", y);

            // let oldSchema = this.state.schema;
            // console.log("oldstagedata", oldSchema);
            // oldSchema.properties.investorid.enum = UserID;
            // oldSchema.properties.investorid.enumNames = UserName;
            // const newSchema = Object.assign({}, oldSchema);
            // console.log("WRITE oldSchema", newSchema);
            // this.setState({ processoroption: y, investorLoader: true, report_loader: false });
        }

    };

    GetAllDeals = async (DealType) => {


        let all_deals = this.state.all_deals;
        let deal_name = [];
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
        let oldSchema = this.state.schema1;
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
        this.setState({ schema1: newSchema, loadingForm: true });

    };

    onSubmit1 = async () => {
        console.log("ONSUBMIT1")
        this.setState({ report_loader: true, DisplayTable: false, NewChanges: false, getfieldloader: true });
        let dealTypeMain = localStorage.getItem('DealType')
        let DealId = this.state.formData.dealId;
        let DealMonth = this.state.formData.month;
        let DealYear = this.state.formData.year;
        this.GetAdditionalDetails(dealTypeMain, DealId, DealMonth, DealYear)

        if ((parseInt(DealMonth) <= 4 && parseInt(DealYear) == 2022) || parseInt(DealYear) < 2022) {
            console.log("HIIIIIIIIIIIIII")
            this.setState({ FormRender: true, NewChanges: false })
            if (dealTypeMain == "LimaOne") {
                schema = LimaSchema;
                uiSchema = uiDateSchema;
                // formData = formDataLima;
            } else if (dealTypeMain == "Bawag") {
                schema = BawagSchema;
                uiSchema = uiDateBawagSchema;
                // formData = formDataBawag;
            } else if (dealTypeMain == "Saluda PAC1") {
                schema = SaludaSchema;
                uiSchema = uiDateSchema;
                // formData = formDataSaluda;
            } else if (dealTypeMain == "Saluda FIG1") {
                schema = SaludagradeSchema;
                uiSchema = uiDateSchema;
                // formData = formDataSaluda;
            } else if (dealTypeMain == "Saluda SEQ1") {
                schema = SaludaSeqSchema;
                uiSchema = uiDateSchema;
                // formData = formDataSaludaGrade;
            }
            else if (dealTypeMain == "AlphaFlow") {
                schema = AlphaflowSchema;
                uiSchema = uiDateSchema;
                // formData = formDataSaludaGrade;
            }
            else if (dealTypeMain == "Saluda FIG2") {
                schema = Fig2Schema;
                uiSchema = uiDateSchema;
                // formData = formDataSaludaGrade;
            }
            else if (dealTypeMain == "Saluda BC1") {
                schema = Bc1Schema;
                uiSchema = uiDateSchema;
                // formData = formDataSaludaGrade;
            }
            else if (dealTypeMain == "Reigo") {
                schema = ReigoSchema;
                uiSchema = uiDateSchema;
                // formData = formDataSaludaGrade;
            }
            else if (dealTypeMain == "Saluda WL1") {
                schema = Saludawl1Schema;
                uiSchema = uiDateSchema;
                // formData = formDataSaludaGrade;
            }
            else if (dealTypeMain == "Dominion") {
                schema = DominionSchema;
                uiSchema = uiDateSchema;
                // formData = formDataSaludaGrade;
            }
            else if (dealTypeMain == "Spruce Hill") {
                schema = SprucehillSchema;
                uiSchema = uiSchemaSprucehill;
                // formData = formDataSaludaGrade;
            }
            else if (dealTypeMain == "Saluda RTL1") {
                schema = Saludartl1Schema;
                uiSchema = uiDateSchema;
                // formData = formDataSaludaGrade;
            }
            else if (dealTypeMain == "Stoa 2021") {
                schema = StoaSchema;
                uiSchema = uiDateSchema;
                // formData = formDataSaludaGrade;
            }
            else if (dealTypeMain == "Tildene") {
                schema = TildeneSchema;
                uiSchema = uiDateSchema;
                // formData = formDataSaludaGrade;
            }
            else if (dealTypeMain == "Saluda MF1") {
                schema = Saludamf1Schema;
                uiSchema = uiDateSchema;
                // formData = formDataSaludaGrade;
            }
            else if (dealTypeMain == "Palisades") {
                schema = PalisadesSchema;
                uiSchema = uiDateSchema;
                // formData = formDataSaludaGrade;
            }
            else if (dealTypeMain == "Saluda RTL2") {
                schema = Saludartl2Schema;
                uiSchema = uiDateSchema;
                // formData = formDataSaludaGrade;
            }
            else if (dealTypeMain == "MFA") {
                schema = MfaSchema;
                uiSchema = uiDateSchema;
                // formData = formDataSaludaGrade;
            }
            else if (dealTypeMain == "Saluda PRE1") {
                schema = SaludapreSchema;
                uiSchema = uiDateSchema;
                // formData = formDataSaludaGrade;
            }
            else if (dealTypeMain == "Setpoint") {
                schema = SetpointSchema2;
                uiSchema = uiDateSchema;
                // formData = formDataSaludaGrade;
            }
            else if (dealTypeMain == "Saluda BC2") {
                schema = Bc2Schema2;
                uiSchema = uiDateSchema;
                // formData = formDataSaludaGrade;
            }
            else if (dealTypeMain == "Saluda Builders") {
                schema = BuildersSchema2;
                uiSchema = uiDateSchema;
                // formData = formDataSaludaGrade;
            }
            else if (dealTypeMain == "NPL") {
                schema = NPLSchema2;
                uiSchema = uiDateSchema;
                // formData = formDataSaludaGrade;
            }
            else if (dealTypeMain == "Stoa 2022") {
                schema = Stoa2022Schema2;
                uiSchema = uiDateSchema;
                // formData = formDataSaludaGrade;
            }
            else if (dealTypeMain == "Unlock") {
                schema = UnlockSchema2;
                uiSchema = uiDateSchema;
                // formData = formDataSaludaGrade;
            }
            this.setState({ schema: schema, uiSchema: uiSchema })
        }
        else {
            console.log("HIIIIIIIIIIIIII")
            this.setState({ FormRender: false, NewChanges: true, DisplayTable: true })
            if (dealTypeMain == "LimaOne") {
                schema = LimaSchema;
                uiSchema = uiDateSchema;
                // formData = formDataLima;
            } else if (dealTypeMain == "Bawag") {
                schema = BawagSchema;
                uiSchema = uiDateBawagSchema;
                // formData = formDataBawag;
            } else if (dealTypeMain == "Saluda PAC1") {
                schema = SaludaSchema2;
                uiSchema = uiDateSchema;
                // formData = formDataSaluda;
            } else if (dealTypeMain == "Saluda FIG1") {
                schema = SaludagradeSchema2;
                uiSchema = uiDateSchema;
                // formData = formDataSaluda;
            } else if (dealTypeMain == "Saluda SEQ1") {
                schema = SaludaSeqSchema2;
                uiSchema = uiDateSchema;
                // formData = formDataSaludaGrade;
            }
            else if (dealTypeMain == "AlphaFlow") {
                schema = AlphaflowSchema2;
                uiSchema = uiDateSchema;
                // formData = formDataSaludaGrade;
            }
            else if (dealTypeMain == "Saluda FIG2") {
                schema = Fig2Schema2;
                uiSchema = uiDateSchema;
                // formData = formDataSaludaGrade;
            }
            else if (dealTypeMain == "Saluda BC1") {
                schema = Bc1Schema2;
                uiSchema = uiDateSchema;
                // formData = formDataSaludaGrade;
            }
            else if (dealTypeMain == "Reigo") {
                schema = ReigoSchema2;
                uiSchema = uiDateSchema;
                // formData = formDataSaludaGrade;
            }
            else if (dealTypeMain == "Saluda WL1") {
                schema = Saludawl1Schema2;
                uiSchema = uiDateSchema;
                // formData = formDataSaludaGrade;
            }
            else if (dealTypeMain == "Dominion") {
                schema = DominionSchema2;
                uiSchema = uiDateSchema;
                // formData = formDataSaludaGrade;
            }
            else if (dealTypeMain == "Spruce Hill") {
                schema = SprucehillSchema2;
                uiSchema = uiSchemaSprucehill;
                // formData = formDataSaludaGrade;
            }
            else if (dealTypeMain == "Saluda RTL1") {
                schema = Saludartl1Schema2;
                uiSchema = uiDateSchema;
                // formData = formDataSaludaGrade;
            }
            else if (dealTypeMain == "Stoa 2021") {
                schema = StoaSchema2;
                uiSchema = uiDateSchema;
                // formData = formDataSaludaGrade;
            }
            else if (dealTypeMain == "Tildene") {
                schema = TildeneSchema;
                uiSchema = uiDateSchema;
                // formData = formDataSaludaGrade;
            }
            else if (dealTypeMain == "Saluda MF1") {
                schema = Saludamf1Schema2;
                uiSchema = uiDateSchema;
                // formData = formDataSaludaGrade;
            }
            else if (dealTypeMain == "Palisades") {
                schema = PalisadesSchema2;
                uiSchema = uiDateSchema;
                // formData = formDataSaludaGrade;
            }
            else if (dealTypeMain == "Saluda RTL2") {
                schema = Saludartl2Schema2;
                uiSchema = uiDateSchema;
                // formData = formDataSaludaGrade;
            }
            else if (dealTypeMain == "MFA") {
                schema = MfaSchema2;
                uiSchema = uiDateSchema;
                // formData = formDataSaludaGrade;
            }
            else if (dealTypeMain == "Saluda PRE1") {
                schema = SaludapreSchema2;
                uiSchema = uiDateSchema;
                // formData = formDataSaludaGrade;
            }
            else if (dealTypeMain == "Setpoint") {
                schema = SetpointSchema2;
                uiSchema = uiDateSchema;
                // formData = formDataSaludaGrade;
            }
            else if (dealTypeMain == "Saluda BC2") {
                schema = Bc2Schema2;
                uiSchema = uiDateSchema;
                // formData = formDataSaludaGrade;
            }
            else if (dealTypeMain == "Saluda Builders") {
                schema = BuildersSchema2;
                uiSchema = uiDateSchema;
                // formData = formDataSaludaGrade;
            }
            else if (dealTypeMain == "NPL") {
                schema = NPLSchema2;
                uiSchema = uiDateSchema;
                // formData = formDataSaludaGrade;
            }
            else if (dealTypeMain == "Stoa 2022") {
                schema = Stoa2022Schema2;
                uiSchema = uiDateSchema;
                // formData = formDataSaludaGrade;
            }
            else if (dealTypeMain == "Unlock") {
                schema = UnlockSchema2;
                uiSchema = uiDateSchema;
                // formData = formDataSaludaGrade;
            }
            this.setState({ schema: schema, uiSchema: uiSchema })
        }
        this.InvestorList(dealTypeMain);
        this.GetTableNames(dealTypeMain);

    }

    onSubmit = async (value) => {


        this.setState({ getLoansLoader: true, formData1: value.formData });




        console.log("generate-investor-report", value.formData)
        let data = value.formData;
        // data.userId = localStorage.getItem("user_id");
        data.peers = JSON.parse(localStorage.getItem("peers"));
        data.userId = localStorage.getItem("user_id");
        data.channelname = this.state.channelname
        // delete(value.formData.investorid);

        let investIDS = []
        if (this.state.processorarrray.length !== 0) {
            this.state.processorarrray.forEach(function (key, value) {

                console.log("value", value)
                // var obj = { name: key, label: key }
                if (key.value !== "*") {
                    investIDS.push(key.value)
                }
            });
        }
        console.log("investIDS", investIDS)
        data.investorid = investIDS;
        data.dealId = this.state.formData.dealId
        data.month = this.state.formData.month
        data.year = this.state.formData.year
        data.isInitialAccrualPeriod = this.state.formData.isInitialAccrualPeriod;
        // data.relationshipmanager=this.state.AdditionalFields.relationshipmanager;
        // data.address=this.state.AdditionalFields.address;
        // data.email=this.state.AdditionalFields.email;
        // data.websitereporting=this.state.AdditionalFields.websitereporting;
        // data.addtionalfirst=this.state.AdditionalFields.addtionalfirst;
        // data.addtionallast=this.state.AdditionalFields.addtionallast;
        // data.newlogic=this.state.AdditionalFields.newlogic;


        console.log("coming from schema" + JSON.stringify(data));

        let dealId = this.state.formData.dealId;
        let month = this.state.formData.month;
        let year = this.state.formData.year;
        let DealType = this.state.DealType;

        console.log("data onSubmit onSubmit", data)

        let channelname = this.state.channelname


        const newlogic = value.formData.newlogic;
        // const newlogic = this.state.AdditionalFields.newlogic;

        this.setState({ data: data })
        // alert(newlogic)
        if (newlogic == "false") {
            this.newlogic(dealId, month, year, channelname, data);
            this.setState({ generatebutton: true });
        }
        else {
            // this.setState({ generatebutton: false });

            this.GenerateReportWithPrompt(DealType, dealId, month, year, channelname, data)





        }

    }

    newlogic = async (dealId, month, year, channelname, data) => {
        // alert("HII")
        const DealType = this.state.DealType
        // const data = this.state.data
        // alert(this.state.DealType)
        console.log("Dealtype--enable" + DealType)
        console.log("data--enable" + data)
        // if (DealType != undefined) {

        const APIResponse = await EnableDisable(DealType, data);

        console.log("EnableDisable", APIResponse)
        if (APIResponse != null) {
            this.setState({ EnableDisable: APIResponse.data })
            if (APIResponse.status == 204) {
                // alert("No change in logic - Investor Report cannot be Generated!")
                this.setState({ generatebutton: false, getLoansLoader: false });
                let message = "No change in logic - Investor Report cannot be Generated!"
                this.props.enqueueSnackbar(message, {
                    variant: 'error',
                    autoHideDuration: 4000,
                });

            }
            else if (APIResponse.status == 208) {

                // alert("Investor Report cannot be Generated!-Get started from first")
                let message = "Investor Report cannot be Generated!-Get started from first"
                this.props.enqueueSnackbar(message, {
                    variant: 'error',
                    autoHideDuration: 4000,
                });
                this.setState({ generatebutton: false, getLoansLoader: false });
            }
            else if (APIResponse.status == 200) {
                if (APIResponse.data.token == -1) {
                    alert("Session Expired!!");
                }
                else {
                    const Successmsg = APIResponse.data['isSuccess']
                    if (Successmsg == false) {
                        let message = "Not saved"
                        this.props.enqueueSnackbar(message, {
                            variant: 'error',
                            autoHideDuration: 4000,
                        });
                    }
                    else {
                        this.setState({ generatebutton: true, });
                        this.GenerateReportWithPrompt(DealType, dealId, month, year, channelname, data)


                    }
                }

            }
        }
        // }
    }

    GenerateReportWithPrompt = async (DealType, dealId, month, year, channelname, data) => {
        const APIResponse = await Prompt(DealType, dealId, month, year, channelname)
        console.log("Prompt", APIResponse.data)
        if (APIResponse.status == 204) {


        }
        else if (APIResponse.status == 200) {
            if (APIResponse.data.token == -1) {
                alert("Session Expired!!");
            }
            else {
                var status = APIResponse.data.status;
                var length = APIResponse.data.length;
                data.version = length;
                if (status == "1") {

                    if (window.confirm("Already generated report for this dealName , month , year. Would you still like to update?")) {
                        if (this.state.DealType == "Spruce Hill" || (parseInt(month) <= 4 && parseInt(year) == 2022) || parseInt(year) < 2022) {
                            this.GenerateReport(data)

                        }
                        else {
                            this.savecollateralactivity(data)
                        }
                    }
                    else {
                        window.location.reload(true)
                    }

                }
                else {
                    if (this.state.DealType == "Spruce Hill" || (parseInt(month) <= 4 && parseInt(year) == 2022) || parseInt(year) < 2022) {
                        this.GenerateReport(data)

                    }
                    else {
                        this.savecollateralactivity(data)
                    }
                }

            }
        }
    }

    savecollateralactivity = async (value) => {
        let DealType = this.state.DealType;


        console.log("GenerateReport", value);

        var data1 = {};
      
        data1.peers = JSON.parse(localStorage.getItem("peers"));
        data1.dealId = this.state.formData.dealId;
        data1.isInitialAccrualPeriod = this.state.formData.isInitialAccrualPeriod;
        data1.year = this.state.formData.year;
        data1.month = this.state.formData.month;

        // formData
        const APIResponse = await savecollateralactivity(DealType, data1)
        if (APIResponse !== null) {
            // console.log("GenerateReport", APIResponse.data)
            if (APIResponse.status == 204) {
                this.setState({
                    generatebutton: false, getLoansLoader: false
                });

                const message = "Data not saved!";
                this.props.enqueueSnackbar(message, {
                    variant: 'error',
                    autoHideDuration: 4000,
                });

            }
            if (APIResponse.status == 400) {
                this.setState({
                    generatebutton: false, getLoansLoader: false
                });

                const message = "Missing Parameter!";
                this.props.enqueueSnackbar(message, {
                    variant: 'error',
                    autoHideDuration: 4000,
                });

            }
            else if (APIResponse.status == 200) {
                if (APIResponse.data.token == -1) {
                    alert("Session Expired!!");
                }
                else {
                    const Successmsg = APIResponse.data['isSuccess'];
                    const SuccessmsgText = APIResponse.data['message'];

                    if (Successmsg == false) {
                        this.setState({ getLoansLoader: false });
                        const message = "Data not saved!";
                        this.props.enqueueSnackbar(message, {
                            variant: 'error',
                            autoHideDuration: 4000,
                        });
                    }

                    else {

                        this.GenerateReport(value)


                    }
                }
            }
        }
    }

    GenerateReport = async (value) => {
        let DealType = this.state.DealType;


        console.log("GenerateReport", value);



        // formData
        const APIResponse = await GenerateReport(value, DealType,this.stat)
        if (APIResponse !== null) {
            this.setState({
                generatebutton: false, getLoansLoader: false
            });
            // console.log("GenerateReport", APIResponse.data)
            if (APIResponse.status == 204) {
                this.setState({
                    generatebutton: false, getLoansLoader: false
                });

                const message = "Data not saved!";
                this.props.enqueueSnackbar(message, {
                    variant: 'error',
                    autoHideDuration: 4000,
                });

            }
            if (APIResponse.status == 400) {
                this.setState({
                    generatebutton: false, getLoansLoader: false
                });

                const message = "Missing Parameter!";
                this.props.enqueueSnackbar(message, {
                    variant: 'error',
                    autoHideDuration: 4000,
                });

            }
            else if (APIResponse.status == 200) {
                if (APIResponse.data.token == -1) {
                    alert("Session Expired!!");
                }
                else {
                    const Successmsg = APIResponse.data['isSuccess'];
                    const SuccessmsgText = APIResponse.data['message'];

                    if (Successmsg == false) {
                        this.setState({ getLoansLoader: false });
                        const message = "Data not saved!";
                        this.props.enqueueSnackbar(message, {
                            variant: 'error',
                            autoHideDuration: 4000,
                        });
                    }

                    else {
                        this.setState({ getLoansLoader: false });
                        const message = "Data Saved Successfully!";
                        this.props.enqueueSnackbar(message, {
                            variant: 'info',
                            autoHideDuration: 4000,
                        });

                        setTimeout(() => {
                            this.props.history.push("/report/" + this.state.DealType + "/customize-investor-report/" + this.state.formData.dealId + "/" + this.state.formData.month + "/" + this.state.formData.year);
                        }, 2000);


                    }
                }
            }
        }
    }
    AdjustmentCondition = async () => {
        this.setState({ showTable: false, getdataloader: true })

        var data = {};
   
        data.peers = JSON.parse(localStorage.getItem("peers"));
        data.dealId = this.state.formData.dealId;
        data.isInitialAccrualPeriod = this.state.formData.isInitialAccrualPeriod;
        data.year = this.state.formData.year;
        data.month = this.state.formData.month;
        data.tablename = this.state.fields.tablename;
        data.category = this.state.fields.category;

        const APIResponse = await AdjustmentCondition(this.state.DealType, data)


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
                console.log("APIResponse.data.Success", this.state.decodedData);
                if (APIResponse.status == 200) {
                    if (APIResponse.data.isSuccess == false) {
                        const message = "Complete the Deposits and Withdrawals entries before Adjustments";
                        this.props.enqueueSnackbar(message, {
                            variant: 'error',
                            autoHideDuration: 4000,
                        });
                    }
                    else {
                        this.getdata(false);
                    }


                } else if (APIResponse.data.success == 0) {


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

    getdata = async (value) => {
        if (value == false) {
            this.setState({ showTable: false, getdataloader: true })

        }
        else {
            this.setState({ showTable: true, getdataloader: false })

        }

        var fields = this.state.fields
        var formData = this.state.formData
        var data = {};
    
        data.peers = JSON.parse(localStorage.getItem("peers"));
        data.dealId = this.state.formData.dealId;
        data.isInitialAccrualPeriod = this.state.formData.isInitialAccrualPeriod;
        data.year = this.state.formData.year;
        data.month = this.state.formData.month;
        data.tablename = this.state.fields.tablename;
        // data.category = this.state.fields.category;
        data.begbal = this.state.fields.begbal;
        data.hashcount = this.state.fields.hashcount == undefined ? 'null' : this.state.fields.hashcount;
        data.begbal1 = this.state.fields.begbal1 == undefined ? 'null' : this.state.fields.begbal1;
        data.hashcount1 = this.state.fields.hashcount1 == undefined ? 'null' : this.state.fields.hashcount1;
        data.deferredbalance = this.state.fields.deferredbalance == undefined ? 'null' : this.state.fields.deferredbalance;
        console.log("hashcount", this.state.fields.hashcount)
        console.log("GET DATA", fields, "formdata", formData)
        const APIResponse = await getservicerdata(this.state.DealType, data)
        console.log("APIResponse", APIResponse)

        if (APIResponse != null) {
            this.setState({ report_loader: false, getdataloader: false })

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
            else if (APIResponse.status == 400) {
                const message = "Missing arguments!";
                this.props.enqueueSnackbar(message, {
                    variant: 'error',
                    autoHideDuration: 5000,
                });
            }
            else {
                console.log("APIResponse.data.Success", this.state.decodedData);
                if (APIResponse.status == 200) {
                    if (APIResponse.data.isSuccess == false) {
                        const message = "Enter correct deal, month, year & accural period to get servicer data";
                        this.props.enqueueSnackbar(message, {
                            variant: 'error',
                            autoHideDuration: 4000,
                        });
                    }
                    else if (APIResponse.data.status == 1) {
                        const message = "Missing arguments!";
                        this.props.enqueueSnackbar(message, {
                            variant: 'error',
                            autoHideDuration: 4000,
                        });
                    }
                    else {
                        this.setState({
                            tableData: APIResponse.data,
                            report_loader: false, report_box: true
                        })
                        this.setState({ showTable: true, DisplayTable: true, getdataloader: false, actionType: 'add' })

                    }


                } else if (APIResponse.data.success == 0) {


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
    savecategory = async (e) => {
        e.preventDefault();
        // this.setState({ actionType: 'add' });

        this.setState({ savecategoryloader: true });
        // console.log("INDEx",index)
        var senddata = []
        if (this.state.DealType == "Spruce Hill") {
            $('#viewServicerData3 tbody tr').each(function (row, tr) {
                console.log("ROW", row, "tr", tr)
                senddata[row] = {
                    'collectionperiod': $(tr).find("td:eq(0)").find('select').val(),
                    'category': $(tr).find("td:eq(1)").find('select').val(),
                    'key': $(tr).find("td:eq(2) input[type='text']").val(),

                    'value1': $(tr).find("td:eq(3) input[type='text']").val().replace(/,/g, ''),
                    'value2': $(tr).find("td:eq(4) input[type='text']").val().replace(/,/g, ''),
                    'value3': $(tr).find("td:eq(5) input[type='text']").val().replace(/,/g, ''),
                    'value4': $(tr).find("td:eq(6) input[type='text']").val().replace(/,/g, ''),

                };
            });
        } 
        else if(this.state.DealType == "NPL"){

            $('#viewServicerData3 tbody tr').each(function (row, tr) {
                console.log("ROW", row, "tr", tr)
                senddata[row] = {
                    'collectionperiod': $(tr).find("td:eq(0)").find('select').val(),
                    'category': $(tr).find("td:eq(1)").find('select').val(),
                    'key': $(tr).find("td:eq(2) input[type='text']").val(),

                    'value1': $(tr).find("td:eq(3) input[type='text']").val().replace(/,/g, ''),
                    'value2': $(tr).find("td:eq(4) input[type='text']").val().replace(/,/g, ''),
                    'value3': $(tr).find("td:eq(5) input[type='text']").val().replace(/,/g, ''),



                };

            });

        }
        else {

            $('#viewServicerData3 tbody tr').each(function (row, tr) {
                console.log("ROW", row, "tr", tr)
                senddata[row] = {
                    'collectionperiod': $(tr).find("td:eq(0)").find('select').val(),
                    'category': $(tr).find("td:eq(1)").find('select').val(),
                    'key': $(tr).find("td:eq(2) input[type='text']").val(),

                    'value1': $(tr).find("td:eq(3) input[type='text']").val().replace(/,/g, ''),
                    'value2': $(tr).find("td:eq(4) input[type='text']").val().replace(/,/g, ''),
                    // 'value3': $(tr).find("td:eq(5) input[type='text']").val().replace(/,/g, ''),


                };

            });

        }
        

       

        
        // if(this.state.fields.category=="Adjustments"){
        //         $('#viewServicerData3 tbody tr').each(function (row, tr) {
        //             console.log("ROW",row ,"tr",tr)
        //             senddata[row] = {
        //                 'collectionperiod': $(tr).find("td:eq(0)").find('select').val(),
        //                 'category': $(tr).find("td:eq(1)").find('select').val(),
        //                 'key': $(tr).find("td:eq(2) input[type='text']").val(),

        //                 'value1': $(tr).find("td:eq(3) input[type='text']").val(),
        //                 'value2': $(tr).find("td:eq(4) input[type='text']").val(),


        //             };
        //         });
        //     }
        //     else{
        //         $('#viewServicerData3 tbody tr').each(function (row, tr) {
        //             console.log("ROW",row ,"tr",tr)
        //             senddata[row] = {
        //                 'collectionperiod': $(tr).find("td:eq(0)").find('select').val(),

        //                 'key': $(tr).find("td:eq(1) input[type='text']").val(),

        //                 'value1': $(tr).find("td:eq(2) input[type='text']").val(),
        //                 'value2': $(tr).find("td:eq(3) input[type='text']").val(),


        //             };
        //         });
        //     }
        // //   var DATA=  $('#viewServicerData2 tbody tr:nth-child(' + index +')');
        //   var  DATA= $('#viewServicerData2 tbody tr').eq(index).find("td:eq(0) input[type='text']").val();

        console.log("save button::" + JSON.stringify(senddata))
        // console.log("DTA button::" + DATA)
        var data = {};
     
        data.peers = JSON.parse(localStorage.getItem("peers"));
        data.dealId = this.state.formData.dealId;
        data.isInitialAccrualPeriod = this.state.formData.isInitialAccrualPeriod;
        data.year = this.state.formData.year;
        data.month = this.state.formData.month;
        data.tablename = this.state.fields.tablename;
        // data.category = this.state.fields.category;
        data.begbal = this.state.fields.begbal;
        data.hashcount = this.state.fields.hashcount == undefined ? 'null' : this.state.fields.hashcount;
        data.begbal1 = this.state.fields.begbal1 == undefined ? 'null' : this.state.fields.begbal1;
        data.hashcount1 = this.state.fields.hashcount1 == undefined ? 'null' : this.state.fields.hashcount1;
        data.deferredbalance = this.state.fields.deferredbalance == undefined ? 'null' : this.state.fields.deferredbalance;
        data.tabledata = senddata;
        console.log("data", data)
        // this.OpenForm()

        //         var encodedData = btoa(JSON.stringify(senddata));
        // var decodedData= atob(encodedData)
        //         console.log("++++++++data+++++++" + encodedData+decodedData);
        //         // this.setState({decodedData:decodedData})
        //         console.log("DECODED!!!!!!!!!!",JSON.parse(decodedData))

        //         console.log("DECODED",typeof(decodedData))
        let DealType = this.state.DealType
        const APIResponse = await savecategory(DealType, data);
        if (APIResponse != null) {
            this.setState({ savecategoryloader: false });

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
                if (APIResponse.data.isSuccess == true) {
                    // this.props.history.push("/report/" + this.state.DealType + "/setup-page/" + this.state.formData.assetclass);

                    // this.setState({ actionType: 'add' });
                    const message = "Data saved successfully";
                    this.props.enqueueSnackbar(message, {
                        variant: 'info',
                        autoHideDuration: 3000,
                    });
                    this.setState({ savecategoryloader: false });
                    this.getdata(true)

                    setTimeout(() => {
                        this.OpenForm()
                    }, 2000);
                    // this.getdata(this.state.DealType, this.state.formData.assetclass,"WSFS")

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

    OpenForm = async () => {
        var data = {};
     
        data.peers = JSON.parse(localStorage.getItem("peers"));
        data.dealId = this.state.formData.dealId;
        data.isInitialAccrualPeriod = this.state.formData.isInitialAccrualPeriod;
        data.year = this.state.formData.year;
        data.month = this.state.formData.month;
        const APIResponse = await OpenForm(this.state.DealType, data);
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
                if (APIResponse.data.isOpenForm == true) {
                    // this.props.history.push("/report/" + this.state.DealType + "/setup-page/" + this.state.formData.assetclass);

                    // this.setState({ actionType: 'add' });
                    // const message = "Data saved successfully";
                    // this.props.enqueueSnackbar(message, {
                    //     variant: 'info',
                    //     autoHideDuration: 3000,
                    // });
                    this.setState({ FormRender: true, DisplayTable: true })
                    // this.onSubmit1()
                    // this.getdata(this.state.DealType, this.state.formData.assetclass,"WSFS")

                } else {
                    this.setState({ FormRender: false, DisplayTable: true })

                    // this.getdata()
                    // const message = "";
                    // this.props.enqueueSnackbar(message, {
                    //     variant: 'error',
                    //     autoHideDuration: 3000,
                    // });
                }
            }
        }

    }



    start = async (event) => {
        let row = event.target;
        console.log(row)
        this.setState({ row: row })
    }
    dragover = async (event) => {
        var e = event;
        e.preventDefault();

        let children = Array.from(e.target.parentNode.parentNode.children);
        console.log("children", children)
        console.log("children1", children.indexOf(e.target.parentNode))
        console.log("children2", children.indexOf(this.state.row))
        if (children.indexOf(this.state.row) >= 0) {
            if (children.indexOf(e.target.parentNode) > children.indexOf(this.state.row)) {
                e.target.parentNode.after(this.state.row);
            }
            else {
                e.target.parentNode.before(this.state.row);
            }
        }
        else {
            console.log("negative")
        }
    }
    convert = (n) => {
        var sign = +n < 0 ? "-" : "",
            toStr = n.toString();
        if (!/e/i.test(toStr)) {
            return n;
        }
        var [lead, decimal, pow] = n.toString()
            .replace(/^-/, "")
            .replace(/^([0-9]+)(e.*)/, "$1.$2")
            .split(/e|\./);
        return +pow < 0 ?
            sign + "0." + "0".repeat(Math.max(Math.abs(pow) - 1 || 0, 0)) + lead + decimal :
            sign + lead + (+pow >= decimal.length ? (decimal + "0".repeat(Math.max(+pow - decimal.length || 0, 0))) : (decimal.slice(0, +pow) + "." + decimal.slice(+pow)))
    }
    // draggable="true" onDragStart={this.start}  onDragOver={this.dragover}
    renderRows() {

        return this.state.tableData ?

            this.state.tableData.map((item, index) => (
                <React.Fragment>



                    <React.Fragment>
                        <tr key={item.key} draggable="true" onDragStart={this.start} onDragOver={this.dragover}>

                            <td>

                                {this.state.actionType == "edit" && this.state.currentindex == index ?
                                    <select className="Form-control boxinp highlight">
                                        <option hidden selected value={item.collectionperiod}>{item.collectionperiod}</option>

                                        <option value='During Collection Period'>During Collection Period</option>
                                        <option value='Post Collection Period'>Post Collection Period</option>

                                    </select>
                                    :
                                    <select disabled className="Form-control boxinp">
                                        <option value={item.collectionperiod}>{item.collectionperiod}</option>

                                    </select>
                                }

                            </td>

                            {/* // {this.state.fields.category=="Adjustments"? */}
                            <React.Fragment>
                                <td>


                                    {this.state.actionType == "edit" && this.state.currentindex == index ?
                                        <select className="Form-control boxinp highlight">
                                            <option hidden selected value={item.category}>{item.category}</option>

                                            <option value='Deposits'>Deposits</option>
                                            <option value='Withdrawals'>Withdrawals</option>

                                        </select>
                                        :
                                        <select disabled className="Form-control boxinp">
                                            <option value={item.category}>{item.category}</option>

                                        </select>
                                    }


                                </td>
                            </React.Fragment>
                            {/* :''}                      */}


                            <td>

                                {this.state.actionType == "edit" && this.state.currentindex == index ?



                                    <input class="Form-control boxinp highlight" type="text" defaultValue={item.key || ''}></input>
                                    :
                                    <input class="Form-control boxinp" type="text" disabled value={item.key}></input>

                                }

                            </td>
                            {/* {this.state.fields.tablename!="COLLATERAL BALANCE"? */}

                            <td style={{ display: this.state.fields.tablename != "COLLATERAL BALANCE" ? "none" : 'table-cell' }}>

                                {this.state.actionType == "edit" && this.state.currentindex == index ?
                                    <input class="Form-control boxinp highlight" type="text" defaultValue={item.value1 || ''}></input>
                                    // <CurrencyFormat className="Form-control boxinp" thousandSeparator={','} decimalSeparator={'.'} decimalScale={2}   type="text" value={item.value1 || ''}></CurrencyFormat>

                                    :
                                    <input class="Form-control boxinp" type="text" disabled value={item.value1}></input>
                                    // <CurrencyFormat className="Form-control boxinp" thousandSeparator={','} decimalSeparator={'.'} decimalScale={2}  disabled type="text" value={item.value1 || ''}></CurrencyFormat>

                                }


                            </td>
                            {this.state.fields.tablename === "COLLATERAL BALANCE" ? 
                            <td style={{ display: this.state.fields.tablename != "COLLATERAL BALANCE" ? "none" : 'table-cell' }}>

                                {this.state.actionType == "edit" && this.state.currentindex == index ?
                                    <input class="Form-control boxinp highlight" type="text" defaultValue={item.value2 || ''}></input>
                                    // <CurrencyFormat className="Form-control boxinp" thousandSeparator={','} decimalSeparator={'.'} decimalScale={2}   type="text" value={item.value1 || ''}></CurrencyFormat>

                                    :
                                    <input class="Form-control boxinp" type="text" disabled value={item.value2}></input>
                                    // <CurrencyFormat className="Form-control boxinp" thousandSeparator={','} decimalSeparator={'.'} decimalScale={2}  disabled type="text" value={item.value1 || ''}></CurrencyFormat>

                                }


                            </td> : 
                             <td>

                             {this.state.actionType == "edit" && this.state.currentindex == index ?
                                 <input class="Form-control boxinp highlight" type="text" defaultValue={item.value2 || ''}></input>
                                 // <CurrencyFormat className="Form-control boxinp" thousandSeparator={','} decimalSeparator={'.'} decimalScale={2}   type="text" value={item.value2 || ''}></CurrencyFormat>

                                 :
                                 <input class="Form-control boxinp" type="text" disabled defaultValue={item.value2 || ''}></input>
                                 // <CurrencyFormat className="Form-control boxinp" thousandSeparator={','} decimalSeparator={'.'} decimalScale={2}  disabled type="text" value={item.value2 || ''}></CurrencyFormat>

                             }


                         </td>
    }
                            
                            
               
                            {/* // :''} */}
                            


                            {this.state.restrict == true ? '' :
                                <td>
                                    <div>
                                        {this.state.actionType == "edit" && this.state.currentindex == index ?
                                            <React.Fragment>
                                                <Button className="float-center" style={{ marginLeft: "5px", padding: "1px", fontSize: "12px" }} color="primary" variant="outlined" onClick={this.savecategory}>Save</Button>
                                                <Button className="float-center" style={{ marginLeft: "5px", padding: "1px", fontSize: "12px" }} color="primary" variant="outlined" onClick={this.Cancel}>Cancel</Button>
                                            </React.Fragment>
                                            :
                                            <React.Fragment>
                                                <img alt="" src={require('../../../images/edit.png')} style={{ marginLeft: "20px" }} height="25px" width="25px" x={index} onClick={() => this.Edit(index)}></img>
                                                <img alt="" src={require('../../../images/delete.png')} style={{ marginLeft: "20px" }} height="25px" width="25px" x={index} onClick={() => this.Delete(index)}></img>
                                            </React.Fragment>


                                        }

                                    </div>

                                </td>
                            }
                        </tr>
                    </React.Fragment>

                </React.Fragment>
            ))

            : null

    }
    renderRows2() {

        return this.state.tableData ?

            this.state.tableData.map((item, index) => (
                <React.Fragment>



                    <React.Fragment>
                        <tr key={item.key} draggable="true" onDragStart={this.start} onDragOver={this.dragover}>

                            <td>

                                {this.state.actionType == "edit" && this.state.currentindex == index ?
                                    <select className="Form-control boxinp highlight">
                                        <option hidden selected value={item.collectionperiod}>{item.collectionperiod}</option>

                                        <option value='During Collection Period'>During Collection Period</option>
                                        <option value='Post Collection Period'>Post Collection Period</option>

                                    </select>
                                    :
                                    <select disabled className="Form-control boxinp">
                                        <option value={item.collectionperiod}>{item.collectionperiod}</option>

                                    </select>
                                }

                            </td>

                            {/* // {this.state.fields.category=="Adjustments"? */}
                            <React.Fragment>
                                <td>


                                    {this.state.actionType == "edit" && this.state.currentindex == index ?
                                        <select className="Form-control boxinp highlight">
                                            <option hidden selected value={item.category}>{item.category}</option>

                                            <option value='Deposits'>Deposits</option>
                                            <option value='Withdrawals'>Withdrawals</option>

                                        </select>
                                        :
                                        <select disabled className="Form-control boxinp">
                                            <option value={item.category}>{item.category}</option>

                                        </select>
                                    }


                                </td>
                            </React.Fragment>
                            {/* :''}                      */}


                            <td>

                                {this.state.actionType == "edit" && this.state.currentindex == index ?



                                    <input class="Form-control boxinp highlight" type="text" defaultValue={item.key || ''}></input>
                                    :
                                    <input class="Form-control boxinp" type="text" disabled value={item.key}></input>

                                }

                            </td>
                            {/* {this.state.fields.tablename!="COLLATERAL BALANCE"? */}

                            <td style={{ display: this.state.fields.tablename != "COLLATERAL BALANCE" ? "none" : 'table-cell' }}>

                                {this.state.actionType == "edit" && this.state.currentindex == index ?
                                    <input class="Form-control boxinp highlight" type="text" defaultValue={item.value1 || ''}></input>
                                    // <CurrencyFormat className="Form-control boxinp" thousandSeparator={','} decimalSeparator={'.'} decimalScale={2}   type="text" value={item.value1 || ''}></CurrencyFormat>

                                    :
                                    <input class="Form-control boxinp" type="text" disabled value={item.value1}></input>
                                    // <CurrencyFormat className="Form-control boxinp" thousandSeparator={','} decimalSeparator={'.'} decimalScale={2}  disabled type="text" value={item.value1 || ''}></CurrencyFormat>

                                }


                            </td>
                            {/* // :''} */}
                            <td>

                                {this.state.actionType == "edit" && this.state.currentindex == index ?
                                    <input class="Form-control boxinp highlight" type="text" defaultValue={item.value2 || ''}></input>
                                    // <CurrencyFormat className="Form-control boxinp" thousandSeparator={','} decimalSeparator={'.'} decimalScale={2}   type="text" value={item.value2 || ''}></CurrencyFormat>

                                    :
                                    <input class="Form-control boxinp" type="text" disabled defaultValue={item.value2 || ''}></input>
                                    // <CurrencyFormat className="Form-control boxinp" thousandSeparator={','} decimalSeparator={'.'} decimalScale={2}  disabled type="text" value={item.value2 || ''}></CurrencyFormat>

                                }


                            </td>
                            <td style={{ display: this.state.fields.tablename != "COLLATERAL BALANCE" ? "none" : 'table-cell' }}>

                                {this.state.actionType == "edit" && this.state.currentindex == index ?
                                    <input class="Form-control boxinp highlight" type="text" defaultValue={item.value3 || ''}></input>
                                    // <CurrencyFormat className="Form-control boxinp" thousandSeparator={','} decimalSeparator={'.'} decimalScale={2}   type="text" value={item.value3 || ''}></CurrencyFormat>

                                    :
                                    <input class="Form-control boxinp" type="text" disabled value={item.value3}></input>
                                    // <CurrencyFormat className="Form-control boxinp" thousandSeparator={','} decimalSeparator={'.'} decimalScale={2}  disabled type="text" value={item.value3 || ''}></CurrencyFormat>

                                }


                            </td>
                            {/* // :''} */}
                            <td>

                                {this.state.actionType == "edit" && this.state.currentindex == index ?
                                    <input class="Form-control boxinp highlight" type="text" defaultValue={item.value4 || ''}></input>
                                    // <CurrencyFormat className="Form-control boxinp" thousandSeparator={','} decimalSeparator={'.'} decimalScale={2}   type="text" value={item.value4 || ''}></CurrencyFormat>

                                    :
                                    <input class="Form-control boxinp" type="text" disabled defaultValue={item.value4 || ''}></input>
                                    // <CurrencyFormat className="Form-control boxinp" thousandSeparator={','} decimalSeparator={'.'} decimalScale={2}  disabled type="text" value={item.value4 || ''}></CurrencyFormat>

                                }


                            </td>

                            {this.state.restrict == true ? '' :
                                <td>
                                    <div>
                                        {this.state.actionType == "edit" && this.state.currentindex == index ?


                                            <React.Fragment>
                                                <Button className="float-center" style={{ marginLeft: "5px", padding: "1px", fontSize: "12px" }} color="primary" variant="outlined" onClick={this.savecategory}>Save</Button>
                                                <Button className="float-center" style={{ marginLeft: "5px", padding: "1px", fontSize: "12px" }} color="primary" variant="outlined" onClick={this.Cancel}>Cancel</Button>
                                            </React.Fragment>
                                            :
                                            <React.Fragment>
                                                <img alt="" src={require('../../../images/edit.png')} style={{ marginLeft: "20px" }} height="25px" width="25px" x={index} onClick={() => this.Edit(index)}></img>
                                                <img alt="" src={require('../../../images/delete.png')} style={{ marginLeft: "20px" }} height="25px" width="25px" x={index} onClick={() => this.Delete(index)}></img>
                                            </React.Fragment>


                                        }

                                    </div>

                                </td>
                            }
                        </tr>
                    </React.Fragment>

                </React.Fragment>
            ))

            : null

    }
    renderRows3() {
console.log("renderRows3",this.state.tableData)
        return this.state.tableData ?

        this.state.tableData.map((item, index) => (
            <React.Fragment>



                <React.Fragment>
                    <tr key={item.key} draggable="true" onDragStart={this.start} onDragOver={this.dragover}>
             
                        <td>

                            {this.state.actionType == "edit" && this.state.currentindex == index ?
                                <select className="Form-control boxinp highlight">
                                    <option hidden selected value={item.collectionperiod}>{item.collectionperiod}</option>

                                    <option value='During Collection Period'>During Collection Period</option>
                                    <option value='Post Collection Period'>Post Collection Period</option>

                                </select>
                                :
                                <select disabled className="Form-control boxinp">
                                    <option value={item.collectionperiod}>{item.collectionperiod}</option>

                                </select>
                            }

                        </td>

                        {/* // {this.state.fields.category=="Adjustments"? */}
                        <React.Fragment>
                            <td>


                                {this.state.actionType == "edit" && this.state.currentindex == index ?
                                    <select className="Form-control boxinp highlight">
                                        <option hidden selected value={item.category}>{item.category}</option>

                                        <option value='Deposits'>Deposits</option>
                                        <option value='Withdrawals'>Withdrawals</option>

                                    </select>
                                    :
                                    <select disabled className="Form-control boxinp">
                                        <option value={item.category}>{item.category}</option>

                                    </select>
                                }


                            </td>
                        </React.Fragment>
                        {/* :''}                      */}


                        <td>

                            {this.state.actionType == "edit" && this.state.currentindex == index ?



                                <input class="Form-control boxinp highlight" type="text" defaultValue={item.key || ''}></input>
                                :
                                <input class="Form-control boxinp" type="text" disabled value={item.key}></input>

                            }

                        </td>
                        {/* {this.state.fields.tablename!="COLLATERAL BALANCE"? */}

                        <td style={{ display: this.state.fields.tablename != "COLLATERAL BALANCE" ? "none" : 'table-cell' }}>

                            {this.state.actionType == "edit" && this.state.currentindex == index ?
                                <input class="Form-control boxinp highlight" type="text" defaultValue={item.value1 || ''}></input>
                                // <CurrencyFormat className="Form-control boxinp" thousandSeparator={','} decimalSeparator={'.'} decimalScale={2}   type="text" value={item.value1 || ''}></CurrencyFormat>

                                :
                                <input class="Form-control boxinp" type="text" disabled value={item.value1}></input>
                                // <CurrencyFormat className="Form-control boxinp" thousandSeparator={','} decimalSeparator={'.'} decimalScale={2}  disabled type="text" value={item.value1 || ''}></CurrencyFormat>

                            }


                        </td>
                        {this.state.fields.tablename === "COLLATERAL BALANCE" ?

                         <td style={{ display: this.state.fields.tablename != "COLLATERAL BALANCE" ? "none" : 'table-cell' }}>

                            {this.state.actionType == "edit" && this.state.currentindex == index ?
                                <input class="Form-control boxinp highlight" type="text" defaultValue={item.value2 || ''}></input>
                                // <CurrencyFormat className="Form-control boxinp" thousandSeparator={','} decimalSeparator={'.'} decimalScale={2}   type="text" value={item.value1 || ''}></CurrencyFormat>

                                :
                                <input class="Form-control boxinp" type="text" disabled value={item.value2}></input>
                                // <CurrencyFormat className="Form-control boxinp" thousandSeparator={','} decimalSeparator={'.'} decimalScale={2}  disabled type="text" value={item.value1 || ''}></CurrencyFormat>

                            }


                        </td>
                        :
                        <td>

                        {this.state.actionType == "edit" && this.state.currentindex == index ?
                            <input class="Form-control boxinp highlight" type="text" defaultValue={item.value2 || ''}></input>
                            // <CurrencyFormat className="Form-control boxinp" thousandSeparator={','} decimalSeparator={'.'} decimalScale={2}   type="text" value={item.value2 || ''}></CurrencyFormat>

                            :
                            <input class="Form-control boxinp" type="text" disabled defaultValue={item.value2 || ''}></input>
                            // <CurrencyFormat className="Form-control boxinp" thousandSeparator={','} decimalSeparator={'.'} decimalScale={2}  disabled type="text" value={item.value2 || ''}></CurrencyFormat>

                        }


                    </td>
    }
                        
           
                        {/* // :''} */}
                        <td style={{ display: this.state.fields.tablename != "COLLATERAL BALANCE" ? "none" : 'table-cell' }}>

{this.state.actionType == "edit" && this.state.currentindex == index ?
    <input class="Form-control boxinp highlight" type="text" defaultValue={item.value3|| ''}></input>
    // <CurrencyFormat className="Form-control boxinp" thousandSeparator={','} decimalSeparator={'.'} decimalScale={2}   type="text" value={item.value1 || ''}></CurrencyFormat>

    :
    <input class="Form-control boxinp" type="text" disabled value={item.value3}></input>
    // <CurrencyFormat className="Form-control boxinp" thousandSeparator={','} decimalSeparator={'.'} decimalScale={2}  disabled type="text" value={item.value1 || ''}></CurrencyFormat>

}


</td>                        


                        {this.state.restrict == true ? '' :
                            <td>
                                <div>
                                    {this.state.actionType == "edit" && this.state.currentindex == index ?
                                        <React.Fragment>
                                            <Button className="float-center" style={{ marginLeft: "5px", padding: "1px", fontSize: "12px" }} color="primary" variant="outlined" onClick={this.savecategory}>Save</Button>
                                            <Button className="float-center" style={{ marginLeft: "5px", padding: "1px", fontSize: "12px" }} color="primary" variant="outlined" onClick={this.Cancel}>Cancel</Button>
                                        </React.Fragment>
                                        :
                                        <React.Fragment>
                                            <img alt="" src={require('../../../images/edit.png')} style={{ marginLeft: "20px" }} height="25px" width="25px" x={index} onClick={() => this.Edit(index)}></img>
                                            <img alt="" src={require('../../../images/delete.png')} style={{ marginLeft: "20px" }} height="25px" width="25px" x={index} onClick={() => this.Delete(index)}></img>
                                        </React.Fragment>


                                    }

                                </div>

                            </td>
                        }
                    </tr>
                </React.Fragment>

            </React.Fragment>
        ))

        : null

    }

    AddField = () => {

        var addtable = this.state.tableData;
        addtable.push({ "id": "", "def": "", "fieldcode": this.state.formData.assetclass + "I", "type": "Underlying exposures information section", "descp": "", "x": "", "y": "" })

        this.setState({
            tableData: addtable,


        });
        this.Edit(addtable.length - 1)




    }
    Edit = async (index) => {
        console.log("INDEX", index)
        this.setState({ actionType: 'edit', currentindex: index });
    }
    Cancel = async (e) => {
        e.preventDefault();
        this.setState({ actionType: 'add' });
    }
    Delete = (idx) => {



        if (window.confirm("Are you sure you want to Delete?")) {

            const tableData = [...this.state.tableData]
            tableData.splice(idx, 1)
            this.setState({ tableData })
            // this.savecategory()
        }

    }
    DisplayTable = async () => {
        this.setState({ DisplayTable: true });

    }
    CloseTable = async () => {
        this.setState({ DisplayTable: true });

    }
    Displaychange = (e) => {
        // togglevat
        if (this.state.DisplayTable == false) {
            this.setState({ DisplayTable: true })

        }
        else {
            this.setState({ DisplayTable: false })

        }
    }

    render() {
        const { formData1 } = this.state;
        return (

            <React.Fragment>
                <div className="page">
                    <div className="content">
                        <div className="header">
                            <Header pageTitle={this.state.pageTitle}>

                                {/* <DataDictionary
                  DataDictionaryData={this.state.formData}
                  DealType={this.state.DealType}
                ></DataDictionary> */}
                            </Header>
                            {/* {this.state.getLoader == false ? '' : <LinearLoader></LinearLoader>} */}

                        </div>
                        <div className="page-content text-center">
                            <div className="row">
                                <div className="col-md-12 text-left">
                                    <h3 className="title-page">{!this.state.pageTitle ? '' : this.state.pageTitle}
                                        {/* {JSON.stringify(this.state.nextPaymentDateLoader)} */}
                                    </h3>
                                </div>
                                <div className="col-md-12">

                                    <div class="threecolform">
                                        {this.state.loadingForm == true ?
                                            <Form
                                                schema={this.state.schema1}
                                                onSubmit={this.onSubmit1}
                                                onChange={this.onFormChanged}
                                                widgets={widgets}
                                                omitExtraData={true}
                                                liveOmit={true}
                                                FieldTemplate={CustomFieldTemplate}
                                                formData={this.state.formData}

                                                ObjectFieldTemplate={ObjectFieldTemplate}
                                            >
                                                <Button variant='contained' color='primary' className="text-left" style={{ marginTop: "-100px" }} type="submit">
                                                    Get Fields {this.state.getfieldloader === true ? (
                                                        <CircularProgress size='25px' color='primary' />
                                                    ) : (
                                                            ''
                                                        )}

                                                </Button>

                                            </Form>



                                            : <Loader></Loader>
                                        }


                                        <React.Fragment>
                                            {this.state.NewChanges == true ?
                                                <div className="text-right">
                                                    <Switch
                                                        checked={this.state.DisplayTable}
                                                        onChange={this.Displaychange}
                                                        name="DisplayTable"
                                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                                    />

                                                </div>
                                                : ''}
                                            {this.state.NewChanges == true ?
                                                this.state.DisplayTable == true ?

                                                    <div className="table-responsive">
                                                        <p style={{ fontWeight: "bold", fontSize: "19px", textAlign: "left", margin: "5px", marginBottom: "10px" }}>Account Statement</p>


                                                        <React.Fragment>
                                                            {/* <div className="col-md-12"> */}

                                                            <div class="threecolform">
                                                                <div className="row mb-3">
                                                                    <div className="col-md-3">
                                                                        <TextField
                                                                            label={'Table Name*'}
                                                                            variant="filled"
                                                                            size="medium"
                                                                            name="tablename"
                                                                            // labelId="demo-controlled-open-select-label"
                                                                            id="standard-select-currency"
                                                                            select
                                                                            InputLabelProps={{ shrink: this.state.Shrink }}

                                                                            value={this.state.fields.tablename}
                                                                            onChange={this.FieldChange}
                                                                        >
                                                                            {this.state.GetTableNames.map((option) => (
                                                                                <MenuItem key={option.value} value={option.value}>
                                                                                    {option.key}
                                                                                </MenuItem>
                                                                            ))}
                                                                            {/* <MenuItem value={"INTEREST REMITTANCE"}> Interest Remittance</MenuItem>
                                                                        <MenuItem value={"COLLATERAL BALANCE"}> Collateral Balance</MenuItem>
                                                                        <MenuItem value={"PRINCIPAL REMITTANCE"}> Principal Remittance</MenuItem>
                                                                        <MenuItem value={"AVAILABLE FUNDS"}> Available Funds</MenuItem>
                                                                        <MenuItem value={"ACCUMULATION ACCOUNT"}> Accumulation Account</MenuItem>
                                                                        <MenuItem value={"PRE-FUNDING INTEREST ACCOUNT"}> Pre-Funding Interest Account</MenuItem>
                                                                        <MenuItem value={"REDEMPTION ACCOUNT"}> Redemption Account</MenuItem>   */}


                                                                        </TextField>

                                                                    </div>

                                                                    {/* <div className="col-md-3">
                                                                            <TextField
                                                                                label={'Category*'}
                                                                                variant="filled"
                                                                                name="category"
                                                                                id="standard-select-currency"
                                                                                select
                                                                                value={this.state.fields.category}
                                                                                onChange={this.FieldChange}
                                                                                InputLabelProps={{ shrink: this.state.Shrink }}
                                                                            >
                                                                                <MenuItem value={"Deposits"}>Deposit</MenuItem>
                                                                                <MenuItem value={"Withdrawals"}> Withdrawal</MenuItem>

                                                                                <MenuItem value={"Adjustments"}> Adjustment</MenuItem>

                                                                            </TextField>
                                                                        </div> */}

                                                                    <div className="col-md-3">

                                                                        <TextField
                                                                            label={'Beginning Principal Balance*'}
                                                                            variant="filled"
                                                                            name="begbal"
                                                                            // id="standard-select-currency"
                                                                            // name="numberformat"
                                                                            id="formatted-numberformat-input"
                                                                            disabled
                                                                            value={this.state.fields.begbal}
                                                                            onChange={this.FieldChange}
                                                                            InputLabelProps={{
                                                                                shrink: this.state.Shrink
                                                                            }}
                                                                            InputProps={{
                                                                                inputComponent: NumberFormatCustom,
                                                                            }}
                                                                        >


                                                                        </TextField>

                                                                    </div>

                                                                    {this.state.fields.hashcount == null || this.state.fields.hashcount == undefined ? ''
                                                                        :
                                                                        <div className="col-md-3">

                                                                            <TextField
                                                                                label={'Beginning Loan Hash Count*'}
                                                                                variant="filled"
                                                                                name="hashcount"
                                                                                id="standard-select-currency"
                                                                                disabled
                                                                                value={this.state.fields.hashcount}
                                                                                onChange={this.FieldChange}
                                                                                InputLabelProps={{ shrink: this.state.Shrink }}
                                                                            >


                                                                            </TextField>

                                                                        </div>}




                                                               


                                                                </div>
                                                            </div>
                                                            <div class="threecolform">
                                                                <div className="row mb-3">
                                                                    {this.state.fields.begbal1 == null || this.state.fields.begbal1 == undefined ? ''
                                                                        :
                                                                        <div className="col-md-3">

                                                                            <TextField
                                                                                label={'Beginning Principal Balance 2*'}
                                                                                variant="filled"
                                                                                name="begbal1"
                                                                                id="formatted-numberformat-input"
                                                                                disabled
                                                                                value={this.state.fields.begbal1}
                                                                                onChange={this.FieldChange}
                                                                                InputLabelProps={{ shrink: this.state.Shrink }}
                                                                                InputProps={{
                                                                                    inputComponent: NumberFormatCustom,
                                                                                }}
                                                                            >

                                                                            </TextField>

                                                                        </div>}

                                                                    {this.state.fields.hashcount1 == null || this.state.fields.hashcount1 == undefined ? ''
                                                                        :
                                                                        <div className="col-md-3">

                                                                            <TextField
                                                                                label={'Beginning Loan Hash Count 2*'}
                                                                                variant="filled"
                                                                                name="hashcount1"
                                                                                id="standard-select-currency"
                                                                                disabled
                                                                                value={this.state.fields.hashcount1}
                                                                                onChange={this.FieldChange}
                                                                                InputLabelProps={{ shrink: this.state.Shrink }}
                                                                            >


                                                                            </TextField>

                                                                        </div>}

                                                                        {this.state.fields.deferredbalance == null || this.state.fields.deferredbalance == undefined ? ''
                                                                        :
                                                                        <div className="col-md-3">

                                                                            <TextField
                                                                                label={'Beginning Deferred Balance*'}
                                                                                variant="filled"
                                                                                name="deferredbalance"
                                                                                id="standard-select-currency"
                                                                                disabled
                                                                                value={this.state.fields.deferredbalance}
                                                                                onChange={this.FieldChange}
                                                                                InputLabelProps={{ shrink: this.state.Shrink }}
                                                                            >


                                                                            </TextField>

                                                                        </div>}


                                                                </div>                      </div>

                                                            <div className="col-md-12">
                                                                <Button variant='contained' disabled={this.state.getservicerdatabtn == true ? true : false} color='primary' className="text-left" style={{ marginTop: "30px" }} onClick={() => this.getdata(false)} type="submit">
                                                                    Get Servicer Data {this.state.getdataloader === true ? (
                                                                        <CircularProgress size='25px' color='primary' />
                                                                    ) : (
                                                                            ''
                                                                        )}

                                                                </Button>
                                                            </div>

                                                            {/* </div> */}


                                                        </React.Fragment>
                                                        {this.state.showTable == true ?
                                                            <React.Fragment>


                                                                {/* <div className="text-right">
                      <Switch
                        checked={this.state.DisplayTable}
                        onChange={this.Displaychange}
                        name="DisplayTable"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                      />

                    </div> */}

                                                                <React.Fragment>
                                                                    {this.state.DealType == "Spruce Hill" ?
                                                                        <table className="table text-left" id="viewServicerData3" >
                                                                            <thead >
                                                                                {/* <tr className="">
                                                        <th colSpan="6">Field Details</th>
                                                    </tr> */}
                                                                                <tr className="tablehead" >
                                                                                    <th>Collection Period</th>

                                                                                    {/* // {this.state.fields.category=="Adjustments"? */}
                                                                                    <th>Category</th>
                                                                                    {/* :''} */}
                                                                                    <th>Label</th>

                                                                                    {this.state.fields.tablename == "COLLATERAL BALANCE" ?
                                                                                        <th>SUBI A-Count</th>
                                                                                        : ''}
                                                                                    <th>SUBI A-Balance</th>
                                                                                    {this.state.fields.tablename == "COLLATERAL BALANCE" ?
                                                                                        <th>SUBI B-Count</th>
                                                                                        : ''}
                                                                                    <th>SUBI B-Balance</th>
                                                                                 
                                                                                    {this.state.restrict == true ? '' :
                                                                                        <th className="OptionColumn">Action</th>
                                                                                    }
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>

                                                                                {this.renderRows2()}

                                                                            </tbody>
                                                                        </table>
                                                                        : this.state.DealType=="NPL" ?
                                                                        <table className="table text-left" id="viewServicerData3" >
                                                                            <thead  >
                                                                                {/* <tr className="">
                                                    <th colSpan="6">Field Details</th>
                                                </tr> */}
                                                                                <tr className="tablehead" >
                                                                                    <th>Collection Period</th>

                                                                                    {/* // {this.state.fields.category=="Adjustments"? */}
                                                                                    <th>Category</th>
                                                                                    {/* :''} */}
                                                                                    <th>Label</th>

                                                                                    {this.state.fields.tablename == "COLLATERAL BALANCE" ?
                                                                                        <th>Count</th>
                                                                                        : ''}
                                                                                       {this.state.fields.tablename == "COLLATERAL BALANCE" ?
                                                                                        <th>Principal Balance</th>
                                                                                        : <th>Balance</th>}
                                                                                    {this.state.fields.tablename == "COLLATERAL BALANCE" ?
                                                                                    <th>Deferred Balance</th>
                                                                                :''}
                                                                                     
                                                                                    
                                                                                   
                                                                                    

                                                                                    {this.state.restrict == true ? '' :
                                                                                        <th className="OptionColumn">Action</th>
                                                                                    }
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>

                                                                                {this.renderRows3()}

                                                                            </tbody>
                                                                        </table>: <table className="table text-left" id="viewServicerData3" >
                                                                            <thead  >
                                                                                {/* <tr className="">
                                                    <th colSpan="6">Field Details</th>
                                                </tr> */}
                                                                                <tr className="tablehead" >
                                                                                    <th>Collection Period</th>

                                                                                    {/* // {this.state.fields.category=="Adjustments"? */}
                                                                                    <th>Category</th>
                                                                                    {/* :''} */}
                                                                                    <th>Label</th>

                                                                                    {this.state.fields.tablename == "COLLATERAL BALANCE" ?
                                                                                        <th>Count</th>
                                                                                        : ''}
                                                                                       
                                                                                          <th>Balance</th>
                                                                                    
                                                                                    
                                                                                   
                                                                                    

                                                                                    {this.state.restrict == true ? '' :
                                                                                        <th className="OptionColumn">Action</th>
                                                                                    }
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>

                                                                                {this.renderRows()}

                                                                            </tbody>
                                                                        </table>}
                                                                    <Button variant='outlined' color='primary' className="text-left" style={{ textAlign: "left" }} onClick={this.AddField} >
                                                                        + Add

                                                    </Button>
                                                                    <Button variant='contained' color='primary' className="text-left" style={{ marginLeft: "20px" }} onClick={this.savecategory} >
                                                                        Submit {this.state.savecategoryloader === true ? (
                                                                            <CircularProgress size='25px' color='primary' />
                                                                        ) : (
                                                                                ''
                                                                            )}

                                                                    </Button>
                                                                </React.Fragment>


                                                            </React.Fragment>
                                                            : ''}
                                                    </div>
                                                    : ''
                                                : ''}
                                        </React.Fragment>

                                        {/* <div className='row justify-content-center'>
                          <Button variant='contained' color='primary' type='submit'>

                            Get Fields

                                                        {this.state.report_loader === true ? (
                              <CircularProgress size='25px' color='primary' />
                            ) : (
                                ''
                              )}

                          </Button>
                          <div className="col-md-1">
                            <Button variant="outlined" color="primary" onClick={this.proceed}>Next</Button>
                          </div>

                        </div> */}
                                        {/* </Form>
                                            : <Loader></Loader>} */}
                                        {this.state.investorLoader == true ?
                                            this.state.FormRender == true ?
                                                <React.Fragment>
                                                    {/* {JSON.stringify(this.state)} */}

                                                    <Form
                                                        schema={this.state.schema}
                                                        onSubmit={this.onSubmit}
                                                        onChange={this.onFormChanged1}
                                                        onBlur={this.onBlur}
                                                        widgets={widgets}
                                                        omitExtraData={true}
                                                        liveOmit={true}
                                                        FieldTemplate={CustomFieldTemplate}
                                                        formData={this.state.formData1}
                                                        uiSchema={this.state.uiSchema}
                                                        ObjectFieldTemplate={ObjectFieldTemplate}
                                                    >
                                                        {/* <div class="threecolform">
                                                            <div className="row mb-3">
                                                                <div className="col-md-3">
                                                                    <TextField
                                                                        label={'Relationship Manager*'}
                                                                        variant="filled"
                                                                        size="medium"
                                                                        name="relationshipmanager"
                                                                        // labelId="demo-controlled-open-select-label"
                                                                        id="standard-select-currency"

                                                                        InputLabelProps={{ shrink: this.state.Shrink }}

                                                                        value={this.state.AdditionalFields.relationshipmanager}
                                                                        onChange={this.AdditonalFieldChange}
                                                                    >



                                                                    </TextField>

                                                                </div>


                                                                <div className="col-md-3">

                                                                    <TextField
                                                                        label={'Address*'}
                                                                        variant="filled"
                                                                        name="address"
                                                                        // id="standard-select-currency"
                                                                        // name="numberformat"
                                                                        id="standard-select-currency"

                                                                        value={this.state.AdditionalFields.address}
                                                                        onChange={this.AdditonalFieldChange}
                                                                        InputLabelProps={{
                                                                            shrink: this.state.Shrink
                                                                        }}

                                                                    >


                                                                    </TextField>

                                                                </div>


                                                                <div className="col-md-3">

                                                                    <TextField
                                                                        label={'Email*'}
                                                                        variant="filled"
                                                                        name="email"
                                                                        id="standard-select-currency"

                                                                        value={this.state.AdditionalFields.email}
                                                                        onChange={this.AdditonalFieldChange}
                                                                        InputLabelProps={{ shrink: this.state.Shrink }}
                                                                    >


                                                                    </TextField>

                                                                </div>


                                                            </div>
                                                        </div>
                                                        <div class="threecolform">
                                                            <div className="row mb-3">
                                                                <div className="col-md-3">
                                                                    <TextField
                                                                        label={'Website Reporting*'}
                                                                        variant="filled"
                                                                        size="medium"
                                                                        name="websitereporting"
                                                                        // labelId="demo-controlled-open-select-label"
                                                                        id="standard-select-currency"

                                                                        InputLabelProps={{ shrink: this.state.Shrink }}

                                                                        value={this.state.AdditionalFields.websitereporting}
                                                                        onChange={this.AdditonalFieldChange}
                                                                    >


                                                                    </TextField>

                                                                </div>


                                                                <div className="col-md-3">

                                                                    <TextField
                                                                        label={'First page (optional)'}
                                                                        variant="filled"
                                                                        name="addtionalfirst"
                                                                        // id="standard-select-currency"
                                                                        // name="numberformat"
                                                                        id="standard-select-currency"

                                                                        value={this.state.AdditionalFields.addtionalfirst}
                                                                        onChange={this.AdditonalFieldChange}
                                                                        InputLabelProps={{
                                                                            shrink: this.state.Shrink
                                                                        }}

                                                                    >


                                                                    </TextField>

                                                                </div>


                                                                <div className="col-md-3">

                                                                    <TextField
                                                                        label={'Last page (optional)'}
                                                                        variant="filled"
                                                                        name="additionallast"
                                                                        id="standard-select-currency"
                                                                        value={this.state.AdditionalFields.additionallast}
                                                                        onChange={this.AdditonalFieldChange}
                                                                        InputLabelProps={{ shrink: this.state.Shrink }}
                                                                    >


                                                                    </TextField>

                                                                </div>


                                                            </div>
                                                        </div>
                                                        <div class="threecolform">
                                                            <div className="row mb-3">
                                                                <div className="col-md-3">
                                                                    <TextField
                                                                        label={'New Logic?*'}
                                                                        variant="filled"
                                                                        size="medium"
                                                                        name="newlogic"
                                                                        // labelId="demo-controlled-open-select-label"
                                                                        id="standard-select-currency"
                                                                        select
                                                                        InputLabelProps={{ shrink: this.state.Shrink }}
                                                                        // defaultValue="true"
                                                                        value={this.state.AdditionalFields.newlogic}
                                                                        onChange={this.AdditonalFieldChange}
                                                                    >
                                                                        <MenuItem value={"true"}>Yes</MenuItem>
                                                                        <MenuItem value={"false"}>No</MenuItem>



                                                                    </TextField>
                                                                        <div>
                                                                        <p className="help-block2">(Any new change in the trustee report)</p>
                                                                    </div>

                                                                </div>
                                                                <div className="col-md-3">

                                                                    <MySelect
                                                                        className='as-shifted'
                                                                        options={this.state.processoroption}
                                                                        isMulti
                                                                        placeholder='Select Investor Ids'
                                                                        closeMenuOnSelect={false}
                                                                        maxMenuHeight={100}
                                                                        hideSelectedOptions={false}
                                                                        components={{
                                                                            Option,
                                                                            MultiValue,
                                                                            ValueContainer,

                                                                        }}
                                                                        onChange={this.handleChange}
                                                                        allowSelectAll={true}
                                                                        value={this.state.processorarrray}
                                                                        styles={customStyle}
                                                                    />
                                                                    <div>
                                                                        <p className="help-block2">(Select the investor id for which this report needs to be published)</p>
                                                                    </div>
                                                                </div>


                                                            </div>
                                                        </div> */}
                                                        <div className="row justify-content-center selectbox">
                                                            <MySelect
                                                                className='as-shifted'
                                                                options={this.state.processoroption}
                                                                isMulti
                                                                placeholder='Select Investor Ids'
                                                                closeMenuOnSelect={false}
                                                                maxMenuHeight={100}
                                                                hideSelectedOptions={false}
                                                                components={{
                                                                    Option,
                                                                    MultiValue,
                                                                    ValueContainer,

                                                                }}
                                                                onChange={this.handleChange}
                                                                allowSelectAll={true}
                                                                value={this.state.processorarrray}
                                                                styles={customStyle}
                                                            />

                                                        </div>
                                                        <div>
                                                            <p className="help-block2">(Select the investor id for which this report needs to be published)</p>
                                                        </div>
                                                        <div className="row justify-content-center" >
                                                            <Button variant="contained" style={{ marginTop: "50px" }} color="primary" disabled={this.state.generatebutton === true ? true : false} type="submit">
                                                                Generate Trustee Report {this.state.getLoansLoader === true ? (
                                                                    <CircularProgress size='25px' color='primary' />
                                                                ) : (
                                                                        ''
                                                                    )} </Button>
                                                            <div className="col-md-1">
                                                                <Button variant="outlined" style={{ marginTop: "50px" }} color="primary" onClick={this.proceed}>Next</Button>
                                                            </div>
                                                        </div>
                                                    </Form>
                                                </React.Fragment>
                                                : ''
                                            : ''}
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

export default withSnackbar(generateInvestorReport)

import React, { Component } from 'react';
import Header from '../../../components/header';
import Sidebar from '../../../components/sidebar';
import Button from '@material-ui/core/Button';
import { withTheme } from 'react-jsonschema-form';
import { Theme as MuiTheme } from 'rjsf-material-ui';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import { widgets, CustomFieldTemplate, customStyles, ObjectFieldTemplate } from '../../../components/customscripts/customscript'
import { withSnackbar } from 'notistack';
import LinearLoader from '../../../components/loader/LinearLoader';
import Loader from '../../../components/loader';
import { InvestorList, GetAllDeals, generateYears, months, AdjustmentMonth, EnableDisable, Prompt, GenerateReport, GetAdditionalDetails } from '../../../servies/services';
import DataDictionary from '../../../components/DataDictionary';
import ReactSelect from "react-select";
import MySelect from "./MySelect.js";
import { components } from "react-select";

const Form = withTheme(MuiTheme);
const schema1 = require('./schema1.json');

const LimaSchema = require('./LimaSchema.json');
const BawagSchema = require('./BawagSchema.json');
const SaludaSchema = require('./SaludaSchema.json');
const SaludagradeSchema = require('./SaludagradeSchema.json');
const SaludaSeqSchema = require('./SaludaSeqSchema.json');
const AlphaflowSchema = require('./AlphaflowSchema.json');
const Fig2Schema = require('./Fig2Schema.json');
const Bc1Schema = require('./Bc1Schema.json');
const ReigoSchema = require('./ReigoSchema.json');
const Saludawl1Schema = require('./Saludawl1Schema.json');
const DominionSchema = require('./DominionSchema.json');
const SprucehillSchema = require('./SprucehillSchema.json')
const Saludartl1Schema = require('./Saludartl1Schema.json');
const StoaSchema = require('./StoaSchema.json');
const TildeneSchema = require('./TildeneSchema.json')
const Saludamf1Schema = require('./Saludamf1Schema.json');
const PalisadesSchema = require('./PalisadesSchema.json');
const Saludartl2Schema = require('./Saludartl2Schema.json');

// SaludaSeqSchema.json
const uiDateSchema = {

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
  control:( base,state) => ({
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
      borderColor:"#144e4a"
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
      processoroption: []


    };
  }

  // handleChange = (event) => {
  //   const { formData1 } = this.state;
  //   formData1[event.target.name] = event.target.value;
  //   this.setState({ formData1 });
  //   console.log(formData1);

  // }

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
    console.log("schema", schema)
    let formData = {
      dealId: DealId,
      month: DealMonth,
      year: DealYear,

    }

    this.setState({ formData: formData })


  }



  async componentWillReceiveProps(nextProps) {
    console.log("nextProps", nextProps)

    const DealId = this.props.match.params.DealId;
    const DealMonth = this.props.match.params.DealMonth;
    const DealYear = this.props.match.params.DealYear;
    const DealType = this.state.DealType;
    this.selectSchema(DealId, DealMonth, DealYear, DealType);

    let formData = {
      dealId: DealId,
      month: DealMonth,
      year: DealYear,

    }

    this.setState({ formData: formData })

    // this.callMethod(DealId, DealMonth, DealYear);

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


    // this.setState({ schema: LimaSchema, uiSchema: uiSchemaLima, schemaLoader: true });
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
        var data = this.state.formData
        data.additionalDetailsTemplate["relationshipmanager"] = APIResponse.data.relationshipmanager;
        data.additionalDetailsTemplate["address"] = APIResponse.data.address;
        data.additionalDetailsTemplate["email"] = APIResponse.data.email;
        data.additionalDetailsTemplate["websitereporting"] = APIResponse.data.websitereporting;
        this.setState({ formData: data })
        console.log(data)
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

      let oldSchema = this.state.schema;
      console.log("oldstagedata", oldSchema);
      oldSchema.properties.investorid.enum = UserID;
      oldSchema.properties.investorid.enumNames = UserName;
      const newSchema = Object.assign({}, oldSchema);
      console.log("WRITE oldSchema", newSchema);
      this.setState({ schema: newSchema, processoroption: y, investorLoader: true, report_loader: false });
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

  onSubmit1 = async (value) => {
    console.log("ONSUBMIT1", value)
    this.setState({ formData: value.formData, report_loader: true });
    let dealTypeMain = localStorage.getItem('DealType')
    let DealMonth = value.formData.month;
    let DealYear = value.formData.year;
    if (parseInt(DealMonth) <= 3 && (parseInt(DealYear) == 2021 || parseInt(DealYear) == 2022 || parseInt(DealYear) == 2020)) {
      this.setState({ FormRender: true })
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
      this.setState({ schema: schema, uiSchema: uiSchema })
    }
    else {

    }
    this.InvestorList(dealTypeMain);

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
        if(key.value!=="*"){
        investIDS.push( key.value )
        }
      });
    }
    console.log("investIDS",investIDS)
    data.investorid = investIDS;
    data.dealId = this.state.formData.dealId
    data.month = this.state.formData.month
    data.year = this.state.formData.year
    console.log("coming from schema" + JSON.stringify(data));

    let dealId = this.state.formData.dealId;
    let month = this.state.formData.month;
    let year = this.state.formData.year;
    let DealType = this.state.DealType;

    console.log("data onSubmit onSubmit", data)

    let channelname = this.state.channelname


    const newlogic = value.formData.newlogic;
    // this.setState({data:data})
    // // alert(newlogic)
    // if (newlogic == "false") {
    //   this.newlogic( dealId, month, year, channelname,data);
    //   this.setState({ generatebutton: true });
    // }
    // else {
    //   // this.setState({ generatebutton: false });

    //   this.GenerateReportWithPrompt(DealType, dealId, month, year, channelname, data)





    // }

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
            this.GenerateReport(data)
          }
          else {
            window.location.reload(true)
          }

        }
        else {
          this.GenerateReport(data)
        }

      }
    }
  }
  GenerateReport = async (value) => {
    let DealType = this.state.DealType;


    console.log("GenerateReport", value);



    // formData
    const APIResponse = await GenerateReport(value, DealType)
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
                        <div className='row justify-content-center'>
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

                        </div>
                      </Form>
                      : <Loader></Loader>}
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
                              <Button variant="contained" style={{marginTop: "50px"}} color="primary" disabled={this.state.generatebutton === true ? true : false} type="submit">
                                Generate Trustee Report {this.state.getLoansLoader === true ? (
                                  <CircularProgress size='25px' color='primary' />
                                ) : (
                                    ''
                                  )} </Button>
                              <div className="col-md-1">
                                <Button variant="outlined" style={{marginTop: "50px"}} color="primary" onClick={this.proceed}>Next</Button>
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

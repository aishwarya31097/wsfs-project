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
import { GetAllDeals, generateYears, months, ServicerDataBlockchain ,addApprovedUserDetails} from '../../../servies/services';
import NumberComp from '../../../components/NumberComp';
import UpdatePassword  from './UpdatePassword'

const Form = withTheme(MuiTheme);
const schema = require('./schema.json');

const uiSchema = {

  
    "OrgName": {
      "ui:autofocus": false,
      "ui:emptyValue": "",
      "ui:autocomplete": false,
      "ui:readonly": true
    },
    "UserName": {
      "ui:autofocus": false,
      "ui:emptyValue": "",
      "ui:autocomplete": false,
      "ui:readonly": true
    }
  };
class servicerDataDB extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schema: schema,
            uiSchema:uiSchema,
            years: generateYears(),
            months: months,
            getLoansLoader: false,
            open: false,
            InvestorReportBox: false,
            onboardservicerdata: null,
            getLoader: false,
            pageTitle: "Update Profile",
            UpdatePassword:false,
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
        let UserName = localStorage.getItem('user_name');
        let OrgName =localStorage.getItem('OrgName');
        let UserId = localStorage.getItem('UserId');
        // let ChannelName = params.get('ChannelName');
        
        // alert(UserId)
        const formData = {
          "UserName": UserName,
          "OrgName": OrgName,
          // "channelname": ChannelName,
    
    
        }
    
        this.setState({ formData: formData, UserId: UserId,loadingForm:true })
    
        // console.log("componentDidMount DealId", typeof (this.props.match.params.DealId), this.props.match.params.DealMonth, this.props.match.params.DealYear);
        // const DealId = this.props.match.params.DealId;
        // const DealMonth = this.props.match.params.DealMonth;
        // const DealYear = this.props.match.params.DealYear;
        // this.callMethod(DealId, DealMonth, DealYear);

        // if (DealId != "null" && DealId != undefined &&  DealMonth != "null"  && DealMonth != undefined && DealYear != "null" && DealYear != undefined) {
        //     let value = {
        //         "formData": {
        //             "dealId": DealId,
        //             "month": DealMonth,
        //             "year": DealYear,
        //         }
        //     }
        //     this.onSubmit(value);
        // } else {

        // }

    }

    async componentWillReceiveProps(nextProps) {
        console.log("nextProps", nextProps)
        let UserName = localStorage.getItem('user_name');
        let OrgName =localStorage.getItem('OrgName');
        let UserId = localStorage.getItem('UserId');
        // let ChannelName = params.get('ChannelName');
        
        // alert(UserId)
        const formData = {
          "UserName": UserName,
          "OrgName": OrgName,
          // "channelname": ChannelName,
    
    
        }
    
        this.setState({ formData: formData, UserId: UserId,loadingForm:true })
    
        // let DealId = nextProps.match.params.DealId;
        // let DealMonth = nextProps.match.params.DealMonth;
        // let DealYear = nextProps.match.params.DealYear;
        // this.callMethod(DealId, DealMonth, DealYear);
    }
    updatepassbtn=()=>{
        console.log("insideee updatepassbtn")
        this.setState({UpdatePassword:true,updatepassbtn:true })
    }

    OpenClose=(data)=>{
        console.log("OpenClose", data);
        this.setState({updatepassbtn:false })
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
        console.log('onSubmit:', value.formData)
        let data = value.formData;
        // data.UserID = this.state.UserId
        console.log("++++++++"+data)
        let DealType=this.state.DealType;
        this.setState({ loading: true })
        const APIResponse = await addApprovedUserDetails(DealType,data)
        console.log("authenticate", APIResponse)
        if (APIResponse !== null) {
    
          this.setState({ loading: false })
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
    
            if (APIResponse.data.Success == false) {
    
              this.setState({ formLoader: false })
              const message = "Profile Update unsucessful";
              this.props.enqueueSnackbar(message, {
                variant: 'error',
                autoHideDuration: 2000,
              });
    
            } else {
    
              // console.log("data.data", APIResponse.data.data)
              // console.log("APIResponse.data.data.UserName", APIResponse.data.data.UserName)
    
              this.setState({ formLoader: false })
              const message = "Profile Updated Successfully";
              this.props.enqueueSnackbar(message, {
                variant: 'info',
                autoHideDuration: 2000,
              });
            }
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
                                    
                                    <h3 className="title-page">{!this.state.pageTitle ? '' : this.state.pageTitle}
                                    <Button variant='contained' color='primary' type='submit' onClick={()=>this.updatepassbtn()} style={{float:"right"}}>

Update Password

     {this.state.report_loader === true ? (
         <CircularProgress size='25px' color='primary' />
     ) : (
             ''
         )}

 </Button>
             
                                    </h3>
                               
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

                                                   Update

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
                                        {this.state.updatepassbtn==true?
                                       <UpdatePassword    OpenClose={this.OpenClose}  >
                               
                                       </UpdatePassword>
:''}
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
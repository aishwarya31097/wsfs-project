import React, { Component } from 'react'
import Header from '../../../components/header';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import Loader from '../../../components/loader';
import { withSnackbar } from 'notistack';
import * as moment from 'moment'
import { widgets, CustomFieldTemplate, customStyles, customStylesauto, ObjectFieldTemplate } from '../../../components/customscripts/customscript';
import LinearLoader from '../../../components/loader/LinearLoader';
import { InitialSetup, GetAllDealsLogin, initialsetupQuery } from '../../../servies/services';

import { withTheme } from 'react-jsonschema-form';
import { Theme as MuiTheme } from 'rjsf-material-ui';
const Form = withTheme(MuiTheme)


let dealTypeMain = localStorage.getItem('DealType');


class intermediate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            formLoader: false,
            open: false,
            open2: false,
            pageTitle: "Deal Names List",
            getLoader: false,
            token: localStorage.getItem("token"),
            userid: localStorage.getItem("userid"),
            UserName: localStorage.getItem("user_name"),

            OrgName: localStorage.getItem('OrgName'),
            DealType: '',
            peers: localStorage.getItem('peers'),
            peer: localStorage.getItem('peer'),
            all_deals_id: JSON.parse(localStorage.getItem("all_deals_id")),
            table_data:[],
            channelname: localStorage.getItem('ChannelName'),
            checkDealId: null,
        }
    }


    async componentDidMount() {
        localStorage.setItem("DealType", '');
        localStorage.setItem('ChannelName', '');
        const userid = this.state.userid;
        const DealType = this.state.DealType
        this.GetAllDealsId();
    }

    GetAllDealsId = async ()=> {
        console.log("this.state.all_deals_Id", this.state.all_deals_id);
        let all_deals = this.state.all_deals_id
        console.log("this.state.all_deals_Id", all_deals);
        this.setState({ loading: true, table_data: all_deals, total_deals:all_deals.length });
    }


    onSubmit = async (value) => {
        // alert(value)

        let dealtype = value

        localStorage.setItem('ChannelName', dealtype);
        localStorage.setItem("DealType", dealtype);
        this.setState({getLoader:true})

        this.GetAllDeals(dealtype, this.state.token, this.state.peer, dealtype,this.state.OrgName,this.state.UserName)
    }

    GetAllDeals = async (DealType, token, peer, ChannelName) => {

        console.log("GetAllDeals", DealType, token, peer, ChannelName)
const Role=this.state.OrgName
        const APIResponse = await GetAllDealsLogin(DealType, token, peer, ChannelName,Role)

        if (APIResponse.status == "200") {
        console.log("GetAllDeals APIResponse", APIResponse, this.state.years, this.state.months)
        let deal_name = []
        if (APIResponse.data.length !== 0) {
            APIResponse.data.map((item) => {
            console.log("item", item);
            deal_name.push({ "deal_id": item });
            })
        }
        this.setState({ getLoader: false })
        const message = "Logged in successfully";
        this.props.enqueueSnackbar(message, {
            variant: 'info',
            autoHideDuration: 2000,
        });

        localStorage.setItem('all_deals', JSON.stringify(deal_name));
        window.location.assign("/report/trusteedeal/dashboard/");

        }

    };
    GetAllDeals = async (DealType, token, peer, ChannelName,Role,UserName) => {

        console.log("GetAllDeals", DealType, token, peer, ChannelName,Role,UserName)
        const APIResponse = await GetAllDealsLogin(DealType, token, peer, ChannelName,Role,UserName)
        if (APIResponse.status == "200") {
          console.log("GetAllDeals APIResponse", APIResponse, this.state.years, this.state.months)
          let deal_name = []
          if (APIResponse.data.length !== 0) {
            APIResponse.data.map((item) => {
              console.log("item", item);
              deal_name.push({ "deal_id": item });
            })
          }
          this.setState({ formLoader: false })
          const message = "Logged in successfully";
          this.props.enqueueSnackbar(message, {
            variant: 'info',
            autoHideDuration: 2000,
          });
    
    
    

          localStorage.setItem('all_deals', JSON.stringify(deal_name));
          window.location.assign("/report/trusteedeal/dashboard/");
    
       }
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
                                    <h3 className="title-page">{!this.state.pageTitle ? '' : 'Select a Deal Name'}

                                    </h3>
                                </div>

                                <div className="col-md-12">
                                    <div class="index" >
                                        <div class="wrapper-pdf">
                                            <ul>
                                                <React.Fragment>
                                                { this.state.table_data.map((item,index) => {
                                       
                                                    return( 
                                           
                                                        <li > <a> 
                                                            <div class="inner" id="alldealnames" onClick={()=>{this.onSubmit(item.key)}}>
                                                                {item.key.replace(/([a-z])([A-Z])/g, '$1 $2')}
                                                            </div>
                                                         </a> </li>                                          
                                                    );
                                                        
                                                })}
                                                </React.Fragment>
                                            </ul>
                                        </div>
                                    </div>
                                  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default withSnackbar(intermediate);
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import FormLoader from '../../../components/formLoader';
import { withTheme } from 'react-jsonschema-form';
import { Theme as MuiTheme } from 'rjsf-material-ui';
import $ from 'jquery';
import LinkItem from '../../../components/linkItem';
import { withSnackbar } from 'notistack';
import { authenticate, getAllUserRoles, GetAllDealsLogin, NextAPI,GetUserRole,createUserRole } from '../../../servies/services';
import Logo from '../../../images/wsfs-logo.jpg';
import Footer from '../../../components/footer/footer'
import CryptoJS from 'crypto-js';


const Form = withTheme(MuiTheme);
const schema = require('./schema.json');
const uiSchema = {
  'Password': {
    'ui:widget': 'password',
  },
};

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schema: schema,
      uiSchema: uiSchema,
      formData: {},
      loading: false,
      OrgLoading: false,
      role_list: [],
      remainingAttempts: 3,



    };
  }


  onChange = (e) => {
    const formData = this.state.formData;
    formData[e.target.name] = e.target.value;
    this.setState({
      formData,
    });
    console.log('formData', this.state.formData);
  }






  // 

  // Function for getting handling all events

  onSubmit = async () => {
    console.log("this.state.formData", this.state.formData)
    if (this.state.formData.UserName == undefined || this.state.formData.Password == undefined || this.state.formData.OrgName == undefined || this.state.formData.DealName == undefined) {
      const message = "Please select all fields";
      this.props.enqueueSnackbar(message, {
        variant: 'error',
        autoHideDuration: 5000,
      });
    } else {
      const DealType = $('#userroleid option:selected').attr('data-type');
      const OrgName2 = $('#userroleid option:selected').attr('value');
      console.log("DealType",DealType,OrgName2)
var data={}
      if(this.state.formData.OrgName=="wsfstrustee"){

 data=this.state.formData
 this.authenticate(DealType,data)
//  this.createUserRole(DealType)
      }
      else{
     data={
          DealName:this.state.formData.DealName,
          OrgName:OrgName2,
          UserName:this.state.formData.UserName,
          Password:this.state.formData.Password
        }
        this.authenticate(DealType,data)
//  this.createUserRole(DealType)
 


        // this.GetUserRole(DealType,this.state.formData.OrgName)
      }
      // const DealType = $('#userroleid option:selected').attr('data-type');
      

      // this.setState({ loading: true })
      // const APIResponse = await authenticate(DealType, data)
      // // console.log("authenticate", APIResponse, APIResponse.status)
      // this.setState({ loading: false })
      // if (APIResponse !== null || APIResponse !== undefined) {
      //   if (APIResponse.status == 204) {
      //     this.setState({ remainingAttempts: this.state.remainingAttempts - 1 })


      //     if (this.state.remainingAttempts <= 0) {
      //       this.setState({ loading: true });

      //       setTimeout(() => this.setState({ loading: false, remainingAttempts: 3 }), 180000);

      //       const message = "Your login attempts expired please wait for 3 minute";
      //       this.props.enqueueSnackbar(message, {
      //         variant: 'error',
      //         autoHideDuration: 5000,
      //       });
      //     }
      //     else {
      //       const message = "Credentials Incorrect";
      //       this.props.enqueueSnackbar(message, {
      //         variant: 'error',
      //         autoHideDuration: 2000,
      //       });
      //     }
      //   }
      //   else if (APIResponse.status !== 200) {
      //     const message = "Something went wrong, please try again";
      //     this.props.enqueueSnackbar(message, {
      //       variant: 'error',
      //       autoHideDuration: 5000,
      //     });
      //   }
      //   else {
      //     if (APIResponse.data.isSuccess == false) {
      //       this.setState({ formLoader: false })
      //       const message = "Credentials Incorrect";
      //       this.props.enqueueSnackbar(message, {
      //         variant: 'error',
      //         autoHideDuration: 2000,
      //       });
      //     } else {
      //       if (APIResponse.data != "undefined") {
      //         let OrgName = APIResponse.data.data.OrgName;
      //         localStorage.setItem("DealType", DealType);
      //         localStorage.setItem("OrgName", OrgName);
      //         localStorage.setItem('user_id', APIResponse.data.data.UserID)
      //         localStorage.setItem('user_name', APIResponse.data.data.FirstName);
      //         localStorage.setItem('token', APIResponse.data.response.token);
      //         localStorage.setItem('ChannelName', DealType);
      //         localStorage.setItem('emailid', APIResponse.data.data.EmailID);

      //         var pass = this.state.formData.Password;
      //         var key = CryptoJS.enc.Latin1.parse('ALtReKQqUH1VTh43vNomog==');
      //         var iv = CryptoJS.enc.Latin1.parse('9988543267190345');
      //         var encrypted = CryptoJS.AES.encrypt(
      //           pass,
      //           key,
      //           {
      //             iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding
      //           });
      //         console.log('encrypted: ' + encrypted);
      //         var decrypted = CryptoJS.AES.decrypt(encrypted, key, { iv: iv, padding: CryptoJS.pad.ZeroPadding });
      //         console.log('decrypted: ' + decrypted.toString(CryptoJS.enc.Utf8));
      //         localStorage.setItem('Pass', encrypted)


      //         let ChannelName = DealType
      //         // WSFS Stagin custer
      //         let peer = "peer0." + APIResponse.data.data.OrgName + "-net";
      //         let p1 = "peer0." + APIResponse.data.data.OrgName + "-net";

      //         let peers = [p1]
      //         localStorage.setItem('peer', peer);
      //         localStorage.setItem('peers', JSON.stringify(peers));

      //         if (APIResponse.data.data.UserName == "admin") {
      //           this.setState({ formLoader: false })
      //           const message = "Logged in successfully";
      //           this.props.enqueueSnackbar(message, {
      //             variant: 'info',
      //             autoHideDuration: 2000,
      //           });
      //           window.location.assign("/admin/users/" + APIResponse.data.data.OrgName + "/Pending");
      //         }
      //         else {

      //           let token = APIResponse.data.response.token
      //           this.GetAllDeals(DealType, token, peer, ChannelName, APIResponse.data.data.OrgName, APIResponse.data.data.FirstName)

      //           // if (APIResponse.data.data.OrgName == "wsfstrustee") {
      //           //   let token = APIResponse.data.response.token
      //           //   this.GetAllDeals(DealType, token, peer, ChannelName)
      //           // }
      //           // else if (APIResponse.data.data.OrgName === 'investor') {
      //           //   let token = APIResponse.data.response.token
      //           //   this.GetAllDeals(DealType, token, peer, ChannelName)
      //           // }
      //           // else {
      //           //   alert("Role not found - user type")
      //           // }

      //         }
      //       }

      //     }
      //   }
      // }
    }
  }
GetUserRole = async (DealType,role)=>{
  this.setState({ loading: true })
  const APIResponse = await GetUserRole(DealType,role)
  // console.log("authenticate", APIResponse, APIResponse.status)
 
  if (APIResponse !== null || APIResponse !== undefined) {
    if (APIResponse.status == 204) {
      const message = "Data not present";
      this.props.enqueueSnackbar(message, {
        variant: 'error',
        autoHideDuration: 2000,
      });

     
      }
      else {
           var  data={
          DealName:this.state.formData.DealName,
          OrgName:APIResponse.data.UserRoleName,
          UserName:this.state.formData.UserName,
          Password:this.state.formData.Password
        }
this.authenticate(DealType,data)
// this.createUserRole(DealType)

      }
    }
}
createUserRole = async (DealType,value)=>{
  console.log('dealtype',DealType)
 let data ={
  dealname:"NPL",
  UserRoleName:"wsfstrustee",
 }
  const APIResponse = await createUserRole(DealType,data)
  // console.log("authenticate", APIResponse, APIResponse.status)
}
 authenticate = async (DealType,data) =>{
  this.setState({ loading: true })
  const APIResponse = await authenticate(DealType, data)
  // console.log("authenticate", APIResponse, APIResponse.status)
  this.setState({ loading: false })
  if (APIResponse !== null || APIResponse !== undefined) {
    if (APIResponse.status == 204) {
      this.setState({ remainingAttempts: this.state.remainingAttempts - 1 })


      if (this.state.remainingAttempts <= 0) {
        this.setState({ loading: true });

        setTimeout(() => this.setState({ loading: false, remainingAttempts: 3 }), 180000);

        const message = "Your login attempts expired please wait for 3 minute";
        this.props.enqueueSnackbar(message, {
          variant: 'error',
          autoHideDuration: 5000,
        });
      }
      else {
        const message = "Credentials Incorrect";
        this.props.enqueueSnackbar(message, {
          variant: 'error',
          autoHideDuration: 2000,
        });
      }
    }
    else if (APIResponse.status !== 200) {
      const message = "Something went wrong, please try again";
      this.props.enqueueSnackbar(message, {
        variant: 'error',
        autoHideDuration: 5000,
      });
    }
    else {
      if (APIResponse.data.isSuccess == false) {
        this.setState({ formLoader: false })
        const message = "Credentials Incorrect";
        this.props.enqueueSnackbar(message, {
          variant: 'error',
          autoHideDuration: 2000,
        });
      } else {
        if (APIResponse.data != "undefined") {
          let OrgName = APIResponse.data.data.OrgName;
          localStorage.setItem("DealType", DealType);
          localStorage.setItem("OrgName", OrgName);
          localStorage.setItem('user_id', APIResponse.data.data.UserID)
          localStorage.setItem('user_name', APIResponse.data.data.FirstName);
          localStorage.setItem('token', APIResponse.data.response.token);
          localStorage.setItem('ChannelName', DealType);
          localStorage.setItem('emailid', APIResponse.data.data.EmailID);

          var pass = this.state.formData.Password;
          var key = CryptoJS.enc.Latin1.parse('ALtReKQqUH1VTh43vNomog==');
          var iv = CryptoJS.enc.Latin1.parse('9988543267190345');
          var encrypted = CryptoJS.AES.encrypt(
            pass,
            key,
            {
              iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding
            });
          console.log('encrypted: ' + encrypted);
          var decrypted = CryptoJS.AES.decrypt(encrypted, key, { iv: iv, padding: CryptoJS.pad.ZeroPadding });
          console.log('decrypted: ' + decrypted.toString(CryptoJS.enc.Utf8));
          localStorage.setItem('Pass', encrypted)


          let ChannelName = DealType
          // WSFS Stagin custer
          let peer = "peer0." + APIResponse.data.data.OrgName + "-net";
          let p1 = "peer0." + APIResponse.data.data.OrgName + "-net";

          let peers = [p1]
          localStorage.setItem('peer', peer);
          localStorage.setItem('peers', JSON.stringify(peers));

          if (APIResponse.data.data.UserName == "admin") {
            this.setState({ formLoader: false })
            const message = "Logged in successfully";
            this.props.enqueueSnackbar(message, {
              variant: 'info',
              autoHideDuration: 2000,
            });
            window.location.assign("/admin/users/" + APIResponse.data.data.OrgName + "/Pending");
          }
          else {

            let token = APIResponse.data.response.token
            this.GetAllDeals(DealType, token, peer, ChannelName, APIResponse.data.data.OrgName, APIResponse.data.data.FirstName)

            // if (APIResponse.data.data.OrgName == "wsfstrustee") {
            //   let token = APIResponse.data.response.token
            //   this.GetAllDeals(DealType, token, peer, ChannelName)
            // }
            // else if (APIResponse.data.data.OrgName === 'investor') {
            //   let token = APIResponse.data.response.token
            //   this.GetAllDeals(DealType, token, peer, ChannelName)
            // }
            // else {
            //   alert("Role not found - user type")
            // }

          }
        }

      }
    }
  }
 }

 GetAllDeals = async (DealType, token, peer, ChannelName, Role, UserName) => {

  console.log("GetAllDeals", DealType, token, peer, ChannelName, Role, UserName)
  const APIResponse = await GetAllDealsLogin(DealType, token, peer, ChannelName, Role, UserName)
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
    // console.log("GetAllDealNames", token, peer)
    // const APIResponse = await ListAllDeals(token, peer)

    // if (APIResponse.status == "200") {
    //   console.log("GetAllDealNames APIResponse", APIResponse, this.state.years, this.state.months)
    //   let deal_name = APIResponse.data

    //   this.setState({ formLoader: false })
    //   const message = "Logged in successfully";
    //   this.props.enqueueSnackbar(message, {
    //     variant: 'info',
    //     autoHideDuration: 2000,
    //   });
    //   localStorage.setItem('all_deals_id', JSON.stringify(deal_name));
    //   window.location.assign("/dealnames");

    //   localStorage.setItem("DealType", '');
    localStorage.setItem('all_deals', JSON.stringify(deal_name));
    window.location.assign("/report/trusteedeal/dashboard/");

  }
}


  async componentDidMount() {
    localStorage.clear();
    this.getAllUserRoles();

    if (sessionStorage.getItem("OrgName") === null) {
      this.getAllUserRoles();
    } else {
      const OrgName = JSON.parse(sessionStorage.getItem("OrgName"))
      this.setState({ OrgLoading: true });
      this.setState({ role_list: OrgName })

    }

  }

  getAllUserRoles = async () => {
  //   var data2=[
  //     {
  //         "_id": "638f2fe78587ce7775adae6e",
  //         "DealName": "LimaOne",
  //         "UserRoleID": "12345-67891-0000-0001",
  //         "UserRoleName": "wsfstrustee"
  //     },
  //     {
  //         "_id": "638f30bdd675ba783b60047e",
  //         "DealName": "Saluda PAC1",
  //         "UserRoleID": "12345-67891-0000-0001",
  //         "UserRoleName": "wsfstrustee"
  //     },
  //     {
  //         "_id": "638f311d08a72178b4178383",
  //         "DealName": "Saluda PAC1",
  //         "UserRoleID": "12345-67891-0000-0002",
  //         "UserRoleName": "saludapacinv"
  //     },
  //     {
  //         "_id": "638f8ecb1799658680c3d93f",
  //         "DealName": "LimaOne",
  //         "UserRoleID": "12345-67891-0000-0002",
  //         "UserRoleName": "limaoneissuer"
  //     }
  // ]
  //       this.setState({ OrgLoading: true, role_list: data2 });
    const APIResponse = await getAllUserRoles()
    if (APIResponse != null) {
      console.log("getAllUserRoles APIResponse.data", APIResponse.data);
      this.setState({ OrgLoading: true, role_list: APIResponse.data });


      sessionStorage.setItem("OrgName", JSON.stringify(APIResponse.data))
    } else {
      this.setState({ OrgLoading: true })
    }

  }

  render() {
   const x= this.state.formData
   console.log("XXX",x)
    return (
      <React.Fragment>
        {this.state.loading === true ?
          <FormLoader></FormLoader>
          : ''}
        <h4>Log in to your account to access WSFS</h4>
        <div className="form_row_single">
          {this.state.OrgLoading === false ?
            <React.Fragment>
              <FormLoader></FormLoader>
              <p className="loading_text">Loading, Please wait...</p>
            </React.Fragment>
            :
            <React.Fragment>
              <div className="loginForm">
                <p> <label>Username</label> <input name="UserName" id="" onChange={this.onChange} className="form-control" value={this.state.formData.UserName} /> </p>
                <p> <label>Password</label> <input name="Password" type="password" onChange={this.onChange} className="form-control" value={this.state.formData.Password} /> </p>
                <p> <label>Role</label>

                  <div className="row">

                    <label className="form-check-label radiorole">
                      <input className="form-check-input radio-inline" type="radio" onChange={this.onChange} name="OrgName" id="gridRadios1" value="wsfstrustee" />
                      Trustee</label>
                    <label className="form-check-label radiorole">
                      <input className="form-check-input radio-inline" type="radio" onChange={this.onChange} name="OrgName" id="gridRadios2" value="investor" />
                      Issuer</label>

                  </div>
                  </p>

                  <p> <label>DealName</label>

                  <select name="DealName" id="userroleid" onChange={this.onChange} className="form-control" >
                    <option value={''} >{'Select Deal Name'}</option>
                    {this.state.role_list.length != 0 ?
                      this.state.role_list.map((key,value) => {
                        console.log(key,value)
                        return (
                          // <React.Fragment>
                           
                          //   {value.map((item) => {

                          //     console.log(item)
                          //     return (
                                key.UserRoleName.includes("inv") || key.UserRoleName.includes("issuer") ?
                                <option data-type={key.DealName}  value={key.UserRoleName}>{key.DealName}</option>
                                :''
                          //     );
                          //   })
                          //   }
                          // </React.Fragment>
                        );
                      })
                      : ''}
                  </select>
                  </p>
                  {/* <select name="OrgName" id="userroleid" onChange={this.onChange} className="form-control" >
                    <option value={''} >{'Select Deal Name'}</option>
                    {this.state.role_list.length != 0 ?
                      Object.entries(this.state.role_list).map(([key, value]) => {
                        return (
                          <React.Fragment>

                            <optgroup label={key} > {key} </optgroup>
                            {value.map((item) => {
                              return (
                                <option data-type={key} selected={this.state.formData.UserRoleName == item.UserRoleName} value={item.UserRoleName}>{item.UserRoleName}</option>
                              );
                            })
                            }
                          </React.Fragment>
                        );
                      })
                      : ''}
                  </select> */}
               

                <p>
                  <Button className="col-md-12" onClick={this.onSubmit} variant="contained" size="large" color="primary" id="signinbutton" type="submit"
                    disabled={this.state.loading === true ? true : false} > Sign in </Button>


                </p>
              </div>
            </React.Fragment>
          }

        </div>
        <div className="loginCheckbox">
          <p className="lineDivider">
            <span>New to  WSFS?</span>
          </p>
          <LinkItem to={'/register'} variant="contained" className="loginBtn" title={'Create your Account'}> </LinkItem>

          {/* <div class="text-center Poweredby">Powered by <img id="wsfs_logo_first" style={{ width: "70px", height: "30px", marginTop:"-15px" }}
                                // src={"http://in-d.ai/wp-content/uploads/2020/11/WSFSLogo.png"
                                          src={"https://wsfs.intainabs.com/logo.jpg"
                                }
                            /></div> */}




        </div>
        <Footer></Footer>
      </React.Fragment>
    );
  }
}

export default withSnackbar(login);

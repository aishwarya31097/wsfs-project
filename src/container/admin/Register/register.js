/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import FormLoader from '../../../components/formLoader';
import { withTheme } from 'react-jsonschema-form';
import { Theme as MuiTheme } from 'rjsf-material-ui';
import LinkItem from '../../../components/linkItem';
import { CustomFieldTemplate, widgets } from '../../../components/customscripts/customscript';
import { withSnackbar } from 'notistack';
import $ from 'jquery';
import { addUser, authenticate, getAllUserRoles } from '../../../servies/services';


const Form = withTheme(MuiTheme);
const schema = require('./schema.json');
// const uiSchema = {
//   'password': {
//     'ui:widget': 'password',
//   }
// };


class register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schema: schema,
      // uiSchema: uiSchema,
      formData: {},
      token: localStorage.getItem('token'),
      peers: JSON.parse(localStorage.getItem('peers')),
      userid: localStorage.getItem("userid"),
      OrgLoading: false,
    };
  }

  // onSubmit = (value) => {
  //   console.log('onSubmit:', value.formData)
  //   let data = value.formData;
  //   this.register(data);
  // };

  async componentDidMount() {
    localStorage.clear();
    this.getAllUserRoles();

    if (sessionStorage.getItem("OrgName") === null) {
      this.getAllUserRoles();
    } else {
      const OrgName = JSON.parse(sessionStorage.getItem("OrgName"))
      this.setState({ OrgLoading: true });
      function groupBy(OrgName, property) {
        return OrgName.reduce(function(memo, x) {
          if (!memo[x[property]]) { memo[x[property]] = []; }
          memo[x[property]].push(x);
          return memo;
        }, {});
      }
      var o = groupBy(OrgName, 'DealName');
      console.log("o",o);
      this.setState({ role_list: o})

    }

  }

  onChange = (e) => {
    const formData = this.state.formData;
    formData[e.target.name] = e.target.value;
    this.setState({
      formData,
    });
    console.log('formData', this.state.formData);
  }


  getAllUserRoles = async () => {
    // this.setState({ OrgLoading: false })
    // const APIResponse = await getAllUserRoles()
    // console.log("getAllUserRoles", APIResponse.data)

    // let orgname_id = []
    // let orgname_name = []
    // if (APIResponse.data.length !== 0) {
    //   APIResponse.data.forEach(function (key, value) {
    //     console.log("key", key.UserRoleID)
    //     console.log("value", value)
    //     // var obj = { name: key, label: key }
    //     orgname_id.push(key.UserRoleID);
    //     orgname_name.push(key.UserRoleName);
    //   });
    // }
    // console.log("APIResponse.data", APIResponse.data);
    // let oldSchema = this.state.schema;
    // console.log("oldstagedata", oldSchema);
    // oldSchema.properties.OrgName.enum = orgname_name;
    // oldSchema.properties.OrgName.enumNames = orgname_name;
    // const newSchema = Object.assign({}, oldSchema);
    // console.log("WRITE oldSchema", newSchema);
    // this.setState({ schema: newSchema });
    // this.setState({ OrgLoading: true, OrgDetails: APIResponse.data })


    const APIResponse = await getAllUserRoles()
    if (APIResponse != null) {
      console.log("getAllUserRoles APIResponse.data", APIResponse.data);
      let OrgName = APIResponse.data;
      function groupBy(OrgName, property) {
        return OrgName.reduce(function(memo, x) {
          if (!memo[x[property]]) { memo[x[property]] = []; }
          memo[x[property]].push(x);
          return memo;
        }, {});
      }
      var o = groupBy(OrgName, 'DealName');
      this.setState({ OrgLoading: true, role_list: o,OrgDetails: APIResponse.data});
      sessionStorage.setItem("OrgName", JSON.stringify(APIResponse.data))
    } else {
      this.setState({ OrgLoading: true,OrgDetails: APIResponse.data })
    }

    // sessionStorage.setItem("OrgName", JSON.stringify(newSchema))
  }

  onSubmit = async (value) => {

    // console.log('onSubmit:', value.formData)
    // let data = value.formData;
  
    // const UserRoleID = this.state.OrgDetails.filter(item => item.UserRoleName == value.formData.OrgName)
    // console.log("++++++++++" + JSON.stringify(UserRoleID[0].UserRoleID))
    // data.UserRoleID = UserRoleID[0].UserRoleID
    // const APIResponse = await addUser(data)
    console.log("this.state.formData", this.state.formData)
    if (this.state.formData.UserName == undefined || this.state.formData.EmailId == undefined || this.state.formData.OrgName == undefined) {
      const message = "Please select all fields";
      this.props.enqueueSnackbar(message, {
        variant: 'error',
        autoHideDuration: 5000,
      });
    } else {
      const DealType = $('#userroleid option:selected').attr('data-type');
      const UserRoleID= $('#userroleid option:selected').attr('data-userroleid');

      this.setState({ loading: true })

  var data=this.state.formData;
  console.log("DATA",data);
    data.UserRoleID = UserRoleID
console.log("RegisterDATA",data);
      const APIResponse = await addUser(DealType, data)
      console.log("addUser", APIResponse, APIResponse.status)
      this.setState({ loading: false })
      if (APIResponse !== null) {
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
          if (APIResponse.data.isSuccess == false) {
            this.setState({ formLoader: false })
            const message = "Credentials Incorrect";
            this.props.enqueueSnackbar(message, {
              variant: 'error',
              autoHideDuration: 2000,
            });
          } else {    
        this.setState({ formLoader: false })
        const message = "Registered successfully!";
        this.props.enqueueSnackbar(message, {
          variant: 'info',
          autoHideDuration: 2000,
        });

        this.props.history.push("/")

      }

    }
  }
}

  };

  render() {
    return (
      <React.Fragment>
        <h4>Sign up to your account to access Intain ABS</h4>
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
                <p> <label>Email Id</label> <input name="EmailId"  onChange={this.onChange} className="form-control" value={this.state.formData.EmailId} /> </p>
                <p> <label>Role</label>
                  <select name="OrgName" id="userroleid" onChange={this.onChange} className="form-control">
                    <option value={''}>{'Select Org Name'}</option>
                    {this.state.role_list.length != 0 ?
                      Object.entries(this.state.role_list).map(([key, value]) => {
                        return (
                          <React.Fragment>
                            <optgroup label={key}> {key} </optgroup>
                            {value.map((item) => {
                              return (
                                <option data-type={key} data-userroleid={item.UserRoleID}  selected={this.state.formData.UserRoleName == item.UserRoleName} value={item.UserRoleName}>{item.UserRoleName}</option>
                              );
                            })
                            }
                          </React.Fragment>
                        );
                      })
                      : ''}
                  </select>
                </p>
                <p>
                  <Button className="col-md-12" onClick={this.onSubmit} variant="contained" size="large" color="primary" id="signinbutton" type="submit"
                    disabled={this.state.loading === true ? true : false} > Sign in </Button>
                </p>
              </div>
            </React.Fragment>
          }
          <div className="loginCheckbox">
            <p className="lineDivider">
              <span>Have Account?</span>
            </p>
            <LinkItem to={'/'} variant="contained" className="loginBtn" title={'Login'}> </LinkItem>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default withSnackbar(register);
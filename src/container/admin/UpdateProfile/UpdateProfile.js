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
import Footer from '../../../components/footer/footer'

import { addUser, authenticate, addApprovedUserDetails } from '../../../servies/services';

const Form = withTheme(MuiTheme);
const schema = require('./schema.json');
const uiSchema = {

  'Password': {
    'ui:widget': 'password',
  },
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


class UpdateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schema: schema,
      uiSchema: uiSchema,
      formData: {},
      UserId: null,
      DealType: localStorage.getItem('DealType'),

    };
  }
  validate(formData, errors) {
    if (!formData.Password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/)) {
      errors.Password.addError("Password should contain 1 uppercase, 1 numeric, 1 special character & atleast 8 character");
    }
    return errors; }

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
  async componentDidMount() {

    let search = this.props.location.search;
    let params = new URLSearchParams(search);
    let UserName = params.get('UserName');
    let OrgName = params.get('OrgName');
    let UserId = params.get('UserId');
    // let ChannelName = params.get('ChannelName');
    
    // alert(UserId)
    const formData = {
      "UserName": UserName,
      "OrgName": OrgName,
      // "channelname": ChannelName,


    }

    this.setState({ formData: formData, UserId: UserId })

  }

  render() {
    return (
      <React.Fragment>
        <h4>Complete your profile to access WSFS</h4>
        <div className="form_row_single">
          {/* {JSON.stringify(this.state.formData)} */}
          <Form
            schema={this.state.schema}
            onChange={this.onFormChanged}
            onSubmit={this.onSubmit}
            widgets={widgets}
            FieldTemplate={CustomFieldTemplate}
            uiSchema={this.state.uiSchema}
            formData={this.state.formData}
            validate = {this.validate}

          >
            <div id="form-btn">
              <div className="container-fluid text-center">
                <div className="row">
                  <Button className="col-md-12" variant="contained" size="large" color="primary" id="signinbutton" type="submit"
                    disabled={this.state.loading === true ? true : false} > Update Profile </Button>
                </div>
              </div>
            </div>
          </Form>
          <div className="loginCheckbox">
            <p className="lineDivider">
              <span>Have Account?</span>
            </p>
            <LinkItem to={'/'} variant="contained" className="loginBtn" title={'Login'}> </LinkItem>

          {/* <div class="text-center Poweredby">Powered by <img id="wsfs_logo_first" style={{ width: "70px", height: "30px", marginTop:"-15px" }}
                                // src={"http://in-d.ai/wp-content/uploads/2020/11/WSFSLogo.png"
                                          src={"https://wsfsprod.intainabs.com/logo.jpg"
                                }
                            /></div> */}
                           
          </div>
        </div>
        <Footer></Footer>
      </React.Fragment>
    );
  }
}
export default withSnackbar(UpdateProfile);
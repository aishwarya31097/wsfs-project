import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
// import { savedictionary } from '../servies/services';
import Modal from 'react-modal';
import $ from 'jquery';
import Loader from '../../../components/loader';
import { withSnackbar } from 'notistack';
import * as moment from 'moment'
import { widgets, CustomFieldTemplate, customStylesauto, ObjectFieldTemplate2 } from '../../../components/customscripts/customscript';
import LinearLoader from '../../../components/loader/LinearLoader';
import { InitialSetup, GetAllDealsLogin, initialsetupQuery ,checklist,savedefinition} from '../../../servies/services';
// import { withRouter } from 'react-router-dom'

import { withTheme } from 'react-jsonschema-form';
import { Theme as MuiTheme } from 'rjsf-material-ui';
const Form = withTheme(MuiTheme)

const updatepassschema = require('./updatepassschema.json')
// const uiSchema = require('./ui-schema.json')
// const formDataAdd = require('./formdata.json')
const uiSchema = {

    'OldPassword': {
      'ui:widget': 'password',
    },
    'NewPassword': {
        'ui:widget': 'password',
      },
  };
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

class DataDictionary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            rows: 0,
            cols: 0,
            IsOpen: true,
            updatepassbtn:this.props.updatepassbtn,
            updatepassschema: updatepassschema,
             uiSchema: uiSchema,
            formLoader: false,
            channelname:localStorage.getItem('ChannelName'),
             UserName : localStorage.getItem('user_name'),
            OrgName:localStorage.getItem('OrgName')
        }
    }

    openModal = async () => {
        this.setState({ IsOpen: true,})
    }
    proceed = () => {
        this.props.history.push("/report/" + this.props.DealType + "/mapping-page/" + this.props.dealId + "/" + this.props.assetclass );

        // this.setState({ IsOpen: true })
    }


    afterOpenModal = async () => {

    }

    closeModal = async () => {
        this.setState({ IsOpen: false, updatepassbtn:false  })

        this.props.OpenClose(false)
    }



    Columns = async (e) => {
        console.log("Columns Columns Columns ", e.target.value)
        this.setState({
            cols: parseInt(e.target.value)
        })
    }


    Rows = async (e) => {
        console.log("Rows Rows Rows ", e.target.value)
        this.setState({
            rows: parseInt(e.target.value)
        })
    }

    createTable = () => {
        this.createtable()
    }


    colsReturn = () => {
        return Array.from(Array(this.state.cols), (e, i) => {
            return <td key={i} contenteditable="true"> </td>
        })
    }

    createtable = () => {
        return <table className="table table-bordered" id="CreateTable"> {Array.from(Array(this.state.rows), (e, i) => {
            return <tr key={i}>{this.colsReturn()}</tr>
        })}</table>
    }

    Generatedatadict(dealId, month, year, DealType) {
        this.changePanel(dealId, month, year, DealType);
    }

    onSubmit = async (value) => {
        this.setState({ formLoader: true, formData: value.formData })
        console.log('onSubmit:', value.formData);
        let data = value.formData;
     
        data.UserName =this.state.UserName;
        data.OrgName =this.state.OrgName;
        data.channelname=this.state.channelname;
        console.log('intiinal tabel data', data);
        const DealType = this.props.DealType;
        data.token = localStorage.getItem('token');
        data.peers = JSON.parse(localStorage.getItem('peers'));
         const APIResponse = await savedefinition(DealType,data);
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
               else{
             console.log("APIResponse.data.Success", APIResponse.data);
             if (APIResponse.data.success == true) {
 
                 this.setState({formLoader:false,IsOpen: false })
                 const message = "Data saved successfully";
                 this.props.enqueueSnackbar(message, {
                     variant: 'info',
                     autoHideDuration: 3000,
                 });
             } else {
                 const message = "Data not saved successfully";
                 this.props.enqueueSnackbar(message, {
                     variant: 'error',
                     autoHideDuration: 3000,
                 });
             }}
         }
    }
    SaveDefinition = async (DealType, data) => {
        console.log("HIIIIIIIIIIIII")
   
       data.peers = JSON.parse(localStorage.getItem('peers'));
        const APIResponse = await savedefinition(DealType,data);
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
              else{
            console.log("APIResponse.data.Success", APIResponse.data);
            if (APIResponse.data.success == true) {

                this.setState({formLoader:false,IsOpen: false })
                const message = "Data saved successfully";
                this.props.enqueueSnackbar(message, {
                    variant: 'info',
                    autoHideDuration: 3000,
                });
            } else {
                const message = "Data not saved successfully";
                this.props.enqueueSnackbar(message, {
                    variant: 'error',
                    autoHideDuration: 3000,
                });
            }}
        }
    }

    render() {

        return (
            <div>
                {/* <Button variant="contained" color="primary"  disabled={this.props.AddStdBtn==true? true : false} onClick={this.openModal}>Add Standard Fields</Button> */}
                {/* <Button variant="outlined" color="primary" onClick={this.proceed}>Proceed</Button> */}
{/* // {this.props.AddstdShow==true? */}
                <Modal
                    isOpen={this.state.IsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <div className="modalPopupDictionary">
                        <Button className="float-right" color="primary" variant="outlined" onClick={this.closeModal}>close</Button>

                        <h3> Update Password </h3>

                      
                        <p className="header-dictionary">
                        {/* {this.state.loading == false ? <Loader msg={"Loading Modules..."} /> : */}
                        {/* <div className="row"> */}
                                        <React.Fragment>
                                            <Form
                                                schema={this.state.updatepassschema}
                                                onSubmit={this.onSubmit}
                                                onChange={this.onFormChanged}
                                                onBlur={this.onBlur}
                                                widgets={widgets}
                                                omitExtraData={true}
                                                liveOmit={true}
                                                // FieldTemplate={CustomFieldTemplate}
                                                // formData={this.state.formDataAdd}
                                                uiSchema={this.state.uiSchema}
                                                // ObjectFieldTemplate={ObjectFieldTemplate2}
                                            >
                                               
                                                    <Button variant="contained" color="primary" style={{textAlign:"center"}} id="signinbutton" type="submit">

                                                        Save
                                                        {this.state.formLoader == false ? '' : <Loader msg={""} />}
                                                    </Button>
                                                 
                                                
                                            </Form>
                                        </React.Fragment>
                                    {/* } */}

                                    {/* </div> */}
                        </p>

                        {/* {this.createtable()}

                        <Button variant="contained" color="primary"
                            disabled={this.props.DataDictionaryData.dealId == null ? true : false}
                            disabled={this.props.DataDictionaryData.month == null ? true : false}
                            disabled={this.props.DataDictionaryData.year == null ? true : false}
                            onClick={() => this.Generatedatadict(
                                this.props.DataDictionaryData.dealId,
                                this.props.DataDictionaryData.month,
                                this.props.DataDictionaryData.year,
                                this.props.DealType)}>
                            Generate Data Dictionary
                        </Button> */}


                    </div>
                </Modal>
                {/* :''} */}
            </div>

        );
    }
}

export default withSnackbar(DataDictionary);
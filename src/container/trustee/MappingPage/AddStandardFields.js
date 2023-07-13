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
import { InitialSetup, GetAllDealsLogin, initialsetupQuery ,checklist,savedefinition,updatedefinition} from '../../../servies/services';
// import { withRouter } from 'react-router-dom'

import { withTheme } from 'react-jsonschema-form';
import { Theme as MuiTheme } from 'rjsf-material-ui';
const Form = withTheme(MuiTheme)

const schemaaddstd = require('./schemaaddstd.json')
// const uiSchema = require('./ui-schema.json')
const formDataAdd = require('./formdata.json')

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
            AddstdShow:this.props.AddstdShow,
            schemaAdd: schemaaddstd,
            formDataAdd: formDataAdd,
            formLoader: false,
            channelname:localStorage.getItem('ChannelName'),
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
        this.setState({ IsOpen: false, AddstdShow:false  })

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
        console.log('onSubmit:', JSON.stringify(value.formData));
        let x=[]
       value.formData.tabledata.map((key)=>{
        console.log("value.formData",key)
        key.id="";
        console.log("value.formData ---",key)
        x.push(key)

       })
       let tabledata={
           tabledata:x
       }
          
    let data = tabledata;

        data.dealId =this.props.dealId;
        data.assetclass =this.props.assetclass;
        data.month =this.props.month;
        data.year =this.props.year;
        data.channelname=this.state.channelname;
        console.log('intiinal tabel data', data);
        const DealType = this.props.DealType;
        // const APIResponse = await checklist( DealType,data);
        // if (APIResponse != null) {
        //     if (APIResponse.status == 204) {
        //         const message = "Missing Parameter or No content";
        //         this.props.enqueueSnackbar(message, {
        //           variant: 'error',
        //           autoHideDuration: 4000,
        //         });
        //       }
        //     else if (APIResponse.status !== 200) {
        //         const message = "Something went wrong, please try again";
        //         this.props.enqueueSnackbar(message, {
        //           variant: 'error',
        //           autoHideDuration: 5000,
        //         });
        //       }
        //       else{
        //     console.log("APIResponse.data.Success", APIResponse.data);
        //     if (APIResponse.data.success == true) {
            
        //         let deal_id = value.formData.dealId;
                if (window.confirm("Are you sure you want to proceed?")) {
                this.SaveDefinition(DealType, data)
                }
        //     } else {
        //         const message = "Data not saved successfully";
        //         this.props.enqueueSnackbar(message, {
        //             variant: 'error',
        //             autoHideDuration: 3000,
        //         });
        //     }}
        // }
    }
    SaveDefinition = async (DealType, data) => {
        console.log("HIIIIIIIIIIIII")
    
       data.peers = JSON.parse(localStorage.getItem('peers'));
       data.channelname = "WSFS";
   

        const APIResponse = await updatedefinition(DealType,data);
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
            this.props.showcolumn()
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

                        <h3> Create Custom Fields </h3>

                        <p style={{marginBottom:"10px", color:"#545e5d"}}>In case, none of the custom field match a particular field, you can add custom field, But please double check as it may impact quality of the reporting in case duplicate field (i.e a custom field is created inspite of a corresponding standard field being available)</p>

                        <p className="header-dictionary">
                        {/* {this.state.loading == false ? <Loader msg={"Loading Modules..."} /> : */}
                        {/* <div className="row"> */}
                                        <React.Fragment>
                                            <Form
                                                schema={this.state.schemaAdd}
                                                onSubmit={this.onSubmit}
                                                onChange={this.onFormChanged}
                                                onBlur={this.onBlur}
                                                widgets={widgets}
                                                omitExtraData={true}
                                                liveOmit={true}
                                                FieldTemplate={CustomFieldTemplate}
                                                formData={this.state.formDataAdd}
                                                uiSchema={this.state.uiSchema}
                                                ObjectFieldTemplate={ObjectFieldTemplate2}
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
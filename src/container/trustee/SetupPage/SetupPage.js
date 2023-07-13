import React, { Component } from 'react';
import Header from '../../../components/header';
import Button from '@material-ui/core/Button';
import { withTheme } from 'react-jsonschema-form';
import { Theme as MuiTheme } from 'rjsf-material-ui';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withSnackbar } from 'notistack';
import LinearLoader from '../../../components/loader/LinearLoader';
import Loader from '../../../components/loader';
import { widgets, CustomFieldTemplate, customStyles, customStylesauto, ObjectFieldTemplate } from '../../../components/customscripts/customscript';
import { GetAllDeals, generateYears, months, ServicerDataMongodbAPI, restrictdefn, getdefinition, updatedefinition ,deletedefinition} from '../../../servies/services';
import NumberComp from '../../../components/NumberComp';
import AddStandardFields from './AddStandardFields'
import { Input } from '@material-ui/core';
import $ from 'jquery';
import { func } from 'prop-types';

const Form = withTheme(MuiTheme);
const schema = require('./schema.json');
const schemaNewFields = require('./NewFields.json');
const uiSchema = {

"LastUpdated": {
    "ui:autofocus": false,
    "ui:emptyValue": "",
    "ui:autocomplete": false,
    "ui:readonly": true
}
}
function Edit2() {

}
class servicerDataDB extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schema: schema,
            schemaNewFields: schemaNewFields,
            years: generateYears(),
            months: months,
            getLoansLoader: false,
            open: false,
            InvestorReportBox: false,
            onboardservicerdata: null,
            getLoader: false,
            pageTitle: "Add Standard Fields",
            formData: {
                dealId: null,
                month: null,
                year: null
            },
            token: localStorage.getItem("token"),
            userid: localStorage.getItem("user_id"),
            OrgName: localStorage.getItem('OrgName'),
            DealType: localStorage.getItem('DealType'),
            peers: localStorage.getItem('peers'),
            loadingForm: false,
            report_loader: false,
            report_box: false,
            all_deals: JSON.parse(localStorage.getItem("all_deals")),
            ChannelName: localStorage.getItem("ChannelName"),
            AddStandardFields: false,
            restrict: false,
            AddStdBtn: true,
            getdatabtn: false,
            LastUpdate:"NA",
            uiSchema:uiSchema,
actionType:'add'
        };
    }


    storetobc = (e) => {
        this.props.history.push("/report/" + this.state.DealType + "/validate-monthly-inputs/" + this.state.formData.dealId + "/" + this.state.formData.month + "/" + this.state.formData.year);
    }

    async componentDidMount() {
        if(localStorage.getItem("token") == "" || localStorage.getItem("token") == undefined) {
            window.location.assign("/")
      }
        console.log("GroupByLima", this.state.groupby)
        console.log("componentDidMount DealId", this.props.match.params.DealId, this.props.match.params.DealMonth, this.props.match.params.DealYear);
        const DealId = this.props.match.params.DealId;
        const DealMonth = this.props.match.params.DealMonth;
        const DealYear = this.props.match.params.DealYear;
        // this.callMethod(DealId, DealMonth, DealYear);


     
    }

    async componentWillReceiveProps(nextProps) {
        console.log("nextProps", nextProps)
        let DealId = nextProps.match.params.DealId;
        let DealMonth = nextProps.match.params.DealMonth;
        let DealYear = nextProps.match.params.DealYear;
        console.log("componentWillReceiveProps DealId, DealMonth, DealYear", DealId, DealMonth, DealYear);
        this.setState({ report_box: false });
        // this.callMethod(DealId, DealMonth, DealYear);
    }


    callMethod(DealId, DealMonth, DealYear) {

        console.log("method callMethod")

        const formData = {
            dealId: DealId,
            month: DealMonth,
            year: DealYear
        }

        this.setState({ formData: formData });
        const DealType = this.state.DealType;
        this.GetAllDeals(DealType);

        if (formData.dealId != "null" && formData.dealId != undefined && formData.month != "null" && formData.month != undefined && formData.year != "null" && formData.year != undefined) {
            console.log("formData formData", formData)
            // this.ServicerDataMongodbMethod(DealType, formData.dealId, formData.month, formData.year)
        }
    }

    addstdfieldsbtn = async (value) => {
        this.setState({ AddStandardFields: true })
    }
    onSubmit = async (value) => {

        this.props.history.push("/report/" + this.state.DealType + "/setup-page/" + value.formData.dealId + "/" + value.formData.month + "/" + value.formData.year);

        this.setState({ report_loader: true, formData: value.formData })
        let data = value.formData;

        let dealId = value.formData.dealId;
        let month = value.formData.month;
        let year = value.formData.year;
        let DealType = this.state.DealType
        const formData = {
            dealId: dealId,
            month: month,
            year: year
        }

        this.setState({ formData: formData });
        this.ServicerDataMongodbMethod(DealType, dealId, month, year)
        // const APIResponse = await ServicerDataMongodb(DealType, dealId, month, year)
        // if (APIResponse != null) {
        //     console.log("ServicerDataMongodb", APIResponse)
        //     this.setState({ tableData: APIResponse.data, report_loader: false, report_box: true })
        // }
    }

    onFormChanged = (value) => {
        this.props.history.push("/report/" + this.state.DealType + "/setup-page/" + value.formData.assetclass);

        this.setState({ report_loader: true, formData: value.formData })
        let data = value.formData;

        // let dealId = value.formData.dealId;
        // let month = value.formData.month;
        // let year = value.formData.year;
        let assetclass = value.formData.assetclass
        let DealType = this.state.DealType
        let channelname = this.state.ChannelName;

        const formData = {

            // dealId: dealId,
            // month: month,
            // year: year
            assetclass: assetclass
        }

        this.setState({ formData: formData });
        this.getdata(DealType, assetclass, channelname)
    }



    async ServicerDataMongodbMethod(DealType, dealId, month, year) {

        let channelname = this.state.ChannelName;

        //Restrict api
        this.setState({ report_loader: true })
        let restrictresult = "";
        const APIResponse = await restrictdefn(DealType, dealId, month, year, channelname)
        if (APIResponse != null) {
            console.log("restrictdefn", APIResponse)
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
                if (APIResponse.data.success == 1) {
                    restrictresult = "1";

                    this.getdata(DealType, dealId, month, year, channelname, restrictresult)
                    this.setState({ rectrict: false, AddStdBtn: false })


                } else if (APIResponse.data.success == 0) {
                    restrictresult = "0";
                    this.getdata(DealType, dealId, month, year, channelname, restrictresult)
                }
                else {
                    this.setState({ AddStdBtn: true, getdatabtn: true })
                    const message = APIResponse.data.result
                    this.props.enqueueSnackbar(message, {
                        variant: 'error',
                        autoHideDuration: 3000,
                    });
                }
            }
        }
        //end




        //     this.setState({ tableData: APIResponse.data
        //         , report_loader: false, report_box: true })
        // }
        // this.setState({ report_loader: false, report_box: true, tableData: [{ "def": "loan_trade_date", "descp": "loan_trade_date", "type": "String", "status": "Active" }, { "def": "borrower_ltv", "descp": "borrower_ltv", "type": "String", "status": "Active" }] })

        // const APIResponse = await ServicerDataMongodbAPI(DealType, dealId, month, year, channelname)
        // if (APIResponse != null) {
        //     console.log("ServicerDataMongodb", APIResponse)
        //     this.setState({ tableData: [{"def":"loan_trade_date","descp":"loan_trade_date","type":"String","status":"Active"},{"def":"borrower_ltv","descp":"borrower_ltv","type":"String","status":"Active"}]
        //         , report_loader: false, report_box: true })
        // }
    }

    getdata = async (DealType, assetclass, channelname) => {
        //     this.setState({ report_loader: true })

        const APIResponse = await getdefinition(DealType, assetclass, channelname)
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
                // console.log("restrictdefn ", typeof (restrictresult));
                if (APIResponse.status == 200) {
                    this.setState({
                        tableData:APIResponse.data,
                        LastUpdate:APIResponse.data[0].lastupdate
                        , report_loader: false, report_box: true
                    })
                      let oldSchema = this.state.schemaNewFields;
        console.log("oldstagedata", oldSchema);
        oldSchema.properties.LastUpdated.default =APIResponse.data[0].lastupdate;
        const newSchema = Object.assign({}, oldSchema);
        console.log("WRITE oldSchema", newSchema);
        // this.setState({ schema: newSchema});
        this.setState({ schema: newSchema, loadingForm: true });
                    // if (restrictresult == "1") {
                    //     this.setState({ rectrict: false, AddStdBtn: false })
                    // }
                    // else if (restrictresult == "0") {
                    //     this.setState({ rectrict: true, AddStdBtn: true })
                    // }


                } else if (APIResponse.data.success == 0) {
                    // restrictresult = APIResponse.data.success;
                    // this.getdata(restrictresult)

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

    // GetAllDeals = async (DealType) => {

    //     let all_deals = this.state.all_deals;

    //     let deal_name = []

    //     if (all_deals.length !== 0) {
    //         all_deals.map((item) => {
    //             console.log("all_deals item", item.deal_id);
    //             deal_name.push(item.deal_id);
    //         })
    //     }

    //     let month_name = []
    //     let month_value = []
    //     if (this.state.months.length !== 0) {
    //         this.state.months.map((item) => {
    //             console.log("item", item);
    //             month_name.push(item.label);
    //             month_value.push(item.value);
    //         })
    //     }

    //     let year_name = []
    //     let year_value = []
    //     if (this.state.years.length !== 0) {
    //         this.state.years.map((item) => {
    //             console.log("item", item);
    //             year_name.push(item.key);
    //             year_value.push(item.value);
    //         })
    //     }

    //     // console.log("currency_list_static", currency_list_static);
    //     let oldSchema = this.state.schema;
    //     console.log("oldstagedata", oldSchema);
    //     oldSchema.properties.dealId.enum = deal_name;
    //     oldSchema.properties.dealId.enumNames = deal_name;

    //     oldSchema.properties.month.enum = month_value;
    //     oldSchema.properties.month.enumNames = month_name;

    //     oldSchema.properties.year.enum = year_value;
    //     oldSchema.properties.year.enumNames = year_name;

    //     const newSchema = Object.assign({}, oldSchema);
    //     console.log("WRITE oldSchema", newSchema);
    //     // this.setState({ schema: newSchema});
    //     this.setState({ schema: newSchema, loadingForm: true });
    // };

    Edit = async (index) => {
        console.log("INDEX",index)
        this.setState({ actionType: 'edit', currentindex : index  });
    }
    Cancel = async () => {
        this.setState({ actionType: 'add' });
    }
    SaveData = async (index) => {
        // this.setState({ actionType : 'add' });
console.log("INDEx",index)
        var senddata = []

        $('#viewServicerData2 tbody tr').eq(index).each(function (row, tr) {
            console.log("ROW",row ,"tr",tr)
            senddata[row] = {
                'id': $(tr).find("td:eq(0) input[type='text']").val(),

                'def': $(tr).find("td:eq(1) input[type='text']").val(),
                'fieldcode': $(tr).find("td:eq(2) input[type='text']").val(),
                'section': $(tr).find('td:eq(3)').find('select').val(),
                'descp': $(tr).find("td:eq(4) textarea[type='text']").val(),

            };
        });
    // //   var DATA=  $('#viewServicerData2 tbody tr:nth-child(' + index +')');
//   var  DATA= $('#viewServicerData2 tbody tr').eq(index).find("td:eq(0) input[type='text']").val();

        console.log("save button::" + JSON.stringify(senddata))
        // console.log("DTA button::" + DATA)

        var data = {};
    
        data.peers = JSON.parse(localStorage.getItem('peers'));
        data.assetclass = this.state.formData.assetclass;
        // data.month = this.state.formData.month;
        // data.year = this.state.formData.year;
        data.channelname = "WSFS";
        data.tabledata = senddata;
//         var encodedData = btoa(JSON.stringify(senddata));
// var decodedData= atob(encodedData)
//         console.log("++++++++data+++++++" + encodedData+decodedData);
//         // this.setState({decodedData:decodedData})
//         console.log("DECODED!!!!!!!!!!",JSON.parse(decodedData))

//         console.log("DECODED",typeof(decodedData))
        let DealType = this.state.DealType
        const APIResponse = await updatedefinition(DealType, data);
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
                if (APIResponse.data.success == true) {
                    this.props.history.push("/report/" + this.state.DealType + "/setup-page/" + this.state.formData.assetclass);

                    this.setState({ actionType: 'add' });
                    const message = "Data saved successfully";
                    this.props.enqueueSnackbar(message, {
                        variant: 'info',
                        autoHideDuration: 3000,
                    });
                    this.getdata(this.state.DealType, this.state.formData.assetclass,"WSFS")

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
  DeleteData = async (index) => {
        // this.setState({ actionType : 'add' });
console.log("INDEx",index)
        var senddata = []

        $('#viewServicerData2 tbody tr').eq(index).each(function (row, tr) {
            console.log("ROW",row ,"tr",tr)
            senddata[row] = {
                'id': $(tr).find("td:eq(0) input[type='text']").val(),

                'def': $(tr).find("td:eq(1) input[type='text']").val(),
                'fieldcode': $(tr).find("td:eq(2) input[type='text']").val(),
                'section': $(tr).find('td:eq(3)').find('select').val(),
                'descp': $(tr).find("td:eq(4) textarea[type='text']").val(),

            };
        });
    // //   var DATA=  $('#viewServicerData2 tbody tr:nth-child(' + index +')');
//   var  DATA= $('#viewServicerData2 tbody tr').eq(index).find("td:eq(0) input[type='text']").val();

        console.log("save button::" + JSON.stringify(senddata))
        // console.log("DTA button::" + DATA)

        var data = {};
     
        data.peers = JSON.parse(localStorage.getItem('peers'));
        data.assetclass = this.state.formData.assetclass;
        // data.month = this.state.formData.month;
        // data.year = this.state.formData.year;
        data.channelname = "WSFS";
        data.tabledata = senddata;
//         var encodedData = btoa(JSON.stringify(senddata));
// var decodedData= atob(encodedData)
//         console.log("++++++++data+++++++" + encodedData+decodedData);
//         // this.setState({decodedData:decodedData})
//         console.log("DECODED!!!!!!!!!!",JSON.parse(decodedData))

//         console.log("DECODED",typeof(decodedData))
        let DealType = this.state.DealType
        const APIResponse = await deletedefinition(DealType, data);
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
                if (APIResponse.data.success == true) {
                    // this.props.history.push("/report/" + this.state.DealType + "/setup-page/" + this.state.formData.assetclass);

                    this.setState({ actionType: 'add' });
                    const message = "Data saved successfully";
                    this.props.enqueueSnackbar(message, {
                        variant: 'info',
                        autoHideDuration: 3000,
                    });
                    this.getdata(this.state.DealType, this.state.formData.assetclass,"WSFS")

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
    Edit2() {
        console.log("gggggggggggggggg")
        this.setState({ actionType: 'edit' });
    }
    // Delete = (btn) => {

    //     // var rows = parseInt(this.value);
    //     // console.log(rows);

    //         var row = btn.parentNode.parentNode;
    //         row.parentNode.removeChild(row);

    // }
    Delete = (idx) => {



        if (window.confirm("Are you sure you want to Delete?")) {

            const tableData = [...this.state.tableData]
            tableData.splice(idx, 1)
            this.setState({ tableData })
            this.HIt(idx)
        }

    }
    HIt = (idx) => {
        setTimeout(() => {
            console.log("setTimeout", Date().toLocaleString())
            this.DeleteData(idx);
        }, 1000)

    }

    renderRows() {

        return this.state.tableData ?

            this.state.tableData.map((item, index) => (
                <React.Fragment>

 

                    <React.Fragment>
                        <tr key={item.key}>

                        <td hidden>

{this.state.actionType == "edit"&& this.state.currentindex== index  ?



    <input class="Form-control boxinp highlight" hidden type="text" defaultValue={item.id || ''}></input>
    :
    <input class="Form-control boxinp" type="text" hidden disabled value={item.id}></input>
}

</td>
                            <td>

                                {this.state.actionType == "edit"&& this.state.currentindex== index  ?



                                    <input class="Form-control boxinp highlight" type="text" defaultValue={item.def || ''}></input>
                                    :
                                    <input class="Form-control boxinp" type="text" disabled value={item.def}></input>
                                }

                            </td>
                            <td>

                                {this.state.actionType == "edit" && this.state.currentindex== index ?
                                    <input class="Form-control boxinp highlight" type="text" defaultValue={item.fieldcode + index || ''}></input>
                                    :
                                    <input class="Form-control boxinp" type="text" disabled value={item.fieldcode + index}></input>
                                }


                            </td>
                            <td>
                                {this.state.actionType == "edit" && this.state.currentindex== index ?
                                    <select className="Form-control boxinp highlight">
                                        <option hidden selected value={item.section}>{item.section}</option>

                                        <option value='Underlying exposures information section'>Underlying exposures information section</option>
                                        <option value='Collateral information section'>Collateral information section</option>
                                        <option value='Tenant information section'>Tenant information section</option>
                                        <option value='Historical collections information section'>Historical collections information section</option>
                                        <option value='Securitisation information section'>Securitisation information section</option>
                                        <option value='Tests/Events/Triggers information section'>Tests/Events/Triggers information section</option>
                                        <option value='Cash-flow information section'>Cash-flow information section</option>
                                        <option value='Asset Servicing Information'>Asset Servicing Information</option>
                                    </select>
                                    :
                                    <select disabled className="Form-control boxinp">
                                        <option value={item.section}>{item.section}</option>
                                  
                                    </select>
                                }
                            </td>
                            <td>
                                {this.state.actionType == "edit" && this.state.currentindex== index ?
                                    <textarea class="Form-control boxinp highlight" type="text" defaultValue={item.descp}></textarea>
                                    :
                                    <textarea class="Form-control boxinp" type="text" disabled value={item.descp}></textarea>
                                }
                            </td>

                            {this.state.restrict == true ? '' :
                                <td>
                                    <div>
                                        {this.state.actionType == "edit" && this.state.currentindex== index  ?

                                       
                                        <React.Fragment>
                                        <Button className="float-center" style={{ marginLeft: "5px", padding: "1px", fontSize: "12px" }} color="primary" variant="outlined" onClick={()=>this.SaveData(index)}>Save</Button>
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
        addtable.push({"id":"" ,"def": "", "fieldcode": this.state.formData.assetclass+"I", "type": "Underlying exposures information section", "descp": "" })

        this.setState({
            tableData: addtable,
            

        });
        this.Edit(addtable.length-1)

        


    }



    render() {
        return (

            <React.Fragment>
                <div className="page">
                    <div className="content">
                        <div className="header">

                            <Header pageTitle={this.state.pageTitle}>

                            </Header>
                            {this.state.getLoader == false ? '' : <LinearLoader></LinearLoader>}


                        </div>
                        <div className="ExtraHeader">


                            <Form
                                schema={this.state.schemaNewFields}
                                // onSubmit={this.onSubmit}
                                onChange={this.onFormChanged}
                                widgets={widgets}
                                omitExtraData={true}
                                liveOmit={true}
                                FieldTemplate={CustomFieldTemplate}
                                formData={this.state.formData}
                                uiSchema={this.state.uiSchema}
                                ObjectFieldTemplate={ObjectFieldTemplate}
                            >
                                <br />


                            </Form>


                        </div>

                        <div className="page-content-setup text-center">

                            <React.Fragment>

                                {this.state.report_box ?
                                    // <div className="InvestorReportBox">
                                        <div className="table-responsive">
                                            <p style={{fontWeight:"bold",textAlign:"left",margin:"15px"}}>Field Details</p>
                                            <table className="table text-left" id="viewServicerData2" >
                                                <thead  >
                                                    {/* <tr className="">
                                                        <th colSpan="6">Field Details</th>
                                                    </tr> */}
                                                    <tr className="tablehead" >

                                                        <th>Field Name</th>
                                                        <th>Field Code</th>
                                                        <th>Section</th>
                                                        <th>Content To Report</th>
                                                        {/* <th>Status</th> */}
                                                        {this.state.restrict == true ? '' :
                                                            <th className="OptionColumn">Action</th>
                                                        }
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {this.renderRows()}

                                                </tbody>
                                            </table>
                                            <Button variant='contained' color='primary' className="text-left" style={{ textAlign: "left" }} onClick={this.AddField} type='submit'>
                                                + Add Field

                                                    </Button>

                                        </div>
                                       

                                    // </div>
                                    : ''}

                            </React.Fragment>
                        </div>
                    </div>
                </div>
                
            </React.Fragment >


        );
    }
}

export default withSnackbar(servicerDataDB)


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
import { GetAllDeals, generateYears, months, ServicerDataMongodbAPI, restrictdefn, getdefinition, updatedefinition } from '../../../servies/services';
import NumberComp from '../../../components/NumberComp';
import AddStandardFields from './AddStandardFields'
import { Input } from '@material-ui/core';
import $ from 'jquery';

const Form = withTheme(MuiTheme);
const schema = require('./schema.json');

class servicerDataDB extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schema: schema,
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
            getdatabtn: false
        };
    }


    storetobc = (e) => {
        this.props.history.push("/report/" + this.state.DealType + "/validate-monthly-inputs/" + this.state.formData.dealId + "/" + this.state.formData.month + "/" + this.state.formData.year);
    }

    async componentDidMount() {
        console.log("GroupByLima", this.state.groupby)
        console.log("componentDidMount DealId", this.props.match.params.DealId, this.props.match.params.DealMonth, this.props.match.params.DealYear);
        const DealId = this.props.match.params.DealId;
        const DealMonth = this.props.match.params.DealMonth;
        const DealYear = this.props.match.params.DealYear;
        this.callMethod(DealId, DealMonth, DealYear);
    }

    async componentWillReceiveProps(nextProps) {
        console.log("nextProps", nextProps)
        let DealId = nextProps.match.params.DealId;
        let DealMonth = nextProps.match.params.DealMonth;
        let DealYear = nextProps.match.params.DealYear;
        console.log("componentWillReceiveProps DealId, DealMonth, DealYear", DealId, DealMonth, DealYear);
        this.setState({  report_box: false });
        this.callMethod(DealId, DealMonth, DealYear);
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

    getdata = async (DealType, dealId, month, year, channelname, restrictresult) => {
        //     this.setState({ report_loader: true })

        const APIResponse = await getdefinition(DealType, dealId, month, year, channelname)
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
                console.log("APIResponse.data.Success", APIResponse.data);
                console.log("restrictdefn ", typeof (restrictresult));
                if (APIResponse.status == 200) {
                    this.setState({
                        tableData: APIResponse.data
                        , report_loader: false, report_box: true
                    })
                    if (restrictresult == "1") {
                        this.setState({ rectrict: false, AddStdBtn: false })
                    }
                    else if (restrictresult == "0") {
                        this.setState({ rectrict: true, AddStdBtn: true })
                    }


                } else if (APIResponse.data.success == 0) {
                    restrictresult = APIResponse.data.success;
                    this.getdata(restrictresult)

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

    GetAllDeals = async (DealType) => {

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

    Edit = async () => {
        this.setState({ actionType: 'edit' });
    }
    Cancel = async () => {
        this.setState({ actionType: 'add' });
    }
    SaveData = async () => {
        // this.setState({ actionType : 'add' });

        var senddata = []
        $('#viewServicerData2 tbody tr').each(function (row, tr) {
            senddata[row] = {

                'def': $(tr).find("td:eq(0) input[type='text']").val(),
                'descp': $(tr).find("td:eq(1) input[type='text']").val(),
                'type': $(tr).find('td:eq(2)').find('select').val(),
                'status': $(tr).find('td:eq(3)').find('select').val(),

            };
        });
        console.log("save button::" + JSON.stringify(senddata))

        var data = {};
       
        data.peers = JSON.parse(localStorage.getItem('peers'));
        data.dealId = this.state.formData.dealId;
        data.month = this.state.formData.month;
        data.year = this.state.formData.year;
        data.tabledata = senddata;
        console.log("++++++++data+++++++" + JSON.stringify(data));
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
                    this.props.history.push("/report/" + this.state.DealType + "/setup-page/" + this.state.formData.dealId + "/" + this.state.formData.month + "/" + this.state.formData.year);

                    this.setState({ actionType: 'add' });
                    const message = "Data saved successfully";
                    this.props.enqueueSnackbar(message, {
                        variant: 'info',
                        autoHideDuration: 3000,
                    });
                    this.ServicerDataMongodbMethod(this.state.DealType, this.state.formData.dealId, this.state.formData.month, this.state.formData.year)

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
                                    <h3 className="title-page">{!this.state.pageTitle ? '' : this.state.pageTitle}</h3>
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
                                                    <Button variant='contained' color='primary' disabled={this.state.getdatabtn == true ? true : false} type='submit'>
                                                        Get Data
                                                        {/* {JSON.stringify(this.state.report_loader)/} */}
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
                                        <div className="view-report-header">
                                            {/* {this.state.restrict == true ? ''  : */}
                                               <AddStandardFields
                                                    StandardForm={this.state.formData}
                                                    DealType={this.state.DealType}
                                                    AddStdBtn={this.state.AddStdBtn}
                                                ></AddStandardFields>
                                            {/* } */}
                                            {/* <Button variant="outlined" color="primary" onClick={this.export_excel}> <DescriptionIcon></DescriptionIcon> Export Excel</Button> */}
                                        </div>
                                        <div className="clearfix"></div>
                                        {this.state.report_box ?
                                            <div className="InvestorReportBox">
                                                <div className="table-responsive">
                                                    <table className="table table-bordered text-left" id="viewServicerData2" >
                                                        <thead className="thead-light" >
                                                            <tr >
                                                                <th>Standard Fields</th>
                                                                <th>Description</th>
                                                                <th>Type</th>
                                                                <th>Status</th>
                                                                {this.state.restrict == true ? '' :
                                                                    <th className="OptionColumn">Option</th>
                                                                }
                                                            </tr>
                                                        </thead>
                                                        <tbody>

                                                            {this.state.tableData ?

                                                                this.state.tableData.map((item, index) => (
                                                                    <React.Fragment>

                                                                        {/* {JSON.stringify(item)} */}




                                                                        <React.Fragment>
                                                                            <tr key={item.key}>
                                                                                <td>

                                                                                    {this.state.actionType == "edit" ?
                                                                                        <input class="Form-control" type="text" defaultValue={item.def || ''}></input>
                                                                                        :
                                                                                        <input class="Form-control" type="text" disabled value={item.def}></input>
                                                                                    }



                                                                                </td>

                                                                                <td>
                                                                                    {this.state.actionType == "edit" ?
                                                                                        <input class="Form-control" type="text" defaultValue={item.descp || ''}></input>
                                                                                        :
                                                                                        <input class="Form-control" type="text" disabled value={item.descp}></input>
                                                                                    }
                                                                                </td>

                                                                                <td>
                                                                                    {this.state.actionType == "edit" ?
                                                                                        <select className="Form-control">
                                                                                            <option hidden selected value={item.type}>{item.type}</option>

                                                                                            <option value='String'>String</option>
                                                                                            <option value='Integer'>Integer</option>
                                                                                            <option value='Float'>Float</option>
                                                                                            <option value='Date'>Date</option>
                                                                                            <option value='Boolean'>Boolean</option>
                                                                                        </select>
                                                                                        :
                                                                                        <select disabled className="Form-control">
                                                                                            <option value={item.type}>{item.type}</option>
                                                                                            {/* <option value=''>Integer</option>
                                                                                            <option value='Float'>Float</option>
                                                                                            <option value='Date'>Date</option>
                                                                                            <option value='Boolean'>Boolean</option> */}
                                                                                        </select>
                                                                                    }
                                                                                </td>

                                                                                <td className="OptionColumn">
                                                                                    {this.state.actionType == "edit" ?
                                                                                        <select className="Form-control">
                                                                                            <option hidden selected value={item.status}>{item.status}</option>

                                                                                            <option value='Active'>Active</option>
                                                                                            <option value='Inactive'>Inactive</option>
                                                                                        </select>
                                                                                        :
                                                                                        <select disabled className="Form-control">
                                                                                            <option value={item.status}>{item.status}</option>

                                                                                            {/* <option value='Active'>Active</option>
                                                                                            <option value='Inactive'>Inactive</option> */}
                                                                                        </select>
                                                                                    }
                                                                                </td>
                                                                                {this.state.restrict == true ? '' :
                                                                                    <td>
                                                                                        <div>
                                                                                            <Button className="float-center" color="primary" style={{ padding: "1px", fontSize: "12px" }} variant="outlined" onClick={this.Edit}>Edit</Button>
                                                                                            {this.state.actionType == "edit" ?
                                                                                                <React.Fragment>
                                                                                                    <Button className="float-center" style={{ marginLeft: "5px", padding: "1px", fontSize: "12px" }} color="primary" variant="outlined" onClick={this.SaveData}>Save</Button>
                                                                                                    <Button className="float-center" style={{ marginLeft: "5px", padding: "1px", fontSize: "12px" }} color="primary" variant="outlined" onClick={this.Cancel}>Cancel</Button>
                                                                                                </React.Fragment>
                                                                                                : ''}
                                                                                        </div>
                                                                                        {/* <span class="btn_save"> <a href="#" class="btn btn-link" > Save</a> | </span>
                                                                                    <span class="btn_cancel"> <a href="#" class="btn btn-link" > Cancel</a> | </span> */}
                                                                                    </td>
                                                                                }
                                                                            </tr>
                                                                        </React.Fragment>



                                                                    </React.Fragment>
                                                                ))

                                                                : null}

                                                        </tbody>
                                                    </table>
                                                </div>
                                                {/* <div className="row justify-content-center" >

                                                    <Button variant="contained" color="primary" type="submit"
                                                        onClick={this.storetobc} >
                                                        Proceed
                                                    </Button>

                                                </div>
 */}


                                            </div>
                                            : ''}

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

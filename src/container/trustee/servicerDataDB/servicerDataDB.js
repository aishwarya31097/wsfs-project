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
import { GetAllDeals, generateYears, months, ServicerDataMongodbAPI } from '../../../servies/services';
import NumberComp from '../../../components/NumberComp';

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
            pageTitle: "View Servicer Data From Database",
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
            ChannelName: localStorage.getItem("ChannelName")
        };
    }

    onFormChanged = (value) => {
        console.log("onFormChanged", value)
        this.setState({ formData: value.formData,report_box: false })
    }

    proceed = () => {
        if (this.props.match.params.DealId != "null" && this.props.match.params.DealId != undefined && this.props.match.params.DealMonth != "null" && this.props.match.params.DealMonth != undefined && this.props.match.params.DealYear != "null" && this.props.match.params.DealYear != undefined) {
            this.props.history.push("/report/" + this.state.DealType + "/validate-monthly-inputs/" + this.props.match.params.DealId + "/" + this.props.match.params.DealMonth + "/" + this.props.match.params.DealYear);
        }
        else {
            this.props.history.push("/report/" + this.state.DealType + "/validate-monthly-inputs/" + this.state.formData.dealId + "/" + this.state.formData.month + "/" + this.state.formData.year);
        }
    }

    storetobc = (e) => {
        this.props.history.push("/report/" + this.state.DealType + "/validate-monthly-inputs/" + this.state.formData.dealId + "/" + this.state.formData.month + "/" + this.state.formData.year);
    }

    async componentDidMount() {
        if (localStorage.getItem("token") == "" || localStorage.getItem("token") == undefined) {
            window.location.assign("/")
        }
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
        this.setState({ report_loader: false, report_box: false });
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
            this.ServicerDataMongodbMethod(DealType, formData.dealId, formData.month, formData.year)
        }
    }


    onSubmit = async (value) => {

        this.props.history.push("/report/" + this.state.DealType + "/view-servicer-mongodb-data/" + value.formData.dealId + "/" + value.formData.month + "/" + value.formData.year);

        this.setState({ report_loader: true, formData: value.formData })
        let data = value.formData;

        let dealId = value.formData.dealId;
        let month = value.formData.month;
        let year = value.formData.year;
        let DealType = this.state.DealType
        this.ServicerDataMongodbMethod(DealType, dealId, month, year)
        // const APIResponse = await ServicerDataMongodb(DealType, dealId, month, year)
        // if (APIResponse != null) {
        //     console.log("ServicerDataMongodb", APIResponse)
        //     this.setState({ tableData: APIResponse.data, report_loader: false, report_box: true })
        // }
    }

    async ServicerDataMongodbMethod(DealType, dealId, month, year) {

        let channelname = this.state.ChannelName;
        this.setState({ report_loader: true })

        const APIResponse = await ServicerDataMongodbAPI(DealType, dealId, month, year, channelname)
        if (APIResponse != null) {
            if (APIResponse.status == 204) {
                this.setState({ report_loader: false })
                const message = "Missing Parameter or No content";
                this.props.enqueueSnackbar(message, {
                    variant: 'error',
                    autoHideDuration: 4000,
                });
            }
            else if (APIResponse.status !== 200) {
                this.setState({ report_loader: false })
                const message = "Something went wrong, please try again";
                this.props.enqueueSnackbar(message, {
                    variant: 'error',
                    autoHideDuration: 5000,
                });
            }
            else if (APIResponse.status == 200) {
                console.log("ServicerDataMongodb", APIResponse)
                this.setState({
                    tableData: APIResponse.data, report_loader: false, report_box: true
                })
            }
        }
        else {
            this.setState({ report_loader: false, report_box: false })
            const message = "Could not fetch data";
            this.props.enqueueSnackbar(message, {
                variant: 'error',
                autoHideDuration: 3000,
            });
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
                                                    <Button variant='contained' color='primary' type='submit'>
                                                        View Data From DB
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

                                    </div>
                                    <React.Fragment>

                                        {this.state.report_box ?
                                            <div className="InvestorReportBox">
                                                <div className="table-responsive">
                                                    <table className="table table-bordered text-left" id="viewServicerData" >
                                                        {((parseInt(this.state.formData.month) <= 9 && parseInt(this.state.formData.year) == 2021) || parseInt(this.state.formData.year) == 2020) ?
                                                            <React.Fragment>
                                                                <thead className="thead-light" >
                                                                    <tr >
                                                                        <th colSpan="3"> Servicer Data </th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>

                                                                    {this.state.tableData ?

                                                                        this.state.tableData.map((item, index) => (
                                                                            <React.Fragment>


                                                                                <React.Fragment>
                                                                                    <tr key={item.key}   >
                                                                                        <td >
                                                                                            {item.key}
                                                                                        </td>
                                                                                        {item.value != undefined || item.value == null ?
                                                                                            <td data-value={item.value} className={item.key == "" ? 'centeritem' : ''}>
                                                                                                <NumberComp value={item.value}></NumberComp>
                                                                                            </td>
                                                                                            : ''}
                                                                                        {item.value1 != undefined || item.value1 == null ?
                                                                                            <td data-value={item.value1} className={item.key == "" ? 'centeritem' : ''}>
                                                                                                <NumberComp value={item.value1}></NumberComp>
                                                                                            </td>
                                                                                            : ''}
                                                                                    </tr>
                                                                                </React.Fragment>



                                                                            </React.Fragment>
                                                                        ))

                                                                        : null}



                                                                </tbody>
                                                            </React.Fragment>
                                                            :

                                                            <React.Fragment>
                                                                <tbody>
                                                                    <React.Fragment>

                                                                        <tr >
                                                                            <th colSpan="3" className="ExtraHeader"> Date </th>

                                                                        </tr>

                                                                    </React.Fragment>
                                                                    {this.state.tableData[0].Date ?

                                                                        this.state.tableData[0].Date.map((item, index) => (
                                                                            <React.Fragment>


                                                                                <React.Fragment>
                                                                                    <tr key={item.key} style={{ fontWeight: "bold" }}  >
                                                                                        <td >
                                                                                            {item.key}
                                                                                        </td>
                                                                                        {item.value != undefined || item.value == null ?
                                                                                            <td data-value={item.value} colSpan="2" className={item.key == "" ? 'centeritem' : ''}>
                                                                                                <NumberComp value={item.value}></NumberComp>
                                                                                            </td>
                                                                                            : ''}
                                                                                   
                                                                                    </tr>
                                                                                </React.Fragment>



                                                                            </React.Fragment>
                                                                        ))

                                                                        : null}


                                                                    <React.Fragment>

                                                                        <tr >
                                                                            <th colSpan="3" className="ExtraHeader"> Collateral Balance </th>

                                                                        </tr>

                                                                    </React.Fragment>
                                                                    {this.state.tableData[0].CollateralBalance ?

                                                                        this.state.tableData[0].CollateralBalance.map((item, index) => (
                                                                            <React.Fragment>


                                                                                <React.Fragment>
                                                                                    <tr key={item.key}   >
                                                                                        <td >
                                                                                            {item.key}
                                                                                        </td>
                                                                                        {item.value != undefined || item.value == null ?
                                                                                            <td data-value={item.value} className={item.key == "" ? 'centeritem' : 'dbview'}>
                                                                                                <NumberComp value={item.value}></NumberComp>
                                                                                            </td>
                                                                                            : ''}
                                                                                        {item.value1 != undefined || item.value1 == null ?
                                                                                            <td data-value={item.value1} className={item.key == "" ? 'centeritem' : 'dbview'}>
                                                                                                <NumberComp value={item.value1}></NumberComp>
                                                                                            </td>
                                                                                            : ''}
                                                                                    </tr>
                                                                                </React.Fragment>



                                                                            </React.Fragment>
                                                                        ))
                                                                        : null}


                                                                    <React.Fragment>

                                                                        <tr >
                                                                            <th colSpan="3" className="ExtraHeader"> Interest Balance </th>

                                                                        </tr>

                                                                    </React.Fragment>
                                                                    {this.state.tableData[0].InterestBalance ?
                                                                        this.state.tableData[0].InterestBalance.map((item, index) => (
                                                                            <React.Fragment>


                                                                                <React.Fragment>
                                                                                    <tr key={item.key}   >
                                                                                        <td >
                                                                                            {item.key}
                                                                                        </td>
                                                                                        {item.value != undefined || item.value == null ?
                                                                                            <td data-value={item.value} className={item.key == "" ? 'centeritem' : 'dbview'}>
                                                                                                <NumberComp value={item.value}></NumberComp>
                                                                                            </td>
                                                                                            : ''}
                                                                                        {item.value1 != undefined || item.value1 == null ?
                                                                                            <td data-value={item.value1} className={item.key == "" ? 'centeritem' : 'dbview'}>
                                                                                                <NumberComp value={item.value1}></NumberComp>
                                                                                            </td>
                                                                                            : ''}
                                                                                    </tr>
                                                                                </React.Fragment>



                                                                            </React.Fragment>
                                                                        ))

                                                                        : null}
                                                                    <React.Fragment>

                                                                        <tr >
                                                                            <th colSpan="3" className="ExtraHeader"> Principal Balance </th>

                                                                        </tr>

                                                                    </React.Fragment>
                                                                    {this.state.tableData[0].PrincipalBalance ?
                                                                        this.state.tableData[0].PrincipalBalance.map((item, index) => (
                                                                            <React.Fragment>


                                                                                <React.Fragment>
                                                                                    <tr key={item.key}   >
                                                                                        <td >
                                                                                            {item.key}
                                                                                        </td>
                                                                                        {item.value != undefined || item.value == null ?
                                                                                            <td data-value={item.value} className={item.key == "" ? 'centeritem' : 'dbview'}>
                                                                                                <NumberComp value={item.value}></NumberComp>
                                                                                            </td>
                                                                                            : ''}
                                                                                        {item.value1 != undefined || item.value1 == null ?
                                                                                            <td data-value={item.value1} className={item.key == "" ? 'centeritem' : 'dbview'}>
                                                                                                <NumberComp value={item.value1}></NumberComp>
                                                                                            </td>
                                                                                            : ''}
                                                                                    </tr>
                                                                                </React.Fragment>



                                                                            </React.Fragment>
                                                                        ))

                                                                        : null}
                                                                          <React.Fragment>

<tr >
    <th colSpan="3" className="ExtraHeader"> Deferred Balance </th>

</tr>

</React.Fragment>
{this.state.tableData[0].DeferredBalance
 ?
this.state.tableData[0].DeferredBalance
.map((item, index) => (
    <React.Fragment>


        <React.Fragment>
            <tr key={item.key}   >
                <td >
                    {item.key}
                </td>
                {item.value != undefined || item.value == null ?
                    <td data-value={item.value}  className={item.key == "" ? 'centeritem' : 'dbview'}>
                        <NumberComp value={item.value}></NumberComp>
                    </td>
                    : ''}
                      {item.value1 != undefined || item.value1 == null ?
                    <td data-value={item.value1} className={item.key == "" ? 'centeritem' : 'dbview'}>
                        <NumberComp value={item.value1}></NumberComp>
                    </td>
                    : ''}
           
            </tr>
        </React.Fragment>



    </React.Fragment>
))

: null}
                                                                    <React.Fragment>

                                                                        <tr >
                                                                            <th colSpan="3" className="ExtraHeader"> Collections </th>

                                                                        </tr>

                                                                    </React.Fragment>
                                                                    {this.state.tableData[0].Collections ?
                                                                        this.state.tableData[0].Collections.map((item, index) => (
                                                                            <React.Fragment>


                                                                                <React.Fragment>
                                                                                    <tr key={item.key}   >
                                                                                        <td >
                                                                                            {item.key}
                                                                                        </td>
                                                                                        {item.value != undefined || item.value == null ?
                                                                                            <td data-value={item.value}  className={item.key == "" ? 'centeritem' : 'dbview'}>
                                                                                                <NumberComp value={item.value}></NumberComp>
                                                                                            </td>
                                                                                            : ''}
                                                                                              {item.value1 != undefined || item.value1 == null ?
                                                                                            <td data-value={item.value1} className={item.key == "" ? 'centeritem' : 'dbview'}>
                                                                                                <NumberComp value={item.value1}></NumberComp>
                                                                                            </td>
                                                                                            : ''}
                                                                                   
                                                                                    </tr>
                                                                                </React.Fragment>



                                                                            </React.Fragment>
                                                                        ))

                                                                        : null}

                                                                </tbody>
                                                            </React.Fragment>
                                                        }
                                                    </table>
                                                </div>
                                                {/* <div className="row justify-content-center" >

                                                    <Button variant="contained" color="primary" type="submit"
                                                        onClick={this.storetobc} >
                                                        Proceed
                                                    </Button>

                                                </div> */}


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

import React, { Component } from 'react';
import Sidebar from '../../../components/sidebar';
import Header from '../../../components/header';
import { withSnackbar } from 'notistack';
// import SideMenu from '../../../components/side-menu/sidemenu';
// import './viewcustomized.css';
import { Navbar, Nav, Button, Form, FormControl, Dropdown } from 'react-bootstrap';
// import MUIDataTable from "mui-datatables";
import JSONData from '../../../json/data.json';
import axios from 'axios';
import ReactTooltip from 'react-tooltip';
import MUIDataTable from "mui-datatables";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import $ from 'jquery';
import { Redirect } from "react-router-dom";

// import axios from 'axios';
const months = [
    {
      value: '1',
      label: 'January',
    },
    {
      value: '2',
      label: 'February',
    },
    {
      value: '3',
      label: 'March',
    },
    {
      value: '4',
      label: 'April',
    },
    {
      value: '5',
      label: 'May',
    },
    {
      value: '6',
      label: 'June',
    },
    {
      value: '7',
      label: 'July',
    },
    {
      value: '8',
      label: 'August',
    },
    {
      value: '9',
      label: 'September',
    },
    {
      value: '10',
      label: 'October',
    },
    {
      value: '11',
      label: 'November',
    },
    {
      value: '12',
      label: 'December',
    },
  ];
  
  function generateYears() {
    let min = 2010;
    console.log("min", min)
    let max = new Date().getFullYear() + 2;
    console.log("max", max)
    let years = []
    for (var i = min; i <= max; i++) {
      console.log("asdasd", i)
      years.push(
        {
          value: i.toString(),
          label: i.toString()
        }
      )  
    }
    let reversarray = years.reverse();
    return reversarray  
  }

  function getdealnames()
  {
      let deallist2=[];
      axios(JSONData.lima_api_url + 'api/v1/trustee/getalldeals?peer=' + "peer1.trustee.trurep.testing.emulya.com" + '&token=' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDgyMjczNzMsInVzZXJuYW1lIjoiVHJ1c3RlZSIsIm9yZ05hbWUiOiJ0cnVzdGVlIiwiaWF0IjoxNjA4MTkxMzczfQ.UelXSvQK7AIghRQa9t6M86BT9qcgj1ixMQS0JzWO-Jg", {
          method: 'GET'
      }).then(res => {
          console.log("response dealnames:::::" + res.data+"lengthg:::"+res.data.length+"res data:::"+res.data[0]);
            // deal_names.push(res.data)
            for(var i=0;i<res.data.length;i++)
            {
                var deallist={
                    dealname:res.data[i]
                }
                deallist2.push(deallist);
            }
  
      })
    //   const deal_name_static=[{dealname:"Lima1"},{dealname:"Lima2"},{dealname:"limatest10"}]
    //   console.log("deal_NAMes::::"+JSON.stringify(deal_names));
      //  deal_names=this.state.alldealNames
       return deallist2
  } 
 class Viewcustomized extends Component {

    constructor(props) {
        super(props);

        this.state = {
          
            showTable: false,          
            selec: "ah",
            ahHighlight: "selected",
            columns: [],
            AllVersionsList: "",
            redirect: false,
            viewcustomRed:false,
            years: generateYears(),
            dealNames:getdealnames(),
         
                selectedColorValue: 1,
            
            fields: {},
            j: 0,

        

        }
        this.billingNavClick = this.billingNavClick.bind(this);
        // this.dropdownnames = this.dropdownnames.bind(this);
        this.getdetails = this.getdetails.bind(this);
        this.viewred = this.viewred.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        const fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
          fields,
        });
    
        console.log('fields', this.state.fields);
    
      }
    componentDidMount() {
        console.log("years", this.state.years)
        let dealid = this.props.match.params.dealid;
        console.log("dealid", dealid)
        this.setState({ fields: { dealId: dealid } })
    }

    onSubmit = () => {

        console.log("fields", this.state.fields);
        const fields = this.state.fields
        // const secondData = value.fields;
        // secondData.dealId = value.fields.dealId;
        // secondData.month = value.fields.month;
        // secondData.year = value.fields.year;
        // alert(this.state.fields.month)
        if (this.state.fields.dealId == undefined || this.state.fields.month == undefined || this.state.fields.year == undefined) {

            const message = "Please fill the required fields";
            this.props.enqueueSnackbar(message, {
                variant: 'error',
                autoHideDuration: 4000,
            });

        } else {

            const data = {
                "dealId": "L1C 2020-1, LLC",
                "month": this.state.fields.month,
                "year": this.state.fields.year,
                "updatedBy": "ID004",
            }

            this.getdetails(data);


        }

    }


    viewred(dealname,month,year,version)
    {
        this.setState({ viewcustomRed: true, dealName:dealname,Month:month,Year:year,Version:version  });
    }
    getdetails(data) {

        console.log("inside getdetails:::::::")
        //    -----------------------------------------------new code----------------------------------
        var peer = "peer1.trustee.trurep.testing.emulya.com";
        var dealName = "L1C 2020-1, LLC";
        var ReportVersions = "Version 1";
        var Month = data.month;
        var year = data.year
        var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDgxMzc2NDksInVzZXJuYW1lIjoiVHJ1c3RlZSIsIm9yZ05hbWUiOiJ0cnVzdGVlIiwiaWF0IjoxNjA4MTAxNjQ5fQ.b8fLwCYGfFZ-ZBvxZZCb7JBaWE0sl_hRCfTQWPFvIPs"



        this.setState({
            peer: ["peer1.trustee.trurep.testing.emulya.com"],
            showTable: true,
            // selected_field1: "Select an OilField",
            // OOiFieldID: "",
            // img: "null",
        })
        axios(
            process.env.react_app_base_url + 'api/V1/api/v1/trustee/reportLima?dealId=' + data.dealId + '&month=' + data.month + '&year=' + data.year + '&version=' + ReportVersions + '&peer=' + peer + '&token=' + token + '&role=' + "trustee" + '&userid=' + "2ea4bb01-3326-4ef6-8a39-c1887b339a8b",
            {
                method: 'GET'
            }
        ).then(res => {

            const data = {
                "PaymentSummary": [
                    {
                        "DealName": "L1C 2020-1, LLC",
                        "ReportVersions": "Version 1",
                        "Month": "6",
                        "year": "2020",
                        "EndingBalance": "65000000.00",
                        // "":" ",
                    },
                    {
                        "DealName": "L1C 2020-1, LLC",
                        "ReportVersions": "Version 2",
                        "Month": "6",
                        "year": "2020",
                        "EndingBalance": "35000000.00",
                        // "":" ",
                    },
                    {
                        "DealName": "L1C 2020-1, LLC",
                        "ReportVersions": "Version 3",
                        "Month": "6",
                        "year": "2020",
                        "EndingBalance": "100000000.00",
                        // "":" ",
                    }
                ],
            }
            console.log("response::::::" + JSON.stringify(res.data));
            console.log("static data:::" + JSON.stringify(res.data.PaymentSummary));
            // if (res.status === 200) {
            var AllVersionsList = [];
            this.setState({ AllVersionsList: res.data.PaymentSummary });
            var arrr = [];
            var inArr = []; var dataArray = [];
            console.log("ALlveraionsList:::" + JSON.stringify(res.data.PaymentSummary));
            for (var i in res.data.PaymentSummary) {
                inArr.push(res.data.PaymentSummary[i].Class);
                inArr.push(res.data.PaymentSummary[i].BeginningBalance);
                inArr.push(res.data.PaymentSummary[i].InterestPaid);
                inArr.push(res.data.PaymentSummary[i].PrincipalPaid);
                inArr.push(res.data.PaymentSummary[i].TotalPaid);
                inArr.push(res.data.PaymentSummary[i].EndingBalance);
                inArr.push(
                    <div>
                        <ReactTooltip place="top" type="dark" effect="solid" />
                        <a data-tip="view report" alt="View Report" style={{cursor:"pointer",color: "#0D6838"}} onClick={this.viewred.bind(this,dealName,Month,year,ReportVersions)}>View Report</a>

                    </div>

                );

                dataArray.push(inArr);
            }
            this.setState({ data: dataArray });

            console.log("data:::::::" + JSON.stringify(dataArray));

            // }


        }).catch(error => console.log(error))






        // ------------------------------------------------------------------------------------------------------------------
    }
    plusicon() {
        var j = this.state.j + 1;

        for (var i = 0; i < 1; i++) {
            const container = document.getElementById('buttonContainer');
            const button = document.createElement('button');
            button.innerText = 'Page ' + j;
            container.appendChild(button);
            container.onclick = function () {
                var itm = document.getElementById("explore");
                var cln = itm.cloneNode(true);
                document.getElementById("pagelist").append(cln);
                // this.setState("#pagelist #explore").hide();
                // ("#pagelist #explore:last-child()").show();
                alert("hi")
            }

        }
        this.setState({ j: j })

    }
    billingNavClick(key) {

        if (key === "ah") {
            this.setState({
                ahHighlight: "selected",
                uhHighlight: "",
                bhHighlight: ""
            })
        }
        else if (key === "uh") {
            this.setState({
                uhHighlight: "selected",
                ahHighlight: "",
                bhHighlight: ""
            })
        }
        else {
            this.setState({
                bhHighlight: "selected",
                ahHighlight: "",
                uhHighlight: ""
            })
        }

        this.setState({ selec: key });
    }
    dropdownnames() {
        // <Dropdown.Item eventKey="1">SPV1</Dropdown.Item>

        var ddArr = ["Class", "Beginning Balance", "Ending Balance"];

        // console.log("spv name list");

        ddArr.push(

            // <Dropdown.Item eventKey="SPV1" onSelect={(evt) => {this.setState({selected_spv: evt})}}>Field 1</Dropdown.Item>

        );


        for (var i in ddArr) {
            ddArr.push(
                <Dropdown.Item eventKey={ddArr[i]} onSelect={(evt) => { this.setState({ selected_field1: evt }) }}>{ddArr[i]}</Dropdown.Item>
                // <option value={this.state.SPVsNameList[i]}>{this.state.SPVsNameList[i]}</option>
            );
        }

        return ddArr;

    }
    render() {
        // table ---------------------------------------------------------------------------------
        const columns = ["DealName", "Version", "Month", "Year", "Interest Paid", "Principal Paid"," "

        ];
        // ---------------------------------------------------------------------------------------
        const options = {

            filterType: 'dropdown',
            pagination: true,
            search: false,
            print: false,
            download: false,
            viewColumns: false,
            sortFilterList: false,
            filter: false,
            fixedHeader: true,
            responsive: "stacked",
            rowsPerPage: 10,
            searchText: this.state.searchText,
            rowsSelected: this.state.rowsSelected,


            // selectableRowsHeader: false,


            onRowsSelect: (rowsSelected, allRows) => {
                console.log(allRows);
                console.log("allrows" + allRows);


                ;
                const selected = allRows.map(item => item.index);
                console.log(selected);

                this.setState({ rowsSelected: selected });
                var arr5 = [];
                arr5.push(selected);
                console.log("arrrr5" + arr5);
                this.setState({ flag: false });

                // for (var i = 0; i < selected.length; i++) {
                //     var t = arr5[0][i];
                //     console.log(t);
                //     console.log(this.state.OilWellList[t].OOiFieldID);
                //     for (var j in this.state.OilFieldList) {
                //         if (this.state.OilWellList[t].OOiFieldID === this.state.OilFieldList[j].OFieldID) {
                //             console.log("inside-------")
                //             this.setState({ flag: true });
                //         }
                //     }

                // }


            },


            textLabels: {
                body: {
                    noMatch: <div className="noDataDisp justify-content-center">

                        <h5>Loading...</h5>
                        {/* <p>Oops! Looks like you haven't added any Oil Wells yet</p>
                        <p>Click below button to start adding Oil Wells</p>
                        <Button className="add_oil_well_tab" onClick={this.open}>Add Oil Wells</Button> */}

                    </div>,

                },

            }
        }

        if (this.state.viewcustomRed) {
            return <Redirect to={{
                pathname: "/report/:DealType/view-report",
                state: { dealName: this.state.dealName,Month: this.state.Month,Year:this.state.Year,Version:this.state.Version }
            }} />
        }
        return (
            <React.Fragment>
            <div className="main">
            <Sidebar></Sidebar>
            {/* <p>dealnames::::{this.state.dealNames}</p> */}
                {/* <SideMenu highlight="customize" /> */}
                <div id="toReview" className="wrapper">
                    <div id="invoicesHead" className="row">
                        {/* <img src={require('../../../images/pen.svg')} alt="edit"></img> */}
                        <img height="75%"
                            src={require('../../../images/WSFS_Wealth_institutional_services_logo.jpg')} className="logo_img" />
                    </div>

                    <div id="customizedMain" className="row">
                        <div className="header_first">
                            <h5 id="owl">
                                <a className="blue"> Analytics </a>

                            </h5>
                        </div>
                        <div id="customizedLeft" className="col-12">
                            <div id="pagelist">
                                <div id="view_explore">
                               
                                    <div className="row justify-content-center">
                                    <React.Fragment>
                                    <TextField
                                            variant="filled"
                                            label={'Deal Name*'}
                                            id="outlined-basic"
                                            name="dealId"
                                            select
                                            value={this.state.fields.dealId}
                                            onChange={this.handleChange}
                                        >
                                        {/* <p>dealnames{this.state.dealNames}</p> */}
                                       {/* {this.state.dealNames.map((option) => (
                                                <MenuItem key={option.dealname} value={option.dealname}>
                                                    {option.dealname}
                                                </MenuItem>
                                            ))} */}
                                         {/* {deal_name_static.map((deal_names) => (
                                                    <MenuItem key={deal_names} value={deal_names}
                                                       primaryText= {deal_names}>
                                                    </MenuItem>
                                                ))} */}
                                        </TextField>
                                        {/* <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-4">
                                            <div className="form-group">
                                                <label for="inputdefault">Deal Name <span>*</span></label>
                                                <select className="myselect" name="dealName" id="dealName">
                                                    <option value=""> Select Deal Name</option>
                                                </select>
                                            </div>
                                        </div> */}
                                         <TextField
                                            label={'Month*'}
                                            variant="filled"
                                            name="month"
                                            id="standard-select-currency"
                                            select
                                            value={this.state.fields.month}
                                            onChange={this.handleChange}
                                        >
                                            {months.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>

                                        {/* <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-4">
                                            <div className="form-group">
                                                <label className="control-label">Month
                <span>*</span>
                                                </label>
                                                <select className="myselect" name="month" id="month">
                                                    <option value=""> Select Month</option>
                                                    <option value="1">January</option>
                                                    <option value="2">February</option>
                                                    <option value="3">March</option>
                                                    <option value="4">April</option>
                                                    <option value="5">May</option>
                                                    <option value="6">June</option>
                                                    <option value="7">July</option>
                                                    <option value="8">August</option>
                                                    <option value="9">September</option>
                                                    <option value="10">October</option>
                                                    <option value="11">November</option>
                                                    <option value="12">December</option>
                                                </select>
                                                <label className="error" for="month"></label>
                                            </div>
                                        </div> */}
                                        {/* <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-4">
                                            <div className="form-group">
                                                <label className="control-label">Year
                <span>*</span>
                                                </label>
                                                <select className="myselect" name="myselectYear" id="myselectYear">
                                                    <option value="">Select Year</option>
                                                    <option value="2020">2020</option>
                                                    <option value="2019">2019</option>
                                                    <option value="2018">2018</option>
                                                    <option value="2017">2017</option>
                                                    <option value="2016">2016</option>
                                                    <option value="2015">2015</option>
                                                    <option value="2014">2014</option>
                                                    <option value="2013">2013</option>
                                                    <option value="2013">2012</option>
                                                    <option value="2011">2011</option>
                                                    <option value="2010">2010</option>
                                                    <option value="2009">2009</option>
                                                    <option value="2008">2008</option>
                                                    <option value="2007">2007</option>
                                                    <option value="2006">2006</option>
                                                    <option value="2005">2005</option>
                                                    <option value="2004">2004</option>
                                                    <option value="2003">2003</option>
                                                    <option value="2002">2002</option>
                                                    <option value="2001">2001</option>

                                                </select>
                                                <label className="error" for="myselectYear"></label>
                                            </div>
                                        </div> */}
                                         <TextField
                                                label={'Year*'}
                                                variant="filled"
                                                name="year"
                                                id="standard-select-currency"
                                                select
                                                value={this.months}
                                                value={this.state.fields.year}
                                                onChange={this.handleChange}
                                            >
                                                {this.state.years.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 viewreportbutton"
                                            id="exportbutton">
                                            <div className=" form-group" style={{ textAlign: "center" }} >
                                                <button id="getdetails" className="btn btn-primary" onClick={this.onSubmit} type="submit">Get Details</button>
                                            </div>
                                        </div>
                                        </React.Fragment>
                                    </div>
                                    {this.state.showTable === true &&
                                        <div id="tablediv">
                                            <div className="tableDetails">
                                                {/* <h1>Table Title</h1> */}

                                                <MUIDataTable
                                                    data={this.state.data}
                                                    // columns={this.state.tableColumns}
                                                    columns={columns}
                                                    options={options}
                                                />
                                            </div>
                                        </div>}

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
export default withSnackbar(Viewcustomized)
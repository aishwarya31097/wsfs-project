import React, { Component } from 'react';
import Header from '../../../components/header';
import Sidebar from '../../../components/sidebar';
import Button from '@material-ui/core/Button';
import { Theme as MuiTheme } from 'rjsf-material-ui';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Form as form } from 'react-bootstrap';
import { withSnackbar } from 'notistack';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import LinearLoader from '../../../components/loader/LinearLoader';
import Loader from '../../../components/loader';
import { GetAllDeals, generateYears, months, UploadServicerReport, ServicerData, savemapping,getmapping,UploadToggle,restrictdefn,ServicerDataAddNewReport1, ServicerDataAddNewReport2, ServicerDataAddNewReport3, ServicerDataAddNewReport4 } from '../../../servies/services';
import Select from '@material-ui/core/Select';
import Autocompete from "./Autocompete";
import DoneIcon from '@material-ui/icons/Done';
import $ from 'jquery';
import Tooltip from '@material-ui/core/Tooltip';


class addNewReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getLoansLoader: false,
      open: false,
      years: generateYears(),
      fields: {
        dealId: null,
        month: null,
        year: null,
      },
      file: null,
      pageTitle: "Add New Report",
      getLoader: false,
      token: localStorage.getItem("token"),
      user_id: localStorage.getItem("user_id"),
      OrgName: localStorage.getItem('OrgName'),
      DealType: localStorage.getItem('DealType'),
      peers: JSON.parse(localStorage.getItem('peers')),
      deal_name: [],
      all_deals: JSON.parse(localStorage.getItem("all_deals")),
      form_loader: false,
      channelname: localStorage.getItem('ChannelName'),
      initial:false,
      Shrink:false,
      saveloader2:false
    };

    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(e) {
    const fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields,
      Shrink:true
    });

    console.log('fields', this.state.fields);

  }
  handlematch = ()=>{
    let unmatcheddata = []
    let alias = this.state.tableData

    console.log("tabledata",alias)

    $('#unmatchedtable tbody tr').each(function(index,tr){

        // console.log("Index : ",index)
        // console.log("data: ",$(tr).find('td:eq(0)').text())
        // console.log("data2: ",$(tr).find('td:eq(1)').find('input').val())

        if($(tr).find('td:eq(1)').find('input').val() != ""){
            let input={
                'key':$(tr).find('td:eq(0)').text(),
                'value': $(tr).find('td:eq(1)').find('input').val()
            }
            unmatcheddata.push(input)
        }

    })
    console.log("unmatcheddata",unmatcheddata)

    unmatcheddata.map((key,value)=>{
        console.log("key : ",key)
        var item = alias.find(x => x.key == key.key && x.value == "");
        console.log("item : ",item)
        item.value = key.value
    })

    console.log("tabledata2",alias)
var arrayleft=this.state.ArrayLeft-unmatcheddata.length
var arrayright=this.state.ArrayRight+unmatcheddata.length
console.log("Lenghth of both",arrayleft,arrayright)
    this.setState({tableData:alias , ArrayLeft:arrayleft,ArrayRight:arrayright})

}

  handleDoc = (e) => {

    console.log("{JSON.stringify(e.target.files[0])}", JSON.stringify(e.target.files[0]))
    this.setState({ file: e.target.files[0] });

  }

  componentDidMount() {
    if(localStorage.getItem("token") == "" || localStorage.getItem("token") == undefined) {
      window.location.assign("/")
}
   
    const dealId = this.props.match.params.DealId;
    const month = this.props.match.params.DealMonth;
    const year = this.props.match.params.DealYear;
 
    console.log("dealId dealMonth dealyear componentDidMount", dealId, month, year);
    const fields = {
      dealId: dealId,
      month: month,
      year: year,
    }
    if( fields.dealId == undefined ){
      this.setState({  Shrink:false    });

    }
    else{
      this.setState({  Shrink:true    });
    }
    this.setState({ fields: fields  });
    console.log("FIELDS",fields)
    const DealType = this.state.DealType;
    console.log("setTimeout", Date().toLocaleString())
    this.setTimeout(DealType)
  }

  setTimeout = (DealType) => (
    
    this.setState({ getLoader: true }),

    setTimeout(() => {
      console.log("setTimeout", Date().toLocaleString())
      this.GetAllDeals(DealType)
    }, 3000)

);



  componentWillReceiveProps(nextProps) {
    const dealId = nextProps.match.params.DealId;
    const month = nextProps.match.params.DealMonth;
    const year = nextProps.match.params.DealYear;
    console.log("dealId dealMonth dealyear componentWillReceiveProps", dealId, month, year);
    // if( dealId == undefined ){
    //   this.setState({  Shrink:false    });

    // }
    // else{
    //   this.setState({  Shrink:true    });
    // }
    const fields = {
      dealId: dealId,
      month: month,
      year: year,
    }

    this.setState({ fields: fields});

  }


  onSubmit = () => {
    console.log("fields", this.state.fields);
    const fields = this.state.fields
    if (this.state.fields.dealId == "null" ||  this.state.fields.month == "null"  ||  this.state.fields.year == "null" 
    // || this.state.file == null
    ) {

      const message = "Please fill the required fields";
      this.props.enqueueSnackbar(message, {
        variant: 'error',
        autoHideDuration: 4000,
      });

    } else {

      this.props.history.push("/report/" + this.state.DealType + "/add-new/" + this.state.fields.dealId + "/" + this.state.fields.month + "/" + this.state.fields.year);
      this.setState({ form_loader: true })
      const data = {
        "dealId": this.state.fields.dealId,
        "month": this.state.fields.month,
        "year": this.state.fields.year,
        "userId": this.state.userId,
        "peers": this.state.peers,
        "filetype": ".xls",
        "updatedBy": this.state.user_id,
        "channelname":this.state.channelname,
      }
this.setState({data : data})
      // this.UploadServicerReportMethod(data);
      this.getmapping(data, this.state.DealType);


    }

  }


  GetAllDeals = async (DealType) => {


    this.setState({ getLoader: true })
    let Role=localStorage.getItem("OrgName");
let UserName=localStorage.getItem("user_name");
    const APIResponse = await GetAllDeals(DealType,Role,UserName)
    console.log("APIResponse GetAllDeals GetAllDeals", APIResponse, this.state.years, this.state.months)
    if (APIResponse != null) {

      let deal_name = []
      if (APIResponse.data.length !== 0) {
        APIResponse.data.map((item) => {
          console.log("item", item);
          deal_name.push({ "deal_id": item });
        })
      }

      localStorage.setItem('all_deals', JSON.stringify(deal_name));
      this.setState({ getLoader: false })
      this.setState({ deal_name: deal_name })
    }

  };



  async UploadServicerReportMethod(data) {
    const DealType = this.state.DealType;
    const newdata = new FormData();
    newdata.append("dealId", data.dealId);
    newdata.append('filename', this.state.file);
    const constUploadServicerReport = await UploadServicerReport(newdata, DealType);
    if (constUploadServicerReport != null) {
      console.log("UploadServicerReport", constUploadServicerReport.data);
      
      if (constUploadServicerReport.data.isSuccess == true) {

        this.getmapping(data, DealType);
    
      } else {
        const message = "Data not saved successfully";
        this.props.enqueueSnackbar(message, {
          variant: 'error',
          autoHideDuration: 3000,
        });
      }
    }
  }

  async getmapping(data, DealType) {
    const ConstServicerDataAddNewReport1 = await getmapping(DealType,data.dealId,data.month,data.year,data.channelname);
    if (ConstServicerDataAddNewReport1 != null) {
      if (ConstServicerDataAddNewReport1.status == 204) {
        const message = "Mapping not saved";
        this.props.enqueueSnackbar(message, {
            variant: 'error',
            autoHideDuration: 4000,
        });
    }
    else{
      console.log("ServicerData", ConstServicerDataAddNewReport1.data);
    
        this.setState({tableData:ConstServicerDataAddNewReport1.data.key,stdfields:ConstServicerDataAddNewReport1.data.stdfields,initial:true ,form_loader:false})
        // const message = "Data saved successfully";
        // this.props.enqueueSnackbar(message, {
        //   variant: 'info',
        //   autoHideDuration: 3000,
        // });
        //       this.props.history.push("/report/" + this.state.DealType + "/view-servicer-mongodb-data/" + this.state.fields.dealId + "/" + this.state.fields.month + "/" + this.state.fields.year);
        let   ArrayLeft=[];
        let  ArrayRight=[]
         Object.entries(ConstServicerDataAddNewReport1.data.key).map(([columnId, column], index) => {
             if(column.value == "" && column.key!= "" ){
    ArrayLeft.push(column);
             }
             else if(column.value != "" && column.key!= ""){

                 ArrayRight.push(column)
             }
    
    
         }
         )
        this.setState({ ArrayLeft:ArrayLeft.length, ArrayRight:ArrayRight.length})
        }
      } else {
        const message = "Data not saved successfully";
        this.props.enqueueSnackbar(message, {
          variant: 'error',
          autoHideDuration: 3000,
        });
      }

    
  }
  async ServicerDataAddNewReportMethod() {
    this.setState({saveloader2:true})
    let data=this.state.data;
    let DealType=this.state.DealType;
    const ConstServicerDataAddNewReport1 = await ServicerData(data, DealType);
    if (ConstServicerDataAddNewReport1 != null) {
      console.log("ServicerData", ConstServicerDataAddNewReport1.data);
      if (ConstServicerDataAddNewReport1.data.success == true) {
        this.setState({saveloader2:false})

        console.log("Servicer Data DONE")
        const message = "Data saved successfully";
        this.props.enqueueSnackbar(message, {
          variant: 'info',
          autoHideDuration: 3000,
        });
              this.props.history.push("/report/" + this.state.DealType + "/view-servicer-mongodb-data/" + this.state.fields.dealId + "/" + this.state.fields.month + "/" + this.state.fields.year);

      } else {
        this.setState({saveloader2:false})
        const message = "Data not saved successfully";
        this.props.enqueueSnackbar(message, {
          variant: 'error',
          autoHideDuration: 3000,
        });
      }

   }
  }


  // async ServicerDataAddNewReportMethod3(data, res, DealType) {
  //   let newdata = data
  //   newdata.result2 = res.result1;
  //   const ConstServicerDataAddNewReport2 = await ServicerDataAddNewReport3(newdata, DealType);
  //   if (ConstServicerDataAddNewReport2 != null) {
  //     console.log("ServicerDataAddNewReportMethod3", ConstServicerDataAddNewReport2.data);
  //     if (ConstServicerDataAddNewReport2.data.isSuccess == true) {
  //       let res3 = ConstServicerDataAddNewReport2.data;
  //       this.ServicerDataAddNewReportMethod4(data, res3, DealType);
  //     } else {
  //       const message = "Data not saved successfully";
  //       this.props.enqueueSnackbar(message, {
  //         variant: 'error',
  //         autoHideDuration: 3000,
  //       });
  //     }
  //   }
  // }


  // async ServicerDataAddNewReportMethod4(data, res3, DealType) {
  //   let newdata = data
  //   newdata.result3 = res3.result3;
  //   const ConstServicerDataAddNewReport4 = await ServicerDataAddNewReport4(newdata, DealType);
  //   if (ConstServicerDataAddNewReport4 != null) {
  //     console.log("ServicerDataAddNewReportMethod4", ConstServicerDataAddNewReport4.data);
  //     if (ConstServicerDataAddNewReport4.data.success == true) {
  //       const message = "Data saved successfully";
  //       this.props.enqueueSnackbar(message, {
  //         variant: 'info',
  //         autoHideDuration: 3000,
  //       });
  //       this.props.history.push("/report/" + this.state.DealType + "/view-servicer-mongodb-data/" + this.state.fields.dealId + "/" + this.state.fields.month + "/" + this.state.fields.year);
  //     } else {
  //       const message = "Data not saved successfully";
  //       this.props.enqueueSnackbar(message, {
  //         variant: 'error',
  //         autoHideDuration: 3000,
  //       });
  //     }
  //   }
  // }

  // async servicerdata(data) {
  //   this.setState({ getLoansLoader: true });
  //   const DealType = this.state.DealType;
  //   const APIResponse = await ServicerData(data, DealType);
  //   console.log("APIResponse.data.Success", APIResponse.data);
  //   if (this.state.file !== null) {
  //     const newdata = new FormData();
  //     newdata.append('filename', this.state.file);
  //     const UploadServicerReport = await UploadServicerReport(newdata, DealType);
  //     console.log("UploadServicerReport", UploadServicerReport.data);
  //     if (UploadServicerReport.data.isSuccess == true) {
  //       this.props.history.push("/report/" + this.state.DealType + "/view-servicer-mongodb-data/" + data.dealId + "/" + data.DealMonth + "/" + data.DealYear);
  //       const message = "Data saved successfully";
  //       this.props.enqueueSnackbar(message, {
  //         variant: 'info',
  //         autoHideDuration: 2000,
  //       });
  //     } else {
  //       const message = "Data not saved successfully";
  //       this.props.enqueueSnackbar(message, {
  //         variant: 'error',
  //         autoHideDuration: 3000,
  //       });
  //     }
  //   }
  // }
  proceed = () => {
    if (this.props.match.params.DealId != "null" && this.props.match.params.DealId != undefined && this.props.match.params.DealMonth != "null" && this.props.match.params.DealMonth != undefined && this.props.match.params.DealYear != "null" && this.props.match.params.DealYear!= undefined) {
      this.props.history.push("/report/" + this.state.DealType + "/view-servicer-mongodb-data/" + this.props.match.params.DealId + "/" + this.props.match.params.DealMonth + "/" + this.props.match.params.DealYear);
  }
  else{
    this.props.history.push("/report/" + this.state.DealType + "/view-servicer-mongodb-data/" + this.state.fields.dealId + "/" + this.state.fields.month + "/" + this.state.fields.year);
  }
}
  onchange = (data, type) => {
        
    console.log("Form>", data, "++++"+ type);
    this.setState({desc:data})
}

  Edit = async (index) => {
    this.setState({ actionType: 'edit',currentIndex: index});
}
Cancel = async () => {
    this.setState({ actionType: 'add' });
}
  SaveCustomizeReport= async ()=>{
    var leftValues = []
    $('#mapCamp #unmatchedtable tbody tr').each(function (index, tr) {
        console.log("row tr", tr);
        leftValues[index] = {
            ['Key ' + index]: $(tr).find("td:eq(0)").text(),
            ['Value '+ index]:$(tr).find("td:eq(1) input").val()
        };
    });
    console.log("leftValues" + JSON.stringify(leftValues))
var Length=leftValues.length;

    // var rightValues = []
    $('#mapCamp #matchedtable tbody tr').each(function (index, tr) {
        console.log("row tr", tr);
        var index2=index+Length;
        leftValues[index2] = {
            ['Key ' +index2]: $(tr).find("td:eq(0)").text(),
            ['Value '+index2]:$(tr).find("td:eq(1) input").val()
        };
    });
    console.log("leftValues" + JSON.stringify(leftValues))

    // var rightValues = []
    // $('#mapCamp #unmatchedtable tbody tr').each(function (index, tr) {
    //     console.log("div.length", tr)
    //     console.log("div.length", div.length)
    //     // let colength = $(div).find("input").length
       
    //     // console.log("collenght"+colength)
    //     rightValues[index] = {
    //         ['Key' + index]: $(div).find("input").val(),
    //     };
    // });
    // console.log("rightValues" + JSON.stringify(rightValues))

    // let finalJson = []

    // $(leftValues).each(function (index, item) {
    //     // console.log("leftValues finalJson", JSON.stringify(index) +"ASdasdsd" +JSON.stringify(item));
    //     console.log("leftValues finalJson", item['Key' + index])
    //     console.log("rightValues 1", rightValues[index])
    //     console.log("rightValues 2", rightValues[index]['Key' + index])
    //     finalJson.push({
    //         ['Key ' + index]: item['Key' + index],
    //         ['Value ' + index]: rightValues[index]['Key' + index]
    //     })



    // });
    // console.log("FINALJSON", finalJson)  


    var data = {};
    data.peers = this.state.peers;
    data.dealId = this.state.data.dealId;
    data.assetclass = this.props.assetclass;
    data.year = this.state.data.year;
    data.month=this.state.data.month;
    data.channelname=this.state.channelname;

    data.data = leftValues;
    console.log("DATAAAAAA" + JSON.stringify(data))
    if (window.confirm("Are you sure you want to proceed?")) {
      this.setState({saveloader:true})


        const APIResponse = await savemapping(this.state.DealType, data);
        if (APIResponse != null) {
          this.setState({saveloader:false})
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
                    // this.setState({ formLoader: false, IsOpen: false })
                    // this.history.push("/report/" + this.props.DealType + "/add-new/" + this.props.dealId + "/" + this.props.month + "/" + this.props.year);

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
                }
            }
        }
    }
}
  matchedRows() {
    return Object.entries(this.state.tableData).map(([columnId, column], index) => (
      <React.Fragment>
      {column.value == "" || column.key == ""?'':
      <React.Fragment>
          <tr>
              <td style={{ "white-space": "pre-wrap" }}>
                {column.key}
              </td>
              <td style={{ "white-space": "pre-wrap" }}>
              {this.state.actionType == "edit" && this.state.currentIndex == index ?
                  <Autocompete
                      suggestions={this.state.stdfields}
                      description={column.descp}
                      default={column.value}
                      divname="middiv"
                      onchange={(data, type) => { this.onchange(data, type) }}
                      disabled ="false"
                  />
              :
                  <Autocompete
                      suggestions={this.state.stdfields}
                      description={column.descp}
                      default={column.value}
                      divname="middiv"
                      onchange={(data, type) => { this.onchange(data, type) }}
                      disabled ="true"
                  />
              }
              </td>
              <td>
                  <div className="Actionrow">
                                 
                      {this.state.actionType == "edit"  && this.state.currentIndex == index?
                          ''
                          :
                          <React.Fragment>
                              <img alt="" src={require('../../../images/edit.png')} style={{ marginLeft: "20px" }} height="25px" width="25px" x={index} onClick={() => this.Edit(index)}></img>
                              {/* <img alt="" src={require('../../../images/delete.png')} style={{ marginLeft: "20px" }} height="25px" width="25px" x={index} onClick={() => this.Delete(index)}></img> */}
                          </React.Fragment>
                      }
                      {this.state.actionType == "edit"  && this.state.currentIndex == index ?
                          <React.Fragment>
                          <Button className="float-center" style={{ padding: "1px" }} color="primary" variant="outlined" onClick={this.Cancel}><DoneIcon  /></Button>
                          {/* <Button className="float-center" style={{ marginLeft: "5px", padding: "1px"}} color="primary" variant="outlined" onClick={this.Cancel}><CloseIcon style={{ color:'red' }} /></Button> */}
                          </React.Fragment>
                      : ''}
                  </div>
              </td>
          </tr>
      </React.Fragment>
      }
      </React.Fragment>
    ))
}

  unmatchedRows() {
       
    return Object.entries(this.state.tableData).map(([columnId, column], index) => (
        <React.Fragment>
        {column.value == "" && column.key != "" ?
      <React.Fragment>
          <tr>
              <td style={{ "white-space": "pre-wrap" }}>{column.key}</td>
              <td style={{ "white-space": "pre-wrap" }}>
                  <Autocompete
                      suggestions={this.state.stdfields}
                      description={column.descp}
                      default={column.value}
                      divname="middiv"
                      onchange={(data, type) => { this.onchange(data, type) }}
                  />
              </td>
          </tr>
      </React.Fragment>
      :''}
      </React.Fragment>
    ))
    

}

  render() {
    function unmatchsearch() {
      console.log("inside search function")
      var input = document.getElementById("unmatchsearch");
      var filter = input.value.toUpperCase();
      var table = document.getElementById("unmatchedtable");
      var tr = table.getElementsByTagName("tr");
      var td, i;
  
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
          if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
      }
    }

    function matchsearch() {
      console.log("inside search function")
      var input = document.getElementById("matchsearch");
      var filter = input.value.toUpperCase();
      var table = document.getElementById("matchedtable");
      var tr = table.getElementsByTagName("tr");
      var td, i;
  
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
          if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
      }
    }
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
                  {this.state.loading == false ? <Loader msg={"Loading Modules..."} /> :
                    <React.Fragment>
                      <div className="fourColunm">
                        <div className="rjsf">
                          <div className="row mb-3">
                            <div className="col-md-4">
                              <TextField
                                label={'Deal Name*'}
                                variant="filled"
                                size="medium"
                                name="dealId"
                                // labelId="demo-controlled-open-select-label"
                                id="standard-select-currency"
                                select
                                InputLabelProps={{ shrink: this.state.Shrink }}  

                                value={this.state.fields.dealId}
                                onChange={this.handleChange}
                              >
                                {this.state.deal_name.map((item) => {
                                  return (
                                    <MenuItem value={item.deal_id}> {item.deal_id} </MenuItem>
                                  );
                                })
                                }
                              </TextField>

                            </div>

                            <div className="col-md-4">

                              <TextField
                                label={'Month*'}
                                variant="filled"
                                name="month"
                                id="standard-select-currency"
                                select
                                value={this.state.fields.month}
                                onChange={this.handleChange}
                                InputLabelProps={{ shrink: this.state.Shrink }}  
                              >
                                {months.map((option) => (
                                  <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </div>
                            <div className="col-md-4">

                              <TextField
                                label={'Year*'}
                                variant="filled"
                                name="year"
                                id="standard-select-currency"
                                select
                                value={this.year}
                                value={this.state.fields.year}
                                onChange={this.handleChange}
                                InputLabelProps={{ shrink: this.state.Shrink }}  
                              >
                                {this.state.years.map((option) => (
                                  <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                  </MenuItem>
                                ))}
                              </TextField>

                            </div>
                          </div>

                          {/* <div className="row text-left">
                            <div className="col-md-4">
                              <div id="browseexcel">
                                <form.Group controlId="formGrid">
                                  <form.Label>Browse Loan Tape</form.Label>
                                  <form.Control type="file"
                                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                    onChange={this.handleDoc}
                                    placeholder="" />
                                </form.Group>
                              </div>
                            </div>

                          </div> */}


                          <div className='row justify-content-center'>
                            <Button onClick={this.onSubmit} variant='contained' color='primary' type='submit'>
                              Get Mapping {this.state.form_loader === true ? (
                                <CircularProgress size='25px' color='primary' />
                              ) : (
                                  ''
                                )}
                            </Button>
                            <div className="col-md-1">
                            <Button variant="outlined" color="primary" onClick={this.proceed}>Next</Button> 
                            </div>
                          </div>
                        </div>
                     </div>
                    </React.Fragment>
                  }



                </div>

               
              </div>

{this.state.initial==true ?
              <React.Fragment>
                      <div className="row people">
                    
                   
                    
                        <div className="col-md-2" >
                        <Tooltip title={'Click to save the standardized mapping'} placement="center">

                            <Button variant='contained' color='primary'
                                onClick={() => this.SaveCustomizeReport()} > Save Mapping
        
                                {this.state.saveloader == true ? (
                                    <CircularProgress size='15px' color='primary' />
                                    ) : (
                                    ''
                                )}
                            </Button>
                            </Tooltip>
                        </div>
                        <div className="col-md-3">
                        <Tooltip title={'Click to save the data to the Database'} placement="center">

                            <Button variant='contained' color='primary'  style={{marginLeft:"-150px"}}
                                onClick={() => this.ServicerDataAddNewReportMethod()} > Save Data to DB
        
                                {this.state.saveloader2 == true ? (
                                    <CircularProgress size='15px' color='primary' />
                                    ) : (
                                    ''
                                )}
                            </Button>
                            </Tooltip>
                        </div>
                      </div>
                     
 </React.Fragment>
 :''}
   <React.Fragment>
 {this.state.initial==true ?
 
              <div id="mapCamp">


<div className="row">

<div className="col-md-5 col-sm-12">
    <div className="card">
        <div className="row splittablehead">
            <div className="col-md-4 HeadCount">
                <p className="font-weight-bold">Unmatched Fields ({this.state.ArrayLeft})</p>
            </div>
            {/* <div className="col-md-4">
                <Button variant="outlined" color="primary"   onClick={this.AddstdShow}>+ Custom Field</Button>
            </div>
              */}
            <div className="col-md-4 tablesearch">
            <input type="text" id="unmatchsearch" 
                        onChange={unmatchsearch}
                      onkeyup={unmatchsearch}
                      className="form-control mb-3 " placeholder="Search" />
          
            </div>
        </div>
        {/* <div className="lefttable"> */}
        <table className="mapcomptable" id="unmatchedtable">
            <thead className="tablehead">
                <tr>
                    <th scope="col">Servicer Tape Field</th>
                    <th scope="col">Standard Field</th>
                </tr>
            </thead>
            <tbody>
                {this.unmatchedRows()}
            </tbody>
        </table>
        {/* </div> */}
    </div>
</div>

<div className="col-md-1 col-sm-12 upperpart">
    <Button variant='contained' color='primary' type="submit" onClick={this.handlematch}>Match </Button>
</div>

<div className="col-md-6 col-sm-12">
    <div className="card">
        <div className="row splittablehead">
            <div className="col-md-3 HeadCount">
                <p className="font-weight-bold">Matched Fields ({this.state.ArrayRight})</p>
            </div>
            <div className="col-md-5"></div>
            <div className="col-md-4 tablesearch">
            <input type="text" id="matchsearch" 
                        onChange={matchsearch}
                      onkeyup={matchsearch} className="form-control mb-3" placeholder="Search" />
            </div>
        </div>
        <table className="mapcomptable" id="matchedtable">
            <thead className="tablehead">
                <tr>
                    <th scope="col">Servicer Tape Field</th>
                    <th scope="col">Standard Field</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {this.matchedRows()}
            </tbody>
        </table>
    </div>
</div>

</div>

</div>
:''}
  </React.Fragment>
            </div>
            
          </div>
        </div>







      </React.Fragment>
    );
  }
}

export default withSnackbar(addNewReport);
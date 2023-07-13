import React, { Component ,useState} from 'react';
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
import { GetAllDeals, generateYears, months, UploadServicerReport, ServicerData, restrictdefn, showcolumns, getactivedefinition } from '../../../servies/services';
import Select from '@material-ui/core/Select';
import $ from 'jquery';
import MapComp from './MapComp2'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

// const [dragItem, setDragItem] = useState();
// const [list, setList] = useState([
//   "The Call Of Ktulu",
//   "For Whom The Bell Tolls",
//   "The Day That Never Comes",
//   "The Memory Remains",
//   "Confusion",
//   "Moth Into Flame",
//   "The Outlaw Torn",
//   "No Leaf Clover",
//   "Halo on Fire",
// ]);
const A=["loan_id","borrower_fico","property_city","loan_type","loan_rate"]


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
      pageTitle: "Map Standard Fields",
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
      // tasks: [{"def":"loan_id","descp":"loanID","type":"String","status":"Active","category":"complete"},
      // {"def":"loan_trade_date","descp":"loan_trade_date","type":"String","status":"Active","category":"complete"}],
      // leftresult: ["loan_id", "loan_trade_date","xyz","aaa"]
      standard_box:false,
      hideshow:false,
      A:A,
    };

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


  handleDoc = (e) => {

    console.log("{JSON.stringify(e.target.files[0])}", JSON.stringify(e.target.files[0]))
    this.setState({ file: e.target.files[0] });

  }

 
 

 

  componentDidMount() {

    const dealId = this.props.match.params.DealId;
    const month = this.props.match.params.DealMonth;
    const year = this.props.match.params.DealYear;
    console.log("dealId dealMonth dealyear componentDidMount", dealId, month, year);
    const fields = {
      dealId: dealId,
      month: month,
      year: year,
    }

    this.setState({ fields: fields });
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
    const fields = {
      dealId: dealId,
      month: month,
      year: year,
    }

    this.setState({ fields: fields });

  }
  hideshow=()=>{
    var hideshow=this.state.hideshow;
    if(hideshow==false){
      this.setState({hideshow:true})

    }
    else{
      this.setState({hideshow:false})

    }
  }

  onSubmit = () => {
    console.log("fields", this.state.fields);
    const fields = this.state.fields
    if (this.state.fields.dealId == "null" || this.state.fields.month == "null" || this.state.fields.year == "null" || this.state.file == null) {

      const message = "Please fill the required fields";
      this.props.enqueueSnackbar(message, {
        variant: 'error',
        autoHideDuration: 4000,
      });

    } else {

      this.props.history.push("/report/" + this.state.DealType + "/mapping-page/" + this.state.fields.dealId + "/" + this.state.fields.month + "/" + this.state.fields.year);
      this.setState({ form_loader: true })
      const data = {
        "dealId": this.state.fields.dealId,
        "month": this.state.fields.month,
        "year": this.state.fields.year,
        "userId": this.state.userId,
        "peers": this.state.peers,
        "filetype": ".xlsx",
        "updatedBy": this.state.user_id,
        "channelname": this.state.channelname,
      }
      let dealId = this.state.fields.dealId;
      let month = this.state.fields.month;
      let year = this.state.fields.year;
      let DealType = this.state.DealType
      // this.servicerdata(data);
      this.Restrict(DealType, dealId, month, year, data);

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
      console.log("deal_name",this.state.deal_name)
    }

  };

  async Restrict(DealType, dealId, month, year, data) {

    let channelname = this.state.ChannelName;

    //Restrict api
    this.setState({ report_loader: true, standard_box:false })
    let restrictresult="";
    const APIResponse = await restrictdefn(DealType, dealId, month, year, channelname)
    if (APIResponse != null) {

    console.log("restrictdefn", APIResponse)
    if (APIResponse.status == 204) {
      this.setState({ form_loader: false })
        const message = "Missing Parameter or No content";
        this.props.enqueueSnackbar(message, {
            variant: 'error',
            autoHideDuration: 4000,
        });
    }
    else if (APIResponse.status !== 200) {
      this.setState({ form_loader: false })
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
            this.UploadServicerReportMethod(DealType, dealId, month, year,data)

        } else if(APIResponse.data.success == 0){
            restrictresult = "0";
    this.getdata(DealType, dealId, month, year, channelname,restrictresult)
        }
        else{
          this.setState({ form_loader: false })
     this.setState({AddStdBtn:true,getdatabtn:true}) 
            const message = APIResponse.data.result
            this.props.enqueueSnackbar(message, {
                variant: 'error',
                autoHideDuration: 3000,
            });
        }
    }
    }
    //end
  }

  async UploadServicerReportMethod(DealType, dealId, month, year, data) {
    // const DealType = this.state.DealType;
    const newdata = new FormData();
    newdata.append('filename', this.state.file);
  
    const constUploadServicerReport = await UploadServicerReport(newdata, DealType);
    if (constUploadServicerReport != null) {
      console.log("UploadServicerReport", constUploadServicerReport.data);
      if (constUploadServicerReport.data.isSuccess == true) {
        var filetype=constUploadServicerReport.data.filetype
        this.showcolumn(DealType, dealId, month, year,filetype);
      } else {
        const message = "Data not saved successfully";
        this.props.enqueueSnackbar(message, {
          variant: 'error',
          autoHideDuration: 3000,
        });
      }
    }
  }
  async showcolumn(DealType, dealId, month, year, filetype) {
    const APIResponse = await showcolumns(DealType, dealId, month, year,filetype)
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
        if (APIResponse.data.success == true) {
       var result = APIResponse.data.keys;
    this.getactivedefinition(DealType, dealId, month, year, result)
        } 
        else{
     this.setState({AddStdBtn:true,getdatabtn:true}) 
            const message = "Could not fetch data!"
            this.props.enqueueSnackbar(message, {
                variant: 'error',
                autoHideDuration: 3000,
            });
        }
    }
    }
  }

  async getactivedefinition(DealType, dealId, month, year, result) {
    const APIResponse = await getactivedefinition(DealType, dealId, month, year)
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
        if (APIResponse.status == 200) {
        var   result2 = APIResponse.data;
    this.prompt(result,result2)
        } 
        else{
     this.setState({AddStdBtn:true,getdatabtn:true}) 
            const message = APIResponse.data.result
            this.props.enqueueSnackbar(message, {
                variant: 'error',
                autoHideDuration: 3000,
            });
        }
    }
    }
  }

  async prompt(result, result2) {

    this.setState({ leftresult:result, rightresult: result2 ,
      standard_box:true,
      form_loader:false,
      hideshow:true})


  }

  // async SaveMapping (){


  //   var senddata = []
  //   $('#ValidationTableMapping tbody tr').each(function (row, tr) {
  //     console.log("row tr",row,tr);
  //       senddata[row] = {

  //           ['Key'+row]: $(tr).find("td:eq(0) input[type='text']").val(),
  //           ['Value'+row]: $(tr).find("td:eq(1) div p").val(),
       

  //       };
  //   });

//     var rows = [];
//     $('#ValidationTableMapping').find("tr").each(function (i) {
//         // alert("inside table!!!!!")
//         // alert("key"+$(this).find("td").text())
//         console.log("i"+i)
//         var input = {
//             ["Key" + (i)]: $(this).find("td").eq(0).text(),
//             ["Value" + (i)]: $.trim($(this).find("td").eq(1).text().replace(/(\r\n|\n|\r)/gm, ""))
//         }                               
//         rows.push(input) 


 
// });

// console.log("rows",senddata)
//   }



  async servicerdata(dealId, month, year) {
    // this.setState({ report_loader: true, ValidateMonthlyInputStateLoader: false })
    // const DealType = this.state.DealType;
    // let channelname = this.state.channelname;
    // const APIResponse = await ValidateMonthlyInput(DealType, dealId, month, year, channelname)

    // this.setState({ report_loader: false })
    // if (APIResponse != null) {
    //     console.log("ValidateMonthlyInput", APIResponse)
    let ValidateMonthlyInputState = {}

    //     if (APIResponse.data.length != 0) {

    //         this.state.validateSchema.map((item) => {

    //             // console.log("ValidateMonthlyInputState", JSON.stringify(item))
    //             // console.log("ValidateMonthlyInputState", JSON.stringify(APIResponse.data[item.key].value1))
    //             // ValidateMonthlyInputState.push({
    //             //     [item.key + "_value1"]: APIResponse.data[item.key].value1
    //             // })
    //             console.log("============" + JSON.stringify(APIResponse.data[item.key]))
    //             if (APIResponse.data[item.key].value1 != undefined) {
    //                 ValidateMonthlyInputState[item.key + "_value1"] = APIResponse.data[item.key].value1.length == 0 ? "0.00" : APIResponse.data[item.key].value1
    //             }

    //             if (APIResponse.data[item.key].value2 != undefined) {
    //                 ValidateMonthlyInputState[item.key + "_value2"] = APIResponse.data[item.key].value2.length == 0 ? "0" : APIResponse.data[item.key].value2
    //             }






    //         })

    //     }
    console.log("ValidateMonthlyInputState", JSON.stringify(ValidateMonthlyInputState))
    this.setState({ ValidateMonthlyInputState: ValidateMonthlyInputState, ValidateMonthlyInputStateLoader: true })

    //}

  }


  async ServicerDataAddNewReportMethod(data, DealType) {
    const ConstServicerDataAddNewReport1 = await ServicerData(data, DealType);
    if (ConstServicerDataAddNewReport1 != null) {
      console.log("ServicerData", ConstServicerDataAddNewReport1.data);
      this.setState({ form_loader: false })
      if (ConstServicerDataAddNewReport1.data.success == true) {
        console.log("Servicer Data DONE")
        const message = "Data saved successfully";
        this.props.enqueueSnackbar(message, {
          variant: 'info',
          autoHideDuration: 3000,
        });
        if (this.state.DealType == "Bawag") {
          this.props.history.push("/report/" + this.state.DealType + "/generate-investor-report/" + this.state.fields.dealId + "/" + this.state.fields.month + "/" + this.state.fields.year);
        }
        else {
          this.props.history.push("/report/" + this.state.DealType + "/view-servicer-mongodb-data/" + this.state.fields.dealId + "/" + this.state.fields.month + "/" + this.state.fields.year);

        }
      } else if (ConstServicerDataAddNewReport1.data.success == false) {
        const message = "Data Already Exists";
        this.props.enqueueSnackbar(message, {
          variant: 'error',
          autoHideDuration: 3000,
        });
      }
      else {
        const message = "Data not saved successfully";
        this.props.enqueueSnackbar(message, {
          variant: 'error',
          autoHideDuration: 3000,
        });
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
                  <h3 className="title-page" style={{border:"none"}}>{!this.state.pageTitle ? '' : this.state.pageTitle}         <Button style={{float:"right"}}onClick={this.hideshow} variant='contained' color='primary' type='submit'>
                  <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
                               
    </Button></h3>
                </div>


                <div className="col-md-12">
                {this.state.hideshow==false?
                  this.state.loading == false ? <Loader msg={"Loading Modules..."} /> :
                    <React.Fragment>
                      <div className="fourColunm">
                        <div className="rjsf">
                          <div className="row mb-3">
                            <div className="col-md-4">
                              <Select
                                variant="outlined"
                                size="medium"
                                name="dealId"
                                labelId="demo-controlled-open-select-label"
                                id="demo-simple-select-helper"
                                value={this.state.fields.dealId}
                                onChange={this.handleChange}
                              >
                                {this.state.deal_name.map((item) => {
                                  return (
                                    <MenuItem value={item.deal_id}> {item.deal_id} </MenuItem>
                                  );
                                })
                                }
                              </Select>

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
                              >
                                {this.state.years.map((option) => (
                                  <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                  </MenuItem>
                                ))}
                              </TextField>

                            </div>
                          </div>

                          <div className="row text-left">
                            <div className="col-md-4">
                              <div id="browseexcel">
                                <form.Group controlId="formGrid">
                                  <form.Label>Browse Excel Sheet:</form.Label>
                                  <form.Control type="file"
                                    onChange={this.handleDoc}
                                    placeholder="" />
                                </form.Group>
                              </div>
                            </div>

                          </div>


                          <div className='row justify-content-center'>
                            <Button onClick={this.onSubmit} variant='contained' color='primary' type='submit'>
                              Standardize Data {this.state.form_loader === true ? (
                                <CircularProgress size='25px' color='primary' />
                              ) : (
                                  ''
                                )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
               
                 :
              ''
                            }
                </div>


              </div>

              {console.log("+++",JSON.stringify(this.state.leftresult))}

              {this.state.standard_box==true? 
 <MapComp
 leftresult={this.state.leftresult}
 rightresult={this.state.rightresult}
 standard_box={this.state.standard_box}
 dealId={this.state.fields.dealId}
 month={this.state.fields.month}
 year={this.state.fields.year}
 peers={this.state.peers}
 token={this.state.token}
 DealType={this.state.DealType}
 A={this.state.A}
></MapComp> 
 :''} 
{/* 
              <div className="row">
                <div className="col-md-12">
                  <div class="twocolform">
                    <table className="table table-bordered text-left" id="ValidationTableMapping">
                      <tbody>
                       
                        <React.Fragment>
                        {this.state.leftresult.map((item) => {
                                  return (
                          <tr>


                            <td>
                              <div className="droppableWrapper">
                        
                                    <div className="draggableItem2">
                                      <input type="text" disabled value={item} className="Form-control" onChange={this.handleChange} />
                                    </div>
                                 
                               
                              </div>
                            </td>


 <td>
                              <div className="wip droppableWrapper"
                                onDragOver={(e) => this.onDragOver(e)}
                                onDrop={(e) => { this.onDrop(e, "wip") }}>
                          {tasks.wip}
                              </div>
                              </td>

                            <td>
                              <div className="droppable droppableWrapper"
                                onDragOver={(e) => this.onDragOver(e)}
                                onDrop={(e) => this.onDrop(e, "complete")}>
                                {tasks.complete}
                              </div>

                            </td> 

                          </tr>
                  
             
                        );
                      }
                      )}
                                 </React.Fragment>
                       
                      </tbody>
                    </table>
                 
                      <Button variant='contained' color='primary' onClick={this.SaveMapping} type='submit'>
                   
                        Save Mapping </Button>
               
                  </div>
                </div>
              </div> */}
              {/* : ''
                            } */}
            </div>
          </div>
        </div>







      </React.Fragment>
    );
  }
}

export default withSnackbar(addNewReport);
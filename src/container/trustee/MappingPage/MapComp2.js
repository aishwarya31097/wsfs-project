import React, { Component } from "react";
import { array } from "prop-types";
import Autocompete from "./Autocompete";
import AutocompeteDrawer from "./AutocompeteDrawer";
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import $ from 'jquery';
import { SaveCustomizeReportAPI, savemapping,UploadToggle,restrictdefn } from "../../../servies/services";
import { withSnackbar } from 'notistack';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { Form as form } from 'react-bootstrap';
// import Drawer from '@material-ui/core/Drawer';
// import { Drawer } from 'rsuite';
// import 'rsuite/dist/styles/rsuite-default.css';
import DoneIcon from '@material-ui/icons/Done';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import Box from '@material-ui/core/Box';
import { widgets, CustomFieldTemplate, customStyles, customStylesauto } from '../../../components/customscripts/customscript';
import ReactModal from 'react-modal';
import AddStandardFields from './AddStandardFields'
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Drawer from '@material-ui/core/Drawer';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Tooltip from '@material-ui/core/Tooltip';
const Mainarr=["loanid0","borrower_dscr0","xxxx","yyyyyyyyyyyy","loanid1","borrower_dscr1","xxxx","yyyyyyyyyyyy","loanid2","borrower_dscr2","xxxx","yyyyyyyyyyyy","loanid3","borrower_dscr3","xxxx","yyyyyyyyyyyy"]
export class Mapcomp2 extends Component {
    static propTypes = {
        suggestions: array
    };
    static defaultProperty = {
        suggestions: []
    };
    constructor(props) {
        super(props);
        this.state = {
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: "",
            fields:{},
            saveloader:false,
            desc:null,
            togglevat: false,
            token: localStorage.getItem("token"),
            peers: JSON.parse(localStorage.getItem('peers')),
            uploadsaveloader:false,
            ChannelName: localStorage.getItem("ChannelName"),
            show: false,
            AddstdShow:false,
            Mainarr:this.props.stdfields,
            Mainarr2:this.props.stdfields,
            tableData:props.A

        };
        this.close = this.close.bind(this);
        this.toggleDrawer = this.toggleDrawer.bind(this);
    }

    onOpenModal1 = () => {
        console.log("inside modal1");
        this.setState({ open1: true });
      };
    
      onCloseModal1 = () => {
        // this.pond.removeFiles();
        this.setState({ open1: false });
      };

      handlematch = ()=>{
        let unmatcheddata = []
        let alias = this.state.tableData
    
        console.log("tabledata",alias)
    
        $('#unmatchedtable tbody tr').each(function(index,tr){
    
            // console.log("Index : ",index)
            // console.log("data: ",$(tr).find('td:eq(0)').text())
            // console.log("data2: ",$(tr).find('td:eq(1)').find('input').val())
    
            if($(tr).find('td:eq(1)').find('input').val() != "" ){
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



    close() {
        this.setState({
          show: false
        });
      }
      toggleDrawer(placement) {
        this.setState({
          placement,
          show: true
        });
      }
    handleChange = (e) => {
        // togglevat
        if (this.state.togglevat == false) {
          this.setState({ togglevat: true })
    
        }
        else {
          this.setState({ togglevat: false })
    
        }
      }

      handleDoc = (e) => {

        console.log("{JSON.stringify(e.target.files[0])}", JSON.stringify(e.target.files[0]))
        this.setState({ file: e.target.files[0] });

    }
     onchange = (data, type) => {
        
        console.log("Form>", data, "++++"+ type);
        this.setState({desc:data})
    }

    onClick = e => {
        console.log("e",JSON.stringify(e.currentTarget))
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: e.currentTarget.innerText
        });
    };
    onKeyDown = e => {
        const { activeSuggestion, filteredSuggestions } = this.state;

        if (e.keyCode === 13) {
            this.setState({
                activeSuggestion: 0,
                showSuggestions: false,
                userInput: filteredSuggestions[activeSuggestion]
            });
        } else if (e.keyCode === 38) {
            if (activeSuggestion === 0) {
                return;
            }

            this.setState({ activeSuggestion: activeSuggestion - 1 });
        } else if (e.keyCode === 40) {
            if (activeSuggestion - 1 === filteredSuggestions.length) {
                return;
            }

            this.setState({ activeSuggestion: activeSuggestion + 1 });
        }
    };




    async UploadToggle() {

        let channelname = this.props.channelname;
        const DealType = this.props.DealType;
        let dealId=this.props.dealId;
        let assetclass=this.props.assetclass;
        let year =this.props.year
        //Restrict api
        this.setState({ report_loader: true })
        let restrictresult = "";
        const APIResponse = await restrictdefn(DealType, dealId, assetclass, channelname)
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

                    this.UploadToggle2(DealType, dealId, assetclass, channelname, restrictresult)


                } else if (APIResponse.data.success == 0) {
                    restrictresult = "0";
                    const message = "Data not saved successfully";
                this.setState({uploadsaveloader:false})
                this.props.enqueueSnackbar(message, {
                    variant: 'error',
                    autoHideDuration: 3000,
                });
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
    }





    async UploadToggle2() {
        this.setState({uploadsaveloader:true})
        const DealType = this.props.DealType;
        const newdata = new FormData();
        newdata.append('filename', this.state.file);
     
        newdata.append('peers', this.state.peers)
        newdata.append('peers', this.state.peers)
        newdata.append('dealId', this.props.dealId)
        newdata.append('assetclass', this.props.assetclass)
        // newdata.append('year', this.props.year)
        newdata.append('channelname',this.props.channelname)
        const constUploadServicerReport = await UploadToggle(newdata, DealType);
        if (constUploadServicerReport != null) {
            console.log("UploadServicerReport", constUploadServicerReport.data);
            if (constUploadServicerReport.data.success == true) {
                this.setState({uploadsaveloader:false})
                const message = "Data saved successfully";
                this.props.enqueueSnackbar(message, {
                    variant: 'info',
                    autoHideDuration: 3000,
                });              
            } else {
                const message = "Data not saved successfully";
                this.setState({uploadsaveloader:false})
                this.props.enqueueSnackbar(message, {
                    variant: 'error',
                    autoHideDuration: 3000,
                });
            }
        }
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
        data.dealId = this.props.dealId;
        data.assetclass = this.props.assetclass;
        data.year = this.props.year;
        data.month=this.props.month;
        data.channelname=this.props.channelname;

        data.data = leftValues;
        console.log("DATAAAAAA" + JSON.stringify(data))
        if (window.confirm("Are you sure you want to proceed?")) {
    
    
            const APIResponse = await savemapping(this.props.DealType, data);
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




    AddstdShow=()=>{
        console.log("HEEEEELOOOO")
        this.setState({AddstdShow:true })
    }

    OpenClose=(data)=>{
        console.log("OpenClose", data);
        this.setState({AddstdShow:false })
    }
    showcolumn=()=>{
        console.log("YESYES")
       this.props.showcolumn(this.props.DealType, this.props.dealId, this.props.assetclass, this.props.filetype, this.props.filename, this.props.month, this.props.year)
    }
    handleInputChange = (event) => {

        const query = event.currentTarget.value;
        // const { projects, filterProject, onUpdateProjects } = this.props;
    console.log("query",query)
    if(query==""){
this.setState({Mainarr:this.state.Mainarr2})
    }else{
        const filteredProjects = this.state.Mainarr.filter(
            suggestion => suggestion.toLowerCase().includes(query.toLowerCase())
          );
        // onUpdateProjects(filteredProjects);
        this.setState({Mainarr:filteredProjects})
    }
      };

      Edit = async (index) => {
        this.setState({ actionType: 'edit',currentIndex: index});
    }
    Cancel = async () => {
        this.setState({ actionType: 'add' });
    }
    async componentDidMount() {
        // console.log("GroupByLima", this.state.groupby)
        // console.log("componentDidMount DealId", this.props.match.params.DealId, this.props.match.params.DealMonth, this.props.match.params.DealYear);
        // const DealId = this.props.match.params.DealId;
        // const DealMonth = this.props.match.params.DealMonth;
        // const DealYear = this.props.match.params.DealYear;
        // // this.callMethod(DealId, DealMonth, DealYear);

        let   ArrayLeft=[];
        let  ArrayRight=[]
         Object.entries(this.state.tableData).map(([columnId, column], index) => {
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

//     async componentDidUpdate(nextProps) {
//         console.log("nextProps", nextProps)
//      let   ArrayLeft=[];
//        let  ArrayRight=[]
//         Object.entries(this.state.tableData).map(([columnId, column], index) => {
//             if(column.value == ""){
// ArrayLeft.push(column);
//             }
//             else{
//                 ArrayRight.push(column)
//             }


//         }
//         )
//        this.setState({ ArrayLeft:ArrayLeft.length, ArrayRight:ArrayRight.length})
     

//         // this.callMethod(DealId, DealMonth, DealYear);
//     }

    matchedRows() {
        console.log("matchedrowsss",this.state.tableData)
        return Object.entries(this.state.tableData).map(([columnId, column], index) => (
          <React.Fragment>
          {column.value == "" || column.key== "" ?'':
          <React.Fragment>
              <tr>
                  <td style={{ "white-space": "pre-wrap" }}>
                    {column.key}
                  </td>
                  <td style={{ "white-space": "pre-wrap" }}>
                  {this.state.actionType == "edit" && this.state.currentIndex == index ?
                      <Autocompete
                          suggestions={this.props.stdfields}
                          description={column.descp}
                          default={column.value}
                          divname="middiv"
                          onchange={(data, type) => { this.onchange(data, type) }}
                          disabled ="false"
                      />
                  :
                      <Autocompete
                          suggestions={this.props.stdfields}
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
          {column.value == ""&& column.key != ""?
        <React.Fragment>
            <tr>
                <td style={{ "white-space": "pre-wrap" }}>{column.key}</td>
                <td style={{ "white-space": "pre-wrap" }}>
                    <Autocompete
                        suggestions={this.props.stdfields}
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
        const {
            onChange,
            onClick,
            onKeyDown,
            state: {
                activeSuggestion,
                filteredSuggestions,
                showSuggestions,
                userInput
            }
        } = this;
        let suggestionsListComponent;
        if (showSuggestions && userInput) {
            if (filteredSuggestions.length) {
                suggestionsListComponent = (
                    <ul class="suggestions">
                        {filteredSuggestions.map((suggestion, index) => {
                            let className;

                            if (index === activeSuggestion) {
                                className = "";
                            }

                            return (
                                <li key={suggestion} onClick={onClick}>
                                    {suggestion}
                                </li>
                            );
                        })}
                    </ul>
                );
            } else {
                suggestionsListComponent = (
                    <div class="no-suggestions">
                        <em>No suggestions</em>
                    </div>
                );
            }






        }


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
            //   <React.Fragment>
            //     {/* <input
            //       type="search"
            //       onChange={onChange}
            //       onKeyDown={onKeyDown}
            //       value={userInput}
            //     />
            //     {suggestionsListComponent} */}

            //   </React.Fragment>
         
            <React.Fragment>
                {/* {standardbox == true ? */}
            <React.Fragment>
       


        
<React.Fragment>

<div className="row" >
                                                      
                                                          <div  style={{fontSize:"14px", fontWeight:"bold",marginLeft:"5px"}}>Showing Results for : {this.props.dealId}, {this.props.month}, {this.props.year} </div>
                                                   </div>

                                                 

                      <div className="row people">
                        <div className="col-md-2">
                        <Tooltip title={'Click to upload predefined mapping excel sheet'} placement="center">

                            <Button variant="contained" color="primary" type="submit" onClick={this.onOpenModal1.bind(this)}> UPLOAD </Button>
                            </Tooltip>
                        </div>
                        <div className="col-md-4">
                            <div className="row">
                                <div className="col-md-4">
                                    <label className="form-check-label text-secondary" for="autoSizingCheck">Last Data Update</label>
                                </div>
                                <div className="col-md-6">
                                    <input type="text" className="form-control mb-2 people DateInp" id="inlineFormInput" disabled value="07/14/2021: 03:14:07" />
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-md-4">
                            <div className="row">
                                <div className="col-md-5">
                                    <label className="form-check-label text-secondary" for="autoSizingCheck">Last Mapping Update</label>
                                </div>
                                <div className="col-md-6">
                                    <input type="text" className="form-control mb-2 people DateInp" id="inlineFormInput" disabled placeholder="07/14/2021: 03:14:07" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2" >
                        <Tooltip title={'Click to save the standardized mapping'} placement="center">

                            <Button variant="contained" color='primary'
                                onClick={() => this.SaveCustomizeReport()} > Save Mapping
        
                                {this.state.saveloader == true ? (
                                    <CircularProgress size='25px' color='primary' />
                                    ) : (
                                    ''
                                )}
                            </Button>
                            </Tooltip>
                        </div>
                      </div>
                     
 </React.Fragment>

<div id="mapCamp">

<div className="row">
<div className="col-md-5 col-sm-12">
    <div className="card">
        <div className="row splittablehead">
            <div className="col-md-4 HeadCount">
                <p className="font-weight-bold">Unmatched Fields ({this.state.ArrayLeft})</p>
            </div>
            <div className="col-md-4">
                <Button variant="outlined" color="primary"   onClick={this.AddstdShow}>+ Custom Field</Button>
            </div>
             
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
    <Button variant='outlined' color='primary' type="submit" onClick={this.handlematch}>Match ></Button>
</div>

<div className="col-md-6 col-sm-12">
    <div className="card">
        <div className="row splittablehead">
            <div className="col-md-3 HeadCount">
                <p className="font-weight-bold">Matched Fields ({this.state.ArrayRight})</p>
            </div>
            <div className="col-md-5"></div>
            <div className="col-md-3 tablesearch">
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





                   
                    {/* 
					<div className="row" id="complexMap">	
					<div>
						<p>Complex Mapping:</p>
					</div>
						<div className="col-md-1">				
							<Button onClick={() => InputAdd()}
							variant='contained' color='primary' type='submit'>
							+
                            </Button>
</div>

{inputshow==true?
	<React.Fragment>	
<div className="col-md-8">	
	
	<React.Fragment>	
			<div className="row">	
			<div className="col-md-4">	
	<input className="Form-control line" type="text" onChange={handleChange} ></input>
	</div>
	<div className="col-md-4">	

							<input className="Form-control line" type="text" onChange={handleChange2} ></input>
							</div>
							</div>
							</React.Fragment>
						
					


					</div>
					<div className="col-md-1">				
							<Button onClick={() => InputAddMain()}
							variant='contained' color='primary' type='submit'>
							Add
                            </Button>
</div>
</React.Fragment>
	:''}

                            </div> */}
                            

                            {/* <Drawer
          size='xs'
          placement='right'
          show={this.state.show}
          onHide={this.close}
        >
          <Drawer.Header>
            <Drawer.Title>Master Loan Tape Fields</Drawer.Title>
           
       
          </Drawer.Header>
          <Drawer.Body>
            <div className="SearchSTD">
            <TextField
                                                                        variant="filled"
                                                                        
                                                                        onChange={this.handleInputChange}
                                                                        InputProps={{
                                                                            startAdornment: (
                                                                              <InputAdornment position="start">
                                                                                <SearchIcon color="action" />
                                                                              </InputAdornment>
                                                                            ),
                                                                          }}
                                                                    >
                                                                       
                                                                    </TextField>
      
          </div>


         {this.state.Mainarr.map((item, index) => (
            <p className="parahStdFields">{item}</p>
         ))}
          </Drawer.Body>
          <Drawer.Footer>
          <Button onClick={this.close} variant='outlined' color='primary'>
              Cancel
            </Button>
          </Drawer.Footer>
        </Drawer>
                             */}
{/* 
        <div className={this.state.show==true? "popup_overlay" :''} onClick={this.close}></div>
                <Drawer
                    className="drawer_popup"
                    variant="persistent"
                    anchor="right"
                    open={this.state.show}
                >
                    <Button color="primary" className="close_icon" variant="outlined" onClick={this.close}> <CloseIcon></CloseIcon> </Button>
                    <h1> Master Loan Tape Fields  </h1>

                    <div className="SearchSTD">
            <TextField
                                                                   
                                                                        variant="filled"
                                                                        
                                                                        onChange={this.handleInputChange}
                                                                        InputProps={{
                                                                            startAdornment: (
                                                                              <InputAdornment position="start">
                                                                                <SearchIcon color="action" />
                                                                              </InputAdornment>
                                                                            ),
                                                                          }}
                                                                    >
                                                                       
                                                                    </TextField>
      
          </div>


         {this.state.Mainarr.map((item, index) => (
            <p className="parahStdFields">{item}</p>
         ))}
                 
                </Drawer>






 */}














                </React.Fragment>
{this.state.AddstdShow == true ?
    
    <React.Fragment>                           
        {/* {JSON.stringify(this.state.formData,this.state.DealType,this.state.AddStdBtn)}              */}
    {/* {this.state.restrict == true ? ''  : */}
                                            <AddStandardFields
                                                // StandardForm={this.state.formData}
                                                dealId={this.props.dealId}
                                                assetclass={this.props.assetclass}
                                                showcolumn={this.showcolumn}
                                                DealType={this.props.DealType}
                                                AddStdBtn={this.state.AddStdBtn}
                                                AddstdShow={this.state.AddstdShow}
                                                year = {this.props.year}
                                                month={this.props.month}
                                                OpenClose={this.OpenClose}
                                            ></AddStandardFields>
                                            {/* } */}
                                            {/* <Button variant="outlined" color="primary" onClick={this.export_excel}> <DescriptionIcon></DescriptionIcon> Export Excel</Button> */}
                                     </React.Fragment>
                                 :''}  
          <div id="modal">
                <ReactModal
                    isOpen={this.state.open1}
                    onRequestClose={this.onCloseModal1}
                    // contentLabel="Minimal Modal Example"
                    style={customStylesauto}
                >
                <React.Fragment>
                   
                    <div className="shifting">
                        <h5 className="text-secondary"> Upload Mapped Excel </h5>
                        <div className="row ">
                            <div className="col text-center">
                                <Box className="dashed">
                                    <SaveAltIcon className="upper"></SaveAltIcon>
                            
                                    <div className="col-md-12">
                                        <div id="browseexcel">
                                            <form.Group controlId="formGrid">
                                                <form.Label
                                                style={{color: '#28a745' , fontWeight: '700'}}
                                                
                                                >Browse Excel Sheet:</form.Label>
                                                <form.Control type="file"
                                                    onChange={this.handleDoc}
                                                    placeholder=""
                                                    style={{marginLeft:"200px"}} />
                                            </form.Group>

                                            {/* <Button variant='outlined' color='primary'
                                                    onClick={() => this.UploadToggle()}
                                            > Upload
            
                                                {this.state.uploadsaveloader == true ? (
                                                    <CircularProgress size='25px' color='primary' />
                                                        ) : (
                                                            ''
                                                )}

                                            </Button> */}
                                        </div>
                                    </div>
                                                            
                                </Box>
                            </div>
                        </div>
                    </div>

                    <div className="row topping">

                        <div className="spacing">
                            <Button variant="outlined" id="optionalbutton" onClick={this.onCloseModal1} > Cancel  </Button>
                        </div>
                        <Button variant="contained" color="primary" type="submit"   onClick={() => this.UploadToggle2()} >Upload 
                          {this.state.uploadsaveloader === true ? (
                              <CircularProgress size='25px' color='primary' />
                              ) : (
                              ''
                          )}
                        </Button>
                    </div>
                </React.Fragment>
                </ReactModal>
            </div>







            </React.Fragment>
        );
    }
}

export default withSnackbar(Mapcomp2);

import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from 'uuid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import EventNoteOutlinedIcon from '@material-ui/icons/EventNoteOutlined';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import $ from 'jquery';
import { withSnackbar } from 'notistack';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

// import SendReport from './SendReport';
import { SaveCustomizeReportAPI, savemapping } from "../../../servies/services";
import { useSnackbar } from 'notistack';

import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from "react-router";
import AccountStatementsTableSingle from '../../../components/AccountStatementsTableSingle';
import { setState } from "react-jsonschema-form/lib/utils";


const defaultText = "Select the page and drag and drop widgets here to create your report!";

const itemsFromBackend = [
	{
		"id": "4f67d3fe-2e7a-47fd-819d-67c6e4ed1bf8",
		"content": "Date",
		"descp": "datedesc"

	},
	{
		"id": "c04cfdcb-7f73-447f-833b-9638b506f8c4",
		"content": "Payment_Summary",
		"descp": "paymentsum"
	}, {
		"id": "318ffde4-b5e5-473c-8afc-dd64e4093bcd",
		"content": "Principal_Payments",
		"descp": "paymentsum"
	}

];


const itemsFromBackendLeft = [{
	"id": "4f67d3fe-2e7a-47fd-819d-67c6e4ed1bf8",
	"content": "Date",

}, {
	"id": "c04cfdcb-7f73-447f-833b-9638b506f8c4",
	"content": "Payment_Summary",

}, {
	"id": "318ffde4-b5e5-473c-8afc-dd64e4093bcd",
	"content": "Principal_Payments",

}, {
	"id": "04583a6b-30fd-4366-82d2-59bfd37a716d",
	"content": "Interest_Payments",

}, {
	"id": "42047d37-3687-4335-812e-1acb1829965e",
	"content": "ClassFactors",

}, {
	"id": "f318a622-2bfb-4054-9d6c-dee53e2434ed",
	"content": "AccountStatements",

}, {
	"id": "3265a9dd-81d6-48a5-add6-9ec8de918f7d",
	"content": "CollateralSummary",

}, {
	"id": "ef217918-cd6d-44fb-a6da-42befff7ff07",
	"content": "AcquisitionCriteria",

}, {
	"id": "37bd8ffc-638b-490f-8e72-94e92c0ef02e",
	"content": "PrePaymentsAndDefaultRates",

}, {
	"id": "2da75c10-b1dc-4f82-a7f1-c7cdf0993360",
	"content": "AcquisitionCriteria",

}];
const currentItemShow = null


const onDragEnd = (result, columns, setColumns) => {
	if (!result.destination) return;
	const { source, destination } = result;

	if (source.droppableId !== destination.droppableId) {
		const sourceColumn = columns[source.droppableId];
		const destColumn = columns[destination.droppableId];
		const sourceItems = [...sourceColumn.items];
		const destItems = [...destColumn.items];
		const [removed] = sourceItems.splice(source.index, 1);
		destItems.splice(destination.index, 0, removed);
		setColumns({
			...columns,
			[source.droppableId]: {
				...sourceColumn,
				items: sourceItems
			},
			[destination.droppableId]: {
				...destColumn,
				items: destItems
			}
		});
	} else {
		const column = columns[source.droppableId];
		const copiedItems = [...column.items];
		const [removed] = copiedItems.splice(source.index, 1);
		copiedItems.splice(destination.index, 0, removed);
		setColumns({
			...columns,
			[source.droppableId]: {
				...column,
				items: copiedItems
			}
		});
	}
};


function increaseCount(data, columns, setColumns) {
	let newdata = data + 1
	console.log("Data", Object.keys(columns).length)
	let count = Object.keys(columns).length

	setColumns({
		...columns,
		[uuidv4()]: {
			name: "Page " + count,
			class: "dynamic_table",
			id: "page_layout_" + count,
			sid: uuidv4(),
			items: [],
			show: "false"
		}
	})
}




async function SaveCustomizeReportSkip(columns, dealname, month, year, peers, token, DealType, enqueueSnackbar, setSaveloader, saveloader, history) {

	console.log("columns, setColumns", columns, dealname, month, year, peers, token, DealType)
	history.push("/report/" + DealType + "/view-loan-data-tape/monthly-trustee-report/" + dealname + "/" + month + "/" + year);

}

async function SaveCustomizeReport(columns, dealname, month, year, peers, token, DealType, enqueueSnackbar, setSaveloader, saveloader, history) {

	let duplicate=true;
	console.log("columns, setColumns", columns, dealname, month, year, peers, token, DealType)

	// dynamic_table

	var leftValues = []
	$('#mapCamp .align-left.Exclud .firstdiv').each(function (index, div) {
		console.log("row tr", div);
		leftValues[index] = {
			['Key' + index]: $(div).find("input").val(),
		};
	});
	console.log("leftValues" + JSON.stringify(leftValues))

	var rightValues = []
	$('#mapCamp .centrecolumn .dynamic_table').each(function (index, div) {
		console.log("div.length", div)
		console.log("div.length", div.length)
		let colength = $(div).find(".seconddiv").length
		if(colength>=2 ){
			duplicate=false
		}
		console.log("collenght"+colength)
		rightValues[index] = {
			['Key' + index]: $(div).find(".seconddiv").text(),
		};
	});
	console.log("rightValues" + JSON.stringify(rightValues))

	let finalJson = []

	$(leftValues).each(function (index, item) {
		// console.log("leftValues finalJson", JSON.stringify(index) +"ASdasdsd" +JSON.stringify(item));
		console.log("leftValues finalJson", item['Key' + index])
		console.log("rightValues 1", rightValues[index])
		console.log("rightValues 2", rightValues[index]['Key' + index])
		finalJson.push({
			['Key ' + index]: item['Key' + index],
			['Value ' + index]: rightValues[index]['Key' + index]
		})



	});
	console.log("FINALJSON", finalJson)
if(duplicate==false){
	alert("multiple data in single row")
}
else{
	var data = {};

	data.peers = peers;
	data.dealId = dealname;
	data.month = month;
	data.year = year;
	data.data = finalJson;
	console.log("DATAAAAAA" + JSON.stringify(data))
	if (window.confirm("Are you sure you want to proceed?")) {


		const APIResponse = await savemapping(DealType, data);
		if (APIResponse != null) {
			if (APIResponse.status == 204) {
				const message = "Missing Parameter or No content";
				enqueueSnackbar(message, {
					variant: 'error',
					autoHideDuration: 4000,
				});
			}
			else if (APIResponse.status !== 200) {
				const message = "Something went wrong, please try again";
				enqueueSnackbar(message, {
					variant: 'error',
					autoHideDuration: 5000,
				});
			}
			else {
				console.log("APIResponse.data.Success", APIResponse.data);
				if (APIResponse.data.success == true) {
					// this.setState({ formLoader: false, IsOpen: false })
					history.push("/report/" + DealType + "/add-new/" + dealname + "/" + month + "/" + year);

					const message = "Data saved successfully";
					enqueueSnackbar(message, {
						variant: 'info',
						autoHideDuration: 3000,
					});
				} else {
					const message = "Data not saved successfully";
					enqueueSnackbar(message, {
						variant: 'error',
						autoHideDuration: 3000,
					});
				}
			}
		}
	}
}
	// [{key:"",value:""}]




}

// function SaveCustomizeReport(columns, dealname, month,year,peers,token){

//   console.log("columns, setColumns",columns, dealname, month,year,peers,token)
// }


function showHidePage(data, columnId, columns, setColumns, setItemshow) {
	console.log("columnId", columnId)
	
	setItemshow(columnId)


}


function showPopup(popup, setPopup) {
	console.log("showPopup", popup)
	setPopup(true)
}

function callbackFunction(childData, setPopup) {
	// this.setState({message: childData})
	console.log("callbackFunction", childData)
	setPopup(false)
}





function DragNDrop(props) {
	console.log("props.customize_data", props)
	console.log("props.customize_data", props.customize_data)

	let columnsFromBackend = {};
	let customization_type = "New"
	if (customization_type == "New") {

		// alert(itemsFromBackend.length)

		columnsFromBackend = {
			[uuidv4()]: {
				name: "Requested",
				class: "static_table ",
				id: "requested_table",
				sid: uuidv4(),
				items: props.rightresult,
				show: "true"
			}
		};

		for (var i = 0; i < props.leftresult.length; i++) {
			columnsFromBackend[uuidv4()] =
				{
					name: "Page " + i,
					class: "dynamic_table ",
					id: "page_layout_" + i,
					sid: uuidv4(),
					items: [],
					show: "false"
				}
console.log("columnsFromBackend",columnsFromBackend)
		}


	} else {
		columnsFromBackend = itemsFromBackend

	}


	const [columns, setColumns] = useState(columnsFromBackend);
	const [itemshow, setItemshow] = useState(currentItemShow);
	const [visualize, setVisualize] = React.useState({ checkedB: true });
	const [popup, setPopup] = React.useState(false);
	const [dealname, setDealname] = useState(props.dealId);
	const [month, setMonth] = useState(props.month);
	const [year, setYear] = useState(props.year);
	const [peers, setPeers] = useState(props.peers);
	const [token, setToken] = useState(props.token);
	const [DealType, setDealType] = useState(props.DealType);
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const [saveloader, setSaveloader] = useState(false);
	const [inputshow, setInputshow] = useState(false);
	// setSaveloader(true);
	const history = useHistory();

	const [leftResult, setLeftResult] = useState(props.leftresult);
	const [standardbox, setStandardbox] = useState(props.standard_box);
	const [rightResult, setrightResult] = useState(props.rightresult);
	const [textInputleft, setTextInputleft] = React.useState('');
	const [textInputright, setTextInputright] = React.useState('');


  
	const handleChange = (event) => {
	  setTextInputleft(event.target.value);
	}
	const handleChange2 = (event) => {
		setTextInputright(event.target.value);
	  }
	// console.log("Comp leftResult", leftResult)
	console.log("Comp rightResult", rightResult)

	

	
	const InputAdd=() =>{
setInputshow(!inputshow)
console.log("inputshow",inputshow)
	

	}
	const InputAddMain=() =>{
		console.log("textInputleft",textInputleft);
		// props.send(textInputleft);
		console.log("textInputright",textInputright);
		// props.send(textInputright);
				setLeftResult([...leftResult, {"id": uuidv4(), "content":textInputleft }])
				
				console.log("leftResult leftResult", leftResult)
		
				setColumns({
					...columns,
					[uuidv4()]: {
						name: "Page " + columns.length,
						class: "dynamic_table",
						id: "page_layout_" + columns.length,
						sid: uuidv4(),
						items: [{"id": uuidv4(), "content":textInputright }],
						show: "false"
					}
				})
		
			}


	return (
		<React.Fragment>
			{standardbox == true ?
				<React.Fragment>
					<div className="customize_top">



						<div className="float-left">

							{/* {props.customization_type == "New" ? '' :
						<div class="alert alert-danger" role="alert">Report Customization available for this deal, month and year. you can update the same.</div>
					} */}




						</div>


						<div className="float-right">


							<Button variant='outlined' color='primary'
								onClick={() => SaveCustomizeReport(columns, dealname, month, year, peers, token, DealType, enqueueSnackbar, saveloader, setSaveloader, history)}

							> Save & Next
			
					{saveloader == true ? (
									<CircularProgress size='25px' color='primary' />
								) : (
										''
									)}

							</Button>

		





						</div>
						<div className="clearfix"></div>
					</div>

					<div id="mapCamp">
						<div className="leftcolumn align-left Exclud">
							{/* {JSON.stringify(leftResult)} */}
							{Object.entries(leftResult).map(([columnId, column], index) => {
								return (
									<div id={column.id} key={columnId} className="firstdiv" >
										{/* <p className="line"> {column.content} </p> */}
										<input className="Form-control line" type="text" disabled defaultValue={column.content}></input>
									</div>
								);
							})}

						</div>



						<div className="centrecolumn">
							<DragDropContext
								onDragEnd={result => onDragEnd(result, columns, setColumns)}
							>

								{Object.entries(columns).map(([columnId, column], index) => {
									return (
										<div
											id={column.id}
											key={columnId}
											className={column.class}

										>

											<React.Fragment>

												<Droppable droppableId={columnId} key={columnId}>
													{(provided, snapshot) => {
														return (
															<React.Fragment>
																<div
																	{...provided.droppableProps}
																	ref={provided.innerRef}
																	style={{
																		width: "100%"
																	}}
																>
																	{column.items.map((item, index) => {
																		return (
																			<Draggable
																				key={item.id}
																				draggableId={item.id}
																				index={index}
																			>
																				{(provided, snapshot) => {
																					return (

																						<Tooltip title={item.descp} placement="left">
																							<div
																								ref={provided.innerRef}
																								{...provided.draggableProps}
																								{...provided.dragHandleProps}
																								className="line seconddiv "
																							// style={{
																							// 	userSelect: "none",
																							// 	padding: 16,
																							// 	margin: "0 0 8px 0",
																							// 	minHeight: "50px",
																							// 	backgroundColor: snapshot.isDragging
																							// 		? "#263B4A"
																							// 		: "#456C86",
																							// 	color: "white",
																							// 	...provided.draggableProps.style
																							// }}
																							>

																								{/* <input type="text" className="Form-control line"defaultValue= */}
																								{item.content.replace(/([a-z])([A-Z])/g, '$1 $2')}
																								{/* ></input> */}

																							</div>

																						</Tooltip>
																					);
																				}}
																			</Draggable>
																		);
																	})}

																	{provided.placeholder}

																</div>


															</React.Fragment>
														);
													}}
												</Droppable>

											</React.Fragment>


										</div>
									);
								})}
							</DragDropContext>

						</div>
						<div className="clearfix"></div>


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
				</React.Fragment>


				: ''}

		</React.Fragment>
	);
}

export default withSnackbar(DragNDrop);

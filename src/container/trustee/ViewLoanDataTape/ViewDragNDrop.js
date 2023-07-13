import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from 'uuid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import EventNoteOutlinedIcon from '@material-ui/icons/EventNoteOutlined';
import IconButton from '@material-ui/core/IconButton';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import Table from '../../../components/Table';
import DealEventTable from '../../../components/DealEventTable';
import AcquisitionCriteriaTable from '../../../components/AcquisitionCriteriaTable';
import AccountStatementsTable from '../../../components/AccountStatementsTable';
import AccountStatementsTableSaludaPac from '../../../components/AccountStatementsTableSaludaPac';
import AccountStatementsTableSaludaPacNew from '../../../components/AccountStatementsSaludaPACnew';

import AccountStatementsTableSingle from '../../../components/AccountStatementsTableSingle';
import AccountStatementsAlphaflow from '../../../components/AccountStatementsAlphaflow';
import AccountStatementsNPL from '../../../components/AccountStatementsNPL';

import AccountStatementsForBorrowerTrust from '../../../components/AccountStatementsForBorrowerTrust';
import AccountStatementsForSecurityTrust from '../../../components/AccountStatementsForSecurityTrust';

import PrepaymentsAndDefaultRatesTable from '../../../components/PrepaymentsAndDefaultRatesTable'
import PrepaymentsAndDefaultRatesTableFig1 from '../../../components/PrepaymentsAndDefaultRatesTableFig1'
import PrepaymentsOtherDealsTable from '../../../components/PrepaymentsOtherDealsTable';
import PrepaymentsOtherDealsTable10Month from '../../../components/PrepaymentsOtherDealsTable10Month';
import PrepaymentsOtherDealsTableWL1 from '../../../components/PrepaymentsOtherDealsTableWL1';

import PrepaymentsSprucehillTable from '../../../components/PrepaymentsSprucehillTable';
import DealEventAlphaflow from '../../../components/DealEventAlphaflow'
import ConcentrationLimitations from '../../../components/ConcentrationLimits';
import AccountStatementsSprucehill from '../../../components/AccountStatementsSprucehill'
import PriorityOfPaymentsSprucehill from '../../../components/PriorityOfPaymentsSprucehill'



import DetailsTable from '../../../components/DetailsTable'
import Summary from '../../../components/Summary'
import FirstTable from '../../../components/FirstTable';
import IndexTable from '../../../components/IndexTable';
import CreateAdditonalTable from '../../../components/CreateAdditonalTable';

import { SaludaInvestorIndexData } from '../../../servies/services';
import TableChartIcon from '@material-ui/icons/TableChart';
import ReorderIcon from '@material-ui/icons/Reorder';


const defaultText = "Select the page";
const backendcolumns = {
  "54155bdc-297a-4ff4-abeb-75573dafe4bd": {
    "name": "Requested",
    "class": "static_table",
    "id": "requested_table",
    "sid": "7f8cdf3b-9850-478a-9dce-8f1622577537",
    "items": [],
    "show": "true"
  },
  "371ddb52-7a0a-4582-b42f-f4d4c616905f": {
    "name": "Page #1",
    "class": "dynamic_table",
    "id": "page_layout_1",
    "sid": "dd9f2858-60d3-41dd-b305-b16958a38400",
    "items": [{
      "id": "87592795-e067-4032-a3d2-68aac26168b9",
      "content": "Date",
      "data": [{
        "ClosingDate": "6/22/2020",
        "1stPaymentDate": "7/27/2020",
        "OriginalRevolvingPeriodEndDate": "6/25/2021",
        "MaturityDate": "8/25/2051 ",
        "PreviousPaymentDate": "8/27/2020",
        "NextPaymentDate": "9/27/2020",
        "Number of Days in Accrual Period": "30"
      }]
    }],
    "show": "false"
  },
  "bf9cde0d-a184-4dd2-894c-543fe7230369": {
    "name": "Page #2",
    "class": "dynamic_table",
    "id": "page_layout_2",
    "sid": "12037185-d552-49dc-90da-6e42e9e071e3",
    "items": [{
      "id": "19471b2d-df69-4174-92f4-0f7e726cd569",
      "content": "PaymentSummary",
      "data": [{
        "Class": "A Notes",
        "BeginningBalance": "65000000.00",
        "InterestPaid": "286541.67",
        "PrincipalPaid": "0.00",
        "TotalPaid": "286541.67",
        "EndingBalance": "65000000.00"
      }, {
        "Class": "Retained Certificates",
        "BeginningBalance": "35000000.00",
        "InterestPaid": "",
        "PrincipalPaid": "",
        "TotalPaid": "1682800.03",
        "EndingBalance": "35000000.00"
      }, {
        "Class": "Total:",
        "BeginningBalance": "100000000.00",
        "InterestPaid": "286541.67",
        "PrincipalPaid": "0.00",
        "TotalPaid": "1969341.70",
        "EndingBalance": "100000000.00"
      }]
    }],
    "show": "false"
  },
  "ddd5a205-5120-48a4-b2c6-d8f37e8cf274": {
    "name": "Page #3",
    "class": "dynamic_table",
    "id": "page_layout_3",
    "sid": "5297e6e8-88e9-4c70-b1ed-b58f9acc6ac2",
    "items": [{
      "id": "35ca8733-c1d4-4495-81c2-196dda194876",
      "content": "PrincipalPayments",
      "data": [{
        "Class": "A Notes",
        "OriginalBalance": "65000000",
        "BeginningBalance": "65000000.00",
        "PrincipalOwed": "0.00",
        "PrincipalPaid": "0.00",
        "EndingBalance": "65000000.00",
        "EndingFactor": "1.00"
      }, {
        "Class": "Total:",
        "OriginalBalance": "65000000",
        "BeginningBalance": "65000000.00",
        "PrincipalOwed": "0.00",
        "PrincipalPaid": "0.00",
        "EndingBalance": "65000000.00",
        "EndingFactor": ""
      }]
    }],
    "show": "false"
  },
  "3cffaff4-c386-4c1c-a57b-82491daabe2d": {
    "name": "Page #4",
    "class": "dynamic_table",
    "id": "page_layout_4",
    "sid": "a558d6b7-ebe3-447f-8683-f834d39fce60",
    "items": [{
      "id": "66ec6a99-1a2f-45a6-8d62-4ab7d387b56f",
      "content": "InterestPayments",
      "data": [{
        "Class": "A Notes",
        "InterestRate": "5.29",
        "BeginningBalance": "65000000.00",
        "InterestOwed": "286541.67",
        "InterestShortfall": "0.00",
        "InterestPaid": "286541.67",
        "InterestUnpaid": "0.00"
      }, {
        "Class": "Total:",
        "InterestRate": "",
        "BeginningBalance": "65000000.00",
        "InterestOwed": "286541.67",
        "InterestShortfall": "0.00",
        "InterestPaid": "286541.67",
        "InterestUnpaid": "0.00"
      }]
    }],
    "show": "false"
  },
  "7041f7b2-c412-4e0d-8e4e-7d3941add0fd": {
    "name": "Page #5",
    "class": "dynamic_table",
    "id": "page_layout_5",
    "sid": "daed8dcb-d49d-43ac-bac4-95452d9b904d",
    "items": [{
      "id": "a14485ad-34fe-4418-b95b-076a8c25b357",
      "content": "CollateralSummary",
      "data": [{
        "Activity": "Paid In Full",
        "CountRelatedPeriod": "36.00",
        "AmountRelatedPeriod": "3907421.93",
        "CountSinceCutoff": "95.00",
        "AmountSinceCutoff": "11723631.65"
      }, {
        "Activity": "Purchase of Additional Mortgage Loans",
        "CountRelatedPeriod": "14.00",
        "AmountRelatedPeriod": "0.00",
        "CountSinceCutoff": "14.00",
        "AmountSinceCutoff": "0.00"
      }, {
        "Activity": "Funding of Construction Draws",
        "CountRelatedPeriod": "36.00",
        "AmountRelatedPeriod": "1072592.32",
        "CountSinceCutoff": "144.00",
        "AmountSinceCutoff": "4816043.71"
      }, {
        "Activity": "Principal Payments",
        "CountRelatedPeriod": "0.00",
        "AmountRelatedPeriod": "39396.52",
        "CountSinceCutoff": "345.00",
        "AmountSinceCutoff": "120148.92"
      }, {
        "Activity": "Realized Losses",
        "CountRelatedPeriod": "0.00",
        "AmountRelatedPeriod": "0.00",
        "CountSinceCutoff": "0.00",
        "AmountSinceCutoff": "0.00"
      }]
    }],
    "show": "false"
  }
}

const currentItemShow = null
// const columnsFromBackend = {
//   [uuidv4()]: {
//     name: "Requested",
//     class: "static_table",
//     id: "requested_table",
//     sid: uuidv4(),
//     items: itemsFromBackend,
//     show: "true"
//   }
// };

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
      name: "Page #" + count,
      class: "dynamic_table",
      id: "page_layout_" + count,
      sid: uuidv4(),
      items: [],
      show: "false"
    }
  })
}


function showHidePage(data, columnId, columns, setColumns, setItemshow) {
  console.log("columnId", columnId);
  setItemshow(columnId)
}


function pageViewFucntion(data, setPageView) {
  console.log("pageView", data);
  setPageView(data)
}


function showPopup(popup, setPopup) {
  console.log("showPopup", popup)
  setPopup(true)
}

function callbackFunction(childData, setPopup) {
  console.log("callbackFunction", childData)
  setPopup(false)
}



function DragNDrop(props) {
  // const [columns, setColumns] = useState(backendcolumns);
  // const [itemshow, setItemshow] = useState(currentItemShow);
  // const [visualize, setVisualize] = React.useState({ checkedB: false });
  // const [popup, setPopup] = React.useState(false);
  const columnsFromBackend = {
    [uuidv4()]: {
      name: "Requested",
      class: "static_table",
      id: "requested_table",
      sid: uuidv4(),
      items: props.customize_data,
      show: "true"
    }
  };
  const [columns, setColumns] = useState(props.customize_data);
  const [itemshow, setItemshow] = useState(currentItemShow);
  const [pageView, setPageView] = useState('tab_view');
  const [visualize, setVisualize] = React.useState({ checkedB: true });
  const [popup, setPopup] = React.useState(false);
  const [dealname, setDealname] = useState(props.dealname);
  const [month, setMonth] = useState(props.month);
  const [year, setYear] = useState(props.year);
  const [peers, setPeers] = useState(props.peers);
  const [token, setToken] = useState(props.token);
  const [dealType, setDealType] = useState(props.dealType);
  const [channelname, setChannelname] = useState(props.channelname);
  const [notes, setNotes] = useState(props.Notes);
  // props.customize_data

  // if(month!=props.month) {
  //   setColumns(props.customize_data)
  // }
  console.log("month & year", month, year)

  const handleChange = (event) => {
    setVisualize({ ...visualize, [event.target.name]: event.target.checked });
  };


  return (
    <React.Fragment>
      <div className="navigate_view float-right">
        <Button variant={pageView == "tab_view" ? 'contained' : 'outlined'}
          color='primary'
          onClick={() => pageViewFucntion('tab_view', setPageView)}
        > Tab View <TableChartIcon></TableChartIcon> </Button>
        <Button variant={pageView == "page_view" ? 'contained' : 'outlined'}
          color='primary'
          onClick={() => pageViewFucntion('page_view', setPageView)}
        > Page View <ReorderIcon></ReorderIcon> </Button>

      </div>
      <div className="clearfix"></div>
      <div className="tab-view-container"
        style={{
          visibility: pageView == 'tab_view' ? 'visible' : 'hidden',
          width: pageView == 'tab_view' ? '100%' : '0',
          height: pageView == 'tab_view' ? '100%' : '0'
        }}
      >

        {/* visibility: hidden; width: 0px; height: 0px; */}

        <div className="customization_table_pagination">
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <React.Fragment>


                <Button
                  onClick={() => showHidePage(column.sid, columnId, columns, setColumns, setItemshow)}
                  id={column.id}
                  key={columnId}
                  className={itemshow == columnId ? column.class + ' active' : column.class}
                  variant='outlined' color='secondary' type='submit'>
                  {column.name}
                  <div className="button_popup">
                    <ul>
                      {column.items.map((item, index) => {
                        return (

                          <React.Fragment>
                            <li>{item.content.replace(/([a-z])([A-Z])/g, '$1 $2')}</li>
                          </React.Fragment>

                        )
                      }
                      )}
                    </ul>
                  </div>
                </Button>

              </React.Fragment>
            );
          })}
        </div>

        <React.Fragment>
          <div className="customization_table wrapper-pdf-container" id="viewReport">

            {itemshow == null ?
              <React.Fragment>
                {/* <div id="requested_table2" class="dynamic_table defaulttext">
                {defaultText}
              </div> */}

                {/* {JSON.stringify(columns)} */}

                {Object.entries(columns).map(([columnId, column], index) => {
                  return (
                    <React.Fragment>
                      {/* {JSON.stringify("111111177777")} */}
                      {column.name == "Page 1" ?
                        <div
                          id={column.id}
                          key={columnId}
                          className={column.class}

                        >

                          <div
                            style={{
                              width: "100%",
                              minHeight: 300
                            }}
                          >



                            {column.items.map((item, index) => {
                              return (
                                <div id="">
                                  {/* {JSON.stringify(item)} */}
                                  {column.name == "Requested" ?


                                    <React.Fragment>
                                      <div role="button" className="text_default">{item.content}</div>
                                    </React.Fragment>
                                    :

                                    <React.Fragment>
                                      {/* AcquisitionCriteria */}
                                      {
                                        item.content == "PrepaymentsAndDefaultRates" ?

                                          <React.Fragment>
                                            {dealType == "Saluda PAC1" ?
                                              <PrepaymentsAndDefaultRatesTable
                                                notes={notes}
                                                month={month}
                                                year={year}
                                                dealType={dealType}
                                                section_id={item.content} data={item.data} section_title={item.content} ></PrepaymentsAndDefaultRatesTable>
                                              :
                                              dealType == "Saluda FIG1" ?
                                                <PrepaymentsAndDefaultRatesTableFig1
                                                  notes={notes}
                                                  month={month}
                                                  year={year}
                                                  dealType={dealType}
                                                  section_id={item.content} data={item.data} section_title={item.content} ></PrepaymentsAndDefaultRatesTableFig1>
                                                :
                                                dealType == "Saluda WL1" ?

                                                  <PrepaymentsOtherDealsTableWL1
                                                    notes={notes}
                                                    month={month}
                                                    year={year}
                                                    dealType={dealType}
                                                    section_id={item.content} data={item.data} section_title={item.content} ></PrepaymentsOtherDealsTableWL1>
                                                  :
                                                  dealType == "Saluda FIG2" || dealType == "Saluda BC1" || dealType=="Saluda BC2" || dealType=="Saluda Builders"  || dealType == "Reigo" || dealType == "Dominion" || dealType == "Saluda SEQ1" || dealType=="NPL"?

                                                    <PrepaymentsOtherDealsTable10Month
                                                      notes={notes}
                                                      month={month}
                                                      year={year}
                                                      dealType={dealType}
                                                      section_id={item.content} data={item.data} section_title={item.content} ></PrepaymentsOtherDealsTable10Month>
                                                    :
                                                    <PrepaymentsOtherDealsTable
                                                      notes={notes}
                                                      month={month}
                                                      year={year}
                                                      dealType={dealType}
                                                      section_id={item.content} data={item.data} section_title={item.content} ></PrepaymentsOtherDealsTable>}
                                          </React.Fragment>



                                          : item.content == "AccountStatement" ?

                                            <React.Fragment>
                                              {dealType == "Saluda PAC1" ?

                                                <AccountStatementsTableSaludaPacNew
                                                  notes={notes}
                                                  dealType={dealType}
                                                  month={month}
                                                  year={year}
                                                  section_id={item.content} data={item.data} section_title={item.content} ></AccountStatementsTableSaludaPacNew>
                                                :
                                                dealType == "AlphaFlow" || dealType == "Stoa 2021"  || dealType=="Stoa 2022" || dealType == "Palisades" || dealType == "MFA" ?
                                                  <AccountStatementsAlphaflow
                                                    notes={notes}
                                                    dealType={dealType}
                                                    month={month}
                                                    year={year}
                                                    section_id={item.content} data={item.data} section_title={item.content} ></AccountStatementsAlphaflow>
                                                  :

                                                  <AccountStatementsTable
                                                    notes={notes}
                                                    dealType={dealType}
                                                    month={month}
                                                    year={year}
                                                    section_id={item.content} data={item.data} section_title={item.content} ></AccountStatementsTable>
                                              }                              <div class="beforeClass"></div>
                                            </React.Fragment>

                                            :
                                            item.content == "AccountStatements" ?

                                              <React.Fragment>
                                                {dealType == "Saluda FIG2" || dealType == "Saluda BC1" || dealType=="Saluda BC2" || dealType=="Saluda Builders" || dealType == "Reigo" || dealType == "Saluda WL1" || dealType == "Dominion" || dealType == "Saluda RTL1" || dealType == "Saluda MF1" || dealType == "Saluda RTL2" || dealType == "Saluda PRE1" ||dealType=="Setpoint"?

                                                  <AccountStatementsAlphaflow
                                                    notes={notes}
                                                    dealType={dealType}
                                                    month={month}
                                                    year={year}
                                                    section_id={item.content} data={item.data} section_title={item.content} ></AccountStatementsAlphaflow>

                                                  :
                                                  dealType == "NPL" ?

                                                  <AccountStatementsNPL
                                                  notes={notes}
                                                  dealType={dealType}
                                                  month={month}
                                                  year={year}
                                                  section_id={item.content} data={item.data} section_title={item.content} ></AccountStatementsNPL>

                                                    :
                                                  dealType == "Spruce Hill" ?

                                                    <AccountStatementsSprucehill
                                                      notes={notes}
                                                      dealType={dealType}
                                                      month={month}
                                                      year={year}
                                                      section_id={item.content} data={item.data} section_title={item.content} ></AccountStatementsSprucehill>

                                                    :
                                                    <AccountStatementsTableSingle
                                                      notes={notes}
                                                      dealType={dealType}
                                                      month={month}
                                                      year={year}
                                                      section_id={item.content} data={item.data} section_title={item.content} ></AccountStatementsTableSingle>

                                                }
                                                <div class="beforeClass"></div>
                                              </React.Fragment>
                                              : item.content == "Details" ?

                                                <React.Fragment>
                                                  <DetailsTable
                                                    notes={notes}
                                                    dealType={dealType}
                                                    month={month}
                                                    year={year}
                                                    section_id={item.content} data={item.data} section_title={item.content} ></DetailsTable>
                                                </React.Fragment>


                                                : item.content == "Summary" ?

                                                  <React.Fragment>
                                                    <Summary
                                                      notes={notes}
                                                      dealType={dealType}
                                                      month={month}
                                                      year={year}
                                                      section_id={item.content} data={item.data} section_title={item.content} ></Summary>
                                                  </React.Fragment>
                                                  :
                                                  item.content == "AccountStatementsForBorrowerTrust" ?

                                                  <React.Fragment>
                                                    <AccountStatementsForBorrowerTrust
                                                      notes={notes}
                                                      dealType={dealType}
                                                      month={month}
                                                      year={year}
                                                      section_id={item.content} data={item.data} section_title={item.content} ></AccountStatementsForBorrowerTrust>
                                                  </React.Fragment>
                                                  :
                                                  item.content == "AccountStatementsForSecuritiesTrust" ?

                                                  <React.Fragment>
                                                    <AccountStatementsForSecurityTrust
                                                      notes={notes}
                                                      dealType={dealType}
                                                      month={month}
                                                      year={year}
                                                      section_id={item.content} data={item.data} section_title={item.content} ></AccountStatementsForSecurityTrust>
                                                  </React.Fragment>
                                                  :


                                                  item.content == "AcquisitionCriteria" ?

                                                    <React.Fragment>
                                                      <AcquisitionCriteriaTable
                                                        notes={notes}
                                                        dealType={dealType}
                                                        month={month}
                                                        year={year}
                                                        section_id={item.content} data={item.data} section_title={item.content} ></AcquisitionCriteriaTable>
                                                      <div class="beforeClass"></div>
                                                    </React.Fragment>
                                                    :

                                                    item.content == "DealEvents" || item.content == "Events / MiscellaneousReporting" ?
                                                      <React.Fragment>
                                                        {dealType == "AlphaFlow" || dealType == "Saluda FIG2" || dealType == "Saluda BC1" ||  dealType=="Saluda BC2" || dealType=="Saluda Builders"   || dealType == "Reigo" || dealType == "Saluda WL1" || dealType == "Dominion" || dealType == "Saluda RTL1" || dealType == "Stoa 2021"  || dealType=="Stoa 2022" || dealType == "Saluda MF1" || dealType == "Palisades" || dealType == "Saluda RTL2" || dealType == "Saluda PRE1" || dealType == "MFA"||dealType=="Setpoint" || dealType=="NPL" ?
                                                          <DealEventAlphaflow
                                                            notes={notes}
                                                            month={month}
                                                            year={year}
                                                            dealType={dealType}
                                                            section_id={item.content} data={item.data} section_title={item.content} ></DealEventAlphaflow>
                                                          :
                                                          <DealEventTable
                                                            notes={notes}
                                                            month={month}
                                                            year={year}
                                                            dealType={dealType}
                                                            section_id={item.content} data={item.data} section_title={item.content} ></DealEventTable>
                                                        }
                                                        {/* <p>Foooter Notes</p> */}
                                                        {/* notes, channelname, dealType */}



                                                        {/* <div class="beforeClass"></div> */}
                                                      </React.Fragment>
                                                      :

                                                      item.content == "ConcentrationLimitations" ?
                                                        <React.Fragment>
                                                          {dealType == "Reigo" ?
                                                            <ConcentrationLimitations
                                                              notes={notes}
                                                              dealType={dealType}
                                                              month={month}
                                                              year={year}
                                                              section_id={item.content} data={item.data} section_title={item.content} ></ConcentrationLimitations>


                                                            :
                                                            <DealEventTable
                                                              notes={notes}
                                                              month={month}
                                                              year={year}
                                                              dealType={dealType}
                                                              section_id={item.content} data={item.data} section_title={item.content} ></DealEventTable>
                                                          }
                                                          {/* <p>Foooter Notes</p> */}
                                                          {/* notes, channelname, dealType */}



                                                          {/* <div class="beforeClass"></div> */}
                                                        </React.Fragment>
                                                        :
                                                        // 
                                                        item.content == "DealContactInformation" ?
                                                          <React.Fragment>
                                                            <FirstTable report_type="Investor Report" section_id={item.content} data={item.data} section_title={item.content} ></FirstTable>
                                                            <div class="beforeClass"></div>
                                                            <IndexTable type="report" section_id={''} data={columns} section_title={''} ></IndexTable>
                                                            {/* <div class="beforeClass"></div> */}
                                                          </React.Fragment> :
                                                          item.content == "CollateralPerformance" ?
                                                            <React.Fragment>
                                                              {dealType == "Saluda PAC1" || dealType == "Saluda FIG1" ?
                                                                <React.Fragment>
                                                                  <AcquisitionCriteriaTable
                                                                    notes={notes}
                                                                    dealType={dealType}
                                                                    month={month}
                                                                    year={year}
                                                                    section_id={item.content} data={item.data} section_title={item.content} ></AcquisitionCriteriaTable>
                                                                </React.Fragment>
                                                                :
                                                                <Table
                                                                  notes={notes}
                                                                  dealType={dealType}
                                                                  month={month}
                                                                  year={year}
                                                                  section_id={item.content} data={item.data} section_title={item.content} ></Table>
                                                              }

                                                            </React.Fragment>
                                                            :
                                                            item.content == "PriorityOfPayments" ?
                                                              <React.Fragment>
                                                                {dealType == "Spruce Hill" ?
                                                                  <PriorityOfPaymentsSprucehill section_id={item.content} data={item.data} section_title={item.content} month={month} year={year} ></PriorityOfPaymentsSprucehill>
                                                                  :
                                                                  <Table section_id={item.content} data={item.data} section_title={item.content} ></Table>
                                                                }
                                                              </React.Fragment>
                                                              :
                                                              <React.Fragment>

                                                                <Table
                                                                  notes={notes}
                                                                  dealType={dealType}
                                                                  month={month}
                                                                  year={year}
                                                                  section_id={item.content} data={item.data} section_title={item.content} ></Table>

                                                              </React.Fragment>
                                      }
                                    </React.Fragment>

                                  }


                                </div>
                              );
                            })
                            }

                          </div>
                        </div>
                        : ''}
                    </React.Fragment>
                  );
                })}

              </React.Fragment> : ''}

            {Object.entries(columns).map(([columnId, column], index) => {
              return (
                <div
                  id={column.id}
                  key={columnId}
                  className={column.class}
                  style={{
                    display: itemshow == columnId ? 'block' : 'none'
                  }}
                >

                  <React.Fragment>
                    {/* {JSON.stringify("11111111111")} */}
                    <div
                      style={{
                        width: "100%",
                        minHeight: 300
                      }}
                    >

                      {column.items.map((item, index) => {
                        return (
                          <div id="">
                            {/* {JSON.stringify(item)} */}
                            {column.name == "Requested" ?


                              <React.Fragment>
                                <div role="button" className="text_default">{item.content}</div>
                              </React.Fragment>
                              :

                              <React.Fragment>
                                {/* AcquisitionCriteria */}
                                {
                                  item.content == "PrepaymentsAndDefaultRates" ?

                                    <React.Fragment>
                                      {dealType == "Saluda PAC1" ?
                                        <PrepaymentsAndDefaultRatesTable
                                          notes={notes}
                                          month={month}
                                          year={year}
                                          dealType={dealType}
                                          section_id={item.content} data={item.data} section_title={item.content} ></PrepaymentsAndDefaultRatesTable>
                                        :
                                        dealType == "Saluda FIG1" ?
                                          <PrepaymentsAndDefaultRatesTableFig1
                                            notes={notes}
                                            month={month}
                                            year={year}
                                            dealType={dealType}
                                            section_id={item.content} data={item.data} section_title={item.content} ></PrepaymentsAndDefaultRatesTableFig1>
                                          :
                                          dealType == "Saluda WL1" ?

                                            <PrepaymentsOtherDealsTableWL1
                                              notes={notes}
                                              month={month}
                                              year={year}
                                              dealType={dealType}
                                              section_id={item.content} data={item.data} section_title={item.content} ></PrepaymentsOtherDealsTableWL1>
                                            :
                                            dealType == "Saluda FIG2" || dealType == "Saluda BC1" || dealType=="Saluda BC2" || dealType=="Saluda Builders" || dealType == "Reigo" || dealType == "Dominion" || dealType == "Saluda SEQ1" || dealType=="NPL" ?

                                              <PrepaymentsOtherDealsTable10Month
                                                notes={notes}
                                                month={month}
                                                year={year}
                                                dealType={dealType}
                                                section_id={item.content} data={item.data} section_title={item.content} ></PrepaymentsOtherDealsTable10Month>
                                              :
                                              <PrepaymentsOtherDealsTable
                                                notes={notes}
                                                month={month}
                                                year={year}
                                                dealType={dealType}
                                                section_id={item.content} data={item.data} section_title={item.content} ></PrepaymentsOtherDealsTable>}
                                    </React.Fragment>



                                    : item.content == "AccountStatement" ?

                                      <React.Fragment>
                                        {dealType == "Saluda PAC1" ?
                                          <AccountStatementsTableSaludaPacNew
                                            notes={notes}
                                            dealType={dealType}
                                            month={month}
                                            year={year}
                                            section_id={item.content} data={item.data} section_title={item.content} ></AccountStatementsTableSaludaPacNew>
                                          :
                                          dealType == "AlphaFlow" || dealType == "Stoa 2021"  || dealType=="Stoa 2022" || dealType == "Palisades" || dealType == "MFA" ?
                                            <AccountStatementsAlphaflow
                                              notes={notes}
                                              dealType={dealType}
                                              month={month}
                                              year={year}
                                              section_id={item.content} data={item.data} section_title={item.content} ></AccountStatementsAlphaflow>
                                            :

                                            <AccountStatementsTable
                                              notes={notes}
                                              dealType={dealType}
                                              month={month}
                                              year={year}
                                              section_id={item.content} data={item.data} section_title={item.content} ></AccountStatementsTable>
                                        }                              <div class="beforeClass"></div>
                                      </React.Fragment>

                                      :
                                      item.content == "AccountStatements" ?

                                        <React.Fragment>
                                          {dealType == "Saluda FIG2" || dealType == "Saluda BC1" || dealType=="Saluda BC2" || dealType=="Saluda Builders"  || dealType == "Reigo" || dealType == "Saluda WL1" || dealType == "Dominion" || dealType == "Saluda RTL1" || dealType == "Saluda MF1" || dealType == "Saluda RTL2" || dealType == "Saluda PRE1"||dealType=="Setpoint" ?

                                            <AccountStatementsAlphaflow
                                              notes={notes}
                                              dealType={dealType}
                                              month={month}
                                              year={year}
                                              section_id={item.content} data={item.data} section_title={item.content} ></AccountStatementsAlphaflow>
                                              :
                                                  dealType == "NPL" ?

                                                  <AccountStatementsNPL
                                                  notes={notes}
                                                  dealType={dealType}
                                                  month={month}
                                                  year={year}
                                                  section_id={item.content} data={item.data} section_title={item.content} ></AccountStatementsNPL>


                                            :
                                            
                                            
                                            dealType == "Spruce Hill" ?

                                              <AccountStatementsSprucehill
                                                notes={notes}
                                                dealType={dealType}
                                                month={month}
                                                year={year}
                                                section_id={item.content} data={item.data} section_title={item.content} ></AccountStatementsSprucehill>

                                              :
                                              <AccountStatementsTableSingle
                                                notes={notes}
                                                dealType={dealType}
                                                month={month}
                                                year={year}
                                                section_id={item.content} data={item.data} section_title={item.content} ></AccountStatementsTableSingle>

                                          }
                                          <div class="beforeClass"></div>
                                        </React.Fragment>
                                        : item.content == "Details" ?

                                          <React.Fragment>
                                            <DetailsTable
                                              notes={notes}
                                              dealType={dealType}
                                              month={month}
                                              year={year}
                                              section_id={item.content} data={item.data} section_title={item.content} ></DetailsTable>
                                          </React.Fragment>


                                          : item.content == "Summary" ?

                                            <React.Fragment>
                                              <Summary
                                                notes={notes}
                                                dealType={dealType}
                                                month={month}
                                                year={year}
                                                section_id={item.content} data={item.data} section_title={item.content} ></Summary>
                                            </React.Fragment>
                                            :

                                            item.content == "AccountStatementsForBorrowerTrust" ?

                                            <React.Fragment>
                                              <AccountStatementsForBorrowerTrust
                                                notes={notes}
                                                dealType={dealType}
                                                month={month}
                                                year={year}
                                                section_id={item.content} data={item.data} section_title={item.content} ></AccountStatementsForBorrowerTrust>
                                            </React.Fragment>
                                            :
                                            item.content == "AccountStatementsForSecuritiesTrust" ?

                                            <React.Fragment>
                                              <AccountStatementsForSecurityTrust
                                                notes={notes}
                                                dealType={dealType}
                                                month={month}
                                                year={year}
                                                section_id={item.content} data={item.data} section_title={item.content} ></AccountStatementsForSecurityTrust>
                                            </React.Fragment>
                                            :
                                            item.content == "AcquisitionCriteria" ?

                                              <React.Fragment>
                                                <AcquisitionCriteriaTable
                                                  notes={notes}
                                                  dealType={dealType}
                                                  month={month}
                                                  year={year}
                                                  section_id={item.content} data={item.data} section_title={item.content} ></AcquisitionCriteriaTable>
                                                <div class="beforeClass"></div>
                                              </React.Fragment>
                                              :

                                              item.content == "DealEvents" || item.content == "Events / MiscellaneousReporting" ?
                                                <React.Fragment>
                                                  {dealType == "AlphaFlow" || dealType == "Saluda FIG2" || dealType == "Saluda BC1" || dealType=="Saluda BC2" || dealType=="Saluda Builders" || dealType == "Reigo" || dealType == "Saluda WL1" || dealType == "Dominion" || dealType == "Saluda RTL1" || dealType == "Stoa 2021"  || dealType=="Stoa 2022" || dealType == "Saluda MF1" || dealType == "Palisades" || dealType == "Saluda RTL2" || dealType == "Saluda PRE1" || dealType == "MFA"||dealType=="Setpoint" || dealType=="NPL"?
                                                    <DealEventAlphaflow
                                                      notes={notes}
                                                      month={month}
                                                      year={year}
                                                      dealType={dealType}
                                                      section_id={item.content} data={item.data} section_title={item.content} ></DealEventAlphaflow>
                                                    :
                                                    <DealEventTable
                                                      notes={notes}
                                                      month={month}
                                                      year={year}
                                                      dealType={dealType}
                                                      section_id={item.content} data={item.data} section_title={item.content} ></DealEventTable>
                                                  }
                                                  {/* <p>Foooter Notes</p> */}
                                                  {/* notes, channelname, dealType */}



                                                  {/* <div class="beforeClass"></div> */}
                                                </React.Fragment>
                                                :

                                                item.content == "ConcentrationLimitations" ?
                                                  <React.Fragment>
                                                    {dealType == "Reigo" ?
                                                      <ConcentrationLimitations
                                                        notes={notes}
                                                        dealType={dealType}
                                                        month={month}
                                                        year={year}
                                                        section_id={item.content} data={item.data} section_title={item.content} ></ConcentrationLimitations>


                                                      :
                                                      <DealEventTable
                                                        notes={notes}
                                                        month={month}
                                                        year={year}
                                                        dealType={dealType}
                                                        section_id={item.content} data={item.data} section_title={item.content} ></DealEventTable>
                                                    }
                                                    {/* <p>Foooter Notes</p> */}
                                                    {/* notes, channelname, dealType */}



                                                    {/* <div class="beforeClass"></div> */}
                                                  </React.Fragment>
                                                  :
                                                  // 
                                                  item.content == "DealContactInformation" ?
                                                    <React.Fragment>
                                                      <FirstTable report_type="Investor Report" section_id={item.content} data={item.data} section_title={item.content} ></FirstTable>
                                                      <div class="beforeClass"></div>
                                                      <IndexTable type="report" section_id={''} data={columns} section_title={''} ></IndexTable>
                                                      {/* <div class="beforeClass"></div> */}
                                                    </React.Fragment> :
                                                    item.content == "CollateralPerformance" ?
                                                      <React.Fragment>
                                                        {dealType == "Saluda PAC1" || dealType == "Saluda FIG1" ?
                                                          <React.Fragment>
                                                            <AcquisitionCriteriaTable
                                                              notes={notes}
                                                              dealType={dealType}
                                                              month={month}
                                                              year={year}
                                                              section_id={item.content} data={item.data} section_title={item.content} ></AcquisitionCriteriaTable>
                                                          </React.Fragment>
                                                          :
                                                          <Table
                                                            notes={notes}
                                                            dealType={dealType}
                                                            month={month}
                                                            year={year}
                                                            section_id={item.content} data={item.data} section_title={item.content} ></Table>
                                                        }

                                                      </React.Fragment>
                                                      :
                                                      item.content == "PriorityOfPayments" ?
                                                        <React.Fragment>
                                                          {dealType == "Spruce Hill" ?
                                                            <PriorityOfPaymentsSprucehill section_id={item.content} data={item.data} section_title={item.content} month={month} year={year}></PriorityOfPaymentsSprucehill>
                                                            :
                                                            <Table section_id={item.content} data={item.data} section_title={item.content} ></Table>
                                                          }
                                                        </React.Fragment>
                                                        :
                                                        <React.Fragment>

                                                          <Table
                                                            notes={notes}
                                                            dealType={dealType}
                                                            month={month}
                                                            year={year}
                                                            section_id={item.content} data={item.data} section_title={item.content} ></Table>

                                                        </React.Fragment>
                                }
                              </React.Fragment>
                            }


                          </div>
                        );
                      })}
                    </div>
                  </React.Fragment>
                </div>
              );
            })}
          </div>
        </React.Fragment>



      </div>

      <div className="page-view-container"
        style={{
          visibility: pageView == 'page_view' ? 'visible' : 'hidden',
          width: pageView == 'page_view' ? '100%' : '0',
          height: pageView == 'page_view' ? '100%' : '0'
        }}>
        <div id="pdfdata"

        >
          <div data-channelname={channelname}
            data-month={month}
            data-year={year}
            className={channelname + "-" + month + "-" + year + " " + channelname + " " + channelname + "-" + month}
          >
            {Object.entries(columns).map(([columnId, column], index) => {

              return (

                <React.Fragment>
                  {/* {JSON.stringify(notes, channelname, dealType)} */}
                  {column.items.map((item, index) => {
                    return (
                      <React.Fragment>
                        {/* {JSON.stringify(item.data)} */}
                        {item.data.length == 0 && item.content !== "MiscellaneousReportingItems" ? '' :

                          <div className="wrapper-pdf-container">
                            {/* {JSON.stringify(item)} */}
                            {column.name == "Requested" ?


                              <React.Fragment>
                                <div role="button" className="text_default">{item.content}</div>
                              </React.Fragment>
                              :

                              <React.Fragment>
                                {/* AcquisitionCriteria */}
                                {
                                  item.content == "PrepaymentsAndDefaultRates" ?

                                    <React.Fragment>
                                      {dealType == "Saluda PAC1" ?
                                        <PrepaymentsAndDefaultRatesTable
                                          notes={notes}
                                          month={month}
                                          year={year}
                                          dealType={dealType}
                                          section_id={item.content} data={item.data} section_title={item.content} ></PrepaymentsAndDefaultRatesTable>
                                        :
                                        dealType == "Saluda FIG1" ?
                                          <PrepaymentsAndDefaultRatesTableFig1
                                            notes={notes}
                                            month={month}
                                            year={year}
                                            dealType={dealType}
                                            section_id={item.content} data={item.data} section_title={item.content} ></PrepaymentsAndDefaultRatesTableFig1>
                                          :
                                          dealType == "Saluda WL1" ?

                                            <PrepaymentsOtherDealsTableWL1
                                              notes={notes}
                                              month={month}
                                              year={year}
                                              dealType={dealType}
                                              section_id={item.content} data={item.data} section_title={item.content} ></PrepaymentsOtherDealsTableWL1>
                                            :
                                            dealType == "Saluda FIG2" || dealType == "Saluda BC1" || dealType=="Saluda BC2" || dealType=="Saluda Builders"  || dealType == "Reigo" || dealType == "Dominion" || dealType == "Saluda SEQ1" || dealType=="NPL" ?

                                              <PrepaymentsOtherDealsTable10Month
                                                notes={notes}
                                                month={month}
                                                year={year}
                                                dealType={dealType}
                                                section_id={item.content} data={item.data} section_title={item.content} ></PrepaymentsOtherDealsTable10Month>
                                              :
                                              <PrepaymentsOtherDealsTable
                                                notes={notes}
                                                month={month}
                                                year={year}
                                                dealType={dealType}
                                                section_id={item.content} data={item.data} section_title={item.content} ></PrepaymentsOtherDealsTable>}
                                    </React.Fragment>



                                    : item.content == "AccountStatement" ?

                                      <React.Fragment>
                                        {dealType == "Saluda PAC1" ?

                                          <AccountStatementsTableSaludaPacNew
                                            notes={notes}
                                            dealType={dealType}
                                            month={month}
                                            year={year}
                                            section_id={item.content} data={item.data} section_title={item.content} ></AccountStatementsTableSaludaPacNew>
                                          :
                                          dealType == "AlphaFlow" || dealType == "Stoa 2021"  || dealType=="Stoa 2022" || dealType == "Palisades" || dealType == "MFA" ?
                                            <AccountStatementsAlphaflow
                                              notes={notes}
                                              dealType={dealType}
                                              month={month}
                                              year={year}
                                              section_id={item.content} data={item.data} section_title={item.content} ></AccountStatementsAlphaflow>
                                            :

                                            <AccountStatementsTable
                                              notes={notes}
                                              dealType={dealType}
                                              month={month}
                                              year={year}
                                              section_id={item.content} data={item.data} section_title={item.content} ></AccountStatementsTable>
                                        }                              <div class="beforeClass"></div>
                                      </React.Fragment>

                                      :
                                      item.content == "AccountStatements" ?

                                        <React.Fragment>
                                          {dealType == "Saluda FIG2" || dealType == "Saluda BC1" || dealType=="Saluda BC2" || dealType=="Saluda Builders"  || dealType == "Reigo" || dealType == "Saluda WL1" || dealType == "Dominion" || dealType == "Saluda RTL1" || dealType == "Saluda MF1" || dealType == "Saluda RTL2" || dealType == "Saluda PRE1"||dealType=="Setpoint" ?

                                            <AccountStatementsAlphaflow
                                              notes={notes}
                                              dealType={dealType}
                                              month={month}
                                              year={year}
                                              section_id={item.content} data={item.data} section_title={item.content} ></AccountStatementsAlphaflow>
                                              :
                                              dealType == "NPL" ?

                                              <AccountStatementsNPL
                                              notes={notes}
                                              dealType={dealType}
                                              month={month}
                                              year={year}
                                              section_id={item.content} data={item.data} section_title={item.content} ></AccountStatementsNPL>

                                            :
                                            dealType == "Spruce Hill" ?

                                              <AccountStatementsSprucehill
                                                notes={notes}
                                                dealType={dealType}
                                                month={month}
                                                year={year}
                                                section_id={item.content} data={item.data} section_title={item.content} ></AccountStatementsSprucehill>

                                              :
                                              <AccountStatementsTableSingle
                                                notes={notes}
                                                dealType={dealType}
                                                month={month}
                                                year={year}
                                                section_id={item.content} data={item.data} section_title={item.content} ></AccountStatementsTableSingle>

                                          }
                                          <div class="beforeClass"></div>
                                        </React.Fragment>
                                        : item.content == "Details" ?

                                          <React.Fragment>
                                            <DetailsTable
                                              notes={notes}
                                              dealType={dealType}
                                              month={month}
                                              year={year}
                                              section_id={item.content} data={item.data} section_title={item.content} ></DetailsTable>
                                          </React.Fragment>


                                          : item.content == "Summary" ?

                                            <React.Fragment>
                                              <Summary
                                                notes={notes}
                                                dealType={dealType}
                                                month={month}
                                                year={year}
                                                section_id={item.content} data={item.data} section_title={item.content} ></Summary>
                                            </React.Fragment>
                                            :

                                            item.content == "AccountStatementsForBorrowerTrust" ?

                                            <React.Fragment>
                                              <AccountStatementsForBorrowerTrust
                                                notes={notes}
                                                dealType={dealType}
                                                month={month}
                                                year={year}
                                                section_id={item.content} data={item.data} section_title={item.content} ></AccountStatementsForBorrowerTrust>
                                            </React.Fragment>
                                            :
                                            item.content == "AccountStatementsForSecuritiesTrust" ?

                                            <React.Fragment>
                                              <AccountStatementsForSecurityTrust
                                                notes={notes}
                                                dealType={dealType}
                                                month={month}
                                                year={year}
                                                section_id={item.content} data={item.data} section_title={item.content} ></AccountStatementsForSecurityTrust>
                                            </React.Fragment>
                                            :
                                            item.content == "AcquisitionCriteria" ?

                                              <React.Fragment>
                                                <AcquisitionCriteriaTable
                                                  notes={notes}
                                                  dealType={dealType}
                                                  month={month}
                                                  year={year}
                                                  section_id={item.content} data={item.data} section_title={item.content} ></AcquisitionCriteriaTable>
                                                <div class="beforeClass"></div>
                                              </React.Fragment>
                                              :

                                              item.content == "DealEvents" || item.content == "Events / MiscellaneousReporting" ?
                                                <React.Fragment>
                                                  {dealType == "AlphaFlow" || dealType == "Saluda FIG2" || dealType == "Saluda BC1" || dealType=="Saluda BC2" || dealType=="Saluda Builders" || dealType == "Reigo" || dealType == "Saluda WL1" || dealType == "Dominion" || dealType == "Saluda RTL1" || dealType == "Stoa 2021"  || dealType=="Stoa 2022" || dealType == "Saluda MF1" || dealType == "Palisades" || dealType == "Saluda RTL2" || dealType == "Saluda PRE1" || dealType == "MFA"||dealType=="Setpoint" || dealType=="NPL" ?
                                                    <DealEventAlphaflow
                                                      notes={notes}
                                                      month={month}
                                                      year={year}
                                                      dealType={dealType}
                                                      section_id={item.content} data={item.data} section_title={item.content} ></DealEventAlphaflow>
                                                    :
                                                    <DealEventTable
                                                      notes={notes}
                                                      month={month}
                                                      year={year}
                                                      dealType={dealType}
                                                      section_id={item.content} data={item.data} section_title={item.content} ></DealEventTable>
                                                  }
                                                  {/* <p>Foooter Notes</p> */}
                                                  {/* notes, channelname, dealType */}



                                                  {/* <div class="beforeClass"></div> */}
                                                </React.Fragment>
                                                :

                                                item.content == "ConcentrationLimitations" ?
                                                  <React.Fragment>
                                                    {dealType == "Reigo" ?
                                                      <ConcentrationLimitations
                                                        notes={notes}
                                                        dealType={dealType}
                                                        month={month}
                                                        year={year}
                                                        section_id={item.content} data={item.data} section_title={item.content} ></ConcentrationLimitations>


                                                      :
                                                      <DealEventTable
                                                        notes={notes}
                                                        month={month}
                                                        year={year}
                                                        dealType={dealType}
                                                        section_id={item.content} data={item.data} section_title={item.content} ></DealEventTable>
                                                    }
                                                    {/* <p>Foooter Notes</p> */}
                                                    {/* notes, channelname, dealType */}



                                                    {/* <div class="beforeClass"></div> */}
                                                  </React.Fragment>
                                                  :
                                                  // 
                                                  item.content == "DealContactInformation" ?
                                                    <React.Fragment>
                                                      <FirstTable report_type="Investor Report" section_id={item.content} data={item.data} section_title={item.content} ></FirstTable>
                                                      <div class="beforeClass"></div>
                                                      <IndexTable type="report" section_id={''} data={columns} section_title={''} ></IndexTable>
                                                      {/* <div class="beforeClass"></div> */}
                                                    </React.Fragment> :
                                                    item.content == "CollateralPerformance" ?
                                                      <React.Fragment>
                                                        {dealType == "Saluda PAC1" || dealType == "Saluda FIG1" ?
                                                          <React.Fragment>
                                                            <AcquisitionCriteriaTable
                                                              notes={notes}
                                                              dealType={dealType}
                                                              month={month}
                                                              year={year}
                                                              section_id={item.content} data={item.data} section_title={item.content} ></AcquisitionCriteriaTable>
                                                          </React.Fragment>
                                                          :
                                                          <Table
                                                            notes={notes}
                                                            dealType={dealType}
                                                            month={month}
                                                            year={year}
                                                            section_id={item.content} data={item.data} section_title={item.content} ></Table>
                                                        }

                                                      </React.Fragment>
                                                      :
                                                      item.content == "PriorityOfPayments" ?
                                                        <React.Fragment>
                                                          {dealType == "Spruce Hill" ?
                                                            <PriorityOfPaymentsSprucehill section_id={item.content} data={item.data} section_title={item.content} month={month} year={year} ></PriorityOfPaymentsSprucehill>
                                                            :
                                                            <Table section_id={item.content} data={item.data} section_title={item.content} ></Table>
                                                          }
                                                        </React.Fragment>
                                                        :
                                                        <React.Fragment>

                                                          <Table
                                                            notes={notes}
                                                            dealType={dealType}
                                                            month={month}
                                                            year={year}
                                                            section_id={item.content} data={item.data} section_title={item.content} ></Table>

                                                        </React.Fragment>
                                }
                              </React.Fragment>
                            }
                          </div>
                        }
                      </React.Fragment>
                    )



                  })}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default DragNDrop;
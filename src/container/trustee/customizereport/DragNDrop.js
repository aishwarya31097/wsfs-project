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

import AccountStatementsAlphaflow from '../../../components/AccountStatementsAlphaflow';
import AccountStatementsNPL from '../../../components/AccountStatementsNPL';

import AccountStatementsForBorrowerTrust from '../../../components/AccountStatementsForBorrowerTrust';
import AccountStatementsForSecurityTrust from '../../../components/AccountStatementsForSecurityTrust';
import PrepaymentsAndDefaultRatesTable from '../../../components/PrepaymentsAndDefaultRatesTable';
import PrepaymentsAndDefaultRatesTableFig1 from '../../../components/PrepaymentsAndDefaultRatesTableFig1'

import PrepaymentsOtherDealsTable10Month from '../../../components/PrepaymentsOtherDealsTable10Month';
import PrepaymentsOtherDealsTableWL1 from '../../../components/PrepaymentsOtherDealsTableWL1';
import PrepaymentsOtherDealsTable from '../../../components/PrepaymentsOtherDealsTable';
import PrepaymentsSprucehillTable from '../../../components/PrepaymentsSprucehillTable';
import DetailsTable from '../../../components/DetailsTable';
import Summary from '../../../components/Summary'
import FirstTable from '../../../components/FirstTable';
import DealEventAlphaflow from '../../../components/DealEventAlphaflow'
import IndexTable from '../../../components/IndexTable';
import CreateAdditonalTable from '../../../components/CreateAdditonalTable';
import SendReport from './SendReport';
import { SaveCustomizeReportAPI } from "../../../servies/services";
import { useSnackbar } from 'notistack';

import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from "react-router";
import AccountStatementsTableSingle from '../../../components/AccountStatementsTableSingle';
import ConcentrationLimitations from '../../../components/ConcentrationLimits';
import AccountStatementsSprucehill from '../../../components/AccountStatementsSprucehill'
import PriorityOfPaymentsSprucehill from '../../../components/PriorityOfPaymentsSprucehill'


const defaultText = "Select the page and drag and drop widgets here to create your report!";

const itemsFromBackend = [{
	"id": "4f67d3fe-2e7a-47fd-819d-67c6e4ed1bf8",
	"content": "Date",
	"data": [{
		"ClosingDate": "6/22/2020",
		"1stPaymentDate": "7/27/2020",
		"OriginalRevolvingPeriodEndDate": "6/25/2021",
		"MaturityDate": "8/25/2051  ",
		"PreviousPaymentDate": "8/27/2020",
		"NextPaymentDate": "9/27/2020",
		"Number of Days in Accrual Period": "30"
	}]
}, {
	"id": "c04cfdcb-7f73-447f-833b-9638b506f8c4",
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
}, {
	"id": "318ffde4-b5e5-473c-8afc-dd64e4093bcd",
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
}, {
	"id": "04583a6b-30fd-4366-82d2-59bfd37a716d",
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
}, {
	"id": "42047d37-3687-4335-812e-1acb1829965e",
	"content": "ClassFactors",
	"data": [{
		"Notes": "A Notes",
		"CUSIP": "50213DAA7",
		"OriginalBalance": "65000000",
		"PriorBalance": "1000.0000000",
		"InterestDistribution": "4.4083333",
		"PrincipalDistribution": "0.0000000",
		"TotalDistribution": "4.4083333",
		"EndingBalance": "1000.0000000"
	}]
}, {
	"id": "f318a622-2bfb-4054-9d6c-dee53e2434ed",
	"content": "AccountStatements",
	"data": [
		[{
			"key": "COLLATERAL BALANCE",
			"value1": "",
			"value2": ""
		}, {
			"key": "",
			"value1": "Number of Loans",
			"value2": "Unpaid Principal Balance"
		}, {
			"key": "Beginning Balance As Of Determination Date",
			"value1": "453.00",
			"value2": "81888420.74"
		}, {
			"key": "Additions",
			"value1": "",
			"value2": ""
		}, {
			"key": "Funding of Construction Draws",
			"value1": "",
			"value2": "1072592.32"
		}, {
			"key": "Purchase of Additional Mortgage Loans",
			"value1": "",
			"value2": "0.00"
		}, {
			"key": "Other Principal",
			"value1": "",
			"value2": "0.00"
		}, {
			"key": "Total:",
			"value1": "0.00",
			"value2": "1072592.32"
		}, {
			"key": "Subtractions",
			"value1": "",
			"value2": ""
		}, {
			"key": "Principal Payments",
			"value1": "",
			"value2": "39396.52"
		}, {
			"key": "Paid In Full",
			"value1": "",
			"value2": "3907421.93"
		}, {
			"key": "Realized Losses",
			"value1": "",
			"value2": "0.00"
		}, {
			"key": "Total:",
			"value1": "36.00",
			"value2": "3946818.45"
		}, {
			"key": "Ending Balance From Waterfall Distribution",
			"value1": "417.00",
			"value2": "79014194.61"
		}], {
			"CONSTRUCTION DRAW ACCOUNT": "",
			"BeginningBalanceAsOfDeterminationDate": "3697176.03",
			"Deposits": "",
			"FromPrincipalCollections": "0.00",
			"TransferFromAdditionalLoanAccount": "0.00",
			"FromPriorityOfPayments (PriorPaymentDate)": "500000.00",
			"Total:": "500000.00",
			"Withdrawals": "",
			"ReimbursementOfServicingAdvances": "0.00",
			"FundingOfConstructionDraws": "859676.11",
			"TransferToAdditionalLoanAccount": "0.00",
			"TransferToTheTransactionAccount": "0.00",
			"Total: ": "859676.11",
			"EndingBalanceFromWaterfallDistribution": "3337499.92"
		}, {
			"ADDITIONAL LOAN ACCOUNT": "",
			"BeginningBalanceAsOfDeterminationDate": "14041878.00",
			"Deposits": "",
			"FromPrincipalCollections": "0.00",
			"TransferFromConstructionDrawAccount": "0.00",
			"FromPriorityOfPayments (PriorPaymentDate)": "2410127.95",
			"Total:": "2410127.95",
			"Withdrawals": "",
			"ReimbursementOfServicingAdvances": "0.00",
			"PurchaseOfAdditionalMortgageLoans": "3672597.24",
			"TransferToConstructionDrawAccount": "0.00",
			"TransferToTheTransactionAccount": "0.00",
			"Total: ": "3672597.24",
			"EndingBalanceFromWaterfallDistribution": "12779408.71"
		}, {
			"TRANSACTION ACCOUNT": "",
			"BeginningBalanceAsOfDeterminationDate": "4033756.87",
			"Deposits": "",
			"FromPrincipalCollections": "3946818.45",
			"RegularInterest": "468680.13",
			"OtherInterest": "38581.74",
			"FromConstructionDrawAccount": "0.00",
			"FromAdditionalLoanAccount": "0.00",
			"Total:": "4454080.32",
			"Withdrawals": "",
			"ToPriorityOfPayments (PriorPaymentDate)": "4033756.87",
			"PurchasedInterest": "0.00",
			"Total: ": "4033756.87",
			"EndingBalanceFromWaterfallDistribution": "4454080.32"
		}
	]
}, {
	"id": "3265a9dd-81d6-48a5-add6-9ec8de918f7d",
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
}, {
	"id": "ef217918-cd6d-44fb-a6da-42befff7ff07",
	"content": "AcquisitionCriteria",
	"data": [
		[{
			"Additional Mortgage Loan Criteria (Entire Pool)": "Pool Balance",
			"Current": "99077921.69",
			"Criteria": "PASS"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Mortgage Loans not conforming to Underwriting Guidelines",
			"Current": "0.00",
			"Criteria": "10.0% max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "% Rental Mortgage Loans by Pool Balance",
			"Current": "38.0",
			"Criteria": "40.0% max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Unpaid Principal Balance",
			"Current": "PASS",
			"Criteria": "300000.00 max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "  per Single Family Mortgaged Property",
			"Current": "PASS",
			"Criteria": "2500000.00 max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "  Single Family",
			"Current": "PASS",
			"Criteria": "5000000.00 max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "   Multi-Family",
			"Current": "PASS",
			"Criteria": "5000000.00 max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Average Unpaid Principal Balance of 1-4 Family Mortgage Loans",
			"Current": "171642.74",
			"Criteria": "300000.00 max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Average Unpaid Principal Balance of Multifamily Mortgage Loans",
			"Current": "1392653.15",
			"Criteria": "2500000.00 max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "% Aggregate Unpaid Principal Balance of Multifamily Mortgage Loans",
			"Current": "4.2",
			"Criteria": "15.0% max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Credit Score",
			"Current": "PASS",
			"Criteria": "600 min"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "  Weighted Average",
			"Current": "726",
			"Criteria": "700 min"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "  Score between 600-625",
			"Current": "1.2",
			"Criteria": "2.0% max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Mortgage Interest Rate",
			"Current": "PASS",
			"Criteria": "4.5% min"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "  Weighted Average",
			"Current": "7.8",
			"Criteria": "7.5% min"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Loans to Foreign Nationals or Legal Entities Without FICO Scores",
			"Current": "0.0",
			"Criteria": "2.0% max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Exposure to single Primary Guarantor",
			"Current": "3.4",
			"Criteria": "5.0% max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Adjustable-Rate Loans",
			"Current": "Not calculated",
			"Criteria": "30.0% max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Hybrid Adjustable-Rate Mortgage Loans",
			"Current": "Not calculated",
			"Criteria": "Not shorter than 5/1"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Cash-Out Refinance",
			"Current": "Not calculated",
			"Criteria": "45.0% max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Maximum Single Geographic Concentration",
			"Current": "9.5",
			"Criteria": "15.0% max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "30+ Days Delinquent",
			"Current": "PASS",
			"Criteria": "Not Permitted"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Interest Coverage Test",
			"Current": "1.64",
			"Criteria": "1.25 min"
		}],
		[{
			"Mortgage Loan Criteria (Renovation Mortgage Loans)": "Renovation Balance",
			"Current": "58468745.23",
			"Criteria": "PASS"
		}, {
			"Mortgage Loan Criteria (Renovation Mortgage Loans)": "Undrawn Construction Advance Amount Held in Escrow",
			"Current": "21.24",
			"Criteria": "40.0% max"
		}, {
			"Mortgage Loan Criteria (Renovation Mortgage Loans)": "Loan to As Repaired Value",
			"Current": "PASS",
			"Criteria": "80% max"
		}, {
			"Mortgage Loan Criteria (Renovation Mortgage Loans)": "  Weighted Average",
			"Current": "6338.58",
			"Criteria": "70.0% max"
		}, {
			"Mortgage Loan Criteria (Renovation Mortgage Loans)": "Loan to Cost Ratio",
			"Current": "PASS",
			"Criteria": "95% max"
		}, {
			"Mortgage Loan Criteria (Renovation Mortgage Loans)": "  > 90% LTC",
			"Current": "2.61",
			"Criteria": "3.5% max"
		}, {
			"Mortgage Loan Criteria (Renovation Mortgage Loans)": "  Weighted Average",
			"Current": "85.21",
			"Criteria": "87.0% max"
		}, {
			"Mortgage Loan Criteria (Renovation Mortgage Loans)": "Exposure to New Customers",
			"Current": "16.95",
			"Criteria": "25.0% max"
		}, {
			"Mortgage Loan Criteria (Renovation Mortgage Loans)": "Ground-Up Construction Loans",
			"Current": "16.29",
			"Criteria": "25.0% max"
		}],
		[{
			"Mortgage Loan Criteria (Rental Mortgage Loans)": "Rental Balance",
			"Current": "37858133.75",
			"Criteria": "PASS"
		}, {
			"Mortgage Loan Criteria (Rental Mortgage Loans)": "DSCR",
			"Current": "1.57",
			"Criteria": "1.25 min"
		}, {
			"Mortgage Loan Criteria (Rental Mortgage Loans)": "Lease Status",
			"Current": "24.30",
			"Criteria": "30.0% max"
		}, {
			"Mortgage Loan Criteria (Rental Mortgage Loans)": "Loan to Value Ratio",
			"Current": "PASS",
			"Criteria": "80.0% max"
		}, {
			"Mortgage Loan Criteria (Rental Mortgage Loans)": "  Weighted Average",
			"Current": "69.91",
			"Criteria": "75.0% max"
		}]
	]
}, {
	"id": "37bd8ffc-638b-490f-8e72-94e92c0ef02e",
	"content": "PrePaymentsAndDefaultRates",
	"data": [{
		"Constant Prepayments Rates (CPR)": "Current(%)",
		"June": "47.94",
		"July": "0.00",
		"August": "0.00",
		"September": "",
		"October": "",
		"November": "",
		"December": "",
		"January": "",
		"February": "",
		"March": "",
		"April": "",
		"May": ""
	}, {
		"Constant Prepayments Rates (CPR)": "Last 3-Month(%)",
		"June": "",
		"July": "",
		"August": "0.96",
		"September": "",
		"October": "",
		"November": "",
		"December": "",
		"January": "",
		"February": "",
		"March": "",
		"April": "",
		"May": ""
	}, {
		"Constant Prepayments Rates (CPR)": "Since Cut-Off(%)",
		"June": "47.94",
		"July": "27.52",
		"August": "19.24",
		"September": "",
		"October": "",
		"November": "",
		"December": "",
		"January": "",
		"February": "",
		"March": "",
		"April": "",
		"May": ""
	}, {
		"Constant Default Rates (CDR)*": "Current(%)",
		"June": "0.00",
		"July": "0.00",
		"August": "0.00",
		"September": "",
		"October": "",
		"November": "",
		"December": "",
		"January": "",
		"February": "",
		"March": "",
		"April": "",
		"May": ""
	}, {
		"Constant Default Rates (CDR)*": "Last 3-Month(%)",
		"June": "",
		"July": "",
		"August": "0.00",
		"September": "",
		"October": "",
		"November": "",
		"December": "",
		"January": "",
		"February": "",
		"March": "",
		"April": "",
		"May": ""
	}, {
		"Constant Default Rates (CDR)*": "Since Cut-Off(%)",
		"June": "0.00",
		"July": "0.00",
		"August": "0.00",
		"September": "",
		"October": "",
		"November": "",
		"December": "",
		"January": "",
		"February": "",
		"March": "",
		"April": "",
		"May": ""
	}]
}, {
	"id": "2da75c10-b1dc-4f82-a7f1-c7cdf0993360",
	"content": "AcquisitionCriteria",
	"data": [
		[{
			"Additional Mortgage Loan Criteria (Entire Pool)": "Pool Balance",
			"Current": "99077921.69",
			"Criteria": "PASS"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Mortgage Loans not conforming to Underwriting Guidelines",
			"Current": "0.00",
			"Criteria": "10.0% max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "% Rental Mortgage Loans by Pool Balance",
			"Current": "38.0",
			"Criteria": "40.0% max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Unpaid Principal Balance",
			"Current": "PASS",
			"Criteria": "300000.00 max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "  per Single Family Mortgaged Property",
			"Current": "PASS",
			"Criteria": "2500000.00 max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "  Single Family",
			"Current": "PASS",
			"Criteria": "5000000.00 max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "   Multi-Family",
			"Current": "PASS",
			"Criteria": "5000000.00 max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Average Unpaid Principal Balance of 1-4 Family Mortgage Loans",
			"Current": "171642.74",
			"Criteria": "300000.00 max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Average Unpaid Principal Balance of Multifamily Mortgage Loans",
			"Current": "1392653.15",
			"Criteria": "2500000.00 max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "% Aggregate Unpaid Principal Balance of Multifamily Mortgage Loans",
			"Current": "4.2",
			"Criteria": "15.0% max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Credit Score",
			"Current": "PASS",
			"Criteria": "600 min"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "  Weighted Average",
			"Current": "726",
			"Criteria": "700 min"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "  Score between 600-625",
			"Current": "1.2",
			"Criteria": "2.0% max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Mortgage Interest Rate",
			"Current": "PASS",
			"Criteria": "4.5% min"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "  Weighted Average",
			"Current": "7.8",
			"Criteria": "7.5% min"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Loans to Foreign Nationals or Legal Entities Without FICO Scores",
			"Current": "0.0",
			"Criteria": "2.0% max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Exposure to single Primary Guarantor",
			"Current": "3.4",
			"Criteria": "5.0% max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Adjustable-Rate Loans",
			"Current": "Not calculated",
			"Criteria": "30.0% max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Hybrid Adjustable-Rate Mortgage Loans",
			"Current": "Not calculated",
			"Criteria": "Not shorter than 5/1"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Cash-Out Refinance",
			"Current": "Not calculated",
			"Criteria": "45.0% max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Maximum Single Geographic Concentration",
			"Current": "9.5",
			"Criteria": "15.0% max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "30+ Days Delinquent",
			"Current": "PASS",
			"Criteria": "Not Permitted"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Interest Coverage Test",
			"Current": "1.64",
			"Criteria": "1.25 min"
		}],
		[{
			"Mortgage Loan Criteria (Renovation Mortgage Loans)": "Renovation Balance",
			"Current": "58468745.23",
			"Criteria": "PASS"
		}, {
			"Mortgage Loan Criteria (Renovation Mortgage Loans)": "Undrawn Construction Advance Amount Held in Escrow",
			"Current": "21.24",
			"Criteria": "40.0% max"
		}, {
			"Mortgage Loan Criteria (Renovation Mortgage Loans)": "Loan to As Repaired Value",
			"Current": "PASS",
			"Criteria": "80% max"
		}, {
			"Mortgage Loan Criteria (Renovation Mortgage Loans)": "  Weighted Average",
			"Current": "6338.58",
			"Criteria": "70.0% max"
		}, {
			"Mortgage Loan Criteria (Renovation Mortgage Loans)": "Loan to Cost Ratio",
			"Current": "PASS",
			"Criteria": "95% max"
		}, {
			"Mortgage Loan Criteria (Renovation Mortgage Loans)": "  > 90% LTC",
			"Current": "2.61",
			"Criteria": "3.5% max"
		}, {
			"Mortgage Loan Criteria (Renovation Mortgage Loans)": "  Weighted Average",
			"Current": "85.21",
			"Criteria": "87.0% max"
		}, {
			"Mortgage Loan Criteria (Renovation Mortgage Loans)": "Exposure to New Customers",
			"Current": "16.95",
			"Criteria": "25.0% max"
		}, {
			"Mortgage Loan Criteria (Renovation Mortgage Loans)": "Ground-Up Construction Loans",
			"Current": "16.29",
			"Criteria": "25.0% max"
		}],
		[{
			"Mortgage Loan Criteria (Rental Mortgage Loans)": "Rental Balance",
			"Current": "37858133.75",
			"Criteria": "PASS"
		}, {
			"Mortgage Loan Criteria (Rental Mortgage Loans)": "DSCR",
			"Current": "1.57",
			"Criteria": "1.25 min"
		}, {
			"Mortgage Loan Criteria (Rental Mortgage Loans)": "Lease Status",
			"Current": "24.30",
			"Criteria": "30.0% max"
		}, {
			"Mortgage Loan Criteria (Rental Mortgage Loans)": "Loan to Value Ratio",
			"Current": "PASS",
			"Criteria": "80.0% max"
		}, {
			"Mortgage Loan Criteria (Rental Mortgage Loans)": "  Weighted Average",
			"Current": "69.91",
			"Criteria": "75.0% max"
		}]
	]
}, {
	"id": "83d3c1b8-f853-42e3-8459-da4d0c9f3b27",
	"content": "DealFeesAndExpenses",
	"data": [{
		"Type": "Servicing Fee",
		"BeginningUnpaid": "0.00",
		"CurrentDue": "34120.18",
		"TotalDue": "34120.18",
		"RemainingCap": "",
		"AmountPayable": "",
		"TotalPaid": "34120.18",
		"EndingUnpaid": "0.00"
	}, {
		"Type": "Backup Servicing Fee",
		"BeginningUnpaid": "0.00",
		"CurrentDue": "1000.00",
		"TotalDue": "1000.00",
		"RemainingCap": "",
		"AmountPayable": "",
		"TotalPaid": "1000.00",
		"EndingUnpaid": "0.00"
	}, {
		"Type": "Document Custodian Fee",
		"BeginningUnpaid": "0.00",
		"CurrentDue": "300.00",
		"TotalDue": "300.00",
		"RemainingCap": "",
		"AmountPayable": "",
		"TotalPaid": "300.00",
		"EndingUnpaid": "0.00"
	}, {
		"Type": "Paying Agent Fee",
		"BeginningUnpaid": "0.00",
		"CurrentDue": "2500.00",
		"TotalDue": "2500.00",
		"RemainingCap": "",
		"AmountPayable": "",
		"TotalPaid": "2500.00",
		"EndingUnpaid": "0.00"
	}, {
		"Type": "Indenture Trustee Fee",
		"BeginningUnpaid": "0.00",
		"CurrentDue": "0.00",
		"TotalDue": "0.00",
		"RemainingCap": "",
		"AmountPayable": "",
		"TotalPaid": "0.00",
		"EndingUnpaid": "0.00"
	}, {
		"Type": "Total:",
		"BeginningUnpaid": "0.00",
		"CurrentDue": "37920.18",
		"TotalDue": "37920.18",
		"RemainingCap": "",
		"AmountPayable": "",
		"TotalPaid": "37920.18",
		"EndingUnpaid": "0.00"
	}, {
		"Type": "Servicing expenses:",
		"BeginningUnpaid": "0.00",
		"CurrentDue": "0.00",
		"TotalDue": "0.00",
		"RemainingCap": "75000.00",
		"AmountPayable": "0.00",
		"TotalPaid": "0.00",
		"EndingUnpaid": "0.00"
	}, {
		"Type": "Backup Servicing expenses:",
		"BeginningUnpaid": "0.00",
		"CurrentDue": "0.00",
		"TotalDue": "0.00",
		"RemainingCap": "5000.00",
		"AmountPayable": "0.00",
		"TotalPaid": "0.00",
		"EndingUnpaid": "0.00"
	}, {
		"Type": "Document Custodian expenses:",
		"BeginningUnpaid": "0.00",
		"CurrentDue": "0.00",
		"TotalDue": "0.00",
		"RemainingCap": "50000.00",
		"AmountPayable": "0.00",
		"TotalPaid": "0.00",
		"EndingUnpaid": "0.00"
	}, {
		"Type": "Paying Agent & Indenture Trustee expenses:",
		"BeginningUnpaid": "0.00",
		"CurrentDue": "0.00",
		"TotalDue": "0.00",
		"RemainingCap": "150000.00",
		"AmountPayable": "0.00",
		"TotalPaid": "0.00",
		"EndingUnpaid": "0.00"
	}, {
		"Type": "Total:",
		"BeginningUnpaid": "0.00",
		"CurrentDue": "0.00",
		"TotalDue": "0.00",
		"RemainingCap": "280000.00",
		"AmountPayable": "0.00",
		"TotalPaid": "0.00",
		"EndingUnpaid": "0.00"
	}]
}, {
	"id": "52e00281-0cf0-4bb9-8dc6-244466bbe4e7",
	"content": "AcquisitionCriteria",
	"data": [
		[{
			"Additional Mortgage Loan Criteria (Entire Pool)": "Pool Balance",
			"Current": "99077921.69",
			"Criteria": "PASS"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Mortgage Loans not conforming to Underwriting Guidelines",
			"Current": "0.00",
			"Criteria": "10.0% max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "% Rental Mortgage Loans by Pool Balance",
			"Current": "38.0",
			"Criteria": "40.0% max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Unpaid Principal Balance",
			"Current": "PASS",
			"Criteria": "300000.00 max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "  per Single Family Mortgaged Property",
			"Current": "PASS",
			"Criteria": "2500000.00 max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "  Single Family",
			"Current": "PASS",
			"Criteria": "5000000.00 max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "   Multi-Family",
			"Current": "PASS",
			"Criteria": "5000000.00 max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Average Unpaid Principal Balance of 1-4 Family Mortgage Loans",
			"Current": "171642.74",
			"Criteria": "300000.00 max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Average Unpaid Principal Balance of Multifamily Mortgage Loans",
			"Current": "1392653.15",
			"Criteria": "2500000.00 max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "% Aggregate Unpaid Principal Balance of Multifamily Mortgage Loans",
			"Current": "4.2",
			"Criteria": "15.0% max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Credit Score",
			"Current": "PASS",
			"Criteria": "600 min"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "  Weighted Average",
			"Current": "726",
			"Criteria": "700 min"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "  Score between 600-625",
			"Current": "1.2",
			"Criteria": "2.0% max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Mortgage Interest Rate",
			"Current": "PASS",
			"Criteria": "4.5% min"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "  Weighted Average",
			"Current": "7.8",
			"Criteria": "7.5% min"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Loans to Foreign Nationals or Legal Entities Without FICO Scores",
			"Current": "0.0",
			"Criteria": "2.0% max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Exposure to single Primary Guarantor",
			"Current": "3.4",
			"Criteria": "5.0% max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Adjustable-Rate Loans",
			"Current": "Not calculated",
			"Criteria": "30.0% max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Hybrid Adjustable-Rate Mortgage Loans",
			"Current": "Not calculated",
			"Criteria": "Not shorter than 5/1"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Cash-Out Refinance",
			"Current": "Not calculated",
			"Criteria": "45.0% max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Maximum Single Geographic Concentration",
			"Current": "9.5",
			"Criteria": "15.0% max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "30+ Days Delinquent",
			"Current": "PASS",
			"Criteria": "Not Permitted"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Interest Coverage Test",
			"Current": "1.64",
			"Criteria": "1.25 min"
		}],
		[{
			"Mortgage Loan Criteria (Renovation Mortgage Loans)": "Renovation Balance",
			"Current": "58468745.23",
			"Criteria": "PASS"
		}, {
			"Mortgage Loan Criteria (Renovation Mortgage Loans)": "Undrawn Construction Advance Amount Held in Escrow",
			"Current": "21.24",
			"Criteria": "40.0% max"
		}, {
			"Mortgage Loan Criteria (Renovation Mortgage Loans)": "Loan to As Repaired Value",
			"Current": "PASS",
			"Criteria": "80% max"
		}, {
			"Mortgage Loan Criteria (Renovation Mortgage Loans)": "  Weighted Average",
			"Current": "6338.58",
			"Criteria": "70.0% max"
		}, {
			"Mortgage Loan Criteria (Renovation Mortgage Loans)": "Loan to Cost Ratio",
			"Current": "PASS",
			"Criteria": "95% max"
		}, {
			"Mortgage Loan Criteria (Renovation Mortgage Loans)": "  > 90% LTC",
			"Current": "2.61",
			"Criteria": "3.5% max"
		}, {
			"Mortgage Loan Criteria (Renovation Mortgage Loans)": "  Weighted Average",
			"Current": "85.21",
			"Criteria": "87.0% max"
		}, {
			"Mortgage Loan Criteria (Renovation Mortgage Loans)": "Exposure to New Customers",
			"Current": "16.95",
			"Criteria": "25.0% max"
		}, {
			"Mortgage Loan Criteria (Renovation Mortgage Loans)": "Ground-Up Construction Loans",
			"Current": "16.29",
			"Criteria": "25.0% max"
		}],
		[{
			"Mortgage Loan Criteria (Rental Mortgage Loans)": "Rental Balance",
			"Current": "37858133.75",
			"Criteria": "PASS"
		}, {
			"Mortgage Loan Criteria (Rental Mortgage Loans)": "DSCR",
			"Current": "1.57",
			"Criteria": "1.25 min"
		}, {
			"Mortgage Loan Criteria (Rental Mortgage Loans)": "Lease Status",
			"Current": "24.30",
			"Criteria": "30.0% max"
		}, {
			"Mortgage Loan Criteria (Rental Mortgage Loans)": "Loan to Value Ratio",
			"Current": "PASS",
			"Criteria": "80.0% max"
		}, {
			"Mortgage Loan Criteria (Rental Mortgage Loans)": "  Weighted Average",
			"Current": "69.91",
			"Criteria": "75.0% max"
		}]
	]
}, {
	"id": "6bc284a7-dd41-470f-9d49-f3bc3a70cbab",
	"content": "DealEvents",
	"data": [{
		"key": "DEAL EVENTS",
		"value1": "",
		"value2": "",
		"value3": ""
	}, {
		"key": "Is Revolving Period?",
		"value1": "TRUE",
		"value2": "",
		"value3": ""
	}, {
		"key": "Is Amortization Event?",
		"value1": "FALSE",
		"value2": "",
		"value3": ""
	}, {
		"key": "Is Trigger Event?",
		"value1": "FALSE",
		"value2": "",
		"value3": ""
	}, {
		"key": "",
		"value1": "Current Month",
		"value2": "Previous Month",
		"value3": "Previous 2 Months"
	}, {
		"key": "Current Trigger",
		"value1": "FALSE",
		"value2": "FALSE",
		"value3": "FALSE"
	}, {
		"key": "Is Event of Default?",
		"value1": "FALSE",
		"value2": "",
		"value3": ""
	}, {
		"key": "Is Servicer Default?",
		"value1": "FALSE",
		"value2": "",
		"value3": ""
	}, {
		"key": "Deficiency Cure Payment Amount",
		"value1": "0.00",
		"value2": "",
		"value3": ""
	}, {
		"key": "Effective Advance Rate",
		"value1": "65.60%",
		"value2": "Pass",
		"value3": ""
	}, {
		"key": "Numerator",
		"value1": "65000000.00",
		"value2": "",
		"value3": ""
	}, {
		"key": "Denominator",
		"value1": "99077921.69",
		"value2": "",
		"value3": ""
	}, {
		"key": "Maximum Trigger Level",
		"value1": "70.0%",
		"value2": "",
		"value3": ""
	}, {
		"key": "UPB < 60 days delinquent excluding non-extension modifications",
		"value1": "79014194.61",
		"value2": "",
		"value3": ""
	}]
}, {
	"id": "64061819-bd38-42dc-9610-1d617492ea29",
	"content": "AcquisitionCriteria",
	"data": [
		[{
			"Additional Mortgage Loan Criteria (Entire Pool)": "Pool Balance",
			"Current": "99077921.69",
			"Criteria": "PASS"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Mortgage Loans not conforming to Underwriting Guidelines",
			"Current": "0.00",
			"Criteria": "10.0% max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "% Rental Mortgage Loans by Pool Balance",
			"Current": "38.0",
			"Criteria": "40.0% max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Unpaid Principal Balance",
			"Current": "PASS",
			"Criteria": "300000.00 max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "  per Single Family Mortgaged Property",
			"Current": "PASS",
			"Criteria": "2500000.00 max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "  Single Family",
			"Current": "PASS",
			"Criteria": "5000000.00 max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "   Multi-Family",
			"Current": "PASS",
			"Criteria": "5000000.00 max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Average Unpaid Principal Balance of 1-4 Family Mortgage Loans",
			"Current": "171642.74",
			"Criteria": "300000.00 max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Average Unpaid Principal Balance of Multifamily Mortgage Loans",
			"Current": "1392653.15",
			"Criteria": "2500000.00 max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "% Aggregate Unpaid Principal Balance of Multifamily Mortgage Loans",
			"Current": "4.2",
			"Criteria": "15.0% max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Credit Score",
			"Current": "PASS",
			"Criteria": "600 min"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "  Weighted Average",
			"Current": "726",
			"Criteria": "700 min"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "  Score between 600-625",
			"Current": "1.2",
			"Criteria": "2.0% max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Mortgage Interest Rate",
			"Current": "PASS",
			"Criteria": "4.5% min"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "  Weighted Average",
			"Current": "7.8",
			"Criteria": "7.5% min"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Loans to Foreign Nationals or Legal Entities Without FICO Scores",
			"Current": "0.0",
			"Criteria": "2.0% max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Exposure to single Primary Guarantor",
			"Current": "3.4",
			"Criteria": "5.0% max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Adjustable-Rate Loans",
			"Current": "Not calculated",
			"Criteria": "30.0% max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Hybrid Adjustable-Rate Mortgage Loans",
			"Current": "Not calculated",
			"Criteria": "Not shorter than 5/1"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Cash-Out Refinance",
			"Current": "Not calculated",
			"Criteria": "45.0% max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Maximum Single Geographic Concentration",
			"Current": "9.5",
			"Criteria": "15.0% max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "30+ Days Delinquent",
			"Current": "PASS",
			"Criteria": "Not Permitted"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Interest Coverage Test",
			"Current": "1.64",
			"Criteria": "1.25 min"
		}],
		[{
			"Mortgage Loan Criteria (Renovation Mortgage Loans)": "Renovation Balance",
			"Current": "58468745.23",
			"Criteria": "PASS"
		}, {
			"Mortgage Loan Criteria (Renovation Mortgage Loans)": "Undrawn Construction Advance Amount Held in Escrow",
			"Current": "21.24",
			"Criteria": "40.0% max"
		}, {
			"Mortgage Loan Criteria (Renovation Mortgage Loans)": "Loan to As Repaired Value",
			"Current": "PASS",
			"Criteria": "80% max"
		}, {
			"Mortgage Loan Criteria (Renovation Mortgage Loans)": "  Weighted Average",
			"Current": "6338.58",
			"Criteria": "70.0% max"
		}, {
			"Mortgage Loan Criteria (Renovation Mortgage Loans)": "Loan to Cost Ratio",
			"Current": "PASS",
			"Criteria": "95% max"
		}, {
			"Mortgage Loan Criteria (Renovation Mortgage Loans)": "  > 90% LTC",
			"Current": "2.61",
			"Criteria": "3.5% max"
		}, {
			"Mortgage Loan Criteria (Renovation Mortgage Loans)": "  Weighted Average",
			"Current": "85.21",
			"Criteria": "87.0% max"
		}, {
			"Mortgage Loan Criteria (Renovation Mortgage Loans)": "Exposure to New Customers",
			"Current": "16.95",
			"Criteria": "25.0% max"
		}, {
			"Mortgage Loan Criteria (Renovation Mortgage Loans)": "Ground-Up Construction Loans",
			"Current": "16.29",
			"Criteria": "25.0% max"
		}],
		[{
			"Mortgage Loan Criteria (Rental Mortgage Loans)": "Rental Balance",
			"Current": "37858133.75",
			"Criteria": "PASS"
		}, {
			"Mortgage Loan Criteria (Rental Mortgage Loans)": "DSCR",
			"Current": "1.57",
			"Criteria": "1.25 min"
		}, {
			"Mortgage Loan Criteria (Rental Mortgage Loans)": "Lease Status",
			"Current": "24.30",
			"Criteria": "30.0% max"
		}, {
			"Mortgage Loan Criteria (Rental Mortgage Loans)": "Loan to Value Ratio",
			"Current": "PASS",
			"Criteria": "80.0% max"
		}, {
			"Mortgage Loan Criteria (Rental Mortgage Loans)": "  Weighted Average",
			"Current": "69.91",
			"Criteria": "75.0% max"
		}]
	]
}, {
	"id": "cfda0a64-e128-42d5-a97e-a3342e0a9567",
	"content": "PriorityOfPayments",
	"data": [{
		"Key": "Beginning Transaction Account Balance",
		"AvailableFunds": "4454080.32",
		"AmountOwed": "",
		"Adjustment": "",
		"AdjustmentType": "",
		"AmountPaid": ""
	}, {
		"Key": "(1) to the  transaction parties (pro rata)",
		"AvailableFunds": "",
		"AmountOwed": "",
		"Adjustment": "",
		"AdjustmentType": "",
		"AmountPaid": ""
	}, {
		"Key": "(i) the Indenture Trustee Fee, the Paying Agent Fee, the Document Custodian Fee and the Back-Up Servicing Fee",
		"AvailableFunds": "4454080.32",
		"AmountOwed": "3800.00",
		"Adjustment": "",
		"AdjustmentType": "",
		"AmountPaid": "3800.00"
	}, {
		"Key": "(ii) any related expenses and indemnification amounts reimbursed to such parties (subject to cap)",
		"AvailableFunds": "4450280.32",
		"AmountOwed": "0.00",
		"Adjustment": "205000.00",
		"AdjustmentType": "CAP",
		"AmountPaid": "0.00"
	}, {
		"Key": "(2) to the Servicer,",
		"AvailableFunds": "",
		"AmountOwed": "",
		"Adjustment": "",
		"AdjustmentType": "",
		"AmountPaid": ""
	}, {
		"Key": "(i) unreimbursed Protection Advances",
		"AvailableFunds": "4450280.32",
		"AmountOwed": "0.00",
		"Adjustment": "",
		"AdjustmentType": "",
		"AmountPaid": "0.00"
	}, {
		"Key": "(ii) any other expenses, costs and liabilities on behalf of, and reimbursable to, the Servicer (subject to cap)",
		"AvailableFunds": "4450280.32",
		"AmountOwed": "0.00",
		"Adjustment": "75000.00",
		"AdjustmentType": "CAP",
		"AmountPaid": "0.00"
	}, {
		"Key": "(3) to the Servicer, the Servicer Fee",
		"AvailableFunds": "4450280.32",
		"AmountOwed": "34120.18",
		"Adjustment": "",
		"AdjustmentType": "",
		"AmountPaid": "34120.18"
	}, {
		"Key": "(4) to the Noteholders, (i) the Note Interest Payment Amount and (ii) any prior interest shortfalls and interest thereon",
		"AvailableFunds": "4416160.14",
		"AmountOwed": "286541.67",
		"Adjustment": "",
		"AdjustmentType": "",
		"AmountPaid": "286541.67"
	}, {
		"Key": "(5) to the Construction Draw Account (while no Amortization Event; discretionary amount subject to cap)",
		"AvailableFunds": "4129618.48",
		"AmountOwed": "0.00",
		"Adjustment": "4740851.68",
		"AdjustmentType": "CAP",
		"AmountPaid": "0.00"
	}, {
		"Key": "(6) to pay principal on the Notes (subject to cure cap during the Revolving Period)",
		"AvailableFunds": "4129618.48",
		"AmountOwed": "0.00",
		"Adjustment": "0.00",
		"AdjustmentType": "CURE",
		"AmountPaid": "0.00"
	}, {
		"Key": "(7) to the Additional Loan Account (during the Revolving Period subject to floor)",
		"AvailableFunds": "4129618.48",
		"AmountOwed": "2446818.45",
		"Adjustment": "",
		"AdjustmentType": "",
		"AmountPaid": "2446818.45"
	}, {
		"Key": "(8) to the Servicer, any unreimbursed Optional Advances, and ",
		"AvailableFunds": "1682800.03",
		"AmountOwed": "0.00",
		"Adjustment": "",
		"AdjustmentType": "",
		"AmountPaid": "0.00"
	}, {
		"Key": "(9) pro rata, any amounts not reimbursed under (1)(ii) as a result of the cap or, in the case of the Servicer, priority second above",
		"AvailableFunds": "1682800.03",
		"AmountOwed": "0.00",
		"Adjustment": "",
		"AdjustmentType": "",
		"AmountPaid": "0.00"
	}, {
		"Key": "(10) any remaining amounts will be distributed at the direction of the Issuer",
		"AvailableFunds": "1682800.03",
		"AmountOwed": "1682800.03",
		"Adjustment": "",
		"AdjustmentType": "",
		"AmountPaid": "1682800.03"
	}, {
		"Key": "Ending Transaction Account Balance",
		"AvailableFunds": "0.00",
		"AmountOwed": "",
		"Adjustment": "",
		"AdjustmentType": "",
		"AmountPaid": "0.00"
	}]
}, {
	"id": "2516d41e-a8d2-49ad-bc44-742a89e413b2",
	"content": "AcquisitionCriteria",
	"data": [
		[{
			"Additional Mortgage Loan Criteria (Entire Pool)": "Pool Balance",
			"Current": "99077921.69",
			"Criteria": "PASS"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Mortgage Loans not conforming to Underwriting Guidelines",
			"Current": "0.00",
			"Criteria": "10.0% max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "% Rental Mortgage Loans by Pool Balance",
			"Current": "38.0",
			"Criteria": "40.0% max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Unpaid Principal Balance",
			"Current": "PASS",
			"Criteria": "300000.00 max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "  per Single Family Mortgaged Property",
			"Current": "PASS",
			"Criteria": "2500000.00 max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "  Single Family",
			"Current": "PASS",
			"Criteria": "5000000.00 max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "   Multi-Family",
			"Current": "PASS",
			"Criteria": "5000000.00 max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Average Unpaid Principal Balance of 1-4 Family Mortgage Loans",
			"Current": "171642.74",
			"Criteria": "300000.00 max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Average Unpaid Principal Balance of Multifamily Mortgage Loans",
			"Current": "1392653.15",
			"Criteria": "2500000.00 max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "% Aggregate Unpaid Principal Balance of Multifamily Mortgage Loans",
			"Current": "4.2",
			"Criteria": "15.0% max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Credit Score",
			"Current": "PASS",
			"Criteria": "600 min"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "  Weighted Average",
			"Current": "726",
			"Criteria": "700 min"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "  Score between 600-625",
			"Current": "1.2",
			"Criteria": "2.0% max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Mortgage Interest Rate",
			"Current": "PASS",
			"Criteria": "4.5% min"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "  Weighted Average",
			"Current": "7.8",
			"Criteria": "7.5% min"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Loans to Foreign Nationals or Legal Entities Without FICO Scores",
			"Current": "0.0",
			"Criteria": "2.0% max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Exposure to single Primary Guarantor",
			"Current": "3.4",
			"Criteria": "5.0% max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Adjustable-Rate Loans",
			"Current": "Not calculated",
			"Criteria": "30.0% max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Hybrid Adjustable-Rate Mortgage Loans",
			"Current": "Not calculated",
			"Criteria": "Not shorter than 5/1"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Cash-Out Refinance",
			"Current": "Not calculated",
			"Criteria": "45.0% max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Maximum Single Geographic Concentration",
			"Current": "9.5",
			"Criteria": "15.0% max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "30+ Days Delinquent",
			"Current": "PASS",
			"Criteria": "Not Permitted"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Interest Coverage Test",
			"Current": "1.64",
			"Criteria": "1.25 min"
		}],
		[{
			"Mortgage Loan Criteria (Renovation Mortgage Loans)": "Renovation Balance",
			"Current": "58468745.23",
			"Criteria": "PASS"
		}, {
			"Mortgage Loan Criteria (Renovation Mortgage Loans)": "Undrawn Construction Advance Amount Held in Escrow",
			"Current": "21.24",
			"Criteria": "40.0% max"
		}, {
			"Mortgage Loan Criteria (Renovation Mortgage Loans)": "Loan to As Repaired Value",
			"Current": "PASS",
			"Criteria": "80% max"
		}, {
			"Mortgage Loan Criteria (Renovation Mortgage Loans)": "  Weighted Average",
			"Current": "6338.58",
			"Criteria": "70.0% max"
		}, {
			"Mortgage Loan Criteria (Renovation Mortgage Loans)": "Loan to Cost Ratio",
			"Current": "PASS",
			"Criteria": "95% max"
		}, {
			"Mortgage Loan Criteria (Renovation Mortgage Loans)": "  > 90% LTC",
			"Current": "2.61",
			"Criteria": "3.5% max"
		}, {
			"Mortgage Loan Criteria (Renovation Mortgage Loans)": "  Weighted Average",
			"Current": "85.21",
			"Criteria": "87.0% max"
		}, {
			"Mortgage Loan Criteria (Renovation Mortgage Loans)": "Exposure to New Customers",
			"Current": "16.95",
			"Criteria": "25.0% max"
		}, {
			"Mortgage Loan Criteria (Renovation Mortgage Loans)": "Ground-Up Construction Loans",
			"Current": "16.29",
			"Criteria": "25.0% max"
		}],
		[{
			"Mortgage Loan Criteria (Rental Mortgage Loans)": "Rental Balance",
			"Current": "37858133.75",
			"Criteria": "PASS"
		}, {
			"Mortgage Loan Criteria (Rental Mortgage Loans)": "DSCR",
			"Current": "1.57",
			"Criteria": "1.25 min"
		}, {
			"Mortgage Loan Criteria (Rental Mortgage Loans)": "Lease Status",
			"Current": "24.30",
			"Criteria": "30.0% max"
		}, {
			"Mortgage Loan Criteria (Rental Mortgage Loans)": "Loan to Value Ratio",
			"Current": "PASS",
			"Criteria": "80.0% max"
		}, {
			"Mortgage Loan Criteria (Rental Mortgage Loans)": "  Weighted Average",
			"Current": "69.91",
			"Criteria": "75.0% max"
		}]
	]
}, {
	"id": "724ab70c-16bc-4389-b140-bd41120d93c2",
	"content": "CurrentPeriodModificationDetails",
	"data": [{
		"Loan ID": "102366",
		"Unpaid Principal Balance": "244985.89",
		"Pre-Modification": "01/09/2020",
		"Post-Modification": "01/12/2020",
		"Modification Type": "Extension"
	}, {
		"Loan ID": "102303",
		"Unpaid Principal Balance": "310771.54",
		"Pre-Modification": "01/09/2020",
		"Post-Modification": "01/12/2020",
		"Modification Type": "Extension"
	}, {
		"Loan ID": "102274",
		"Unpaid Principal Balance": "92250",
		"Pre-Modification": "01/09/2020",
		"Post-Modification": "01/12/2020",
		"Modification Type": "Extension"
	}, {
		"Loan ID": "104722",
		"Unpaid Principal Balance": "107599.35",
		"Pre-Modification": "01/02/2021",
		"Post-Modification": "01/06/2050",
		"Modification Type": "Extension"
	}, {
		"Loan ID": "105297",
		"Unpaid Principal Balance": "91971",
		"Pre-Modification": "01/02/2021",
		"Post-Modification": "01/06/2050",
		"Modification Type": "Extension"
	}]
}, {
	"id": "e2d46c89-9d91-41a4-bcbe-52044a1a4fb8",
	"content": "AcquisitionCriteria",
	"data": [
		[{
			"Additional Mortgage Loan Criteria (Entire Pool)": "Pool Balance",
			"Current": "99077921.69",
			"Criteria": "PASS"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Mortgage Loans not conforming to Underwriting Guidelines",
			"Current": "0.00",
			"Criteria": "10.0% max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "% Rental Mortgage Loans by Pool Balance",
			"Current": "38.0",
			"Criteria": "40.0% max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Unpaid Principal Balance",
			"Current": "PASS",
			"Criteria": "300000.00 max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "  per Single Family Mortgaged Property",
			"Current": "PASS",
			"Criteria": "2500000.00 max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "  Single Family",
			"Current": "PASS",
			"Criteria": "5000000.00 max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "   Multi-Family",
			"Current": "PASS",
			"Criteria": "5000000.00 max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Average Unpaid Principal Balance of 1-4 Family Mortgage Loans",
			"Current": "171642.74",
			"Criteria": "300000.00 max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Average Unpaid Principal Balance of Multifamily Mortgage Loans",
			"Current": "1392653.15",
			"Criteria": "2500000.00 max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "% Aggregate Unpaid Principal Balance of Multifamily Mortgage Loans",
			"Current": "4.2",
			"Criteria": "15.0% max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Credit Score",
			"Current": "PASS",
			"Criteria": "600 min"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "  Weighted Average",
			"Current": "726",
			"Criteria": "700 min"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "  Score between 600-625",
			"Current": "1.2",
			"Criteria": "2.0% max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Mortgage Interest Rate",
			"Current": "PASS",
			"Criteria": "4.5% min"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "  Weighted Average",
			"Current": "7.8",
			"Criteria": "7.5% min"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Loans to Foreign Nationals or Legal Entities Without FICO Scores",
			"Current": "0.0",
			"Criteria": "2.0% max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Exposure to single Primary Guarantor",
			"Current": "3.4",
			"Criteria": "5.0% max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Adjustable-Rate Loans",
			"Current": "Not calculated",
			"Criteria": "30.0% max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Hybrid Adjustable-Rate Mortgage Loans",
			"Current": "Not calculated",
			"Criteria": "Not shorter than 5/1"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Cash-Out Refinance",
			"Current": "Not calculated",
			"Criteria": "45.0% max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Maximum Single Geographic Concentration",
			"Current": "9.5",
			"Criteria": "15.0% max"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "30+ Days Delinquent",
			"Current": "PASS",
			"Criteria": "Not Permitted"
		}, {
			"Additional Mortgage Loan Criteria (Entire Pool)": "Interest Coverage Test",
			"Current": "1.64",
			"Criteria": "1.25 min"
		}],
		[{
			"Mortgage Loan Criteria (Renovation Mortgage Loans)": "Renovation Balance",
			"Current": "58468745.23",
			"Criteria": "PASS"
		}, {
			"Mortgage Loan Criteria (Renovation Mortgage Loans)": "Undrawn Construction Advance Amount Held in Escrow",
			"Current": "21.24",
			"Criteria": "40.0% max"
		}, {
			"Mortgage Loan Criteria (Renovation Mortgage Loans)": "Loan to As Repaired Value",
			"Current": "PASS",
			"Criteria": "80% max"
		}, {
			"Mortgage Loan Criteria (Renovation Mortgage Loans)": "  Weighted Average",
			"Current": "6338.58",
			"Criteria": "70.0% max"
		}, {
			"Mortgage Loan Criteria (Renovation Mortgage Loans)": "Loan to Cost Ratio",
			"Current": "PASS",
			"Criteria": "95% max"
		}, {
			"Mortgage Loan Criteria (Renovation Mortgage Loans)": "  > 90% LTC",
			"Current": "2.61",
			"Criteria": "3.5% max"
		}, {
			"Mortgage Loan Criteria (Renovation Mortgage Loans)": "  Weighted Average",
			"Current": "85.21",
			"Criteria": "87.0% max"
		}, {
			"Mortgage Loan Criteria (Renovation Mortgage Loans)": "Exposure to New Customers",
			"Current": "16.95",
			"Criteria": "25.0% max"
		}, {
			"Mortgage Loan Criteria (Renovation Mortgage Loans)": "Ground-Up Construction Loans",
			"Current": "16.29",
			"Criteria": "25.0% max"
		}],
		[{
			"Mortgage Loan Criteria (Rental Mortgage Loans)": "Rental Balance",
			"Current": "37858133.75",
			"Criteria": "PASS"
		}, {
			"Mortgage Loan Criteria (Rental Mortgage Loans)": "DSCR",
			"Current": "1.57",
			"Criteria": "1.25 min"
		}, {
			"Mortgage Loan Criteria (Rental Mortgage Loans)": "Lease Status",
			"Current": "24.30",
			"Criteria": "30.0% max"
		}, {
			"Mortgage Loan Criteria (Rental Mortgage Loans)": "Loan to Value Ratio",
			"Current": "PASS",
			"Criteria": "80.0% max"
		}, {
			"Mortgage Loan Criteria (Rental Mortgage Loans)": "  Weighted Average",
			"Current": "69.91",
			"Criteria": "75.0% max"
		}]
	]
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

	console.log("columns, setColumns", columns, dealname, month, year, peers, token, DealType)

	// setSaveloader(true);

	let data = {
		dealId: dealname,
		month: month,
		year: year,
		peers: peers,
		
		input: columns,
		channelname: localStorage.getItem('ChannelName'),
	}

	const APIResponse = await SaveCustomizeReportAPI(DealType, data)
	console.log("SaveCustomizeReportAPI", APIResponse.data.isSuccess);

	if (APIResponse.data.isSuccess == true) {
		const message = "Data saved successfully";
		enqueueSnackbar(message, {
			variant: 'info',
			autoHideDuration: 3000,
		});
		setTimeout(() => {
		history.push("/report/" + DealType + "/issuer-view-loan-data-tape/monthly-trustee-report/"+ dealname + "/" + month + "/" + year);

			// history.push("/report/" + DealType + "/view-loan-data-tape/monthly-trustee-report/" + dealname + "/" + month + "/" + year);
		}, 2000);
	} else {
		enqueueSnackbar('Data not saved');
	}
	// setSaveloader(true);


}

// function SaveCustomizeReport(columns, dealname, month,year,peers,token){

//   console.log("columns, setColumns",columns, dealname, month,year,peers,token)
// }


function showHidePage(data, columnId, columns, setColumns, setItemshow) {
	console.log("columnId", columnId)
	// console.log("columnId", columns)
	// console.log("Data", Object.keys(columns).length)  
	// let count = Object.keys(columns).length + 1;

	// var showHidePageId = Object.fromEntries(Object.entries(columns).filter(([key, value]) => value.sid == data))

	// columns.cureentShow = columnId;
	// console.log("newdata", columns);

	// const new_obj = { ...obj, name: { first: 'blah', last: 'ha'} }


	// setColumns({  ...columns })
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

	if (props.customization_type == "New") {

		columnsFromBackend = {
			[uuidv4()]: {
				name: "Requested",
				class: "static_table",
				id: "requested_table",
				sid: uuidv4(),
				items: props.customize_data,
				show: "true"
			}
		};

	} else {
		columnsFromBackend = props.customize_data

	}


	const [columns, setColumns] = useState(columnsFromBackend);
	const [itemshow, setItemshow] = useState(currentItemShow);
	const [visualize, setVisualize] = React.useState({ checkedB: true });
	const [popup, setPopup] = React.useState(false);
	const [dealname, setDealname] = useState(props.dealname);
	const [month, setMonth] = useState(props.month);
	const [year, setYear] = useState(props.year);
	const [peers, setPeers] = useState(props.peers);
	const [token, setToken] = useState(props.token);
	const [dealType, setDealType] = useState(props.dealType);
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const [saveloader, setSaveloader] = useState(false);
	// setSaveloader(true);
	const history = useHistory();





	const handleChange = (event) => {
		setVisualize({ ...visualize, [event.target.name]: event.target.checked });
	};


	return (
		<React.Fragment>

			<div className="customize_top">

				<h2 className="float-left">

					{visualize.checkedB == true ? 'Customize Report' : 'Visualize Report'}
				</h2>

				<div className="float-left">

					{props.customization_type == "New" ? '' : ''
						// <div class="alert alert-danger" role="alert">Report Customization available for this deal, month and year. you can update the same.</div>
					}




				</div>


				<div className="float-right">
					<span className="mr-3">
						Visualize Report
          </span>

					<FormControlLabel
						control={
							<Switch
								checked={visualize.checkedB}
								onChange={handleChange}
								name="checkedB"
								color="primary"
							/>
						}
						label="Customize Report"
					/>

					<IconButton variant='outlined' color='primary'><DescriptionOutlinedIcon></DescriptionOutlinedIcon></IconButton>
					<IconButton variant='outlined' onClick={() => showPopup(popup, setPopup)} color='primary'><EventNoteOutlinedIcon></EventNoteOutlinedIcon></IconButton>

					<Button variant='outlined' color='primary'
						onClick={() => SaveCustomizeReport(columns, dealname, month, year, peers, token, dealType, enqueueSnackbar, saveloader, setSaveloader, history)}

					> Save & Next
	
					{saveloader == true ? (
							<CircularProgress size='25px' color='primary' />
						) : (
								''
							)}

					</Button>

					{/* <Button variant='outlined' color='primary'
						onClick={() => SaveCustomizeReportSkip(columns, dealname, month, year, peers, token, dealType, enqueueSnackbar, saveloader, setSaveloader, history)}

					> Skip
	
					{saveloader == true ? (
							<CircularProgress size='25px' color='primary' />
						) : (
								''
							)}

					</Button> */}




				</div>
				<div className="clearfix"></div>
			</div>

			{/* {JSON.stringify(columns)} */}

			{visualize.checkedB == true ?

				<div className="customization_table">



					<DragDropContext
						onDragEnd={result => onDragEnd(result, columns, setColumns)}
					>

						{itemshow == null ?
							<React.Fragment>
								<div id="requested_table2" class="dynamic_table defaulttext">
									{defaultText}
								</div>

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




									{/* {columns.cureentShow == columnId ? '' : ''} */}

									<React.Fragment>
										{/* {JSON.stringify(itemshow+"++++++++"+columnId)} */}
										{/* <p> {column.name} </p> */}
										<Droppable droppableId={columnId} key={columnId}>
											{(provided, snapshot) => {
												return (
													<React.Fragment>


														<div
															{...provided.droppableProps}
															ref={provided.innerRef}
															style={{
																width: "100%",
																minHeight: 300
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
																				<div
																					ref={provided.innerRef}
																					{...provided.draggableProps}
																					{...provided.dragHandleProps}
																					style={{
																						userSelect: "none",
																						padding: 16,
																						margin: "0 0 8px 0",
																						minHeight: "50px",
																						backgroundColor: snapshot.isDragging
																							? "#263B4A"
																							: "#456C86",
																						color: "white",
																						...provided.draggableProps.style
																					}}
																				>


																					{item.content.replace(/([a-z])([A-Z])/g, '$1 $2')}
																					{/* {item.data} */}

																				</div>
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


				:
				<React.Fragment>
					<div className="customization_table">

						{itemshow == null ?
							<React.Fragment>
								<div id="requested_table2" class="dynamic_table defaulttext">
									{defaultText}
								</div>

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
										{/* <p> {column.name} </p> */}
										{column.name == "Requested" ?


											<React.Fragment>
												<div class="alert alert-danger" role="alert">
													Drag Drop widget disabled in visualization mode. <br />

													<FormControlLabel
														control={
															<Switch
																checked={visualize.checkedB}
																onChange={handleChange}
																name="checkedB"
																color="primary"
															/>
														}
														label="Customize Report"
													/>
												</div>


											</React.Fragment>
											:

											''

										}

										<div
											style={{
												width: "100%",
												minHeight: 300
											}}
										>

											{/* {JSON.stringify(column.name)} */}

											{column.items.map((item, index) => {
												return (
													<div>
														{/* {JSON.stringify(item)} */}
														{column.name == "Requested" ?

															<React.Fragment>
																<div role="button" className="text_default">{item.content.replace(/([a-z])([A-Z])/g, '$1 $2')}</div>
															</React.Fragment>
															:

															<React.Fragment>
																<div className="wrapper-pdf-container">

																	{


																		item.content == "PrepaymentsAndDefaultRates" ?

																			<React.Fragment>
																				{dealType == "Saluda PAC1"  ?
																					<PrepaymentsAndDefaultRatesTable month={month} year={year} section_id={item.content} data={item.data} section_title={item.content} ></PrepaymentsAndDefaultRatesTable>
																					
																					:    
																					dealType == "Saluda FIG1"  ?
																					<PrepaymentsAndDefaultRatesTableFig1 month={month} year={year} section_id={item.content} data={item.data} section_title={item.content} ></PrepaymentsAndDefaultRatesTableFig1>
																					:  
																					dealType == "Saluda WL1" ?
                                              
																					<PrepaymentsOtherDealsTableWL1
																					month={month} year={year} section_id={item.content} data={item.data} section_title={item.content} ></PrepaymentsOtherDealsTableWL1>
																					  :
																					dealType == "Saluda FIG2"|| dealType=="Saluda BC1" || dealType=="Saluda BC2"  || dealType=="Saluda Builders" || dealType=="Reigo" || dealType=="Dominion" || dealType == "Saluda SEQ1" || dealType=="NPL" ?
                                              
																					<PrepaymentsOtherDealsTable10Month
																					month={month} year={year} section_id={item.content} data={item.data} section_title={item.content} ></PrepaymentsOtherDealsTable10Month>
																					  :
																					<PrepaymentsOtherDealsTable  month={month} year={year} section_id={item.content} data={item.data} section_title={item.content} ></PrepaymentsOtherDealsTable>
																				 } 

																			</React.Fragment>

																			: item.content == "AccountStatement" ?

																				<React.Fragment>
																					{dealType == "Saluda PAC1" ?
																							<AccountStatementsTableSaludaPacNew section_id={item.content} data={item.data} 	month={month} year={year} section_title={item.content} ></AccountStatementsTableSaludaPacNew>
																							:
																						dealType == "AlphaFlow" || dealType=="Stoa 2021"|| dealType=="Stoa 2022" || dealType=="Palisades" ||dealType=="MFA"?
																							<AccountStatementsAlphaflow section_id={item.content} data={item.data} 	month={month} year={year} section_title={item.content} ></AccountStatementsAlphaflow>

																							:
																							<AccountStatementsTable section_id={item.content} data={item.data} 	month={month} year={year} section_title={item.content} ></AccountStatementsTable>
																					}

																				</React.Fragment>

																				: item.content == "AccountStatements" ?

																					<React.Fragment>
																						
																	{ dealType == "Saluda FIG2" || dealType=="Saluda BC1" || dealType=="Saluda BC2" || dealType=="Saluda Builders"  || dealType=="Reigo" || dealType=="Saluda WL1" || dealType=="Dominion" || dealType=="Saluda RTL1" || dealType=="Saluda MF1" || dealType=="Saluda RTL2"||dealType=="Saluda PRE1"||dealType=="Setpoint" ?
																							<AccountStatementsAlphaflow section_id={item.content} dealType={dealType} data={item.data} 	month={month} year={year} section_title={item.content} ></AccountStatementsAlphaflow>
																							:
																							dealType == "NPL" ?
																							<AccountStatementsNPL section_id={item.content} dealType={dealType} data={item.data} 	month={month} year={year} section_title={item.content} ></AccountStatementsNPL>
																							:
																							dealType == "Saluda FIG2" || dealType == "Spruce Hill" ? 
                                                   
                                                  												<AccountStatementsSprucehill section_id={item.content} dealType={dealType} data={item.data} month={month} year={year} section_title={item.content}></AccountStatementsSprucehill>
                                                  
                                                  											:
																							<AccountStatementsTableSingle section_id={item.content} data={item.data} 	month={month} year={year} section_title={item.content} ></AccountStatementsTableSingle>
																						}
																					</React.Fragment>
																					: item.content == "Details" ?

																						<React.Fragment>
																							<DetailsTable section_id={item.content} data={item.data} 	month={month} year={year} section_title={item.content} ></DetailsTable>
																						</React.Fragment>
																						: item.content == "AccountStatementsForSecuritiesTrust" ?

																							<React.Fragment>
																								<AccountStatementsForSecurityTrust section_id={item.content} data={item.data} 	month={month} year={year} section_title={item.content} ></AccountStatementsForSecurityTrust>
																							</React.Fragment>
																							:
																							item.content == "AccountStatementsForBorrowerTrust" ?

																							<React.Fragment>
																								<AccountStatementsForBorrowerTrust section_id={item.content} data={item.data} 	month={month} year={year} section_title={item.content} ></AccountStatementsForBorrowerTrust>
																							</React.Fragment>
																							:
																							item.content == "DealContactInformation" ?
																								<React.Fragment>
																									<FirstTable section_id={item.content}  data={item.data}	month={month} year={year} section_title={item.content} ></FirstTable>
																								</React.Fragment>
																								:
																								item.content == "AcquisitionCriteria" ?

																									<React.Fragment>
																										<AcquisitionCriteriaTable section_id={item.content} data={item.data} 	month={month} year={year} section_title={item.content} ></AcquisitionCriteriaTable>
																									</React.Fragment>
																									:

																									item.content == "DealEvents" || item.content =="Events / MiscellaneousReporting"?
																										<React.Fragment>
																											{dealType == "AlphaFlow" || dealType == "Saluda FIG2" || dealType=="Saluda BC1" || dealType=="Saluda BC2" || dealType=="Saluda Builders"  || dealType=="Reigo" || dealType=="Saluda WL1" || dealType=="Dominion"|| dealType=="Saluda RTL1" || dealType=="Stoa 2021"|| dealType=="Stoa 2022" || dealType=="Saluda MF1"|| dealType=="Palisades" || dealType=="Saluda RTL2"||dealType=="Saluda PRE1" ||dealType=="MFA"||dealType=="Setpoint" || dealType=="NPL"?
																												<DealEventAlphaflow month={month}
																												year={year} section_id={item.content} data={item.data} section_title={item.content} ></DealEventAlphaflow>
																												:
																												<DealEventTable month={month}
																												year={year} section_id={item.content} data={item.data} section_title={item.content} ></DealEventTable>
																											}
																										</React.Fragment>
																										:
																										item.content == "ConcentrationLimitations" ?
																										<React.Fragment>
																											{dealType=="Reigo" ?
																												<ConcentrationLimitations section_id={item.content} 	month={month} year={year} data={item.data} section_title={item.content} ></ConcentrationLimitations>
																												:
																												<DealEventTable month={month}
																												year={year} section_id={item.content} data={item.data} 	month={month} year={year}section_title={item.content} ></DealEventTable>
																											}
																										</React.Fragment>
																										:

																										item.content == "CollateralPerformance" ?
																											<React.Fragment>
																												{dealType=="Saluda PAC1"|| dealType == "Saluda FIG1" ?
																												<AcquisitionCriteriaTable month={month}
																												year={year} section_id={item.content} data={item.data} 	month={month} year={year} section_title={item.content} ></AcquisitionCriteriaTable>
																											:
																											<Table section_id={item.content} 	month={month} year={year} data={item.data} section_title={item.content} ></Table>
																										 } 
																												</React.Fragment>
																											:

																											item.content == "PriorityOfPayments" ? 
																												<React.Fragment>
																													{dealType=="Spruce Hill" ?
																														<PriorityOfPaymentsSprucehill section_id={item.content} data={item.data} 	month={month} year={year} section_title={item.content} ></PriorityOfPaymentsSprucehill>
																														:
																														<Table section_id={item.content} month={month} year={year} data={item.data} section_title={item.content} ></Table>
																													}
																												</React.Fragment>
																											:
																							
																											<React.Fragment>
																												<Table section_id={item.content} 	month={month} year={year} data={item.data} section_title={item.content} ></Table>
																											</React.Fragment>
																	}

																</div>
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
			}


			<div className="customization_table_pagination">

				<Button variant='outlined' color='primary' onClick={() => increaseCount(1, columns, setColumns)}> <AddIcon></AddIcon> </Button>



				{Object.entries(columns).map(([columnId, column], index) => {
					return (
						<Button
							onClick={() => showHidePage(column.sid, columnId, columns, setColumns, setItemshow)}
							id={column.id}
							key={columnId}
							className={itemshow == columnId ? column.class + ' active' : column.class}
							variant='outlined' color='primary' type='submit'>

							{column.name}

						</Button>
					);
				})}

				{/* {JSON.stringify(columns)} */}

			</div>

			<SendReport
				popup={popup}
				dealname={props.dealname}
				month={props.month}
				year={props.year}
				parentCallback={callbackFunction, setPopup}
			>

			</SendReport>

		</React.Fragment>
	);
}

export default DragNDrop;
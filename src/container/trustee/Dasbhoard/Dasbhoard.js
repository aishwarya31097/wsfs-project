/* eslint-disable require-jsdoc */
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import MUIDataTable from 'mui-datatables';
import GetAppIcon from '@material-ui/icons/GetApp';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { NavLink } from 'react-router-dom';
import Header from '../../../components/header/header';
import { withSnackbar } from 'notistack';
import Loader from '../../../components/loader';
import Tooltip from '@material-ui/core/Tooltip';
import CustomFooter from '../customize-footer/CustomFooter';
import AddNewReport from '../../../images/icons/add-new-report.svg';
import GenerateInvestorReport from '../../../images/icons/generate-investor-report.svg';
import ViewBlockchain from '../../../images/icons/view-blockchain.svg';
import ViewCustomizeInvestorReport from '../../../images/icons/view-customize-investor-report.svg';
import ViewMongdb from '../../../images/icons/view-mongdb.svg';
import SidebarDrawer from './SidebarDrawer';
import AssessmentIcon from '@material-ui/icons/Assessment';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem("token"),
      userid: localStorage.getItem("userid"),
      OrgName: localStorage.getItem('OrgName'),
      DealType: localStorage.getItem('DealType'),
      loader: false,
      getLoansLoader: false,
      open: false,
      message: '',
      table_data: [],
      all_deals: JSON.parse(localStorage.getItem("all_deals")),
      channelname: localStorage.getItem('ChannelName'),
      drawer: false,
      total_deals:null
    };
    this.childHandler = this.childHandler.bind(this)

  }

  async componentDidMount() {
    if(localStorage.getItem("token") == "" || localStorage.getItem("token") == undefined) {
      window.location.assign("/")
}
    const userid = this.state.userid;
    const DealType = this.state.DealType
    this.GetAllDeals(DealType);
  }

  childHandler(dataFromChild) {
    // log our state before and after we updated it
    console.log('%cPrevious Parent State: ' + JSON.stringify(this.state), "color:orange");
    this.setState({ drawer: false })
  }




  GetAllDeals = async (DealType) => {
    console.log("this.state.all_deals", this.state.all_deals);
    let all_deals = this.state.all_deals;
    this.setState({ loading: true, table_data: all_deals, total_deals:all_deals.length });
  };

  OpenDrawer = (pageUrl, deal_id, pagetitle) => {
    console.log("data OpenDrawer", pageUrl, deal_id)
    this.setState({ drawer: true, pagetitle: pagetitle, pageUrl: pageUrl, deal_id: deal_id })
  }
  Redirects =(pageUrl)=>{
    this.props.history.push("/report/" + this.state.DealType + "/" + pageUrl);

  }


  render() {

    const columnsInvestor = [
      {
        name: 'deal_id',
        label: 'Deal Name',
        options: {
          filter: false,
          sort: true,
          customBodyRender: (value, tableMeta) => (
            <div>

              {value}

            </div>
          ),
        },
      },
      {
        name: 'deal_id',
        label: 'Trustee Report',
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value, tableMeta) => (
            <div style={{ position: 'relative' }}>
              <React.Fragment>

                <Tooltip title="Trustee Report">
                <Button variant="outlined" color="primary" onClick={() => this.Redirects('issuer-view-loan-data-tape/monthly-trustee-report')}>
                    <VisibilityIcon></VisibilityIcon>
                  </Button>
                </Tooltip>

              </React.Fragment>
            </div>
          ),
        }
      },

      {
        name: 'deal_id',
        label: 'Loan Strats',
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value, tableMeta) => (
            <div style={{ position: 'relative' }}>
              <React.Fragment>

              <Tooltip title="Loan Strats">
                  <Button variant="outlined" color="primary" onClick={() => this.Redirects('issuer-loan-strat-analytics')}>
                        {/* <img src={IconReport} alt="Loan Strats" /> */}
                        <AssessmentIcon></AssessmentIcon>
                      </Button>
                </Tooltip>

              </React.Fragment>
            </div>
          ),
        }
      },
      {
        name: 'deal_id',
        label: 'Servicer Summary',
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value, tableMeta) => (
            <div style={{ position: 'relative' }}>
              <React.Fragment>

                <Tooltip title="Servicer Summary">
                  <Button variant="outlined" color="primary" onClick={() => this.Redirects('issuer-view-loan-data-tape/download_servicer')}>

                    <GetAppIcon></GetAppIcon>
                  </Button>
                </Tooltip>

              </React.Fragment>
            </div>
          ),
        }
      },


      
    ];

    const columns = [
      {
        name: 'deal_id',
        label: 'Deal Name',
        options: {
          filter: false,
          sort: true,
          customBodyRender: (value, tableMeta) => (
            <div>

              {value}

            </div>
          ),
        },
      },

      {
        name: 'deal_id',
        label: 'Generate Current Month Report',
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value, tableMeta) => (
            <div className="action_col" style={{ position: 'relative' }}>
              <React.Fragment>

                <Tooltip title="Add New Report">
                  <Button variant="outlined" color="primary" onClick={() => this.OpenDrawer('add-new', tableMeta.rowData[0], "Add New Report")}>
                    <img src={AddNewReport} alt="Add New Report" />
                  </Button>
                </Tooltip>

                {/* {this.state.DealType == "Bawag" ? '' : 
                <React.Fragment>
                <Tooltip title="View Servicer Data From Database ">
                  <Button variant="outlined" color="primary" onClick={() => this.OpenDrawer('view-servicer-mongodb-data', tableMeta.rowData[0], "View Servicer Data From Database")}>
                    <img src={ViewMongdb} alt="View Servicer Data From Database" />
                  </Button>
                </Tooltip>

                <Tooltip title="Validate Monthly Inputs">
                  <Button variant="outlined" color="primary" onClick={() => this.OpenDrawer('validate-monthly-inputs', tableMeta.rowData[0], "Validate Monthly Inputs")}>
                    <img src={AddNewReport} alt="Validate Monthly Inputs" />
                  </Button>
                </Tooltip>

                <Tooltip title="View Servicer Data From Network">
                  <Button variant="outlined" color="primary" onClick={() => this.OpenDrawer('view-servicer-blockchain-data', tableMeta.rowData[0], "View Servicer Data From Network")}>
                    <img src={ViewBlockchain} alt="View Servicer Data From Network" />
                  </Button>
                </Tooltip>
                </React.Fragment>
 }
                <Tooltip title="Generate Trustee Report">
                  <Button variant="outlined" color="primary" onClick={() => this.OpenDrawer('generate-investor-report', tableMeta.rowData[0], "Generate Trustee Report")}>
                    <img src={GenerateInvestorReport} alt="Generate Trustee Report" />
                  </Button>
                </Tooltip>

                <Tooltip title="Customize Trustee Report">
                  <Button variant="outlined" color="primary" onClick={() => this.OpenDrawer('customize-investor-report', tableMeta.rowData[0], "Customize Trustee Report")}>
                    <img src={ViewCustomizeInvestorReport} alt="Customize Trustee Report" />
                  </Button>
                </Tooltip> */}

              </React.Fragment>
            </div>
          ),
        }
      },
      {
        name: 'deal_id',
        label: 'Trustee Report',
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value, tableMeta) => (
            <div style={{ position: 'relative' }}>
              <React.Fragment>

                <Tooltip title="Trustee Report">
                <Button variant="outlined" color="primary" onClick={() => this.Redirects('issuer-view-loan-data-tape/monthly-trustee-report')}>

                    <VisibilityIcon></VisibilityIcon>
                  </Button>
                </Tooltip>

              </React.Fragment>
            </div>
          ),
        }
      },
      

      {
        name: 'deal_id',
        label: 'Loan Strats',
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value, tableMeta) => (
            <div style={{ position: 'relative' }}>
              <React.Fragment>
                <Tooltip title="Loan Strats">
                  <Button variant="outlined" color="primary" onClick={() => this.Redirects('issuer-loan-strat-analytics')}>

                        {/* <img src={IconReport} alt="Loan Strats" /> */}
                        <AssessmentIcon></AssessmentIcon>
                      </Button>
            
                </Tooltip>
              </React.Fragment>
            </div>
          ),
        }
      },

      {
        name: 'deal_id',
        label: 'Servicer Summary',
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value, tableMeta) => (
            <div style={{ position: 'relative' }}>
              <React.Fragment>

                <Tooltip title="Servicer Summary">
                <Button variant="outlined" color="primary" onClick={() => this.Redirects('issuer-view-loan-data-tape/download_servicer')}>
                    <GetAppIcon></GetAppIcon>
                  </Button>
                </Tooltip>

              </React.Fragment>
            </div>
          ),
        }
      },



      
    ];

    const options = {
      responsive: 'stacked',
      filterType: 'dropdown',
      filter:false,
      search: false,
      print: false,
      viewColumns: false,
      download: false,
      rowHover: false,
      selectableRowsOnClick: false,
      selectableRows: false,
      // onRowClick: this.onRowClick,
      onRowsSelect: this.onRowsSelect,
      
      rowsSelected: this.state.rowsSelected,
      rowsPerPageOptions:[{}],
      onRowsSelect: (rowsSelected, allRows) => {
        console.log("allRows", allRows);
        console.log("rowsSelected", rowsSelected);
        this.setState({ rowsSelected: allRows.map(row => row.dataIndex) });
        const selected = allRows.map(row => row.dataIndex);
        console.log("selected" + selected);
        this.selectedpoolid(selected);
      },

      draggableColumns: {
        enabled: false
      },

      // customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage, textLabels) => {
      //   return (
      //     <CustomFooter
      //       count={count}
      //       page={page}
      //       rowsPerPage={rowsPerPage}
      //       changeRowsPerPage={changeRowsPerPage}
      //       changePage={changePage}
      //       textLabels={textLabels}
      //     />
      //   );
      // },

      searchText: this.state.searchText,
      searchPlaceholder: 'Search Deal',
      loading: true,
      textLabels: {
        body: {
          noMatch: this.state.loading === true ?
            'Sorry, there is no matching data to display' :
            <Loader msg={"Please wait, loading data"} />,
          toolTip: 'Sort',
          columnHeaderTooltip: (column) => `Sort for ${column.label}`,
        },
        filter: {
          all: 'All',
          title: 'FILTERS',
          reset: 'RESET',
        },

        selectedRows: {
          text: 'row(s) selected',
          delete: 'Delete',
          deleteAria: 'Delete Selected Rows',
        },
      },
    };

    return (
      <React.Fragment>
        <div className="page">
          <div className="content">
            <div className="header"><Header pageTitle={'Dashboard'} 
            // total_deals={this.state.total_deals}
            ></Header></div>

            <div className="page-content">
              <MUIDataTable
                title={''}
                data={this.state.table_data}
                columns={this.state.OrgName == "wsfstrustee" ? columns : columnsInvestor}
                options={options}
              />

              {this.state.drawer == false ? '' :
                <SidebarDrawer
                  drawer={this.state.drawer}
                  pagetitle={this.state.pagetitle}
                  pageUrl={this.state.pageUrl}
                  deal_id={this.state.deal_id}
                  action={this.childHandler}
                >
                </SidebarDrawer>
              }

<div className="row">
  <div>

  </div>
  <div>
    
  </div>

</div>

            </div>

          </div>
        </div>



      </React.Fragment>
    );
  }
}

export default withSnackbar(Dashboard);
import AIcon1 from '../../images/AIcon1.png';
import AIcon2 from '../../images/AIcon2.png';
import AIcon3 from '../../images/AIcon3.png';

import DashboardClient from '../../images/dashboardClient.png';
import InitialSetup from '../../images/initial_setupClient.png';
import ViewInvestorReport from '../../images/view-investor-reportClient.png';

import LoanDataTape from '../../images/loan-data-tape-reportClient.png';
import DownloadServicer from '../../images/download-servicer-dataClient.png';

import Icon from '../../images/icon.png';

const ChannelName = localStorage.getItem("ChannelName")
const OrgName =  localStorage.getItem('OrgName');
export const IntermediateMenu = []
export const TrusteeMenu = [
  {
    'linkto': '/report/'+ChannelName+'/dashboard',
    'title': 'Dashboard ',
    'icon': DashboardClient,
    'subitems': [
      {
        'linkto': '/report/'+ChannelName+'/dashboard',
        'title': 'Dashboard',
        'icon': DashboardClient,
      },
    ],
  },
  // {
  //   'linkto': '/report/'+ChannelName+'/initial-setup',
  //   'title': 'Initial Setup  ',
  //   'icon': InitialSetup,
  //   'subitems': [
  //     {
  //       'linkto': '/report/'+ChannelName+'/initial-setup',
  //       'title': 'Initial Setup ',
  //       'icon': InitialSetup,
  //     },
  //   ],
  // },
  {
    'linkto': '/report/'+ChannelName+'/initial-setup',
    'title': 'Setup ',
    'icon': InitialSetup,
    'subitems': [
      {
        'linkto': '/report/'+ChannelName+'/initial-setup',
        'title': 'Initial Setup',
        'icon': InitialSetup,
      },
      // {
      //   'linkto': '/report/'+ChannelName+'/setup-page',
      //   'title': 'Add Standard Fields',
      //   'icon': InitialSetup,
      // },
      {
        'linkto': '/report/trusteedeal/mapping-page',
        'title': 'Map Standard Fields',
        'icon': InitialSetup,
      },
      {
        'linkto': '/report/'+ChannelName+'/add-new',
        'title': 'Add New',
        'icon': InitialSetup,
      },
      {
        'linkto': '/report/'+ChannelName+'/view-servicer-mongodb-data',
        'title': 'View Servicer Data From Database ',
        'icon': InitialSetup,
      },
      {
        'linkto': '/report/'+ChannelName+'/validate-monthly-inputs',
        'title': 'Validate Monthly Inputs',
        'icon': InitialSetup,
      },
      {
        'linkto': '/report/'+ChannelName+'/view-servicer-blockchain-data',
        'title': 'View Servicer Data From Network',
        'icon': InitialSetup,
      },
      {
        'linkto': '/report/'+ChannelName+'/generate-investor-report',
        'title': 'Generate Trustee Report',
        'icon': InitialSetup,
      },
      {
        'linkto': '/report/'+ChannelName+'/customize-investor-report',
        'title': 'Customize Trustee Report',
        'icon': InitialSetup,
      },
      // {
      //   'linkto': '/report/'+ChannelName+'/view-loan-data-tape/monthly-trustee-report',
      //   'title': 'View Trustee Report',
      //   'icon': ViewInvestorReport,
      // },

    ],
  },

  // {
  //   'linkto': '/report/'+ChannelName+'/mapping-page',
  //   'title': 'Map Standard Fields',
  //   'icon': ViewInvestorReport,
  //   'subitems': [
  //     // {
  //     //   'linkto': '/report/'+ChannelName+'/setup-page',
  //     //   'title': 'Add Standard Fields',
  //     //   'icon': DashboardClient,
  //     // },
  //     {
  //       'linkto': '/report/'+ChannelName+'/mapping-page',
  //       'title': 'Map Standard Fields',
  //       'icon': DashboardClient,
  //     },
  //   ],
  // },

  // {
  //   'linkto': '/report/'+ChannelName+'/add-new',
  //   'title': 'Add New Report',
  //   'icon': InitialSetup,
  //   'subitems': [
    
  //     {
  //       'linkto': '/report/'+ChannelName+'/add-new',
  //       'title': 'Add New Report',
  //       'icon': InitialSetup,
  //     },
  //     {
  //       'linkto': '/report/'+ChannelName+'/view-servicer-mongodb-data',
  //       'title': 'View Servicer Data From Database ',
  //       'icon': InitialSetup,
  //     },
  //     {
  //       'linkto': '/report/'+ChannelName+'/validate-monthly-inputs',
  //       'title': 'Validate Monthly Inputs',
  //       'icon': InitialSetup,
  //     },
  //     {
  //       'linkto': '/report/'+ChannelName+'/view-servicer-blockchain-data',
  //       'title': 'View Servicer Data From Network',
  //       'icon': InitialSetup,
  //     },
  //     {
  //       'linkto': '/report/'+ChannelName+'/generate-investor-report',
  //       'title': 'Generate Trustee Report',
  //       'icon': InitialSetup,
  //     },
  //     {
  //       'linkto': '/report/'+ChannelName+'/customize-investor-report',
  //       'title': 'Customize Trustee Report',
  //       'icon': InitialSetup,
  //     },
  //     // {
  //     //   'linkto': '/report/'+ChannelName+'/view-loan-data-tape/monthly-trustee-report',
  //     //   'title': 'View Trustee Report',
  //     //   'icon': ViewInvestorReport,
  //     // },

  //   ],
  // },
  // {
  //   'linkto': '/report/'+ChannelName+'/view-loan-data-tape/monthly-trustee-reports',
  //   'title': 'Portfolio Reporting ',
  //   'icon': LoanDataTape,
  //   'subitems': [
  //     {
  //       'linkto': '/report/'+ChannelName+'/view-loan-data-tape/monthly-trustee-report',
  //       'title': 'Portfolio Reporting',
  //       'icon': LoanDataTape,
  //     },
  //   ],
  // },

  {
    'linkto': '/report/'+ChannelName+'/issuer-view-loan-data-tape/monthly-trustee-report',
    'title': 'Trustee Portfolio',
    'icon': ViewInvestorReport,
    'subitems': [
      {
        'linkto': '/report/'+ChannelName+'/issuer-view-loan-data-tape/monthly-trustee-report',
        'title': 'Trustee Portfolio',
        'icon': ViewInvestorReport,
      },
    ],
  },
  // {
  //   'linkto': '/report/'+ChannelName+'/download-servicer-data',
  //   'title': 'Servicer Data ',
  //   'icon': DownloadServicer,
  //   'subitems': [
  //     {
  //       'linkto': '/report/'+ChannelName+'/download-servicer-data',
  //       'title': 'Download Servicer Data',
  //       'icon': DownloadServicer,
  //     },
  //   ],
  // },
  {
    'linkto': '/report/'+ChannelName+'/issuer-loan-strat-analytics',
    'title': 'Loan Strat Report ',
    'icon': LoanDataTape,
    'subitems': [
      {
        'linkto': '/report/'+ChannelName+'/issuer-loan-strat-analytics',
        'title': 'Loan Strat Report',
        'icon': LoanDataTape,
      },
    ],
  },

];


export const TrusteeBawagMenu = [
  {
    'linkto': '/report/'+ChannelName+'/dashboard',
    'title': 'Dashboard ',
    'icon': DashboardClient,
    'subitems': [
      {
        'linkto': '/report/'+ChannelName+'/dashboard',
        'title': 'Dashboard',
        'icon': DashboardClient,
      },
    ],
  },

  {
    'linkto': '/report/'+ChannelName+'/initial-setup',
    'title': 'initial-setup ',
    'icon': InitialSetup,
    'subitems': [
      {
        'linkto': '/report/'+ChannelName+'/initial-setup',
        'title': 'Initial Setup',
        'icon': InitialSetup,
      },
      {
        'linkto': '/report/'+ChannelName+'/add-new',
        'title': 'Add New',
        'icon': InitialSetup,
      },      
      {
        'linkto': '/report/'+ChannelName+'/generate-investor-report',
        'title': 'Generate Trustee Report',
        'icon': InitialSetup,
      },
      {
        'linkto': '/report/'+ChannelName+'/customize-investor-report',
        'title': 'Customize Trustee Report',
        'icon': InitialSetup,
      },
      {
        'linkto': '/report/'+ChannelName+'/view-loan-data-tape/monthly-trustee-report',
        'title': 'View Trustee Report',
        'icon': ViewInvestorReport,
      },

    ],
  },
  {
    'linkto': '/report/'+ChannelName+'/view-loan-data-tape/loan-strat-analytics',
    'title': 'Loan Strat Report ',
    'icon': LoanDataTape,
    'subitems': [
      {
        'linkto': '/report/'+ChannelName+'/view-loan-data-tape/loan-strat-analytics',
        'title': 'Loan Strat Report',
        'icon': LoanDataTape,
      },
    ],
  },
  {
    'linkto': '/report/'+ChannelName+'/download-servicer-data',
    'title': 'Servicer Data ',
    'icon': DownloadServicer,
    'subitems': [
      {
        'linkto': '/report/'+ChannelName+'/download-servicer-data',
        'title': 'Download Servicer Data',
        'icon': DownloadServicer,
      },
    ],
  },

];


export const InvestorMenu = [
  {
    'linkto': '/report/'+ChannelName+'/dashboard',
    'title': 'Dashboard ',
    'icon': DashboardClient,
    'subitems': [
      {
        'linkto': '/report/'+ChannelName+'/dashboard',
        'title': 'Dashboard',
        'icon': DashboardClient,
      },
    ],
  },
  // {
  //   'linkto': '/report/'+ChannelName+'/view-loan-data-tape/monthly-trustee-report',
  //   'title': 'View Trustee Report ',
  //   'icon': ViewInvestorReport,
  //   'subitems': [
  //     {
  //       'linkto': '/report/'+ChannelName+'/view-loan-data-tape/monthly-trustee-report',
  //       'title': 'View Trustee Report',
  //       'icon': ViewInvestorReport,
  //     },
  //   ],
  // },
  {
    'linkto': '/report/'+ChannelName+'/issuer-view-loan-data-tape/monthly-trustee-report',
    'title': 'Trustee Portfolio',
    'icon': ViewInvestorReport,
    'subitems': [
      {
        'linkto': '/report/'+ChannelName+'/issuer-view-loan-data-tape/monthly-trustee-report',
        'title': 'Trustee Portfolio',
        'icon': ViewInvestorReport,
      },
    ],
  },
  // {
  //   'linkto': '/report/'+ChannelName+'/view-loan-data-tape/loan-strat-analytics',
  //   'title': 'Loan Strat Report ',
  //   'icon': LoanDataTape,
  //   'subitems': [
  //     {
  //       'linkto': '/report/'+ChannelName+'/view-loan-data-tape/loan-strat-analytics',
  //       'title': 'Loan Strat Report',
  //       'icon': LoanDataTape,
  //     },
  //   ],
  // },
  {
    'linkto': '/report/'+ChannelName+'/issuer-loan-strat-analytics',
    'title': 'Loan Strat Report ',
    'icon': LoanDataTape,
    'subitems': [
      {
        'linkto': '/report/'+ChannelName+'/issuer-loan-strat-analytics',
        'title': 'Loan Strat Report',
        'icon': LoanDataTape,
      },
    ],
  },
  // {
  //   'linkto': '/report/'+ChannelName+'/download-servicer-data',
  //   'title': 'Servicer Data ',
  //   'icon': DownloadServicer,
  //   'subitems': [
  //     {
  //       'linkto': '/report/'+ChannelName+'/download-servicer-data',
  //       'title': 'Download Servicer Data',
  //       'icon': DownloadServicer,
  //     },
  //   ],
  // },

];


export const adminUser = [
  {
    'linkto': '/admin/users/'+OrgName+'/Pending',
    'title': 'Pending Users ',
    'icon': DashboardClient,
    'subitems': [
      {
        'linkto': '/admin/users/'+OrgName+'/Pending',
        'title': 'Pending Users',
        'icon': DashboardClient,
      },
      {
        'linkto': '/admin/users/'+OrgName+'/Approved',
        'title': 'Approved Users',
        'icon': DashboardClient,
      },
    ],
  },
  {
    'linkto': '/report/trusteedeal/setup-page',
    'title': 'Setup Standard Fields ',
    'icon': InitialSetup,
    'subitems': [
      {
        'linkto': '/report/trusteedeal/setup-page',
        'title': 'Setup Standard Fields ',
        'icon': InitialSetup,
      },
    ],
  },
];
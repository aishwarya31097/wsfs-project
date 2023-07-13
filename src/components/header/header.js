/* eslint-disable require-jsdoc */
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { NavLink, Link } from 'react-router-dom';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import AddIcon from '@material-ui/icons/Add';
import PublishIcon from '@material-ui/icons/Publish';
import { customStyles, customStylesauto } from '../../components/customscripts/customscript';
import ReactModal from 'react-modal';
import { withSnackbar } from 'notistack';
import CloseIcon from '@material-ui/icons/Close';
import Logo from '../../images/wsfs-logo.jpg';
import LinkItem from '../linkItem';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PopupState, { bindTrigger, bindMenu, close } from 'material-ui-popup-state';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Footer from '../../components/footer/footer'

class header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      open1: false,
      value: null,
      message: '',
      inputVal: '',
      anchorEl: false,
      DealType: localStorage.getItem('DealType'),
      OrgName: localStorage.getItem('OrgName') || null,
      currentUser: localStorage.getItem('user_name'),
    };
  }

  onOpenModal1(value) {
    console.log("MODAL " + value);
    this.setState({ open1: true, value: value });
  };

  onCloseModal1 = () => {
    this.setState({ open1: false, loadingmodal: false });
  };

  componentDidMount() {
    if (this.state.currentUser !== null) {
      const firstname = this.state.currentUser;
      const namefirstletter = firstname.charAt(0).toUpperCase();
      this.setState({ currentUser: namefirstletter });
    }
  }

  render() {

    return (
      <React.Fragment>

        <div className="row">
          <div className="col-md-5 col-sm-12 align-self-center">
            <LinkItem to={'#nogo'} className="logo_img" title={''} icon={Logo} > </LinkItem>
          </div>


          <div className="col-md-7 col-sm-12 text-right">
            <React.Fragment>


              {this.state.OrgName == "originator" ?
                <React.Fragment>
                  <div className="float-right header_right">

                    <React.Fragment>
                      <p className="orgname">Logged in as <span> {this.state.DealType} -  {this.state.OrgName} </span> </p>
                      <ul className="preprocessing_menu">
                        <li><Button
                          variant="outlined"
                          color="primary" >
                          Pre Processing <MoreVertIcon /> </Button>
                          <ul>
                            <li><MenuItem><NavLink to={'/preprocessingviewloans/'} id="viewloanlink"> View LMS Data</NavLink></MenuItem></li>
                            <li><MenuItem><NavLink to={'/bulkupload/'} id="viewloanlink"> Bulk Document Uploads</NavLink></MenuItem></li>
                          </ul>
                        </li>
                        <li className="userInfo"><LinkItem to={'#nogo'} title={this.state.currentUser} > </LinkItem></li>
                      </ul>

                    </React.Fragment>

                  </div>
                </React.Fragment>
                :

                <React.Fragment>
                  <div className="float-right header_right">
                    <React.Fragment>
                      <p className="orgname">Logged in as <span> {this.state.DealType} - {this.state.OrgName} </span> </p>
                      {/* <ul className="preprocessing_menu">
                        <li className="userInfo"><LinkItem to={'#nogo'} title={this.state.currentUser} > </LinkItem></li>
                      </ul> */}
                    </React.Fragment>
                  </div>
                </React.Fragment>
              }
            </React.Fragment>
          </div>


        </div>

        <div className="tableSearch" id="sub_heading">

          <div className="row align-items-center">


            <div className="col-md-6 col-sm-12">
              {this.props.backButton !== undefined ?
                <React.Fragment>
                  <div className="pageHeading">

                    <NavLink className="back-to-link" to={this.props.backButton} >
                      <span>
                        <ArrowBackIcon></ArrowBackIcon> {this.props.backTitle}
                      </span>

                    </NavLink>
                    <span className="pageTitle"> {this.props.pageTitle}

                      {this.props.total_deals === undefined ? ' ' :
                        <span className="total_deals">{this.props.total_deals}</span>
                      }
                      {this.props.dealId === undefined ? ' ' :
                        <React.Fragment>
                        <span className="dealId">{this.props.dealId}</span>
                        </React.Fragment>
                      }
                    </span>
                  </div>
                </React.Fragment> :
                <React.Fragment>
                  <div className="pageHeading ">

                    <span className="pageTitle"> {this.props.pageTitle}
                      {this.props.total_deals === undefined ? ' ' :
                        <span className="total_deals">{this.props.total_deals}</span>
                      }
                      {this.props.dealId === undefined ? ' ' :
                        <span className="dealId">{this.props.dealId}</span>
                      }
                    </span>
                  </div>
                </React.Fragment>
              }
            </div>

            <div className="col-md-6 col-sm-12">{this.props.children}</div>

          </div>
        </div>
        <Footer></Footer>
      </React.Fragment>

    );
  }
}


export default withSnackbar(header);
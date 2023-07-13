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
const footerStyle = {
    backgroundColor: "#fff",
    fontSize: "14px",
    color: "#a7a3a3",
    fontWeight:"bold",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "3px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "30px",
    width: "100%"
  };
  
//   const phantomStyle = {
//     display: "block",
//     padding: "10px",
//     height: "15px",
//     width: "100%"
//   };
  
  function Footer({ children }) {
    return (
      <div>
        {/* <div style={phantomStyle} /> */}
        <div style={footerStyle}>{children}</div>
      </div>
    );
  }
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

    
        <Footer>
        <div class="text-center">Powered by <img id="wsfs_logo_first" style={{ width: "60px", height: "20px", marginTop:"-10px" }}
                                // src={"http://in-d.ai/wp-content/uploads/2020/11/WSFSLogo.png"
                                          src={"https://wsfsprod.intainabs.com/logo.jpg"
                                }
                            /></div>
    </Footer>
  
      </React.Fragment>
    );
  }
}


export default withSnackbar(header);
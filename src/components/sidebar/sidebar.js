/* eslint-disable require-jsdoc */
import React, { Component } from 'react';
import { TrusteeMenu, InvestorMenu, adminUser, TrusteeBawagMenu ,IntermediateMenu} from './menu';
import LinkItem from '../linkItem';
import Logo from '../../images/logo-ind.png';
import Button from '@material-ui/core/Button';
import axios from "axios";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Tooltip from '@material-ui/core/Tooltip';
import {history} from '../../servies/services';


export default class sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: localStorage.getItem('user_name'),
      OrgName: localStorage.getItem('OrgName'),
      userType: localStorage.getItem('userType'),
      ChannelName: localStorage.getItem('ChannelName'),
      DealType: localStorage.getItem('ChannelName'),
      loading: false,
      getLoansLoader: false,
      open: false,
      message: '',
      currentmenu: [],
      menu_loader: false
    };
  }

  async componentDidMount() {
    // currentUser: sessionStorage.getItem('name').charAt(0).toUpperCase(),

    console.log("this.state.currentUser", this.state.currentUser)
    history.go(1)

    // alert(this.state.OrgName);

    if (this.state.currentUser == "admin") {
      this.setState({ currentmenu: adminUser, menu_loader: true })
    } else {
      if (this.state.OrgName == "wsfstrustee") {
        if (this.state.DealType == "Bawag") {
          this.setState({ currentmenu: TrusteeBawagMenu, menu_loader: true })
        } else if(this.state.DealType == ""){
          this.setState({ currentmenu: IntermediateMenu, menu_loader: true })

        }
        else {
          this.setState({ currentmenu: TrusteeMenu, menu_loader: true })
        }
      } else {
        if(this.state.DealType == ""){
          this.setState({ currentmenu: IntermediateMenu, menu_loader: true })

        }
        else{
        this.setState({ currentmenu: InvestorMenu, menu_loader: true })
        }
      }
    }

    if (this.state.currentUser !== null) {
      const firstname = this.state.currentUser;
      const namefirstletter = firstname.charAt(0).toUpperCase();
      this.setState({ currentUser: namefirstletter });
    }
  };

  logoutBtn() {
    localStorage.clear();
    window.location.replace('/') 
  }

  render() {
    return (
      <React.Fragment>
        {this.state.menu_loader == false ? '' :
          <div className="sidebar">
            <ul>
              <li className="logoPlaceholder">
              </li>
              {this.state.currentmenu.map((item) => {
                return (
                  <li key={item.title}>
                    <LinkItem to={item.linkto} title={item.title} icon={item.icon}></LinkItem>
                    {item.subitems != null ? (
                      <React.Fragment>
                        <ul>
                          <div className="arrow-left"></div>
                          <div className="arrow_box">
                            {item.subitems.map((item1) => {
                              return (
                                <li key={item1.title}>
                                  <LinkItem to={item1.linkto} title={item1.title}></LinkItem>
                                </li>
                              );
                            })
                            }
                          </div>
                        </ul>
                      </React.Fragment>
                    ) : (
                      <React.Fragment> </React.Fragment>
                    )
                    }
                  </li>
                );
              })
              }
            </ul>
            <ul className="bottomMenu">
            <Tooltip title="Update Profile">
            <li className="userInfo"><LinkItem to={'/user/profile-update'} title={this.state.currentUser} > </LinkItem></li>
            </Tooltip>
            <Tooltip title="Logout">
              <li className="showMenu"> <Button className="logout" variant="contained" color="primary" type="submit" onClick={this.logoutBtn} > <ExitToAppIcon></ExitToAppIcon> </Button></li>
              </Tooltip>
            </ul>
          </div>
        }
      </React.Fragment>
    );
  }
}

import React, { Component } from 'react';
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
import { GetAllDeals, generateYears, months, UploadServicerReport, ServicerData, ServicerDataAddNewReport1, ServicerDataAddNewReport2, ServicerDataAddNewReport3, ServicerDataAddNewReport4 } from '../../../servies/services';
import Select from '@material-ui/core/Select';
import Drawer from '@material-ui/core/Drawer';
import CloseIcon from '@material-ui/icons/Close';
import { withRouter } from 'react-router';

class SidebarDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getLoansLoader: false,
            fields: {
                dealId: this.props.deal_id,
                month: null,
                year: null,
            },
            file: null,
            getLoader: false,
            token: localStorage.getItem("token"),
            user_id: localStorage.getItem("user_id"),
            OrgName: localStorage.getItem('OrgName'),
            DealType: localStorage.getItem('DealType'),
            peers: JSON.parse(localStorage.getItem('peers')),
            deal_name: [],
            form_loader: false,
            channelname: localStorage.getItem('ChannelName'),
            open: this.props.drawer,
            all_deals: JSON.parse(localStorage.getItem("all_deals")),
            years: generateYears(),
            months: months,
            pageUrl: this.props.pageUrl

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

    handleDrawerOpen = () => {
        this.setState({ open: true })
    }


    handleDrawerClose = () => {
        this.setState({ open: false })
        this.props.action();
    }


    handleDoc = (e) => {

        console.log("{JSON.stringify(e.target.files[0])}", JSON.stringify(e.target.files[0]))
        this.setState({ file: e.target.files[0] });

    }

    componentDidMount() {
        

    }





    componentWillReceiveProps(nextProps) {


    }


    onSubmit = () => {
        console.log("fields", this.state.fields);
        const fields = this.state.fields
        if (this.state.fields.dealId == null || this.state.fields.month == null || this.state.fields.year == null) {

            const message = "Please fill the required fields";
            this.props.enqueueSnackbar(message, {
                variant: 'error',
                autoHideDuration: 4000,
            });

        } else {

            this.props.history.push("/report/" + this.state.DealType + "/" + this.state.pageUrl + "/" + this.state.fields.dealId + "/" + this.state.fields.month + "/" + this.state.fields.year);
            this.setState({ form_loader: true })

        }

    }

    render() {
        return (
            <React.Fragment>
                <div className="popup_overlay" onClick={this.handleDrawerClose}></div>
                <Drawer
                    className="drawer_popup"
                    variant="persistent"
                    anchor="right"
                    open={this.state.open}
                >
                    <Button color="primary" className="close_icon" variant="outlined" onClick={this.handleDrawerClose}> <CloseIcon></CloseIcon> </Button>
                    <h1> {this.props.pagetitle}  </h1>

                    {this.state.loading == false ? <Loader msg={"Loading Modules..."} /> :
                        <React.Fragment>
                            <div className="fourColunm">
                                <div className="rjsf">
                                    <div className="row mb-3">
                                        <div className="col-md-12 mb-3">
                                            <Select
                                                variant="outlined"
                                                size="medium"
                                                name="dealId"
                                                labelId="demo-controlled-open-select-label"
                                                id="demo-simple-select-helper"
                                                value={this.state.fields.dealId}
                                                onChange={this.handleChange}
                                            >
                                                {this.state.all_deals.map((item) => {
                                                    return (
                                                        <MenuItem value={item.deal_id}> {item.deal_id} </MenuItem>
                                                    );
                                                })
                                                }
                                            </Select>

                                        </div>

                                        <div className="col-md-12 mb-3">

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
                                        <div className="col-md-12 mb-3">

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

                                    <div className='row justify-content-center'>
                                        <Button onClick={this.onSubmit} variant='contained' color='primary' type='submit'>
                                            Submit {this.state.form_loader === true ? (
                                                <CircularProgress size='25px' color='primary' />
                                            ) : (
                                                    ''
                                                )}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                    }
                </Drawer>
                
            </React.Fragment>
            
        );
    }
}

export default withRouter(withSnackbar(SidebarDrawer));

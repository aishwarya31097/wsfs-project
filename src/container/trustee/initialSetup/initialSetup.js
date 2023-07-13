import React, { Component } from 'react'
import Header from '../../../components/header';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import Loader from '../../../components/loader';
import { withSnackbar } from 'notistack';
import * as moment from 'moment'
import { widgets, CustomFieldTemplate, customStyles, customStylesauto, ObjectFieldTemplate } from '../../../components/customscripts/customscript';
import LinearLoader from '../../../components/loader/LinearLoader';
import { InitialSetup, GetAllDealsLogin, initialsetupQuery } from '../../../servies/services';

import { withTheme } from 'react-jsonschema-form';
import { Theme as MuiTheme } from 'rjsf-material-ui';

const Form = withTheme(MuiTheme)

const schemaLima = require('./schema-Lima.json')
const uiSchemaLima = require('./ui-schema-lima.json')
const formDataLima = require('./formdata-lima.json')

const schemaBawag = require('./schema-Bawag.json')
const uiSchemaBawag = require('./ui-schema-bawag.json')
const formDataBawag = require('./formdata-bawag.json')

const schemaSaluda = require('./schema-Saluda.json')
const uiSchemaSaluda = require('./ui-schema-saluda.json')
const formDataSaluda = require('./formdata-saluda.json')

const schemaSaludaGrade = require('./schema-Saludagrade.json')
const uiSchemaSaludaGrade = require('./ui-schema-saludagrade.json')
const formDataSaludaGrade = require('./formdata-saludagrade.json')

const schemaSaludaSeq1 = require('./schema-SaludaSeq1.json')
const uiSchemaSaludaSeq1 = require('./ui-schema-saludaseq1.json')
const formDataSaludaSeq1 = require('./formdata-saludaseq1.json')


const schemaAlphaflow = require('./schema-Alphaflow.json')
const uiSchemaAlphaflow = require('./ui-schema-alphaflow.json')
const formDataAlphaflow = require('./formdata-alphaflow.json')

const schemaFig2 = require('./schema-Fig2.json')
const uiSchemaFig2 = require('./ui-schema-fig2.json')
const formDataFig2 = require('./formdata-fig2.json')

const schemaBc1 = require('./schema-bc1.json')
const uiSchemaBc1 = require('./ui-schema-bc1.json')
const formDataBc1 = require('./formdata-bc1.json')

const schemaReigo = require('./schema-Reigo.json')
const uiSchemaReigo = require('./ui-schema-reigo.json')
const formDataReigo = require('./formdata-reigo.json')

const schemaSaludawl1 = require('./schema-Saludawl1.json')
const uiSchemaSaludawl1 = require('./ui-schema-saludawl1.json')
const formDataSaludawl1 = require('./formdata-saludawl1.json')

const schemaDominion = require('./schema-Dominion.json')
const uiSchemaDominion = require('./ui-schema-dominion.json')
const formDataDominion = require('./formdata-dominion.json')

const schemaSprucehill = require('./schema-Sprucehill.json')
const uiSchemaSprucehill = require('./ui-schema-sprucehill.json')
const formDataSprucehill = require('./formdata-sprucehill.json')

const schemaSaludartl1 = require('./schema-Saludartl1.json')
const uiSchemaSaludartl1 = require('./ui-schema-saludartl1.json')
const formDataSaludartl1 = require('./formdata-saludartl1.json')

const schemaStoa = require('./schema-Stoa.json')
const uiSchemaStoa = require('./ui-schema-stoa.json')
const formDataStoa = require('./formdata-stoa.json')

const schemaTildene = require('./schema-tildene.json')
const uiSchemaTildene = require('./ui-schema-tildene.json')
const formDataTildene = require('./formdata-tildene.json')

const schemaSaludamf1 = require('./schema-Saludamf1.json')
const uiSchemaSaludamf1 = require('./ui-schema-saludamf1.json')
const formDataSaludamf1 = require('./formdata-saludamf1.json')

const schemaPalisades = require('./schema-Palisades.json')
const uiSchemaPalisades = require('./ui-schema-palisades.json')
const formDataPalisades = require('./formdata-palisades.json')

const schemaSaludartl2 = require('./schema-Saludartl2.json')
const uiSchemaSaludartl2 = require('./ui-schema-saludartl2.json')
const formDataSaludartl2 = require('./formdata-saludartl2.json')

const schemaSaludapre = require('./schema-Saludapre.json')
const uiSchemaSaludapre = require('./ui-schema-saludapre.json')
const formDataSaludapre = require('./formdata-saludapre.json')

const schemaMfa = require('./schema-mfa.json')
const uiSchemaMfa = require('./ui-schema-mfa.json')
const formDataMfa = require('./formdata-mfa.json')

const schemaSetpoint = require('./schema-setpoint.json')
const uiSchemaSetpoint  = require('./ui-schema-setpoint.json')
const formDataSetpoint  = require('./formdata-setpoint.json')

const schemaBc2 = require('./schema-bc2.json')
const uiSchemaBc2 = require('./ui-schema-bc2.json')
const formDataBc2 = require('./formdata-bc2.json')

const schemaBuilders = require('./schema-builders.json')
const uiSchemaBuilders = require('./ui-schema-builders.json')
const formDataBuilders = require('./formdata-builders.json')

const schemaNPL = require('./schema-npl.json')
const uiSchemaNPL = require('./ui-schema-npl.json')
const formDataNPL = require('./formdata-npl.json')

const schemaStoa2022 = require('./schema-stoa2022.json')
const uiSchemaStoa2022 = require('./ui-schema-stoa2022.json')
const formDataStoa2022 = require('./formdata-stoa2022.json')

const schemaUnlock = require('./schema-unlock.json')
const uiSchemaUnlock = require('./ui-schema-unlock.json')
const formDataUnlock = require('./formdata-unlock.json')

let dealTypeMain = localStorage.getItem('DealType');
let schema = null;
let uiSchema = null;
let formData = null;
if (dealTypeMain == "LimaOne") {
    schema = schemaLima;
    uiSchema = uiSchemaLima;
    formData = formDataLima;
} else if (dealTypeMain == "Bawag") {
    schema = schemaBawag;
    uiSchema = uiSchemaBawag;
    formData = formDataBawag;
} else if (dealTypeMain == "Saluda PAC1") {
    schema = schemaSaluda;
    uiSchema = uiSchemaSaluda;
    formData = formDataSaluda;
} else if (dealTypeMain == "Saluda FIG1") {
    schema = uiSchemaSaludaGrade;
    uiSchema = uiSchemaSaluda;
    formData = formDataSaluda;
} else if (dealTypeMain == "Saluda SEQ1") {
    schema = schemaSaludaSeq1;
    uiSchema = uiSchemaSaludaSeq1;
    formData = formDataSaludaSeq1;
}
else if (dealTypeMain == "AlphaFlow") {
    schema = schemaAlphaflow;
    uiSchema = uiSchemaAlphaflow;
    formData = formDataAlphaflow;
}
else if (dealTypeMain == "Saluda FIG2") {
    schema = schemaFig2;
    uiSchema = uiSchemaFig2;
    formData = formDataFig2;
}
else if (dealTypeMain == "Saluda BC1") {
    schema = schemaBc1;
    uiSchema = uiSchemaBc1;
    formData = formDataBc1;
}
else if (dealTypeMain == "Reigo") {
    schema = schemaReigo;
    uiSchema = uiSchemaReigo;
    formData = formDataReigo;
}
else if (dealTypeMain == "Saluda WL1") {
    schema = schemaSaludawl1;
    uiSchema = uiSchemaSaludawl1;
    formData = formDataSaludawl1;
}
else if (dealTypeMain == "Dominion") {
    schema = schemaDominion;
    uiSchema = uiSchemaDominion;
    formData = formDataDominion;
}
else if (dealTypeMain == "Spruce Hill") {
    schema = schemaSprucehill;
    uiSchema = uiSchemaSprucehill;
    formData = formDataSprucehill;
}
else if (dealTypeMain == "Saluda RTL1") {
    schema = schemaSaludartl1;
    uiSchema = uiSchemaSaludartl1;
    formData = formDataSaludartl1;
}
else if (dealTypeMain == "Stoa 2021") {
    schema = schemaStoa;
    uiSchema = uiSchemaStoa;
    formData = formDataStoa;
}
else if (dealTypeMain == "Tildene") {
    schema = schemaTildene;
    uiSchema = uiSchemaTildene;
    formData = formDataTildene;
}
else if (dealTypeMain == "Saluda MF1") {
    schema = schemaSaludamf1;
    uiSchema = uiSchemaSaludamf1;
    formData = formDataSaludamf1;
}
else if (dealTypeMain == "Palisades") {
    schema = schemaPalisades;
    uiSchema = uiSchemaPalisades;
    formData = formDataPalisades;
}
else if (dealTypeMain == "Saluda RTL2") {
    schema = schemaSaludartl2;
    uiSchema = uiSchemaSaludartl2;
    formData = formDataSaludartl2;
}
else if (dealTypeMain == "Saluda PRE1") {
    schema = schemaSaludapre;
    uiSchema = uiSchemaSaludapre;
    formData = formDataSaludapre;
}
else if (dealTypeMain == "MFA") {
    schema = schemaMfa;
    uiSchema = uiSchemaMfa;
    formData = formDataMfa;
}
else if (dealTypeMain == "Setpoint") {
    schema = schemaSetpoint;
    uiSchema = uiSchemaSetpoint;
    formData = formDataSetpoint;
}
else if (dealTypeMain == "Saluda BC2") {
    schema = schemaBc2;
    uiSchema = uiSchemaBc2;
    formData = formDataBc2;
}
else if (dealTypeMain == "Saluda Builders") {
    schema = schemaBuilders;
    uiSchema = uiSchemaBuilders;
    formData = formDataBuilders;
}
else if (dealTypeMain == "NPL") {
    schema = schemaNPL;
    uiSchema = uiSchemaNPL;
    formData = formDataNPL;
}
else if (dealTypeMain == "Stoa 2022") {
    schema = schemaStoa2022;
    uiSchema = uiSchemaStoa2022;
    formData = formDataStoa2022;
}
else if (dealTypeMain == "Unlock") {
    schema = schemaUnlock;
    uiSchema = uiSchemaUnlock;
    formData = formDataUnlock;
}

 uiSchema = {

    "maturityDate": {
      "ui:autofocus": false,
      "ui:emptyValue": "",
      "ui:autocomplete": false,
      "ui:readonly": true
    },
    "initialAccrualPeriodDays": {
      "ui:autofocus": false,
      "ui:emptyValue": "",
      "ui:autocomplete": false,
      "ui:readonly": true
    },
    "closingDate": {
        "ui:autofocus": false,
        "ui:emptyValue": "",
        "ui:autocomplete": false,
        "ui:readonly": true
      },
      "firstpaymentDate": {
        "ui:autofocus": false,
        "ui:emptyValue": "",
        "ui:autocomplete": false,
        "ui:readonly": true
      }
  };
class initialSetup extends Component {
   
    constructor(props) {
        super(props)
        this.state = {
            schema: schema,
            uiSchema: uiSchema,
            formLoader: false,
            open: false,
            formData: formData,
            open2: false,
            pageTitle: "Initial Setup",
            getLoader: false,
            token: localStorage.getItem("token"),
            userid: localStorage.getItem("userid"),
            OrgName: localStorage.getItem('OrgName'),
            DealType: localStorage.getItem('DealType'),
            peers: localStorage.getItem('peers'),
            peer: localStorage.getItem('peer'),
            channelname: localStorage.getItem('ChannelName'),
            checkDealId: null,
        }
        var TOKEN=localStorage.getItem("token");
        if(TOKEN==undefined || TOKEN==""){
            window.location.assign('/')
        }
    }


    async componentDidMount() {
        console.log("55555555555555555")
        if(this.state.token==undefined || this.state.token=="")
        {
            window.location.assign('/')
        }

        if (this.state.DealType == "LimaOne") {

            this.setState({ schema: schemaLima, uiSchema: uiSchemaLima, formData: formDataLima });

        } else if (this.state.DealType == "Saluda FIG1") {

            this.setState({ schema: schemaSaludaGrade, uiSchema: uiSchemaSaludaGrade, formData: formDataSaludaGrade });

        }

    }

    onBlur =  async (value) => {
        console.log("value", value)
        if (value == "root_dealId") {
            console.log("value", true);
            console.log("formData", this.state.formData)
            const DealType = this.state.DealType;
            const APIResponse = await initialsetupQuery(this.state.formData.dealId, DealType);
            if (APIResponse != null) {
                console.log("APIResponse.data.Success", APIResponse.data);
                if (APIResponse.data.isSuccess == true) {
                    // const message = APIResponse.data.message;
                    // this.props.enqueueSnackbar(message, {
                    //     variant: 'info',
                    //     autoHideDuration: 3000,
                    // });

                } else {
                    const message = APIResponse.data.message;
                    this.props.enqueueSnackbar(message, {
                        variant: 'error',
                        autoHideDuration: 3000,
                    });
                }
                // {"isSuccess":true,"message":"DealName Not Exist!"}
            }
        }

    }

    onFormChanged = (value) => {

        this.setState({ formData: value.formData })

    }


    onSubmit = async (value) => {
        this.setState({ formLoader: true, formData: value.formData })
        console.log('onSubmit:', value.formData);
        let data = value.formData;
        data.userId = localStorage.getItem('user_id');
    
        data.peers = JSON.parse(localStorage.getItem('peers'));
        data.channelname = localStorage.getItem('ChannelName');
        data.loggedindeal = this.state.DealType;
        console.log('intiinal tabel data', data);
        const DealType = this.state.DealType;
        const APIResponse = await InitialSetup(data, DealType);
        if (APIResponse != null) {
            console.log("APIResponse.data.Success", APIResponse.data);
            if (APIResponse.data.isSuccess == true) {
                let token = this.state.token;
                let peer = this.state.peer;
                let deal_id = value.formData.dealId;
                this.GetAllDeals(DealType, token, peer, deal_id)
            } else {
                const message = "Data not saved successfully";
                this.props.enqueueSnackbar(message, {
                    variant: 'error',
                    autoHideDuration: 3000,
                });
            }
        }
    }

    GetAllDeals = async (DealType, token, peer, deal_id) => {

        this.props.history.push("/report/" + DealType + "/mapping-page/" + deal_id + "/null/null");
        const message = "Data saved successfully";
        this.props.enqueueSnackbar(message, {
            variant: 'info',
            autoHideDuration: 2000,
        });

    };


    render() {
        return (
            <React.Fragment>
                <div className="page">
                    <div className="content">
                        <div className="header"><Header pageTitle={this.state.pageTitle}></Header>
                            {this.state.getLoader == false ? '' : <LinearLoader></LinearLoader>}
                        </div>
                        <div className="page-content text-center">
                            <div className="row">
                                <div className="col-md-12 text-left">
                                    <h3 className="title-page">{!this.state.pageTitle ? '' : this.state.pageTitle}

                                    </h3>
                                </div>

                                <div className="col-md-12">
                                    {this.state.loading == false ? <Loader msg={"Loading Modules..."} /> :
                                        <React.Fragment>
                                            <Form
                                                schema={this.state.schema}
                                                onSubmit={this.onSubmit}
                                                onChange={this.onFormChanged}
                                                onBlur={this.onBlur}
                                                widgets={widgets}
                                                omitExtraData={true}
                                                liveOmit={true}
                                                FieldTemplate={CustomFieldTemplate}
                                                formData={this.state.formData}
                                                uiSchema={this.state.uiSchema}
                                                ObjectFieldTemplate={ObjectFieldTemplate}
                                            >
                                                {this.state.formAction == 'add' ?
                                                    <Button variant="contained" color="primary" id="signinbutton" type="submit">

                                                        Save to Network
                                                        {this.state.formLoader == false ? '' : <Loader msg={""} />}
                                                    </Button>
                                                    :
                                                    <Button variant="contained" color="primary" id="signinbutton" type="submit">

                                                        Save to Network
                                                        {this.state.formLoader == false ? '' : <Loader msg={""} />}
                                                    </Button>
                                                }
                                            </Form>
                                        </React.Fragment>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default withSnackbar(initialSetup);

import axios from 'axios';
// import React from 'react';
import { createBrowserHistory } from "history";
import { deepOrange } from "@material-ui/core/colors";
import { createMuiTheme } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
const token = localStorage.getItem("token");
const peer = localStorage.getItem("peer");
const userid = localStorage.getItem("user_id");
const user_name = localStorage.getItem("user_name");
const OrgName = localStorage.getItem("OrgName");

const LimaPeer = "peer0.wsfstrustee-net";
const role = "trustee";
const saludaPeer = localStorage.getItem("peer");
const ChannelName = localStorage.getItem('ChannelName')

export const history = createBrowserHistory();

export const theme = createMuiTheme({

	palette: {
		primary: {
			main: '#048c88',
			light: '#064e4a',
			dark: '#064e4a'
		},
		secondary: {
			main: '#49ae46',
			light: '#d5f2f0',
			dark: '#2e9a2b'
		}
	},
	props: {
		MuiButton: {
			size: 'medium',
		},

		MuiIconButton: {
			size: 'medium',
		},

		MuiListItem: {
			dense: true,
		},

		MuiFab: {
			size: 'medium',
		},
		MuiTable: {
			size: 'medium',
		},
		MuiTextField: {

			variant: "filled",
			size: "medium",
		},
		MuiToolbar: {
			variant: 'dense',
		},
	},

	overrides: {
	},

});

const options = {
	autoConfig: true, // set pixel's autoConfig
	debug: true, // enable logs
};

export const API = axios.create({
	baseURL: process.env.react_app_base_url + '/',
});

export function setUpAxios() {
	// const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	API.interceptors.response.use(response => {

		console.log("response", response)
		if (response !== null) {
			if (response.data.token == -1) {
				alert("Token expired, please login again!")
				window.location.href = "/";
			} else if (response.status == 204) {
				// alert("No content / missing argument");
				// const message = "No content / missing argument";
				// this.enqueueSnackbar(message, {
				//   variant: 'error',
				//   autoHideDuration: 5000,
				// });
				return response;
			}
			else if (response.status == 208) {

				// const message = "No content / missing argument";
				// this.enqueueSnackbar(message, {
				//   variant: 'error',
				//   autoHideDuration: 5000,
				// });
				return response;
			}
			else if (response.status === 400) {
				alert("Missing argument");
				// console.log("Interceptor - 400" + error.response.data.messages);
				// const message = "Missing argument";
				// this.enqueueSnackbar(message, {
				//   variant: 'error',
				//   autoHideDuration: 5000,
				// });
				return null;



			}
			else {
				console.log("response response", response)
				return response;
			}

		} else {
			alert("No response from server!")
		}
	}, error => {

		console.log("error", JSON.stringify(error));

		if (!error.response) {
			console.log("Interceptor - Server is not running");
			// window.location.href = "/server-down";


		} else if (error.response.status === 401) {

			console.log("Interceptor - 401 - Unauthorized: Token Invalid, please login again");

		} else if (error.response.status === 400) {
			alert("Missing argument");
			console.log("Interceptor - 400" + error.response.data.messages);
			// const message = "Missing argument";
			// this.enqueueSnackbar(message, {
			//   variant: 'error',
			//   autoHideDuration: 5000,
			// });
			return null;



		} else if (error.response.status === 404) {
			alert("Api not found!");
			//const message = "Api not found!";
			// this.enqueueSnackbar(message, {
			//   variant: 'error',
			//   autoHideDuration: 5000,
			// });
			console.log("API not Found");
			return null;

		} else if (error.response.status === 503) {

			console.log("Interceptor - 503" + error.response.data.messages);
			alert("503 -Service Unavailable!");
			// const message = "503 -Service Unavailable!";
			// this.props.enqueueSnackbar(message, {
			//   variant: 'error',
			//   autoHideDuration: 5000,
			// });
			return null;

		} else if (error.response.status === 504) {

			console.log("Interceptor - 504" + error.response.data.messages);
			alert("504 Gateway Timeout")

			// const message = "504-Gateway Timeout!";
			// this.props.enqueueSnackbar(message, {
			//   variant: 'error',
			//   autoHideDuration: 5000,
			// });
			return null;

		}


		else {

			return Promise.reject(error);

		}


	})

};


// Common APIS
// if (DealType == "LimaOne") {

// } else if (DealType == "Bawag") {

// } else if (DealType == "Saluda PAC1") {

// } else if (DealType == "Saluda FIG1") {

// } else if (DealType == "Saluda SEQ1") {

// }

// Common APIS
export const TrusteeToken = async (DealType, OrgName, UserName) => {
	let response = null
	
	if (DealType == "LimaOne") {
		response = await API.get(process.env.react_app_base_url + 'backendapilima/api/v1/trustee/jwt_token?UserName=' + UserName + '&OrgName=' + OrgName)
		return response;

	} else if (DealType == "Bawag") {

		response = await API.get(process.env.react_app_base_url + 'backendapibawag/api/v1/trustee/jwt_token?UserName=' + UserName + '&OrgName=' + OrgName)
		return response;

	} else if (DealType == "Saluda PAC1") {

		response = await API.get(process.env.react_app_base_url + 'backendapisaluda/api/v1/trustee/jwt_token?UserName=' + UserName + '&OrgName=' + OrgName)
		return response;

	} else if (DealType == "Saluda FIG1") {

		response = await API.get(process.env.react_app_base_url + 'backendapisaludagrade/api/v1/trustee/jwt_token?UserName=' + UserName + '&OrgName=' + OrgName)
		return response;

	} else if (DealType == "Saluda SEQ1") {

		response = await API.get(process.env.react_app_base_url + 'backendapisaludagradeseq1/api/v1/trustee/jwt_token?UserName=' + UserName + '&OrgName=' + OrgName)
		return response;

	}
	else if (DealType == "AlphaFlow") {

		response = await API.get(process.env.react_app_base_url + 'backendapialphaflow/api/v1/trustee/jwt_token?UserName=' + UserName + '&OrgName=' + OrgName)
		return response;

	}
	else if (DealType == "Saluda FIG2") {

		response = await API.get(process.env.react_app_base_url + 'backendapisaludafig2/api/v1/trustee/jwt_token?UserName=' + UserName + '&OrgName=' + OrgName)
		return response;

	}
	else if (DealType == "Saluda BC1") {

		response = await API.get(process.env.react_app_base_url + 'backendapibc1/api/v1/trustee/jwt_token?UserName=' + UserName + '&OrgName=' + OrgName)
		return response;

	}
	else if (DealType == "Reigo") {

		response = await API.get(process.env.react_app_base_url + 'backendapireigo/api/v1/trustee/jwt_token?UserName=' + UserName + '&OrgName=' + OrgName)
		return response;

	}
	else if (DealType == "Dominion") {

		response = await API.get(process.env.react_app_base_url + 'backendapidominion/api/v1/trustee/jwt_token?UserName=' + UserName + '&OrgName=' + OrgName)
		return response;

	}
	else if (DealType == "Saluda WL1") {

		response = await API.get(process.env.react_app_base_url + 'backendapisaludawl1/api/v1/trustee/jwt_token?UserName=' + UserName + '&OrgName=' + OrgName)
		return response;

	}
	else if (DealType == "Spruce Hill") {

		response = await API.get(process.env.react_app_base_url + 'backendapisprucehill/api/v1/trustee/jwt_token?UserName=' + UserName + '&OrgName=' + OrgName)
		return response;

	}
	else if (DealType == "Saluda RTL1") {

		response = await API.get(process.env.react_app_base_url + 'backendapisaludartl1/api/v1/trustee/jwt_token?UserName=' + UserName + '&OrgName=' + OrgName)
		return response;

	}
	else if (DealType == "Stoa 2021") {

		response = await API.get(process.env.react_app_base_url + 'backendapistoa/api/v1/trustee/jwt_token?UserName=' + UserName + '&OrgName=' + OrgName)
		return response;

	}
	else if (DealType == "Tildene") {

		response = await API.get(process.env.react_app_base_url + 'backendapitildene/api/v1/trustee/jwt_token?UserName=' + UserName + '&OrgName=' + OrgName)
		return response;

	}
	else if (DealType == "Saluda MF1") {

		response = await API.get(process.env.react_app_base_url + 'backendapisaludamf1/api/v1/trustee/jwt_token?UserName=' + UserName + '&OrgName=' + OrgName)
		return response;

	}
	else if (DealType == "Palisades") {

		response = await API.get(process.env.react_app_base_url + 'backendapipalisades/api/v1/trustee/jwt_token?UserName=' + UserName + '&OrgName=' + OrgName)
		return response;

	}
	else if (DealType == "Saluda RTL2") {

		response = await API.get(process.env.react_app_base_url + 'backendapisaludartl2/api/v1/trustee/jwt_token?UserName=' + UserName + '&OrgName=' + OrgName)
		return response;

	}
	else if (DealType == "Saluda PRE1") {

		response = await API.get(process.env.react_app_base_url + 'backendapisaludapre/api/v1/trustee/jwt_token?UserName=' + UserName + '&OrgName=' + OrgName)
		return response;

	}
	else if (DealType == "MFA") {

		response = await API.get(process.env.react_app_base_url + 'backendapimfa/api/v1/trustee/jwt_token?UserName=' + UserName + '&OrgName=' + OrgName)
		return response;

	}
	else if (DealType == "Setpoint") {

		response = await API.get(process.env.react_app_base_url + 'backendapisetpoint/api/v1/trustee/jwt_token?UserName=' + UserName + '&OrgName=' + OrgName)
		return response;

	}
	else if (DealType == "Saluda BC2") {

		response = await API.get(process.env.react_app_base_url + 'backendapibc2/api/v1/trustee/jwt_token?UserName=' + UserName + '&OrgName=' + OrgName)
		return response;

	}
	else if (DealType == "Saluda Builders") {

		response = await API.get(process.env.react_app_base_url + 'backendapibuilders/api/v1/trustee/jwt_token?UserName=' + UserName + '&OrgName=' + OrgName)
		return response;

	}
	else if (DealType == "NPL") {

		response = await API.get(process.env.react_app_base_url + 'backendapinpl/api/v1/trustee/jwt_token?UserName=' + UserName + '&OrgName=' + OrgName)
		return response;
	}
	else if (DealType == "Stoa 2022") {

		response = await API.get(process.env.react_app_base_url + 'backendapistoa2022/api/v1/trustee/jwt_token?UserName=' + UserName + '&OrgName=' + OrgName)
		return response;

	}
	else if (DealType == "Unlock") {

		response = await API.get(process.env.react_app_base_url + 'backendapiunlock/api/v1/trustee/jwt_token?UserName=' + UserName + '&OrgName=' + OrgName)
		return response;

	}
};

export const authenticate = async (DealType, data) => {
	console.log("authenticate data", data)
	let response = null
	if (data.OrgName == "wsfstrustee") {
		if (data.UserName == "trusteeTest" && DealType == "Saluda PAC1") {
			response = await API.post(process.env.react_app_base_url + 'backendapisaluda/authenticate', data)
			return response;
		}
		else {
			response = await API.post(process.env.react_app_base_url + 'backendapilima/authenticate', data)
			return response;
		}
	} else {
		if (DealType == "LimaOne") {
			response = await API.post(process.env.react_app_base_url + 'backendapilima/authenticate', data)
			return response;
		} else if (DealType == "Bawag") {
			response = await API.post(process.env.react_app_base_url + 'backendapibawag/authenticate', data)
			return response;
		} else if (DealType == "Saluda PAC1") {
			response = await API.post(process.env.react_app_base_url + 'backendapisaluda/authenticate', data)
			return response;
		} else if (DealType == "Saluda FIG1") {
			response = await API.post(process.env.react_app_base_url + 'backendapisaludagrade/authenticate', data)
			return response;
		} else if (DealType == "Saluda SEQ1") {
			response = await API.post(process.env.react_app_base_url + 'backendapisaludagradeseq1/authenticate', data)
			return response;
		}
		else if (DealType == "AlphaFlow") {
			response = await API.post(process.env.react_app_base_url + 'backendapialphaflow/authenticate', data)
			return response;
		}
		else if (DealType == "Saluda FIG2") {
			response = await API.post(process.env.react_app_base_url + 'backendapisaludafig2/authenticate', data)
			return response;
		}
		else if (DealType == "Saluda BC1") {
			response = await API.post(process.env.react_app_base_url + 'backendapibc1/authenticate', data)
			return response;
		}
		else if (DealType == "Reigo") {
			response = await API.post(process.env.react_app_base_url + 'backendapireigo/authenticate', data)
			return response;
		}
		else if (DealType == "Dominion") {
			response = await API.post(process.env.react_app_base_url + 'backendapidominion/authenticate', data)
			return response;
		}
		else if (DealType == "Saluda WL1") {
			response = await API.post(process.env.react_app_base_url + 'backendapisaludawl1/authenticate', data)
			return response;
		}
		else if (DealType == "Spruce Hill") {
			response = await API.post(process.env.react_app_base_url + 'backendapisprucehill/authenticate', data)
			return response;
		}
		else if (DealType == "Saluda RTL1") {
			response = await API.post(process.env.react_app_base_url + 'backendapisaludartl1/authenticate', data)
			return response;
		}
		else if (DealType == "Stoa 2021") {
			response = await API.post(process.env.react_app_base_url + 'backendapistoa/authenticate', data)
			return response;
		}
		else if (DealType == "Tildene") {
			response = await API.post(process.env.react_app_base_url + 'backendapitildene/authenticate', data)
			return response;
		}
		else if (DealType == "Saluda MF1") {
			response = await API.post(process.env.react_app_base_url + 'backendapisaludamf1/authenticate', data)
			return response;
		}
		else if (DealType == "Palisades") {
			response = await API.post(process.env.react_app_base_url + 'backendapipalisades/authenticate', data)
			return response;
		}
		else if (DealType == "Saluda RTL2") {
			response = await API.post(process.env.react_app_base_url + 'backendapisaludartl2/authenticate', data)
			return response;
		}
		else if (DealType == "Saluda PRE1") {
			response = await API.post(process.env.react_app_base_url + 'backendapisaludapre/authenticate', data)
			return response;
		}
		else if (DealType == "MFA") {
			response = await API.post(process.env.react_app_base_url + 'backendapimfa/authenticate', data)
			return response;
		}
		else if (DealType == "Setpoint") {
			response = await API.post(process.env.react_app_base_url + 'backendapisetpoint/authenticate', data)
			return response;
		}
		else if (DealType == "Saluda BC2") {
			response = await API.post(process.env.react_app_base_url + 'backendapibc2/authenticate', data)
			return response;
		}
		else if (DealType == "Saluda Builders") {
			response = await API.post(process.env.react_app_base_url + 'backendapibuilders/authenticate', data)
			return response;
		}
		else if (DealType == "NPL") {
			response = await API.post(process.env.react_app_base_url + 'backendapinpl/authenticate', data)
			return response;
		}
		else if (DealType == "Stoa 2022") {
			response = await API.post(process.env.react_app_base_url + 'backendapistoa2022/authenticate', data)
			return response;
		}
		else if (DealType == "Unlock") {
			response = await API.post(process.env.react_app_base_url + 'backendapiunlock/authenticate', data)
			return response;
		}
	}
};

export const createUserRole = async (DealType, data) => {
	console.log("authenticate data", data)
	let response = null

		if (DealType == "LimaOne") {
			response = await API.post(process.env.react_app_base_url + 'backendapilima/createUserRole', data)
			return response;
		} else if (DealType == "Bawag") {
			response = await API.post(process.env.react_app_base_url + 'backendapibawag/createUserRole', data)
			return response;
		} else if (DealType == "Saluda PAC1") {
			response = await API.post(process.env.react_app_base_url + 'backendapisaluda/createUserRole', data)
			return response;
		} else if (DealType == "Saluda FIG1") {
			response = await API.post(process.env.react_app_base_url + 'backendapisaludagrade/createUserRole', data)
			return response;
		} else if (DealType == "Saluda SEQ1") {
			response = await API.post(process.env.react_app_base_url + 'backendapisaludagradeseq1/createUserRole', data)
			return response;
		}
		else if (DealType == "AlphaFlow") {
			response = await API.post(process.env.react_app_base_url + 'backendapialphaflow/createUserRole', data)
			return response;
		}
		else if (DealType == "Saluda FIG2") {
			response = await API.post(process.env.react_app_base_url + 'backendapisaludafig2/createUserRole', data)
			return response;
		}
		else if (DealType == "Saluda BC1") {
			response = await API.post(process.env.react_app_base_url + 'backendapibc1/createUserRole', data)
			return response;
		}
		else if (DealType == "Reigo") {
			response = await API.post(process.env.react_app_base_url + 'backendapireigo/createUserRole', data)
			return response;
		}
		else if (DealType == "Dominion") {
			response = await API.post(process.env.react_app_base_url + 'backendapidominion/createUserRole', data)
			return response;
		}
		else if (DealType == "Saluda WL1") {
			response = await API.post(process.env.react_app_base_url + 'backendapisaludawl1/createUserRole', data)
			return response;
		}
		else if (DealType == "Spruce Hill") {
			response = await API.post(process.env.react_app_base_url + 'backendapisprucehill/createUserRole', data)
			return response;
		}
		else if (DealType == "Saluda RTL1") {
			response = await API.post(process.env.react_app_base_url + 'backendapisaludartl1/createUserRole', data)
			return response;
		}
		else if (DealType == "Stoa 2021") {
			response = await API.post(process.env.react_app_base_url + 'backendapistoa/createUserRole', data)
			return response;
		}
		else if (DealType == "Tildene") {
			response = await API.post(process.env.react_app_base_url + 'backendapitildene/createUserRole', data)
			return response;
		}
		else if (DealType == "Saluda MF1") {
			response = await API.post(process.env.react_app_base_url + 'backendapisaludamf1/createUserRole', data)
			return response;
		}
		else if (DealType == "Palisades") {
			response = await API.post(process.env.react_app_base_url + 'backendapipalisades/createUserRole', data)
			return response;
		}
		else if (DealType == "Saluda RTL2") {
			response = await API.post(process.env.react_app_base_url + 'backendapisaludartl2/createUserRole', data)
			return response;
		}
		else if (DealType == "Saluda PRE1") {
			response = await API.post(process.env.react_app_base_url + 'backendapisaludapre/createUserRole', data)
			return response;
		}
		else if (DealType == "MFA") {
			response = await API.post(process.env.react_app_base_url + 'backendapimfa/createUserRole', data)
			return response;
		}
		else if (DealType == "Setpoint") {
			response = await API.post(process.env.react_app_base_url + 'backendapisetpoint/createUserRole', data)
			return response;
		}
		else if (DealType == "Saluda BC2") {
			response = await API.post(process.env.react_app_base_url + 'backendapibc2/createUserRole', data)
			return response;
		}
		else if (DealType == "Saluda Builders") {
			response = await API.post(process.env.react_app_base_url + 'backendapibuilders/createUserRole', data)
			return response;
		}
		else if (DealType == "NPL") {
			response = await API.post(process.env.react_app_base_url + 'backendapinpl/createUserRole', data)
			return response;
		}
		else if (DealType == "Stoa 2022") {
			response = await API.post(process.env.react_app_base_url + 'backendapistoa2022/createUserRole', data)
			return response;
		}
		else if (DealType == "Unlock") {
			response = await API.post(process.env.react_app_base_url + 'backendapiunlock/createUserRole', data)
			return response;
		}
	}


export const addUser = async (DealType, data) => {
	let response = null
	if (data.OrgName == "wsfstrustee") {
		response = await API.post(process.env.react_app_base_url + 'backendapilima/addTrusteeUser', data)
		return response;
	} else {
		if (DealType == "LimaOne") {
			response = await API.post(process.env.react_app_base_url + 'backendapilima/addUser', data)
			return response;
		} else if (DealType == "Bawag") {
			response = await API.post(process.env.react_app_base_url + 'backendapibawag/addUser', data)
			return response;
		} else if (DealType == "Saluda PAC1") {
			response = await API.post(process.env.react_app_base_url + 'backendapisaluda/addUser', data)
			return response;
		} else if (DealType == "Saluda FIG1") {
			response = await API.post(process.env.react_app_base_url + 'backendapisaludagrade/addUser', data)
			return response;
		} else if (DealType == "Saluda SEQ1") {
			response = await API.post(process.env.react_app_base_url + 'backendapisaludagradeseq1/addUser', data)
			return response;
		}
		else if (DealType == "AlphaFlow") {
			response = await API.post(process.env.react_app_base_url + 'backendapialphaflow/addUser', data)
			return response;
		}
		else if (DealType == "Saluda FIG2") {
			response = await API.post(process.env.react_app_base_url + 'backendapisaludafig2/addUser', data)
			return response;
		}
		else if (DealType == "Saluda BC1") {
			response = await API.post(process.env.react_app_base_url + 'backendapibc1/addUser', data)
			return response;
		}
		else if (DealType == "Reigo") {
			response = await API.post(process.env.react_app_base_url + 'backendapireigo/addUser', data)
			return response;
		}
		else if (DealType == "Dominion") {
			response = await API.post(process.env.react_app_base_url + 'backendapidominion/addUser', data)
			return response;
		}
		else if (DealType == "Saluda WL1") {
			response = await API.post(process.env.react_app_base_url + 'backendapisaludawl1/addUser', data)
			return response;
		}
		else if (DealType == "Spruce Hill") {
			response = await API.post(process.env.react_app_base_url + 'backendapisprucehill/addUser', data)
			return response;
		}
		else if (DealType == "Saluda RTL1") {
			response = await API.post(process.env.react_app_base_url + 'backendapisaludartl1/addUser', data)
			return response;
		}
		else if (DealType == "Stoa 2021") {
			response = await API.post(process.env.react_app_base_url + 'backendapistoa/addUser', data)
			return response;
		}
		else if (DealType == "Tildene") {
			response = await API.post(process.env.react_app_base_url + 'backendapitildene/addUser', data)
			return response;
		}
		else if (DealType == "Saluda MF1") {
			response = await API.post(process.env.react_app_base_url + 'backendapisaludamf1/addUser', data)
			return response;
		}
		else if (DealType == "Palisades") {
			response = await API.post(process.env.react_app_base_url + 'backendapipalisades/addUser', data)
			return response;
		}
		else if (DealType == "Saluda RTL2") {
			response = await API.post(process.env.react_app_base_url + 'backendapisaludartl2/addUser', data)
			return response;
		}
		else if (DealType == "Saluda PRE1") {
			response = await API.post(process.env.react_app_base_url + 'backendapisaludapre/addUser', data)
			return response;
		}
		else if (DealType == "MFA") {
			response = await API.post(process.env.react_app_base_url + 'backendapimfa/addUser', data)
			return response;
		}
		else if (DealType == "Setpoint") {
			response = await API.post(process.env.react_app_base_url + 'backendapisetpoint/addUser', data)
			return response;
		}
		else if (DealType == "Saluda BC2") {
			response = await API.post(process.env.react_app_base_url + 'backendapibc2/addUser', data)
			return response;
		}
		else if (DealType == "Saluda Builders") {
			response = await API.post(process.env.react_app_base_url + 'backendapibuilders/addUser', data)
			return response;
		}
		else if (DealType == "NPL") {
			response = await API.post(process.env.react_app_base_url + 'backendapinpl/addUser', data)
			return response;
		}
		else if (DealType == "Stoa 2022") {
			response = await API.post(process.env.react_app_base_url + 'backendapistoa2022/addUser', data)
			return response;
		}
		else if (DealType == "Unlock") {
			response = await API.post(process.env.react_app_base_url + 'backendapiunlock/addUser', data)
			return response;
		}
	}
};
export const GetUserRole = async (DealType, Role) => {
	let response = null
	if (DealType == "LimaOne") {
		response = await API.get(process.env.react_app_base_url + 'backendapilima/getUserRole?dealname=' + DealType + '&role=' + Role)
		return response;

	} else if (DealType == "Bawag") {

		response = await API.get(process.env.react_app_base_url + 'backendapibawag/getUserRole?dealname=' + DealType + '&role=' + Role)
		return response;

	} else if (DealType == "Saluda PAC1") {

		response = await API.get(process.env.react_app_base_url + 'backendapisaluda/getUserRole?dealname=' + DealType + '&role=' + Role)
		return response;

	} else if (DealType == "Saluda FIG1") {

		response = await API.get(process.env.react_app_base_url + 'backendapisaludagrade/getUserRole?dealname=' + DealType + '&role=' + Role)
		return response;

	} else if (DealType == "Saluda SEQ1") {

		response = await API.get(process.env.react_app_base_url + 'backendapisaludagradeseq1/getUserRole?dealname=' + DealType + '&role=' + Role)
		return response;

	}
	else if (DealType == "AlphaFlow") {

		response = await API.get(process.env.react_app_base_url + 'backendapialphaflow/getUserRole?dealname=' + DealType + '&role=' + Role)
		return response;

	}
	else if (DealType == "Saluda FIG2") {

		response = await API.get(process.env.react_app_base_url + 'backendapisaludafig2/getUserRole?dealname=' + DealType + '&role=' + Role)
		return response;

	}
	else if (DealType == "Saluda BC1") {

		response = await API.get(process.env.react_app_base_url + 'backendapibc1/getUserRole?dealname=' + DealType + '&role=' + Role)
		return response;

	}
	else if (DealType == "Reigo") {

		response = await API.get(process.env.react_app_base_url + 'backendapireigo/getUserRole?dealname=' + DealType + '&role=' + Role)
		return response;

	}
	else if (DealType == "Dominion") {

		response = await API.get(process.env.react_app_base_url + 'backendapidominion/getUserRole?dealname=' + DealType + '&role=' + Role)
		return response;

	}
	else if (DealType == "Saluda WL1") {

		response = await API.get(process.env.react_app_base_url + 'backendapisaludawl1/getUserRole?dealname=' + DealType + '&role=' + Role)
		return response;

	}
	else if (DealType == "Spruce Hill") {

		response = await API.get(process.env.react_app_base_url + 'backendapisprucehill/getUserRole?dealname=' + DealType + '&role=' + Role)
		return response;

	}
	else if (DealType == "Saluda RTL1") {

		response = await API.get(process.env.react_app_base_url + 'backendapisaludartl1/getUserRole?dealname=' + DealType + '&role=' + Role)
		return response;

	}
	else if (DealType == "Stoa 2021") {

		response = await API.get(process.env.react_app_base_url + 'backendapistoa/getUserRole?dealname=' + DealType + '&role=' + Role)
		return response;

	}
	else if (DealType == "Tildene") {

		response = await API.get(process.env.react_app_base_url + 'backendapitildene/getUserRole?dealname=' + DealType + '&role=' + Role)
		return response;

	}
	else if (DealType == "Saluda MF1") {

		response = await API.get(process.env.react_app_base_url + 'backendapisaludamf1/getUserRole?dealname=' + DealType + '&role=' + Role)
		return response;

	}
	else if (DealType == "Palisades") {

		response = await API.get(process.env.react_app_base_url + 'backendapipalisades/getUserRole?dealname=' + DealType + '&role=' + Role)
		return response;

	}
	else if (DealType == "Saluda RTL2") {

		response = await API.get(process.env.react_app_base_url + 'backendapisaludartl2/getUserRole?dealname=' + DealType + '&role=' + Role)
		return response;

	}
	else if (DealType == "Saluda PRE1") {

		response = await API.get(process.env.react_app_base_url + 'backendapisaludapre/getUserRole?dealname=' + DealType + '&role=' + Role)
		return response;

	}
	else if (DealType == "MFA") {

		response = await API.get(process.env.react_app_base_url + 'backendapimfa/getUserRole?dealname=' + DealType + '&role=' + Role)
		return response;

	}
	else if (DealType == "Setpoint") {

		response = await API.get(process.env.react_app_base_url + 'backendapisetpoint/getUserRole?dealname=' + DealType + '&role=' + Role)
		return response;

	}
	else if (DealType == "Saluda BC2") {

		response = await API.get(process.env.react_app_base_url + 'backendapibc2/getUserRole?dealname=' + DealType + '&role=' + Role)
		return response;

	}
	else if (DealType == "Saluda Builders") {

		response = await API.get(process.env.react_app_base_url + 'backendapibuilders/getUserRole?dealname=' + DealType + '&role=' + Role)
		return response;

	}
	else if (DealType == "NPL") {

		response = await API.get(process.env.react_app_base_url + 'backendapinpl/getUserRole?dealname=' + DealType + '&role=' + Role)
		return response;

	}
	else if (DealType == "Stoa 2022") {

		response = await API.get(process.env.react_app_base_url + 'backendapistoa2022/getUserRole?dealname=' + DealType + '&role=' + Role)
		return response;

	}
	else if (DealType == "Unlock") {

		response = await API.get(process.env.react_app_base_url + 'backendapiunlock/getUserRole?dealname=' + DealType + '&role=' + Role)
		return response;

	}
};


export const getAllUsers = async (DealType, OrgName) => {
	console.log("DealType", DealType,OrgName)
	let response = null
	if (OrgName == "wsfstrustee") {
		const response = await API.get(process.env.react_app_base_url + 'backendapilima/getUserByOrgName?OrgName=' + OrgName + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else {
		if (DealType == "LimaOne") {
			const response = await API.get(process.env.react_app_base_url + 'backendapilima/getUserByOrgName?OrgName=' + OrgName + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
			return response;

		} else if (DealType == "Bawag") {

			response = await API.get(process.env.react_app_base_url + 'backendapibawag/getUserByOrgName?OrgName=' + OrgName + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
			return response;

		} else if (DealType == "Saluda PAC1") {

			response = await API.get(process.env.react_app_base_url + 'backendapisaluda/getUserByOrgName?OrgName=' + OrgName + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
			return response;

		} else if (DealType == "Saluda FIG1") {

			response = await API.get(process.env.react_app_base_url + 'backendapisaludagrade/getUserByOrgName?OrgName=' + OrgName + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
			return response;

		} else if (DealType == "Saluda SEQ1") {

			response = await API.get(process.env.react_app_base_url + 'backendapisaludagradeseq1/getUserByOrgName?OrgName=' + OrgName + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
			return response;

		}
		else if (DealType == "AlphaFlow") {

			response = await API.get(process.env.react_app_base_url + 'backendapialphaflow/getUserByOrgName?OrgName=' + OrgName + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
			return response;

		}
		else if (DealType == "Saluda FIG2") {

			response = await API.get(process.env.react_app_base_url + 'backendapisaludafig2/getUserByOrgName?OrgName=' + OrgName + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
			return response;

		}
		else if (DealType == "Saluda BC1") {

			response = await API.get(process.env.react_app_base_url + 'backendapibc1/getUserByOrgName?OrgName=' + OrgName + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
			return response;

		}
		else if (DealType == "Reigo") {

			response = await API.get(process.env.react_app_base_url + 'backendapireigo/getUserByOrgName?OrgName=' + OrgName + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
			return response;

		}
		else if (DealType == "Dominion") {

			response = await API.get(process.env.react_app_base_url + 'backendapidominion/getUserByOrgName?OrgName=' + OrgName + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
			return response;

		}
		else if (DealType == "Saluda WL1") {

			response = await API.get(process.env.react_app_base_url + 'backendapisaludawl1/getUserByOrgName?OrgName=' + OrgName + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
			return response;

		}
		else if (DealType == "Spruce Hill") {

			response = await API.get(process.env.react_app_base_url + 'backendapisprucehill/getUserByOrgName?OrgName=' + OrgName + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
			return response;

		}
		else if (DealType == "Saluda RTL1") {

			response = await API.get(process.env.react_app_base_url + 'backendapisaludartl1/getUserByOrgName?OrgName=' + OrgName + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
			return response;

		}
		else if (DealType == "Stoa 2021") {

			response = await API.get(process.env.react_app_base_url + 'backendapistoa/getUserByOrgName?OrgName=' + OrgName + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
			return response;

		}
		else if (DealType == "Tildene") {

			response = await API.get(process.env.react_app_base_url + 'backendapitildene/getUserByOrgName?OrgName=' + OrgName + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
			return response;

		}
		else if (DealType == "Saluda MF1") {

			response = await API.get(process.env.react_app_base_url + 'backendapisaludamf1/getUserByOrgName?OrgName=' + OrgName + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
			return response;

		}
		else if (DealType == "Palisades") {

			response = await API.get(process.env.react_app_base_url + 'backendapipalisades/getUserByOrgName?OrgName=' + OrgName + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
			return response;

		}
		else if (DealType == "Saluda RTL2") {

			response = await API.get(process.env.react_app_base_url + 'backendapisaludartl2/getUserByOrgName?OrgName=' + OrgName + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
			return response;

		}
		else if (DealType == "Saluda PRE1") {

			response = await API.get(process.env.react_app_base_url + 'backendapisaludapre/getUserByOrgName?OrgName=' + OrgName + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
			return response;

		}
		else if (DealType == "MFA") {

			response = await API.get(process.env.react_app_base_url + 'backendapimfa/getUserByOrgName?OrgName=' + OrgName + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
			return response;

		}
		else if (DealType == "Setpoint") {

			response = await API.get(process.env.react_app_base_url + 'backendapisetpoint/getUserByOrgName?OrgName=' + OrgName + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
			return response;

		}
		else if (DealType == "Saluda BC2") {

			response = await API.get(process.env.react_app_base_url + 'backendapibc2/getUserByOrgName?OrgName=' + OrgName + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
			return response;

		}
		else if (DealType == "Saluda Builders") {

			response = await API.get(process.env.react_app_base_url + 'backendapibuilders/getUserByOrgName?OrgName=' + OrgName + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
			return response;

		}
		else if (DealType == "NPL") {

			response = await API.get(process.env.react_app_base_url + 'backendapinpl/getUserByOrgName?OrgName=' + OrgName + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
			return response;

		}
		else if (DealType == "Stoa 2022") {

			response = await API.get(process.env.react_app_base_url + 'backendapistoa2022/getUserByOrgName?OrgName=' + OrgName + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
			return response;

		}
		else if (DealType == "Unlock") {

			response = await API.get(process.env.react_app_base_url + 'backendapiunlock/getUserByOrgName?OrgName=' + OrgName + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
			return response;

		}
	}
};

export const getAllUserRoles = async () => {
	const response = await API.get(process.env.react_app_base_url + 'backendapilima/getAllUserRoles')
	return response;
};



export const approveUser = async (DealType, data) => {

	let response = null
	if (data.OrgName == "wsfstrustee") {
		response = await API.post(process.env.react_app_base_url + 'backendapilima/approveTrusteeUser', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else {
		if (DealType == "LimaOne") {
			response = await API.post(process.env.react_app_base_url + 'backendapilima/approveUser', data,{ headers: {"authorization" : `Bearer ${token}`} })
			return response;
		} else if (DealType == "Bawag") {
			response = await API.post(process.env.react_app_base_url + 'backendapibawag/approveUser', data,{ headers: {"authorization" : `Bearer ${token}`} })
			return response;
		} else if (DealType == "Saluda PAC1") {
			response = await API.post(process.env.react_app_base_url + 'backendapisaluda/approveUser', data,{ headers: {"authorization" : `Bearer ${token}`} })
			return response;
		} else if (DealType == "Saluda FIG1") {
			response = await API.post(process.env.react_app_base_url + 'backendapisaludagrade/approveUser', data,{ headers: {"authorization" : `Bearer ${token}`} })
			return response;
		} else if (DealType == "Saluda SEQ1") {
			response = await API.post(process.env.react_app_base_url + 'backendapisaludagradeseq1/approveUser', data,{ headers: {"authorization" : `Bearer ${token}`} })
			return response;
		}
		else if (DealType == "AlphaFlow") {
			response = await API.post(process.env.react_app_base_url + 'backendapialphaflow/approveUser', data,{ headers: {"authorization" : `Bearer ${token}`} })
			return response;
		}
		else if (DealType == "Saluda FIG2") {
			response = await API.post(process.env.react_app_base_url + 'backendapisaludafig2/approveUser', data,{ headers: {"authorization" : `Bearer ${token}`} })
			return response;
		}
		else if (DealType == "Saluda BC1") {
			response = await API.post(process.env.react_app_base_url + 'backendapibc1/approveUser', data,{ headers: {"authorization" : `Bearer ${token}`} })
			return response;
		}
		else if (DealType == "Reigo") {
			response = await API.post(process.env.react_app_base_url + 'backendapireigo/approveUser', data,{ headers: {"authorization" : `Bearer ${token}`} })
			return response;
		}
		else if (DealType == "Dominion") {
			response = await API.post(process.env.react_app_base_url + 'backendapidominion/approveUser', data,{ headers: {"authorization" : `Bearer ${token}`} })
			return response;
		}
		else if (DealType == "Saluda WL1") {
			response = await API.post(process.env.react_app_base_url + 'backendapisaludawl1/approveUser', data,{ headers: {"authorization" : `Bearer ${token}`} })
			return response;
		}
		else if (DealType == "Spruce Hill") {
			response = await API.post(process.env.react_app_base_url + 'backendapisprucehill/approveUser', data,{ headers: {"authorization" : `Bearer ${token}`} })
			return response;
		}
		else if (DealType == "Saluda RTL1") {
			response = await API.post(process.env.react_app_base_url + 'backendapisaludartl1/approveUser', data,{ headers: {"authorization" : `Bearer ${token}`} })
			return response;
		}
		else if (DealType == "Stoa 2021") {
			response = await API.post(process.env.react_app_base_url + 'backendapistoa/approveUser', data,{ headers: {"authorization" : `Bearer ${token}`} })
			return response;
		}
		else if (DealType == "Tildene") {
			response = await API.post(process.env.react_app_base_url + 'backendapitildene/approveUser', data,{ headers: {"authorization" : `Bearer ${token}`} })
			return response;
		}
		else if (DealType == "Saluda MF1") {
			response = await API.post(process.env.react_app_base_url + 'backendapisaludamf1/approveUser', data,{ headers: {"authorization" : `Bearer ${token}`} })
			return response;
		}

		else if (DealType == "Palisades") {
			response = await API.post(process.env.react_app_base_url + 'backendapipalisades/approveUser', data,{ headers: {"authorization" : `Bearer ${token}`} })
			return response;
		}
		else if (DealType == "Saluda RTL2") {
			response = await API.post(process.env.react_app_base_url + 'backendapisaludartl2/approveUser', data,{ headers: {"authorization" : `Bearer ${token}`} })
			return response;
		}
		else if (DealType == "Saluda PRE1") {
			response = await API.post(process.env.react_app_base_url + 'backendapisaludapre/approveUser', data,{ headers: {"authorization" : `Bearer ${token}`} })
			return response;
		}
		else if (DealType == "MFA") {
			response = await API.post(process.env.react_app_base_url + 'backendapimfa/approveUser', data,{ headers: {"authorization" : `Bearer ${token}`} })
			return response;
		}
		else if (DealType == "Setpoint") {
			response = await API.post(process.env.react_app_base_url + 'backendapisetpoint/approveUser', data,{ headers: {"authorization" : `Bearer ${token}`} })
			return response;
		}
		else if (DealType == "Saluda BC2") {
			response = await API.post(process.env.react_app_base_url + 'backendapibc2/approveUser', data,{ headers: {"authorization" : `Bearer ${token}`} })
			return response;
		}
		else if (DealType == "Saluda Builders") {
			response = await API.post(process.env.react_app_base_url + 'backendapibuilders/approveUser', data,{ headers: {"authorization" : `Bearer ${token}`} })
			return response;
		}
		else if (DealType == "NPL") {
			response = await API.post(process.env.react_app_base_url + 'backendapinpl/approveUser', data,{ headers: {"authorization" : `Bearer ${token}`} })
			return response;
		}
		else if (DealType == "Stoa 2022") {
			response = await API.post(process.env.react_app_base_url + 'backendapistoa2022/approveUser', data,{ headers: {"authorization" : `Bearer ${token}`} })
			return response;
		}
		else if (DealType == "Unlock") {
			response = await API.post(process.env.react_app_base_url + 'backendapiunlock/approveUser', data,{ headers: {"authorization" : `Bearer ${token}`} })
			return response;
		}
	}
};

export const addApprovedUserDetails = async (DealType, data) => {
	let response = null
	if (data.OrgName == "wsfstrustee") {
		response = await API.post(process.env.react_app_base_url + 'backendapilima/addApprovedTrusteeUserDetails', data)
		return response;
	} else {
		if (DealType == "LimaOne") {
			response = await API.post(process.env.react_app_base_url + 'backendapilima/addApprovedUserDetails', data)
			return response;
		} else if (DealType == "Bawag") {
			response = await API.post(process.env.react_app_base_url + 'backendapibawag/addApprovedUserDetails', data)
			return response;
		} else if (DealType == "Saluda PAC1") {
			response = await API.post(process.env.react_app_base_url + 'backendapisaluda/addApprovedUserDetails', data)
			return response;
		} else if (DealType == "Saluda FIG1") {
			response = await API.post(process.env.react_app_base_url + 'backendapisaludagrade/addApprovedUserDetails', data)
			return response;
		} else if (DealType == "Saluda SEQ1") {
			response = await API.post(process.env.react_app_base_url + 'backendapisaludagradeseq1/addApprovedUserDetails', data)
			return response;
		}
		else if (DealType == "AlphaFlow") {
			response = await API.post(process.env.react_app_base_url + 'backendapialphaflow/addApprovedUserDetails', data)
			return response;
		}
		else if (DealType == "Saluda FIG2") {
			response = await API.post(process.env.react_app_base_url + 'backendapisaludafig2/addApprovedUserDetails', data)
			return response;
		}
		else if (DealType == "Saluda BC1") {
			response = await API.post(process.env.react_app_base_url + 'backendapibc1/addApprovedUserDetails', data)
			return response;
		}
		else if (DealType == "Reigo") {
			response = await API.post(process.env.react_app_base_url + 'backendapireigo/addApprovedUserDetails', data)
			return response;
		}
		else if (DealType == "Dominion") {
			response = await API.post(process.env.react_app_base_url + 'backendapidominion/addApprovedUserDetails', data)
			return response;
		}
		else if (DealType == "Saluda WL1") {
			response = await API.post(process.env.react_app_base_url + 'backendapisaludawl1/addApprovedUserDetails', data)
			return response;
		}
		else if (DealType == "Spruce Hill") {
			response = await API.post(process.env.react_app_base_url + 'backendapisprucehill/addApprovedUserDetails', data)
			return response;
		}
		else if (DealType == "Saluda RTL1") {
			response = await API.post(process.env.react_app_base_url + 'backendapisaludartl1/addApprovedUserDetails', data)
			return response;
		}
		else if (DealType == "Stoa 2021") {
			response = await API.post(process.env.react_app_base_url + 'backendapistoa/addApprovedUserDetails', data)
			return response;
		}
		else if (DealType == "Tildene") {
			response = await API.post(process.env.react_app_base_url + 'backendapitildene/addApprovedUserDetails', data)
			return response;
		}
		else if (DealType == "Saluda MF1") {
			response = await API.post(process.env.react_app_base_url + 'backendapisaludamf1/addApprovedUserDetails', data)
			return response;
		}
		else if (DealType == "Palisades") {
			response = await API.post(process.env.react_app_base_url + 'backendapipalisades/addApprovedUserDetails', data)
			return response;
		}
		else if (DealType == "Saluda RTL2") {
			response = await API.post(process.env.react_app_base_url + 'backendapisaludartl2/addApprovedUserDetails', data)
			return response;
		}
		else if (DealType == "Saluda PRE1") {
			response = await API.post(process.env.react_app_base_url + 'backendapisaludapre/addApprovedUserDetails', data)
			return response;
		}
		else if (DealType == "MFA") {
			response = await API.post(process.env.react_app_base_url + 'backendapimfa/addApprovedUserDetails', data)
			return response;
		}
		else if (DealType == "Setpoint") {
			response = await API.post(process.env.react_app_base_url + 'backendapisetpoint/addApprovedUserDetails', data)
			return response;
		}
		else if (DealType == "Saluda BC2") {
			response = await API.post(process.env.react_app_base_url + 'backendapibc2/addApprovedUserDetails', data)
			return response;
		}
		else if (DealType == "Saluda Builders") {
			response = await API.post(process.env.react_app_base_url + 'backendapibuilders/addApprovedUserDetails', data)
			return response;
		}
		else if (DealType == "NPL") {
			response = await API.post(process.env.react_app_base_url + 'backendapinpl/addApprovedUserDetails', data)
			return response;
		}
		else if (DealType == "Stoa 2022") {
			response = await API.post(process.env.react_app_base_url + 'backendapistoa2022/addApprovedUserDetails', data)
			return response;
		}
		else if (DealType == "Unlock") {
			response = await API.post(process.env.react_app_base_url + 'backendapiunlock/addApprovedUserDetails', data)
			return response;
		}
	}
};

export const getUser = async (data) => {
	const response = await API.get(process.env.react_app_base_url + 'backendapilima/getUser?peer=' + peer + '&userId=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
	return response;
};

// Get All Deals

export const GetAllDeals = async (DealType, Role, UserName) => {
	let response = null
	if (DealType == "LimaOne") {
		response = await API.get(process.env.react_app_base_url + 'backendapilima/api/v1/trustee/getalldeals?peer=' + peer + '&channelname=' + ChannelName + '&loggedindeal=' + DealType + '&Role=' + Role + '&UserName=' + UserName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;

	} else if (DealType == "Bawag") {

		response = await API.get(process.env.react_app_base_url + 'backendapibawag/api/v1/trustee/getalldeals?peer=' + peer + '&channelname=' + ChannelName + '&loggedindeal=' + DealType + '&Role=' + Role + '&UserName=' + UserName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;

	} else if (DealType == "Saluda PAC1") {

		response = await API.get(process.env.react_app_base_url + 'backendapisaluda/api/v1/trustee/getalldeals?peer=' + peer + '&channelname=' + ChannelName + '&loggedindeal=' + DealType + '&Role=' + Role + '&UserName=' + UserName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;

	} else if (DealType == "Saluda FIG1") {

		response = await API.get(process.env.react_app_base_url + 'backendapisaludagrade/api/v1/trustee/getalldeals?peer=' + peer + '&channelname=' + ChannelName + '&loggedindeal=' + DealType + '&Role=' + Role + '&UserName=' + UserName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;

	} else if (DealType == "Saluda SEQ1") {

		response = await API.get(process.env.react_app_base_url + 'backendapisaludagradeseq1/api/v1/trustee/getalldeals?peer=' + peer + '&channelname=' + ChannelName + '&loggedindeal=' + DealType + '&Role=' + Role + '&UserName=' + UserName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;

	}
	else if (DealType == "AlphaFlow") {

		response = await API.get(process.env.react_app_base_url + 'backendapialphaflow/api/v1/trustee/getalldeals?peer=' + peer + '&channelname=' + ChannelName + '&loggedindeal=' + DealType + '&Role=' + Role + '&UserName=' + UserName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;

	}
	else if (DealType == "Saluda FIG2") {

		response = await API.get(process.env.react_app_base_url + 'backendapisaludafig2/api/v1/trustee/getalldeals?peer=' + peer + '&channelname=' + ChannelName + '&loggedindeal=' + DealType + '&Role=' + Role + '&UserName=' + UserName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;

	}
	else if (DealType == "Saluda BC1") {

		response = await API.get(process.env.react_app_base_url + 'backendapibc1/api/v1/trustee/getalldeals?peer=' + peer + '&channelname=' + ChannelName + '&loggedindeal=' + DealType + '&Role=' + Role + '&UserName=' + UserName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;

	}
	else if (DealType == "Reigo") {

		response = await API.get(process.env.react_app_base_url + 'backendapireigo/api/v1/trustee/getalldeals?peer=' + peer + '&channelname=' + ChannelName + '&loggedindeal=' + DealType + '&Role=' + Role + '&UserName=' + UserName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;

	}
	else if (DealType == "Dominion") {

		response = await API.get(process.env.react_app_base_url + 'backendapidominion/api/v1/trustee/getalldeals?peer=' + peer + '&channelname=' + ChannelName + '&loggedindeal=' + DealType + '&Role=' + Role + '&UserName=' + UserName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;

	}
	else if (DealType == "Saluda WL1") {

		response = await API.get(process.env.react_app_base_url + 'backendapisaludawl1/api/v1/trustee/getalldeals?peer=' + peer + '&channelname=' + ChannelName + '&loggedindeal=' + DealType + '&Role=' + Role + '&UserName=' + UserName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;

	}
	else if (DealType == "Spruce Hill") {

		response = await API.get(process.env.react_app_base_url + 'backendapisprucehill/api/v1/trustee/getalldeals?peer=' + peer + '&channelname=' + ChannelName + '&loggedindeal=' + DealType + '&Role=' + Role + '&UserName=' + UserName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;

	}
	else if (DealType == "Saluda RTL1") {

		response = await API.get(process.env.react_app_base_url + 'backendapisaludartl1/api/v1/trustee/getalldeals?peer=' + peer + '&channelname=' + ChannelName + '&loggedindeal=' + DealType + '&Role=' + Role + '&UserName=' + UserName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;

	}
	else if (DealType == "Stoa 2021") {

		response = await API.get(process.env.react_app_base_url + 'backendapistoa/api/v1/trustee/getalldeals?peer=' + peer + '&channelname=' + ChannelName + '&loggedindeal=' + DealType + '&Role=' + Role + '&UserName=' + UserName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;

	}
	else if (DealType == "Tildene") {

		response = await API.get(process.env.react_app_base_url + 'backendapitildene/api/v1/trustee/getalldeals?peer=' + peer + '&channelname=' + ChannelName + '&loggedindeal=' + DealType + '&Role=' + Role + '&UserName=' + UserName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;

	}
	else if (DealType == "Saluda MF1") {

		response = await API.get(process.env.react_app_base_url + 'backendapisaludamf1/api/v1/trustee/getalldeals?peer=' + peer + '&channelname=' + ChannelName + '&loggedindeal=' + DealType + '&Role=' + Role + '&UserName=' + UserName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;

	}
	else if (DealType == "Palisades") {

		response = await API.get(process.env.react_app_base_url + 'backendapipalisades/api/v1/trustee/getalldeals?peer=' + peer + '&channelname=' + ChannelName + '&loggedindeal=' + DealType + '&Role=' + Role + '&UserName=' + UserName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;

	}
	else if (DealType == "Saluda RTL2") {

		response = await API.get(process.env.react_app_base_url + 'backendapisaludartl2/api/v1/trustee/getalldeals?peer=' + peer + '&channelname=' + ChannelName + '&loggedindeal=' + DealType + '&Role=' + Role + '&UserName=' + UserName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;

	}
	else if (DealType == "Saluda PRE1") {

		response = await API.get(process.env.react_app_base_url + 'backendapisaludapre/api/v1/trustee/getalldeals?peer=' + peer + '&channelname=' + ChannelName + '&loggedindeal=' + DealType + '&Role=' + Role + '&UserName=' + UserName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;

	}
	else if (DealType == "MFA") {

		response = await API.get(process.env.react_app_base_url + 'backendapimfa/api/v1/trustee/getalldeals?peer=' + peer + '&channelname=' + ChannelName + '&loggedindeal=' + DealType + '&Role=' + Role + '&UserName=' + UserName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;

	}
	else if (DealType == "Setpoint") {

		response = await API.get(process.env.react_app_base_url + 'backendapisetpoint/api/v1/trustee/getalldeals?peer=' + peer + '&channelname=' + ChannelName + '&loggedindeal=' + DealType + '&Role=' + Role + '&UserName=' + UserName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;

	}
	else if (DealType == "Saluda BC2") {

		response = await API.get(process.env.react_app_base_url + 'backendapibc2/api/v1/trustee/getalldeals?peer=' + peer + '&channelname=' + ChannelName + '&loggedindeal=' + DealType + '&Role=' + Role + '&UserName=' + UserName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;

	}
	else if (DealType == "Saluda Builders") {

		response = await API.get(process.env.react_app_base_url + 'backendapibuilders/api/v1/trustee/getalldeals?peer=' + peer + '&channelname=' + ChannelName + '&loggedindeal=' + DealType + '&Role=' + Role + '&UserName=' + UserName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;

	}
	else if (DealType == "NPL") {

		response = await API.get(process.env.react_app_base_url + 'backendapinpl/api/v1/trustee/getalldeals?peer=' + peer + '&channelname=' + ChannelName + '&loggedindeal=' + DealType + '&Role=' + Role + '&UserName=' + UserName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;

	}
	else if (DealType == "Stoa 2022") {

		response = await API.get(process.env.react_app_base_url + 'backendapistoa2022/api/v1/trustee/getalldeals?peer=' + peer + '&channelname=' + ChannelName + '&loggedindeal=' + DealType + '&Role=' + Role + '&UserName=' + UserName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;

	}
	else if (DealType == "Unlock") {

		response = await API.get(process.env.react_app_base_url + 'backendapiunlock/api/v1/trustee/getalldeals?peer=' + peer + '&channelname=' + ChannelName + '&loggedindeal=' + DealType + '&Role=' + Role + '&UserName=' + UserName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;

	}
};

export const GetAllDealsLogin = async (DealType, token, peer, ChannelName, Role, UserName) => {

	let response = null
	if (DealType == "LimaOne") {
		response = await API.get(process.env.react_app_base_url + 'backendapilima/api/v1/trustee/getalldeals?peer=' + peer + '&channelname=' + ChannelName + '&loggedindeal=' + DealType + '&Role=' + Role + '&UserName=' + UserName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Bawag") {
		response = await API.get(process.env.react_app_base_url + 'backendapibawag/api/v1/trustee/getalldeals?peer=' + peer + '&channelname=' + ChannelName + '&loggedindeal=' + DealType + '&Role=' + Role + '&UserName=' + UserName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda PAC1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaluda/api/v1/trustee/getalldeals?peer=' + peer + '&channelname=' + ChannelName + '&loggedindeal=' + DealType + '&Role=' + Role + '&UserName=' + UserName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda FIG1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludagrade/api/v1/trustee/getalldeals?peer=' + peer + '&channelname=' + ChannelName + '&loggedindeal=' + DealType + '&Role=' + Role + '&UserName=' + UserName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda SEQ1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludagradeseq1/api/v1/trustee/getalldeals?peer=' + peer + '&channelname=' + ChannelName + '&loggedindeal=' + DealType + '&Role=' + Role + '&UserName=' + UserName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "AlphaFlow") {
		response = await API.get(process.env.react_app_base_url + 'backendapialphaflow/api/v1/trustee/getalldeals?peer=' + peer + '&channelname=' + ChannelName + '&loggedindeal=' + DealType + '&Role=' + Role + '&UserName=' + UserName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda FIG2") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludafig2/api/v1/trustee/getalldeals?peer=' + peer + '&channelname=' + ChannelName + '&loggedindeal=' + DealType + '&Role=' + Role + '&UserName=' + UserName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda BC1") {
		response = await API.get(process.env.react_app_base_url + 'backendapibc1/api/v1/trustee/getalldeals?peer=' + peer + '&channelname=' + ChannelName + '&loggedindeal=' + DealType + '&Role=' + Role + '&UserName=' + UserName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Reigo") {
		response = await API.get(process.env.react_app_base_url + 'backendapireigo/api/v1/trustee/getalldeals?peer=' + peer + '&channelname=' + ChannelName + '&loggedindeal=' + DealType + '&Role=' + Role + '&UserName=' + UserName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Dominion") {
		response = await API.get(process.env.react_app_base_url + 'backendapidominion/api/v1/trustee/getalldeals?peer=' + peer + '&channelname=' + ChannelName + '&loggedindeal=' + DealType + '&Role=' + Role + '&UserName=' + UserName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda WL1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludawl1/api/v1/trustee/getalldeals?peer=' + peer + '&channelname=' + ChannelName + '&loggedindeal=' + DealType + '&Role=' + Role + '&UserName=' + UserName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Spruce Hill") {
		response = await API.get(process.env.react_app_base_url + 'backendapisprucehill/api/v1/trustee/getalldeals?peer=' + peer + '&channelname=' + ChannelName + '&loggedindeal=' + DealType + '&Role=' + Role + '&UserName=' + UserName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda RTL1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludartl1/api/v1/trustee/getalldeals?peer=' + peer + '&channelname=' + ChannelName + '&loggedindeal=' + DealType + '&Role=' + Role + '&UserName=' + UserName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Stoa 2021") {
		response = await API.get(process.env.react_app_base_url + 'backendapistoa/api/v1/trustee/getalldeals?peer=' + peer + '&channelname=' + ChannelName + '&loggedindeal=' + DealType + '&Role=' + Role + '&UserName=' + UserName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Tildene") {
		response = await API.get(process.env.react_app_base_url + 'backendapitildene/api/v1/trustee/getalldeals?peer=' + peer + '&channelname=' + ChannelName + '&loggedindeal=' + DealType + '&Role=' + Role + '&UserName=' + UserName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda MF1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludamf1/api/v1/trustee/getalldeals?peer=' + peer + '&channelname=' + ChannelName + '&loggedindeal=' + DealType + '&Role=' + Role + '&UserName=' + UserName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Palisades") {
		response = await API.get(process.env.react_app_base_url + 'backendapipalisades/api/v1/trustee/getalldeals?peer=' + peer + '&channelname=' + ChannelName + '&loggedindeal=' + DealType + '&Role=' + Role + '&UserName=' + UserName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda RTL2") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludartl2/api/v1/trustee/getalldeals?peer=' + peer + '&channelname=' + ChannelName + '&loggedindeal=' + DealType + '&Role=' + Role + '&UserName=' + UserName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda PRE1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludapre/api/v1/trustee/getalldeals?peer=' + peer + '&channelname=' + ChannelName + '&loggedindeal=' + DealType + '&Role=' + Role + '&UserName=' + UserName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "MFA") {
		response = await API.get(process.env.react_app_base_url + 'backendapimfa/api/v1/trustee/getalldeals?peer=' + peer + '&channelname=' + ChannelName + '&loggedindeal=' + DealType + '&Role=' + Role + '&UserName=' + UserName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Setpoint") {
		response = await API.get(process.env.react_app_base_url + 'backendapisetpoint/api/v1/trustee/getalldeals?peer=' + peer + '&channelname=' + ChannelName + '&loggedindeal=' + DealType + '&Role=' + Role + '&UserName=' + UserName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda BC2") {
		response = await API.get(process.env.react_app_base_url + 'backendapibc2/api/v1/trustee/getalldeals?peer=' + peer + '&channelname=' + ChannelName + '&loggedindeal=' + DealType + '&Role=' + Role + '&UserName=' + UserName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda Builders") {
		response = await API.get(process.env.react_app_base_url + 'backendapibuilders/api/v1/trustee/getalldeals?peer=' + peer + '&channelname=' + ChannelName + '&loggedindeal=' + DealType + '&Role=' + Role + '&UserName=' + UserName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "NPL") {
		response = await API.get(process.env.react_app_base_url + 'backendapinpl/api/v1/trustee/getalldeals?peer=' + peer + '&channelname=' + ChannelName + '&loggedindeal=' + DealType + '&Role=' + Role + '&UserName=' + UserName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Stoa 2022") {
		response = await API.get(process.env.react_app_base_url + 'backendapistoa2022/api/v1/trustee/getalldeals?peer=' + peer + '&channelname=' + ChannelName + '&loggedindeal=' + DealType + '&Role=' + Role + '&UserName=' + UserName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Unlock") {
		response = await API.get(process.env.react_app_base_url + 'backendapiunlock/api/v1/trustee/getalldeals?peer=' + peer + '&channelname=' + ChannelName + '&loggedindeal=' + DealType + '&Role=' + Role + '&UserName=' + UserName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
};

// initial-setup
export const InitialSetup = async (data, DealType) => {
	let response = null
	if (DealType == "LimaOne") {
		response = await API.post(process.env.react_app_base_url + 'backendapilima/api/v1/trustee/initialsetupLima', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Bawag") {
		response = await API.post(process.env.react_app_base_url + 'backendapibawag/api/v1/trustee/initialsetupBawag', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda PAC1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaluda/api/v1/trustee/initialsetupSaluda', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda FIG1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludagrade/api/v1/trustee/initialsetupSaludagrade', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda SEQ1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludagradeseq1/api/v1/trustee/initialsetupSaludaseq', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "AlphaFlow") {
		response = await API.post(process.env.react_app_base_url + 'backendapialphaflow/api/v1/trustee/initialsetupalphaflow', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda FIG2") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludafig2/api/v1/trustee/initialsetupFig2', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda BC1") {
		response = await API.post(process.env.react_app_base_url + 'backendapibc1/api/v1/trustee/initialsetupBC1', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Reigo") {
		response = await API.post(process.env.react_app_base_url + 'backendapireigo/api/v1/trustee/initialsetupReigo', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Dominion") {
		response = await API.post(process.env.react_app_base_url + 'backendapidominion/api/v1/trustee/initialsetupDominion', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda WL1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludawl1/api/v1/trustee/initialsetupWL1', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Spruce Hill") {
		response = await API.post(process.env.react_app_base_url + 'backendapisprucehill/api/v1/trustee/initialsetupSprucehill', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda RTL1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludartl1/api/v1/trustee/initialsetupSaludartl1', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Stoa 2021") {
		response = await API.post(process.env.react_app_base_url + 'backendapistoa/api/v1/trustee/initialsetupStoa', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Tildene") {
		response = await API.post(process.env.react_app_base_url + 'backendapitildene/api/v1/trustee/initialsetupTildene', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda MF1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludamf1/api/v1/trustee/initialsetupMF1', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Palisades") {
		response = await API.post(process.env.react_app_base_url + 'backendapipalisades/api/v1/trustee/initialsetupPalisades', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda RTL2") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludartl2/api/v1/trustee/initialsetupSaludartl2', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda PRE1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludapre/api/v1/trustee/initialsetupSaludapre', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "MFA") {
		response = await API.post(process.env.react_app_base_url + 'backendapimfa/api/v1/trustee/initialsetupMfa', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Setpoint") {
		response = await API.post(process.env.react_app_base_url + 'backendapisetpoint/api/v1/trustee/initialsetupSetpoint', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda BC2") {
		response = await API.post(process.env.react_app_base_url + 'backendapibc2/api/v1/trustee/initialsetupBC2', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda Builders") {
		response = await API.post(process.env.react_app_base_url + 'backendapibuilders/api/v1/trustee/initialsetupBuilders', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "NPL") {
		response = await API.post(process.env.react_app_base_url + 'backendapinpl/api/v1/trustee/initialsetupNPL', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Stoa 2022") {
		response = await API.post(process.env.react_app_base_url + 'backendapistoa2022/api/v1/trustee/initialsetupStoa2022', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Unlock") {
		response = await API.post(process.env.react_app_base_url + 'backendapiunlock/api/v1/trustee/initialsetupUnlock', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
};


// initialsetupQueryLima

export const initialsetupQuery = async (data, DealType) => {
	let response = null
	if (DealType == "LimaOne") {
		response = await API.get(process.env.react_app_base_url + 'backendapilima/api/v1/trustee/initialsetupQueryLima?dealId=' + data + '&peer=' + peer + '&loggedindeal=' + DealType,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Bawag") {
		// response = await API.get(process.env.react_app_base_url + 'backendapibawag/api/v1/trustee/initialsetupQueryBawag', data,{ headers: {"authorization" : `Bearer ${token}`} });
		// return response;
	} else if (DealType == "Saluda PAC1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaluda/api/v1/trustee/initialsetupQuerySaluda?dealId=' + data + '&peer=' + peer + '&loggedindeal=' + DealType,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda FIG1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludagrade/api/v1/trustee/initialsetupQuerySaludagrade?dealId=' + data + '&peer=' + peer + '&loggedindeal=' + DealType,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda SEQ1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludagradeseq1/api/v1/trustee/initialsetupQuerySaludaseq?dealId=' + data + '&peer=' + peer + '&loggedindeal=' + DealType,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "AlphaFlow") {
		response = await API.get(process.env.react_app_base_url + 'backendapialphaflow/api/v1/trustee/initialsetupQueryalphaflow?dealId=' + data + '&peer=' + peer + '&loggedindeal=' + DealType,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda FIG2") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludafig2/api/v1/trustee/initialsetupQueryFig2?dealId=' + data + '&peer=' + peer + '&loggedindeal=' + DealType,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda BC1") {
		response = await API.get(process.env.react_app_base_url + 'backendapibc1/api/v1/trustee/initialsetupQueryBC1?dealId=' + data + '&peer=' + peer + '&loggedindeal=' + DealType,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Reigo") {
		response = await API.get(process.env.react_app_base_url + 'backendapireigo/api/v1/trustee/initialsetupQueryReigo?dealId=' + data + '&peer=' + peer + '&loggedindeal=' + DealType,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Dominion") {
		response = await API.get(process.env.react_app_base_url + 'backendapidominion/api/v1/trustee/initialsetupQueryDominion?dealId=' + data + '&peer=' + peer + '&loggedindeal=' + DealType,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda WL1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludawl1/api/v1/trustee/initialsetupQueryWL1?dealId=' + data + '&peer=' + peer + '&loggedindeal=' + DealType,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Spruce Hill") {
		response = await API.get(process.env.react_app_base_url + 'backendapisprucehill/api/v1/trustee/initialsetupQuerySprucehill?dealId=' + data + '&peer=' + peer + '&loggedindeal=' + DealType,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda RTL1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludartl1/api/v1/trustee/initialsetupQuerySaludartl1?dealId=' + data + '&peer=' + peer + '&loggedindeal=' + DealType,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Stoa 2021") {
		response = await API.get(process.env.react_app_base_url + 'backendapistoa/api/v1/trustee/initialsetupQueryStoa?dealId=' + data + '&peer=' + peer + '&loggedindeal=' + DealType,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Tildene") {
		response = await API.get(process.env.react_app_base_url + 'backendapitildene/api/v1/trustee/initialsetupQueryTildene?dealId=' + data + '&peer=' + peer + '&loggedindeal=' + DealType,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda MF1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludamf1/api/v1/trustee/initialsetupQueryMF1?dealId=' + data + '&peer=' + peer + '&loggedindeal=' + DealType,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Palisades") {
		response = await API.get(process.env.react_app_base_url + 'backendapipalisades/api/v1/trustee/initialsetupQueryPalisades?dealId=' + data + '&peer=' + peer + '&loggedindeal=' + DealType,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda RTL2") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludartl2/api/v1/trustee/initialsetupQuerySaludartl2?dealId=' + data + '&peer=' + peer + '&loggedindeal=' + DealType,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda PRE1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludapre/api/v1/trustee/initialsetupQuerySaludapre?dealId=' + data + '&peer=' + peer + '&loggedindeal=' + DealType,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "MFA") {
		response = await API.get(process.env.react_app_base_url + 'backendapimfa/api/v1/trustee/initialsetupQueryMfa?dealId=' + data + '&peer=' + peer + '&loggedindeal=' + DealType,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Setpoint") {
		response = await API.get(process.env.react_app_base_url + 'backendapisetpoint/api/v1/trustee/initialsetupQuerySetpoint?dealId=' + data + '&peer=' + peer + '&loggedindeal=' + DealType,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda BC2") {
		response = await API.get(process.env.react_app_base_url + 'backendapibc2/api/v1/trustee/initialsetupQueryBC2?dealId=' + data + '&peer=' + peer + '&loggedindeal=' + DealType,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda Builders") {
		response = await API.get(process.env.react_app_base_url + 'backendapibuilders/api/v1/trustee/initialsetupQueryBuilders?dealId=' + data + '&peer=' + peer + '&loggedindeal=' + DealType,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "NPL") {
		response = await API.get(process.env.react_app_base_url + 'backendapinpl/api/v1/trustee/initialsetupQueryNPL?dealId=' + data + '&peer=' + peer + '&loggedindeal=' + DealType,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Stoa 2022") {
		response = await API.get(process.env.react_app_base_url + 'backendapistoa2022/api/v1/trustee/initialsetupQueryStoa2022?dealId=' + data + '&peer=' + peer + '&loggedindeal=' + DealType,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Unlock") {
		response = await API.get(process.env.react_app_base_url + 'backendapiunlock/api/v1/trustee/initialsetupQueryUnlock?dealId=' + data + '&peer=' + peer + '&loggedindeal=' + DealType,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
};

// Add New Report

export const ServicerData = async (data, DealType) => {
	let response = null
	if (DealType == "LimaOne") {
		response = await API.post(process.env.react_app_base_url + 'backendapilima/api/v1/trustee/servicerdataLima', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Bawag") {
		response = await API.post(process.env.react_app_base_url + 'backendapibawag/api/v1/trustee/servicerdataBawag', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda PAC1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaluda/api/v1/trustee/servicerdataSaluda', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda FIG1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludagrade/api/v1/trustee/servicerdataSaludagrade', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda SEQ1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludagradeseq1/api/v1/trustee/servicerdataSaludaseq', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "AlphaFlow") {
		response = await API.post(process.env.react_app_base_url + 'backendapialphaflow/api/v1/trustee/servicerdataalphaflow', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda FIG2") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludafig2/api/v1/trustee/servicerdataFig2', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda BC1") {
		response = await API.post(process.env.react_app_base_url + 'backendapibc1/api/v1/trustee/servicerdataBC1', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Reigo") {
		response = await API.post(process.env.react_app_base_url + 'backendapireigo/api/v1/trustee/servicerdataReigo', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Dominion") {
		response = await API.post(process.env.react_app_base_url + 'backendapidominion/api/v1/trustee/servicerdataDominion', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda WL1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludawl1/api/v1/trustee/servicerdataWL1', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Spruce Hill") {
		response = await API.post(process.env.react_app_base_url + 'backendapisprucehill/api/v1/trustee/servicerdataSprucehill', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda RTL1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludartl1/api/v1/trustee/servicerdataSaludartl1', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Stoa 2021") {
		response = await API.post(process.env.react_app_base_url + 'backendapistoa/api/v1/trustee/servicerdataStoa', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Tildene") {
		response = await API.post(process.env.react_app_base_url + 'backendapitildene/api/v1/trustee/servicerdataTildene', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda MF1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludamf1/api/v1/trustee/servicerdataMF1', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Palisades") {
		response = await API.post(process.env.react_app_base_url + 'backendapipalisades/api/v1/trustee/servicerdataPalisades', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda RTL2") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludartl2/api/v1/trustee/servicerdataSaludartl2', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda PRE1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludapre/api/v1/trustee/servicerdataSaludapre', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "MFA") {
		response = await API.post(process.env.react_app_base_url + 'backendapimfa/api/v1/trustee/servicerdataMfa', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Setpoint") {
		response = await API.post(process.env.react_app_base_url + 'backendapisetpoint/api/v1/trustee/servicerdataSetpoint', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda BC2") {
		response = await API.post(process.env.react_app_base_url + 'backendapibc2/api/v1/trustee/servicerdataBC2', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda Builders") {
		response = await API.post(process.env.react_app_base_url + 'backendapibuilders/api/v1/trustee/servicerdataBuilders', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "NPL") {
		response = await API.post(process.env.react_app_base_url + 'backendapinpl/api/v1/trustee/servicerdataNPL', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Stoa 2022") {
		response = await API.post(process.env.react_app_base_url + 'backendapistoa2022/api/v1/trustee/servicerdataStoa2022', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Unlock") {
		response = await API.post(process.env.react_app_base_url + 'backendapiunlock/api/v1/trustee/servicerdataUnlock', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
};

export const ServicerDataStd = async (data, DealType) => {
	let response = null
	if (DealType == "LimaOne") {
		response = await API.post(process.env.react_app_base_url + 'backendapilima/api/v1/trustee/servicerdataLimastd', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Bawag") {
		response = await API.post(process.env.react_app_base_url + 'backendapibawag/api/v1/trustee/servicerdataBawag', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda PAC1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaluda/api/v1/trustee/servicerdataSaluda', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda FIG1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludagrade/api/v1/trustee/servicerdataSaludagrade', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda SEQ1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludagradeseq1/api/v1/trustee/servicerdataSaludaseq', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "AlphaFlow") {
		response = await API.post(process.env.react_app_base_url + 'backendapialphaflow/api/v1/trustee/servicerdataalphaflow', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda FIG2") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludafig2/api/v1/trustee/servicerdataFig2', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda BC1") {
		response = await API.post(process.env.react_app_base_url + 'backendapibc1/api/v1/trustee/servicerdataBC1', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Reigo") {
		response = await API.post(process.env.react_app_base_url + 'backendapireigo/api/v1/trustee/servicerdataReigo', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Dominion") {
		response = await API.post(process.env.react_app_base_url + 'backendapidominion/api/v1/trustee/servicerdataDominion', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda WL1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludawl1/api/v1/trustee/servicerdataWL1', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Spruce Hill") {
		response = await API.post(process.env.react_app_base_url + 'backendapisprucehill/api/v1/trustee/servicerdataSprucehill', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda RTL1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludartl1/api/v1/trustee/servicerdataSaludartl1', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Stoa 2021") {
		response = await API.post(process.env.react_app_base_url + 'backendapistoa/api/v1/trustee/servicerdataStoa', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Tildene") {
		response = await API.post(process.env.react_app_base_url + 'backendapitildene/api/v1/trustee/servicerdataTildene', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda MF1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludamf1/api/v1/trustee/servicerdataMF1', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Palisades") {
		response = await API.post(process.env.react_app_base_url + 'backendapipalisades/api/v1/trustee/servicerdataPalisades', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda RTL2") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludartl2/api/v1/trustee/servicerdataSaludartl2', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda PRE1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludapre/api/v1/trustee/servicerdataSaludapre', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "MFA") {
		response = await API.post(process.env.react_app_base_url + 'backendapimfa/api/v1/trustee/servicerdataMfa', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Setpoint") {
		response = await API.post(process.env.react_app_base_url + 'backendapisetpoint/api/v1/trustee/servicerdataSetpoint', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda BC2") {
		response = await API.post(process.env.react_app_base_url + 'backendapibc2/api/v1/trustee/servicerdataBC2', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda Builders") {
		response = await API.post(process.env.react_app_base_url + 'backendapibuilders/api/v1/trustee/servicerdataBuilders', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "NPL") {
		response = await API.post(process.env.react_app_base_url + 'backendapinpl/api/v1/trustee/servicerdataNPL', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Stoa 2022") {
		response = await API.post(process.env.react_app_base_url + 'backendapistoa2022/api/v1/trustee/servicerdataStoa2022', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Unlock") {
		response = await API.post(process.env.react_app_base_url + 'backendapiunlock/api/v1/trustee/servicerdataUnlock', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
};

export const ServicerDataMongoDB = async (data, DealType) => {
	let response = null
	if (DealType == "LimaOne") {
		response = await API.post(process.env.react_app_base_url + 'backendapilima/api/v1/trustee/servicerdatamongodbLima', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Bawag") {
		response = await API.post(process.env.react_app_base_url + 'backendapibawag/api/v1/trustee/servicerdataBawag', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda PAC1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaluda/api/v1/trustee/servicerdataSaluda', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda FIG1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludagrade/api/v1/trustee/servicerdataSaludagrade', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda SEQ1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludagradeseq1/api/v1/trustee/servicerdataSaludaseq', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "AlphaFlow") {
		response = await API.post(process.env.react_app_base_url + 'backendapialphaflow/api/v1/trustee/servicerdataalphaflow', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda FIG2") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludafig2/api/v1/trustee/servicerdataFig2', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda BC1") {
		response = await API.post(process.env.react_app_base_url + 'backendapibc1/api/v1/trustee/servicerdataBC1', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Reigo") {
		response = await API.post(process.env.react_app_base_url + 'backendapireigo/api/v1/trustee/servicerdataReigo', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Dominion") {
		response = await API.post(process.env.react_app_base_url + 'backendapidominion/api/v1/trustee/servicerdataDominion', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda WL1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludawl1/api/v1/trustee/servicerdataWL1', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Spruce Hill") {
		response = await API.post(process.env.react_app_base_url + 'backendapisprucehill/api/v1/trustee/servicerdataSprucehill', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda RTL1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludartl1/api/v1/trustee/servicerdataSaludartl1', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Stoa 2021") {
		response = await API.post(process.env.react_app_base_url + 'backendapistoa/api/v1/trustee/servicerdataStoa', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Tildene") {
		response = await API.post(process.env.react_app_base_url + 'backendapitildene/api/v1/trustee/servicerdataTildene', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda MF1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludamf1/api/v1/trustee/servicerdataMF1', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Palisades") {
		response = await API.post(process.env.react_app_base_url + 'backendapipalisades/api/v1/trustee/servicerdataPalisades', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda RTL2") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludartl2/api/v1/trustee/servicerdataSaludartl2', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda PRE1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludapre/api/v1/trustee/servicerdataSaludapre', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "MFA") {
		response = await API.post(process.env.react_app_base_url + 'backendapimfa/api/v1/trustee/servicerdataMfa', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Setpoint") {
		response = await API.post(process.env.react_app_base_url + 'backendapisetpoint/api/v1/trustee/servicerdataSetpoint', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda BC2") {
		response = await API.post(process.env.react_app_base_url + 'backendapibc2/api/v1/trustee/servicerdataBC2', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda Builders") {
		response = await API.post(process.env.react_app_base_url + 'backendapibuilders/api/v1/trustee/servicerdataBuilders', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "NPL") {
		response = await API.post(process.env.react_app_base_url + 'backendapinpl/api/v1/trustee/servicerdataNPL', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Stoa 2022") {
		response = await API.post(process.env.react_app_base_url + 'backendapistoa2022/api/v1/trustee/servicerdataStoa2022', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Unlock") {
		response = await API.post(process.env.react_app_base_url + 'backendapiunlock/api/v1/trustee/servicerdataUnlock', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
};


export const UploadServicerReport = async (data, DealType) => {
	let response = null
	if (DealType == "LimaOne") {
		response = await API.post(process.env.react_app_base_url + 'backendapilima/api/v1/trustee/uploadservicerreportLima', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Bawag") {
		response = await API.post(process.env.react_app_base_url + 'backendapibawag/api/v1/trustee/uploadservicerreportBawag', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda PAC1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaluda/api/v1/trustee/uploadservicerreportSaluda', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda FIG1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludagrade/api/v1/trustee/uploadservicerreportSaludagrade', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda SEQ1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludagradeseq1/api/v1/trustee/uploadservicerreportSaludaseq', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "AlphaFlow") {
		response = await API.post(process.env.react_app_base_url + 'backendapialphaflow/api/v1/trustee/uploadservicerreportalphaflow', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda FIG2") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludafig2/api/v1/trustee/uploadservicerreportFig2', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda BC1") {
		response = await API.post(process.env.react_app_base_url + 'backendapibc1/api/v1/trustee/uploadservicerreportBC1', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Reigo") {
		response = await API.post(process.env.react_app_base_url + 'backendapireigo/api/v1/trustee/uploadservicerreportReigo', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Dominion") {
		response = await API.post(process.env.react_app_base_url + 'backendapidominion/api/v1/trustee/uploadservicerreportDominion', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda WL1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludawl1/api/v1/trustee/uploadservicerreportWL1', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Spruce Hill") {
		response = await API.post(process.env.react_app_base_url + 'backendapisprucehill/api/v1/trustee/uploadservicerreportSprucehill', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda RTL1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludartl1/api/v1/trustee/uploadservicerreportSaludartl1', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Stoa 2021") {
		response = await API.post(process.env.react_app_base_url + 'backendapistoa/api/v1/trustee/uploadservicerreportStoa', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Tildene") {
		response = await API.post(process.env.react_app_base_url + 'backendapitildene/api/v1/trustee/uploadservicerreportTildene', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda MF1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludamf1/api/v1/trustee/uploadservicerreportMF1', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Palisades") {
		response = await API.post(process.env.react_app_base_url + 'backendapipalisades/api/v1/trustee/uploadservicerreportPalisades', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda RTL2") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludartl2/api/v1/trustee/uploadservicerreportSaludartl2', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda PRE1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludapre/api/v1/trustee/uploadservicerreportSaludapre', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "MFA") {
		response = await API.post(process.env.react_app_base_url + 'backendapimfa/api/v1/trustee/uploadservicerreportMfa', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Setpoint") {
		response = await API.post(process.env.react_app_base_url + 'backendapisetpoint/api/v1/trustee/uploadservicerreportSetpoint', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda BC2") {
		response = await API.post(process.env.react_app_base_url + 'backendapibc2/api/v1/trustee/uploadservicerreportBC2', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda Builders") {
		response = await API.post(process.env.react_app_base_url + 'backendapibuilders/api/v1/trustee/uploadservicerreportBuilders', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "NPL") {
		response = await API.post(process.env.react_app_base_url + 'backendapinpl/api/v1/trustee/uploadservicerreportNPL', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Stoa 2022") {
		response = await API.post(process.env.react_app_base_url + 'backendapistoa2022/api/v1/trustee/uploadservicerreportStoa2022', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Unlock") {
		response = await API.post(process.env.react_app_base_url + 'backendapiunlock/api/v1/trustee/uploadservicerreportUnlock', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
};



// view-servicer-mongodb-data
export const ServicerDataMongodbAPI = async (DealType, dealId, month, year, channelname) => {
	let response = null

	if (DealType == "LimaOne") {
		response = await API.get(process.env.react_app_base_url + 'backendapilima/api/v1/trustee/servicerdataLima?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Bawag") {
		response = await API.get(process.env.react_app_base_url + 'backendapibawag/api/v1/trustee/servicerdataBawag?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda PAC1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaluda/api/v1/trustee/servicerdataSaluda?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda FIG1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludagrade/api/v1/trustee/servicerdataSaludagrade?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda SEQ1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludagradeseq1/api/v1/trustee/servicerdataSaludaseq?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "AlphaFlow") {
		response = await API.get(process.env.react_app_base_url + 'backendapialphaflow/api/v1/trustee/servicerdataalphaflow?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda FIG2") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludafig2/api/v1/trustee/servicerdataFig2?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda BC1") {
		response = await API.get(process.env.react_app_base_url + 'backendapibc1/api/v1/trustee/servicerdataBC1?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Reigo") {
		response = await API.get(process.env.react_app_base_url + 'backendapireigo/api/v1/trustee/servicerdataReigo?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Dominion") {
		response = await API.get(process.env.react_app_base_url + 'backendapidominion/api/v1/trustee/servicerdataDominion?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda WL1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludawl1/api/v1/trustee/servicerdataWL1?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Spruce Hill") {
		response = await API.get(process.env.react_app_base_url + 'backendapisprucehill/api/v1/trustee/servicerdataSprucehill?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda RTL1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludartl1/api/v1/trustee/servicerdataSaludartl1?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Stoa 2021") {
		response = await API.get(process.env.react_app_base_url + 'backendapistoa/api/v1/trustee/servicerdataStoa?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Tildene") {
		response = await API.get(process.env.react_app_base_url + 'backendapitildene/api/v1/trustee/servicerdataTildene?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda MF1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludamf1/api/v1/trustee/servicerdataMF1?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Palisades") {
		response = await API.get(process.env.react_app_base_url + 'backendapipalisades/api/v1/trustee/servicerdataPalisades?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda RTL2") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludartl2/api/v1/trustee/servicerdataSaludartl2?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda PRE1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludapre/api/v1/trustee/servicerdataSaludapre?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "MFA") {
		response = await API.get(process.env.react_app_base_url + 'backendapimfa/api/v1/trustee/servicerdataMfa?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Setpoint") {
		response = await API.get(process.env.react_app_base_url + 'backendapisetpoint/api/v1/trustee/servicerdataSetpoint?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda BC2") {
		response = await API.get(process.env.react_app_base_url + 'backendapibc2/api/v1/trustee/servicerdataBC2?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda Builders") {
		response = await API.get(process.env.react_app_base_url + 'backendapibuilders/api/v1/trustee/servicerdataBuilders?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "NPL") {
		response = await API.get(process.env.react_app_base_url + 'backendapinpl/api/v1/trustee/servicerdataNPL?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Stoa 2022") {
		response = await API.get(process.env.react_app_base_url + 'backendapistoa2022/api/v1/trustee/servicerdataStoa2022?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Unlock") {
		response = await API.get(process.env.react_app_base_url + 'backendapiunlock/api/v1/trustee/servicerdataUnlock?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
};

export const ReportStatusStrat = async (DealType, dealId, month, year, groupby, OrgName) => {
	let response = null
	if (DealType == "LimaOne") {
		response = await API.get(process.env.react_app_base_url + 'backendapilima/api/v1/trustee/reportstatusLimaStrat?DealID=' + dealId + '&month=' + month + '&year=' + year + '&role=' + OrgName + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Bawag") {
		response = await API.get(process.env.react_app_base_url + 'backendapibawag/api/v1/trustee/reportstatusBawagStrat?DealID=' + dealId + '&month=' + month + '&year=' + year + '&role=' + OrgName + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda PAC1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaluda/api/v1/trustee/reportstatusSaludaStrat?DealID=' + dealId + '&month=' + month + '&year=' + year + '&role=' + OrgName + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda FIG1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludagrade/api/v1/trustee/reportstatusSaludagradeStrat?DealID=' + dealId + '&month=' + month + '&year=' + year + '&role=' + OrgName + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda SEQ1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludagradeseq1/api/v1/trustee/reportstatusSaludaseqStrat?DealID=' + dealId + '&month=' + month + '&year=' + year + '&role=' + OrgName + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "AlphaFlow") {
		response = await API.get(process.env.react_app_base_url + 'backendapialphaflow/api/v1/trustee/reportstatusalphaflowStrat?DealID=' + dealId + '&month=' + month + '&year=' + year + '&role=' + OrgName + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda FIG2") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludafig2/api/v1/trustee/reportstatusFig2Strat?DealID=' + dealId + '&month=' + month + '&year=' + year + '&role=' + OrgName + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda BC1") {
		response = await API.get(process.env.react_app_base_url + 'backendapibc1/api/v1/trustee/reportstatusBC1Strat?DealID=' + dealId + '&month=' + month + '&year=' + year + '&role=' + OrgName + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Reigo") {
		response = await API.get(process.env.react_app_base_url + 'backendapireigo/api/v1/trustee/reportstatusReigoStrat?DealID=' + dealId + '&month=' + month + '&year=' + year + '&role=' + OrgName + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Dominion") {
		response = await API.get(process.env.react_app_base_url + 'backendapidominion/api/v1/trustee/reportstatusDominionStrat?DealID=' + dealId + '&month=' + month + '&year=' + year + '&role=' + OrgName + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda WL1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludawl1/api/v1/trustee/reportstatusWL1Strat?DealID=' + dealId + '&month=' + month + '&year=' + year + '&role=' + OrgName + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Spruce Hill") {
		response = await API.get(process.env.react_app_base_url + 'backendapisprucehill/api/v1/trustee/reportstatusSprucehillStrat?DealID=' + dealId + '&month=' + month + '&year=' + year + '&role=' + OrgName + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda RTL1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludartl1/api/v1/trustee/reportstatusSaludartl1Strat?DealID=' + dealId + '&month=' + month + '&year=' + year + '&role=' + OrgName + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Stoa 2021") {
		response = await API.get(process.env.react_app_base_url + 'backendapistoa/api/v1/trustee/reportstatusStoaStrat?DealID=' + dealId + '&month=' + month + '&year=' + year + '&role=' + OrgName + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Tildene") {
		response = await API.get(process.env.react_app_base_url + 'backendapitildene/api/v1/trustee/reportstatusTildeneStrat?DealID=' + dealId + '&month=' + month + '&year=' + year + '&role=' + OrgName + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda MF1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludamf1/api/v1/trustee/reportstatusMF1Strat?DealID=' + dealId + '&month=' + month + '&year=' + year + '&role=' + OrgName + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Palisades") {
		response = await API.get(process.env.react_app_base_url + 'backendapipalisades/api/v1/trustee/reportstatusPalisadesStrat?DealID=' + dealId + '&month=' + month + '&year=' + year + '&role=' + OrgName + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda RTL2") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludartl2/api/v1/trustee/reportstatusSaludartl2Strat?DealID=' + dealId + '&month=' + month + '&year=' + year + '&role=' + OrgName + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda PRE1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludapre/api/v1/trustee/reportstatusSaludapreStrat?DealID=' + dealId + '&month=' + month + '&year=' + year + '&role=' + OrgName + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "MFA") {
		response = await API.get(process.env.react_app_base_url + 'backendapimfa/api/v1/trustee/reportstatusMfaStrat?DealID=' + dealId + '&month=' + month + '&year=' + year + '&role=' + OrgName + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Setpoint") {
		response = await API.get(process.env.react_app_base_url + 'backendapisetpoint/api/v1/trustee/reportstatusSetpointStrat?DealID=' + dealId + '&month=' + month + '&year=' + year + '&role=' + OrgName + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda BC2") {
		response = await API.get(process.env.react_app_base_url + 'backendapibc2/api/v1/trustee/reportstatusBC2Strat?DealID=' + dealId + '&month=' + month + '&year=' + year + '&role=' + OrgName + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda Builders") {
		response = await API.get(process.env.react_app_base_url + 'backendapibuilders/api/v1/trustee/reportstatusBuildersStrat?DealID=' + dealId + '&month=' + month + '&year=' + year + '&role=' + OrgName + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "NPL") {
		response = await API.get(process.env.react_app_base_url + 'backendapinpl/api/v1/trustee/reportstatusNPLStrat?DealID=' + dealId + '&month=' + month + '&year=' + year + '&role=' + OrgName + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Stoa 2022") {
		response = await API.get(process.env.react_app_base_url + 'backendapistoa2022/api/v1/trustee/reportstatusStoa2022Strat?DealID=' + dealId + '&month=' + month + '&year=' + year + '&role=' + OrgName + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Unlock") {
		response = await API.get(process.env.react_app_base_url + 'backendapiunlock/api/v1/trustee/reportstatusUnlockStrat?DealID=' + dealId + '&month=' + month + '&year=' + year + '&role=' + OrgName + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
};


export const ViewLoanTapeData = async (DealType, dealId, month, year, groupby, OrgName) => {
	let response = null
	if (DealType == "LimaOne") {
		response = await API.get(process.env.react_app_base_url + 'backendapilima/groupby?dealId=' + dealId + '&month=' + month + '&year=' + year + '&role=' + OrgName + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Bawag") {
		response = await API.get(process.env.react_app_base_url + 'backendapibawag/groupbyBawag?dealId=' + dealId + '&month=' + month + '&year=' + year + '&role=' + OrgName + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda PAC1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaluda/groupbySaluda?dealId=' + dealId + '&month=' + month + '&year=' + year + '&role=' + OrgName + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda FIG1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludagrade/groupbySaludagrade?dealId=' + dealId + '&month=' + month + '&year=' + year + '&role=' + OrgName + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda SEQ1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludagradeseq1/groupbySaludaseq?dealId=' + dealId + '&month=' + month + '&year=' + year + '&role=' + OrgName + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "AlphaFlow") {
		response = await API.get(process.env.react_app_base_url + 'backendapialphaflow/groupbyalphaflow?dealId=' + dealId + '&month=' + month + '&year=' + year + '&role=' + OrgName + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda FIG2") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludafig2/groupbyFig2?dealId=' + dealId + '&month=' + month + '&year=' + year + '&role=' + OrgName + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda BC1") {
		response = await API.get(process.env.react_app_base_url + 'backendapibc1/groupbyBC1?dealId=' + dealId + '&month=' + month + '&year=' + year + '&role=' + OrgName + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Reigo") {
		response = await API.get(process.env.react_app_base_url + 'backendapireigo/groupbyReigo?dealId=' + dealId + '&month=' + month + '&year=' + year + '&role=' + OrgName + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Dominion") {
		response = await API.get(process.env.react_app_base_url + 'backendapidominion/groupbyDominion?dealId=' + dealId + '&month=' + month + '&year=' + year + '&role=' + OrgName + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda WL1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludawl1/groupbyWL1?dealId=' + dealId + '&month=' + month + '&year=' + year + '&role=' + OrgName + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Spruce Hill") {
		response = await API.get(process.env.react_app_base_url + 'backendapisprucehill/groupbySprucehill?dealId=' + dealId + '&month=' + month + '&year=' + year + '&role=' + OrgName + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda RTL1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludartl1/groupbySaludartl1?dealId=' + dealId + '&month=' + month + '&year=' + year + '&role=' + OrgName + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Stoa 2021") {
		response = await API.get(process.env.react_app_base_url + 'backendapistoa/groupbyStoa?dealId=' + dealId + '&month=' + month + '&year=' + year + '&role=' + OrgName + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Tildene") {
		response = await API.get(process.env.react_app_base_url + 'backendapitildene/groupbyTildene?dealId=' + dealId + '&month=' + month + '&year=' + year + '&role=' + OrgName + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda MF1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludamf1/groupbyMF1?dealId=' + dealId + '&month=' + month + '&year=' + year + '&role=' + OrgName + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Palisades") {
		response = await API.get(process.env.react_app_base_url + 'backendapipalisades/groupbyPalisades?dealId=' + dealId + '&month=' + month + '&year=' + year + '&role=' + OrgName + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda RTL2") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludartl2/groupbySaludartl2?dealId=' + dealId + '&month=' + month + '&year=' + year + '&role=' + OrgName + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda PRE1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludapre/groupbySaludapre?dealId=' + dealId + '&month=' + month + '&year=' + year + '&role=' + OrgName + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "MFA") {
		response = await API.get(process.env.react_app_base_url + 'backendapimfa/groupbyMfa?dealId=' + dealId + '&month=' + month + '&year=' + year + '&role=' + OrgName + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Setpoint") {
		response = await API.get(process.env.react_app_base_url + 'backendapisetpoint/groupbySetpoint?dealId=' + dealId + '&month=' + month + '&year=' + year + '&role=' + OrgName + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda BC2") {
		response = await API.get(process.env.react_app_base_url + 'backendapibc2/groupbyBC2?dealId=' + dealId + '&month=' + month + '&year=' + year + '&role=' + OrgName + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda Builders") {
		response = await API.get(process.env.react_app_base_url + 'backendapibuilders/groupbyBuilders?dealId=' + dealId + '&month=' + month + '&year=' + year + '&role=' + OrgName + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "NPL") {
		response = await API.get(process.env.react_app_base_url + 'backendapinpl/groupbyNPL?dealId=' + dealId + '&month=' + month + '&year=' + year + '&role=' + OrgName + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Stoa 2022") {
		response = await API.get(process.env.react_app_base_url + 'backendapistoa2022/groupbyStoa2022?dealId=' + dealId + '&month=' + month + '&year=' + year + '&role=' + OrgName + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Unlock") {
		response = await API.get(process.env.react_app_base_url + 'backendapiunlock/groupbyUnlock?dealId=' + dealId + '&month=' + month + '&year=' + year + '&role=' + OrgName + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
};


export const ValidateMonthlyInput = async (DealType, dealId, month, year, channelname) => {
	let response = null
	if (DealType == "LimaOne") {
		response = await API.get(process.env.react_app_base_url + 'backendapilima/api/v1/trustee/newupdateuiLima?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Bawag") {
		response = await API.get(process.env.react_app_base_url + 'backendapibawag/api/v1/trustee/updateuiBawag?dealId=' + dealId + '&month=' + month + '&year=' + year + '&channelname=' + channelname + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda PAC1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaluda/api/v1/trustee/newupdateuiSaluda?dealId=' + dealId + '&month=' + month + '&year=' + year + '&channelname=' + channelname + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda FIG1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludagrade/api/v1/trustee/newupdateuiSaludagrade?dealId=' + dealId + '&month=' + month + '&year=' + year + '&channelname=' + channelname + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda SEQ1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludagradeseq1/api/v1/trustee/newupdateuiSaludaseq?dealId=' + dealId + '&month=' + month + '&year=' + year + '&channelname=' + channelname + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "AlphaFlow") {
		response = await API.get(process.env.react_app_base_url + 'backendapialphaflow/api/v1/trustee/newupdateuialphaflow?dealId=' + dealId + '&month=' + month + '&year=' + year + '&channelname=' + channelname + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda FIG2") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludafig2/api/v1/trustee/newupdateuiFig2?dealId=' + dealId + '&month=' + month + '&year=' + year + '&channelname=' + channelname + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda BC1") {
		response = await API.get(process.env.react_app_base_url + 'backendapibc1/api/v1/trustee/newupdateuiBC1?dealId=' + dealId + '&month=' + month + '&year=' + year + '&channelname=' + channelname + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Reigo") {
		response = await API.get(process.env.react_app_base_url + 'backendapireigo/api/v1/trustee/newupdateuiReigo?dealId=' + dealId + '&month=' + month + '&year=' + year + '&channelname=' + channelname + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Dominion") {
		response = await API.get(process.env.react_app_base_url + 'backendapidominion/api/v1/trustee/newupdateuiDominion?dealId=' + dealId + '&month=' + month + '&year=' + year + '&channelname=' + channelname + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda WL1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludawl1/api/v1/trustee/newupdateuiWL1?dealId=' + dealId + '&month=' + month + '&year=' + year + '&channelname=' + channelname + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Spruce Hill") {
		response = await API.get(process.env.react_app_base_url + 'backendapisprucehill/api/v1/trustee/newupdateuiSprucehill?dealId=' + dealId + '&month=' + month + '&year=' + year + '&channelname=' + channelname + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda RTL1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludartl1/api/v1/trustee/newupdateuiSaludartl1?dealId=' + dealId + '&month=' + month + '&year=' + year + '&channelname=' + channelname + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Stoa 2021") {
		response = await API.get(process.env.react_app_base_url + 'backendapistoa/api/v1/trustee/newupdateuiStoa?dealId=' + dealId + '&month=' + month + '&year=' + year + '&channelname=' + channelname + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Tildene") {
		response = await API.get(process.env.react_app_base_url + 'backendapitildene/api/v1/trustee/newupdateuiTildene?dealId=' + dealId + '&month=' + month + '&year=' + year + '&channelname=' + channelname + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda MF1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludamf1/api/v1/trustee/newupdateuiMF1?dealId=' + dealId + '&month=' + month + '&year=' + year + '&channelname=' + channelname + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Palisades") {
		response = await API.get(process.env.react_app_base_url + 'backendapipalisades/api/v1/trustee/newupdateuiPalisades?dealId=' + dealId + '&month=' + month + '&year=' + year + '&channelname=' + channelname + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda RTL2") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludartl2/api/v1/trustee/newupdateuiSaludartl2?dealId=' + dealId + '&month=' + month + '&year=' + year + '&channelname=' + channelname + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda PRE1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludapre/api/v1/trustee/newupdateuiSaludapre?dealId=' + dealId + '&month=' + month + '&year=' + year + '&channelname=' + channelname + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "MFA") {
		response = await API.get(process.env.react_app_base_url + 'backendapimfa/api/v1/trustee/newupdateuiMfa?dealId=' + dealId + '&month=' + month + '&year=' + year + '&channelname=' + channelname + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Setpoint") {
		response = await API.get(process.env.react_app_base_url + 'backendapisetpoint/api/v1/trustee/newupdateuiSetpoint?dealId=' + dealId + '&month=' + month + '&year=' + year + '&channelname=' + channelname + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda BC2") {
		response = await API.get(process.env.react_app_base_url + 'backendapibc2/api/v1/trustee/newupdateuiBC2?dealId=' + dealId + '&month=' + month + '&year=' + year + '&channelname=' + channelname + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda Builders") {
		response = await API.get(process.env.react_app_base_url + 'backendapibuilders/api/v1/trustee/newupdateuiBuilders?dealId=' + dealId + '&month=' + month + '&year=' + year + '&channelname=' + channelname + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "NPL") {
		response = await API.get(process.env.react_app_base_url + 'backendapinpl/api/v1/trustee/newupdateuiNPL?dealId=' + dealId + '&month=' + month + '&year=' + year + '&channelname=' + channelname + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Stoa 2022") {
		response = await API.get(process.env.react_app_base_url + 'backendapistoa2022/api/v1/trustee/newupdateuiStoa2022?dealId=' + dealId + '&month=' + month + '&year=' + year + '&channelname=' + channelname + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Unlock") {
		response = await API.get(process.env.react_app_base_url + 'backendapiunlock/api/v1/trustee/newupdateuiUnlock?dealId=' + dealId + '&month=' + month + '&year=' + year + '&channelname=' + channelname + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
};


export const UpdateValidateMonthlyInput = async (DealType, data) => {
	let response = null

	if (DealType == "LimaOne") {
		response = await API.post(process.env.react_app_base_url + 'backendapilima/api/v1/trustee/onboardservicerdataLima', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Bawag") {
		response = await API.post(process.env.react_app_base_url + 'backendapibawag/api/v1/trustee/onboardservicerdataBawag', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda PAC1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaluda/api/v1/trustee/onboardservicerdataSaluda', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda FIG1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludagrade/api/v1/trustee/onboardservicerdataSaludagrade', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda SEQ1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludagradeseq1/api/v1/trustee/onboardservicerdataSaludaseq', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "AlphaFlow") {
		response = await API.post(process.env.react_app_base_url + 'backendapialphaflow/api/v1/trustee/onboardservicerdataalphaflow', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda FIG2") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludafig2/api/v1/trustee/onboardservicerdataFig2', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda BC1") {
		response = await API.post(process.env.react_app_base_url + 'backendapibc1/api/v1/trustee/onboardservicerdataBC1', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Reigo") {
		response = await API.post(process.env.react_app_base_url + 'backendapireigo/api/v1/trustee/onboardservicerdataReigo', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Dominion") {
		response = await API.post(process.env.react_app_base_url + 'backendapidominion/api/v1/trustee/onboardservicerdataDominion', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda WL1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludawl1/api/v1/trustee/onboardservicerdataWL1', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Spruce Hill") {
		response = await API.post(process.env.react_app_base_url + 'backendapisprucehill/api/v1/trustee/onboardservicerdataSprucehill', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda RTL1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludartl1/api/v1/trustee/onboardservicerdataSaludartl1', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Stoa 2021") {
		response = await API.post(process.env.react_app_base_url + 'backendapistoa/api/v1/trustee/onboardservicerdataStoa', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Tildene") {
		response = await API.post(process.env.react_app_base_url + 'backendapitildene/api/v1/trustee/onboardservicerdataTildene', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda MF1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludamf1/api/v1/trustee/onboardservicerdataMF1', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Palisades") {
		response = await API.post(process.env.react_app_base_url + 'backendapipalisades/api/v1/trustee/onboardservicerdataPalisades', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda RTL2") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludartl2/api/v1/trustee/onboardservicerdataSaludartl2', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda PRE1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludapre/api/v1/trustee/onboardservicerdataSaludapre', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "MFA") {
		response = await API.post(process.env.react_app_base_url + 'backendapimfa/api/v1/trustee/onboardservicerdataMfa', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Setpoint") {
		response = await API.post(process.env.react_app_base_url + 'backendapisetpoint/api/v1/trustee/onboardservicerdataSetpoint', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda BC2") {
		response = await API.post(process.env.react_app_base_url + 'backendapibc2/api/v1/trustee/onboardservicerdataBC2', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda Builders") {
		response = await API.post(process.env.react_app_base_url + 'backendapibuilders/api/v1/trustee/onboardservicerdataBuilders', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "NPL") {
		response = await API.post(process.env.react_app_base_url + 'backendapinpl/api/v1/trustee/onboardservicerdataNPL', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Stoa 2022") {
		response = await API.post(process.env.react_app_base_url + 'backendapistoa2022/api/v1/trustee/onboardservicerdataStoa2022', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Unlock") {
		response = await API.post(process.env.react_app_base_url + 'backendapiunlock/api/v1/trustee/onboardservicerdataUnlock', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
};

// view-servicer-blockchain-data
export const ServicerDataBlockchain = async (DealType, dealId, month, year) => {
	let response = null
	if (DealType == "LimaOne") {
		response = await API.get(process.env.react_app_base_url + 'backendapilima/api/v1/trustee/onchainservicerdataLima?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Bawag") {
		response = await API.get(process.env.react_app_base_url + 'backendapibawag/api/v1/trustee/onchainservicerdataBawag?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda PAC1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaluda/api/v1/trustee/onchainservicerdataSaluda?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda FIG1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludagrade/api/v1/trustee/onchainservicerdataSaludagrade?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda SEQ1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludagradeseq1/api/v1/trustee/onchainservicerdataSaludaseq?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "AlphaFlow") {
		response = await API.get(process.env.react_app_base_url + 'backendapialphaflow/api/v1/trustee/onchainservicerdataalphaflow?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda FIG2") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludafig2/api/v1/trustee/onchainservicerdataFig2?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda BC1") {
		response = await API.get(process.env.react_app_base_url + 'backendapibc1/api/v1/trustee/onchainservicerdataBC1?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Reigo") {
		response = await API.get(process.env.react_app_base_url + 'backendapireigo/api/v1/trustee/onchainservicerdataReigo?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Dominion") {
		response = await API.get(process.env.react_app_base_url + 'backendapidominion/api/v1/trustee/onchainservicerdataDominion?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda WL1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludawl1/api/v1/trustee/onchainservicerdataWL1?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Spruce Hill") {
		response = await API.get(process.env.react_app_base_url + 'backendapisprucehill/api/v1/trustee/onchainservicerdataSprucehill?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda RTL1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludartl1/api/v1/trustee/onchainservicerdataSaludartl1?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Stoa 2021") {
		response = await API.get(process.env.react_app_base_url + 'backendapistoa/api/v1/trustee/onchainservicerdataStoa?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Tildene") {
		response = await API.get(process.env.react_app_base_url + 'backendapitildene/api/v1/trustee/onchainservicerdataTildene?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda MF1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludamf1/api/v1/trustee/onchainservicerdataMF1?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Palisades") {
		response = await API.get(process.env.react_app_base_url + 'backendapipalisades/api/v1/trustee/onchainservicerdataPalisades?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda RTL2") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludartl2/api/v1/trustee/onchainservicerdataSaludartl2?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda PRE1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludapre/api/v1/trustee/onchainservicerdataSaludapre?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "MFA") {
		response = await API.get(process.env.react_app_base_url + 'backendapimfa/api/v1/trustee/onchainservicerdataMfa?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Setpoint") {
		response = await API.get(process.env.react_app_base_url + 'backendapisetpoint/api/v1/trustee/onchainservicerdataSetpoint?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda BC2") {
		response = await API.get(process.env.react_app_base_url + 'backendapibc2/api/v1/trustee/onchainservicerdataBC2?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda Builders") {
		response = await API.get(process.env.react_app_base_url + 'backendapibuilders/api/v1/trustee/onchainservicerdataBuilders?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "NPL") {
		response = await API.get(process.env.react_app_base_url + 'backendapinpl/api/v1/trustee/onchainservicerdataNPL?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Stoa 2022") {
		response = await API.get(process.env.react_app_base_url + 'backendapistoa2022/api/v1/trustee/onchainservicerdataStoa2022?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Unlock") {
		response = await API.get(process.env.react_app_base_url + 'backendapiunlock/api/v1/trustee/onchainservicerdataUnlock?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
};

// 

// api/v1/trustee/invreportresponseLima

export const CustomizeReportAPI = async (DealType, dealId, month, year) => {
	let response = null
	if (DealType == "LimaOne") {
		response = await API.get(process.env.react_app_base_url + 'backendapilima/api/v1/trustee/invreportresponseLima?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Bawag") {
		response = await API.get(process.env.react_app_base_url + 'backendapibawag/api/v1/trustee/invreportresponseBawag?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda PAC1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaluda/api/v1/trustee/invreportresponseSaluda?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda FIG1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludagrade/api/v1/trustee/invreportresponseSaludagrade?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda SEQ1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludagradeseq1/api/v1/trustee/invreportresponseSaludaseq?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "AlphaFlow") {
		response = await API.get(process.env.react_app_base_url + 'backendapialphaflow/api/v1/trustee/invreportresponsealphaflow?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda FIG2") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludafig2/api/v1/trustee/invreportresponseSaludafig2?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda BC1") {
		response = await API.get(process.env.react_app_base_url + 'backendapibc1/api/v1/trustee/invreportresponseBC1?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Reigo") {
		response = await API.get(process.env.react_app_base_url + 'backendapireigo/api/v1/trustee/invreportresponseReigo?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Dominion") {
		response = await API.get(process.env.react_app_base_url + 'backendapidominion/api/v1/trustee/invreportresponseDominion?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda WL1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludawl1/api/v1/trustee/invreportresponseWL1?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Spruce Hill") {
		response = await API.get(process.env.react_app_base_url + 'backendapisprucehill/api/v1/trustee/invreportresponseSprucehill?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda RTL1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludartl1/api/v1/trustee/invreportresponseSaludartl1?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Stoa 2021") {
		response = await API.get(process.env.react_app_base_url + 'backendapistoa/api/v1/trustee/invreportresponseStoa?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Tildene") {
		response = await API.get(process.env.react_app_base_url + 'backendapitildene/api/v1/trustee/invreportresponseTildene?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda MF1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludamf1/api/v1/trustee/invreportresponseMF1?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Palisades") {
		response = await API.get(process.env.react_app_base_url + 'backendapipalisades/api/v1/trustee/invreportresponsePalisades?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda RTL2") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludartl2/api/v1/trustee/invreportresponseSaludartl2?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda PRE1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludapre/api/v1/trustee/invreportresponseSaludapre?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "MFA") {
		response = await API.get(process.env.react_app_base_url + 'backendapimfa/api/v1/trustee/invreportresponseMfa?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Setpoint") {
		response = await API.get(process.env.react_app_base_url + 'backendapisetpoint/api/v1/trustee/invreportresponseSetpoint?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda BC2") {
		response = await API.get(process.env.react_app_base_url + 'backendapibc2/api/v1/trustee/invreportresponseBC2?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda Builders") {
		response = await API.get(process.env.react_app_base_url + 'backendapibuilders/api/v1/trustee/invreportresponseBuilders?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "NPL") {
		response = await API.get(process.env.react_app_base_url + 'backendapinpl/api/v1/trustee/invreportresponseNPL?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Stoa 2022") {
		response = await API.get(process.env.react_app_base_url + 'backendapistoa2022/api/v1/trustee/invreportresponseStoa2022?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Unlock") {
		response = await API.get(process.env.react_app_base_url + 'backendapiunlock/api/v1/trustee/invreportresponseUnlock?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
};

export const SaveCustomizeReportAPI = async (DealType, data) => {
	let response = null
	if (DealType == "LimaOne") {
		response = await API.post(process.env.react_app_base_url + 'backendapilima/api/v1/trustee/savecustomreportLima', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Bawag") {
		response = await API.post(process.env.react_app_base_url + 'backendapibawag/api/v1/trustee/savecustomreportBawag', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda PAC1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaluda/api/v1/trustee/savecustomreportSaluda', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda FIG1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludagrade/api/v1/trustee/savecustomreportSaludagrade', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda SEQ1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludagradeseq1/api/v1/trustee/savecustomreportSaludaseq', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "AlphaFlow") {
		response = await API.post(process.env.react_app_base_url + 'backendapialphaflow/api/v1/trustee/savecustomreportalphaflow', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda FIG2") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludafig2/api/v1/trustee/savecustomreportSaludafig2', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda BC1") {
		response = await API.post(process.env.react_app_base_url + 'backendapibc1/api/v1/trustee/savecustomreportBC1', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Reigo") {
		response = await API.post(process.env.react_app_base_url + 'backendapireigo/api/v1/trustee/savecustomreportReigo', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Dominion") {
		response = await API.post(process.env.react_app_base_url + 'backendapidominion/api/v1/trustee/savecustomreportDominion', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda WL1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludawl1/api/v1/trustee/savecustomreportWL1', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Spruce Hill") {
		response = await API.post(process.env.react_app_base_url + 'backendapisprucehill/api/v1/trustee/savecustomreportSprucehill', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda RTL1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludartl1/api/v1/trustee/savecustomreportSaludartl1', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Stoa 2021") {
		response = await API.post(process.env.react_app_base_url + 'backendapistoa/api/v1/trustee/savecustomreportStoa', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Tildene") {
		response = await API.post(process.env.react_app_base_url + 'backendapitildene/api/v1/trustee/savecustomreportTildene', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda MF1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludamf1/api/v1/trustee/savecustomreportMF1', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Palisades") {
		response = await API.post(process.env.react_app_base_url + 'backendapipalisades/api/v1/trustee/savecustomreportPalisades', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda RTL2") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludartl2/api/v1/trustee/savecustomreportSaludartl2', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda PRE1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludapre/api/v1/trustee/savecustomreportSaludapre', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "MFA") {
		response = await API.post(process.env.react_app_base_url + 'backendapimfa/api/v1/trustee/savecustomreportMfa', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Setpoint") {
		response = await API.post(process.env.react_app_base_url + 'backendapisetpoint/api/v1/trustee/savecustomreportSetpoint', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda BC2") {
		response = await API.post(process.env.react_app_base_url + 'backendapibc2/api/v1/trustee/savecustomreportBC2', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda Builders") {
		response = await API.post(process.env.react_app_base_url + 'backendapibuilders/api/v1/trustee/savecustomreportbuilders', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "NPL") {
		response = await API.post(process.env.react_app_base_url + 'backendapinpl/api/v1/trustee/savecustomreportNPL', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Stoa 2022") {
		response = await API.post(process.env.react_app_base_url + 'backendapistoa2022/api/v1/trustee/savecustomreportStoa2022', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Unlock") {
		response = await API.post(process.env.react_app_base_url + 'backendapiunlock/api/v1/trustee/savecustomreportUnlock', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
};

export const GetCustomizationReport = async (DealType, dealId, month, year) => {
	let response = null

	if (DealType == "LimaOne") {
		response = await API.get(process.env.react_app_base_url + 'backendapilima/api/v1/trustee/viewcustomreportLima?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Bawag") {
		response = await API.get(process.env.react_app_base_url + 'backendapibawag/api/v1/trustee/viewcustomreportBawag?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda PAC1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaluda/api/v1/trustee/viewcustomreportSaluda?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda FIG1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludagrade/api/v1/trustee/viewcustomreportSaludagrade?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda SEQ1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludagradeseq1/api/v1/trustee/viewcustomreportSaludaseq?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "AlphaFlow") {
		response = await API.get(process.env.react_app_base_url + 'backendapialphaflow/api/v1/trustee/viewcustomreportalphaflow?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda FIG2") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludafig2/api/v1/trustee/viewcustomreportSaludafig2?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda BC1") {
		response = await API.get(process.env.react_app_base_url + 'backendapibc1/api/v1/trustee/viewcustomreportBC1?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Reigo") {
		response = await API.get(process.env.react_app_base_url + 'backendapireigo/api/v1/trustee/viewcustomreportReigo?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Dominion") {
		response = await API.get(process.env.react_app_base_url + 'backendapidominion/api/v1/trustee/viewcustomreportDominion?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda WL1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludawl1/api/v1/trustee/viewcustomreportWL1?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Spruce Hill") {
		response = await API.get(process.env.react_app_base_url + 'backendapisprucehill/api/v1/trustee/viewcustomreportSprucehill?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda RTL1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludartl1/api/v1/trustee/viewcustomreportSaludartl1?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Stoa 2021") {
		response = await API.get(process.env.react_app_base_url + 'backendapistoa/api/v1/trustee/viewcustomreportStoa?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Tildene") {
		response = await API.get(process.env.react_app_base_url + 'backendapitildene/api/v1/trustee/viewcustomreportTildene?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda MF1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludamf1/api/v1/trustee/viewcustomreportMF1?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Palisades") {
		response = await API.get(process.env.react_app_base_url + 'backendapipalisades/api/v1/trustee/viewcustomreportPalisades?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda RTL2") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludartl2/api/v1/trustee/viewcustomreportSaludartl2?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda PRE1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludapre/api/v1/trustee/viewcustomreportSaludapre?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "MFA") {
		response = await API.get(process.env.react_app_base_url + 'backendapimfa/api/v1/trustee/viewcustomreportMfa?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Setpoint") {
		response = await API.get(process.env.react_app_base_url + 'backendapisetpoint/api/v1/trustee/viewcustomreportSetpoint?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda BC2") {
		response = await API.get(process.env.react_app_base_url + 'backendapibc2/api/v1/trustee/viewcustomreportBC2?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "NPL") {
		response = await API.get(process.env.react_app_base_url + 'backendapinpl/api/v1/trustee/viewcustomreportNPL?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Stoa 2022") {
		response = await API.get(process.env.react_app_base_url + 'backendapistoa2022/api/v1/trustee/viewcustomreportStoa2022?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Unlock") {
		response = await API.get(process.env.react_app_base_url + 'backendapiunlock/api/v1/trustee/viewcustomreportUnlock?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
};


export const InvestorList = async (DealType, dealId, month, year) => {
	let response = null
	if (DealType == "LimaOne") {
		response = await API.get(process.env.react_app_base_url + 'backendapilima/api/v1/trustee/getallinvestors?peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Bawag") {
		response = await API.get(process.env.react_app_base_url + 'backendapibawag/api/v1/trustee/getallinvestors?peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda PAC1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaluda/api/v1/trustee/getallinvestorsSaluda?peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda FIG1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludagrade/api/v1/trustee/getallinvestorsSaludagrade?peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda SEQ1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludagradeseq1/api/v1/trustee/getallinvestorsSaludaseq?peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		// response = await API.get(process.env.react_app_base_url + 'backendapilima/api/v1/trustee/getallinvestors?peer=' + LimaPeer)

		return response;
	}
	else if (DealType == "AlphaFlow") {
		response = await API.get(process.env.react_app_base_url + 'backendapialphaflow/api/v1/trustee/getallinvestorsalphaflow?peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda FIG2") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludafig2/api/v1/trustee/getallinvestorsFig2?peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda BC1") {
		response = await API.get(process.env.react_app_base_url + 'backendapibc1/api/v1/trustee/getallinvestorsBC1?peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Reigo") {
		response = await API.get(process.env.react_app_base_url + 'backendapireigo/api/v1/trustee/getallinvestorsReigo?peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Dominion") {
		response = await API.get(process.env.react_app_base_url + 'backendapidominion/api/v1/trustee/getallinvestorsDominion?peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda WL1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludawl1/api/v1/trustee/getallinvestorsWL1?peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Spruce Hill") {
		response = await API.get(process.env.react_app_base_url + 'backendapisprucehill/api/v1/trustee/getallinvestorsSprucehill?peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda RTL1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludartl1/api/v1/trustee/getallinvestorsSaludartl1?peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Stoa 2021") {
		response = await API.get(process.env.react_app_base_url + 'backendapistoa/api/v1/trustee/getallinvestorsStoa?peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Tildene") {
		response = await API.get(process.env.react_app_base_url + 'backendapitildene/api/v1/trustee/getallinvestorsTildene?peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda MF1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludamf1/api/v1/trustee/getallinvestorsMF1?peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Palisades") {
		response = await API.get(process.env.react_app_base_url + 'backendapipalisades/api/v1/trustee/getallinvestorsPalisades?peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda RTL2") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludartl2/api/v1/trustee/getallinvestorsSaludartl2?peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda PRE1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludapre/api/v1/trustee/getallinvestorsSaludapre?peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "MFA") {
		response = await API.get(process.env.react_app_base_url + 'backendapimfa/api/v1/trustee/getallinvestorsMfa?peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Setpoint") {
		response = await API.get(process.env.react_app_base_url + 'backendapisetpoint/api/v1/trustee/getallinvestorsSetpoint?peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda BC2") {
		response = await API.get(process.env.react_app_base_url + 'backendapibc2/api/v1/trustee/getallinvestorsBC2?peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda Builders") {
		response = await API.get(process.env.react_app_base_url + 'backendapibuilders/api/v1/trustee/getallinvestorsBuilders?peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "NPL") {
		response = await API.get(process.env.react_app_base_url + 'backendapinpl/api/v1/trustee/getallinvestorsNPL?peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Stoa 2022") {
		response = await API.get(process.env.react_app_base_url + 'backendapistoa2022/api/v1/trustee/getallinvestorsStoa2022?peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Unlock") {
		response = await API.get(process.env.react_app_base_url + 'backendapiunlock/api/v1/trustee/getallinvestorsUnlock?peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
};

export const AdjustmentMonth = async (DealType, dealId, month, year) => {
	let response = null
	if (DealType == "LimaOne") {
		response = await API.get(process.env.react_app_base_url + 'backendapilima/api/v1/trustee/getadjustmentmonth?dealId=' + dealId + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
};

export const Prompt = async (DealType, dealId, month, year, channelname) => {
	let response = null

	if (DealType == "LimaOne") {
		response = await API.get(process.env.react_app_base_url + 'backendapilima/api/v1/trustee/prompt?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Bawag") {
		response = await API.get(process.env.react_app_base_url + 'backendapibawag/api/v1/trustee/prompt?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda PAC1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaluda/api/v1/trustee/prompt?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda FIG1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludagrade/api/v1/trustee/prompt?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda SEQ1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludagradeseq1/api/v1/trustee/prompt?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "AlphaFlow") {
		response = await API.get(process.env.react_app_base_url + 'backendapialphaflow/api/v1/trustee/prompt?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda FIG2") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludafig2/api/v1/trustee/prompt?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda BC1") {
		response = await API.get(process.env.react_app_base_url + 'backendapibc1/api/v1/trustee/prompt?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Reigo") {
		response = await API.get(process.env.react_app_base_url + 'backendapireigo/api/v1/trustee/prompt?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Dominion") {
		response = await API.get(process.env.react_app_base_url + 'backendapidominion/api/v1/trustee/prompt?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda WL1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludawl1/api/v1/trustee/prompt?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Spruce Hill") {
		response = await API.get(process.env.react_app_base_url + 'backendapisprucehill/api/v1/trustee/prompt?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda RTL1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludartl1/api/v1/trustee/prompt?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Stoa 2021") {
		response = await API.get(process.env.react_app_base_url + 'backendapistoa/api/v1/trustee/prompt?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Tildene") {
		response = await API.get(process.env.react_app_base_url + 'backendapitildene/api/v1/trustee/prompt?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda MF1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludamf1/api/v1/trustee/prompt?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Palisades") {
		response = await API.get(process.env.react_app_base_url + 'backendapipalisades/api/v1/trustee/prompt?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda RTL2") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludartl2/api/v1/trustee/prompt?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda PRE1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludapre/api/v1/trustee/prompt?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "MFA") {
		response = await API.get(process.env.react_app_base_url + 'backendapimfa/api/v1/trustee/prompt?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Setpoint") {
		response = await API.get(process.env.react_app_base_url + 'backendapisetpoint/api/v1/trustee/prompt?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda BC2") {
		response = await API.get(process.env.react_app_base_url + 'backendapibc2/api/v1/trustee/prompt?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda Builders") {
		response = await API.get(process.env.react_app_base_url + 'backendapibuilders/api/v1/trustee/prompt?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "NPL") {
		response = await API.get(process.env.react_app_base_url + 'backendapinpl/api/v1/trustee/prompt?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Stoa 2022") {
		response = await API.get(process.env.react_app_base_url + 'backendapistoa2022/api/v1/trustee/prompt?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Unlock") {
		response = await API.get(process.env.react_app_base_url + 'backendapiunlock/api/v1/trustee/prompt?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
};
export const EnableDisable = async (DealType, data) => {
	let response = null
	console.log("enabledisable" + DealType)
	console.log("enabledisable" + data)
	if (DealType == "LimaOne") {
		response = await API.post(process.env.react_app_base_url + 'backendapilima/api/v1/trustee/enabledisable', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Bawag") {
		response = await API.post(process.env.react_app_base_url + 'backendapibawag/api/v1/trustee/enabledisable', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda PAC1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaluda/api/v1/trustee/enabledisable', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda FIG1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludagrade/api/v1/trustee/enabledisable', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda SEQ1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludagradeseq1/api/v1/trustee/enabledisable', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "AlphaFlow") {
		response = await API.post(process.env.react_app_base_url + 'backendapialphaflow/api/v1/trustee/enabledisable', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda FIG2") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludafig2/api/v1/trustee/enabledisable', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda BC1") {
		response = await API.post(process.env.react_app_base_url + 'backendapibc1/api/v1/trustee/enabledisable', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Reigo") {
		response = await API.post(process.env.react_app_base_url + 'backendapireigo/api/v1/trustee/enabledisable', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Dominion") {
		response = await API.post(process.env.react_app_base_url + 'backendapidominion/api/v1/trustee/enabledisable', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda WL1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludawl1/api/v1/trustee/enabledisable', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Spruce Hill") {
		response = await API.post(process.env.react_app_base_url + 'backendapisprucehill/api/v1/trustee/enabledisable', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda RTL1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludartl1/api/v1/trustee/enabledisable', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Stoa 2021") {
		response = await API.post(process.env.react_app_base_url + 'backendapistoa/api/v1/trustee/enabledisable', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Tildene") {
		response = await API.post(process.env.react_app_base_url + 'backendapitildene/api/v1/trustee/enabledisable', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda MF1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludamf1/api/v1/trustee/enabledisable', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Palisades") {
		response = await API.post(process.env.react_app_base_url + 'backendapipalisades/api/v1/trustee/enabledisable', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda RTL2") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludartl2/api/v1/trustee/enabledisable', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda PRE1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludapre/api/v1/trustee/enabledisable', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "MFA") {
		response = await API.post(process.env.react_app_base_url + 'backendapimfa/api/v1/trustee/enabledisable', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Setpoint") {
		response = await API.post(process.env.react_app_base_url + 'backendapisetpoint/api/v1/trustee/enabledisable', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda BC2") {
		response = await API.post(process.env.react_app_base_url + 'backendapibc2/api/v1/trustee/enabledisable', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda Builders") {
		response = await API.post(process.env.react_app_base_url + 'backendapibuilders/api/v1/trustee/enabledisable', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "NPL") {
		response = await API.post(process.env.react_app_base_url + 'backendapinpl/api/v1/trustee/enabledisable', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Stoa 2022") {
		response = await API.post(process.env.react_app_base_url + 'backendapistoa2022/api/v1/trustee/enabledisable', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Unlock") {
		response = await API.post(process.env.react_app_base_url + 'backendapiunlock/api/v1/trustee/enabledisable', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
};



export const savedictionary = async (data, DealType) => {
	let response = null
	if (DealType == "LimaOne") {
		response = await API.post(process.env.react_app_base_url + 'backendapilima/savedictionary', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Bawag") {
		response = await API.post(process.env.react_app_base_url + 'backendapibawag/savedictionary', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda PAC1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaluda/savedictionary', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda FIG1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludagrade/savedictionary', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda SEQ1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludagradeseq1/savedictionary', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "AlphaFlow") {
		response = await API.post(process.env.react_app_base_url + 'backendapialphaflow/savedictionary', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda FIG2") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludafig2/savedictionary', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda BC1") {
		response = await API.post(process.env.react_app_base_url + 'backendapibc1/savedictionaryBC1', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Reigo") {
		response = await API.post(process.env.react_app_base_url + 'backendapireigo/savedictionary', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Dominion") {
		response = await API.post(process.env.react_app_base_url + 'backendapidominion/savedictionary', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda WL1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludawl1/savedictionary', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Spruce Hill") {
		response = await API.post(process.env.react_app_base_url + 'backendapisprucehill/savedictionary', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda RTL1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludartl1/savedictionary', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Stoa 2021") {
		response = await API.post(process.env.react_app_base_url + 'backendapistoa/savedictionary', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Tildene") {
		response = await API.post(process.env.react_app_base_url + 'backendapitildene/savedictionary', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda MF1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludamf1/savedictionary', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Palisades") {
		response = await API.post(process.env.react_app_base_url + 'backendapipalisades/savedictionary', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda RTL2") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludartl2/savedictionary', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda PRE1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludapre/savedictionary', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "MFA") {
		response = await API.post(process.env.react_app_base_url + 'backendapimfa/savedictionary', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Setpoint") {
		response = await API.post(process.env.react_app_base_url + 'backendapisetpoint/savedictionary', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda BC2") {
		response = await API.post(process.env.react_app_base_url + 'backendapibc2/savedictionary', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda Builders") {
		response = await API.post(process.env.react_app_base_url + 'backendapibuilders/savedictionary', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "NPL") {
		response = await API.post(process.env.react_app_base_url + 'backendapinpl/savedictionary', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Stoa 2022") {
		response = await API.post(process.env.react_app_base_url + 'backendapistoa2022/savedictionary', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Unlock") {
		response = await API.post(process.env.react_app_base_url + 'backendapiunlock/savedictionary', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
};




export const GeneratePDF = async (data, DealType) => {
	let response = null

	if (DealType == "LimaOne") {
		response = await API.post(process.env.react_app_base_url + 'backendapilima/invreportpdf', data,{ headers: {"authorization" : `Bearer ${token}`} })
		// response = await API.post("http://localhost:3005/invreportpdf", data)
		return response;
	} else if (DealType == "Bawag") {
		response = await API.post(process.env.react_app_base_url + 'backendapibawag/invreportpdf', data,{ headers: {"authorization" : `Bearer ${token}`} })
		// response = await API.post("http://localhost:3005/invreportpdf", data)
		return response;
	} else if (DealType == "Saluda PAC1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaluda/invreportpdf', data,{ headers: {"authorization" : `Bearer ${token}`} })
		// response = await API.post("http://localhost:3005/invreportpdf", data)

		return response;
	} else if (DealType == "Saluda FIG1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludagrade/invreportpdf', data,{ headers: {"authorization" : `Bearer ${token}`} })
		// response = await API.post("http://localhost:3005/invreportpdf", data)
		return response;
	} else if (DealType == "Saluda SEQ1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludagradeseq1/invreportpdf', data,{ headers: {"authorization" : `Bearer ${token}`} })
		// response = await API.post("http://localhost:3005/invreportpdf", data)
		return response;
	}
	else if (DealType == "AlphaFlow") {
		response = await API.post(process.env.react_app_base_url + 'backendapialphaflow/invreportpdf', data,{ headers: {"authorization" : `Bearer ${token}`} })
		// response = await API.post("http://localhost:3005/invreportpdf", data)
		return response;
	} else if (DealType == "Saluda FIG2") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludafig2/invreportpdf', data,{ headers: {"authorization" : `Bearer ${token}`} })
		// response = await API.post("http://localhost:3005/invreportpdf", data)
		return response;
	}
	else if (DealType == "Saluda BC1") {
		response = await API.post(process.env.react_app_base_url + 'backendapibc1/invreportpdf', data,{ headers: {"authorization" : `Bearer ${token}`} })
		// response = await API.post("http://localhost:3005/invreportpdf", data)
		return response;
	}
	else if (DealType == "Reigo") {
		response = await API.post(process.env.react_app_base_url + 'backendapireigo/invreportpdf', data,{ headers: {"authorization" : `Bearer ${token}`} })
		// response = await API.post("http://localhost:3005/invreportpdf", data)
		return response;
	}
	else if (DealType == "Dominion") {
		response = await API.post(process.env.react_app_base_url + 'backendapidominion/invreportpdf', data,{ headers: {"authorization" : `Bearer ${token}`} })
		// response = await API.post("http://localhost:3005/invreportpdf", data)
		return response;
	}
	else if (DealType == "Saluda WL1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludawl1/invreportpdf', data,{ headers: {"authorization" : `Bearer ${token}`} })
		// response = await API.post("http://localhost:3005/invreportpdf", data)
		return response;
	}
	else if (DealType == "Spruce Hill") {
		response = await API.post(process.env.react_app_base_url + 'backendapisprucehill/invreportpdf', data,{ headers: {"authorization" : `Bearer ${token}`} })
		// response = await API.post("http://localhost:3005/invreportpdf", data)
		return response;
	}
	else if (DealType == "Saluda RTL1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludartl1/invreportpdf', data,{ headers: {"authorization" : `Bearer ${token}`} })
		// response = await API.post("http://localhost:3005/invreportpdf", data)
		return response;
	}
	else if (DealType == "Stoa 2021") {
		response = await API.post(process.env.react_app_base_url + 'backendapistoa/invreportpdf', data,{ headers: {"authorization" : `Bearer ${token}`} })
		// response = await API.post("http://localhost:3005/invreportpdf", data)
		return response;
	}
	else if (DealType == "Tildene") {
		response = await API.post(process.env.react_app_base_url + 'backendapitildene/invreportpdf', data,{ headers: {"authorization" : `Bearer ${token}`} })
		// response = await API.post("http://localhost:3005/invreportpdf", data)
		return response;
	}
	else if (DealType == "Saluda MF1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludamf1/invreportpdf', data,{ headers: {"authorization" : `Bearer ${token}`} })
		// response = await API.post("http://localhost:3005/invreportpdf", data)
		return response;
	}
	else if (DealType == "Palisades") {
		response = await API.post(process.env.react_app_base_url + 'backendapipalisades/invreportpdf', data,{ headers: {"authorization" : `Bearer ${token}`} })
		// response = await API.post("http://localhost:3005/invreportpdf", data)
		return response;
	}
	else if (DealType == "Saluda RTL2") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludartl2/invreportpdf', data,{ headers: {"authorization" : `Bearer ${token}`} })
		// response = await API.post("http://localhost:3005/invreportpdf", data)
		return response;
	}
	else if (DealType == "Saluda PRE1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludapre/invreportpdf', data,{ headers: {"authorization" : `Bearer ${token}`} })
		// response = await API.post("http://localhost:3005/invreportpdf", data)
		return response;
	}
	else if (DealType == "MFA") {
		response = await API.post(process.env.react_app_base_url + 'backendapimfa/invreportpdf', data,{ headers: {"authorization" : `Bearer ${token}`} })
		// response = await API.post("http://localhost:3005/invreportpdf", data)
		return response;
	}
	else if (DealType == "Setpoint") {
		response = await API.post(process.env.react_app_base_url + 'backendapisetpoint/invreportpdf', data,{ headers: {"authorization" : `Bearer ${token}`} })
		// response = await API.post("http://localhost:3005/invreportpdf", data)
		return response;
	}
	else if (DealType == "Saluda BC2") {
		response = await API.post(process.env.react_app_base_url + 'backendapibc2/invreportpdf', data,{ headers: {"authorization" : `Bearer ${token}`} })
		// response = await API.post("http://localhost:3005/invreportpdf", data)
		return response;
	}
	else if (DealType == "Saluda Builders") {
		response = await API.post(process.env.react_app_base_url + 'backendapibuilders/invreportpdf', data,{ headers: {"authorization" : `Bearer ${token}`} })
		// response = await API.post("http://localhost:3005/invreportpdf", data)
		return response;
	}
	else if (DealType == "NPL") {
		response = await API.post(process.env.react_app_base_url + 'backendapinpl/invreportpdf', data,{ headers: {"authorization" : `Bearer ${token}`} })
		// response = await API.post("http://localhost:3005/invreportpdf", data)
		return response;
	}
	else if (DealType == "Stoa 2022") {
		response = await API.post(process.env.react_app_base_url + 'backendapistoa2022/invreportpdf', data,{ headers: {"authorization" : `Bearer ${token}`} })
		// response = await API.post("http://localhost:3005/invreportpdf", data)
		return response;
	}
	else if (DealType == "Unlock") {
		response = await API.post(process.env.react_app_base_url + 'backendapiunlock/invreportpdf', data,{ headers: {"authorization" : `Bearer ${token}`} })
		// response = await API.post("http://localhost:3005/invreportpdf", data)
		return response;
	}
};


export const GenerateLoanstratpdf = async (data, DealType) => {
	let response = null

	if (DealType == "LimaOne") {
		response = await API.post(process.env.react_app_base_url + 'backendapilima/loanstratpdf', data,{ headers: {"authorization" : `Bearer ${token}`} })
		// response = await API.post("http://localhost:3005/loanstratpdf", data)
		return response;
	} else if (DealType == "Bawag") {
		response = await API.post(process.env.react_app_base_url + 'backendapibawag/loanstratpdf', data,{ headers: {"authorization" : `Bearer ${token}`} })
		// response = await API.post("http://localhost:3005/loanstratpdf", data)

		return response;
	} else if (DealType == "Saluda PAC1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaluda/loanstratpdf', data,{ headers: {"authorization" : `Bearer ${token}`} })
		// response = await API.post("http://localhost:3005/loanstratpdf", data)

		return response;
	} else if (DealType == "Saluda FIG1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludagrade/loanstratpdf', data,{ headers: {"authorization" : `Bearer ${token}`} })
		// response = await API.post("http://localhost:3005/loanstratpdf", data)

		return response;
	} else if (DealType == "Saluda SEQ1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludagradeseq1/loanstratpdf', data,{ headers: {"authorization" : `Bearer ${token}`} })
		// response = await API.post("http://localhost:3005/loanstratpdf", data)

		return response;
	}
	else if (DealType == "AlphaFlow") {
		response = await API.post(process.env.react_app_base_url + 'backendapialphaflow/loanstratpdf', data,{ headers: {"authorization" : `Bearer ${token}`} })
		// response = await API.post("http://localhost:3005/loanstratpdf", data)

		return response;
	} else if (DealType == "Saluda FIG2") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludafig2/loanstratpdf', data,{ headers: {"authorization" : `Bearer ${token}`} })
		// response = await API.post("http://localhost:3005/loanstratpdf", data)

		return response;
	}
	else if (DealType == "Saluda BC1") {
		response = await API.post(process.env.react_app_base_url + 'backendapibc1/loanstratpdf', data,{ headers: {"authorization" : `Bearer ${token}`} })
		// response = await API.post("http://localhost:3005/loanstratpdf", data)

		return response;
	}
	else if (DealType == "Reigo") {
		response = await API.post(process.env.react_app_base_url + 'backendapireigo/loanstratpdf', data,{ headers: {"authorization" : `Bearer ${token}`} })
		// response = await API.post("http://localhost:3005/loanstratpdf", data)

		return response;
	}
	else if (DealType == "Dominion") {
		response = await API.post(process.env.react_app_base_url + 'backendapidominion/loanstratpdf', data,{ headers: {"authorization" : `Bearer ${token}`} })
		// response = await API.post("http://localhost:3005/loanstratpdf", data)

		return response;
	}
	else if (DealType == "Saluda WL1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludawl1/loanstratpdf', data,{ headers: {"authorization" : `Bearer ${token}`} })
		// response = await API.post("http://localhost:3005/loanstratpdf", data)

		return response;
	}
	else if (DealType == "Spruce Hill") {
		response = await API.post(process.env.react_app_base_url + 'backendapisprucehill/loanstratpdf', data,{ headers: {"authorization" : `Bearer ${token}`} })
		// response = await API.post("http://localhost:3005/loanstratpdf", data)

		return response;
	}
	else if (DealType == "Saluda RTL1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludartl1/loanstratpdf', data,{ headers: {"authorization" : `Bearer ${token}`} })
		// response = await API.post("http://localhost:3005/loanstratpdf", data)

		return response;
	}
	else if (DealType == "Stoa 2021") {
		response = await API.post(process.env.react_app_base_url + 'backendapistoa/loanstratpdf', data,{ headers: {"authorization" : `Bearer ${token}`} })
		// response = await API.post("http://localhost:3005/loanstratpdf", data)

		return response;
	}
	else if (DealType == "Tildene") {
		response = await API.post(process.env.react_app_base_url + 'backendapitildene/loanstratpdf', data,{ headers: {"authorization" : `Bearer ${token}`} })
		// response = await API.post("http://localhost:3005/loanstratpdf", data)

		return response;
	}
	else if (DealType == "Saluda MF1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludamf1/loanstratpdf', data,{ headers: {"authorization" : `Bearer ${token}`} })
		// response = await API.post("http://localhost:3005/loanstratpdf", data)

		return response;
	}
	else if (DealType == "Palisades") {
		response = await API.post(process.env.react_app_base_url + 'backendapipalisades/loanstratpdf', data,{ headers: {"authorization" : `Bearer ${token}`} })
		// response = await API.post("http://localhost:3005/loanstratpdf", data)

		return response;
	}
	else if (DealType == "Saluda RTL2") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludartl2/loanstratpdf', data,{ headers: {"authorization" : `Bearer ${token}`} })
		// response = await API.post("http://localhost:3005/loanstratpdf", data)

		return response;
	}
	else if (DealType == "Saluda PRE1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludapre/loanstratpdf', data,{ headers: {"authorization" : `Bearer ${token}`} })
		// response = await API.post("http://localhost:3005/loanstratpdf", data)

		return response;
	}
	else if (DealType == "MFA") {
		response = await API.post(process.env.react_app_base_url + 'backendapimfa/loanstratpdf', data,{ headers: {"authorization" : `Bearer ${token}`} })
		// response = await API.post("http://localhost:3005/loanstratpdf", data)

		return response;
	}
	else if (DealType == "Setpoint") {
		response = await API.post(process.env.react_app_base_url + 'backendapisetpoint/loanstratpdf', data,{ headers: {"authorization" : `Bearer ${token}`} })
		// response = await API.post("http://localhost:3005/loanstratpdf", data)

		return response;
	}
	else if (DealType == "Saluda BC2") {
		response = await API.post(process.env.react_app_base_url + 'backendapibc2/loanstratpdf', data,{ headers: {"authorization" : `Bearer ${token}`} })
		// response = await API.post("http://localhost:3005/loanstratpdf", data)

		return response;
	}
	else if (DealType == "Saluda Builders") {
		response = await API.post(process.env.react_app_base_url + 'backendapibuilders/loanstratpdf', data,{ headers: {"authorization" : `Bearer ${token}`} })
		// response = await API.post("http://localhost:3005/invreportpdf", data)
		return response;
	}
	else if (DealType == "NPL") {
		response = await API.post(process.env.react_app_base_url + 'backendapinpl/loanstratpdf', data,{ headers: {"authorization" : `Bearer ${token}`} })
		// response = await API.post("http://localhost:3005/invreportpdf", data)
		return response;
	}
	else if (DealType == "Stoa 2022") {
		response = await API.post(process.env.react_app_base_url + 'backendapistoa2022/loanstratpdf', data,{ headers: {"authorization" : `Bearer ${token}`} })
		// response = await API.post("http://localhost:3005/invreportpdf", data)
		return response;
	}
	else if (DealType == "Unlock") {
		response = await API.post(process.env.react_app_base_url + 'backendapiunlock/loanstratpdf', data,{ headers: {"authorization" : `Bearer ${token}`} })
		// response = await API.post("http://localhost:3005/invreportpdf", data)
		return response;
	}
};


export const GenerateReport = async (data, DealType) => {
	let response = null

	if (DealType == "LimaOne") {
		response = await API.post(process.env.react_app_base_url + 'backendapilima/api/v1/trustee/chaincodeLima', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Bawag") {
		response = await API.post(process.env.react_app_base_url + 'backendapibawag/api/v1/trustee/chaincodeBawag', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda PAC1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaluda/api/v1/trustee/chaincodeSaluda', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda FIG1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludagrade/api/v1/trustee/chaincodeSaludagrade', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda SEQ1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludagradeseq1/api/v1/trustee/chaincodeSaludaseq', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "AlphaFlow") {
		response = await API.post(process.env.react_app_base_url + 'backendapialphaflow/api/v1/trustee/chaincodealphaflow', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda FIG2") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludafig2/api/v1/trustee/chaincodeFig2', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda BC1") {
		response = await API.post(process.env.react_app_base_url + 'backendapibc1/api/v1/trustee/chaincodeBC1', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Reigo") {
		response = await API.post(process.env.react_app_base_url + 'backendapireigo/api/v1/trustee/chaincodeReigo', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Dominion") {
		response = await API.post(process.env.react_app_base_url + 'backendapidominion/api/v1/trustee/chaincodeDominion', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda WL1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludawl1/api/v1/trustee/chaincodeWL1', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Spruce Hill") {
		response = await API.post(process.env.react_app_base_url + 'backendapisprucehill/api/v1/trustee/chaincodeSprucehill', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda RTL1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludartl1/api/v1/trustee/chaincodeSaludartl1', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Stoa 2021") {
		response = await API.post(process.env.react_app_base_url + 'backendapistoa/api/v1/trustee/chaincodeStoa', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Tildene") {
		response = await API.post(process.env.react_app_base_url + 'backendapitildene/api/v1/trustee/chaincodeTildene', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda MF1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludamf1/api/v1/trustee/chaincodeMF1', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Palisades") {
		response = await API.post(process.env.react_app_base_url + 'backendapipalisades/api/v1/trustee/chaincodePalisades', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda RTL2") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludartl2/api/v1/trustee/chaincodeSaludartl2', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda PRE1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludapre/api/v1/trustee/chaincodeSaludapre', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "MFA") {
		response = await API.post(process.env.react_app_base_url + 'backendapimfa/api/v1/trustee/chaincodeMfa', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Setpoint") {
		response = await API.post(process.env.react_app_base_url + 'backendapisetpoint/api/v1/trustee/chaincodeSetpoint', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda BC2") {
		response = await API.post(process.env.react_app_base_url + 'backendapibc2/api/v1/trustee/chaincodeBC2', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda Builders") {
		response = await API.post(process.env.react_app_base_url + 'backendapibuilders/api/v1/trustee/chaincodeBuilders', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "NPL") {
		response = await API.post(process.env.react_app_base_url + 'backendapinpl/api/v1/trustee/chaincodeNPL', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Stoa 2022") {
		response = await API.post(process.env.react_app_base_url + 'backendapistoa2022/api/v1/trustee/chaincodeStoa2022', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Unlock") {
		response = await API.post(process.env.react_app_base_url + 'backendapiunlock/api/v1/trustee/chaincodeUnlock', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
};


// api/v1/trustee/publishSaludagrade

export const PublishReport = async (data, DealType) => {
	let response = null

	if (DealType == "LimaOne") {
		response = await API.post(process.env.react_app_base_url + 'backendapilima/api/v1/trustee/publishLima', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Bawag") {
		response = await API.post(process.env.react_app_base_url + 'backendapibawag/api/v1/trustee/publishBawag', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda PAC1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaluda/api/v1/trustee/publishSaluda', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda FIG1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludagrade/api/v1/trustee/publishSaludagrade', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda SEQ1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludagradeseq1/api/v1/trustee/publishSaludaseq', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "AlphaFlow") {
		response = await API.post(process.env.react_app_base_url + 'backendapialphaflow/api/v1/trustee/publishalphaflow', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda FIG2") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludafig2/api/v1/trustee/publishFig2', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda BC1") {
		response = await API.post(process.env.react_app_base_url + 'backendapibc1/api/v1/trustee/publishBC1', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}

	else if (DealType == "Reigo") {
		response = await API.post(process.env.react_app_base_url + 'backendapireigo/api/v1/trustee/publishReigo', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Dominion") {
		response = await API.post(process.env.react_app_base_url + 'backendapidominion/api/v1/trustee/publishDominion', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda WL1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludawl1/api/v1/trustee/publishWL1', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Spruce Hill") {
		response = await API.post(process.env.react_app_base_url + 'backendapisprucehill/api/v1/trustee/publishSprucehill', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda RTL1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludartl1/api/v1/trustee/publishSaludartl1', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Stoa 2021") {
		response = await API.post(process.env.react_app_base_url + 'backendapistoa/api/v1/trustee/publishStoa', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Tildene") {
		response = await API.post(process.env.react_app_base_url + 'backendapitildene/api/v1/trustee/publishTildene', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda MF1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludamf1/api/v1/trustee/publishMF1', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Palisades") {
		response = await API.post(process.env.react_app_base_url + 'backendapipalisades/api/v1/trustee/publishPalisades', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda RTL2") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludartl2/api/v1/trustee/publishSaludartl2', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda PRE1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludapre/api/v1/trustee/publishSaludapre', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "MFA") {
		response = await API.post(process.env.react_app_base_url + 'backendapimfa/api/v1/trustee/publishMfa', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Setpoint") {
		response = await API.post(process.env.react_app_base_url + 'backendapisetpoint/api/v1/trustee/publishSetpoint', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda BC2") {
		response = await API.post(process.env.react_app_base_url + 'backendapibc2/api/v1/trustee/publishBC2', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda Builders") {
		response = await API.post(process.env.react_app_base_url + 'backendapibuilders/api/v1/trustee/publishBuilders', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "NPL") {
		response = await API.post(process.env.react_app_base_url + 'backendapinpl/api/v1/trustee/publishNPL', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Stoa 2022") {
		response = await API.post(process.env.react_app_base_url + 'backendapistoa2022/api/v1/trustee/publishStoa2022', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Unlock") {
		response = await API.post(process.env.react_app_base_url + 'backendapiunlock/api/v1/trustee/publishUnlock', data,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
};
//excel report
export const ExcelExport = async (data, DealType) => {
	let response = null

	if (DealType == "LimaOne") {
		response = await API.post(process.env.react_app_base_url + 'backendapilima/api/v1/trustee/ExportExcel', data,{ headers: {"authorization" : `Bearer ${token}`}, responseType: 'arraybuffer' })
		return response;
	} else if (DealType == "Bawag") {
		response = await API.post(process.env.react_app_base_url + 'backendapibawag/api/v1/trustee/ExportExcel', data,{ headers: {"authorization" : `Bearer ${token}`}, responseType: 'arraybuffer' })
		return response;
	} else if (DealType == "Saluda PAC1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaluda/api/v1/trustee/ExportExcel', data,{ headers: {"authorization" : `Bearer ${token}`}, responseType: 'arraybuffer' })
		return response;
	} else if (DealType == "Saluda FIG1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludagrade/api/v1/trustee/ExportExcel', data,{ headers: {"authorization" : `Bearer ${token}`}, responseType: 'arraybuffer' })
		return response;
	} else if (DealType == "Saluda SEQ1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludagradeseq1/api/v1/trustee/ExportExcel', data,{ headers: {"authorization" : `Bearer ${token}`}, responseType: 'arraybuffer' })
		return response;
	}
	else if (DealType == "AlphaFlow") {
		response = await API.post(process.env.react_app_base_url + 'backendapialphaflow/api/v1/trustee/ExportExcel', data,{ headers: {"authorization" : `Bearer ${token}`}, responseType: 'arraybuffer' })
		return response;
	} else if (DealType == "Saluda FIG2") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludafig2/api/v1/trustee/ExportExcel', data,{ headers: {"authorization" : `Bearer ${token}`}, responseType: 'arraybuffer' })
		return response;
	}
	else if (DealType == "Saluda BC1") {
		response = await API.post(process.env.react_app_base_url + 'backendapibc1/api/v1/trustee/ExportExcel', data,{ headers: {"authorization" : `Bearer ${token}`}, responseType: 'arraybuffer' })
		return response;
	}

	else if (DealType == "Reigo") {
		response = await API.post(process.env.react_app_base_url + 'backendapireigo/api/v1/trustee/ExportExcel', data,{ headers: {"authorization" : `Bearer ${token}`}, responseType: 'arraybuffer' })
		return response;
	}
	else if (DealType == "Dominion") {
		response = await API.post(process.env.react_app_base_url + 'backendapidominion/api/v1/trustee/ExportExcel', data,{ headers: {"authorization" : `Bearer ${token}`}, responseType: 'arraybuffer' })
		return response;
	}
	else if (DealType == "Saluda WL1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludawl1/api/v1/trustee/ExportExcel', data,{ headers: {"authorization" : `Bearer ${token}`}, responseType: 'arraybuffer' })
		return response;
	}
	else if (DealType == "Spruce Hill") {
		response = await API.post(process.env.react_app_base_url + 'backendapisprucehill/api/v1/trustee/ExportExcel', data,{ headers: {"authorization" : `Bearer ${token}`}, responseType: 'arraybuffer' })
		return response;
	}
	else if (DealType == "Saluda RTL1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludartl1/api/v1/trustee/ExportExcel', data,{ headers: {"authorization" : `Bearer ${token}`}, responseType: 'arraybuffer' })
		return response;
	}
	else if (DealType == "Stoa 2021") {
		response = await API.post(process.env.react_app_base_url + 'backendapistoa/api/v1/trustee/ExportExcel', data,{ headers: {"authorization" : `Bearer ${token}`}, responseType: 'arraybuffer' })
		return response;
	}
	else if (DealType == "Tildene") {
		response = await API.post(process.env.react_app_base_url + 'backendapitildene/api/v1/trustee/ExportExcel', data,{ headers: {"authorization" : `Bearer ${token}`}, responseType: 'arraybuffer' })
		return response;
	}
	else if (DealType == "Saluda MF1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludamf1/api/v1/trustee/ExportExcel', data,{ headers: {"authorization" : `Bearer ${token}`}, responseType: 'arraybuffer' })
		return response;
	}
	else if (DealType == "Palisades") {
		response = await API.post(process.env.react_app_base_url + 'backendapipalisades/api/v1/trustee/ExportExcel', data,{ headers: {"authorization" : `Bearer ${token}`}, responseType: 'arraybuffer' })
		return response;
	}
	else if (DealType == "Saluda RTL2") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludartl2/api/v1/trustee/ExportExcel', data,{ headers: {"authorization" : `Bearer ${token}`}, responseType: 'arraybuffer' })
		return response;
	}
	else if (DealType == "Saluda PRE1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludapre/api/v1/trustee/ExportExcel', data,{ headers: {"authorization" : `Bearer ${token}`}, responseType: 'arraybuffer' })
		return response;
	}
	else if (DealType == "MFA") {
		response = await API.post(process.env.react_app_base_url + 'backendapimfa/api/v1/trustee/ExportExcel', data,{ headers: {"authorization" : `Bearer ${token}`}, responseType: 'arraybuffer' })
		return response;
	}
	else if (DealType == "Setpoint") {
		response = await API.post(process.env.react_app_base_url + 'backendapisetpoint/api/v1/trustee/ExportExcel', data,{ headers: {"authorization" : `Bearer ${token}`}, responseType: 'arraybuffer' })
		return response;
	}
	else if (DealType == "Saluda BC2") {
		response = await API.post(process.env.react_app_base_url + 'backendapibc2/api/v1/trustee/ExportExcel', data,{ headers: {"authorization" : `Bearer ${token}`}, responseType: 'arraybuffer' })
		return response;
	}
	else if (DealType == "Saluda Builders") {
		response = await API.post(process.env.react_app_base_url + 'backendapibuilders/api/v1/trustee/ExportExcel', data,{ headers: {"authorization" : `Bearer ${token}`}, responseType: 'arraybuffer' })
		return response;
	}
	else if (DealType == "NPL") {
		response = await API.post(process.env.react_app_base_url + 'backendapinpl/api/v1/trustee/ExportExcel', data,{ headers: {"authorization" : `Bearer ${token}`}, responseType: 'arraybuffer' })
		return response;
	}
	else if (DealType == "Stoa 2022") {
		response = await API.post(process.env.react_app_base_url + 'backendapistoa2022/api/v1/trustee/ExportExcel', data,{ headers: {"authorization" : `Bearer ${token}`}, responseType: 'arraybuffer' })
		return response;
	}
	else if (DealType == "Unlock") {
		response = await API.post(process.env.react_app_base_url + 'backendapiunlock/api/v1/trustee/ExportExcel', data,{ headers: {"authorization" : `Bearer ${token}`}, responseType: 'arraybuffer' })
		return response;
	}
};


export const InvestorVersion = async (DealType, dealId, month, year, groupby, OrgName) => {
	let response = null

	if (DealType == "LimaOne") {
		response = await API.get(process.env.react_app_base_url + 'backendapilima/api/v1/trustee/invreporthistoryLima?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Bawag") {
		response = await API.get(process.env.react_app_base_url + 'backendapibawag/api/v1/trustee/invreporthistoryBawag?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda PAC1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaluda/api/v1/trustee/invreporthistorySaluda?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda FIG1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludagrade/api/v1/trustee/invreporthistorySaludagrade?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda SEQ1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludagradeseq1/api/v1/trustee/invreporthistorySaludaseq?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "AlphaFlow") {
		response = await API.get(process.env.react_app_base_url + 'backendapialphaflow/api/v1/trustee/invreporthistoryalphaflow?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda FIG2") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludafig2/api/v1/trustee/invreporthistorySaludaFig2?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda BC1") {
		response = await API.get(process.env.react_app_base_url + 'backendapibc1/api/v1/trustee/invreporthistoryBC1?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Reigo") {
		response = await API.get(process.env.react_app_base_url + 'backendapireigo/api/v1/trustee/invreporthistoryReigo?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Dominion") {
		response = await API.get(process.env.react_app_base_url + 'backendapidominion/api/v1/trustee/invreporthistoryDominion?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda WL1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludawl1/api/v1/trustee/invreporthistoryWL1?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Spruce Hill") {
		response = await API.get(process.env.react_app_base_url + 'backendapisprucehill/api/v1/trustee/invreporthistorySprucehill?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda RTL1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludartl1/api/v1/trustee/invreporthistorySaludartl1?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Stoa 2021") {
		response = await API.get(process.env.react_app_base_url + 'backendapistoa/api/v1/trustee/invreporthistoryStoa?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Tildene") {
		response = await API.get(process.env.react_app_base_url + 'backendapitildene/api/v1/trustee/invreporthistoryTildene?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda MF1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludamf1/api/v1/trustee/invreporthistoryMF1?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Palisades") {
		response = await API.get(process.env.react_app_base_url + 'backendapipalisades/api/v1/trustee/invreporthistoryPalisades?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda RTL2") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludartl2/api/v1/trustee/invreporthistorySaludartl2?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda PRE1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludapre/api/v1/trustee/invreporthistorySaludapre?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "MFA") {
		response = await API.get(process.env.react_app_base_url + 'backendapimfa/api/v1/trustee/invreporthistoryMfa?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Setpoint") {
		response = await API.get(process.env.react_app_base_url + 'backendapisetpoint/api/v1/trustee/invreporthistorySetpoint?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda BC2") {
		response = await API.get(process.env.react_app_base_url + 'backendapibc2/api/v1/trustee/invreporthistoryBC2?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda Builders") {
		response = await API.get(process.env.react_app_base_url + 'backendapibuilders/api/v1/trustee/invreporthistoryBuilders?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "NPL") {
		response = await API.get(process.env.react_app_base_url + 'backendapinpl/api/v1/trustee/invreporthistoryNPL?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Stoa 2022") {
		response = await API.get(process.env.react_app_base_url + 'backendapistoa2022/api/v1/trustee/invreporthistoryStoa2022?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Unlock") {
		response = await API.get(process.env.react_app_base_url + 'backendapiunlock/api/v1/trustee/invreporthistoryUnlock?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
};

export const InvestorReportStatus = async (DealType, dealId, month, year, version, data) => {
	let response = null

	if (DealType == "LimaOne") {
		response = await API.get(process.env.react_app_base_url + 'backendapilima/api/v1/trustee/reportstatusLima?DealID=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&data=' + data + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Bawag") {
		response = await API.get(process.env.react_app_base_url + 'backendapibawag/api/v1/trustee/reportstatusBawag?DealID=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&data=' + data + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda PAC1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaluda/api/v1/trustee/reportstatusSaluda?DealID=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&data=' + data + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda FIG1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludagrade/api/v1/trustee/reportstatusSaludagrade?DealID=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&data=' + data + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda SEQ1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludagradeseq1/api/v1/trustee/reportstatusSaludaseq?DealID=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&data=' + data + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "AlphaFlow") {
		response = await API.get(process.env.react_app_base_url + 'backendapialphaflow/api/v1/trustee/reportstatusalphaflow?DealID=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&data=' + data + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda FIG2") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludafig2/api/v1/trustee/reportstatusFig2?DealID=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&data=' + data + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda BC1") {
		response = await API.get(process.env.react_app_base_url + 'backendapibc1/api/v1/trustee/reportstatusBC1?DealID=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&data=' + data + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Reigo") {
		response = await API.get(process.env.react_app_base_url + 'backendapireigo/api/v1/trustee/reportstatusReigo?DealID=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&data=' + data + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Dominion") {
		response = await API.get(process.env.react_app_base_url + 'backendapidominion/api/v1/trustee/reportstatusDominion?DealID=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&data=' + data + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda WL1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludawl1/api/v1/trustee/reportstatusWL1?DealID=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&data=' + data + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Spruce Hill") {
		response = await API.get(process.env.react_app_base_url + 'backendapisprucehill/api/v1/trustee/reportstatusSprucehill?DealID=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&data=' + data + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda RTL1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludartl1/api/v1/trustee/reportstatusSaludartl1?DealID=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&data=' + data + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Stoa 2021") {
		response = await API.get(process.env.react_app_base_url + 'backendapistoa/api/v1/trustee/reportstatusStoa?DealID=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&data=' + data + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Tildene") {
		response = await API.get(process.env.react_app_base_url + 'backendapitildene/api/v1/trustee/reportstatusTildene?DealID=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&data=' + data + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda MF1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludamf1/api/v1/trustee/reportstatusMF1?DealID=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&data=' + data + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Palisades") {
		response = await API.get(process.env.react_app_base_url + 'backendapipalisades/api/v1/trustee/reportstatusPalisades?DealID=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&data=' + data + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda RTL2") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludartl2/api/v1/trustee/reportstatusSaludartl2?DealID=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&data=' + data + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda PRE1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludapre/api/v1/trustee/reportstatusSaludapre?DealID=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&data=' + data + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "MFA") {
		response = await API.get(process.env.react_app_base_url + 'backendapimfa/api/v1/trustee/reportstatusMfa?DealID=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&data=' + data + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Setpoint") {
		response = await API.get(process.env.react_app_base_url + 'backendapisetpoint/api/v1/trustee/reportstatusSetpoint?DealID=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&data=' + data + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda BC2") {
		response = await API.get(process.env.react_app_base_url + 'backendapibc2/api/v1/trustee/reportstatusBC2?DealID=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&data=' + data + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda Builders") {
		response = await API.get(process.env.react_app_base_url + 'backendapibuilders/api/v1/trustee/reportstatusBuilders?DealID=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&data=' + data + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "NPL") {
		response = await API.get(process.env.react_app_base_url + 'backendapinpl/api/v1/trustee/reportstatusNPL?DealID=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&data=' + data + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Stoa 2022") {
		response = await API.get(process.env.react_app_base_url + 'backendapistoa2022/api/v1/trustee/reportstatusStoa2022?DealID=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&data=' + data + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Unlock") {
		response = await API.get(process.env.react_app_base_url + 'backendapiunlock/api/v1/trustee/reportstatusUnlock?DealID=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&data=' + data + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
};





export const ViewInvestorReport = async (DealType, dealId, month, year, version, role, userid) => {
	let response = null

	if (DealType == "LimaOne") {
		response = await API.get(process.env.react_app_base_url + 'backendapilima/api/v1/trustee/viewinvestorreportLima?dealId=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Bawag") {
		response = await API.get(process.env.react_app_base_url + 'backendapibawag/api/v1/trustee/viewinvestorreportBawag?dealId=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda PAC1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaluda/api/v1/trustee/viewinvestorreportSaluda?dealId=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda FIG1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludagrade/api/v1/trustee/viewinvestorreportSaludagrade?dealId=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda SEQ1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludagradeseq1/api/v1/trustee/viewinvestorreportSaludaseq?dealId=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "AlphaFlow") {
		response = await API.get(process.env.react_app_base_url + 'backendapialphaflow/api/v1/trustee/viewinvestorreportalphaflow?dealId=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda FIG2") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludafig2/api/v1/trustee/viewinvestorreportSaludaFig2?dealId=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda BC1") {
		response = await API.get(process.env.react_app_base_url + 'backendapibc1/api/v1/trustee/viewinvestorreportBC1?dealId=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Reigo") {
		response = await API.get(process.env.react_app_base_url + 'backendapireigo/api/v1/trustee/viewinvestorreportReigo?dealId=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Dominion") {
		response = await API.get(process.env.react_app_base_url + 'backendapidominion/api/v1/trustee/viewinvestorreportDominion?dealId=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda WL1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludawl1/api/v1/trustee/viewinvestorreportWL1?dealId=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Spruce Hill") {
		response = await API.get(process.env.react_app_base_url + 'backendapisprucehill/api/v1/trustee/viewinvestorreportSprucehill?dealId=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda RTL1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludartl1/api/v1/trustee/viewinvestorreportSaludartl1?dealId=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Stoa 2021") {
		response = await API.get(process.env.react_app_base_url + 'backendapistoa/api/v1/trustee/viewinvestorreportStoa?dealId=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Tildene") {
		response = await API.get(process.env.react_app_base_url + 'backendapitildene/api/v1/trustee/viewinvestorreportTildene?dealId=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda MF1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludamf1/api/v1/trustee/viewinvestorreportMF1?dealId=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Palisades") {
		response = await API.get(process.env.react_app_base_url + 'backendapipalisades/api/v1/trustee/viewinvestorreportPalisades?dealId=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda RTL2") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludartl2/api/v1/trustee/viewinvestorreportSaludartl2?dealId=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda PRE1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludapre/api/v1/trustee/viewinvestorreportSaludapre?dealId=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "MFA") {
		response = await API.get(process.env.react_app_base_url + 'backendapimfa/api/v1/trustee/viewinvestorreportMfa?dealId=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Setpoint") {
		response = await API.get(process.env.react_app_base_url + 'backendapisetpoint/api/v1/trustee/viewinvestorreportSetpoint?dealId=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda BC2") {
		response = await API.get(process.env.react_app_base_url + 'backendapibc2/api/v1/trustee/viewinvestorreportBC2?dealId=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda Builders") {
		response = await API.get(process.env.react_app_base_url + 'backendapibuilders/api/v1/trustee/viewinvestorreportBuilders?dealId=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "NPL") {
		response = await API.get(process.env.react_app_base_url + 'backendapinpl/api/v1/trustee/viewinvestorreportNPL?dealId=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Stoa 2022") {
		response = await API.get(process.env.react_app_base_url + 'backendapistoa2022/api/v1/trustee/viewinvestorreportStoa2022?dealId=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Unlock") {
		response = await API.get(process.env.react_app_base_url + 'backendapiunlock/api/v1/trustee/viewinvestorreportUnlock?dealId=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
};


export const invreporthistoryLima = async (DealType, dealId, month, year, version, role, userid) => {
	let response = null

	if (DealType == "LimaOne") {
		response = await API.get(process.env.react_app_base_url + 'backendapilima/api/v1/trustee/invreporthistoryLima?dealId=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Bawag") {
		response = await API.get(process.env.react_app_base_url + 'backendapibawag/api/v1/trustee/invreporthistoryBawag?dealId=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda PAC1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaluda/api/v1/trustee/invreporthistorySaluda?dealId=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda FIG1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludagrade/api/v1/trustee/invreporthistorySaludagrade?dealId=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda SEQ1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludagradeseq1/api/v1/trustee/invreporthistorySaludaseq?dealId=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "AlphaFlow") {
		response = await API.get(process.env.react_app_base_url + 'backendapialphaflow/api/v1/trustee/invreporthistoryalphaflow?dealId=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda FIG2") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludafig2/api/v1/trustee/invreporthistoryFig2?dealId=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda BC1") {
		response = await API.get(process.env.react_app_base_url + 'backendapibc1/api/v1/trustee/invreporthistoryBC1?dealId=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}

	else if (DealType == "Reigo") {
		response = await API.get(process.env.react_app_base_url + 'backendapireigo/api/v1/trustee/invreporthistoryReigo?dealId=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Dominion") {
		response = await API.get(process.env.react_app_base_url + 'backendapidominion/api/v1/trustee/invreporthistoryDominion?dealId=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda WL1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludawl1/api/v1/trustee/invreporthistoryWL1?dealId=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Spruce Hill") {
		response = await API.get(process.env.react_app_base_url + 'backendapisprucehill/api/v1/trustee/invreporthistorySprucehill?dealId=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda RTL1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludartl1/api/v1/trustee/invreporthistorySaludartl1?dealId=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Stoa 2021") {
		response = await API.get(process.env.react_app_base_url + 'backendapistoa/api/v1/trustee/invreporthistoryStoa?dealId=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Tildene") {
		response = await API.get(process.env.react_app_base_url + 'backendapitildene/api/v1/trustee/invreporthistoryTildene?dealId=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda MF1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludamf1/api/v1/trustee/invreporthistoryMF1?dealId=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Palisades") {
		response = await API.get(process.env.react_app_base_url + 'backendapipalisades/api/v1/trustee/invreporthistoryPalisades?dealId=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda RTL2") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludartl2/api/v1/trustee/invreporthistorySaludartl2?dealId=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda PRE1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludapre/api/v1/trustee/invreporthistorySaludapre?dealId=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "MFA") {
		response = await API.get(process.env.react_app_base_url + 'backendapimfa/api/v1/trustee/invreporthistoryMfa?dealId=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Setpoint") {
		response = await API.get(process.env.react_app_base_url + 'backendapisetpoint/api/v1/trustee/invreporthistorySetpoint?dealId=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda BC2") {
		response = await API.get(process.env.react_app_base_url + 'backendapibc2/api/v1/trustee/invreporthistoryBC2?dealId=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda Builders") {
		response = await API.get(process.env.react_app_base_url + 'backendapibuilders/api/v1/trustee/invreporthistoryBuilders?dealId=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "NPL") {
		response = await API.get(process.env.react_app_base_url + 'backendapinpl/api/v1/trustee/invreporthistoryNPL?dealId=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Stoa 2022") {
		response = await API.get(process.env.react_app_base_url + 'backendapistoa2022/api/v1/trustee/invreporthistoryStoa2022?dealId=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Unlock") {
		response = await API.get(process.env.react_app_base_url + 'backendapiunlock/api/v1/trustee/invreporthistoryUnlock?dealId=' + dealId + '&month=' + month + '&year=' + year + '&version=' + version + '&peer=' + LimaPeer + '&role=' + role + '&userid=' + userid,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
};

export const checklist = async (DealType, data) => {
	let response = null
	if (DealType == "LimaOne") {
		response = await API.post(process.env.react_app_base_url + 'backendapilima/api/v1/trustee/checklistLima', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Bawag") {
		response = await API.post(process.env.react_app_base_url + 'backendapibawag/api/v1/trustee/checklistLima', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda PAC1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaluda/api/v1/trustee/checklistSaluda', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda FIG1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludagrade/api/v1/trustee/checklistLima', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda SEQ1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludagradeseq1/api/v1/trustee/checklistLima', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "AlphaFlow") {
		response = await API.post(process.env.react_app_base_url + 'backendapialphaflow/api/v1/trustee/checklistLima', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda FIG2") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludafig2/api/v1/trustee/checklistLima', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda BC1") {
		response = await API.post(process.env.react_app_base_url + 'backendapibc1/api/v1/trustee/checklistLima', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Reigo") {
		response = await API.post(process.env.react_app_base_url + 'backendapireigo/api/v1/trustee/checklistLima', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Dominion") {
		response = await API.post(process.env.react_app_base_url + 'backendapidominion/api/v1/trustee/checklistLima', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda WL1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludawl1/api/v1/trustee/checklistLima', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Spruce Hill") {
		response = await API.post(process.env.react_app_base_url + 'backendapisprucehill/api/v1/trustee/checklistLima', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda RTL1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludartl1/api/v1/trustee/checklistLima', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Stoa 2021") {
		response = await API.post(process.env.react_app_base_url + 'backendapistoa/api/v1/trustee/checklistLima', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Tildene") {
		response = await API.post(process.env.react_app_base_url + 'backendapitildene/api/v1/trustee/checklistLima', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda MF1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludamf1/api/v1/trustee/checklistLima', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Palisades") {
		response = await API.post(process.env.react_app_base_url + 'backendapipalisades/api/v1/trustee/checklistLima', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda RTL2") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludartl2/api/v1/trustee/checklistLima', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda PRE1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludapre/api/v1/trustee/checklistLima', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "MFA") {
		response = await API.post(process.env.react_app_base_url + 'backendapimfa/api/v1/trustee/checklistLima', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Setpoint") {
		response = await API.post(process.env.react_app_base_url + 'backendapisetpoint/api/v1/trustee/checklistLima', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda BC2") {
		response = await API.post(process.env.react_app_base_url + 'backendapibc2/api/v1/trustee/checklistLima', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda Builders") {
		response = await API.post(process.env.react_app_base_url + 'backendapibuilders/api/v1/trustee/checklistBuilders', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "NPL") {
		response = await API.post(process.env.react_app_base_url + 'backendapinpl/api/v1/trustee/checklistNPL', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Stoa 2022") {
		response = await API.post(process.env.react_app_base_url + 'backendapistoa2022/api/v1/trustee/checkliststoa2022', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Unlock") {
		response = await API.post(process.env.react_app_base_url + 'backendapiunlock/api/v1/trustee/checklistunlock', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
};

export const savedefinition = async (DealType, data) => {
	let response = null
	if (DealType == "LimaOne") {
		response = await API.post(process.env.react_app_base_url + 'backendapilima/api/v1/trustee/savedefinitionLima', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Bawag") {
		response = await API.post(process.env.react_app_base_url + 'backendapibawag/api/v1/trustee/savedefinitionLima', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda PAC1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaluda/api/v1/trustee/savedefinitionSaluda', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda FIG1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludagrade/api/v1/trustee/savedefinitionSaludagrade', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda SEQ1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludagradeseq1/api/v1/trustee/savedefinitionSaludaseq', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "AlphaFlow") {
		response = await API.post(process.env.react_app_base_url + 'backendapialphaflow/api/v1/trustee/savedefinitionLima', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda FIG2") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludafig2/api/v1/trustee/savedefinitionLima', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda BC1") {
		response = await API.post(process.env.react_app_base_url + 'backendapibc1/api/v1/trustee/savedefinitionBC1', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Reigo") {
		response = await API.post(process.env.react_app_base_url + 'backendapireigo/api/v1/trustee/savedefinitionReigo', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Dominion") {
		response = await API.post(process.env.react_app_base_url + 'backendapidominion/api/v1/trustee/savedefinitionDominion', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda WL1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludawl1/api/v1/trustee/savedefinitionWL1', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Spruce Hill") {
		response = await API.post(process.env.react_app_base_url + 'backendapisprucehill/api/v1/trustee/savedefinitionSprucehill', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda RTL1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludartl1/api/v1/trustee/savedefinitionSaludartl1', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Stoa 2021") {
		response = await API.post(process.env.react_app_base_url + 'backendapistoa/api/v1/trustee/savedefinitionStoa', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Tildene") {
		response = await API.post(process.env.react_app_base_url + 'backendapitildene/api/v1/trustee/savedefinitionTildene', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda MF1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludamf1/api/v1/trustee/savedefinitionMF1', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Palisades") {
		response = await API.post(process.env.react_app_base_url + 'backendapipalisades/api/v1/trustee/savedefinitionPalisades', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda RTL2") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludartl2/api/v1/trustee/savedefinitionSaludartl2', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda PRE1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludapre/api/v1/trustee/savedefinitionSaludapre', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "MFA") {
		response = await API.post(process.env.react_app_base_url + 'backendapimfa/api/v1/trustee/savedefinitionMfa', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Setpoint") {
		response = await API.post(process.env.react_app_base_url + 'backendapisetpoint/api/v1/trustee/savedefinitionSetpoint', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda BC2") {
		response = await API.post(process.env.react_app_base_url + 'backendapibc2/api/v1/trustee/savedefinitionBC2', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda Builders") {
		response = await API.post(process.env.react_app_base_url + 'backendapibuilders/api/v1/trustee/savedefinitionBuilders', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "NPL") {
		response = await API.post(process.env.react_app_base_url + 'backendapinpl/api/v1/trustee/savedefinitionNPL', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Stoa 2022") {
		response = await API.post(process.env.react_app_base_url + 'backendapistoa2022/api/v1/trustee/savedefinitionStoa2022', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Unlock") {
		response = await API.post(process.env.react_app_base_url + 'backendapiunlock/api/v1/trustee/savedefinitionUnlock', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
};



export const restrictdefn = async (DealType, dealId, month, year, channelname) => {
	let response = null

	if (DealType == "LimaOne") {
		response = await API.get(process.env.react_app_base_url + 'backendapilima/api/v1/trustee/restrictdefnLima?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Bawag") {
		response = await API.get(process.env.react_app_base_url + 'backendapibawag/api/v1/trustee/restrictdefnLima?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda PAC1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaluda/api/v1/trustee/restrictdefnSaluda?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda FIG1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludagrade/api/v1/trustee/restrictdefnLima?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda SEQ1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludagradeseq1/api/v1/trustee/restrictdefnLima?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "AlphaFlow") {
		response = await API.get(process.env.react_app_base_url + 'backendapialphaflow/api/v1/trustee/restrictdefnLima?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda FIG2") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludafig2/api/v1/trustee/restrictdefnLima?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda BC1") {
		response = await API.get(process.env.react_app_base_url + 'backendapibc1/api/v1/trustee/restrictdefnLima?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Reigo") {
		response = await API.get(process.env.react_app_base_url + 'backendapireigo/api/v1/trustee/restrictdefnLima?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Dominion") {
		response = await API.get(process.env.react_app_base_url + 'backendapidominion/api/v1/trustee/restrictdefnLima?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda WL1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludawl1/api/v1/trustee/restrictdefnLima?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Spruce Hill") {
		response = await API.get(process.env.react_app_base_url + 'backendapisprucehill/api/v1/trustee/restrictdefnSprucehill?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda RTL1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludartl1/api/v1/trustee/restrictdefnSaludartl1?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Stoa 2021") {
		response = await API.get(process.env.react_app_base_url + 'backendapistoa/api/v1/trustee/restrictdefnStoa?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Tildene") {
		response = await API.get(process.env.react_app_base_url + 'backendapitildene/api/v1/trustee/restrictdefnTildene?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda MF1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludamf1/api/v1/trustee/restrictdefnMF1?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Palisades") {
		response = await API.get(process.env.react_app_base_url + 'backendapipalisades/api/v1/trustee/restrictdefnPalisades?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda RTL2") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludartl2/api/v1/trustee/restrictdefnSaludartl2?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda PRE1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludapre/api/v1/trustee/restrictdefnSaludapre?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "MFA") {
		response = await API.get(process.env.react_app_base_url + 'backendapimfa/api/v1/trustee/restrictdefnMfa?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Setpoint") {
		response = await API.get(process.env.react_app_base_url + 'backendapisetpoint/api/v1/trustee/restrictdefnSetpoint?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda BC2") {
		response = await API.get(process.env.react_app_base_url + 'backendapibc2/api/v1/trustee/restrictdefnLima?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "NPL") {
		response = await API.get(process.env.react_app_base_url + 'backendapinpl/api/v1/trustee/restrictdefnNPL?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Stoa 2022") {
		response = await API.get(process.env.react_app_base_url + 'backendapistoa2022/api/v1/trustee/restrictdefnStoa2022?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Unlock") {
		response = await API.get(process.env.react_app_base_url + 'backendapiunlock/api/v1/trustee/restrictdefnUnlock?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
};
export const getdefinition = async (DealType, assetclass, channelname) => {
	let response = null
	console.log("ASSET", assetclass)
	if (DealType == "LimaOne") {
		response = await API.get(process.env.react_app_base_url + 'backendapilima/api/v1/trustee/getdefinitionSaludagrade?assetclass=' + assetclass + '&peer=' + peer + '&channelname=' + "WSFS",{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Bawag") {
		response = await API.get(process.env.react_app_base_url + 'backendapibawag/api/v1/trustee/getdefinitionSaludagrade?assetclass=' + assetclass + '&peer=' + peer + '&channelname=' + "WSFS",{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda PAC1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaluda/api/v1/trustee/getdefinitionSaluda?assetclass=' + assetclass + '&peer=' + peer + '&channelname=' + "WSFS",{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda FIG1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludagrade/api/v1/trustee/getdefinitionSaludagrade?assetclass=' + assetclass + '&peer=' + peer + '&channelname=' + "WSFS",{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda SEQ1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludagradeseq1/api/v1/trustee/getdefinitionSaludaseq?assetclass=' + assetclass + '&peer=' + peer + '&channelname=' + "WSFS",{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "AlphaFlow") {
		response = await API.get(process.env.react_app_base_url + 'backendapialphaflow/api/v1/trustee/getdefinitionAlphaflow?assetclass=' + assetclass + '&peer=' + peer + '&channelname=' + "WSFS",{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda FIG2") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludafig2/api/v1/trustee/getdefinitionFig2?assetclass=' + assetclass + '&peer=' + peer + '&channelname=' + "WSFS",{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda BC1") {
		response = await API.get(process.env.react_app_base_url + 'backendapibc1/api/v1/trustee/getdefinitionBC1?assetclass=' + assetclass + '&peer=' + peer + '&channelname=' + "WSFS",{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Reigo") {
		response = await API.get(process.env.react_app_base_url + 'backendapireigo/api/v1/trustee/getdefinitionReigo?assetclass=' + assetclass + '&peer=' + peer + '&channelname=' + "WSFS",{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Dominion") {
		response = await API.get(process.env.react_app_base_url + 'backendapidominion/api/v1/trustee/getdefinitionDominion?assetclass=' + assetclass + '&peer=' + peer + '&channelname=' + "WSFS",{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda WL1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludawl1/api/v1/trustee/getdefinitionWL1?assetclass=' + assetclass + '&peer=' + peer + '&channelname=' + "WSFS",{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Spruce Hill") {
		response = await API.get(process.env.react_app_base_url + 'backendapisprucehill/api/v1/trustee/getdefinitionSprucehill?assetclass=' + assetclass + '&peer=' + peer + '&channelname=' + "WSFS",{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda RTL1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludartl1/api/v1/trustee/getdefinitionSaludartl1?assetclass=' + assetclass + '&peer=' + peer + '&channelname=' + "WSFS",{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Stoa 2021") {
		response = await API.get(process.env.react_app_base_url + 'backendapistoa/api/v1/trustee/getdefinitionStoa?assetclass=' + assetclass + '&peer=' + peer + '&channelname=' + "WSFS",{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Tildene") {
		response = await API.get(process.env.react_app_base_url + 'backendapitildene/api/v1/trustee/getdefinitionTildene?assetclass=' + assetclass + '&peer=' + peer + '&channelname=' + "WSFS",{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda MF1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludamf1/api/v1/trustee/getdefinitionMF1?assetclass=' + assetclass + '&peer=' + peer + '&channelname=' + "WSFS",{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Palisades") {
		response = await API.get(process.env.react_app_base_url + 'backendapipalisades/api/v1/trustee/getdefinitionPalisades?assetclass=' + assetclass + '&peer=' + peer + '&channelname=' + "WSFS",{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda RTL2") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludartl2/api/v1/trustee/getdefinitionSaludartl2?assetclass=' + assetclass + '&peer=' + peer + '&channelname=' + "WSFS",{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda PRE1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludapre/api/v1/trustee/getdefinitionSaludapre?assetclass=' + assetclass + '&peer=' + peer + '&channelname=' + "WSFS",{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "MFA") {
		response = await API.get(process.env.react_app_base_url + 'backendapimfa/api/v1/trustee/getdefinitionMfa?assetclass=' + assetclass + '&peer=' + peer + '&channelname=' + "WSFS",{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Setpoint") {
		response = await API.get(process.env.react_app_base_url + 'backendapisetpoint/api/v1/trustee/getdefinitionSetpoint?assetclass=' + assetclass + '&peer=' + peer + '&channelname=' + "WSFS",{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda BC2") {
		response = await API.get(process.env.react_app_base_url + 'backendapibc2/api/v1/trustee/getdefinitionBC2?assetclass=' + assetclass + '&peer=' + peer + '&channelname=' + "WSFS",{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda Builders") {
		response = await API.get(process.env.react_app_base_url + 'backendapibuilders/api/v1/trustee/getdefinitionBuilders?assetclass=' + assetclass + '&peer=' + peer + '&channelname=' + "WSFS",{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "NPL") {
		response = await API.get(process.env.react_app_base_url + 'backendapinpl/api/v1/trustee/getdefinitionNPL?assetclass=' + assetclass + '&peer=' + peer + '&channelname=' + "WSFS",{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Stoa 2022") {
		response = await API.get(process.env.react_app_base_url + 'backendapistoa2022/api/v1/trustee/getdefinitionStoa2022?assetclass=' + assetclass + '&peer=' + peer + '&channelname=' + "WSFS",{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Unlock") {
		response = await API.get(process.env.react_app_base_url + 'backendapiunlock/api/v1/trustee/getdefinitionUnlock?assetclass=' + assetclass + '&peer=' + peer + '&channelname=' + "WSFS",{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
};

export const updatedefinition = async (DealType, data) => {
	let response = null
	if (DealType == "LimaOne") {
		response = await API.post(process.env.react_app_base_url + 'backendapilima/api/v1/trustee/updatedefinitionLima', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Bawag") {
		response = await API.post(process.env.react_app_base_url + 'backendapibawag/api/v1/trustee/updatedefinitionLima', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda PAC1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaluda/api/v1/trustee/updatedefinitionSaluda', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda FIG1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludagrade/api/v1/trustee/updatedefinitionSaludagrade', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda SEQ1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludagradeseq1/api/v1/trustee/updatedefinitionSaludaseq', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "AlphaFlow") {
		response = await API.post(process.env.react_app_base_url + 'backendapialphaflow/api/v1/trustee/updatedefinitionalphaflow', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda FIG2") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludafig2/api/v1/trustee/updatedefinitionFig2', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda BC1") {
		response = await API.post(process.env.react_app_base_url + 'backendapibc1/api/v1/trustee/updatedefinitionBC1', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Reigo") {
		response = await API.post(process.env.react_app_base_url + 'backendapireigo/api/v1/trustee/updatedefinitionReigo', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Dominion") {
		response = await API.post(process.env.react_app_base_url + 'backendapidominion/api/v1/trustee/updatedefinitionDominion', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda WL1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludawl1/api/v1/trustee/updatedefinitionWL1', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Spruce Hill") {
		response = await API.post(process.env.react_app_base_url + 'backendapisprucehill/api/v1/trustee/updatedefinitionSprucehill', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda RTL1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludartl1/api/v1/trustee/updatedefinitionSaludartl1', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Stoa 2021") {
		response = await API.post(process.env.react_app_base_url + 'backendapistoa/api/v1/trustee/updatedefinitionStoa', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Tildene") {
		response = await API.post(process.env.react_app_base_url + 'backendapitildene/api/v1/trustee/updatedefinitionTildene', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda MF1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludamf1/api/v1/trustee/updatedefinitionMF1', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Palisades") {
		response = await API.post(process.env.react_app_base_url + 'backendapipalisades/api/v1/trustee/updatedefinitionPalisades', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda RTL2") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludartl2/api/v1/trustee/updatedefinitionSaludartl2', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda PRE1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludapre/api/v1/trustee/updatedefinitionSaludapre', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "MFA") {
		response = await API.post(process.env.react_app_base_url + 'backendapimfa/api/v1/trustee/updatedefinitionMfa', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Setpoint") {
		response = await API.post(process.env.react_app_base_url + 'backendapisetpoint/api/v1/trustee/updatedefinitionSetpoint', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda BC2") {
		response = await API.post(process.env.react_app_base_url + 'backendapibc2/api/v1/trustee/updatedefinitionBC2', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda Builders") {
		response = await API.post(process.env.react_app_base_url + 'backendapibuilders/api/v1/trustee/updatedefinitionBuilders', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "NPL") {
		response = await API.post(process.env.react_app_base_url + 'backendapinpl/api/v1/trustee/updatedefinitionNPL', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Stoa 2022") {
		response = await API.post(process.env.react_app_base_url + 'backendapistoa2022/api/v1/trustee/updatedefinitionStoa2022', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Unlock") {
		response = await API.post(process.env.react_app_base_url + 'backendapiunlock/api/v1/trustee/updatedefinitionUnlock', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
};
export const deletedefinition = async (DealType, data) => {
	let response = null
	if (DealType == "LimaOne") {
		
		response = await API.post(process.env.react_app_base_url + 'backendapilima/api/v1/trustee/deletedefinitionLima', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Bawag") {
		response = await API.post(process.env.react_app_base_url + 'backendapibawag/api/v1/trustee/deletedefinitionLima', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda PAC1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaluda/api/v1/trustee/deletedefinitionSaluda', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda FIG1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludagrade/api/v1/trustee/deletedefinitionSaludagrade', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda SEQ1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludagradeseq1/api/v1/trustee/deletedefinitionSaludaseq', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "AlphaFlow") {
		response = await API.post(process.env.react_app_base_url + 'backendapialphaflow/api/v1/trustee/deletedefinitionalphaflow', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda FIG2") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludafig2/api/v1/trustee/deletedefinitionFig2', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda BC1") {
		response = await API.post(process.env.react_app_base_url + 'backendapibc1/api/v1/trustee/deletedefinitionBC1', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Reigo") {
		response = await API.post(process.env.react_app_base_url + 'backendapireigo/api/v1/trustee/deletedefinitionReigo', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Dominion") {
		response = await API.post(process.env.react_app_base_url + 'backendapidominion/api/v1/trustee/deletedefinitionDominion', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda WL1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludawl1/api/v1/trustee/deletedefinitionWL1', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Spruce Hill") {
		response = await API.post(process.env.react_app_base_url + 'backendapisprucehill/api/v1/trustee/deletedefinitionSprucehill', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda RTL1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludartl1/api/v1/trustee/deletedefinitionSaludartl1', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Stoa 2021") {
		response = await API.post(process.env.react_app_base_url + 'backendapistoa/api/v1/trustee/deletedefinitionStoa', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Tildene") {
		response = await API.post(process.env.react_app_base_url + 'backendapitildene/api/v1/trustee/deletedefinitionTildene', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda MF1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludamf1/api/v1/trustee/deletedefinitionMF1', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}

	else if (DealType == "Palisades") {
		response = await API.post(process.env.react_app_base_url + 'backendapipalisades/api/v1/trustee/deletedefinitionPalisades', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda RTL2") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludartl2/api/v1/trustee/deletedefinitionSaludartl2', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda PRE1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludapre/api/v1/trustee/deletedefinitionSaludapre', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "MFA") {
		response = await API.post(process.env.react_app_base_url + 'backendapimfa/api/v1/trustee/deletedefinitionMfa', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Setpoint") {
		response = await API.post(process.env.react_app_base_url + 'backendapisetpoint/api/v1/trustee/deletedefinitionSetpoint', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda BC2") {
		response = await API.post(process.env.react_app_base_url + 'backendapibc2/api/v1/trustee/deletedefinitionBC2', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "NPL") {
		response = await API.post(process.env.react_app_base_url + 'backendapinpl/api/v1/trustee/deletedefinitionNPL', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Stoa 2022") {
		response = await API.post(process.env.react_app_base_url + 'backendapistoa2022/api/v1/trustee/deletedefinitionStoa2022', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Unlock") {
		response = await API.post(process.env.react_app_base_url + 'backendapiunlock/api/v1/trustee/deletedefinitionUnlock', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
};


export const showcolumns = async (DealType, dealId, assetclass, filetype, filename, month, year, channelname) => {
	let response = null

	if (DealType == "LimaOne") {
		response = await API.get(process.env.react_app_base_url + 'backendapilima/api/v1/trustee/showcolumnsSaludagrade?dealId=' + dealId + '&assetclass=' + assetclass + '&month=' + month + '&year=' + year + '&peer=' + peer + '&filetype=' + filetype + '&filename=' + filename + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Bawag") {
		response = await API.get(process.env.react_app_base_url + 'backendapibawag/api/v1/trustee/showcolumnsSaludagrade?dealId=' + dealId + '&assetclass=' + assetclass + '&month=' + month + '&year=' + year + '&peer=' + peer + '&filetype=' + filetype + '&filename=' + filename + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda PAC1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaluda/api/v1/trustee/showcolumnsSaluda?dealId=' + dealId + '&assetclass=' + assetclass + '&month=' + month + '&year=' + year + '&peer=' + peer + '&filetype=' + filetype + '&filename=' + filename + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda FIG1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludagrade/api/v1/trustee/showcolumnsSaludagrade?dealId=' + dealId + '&assetclass=' + assetclass + '&month=' + month + '&year=' + year + '&peer=' + peer + '&filetype=' + filetype + '&filename=' + filename + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda SEQ1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludagradeseq1/api/v1/trustee/showcolumnsSaludaseq?dealId=' + dealId + '&assetclass=' + assetclass + '&month=' + month + '&year=' + year + '&peer=' + peer + '&filetype=' + filetype + '&filename=' + filename + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "AlphaFlow") {
		response = await API.get(process.env.react_app_base_url + 'backendapialphaflow/api/v1/trustee/showcolumnsalphaflow?dealId=' + dealId + '&assetclass=' + assetclass + '&month=' + month + '&year=' + year + '&peer=' + peer + '&filetype=' + filetype + '&filename=' + filename + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda FIG2") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludafig2/api/v1/trustee/showcolumnsFig2?dealId=' + dealId + '&assetclass=' + assetclass + '&month=' + month + '&year=' + year + '&peer=' + peer + '&filetype=' + filetype + '&filename=' + filename + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda BC1") {
		response = await API.get(process.env.react_app_base_url + 'backendapibc1/api/v1/trustee/showcolumnsBC1?dealId=' + dealId + '&assetclass=' + assetclass + '&month=' + month + '&year=' + year + '&peer=' + peer + '&filetype=' + filetype + '&filename=' + filename + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Reigo") {
		response = await API.get(process.env.react_app_base_url + 'backendapireigo/api/v1/trustee/showcolumnsReigo?dealId=' + dealId + '&assetclass=' + assetclass + '&month=' + month + '&year=' + year + '&peer=' + peer + '&filetype=' + filetype + '&filename=' + filename + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Dominion") {
		response = await API.get(process.env.react_app_base_url + 'backendapidominion/api/v1/trustee/showcolumnsDominion?dealId=' + dealId + '&assetclass=' + assetclass + '&month=' + month + '&year=' + year + '&peer=' + peer + '&filetype=' + filetype + '&filename=' + filename + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda WL1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludawl1/api/v1/trustee/showcolumnsWL1?dealId=' + dealId + '&assetclass=' + assetclass + '&month=' + month + '&year=' + year + '&peer=' + peer + '&filetype=' + filetype + '&filename=' + filename + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Spruce Hill") {
		response = await API.get(process.env.react_app_base_url + 'backendapisprucehill/api/v1/trustee/showcolumnsSprucehill?dealId=' + dealId + '&assetclass=' + assetclass + '&month=' + month + '&year=' + year + '&peer=' + peer + '&filetype=' + filetype + '&filename=' + filename + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda RTL1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludartl1/api/v1/trustee/showcolumnsSaludartl1?dealId=' + dealId + '&assetclass=' + assetclass + '&month=' + month + '&year=' + year + '&peer=' + peer + '&filetype=' + filetype + '&filename=' + filename + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Stoa 2021") {
		response = await API.get(process.env.react_app_base_url + 'backendapistoa/api/v1/trustee/showcolumnsStoa?dealId=' + dealId + '&assetclass=' + assetclass + '&month=' + month + '&year=' + year + '&peer=' + peer + '&filetype=' + filetype + '&filename=' + filename + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Tildene") {
		response = await API.get(process.env.react_app_base_url + 'backendapitildene/api/v1/trustee/showcolumnsTildene?dealId=' + dealId + '&assetclass=' + assetclass + '&month=' + month + '&year=' + year + '&peer=' + peer + '&filetype=' + filetype + '&filename=' + filename + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda MF1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludamf1/api/v1/trustee/showcolumnsMF1?dealId=' + dealId + '&assetclass=' + assetclass + '&month=' + month + '&year=' + year + '&peer=' + peer + '&filetype=' + filetype + '&filename=' + filename + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Palisades") {
		response = await API.get(process.env.react_app_base_url + 'backendapipalisades/api/v1/trustee/showcolumnsPalisades?dealId=' + dealId + '&assetclass=' + assetclass + '&month=' + month + '&year=' + year + '&peer=' + peer + '&filetype=' + filetype + '&filename=' + filename + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda RTL2") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludartl2/api/v1/trustee/showcolumnsSaludartl2?dealId=' + dealId + '&assetclass=' + assetclass + '&month=' + month + '&year=' + year + '&peer=' + peer + '&filetype=' + filetype + '&filename=' + filename + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda PRE1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludapre/api/v1/trustee/showcolumnsSaludapre?dealId=' + dealId + '&assetclass=' + assetclass + '&month=' + month + '&year=' + year + '&peer=' + peer + '&filetype=' + filetype + '&filename=' + filename + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "MFA") {
		response = await API.get(process.env.react_app_base_url + 'backendapimfa/api/v1/trustee/showcolumnsMfa?dealId=' + dealId + '&assetclass=' + assetclass + '&month=' + month + '&year=' + year + '&peer=' + peer + '&filetype=' + filetype + '&filename=' + filename + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Setpoint") {
		response = await API.get(process.env.react_app_base_url + 'backendapisetpoint/api/v1/trustee/showcolumnsSetpoint?dealId=' + dealId + '&assetclass=' + assetclass + '&month=' + month + '&year=' + year + '&peer=' + peer + '&filetype=' + filetype + '&filename=' + filename + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda BC2") {
		response = await API.get(process.env.react_app_base_url + 'backendapibc2/api/v1/trustee/showcolumnsBC2?dealId=' + dealId + '&assetclass=' + assetclass + '&month=' + month + '&year=' + year + '&peer=' + peer + '&filetype=' + filetype + '&filename=' + filename + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda Builders") {
		response = await API.get(process.env.react_app_base_url + 'backendapibuilders/api/v1/trustee/showcolumnsBuilders?dealId=' + dealId + '&assetclass=' + assetclass + '&month=' + month + '&year=' + year + '&peer=' + peer + '&filetype=' + filetype + '&filename=' + filename + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "NPL") {
		response = await API.get(process.env.react_app_base_url + 'backendapinpl/api/v1/trustee/showcolumnsNPL?dealId=' + dealId + '&assetclass=' + assetclass + '&month=' + month + '&year=' + year + '&peer=' + peer + '&filetype=' + filetype + '&filename=' + filename + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Stoa 2022") {
		response = await API.get(process.env.react_app_base_url + 'backendapistoa2022/api/v1/trustee/showcolumnsStoa2022?dealId=' + dealId + '&assetclass=' + assetclass + '&month=' + month + '&year=' + year + '&peer=' + peer + '&filetype=' + filetype + '&filename=' + filename + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Unlock") {
		response = await API.get(process.env.react_app_base_url + 'backendapiunlock/api/v1/trustee/showcolumnsUnlock?dealId=' + dealId + '&assetclass=' + assetclass + '&month=' + month + '&year=' + year + '&peer=' + peer + '&filetype=' + filetype + '&filename=' + filename + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
};

export const UploadToggle = async (data, DealType) => {
	let response = null
	if (DealType == "LimaOne") {
		response = await API.post(process.env.react_app_base_url + 'backendapilima/api/v1/trustee/toggleLima', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Bawag") {
		response = await API.post(process.env.react_app_base_url + 'backendapibawag/api/v1/trustee/uploadservicerreportBawag', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda PAC1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaluda/api/v1/trustee/uploadservicerreportSaluda', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda FIG1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludagrade/api/v1/trustee/uploadservicerreportSaludagrade', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda SEQ1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludagradeseq1/api/v1/trustee/uploadservicerreportSaludaseq', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "AlphaFlow") {
		response = await API.post(process.env.react_app_base_url + 'backendapialphaflow/api/v1/trustee/uploadservicerreportalphaflow', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda FIG2") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludafig2/api/v1/trustee/uploadservicerreportFig2', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda BC1") {
		response = await API.post(process.env.react_app_base_url + 'backendapibc1/api/v1/trustee/uploadservicerreportBC1', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Reigo") {
		response = await API.post(process.env.react_app_base_url + 'backendapireigo/api/v1/trustee/uploadservicerreportReigo', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Dominion") {
		response = await API.post(process.env.react_app_base_url + 'backendapidominion/api/v1/trustee/uploadservicerreportDominion', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda WL1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludawl1/api/v1/trustee/uploadservicerreportWL1', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Spruce Hill") {
		response = await API.post(process.env.react_app_base_url + 'backendapisprucehill/api/v1/trustee/uploadservicerreportSprucehill', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda RTL1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludartl1/api/v1/trustee/uploadservicerreportSaludartl1', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Stoa 2021") {
		response = await API.post(process.env.react_app_base_url + 'backendapistoa/api/v1/trustee/uploadservicerreportStoa', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Tildene") {
		response = await API.post(process.env.react_app_base_url + 'backendapitildene/api/v1/trustee/uploadservicerreportTildene', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda MF1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludamf1/api/v1/trustee/uploadservicerreportMF1', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Palisades") {
		response = await API.post(process.env.react_app_base_url + 'backendapipalisades/api/v1/trustee/uploadservicerreportPalisades', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda RTL2") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludartl2/api/v1/trustee/uploadservicerreportSaludartl2', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda PRE1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludapre/api/v1/trustee/uploadservicerreportSaludapre', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "MFA") {
		response = await API.post(process.env.react_app_base_url + 'backendapimfa/api/v1/trustee/uploadservicerreportMfa', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Setpoint") {
		response = await API.post(process.env.react_app_base_url + 'backendapisetpoint/api/v1/trustee/uploadservicerreportSetpoint', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda BC2") {
		response = await API.post(process.env.react_app_base_url + 'backendapibc2/api/v1/trustee/uploadservicerreportBC2', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda Builders") {
		response = await API.post(process.env.react_app_base_url + 'backendapibuilders/api/v1/trustee/uploadservicerreportBuilders', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "NPL") {
		response = await API.post(process.env.react_app_base_url + 'backendapinpl/api/v1/trustee/uploadservicerreportNPL', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Stoa 2022") {
		response = await API.post(process.env.react_app_base_url + 'backendapistoa2022/api/v1/trustee/uploadservicerreportStoa2022', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Unlock") {
		response = await API.post(process.env.react_app_base_url + 'backendapiunlock/api/v1/trustee/uploadservicerreportUnlock', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
};

export const getactivedefinition = async (DealType, dealId, month, year, channelname) => {
	let response = null

	if (DealType == "LimaOne") {
		response = await API.get(process.env.react_app_base_url + 'backendapilima/api/v1/trustee/dragdropLima?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Bawag") {
		response = await API.get(process.env.react_app_base_url + 'backendapibawag/api/v1/trustee/dragdropLima?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda PAC1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaluda/api/v1/trustee/dragdropLima?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda FIG1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludagrade/api/v1/trustee/dragdropLima?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda SEQ1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludagradeseq1/api/v1/trustee/dragdropLima?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "AlphaFlow") {
		response = await API.get(process.env.react_app_base_url + 'backendapialphaflow/api/v1/trustee/dragdropLima?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda FIG2") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludafig2/api/v1/trustee/dragdropLima?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda BC1") {
		response = await API.get(process.env.react_app_base_url + 'backendapibc1/api/v1/trustee/dragdropLima?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Reigo") {
		response = await API.get(process.env.react_app_base_url + 'backendapireigo/api/v1/trustee/dragdropLima?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Dominion") {
		response = await API.get(process.env.react_app_base_url + 'backendapidominion/api/v1/trustee/dragdropLima?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda WL1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludawl1/api/v1/trustee/dragdropLima?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Spruce Hill") {
		response = await API.get(process.env.react_app_base_url + 'backendapisprucehill/api/v1/trustee/dragdropLima?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda RTL1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludartl1/api/v1/trustee/dragdropLima?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Stoa 2021") {
		response = await API.get(process.env.react_app_base_url + 'backendapistoa/api/v1/trustee/dragdropLima?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Tildene") {
		response = await API.get(process.env.react_app_base_url + 'backendapitildene/api/v1/trustee/dragdropLima?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda MF1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludamf1/api/v1/trustee/dragdropLima?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Palisades") {
		response = await API.get(process.env.react_app_base_url + 'backendapipalisades/api/v1/trustee/dragdropLima?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda RTL2") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludartl2/api/v1/trustee/dragdropLima?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda PRE1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludapre/api/v1/trustee/dragdropLima?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "MFA") {
		response = await API.get(process.env.react_app_base_url + 'backendapimfa/api/v1/trustee/dragdropLima?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Setpoint") {
		response = await API.get(process.env.react_app_base_url + 'backendapisetpoint/api/v1/trustee/dragdropLima?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda BC2") {
		response = await API.get(process.env.react_app_base_url + 'backendapibc2/api/v1/trustee/dragdropLima?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda Builders") {
		response = await API.get(process.env.react_app_base_url + 'backendapibuilders/api/v1/trustee/dragdropLima?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "NPL") {
		response = await API.get(process.env.react_app_base_url + 'backendapinpl/api/v1/trustee/dragdropLima?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Stoa 2022") {
		response = await API.get(process.env.react_app_base_url + 'backendapistoa2022/api/v1/trustee/dragdropLima?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Unlock") {
		response = await API.get(process.env.react_app_base_url + 'backendapiunlock/api/v1/trustee/dragdropLima?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
};


export const savemapping = async (DealType, data) => {
	let response = null
	if (DealType == "LimaOne") {
		response = await API.post(process.env.react_app_base_url + 'backendapilima/api/v1/trustee/savemappingLima', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Bawag") {
		response = await API.post(process.env.react_app_base_url + 'backendapibawag/api/v1/trustee/initialsetupBawag', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda PAC1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaluda/api/v1/trustee/savemappingSaluda', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda FIG1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludagrade/api/v1/trustee/savemappingSaludagrade', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda SEQ1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludagradeseq1/api/v1/trustee/savemappingSaludaseq', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "AlphaFlow") {
		response = await API.post(process.env.react_app_base_url + 'backendapialphaflow/api/v1/trustee/savemappingalphaflow', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda FIG2") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludafig2/api/v1/trustee/savemappingFig2', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda BC1") {
		response = await API.post(process.env.react_app_base_url + 'backendapibc1/api/v1/trustee/savemappingBC1', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Reigo") {
		response = await API.post(process.env.react_app_base_url + 'backendapireigo/api/v1/trustee/savemappingReigo', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Dominion") {
		response = await API.post(process.env.react_app_base_url + 'backendapidominion/api/v1/trustee/savemappingDominion', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda WL1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludawl1/api/v1/trustee/savemappingWL1', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Spruce Hill") {
		response = await API.post(process.env.react_app_base_url + 'backendapisprucehill/api/v1/trustee/savemappingSprucehill', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda RTL1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludartl1/api/v1/trustee/savemappingSaludartl1', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Stoa 2021") {
		response = await API.post(process.env.react_app_base_url + 'backendapistoa/api/v1/trustee/savemappingStoa', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Tildene") {
		response = await API.post(process.env.react_app_base_url + 'backendapitildene/api/v1/trustee/savemappingTildene', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda MF1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludamf1/api/v1/trustee/savemappingMF1', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Palisades") {
		response = await API.post(process.env.react_app_base_url + 'backendapipalisades/api/v1/trustee/savemappingPalisades', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda RTL2") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludartl2/api/v1/trustee/savemappingSaludartl2', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda PRE1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludapre/api/v1/trustee/savemappingSaludapre', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "MFA") {
		response = await API.post(process.env.react_app_base_url + 'backendapimfa/api/v1/trustee/savemappingMfa', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Setpoint") {
		response = await API.post(process.env.react_app_base_url + 'backendapisetpoint/api/v1/trustee/savemappingSetpoint', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda BC2") {
		response = await API.post(process.env.react_app_base_url + 'backendapibc2/api/v1/trustee/savemappingBC2', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "NPL") {
		response = await API.post(process.env.react_app_base_url + 'backendapinpl/api/v1/trustee/savemappingNPL', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Stoa 2022") {
		response = await API.post(process.env.react_app_base_url + 'backendapistoa2022/api/v1/trustee/savemappingStoa2022', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Unlock") {
		response = await API.post(process.env.react_app_base_url + 'backendapiunlock/api/v1/trustee/savemappingUnlock', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
};

export const getassettype = async (DealType, dealId, channelname) => {
	let response = null
	if (DealType == "LimaOne") {
		response = await API.get(process.env.react_app_base_url + 'api/v1/trustee/getmappingSaludaseq?dealId=' + dealId + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Bawag") {
		response = await API.get(process.env.react_app_base_url + 'api/v1/trustee/getmappingSaludaseq?dealId=' + dealId + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda PAC1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaluda/api/v1/trustee/Saluda?dealId=' + dealId + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda FIG1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludagrade/api/v1/trustee/getassettypeSaludagrade?dealId=' + dealId + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda SEQ1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludagradeseq1/api/v1/trustee/getassettypeSaludaseq?dealId=' + dealId + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "AlphaFlow") {
		response = await API.get(process.env.react_app_base_url + 'backendapialphaflow/api/v1/trustee/getassettypealphaflow?dealId=' + dealId + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda FIG2") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludafig2/api/v1/trustee/getassettypeFig2?dealId=' + dealId + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda BC1") {
		response = await API.get(process.env.react_app_base_url + 'backendapibc1/api/v1/trustee/getassettypeBC1?dealId=' + dealId + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Reigo") {
		response = await API.get(process.env.react_app_base_url + 'backendapireigo/api/v1/trustee/getassettypeReigo?dealId=' + dealId + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Dominion") {
		response = await API.get(process.env.react_app_base_url + 'backendapidominion/api/v1/trustee/getassettypeDominion?dealId=' + dealId + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda WL1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludawl1/api/v1/trustee/getassettypeWL1?dealId=' + dealId + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Spruce Hill") {
		response = await API.get(process.env.react_app_base_url + 'backendapisprucehill/api/v1/trustee/getassettypeSprucehill?dealId=' + dealId + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda RTL1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludartl1/api/v1/trustee/getassettypeSaludartl1?dealId=' + dealId + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Stoa 2021") {
		response = await API.get(process.env.react_app_base_url + 'backendapistoa/api/v1/trustee/getassettypeStoa?dealId=' + dealId + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Tildene") {
		response = await API.get(process.env.react_app_base_url + 'backendapitildene/api/v1/trustee/getassettypeTildene?dealId=' + dealId + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda MF1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludamf1/api/v1/trustee/getassettypeMF1?dealId=' + dealId + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Palisades") {
		response = await API.get(process.env.react_app_base_url + 'backendapipalisades/api/v1/trustee/getassettypePalisades?dealId=' + dealId + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda RTL2") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludartl2/api/v1/trustee/getassettypeSaludartl2?dealId=' + dealId + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda PRE1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludapre/api/v1/trustee/getassettypeSaludapre?dealId=' + dealId + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "MFA") {
		response = await API.get(process.env.react_app_base_url + 'backendapimfa/api/v1/trustee/getassettypeMfa?dealId=' + dealId + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Setpoint") {
		response = await API.get(process.env.react_app_base_url + 'backendapisetpoint/api/v1/trustee/getassettypeSetpoint?dealId=' + dealId + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda BC2") {
		response = await API.get(process.env.react_app_base_url + 'backendapibc2/api/v1/trustee/getassettypeBC2?dealId=' + dealId + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda Builders") {
		response = await API.get(process.env.react_app_base_url + 'backendapibuilders/api/v1/trustee/getassettypeBuilders?dealId=' + dealId + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "NPL") {
		response = await API.get(process.env.react_app_base_url + 'backendapinpl/api/v1/trustee/getassettypeNPL?dealId=' + dealId + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Stoa 2022") {
		response = await API.get(process.env.react_app_base_url + 'backendapistoa2022/api/v1/trustee/getassettypeStoa2022?dealId=' + dealId + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Unlock") {
		response = await API.get(process.env.react_app_base_url + 'backendapiunlock/api/v1/trustee/getassettypeUnlock?dealId=' + dealId + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
};

export const getmapping = async (DealType, dealId, month, year, channelname) => {
	let response = null

	// if (DealType == "LimaOne") {
	// 	response = await API.get(process.env.react_app_base_url + 'backendapilima/api/v1/trustee/dragdropLima?dealId=' + dealId + '&month=' + month + '&year=' + year  + '&peer=' + peer )
	// 	return response;
	// }else if (DealType == "trusteedeal") {
	// 	if(channelname=="WSFS"){
	// 		response = await API.get(process.env.react_app_base_url_lima + 'api/v1/trustee/getmappingSaludagrade?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer+ '&channelname=' + channelname )
	// 		return response;
	// 	}
	// 	else if(channelname=="WSFS-PAC"){
	// 		response = await API.get(process.env.react_app_base_url_lima + 'api/v1/trustee/getmappingSaluda?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer+ '&channelname=' + channelname )
	// 		return response;
	// 	}
	// 	else if(channelname=="WSFS-SEQ"){
	// 		response = await API.get(process.env.react_app_base_url_lima + 'api/v1/trustee/getmappingSaludaseq?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer+ '&channelname=' + channelname )
	// 		return response;
	// 	}
	// }

	if (DealType == "LimaOne") {
		response = await API.get(process.env.react_app_base_url + 'api/v1/trustee/getmappingSaludaseq?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Bawag") {
		response = await API.get(process.env.react_app_base_url + 'api/v1/trustee/getmappingSaludaseq?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda PAC1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaluda/api/v1/trustee/getmappingSaluda?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda FIG1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludagrade/api/v1/trustee/getmappingSaludagrade?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda SEQ1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludagradeseq1/api/v1/trustee/getmappingSaludaseq?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "AlphaFlow") {
		response = await API.get(process.env.react_app_base_url + 'backendapialphaflow/api/v1/trustee/getmappingalphaflow?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda FIG2") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludafig2/api/v1/trustee/getmappingFig2?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda BC1") {
		response = await API.get(process.env.react_app_base_url + 'backendapibc1/api/v1/trustee/getmappingBC1?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Reigo") {
		response = await API.get(process.env.react_app_base_url + 'backendapireigo/api/v1/trustee/getmappingReigo?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Dominion") {
		response = await API.get(process.env.react_app_base_url + 'backendapidominion/api/v1/trustee/getmappingDominion?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda WL1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludawl1/api/v1/trustee/getmappingWL1?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Spruce Hill") {
		response = await API.get(process.env.react_app_base_url + 'backendapisprucehill/api/v1/trustee/getmappingSprucehill?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda RTL1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludartl1/api/v1/trustee/getmappingSaludartl1?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Stoa 2021") {
		response = await API.get(process.env.react_app_base_url + 'backendapistoa/api/v1/trustee/getmappingStoa?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Tildene") {
		response = await API.get(process.env.react_app_base_url + 'backendapitildene/api/v1/trustee/getmappingTildene?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda MF1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludamf1/api/v1/trustee/getmappingMF1?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Palisades") {
		response = await API.get(process.env.react_app_base_url + 'backendapipalisades/api/v1/trustee/getmappingPalisades?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda RTL2") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludartl2/api/v1/trustee/getmappingSaludartl2?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda PRE1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludapre/api/v1/trustee/getmappingSaludapre?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "MFA") {
		response = await API.get(process.env.react_app_base_url + 'backendapimfa/api/v1/trustee/getmappingMfa?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Setpoint") {
		response = await API.get(process.env.react_app_base_url + 'backendapisetpoint/api/v1/trustee/getmappingSetpoint?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda BC2") {
		response = await API.get(process.env.react_app_base_url + 'backendapibc2/api/v1/trustee/getmappingBC2?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda Builders") {
		response = await API.get(process.env.react_app_base_url + 'backendapibuilders/api/v1/trustee/getmappingBuilders?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "NPL") {
		response = await API.get(process.env.react_app_base_url + 'backendapinpl/api/v1/trustee/getmappingNPL?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Stoa 2022") {
		response = await API.get(process.env.react_app_base_url + 'backendapistoa2022/api/v1/trustee/getmappingStoa2022?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Unlock") {
		response = await API.get(process.env.react_app_base_url + 'backendapiunlock/api/v1/trustee/getmappingUnlock?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
};

export const GetAdditionalDetails = async (DealType, dealId, month, year, channelname) => {
	let response = null


	if (DealType == "LimaOne") {
		response = await API.get(process.env.react_app_base_url + 'api/v1/trustee/getmappingSaludaseq?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Bawag") {
		response = await API.get(process.env.react_app_base_url + 'api/v1/trustee/getmappingSaludaseq?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda PAC1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaluda/api/v1/trustee/getadditionaldetailsSaluda?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda FIG1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludagrade/api/v1/trustee/getadditionaldetailsSaludagrade?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda SEQ1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludagradeseq1/api/v1/trustee/getadditionaldetailsSaludaseq?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "AlphaFlow") {
		response = await API.get(process.env.react_app_base_url + 'backendapialphaflow/api/v1/trustee/getadditionaldetailsalphaflow?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda FIG2") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludafig2/api/v1/trustee/getadditionaldetailsFig2?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda BC1") {
		response = await API.get(process.env.react_app_base_url + 'backendapibc1/api/v1/trustee/getadditionaldetailsBC1?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Reigo") {
		response = await API.get(process.env.react_app_base_url + 'backendapireigo/api/v1/trustee/getadditionaldetailsReigo?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Dominion") {
		response = await API.get(process.env.react_app_base_url + 'backendapidominion/api/v1/trustee/getadditionaldetailsDominion?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda WL1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludawl1/api/v1/trustee/getadditionaldetailsWL1?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Spruce Hill") {
		response = await API.get(process.env.react_app_base_url + 'backendapisprucehill/api/v1/trustee/getadditionaldetailsSprucehill?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda RTL1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludartl1/api/v1/trustee/getadditionaldetailsSaludartl1?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Stoa 2021") {
		response = await API.get(process.env.react_app_base_url + 'backendapistoa/api/v1/trustee/getadditionaldetailsStoa?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Tildene") {
		response = await API.get(process.env.react_app_base_url + 'backendapitildene/api/v1/trustee/getadditionaldetailsTildene?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda MF1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludamf1/api/v1/trustee/getadditionaldetailsMF1?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Palisades") {
		response = await API.get(process.env.react_app_base_url + 'backendapipalisades/api/v1/trustee/getadditionaldetailsPalisades?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda RTL2") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludartl2/api/v1/trustee/getadditionaldetailsSaludartl2?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda PRE1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludapre/api/v1/trustee/getadditionaldetailsSaludapre?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "MFA") {
		response = await API.get(process.env.react_app_base_url + 'backendapimfa/api/v1/trustee/getadditionaldetailsMfa?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Setpoint") {
		response = await API.get(process.env.react_app_base_url + 'backendapisetpoint/api/v1/trustee/getadditionaldetailsSetpoint?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda BC2") {
		response = await API.get(process.env.react_app_base_url + 'backendapibc2/api/v1/trustee/getadditionaldetailsBC2?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "NPL") {
		response = await API.get(process.env.react_app_base_url + 'backendapinpl/api/v1/trustee/getadditionaldetailsNPL?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Stoa 2022") {
		response = await API.get(process.env.react_app_base_url + 'backendapistoa2022/api/v1/trustee/getadditionaldetailsStoa2022?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Unlock") {
		response = await API.get(process.env.react_app_base_url + 'backendapiunlock/api/v1/trustee/getadditionaldetailsUnlock?dealId=' + dealId + '&month=' + month + '&year=' + year + '&peer=' + peer + '&channelname=' + channelname,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
};

export const getbegbal = async (DealType, data) => {
	let response = null
	if (DealType == "LimaOne") {
		response = await API.post(process.env.react_app_base_url + 'backendapilima/api/v1/trustee/getbegbal', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Bawag") {
		response = await API.post(process.env.react_app_base_url + 'backendapibawag/api/v1/trustee/getbegbal', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda PAC1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaluda/api/v1/trustee/getbegbal', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda FIG1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludagrade/api/v1/trustee/getbegbal', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda SEQ1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludagradeseq1/api/v1/trustee/getbegbal', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "AlphaFlow") {
		response = await API.post(process.env.react_app_base_url + 'backendapialphaflow/api/v1/trustee/getbegbal', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda FIG2") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludafig2/api/v1/trustee/getbegbal', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda BC1") {
		response = await API.post(process.env.react_app_base_url + 'backendapibc1/api/v1/trustee/getbegbal', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Reigo") {
		response = await API.post(process.env.react_app_base_url + 'backendapireigo/api/v1/trustee/getbegbal', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Dominion") {
		response = await API.post(process.env.react_app_base_url + 'backendapidominion/api/v1/trustee/getbegbal', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda WL1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludawl1/api/v1/trustee/getbegbal', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Spruce Hill") {
		response = await API.post(process.env.react_app_base_url + 'backendapisprucehill/api/v1/trustee/getbegbal', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda RTL1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludartl1/api/v1/trustee/getbegbal', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Stoa 2021") {
		response = await API.post(process.env.react_app_base_url + 'backendapistoa/api/v1/trustee/getbegbal', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Tildene") {
		response = await API.post(process.env.react_app_base_url + 'backendapitildene/api/v1/trustee/getbegbal', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda MF1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludamf1/api/v1/trustee/getbegbal', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Palisades") {
		response = await API.post(process.env.react_app_base_url + 'backendapipalisades/api/v1/trustee/getbegbal', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda RTL2") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludartl2/api/v1/trustee/getbegbal', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda PRE1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludapre/api/v1/trustee/getbegbal', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "MFA") {
		response = await API.post(process.env.react_app_base_url + 'backendapimfa/api/v1/trustee/getbegbal', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Setpoint") {
		response = await API.post(process.env.react_app_base_url + 'backendapisetpoint/api/v1/trustee/getbegbal', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda BC2") {
		response = await API.post(process.env.react_app_base_url + 'backendapibc2/api/v1/trustee/getbegbal', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda Builders") {
		response = await API.post(process.env.react_app_base_url + 'backendapibuilders/api/v1/trustee/getbegbal', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "NPL") {
		response = await API.post(process.env.react_app_base_url + 'backendapinpl/api/v1/trustee/getbegbal', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Stoa 2022") {
		response = await API.post(process.env.react_app_base_url + 'backendapistoa2022/api/v1/trustee/getbegbal', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Unlock") {
		response = await API.post(process.env.react_app_base_url + 'backendapiunlock/api/v1/trustee/getbegbal', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
};

export const getservicerdata = async (DealType, data) => {
	let response = null
	if (DealType == "LimaOne") {
		response = await API.post(process.env.react_app_base_url + 'backendapilima/api/v1/trustee/getservicerdata', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Bawag") {
		response = await API.post(process.env.react_app_base_url + 'backendapibawag/api/v1/trustee/getservicerdata', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda PAC1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaluda/api/v1/trustee/getservicerdata', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda FIG1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludagrade/api/v1/trustee/getservicerdata', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda SEQ1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludagradeseq1/api/v1/trustee/getservicerdata', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "AlphaFlow") {
		response = await API.post(process.env.react_app_base_url + 'backendapialphaflow/api/v1/trustee/getservicerdata', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda FIG2") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludafig2/api/v1/trustee/getservicerdata', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda BC1") {
		response = await API.post(process.env.react_app_base_url + 'backendapibc1/api/v1/trustee/getservicerdata', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Reigo") {
		response = await API.post(process.env.react_app_base_url + 'backendapireigo/api/v1/trustee/getservicerdata', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Dominion") {
		response = await API.post(process.env.react_app_base_url + 'backendapidominion/api/v1/trustee/getservicerdata', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda WL1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludawl1/api/v1/trustee/getservicerdata', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Spruce Hill") {
		response = await API.post(process.env.react_app_base_url + 'backendapisprucehill/api/v1/trustee/getservicerdata', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda RTL1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludartl1/api/v1/trustee/getservicerdata', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Stoa 2021") {
		response = await API.post(process.env.react_app_base_url + 'backendapistoa/api/v1/trustee/getservicerdata', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Tildene") {
		response = await API.post(process.env.react_app_base_url + 'backendapitildene/api/v1/trustee/getservicerdata', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda MF1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludamf1/api/v1/trustee/getservicerdata', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Palisades") {
		response = await API.post(process.env.react_app_base_url + 'backendapipalisades/api/v1/trustee/getservicerdata', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda RTL2") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludartl2/api/v1/trustee/getservicerdata', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda PRE1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludapre/api/v1/trustee/getservicerdata', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "MFA") {
		response = await API.post(process.env.react_app_base_url + 'backendapimfa/api/v1/trustee/getservicerdata', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Setpoint") {
		response = await API.post(process.env.react_app_base_url + 'backendapisetpoint/api/v1/trustee/getservicerdata', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda BC2") {
		response = await API.post(process.env.react_app_base_url + 'backendapibc2/api/v1/trustee/getservicerdata', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda Builders") {
		response = await API.post(process.env.react_app_base_url + 'backendapibuilders/api/v1/trustee/getservicerdata', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "NPL") {
		response = await API.post(process.env.react_app_base_url + 'backendapinpl/api/v1/trustee/getservicerdata', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Stoa 2022") {
		response = await API.post(process.env.react_app_base_url + 'backendapistoa2022/api/v1/trustee/getservicerdata', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Unlock") {
		response = await API.post(process.env.react_app_base_url + 'backendapiunlock/api/v1/trustee/getservicerdata', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
};
export const savecategory = async (DealType, data) => {
	let response = null
	if (DealType == "LimaOne") {
		response = await API.post(process.env.react_app_base_url + 'backendapilima/api/v1/trustee/savecategory', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Bawag") {
		response = await API.post(process.env.react_app_base_url + 'backendapibawag/api/v1/trustee/savecategory', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda PAC1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaluda/api/v1/trustee/savecategory', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda FIG1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludagrade/api/v1/trustee/savecategory', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda SEQ1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludagradeseq1/api/v1/trustee/savecategory', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "AlphaFlow") {
		response = await API.post(process.env.react_app_base_url + 'backendapialphaflow/api/v1/trustee/savecategory', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda FIG2") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludafig2/api/v1/trustee/savecategory', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda BC1") {
		response = await API.post(process.env.react_app_base_url + 'backendapibc1/api/v1/trustee/savecategory', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Reigo") {
		response = await API.post(process.env.react_app_base_url + 'backendapireigo/api/v1/trustee/savecategory', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Dominion") {
		response = await API.post(process.env.react_app_base_url + 'backendapidominion/api/v1/trustee/savecategory', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda WL1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludawl1/api/v1/trustee/savecategory', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Spruce Hill") {
		response = await API.post(process.env.react_app_base_url + 'backendapisprucehill/api/v1/trustee/savecategory', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda RTL1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludartl1/api/v1/trustee/savecategory', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Stoa 2021") {
		response = await API.post(process.env.react_app_base_url + 'backendapistoa/api/v1/trustee/savecategory', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Tildene") {
		response = await API.post(process.env.react_app_base_url + 'backendapitildene/api/v1/trustee/savecategory', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda MF1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludamf1/api/v1/trustee/savecategory', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Palisades") {
		response = await API.post(process.env.react_app_base_url + 'backendapipalisades/api/v1/trustee/savecategory', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda RTL2") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludartl2/api/v1/trustee/savecategory', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda PRE1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludapre/api/v1/trustee/savecategory', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "MFA") {
		response = await API.post(process.env.react_app_base_url + 'backendapimfa/api/v1/trustee/savecategory', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Setpoint") {
		response = await API.post(process.env.react_app_base_url + 'backendapisetpoint/api/v1/trustee/savecategory', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda BC2") {
		response = await API.post(process.env.react_app_base_url + 'backendapibc2/api/v1/trustee/savecategory', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda Builders") {
		response = await API.post(process.env.react_app_base_url + 'backendapibuilders/api/v1/trustee/savecategory', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "NPL") {
		response = await API.post(process.env.react_app_base_url + 'backendapinpl/api/v1/trustee/savecategory', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Stoa 2022") {
		response = await API.post(process.env.react_app_base_url + 'backendapistoa2022/api/v1/trustee/savecategory', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Unlock") {
		response = await API.post(process.env.react_app_base_url + 'backendapiunlock/api/v1/trustee/savecategory', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
};
export const AdjustmentCondition = async (DealType, data) => {
	let response = null
	if (DealType == "LimaOne") {
		response = await API.post(process.env.react_app_base_url + 'backendapilima/api/v1/trustee/AdjustmentCondition', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Bawag") {
		response = await API.post(process.env.react_app_base_url + 'backendapibawag/api/v1/trustee/AdjustmentCondition', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda PAC1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaluda/api/v1/trustee/AdjustmentCondition', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda FIG1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludagrade/api/v1/trustee/AdjustmentCondition', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda SEQ1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludagradeseq1/api/v1/trustee/AdjustmentCondition', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "AlphaFlow") {
		response = await API.post(process.env.react_app_base_url + 'backendapialphaflow/api/v1/trustee/AdjustmentCondition', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda FIG2") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludafig2/api/v1/trustee/AdjustmentCondition', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda BC1") {
		response = await API.post(process.env.react_app_base_url + 'backendapibc1/api/v1/trustee/AdjustmentCondition', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Reigo") {
		response = await API.post(process.env.react_app_base_url + 'backendapireigo/api/v1/trustee/AdjustmentCondition', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Dominion") {
		response = await API.post(process.env.react_app_base_url + 'backendapidominion/api/v1/trustee/AdjustmentCondition', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda WL1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludawl1/api/v1/trustee/AdjustmentCondition', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Spruce Hill") {
		response = await API.post(process.env.react_app_base_url + 'backendapisprucehill/api/v1/trustee/AdjustmentCondition', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda RTL1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludartl1/api/v1/trustee/AdjustmentCondition', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Stoa 2021") {
		response = await API.post(process.env.react_app_base_url + 'backendapistoa/api/v1/trustee/AdjustmentCondition', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Tildene") {
		response = await API.post(process.env.react_app_base_url + 'backendapitildene/api/v1/trustee/AdjustmentCondition', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda MF1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludamf1/api/v1/trustee/AdjustmentCondition', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Palisades") {
		response = await API.post(process.env.react_app_base_url + 'backendapipalisades/api/v1/trustee/AdjustmentCondition', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda RTL2") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludartl2/api/v1/trustee/AdjustmentCondition', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda PRE1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludapre/api/v1/trustee/AdjustmentCondition', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "MFA") {
		response = await API.post(process.env.react_app_base_url + 'backendapimfa/api/v1/trustee/AdjustmentCondition', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Setpoint") {
		response = await API.post(process.env.react_app_base_url + 'backendapisetpoint/api/v1/trustee/AdjustmentCondition', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda BC2") {
		response = await API.post(process.env.react_app_base_url + 'backendapibc2/api/v1/trustee/AdjustmentCondition', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda Builders") {
		response = await API.post(process.env.react_app_base_url + 'backendapibuilders/api/v1/trustee/AdjustmentCondition', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "NPL") {
		response = await API.post(process.env.react_app_base_url + 'backendapinpl/api/v1/trustee/AdjustmentCondition', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Stoa 2022") {
		response = await API.post(process.env.react_app_base_url + 'backendapistoa2022/api/v1/trustee/AdjustmentCondition', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Unlock") {
		response = await API.post(process.env.react_app_base_url + 'backendapiunlock/api/v1/trustee/AdjustmentCondition', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
};
export const OpenForm = async (DealType, data) => {
	let response = null
	if (DealType == "LimaOne") {
		response = await API.post(process.env.react_app_base_url + 'backendapilima/api/v1/trustee/OpenForm', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Bawag") {
		response = await API.post(process.env.react_app_base_url + 'backendapibawag/api/v1/trustee/OpenForm', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda PAC1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaluda/api/v1/trustee/OpenForm', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda FIG1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludagrade/api/v1/trustee/OpenForm', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda SEQ1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludagradeseq1/api/v1/trustee/OpenForm', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "AlphaFlow") {
		response = await API.post(process.env.react_app_base_url + 'backendapialphaflow/api/v1/trustee/OpenForm', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda FIG2") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludafig2/api/v1/trustee/OpenForm', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda BC1") {
		response = await API.post(process.env.react_app_base_url + 'backendapibc1/api/v1/trustee/OpenForm', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Reigo") {
		response = await API.post(process.env.react_app_base_url + 'backendapireigo/api/v1/trustee/OpenForm', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Dominion") {
		response = await API.post(process.env.react_app_base_url + 'backendapidominion/api/v1/trustee/OpenForm', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda WL1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludawl1/api/v1/trustee/OpenForm', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Spruce Hill") {
		response = await API.post(process.env.react_app_base_url + 'backendapisprucehill/api/v1/trustee/OpenForm', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda RTL1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludartl1/api/v1/trustee/OpenForm', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Stoa 2021") {
		response = await API.post(process.env.react_app_base_url + 'backendapistoa/api/v1/trustee/OpenForm', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Tildene") {
		response = await API.post(process.env.react_app_base_url + 'backendapitildene/api/v1/trustee/OpenForm', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda MF1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludamf1/api/v1/trustee/OpenForm', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Palisades") {
		response = await API.post(process.env.react_app_base_url + 'backendapipalisades/api/v1/trustee/OpenForm', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda RTL2") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludartl2/api/v1/trustee/OpenForm', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda PRE1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludapre/api/v1/trustee/OpenForm', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "MFA") {
		response = await API.post(process.env.react_app_base_url + 'backendapimfa/api/v1/trustee/OpenForm', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Setpoint") {
		response = await API.post(process.env.react_app_base_url + 'backendapisetpoint/api/v1/trustee/OpenForm', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda BC2") {
		response = await API.post(process.env.react_app_base_url + 'backendapibc2/api/v1/trustee/OpenForm', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda Builders") {
		response = await API.post(process.env.react_app_base_url + 'backendapibuilders/api/v1/trustee/OpenForm', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "NPL") {
		response = await API.post(process.env.react_app_base_url + 'backendapinpl/api/v1/trustee/OpenForm', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Stoa 2022") {
		response = await API.post(process.env.react_app_base_url + 'backendapistoa2022/api/v1/trustee/OpenForm', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Unlock") {
		response = await API.post(process.env.react_app_base_url + 'backendapiunlock/api/v1/trustee/OpenForm', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
};
export const savecollateralactivity = async (DealType, data) => {
	let response = null
	if (DealType == "LimaOne") {
		response = await API.post(process.env.react_app_base_url + 'backendapilima/api/v1/trustee/savecollateralactivity', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Bawag") {
		response = await API.post(process.env.react_app_base_url + 'backendapibawag/api/v1/trustee/savecollateralactivity', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda PAC1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaluda/api/v1/trustee/savecollateralactivity', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda FIG1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludagrade/api/v1/trustee/savecollateralactivity', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda SEQ1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludagradeseq1/api/v1/trustee/savecollateralactivity', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "AlphaFlow") {
		response = await API.post(process.env.react_app_base_url + 'backendapialphaflow/api/v1/trustee/savecollateralactivity', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	} else if (DealType == "Saluda FIG2") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludafig2/api/v1/trustee/savecollateralactivity', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda BC1") {
		response = await API.post(process.env.react_app_base_url + 'backendapibc1/api/v1/trustee/savecollateralactivity', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Reigo") {
		response = await API.post(process.env.react_app_base_url + 'backendapireigo/api/v1/trustee/savecollateralactivity', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Dominion") {
		response = await API.post(process.env.react_app_base_url + 'backendapidominion/api/v1/trustee/savecollateralactivity', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda WL1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludawl1/api/v1/trustee/savecollateralactivity', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Spruce Hill") {
		response = await API.post(process.env.react_app_base_url + 'backendapisprucehill/api/v1/trustee/savecollateralactivity', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda RTL1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludartl1/api/v1/trustee/savecollateralactivity', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Stoa 2021") {
		response = await API.post(process.env.react_app_base_url + 'backendapistoa/api/v1/trustee/savecollateralactivity', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Tildene") {
		response = await API.post(process.env.react_app_base_url + 'backendapitildene/api/v1/trustee/savecollateralactivity', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda MF1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludamf1/api/v1/trustee/savecollateralactivity', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Palisades") {
		response = await API.post(process.env.react_app_base_url + 'backendapipalisades/api/v1/trustee/savecollateralactivity', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda RTL2") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludartl2/api/v1/trustee/savecollateralactivity', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda PRE1") {
		response = await API.post(process.env.react_app_base_url + 'backendapisaludapre/api/v1/trustee/savecollateralactivity', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "MFA") {
		response = await API.post(process.env.react_app_base_url + 'backendapimfa/api/v1/trustee/savecollateralactivity', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Setpoint") {
		response = await API.post(process.env.react_app_base_url + 'backendapisetpoint/api/v1/trustee/savecollateralactivity', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda BC2") {
		response = await API.post(process.env.react_app_base_url + 'backendapibc2/api/v1/trustee/savecollateralactivity', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Saluda Builders") {
		response = await API.post(process.env.react_app_base_url + 'backendapibuilders/api/v1/trustee/savecollateralactivity', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "NPL") {
		response = await API.post(process.env.react_app_base_url + 'backendapinpl/api/v1/trustee/savecollateralactivity', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Stoa 2022") {
		response = await API.post(process.env.react_app_base_url + 'backendapistoa2022/api/v1/trustee/savecollateralactivity', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
	else if (DealType == "Unlock") {
		response = await API.post(process.env.react_app_base_url + 'backendapiunlock/api/v1/trustee/savecollateralactivity', data,{ headers: {"authorization" : `Bearer ${token}`} });
		return response;
	}
};
export const GetTableNames = async (DealType) => {
	let response = null
	if (DealType == "LimaOne") {
		response = await API.get(process.env.react_app_base_url + 'backendapilima/api/v1/trustee/tablenameslist?peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Bawag") {
		response = await API.get(process.env.react_app_base_url + 'backendapibawag/api/v1/trustee/tablenameslist?peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda PAC1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaluda/api/v1/trustee/tablenameslist?peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda FIG1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludagrade/api/v1/trustee/tablenameslist?peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda SEQ1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludagradeseq1/api/v1/trustee/tablenameslist?peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		// response = await API.get(process.env.react_app_base_url + 'backendapilima/api/v1/trustee/getallinvestors?peer=' + LimaPeer)

		return response;
	}
	else if (DealType == "AlphaFlow") {
		response = await API.get(process.env.react_app_base_url + 'backendapialphaflow/api/v1/trustee/tablenameslist?peer=' + saludaPeer + '&channelname=' + ChannelName,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	} else if (DealType == "Saluda FIG2") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludafig2/api/v1/trustee/tablenameslist?peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda BC1") {
		response = await API.get(process.env.react_app_base_url + 'backendapibc1/api/v1/trustee/tablenameslist?peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Reigo") {
		response = await API.get(process.env.react_app_base_url + 'backendapireigo/api/v1/trustee/tablenameslist?peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Dominion") {
		response = await API.get(process.env.react_app_base_url + 'backendapidominion/api/v1/trustee/tablenameslist?peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda WL1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludawl1/api/v1/trustee/tablenameslist?peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Spruce Hill") {
		response = await API.get(process.env.react_app_base_url + 'backendapisprucehill/api/v1/trustee/tablenameslist?peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda RTL1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludartl1/api/v1/trustee/tablenameslist?peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Stoa 2021") {
		response = await API.get(process.env.react_app_base_url + 'backendapistoa/api/v1/trustee/tablenameslist?peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Tildene") {
		response = await API.get(process.env.react_app_base_url + 'backendapitildene/api/v1/trustee/tablenameslist?peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda MF1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludamf1/api/v1/trustee/tablenameslist?peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Palisades") {
		response = await API.get(process.env.react_app_base_url + 'backendapipalisades/api/v1/trustee/tablenameslist?peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda RTL2") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludartl2/api/v1/trustee/tablenameslist?peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda PRE1") {
		response = await API.get(process.env.react_app_base_url + 'backendapisaludapre/api/v1/trustee/tablenameslist?peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "MFA") {
		response = await API.get(process.env.react_app_base_url + 'backendapimfa/api/v1/trustee/tablenameslist?peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Setpoint") {
		response = await API.get(process.env.react_app_base_url + 'backendapisetpoint/api/v1/trustee/tablenameslist?peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda BC2") {
		response = await API.get(process.env.react_app_base_url + 'backendapibc2/api/v1/trustee/tablenameslist?peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Saluda Builders") {
		response = await API.get(process.env.react_app_base_url + 'backendapibuilders/api/v1/trustee/tablenameslist?peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "NPL") {
		response = await API.get(process.env.react_app_base_url + 'backendapinpl/api/v1/trustee/tablenameslist?peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Stoa 2022") {
		response = await API.get(process.env.react_app_base_url + 'backendapistoa2022/api/v1/trustee/tablenameslist?peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
	else if (DealType == "Unlock") {
		response = await API.get(process.env.react_app_base_url + 'backendapiunlock/api/v1/trustee/tablenameslist?peer=' + LimaPeer,{ headers: {"authorization" : `Bearer ${token}`} })
		return response;
	}
};

export const months = [
	{
		value: '1',
		label: 'January',
	},
	{
		value: '2',
		label: 'February',
	},
	{
		value: '3',
		label: 'March',
	},
	{
		value: '4',
		label: 'April',
	},
	{
		value: '5',
		label: 'May',
	},
	{
		value: '6',
		label: 'June',
	},
	{
		value: '7',
		label: 'July',
	},
	{
		value: '8',
		label: 'August',
	},
	{
		value: '9',
		label: 'September',
	},
	{
		value: '10',
		label: 'October',
	},
	{
		value: '11',
		label: 'November',
	},
	{
		value: '12',
		label: 'December',
	},
];
export const monthsselfservice = [
	{
		value: '01',
		label: 'January',
	},
	{
		value: '02',
		label: 'February',
	},
	{
		value: '03',
		label: 'March',
	},
	{
		value: '04',
		label: 'April',
	},
	{
		value: '05',
		label: 'May',
	},
	{
		value: '06',
		label: 'June',
	},
	{
		value: '07',
		label: 'July',
	},
	{
		value: '08',
		label: 'August',
	},
	{
		value: '09',
		label: 'September',
	},
	{
		value: '10',
		label: 'October',
	},
	{
		value: '11',
		label: 'November',
	},
	{
		value: '12',
		label: 'December',
	},
];
export function generateYears() {
	let min = 2020;
	console.log("min", min)
	let max = new Date().getFullYear();
	console.log("max", max)
	let years = []
	for (var i = min; i <= max; i++) {
		console.log("asdasd", i)
		years.push(
			{
				value: i.toString(),
				label: i.toString()
			}
		)

	}
	let reversarray = years.reverse();
	return reversarray

}


export const GroupBySaludaGrade = [

	{
		value: 'Borrower State',
		label: 'Borrower State',
	},
	{
		value: 'Lien',
		label: 'Lien',
	},
	{
		value: 'Current Principal Balance',
		label: 'Current Principal Balance',
	},
	{
		value: 'Original Loan-To-Value',
		label: 'Original Loan-To-Value',
	},
	{
		value: 'Current Interest Rate',
		label: 'Current Interest Rate',
	},
	{
		value: 'Property State',
		label: 'Property State',
	},
	{
		value: 'Purpose',
		label: 'Purpose',
	},
	{
		value: 'Remaining Term',
		label: 'Remaining Term',
	},
	{
		value: 'Debt To Income Ratio',
		label: 'Debt To Income Ratio',
	},
	{
		value: 'Borrower FICO',
		label: 'Borrower FICO',
	}
]

export const GroupByLima = [
	{
		value: 'City',
		label: 'City',
	},
	{
		value: 'State',
		label: 'State',
	},
	{
		value: 'Loan Type',
		label: 'Loan Type',
	},
	{
		value: 'Current Maturity Date',
		label: 'Current Maturity Date',
	},
	{
		value: 'Loan Extended',
		label: 'Loan Extended',
	},
	{
		value: 'Remaining Term',
		label: 'Remaining Term',
	},
	{
		value: 'Investor Rate',
		label: 'Investor Rate',
	},
	{
		value: 'Ending Principal Balance',
		label: 'Ending Principal Balance',
	},
	{
		value: 'Delinquency Status',
		label: 'Delinquency Status',
	}
];

export const GroupBySaludaseq = [
	{
		value: 'Account status',
		label: 'Account status',
	},
	{
		value: 'Current Interest Rate',
		label: 'Current Interest Rate',
	},
	{
		value: 'Current Principal Balance',
		label: 'Current Principal Balance',
	},
	{
		value: 'Actual End Date',
		label: 'Actual End Date',
	}
];

export const GroupByBawag = [
	{
		value: 'BorrowerState',
		label: 'Borrower State',
	},

];
export const GroupBySaluda = [
	{
		value: 'Account Status',
		label: 'Account Status',
	},
	{
		value: 'Property State',
		label: 'Property State',
	},
	{
		value: 'Purpose',
		label: 'Purpose',
	},
	{
		value: 'Maturity Date',
		label: 'Maturity Date',
	},
	{
		value: 'Last Modification Date',
		label: 'Last Modification Date',
	},
	{
		value: 'Current Interest Rate',
		label: 'Current Interest Rate',
	},
	{
		value: 'Current Principal Balance',
		label: 'Current Principal Balance',
	},
	{
		value: 'Borrower FICO',
		label: 'Borrower FICO',
	}

];

export const GroupByAlphaflow = [
	{
		value: 'Account Status',
		label: 'Account Status',
	},
	{
		value: 'Current Principal Balance',
		label: 'Current Principal Balance',
	},
	{
		value: 'Current Interest Rate',
		label: 'Current Interest Rate',
	},
	{
		value: 'Servicer',
		label: 'Servicer',
	},
	// {
	// 	value: 'ModificationType',
	// 	label: 'Modification Type',
	// },
	// {
	// 	value: 'PrincipalBalance',
	// 	label: 'Principal Balance',
	// }
];

export const GroupByFig2 = [

	{
		value: 'Borrower State',
		label: 'Borrower State',
	},
	{
		value: 'Lien',
		label: 'Lien',
	},
	{
		value: 'Current Principal Balance',
		label: 'Current Principal Balance',
	},
	{
		value: 'Original Loan-To-Value',
		label: 'Original Loan-To-Value',
	},
	{
		value: 'Current Interest Rate',
		label: 'Current Interest Rate',
	},
	{
		value: 'Property State',
		label: 'Property State',
	},
	{
		value: 'Purpose',
		label: 'Purpose',
	},
	{
		value: 'Remaining Term',
		label: 'Remaining Term',
	},
	{
		value: 'Debt To income Ratio',
		label: 'Debt To income Ratio',
	},
	{
		value: 'Borrower FICO',
		label: 'Borrower FICO',
	}
]

export const GroupByBC1 = [
	{
		value: 'Account Status',
		label: 'Account Status',
	},
	{
		value: 'Current Principal Balance',
		label: 'Current Principal Balance',
	},
	{
		value: 'Maturity Date',
		label: 'Maturity Date',
	},
	{
		value: 'Current Interest Rate',
		label: 'Current Interest Rate',
	},
	{
		value: 'Loan Modification Type',
		label: 'Loan Modification Type',
	}
];


export const GroupByReigo = [
	{
		value: 'Remaining Term',
		label: 'Remaining Term',
	},
	{
		value: 'Property State',
		label: 'Property State',
	},
	{
		value: 'Account Status',
		label: 'Account Status',
	},
	{
		value: 'Borrower FICO',
		label: 'Borrower FICO',
	},
	{
		value: 'Current Interest Rate',
		label: 'Current Interest Rate',
	},
	{
		value: 'Loan-to-AfterRepairValue',
		label: 'Loan-to-AfterRepairValue',
	},
	{
		value: 'Loan-to-Cost',
		label: 'Loan-to-Cost',
	},
	{
		value: 'Property Type',
		label: 'Property Type',
	},
	{
		value: 'Investment Type',
		label: 'Investment Type',
	},
	{
		value: 'Score',
		label: 'Score',
	},
];
export const GroupByDominion = [
	{
		value: 'Property State',
		label: 'Property State',
	},
	{
		value: 'Property Type',
		label: 'Property Type',
	},
	{
		value: 'Account Status',
		label: 'Account Status',
	},
	{
		value: 'Current Principal Balance',
		label: 'Current Principal Balance',
	},
	{
		value: 'Current Interest Rate',
		label: 'Current Interest Rate',
	},
	{
		value: 'Original Term',
		label: 'Original Term',
	},
	{
		value: 'Borrower FICO',
		label: 'Borrower FICO',
	}
];
export const GroupBySprucehill = [
	{
		value: 'Account Status',
		label: 'Account Status',
	},
	{
		value: 'Loan status',
		label: 'Loan status',
	},
	{
		value: 'Lien',
		label: 'Lien',
	},
	{
		value: 'Current Interest Rate',
		label: 'Current Interest Rate',
	},
	{
		value: 'Current Principal Balance',
		label: 'Current Principal Balance',
	}

];
export const GroupByTildene = [
	{
		value: 'Loan Status',
		label: 'Loan Status',
	},
	{
		value: 'Loan Type Name',
		label: 'Loan Type Name',
	},
	{
		value: 'Scheduled Ending Principal Balance',
		label: 'Scheduled Ending Principal Balance',
	},
	{
		value: 'Effective Interest Rate',
		label: 'Effective Interest Rate',
	},
	{
		value: 'Date Last In Arrears',
		label: 'Date Last In Arrears',
	},
	{
		value: 'Remaining Term',
		label: 'Remaining Term',
	},
	{
		value: 'High FICO',
		label: 'High FICO',
	},
	{
		value: 'Loan State',
		label: 'Loan State',
	},
	{
		value: 'Current School Name',
		label: 'Current School Name',
	},

];
export const GroupByRTL1 = [
	{
		value: 'Account Status',
		label: 'Account Status',
	},
	{
		value: 'Maturity Date',
		label: 'Maturity Date',
	},


];
export const GroupByRTL2 = [
	{
		value: 'Loan Purpose',
		label: 'Loan Purpose',
	},
	{
		value: 'Servicer',
		label: 'Servicer',
	},
	{
		value: 'Property Type',
		label: 'Property Type',
	},

	{
		value: 'Account Status',
		label: 'Account Status',
	},
	{
		value: 'Maturity Date',
		label: 'Maturity Date',
	},
	{
		value: 'Net Interest Rate',
		label: 'Net Interest Rate',
	},

	{
		value: 'Current Principal Balance',
		label: 'Current Principal Balance',
	}

];
export const GroupByWL1 = [
	{
		value: 'Account Status',
		label: 'Account Status',
	},
	{
		value: 'Net Interest Rate',
		label: 'Net Interest Rate',
	},
	{
		value: 'Current Principal Balance',
		label: 'Current Principal Balance',
	},
	{
		value: 'Current Maturity Date',
		label: 'Current Maturity Date',
	}

];
export const GroupByStoa = [
	{
		value: 'Account Status',
		label: 'Account Status',
	},
	{
		value: 'Property State',
		label: 'Property State',
	},
	{
		value: 'Current Principal Balance',
		label: 'Current Principal Balance',
	},
	{
		value: 'Current Interest Rate',
		label: 'Current Interest Rate',
	},
	{
		value: 'Loan Term',
		label: 'Loan Term',
	}

];
export const GroupByMF1 = [
	{
		value: 'Account Status',
		label: 'Account Status',
	},
	{
		value: 'Net Interest Rate',
		label: 'Net Interest Rate',
	},
	{
		value: 'Current Principal Balance',
		label: 'Current Principal Balance',
	},
	{
		value: 'Current Maturity Date',
		label: 'Current Maturity Date',
	},
	{
		value: 'Maturity Date',
		label: 'Maturity Date',
	},
	{
		value: 'Current Interest Rate',
		label: 'Current Interest Rate',
	}

];
export const GroupByPalisades = [
	{
		value: 'Account Status',
		label: 'Account Status',
	},
	{
		value: 'Property Type',
		label: 'Property Type',
	},
	{
		value: 'Current Principal Balance',
		label: 'Current Principal Balance',
	},
	{
		value: 'Current Interest Rate',
		label: 'Current Interest Rate',
	},
	{
		value: 'Loan Term',
		label: 'Loan Term',
	},
	{
		value: 'Borrower FICO',
		label: 'Borrower FICO',
	}

];
export const GroupByMFA = [
	{
		value: 'Account Status',
		label: 'Account Status',
	},
	{
		value: 'Net Interest Rate',
		label: 'Net Interest Rate',
	},
	{
		value: 'Current Principal Balance',
		label: 'Current Principal Balance',
	},
	{
		value: 'Remaining Term',
		label: 'Remaining Term',
	},
	{
		value: 'Maturity Date',
		label: 'Maturity Date',
	}

];
export const GroupByPre = [
	{
		value: 'Account Status',
		label: 'Account Status',
	},
	{
		value: 'Net Interest Rate',
		label: 'Net Interest Rate',
	},
	{
		value: 'Current Principal Balance',
		label: 'Current Principal Balance',
	},
	{
		value: 'Current Maturity Date',
		label: 'Current Maturity Date',
	},
	{
		value: 'Maturity Date',
		label: 'Maturity Date',
	},
	{
		value: 'Current Interest Rate',
		label: 'Current Interest Rate',
	}

];
export const GroupBySetpoint = [
	{
		value: 'Account Status',
		label: 'Account Status',
	},
	{
		value: 'Property Type',
		label: 'Property Type',
	},
	{
		value: 'Current Principal Balance',
		label: 'Current Principal Balance',
	},
	{
		value: 'Current Interest Rate',
		label: 'Current Interest Rate',
	}

];

export const GroupByBC2 = [
	{
		value: 'Account Status',
		label: 'Account Status',
	},
	{
		value: 'Net Interest Rate',
		label: 'Net Interest Rate',
	},
	{
		value: 'Current Principal Balance',
		label: 'Current Principal Balance',
	},
	{
		value: 'Current Maturity Date',
		label: 'Current Maturity Date',
	},
	{
		value: 'Maturity Date',
		label: 'Maturity Date',
	},
	{
		value: 'Current Interest Rate',
		label: 'Current Interest Rate',
	},
	{
		value: 'Loan Modification Type',
		label: 'Loan Modification Type',
	}
];



export const GroupByStoa2022 = [
	{
		value: 'Account Status',
		label: 'Account Status',
	},
	{
		value: 'Property State',
		label: 'Property State',
	},
	{
		value: 'Current Principal Balance',
		label: 'Current Principal Balance',
	},
	{
		value: 'Current Interest Rate',
		label: 'Current Interest Rate',
	},
	{
		value: 'Loan Term',
		label: 'Loan Term',
	}

];

export const GroupByBuilders = [
	{
		value: 'Account Status',
		label: 'Account Status',
	},
	{
		value: 'Net Interest Rate',
		label: 'Net Interest Rate',
	},
	{
		value: 'Current Principal Balance',
		label: 'Current Principal Balance',
	},
	{
		value: 'Current Maturity Date',
		label: 'Current Maturity Date',
	},
	{
		value: 'Maturity Date',
		label: 'Maturity Date',
	},
	{
		value: 'Current Interest Rate',
		label: 'Current Interest Rate',
	},
	{
		value: 'Loan Modification Type',
		label: 'Loan Modification Type',
	}
];
export const GroupByNPL = [
	{
		value: 'Account Status',
		label: 'Account Status',
	},
	{
		value: 'Current Principal Balance',
		label: 'Current Principal Balance',
	},
	{
		value: 'Current Interest Rate',
		label: 'Current Interest Rate',
	},
	
];
export const GroupByUnlock = [
	{
		value: 'Starting Home Value',
		label: 'Starting Home Value',
	},
	{
		value: 'Investment PCT',
		label: 'Investment PCT',
	},
	{
		value: 'By Unlock PCT',
		label: 'By Unlock PCT',
	}
];
export const LimaIndexData = [
	{ "title": "Delinquency Status", "order_id": "1", "anchore_link": "delinquencystatus" },
	{ "title": "PIF", "order_id": "1", "anchore_link": "pif" },
	{ "title": "State", "order_id": "1", "anchore_link": "state" },
	{ "title": "Loan Type", "order_id": "1", "anchore_link": "loantype" },
	{ "title": "Current Maturity Date", "order_id": "1", "anchore_link": "currentmaturitydate" },
	{ "title": "Loan Extended", "order_id": "1", "anchore_link": "loanextended" },
	{ "title": "Remaining Term", "order_id": "1", "anchore_link": "remainingterm" },
	{ "title": "Investor Rate", "order_id": "1", "anchore_link": "investorrate" },
	{ "title": "Ending Principle Balance", "order_id": "1", "anchore_link": "endingprincipalbalance" },
	{ "title": "City", "order_id": "1", "anchore_link": "city" },
	{ "title": "Definitions", "order_id": "1", "anchore_link": "definitions" }
]

export const SaludaIndexData = [
	{ "title": "borrower_state", "order_id": "1", "anchore_link": "borrower_state" },
	{ "title": "first_lien", "order_id": "1", "anchore_link": "first_lien" },
	{ "title": "property_state", "order_id": "1", "anchore_link": "property_state" },
	{ "title": "loan_purpose", "order_id": "1", "anchore_link": "loan_purpose" },
	{ "title": "current_rate", "order_id": "1", "anchore_link": "current_rate" },
	{ "title": "principal_balance", "order_id": "1", "anchore_link": "principal_balance" },
	{ "title": "post_loan_cltv", "order_id": "1", "anchore_link": "post_loan_cltv" },
	{ "title": "remaining_term_months", "order_id": "1", "anchore_link": "remaining_term_months" },
	{ "title": "post_loan_dti", "order_id": "1", "anchore_link": "post_loan_dti" },
	{ "title": "fico_score", "order_id": "1", "anchore_link": "fico_score" },
]

export const loanstraitdata = {
	"DealContactInformation": {
		"dealid": "ldeal10",
		"distributiondate": "7/25/2020",
		"reporttype": "Monthly Paying Agent",
		"relationshipmanager": "Devon Almeida",
		"address": "500 Delaware Ave, 11th Floor, Wilmington, DE 19801",
		"email": "dalmeida@wsfsbank.com",
		"websitereporting": "www.wsfsabsreporting.com",
		"addtionalfirst": " ",
		"additionallast": " "
	},
	"DelinquencyStatus": [{
		"Delinquency Status": "0 - 30",
		"Count": 450,
		"$ Aggregate": "79154497.05",
		"% Aggregate": "99.08",
		"$ Average": "175898.88",
		"% Interest Rate": "7.26"
	}, {
		"Delinquency Status": "30 - 60",
		"Count": 3,
		"$ Aggregate": "734917.31",
		"% Aggregate": "0.92",
		"$ Average": "244972.44",
		"% Interest Rate": "8.70"
	}, {
		"Delinquency Status": "Total:",
		"Count": "453",
		"$ Aggregate": "79889414.36",
		"% Aggregate": "100.00",
		"$ Average": "420871.32",
		"% Interest Rate": "15.97"
	}],
	"PIF": [{
		"Loan ID": "107902",
		"Unpaid Principal Balance": "143470",
		"Pre-Modification": "10/04/2021",
		"Post-Modification": "01/04/2021",
		"Modification Type": "Extension"
	}, {
		"Loan ID": "108254",
		"Unpaid Principal Balance": "168021.9",
		"Pre-Modification": "10/04/2021",
		"Post-Modification": "01/04/2021",
		"Modification Type": "Extension"
	}, {
		"Loan ID": "103922",
		"Unpaid Principal Balance": "221177.13",
		"Pre-Modification": "10/12/2020",
		"Post-Modification": "01/12/2020",
		"Modification Type": "Extension"
	}, {
		"Loan ID": "108256",
		"Unpaid Principal Balance": "166221.9",
		"Pre-Modification": "10/04/2021",
		"Post-Modification": "01/04/2021",
		"Modification Type": "Extension"
	}, {
		"Loan ID": "105675",
		"Unpaid Principal Balance": "67600",
		"Pre-Modification": "01/03/2050",
		"Post-Modification": "01/03/2050",
		"Modification Type": "Extension"
	}, {
		"Loan ID": "108332",
		"Unpaid Principal Balance": "108000",
		"Pre-Modification": "10/04/2021",
		"Post-Modification": "01/04/2021",
		"Modification Type": "Extension"
	}, {
		"Loan ID": "50477",
		"Unpaid Principal Balance": "227903",
		"Pre-Modification": "01/08/2018",
		"Post-Modification": "01/05/2020",
		"Modification Type": "Extension"
	}, {
		"Loan ID": "104327",
		"Unpaid Principal Balance": "141350",
		"Pre-Modification": "10/04/2021",
		"Post-Modification": "01/04/2021",
		"Modification Type": "Extension"
	}, {
		"Loan ID": "108443",
		"Unpaid Principal Balance": "74400",
		"Pre-Modification": "10/04/2021",
		"Post-Modification": "01/04/2021",
		"Modification Type": "Extension"
	}, {
		"Loan ID": "108516",
		"Unpaid Principal Balance": "45600",
		"Pre-Modification": "10/05/2021",
		"Post-Modification": "01/05/2021",
		"Modification Type": "Extension"
	}, {
		"Loan ID": "102292",
		"Unpaid Principal Balance": "226000",
		"Pre-Modification": "10/01/2021",
		"Post-Modification": "01/01/2021",
		"Modification Type": "Extension"
	}, {
		"Loan ID": "107898",
		"Unpaid Principal Balance": "121075",
		"Pre-Modification": "10/04/2021",
		"Post-Modification": "01/04/2021",
		"Modification Type": "Extension"
	}, {
		"Loan ID": "108524",
		"Unpaid Principal Balance": "44000",
		"Pre-Modification": "10/05/2021",
		"Post-Modification": "01/05/2021",
		"Modification Type": "Extension"
	}, {
		"Loan ID": "107911",
		"Unpaid Principal Balance": "240000",
		"Pre-Modification": "10/05/2021",
		"Post-Modification": "01/05/2021",
		"Modification Type": "Extension"
	}, {
		"Loan ID": "109043",
		"Unpaid Principal Balance": "158416.52",
		"Pre-Modification": "10/05/2021",
		"Post-Modification": "01/05/2021",
		"Modification Type": "Extension"
	}, {
		"Loan ID": "109035",
		"Unpaid Principal Balance": "169821.9",
		"Pre-Modification": "10/05/2021",
		"Post-Modification": "01/05/2021",
		"Modification Type": "Extension"
	}, {
		"Loan ID": "103055",
		"Unpaid Principal Balance": "48600",
		"Pre-Modification": "10/11/2020",
		"Post-Modification": "01/11/2020",
		"Modification Type": "Extension"
	}, {
		"Loan ID": "107899",
		"Unpaid Principal Balance": "143420",
		"Pre-Modification": "10/04/2021",
		"Post-Modification": "01/04/2021",
		"Modification Type": "Extension"
	}, {
		"Loan ID": "108255",
		"Unpaid Principal Balance": "170721.9",
		"Pre-Modification": "10/04/2021",
		"Post-Modification": "01/04/2021",
		"Modification Type": "Extension"
	}, {
		"Loan ID": "103940",
		"Unpaid Principal Balance": "301387.1",
		"Pre-Modification": "10/12/2020",
		"Post-Modification": "01/12/2020",
		"Modification Type": "Extension"
	}, {
		"Loan ID": "107913",
		"Unpaid Principal Balance": "167000",
		"Pre-Modification": "10/04/2021",
		"Post-Modification": "01/04/2021",
		"Modification Type": "Extension"
	}, {
		"Loan ID": "108886",
		"Unpaid Principal Balance": "78159.2",
		"Pre-Modification": "10/05/2021",
		"Post-Modification": "01/05/2021",
		"Modification Type": "Extension"
	}, {
		"Loan ID": "107900",
		"Unpaid Principal Balance": "143420",
		"Pre-Modification": "10/04/2021",
		"Post-Modification": "01/04/2021",
		"Modification Type": "Extension"
	}, {
		"Loan ID": "108217",
		"Unpaid Principal Balance": "168654.59",
		"Pre-Modification": "10/04/2021",
		"Post-Modification": "01/04/2021",
		"Modification Type": "Extension"
	}, {
		"Loan ID": "108523",
		"Unpaid Principal Balance": "60800",
		"Pre-Modification": "10/05/2021",
		"Post-Modification": "01/05/2021",
		"Modification Type": "Extension"
	}, {
		"Loan ID": "108266",
		"Unpaid Principal Balance": "110201.4",
		"Pre-Modification": "10/04/2021",
		"Post-Modification": "01/04/2021",
		"Modification Type": "Extension"
	}, {
		"Loan ID": "108475",
		"Unpaid Principal Balance": "108675",
		"Pre-Modification": "10/05/2021",
		"Post-Modification": "01/05/2021",
		"Modification Type": "Extension"
	}, {
		"Loan ID": "108528",
		"Unpaid Principal Balance": "58942.4",
		"Pre-Modification": "10/05/2021",
		"Post-Modification": "01/05/2021",
		"Modification Type": "Extension"
	}, {
		"Loan ID": "101707",
		"Unpaid Principal Balance": "196550.77",
		"Pre-Modification": "10/10/2020",
		"Post-Modification": "01/10/2020",
		"Modification Type": "Extension"
	}, {
		"Loan ID": "108358",
		"Unpaid Principal Balance": "184800",
		"Pre-Modification": "10/05/2021",
		"Post-Modification": "01/05/2021",
		"Modification Type": "Extension"
	}, {
		"Loan ID": "107969",
		"Unpaid Principal Balance": "129475",
		"Pre-Modification": "10/04/2021",
		"Post-Modification": "01/04/2021",
		"Modification Type": "Extension"
	}, {
		"Loan ID": "107833",
		"Unpaid Principal Balance": "200000",
		"Pre-Modification": "10/04/2021",
		"Post-Modification": "01/04/2021",
		"Modification Type": "Extension"
	}, {
		"Loan ID": "108025",
		"Unpaid Principal Balance": "129475",
		"Pre-Modification": "10/04/2021",
		"Post-Modification": "01/04/2021",
		"Modification Type": "Extension"
	}],
	"State": [{
		"State": "PA",
		"Count": 43,
		"$ Aggregate": "7426913.47",
		"% Aggregate": "9.30",
		"$ Average": "172718.92",
		"% Interest Rate": "6.97"
	}, {
		"State": "MO",
		"Count": 9,
		"$ Aggregate": "816407.63",
		"% Aggregate": "1.02",
		"$ Average": "90711.96",
		"% Interest Rate": "7.21"
	}, {
		"State": "NC",
		"Count": 26,
		"$ Aggregate": "5368344.10",
		"% Aggregate": "6.72",
		"$ Average": "206474.77",
		"% Interest Rate": "6.54"
	}, {
		"State": "IN",
		"Count": 33,
		"$ Aggregate": "3177133.84",
		"% Aggregate": "3.98",
		"$ Average": "96276.78",
		"% Interest Rate": "7.56"
	}, {
		"State": "OH",
		"Count": 44,
		"$ Aggregate": "4468670.81",
		"% Aggregate": "5.59",
		"$ Average": "101560.70",
		"% Interest Rate": "8.01"
	}, {
		"State": "WA",
		"Count": 1,
		"$ Aggregate": "243308.09",
		"% Aggregate": "0.30",
		"$ Average": "243308.09",
		"% Interest Rate": "6.00"
	}, {
		"State": "MI",
		"Count": 15,
		"$ Aggregate": "2759173.46",
		"% Aggregate": "3.45",
		"$ Average": "183944.90",
		"% Interest Rate": "6.60"
	}, {
		"State": "IL",
		"Count": 29,
		"$ Aggregate": "3831579.72",
		"% Aggregate": "4.80",
		"$ Average": "132123.44",
		"% Interest Rate": "9.04"
	}, {
		"State": "SC",
		"Count": 28,
		"$ Aggregate": "6776012.59",
		"% Aggregate": "8.48",
		"$ Average": "242000.45",
		"% Interest Rate": "6.44"
	}, {
		"State": "TX",
		"Count": 14,
		"$ Aggregate": "1737258.36",
		"% Aggregate": "2.17",
		"$ Average": "124089.88",
		"% Interest Rate": "8.58"
	}, {
		"State": "NY",
		"Count": 8,
		"$ Aggregate": "903081.55",
		"% Aggregate": "1.13",
		"$ Average": "112885.19",
		"% Interest Rate": "8.18"
	}, {
		"State": "FL",
		"Count": 63,
		"$ Aggregate": "8809497.90",
		"% Aggregate": "11.03",
		"$ Average": "139833.30",
		"% Interest Rate": "7.67"
	}, {
		"State": "MD",
		"Count": 32,
		"$ Aggregate": "7041022.67",
		"% Aggregate": "8.81",
		"$ Average": "220031.96",
		"% Interest Rate": "6.15"
	}, {
		"State": "NJ",
		"Count": 23,
		"$ Aggregate": "3482691.79",
		"% Aggregate": "4.36",
		"$ Average": "151421.38",
		"% Interest Rate": "8.10"
	}, {
		"State": "AR",
		"Count": 1,
		"$ Aggregate": "41818.50",
		"% Aggregate": "0.05",
		"$ Average": "41818.50",
		"% Interest Rate": "10.00"
	}, {
		"State": "VA",
		"Count": 14,
		"$ Aggregate": "1661579.85",
		"% Aggregate": "2.08",
		"$ Average": "118684.28",
		"% Interest Rate": "8.98"
	}, {
		"State": "MS",
		"Count": 4,
		"$ Aggregate": "394531.33",
		"% Aggregate": "0.49",
		"$ Average": "98632.83",
		"% Interest Rate": "6.12"
	}, {
		"State": "GA",
		"Count": 41,
		"$ Aggregate": "8366120.91",
		"% Aggregate": "10.47",
		"$ Average": "204051.73",
		"% Interest Rate": "7.31"
	}, {
		"State": "CA",
		"Count": 6,
		"$ Aggregate": "2250806.27",
		"% Aggregate": "2.82",
		"$ Average": "375134.38",
		"% Interest Rate": "7.27"
	}, {
		"State": "NM",
		"Count": 2,
		"$ Aggregate": "219134.32",
		"% Aggregate": "0.27",
		"$ Average": "109567.16",
		"% Interest Rate": "11.27"
	}, {
		"State": "TN",
		"Count": 7,
		"$ Aggregate": "1952859.13",
		"% Aggregate": "2.44",
		"$ Average": "278979.88",
		"% Interest Rate": "5.86"
	}, {
		"State": "N",
		"Count": 5,
		"$ Aggregate": "508554.00",
		"% Aggregate": "0.64",
		"$ Average": "101710.80",
		"% Interest Rate": "9.12"
	}, {
		"State": "DC",
		"Count": 2,
		"$ Aggregate": "1510425.00",
		"% Aggregate": "1.89",
		"$ Average": "755212.50",
		"% Interest Rate": "6.85"
	}, {
		"State": "CT",
		"Count": 2,
		"$ Aggregate": "210741.97",
		"% Aggregate": "0.26",
		"$ Average": "105370.99",
		"% Interest Rate": "8.74"
	}, {
		"State": "KY",
		"Count": 2,
		"$ Aggregate": "150788.36",
		"% Aggregate": "0.19",
		"$ Average": "75394.18",
		"% Interest Rate": "8.17"
	}, {
		"State": "us",
		"Count": 1,
		"$ Aggregate": "255710.74",
		"% Aggregate": "0.32",
		"$ Average": "255710.74",
		"% Interest Rate": "4.75"
	}, {
		"State": "OK",
		"Count": 3,
		"$ Aggregate": "299787.18",
		"% Aggregate": "0.38",
		"$ Average": "99929.06",
		"% Interest Rate": "10.08"
	}, {
		"State": "WI",
		"Count": 7,
		"$ Aggregate": "377064.96",
		"% Aggregate": "0.47",
		"$ Average": "53866.42",
		"% Interest Rate": "8.06"
	}, {
		"State": "LA",
		"Count": 5,
		"$ Aggregate": "467474.88",
		"% Aggregate": "0.59",
		"$ Average": "93494.98",
		"% Interest Rate": "9.43"
	}, {
		"State": "an",
		"Count": 1,
		"$ Aggregate": "943580.00",
		"% Aggregate": "1.18",
		"$ Average": "943580.00",
		"% Interest Rate": "6.50"
	}, {
		"State": "AL",
		"Count": 4,
		"$ Aggregate": "656392.50",
		"% Aggregate": "0.82",
		"$ Average": "164098.13",
		"% Interest Rate": "9.35"
	}, {
		"State": "AZ",
		"Count": 2,
		"$ Aggregate": "334645.91",
		"% Aggregate": "0.42",
		"$ Average": "167322.96",
		"% Interest Rate": "6.74"
	}, {
		"State": "DE",
		"Count": 3,
		"$ Aggregate": "315727.62",
		"% Aggregate": "0.40",
		"$ Average": "105242.54",
		"% Interest Rate": "7.17"
	}, {
		"State": "MN",
		"Count": 2,
		"$ Aggregate": "374319.24",
		"% Aggregate": "0.47",
		"$ Average": "187159.62",
		"% Interest Rate": "6.68"
	},
	{
		"State": "NV",
		"Count": 1,
		"$ Aggregate": "1597000.00",
		"% Aggregate": "2.00",
		"$ Average": "1597000.00",
		"% Interest Rate": "6.25"
	}, {
		"State": "KS",
		"Count": 2,
		"$ Aggregate": "100000.00",
		"% Aggregate": "0.13",
		"$ Average": "50000.00",
		"% Interest Rate": "8.25"
	}, {
		"State": "IA",
		"Count": 1,
		"$ Aggregate": "59255.71",
		"% Aggregate": "0.07",
		"$ Average": "59255.71",
		"% Interest Rate": "6.55"
	}, {
		"State": "Total:",
		"Count": "486",
		"$ Aggregate": "79889414.36",
		"% Aggregate": "100.00",
		"$ Average": "8258599.11",
		"% Interest Rate": "282.58"
	}],
	"LoanType": [{
		"Loan Type": "Fully Escrow",
		"Count": 101,
		"$ Aggregate": "13581310.34",
		"% Aggregate": "17.00",
		"$ Average": "134468.42",
		"% Interest Rate": "10.37"
	}, {
		"Loan Type": "Fixed R30",
		"Count": 71,
		"$ Aggregate": "8862400.46",
		"% Aggregate": "11.09",
		"$ Average": "124822.54",
		"% Interest Rate": "6.16"
	}, {
		"Loan Type": "5/1 R30",
		"Count": 52,
		"$ Aggregate": "7090002.52",
		"% Aggregate": "8.87",
		"$ Average": "136346.20",
		"% Interest Rate": "5.60"
	}, {
		"Loan Type": "10/1 R30",
		"Count": 25,
		"$ Aggregate": "4269438.67",
		"% Aggregate": "5.34",
		"$ Average": "170777.55",
		"% Interest Rate": "5.80"
	}, {
		"Loan Type": "Commit NF",
		"Count": 77,
		"$ Aggregate": "11414969.82",
		"% Aggregate": "14.29",
		"$ Average": "148246.36",
		"% Interest Rate": "8.10"
	}, {
		"Loan Type": "Commit NC NF",
		"Count": 65,
		"$ Aggregate": "5485351.84",
		"% Aggregate": "6.87",
		"$ Average": "84390.03",
		"% Interest Rate": "8.40"
	}, {
		"Loan Type": "Bridge+ PO",
		"Count": 47,
		"$ Aggregate": "4896753.90",
		"% Aggregate": "6.13",
		"$ Average": "104186.25",
		"% Interest Rate": "7.70"
	}, {
		"Loan Type": "FNF Cash Out",
		"Count": 5,
		"$ Aggregate": "150000.00",
		"% Aggregate": "0.19",
		"$ Average": "30000.00",
		"% Interest Rate": "8.18"
	}, {
		"Loan Type": "F2R Commit NF",
		"Count": 5,
		"$ Aggregate": "298041.50",
		"% Aggregate": "0.37",
		"$ Average": "59608.30",
		"% Interest Rate": "9.06"
	}, {
		"Loan Type": "Commit",
		"Count": 3,
		"$ Aggregate": "971826.50",
		"% Aggregate": "1.22",
		"$ Average": "323942.17",
		"% Interest Rate": "8.10"
	}, {
		"Loan Type": "2+1",
		"Count": 12,
		"$ Aggregate": "2166600.00",
		"% Aggregate": "2.71",
		"$ Average": "180550.00",
		"% Interest Rate": "7.74"
	}, {
		"Loan Type": "Fixed R30 Prem",
		"Count": 11,
		"$ Aggregate": "15128286.32",
		"% Aggregate": "18.94",
		"$ Average": "1375298.76",
		"% Interest Rate": "5.00"
	}, {
		"Loan Type": "Fully Escrow NC",
		"Count": 5,
		"$ Aggregate": "1258782.18",
		"% Aggregate": "1.58",
		"$ Average": "251756.44",
		"% Interest Rate": "10.43"
	}, {
		"Loan Type": "Commit MF NF",
		"Count": 3,
		"$ Aggregate": "3893407.77",
		"% Aggregate": "4.87",
		"$ Average": "1297802.59",
		"% Interest Rate": "6.49"
	}, {
		"Loan Type": "F2R Fixed R30",
		"Count": 2,
		"$ Aggregate": "181078.54",
		"% Aggregate": "0.23",
		"$ Average": "90539.27",
		"% Interest Rate": "6.35"
	}, {
		"Loan Type": "F2R 10/1 R30",
		"Count": 1,
		"$ Aggregate": "108509.48",
		"% Aggregate": "0.14",
		"$ Average": "108509.48",
		"% Interest Rate": "5.28"
	}, {
		"Loan Type": "CRL Fixed R30",
		"Count": 1,
		"$ Aggregate": "132654.52",
		"% Aggregate": "0.17",
		"$ Average": "132654.52",
		"% Interest Rate": "6.25"
	}, {
		"Loan Type": "Total:",
		"Count": "486",
		"$ Aggregate": "79889414.36",
		"% Aggregate": "100.00",
		"$ Average": "4753898.88",
		"% Interest Rate": "125.00"
	}],
	"CurrentMaturityDate": [{
		"Current Maturity Date": 2021,
		"Count": 263,
		"$ Aggregate": "30948232.92",
		"% Aggregate": "38.74",
		"$ Average": "117673.89",
		"% Interest Rate": "8.75"
	}, {
		"Current Maturity Date": 2050,
		"Count": 158,
		"$ Aggregate": "33689870.11",
		"% Aggregate": "42.17",
		"$ Average": "213227.03",
		"% Interest Rate": "5.51"
	}, {
		"Current Maturity Date": 2020,
		"Count": 49,
		"$ Aggregate": "7576074.06",
		"% Aggregate": "9.48",
		"$ Average": "154613.76",
		"% Interest Rate": "9.82"
	}, {
		"Current Maturity Date": 2022,
		"Count": 14,
		"$ Aggregate": "5927707.77",
		"% Aggregate": "7.42",
		"$ Average": "423407.70",
		"% Interest Rate": "6.88"
	}, {
		"Current Maturity Date": 2019,
		"Count": 1,
		"$ Aggregate": "89995.50",
		"% Aggregate": "0.11",
		"$ Average": "89995.50",
		"% Interest Rate": "10.50"
	}, {
		"Current Maturity Date": 2030,
		"Count": 1,
		"$ Aggregate": "1657534.00",
		"% Aggregate": "2.07",
		"$ Average": "1657534.00",
		"% Interest Rate": "5.50"
	}, {
		"Current Maturity Date": "Total:",
		"Count": "486",
		"$ Aggregate": "79889414.36",
		"% Aggregate": "100.00",
		"$ Average": "2656451.88",
		"% Interest Rate": "46.95"
	}],
	"LoanExtended": [{
		"Loan Extended": "No",
		"Count": 379,
		"$ Aggregate": "48218421.81",
		"% Aggregate": "60.36",
		"$ Average": "127225.39",
		"% Interest Rate": "8.13"
	}, {
		"Loan Extended": "Yes",
		"Count": 107,
		"$ Aggregate": "31670992.55",
		"% Aggregate": "39.64",
		"$ Average": "295990.58",
		"% Interest Rate": "5.98"
	}, {
		"Loan Extended": "Total:",
		"Count": "486",
		"$ Aggregate": "79889414.36",
		"% Aggregate": "100.00",
		"$ Average": "423215.97",
		"% Interest Rate": "14.11"
	}],
	"RemainingTerm": [{
		"Remaining Term months": "< 0",
		"Count": 5,
		"$ Aggregate": "862008.75",
		"% Aggregate": "1.08",
		"$ Average": "172401.75",
		"% Interest Rate": "10.00"
	}, {
		"Remaining Term months": "0 - 100",
		"Count": 323,
		"$ Aggregate": "43680001.50",
		"% Aggregate": "54.68",
		"$ Average": "135232.20",
		"% Interest Rate": "8.66"
	}, {
		"Remaining Term months": "100 - 200",
		"Count": 1,
		"$ Aggregate": "1657534.00",
		"% Aggregate": "2.07",
		"$ Average": "1657534.00",
		"% Interest Rate": "5.50"
	}, {
		"Remaining Term months": "300 - 400",
		"Count": 157,
		"$ Aggregate": "33689870.11",
		"% Aggregate": "42.17",
		"$ Average": "214585.16",
		"% Interest Rate": "5.51"
	}, {
		"Remaining Term months": "Total:",
		"Count": "486",
		"$ Aggregate": "79889414.36",
		"% Aggregate": "100.00",
		"$ Average": "2179753.11",
		"% Interest Rate": "29.67"
	}],
	"InvestorRate": [{
		"Investor Rate": "0 - 10",
		"Count": 486,
		"$ Aggregate": "79889414.36",
		"% Aggregate": "100.00",
		"$ Average": "164381.51",
		"% Interest Rate": "7.28"
	}, {
		"Investor Rate": "Total:",
		"Count": "486",
		"$ Aggregate": "79889414.36",
		"% Aggregate": "100.00",
		"$ Average": "164381.51",
		"% Interest Rate": "7.28"
	}],
	"EndingPrincipalBalance": [{
		"Ending Principal Balance": "< 0",
		"Count": 9,
		"$ Aggregate": "-133187.65",
		"% Aggregate": "0.17",
		"$ Average": "-14798.63",
		"% Interest Rate": "8.22"
	}, {
		"Ending Principal Balance": "0 - 10000",
		"Count": 39,
		"$ Aggregate": "36243.69",
		"% Aggregate": "0.05",
		"$ Average": "929.33",
		"% Interest Rate": "8.50"
	}, {
		"Ending Principal Balance": "10000 - 50000",
		"Count": 26,
		"$ Aggregate": "983145.48",
		"% Aggregate": "1.23",
		"$ Average": "37813.29",
		"% Interest Rate": "8.60"
	}, {
		"Ending Principal Balance": "50000 - 100000",
		"Count": 156,
		"$ Aggregate": "11608127.03",
		"% Aggregate": "14.53",
		"$ Average": "74411.07",
		"% Interest Rate": "7.89"
	}, {
		"Ending Principal Balance": "100000 - 500000",
		"Count": 235,
		"$ Aggregate": "42143326.10",
		"% Aggregate": "52.75",
		"$ Average": "179333.30",
		"% Interest Rate": "7.95"
	}, {
		"Ending Principal Balance": "500000 - 1000000",
		"Count": 12,
		"$ Aggregate": "8507424.19",
		"% Aggregate": "10.65",
		"$ Average": "708952.02",
		"% Interest Rate": "6.78"
	}, {
		"Ending Principal Balance": "1000000 +",
		"Count": 9,
		"$ Aggregate": "16744335.52",
		"% Aggregate": "20.96",
		"$ Average": "1860481.72",
		"% Interest Rate": "5.35"
	}, {
		"Ending Principal Balance": "Total:",
		"Count": "486",
		"$ Aggregate": "79889414.36",
		"% Aggregate": "100.00",
		"$ Average": "2847122.10",
		"% Interest Rate": "53.28"
	}],
	"City": [{
		"City": "Philadelphia",
		"Count": 29,
		"$ Aggregate": "5527294.15",
		"% Aggregate": "6.92",
		"$ Average": "190596.35",
		"% Interest Rate": "6.74"
	}, {
		"City": "Belton",
		"Count": 1,
		"$ Aggregate": "61216.01",
		"% Aggregate": "0.08",
		"$ Average": "61216.01",
		"% Interest Rate": "5.80"
	}, {
		"City": "Dallas",
		"Count": 2,
		"$ Aggregate": "530720.50",
		"% Aggregate": "0.66",
		"$ Average": "265360.25",
		"% Interest Rate": "7.24"
	}, {
		"City": "Anderson",
		"Count": 2,
		"$ Aggregate": "189530.22",
		"% Aggregate": "0.24",
		"$ Average": "94765.11",
		"% Interest Rate": "9.77"
	}, {
		"City": "Bedford",
		"Count": 1,
		"$ Aggregate": "61444.62",
		"% Aggregate": "0.08",
		"$ Average": "61444.62",
		"% Interest Rate": "6.38"
	}, {
		"City": "Bremerton",
		"Count": 1,
		"$ Aggregate": "243308.09",
		"% Aggregate": "0.30",
		"$ Average": "243308.09",
		"% Interest Rate": "6.00"
	}, {
		"City": "Cleveland Heights",
		"Count": 1,
		"$ Aggregate": "131629.50",
		"% Aggregate": "0.16",
		"$ Average": "131629.50",
		"% Interest Rate": "10.00"
	}, {
		"City": "Pontiac",
		"Count": 2,
		"$ Aggregate": "262713.98",
		"% Aggregate": "0.33",
		"$ Average": "131356.99",
		"% Interest Rate": "6.39"
	}, {
		"City": "Columbus",
		"Count": 22,
		"$ Aggregate": "1865344.72",
		"% Aggregate": "2.33",
		"$ Average": "84788.40",
		"% Interest Rate": "7.94"
	}, {
		"City": "Chicago",
		"Count": 19,
		"$ Aggregate": "2659461.71",
		"% Aggregate": "3.33",
		"$ Average": "139971.67",
		"% Interest Rate": "9.17"
	}, {
		"City": "Inman",
		"Count": 2,
		"$ Aggregate": "0.00",
		"% Aggregate": "0.00",
		"$ Average": "0.00",
		"% Interest Rate": "0.00"
	}, {
		"City": "North Charleston",
		"Count": 1,
		"$ Aggregate": "90225.00",
		"% Aggregate": "0.11",
		"$ Average": "90225.00",
		"% Interest Rate": "10.00"
	}, {
		"City": "Fairborn",
		"Count": 2,
		"$ Aggregate": "135167.48",
		"% Aggregate": "0.17",
		"$ Average": "67583.74",
		"% Interest Rate": "8.20"
	}, {
		"City": "South Bend",
		"Count": 2,
		"$ Aggregate": "158608.10",
		"% Aggregate": "0.20",
		"$ Average": "79304.05",
		"% Interest Rate": "5.92"
	}, {
		"City": "Angleton",
		"Count": 1,
		"$ Aggregate": "142787.99",
		"% Aggregate": "0.18",
		"$ Average": "142787.99",
		"% Interest Rate": "10.00"
	}, {
		"City": "Peekskill",
		"Count": 1,
		"$ Aggregate": "267996.89",
		"% Aggregate": "0.34",
		"$ Average": "267996.89",
		"% Interest Rate": "6.38"
	}, {
		"City": "Kiamesha Lake",
		"Count": 1,
		"$ Aggregate": "128216.70",
		"% Aggregate": "0.16",
		"$ Average": "128216.70",
		"% Interest Rate": "10.00"
	}, {
		"City": "Palm Bay",
		"Count": 7,
		"$ Aggregate": "189701.00",
		"% Aggregate": "0.24",
		"$ Average": "27100.14",
		"% Interest Rate": "8.49"
	}, {
		"City": "Fort Myers",
		"Count": 6,
		"$ Aggregate": "806193.00",
		"% Aggregate": "1.01",
		"$ Average": "134365.50",
		"% Interest Rate": "8.43"
	}, {
		"City": "VERO BEACH",
		"Count": 1,
		"$ Aggregate": "284000.00",
		"% Aggregate": "0.36",
		"$ Average": "284000.00",
		"% Interest Rate": "6.38"
	}, {
		"City": "Baltimore",
		"Count": 28,
		"$ Aggregate": "4706468.00",
		"% Aggregate": "5.89",
		"$ Average": "168088.14",
		"% Interest Rate": "6.42"
	}, {
		"City": "Woodbury",
		"Count": 1,
		"$ Aggregate": "66298.37",
		"% Aggregate": "0.08",
		"$ Average": "66298.37",
		"% Interest Rate": "5.43"
	}, {
		"City": "Jacksonville",
		"Count": 5,
		"$ Aggregate": "583822.07",
		"% Aggregate": "0.73",
		"$ Average": "116764.41",
		"% Interest Rate": "7.68"
	}, {
		"City": "Raleigh",
		"Count": 2,
		"$ Aggregate": "462213.84",
		"% Aggregate": "0.58",
		"$ Average": "231106.92",
		"% Interest Rate": "6.18"
	}, {
		"City": "Indianapolis",
		"Count": 19,
		"$ Aggregate": "1667679.92",
		"% Aggregate": "2.09",
		"$ Average": "87772.63",
		"% Interest Rate": "7.76"
	}, {
		"City": "Petersburg",
		"Count": 1,
		"$ Aggregate": "93798.80",
		"% Aggregate": "0.12",
		"$ Average": "93798.80",
		"% Interest Rate": "10.00"
	}, {
		"City": "Jackson",
		"Count": 1,
		"$ Aggregate": "82186.93",
		"% Aggregate": "0.10",
		"$ Average": "82186.93",
		"% Interest Rate": "6.95"
	}, {
		"City": "Euclid",
		"Count": 1,
		"$ Aggregate": "180364.46",
		"% Aggregate": "0.23",
		"$ Average": "180364.46",
		"% Interest Rate": "5.15"
	}, {
		"City": "Toledo",
		"Count": 1,
		"$ Aggregate": "63632.17",
		"% Aggregate": "0.08",
		"$ Average": "63632.17",
		"% Interest Rate": "5.90"
	}, {
		"City": "Picatinny Arsenal",
		"Count": 1,
		"$ Aggregate": "775050.00",
		"% Aggregate": "0.97",
		"$ Average": "775050.00",
		"% Interest Rate": "8.25"
	}, {
		"City": "Cordova",
		"Count": 2,
		"$ Aggregate": "121948.29",
		"% Aggregate": "0.15",
		"$ Average": "60974.14",
		"% Interest Rate": "7.46"
	}, {
		"City": "Cayce",
		"Count": 1,
		"$ Aggregate": "87345.00",
		"% Aggregate": "0.11",
		"$ Average": "87345.00",
		"% Interest Rate": "10.00"
	}, {
		"City": "Newark",
		"Count": 3,
		"$ Aggregate": "497160.97",
		"% Aggregate": "0.62",
		"$ Average": "165720.32",
		"% Interest Rate": "8.83"
	}, {
		"City": "Port St. Lucie",
		"Count": 6,
		"$ Aggregate": "269275.50",
		"% Aggregate": "0.34",
		"$ Average": "44879.25",
		"% Interest Rate": "8.25"
	}, {
		"City": "Lansing",
		"Count": 1,
		"$ Aggregate": "266235.10",
		"% Aggregate": "0.33",
		"$ Average": "266235.10",
		"% Interest Rate": "5.67"
	}, {
		"City": "Tinley Park",
		"Count": 1,
		"$ Aggregate": "52391.46",
		"% Aggregate": "0.07",
		"$ Average": "52391.46",
		"% Interest Rate": "7.40"
	}, {
		"City": "Akron",
		"Count": 2,
		"$ Aggregate": "314124.51",
		"% Aggregate": "0.39",
		"$ Average": "157062.26",
		"% Interest Rate": "9.03"
	}, {
		"City": "East Dublin",
		"Count": 1,
		"$ Aggregate": "46399.50",
		"% Aggregate": "0.06",
		"$ Average": "46399.50",
		"% Interest Rate": "8.75"
	}, {
		"City": "Hampton",
		"Count": 1,
		"$ Aggregate": "146998.75",
		"% Aggregate": "0.18",
		"$ Average": "146998.75",
		"% Interest Rate": "10.00"
	}, {
		"City": "Alpharetta",
		"Count": 2,
		"$ Aggregate": "1135523.86",
		"% Aggregate": "1.42",
		"$ Average": "567761.93",
		"% Interest Rate": "9.68"
	}, {
		"City": "Dolton",
		"Count": 1,
		"$ Aggregate": "56920.00",
		"% Aggregate": "0.07",
		"$ Average": "56920.00",
		"% Interest Rate": "8.25"
	}, {
		"City": "Atlanta",
		"Count": 13,
		"$ Aggregate": "2740914.54",
		"% Aggregate": "3.43",
		"$ Average": "210839.58",
		"% Interest Rate": "7.29"
	}, {
		"City": "Hammond",
		"Count": 3,
		"$ Aggregate": "246572.71",
		"% Aggregate": "0.31",
		"$ Average": "82190.90",
		"% Interest Rate": "9.28"
	}, {
		"City": "San Jose",
		"Count": 1,
		"$ Aggregate": "1012000.00",
		"% Aggregate": "1.27",
		"$ Average": "1012000.00",
		"% Interest Rate": "6.50"
	}, {
		"City": "Williamsport",
		"Count": 1,
		"$ Aggregate": "89534.00",
		"% Aggregate": "0.11",
		"$ Average": "89534.00",
		"% Interest Rate": "9.00"
	}, {
		"City": "Owings Mills",
		"Count": 1,
		"$ Aggregate": "120800.00",
		"% Aggregate": "0.15",
		"$ Average": "120800.00",
		"% Interest Rate": "7.50"
	}, {
		"City": "Scranton",
		"Count": 4,
		"$ Aggregate": "323763.10",
		"% Aggregate": "0.41",
		"$ Average": "80940.77",
		"% Interest Rate": "7.99"
	}, {
		"City": "College Park",
		"Count": 2,
		"$ Aggregate": "492295.01",
		"% Aggregate": "0.62",
		"$ Average": "246147.51",
		"% Interest Rate": "7.28"
	}, {
		"City": "Schwenksville",
		"Count": 1,
		"$ Aggregate": "121193.90",
		"% Aggregate": "0.15",
		"$ Average": "121193.90",
		"% Interest Rate": "7.50"
	}, {
		"City": "Rio Rancho",
		"Count": 1,
		"$ Aggregate": "117648.50",
		"% Aggregate": "0.15",
		"$ Average": "117648.50",
		"% Interest Rate": "11.50"
	}, {
		"City": "Millington",
		"Count": 1,
		"$ Aggregate": "55841.31",
		"% Aggregate": "0.07",
		"$ Average": "55841.31",
		"% Interest Rate": "5.80"
	}, {
		"City": "Memphis",
		"Count": 3,
		"$ Aggregate": "1577820.78",
		"% Aggregate": "1.98",
		"$ Average": "525940.26",
		"% Interest Rate": "5.60"
	}, {
		"City": "Killeen",
		"Count": 3,
		"$ Aggregate": "332073.46",
		"% Aggregate": "0.42",
		"$ Average": "110691.15",
		"% Interest Rate": "7.75"
	}, {
		"City": "Charlotte",
		"Count": 7,
		"$ Aggregate": "883641.23",
		"% Aggregate": "1.11",
		"$ Average": "126234.46",
		"% Interest Rate": "7.60"
	}, {
		"City": "Orange City",
		"Count": 1,
		"$ Aggregate": "69200.00",
		"% Aggregate": "0.09",
		"$ Average": "69200.00",
		"% Interest Rate": "7.50"
	}, {
		"City": "Los Angeles",
		"Count": 1,
		"$ Aggregate": "430541.90",
		"% Aggregate": "0.54",
		"$ Average": "430541.90",
		"% Interest Rate": "8.50"
	}, {
		"City": "Wyoming",
		"Count": 1,
		"$ Aggregate": "102560.07",
		"% Aggregate": "0.13",
		"$ Average": "102560.07",
		"% Interest Rate": "5.90"
	}, {
		"City": "Deltona",
		"Count": 4,
		"$ Aggregate": "400638.53",
		"% Aggregate": "0.50",
		"$ Average": "100159.63",
		"% Interest Rate": "7.26"
	}, {
		"City": "Manahawkin",
		"Count": 3,
		"$ Aggregate": "179154.00",
		"% Aggregate": "0.22",
		"$ Average": "59718.00",
		"% Interest Rate": "10.49"
	}, {
		"City": "Richmond",
		"Count": 3,
		"$ Aggregate": "351834.21",
		"% Aggregate": "0.44",
		"$ Average": "117278.07",
		"% Interest Rate": "9.17"
	}, {
		"City": "Washington",
		"Count": 2,
		"$ Aggregate": "1510425.00",
		"% Aggregate": "1.89",
		"$ Average": "755212.50",
		"% Interest Rate": "6.85"
	}, {
		"City": "Port Saint Lucie",
		"Count": 6,
		"$ Aggregate": "240869.83",
		"% Aggregate": "0.30",
		"$ Average": "40144.97",
		"% Interest Rate": "8.25"
	}, {
		"City": "Logan Township",
		"Count": 1,
		"$ Aggregate": "139523.25",
		"% Aggregate": "0.17",
		"$ Average": "139523.25",
		"% Interest Rate": "9.25"
	}, {
		"City": "Saint Louis",
		"Count": 4,
		"$ Aggregate": "228187.97",
		"% Aggregate": "0.29",
		"$ Average": "57046.99",
		"% Interest Rate": "8.03"
	}, {
		"City": "Long Key",
		"Count": 1,
		"$ Aggregate": "374895.00",
		"% Aggregate": "0.47",
		"$ Average": "374895.00",
		"% Interest Rate": "10.00"
	}, {
		"City": "Beverly Hills",
		"Count": 1,
		"$ Aggregate": "0.00",
		"% Aggregate": "0.00",
		"$ Average": "0.00",
		"% Interest Rate": "0.00"
	}, {
		"City": "Ashville",
		"Count": 1,
		"$ Aggregate": "136492.13",
		"% Aggregate": "0.17",
		"$ Average": "136492.13",
		"% Interest Rate": "10.00"
	}, {
		"City": "Tucker",
		"Count": 1,
		"$ Aggregate": "189937.97",
		"% Aggregate": "0.24",
		"$ Average": "189937.97",
		"% Interest Rate": "8.75"
	}, {
		"City": "Boiling Springs",
		"Count": 3,
		"$ Aggregate": "129475.01",
		"% Aggregate": "0.16",
		"$ Average": "43158.34",
		"% Interest Rate": "7.50"
	}, {
		"City": "Trenton",
		"Count": 1,
		"$ Aggregate": "59392.13",
		"% Aggregate": "0.07",
		"$ Average": "59392.13",
		"% Interest Rate": "6.00"
	}, {
		"City": "Cape Coral",
		"Count": 2,
		"$ Aggregate": "265750.99",
		"% Aggregate": "0.33",
		"$ Average": "132875.49",
		"% Interest Rate": "10.22"
	}, {
		"City": "Fort Washington",
		"Count": 1,
		"$ Aggregate": "186822.77",
		"% Aggregate": "0.23",
		"$ Average": "186822.77",
		"% Interest Rate": "5.45"
	}, {
		"City": "Detroit",
		"Count": 4,
		"$ Aggregate": "1055710.58",
		"% Aggregate": "1.32",
		"$ Average": "263927.65",
		"% Interest Rate": "6.02"
	}, {
		"City": "Dayton",
		"Count": 2,
		"$ Aggregate": "235748.81",
		"% Aggregate": "0.30",
		"$ Average": "117874.40",
		"% Interest Rate": "5.29"
	}, {
		"City": "Bridgeport",
		"Count": 1,
		"$ Aggregate": "116250.00",
		"% Aggregate": "0.15",
		"$ Average": "116250.00",
		"% Interest Rate": "6.91"
	}, {
		"City": "Fort Wayne",
		"Count": 1,
		"$ Aggregate": "72135.00",
		"% Aggregate": "0.09",
		"$ Average": "72135.00",
		"% Interest Rate": "10.00"
	}, {
		"City": "Imperial",
		"Count": 1,
		"$ Aggregate": "117557.40",
		"% Aggregate": "0.15",
		"$ Average": "117557.40",
		"% Interest Rate": "10.00"
	}, {
		"City": "Pennsauken",
		"Count": 1,
		"$ Aggregate": "128945.00",
		"% Aggregate": "0.16",
		"$ Average": "128945.00",
		"% Interest Rate": "11.00"
	}, {
		"City": "Conover",
		"Count": 1,
		"$ Aggregate": "78366.51",
		"% Aggregate": "0.10",
		"$ Average": "78366.51",
		"% Interest Rate": "7.75"
	}, {
		"City": "Excelsior Springs",
		"Count": 1,
		"$ Aggregate": "64589.02",
		"% Aggregate": "0.08",
		"$ Average": "64589.02",
		"% Interest Rate": "5.08"
	}, {
		"City": "Carnegie",
		"Count": 1,
		"$ Aggregate": "67697.68",
		"% Aggregate": "0.08",
		"$ Average": "67697.68",
		"% Interest Rate": "6.38"
	}, {
		"City": "Fort Walton Beach",
		"Count": 1,
		"$ Aggregate": "835209.66",
		"% Aggregate": "1.05",
		"$ Average": "835209.66",
		"% Interest Rate": "4.95"
	}, {
		"City": "Pensacola",
		"Count": 1,
		"$ Aggregate": "80097.97",
		"% Aggregate": "0.10",
		"$ Average": "80097.97",
		"% Interest Rate": "5.42"
	}, {
		"City": "Mesquite",
		"Count": 1,
		"$ Aggregate": "110227.35",
		"% Aggregate": "0.14",
		"$ Average": "110227.35",
		"% Interest Rate": "4.37"
	}, {
		"City": "Destin",
		"Count": 1,
		"$ Aggregate": "167200.00",
		"% Aggregate": "0.21",
		"$ Average": "167200.00",
		"% Interest Rate": "7.50"
	}, {
		"City": "Louisville",
		"Count": 3,
		"$ Aggregate": "342788.36",
		"% Aggregate": "0.43",
		"$ Average": "114262.79",
		"% Interest Rate": "8.49"
	}, {
		"City": "Titusville",
		"Count": 1,
		"$ Aggregate": "104390.00",
		"% Aggregate": "0.13",
		"$ Average": "104390.00",
		"% Interest Rate": "8.75"
	}, {
		"City": "Houston",
		"Count": 2,
		"$ Aggregate": "421151.98",
		"% Aggregate": "0.53",
		"$ Average": "210575.99",
		"% Interest Rate": "9.43"
	}, {
		"City": "Augusta",
		"Count": 1,
		"$ Aggregate": "255710.74",
		"% Aggregate": "0.32",
		"$ Average": "255710.74",
		"% Interest Rate": "4.75"
	}, {
		"City": "Yucca Valley",
		"Count": 1,
		"$ Aggregate": "52250.73",
		"% Aggregate": "0.07",
		"$ Average": "52250.73",
		"% Interest Rate": "5.80"
	}, {
		"City": "Auburn",
		"Count": 1,
		"$ Aggregate": "23897.50",
		"% Aggregate": "0.03",
		"$ Average": "23897.50",
		"% Interest Rate": "9.00"
	}, {
		"City": "Kansas City",
		"Count": 3,
		"$ Aggregate": "158640.00",
		"% Aggregate": "0.20",
		"$ Average": "52880.00",
		"% Interest Rate": "8.25"
	}, {
		"City": "Muskegon",
		"Count": 1,
		"$ Aggregate": "88345.69",
		"% Aggregate": "0.11",
		"$ Average": "88345.69",
		"% Interest Rate": "6.20"
	}, {
		"City": "St Petersburg",
		"Count": 1,
		"$ Aggregate": "83936.64",
		"% Aggregate": "0.11",
		"$ Average": "83936.64",
		"% Interest Rate": "6.95"
	}, {
		"City": "North Chesterfield",
		"Count": 1,
		"$ Aggregate": "304382.50",
		"% Aggregate": "0.38",
		"$ Average": "304382.50",
		"% Interest Rate": "9.25"
	}, {
		"City": "Saint Petersburg",
		"Count": 1,
		"$ Aggregate": "188556.41",
		"% Aggregate": "0.24",
		"$ Average": "188556.41",
		"% Interest Rate": "9.75"
	}, {
		"City": "Brookhaven",
		"Count": 1,
		"$ Aggregate": "399000.00",
		"% Aggregate": "0.50",
		"$ Average": "399000.00",
		"% Interest Rate": "7.40"
	}, {
		"City": "Hanahan",
		"Count": 1,
		"$ Aggregate": "150495.80",
		"% Aggregate": "0.19",
		"$ Average": "150495.80",
		"% Interest Rate": "10.00"
	}, {
		"City": "Oklahoma City",
		"Count": 2,
		"$ Aggregate": "205988.55",
		"% Aggregate": "0.26",
		"$ Average": "102994.27",
		"% Interest Rate": "10.12"
	}, {
		"City": "Leesburg",
		"Count": 1,
		"$ Aggregate": "621796.97",
		"% Aggregate": "0.78",
		"$ Average": "621796.97",
		"% Interest Rate": "4.67"
	}, {
		"City": "Panama City",
		"Count": 1,
		"$ Aggregate": "0.00",
		"% Aggregate": "0.00",
		"$ Average": "0.00",
		"% Interest Rate": "0.00"
	}, {
		"City": "Milwaukee",
		"Count": 3,
		"$ Aggregate": "250374.09",
		"% Aggregate": "0.31",
		"$ Average": "83458.03",
		"% Interest Rate": "6.83"
	}, {
		"City": "Baton Rouge",
		"Count": 2,
		"$ Aggregate": "141588.75",
		"% Aggregate": "0.18",
		"$ Average": "70794.38",
		"% Interest Rate": "11.27"
	}, {
		"City": "Hamilton",
		"Count": 1,
		"$ Aggregate": "105293.76",
		"% Aggregate": "0.13",
		"$ Average": "105293.76",
		"% Interest Rate": "4.52"
	}, {
		"City": "East Point",
		"Count": 2,
		"$ Aggregate": "88090.00",
		"% Aggregate": "0.11",
		"$ Average": "44045.00",
		"% Interest Rate": "7.75"
	}, {
		"City": "San Antonio",
		"Count": 2,
		"$ Aggregate": "46000.00",
		"% Aggregate": "0.06",
		"$ Average": "23000.00",
		"% Interest Rate": "9.25"
	}, {
		"City": "Marcus Hook",
		"Count": 1,
		"$ Aggregate": "91695.09",
		"% Aggregate": "0.11",
		"$ Average": "91695.09",
		"% Interest Rate": "5.60"
	}, {
		"City": "North Syracuse",
		"Count": 1,
		"$ Aggregate": "67200.00",
		"% Aggregate": "0.08",
		"$ Average": "67200.00",
		"% Interest Rate": "7.17"
	}, {
		"City": "West Allis",
		"Count": 1,
		"$ Aggregate": "126690.87",
		"% Aggregate": "0.16",
		"$ Average": "126690.87",
		"% Interest Rate": "10.50"
	}, {
		"City": "Orlando",
		"Count": 1,
		"$ Aggregate": "447920.88",
		"% Aggregate": "0.56",
		"$ Average": "447920.88",
		"% Interest Rate": "9.50"
	}, {
		"City": "Lake Wales",
		"Count": 1,
		"$ Aggregate": "104774.97",
		"% Aggregate": "0.13",
		"$ Average": "104774.97",
		"% Interest Rate": "5.13"
	}, {
		"City": "Vero Beach",
		"Count": 1,
		"$ Aggregate": "108280.00",
		"% Aggregate": "0.14",
		"$ Average": "108280.00",
		"% Interest Rate": "8.75"
	}, {
		"City": "Hephzibah",
		"Count": 1,
		"$ Aggregate": "39500.00",
		"% Aggregate": "0.05",
		"$ Average": "39500.00",
		"% Interest Rate": "11.00"
	}, {
		"City": "High Point",
		"Count": 1,
		"$ Aggregate": "52644.80",
		"% Aggregate": "0.07",
		"$ Average": "52644.80",
		"% Interest Rate": "11.00"
	}, {
		"City": "Lafayette",
		"Count": 1,
		"$ Aggregate": "76500.00",
		"% Aggregate": "0.10",
		"$ Average": "76500.00",
		"% Interest Rate": "10.00"
	}, {
		"City": "Pittsburgh",
		"Count": 1,
		"$ Aggregate": "55241.55",
		"% Aggregate": "0.07",
		"$ Average": "55241.55",
		"% Interest Rate": "11.50"
	}, {
		"City": "N. Charleston",
		"Count": 1,
		"$ Aggregate": "146420.51",
		"% Aggregate": "0.18",
		"$ Average": "146420.51",
		"% Interest Rate": "6.75"
	}, {
		"City": "Savannah",
		"Count": 2,
		"$ Aggregate": "339067.70",
		"% Aggregate": "0.42",
		"$ Average": "169533.85",
		"% Interest Rate": "5.47"
	}, {
		"City": "Jersey City",
		"Count": 1,
		"$ Aggregate": "362268.53",
		"% Aggregate": "0.45",
		"$ Average": "362268.53",
		"% Interest Rate": "5.45"
	}, {
		"City": "Allentown",
		"Count": 1,
		"$ Aggregate": "411909.93",
		"% Aggregate": "0.52",
		"$ Average": "411909.93",
		"% Interest Rate": "7.20"
	}, {
		"City": "Cleveland",
		"Count": 3,
		"$ Aggregate": "311665.24",
		"% Aggregate": "0.39",
		"$ Average": "103888.41",
		"% Interest Rate": "8.00"
	}, {
		"City": "Center Point",
		"Count": 1,
		"$ Aggregate": "57420.00",
		"% Aggregate": "0.07",
		"$ Average": "57420.00",
		"% Interest Rate": "10.00"
	}, {
		"City": "Fayetteville",
		"Count": 3,
		"$ Aggregate": "291790.56",
		"% Aggregate": "0.37",
		"$ Average": "97263.52",
		"% Interest Rate": "5.58"
	}, {
		"City": "Easley",
		"Count": 3,
		"$ Aggregate": "219268.55",
		"% Aggregate": "0.27",
		"$ Average": "73089.52",
		"% Interest Rate": "8.87"
	}, {
		"City": "Jamesville",
		"Count": 1,
		"$ Aggregate": "115941.38",
		"% Aggregate": "0.15",
		"$ Average": "115941.38",
		"% Interest Rate": "9.25"
	}, {
		"City": "Irwin",
		"Count": 1,
		"$ Aggregate": "122496.87",
		"% Aggregate": "0.15",
		"$ Average": "122496.87",
		"% Interest Rate": "10.00"
	}, {
		"City": "Cedar Lake",
		"Count": 1,
		"$ Aggregate": "423574.25",
		"% Aggregate": "0.53",
		"$ Average": "423574.25",
		"% Interest Rate": "5.10"
	}, {
		"City": "Berwyn",
		"Count": 2,
		"$ Aggregate": "225998.68",
		"% Aggregate": "0.28",
		"$ Average": "112999.34",
		"% Interest Rate": "9.33"
	}, {
		"City": "Midwest City",
		"Count": 1,
		"$ Aggregate": "93798.63",
		"% Aggregate": "0.12",
		"$ Average": "93798.63",
		"% Interest Rate": "10.00"
	}, {
		"City": "Jonesboro",
		"Count": 1,
		"$ Aggregate": "0.00",
		"% Aggregate": "0.00",
		"$ Average": "0.00",
		"% Interest Rate": "0.00"
	}, {
		"City": "Spartanburg",
		"Count": 4,
		"$ Aggregate": "231947.39",
		"% Aggregate": "0.29",
		"$ Average": "57986.85",
		"% Interest Rate": "6.67"
	}, {
		"City": "Decatur",
		"Count": 2,
		"$ Aggregate": "596738.70",
		"% Aggregate": "0.75",
		"$ Average": "298369.35",
		"% Interest Rate": "8.28"
	}, {
		"City": "Southport",
		"Count": 1,
		"$ Aggregate": "284000.00",
		"% Aggregate": "0.36",
		"$ Average": "284000.00",
		"% Interest Rate": "7.25"
	}, {
		"City": "Roswell",
		"Count": 1,
		"$ Aggregate": "297060.00",
		"% Aggregate": "0.37",
		"$ Average": "297060.00",
		"% Interest Rate": "9.49"
	}, {
		"City": "Mount Holly",
		"Count": 2,
		"$ Aggregate": "199570.35",
		"% Aggregate": "0.25",
		"$ Average": "99785.18",
		"% Interest Rate": "6.05"
	}, {
		"City": "Conley",
		"Count": 1,
		"$ Aggregate": "577897.06",
		"% Aggregate": "0.72",
		"$ Average": "577897.06",
		"% Interest Rate": "5.08"
	}, {
		"City": "Poinciana",
		"Count": 2,
		"$ Aggregate": "329975.02",
		"% Aggregate": "0.41",
		"$ Average": "164987.51",
		"% Interest Rate": "7.50"
	}, {
		"City": "Scottdale",
		"Count": 2,
		"$ Aggregate": "-24485.20",
		"% Aggregate": "-0.03",
		"$ Average": "-12242.60",
		"% Interest Rate": "11.16"
	}, {
		"City": "St. Joseph",
		"Count": 1,
		"$ Aggregate": "139350.73",
		"% Aggregate": "0.17",
		"$ Average": "139350.73",
		"% Interest Rate": "5.08"
	}, {
		"City": "Northbrook",
		"Count": 1,
		"$ Aggregate": "486870.00",
		"% Aggregate": "0.61",
		"$ Average": "486870.00",
		"% Interest Rate": "8.50"
	}, {
		"City": "Pine Hill",
		"Count": 1,
		"$ Aggregate": "82880.00",
		"% Aggregate": "0.10",
		"$ Average": "82880.00",
		"% Interest Rate": "9.49"
	}, {
		"City": "Debary",
		"Count": 1,
		"$ Aggregate": "188615.50",
		"% Aggregate": "0.24",
		"$ Average": "188615.50",
		"% Interest Rate": "5.40"
	}, {
		"City": "Pleasant Prairie",
		"Count": 1,
		"$ Aggregate": "0.00",
		"% Aggregate": "0.00",
		"$ Average": "0.00",
		"% Interest Rate": "0.00"
	}, {
		"City": "Garfield Heights",
		"Count": 1,
		"$ Aggregate": "66600.00",
		"% Aggregate": "0.08",
		"$ Average": "66600.00",
		"% Interest Rate": "11.00"
	}, {
		"City": "Florence",
		"Count": 1,
		"$ Aggregate": "671288.74",
		"% Aggregate": "0.84",
		"$ Average": "671288.74",
		"% Interest Rate": "5.83"
	}, {
		"City": "Newburgh Heights",
		"Count": 1,
		"$ Aggregate": "111682.59",
		"% Aggregate": "0.14",
		"$ Average": "111682.59",
		"% Interest Rate": "5.80"
	}, {
		"City": "Lincoln Park",
		"Count": 1,
		"$ Aggregate": "252000.00",
		"% Aggregate": "0.32",
		"$ Average": "252000.00",
		"% Interest Rate": "7.88"
	}, {
		"City": "Mableton",
		"Count": 1,
		"$ Aggregate": "115258.24",
		"% Aggregate": "0.14",
		"$ Average": "115258.24",
		"% Interest Rate": "5.25"
	}, {
		"City": "Riverdale",
		"Count": 1,
		"$ Aggregate": "27120.00",
		"% Aggregate": "0.03",
		"$ Average": "27120.00",
		"% Interest Rate": "8.25"
	}, {
		"City": "Orange",
		"Count": 1,
		"$ Aggregate": "105570.00",
		"% Aggregate": "0.13",
		"$ Average": "105570.00",
		"% Interest Rate": "11.50"
	}, {
		"City": "N Charleston",
		"Count": 1,
		"$ Aggregate": "172250.00",
		"% Aggregate": "0.22",
		"$ Average": "172250.00",
		"% Interest Rate": "8.72"
	}, {
		"City": "Phoenix",
		"Count": 1,
		"$ Aggregate": "125845.91",
		"% Aggregate": "0.16",
		"$ Average": "125845.91",
		"% Interest Rate": "5.45"
	}, {
		"City": "Wilmington",
		"Count": 3,
		"$ Aggregate": "315727.62",
		"% Aggregate": "0.40",
		"$ Average": "105242.54",
		"% Interest Rate": "7.17"
	}, {
		"City": "Oak Park",
		"Count": 1,
		"$ Aggregate": "125463.50",
		"% Aggregate": "0.16",
		"$ Average": "125463.50",
		"% Interest Rate": "9.25"
	}, {
		"City": "Hillside",
		"Count": 1,
		"$ Aggregate": "125377.92",
		"% Aggregate": "0.16",
		"$ Average": "125377.92",
		"% Interest Rate": "9.00"
	}, {
		"City": "Rochester",
		"Count": 2,
		"$ Aggregate": "120792.96",
		"% Aggregate": "0.15",
		"$ Average": "60396.48",
		"% Interest Rate": "10.00"
	}, {
		"City": "Loves Park",
		"Count": 1,
		"$ Aggregate": "85384.65",
		"% Aggregate": "0.11",
		"$ Average": "85384.65",
		"% Interest Rate": "11.00"
	}, {
		"City": "Fountain Inn",
		"Count": 1,
		"$ Aggregate": "0.00",
		"% Aggregate": "0.00",
		"$ Average": "0.00",
		"% Interest Rate": "0.00"
	}, {
		"City": "Somers Point",
		"Count": 1,
		"$ Aggregate": "91100.00",
		"% Aggregate": "0.11",
		"$ Average": "91100.00",
		"% Interest Rate": "7.50"
	}, {
		"City": "Powell",
		"Count": 1,
		"$ Aggregate": "149691.93",
		"% Aggregate": "0.19",
		"$ Average": "149691.93",
		"% Interest Rate": "5.35"
	}, {
		"City": "Abilene",
		"Count": 1,
		"$ Aggregate": "87789.33",
		"% Aggregate": "0.11",
		"$ Average": "87789.33",
		"% Interest Rate": "6.68"
	}, {
		"City": "Hendersonville",
		"Count": 2,
		"$ Aggregate": "501424.82",
		"% Aggregate": "0.63",
		"$ Average": "250712.41",
		"% Interest Rate": "4.95"
	}, {
		"City": "Camden",
		"Count": 1,
		"$ Aggregate": "86827.90",
		"% Aggregate": "0.11",
		"$ Average": "86827.90",
		"% Interest Rate": "5.53"
	}, {
		"City": "Pequot Lakes",
		"Count": 1,
		"$ Aggregate": "119937.54",
		"% Aggregate": "0.15",
		"$ Average": "119937.54",
		"% Interest Rate": "6.90"
	}, {
		"City": "Fresno",
		"Count": 1,
		"$ Aggregate": "195523.64",
		"% Aggregate": "0.24",
		"$ Average": "195523.64",
		"% Interest Rate": "4.45"
	}, {
		"City": "Las Vegas",
		"Count": 1,
		"$ Aggregate": "1597000.00",
		"% Aggregate": "2.00",
		"$ Average": "1597000.00",
		"% Interest Rate": "6.25"
	}, {
		"City": "Goose Creek",
		"Count": 1,
		"$ Aggregate": "161850.00",
		"% Aggregate": "0.20",
		"$ Average": "161850.00",
		"% Interest Rate": "7.52"
	}, {
		"City": "Montgomery",
		"Count": 1,
		"$ Aggregate": "77355.00",
		"% Aggregate": "0.10",
		"$ Average": "77355.00",
		"% Interest Rate": "8.25"
	}, {
		"City": "Trussville",
		"Count": 1,
		"$ Aggregate": "466897.50",
		"% Aggregate": "0.58",
		"$ Average": "466897.50",
		"% Interest Rate": "9.49"
	}, {
		"City": "Cockeysville",
		"Count": 1,
		"$ Aggregate": "369397.90",
		"% Aggregate": "0.46",
		"$ Average": "369397.90",
		"% Interest Rate": "5.53"
	}, {
		"City": "Live Oak",
		"Count": 1,
		"$ Aggregate": "133527.71",
		"% Aggregate": "0.17",
		"$ Average": "133527.71",
		"% Interest Rate": "4.63"
	}, {
		"City": "Portsmouth",
		"Count": 3,
		"$ Aggregate": "234519.30",
		"% Aggregate": "0.29",
		"$ Average": "78173.10",
		"% Interest Rate": "9.02"
	}, {
		"City": "Stockbridge",
		"Count": 1,
		"$ Aggregate": "86010.23",
		"% Aggregate": "0.11",
		"$ Average": "86010.23",
		"% Interest Rate": "5.90"
	}, {
		"City": "Cincinnati",
		"Count": 2,
		"$ Aggregate": "334243.80",
		"% Aggregate": "0.42",
		"$ Average": "167121.90",
		"% Interest Rate": "11.49"
	}, {
		"City": "Mishawaka",
		"Count": 2,
		"$ Aggregate": "162190.31",
		"% Aggregate": "0.20",
		"$ Average": "81095.15",
		"% Interest Rate": "6.64"
	}, {
		"City": "Front Royal",
		"Count": 2,
		"$ Aggregate": "221600.00",
		"% Aggregate": "0.28",
		"$ Average": "110800.00",
		"% Interest Rate": "7.50"
	}, {
		"City": "Grandview",
		"Count": 1,
		"$ Aggregate": "286217.23",
		"% Aggregate": "0.36",
		"$ Average": "286217.23",
		"% Interest Rate": "5.97"
	}, {
		"City": "Texas City",
		"Count": 1,
		"$ Aggregate": "64054.50",
		"% Aggregate": "0.08",
		"$ Average": "64054.50",
		"% Interest Rate": "7.25"
	}, {
		"City": "Lake Charles",
		"Count": 2,
		"$ Aggregate": "161706.12",
		"% Aggregate": "0.20",
		"$ Average": "80853.06",
		"% Interest Rate": "8.51"
	}, {
		"City": "Santa Rosa",
		"Count": 1,
		"$ Aggregate": "162690.00",
		"% Aggregate": "0.20",
		"$ Average": "162690.00",
		"% Interest Rate": "7.25"
	}, {
		"City": "EASTPOINTE",
		"Count": 1,
		"$ Aggregate": "370792.36",
		"% Aggregate": "0.46",
		"$ Average": "370792.36",
		"% Interest Rate": "6.53"
	}, {
		"City": "Radford",
		"Count": 1,
		"$ Aggregate": "52532.29",
		"% Aggregate": "0.07",
		"$ Average": "52532.29",
		"% Interest Rate": "10.25"
	}, {
		"City": "Port Jervis",
		"Count": 1,
		"$ Aggregate": "196000.00",
		"% Aggregate": "0.25",
		"$ Average": "196000.00",
		"% Interest Rate": "7.67"
	}, {
		"City": "Birmingham",
		"Count": 1,
		"$ Aggregate": "54720.00",
		"% Aggregate": "0.07",
		"$ Average": "54720.00",
		"% Interest Rate": "9.00"
	}, {
		"City": "Waynesville",
		"Count": 1,
		"$ Aggregate": "48994.00",
		"% Aggregate": "0.06",
		"$ Average": "48994.00",
		"% Interest Rate": "8.75"
	}, {
		"City": "Hartford",
		"Count": 2,
		"$ Aggregate": "94491.97",
		"% Aggregate": "0.12",
		"$ Average": "47245.99",
		"% Interest Rate": "11.00"
	}, {
		"City": "Spring Hill",
		"Count": 1,
		"$ Aggregate": "55096.36",
		"% Aggregate": "0.07",
		"$ Average": "55096.36",
		"% Interest Rate": "5.88"
	}, {
		"City": "Venice",
		"Count": 1,
		"$ Aggregate": "196500.00",
		"% Aggregate": "0.25",
		"$ Average": "196500.00",
		"% Interest Rate": "8.03"
	}, {
		"City": "Senoia",
		"Count": 1,
		"$ Aggregate": "93530.41",
		"% Aggregate": "0.12",
		"$ Average": "93530.41",
		"% Interest Rate": "4.65"
	}, {
		"City": "Carlsbad",
		"Count": 1,
		"$ Aggregate": "101485.82",
		"% Aggregate": "0.13",
		"$ Average": "101485.82",
		"% Interest Rate": "11.00"
	}, {
		"City": "Phoneix",
		"Count": 1,
		"$ Aggregate": "208800.00",
		"% Aggregate": "0.26",
		"$ Average": "208800.00",
		"% Interest Rate": "7.52"
	}, {
		"City": "Cincinatti",
		"Count": 1,
		"$ Aggregate": "108464.76",
		"% Aggregate": "0.14",
		"$ Average": "108464.76",
		"% Interest Rate": "6.20"
	}, {
		"City": "Monroe",
		"Count": 1,
		"$ Aggregate": "2164107.77",
		"% Aggregate": "2.71",
		"$ Average": "2164107.77",
		"% Interest Rate": "6.49"
	}, {
		"City": "Kannapolis",
		"Count": 1,
		"$ Aggregate": "62497.80",
		"% Aggregate": "0.08",
		"$ Average": "62497.80",
		"% Interest Rate": "11.00"
	}, {
		"City": "Pendleton",
		"Count": 1,
		"$ Aggregate": "138040.00",
		"% Aggregate": "0.17",
		"$ Average": "138040.00",
		"% Interest Rate": "11.50"
	}, {
		"City": "Greenville",
		"Count": 2,
		"$ Aggregate": "3893423.32",
		"% Aggregate": "4.87",
		"$ Average": "1946711.66",
		"% Interest Rate": "5.29"
	}, {
		"City": "Parkville",
		"Count": 1,
		"$ Aggregate": "1657534.00",
		"% Aggregate": "2.07",
		"$ Average": "1657534.00",
		"% Interest Rate": "5.50"
	}, {
		"City": "Miami Gardens",
		"Count": 1,
		"$ Aggregate": "213492.60",
		"% Aggregate": "0.27",
		"$ Average": "213492.60",
		"% Interest Rate": "9.00"
	}, {
		"City": "New Kensington",
		"Count": 1,
		"$ Aggregate": "137212.20",
		"% Aggregate": "0.17",
		"$ Average": "137212.20",
		"% Interest Rate": "5.25"
	}, {
		"City": "Gastonia",
		"Count": 2,
		"$ Aggregate": "185634.96",
		"% Aggregate": "0.23",
		"$ Average": "92817.48",
		"% Interest Rate": "5.83"
	}, {
		"City": "Hopewell",
		"Count": 1,
		"$ Aggregate": "92250.00",
		"% Aggregate": "0.12",
		"$ Average": "92250.00",
		"% Interest Rate": "10.00"
	}, {
		"City": "Ellenwood",
		"Count": 1,
		"$ Aggregate": "156960.00",
		"% Aggregate": "0.20",
		"$ Average": "156960.00",
		"% Interest Rate": "11.00"
	}, {
		"City": "Marietta",
		"Count": 1,
		"$ Aggregate": "317536.20",
		"% Aggregate": "0.40",
		"$ Average": "317536.20",
		"% Interest Rate": "11.50"
	}, {
		"City": "Holt",
		"Count": 1,
		"$ Aggregate": "113400.00",
		"% Aggregate": "0.14",
		"$ Average": "113400.00",
		"% Interest Rate": "10.00"
	}, {
		"City": "Madison",
		"Count": 2,
		"$ Aggregate": "277293.90",
		"% Aggregate": "0.35",
		"$ Average": "138646.95",
		"% Interest Rate": "5.26"
	}, {
		"City": "Prairie View",
		"Count": 1,
		"$ Aggregate": "96993.76",
		"% Aggregate": "0.12",
		"$ Average": "96993.76",
		"% Interest Rate": "5.25"
	}, {
		"City": "Des moines",
		"Count": 1,
		"$ Aggregate": "59255.71",
		"% Aggregate": "0.07",
		"$ Average": "59255.71",
		"% Interest Rate": "6.55"
	}, {
		"City": "Florida City",
		"Count": 1,
		"$ Aggregate": "153550.00",
		"% Aggregate": "0.19",
		"$ Average": "153550.00",
		"% Interest Rate": "7.50"
	}, {
		"City": "Monrovia",
		"Count": 1,
		"$ Aggregate": "125685.00",
		"% Aggregate": "0.16",
		"$ Average": "125685.00",
		"% Interest Rate": "10.00"
	}, {
		"City": "North Augusta",
		"Count": 1,
		"$ Aggregate": "133879.18",
		"% Aggregate": "0.17",
		"$ Average": "133879.18",
		"% Interest Rate": "5.73"
	}, {
		"City": "Tampa",
		"Count": 1,
		"$ Aggregate": "278370.00",
		"% Aggregate": "0.35",
		"$ Average": "278370.00",
		"% Interest Rate": "10.00"
	}, {
		"City": "Penns Grove",
		"Count": 1,
		"$ Aggregate": "58641.26",
		"% Aggregate": "0.07",
		"$ Average": "58641.26",
		"% Interest Rate": "5.90"
	}, {
		"City": "Zion",
		"Count": 1,
		"$ Aggregate": "69894.72",
		"% Aggregate": "0.09",
		"$ Average": "69894.72",
		"% Interest Rate": "6.95"
	}, {
		"City": "Gloucester City",
		"Count": 1,
		"$ Aggregate": "77400.00",
		"% Aggregate": "0.10",
		"$ Average": "77400.00",
		"% Interest Rate": "10.00"
	}, {
		"City": "Youngstown",
		"Count": 1,
		"$ Aggregate": "107035.19",
		"% Aggregate": "0.13",
		"$ Average": "107035.19",
		"% Interest Rate": "5.48"
	}, {
		"City": "Madison Heights",
		"Count": 2,
		"$ Aggregate": "217172.02",
		"% Aggregate": "0.27",
		"$ Average": "108586.01",
		"% Interest Rate": "8.75"
	}, {
		"City": "East Stroudsburg",
		"Count": 1,
		"$ Aggregate": "79875.00",
		"% Aggregate": "0.10",
		"$ Average": "79875.00",
		"% Interest Rate": "10.00"
	}, {
		"City": "St. Paul",
		"Count": 1,
		"$ Aggregate": "254381.70",
		"% Aggregate": "0.32",
		"$ Average": "254381.70",
		"% Interest Rate": "6.58"
	}, {
		"City": "Miami",
		"Count": 1,
		"$ Aggregate": "247000.00",
		"% Aggregate": "0.31",
		"$ Average": "247000.00",
		"% Interest Rate": "7.73"
	}, {
		"City": "Fenton",
		"Count": 1,
		"$ Aggregate": "142892.93",
		"% Aggregate": "0.18",
		"$ Average": "142892.93",
		"% Interest Rate": "9.50"
	}, {
		"City": "Irvington",
		"Count": 2,
		"$ Aggregate": "241507.50",
		"% Aggregate": "0.30",
		"$ Average": "120753.75",
		"% Interest Rate": "8.66"
	}, {
		"City": "Evansville",
		"Count": 1,
		"$ Aggregate": "136131.37",
		"% Aggregate": "0.17",
		"$ Average": "136131.37",
		"% Interest Rate": "6.05"
	}, {
		"City": "Runnemade",
		"Count": 1,
		"$ Aggregate": "0.00",
		"% Aggregate": "0.00",
		"$ Average": "0.00",
		"% Interest Rate": "0.00"
	}, {
		"City": "Sicklerville",
		"Count": 1,
		"$ Aggregate": "111988.48",
		"% Aggregate": "0.14",
		"$ Average": "111988.48",
		"% Interest Rate": "10.00"
	}, {
		"City": "Chatsworth",
		"Count": 1,
		"$ Aggregate": "397800.00",
		"% Aggregate": "0.50",
		"$ Average": "397800.00",
		"% Interest Rate": "9.50"
	}, {
		"City": "Fairburn",
		"Count": 1,
		"$ Aggregate": "1653222.23",
		"% Aggregate": "2.07",
		"$ Average": "1653222.23",
		"% Interest Rate": "4.45"
	}, {
		"City": "Smithfield",
		"Count": 1,
		"$ Aggregate": "49050.00",
		"% Aggregate": "0.06",
		"$ Average": "49050.00",
		"% Interest Rate": "8.25"
	}, {
		"City": "Stephens City",
		"Count": 1,
		"$ Aggregate": "163664.00",
		"% Aggregate": "0.20",
		"$ Average": "163664.00",
		"% Interest Rate": "7.50"
	}, {
		"City": "Sevierville",
		"Count": 1,
		"$ Aggregate": "-22494.89",
		"% Aggregate": "-0.03",
		"$ Average": "-22494.89",
		"% Interest Rate": "9.25"
	}, {
		"City": "Greensboro",
		"Count": 1,
		"$ Aggregate": "119773.73",
		"% Aggregate": "0.15",
		"$ Average": "119773.73",
		"% Interest Rate": "7.10"
	}, {
		"City": "Waterford",
		"Count": 1,
		"$ Aggregate": "0.00",
		"% Aggregate": "0.00",
		"$ Average": "0.00",
		"% Interest Rate": "0.00"
	}, {
		"City": "Paterson",
		"Count": 1,
		"$ Aggregate": "234945.00",
		"% Aggregate": "0.29",
		"$ Average": "234945.00",
		"% Interest Rate": "10.00"
	}, {
		"City": "McDonough",
		"Count": 1,
		"$ Aggregate": "83850.65",
		"% Aggregate": "0.10",
		"$ Average": "83850.65",
		"% Interest Rate": "6.10"
	}, {
		"City": "Willow Springs",
		"Count": 1,
		"$ Aggregate": "0.00",
		"% Aggregate": "0.00",
		"$ Average": "0.00",
		"% Interest Rate": "0.00"
	}, {
		"City": "Palmetto",
		"Count": 1,
		"$ Aggregate": "129498.43",
		"% Aggregate": "0.16",
		"$ Average": "129498.43",
		"% Interest Rate": "10.00"
	}, {
		"City": "Sunman",
		"Count": 1,
		"$ Aggregate": "-6573.04",
		"% Aggregate": "-0.01",
		"$ Average": "-6573.04",
		"% Interest Rate": "8.25"
	}, {
		"City": "Maple Heights",
		"Count": 1,
		"$ Aggregate": "93390.35",
		"% Aggregate": "0.12",
		"$ Average": "93390.35",
		"% Interest Rate": "5.05"
	}, {
		"City": "Kingwood",
		"Count": 1,
		"$ Aggregate": "228868.94",
		"% Aggregate": "0.29",
		"$ Average": "228868.94",
		"% Interest Rate": "10.00"
	}, {
		"City": "Lithonia",
		"Count": 1,
		"$ Aggregate": "2125.00",
		"% Aggregate": "0.00",
		"$ Average": "2125.00",
		"% Interest Rate": "10.00"
	}, {
		"City": "Richmond Heights",
		"Count": 1,
		"$ Aggregate": "168673.60",
		"% Aggregate": "0.21",
		"$ Average": "168673.60",
		"% Interest Rate": "11.25"
	}, {
		"City": "Phillipsburg",
		"Count": 1,
		"$ Aggregate": "115645.13",
		"% Aggregate": "0.14",
		"$ Average": "115645.13",
		"% Interest Rate": "5.40"
	}, {
		"City": "Columbia",
		"Count": 1,
		"$ Aggregate": "310771.54",
		"% Aggregate": "0.39",
		"$ Average": "310771.54",
		"% Interest Rate": "10.00"
	}, {
		"City": "Kissimmee",
		"Count": 1,
		"$ Aggregate": "128800.00",
		"% Aggregate": "0.16",
		"$ Average": "128800.00",
		"% Interest Rate": "8.08"
	}, {
		"City": "Liverpool",
		"Count": 1,
		"$ Aggregate": "98977.50",
		"% Aggregate": "0.12",
		"$ Average": "98977.50",
		"% Interest Rate": "10.00"
	}, {
		"City": "Dunedin",
		"Count": 1,
		"$ Aggregate": "335700.00",
		"% Aggregate": "0.42",
		"$ Average": "335700.00",
		"% Interest Rate": "11.49"
	}, {
		"City": "New Orleans",
		"Count": 1,
		"$ Aggregate": "164180.01",
		"% Aggregate": "0.21",
		"$ Average": "164180.01",
		"% Interest Rate": "8.75"
	}, {
		"City": "Pompano Beach",
		"Count": 1,
		"$ Aggregate": "158027.04",
		"% Aggregate": "0.20",
		"$ Average": "158027.04",
		"% Interest Rate": "6.75"
	}, {
		"City": "Rock Hill",
		"Count": 1,
		"$ Aggregate": "118984.26",
		"% Aggregate": "0.15",
		"$ Average": "118984.26",
		"% Interest Rate": "11.25"
	}, {
		"City": "Markham",
		"Count": 1,
		"$ Aggregate": "42075.00",
		"% Aggregate": "0.05",
		"$ Average": "42075.00",
		"% Interest Rate": "8.25"
	}, {
		"City": "Total:",
		"Count": "486",
		"$ Aggregate": "79889414.36",
		"% Aggregate": "100.00",
		"$ Average": "46416230.20",
		"% Interest Rate": "1892.22"
	}],
	"tableData": []
}
export const LimaInvestorIndexData = [
	{ "title": "Date", "order_id": "1", "anchore_link": "Date" },
	{ "title": "Payment Summary", "order_id": "1", "anchore_link": "PaymentSummary" },
	{ "title": "Principal Payments", "order_id": "1", "anchore_link": "PrincipalPayments" },
	{ "title": "Interest Payments", "order_id": "1", "anchore_link": "InterestPayments" },
	{ "title": "Special Adjustments", "order_id": "1", "anchore_link": "SpecialAdjustments" },
	{ "title": "Factors Per $1,000", "order_id": "1", "anchore_link": "ClassFactors" },
	{ "title": "Account Statements", "order_id": "1", "anchore_link": "AccountStatements" },
	{ "title": "Collateral Summary", "order_id": "1", "anchore_link": "CollateralSummary" },
	{ "title": "Prepayments And Default Rates", "order_id": "1", "anchore_link": "PrePaymentsAndDefaultRates" },
	{ "title": "Deal Fees And Expenses", "order_id": "1", "anchore_link": "DealFeesAndExpenses" },
	{ "title": "Deal Events", "order_id": "1", "anchore_link": "DealEvents" },
	{ "title": "Performance Details", "order_id": "1", "anchore_link": "PerformanceDetails" },
	{ "title": "Priority Of Payments", "order_id": "1", "anchore_link": "PriorityOfPayments" }
]


export const SaludaInvestorIndexData = [
	{ "title": "Date", "order_id": "1", "anchore_link": "Date" },
	{ "title": "Payment Summary", "order_id": "1", "anchore_link": "PaymentSummary" },
	{ "title": "Principal Payments", "order_id": "1", "anchore_link": "PrincipalPayments" },
	{ "title": "Interest Payments", "order_id": "1", "anchore_link": "InterestPayments" },
	{ "title": "Account Statements", "order_id": "1", "anchore_link": "AccountStatements" },
	{ "title": "Class Factors", "order_id": "1", "anchore_link": "ClassFactors" },
	{ "title": "Collateral Summary", "order_id": "1", "anchore_link": "CollateralSummary" },
	{ "title": "Acquisition Criteria", "order_id": "1", "anchore_link": "AcquisitionCriteria" },
	{ "title": "PrePayments And DefaultRates", "order_id": "1", "anchore_link": "PrePaymentsAndDefaultRates" },
	{ "title": "DealFees And Expenses", "order_id": "1", "anchore_link": "DealFeesAndExpenses" },
	{ "title": "Deal Events", "order_id": "1", "anchore_link": "DealEvents" },
	{ "title": "Priority Of Payments", "order_id": "1", "anchore_link": "PriorityOfPayments" },
	{ "title": "Loan Delinquencies", "order_id": "1", "anchore_link": "LoanDelinquencies" },
	{ "title": "Loan Modifications", "order_id": "1", "anchore_link": "LoanModifications" },
	{ "title": "Loans Transferred to Special Servicing", "order_id": "1", "anchore_link": "LoansTransferredtoSpecialServicing" }
]

export const dummydata = {
	"DealContactInformation": { "dealid": "L1C 2020-1, LLC", "distributiondate": "9/25/2020", "reporttype": "Monthly Paying Agent", "relationshipmanager": "Devon Almeida", "address": "500 Delaware Ave, 11th Floor, Wilmington, DE 19801", "email": "dalmeida@wsfsbank.com", "websitereporting": "www.wsfsabsreporting.com", "addtionalfirst": " ", "additionallast": " " }, "DelinquencyStatus": [{ "Delinquency Status": "0 - 30", "Count": "0", "$ Aggregate": "0.00", "% Aggregate": "0.00", "$ Average": "0.00", "% Interest Rate": "0.00" }, { "Delinquency Status": "30 - 60", "Count": 2, "$ Aggregate": "691330.21", "% Aggregate": "60.68", "$ Average": "345665.10", "% Interest Rate": "7.14" }, { "Delinquency Status": "60 - 90", "Count": 1, "$ Aggregate": "447920.88", "% Aggregate": "39.32", "$ Average": "447920.88", "% Interest Rate": "9.50" }, { "Delinquency Status": "90 - 120", "Count": "0", "$ Aggregate": "0.00", "% Aggregate": "0.00", "$ Average": "0.00", "% Interest Rate": "0.00" }, { "Delinquency Status": "120 +", "Count": "0", "$ Aggregate": "0.00", "% Aggregate": "0.00", "$ Average": "0.00", "% Interest Rate": "0.00" }, { "Delinquency Status": "Bankruptcy", "Count": "0", "$ Aggregate": "0.00", "% Aggregate": "0.00", "$ Average": "0.00", "% Interest Rate": "0.00" }, { "Delinquency Status": "Foreclosure", "Count": "0", "$ Aggregate": "0.00", "% Aggregate": "0.00", "$ Average": "0.00", "% Interest Rate": "0.00" }, { "Delinquency Status": "REO", "Count": "0", "$ Aggregate": "0.00", "% Aggregate": "0.00", "$ Average": "0.00", "% Interest Rate": "0.00" }, { "Delinquency Status": "Total:", "Count": "3", "$ Aggregate": "1139251.09", "% Aggregate": "100.00", "$ Average": "793585.98", "% Interest Rate": "16.64" }], "PIF": [{ "Loan ID": "108970", "Unpaid Principal Balance": "155716.52", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "108101", "Unpaid Principal Balance": "284000", "Pre-Modification": "01/04/2021", "Post-Modification": "10/05/2021", "Modification Type": "Extension" }, { "Loan ID": "108150", "Unpaid Principal Balance": "56000", "Pre-Modification": "10/04/2050", "Post-Modification": "10/04/2050", "Modification Type": "Extension" }, { "Loan ID": "104997", "Unpaid Principal Balance": "39500", "Pre-Modification": "01/02/2021", "Post-Modification": "01/02/2021", "Modification Type": "Extension" }, { "Loan ID": "108412", "Unpaid Principal Balance": "320188.5", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "108407", "Unpaid Principal Balance": "120120", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "108045", "Unpaid Principal Balance": "88020", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "108140", "Unpaid Principal Balance": "125994.5", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "108724", "Unpaid Principal Balance": "93750", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "105760", "Unpaid Principal Balance": "157492.35", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "108210", "Unpaid Principal Balance": "73818", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "108826", "Unpaid Principal Balance": "40000", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "103614", "Unpaid Principal Balance": "80500", "Pre-Modification": "01/01/2050", "Post-Modification": "01/01/2050", "Modification Type": "Extension" }, { "Loan ID": "108774", "Unpaid Principal Balance": "146998.75", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "108196", "Unpaid Principal Balance": "191820", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "108714", "Unpaid Principal Balance": "52155", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "103474", "Unpaid Principal Balance": "108736", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "108021", "Unpaid Principal Balance": "51570", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "108024", "Unpaid Principal Balance": "116250", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "102452", "Unpaid Principal Balance": "234945", "Pre-Modification": "01/09/2020", "Post-Modification": "01/09/2020", "Modification Type": "Extension" }, { "Loan ID": "108782", "Unpaid Principal Balance": "113150", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "108484", "Unpaid Principal Balance": "251995.82", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "108451", "Unpaid Principal Balance": "99790", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "107931", "Unpaid Principal Balance": "53600", "Pre-Modification": "01/03/2021", "Post-Modification": "01/03/2021", "Modification Type": "Extension" }, { "Loan ID": "102446", "Unpaid Principal Balance": "117557.4", "Pre-Modification": "01/09/2020", "Post-Modification": "01/09/2020", "Modification Type": "Extension" }, { "Loan ID": "108117", "Unpaid Principal Balance": "72100", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "108395", "Unpaid Principal Balance": "93100", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "106676", "Unpaid Principal Balance": "61600", "Pre-Modification": "01/03/2050", "Post-Modification": "01/03/2050", "Modification Type": "Extension" }, { "Loan ID": "108014", "Unpaid Principal Balance": "170805.92", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "105652", "Unpaid Principal Balance": "118300", "Pre-Modification": "01/03/2050", "Post-Modification": "01/03/2050", "Modification Type": "Extension" }, { "Loan ID": "105651", "Unpaid Principal Balance": "51100", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "104502", "Unpaid Principal Balance": "67050", "Pre-Modification": "01/01/2050", "Post-Modification": "01/01/2050", "Modification Type": "Extension" }, { "Loan ID": "108830", "Unpaid Principal Balance": "136492.13", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "105182", "Unpaid Principal Balance": "2695000", "Pre-Modification": "01/02/2022", "Post-Modification": "01/02/2022", "Modification Type": "Extension" }, { "Loan ID": "58137", "Unpaid Principal Balance": "55241.55", "Pre-Modification": "01/10/2019", "Post-Modification": "01/10/2020", "Modification Type": "Extension" }, { "Loan ID": "105707", "Unpaid Principal Balance": "59500", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "105584", "Unpaid Principal Balance": "838000", "Pre-Modification": "01/03/2050", "Post-Modification": "01/03/2050", "Modification Type": "Extension" }, { "Loan ID": "105794", "Unpaid Principal Balance": "109200", "Pre-Modification": "01/03/2050", "Post-Modification": "10/04/2050", "Modification Type": "Extension" }, { "Loan ID": "107889", "Unpaid Principal Balance": "186200", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "108271", "Unpaid Principal Balance": "94496.22", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "109500", "Unpaid Principal Balance": "99450", "Pre-Modification": "01/09/2021", "Post-Modification": "01/09/2021", "Modification Type": "Extension" }, { "Loan ID": "108026", "Unpaid Principal Balance": "64170", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "108051", "Unpaid Principal Balance": "142875", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "59030", "Unpaid Principal Balance": "89995.5", "Pre-Modification": "01/12/2019", "Post-Modification": "01/12/2019", "Modification Type": "Extension" }, { "Loan ID": "104768", "Unpaid Principal Balance": "246000", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "105776", "Unpaid Principal Balance": "446832.5", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "108732", "Unpaid Principal Balance": "121800", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "108888", "Unpaid Principal Balance": "68000", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "108148", "Unpaid Principal Balance": "356715", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "109513", "Unpaid Principal Balance": "425600", "Pre-Modification": "01/09/2021", 
	"Post-Modification": "01/09/2021", "Modification Type": "Extension" }, { "Loan ID": "108138", "Unpaid Principal Balance": "127800", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "102873", "Unpaid Principal Balance": "168673.6", "Pre-Modification": "01/10/2020", "Post-Modification": "01/10/2020", "Modification Type": "Extension" }, { "Loan ID": "109037", "Unpaid Principal Balance": "169371.9", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "108579", "Unpaid Principal Balance": "139523.25", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "108442", "Unpaid Principal Balance": "105075", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "104879", "Unpaid Principal Balance": "59500", "Pre-Modification": "01/01/2050", "Post-Modification": "01/01/2050", "Modification Type": "Extension" }, { "Loan ID": "108749", "Unpaid Principal Balance": "1002780", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "107996", "Unpaid Principal Balance": "126000", "Pre-Modification": "01/03/2050", "Post-Modification": "10/04/2050", "Modification Type": "Extension" }, { "Loan ID": "103536", "Unpaid Principal Balance": "67200", "Pre-Modification": "01/02/2022", "Post-Modification": "01/02/2022", "Modification Type": "Extension" }, { "Loan ID": "307936", "Unpaid Principal Balance": "133000", "Pre-Modification": "", "Post-Modification": "01/03/2050", "Modification Type": "Extension" }, { "Loan ID": "100901", "Unpaid Principal Balance": "150495.8", "Pre-Modification": "10/07/2020", "Post-Modification": "01/09/2020", "Modification Type": "Extension" }, { "Loan ID": "107788", "Unpaid Principal Balance": "128216.7", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "108522", "Unpaid Principal Balance": "82880", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "102678", "Unpaid Principal Balance": "132525", "Pre-Modification": "01/09/2020", "Post-Modification": "01/09/2020", "Modification Type": "Extension" }, { "Loan ID": "108469", "Unpaid Principal Balance": "187832.8", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "108327", "Unpaid Principal Balance": "231840", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "108630", "Unpaid Principal Balance": "370500", "Pre-Modification": "01/03/2050", "Post-Modification": "01/03/2050", "Modification Type": "Extension" }, { "Loan ID": "108481", "Unpaid Principal Balance": "111600", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "108645", "Unpaid Principal Balance": "111988.48", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "109531", "Unpaid Principal Balance": "425600", "Pre-Modification": "01/09/2021", "Post-Modification": "01/09/2021", "Modification Type": "Extension" }, { "Loan ID": "108856", "Unpaid Principal Balance": "63697.5", "Pre-Modification": "10/06/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "104095", "Unpaid Principal Balance": "108750", "Pre-Modification": "01/03/2050", "Post-Modification": "01/03/2050", "Modification Type": "Extension" }, { "Loan ID": "105490", "Unpaid Principal Balance": "164180", "Pre-Modification": "01/03/2021", "Post-Modification": "01/03/2021", "Modification Type": "Extension" }, { "Loan ID": "108370", "Unpaid Principal Balance": "111744", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "108428", "Unpaid Principal Balance": "284000", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "108342", "Unpaid Principal Balance": "1663998", "Pre-Modification": "09/02/2030", "Post-Modification": "09/02/2030", "Modification Type": "Extension" }, { "Loan ID": "108998", "Unpaid Principal Balance": "46399.5", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "109514", "Unpaid Principal Balance": "227375", "Pre-Modification": "01/09/2021", "Post-Modification": "01/09/2021", "Modification Type": "Extension" }, { "Loan ID": "109054", "Unpaid Principal Balance": "104993.7", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "108720", "Unpaid Principal Balance": "145305", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "107990", "Unpaid Principal Balance": "53200", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "105174", "Unpaid Principal Balance": "120000", "Pre-Modification": "01/03/2050", "Post-Modification": "01/03/2050", "Modification Type": "Extension" }, { "Loan ID": "108798", "Unpaid Principal Balance": "216000", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "105780", "Unpaid Principal Balance": "105700", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "108664", "Unpaid Principal Balance": "59400", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "104891", "Unpaid Principal Balance": "232800", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "108262", "Unpaid Principal Balance": "90000", "Pre-Modification": "01/03/2050", "Post-Modification": "01/03/2050", "Modification Type": "Extension" }, { "Loan ID": "104558", "Unpaid Principal Balance": "196500", "Pre-Modification": "01/04/2022", "Post-Modification": "01/04/2022", "Modification Type": "Extension" }, { "Loan ID": "104672", "Unpaid Principal Balance": "101485.82", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "108999", "Unpaid Principal Balance": "159316.52", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "108096", "Unpaid Principal Balance": "672550", "Pre-Modification": "01/04/2050", 
	"Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "108057", "Unpaid Principal Balance": "76000", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "105708", "Unpaid Principal Balance": "251550", "Pre-Modification": "01/03/2050", "Post-Modification": "01/03/2050", "Modification Type": "Extension" }, { "Loan ID": "105748", "Unpaid Principal Balance": "139750", "Pre-Modification": "01/03/2050", "Post-Modification": "01/03/2050", "Modification Type": "Extension" }, { "Loan ID": "108606", "Unpaid Principal Balance": "93625", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "105446", "Unpaid Principal Balance": "79875", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "108292", "Unpaid Principal Balance": "93798.8", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "107907", "Unpaid Principal Balance": "72135", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "105656", "Unpaid Principal Balance": "100400", "Pre-Modification": "01/02/2050", "Post-Modification": "01/02/2050", "Modification Type": "Extension" }, { "Loan ID": "108885", "Unpaid Principal Balance": "58640", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "102680", "Unpaid Principal Balance": "117648.5", "Pre-Modification": "01/09/2020", "Post-Modification": "01/09/2020", "Modification Type": "Extension" }, { "Loan ID": "108195", "Unpaid Principal Balance": "146650", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "108320", "Unpaid Principal Balance": "339500", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "108620", "Unpaid Principal Balance": "69480", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "107848", "Unpaid Principal Balance": "62497.8", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "107871", "Unpaid Principal Balance": "59200", "Pre-Modification": "01/03/2021", "Post-Modification": "01/03/2021", "Modification Type": "Extension" }, { "Loan ID": "108515", "Unpaid Principal Balance": "150000", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "108530", "Unpaid Principal Balance": "70560.8", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "104260", "Unpaid Principal Balance": "141525", "Pre-Modification": "01/12/2020", "Post-Modification": "01/12/2020", "Modification Type": "Extension" }, { "Loan ID": "103551", "Unpaid Principal Balance": "125289", "Pre-Modification": "01/12/2020", "Post-Modification": "01/12/2020", "Modification Type": "Extension" }, { "Loan ID": "108496", "Unpaid Principal Balance": "254700.18", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "108536", "Unpaid Principal Balance": "213492.6", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "103874", "Unpaid Principal Balance": "65600", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "108239", "Unpaid Principal Balance": "196000", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "107998", "Unpaid Principal Balance": "59500", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "108920", "Unpaid Principal Balance": "187200", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "104806", "Unpaid Principal Balance": "70000", "Pre-Modification": "01/03/2050", "Post-Modification": "01/03/2050", "Modification Type": "Extension" }, { "Loan ID": "102274", "Unpaid Principal Balance": "92250", "Pre-Modification": "01/09/2020", "Post-Modification": "01/12/2020", "Modification Type": "Extension" }, { "Loan ID": "108357", "Unpaid Principal Balance": "131250", "Pre-Modification": "01/03/2050", "Post-Modification": "01/03/2050", "Modification Type": "Extension" }, { "Loan ID": "105349", "Unpaid Principal Balance": "93800", "Pre-Modification": "01/03/2050", "Post-Modification": "01/03/2050", "Modification Type": "Extension" }, { "Loan ID": "108767", "Unpaid Principal Balance": "49400", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "108582", "Unpaid Principal Balance": "266750", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "108177", "Unpaid Principal Balance": "405463.5", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "105118", "Unpaid Principal Balance": "163732.5", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "105540", "Unpaid Principal Balance": "135000", "Pre-Modification": "01/02/2050", "Post-Modification": "01/02/2050", "Modification Type": "Extension" }, { "Loan ID": "107984", "Unpaid Principal Balance": "180750", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "108850", "Unpaid Principal Balance": "123750", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "108309", "Unpaid Principal Balance": "86250", "Pre-Modification": "01/03/2050", "Post-Modification": "01/03/2050", "Modification Type": "Extension" }, { "Loan ID": "102569", "Unpaid Principal Balance": "146226.96", "Pre-Modification": "01/11/2020", "Post-Modification": "01/11/2020", "Modification Type": "Extension" }, { "Loan ID": "108840", "Unpaid Principal Balance": "90000", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" },
	{ "Loan ID": "108634", "Unpaid Principal Balance": "125685", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "108565", "Unpaid Principal Balance": "133000", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "109376", "Unpaid Principal Balance": "84493.57", "Pre-Modification": "01/09/2021", "Post-Modification": "01/09/2021", "Modification Type": "Extension" }, { "Loan ID": "105773", "Unpaid Principal Balance": "133000", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "108753", "Unpaid Principal Balance": "174999.74", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "108512", "Unpaid Principal Balance": "75331.25", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "108500", "Unpaid Principal Balance": "137880", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "104920", "Unpaid Principal Balance": "172250", "Pre-Modification": "01/02/2022", "Post-Modification": "01/02/2022", "Modification Type": "Extension" }, { "Loan ID": "108249", "Unpaid Principal Balance": "64800", "Pre-Modification": "01/03/2050", "Post-Modification": "01/03/2050", "Modification Type": "Extension" }, { "Loan ID": "50133", "Unpaid Principal Balance": "694216.5", "Pre-Modification": "01/07/2018", "Post-Modification": "01/07/2020", "Modification Type": "Extension" }, { "Loan ID": "108378", "Unpaid Principal Balance": "61830", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "104785", "Unpaid Principal Balance": "136500", "Pre-Modification": "01/03/2050", "Post-Modification": "01/03/2050", "Modification Type": "Extension" }, { "Loan ID": "105317", "Unpaid Principal Balance": "602950", "Pre-Modification": "09/03/2050", "Post-Modification": "09/03/2050", "Modification Type": "Extension" }, { "Loan ID": "108479", "Unpaid Principal Balance": "130500", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "104423", "Unpaid Principal Balance": "127757.19", "Pre-Modification": "01/01/2021", "Post-Modification": "01/01/2021", "Modification Type": "Extension" }, { "Loan ID": "108010", "Unpaid Principal Balance": "55035", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "108637", "Unpaid Principal Balance": "92790", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "105201", "Unpaid Principal Balance": "252000", "Pre-Modification": "01/03/2022", "Post-Modification": "01/03/2022", "Modification Type": "Extension" }, { "Loan ID": "107804", "Unpaid Principal Balance": "252000", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "108401", "Unpaid Principal Balance": "76500", "Pre-Modification": "10/04/2050", "Post-Modification": "10/04/2050", "Modification Type": "Extension" }, { "Loan ID": "105359", "Unpaid Principal Balance": "70000", "Pre-Modification": "01/03/2050", "Post-Modification": "01/03/2050", "Modification Type": "Extension" }, { "Loan ID": "105705", "Unpaid Principal Balance": "424950", "Pre-Modification": "01/03/2050", "Post-Modification": "01/03/2050", "Modification Type": "Extension" }, { "Loan ID": "108894", "Unpaid Principal Balance": "37600", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "108066", "Unpaid Principal Balance": "125766.44", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "103263", "Unpaid Principal Balance": "308000", "Pre-Modification": "01/11/2021", "Post-Modification": "01/11/2021", "Modification Type": "Extension" }, { "Loan ID": "108584", "Unpaid Principal Balance": "110500", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "108795", "Unpaid Principal Balance": "54855", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "108704", "Unpaid Principal Balance": "77400", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "108531", "Unpaid Principal Balance": "60000", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "108374", "Unpaid Principal Balance": "128945", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "104711", "Unpaid Principal Balance": "134400", "Pre-Modification": "01/02/2050", "Post-Modification": "01/02/2050", "Modification Type": "Extension" }, { "Loan ID": "108306", "Unpaid Principal Balance": "98977.5", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "107829", "Unpaid Principal Balance": "110550", "Pre-Modification": "01/03/2050", "Post-Modification": "01/03/2050", "Modification Type": "Extension" }, { "Loan ID": "102879", "Unpaid Principal Balance": "317536.2", "Pre-Modification": "01/10/2020", "Post-Modification": "01/10/2020", "Modification Type": "Extension" }, { "Loan ID": "108612", "Unpaid Principal Balance": "108500", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "108506", "Unpaid Principal Balance": "201775.5", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "108456", "Unpaid Principal Balance": "131629.5", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "107941", "Unpaid Principal Balance": "76990.21", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "105347", "Unpaid Principal Balance": "196000", "Pre-Modification": "01/03/2022", "Post-Modification": "01/03/2022", "Modification Type": "Extension" },
	 { "Loan ID": "105505", "Unpaid Principal Balance": "2209500", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, 
	 { "Loan ID": "108161", "Unpaid Principal Balance": "127350", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "108279", "Unpaid Principal Balance": "113400", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "102366", "Unpaid Principal Balance": "244985.89", "Pre-Modification": "01/09/2020", "Post-Modification": "01/12/2020", "Modification Type": "Extension" }, { "Loan ID": "108803", "Unpaid Principal Balance": "106704", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "108931", "Unpaid Principal Balance": "105750", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "107805", "Unpaid Principal Balance": "84700", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "108410", "Unpaid Principal Balance": "699930.05", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "104722", "Unpaid Principal Balance": "107599.35", "Pre-Modification": "01/02/2021", "Post-Modification": "01/06/2050", "Modification Type": "Extension" }, { "Loan ID": "106685", "Unpaid Principal Balance": "65800", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "108208", "Unpaid Principal Balance": "83997.02", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "108863", "Unpaid Principal Balance": "41500", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "108705", "Unpaid Principal Balance": "258995.97", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "58509", "Unpaid Principal Balance": "142998.24", "Pre-Modification": "01/10/2019", "Post-Modification": "01/07/2020", "Modification Type": "Extension" }, { "Loan ID": "108600", "Unpaid Principal Balance": "53210", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "104361", "Unpaid Principal Balance": "138740", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "108532", "Unpaid Principal Balance": "50400", "Pre-Modification": "10/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "108367", "Unpaid Principal Balance": "177173.5", "Pre-Modification": "01/04/2021", "Post-Modification": "10/05/2021", "Modification Type": "Extension" }, { "Loan ID": "105590", "Unpaid Principal Balance": "71250", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "104902", "Unpaid Principal Balance": "562454.01", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "105297", "Unpaid Principal Balance": "91971", "Pre-Modification": "01/02/2021", "Post-Modification": "01/06/2050", "Modification Type": "Extension" }, { "Loan ID": "105292", "Unpaid Principal Balance": "198750", "Pre-Modification": "01/03/2050", "Post-Modification": "01/03/2050", "Modification Type": "Extension" }, { "Loan ID": "103363", "Unpaid Principal Balance": "118984.26", "Pre-Modification": "01/11/2020", "Post-Modification": "01/11/2020", "Modification Type": "Extension" }, { "Loan ID": "108043", "Unpaid Principal Balance": "136440", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "102273", "Unpaid Principal Balance": "258750", "Pre-Modification": "01/09/2020", "Post-Modification": "01/09/2020", "Modification Type": "Extension" }, { "Loan ID": "107960", "Unpaid Principal Balance": "193690", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "108770", "Unpaid Principal Balance": "189000", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "108394", "Unpaid Principal Balance": "109173.74", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "105374", "Unpaid Principal Balance": "184500", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "105605", "Unpaid Principal Balance": "412500", "Pre-Modification": "01/03/2050", "Post-Modification": "01/03/2050", "Modification Type": "Extension" }, { "Loan ID": "105569", "Unpaid Principal Balance": "474772.5", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "108261", "Unpaid Principal Balance": "93798.63", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "108591", "Unpaid Principal Balance": "182900", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "108580", "Unpaid Principal Balance": "126100", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "104643", "Unpaid Principal Balance": "105390", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "108867", "Unpaid Principal Balance": "296838", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "108847", "Unpaid Principal Balance": "120600", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "105485", "Unpaid Principal Balance": "124000", "Pre-Modification": "01/03/2050", "Post-Modification": "01/03/2050", "Modification Type": "Extension" }, { "Loan ID": "108151", "Unpaid Principal Balance": "61390", "Pre-Modification": "01/03/2050", "Post-Modification": "01/03/2050", "Modification Type": "Extension" }, { "Loan ID": "107841", "Unpaid Principal Balance": "115941.38", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "100569", "Unpaid Principal Balance": "35050.5", "Pre-Modification": "01/06/2020", "Post-Modification": "01/06/2020", "Modification Type": "Extension" }, { "Loan ID": "108232", "Unpaid Principal Balance": "146300", "Pre-Modification": "01/03/2050", "Post-Modification": "01/03/2050", "Modification Type": "Extension" }, { "Loan ID": "108549", "Unpaid Principal Balance": "157500", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "108075", "Unpaid Principal Balance": "750960", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "108815", "Unpaid Principal Balance": "443468.7", "Pre-Modification": "10/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "109073", "Unpaid Principal Balance": "167200", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "108046", "Unpaid Principal Balance": "1897000", "Pre-Modification": "01/05/2022", "Post-Modification": "01/05/2022", "Modification Type": "Extension" }, { "Loan ID": "108741", "Unpaid Principal Balance": "63750", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "105058", "Unpaid Principal Balance": "54589.86", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "108594", "Unpaid Principal Balance": "78000", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "108187", "Unpaid Principal Balance": "255000", "Pre-Modification": "01/03/2050", "Post-Modification": "01/03/2050", "Modification Type": "Extension" }, { "Loan ID": "20064", "Unpaid Principal Balance": "306360", "Pre-Modification": "", "Post-Modification": "01/07/2020", "Modification Type": "Extension" }, { "Loan ID": "108202", "Unpaid Principal Balance": "125280", "Pre-Modification": "10/04/2050", "Post-Modification": "10/04/2050", "Modification Type": "Extension" }, { "Loan ID": "108602", "Unpaid Principal Balance": "48996.43", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "108347", "Unpaid Principal Balance": "75870", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "108875", "Unpaid Principal Balance": "76500", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "108174", "Unpaid Principal Balance": "77250", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "108159", "Unpaid Principal Balance": "579150", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "108439", "Unpaid Principal Balance": "105000", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "107853", "Unpaid Principal Balance": "134000", "Pre-Modification": "01/03/2050", "Post-Modification": "01/03/2050", "Modification Type": "Extension" }, { "Loan ID": "109572", "Unpaid Principal Balance": "2040500", "Pre-Modification": "01/03/2022", "Post-Modification": "01/03/2022", "Modification Type": "Extension" }, { "Loan ID": "103529", "Unpaid Principal Balance": "142787.99", "Pre-Modification": "01/01/2021", "Post-Modification": "01/01/2021", "Modification Type": "Extension" }, { "Loan ID": "108449", "Unpaid Principal Balance": "129498.43", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "108656", "Unpaid Principal Balance": "105570", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "104583", "Unpaid Principal Balance": "63517.5", "Pre-Modification": "01/01/2021", "Post-Modification": "01/01/2021", "Modification Type": "Extension" }, { "Loan ID": "108868", "Unpaid Principal Balance": "296838", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "105496", "Unpaid Principal Balance": "120800", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "108671", "Unpaid Principal Balance": "192000", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "107794", "Unpaid Principal Balance": "406000", "Pre-Modification": "01/03/2050", "Post-Modification": "01/03/2050", "Modification Type": "Extension" }, { "Loan ID": "105140", "Unpaid Principal Balance": "153900", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "108589", "Unpaid Principal Balance": "87000", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "109045", "Unpaid Principal Balance": "151580", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "109033", "Unpaid Principal Balance": "158416.52", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "104468", "Unpaid Principal Balance": "60200", "Pre-Modification": "01/03/2022", "Post-Modification": "01/03/2022", "Modification Type": "Extension" }, { "Loan ID": "108685", "Unpaid Principal Balance": "109800", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "102556", "Unpaid Principal Balance": "139995", "Pre-Modification": "01/09/2020", "Post-Modification": "01/09/2020", "Modification Type": "Extension" }, { "Loan ID": "102543", "Unpaid Principal Balance": "69750", "Pre-Modification": "01/09/2020", "Post-Modification": "01/09/2020", "Modification Type": "Extension" }, { "Loan ID": "108132", "Unpaid Principal Balance": "124650", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "108657", "Unpaid Principal Balance": "101493.65", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "102554", "Unpaid Principal Balance": "223269.76", "Pre-Modification": "01/09/2020", "Post-Modification": "01/09/2020", "Modification Type": "Extension" }, { "Loan ID": "107928", "Unpaid Principal Balance": "74750", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "108361", "Unpaid Principal Balance": "87345", "Pre-Modification": "01/04/2021", "Post-Modification": "10/05/2021", "Modification Type": "Extension" }, { "Loan ID": "104474", "Unpaid Principal Balance": "107250", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "108489", "Unpaid Principal Balance": "334376.87", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "108390", "Unpaid Principal Balance": "124653.18", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "105114", "Unpaid Principal Balance": "179650", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "108090", "Unpaid Principal Balance": "95200", "Pre-Modification": "01/03/2050", "Post-Modification": "01/03/2050", "Modification Type": "Extension" }, { "Loan ID": "105680", "Unpaid Principal Balance": "84000", "Pre-Modification": "01/03/2050", "Post-Modification": "01/03/2050", "Modification Type": "Extension" }, { "Loan ID": "108784", "Unpaid Principal Balance": "135000", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "108994", "Unpaid Principal Balance": "105675", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "105695", "Unpaid Principal Balance": "98246.54", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "104645", "Unpaid Principal Balance": "137900.3", "Pre-Modification": "01/01/2021", "Post-Modification": "01/01/2021", "Modification Type": "Extension" }, { "Loan ID": "108564", "Unpaid Principal Balance": "158400", "Pre-Modification": "01/03/2050", "Post-Modification": "01/03/2050", "Modification Type": "Extension" }, { "Loan ID": "108540", "Unpaid Principal Balance": "194975.2", "Pre-Modification": "10/05/2021", "Post-Modification": "10/05/2021", "Modification Type": "Extension" }, { "Loan ID": "104538", "Unpaid Principal Balance": "139988.55", "Pre-Modification": "01/01/2021", "Post-Modification": "01/01/2021", "Modification Type": "Extension" }, { "Loan ID": "108315", "Unpaid Principal Balance": "2485000", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "104876", "Unpaid Principal Balance": "161000", "Pre-Modification": "01/03/2050", "Post-Modification": "01/03/2050", "Modification Type": "Extension" }, { "Loan ID": "108827", "Unpaid Principal Balance": "123070", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "59440", "Unpaid Principal Balance": "108099", "Pre-Modification": "01/02/2020", "Post-Modification": "01/11/2020", "Modification Type": "Extension" }, { "Loan ID": "108038", "Unpaid Principal Balance": "69300", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "108419", "Unpaid Principal Balance": "62400", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "105649", "Unpaid Principal Balance": "82500", "Pre-Modification": "01/03/2050", "Post-Modification": "01/03/2050", "Modification Type": "Extension" }, { "Loan ID": "103710", "Unpaid Principal Balance": "332090.1", "Pre-Modification": "01/12/2020", "Post-Modification": "01/12/2020", "Modification Type": "Extension" }, { "Loan ID": "108396", "Unpaid Principal Balance": "178482.9", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "107948", "Unpaid Principal Balance": "397800", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "105562", "Unpaid Principal Balance": "122400", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "108276", "Unpaid Principal Balance": "1012000", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "103923", "Unpaid Principal Balance": "290831.89", "Pre-Modification": "01/12/2020", "Post-Modification": "01/12/2020", "Modification Type": "Extension" }, { "Loan ID": "107800", "Unpaid Principal Balance": "66500", "Pre-Modification": "01/03/2050", "Post-Modification": "01/03/2050", "Modification Type": "Extension" }, { "Loan ID": "108418", "Unpaid Principal Balance": "122496.87", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "108590", "Unpaid Principal Balance": "268450", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "104546", "Unpaid Principal Balance": "52500", "Pre-Modification": "01/01/2050", "Post-Modification": "01/01/2050", "Modification Type": "Extension" }, { "Loan ID": "108498", "Unpaid Principal Balance": "195962.3", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "108474", "Unpaid Principal Balance": "67121.7", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "105173", "Unpaid Principal Balance": "1430800", "Pre-Modification": "09/03/2050", "Post-Modification": "09/03/2050", "Modification Type": "Extension" }, { "Loan ID": "108968", "Unpaid Principal Balance": "335700", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "107947", "Unpaid Principal Balance": "88000", "Pre-Modification": "01/03/2050", "Post-Modification": "01/03/2050", "Modification Type": "Extension" }, { "Loan ID": "108792", "Unpaid Principal Balance": "75021.3", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "102323", "Unpaid Principal Balance": "83290.72", "Pre-Modification": "01/09/2020", "Post-Modification": "01/09/2020", "Modification Type": "Extension" }, { "Loan ID": "108429", "Unpaid Principal Balance": "208800", "Pre-Modification": "01/03/2022", "Post-Modification": "01/03/2022", "Modification Type": "Extension" }, { "Loan ID": "103674", "Unpaid Principal Balance": "98422.5", "Pre-Modification": "01/12/2020", "Post-Modification": "01/12/2020", "Modification Type": "Extension" }, { "Loan ID": "107940", "Unpaid Principal Balance": "116000", "Pre-Modification": "01/03/2050", "Post-Modification": "01/03/2050", "Modification Type": "Extension" }, { "Loan ID": "105689", "Unpaid Principal Balance": "61701.6", "Pre-Modification": "01/03/2021", "Post-Modification": "01/03/2021", "Modification Type": "Extension" }, { "Loan ID": "107961", "Unpaid Principal Balance": "236000", "Pre-Modification": "01/03/2021", "Post-Modification": "01/03/2021", "Modification Type": "Extension" }, { "Loan ID": "108212", "Unpaid Principal Balance": "1164750", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "108270", "Unpaid Principal Balance": "623250", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "108230", "Unpaid Principal Balance": "66000", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "108773", "Unpaid Principal Balance": "769500", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "108118", "Unpaid Principal Balance": "102800", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "108654", "Unpaid Principal Balance": "2716000", "Pre-Modification": "09/03/2050", "Post-Modification": "09/03/2050", "Modification Type": "Extension" }, { "Loan ID": "102399", "Unpaid Principal Balance": "85680", "Pre-Modification": "01/09/2020", "Post-Modification": "01/09/2020", "Modification Type": "Extension" }, { "Loan ID": "105750", "Unpaid Principal Balance": "67870", "Pre-Modification": "01/03/2050", "Post-Modification": "01/03/2050", "Modification Type": "Extension" }, { "Loan ID": "58656", "Unpaid Principal Balance": "162351", "Pre-Modification": "10/12/2019", "Post-Modification": "01/11/2020", "Modification Type": "Extension" }, { "Loan ID": "108441", "Unpaid Principal Balance": "90225", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "105583", "Unpaid Principal Balance": "137500", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "107823", "Unpaid Principal Balance": "69200", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "108805", "Unpaid Principal Balance": "100000", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "104571", "Unpaid Principal Balance": "82500", "Pre-Modification": "01/01/2050", "Post-Modification": "01/01/2050", "Modification Type": "Extension" }, { "Loan ID": "105473", "Unpaid Principal Balance": "324450", "Pre-Modification": "01/03/2050", "Post-Modification": "01/03/2050", "Modification Type": "Extension" }, { "Loan ID": "108510", "Unpaid Principal Balance": "66257.5", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "108812", "Unpaid Principal Balance": "156960", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "105264", "Unpaid Principal Balance": "52500", "Pre-Modification": "01/03/2050", "Post-Modification": "10/04/2050", "Modification Type": "Extension" }, { "Loan ID": "108575", "Unpaid Principal Balance": "371400", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "108631", "Unpaid Principal Balance": "609367.5", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "108495", "Unpaid Principal Balance": "278370", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "105647", "Unpaid Principal Balance": "73500", "Pre-Modification": "01/03/2050", "Post-Modification": "10/04/2050", "Modification Type": "Extension" }, { "Loan ID": "109198", "Unpaid Principal Balance": "131250", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "108466", "Unpaid Principal Balance": "266225.97", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "108105", "Unpaid Principal Balance": "94500", "Pre-Modification": "01/03/2050", "Post-Modification": "01/03/2050", "Modification Type": "Extension" }, { "Loan ID": "108170", "Unpaid Principal Balance": "55250", "Pre-Modification": "01/03/2050", "Post-Modification": "01/03/2050", "Modification Type": "Extension" }, { "Loan ID": "105392", "Unpaid Principal Balance": "1657250", "Pre-Modification": "09/03/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "102666", "Unpaid Principal Balance": "66600", "Pre-Modification": "01/09/2020", "Post-Modification": "01/09/2020", "Modification Type": "Extension" }, { "Loan ID": "102303", "Unpaid Principal Balance": "310771.54", "Pre-Modification": "01/09/2020", "Post-Modification": "01/12/2020", "Modification Type": "Extension" }, { "Loan ID": "108244", "Unpaid Principal Balance": "128800", "Pre-Modification": "01/04/2022", "Post-Modification": "01/04/2022", "Modification Type": "Extension" }, { "Loan ID": "109516", "Unpaid Principal Balance": "110250", "Pre-Modification": "01/09/2021", "Post-Modification": "01/09/2021", "Modification Type": "Extension" }, { "Loan ID": "108246", "Unpaid Principal Balance": "91875", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "108551", "Unpaid Principal Balance": "53200", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "107904", "Unpaid Principal Balance": "399000", "Pre-Modification": "01/04/2022", "Post-Modification": "01/04/2022", "Modification Type": "Extension" }, { "Loan ID": "108872", "Unpaid Principal Balance": "304938", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "102611", "Unpaid Principal Balance": "69990.69", "Pre-Modification": "01/10/2020", "Post-Modification": "01/10/2020", "Modification Type": "Extension" }, { "Loan ID": "108058", "Unpaid Principal Balance": "125338.5", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "108147", "Unpaid Principal Balance": "243750", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "108725", "Unpaid Principal Balance": "118680", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "108259", "Unpaid Principal Balance": "169371.9", "Pre-Modification": "10/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "104664", "Unpaid Principal Balance": "3379200", "Pre-Modification": "09/04/2050", "Post-Modification": "09/04/2050", "Modification Type": "Extension" }, { "Loan ID": "107834", "Unpaid Principal Balance": "93892.5", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "108895", "Unpaid Principal Balance": "64980", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "108742", "Unpaid Principal Balance": "236234.25", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "103137", "Unpaid Principal Balance": "118638", "Pre-Modification": "01/11/2020", "Post-Modification": "01/11/2020", "Modification Type": "Extension" }, { "Loan ID": "108106", "Unpaid Principal Balance": "116000", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "108629", "Unpaid Principal Balance": "543712.5", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "108110", "Unpaid Principal Balance": "85384.65", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "109140", "Unpaid Principal Balance": "143708.58", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "108627", "Unpaid Principal Balance": "126365.4", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "105758", "Unpaid Principal Balance": "287000", "Pre-Modification": "01/03/2050", "Post-Modification": "01/03/2050", "Modification Type": "Extension" }, { "Loan ID": "108459", "Unpaid Principal Balance": "154400", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "108093", "Unpaid Principal Balance": "75780", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "108678", "Unpaid Principal Balance": "42075", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "109047", "Unpaid Principal Balance": "169146.9", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "104551", "Unpaid Principal Balance": "1208340", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "105533", "Unpaid Principal Balance": "115500", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "108158", "Unpaid Principal Balance": "472550", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "108281", "Unpaid Principal Balance": "52644.8", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "108771", "Unpaid Principal Balance": "77355", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "105046", "Unpaid Principal Balance": "102300", "Pre-Modification": "01/02/2050", "Post-Modification": "01/02/2050", "Modification Type": "Extension" }, { "Loan ID": "108310", "Unpaid Principal Balance": "105600", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "107807", "Unpaid Principal Balance": "87000", "Pre-Modification": "01/03/2050", "Post-Modification": "01/03/2050", "Modification Type": "Extension" }, { "Loan ID": "108642", "Unpaid Principal Balance": "84000", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "106675", "Unpaid Principal Balance": "61600", "Pre-Modification": "01/03/2050", "Post-Modification": "01/03/2050", "Modification Type": "Extension" }, { "Loan ID": "108002", "Unpaid Principal Balance": "77144", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "108455", "Unpaid Principal Balance": "42500", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "104275", "Unpaid Principal Balance": "185480.66", "Pre-Modification": "01/03/2021", "Post-Modification": "01/03/2021", "Modification Type": "Extension" }, { "Loan ID": "105650", "Unpaid Principal Balance": "92400", "Pre-Modification": "01/03/2050", "Post-Modification": "01/03/2050", "Modification Type": "Extension" }, { "Loan ID": "108504", "Unpaid Principal Balance": "144950", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "108482", "Unpaid Principal Balance": "124200", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "108625", "Unpaid Principal Balance": "60030", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "58875", "Unpaid Principal Balance": "126690.87", "Pre-Modification": "01/02/2020", "Post-Modification": "01/05/2020", "Modification Type": "Extension" }, { "Loan ID": "108008", "Unpaid Principal Balance": "97300", "Pre-Modification": "01/03/2050", "Post-Modification": "01/03/2050", "Modification Type": "Extension" }, { "Loan ID": "108034", "Unpaid Principal Balance": "161850", "Pre-Modification": "01/04/2022", "Post-Modification": "01/04/2022", "Modification Type": "Extension" }, { "Loan ID": "107819", "Unpaid Principal Balance": "100800", "Pre-Modification": "01/03/2050", "Post-Modification": "10/04/2050", "Modification Type": "Extension" }, { "Loan ID": "102645", "Unpaid Principal Balance": "371187", "Pre-Modification": "01/09/2020", "Post-Modification": "01/09/2020", "Modification Type": "Extension" }, { "Loan ID": "108595", "Unpaid Principal Balance": "88500", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "108368", "Unpaid Principal Balance": "170802.5", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "108468", "Unpaid Principal Balance": "138040", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "105709", "Unpaid Principal Balance": "251550", "Pre-Modification": "01/03/2050", "Post-Modification": "01/03/2050", "Modification Type": "Extension" }, { "Loan ID": "108973", "Unpaid Principal Balance": "168921.9", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "103929", "Unpaid Principal Balance": "116059.5", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "108427", "Unpaid Principal Balance": "132468.3", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "108067", "Unpaid Principal Balance": "123003.88", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "106674", "Unpaid Principal Balance": "35575.24", "Pre-Modification": "01/03/2021", "Post-Modification": "01/03/2021", "Modification Type": "Extension" }, { "Loan ID": "109074", "Unpaid Principal Balance": "165150", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "108518", "Unpaid Principal Balance": "562498.86", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "108607", "Unpaid Principal Balance": "1375515", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "102978", "Unpaid Principal Balance": "228868.94", "Pre-Modification": "10/12/2020", "Post-Modification": "01/11/2020", "Modification Type": "Extension" }, { "Loan ID": "108989", "Unpaid Principal Balance": "59500", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "108131", "Unpaid Principal Balance": "256300", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "105620", "Unpaid Principal Balance": "111375", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "108201", "Unpaid Principal Balance": "139750", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "109387", "Unpaid Principal Balance": "95540.08", "Pre-Modification": "01/09/2021", "Post-Modification": "01/09/2021", "Modification Type": "Extension" }, { "Loan ID": "108578", "Unpaid Principal Balance": "59500", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "108688", "Unpaid Principal Balance": "90000", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "108497", "Unpaid Principal Balance": "181978.5", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "59725", "Unpaid Principal Balance": "87492.42", "Pre-Modification": "01/02/2020", "Post-Modification": "01/12/2020", "Modification Type": "Extension" }, { "Loan ID": "105295", "Unpaid Principal Balance": "89250", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "107992", "Unpaid Principal Balance": "247000", "Pre-Modification": "01/04/2022", "Post-Modification": "01/04/2022", "Modification Type": "Extension" }, { "Loan ID": "108191", "Unpaid Principal Balance": "77000", "Pre-Modification": "01/04/2022", "Post-Modification": "01/04/2022", "Modification Type": "Extension" }, { "Loan ID": "107890", "Unpaid Principal Balance": "112000", "Pre-Modification": "10/04/2050", "Post-Modification": "10/04/2050", "Modification Type": "Extension" }, { "Loan ID": "107973", "Unpaid Principal Balance": "520200", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "108092", "Unpaid Principal Balance": "138750", "Pre-Modification": "01/03/2050", "Post-Modification": "01/03/2050", "Modification Type": "Extension" }, { "Loan ID": "109055", "Unpaid Principal Balance": "363000", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "105658", "Unpaid Principal Balance": "1224720", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "108845", "Unpaid Principal Balance": "119210", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "108587", "Unpaid Principal Balance": "57420", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "108707", "Unpaid Principal Balance": "148005", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "108036", "Unpaid Principal Balance": "113445", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "109441", "Unpaid Principal Balance": "103827.5", "Pre-Modification": "01/09/2021", "Post-Modification": "01/09/2021", "Modification Type": "Extension" }, { "Loan ID": "108458", "Unpaid Principal Balance": "91000", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "109200", "Unpaid Principal Balance": "146625", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "108127", "Unpaid Principal Balance": "60718.5", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "108352", "Unpaid Principal Balance": "136500", "Pre-Modification": "01/04/2050", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "104460", "Unpaid Principal Balance": "170811", "Pre-Modification": "01/03/2021", "Post-Modification": "01/03/2021", "Modification Type": "Extension" }, { "Loan ID": "108572", "Unpaid Principal Balance": "351750", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "59956", "Unpaid Principal Balance": "54720", "Pre-Modification": "01/02/2020", "Post-Modification": "01/08/2020", "Modification Type": "Extension" }, { "Loan ID": "108638", "Unpaid Principal Balance": "268025.36", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "108502", "Unpaid Principal Balance": "70000", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "107873", "Unpaid Principal Balance": "96000", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "105002", "Unpaid Principal Balance": "66203.1", "Pre-Modification": "10/05/2021", "Post-Modification": "10/05/2021", "Modification Type": "Extension" }, { "Loan ID": "108296", "Unpaid Principal Balance": "66690", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "108225", "Unpaid Principal Balance": "60000", "Pre-Modification": "10/04/2050", "Post-Modification": "10/04/2050", "Modification Type": "Extension" }, { "Loan ID": "108691", "Unpaid Principal Balance": "102900", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "104960", "Unpaid Principal Balance": "58860", "Pre-Modification": "01/02/2050", "Post-Modification": "01/02/2050", "Modification Type": "Extension" }, { "Loan ID": "108321", "Unpaid Principal Balance": "133000", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "108480", "Unpaid Principal Balance": "545670", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "105244", "Unpaid Principal Balance": "67850", "Pre-Modification": "01/04/2021", "Post-Modification": "10/04/2021", "Modification Type": "Extension" }, { "Loan ID": "108294", "Unpaid Principal Balance": "256895.39", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "108211", "Unpaid Principal Balance": "114092.55", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "104734", "Unpaid Principal Balance": "93750", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "108417", "Unpaid Principal Balance": "78400", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "107963", "Unpaid Principal Balance": "119052", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "107964", "Unpaid Principal Balance": "84000", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "108119", "Unpaid Principal Balance": "568800", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "108337", "Unpaid Principal Balance": "80600", "Pre-Modification": "01/03/2050", "Post-Modification": "01/03/2050", "Modification Type": "Extension" }, { "Loan ID": "108702", "Unpaid Principal Balance": "172000", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "108689", "Unpaid Principal Balance": "102750", "Pre-Modification": "01/04/2050", "Post-Modification": "01/04/2050", "Modification Type": "Extension" }, { "Loan ID": "103484", "Unpaid Principal Balance": "120172.5", "Pre-Modification": "01/04/2021", "Post-Modification": "01/04/2021", "Modification Type": "Extension" }, { "Loan ID": "108978", "Unpaid Principal Balance": "126000", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }, { "Loan ID": "108400", "Unpaid Principal Balance": "94491.97", "Pre-Modification": "01/05/2021", "Post-Modification": "01/05/2021", "Modification Type": "Extension" }], "State": [{ "State": "FL", "Count": 46, "$ Aggregate": "6894981.25", "% Aggregate": "8.73", "$ Average": "149890.90", "% Interest Rate": "7.42" }, { "State": "TN", "Count": 7, "$ Aggregate": "2009157.05", "% Aggregate": "2.54", "$ Average": "287022.44", "% Interest Rate": "5.96" }, { "State": "GA", "Count": 45, "$ Aggregate": "9398957.72", "% Aggregate": "11.90", "$ Average": "208865.73", "% Interest Rate": "7.46" }, { "State": "IL", "Count": 30, "$ Aggregate": "4074574.15", "% Aggregate": "5.16", "$ Average": "135819.14", "% Interest Rate": "9.00" }, { "State": "MN", "Count": 2, "$ Aggregate": "373716.21", "% Aggregate": "0.47", "$ Average": "186858.11", "% Interest Rate": "6.68" }, { "State": "PA", "Count": 37, "$ Aggregate": "6585531.28", "% Aggregate": "8.33", "$ Average": "177987.33", "% Interest Rate": "6.83" }, { "State": "SC", "Count": 21, "$ Aggregate": "6450113.13", "% Aggregate": "8.16", "$ Average": "307148.24", "% Interest Rate": "6.38" }, { "State": "OH", "Count": 43, "$ Aggregate": "4606803.18", "% Aggregate": "5.83", "$ Average": "107134.96", "% Interest Rate": "8.09" }, { "State": "VA", "Count": 14, "$ Aggregate": "1600789.72", "% Aggregate": "2.03", "$ Average": "114342.12", "% Interest Rate": "9.14" }, { "State": "MD", "Count": 30, "$ Aggregate": "6772823.36", "% Aggregate": "8.57", "$ Average": "225760.78", "% Interest Rate": "5.99" }, { "State": "NC", "Count": 23, "$ Aggregate": "5443461.47", "% Aggregate": "6.89", "$ Average": "236672.24", "% Interest Rate": "6.53" }, { "State": "CT", "Count": 2, "$ Aggregate": "210387.10", "% Aggregate": "0.27", "$ Average": "105193.55", "% Interest Rate": "8.75" }, { "State": "NJ", "Count": 28, "$ Aggregate": "4254104.14", "% Aggregate": "5.38", "$ Average": "151932.29", "% Interest Rate": "8.35" }, { "State": "MO", "Count": 8, "$ Aggregate": "697852.22", "% Aggregate": "0.88", "$ Average": "87231.53", "% Interest Rate": "6.74" }, { "State": "MI", "Count": 14, "$ Aggregate": "2612090.70", "% Aggregate": "3.31", "$ Average": "186577.91", "% Interest Rate": "6.45" }, { "State": "IN", "Count": 26, "$ Aggregate": "2973371.96", "% Aggregate": "3.76", "$ Average": "114360.46", "% Interest Rate": "7.51" }, { "State": "IA", "Count": 1, "$ Aggregate": "59155.98", "% Aggregate": "0.07", "$ Average": "59155.98", "% Interest Rate": "6.55" }, { "State": "DE", "Count": 3, "$ Aggregate": "315319.82", "% Aggregate": "0.40", "$ Average": "105106.61", "% Interest Rate": "7.17" }, { "State": "NY", "Count": 8, "$ Aggregate": "925023.24", "% Aggregate": "1.17", "$ Average": "115627.90", "% Interest Rate": "8.23" }, { "State": "LA", "Count": 5, "$ Aggregate": "477274.88", "% Aggregate": "0.60", "$ Average": "95454.98", "% Interest Rate": "9.40" }, { "State": "TX", "Count": 12, "$ Aggregate": "1810629.49", "% Aggregate": "2.29", "$ Average": "150885.79", "% Interest Rate": "8.78" }, { "State": "NM", "Count": 2, "$ Aggregate": "101485.82", "% Aggregate": "0.13", "$ Average": "50742.91", "% Interest Rate": "11.00" }, { "State": "CA", "Count": 6, "$ Aggregate": "2556724.43", "% Aggregate": "3.24", "$ Average": "426120.74", "% Interest Rate": "7.28" }, { "State": "KY", "Count": 2, "$ Aggregate": "69646.16", "% Aggregate": "0.09", "$ Average": "34823.08", "% Interest Rate": "7.20" }, { "State": "WI", "Count": 4, "$ Aggregate": "339123.88", "% Aggregate": "0.43", "$ Average": "84780.97", "% Interest Rate": "8.12" }, { "State": "AL", "Count": 4, "$ Aggregate": "660276.22", "% Aggregate": "0.84", "$ Average": "165069.05", "% Interest Rate": "9.35" }, { "State": "OK", "Count": 3, "$ Aggregate": "299787.18", "% Aggregate": "0.38", "$ Average": "99929.06", "% Interest Rate": "10.08" }, { "State": "AZ", "Count": 2, "$ Aggregate": "334389.29", "% Aggregate": "0.42", "$ Average": "167194.64", "% Interest Rate": "6.75" }, { "State": "MS", "Count": 4, "$ Aggregate": "393816.68", "% Aggregate": "0.50", "$ Average": "98454.17", "% Interest Rate": "6.12" }, { "State": "DC", "Count": 2, "$ Aggregate": "1544425.00", "% Aggregate": "1.95", "$ Average": "772212.50", "% Interest Rate": "6.86" }, { "State": "NV", "Count": 1, "$ Aggregate": "1717918.82", "% Aggregate": "2.17", "$ Average": "1717918.82", "% Interest Rate": "6.70" }, { "State": "WA", "Count": 2, "$ Aggregate": "2283361.38", "% Aggregate": "2.89", "$ Average": "1141680.69", "% Interest Rate": "8.46" }, { "State": "WV", "Count": 1, "$ Aggregate": "67121.70", "% Aggregate": "0.08", "$ Average": "67121.70", "% Interest Rate": "10.50" }, { "State": "KS", "Count": 1, "$ Aggregate": "100000.00", "% Aggregate": "0.13", "$ Average": "100000.00", "% Interest Rate": "8.25" }, { "State": "Total:", "Count": "439", "$ Aggregate": "79014194.61", "% Aggregate": "100.00", "$ Average": "8235077.32", "% Interest Rate": "264.08" }], "LoanType": [{ "Loan Type *": "Commit NC NF", "Count": 42, "$ Aggregate": "5735501.44", "% Aggregate": "7.26", "$ Average": "136559.56", "% Interest Rate": "8.53" }, { "Loan Type *": "Bridge+ PO", "Count": 39, "$ Aggregate": "7411959.10", "% Aggregate": "9.38", "$ Average": "190050.23", "% Interest Rate": "8.26" }, { "Loan Type *": "Fixed R30", "Count": 71, "$ Aggregate": "8845547.41", "% Aggregate": "11.19", "$ Average": "124585.17", "% Interest Rate": "6.16" }, { "Loan Type *": "Commit NF", "Count": 70, "$ Aggregate": "9788230.44", "% Aggregate": "12.39", "$ Average": "139831.86", "% Interest Rate": "8.40" }, { "Loan Type *": "Fully Escrow", "Count": 97, "$ Aggregate": "11908985.25", "% Aggregate": "15.07", "$ Average": "122773.04", "% Interest Rate": "10.41" }, { "Loan Type *": "5/1 R30", "Count": 51, "$ Aggregate": "6893648.81", "% Aggregate": "8.72", "$ Average": "135169.58", "% Interest Rate": "5.58" }, { "Loan Type *": "10/1 R30", "Count": 25, "$ Aggregate": "4260041.68", "% Aggregate": "5.39", "$ Average": "170401.67", "% Interest Rate": "5.81" }, { "Loan Type *": "F2R 10/1 R30", "Count": 1, "$ Aggregate": "108165.59", "% Aggregate": "0.14", "$ Average": "108165.59", "% Interest Rate": "5.28" }, { "Loan Type *": "Fully Escrow NC", "Count": 5, "$ Aggregate": "1000032.18", "% Aggregate": "1.27", "$ Average": "200006.44", "% Interest Rate": "10.48" }, { "Loan Type *": "Commit MF NF", "Count": 3, "$ Aggregate": "4177959.45", "% Aggregate": "5.29", "$ Average": "1392653.15", "% Interest Rate": "6.70" }, { "Loan Type *": "10/1 R30 Prem", "Count": 4, "$ Aggregate": "6511008.43", "% Aggregate": "8.24", "$ Average": "1627752.11", "% Interest Rate": "5.04" }, { "Loan Type *": "2+1", "Count": 12, "$ Aggregate": "2166600.00", "% Aggregate": "2.74", "$ Average": "180550.00", "% Interest Rate": "7.74" }, { "Loan Type *": "CRL Fixed R30", "Count": 1, "$ Aggregate": "132420.95", "% Aggregate": "0.17", "$ Average": "132420.95", "% Interest Rate": "6.25" }, { "Loan Type *": "Commit", "Count": 2, "$ Aggregate": "971826.50", "% Aggregate": "1.23", "$ Average": "485913.25", "% Interest Rate": "8.10" }, { "Loan Type *": "Fixed R30 Prem", "Count": 4, "$ Aggregate": "3067292.98", "% Aggregate": "3.88", "$ Average": "766823.24", "% Interest Rate": "5.33" }, { "Loan Type *": "FNF Cash Out", "Count": 3, "$ Aggregate": "150000.00", "% Aggregate": "0.19", "$ Average": "50000.00", "% Interest Rate": "8.18" }, { "Loan Type *": "F2R Fixed R30", "Count": 2, "$ Aggregate": "180769.24", "% Aggregate": "0.23", "$ Average": "90384.62", "% Interest Rate": "6.35" }, { "Loan Type *": "5/1 R30 Prem", "Count": 3, "$ Aggregate": "5509738.66", "% Aggregate": "6.97", "$ Average": "1836579.55", "% Interest Rate": "4.79" }, { "Loan Type *": "F2R Commit NF", "Count": 4, "$ Aggregate": "194466.50", "% Aggregate": "0.25", "$ Average": "48616.63", "% Interest Rate": "9.22" }, { "Loan Type *": "Total:", "Count": "439", "$ Aggregate": "79014194.61", "% Aggregate": "100.00", "$ Average": "7939236.64", "% Interest Rate": "136.59" }], "CurrentMaturityDate": [{ "Current Maturity Date": 2021, "Count": 223, "$ Aggregate": "29395207.33", "% Aggregate": "37.20", "$ Average": "131817.07", "% Interest Rate": "8.97" }, { "Current Maturity Date": 2050, "Count": 160, "$ Aggregate": "33718891.46", "% Aggregate": "42.67", "$ Average": "210743.07", "% Interest Rate": "5.51" }, { "Current Maturity Date": 2020, "Count": 39, "$ Aggregate": "5956473.02", "% Aggregate": "7.54", "$ Average": "152730.08", "% Interest Rate": "9.73" }, { "Current Maturity Date": 2022, "Count": 15, "$ Aggregate": "8199959.45", "% Aggregate": "10.38", "$ Average": "546663.96", "% Interest Rate": "7.43" }, { "Current Maturity Date": 2019, "Count": 1, "$ Aggregate": "89995.50", "% Aggregate": "0.11", "$ Average": "89995.50", "% Interest Rate": "10.50" }, { "Current Maturity Date": 2030, "Count": 1, "$ Aggregate": "1653667.85", "% Aggregate": "2.09", "$ Average": "1653667.85", "% Interest Rate": "5.50" }, { "Current Maturity Date": "Total:", "Count": "439", "$ Aggregate": "79014194.61", "% Aggregate": "100.00", "$ Average": "2785617.53", "% Interest Rate": "47.64" }], "LoanExtended": [{ "Loan Extended": "No", "Count": 425, "$ Aggregate": "76306694.68", "% Aggregate": "96.57", "$ Average": "179545.16", "% Interest Rate": "7.25" }, { "Loan Extended": "Yes", "Count": 14, "$ Aggregate": "2707499.93", "% Aggregate": "3.43", "$ Average": "193392.85", "% Interest Rate": "9.25" }, { "Loan Extended": "Total:", "Count": "439", "$ Aggregate": "79014194.61", "% Aggregate": "100.00", "$ Average": "372938.01", "% Interest Rate": "16.50" }], "RemainingTerm": [{ "Remaining Term months": "< 0", "Count": 16, "$ Aggregate": "3206694.97", "% Aggregate": "4.06", "$ Average": "200418.44", "% Interest Rate": "9.30" }, { "Remaining Term months": "0 - 100", "Count": 263, "$ Aggregate": "40434940.33", "% Aggregate": "51.17", "$ Average": "153745.02", "% Interest Rate": "8.75" }, { "Remaining Term months": "100 - 200", "Count": 1, "$ Aggregate": "1653667.85", "% Aggregate": "2.09", "$ Average": "1653667.85", "% Interest Rate": "5.50" }, { "Remaining Term months": "300 - 400", "Count": 159, "$ Aggregate": "33718891.46", "% Aggregate": "42.67", "$ Average": "212068.50", "% Interest Rate": "5.51" }, { "Remaining Term months": "Total:", "Count": "439", "$ Aggregate": "79014194.61", "% Aggregate": "100.00", "$ Average": "2219899.81", "% Interest Rate": "29.06" }], "InvestorRate": [{ "Investor Rate": "0 - 10", "Count": 439, "$ Aggregate": "79014194.61", "% Aggregate": "100.00", "$ Average": "179986.78", "% Interest Rate": "7.32" }, { "Investor Rate": "Total:", "Count": "439", "$ Aggregate": "79014194.61", "% Aggregate": "100.00", "$ Average": "179986.78", "% Interest Rate": "7.32" }], "EndingPrincipalBalance": [{ "Ending Principal Balance": "< 0", "Count": 8, "$ Aggregate": "-110692.76", "% Aggregate": "0.14", "$ Average": "-13836.59", "% Interest Rate": "8.01" }, { "Ending Principal Balance": "0 - 10000", "Count": 25, "$ Aggregate": "2125.00", "% Aggregate": "0.00", "$ Average": "85.00", "% Interest Rate": "10.00" }, { "Ending Principal Balance": "10000 - 50000", "Count": 24, "$ Aggregate": "952216.36", "% Aggregate": "1.21", "$ Average": "39675.68", "% Interest Rate": "8.68" }, { "Ending Principal Balance": "50000 - 100000", "Count": 147, "$ Aggregate": "11016259.57", "% Aggregate": "13.94", "$ Average": "74940.54", "% Interest Rate": "7.89" }, { "Ending Principal Balance": "100000 - 500000", "Count": 212, "$ Aggregate": "39203520.21", "% Aggregate": "49.62", "$ Average": "184922.27", "% Interest Rate": "7.95" }, { "Ending Principal Balance": "500000 - 1000000", "Count": 13, "$ Aggregate": "8967746.36", "% Aggregate": "11.35", "$ Average": "689826.64", "% Interest Rate": "6.97" }, { "Ending Principal Balance": "1000000 +", "Count": 10, "$ Aggregate": "18983019.87", "% Aggregate": "24.02", "$ Average": "1898301.99", "% Interest Rate": "5.77" }, { "Ending Principal Balance": "Total:", "Count": "439", "$ Aggregate": "79014194.61", "% Aggregate": "100.00", "$ Average": "2873915.53", "% Interest Rate": "55.28" }], "City": [{ "City": "Palm Bay", "Count": 5, "$ Aggregate": "208662.48", "% Aggregate": "0.26", "$ Average": "41732.50", "% Interest Rate": "9.53" }, { "City": "Southport", "Count": 1, "$ Aggregate": "284000.00", "% Aggregate": "0.36", "$ Average": "284000.00", "% Interest Rate": "7.25" }, { "City": "Millington", "Count": 1, "$ Aggregate": "55734.13", "% Aggregate": "0.07", "$ Average": "55734.13", "% Interest Rate": "5.80" }, { "City": "Hephzibah", "Count": 1, "$ Aggregate": "39500.00", "% Aggregate": "0.05", "$ Average": "39500.00", "% Interest Rate": "11.00" }, { "City": "Berwyn", "Count": 2, "$ Aggregate": "303398.68", "% Aggregate": "0.38", "$ Average": "151699.34", "% Interest Rate": "9.40" }, { "City": "Pequot Lakes", "Count": 1, "$ Aggregate": "119752.82", "% Aggregate": "0.15", "$ Average": "119752.82", "% Interest Rate": "6.90" }, { "City": "Philadelphia", "Count": 24, "$ Aggregate": "4808848.99", "% Aggregate": "6.09", "$ Average": "200368.71", "% Interest Rate": "6.52" }, { "City": "Senoia", "Count": 1, "$ Aggregate": "93308.94", "% Aggregate": "0.12", "$ Average": "93308.94", "% Interest Rate": "4.65" }, { "City": "Scranton", "Count": 4, "$ Aggregate": "323508.19", "% Aggregate": "0.41", "$ Average": "80877.05", "% Interest Rate": "7.99" }, { "City": "Easley", "Count": 3, "$ Aggregate": "235668.55", "% Aggregate": "0.30", "$ Average": "78556.18", "% Interest Rate": "8.88" }, { "City": "Columbus", "Count": 20, "$ Aggregate": "1952856.24", "% Aggregate": "2.47", "$ Average": "97642.81", "% Interest Rate": "8.01" }, { "City": "Pensacola", "Count": 1, "$ Aggregate": "79934.35", "% Aggregate": "0.10", "$ Average": "79934.35", "% Interest Rate": "5.45" }, { "City": "Hampton", "Count": 2, "$ Aggregate": "231492.32", "% Aggregate": "0.29", "$ Average": "115746.16", "% Interest Rate": "10.27" }, { "City": "Baltimore", "Count": 26, "$ Aggregate": "4443259.82", "% Aggregate": "5.62", "$ Average": "170894.61", "% Interest Rate": "6.20" }, { "City": "Greenville", "Count": 4, "$ Aggregate": "4059548.19", "% Aggregate": "5.14", "$ Average": "1014887.05", "% Interest Rate": "5.50" }, { "City": "Gastonia", "Count": 2, "$ Aggregate": "185165.07", "% Aggregate": "0.23", "$ Average": "92582.54", "% Interest Rate": "5.83" }, { "City": "Riverdale", "Count": 2, "$ Aggregate": "105635.08", "% Aggregate": "0.13", "$ Average": "52817.54", "% Interest Rate": "9.55" }, { "City": "Bridgeport", "Count": 1, "$ Aggregate": "115895.13", "% Aggregate": "0.15", "$ Average": "115895.13", "% Interest Rate": "6.91" }, { "City": "Paterson", "Count": 1, "$ Aggregate": "234945.00", "% Aggregate": "0.30", "$ Average": "234945.00", "% Interest Rate": "10.00" }, { "City": "Chicago", "Count": 20, "$ Aggregate": "2810120.94", "% Aggregate": "3.56", "$ Average": "140506.05", "% Interest Rate": "9.17" }, { "City": "Charlotte", "Count": 6, "$ Aggregate": "883209.04", "% Aggregate": "1.12", "$ Average": "147201.51", "% Interest Rate": "7.60" }, { "City": "Imperial", "Count": 1, "$ Aggregate": "0.00", "% Aggregate": "0.00", "$ Average": "0.00", "% Interest Rate": "0.00" }, { "City": "Bedford", "Count": 1, "$ Aggregate": "61339.54", "% Aggregate": "0.08", "$ Average": "61339.54", "% Interest Rate": "6.38" }, { "City": "Hillside", "Count": 1, "$ Aggregate": "154977.92", "% Aggregate": "0.20", "$ Average": "154977.92", "% Interest Rate": "9.00" }, { "City": "Pontiac", "Count": 2, "$ Aggregate": "262264.22", "% Aggregate": "0.33", "$ Average": "131132.11", "% Interest Rate": "6.39" }, { "City": "Cleveland", "Count": 3, "$ Aggregate": "311260.18", "% Aggregate": "0.39", "$ Average": "103753.39", "% Interest Rate": "8.00" }, { "City": "Hammond", "Count": 2, "$ Aggregate": "154169.57", "% Aggregate": "0.20", "$ Average": "77084.79", "% Interest Rate": "9.70" }, { "City": "Ashville", "Count": 1, "$ Aggregate": "136492.13", "% Aggregate": "0.17", "$ Average": "136492.13", "% Interest Rate": "10.00" }, { "City": "Monroe", "Count": 1, "$ Aggregate": "2274940.63", "% Aggregate": "2.88", "$ Average": "2274940.63", "% Interest Rate": "6.49" }, { "City": "Pittsburgh", "Count": 1, "$ Aggregate": "55241.55", "% Aggregate": "0.07", "$ Average": "55241.55", "% Interest Rate": "11.50" }, { "City": "Trenton", "Count": 1, "$ Aggregate": "59283.09", "% Aggregate": "0.08", "$ Average": "59283.09", "% Interest Rate": "6.00" }, { "City": "Fort Walton Beach", "Count": 1, "$ Aggregate": "833328.24", "% Aggregate": "1.05", "$ Average": "833328.24", "% Interest Rate": "4.95" }, { "City": "Atlanta", "Count": 12, "$ Aggregate": "1746761.98", "% Aggregate": "2.21", "$ Average": "145563.50", "% Interest Rate": "7.60" }, { "City": "Dolton", "Count": 1, "$ Aggregate": "56920.00", "% Aggregate": "0.07", "$ Average": "56920.00", "% Interest Rate": "8.25" }, { "City": "Lithonia", "Count": 1, "$ Aggregate": "2125.00", "% Aggregate": "0.00", "$ Average": "2125.00", "% Interest Rate": "10.00" }, { "City": "Savannah", "Count": 2, "$ Aggregate": "338378.61", "% Aggregate": "0.43", "$ Average": "169189.30", "% Interest Rate": "5.47" }, { "City": "North Chesterfield", "Count": 1, "$ Aggregate": "424632.50", "% Aggregate": "0.54", "$ Average": "424632.50", "% Interest Rate": "9.25" }, { "City": "Detroit", "Count": 4, "$ Aggregate": "1053759.86", "% Aggregate": "1.33", "$ Average": "263439.97", "% Interest Rate": "6.02" }, { "City": "Newark", "Count": 3, "$ Aggregate": "553160.97", "% Aggregate": "0.70", "$ Average": "184386.99", "% Interest Rate": "8.85" }, { "City": "Athens", "Count": 2, "$ Aggregate": "851200.00", "% Aggregate": "1.08", "$ Average": "425600.00", "% Interest Rate": "9.90" }, { "City": "Richmond Heights", "Count": 1, "$ Aggregate": "168673.60", "% Aggregate": "0.21", "$ Average": "168673.60", "% Interest Rate": "11.25" }, { "City": "Port Saint Lucie", "Count": 4, "$ Aggregate": "244540.80", "% Aggregate": "0.31", "$ Average": "61135.20", "% Interest Rate": "8.48" }, { "City": "Logan Township", "Count": 1, "$ Aggregate": "139523.25", "% Aggregate": "0.18", "$ Average": "139523.25", "% Interest Rate": "9.25" }, { "City": "Des moines", "Count": 1, "$ Aggregate": "59155.98", "% Aggregate": "0.07", "$ Average": "59155.98", "% Interest Rate": "6.55" }, { "City": "Decatur", "Count": 3, "$ Aggregate": "139995.00", "% Aggregate": "0.18", "$ Average": "46665.00", "% Interest Rate": "10.00" }, { "City": "Wilmington", "Count": 3, "$ Aggregate": "315319.82", "% Aggregate": "0.40", "$ Average": "105106.61", "% Interest Rate": "7.17" }, { "City": "North Syracuse", "Count": 1, "$ Aggregate": "67200.00", "% Aggregate": "0.09", "$ Average": "67200.00", "% Interest Rate": "7.18" }, { "City": "Jacksonville", "Count": 4, "$ Aggregate": "541470.61", "% Aggregate": "0.69", "$ Average": "135367.65", "% Interest Rate": "7.50" }, { "City": "Hanahan", "Count": 1, "$ Aggregate": "0.00", "% Aggregate": "0.00", "$ Average": "0.00", "% Interest Rate": "0.00" }, { "City": "Kiamesha Lake", "Count": 1, "$ Aggregate": "128216.70", "% Aggregate": "0.16", "$ Average": "128216.70", "% Interest Rate": "10.00" }, { "City": "Pine Hill", "Count": 1, "$ Aggregate": "82880.00", "% Aggregate": "0.10", "$ Average": "82880.00", "% Interest Rate": "9.49" }, { "City": "Fort Myers", "Count": 6, "$ Aggregate": "806193.00", "% Aggregate": "1.02", "$ Average": "134365.50", "% Interest Rate": "8.43" }, { "City": "Cockeysville", "Count": 1, "$ Aggregate": "368653.90", "% Aggregate": "0.47", "$ Average": "368653.90", "% Interest Rate": "5.53" }, { "City": "Sicklerville", "Count": 1, "$ Aggregate": "111988.48", "% Aggregate": "0.14", "$ Average": "111988.48", "% Interest Rate": "10.00" }, { "City": "Auburn", "Count": 1, "$ Aggregate": "46297.50", "% Aggregate": "0.06", "$ Average": "46297.50", "% Interest Rate": "9.00" }, { "City": "Cincinatti", "Count": 1, "$ Aggregate": "108271.93", "% Aggregate": "0.14", "$ Average": "108271.93", "% Interest Rate": "6.20" }, { "City": "New Orleans", "Count": 1, "$ Aggregate": "164180.01", "% Aggregate": "0.21", "$ Average": "164180.01", "% Interest Rate": "8.75" }, { "City": "Williamsport", "Count": 1, "$ Aggregate": "89534.00", "% Aggregate": "0.11", "$ Average": "89534.00", "% Interest Rate": "9.00" }, { "City": "VERO BEACH", "Count": 1, "$ Aggregate": "283037.38", "% Aggregate": "0.36", "$ Average": "283037.38", "% Interest Rate": "6.38" }, { "City": "Parkville", "Count": 1, "$ Aggregate": "1653667.85", "% Aggregate": "2.09", "$ Average": "1653667.85", "% Interest Rate": "5.50" }, { "City": "East Dublin", "Count": 1, "$ Aggregate": "46399.50", "% Aggregate": "0.06", "$ Average": "46399.50", "% Interest Rate": "8.75" }, { "City": "Branchville", "Count": 1, "$ Aggregate": "117875.00", "% Aggregate": "0.15", "$ Average": "117875.00", "% Interest Rate": "10.00" }, { "City": "South Bend", "Count": 2, "$ Aggregate": "158313.07", "% Aggregate": "0.20", "$ Average": "79156.54", "% Interest Rate": "5.92" }, { "City": "Greensboro", "Count": 1, "$ Aggregate": "119697.35", "% Aggregate": "0.15", "$ Average": "119697.35", "% Interest Rate": "7.10" }, { "City": "San Antonio", "Count": 1, "$ Aggregate": "46000.00", "% Aggregate": "0.06", "$ Average": "46000.00", "% Interest Rate": "9.25" }, { "City": "Venice", "Count": 1, "$ Aggregate": "196500.00", "% Aggregate": "0.25", "$ Average": "196500.00", "% Interest Rate": "8.03" }, { "City": "Carlsbad", "Count": 1, "$ Aggregate": "101485.82", "% Aggregate": "0.13", "$ Average": "101485.82", "% Interest Rate": "11.00" }, { "City": "Florence", "Count": 1, "$ Aggregate": "670014.15", "% Aggregate": "0.85", "$ Average": "670014.15", "% Interest Rate": "5.83" }, { "City": "Hendersonville", "Count": 2, "$ Aggregate": "500295.30", "% Aggregate": "0.63", "$ Average": "250147.65", "% Interest Rate": "4.95" }, { "City": "St. Joseph", "Count": 1, "$ Aggregate": "139044.36", "% Aggregate": "0.18", "$ Average": "139044.36", "% Interest Rate": "5.08" }, { "City": "East Stroudsburg", "Count": 1, "$ Aggregate": "79875.00", "% Aggregate": "0.10", "$ Average": "79875.00", "% Interest Rate": "10.00" }, { "City": "Petersburg", "Count": 1, "$ Aggregate": "93798.80", "% Aggregate": "0.12", "$ Average": "93798.80", "% Interest Rate": "10.00" }, { "City": "Fort Wayne", "Count": 1, "$ Aggregate": "72135.00", "% Aggregate": "0.09", "$ Average": "72135.00", "% Interest Rate": "10.00" }, { "City": "Kansas City", "Count": 2, "$ Aggregate": "158640.00", "% Aggregate": "0.20", "$ Average": "79320.00", "% Interest Rate": "8.25" }, { "City": "Rio Rancho", "Count": 1, "$ Aggregate": "0.00", "% Aggregate": "0.00", "$ Average": "0.00", "% Interest Rate": "0.00" }, { "City": "N. Charleston", "Count": 1, "$ Aggregate": "146188.23", "% Aggregate": "0.19", "$ Average": "146188.23", "% Interest Rate": "6.75" }, { "City": "Raleigh", "Count": 2, "$ Aggregate": "461496.40", "% Aggregate": "0.58", "$ Average": "230748.20", "% Interest Rate": "6.18" }, { "City": "Fairborn", "Count": 2, "$ Aggregate": "135053.68", "% Aggregate": "0.17", "$ Average": "67526.84", "% Interest Rate": "8.20" }, { "City": "Kannapolis", "Count": 1, "$ Aggregate": "62497.80", "% Aggregate": "0.08", "$ Average": "62497.80", "% Interest Rate": "11.00" }, { "City": "Powell", "Count": 1, "$ Aggregate": "149380.85", "% Aggregate": "0.19", "$ Average": "149380.85", "% Interest Rate": "5.35" }, { "City": "Indianapolis", "Count": 13, "$ Aggregate": "1558114.15", "% Aggregate": "1.97", "$ Average": "119854.93", "% Interest Rate": "7.74" }, { "City": "Richmond", "Count": 3, "$ Aggregate": "210140.02", "% Aggregate": "0.27", "$ Average": "70046.67", "% Interest Rate": "8.28" }, { "City": "Miami Gardens", "Count": 1, "$ Aggregate": "0.00", "% Aggregate": "0.00", "$ Average": "0.00", "% Interest Rate": "0.00" }, { "City": "Fresno", "Count": 1, "$ Aggregate": "195043.35", "% Aggregate": "0.25", "$ Average": "195043.35", "% Interest Rate": "4.45" }, { "City": "Fort Washington", "Count": 1, "$ Aggregate": "186441.79", "% Aggregate": "0.24", "$ Average": "186441.79", "% Interest Rate": "5.45" }, { "City": "Zion", "Count": 1, "$ Aggregate": "69788.13", "% Aggregate": "0.09", "$ Average": "69788.13", "% Interest Rate": "6.95" }, { "City": "Hopewell", "Count": 1, "$ Aggregate": "92250.00", "% Aggregate": "0.12", "$ Average": "92250.00", "% Interest Rate": "10.00" }, { "City": "Maple Heights", "Count": 1, "$ Aggregate": "93286.75", "% Aggregate": "0.12", "$ Average": "93286.75", "% Interest Rate": "5.05" }, { "City": "Portsmouth", "Count": 3, "$ Aggregate": "234345.29", "% Aggregate": "0.30", "$ Average": "78115.10", "% Interest Rate": "9.02" }, { "City": "Lansing", "Count": 1, "$ Aggregate": "265714.89", "% Aggregate": "0.34", "$ Average": "265714.89", "% Interest Rate": "5.68" }, { "City": "Oak Park", "Count": 1, "$ Aggregate": "125463.50", "% Aggregate": "0.16", "$ Average": "125463.50", "% Interest Rate": "9.25" }, { "City": "Irvington", "Count": 2, "$ Aggregate": "245357.50", "% Aggregate": "0.31", "$ Average": "122678.75", "% Interest Rate": "8.66" }, { "City": "Euclid", "Count": 1, "$ Aggregate": "179975.28", "% Aggregate": "0.23", "$ Average": "179975.28", "% Interest Rate": "5.15" }, { "City": "Stockbridge", "Count": 1, "$ Aggregate": "85848.24", "% Aggregate": "0.11", "$ Average": "85848.24", "% Interest Rate": "5.90" }, { "City": "Sunman", "Count": 1, "$ Aggregate": "-6573.04", "% Aggregate": "-0.01", "$ Average": "-6573.04", "% Interest Rate": "8.25" }, { "City": "Monrovia", "Count": 1, "$ Aggregate": "125685.00", "% Aggregate": "0.16", "$ Average": "125685.00", "% Interest Rate": "10.00" }, { "City": "Cape Coral", "Count": 2, "$ Aggregate": "37210.74", "% Aggregate": "0.05", "$ Average": "18605.37", "% Interest Rate": "9.00" }, { "City": "Baton Rouge", "Count": 2, "$ Aggregate": "141588.75", "% Aggregate": "0.18", "$ Average": "70794.38", "% Interest Rate": "11.27" }, { "City": "N Charleston", "Count": 1, "$ Aggregate": "172250.00", "% Aggregate": "0.22", "$ Average": "172250.00", "% Interest Rate": "8.73" }, { "City": "Excelsior Springs", "Count": 1, "$ Aggregate": "64446.73", "% Aggregate": "0.08", "$ Average": "64446.73", "% Interest Rate": "5.08" }, { "City": "Evansville", "Count": 1, "$ Aggregate": "135882.25", "% Aggregate": "0.17", "$ Average": "135882.25", "% Interest Rate": "6.05" }, { "City": "Lincoln Park", "Count": 1, "$ Aggregate": "252000.00", "% Aggregate": "0.32", "$ Average": "252000.00", "% Interest Rate": "7.88" }, { "City": "Louisville", "Count": 3, "$ Aggregate": "261646.16", "% Aggregate": "0.33", "$ Average": "87215.39", "% Interest Rate": "8.34" }, { "City": "Cedar Lake", "Count": 1, "$ Aggregate": "422646.35", "% Aggregate": "0.53", "$ Average": "422646.35", "% Interest Rate": "5.10" }, { "City": "Milwaukee", "Count": 3, "$ Aggregate": "212433.01", "% Aggregate": "0.27", "$ Average": "70811.00", "% Interest Rate": "6.71" }, { "City": "Madison Heights", "Count": 2, "$ Aggregate": "217172.02", "% Aggregate": "0.27", "$ Average": "108586.01", "% Interest Rate": "8.75" }, { "City": "Mesquite", "Count": 1, "$ Aggregate": "109952.48", "% Aggregate": "0.14", "$ Average": "109952.48", "% Interest Rate": "4.37" }, { "City": "Gloucester City", "Count": 1, "$ Aggregate": "77400.00", "% Aggregate": "0.10", "$ Average": "77400.00", "% Interest Rate": "10.00" }, { "City": "Pennsauken", "Count": 1, "$ Aggregate": "128945.00", "% Aggregate": "0.16", "$ Average": "128945.00", "% Interest Rate": "11.00" }, { "City": "North Augusta", "Count": 1, "$ Aggregate": "133616.82", "% Aggregate": "0.17", "$ Average": "133616.82", "% Interest Rate": "5.73" }, { "City": "Liverpool", "Count": 1, "$ Aggregate": "98977.50", "% Aggregate": "0.13", "$ Average": "98977.50", "% Interest Rate": "10.00" }, { "City": "Fayetteville", "Count": 3, "$ Aggregate": "291250.69", "% Aggregate": "0.37", "$ Average": "97083.56", "% Interest Rate": "5.58" }, { "City": "Marietta", "Count": 1, "$ Aggregate": "317536.20", "% Aggregate": "0.40", "$ Average": "317536.20", "% Interest Rate": "11.50" }, { "City": "Cincinnati", "Count": 3, "$ Aggregate": "387453.80", "% Aggregate": "0.49", "$ Average": "129151.27", "% Interest Rate": "11.49" }, { "City": "Cleveland Heights", "Count": 1, "$ Aggregate": "131629.50", "% Aggregate": "0.17", "$ Average": "131629.50", "% Interest Rate": "10.00" }, { "City": "Port Jervis", "Count": 1, "$ Aggregate": "196000.00", "% Aggregate": "0.25", "$ Average": "196000.00", "% Interest Rate": "7.68" }, { "City": "Picatinny Arsenal", "Count": 1, "$ Aggregate": "775050.00", "% Aggregate": "0.98", "$ Average": "775050.00", "% Interest Rate": "8.25" }, { "City": "Holt", "Count": 1, "$ Aggregate": "113400.00", "% Aggregate": "0.14", "$ Average": "113400.00", "% Interest Rate": "10.00" }, { "City": "Dallas", "Count": 2, "$ Aggregate": "668219.61", "% Aggregate": "0.85", "$ Average": "334109.80", "% Interest Rate": "7.92" }, { "City": "Mount Holly", "Count": 2, "$ Aggregate": "199212.04", "% Aggregate": "0.25", "$ Average": "99606.02", "% Interest Rate": "6.05" }, { "City": "Santa Rosa", "Count": 1, "$ Aggregate": "453690.00", "% Aggregate": "0.57", "$ Average": "453690.00", "% Interest Rate": "7.25" }, { "City": "Cordova", "Count": 2, "$ Aggregate": "121821.55", "% Aggregate": "0.15", "$ Average": "60910.78", "% Interest Rate": "7.46" }, { "City": "Tucker", "Count": 1, "$ Aggregate": "189937.97", "% Aggregate": "0.24", "$ Average": "189937.97", "% Interest Rate": "8.75" }, { "City": "Deltona", "Count": 2, "$ Aggregate": "136074.44", "% Aggregate": "0.17", "$ Average": "68037.22", "% Interest Rate": "6.80" }, { "City": "Sevierville", "Count": 1, "$ Aggregate": "38673.61", "% Aggregate": "0.05", "$ Average": "38673.61", "% Interest Rate": "9.25" }, { "City": "Rock Hill", "Count": 1, "$ Aggregate": "118984.26", "% Aggregate": "0.15", "$ Average": "118984.26", "% Interest Rate": "11.25" }, { "City": "Anderson", "Count": 2, "$ Aggregate": "189419.37", "% Aggregate": "0.24", "$ Average": "94709.68", "% Interest Rate": "9.77" }, { "City": "Dayton", "Count": 2, "$ Aggregate": "235303.72", "% Aggregate": "0.30", "$ Average": "117651.86", "% Interest Rate": "5.29" }, { "City": "Debary", "Count": 1, "$ Aggregate": "188227.21", "% Aggregate": "0.24", "$ Average": "188227.21", "% Interest Rate": "5.40" }, { "City": "Killeen", "Count": 3, "$ Aggregate": "332073.46", "% Aggregate": "0.42", "$ Average": "110691.15", "% Interest Rate": "7.75" }, { "City": "Allentown", "Count": 1, "$ Aggregate": "411010.54", "% Aggregate": "0.52", "$ Average": "411010.54", "% Interest Rate": "7.20" }, { "City": "Trussville", "Count": 1, "$ Aggregate": "470781.22", "% Aggregate": "0.60", "$ Average": "470781.22", "% Interest Rate": "9.49" }, { "City": "Midwest City", "Count": 1, "$ Aggregate": "93798.63", "% Aggregate": "0.12", "$ Average": "93798.63", "% Interest Rate": "10.00" }, { "City": "Phoenix", "Count": 1, "$ Aggregate": "125589.29", "% Aggregate": "0.16", "$ Average": "125589.29", "% Interest Rate": "5.45" }, { "City": "East Point", "Count": 2, "$ Aggregate": "88090.00", "% Aggregate": "0.11", "$ Average": "44045.00", "% Interest Rate": "7.75" }, { "City": "Manahawkin", "Count": 3, "$ Aggregate": "236554.00", "% Aggregate": "0.30", "$ Average": "78851.33", "% Interest Rate": "10.64" }, { "City": "Belton", "Count": 1, "$ Aggregate": "61098.49", "% Aggregate": "0.08", "$ Average": "61098.49", "% Interest Rate": "5.80" }, { "City": "Jamesville", "Count": 1, "$ Aggregate": "115941.38", "% Aggregate": "0.15", "$ Average": "115941.38", "% Interest Rate": "9.25" }, { "City": "Washington", "Count": 2, "$ Aggregate": "1544425.00", "% Aggregate": "1.95", "$ Average": "772212.50", "% Interest Rate": "6.86" }, { "City": "Destin", "Count": 1, "$ Aggregate": "167200.00", "% Aggregate": "0.21", "$ Average": "167200.00", "% Interest Rate": "7.50" }, { "City": "Las Vegas", "Count": 1, "$ Aggregate": "1717918.82", "% Aggregate": "2.17", "$ Average": "1717918.82", "% Interest Rate": "6.70" }, { "City": "Toledo", "Count": 1, "$ Aggregate": "63513.07", "% Aggregate": "0.08", "$ Average": "63513.07", "% Interest Rate": "5.90" }, { "City": "Rochester", "Count": 2, "$ Aggregate": "120792.96", "% Aggregate": "0.15", "$ Average": "60396.48", "% Interest Rate": "10.20" }, { "City": "St. Paul", "Count": 1, "$ Aggregate": "253963.39", "% Aggregate": "0.32", "$ Average": "253963.39", "% Interest Rate": "6.58" }, { "City": "Roswell", "Count": 1, "$ Aggregate": "297060.00", "% Aggregate": "0.38", "$ Average": "297060.00", "% Interest Rate": "9.49" }, { "City": "Saint Louis", "Count": 3, "$ Aggregate": "227978.69", "% Aggregate": "0.29", "$ Average": "75992.90", "% Interest Rate": "8.03" }, { "City": "Conley", "Count": 1, "$ Aggregate": "576632.45", "% Aggregate": "0.73", "$ Average": "576632.45", "% Interest Rate": "5.08" }, { "City": "Lake Wales", "Count": 1, "$ Aggregate": "104547.82", "% Aggregate": "0.13", "$ Average": "104547.82", "% Interest Rate": "5.13" }, { "City": "Live Oak", "Count": 1, "$ Aggregate": "133209.47", "% Aggregate": "0.17", "$ Average": "133209.47", "% Interest Rate": "4.63" }, { "City": "Seattle", "Count": 1, "$ Aggregate": "2040500.00", "% Aggregate": "2.58", "$ Average": "2040500.00", "% Interest Rate": "8.75" }, { "City": "Angleton", "Count": 1, "$ Aggregate": "142787.99", "% Aggregate": "0.18", "$ Average": "142787.99", "% Interest Rate": "10.00" }, { "City": "Palmetto", "Count": 1, "$ Aggregate": "129498.43", "% Aggregate": "0.16", "$ Average": "129498.43", "% Interest Rate": "10.00" }, { "City": "Orange", "Count": 1, "$ Aggregate": "105570.00", "% Aggregate": "0.13", "$ Average": "105570.00", "% Interest Rate": "11.50" }, { "City": "Memphis", "Count": 3, "$ Aggregate": "1573368.46", "% Aggregate": "1.99", "$ Average": "524456.15", "% Interest Rate": "5.60" }, { "City": "Owings Mills", "Count": 1, "$ Aggregate": "120800.00", "% Aggregate": "0.15", "$ Average": "120800.00", "% Interest Rate": "7.50" }, { "City": "Poinciana", "Count": 2, "$ Aggregate": "153900.01", "% Aggregate": "0.19", "$ Average": "76950.01", "% Interest Rate": "7.50" }, { "City": "Camden", "Count": 1, "$ Aggregate": "86654.06", "% Aggregate": "0.11", "$ Average": "86654.06", "% Interest Rate": "5.53" }, { "City": "Akron", "Count": 2, "$ Aggregate": "313977.52", "% Aggregate": "0.40", "$ Average": "156988.76", "% Interest Rate": "9.03" }, { "City": "Cayce", "Count": 1, "$ Aggregate": "87345.00", "% Aggregate": "0.11", "$ Average": "87345.00", "% Interest Rate": "10.00" }, { "City": "Youngstown", "Count": 1, "$ Aggregate": "106818.23", "% Aggregate": "0.14", "$ Average": "106818.23", "% Interest Rate": "5.48" }, { "City": "Houston", "Count": 2, "$ Aggregate": "421000.65", "% Aggregate": "0.53", "$ Average": "210500.33", "% Interest Rate": "9.43" }, { "City": "Hamilton", "Count": 1, "$ Aggregate": "105036.94", "% Aggregate": "0.13", "$ Average": "105036.94", "% Interest Rate": "4.52" }, { "City": "Pompano Beach", "Count": 1, "$ Aggregate": "157774.64", "% Aggregate": "0.20", "$ Average": "157774.64", "% Interest Rate": "6.75" }, { "City": "Oklahoma City", "Count": 2, "$ Aggregate": "205988.55", "% Aggregate": "0.26", "$ Average": "102994.27", "% Interest Rate": "10.12" }, { "City": "Chatsworth", "Count": 1, "$ Aggregate": "397800.00", "% Aggregate": "0.50", "$ Average": "397800.00", "% Interest Rate": "9.50" }, { "City": "San Jose", "Count": 1, "$ Aggregate": "1012000.00", "% Aggregate": "1.28", "$ Average": "1012000.00", "% Interest Rate": "6.50" }, { "City": "Woodbury", "Count": 1, "$ Aggregate": "66162.28", "% Aggregate": "0.08", "$ Average": "66162.28", "% Interest Rate": "5.43" }, { "City": "Irwin", "Count": 1, "$ Aggregate": "122496.87", "% Aggregate": "0.16", "$ Average": "122496.87", "% Interest Rate": "10.00" }, { "City": "Peekskill", "Count": 1, "$ Aggregate": "267538.58", "% Aggregate": "0.34", "$ Average": "267538.58", "% Interest Rate": "6.38" }, { "City": "Yucca Valley", "Count": 1, "$ Aggregate": "52149.18", "% Aggregate": "0.07", "$ Average": "52149.18", "% Interest Rate": "5.80" }, { "City": "Scottdale", "Count": 2, "$ Aggregate": "-24485.20", "% Aggregate": "-0.03", "$ Average": "-12242.60", "% Interest Rate": "11.16" }, { "City": "Huntington", "Count": 1, "$ Aggregate": "67121.70", "% Aggregate": "0.08", "$ Average": "67121.70", "% Interest Rate": "10.50" }, { "City": "Dunedin", "Count": 1, "$ Aggregate": "335700.00", "% Aggregate": "0.42", "$ Average": "335700.00", "% Interest Rate": "11.49" }, { "City": "Abilene", "Count": 1, "$ Aggregate": "87646.77", "% Aggregate": "0.11", "$ Average": "87646.77", "% Interest Rate": "6.68" }, { "City": "Lake Charles", "Count": 2, "$ Aggregate": "171506.12", "% Aggregate": "0.22", "$ Average": "85753.06", "% Interest Rate": "8.49" }, { "City": "Phoneix", "Count": 1, "$ Aggregate": "208800.00", "% Aggregate": "0.26", "$ Average": "208800.00", "% Interest Rate": "7.53" }, { "City": "Conover", "Count": 1, "$ Aggregate": "95922.51", "% Aggregate": "0.12", "$ Average": "95922.51", "% Interest Rate": "7.75" }, { "City": "Phillipsburg", "Count": 1, "$ Aggregate": "115405.64", "% Aggregate": "0.15", "$ Average": "115405.64", "% Interest Rate": "5.40" }, { "City": "Mishawaka", "Count": 2, "$ Aggregate": "161980.24", "% Aggregate": "0.21", "$ Average": "80990.12", "% Interest Rate": "6.65" }, { "City": "Leesburg", "Count": 1, "$ Aggregate": "620331.38", "% Aggregate": "0.79", "$ Average": "620331.38", "% Interest Rate": "4.68" }, { "City": "Alpharetta", "Count": 2, "$ Aggregate": "1155773.86", "% Aggregate": "1.46", "$ Average": "577886.93", "% Interest Rate": "9.82" }, { "City": "Carnegie", "Count": 1, "$ Aggregate": "67581.15", "% Aggregate": "0.09", "$ Average": "67581.15", "% Interest Rate": "6.38" }, { "City": "North Charleston", "Count": 1, "$ Aggregate": "0.00", "% Aggregate": "0.00", "$ Average": "0.00", "% Interest Rate": "0.00" }, { "City": "New Kensington", "Count": 1, "$ Aggregate": "136921.64", "% Aggregate": "0.17", "$ Average": "136921.64", "% Interest Rate": "5.25" }, { "City": "Orange City", "Count": 1, "$ Aggregate": "0.00", "% Aggregate": "0.00", "$ Average": "0.00", "% Interest Rate": "0.00" }, { "City": "Jackson", "Count": 1, "$ Aggregate": "82058.96", "% Aggregate": "0.10", "$ Average": "82058.96", "% Interest Rate": "6.95" }, { "City": "Ellenwood", "Count": 1, "$ Aggregate": "156960.00", "% Aggregate": "0.20", "$ Average": "156960.00", "% Interest Rate": "11.00" }, { "City": "Tinley Park", "Count": 1, "$ Aggregate": "52317.90", "% Aggregate": "0.07", "$ Average": "52317.90", "% Interest Rate": "7.40" }, { "City": "EASTPOINTE", "Count": 1, "$ Aggregate": "370177.59", "% Aggregate": "0.47", "$ Average": "370177.59", "% Interest Rate": "6.53" }, { "City": "Tampa", "Count": 1, "$ Aggregate": "278370.00", "% Aggregate": "0.35", "$ Average": "278370.00", "% Interest Rate": "10.00" }, { "City": "Madison", "Count": 2, "$ Aggregate": "276707.22", "% Aggregate": "0.35", "$ Average": "138353.61", "% Interest Rate": "5.26" }, { "City": "Spring Hill", "Count": 1, "$ Aggregate": "54992.56", "% Aggregate": "0.07", "$ Average": "54992.56", "% Interest Rate": "5.88" }, { "City": "Fairburn", "Count": 1, "$ Aggregate": "1649161.15", "% Aggregate": "2.09", "$ Average": "1649161.15", "% Interest Rate": "4.45" }, { "City": "Garfield Heights", "Count": 1, "$ Aggregate": "66600.00", "% Aggregate": "0.08", "$ Average": "66600.00", "% Interest Rate": "11.00" }, { "City": "Columbia", "Count": 1, "$ Aggregate": "310771.54", "% Aggregate": "0.39", "$ Average": "310771.54", "% Interest Rate": "10.00" }, { "City": "Kissimmee", "Count": 1, "$ Aggregate": "128800.00", "% Aggregate": "0.16", "$ Average": "128800.00", "% Interest Rate": "8.08" }, { "City": "Marcus Hook", "Count": 1, "$ Aggregate": "91513.35", "% Aggregate": "0.12", "$ Average": "91513.35", "% Interest Rate": "5.60" }, { "City": "Brookhaven", "Count": 1, "$ Aggregate": "399000.00", "% Aggregate": "0.50", "$ Average": "399000.00", "% Interest Rate": "7.40" }, { "City": "Bremerton", "Count": 1, "$ Aggregate": "242861.38", "% Aggregate": "0.31", "$ Average": "242861.38", "% Interest Rate": "6.00" }, { "City": "Port St. Lucie", "Count": 1, "$ Aggregate": "0.00", "% Aggregate": "0.00", "$ Average": "0.00", "% Interest Rate": "0.00" }, { "City": "Front Royal", "Count": 2, "$ Aggregate": "221600.00", "% Aggregate": "0.28", "$ Average": "110800.00", "% Interest Rate": "7.50" }, { "City": "Loves Park", "Count": 1, "$ Aggregate": "0.00", "% Aggregate": "0.00", "$ Average": "0.00", "% Interest Rate": "0.00" }, { "City": "Grandview", "Count": 1, "$ Aggregate": "285688.31", "% Aggregate": "0.36", "$ Average": "285688.31", "% Interest Rate": "5.98" }, { "City": "Markham", "Count": 1, "$ Aggregate": "42075.00", "% Aggregate": "0.05", "$ Average": "42075.00", "% Interest Rate": "8.25" }, { "City": "College Park", "Count": 2, "$ Aggregate": "910815.01", "% Aggregate": "1.15", "$ Average": "455407.51", "% Interest Rate": "7.29" }, { "City": "Mableton", "Count": 1, "$ Aggregate": "115014.16", "% Aggregate": "0.15", "$ Average": "115014.16", "% Interest Rate": "5.25" }, { "City": "High Point", "Count": 1, "$ Aggregate": "52644.80", "% Aggregate": "0.07", "$ Average": "52644.80", "% Interest Rate": "11.00" }, { "City": "Montgomery", "Count": 1, "$ Aggregate": "77355.00", "% Aggregate": "0.10", "$ Average": "77355.00", "% Interest Rate": "8.25" }, { "City": "McDonough", "Count": 1, "$ Aggregate": "83699.65", "% Aggregate": "0.11", "$ Average": "83699.65", "% Interest Rate": "6.10" }, { "City": "Waynesville", "Count": 1, "$ Aggregate": "48994.00", "% Aggregate": "0.06", "$ Average": "48994.00", "% Interest Rate": "8.75" }, { "City": "Radford", "Count": 1, "$ Aggregate": "92530.79", "% Aggregate": "0.12", "$ Average": "92530.79", "% Interest Rate": "10.25" }, { "City": "West Allis", "Count": 1, "$ Aggregate": "126690.87", "% Aggregate": "0.16", "$ Average": "126690.87", "% Interest Rate": "10.50" }, { "City": "Prairie View", "Count": 1, "$ Aggregate": "96787.15", "% Aggregate": "0.12", "$ Average": "96787.15", "% Interest Rate": "5.25" }, { "City": "Goose Creek", "Count": 1, "$ Aggregate": "161850.00", "% Aggregate": "0.20", "$ Average": "161850.00", "% Interest Rate": "7.53" }, { "City": "Muskegon", "Count": 1, "$ Aggregate": "88189.64", "% Aggregate": "0.11", "$ Average": "88189.64", "% Interest Rate": "6.20" }, { "City": "Pendleton", "Count": 1, "$ Aggregate": "138040.00", "% Aggregate": "0.17", "$ Average": "138040.00", "% Interest Rate": "11.50" }, { "City": "Kingwood", "Count": 1, "$ Aggregate": "228868.94", "% Aggregate": "0.29", "$ Average": "228868.94", "% Interest Rate": "10.00" }, { "City": "Augusta", "Count": 1, "$ Aggregate": "255116.31", "% Aggregate": "0.32", "$ Average": "255116.31", "% Interest Rate": "4.75" }, { "City": "Miami", "Count": 1, "$ Aggregate": "247000.00", "% Aggregate": "0.31", "$ Average": "247000.00", "% Interest Rate": "7.73" }, { "City": "Newburgh Heights", "Count": 1, "$ Aggregate": "111432.95", "% Aggregate": "0.14", "$ Average": "111432.95", "% Interest Rate": "5.80" }, { "City": "Los Angeles", "Count": 1, "$ Aggregate": "446041.90", "% Aggregate": "0.56", "$ Average": "446041.90", "% Interest Rate": "8.50" }, { "City": "Jersey City", "Count": 1, "$ Aggregate": "361529.78", "% Aggregate": "0.46", "$ Average": "361529.78", "% Interest Rate": "5.45" }, { "City": "Northbrook", "Count": 1, "$ Aggregate": "587370.00", "% Aggregate": "0.74", "$ Average": "587370.00", "% Interest Rate": "8.50" }, { "City": "Center Point", "Count": 1, "$ Aggregate": "57420.00", "% Aggregate": "0.07", "$ Average": "57420.00", "% Interest Rate": "10.00" }, { "City": "Birmingham", "Count": 1, "$ Aggregate": "54720.00", "% Aggregate": "0.07", "$ Average": "54720.00", "% Interest Rate": "9.00" }, { "City": "Saint Petersburg", "Count": 1, "$ Aggregate": "220002.41", "% Aggregate": "0.28", "$ Average": "220002.41", "% Interest Rate": "9.75" }, { "City": "Spartanburg", "Count": 1, "$ Aggregate": "95614.84", "% Aggregate": "0.12", "$ Average": "95614.84", "% Interest Rate": "5.50" }, { "City": "Penns Grove", "Count": 1, "$ Aggregate": "58530.13", "% Aggregate": "0.07", "$ Average": "58530.13", "% Interest Rate": "5.90" }, { "City": "Jonesboro", "Count": 1, "$ Aggregate": "0.00", "% Aggregate": "0.00", "$ Average": "0.00", "% Interest Rate": "0.00" }, { "City": "St Petersburg", "Count": 1, "$ Aggregate": "83745.77", "% Aggregate": "0.11", "$ Average": "83745.77", "% Interest Rate": "6.95" }, { "City": "Orlando", "Count": 1, "$ Aggregate": "447920.88", "% Aggregate": "0.57", "$ Average": "447920.88", "% Interest Rate": "9.50" }, { "City": "Wyoming", "Count": 1, "$ Aggregate": "102368.12", "% Aggregate": "0.13", "$ Average": "102368.12", "% Interest Rate": "5.90" }, { "City": "Somers Point", "Count": 1, "$ Aggregate": "91100.00", "% Aggregate": "0.12", "$ Average": "91100.00", "% Interest Rate": "7.95" }, { "City": "Hartford", "Count": 1, "$ Aggregate": "94491.97", "% Aggregate": "0.12", "$ Average": "94491.97", "% Interest Rate": "11.00" }, { "City": "Total:", "Count": "439", "$ Aggregate": "79014194.61", "% Aggregate": "100.00", "$ Average": "46765935.13", "% Interest Rate": "1764.85" }], "tableData": [{
		"item0": "Loan Type", "item1": "Subcategory", "item2": "Summary", "item3": "Property Type", "item4": "NewConstruction" }, { "item0": "10 / 1 R30", "item1": "Rental", "item2": "10 / 1 Hybrid Arm", "item3": "1 - 4 Family", "item4": "No" }, { "item0": "5 / 1 R30", "item1": "Rental", "item2": "5 / 1 Hybrid Arm", "item3": "1 - 4 Family", "item4": "No" }, { "item0": "Bridge + PO", "item1": "FNF", "item2": "Interest Only Bridge Loan with No construction holdback", "item3": "1 - 4 Family", "item4": "No" }, { "item0": "Commit NF", "item1": "FNF", "item2": "Interest only Bridge loan with a committed construction holdback", "item3": "1 - 4 Family", "item4": "No" }, { "item0": "Commit MF", "item1": "Multifamily", "item2": "Interest only Bridge loan with a committed construction holdback", "item3": "5 + Units", "item4": "No" }, { "item0": "Commit NC NF", "item1": "FNF", "item2": "Interest only Bridge loan with a committed construction holdback", "item3": "1 - 4 Family", "item4": "Yes" }, { "item0": "CRL Fixed R30", "item1": "Rental", "item2": "30 Year fixed rate loan originated through correspondent channel", "item3": "1 - 4 Family", "item4": "No" }, { "item0": "F2R 10/1 R30", "item1": "Rental", "item2": "10/1 Hybrid Arm, refinanced out of a L1C Bridge loan", "item3": "1 - 4 Family", "item4": "No" }, { "item0": "F2R Commit NF", "item1": "FNF", "item2": "Interest only Bridge loan with a committed construction holdback, option to refinance into a new rental Loan", "item3": "1 - 4 Family", "item4": "No" }, { "item0": "F2R Fixed R30", "item1": "Rental", "item2": "30 Year fixed Rate Loan, refinanced out of a L1C Bridge Loan ", "item3": "1 - 4 Family", "item4": "No" }, { "item0": "Fixed R30", "item1": "Rental", "item2": "30 Year fixed Rate Loan ", "item3": "1 - 4 Family", "item4": "No" }, { "item0": "Fixed R30 Premier", "item1": "Rental", "item2": "30 Year fixed rate loan - Premier Sponsor", "item3": "1 - 4 Family", "item4": "No" }, { "item0": "FNF Cash - Out", "item1": "FNF", "item2": "Interest Only Bridge, on property owned free and clear, no construction holdback", "item3": "1 - 4 Family", "item4": "No" }, { "item0": "Fully Escrow", "item1": "FNF", "item2": "Interest only Bridge loan with a funded escrow account for construction holdback", "item3": "1 - 4 Family", "item4": "No" }, { "item0": "Fully Escrow NC", "item1": "FNF", "item2": "Interest only Bridge loan with a funded escrow account for construction holdback", "item3": "1 - 4 Family", "item4": "Yes" }]
}

// export const Notes = [
// 	{
// 		"dealId": "LimaOne",
// 		"tables": [
// 			{
// 				tableName: "PrePaymentsAndDefaultRates",
// 				note: "* For the purpose of this calculation, a loan is considered defaulted when it is 180+ days delinquent."
// 			}
// 		]


// 	}
// ]
export const Notes = [

	{
		dealId: "LimaOne",
		month: "7",
		tableName: "PrepaymentsAndDefaultRates",
		note: "* For the purpose of this calculation, a loan is considered defaulted when it is 180+ days delinquent."

	},
	{
		dealId: "Bawag",
		month: "7",
		tableName: "Details",
		note: "* stratifications available on [x]",
		note1: "** only applicable once Loans have reached a balance of at least $50,000,000.00 "
	},
	{
		dealId: "Saluda PAC1",
		month: "7",
		tableName: "PrepaymentsAndDefaultRates",
		note: "CPR: SMM = Unscheduled Principal / (Beginning Balance - Scheduled Principal); CPR = 1 - (1 - SMM) ^ 12. CDR: New Defaults = SUM(Beginning Balance WHERE current Status >= 120+ AND previous Status < 120+); SMM = New Defaults / Beginning Balance; CDR = 1 - (1 - SMM) ^ 12"

	},
	{
		dealId: "Saluda PAC1",
		month: "7",
		tableName: "DealEvents",
		note: "* For the purpose of this calculation, the ending revolving period reinvestment account and collateral balances include activities since the prior month end."

	},
	{
		dealId: "Saluda FIG1",
		month: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
		tableName: "PrincipalPayments",
		note: "* The total values reported under original balance, beginning balance and ending balance correspond to class C initial notional amount, beginning notional amount and ending notional amount, respectively."

	},
	{
		dealId: "Saluda FIG1",
		month: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
		tableName: "ClassFactorsPer1000",
		note: "* For class C factors, the denominator is the class C initial notional amount, and in the case of beginning balance and ending balance, the numerators are the class C beginning notional amount and ending notional amount, respectively."

	},
	{
		dealId: "Saluda FIG1",
		month: "7",
		tableName: "PrepaymentsAndDefaultRates",
		note: "CPR: SMM = Unscheduled Principal / (Beginning Balance - Scheduled Principal); CPR = 1 - (1 - SMM) ^ 12. CDR: New Defaults = SUM(Beginning Balance WHERE current Status >= 120+ AND previous Status < 120+); SMM = New Defaults / Beginning Balance; CDR = 1 - (1 - SMM) ^ 12"

	},
	{
		dealId: "Saluda SEQ1",
		month: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
		tableName: "PrincipalPayments",
		note: "* The total values reported under original balance, beginning balance and ending balance correspond to class C initial notional amount, beginning notional amount and ending notional amount, respectively."

	},
	{
		dealId: "Saluda SEQ1",
		month: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
		tableName: "ClassFactorsPer1000",
		note: "* For class C factors, the denominator is the class C initial notional amount, and in the case of beginning balance and ending balance, the numerators are the class C beginning notional amount and ending notional amount, respectively."

	},
	{
		dealId: "Saluda SEQ1",
		month: "7",
		tableName: "PrepaymentsAndDefaultRates",
		note: "CPR: SMM = Unscheduled Principal / (Beginning Balance - Scheduled Principal); CPR = 1 - (1 - SMM) ^ 12. CDR: New Defaults = SUM(Beginning Balance WHERE current Status >= 120+ AND previous Status < 120+); SMM = New Defaults / Beginning Balance; CDR = 1 - (1 - SMM) ^ 12"

	},
	{
		dealId: "AlphaFlow",
		month: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
		tableName: "PaymentSummary",
		note: "Notes(s): the balances reported for the AIOS Notes are notional balances;these notional balances are not due to noteholders and are instead used to calculate interest due to noteholders."

	},
	{
		dealId: "Saluda FIG2",
		month: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
		tableName: "PaymentSummary",
		note: "Notes(s): M1, M2, C & C1 notes are exchange/exchangeable notes; the tables, with the exception of the Exchange/Exchangeable Notes table, assume that no exchanges have taken place; the Exchange/Exchangeable Notes table is reflective of the exchanges that have taken place."

	},
	{
		dealId: "Saluda FIG2",
		month: "7",
		tableName: "ExchangeOrExchangeableNotes",
		note: "Notes(s): M1, M2, C & C1 notes are exchange/exchangeable notes; the tables, with the exception of the Exchange/Exchangeable Notes table, assume that no exchanges have taken place; the Exchange/Exchangeable Notes table is reflective of the exchanges that have taken place."

	},
	{
		dealId: "Saluda FIG2",
		month: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
		tableName: "PrincipalPayments",
		note: "Notes(s): M1, M2, C & C1 notes are exchange/exchangeable notes; the tables, with the exception of the Exchange/Exchangeable Notes table, assume that no exchanges have taken place; the Exchange/Exchangeable Notes table is reflective of the exchanges that have taken place."

	},
	{
		dealId: "Saluda FIG2",
		month: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
		tableName: "InterestPayments",
		note: "Notes(s): M1, M2, C & C1 notes are exchange/exchangeable notes; the tables, with the exception of the Exchange/Exchangeable Notes table, assume that no exchanges have taken place; the Exchange/Exchangeable Notes table is reflective of the exchanges that have taken place."

	},
	{
		dealId: "Saluda FIG2",
		month: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
		tableName: "AdditionalDetails",
		note: "Notes(s): M1, M2, C & C1 notes are exchange/exchangeable notes; the tables, with the exception of the Exchange/Exchangeable Notes table, assume that no exchanges have taken place; the Exchange/Exchangeable Notes table is reflective of the exchanges that have taken place."

	},
	{
		dealId: "Saluda FIG2",
		month: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
		tableName: "ClassFactorsPer1000",
		note: "Notes(s): M1, M2, C & C1 notes are exchange/exchangeable notes; the tables, with the exception of the Exchange/Exchangeable Notes table, assume that no exchanges have taken place; the Exchange/Exchangeable Notes table is reflective of the exchanges that have taken place."

	},
	{
		dealId: "Saluda FIG2",
		month: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
		tableName: "DealFeesAndExpenses",
		note: "Notes(s):the fees and expenses included in the above table are typically paid on the payment date."

	},
	{
		dealId: "Saluda SEQ1",
		month: ["4"],
		tableName: "DealFeesAndExpenses",
		note: "December 2021 unpaid Custodian Fees added"

	},
	{
		dealId: "Saluda BC1",
		month: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
		tableName: "DealFeesAndExpenses",
		note: "Notes(s):the fees and expenses included in the above table are typically paid on the payment date."

	},
	{
		dealId: "Reigo",
		month: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
		tableName: "DealFeesAndExpenses",
		note: "Notes(s):the fees and expenses included in the above table are typically paid on the payment date."

	},
	{
		dealId: "Spruce Hill",
		month: "7",
		tableName: "PrepaymentsAndDefaultRates",
		note: "CPR: SMM = Unscheduled Principal / (Beginning Balance - Scheduled Principal); CPR = 1 - (1 - SMM) ^ 12. CDR: New Defaults = SUM(Beginning Balance WHERE current Status >= 120+ AND previous Status < 120+); SMM = New Defaults / Beginning Balance; CDR = 1 - (1 - SMM) ^ 12"

	},
	{
		dealId: "Saluda FIG2",
		month: "7",
		tableName: "PrepaymentsAndDefaultRates",
		note: "CPR: SMM = Unscheduled Principal / (Beginning Balance - Scheduled Principal); CPR = 1 - (1 - SMM) ^ 12. CDR: New Defaults = SUM(Beginning Balance WHERE current Status >= 120+ AND previous Status < 120+); SMM = New Defaults / Beginning Balance; CDR = 1 - (1 - SMM) ^ 12"

	},
	{
		dealId: "Saluda BC1",
		month: "7",
		tableName: "PrepaymentsAndDefaultRates",
		note: "CPR: SMM = Unscheduled Principal / (Beginning Balance - Scheduled Principal); CPR = 1 - (1 - SMM) ^ 12. CDR: New Defaults = SUM(Beginning Balance WHERE current Status >= 120+ AND previous Status < 120+); SMM = New Defaults / Beginning Balance; CDR = 1 - (1 - SMM) ^ 12"

	},
	{
		dealId: "Saluda WL1",
		month: "7",
		tableName: "PrepaymentsAndDefaultRates",
		note: "CPR: SMM = Unscheduled Principal / (Beginning Balance - Scheduled Principal); CPR = 1 - (1 - SMM) ^ 12. CDR: New Defaults = SUM(Beginning Balance WHERE current Status >= 120+ AND previous Status < 120+); SMM = New Defaults / Beginning Balance; CDR = 1 - (1 - SMM) ^ 12"

	},
	{
		dealId: "Dominion",
		month: "7",
		tableName: "PrepaymentsAndDefaultRates",
		note: "CPR: SMM = Unscheduled Principal / (Beginning Balance - Scheduled Principal); CPR = 1 - (1 - SMM) ^ 12. CDR: New Defaults = SUM(Beginning Balance WHERE current Status >= 120+ AND previous Status < 120+); SMM = New Defaults / Beginning Balance; CDR = 1 - (1 - SMM) ^ 12"

	},
	{
		dealId: "Reigo",
		month: "7",
		tableName: "PrepaymentsAndDefaultRates",
		note: "CPR: SMM = Unscheduled Principal / (Beginning Balance - Scheduled Principal); CPR = 1 - (1 - SMM) ^ 12. CDR: New Defaults = SUM(Beginning Balance WHERE current Status >= 120+ AND previous Status < 120+); SMM = New Defaults / Beginning Balance; CDR = 1 - (1 - SMM) ^ 12"

	},
	{
		dealId: "AlphaFlow",
		month: "7",
		tableName: "PrepaymentsAndDefaultRates",
		note: "CPR: SMM = Unscheduled Principal / (Beginning Balance - Scheduled Principal); CPR = 1 - (1 - SMM) ^ 12. CDR: New Defaults = SUM(Beginning Balance WHERE current Status >= 120+ AND previous Status < 120+); SMM = New Defaults / Beginning Balance; CDR = 1 - (1 - SMM) ^ 12"

	},
	{
		dealId: "Saluda RTL1",
		month: "7",
		tableName: "PrepaymentsAndDefaultRates",
		note: "CPR: SMM = Unscheduled Principal / (Beginning Balance - Scheduled Principal); CPR = 1 - (1 - SMM) ^ 12. CDR: New Defaults = SUM(Beginning Balance WHERE current Status >= 120+ AND previous Status < 120+); SMM = New Defaults / Beginning Balance; CDR = 1 - (1 - SMM) ^ 12"

	},
	{
		dealId: "Stoa 2021",
		month: "7",
		tableName: "PrepaymentsAndDefaultRates",
		note: "CPR: SMM = Unscheduled Principal / (Beginning Balance - Scheduled Principal); CPR = 1 - (1 - SMM) ^ 12. CDR: New Defaults = SUM(Beginning Balance WHERE current Status >= 120+ AND previous Status < 120+); SMM = New Defaults / Beginning Balance; CDR = 1 - (1 - SMM) ^ 12"

	},
	{
		dealId: "Saluda MF1",
		month: "7",
		tableName: "PrepaymentsAndDefaultRates",
		note: "CPR: SMM = Unscheduled Principal / (Beginning Balance - Scheduled Principal); CPR = 1 - (1 - SMM) ^ 12. CDR: New Defaults = SUM(Beginning Balance WHERE current Status >= 120+ AND previous Status < 120+); SMM = New Defaults / Beginning Balance; CDR = 1 - (1 - SMM) ^ 12"

	},
	{
		dealId: "Palisades",
		month: "7",
		tableName: "PrepaymentsAndDefaultRates",
		note: "CPR: SMM = Unscheduled Principal / (Beginning Balance - Scheduled Principal); CPR = 1 - (1 - SMM) ^ 12. CDR: New Defaults = SUM(Beginning Balance WHERE current Status >= 120+ AND previous Status < 120+); SMM = New Defaults / Beginning Balance; CDR = 1 - (1 - SMM) ^ 12"

	},
	{
		dealId: "Saluda RTL2",
		month: "7",
		tableName: "PrepaymentsAndDefaultRates",
		note: "CPR: SMM = Unscheduled Principal / (Beginning Balance - Scheduled Principal); CPR = 1 - (1 - SMM) ^ 12. CDR: New Defaults = SUM(Beginning Balance WHERE current Status >= 120+ AND previous Status < 120+); SMM = New Defaults / Beginning Balance; CDR = 1 - (1 - SMM) ^ 12"

	},
	{
		dealId: "Saluda PRE1",
		month: "7",
		tableName: "PrepaymentsAndDefaultRates",
		note: "CPR: SMM = Unscheduled Principal / (Beginning Balance - Scheduled Principal); CPR = 1 - (1 - SMM) ^ 12. CDR: New Defaults = SUM(Beginning Balance WHERE current Status >= 120+ AND previous Status < 120+); SMM = New Defaults / Beginning Balance; CDR = 1 - (1 - SMM) ^ 12"

	},
	{
		dealId: "MFA",
		month: "7",
		tableName: "PrepaymentsAndDefaultRates",
		note: "CPR: SMM = Unscheduled Principal / (Beginning Balance - Scheduled Principal); CPR = 1 - (1 - SMM) ^ 12. CDR: New Defaults = SUM(Beginning Balance WHERE current Status >= 120+ AND previous Status < 120+); SMM = New Defaults / Beginning Balance; CDR = 1 - (1 - SMM) ^ 12"

	},
	{
		dealId: "Saluda BC1",
		month: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
		tableName: "PaymentSummary",
		note: "The OC Class Ending Balance is based off Post Payment Waterfall"

	},
	{
		dealId: "AlphaFlow",
		month: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
		tableName: "PaymentSummary",
		note: "The OC Class Ending Balance is based off Post Payment Waterfall"

	},
	{
		dealId: "Saluda RTL1",
		month: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
		tableName: "PaymentSummary",
		note: "The OC Class Ending Balance is based off Post Payment Waterfall"

	},
	{
		dealId: "Saluda MF1",
		month: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
		tableName: "PaymentSummary",
		note: "The OC Class Ending Balance is based off Post Payment Waterfall"

	},
	{
		dealId: "Saluda WL1",
		month: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
		tableName: "PaymentSummary",
		note: "The OC Class Ending Balance is based off Post Payment Waterfall"

	},
	{
		dealId: "Saluda RTL2",
		month: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
		tableName: "PaymentSummary",
		note: "The OC Class Ending Balance is based off Post Payment Waterfall"

	},
	{
		dealId: "Stoa 2021",
		month: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
		tableName: "PaymentSummary",
		note: "The OC Class Ending Balance is based off Post Payment Waterfall"

	},
	{
		dealId: "Saluda PRE1",
		month: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
		tableName: "PaymentSummary",
		note: "The OC Class Ending Balance is based off Post Payment Waterfall"

	},
	{
		dealId: "Saluda MF1",
		month: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
		tableName: "CollateralPerformance",
		note: "All Calculations are based on OTS method"

	},
	{
		dealId: "Saluda RTL2",
		month: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
		tableName: "CollateralPerformance",
		note: "All Calculations are based on OTS method"

	},
	{
		dealId: "Saluda PRE1",
		month: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
		tableName: "CollateralPerformance",
		note: "All Calculations are based on OTS method"
	},
	{
		dealId: "Saluda RTL1",
		month: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
		tableName: "CollateralPerformance",
		note: "All Calculations are based on OTS method"

	},

]
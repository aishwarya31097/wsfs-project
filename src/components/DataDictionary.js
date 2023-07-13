// import React, { useState, useEffect } from 'react';
// import Button from '@material-ui/core/Button';
// import { savedictionary } from '../servies/services';
// import Modal from 'react-modal';
// import $ from 'jquery';
// const customStyles = {
//     content: {
//         top: '50%',
//         left: '50%',
//         right: 'auto',
//         bottom: 'auto',
//         marginRight: '-50%',
//         transform: 'translate(-50%, -50%)'
//     }
// };



// function DataDictionary(props) {

//     const [loading, setLoading] = useState(false);

//     const [rows, setRows] = useState(0);
//     const [cols, setCols] = useState(0);

//     const [modalIsOpen, setIsOpen] = React.useState(false);
//     function openModal() {
//         setIsOpen(true);
//     }

//     function afterOpenModal() {

//     }

//     function closeModal() {
//         setIsOpen(false);
//     }

//     const Columns = (e) => {
//         console.log("Columns Columns Columns ", e.target.value)
//         setCols(parseInt(e.target.value))
//     }

//     const Rows = (e) => {
//         console.log("Rows Rows Rows ", e.target.value)
//         setRows(parseInt(e.target.value))
//     }

//     const createTable = () => {
//         createtable(rows, cols)
//     }


//     const colsReturn = () => {
//         return Array.from(Array(cols), (e, i) => {
//             return <td key={i} contenteditable="true"> </td>
//         })
//     }

//     const createtable = () => {
//         return <table className="table table-bordered" id="CreateTable"> {Array.from(Array(rows), (e, i) => {
//             return <tr key={i}>{colsReturn()}</tr>
//         })}</table>
//     }

//     function Generatedatadict (dealId, month, year, DealType) {

//         useEffect(() => {
//             changePanel(dealId, month, year, DealType);
//           }, []);


//     }

//     const changePanel = async (dealId, month, year, DealType) => {
//         let tableData = [];
//         $('#CreateTable tr').each(function (key, value, index) {
//             let obj = {}
//             $(this).find('td').each(function (key, value, index) {
//                 console.log("value", key, value, index);
//                 obj['item' + key] = $(value).text();
//             })
//             console.log("obj", obj)
//             tableData.push(obj)
//         })
//         console.log("tableData", tableData)

//         var data = { "dealId": dealId, "month": month, "year": year, "tableData": tableData }

//         const APIResponse = await savedictionary(data, DealType)
//         console.log("APIResponse", APIResponse)
//     }


//     return (
//         <div>
//             <Button className="float-right" variant="outlined" onClick={openModal}>Add Data Dictionary</Button>
//             <Modal
//                 isOpen={modalIsOpen}
//                 onAfterOpen={afterOpenModal}
//                 onRequestClose={closeModal}
//                 style={customStyles}
//                 contentLabel="Example Modal"
//             >
//                 <div className="modalPopupDictionary">
//                     <Button className="float-right" color="primary" variant="outlined" onClick={closeModal}>close</Button>

//                     <h3> Add Data Dictionary </h3>

//                     <p className="header-dictionary">
//                         <label> Select Rows: </label> <select id="rows" onChange={Rows} >
//                             <option value="1">1</option>
//                             <option value="2">2</option>
//                             <option value="3">3</option>
//                             <option value="4">4</option>
//                             <option value="5">5</option>
//                             <option value="6">6</option>
//                             <option value="7">7</option>
//                             <option value="8">8</option>
//                             <option value="9">9</option>
//                             <option value="10">10</option>
//                             <option value="11">11</option>
//                             <option value="12">12</option>
//                             <option value="13">13</option>
//                             <option value="14">14</option>
//                             <option value="15">15</option>
//                             <option value="16">16</option>
//                             <option value="17">17</option>
//                             <option value="18">18</option>
//                             <option value="19">19</option>
//                             <option value="20">20</option>
//                         </select>
//                         <label> Select Columns: </label> <select onChange={Columns} id="cols">
//                             <option value="1">1</option>
//                             <option value="2">2</option>
//                             <option value="3">3</option>
//                             <option value="4">4</option>
//                             <option value="5">5</option>
//                             <option value="6">6</option>
//                             <option value="7">7</option>
//                             <option value="8">8</option>
//                             <option value="9">9</option>
//                         </select>


//                     </p>

//                     {createtable()}

//                     <Button variant="contained" color="primary" 
//                         // onClick={Generatedatadict(props.DataDictionaryData.dealId, props.DataDictionaryData.month, props.DataDictionaryData.year, props.DealType)}
//                         onClick={() => Generatedatadict(
//                             props.DataDictionaryData.dealId, 
//                             props.DataDictionaryData.month, 
//                             props.DataDictionaryData.year, 
//                             props.DealType)}
//                     >

//                         Generate Data Dictionary</Button>


//                 </div>
//             </Modal>
//         </div>

//     );
// }

// export default DataDictionary;


import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { savedictionary } from '../servies/services';
import Modal from 'react-modal';
import $ from 'jquery';
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

class DataDictionary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            rows: 0,
            cols: 0,
            IsOpen: false
        }
    }

    openModal = async () => {
        this.setState({ IsOpen: true })
    }


    afterOpenModal = async () => {

    }

    closeModal = async () => {
        this.setState({ IsOpen: false })
    }



    Columns = async (e) => {
        console.log("Columns Columns Columns ", e.target.value)
        this.setState({
            cols: parseInt(e.target.value)
        })
    }


    Rows = async (e) => {
        console.log("Rows Rows Rows ", e.target.value)
        this.setState({
            rows: parseInt(e.target.value)
        })
    }

    createTable = () => {
        this.createtable()
    }


    colsReturn = () => {
        return Array.from(Array(this.state.cols), (e, i) => {
            return <td key={i} contenteditable="true"> </td>
        })
    }

    createtable = () => {
        return <table className="table table-bordered" id="CreateTable"> {Array.from(Array(this.state.rows), (e, i) => {
            return <tr key={i}>{this.colsReturn()}</tr>
        })}</table>
    }

    Generatedatadict(dealId, month, year, DealType) {
        this.changePanel(dealId, month, year, DealType);
    }

    changePanel = async (dealId, month, year, DealType) => {
        let tableData = [];
        $('#CreateTable tr').each(function (key, value, index) {
            let obj = {}
            $(this).find('td').each(function (key, value, index) {
                console.log("value", key, value, index);
                obj['item' + key] = $(value).text();
            })
            console.log("obj", obj)
            tableData.push(obj)
        })
        console.log("tableData", tableData)
        var data = { "dealId": dealId, "month": month, "year": year, "tableData": tableData }
        const APIResponse = await savedictionary(data, DealType)
if(APIResponse.data.isSuccess=="true"){
        console.log("APIResponse", APIResponse)
        const message = APIResponse.data.message;
        this.props.enqueueSnackbar(message, {
            variant: 'info',
            autoHideDuration: 3000,
        });
        this.setState({ IsOpen: false })
    }
    else{
        console.log("APIResponse", APIResponse)
        const message = APIResponse.data.message;
        this.props.enqueueSnackbar(message, {
            variant: 'error',
            autoHideDuration: 3000,
        });
    }
    }


    render() {

        return (
            <div>
                <Button className="float-right" variant="outlined" onClick={this.openModal}>Add Data Dictionary</Button>
                <Modal
                    isOpen={this.state.IsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <div className="modalPopupDictionary">
                        <Button className="float-right" color="primary" variant="outlined" onClick={this.closeModal}>close</Button>

                        <h3> Add Data Dictionary </h3>

                        <p className="header-dictionary">
                            <label> Select Rows: </label> <select id="rows" onChange={this.Rows} >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                            </select>
                            <label> Select Columns: </label> <select onChange={this.Columns} id="cols">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                            </select>


                        </p>

                        {this.createtable()}

                        <Button variant="contained" color="primary"
                            disabled={this.props.DataDictionaryData.dealId == null ? true : false}
                            disabled={this.props.DataDictionaryData.month == null ? true : false}
                            disabled={this.props.DataDictionaryData.year == null ? true : false}
                            onClick={() => this.Generatedatadict(
                                this.props.DataDictionaryData.dealId,
                                this.props.DataDictionaryData.month,
                                this.props.DataDictionaryData.year,
                                this.props.DealType)}>
                            Generate Data Dictionary
                        </Button>


                    </div>
                </Modal>
            </div>

        );
    }
}

export default DataDictionary;



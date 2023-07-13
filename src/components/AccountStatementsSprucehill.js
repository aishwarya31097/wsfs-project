import React from 'react';
import NumberComp from './NumberComp';
class AcquisitionCriteriaTable extends React.PureComponent {
    render() {
        console.log("Props AccountStatementsTable", this.props.section_title + "------------ " + JSON.stringify(this.props.data[0]))
    
        let PrincipalRemittance = this.props.data[1]
        let InterestRemittance = this.props.data[2]

        let AvailableFunds = this.props.data[3]
        
        // [{
        //     "key": "COLLATERAL BALANCE",
        //     "value1": "",
        //     "value2": ""
        // }, {
        //     "key": "",
        //     "value1": "Number of Loans",
        //     "value2": "Unpaid Principal Balance"
        // }, {
        //     "key": "Beginning Balance",
        //     "value1": "2635",
        //     "value2": "127497251.92"
        // }, {
        //     "key": "Deposits",
        //     "value1": "",
        //     "value2": ""
        // }, {
        //     "key": "Purchased",
        //     "value1": "0",
        //     "value2": "0.00"
        // }, {
        //     "key": "Funded",
        //     "value1": "0",
        //     "value2": "672948.97"
        // }, {
        //     "key": "Capitalized Interest",
        //     "value1": "0",
        //     "value2": "0.00"
        // }, {
        //     "key": "Other(+)",
        //     "value1": "0",
        //     "value2": "0.00"
        // }, {
        //     "key": "Other(+)(non-cash)",
        //     "value1": "0",
        //     "value2": "0.00"
        // }, {
        //     "key": "Total:",
        //     "value1": "0",
        //     "value2": "672948.97"
        // }, {
        //     "key": "Withdrawals",
        //     "value1": "",
        //     "value2": ""
        // }, {
        //     "key": "Paid In Full",
        //     "value1": "91",
        //     "value2": "3943477.92"
        // }, {
        //     "key": "Sale",
        //     "value1": "0",
        //     "value2": "0.00"
        // }, {
        //     "key": "Liquidation",
        //     "value1": "0",
        //     "value2": "0.00"
        // }, {
        //     "key": "Curtailments",
        //     "value1": "0",
        //     "value2": "823149.60"
        // }, {
        //     "key": "Realized Losses",
        //     "value1": "0",
        //     "value2": "0.00"
        // }, {
        //     "key": "Scheduled Principal",
        //     "value1": "0",
        //     "value2": "0.00"
        // }, {
        //     "key": "Other(-)",
        //     "value1": "0",
        //     "value2": "0.00"
        // }, {
        //     "key": "Other(-)(non-cash)",
        //     "value1": "0",
        //     "value2": "0.00"
        // }, {
        //     "key": "Total:",
        //     "value1": "91",
        //     "value2": "4766627.52"
        // }, {
        //     "key": "Ending Balance",
        //     "value1": "2544",
        //     "value2": "123403573.37"
        // }, {
        //     "key": "Adjustments for activities post collection period",
        //     "value1": "",
        //     "value2": "0.00"
        // }, {
        //     "key": "Adjusted Ending Balance",
        //     "value1": "",
        //     "value2": "123403573.37"
        // }]
       
     
        let CollateralBalance = this.props.data[0]
        
        // [{
        //     "key": "COLLATERAL BALANCE",
        //     "value1": "",
        //     "value2": "",
        //     "value3": "",
        //     "value4": ""
        // },{
        //     "key": "",
        //     "value1": "SUBI A",
        //     "value2": "",
        //     "value3": "SUBI B",
        //     "value4": ""
        // }, {
        //     "key": "",
        //     "value1": "Number of Loans",
        //     "value2": "Unpaid Principal Balance",
        //     "value3": "Number of Loans",
        //     "value4": "Unpaid Principal Balance"
        // }, {
        //     "key": "Beginning Balance",
        //     "value1": "2635",
        //     "value2": "127497251.92",
        //     "value3": "",
        //     "value4": ""
        // }, {
        //     "key": "Deposits",
        //     "value1": "",
        //     "value2": "",
        //     "value3": "",
        //     "value4": ""
        // }, {
        //     "key": "Purchased",
        //     "value1": "0",
        //     "value2": "0.00",
        //     "value3": "",
        //     "value4": ""
        // }, {
        //     "key": "Funded",
        //     "value1": "0",
        //     "value2": "672948.97",
        //     "value3": "",
        //     "value4": ""
        // }, {
        //     "key": "Capitalized Interest",
        //     "value1": "0",
        //     "value2": "0.00",
        //     "value3": "",
        //     "value4": ""
        // }, {
        //     "key": "Other(+)",
        //     "value1": "0",
        //     "value2": "0.00",
        //     "value3": "",
        //     "value4": ""
        // }, {
        //     "key": "Other(+)(non-cash)",
        //     "value1": "0",
        //     "value2": "0.00",
        //     "value3": "",
        //     "value4": ""
        // }, {
        //     "key": "Total:",
        //     "value1": "0",
        //     "value2": "672948.97",
        //     "value3": "",
        //     "value4": ""
        // }, {
        //     "key": "Withdrawals",
        //     "value1": "",
        //     "value2": "",
        //     "value3": "",
        //     "value4": ""
        // }, {
        //     "key": "Paid In Full",
        //     "value1": "91",
        //     "value2": "3943477.92",
        //     "value3": "",
        //     "value4": ""
        // }, {
        //     "key": "Sale",
        //     "value1": "0",
        //     "value2": "0.00",
        //     "value3": "",
        //     "value4": ""
        // }, {
        //     "key": "Liquidation",
        //     "value1": "0",
        //     "value2": "0.00",
        //     "value3": "",
        //     "value4": ""
        // }, {
        //     "key": "Curtailments",
        //     "value1": "0",
        //     "value2": "823149.60",
        //     "value3": "",
        //     "value4": ""
        // }, {
        //     "key": "Realized Losses",
        //     "value1": "0",
        //     "value2": "0.00",
        //     "value3": "",
        //     "value4": ""
        // }, {
        //     "key": "Scheduled Principal",
        //     "value1": "0",
        //     "value2": "0.00",
        //     "value3": "",
        //     "value4": ""
        // }, {
        //     "key": "Other(-)",
        //     "value1": "0",
        //     "value2": "0.00",
        //     "value3": "",
        //     "value4": ""
        // }, {
        //     "key": "Other(-)(non-cash)",
        //     "value1": "0",
        //     "value2": "0.00",
        //     "value3": "",
        //     "value4": ""
        // }, {
        //     "key": "Total:",
        //     "value1": "91",
        //     "value2": "4766627.52",
        //     "value3": "",
        //     "value4": ""
        // }, {
        //     "key": "Ending Balance",
        //     "value1": "2544",
        //     "value2": "123403573.37",
        //     "value3": "",
        //     "value4": ""
        // }, {
        //     "key": "Adjustments for activities post collection period",
        //     "value1": "",
        //     "value2": "0.00",
        //     "value3": "",
        //     "value4": ""
        // }, {
        //     "key": "Adjusted Ending Balance",
        //     "value1": "",
        //     "value2": "123403573.37",
        //     "value3": "",
        //     "value4": ""
        // }]
        // let RevolvingPeriod = this.props.data[4]
        // let ReserveAccount = this.props.data[5]
        // let AssetManagementAccount = this.props.data[6]
        // let RedemptionAccount = this.props.data[7] 

     
       
   
        return (
            <React.Fragment>
                {/* {JSON.stringify(AccountStatements1)}
                <br></br>
                {JSON.stringify(ActivitiesSinceCutOff1)}
                <br></br>
                {JSON.stringify(AccountStatements2)}
                <br></br>
                {JSON.stringify(ActivitiesSinceCutOff2)}
                <br></br>
                {JSON.stringify(AccountStatements4)}
                <br></br>
                {JSON.stringify(ActivitiesSinceCutOff3)} */}
  <div class="beforeClass"></div>
                <div className="wrapper-pdf" id={this.props.section_id+"saludapack"}>
                    <h4 class="sectiontitle">{this.props.section_title.replace(/([a-z])([A-Z])/g, '$1 $2')}</h4>


                  <table class="table100 nopadding noborder">
                    <tr>
                      <td class="w50">
                        <table class="table table-bordered" id="AccountStatements1">
                       
                        {PrincipalRemittance == null ? '' :
                                        PrincipalRemittance.map((tr_item) => {
                                            return (
                                                <React.Fragment>
                                                    {tr_item.value1.length == 0 && tr_item.value2.length == 0  && tr_item.key.length != 0 && tr_item.key.length != 1?
                                                        <thead className="">
                                                            <tr>
                                                                <React.Fragment>
                                                                    <th colSpan="3">{tr_item.key.replace(/([a-z])([A-Z])/g, '$1 $2')}</th>
                                                                </React.Fragment>
                                                            </tr>
                                                        </thead>
                                                               :
                                                               (  tr_item.key.length == 1 || tr_item.key.length == 0 ) && tr_item.value1.length == 0 && tr_item.value2.length == 0  ?
         
                                                                 <tr>
                                                                             <td colSpan="3" className="extrarow" ></td>
                                                                     {/* <td><NumberComp value={value}></NumberComp></td> */}
                                                                 </tr>
                                                        :
                                                        
                                                        <tbody>
                                                            <tr>
                                                                <React.Fragment>
                                                                    {tr_item == null ? '' :
                                                                        Object.entries(tr_item).map(([key, value]) => {
                                                                            return (
                                                                                <td className={value == "Total:" ? 'total' : value == "Total: " ? 'total' : value == "Beginning Balance" ? 'bolditem' : value == "Ending Balance" ? 'bolditem' : value == "Adjusted Ending Balance" ? 'bolditem' : value == "Number of Loans" ? 'centeritem' : value == "Principal Balance" ? 'centeritem' : value == "SUBI A" ? 'centeritem': value == "SUBI B" ? 'centeritem':''}><NumberComp value={value}></NumberComp></td>
                                                                            );
                                                                        })
                                                                    }
                                                                </React.Fragment>
                                                            </tr>
                                                        </tbody>
                                                    }
                                                </React.Fragment>
                                            );
                                        })
                                    }
                      
                        </table>
                     
                      </td>
                      
                      <td class="w50">
                        <table class="table table-bordered" id="AccountStatements2" >
                        {InterestRemittance == null ? '' :
                                        InterestRemittance.map((tr_item) => {
                                            return (
                                                <React.Fragment>
                                                    {tr_item.value1.length == 0 && tr_item.value2.length == 0 && tr_item.key.length != 0 && tr_item.key.length != 1?
                                                        <thead className="">
                                                            <tr>
                                                                <React.Fragment>
                                                                    <th colSpan="3">{tr_item.key.replace(/([a-z])([A-Z])/g, '$1 $2')}</th>
                                                                </React.Fragment>
                                                            </tr>
                                                        </thead>
                                                           :
                                                           (  tr_item.key.length == 1 || tr_item.key.length == 0 ) && tr_item.value1.length == 0 && tr_item.value2.length == 0  ?
     
                                                             <tr>
                                                                         <td colSpan="3" className="extrarow" ></td>
                                                                 {/* <td><NumberComp value={value}></NumberComp></td> */}
                                                             </tr>
                                                        :
                                                        <tbody>
                                                            <tr>
                                                                <React.Fragment>
                                                                    {tr_item == null ? '' :
                                                                        Object.entries(tr_item).map(([key, value]) => {
                                                                            return (
                                                                                <td className={value == "Total:" ? 'total' : value == "Total: " ? 'total': value == "Beginning Balance" ? 'bolditem' : value == "Ending Balance" ? 'bolditem' : value == "Adjusted Ending Balance" ? 'bolditem' : value == "Number of Loans" ? 'centeritem' : value == "Principal Balance" ? 'centeritem' : value == "SUBI A" ? 'centeritem': value == "SUBI B" ? 'centeritem':''}><NumberComp value={value}></NumberComp></td>
                                                                            );
                                                                        })
                                                                    }
                                                                </React.Fragment>
                                                            </tr>
                                                        </tbody>
                                                    }
                                                </React.Fragment>
                                            );
                                        })
                                    }
                      
                        </table>
                   
                      </td>
                    </tr>
                  </table>
             

                  <div class="beforeClass"></div>
                  <table class="table100 nopadding noborder">
                    <tr>
                      <td class="w50">
                        <table class="table table-bordered" id="AccountStatements3">
                       
                        {AvailableFunds == null ? '' :
                                        AvailableFunds.map((tr_item) => {
                                            return (
                                                <React.Fragment>
                                                    {tr_item.value1.length == 0 && tr_item.value2.length == 0 && tr_item.key.length != 0 && tr_item.key.length != 1?
                                                        <thead className="">
                                                            <tr>
                                                                <React.Fragment>
                                                                    <th colSpan="3">{tr_item.key.replace(/([a-z])([A-Z])/g, '$1 $2')}</th>
                                                                </React.Fragment>
                                                            </tr>
                                                        </thead>
                                                           :
                                                           (  tr_item.key.length == 1 || tr_item.key.length == 0 ) && tr_item.value1.length == 0 && tr_item.value2.length == 0  ?
     
                                                             <tr>
                                                                         <td colSpan="3" className="extrarow" ></td>
                                                                 {/* <td><NumberComp value={value}></NumberComp></td> */}
                                                             </tr>
                                                        :
                                                        <tbody>
                                                            <tr>
                                                                <React.Fragment>
                                                                    {tr_item == null ? '' :
                                                                        Object.entries(tr_item).map(([key, value]) => {
                                                                            return (
                                                                                <td className={value == "Total:" ? 'total' : value == "Total: " ? 'total' : value == "Beginning Balance" ? 'bolditem' : value == "Ending Balance" ? 'bolditem' : value == "Adjusted Ending Balance" ? 'bolditem' : value == "Number of Loans" ? 'centeritem' : value == "Principal Balance" ? 'centeritem' : value == "SUBI A" ? 'centeritem': value == "SUBI B" ? 'centeritem':''}><NumberComp value={value}></NumberComp></td>
                                                                            );
                                                                        })
                                                                    }
                                                                </React.Fragment>
                                                            </tr>
                                                        </tbody>
                                                    }
                                                </React.Fragment>
                                            );
                                        })
                                    }
                      
                        </table>
                     
                      </td>
                       
                     
                      <td class="w50">  </td>
                      <table class="table table-bordered"  id="AccountStatements"> </table>

                      </tr>
                  </table>
                  <div class="beforeClass"></div>
                  <table class="table100 nopadding noborder">
                    <tr> 
                     
                      <td class="w50">
                      <table class="table table-bordered"  id="AccountStatements4">
                        {CollateralBalance == null ? '' :
                                        CollateralBalance.map((tr_item) => {
                                            return (
                                                <React.Fragment>
                                                    {tr_item.value1.length == 0 && tr_item.value2.length == 0  && tr_item.value3.length == 0  && tr_item.value4.length == 0 && tr_item.key.length != 0 && tr_item.key.length != 1?
                                                        <thead className="">
                                                            <tr>
                                                                <React.Fragment>
                                                                    <th colSpan="5">{tr_item.key.replace(/([a-z])([A-Z])/g, '$1 $2')}</th>
                                                                </React.Fragment>
                                                            </tr>
                                                        </thead>
                                                          :
                                                          (  tr_item.key.length == 1 || tr_item.key.length == 0 ) && tr_item.value1.length == 0 && tr_item.value2.length == 0  && tr_item.value3.length == 0  && tr_item.value4.length == 0 ?
    
                                                            <tr>
                                                                        <td colSpan="5" className="extrarow" ></td>
                                                                {/* <td><NumberComp value={value}></NumberComp></td> */}
                                                            </tr>
                                                        :
                                                        <tbody>
                                                            <tr>
                                                                { tr_item.key.length ==0 && tr_item.value1.length == 0 && tr_item.value3.length == 0 ? 
                                                                    
                                                                    <React.Fragment>
                                    
                                                                         <td >{tr_item.key.replace(/([a-z])([A-Z])/g, '$1 $2')}</td>
                                                                         <td colSpan="2" className={tr_item.value2 == "SUBI A" ? 'centeritem': tr_item.value4 == "SUBI B" ? 'centeritem':''}><NumberComp value={tr_item.value2}></NumberComp></td>
                                                                         <td colSpan="2"className={tr_item.value2 == "SUBI A" ? 'centeritem': tr_item.value4 == "SUBI B" ? 'centeritem':''} ><NumberComp value={tr_item.value4}></NumberComp></td>
                                                                     
                                                                    </React.Fragment>

                                                                :

                                                                    <React.Fragment>
                                                                        {tr_item == null ? '' :
                                                                            Object.entries(tr_item).map(([key, value]) => {
                                                                                return (
                                                                                    <td className={value == "Total:" ? 'total' : value == "Total: " ? 'total' : value == "Beginning Balance" ? 'bolditem' : value == "Ending Balance" ? 'bolditem' : value == "Adjusted Ending Balance" ? 'bolditem' : value == "Number of Loans" ? 'centeritem' : value == "Principal Balance" ? 'centeritem' : value == "SUBI A" ? 'centeritem': value == "SUBI B" ? 'centeritem':''}><NumberComp value={value}></NumberComp></td>
                                                                                );
                                                                            })
                                                                        }
                                                                    </React.Fragment>

                                                                }
                                                            </tr>
                                                        </tbody>
                                                    }
                                                </React.Fragment>
                                            );
                                        })
                                    }
                        </table>
                   
                      </td>
                    </tr>
                  </table>      
                  

                  </div>
                  <div class="beforeClass"></div>
              
            </React.Fragment>
        )
    }
}

export default AcquisitionCriteriaTable;

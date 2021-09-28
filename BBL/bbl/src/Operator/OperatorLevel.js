import moment from 'moment';
import React from 'react';
import ApiUrls from '../ApiUrls';
import { Header } from '../Common/Header';
import AppConstants from '../Constant';
import "../Login/UniversalLogin.css"
import "./OperatorLevel.css"

export default class OperatorLevel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isMechanicalBreakdown: false,
            isElectricalBreakdown: false,
            isMaterialUnavailable: false,
            isUnplanedBreakdown: false,
            isPlanedShutdown: false,
            isChangeOver: false,
            isOther: false,
            productName: '',
            machineCode: 0,
            rejectPieces: 0,
            productCode: 0,
            yourShift: 0,
            invalidproductName: '',
            invalidmachineCode: '',
            invalidrejectPieces: '',
            invalidproductCode: '',
            invalidyourShift: '',
            clientName: ''
        }
    }

    componentDidMount() {
        const clientName = localStorage.getItem('clientName');
        if(clientName){
            this.setState({ clientName: clientName }, () => {
                this.fetchStopages();
            });
        }
      

    }

    fetchStopages = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                clientName: this.state.clientName, location: localStorage.getItem('location'), machine: "CUTTING",
                dateTime: moment().format('YYYY-MM-DD HH:mm:ss')
            })
        };

        console.log(requestOptions)

        fetch(ApiUrls.getStopages, requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    result.map((item) => {
                        if (item.end_time === null) {
                            switch (item.reason_id) {
                                case 9:
                                    this.setState({
                                        isOther: true
                                    })
                                    break;
                                case 2:
                                    this.setState({
                                        isMechanicalBreakdown: true
                                    })
                                    break;
                                case 3:
                                    this.setState({
                                        isElectricalBreakdown:true
                                    })
                                    break;
                                case 4:
                                    this.setState({
                                        isMaterialUnavailable:true
                                    })
                                    break;
                                case 5:
                                    this.setState({
                                        isUnplanedBreakdown:true
                                    })
                                    break;
                                case 6:
                                    this.setState({
                                        isPlanedShutdown:true
                                    })
                                    break;
                                    case 7:
                                        this.setState({
                                            isChangeOver:true
                                        })
                                        break;
                                default:
                                    break;
                            }
                        }

                    })

                }
            )
    }

    handleSubmit = (event) => {
        if (this.isValid()) {

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    clientName: this.state.clientName, location: localStorage.getItem('location'), machine: "CUTTING",productName:this.state.productName,
                    machineCode:this.state.machineCode,
                    productCode:this.state.productCode,rejectPieces:this.state.rejectPieces,shift:this.state.yourShift,timestamp:moment().format('YYYY-MM-DD HH:mm:ss')
                })
            };
    
             console.log(requestOptions)
    
            fetch(ApiUrls.operatorEntry, requestOptions)
                .then(res => res.json())
                .then(
                    (result) => {
                        alert("Data submitted succesfully!")
                    }
                )

        }
    }

    getCurrentDateTime = () => {
        var now = new Date();
        var datetime = now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate();

        datetime += ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
        return datetime.replaceAll('/', '-');
    }

    sendStoppages = (reason, isStopage) => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                clientName: this.state.clientName, location: localStorage.getItem('location'), machine: "CUTTING",
                comment: isStopage ? "start" : "end", reason: reason, start_time: isStopage ? moment().format('YYYY-MM-DD HH:mm:ss') : '', end_time: isStopage ? '' : moment().format('YYYY-MM-DD HH:mm:ss')

            })
        };

        console.log(requestOptions)

        fetch(ApiUrls.stopagesApi, requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    alert("Data submitted succesfully!")
                }
            )
    }

    isValid = () => {
        let isValid = true;
        if (this.state.productName !== '') {
            this.setState({ invalidproductName: false })
        }
        else {
            this.setState({ invalidproductName: true })
            isValid = false;
        }

        if (this.state.machineCode != 0) {
            this.setState({ invalidmachineCode: false })
        }
        else {
            this.setState({ invalidmachineCode: true })
            isValid = false;
        }

        if (this.state.rejectPieces != 0) {
            this.setState({ invalidrejectPieces: false })
        }
        else {
            this.setState({ invalidrejectPieces: true })
            isValid = false;
        }

        if (this.state.productCode != 0 ) {
            this.setState({ invalidproductCode: false })
        }
        else {
            this.setState({ invalidproductCode: true })
            isValid = false;
        }

        if (this.state.yourShift !== 0) {
            this.setState({ invalidyourShift: false })
        }
        else {
            this.setState({ invalidyourShift: true })
            isValid = false;
        }

        return isValid;
    }

    handleChange = (event, index, value) => {
        this.setState({
            machineCode: event.target.value

        })
    }

    handleRejectedChange = (event, index, value) => {
        this.setState({
            rejectPieces: event.target.value

        })
    }

    handleProductCodeChange = (event, index, value)=>{
        this.setState({
            productCode: event.target.value
        })
    }

    handleShiftChange = (event, index, value)=>{
        this.setState({
            yourShift: event.target.value
        })
    }

    render() {
        return (
            <div>
                <Header hideLogout={false} />
                <div className="mainContainer">


                    <div className="clientName">
                        <div>
                            <div>Machine Name: {AppConstants.MachineName}</div>
                        </div>
                        <div>
                            Logged in: {this.state.clientName}</div>
                    </div>

                    <div className="displayFlexHolder">
                        <div className="firstRow displayFlex">
                            <div className="pad10">
                                <label className="bold">Product Name:</label>
                            </div>
                            <div className="userInputDiv pad2">
                                <input type='text' placeholder='Enter Product Name' className="userInput"
                                    style={{ border: this.state.invalidproductName ? '1px solid red' : 'none' }}
                                    onChange={(event) => {
                                        this.setState({ productName: event.target.value })
                                    }}
                                />
                            </div>
                        </div>
                        <div className="firstRow displayFlex">
                            <div className="pad10">
                                <label className="bold">Machine Code:</label>
                            </div>
                            <div className="userInputDiv pad2">
                            <div className="">
                            <select value={this.state.machineCode} onChange={this.handleChange} className="selectDropdown" style={{ border: this.state.invalidmachineCode ? '1px solid red' : 'none' }}>
                                <option value="0">Select Machine Code</option>
                                <option value="M1">M1</option>
                                <option value="M2">M2</option>
                                <option value="M3">M3</option>

                            </select>
                        </div>
                                {/* <input type='text' placeholder='Enter Machine Code' className="userInput"
                                    style={{ border: this.state.invalidmachineCode ? '1px solid red' : 'none' }}
                                    onChange={(event) => {
                                        this.setState({ machineCode: event.target.value })
                                    }}
                                /> */}
                            </div>
                        </div>
                    </div>
                    <div className="displayFlexHolder">


                        <div className="firstRow displayFlex">
                            <div className="pad10">
                                <label className="bold">Rejected Code:</label>
                            </div>
                            <div className="userInputDiv pad2">
                                <div>
                                <select value={this.state.rejectPieces} onChange={this.handleRejectedChange} className="selectDropdown" style={{ border: this.state.invalidrejectPieces ? '1px solid red' : 'none' }}>
                                <option value="0">Select Rejected Code</option>
                                <option value="A-Color">A-color</option>
                                <option value="B-Temp">B-Temp</option>
                                <option value="Other">Other</option>

                            </select>
                                </div>
                                {/* <input type='text' placeholder='Enter Reject Pieces' className="userInput"
                                    style={{ border: this.state.invalidrejectPieces ? '1px solid red' : 'none' }}
                                    onChange={(event) => {
                                        this.setState({ rejectPieces: event.target.value })
                                    }}
                                /> */}
                            </div>
                        </div>
                        <div className="firstRow displayFlex">
                            <div className="pad10">
                                <label className="bold">Product Code:</label>
                            </div>
                            <div className="userInputDiv pad2">
                            <div>
                                <select value={this.state.productCode} onChange={this.handleProductCodeChange} className="selectDropdown" style={{ border: this.state.invalidproductCode ? '1px solid red' : 'none' }}>
                                <option value="0">Select Product Code</option>
                                <option value="T1">T1</option>
                                <option value="B1">B1</option>
                                <option value="R1">R1</option>
                            </select>
                                </div>
                                {/* <input type='text' placeholder='Enter Product Code' className="userInput"
                                    style={{ border: this.state.invalidproductCode ? '1px solid red' : 'none' }}
                                    onChange={(event) => {
                                        this.setState({ productCode: event.target.value })
                                    }}
                                /> */}
                            </div>
                        </div>
                    </div>
                    <div className="displayFlexHolder">
                        <div className="firstRow displayFlex">
                            <div className="pad10">
                                <label className="bold">Your Shift:</label>
                            </div>
                            <div className="userInputDiv pad2 margLeft25">
                            <div>
                                <select value={this.state.yourShift} onChange={this.handleShiftChange} className="selectDropdown" style={{ border: this.state.invalidyourShift ? '1px solid red' : 'none' }}>
                                <option value="0">Select Your Shift</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="G">G</option>
                            </select>
                                </div>
                                {/* <input type='text' placeholder='Enter Shift' className="userInput"
                                    style={{ border: this.state.invalidyourShift ? '1px solid red' : 'none' }}
                                    onChange={(event) => {
                                        this.setState({ yourShift: event.target.value })
                                    }}
                                /> */}
                            </div>
                        </div>
                        <div className="btnSubmit btnSubmitOperator margLeft25 pad2 mar0rem">
                            <input type="submit" value="Submit" onClick={this.handleSubmit} />
                        </div>
                    </div>

                    <div>
                        <div className="firstRow displayFlex flexWrap justifyStart">
                            <div className="pad10">
                                <label className="bold">Select Error:</label>
                            </div>
                            <div className="stopageDiv">

                                <div className={this.state.isMechanicalBreakdown ? "stopageActive1" : "stopage1"}>
                                    <input type="submit" value="Mechanical breakdown" onClick={() => {
                                        this.setState({ isMechanicalBreakdown: !this.state.isMechanicalBreakdown }, () => {
                                            this.sendStoppages("Mechanical breakdown", this.state.isMechanicalBreakdown)
                                        })
                                    }}
                                    />
                                </div>
                                <div className={this.state.isElectricalBreakdown ? "stopageActive1" : "stopage1"}>
                                    <input type="submit" value="Electrical breakdown"
                                        onClick={() => {
                                            this.setState({ isElectricalBreakdown: !this.state.isElectricalBreakdown }, () => {
                                                this.sendStoppages("Electrical breakdown", this.state.isElectricalBreakdown)
                                            })
                                        }}
                                    />
                                </div>
                                <div className={this.state.isMaterialUnavailable ? "stopageActive1" : "stopage1"}>
                                    <input type="submit" value="Material unavailibility"
                                        onClick={() => {
                                            this.setState({ isMaterialUnavailable: !this.state.isMaterialUnavailable }, () => {
                                                this.sendStoppages("Material unavailibility", this.state.isMaterialUnavailable)
                                            })
                                        }}
                                    />
                                </div>
                                <div className={this.state.isUnplanedBreakdown ? "stopageActive1" : "stopage1"}>
                                    <input type="submit" value="Unplanned breakdown"
                                        onClick={() => {
                                            this.setState({ isUnplanedBreakdown: !this.state.isUnplanedBreakdown }, () => {
                                                this.sendStoppages("Unplanned breakdown", this.state.isUnplanedBreakdown)
                                            })
                                        }}
                                    />
                                </div>
                                <div className={this.state.isPlanedShutdown ? "stopageActive1" : "stopage1"}>
                                    <input type="submit" value="Planned shutdown"
                                        onClick={() => {
                                            this.setState({ isPlanedShutdown: !this.state.isPlanedShutdown }, () => {
                                                this.sendStoppages("Planned shutdown", this.state.isPlanedShutdown)
                                            })
                                        }}
                                    />
                                </div>
                                <div className={this.state.isChangeOver ? "stopageActive1" : "stopage1"}>
                                    <input type="submit" value="Change over"
                                        onClick={() => {
                                            this.setState({ isChangeOver: !this.state.isChangeOver }, () => {
                                                this.sendStoppages("Change over", this.state.isChangeOver)
                                            })
                                        }}
                                    />
                                </div>
                                <div className={this.state.isOther ? "stopageActive1" : "stopage1"}>
                                    <input type="submit" value="Other"
                                        onClick={() => {
                                            this.setState({ isOther: !this.state.isOther }, () => {
                                                this.sendStoppages("Other", this.state.isOther)
                                            })
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}
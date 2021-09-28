import React from 'react';
import ApiUrls from '../ApiUrls';
import { Header } from '../Common/Header';
import "./UniversalLogin.css"

class UniversalLogin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userType: 0,
            name: '',
            code: '',
            inValidType: false,
            inValidName: false,
            inValidCode: false
        }
    }

    componentDidMount() {

    }

    handleChange = (event, index, value) => {
        this.setState({
            userType: event.target.value

        })
    }

    userNameChange = (event, index, value) => {
        this.setState({
            name: event.target.value

        })
    }

    loginCodeChange = (event, index, value) => {
        this.setState({
            code: event.target.value

        })
    }

    handleSubmit = (event) => {
        if (this.isValid()) {
            console.log(this.state.userType);
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: this.state.name, password: this.state.code,owner:this.state.userType })
            };
            fetch(ApiUrls.loginApi, requestOptions)
                .then(res => res.json())
                .then(
                    (result) => {
                        console.log(result.owner);
                        if (result.code === 200) {
                            
                            localStorage.setItem('location', result.location);
                            localStorage.setItem('clientName', result.clientName);


                            switch (result.owner) {
                                case 1:
                                    window.location.href = "/OperatorLevel";
                                    break;

                                case 2:
                                    window.location.href = "/Supervisor";
                                    break;

                                default:
                                    break;
                            }
                        }
                        else{
                            alert(result.message)
                        }

                    }
                )

        }
    }

    isValid = () => {
        let isValid = true;
        if (parseInt(this.state.userType) > 0) {
            this.setState({ inValidType: false });
        }
        else {
            this.setState({ inValidType: true })
            isValid = false;
        }

        if (this.state.name !== '') {
            this.setState({ inValidName: false })
        }
        else {
            this.setState({ inValidName: true })
            isValid = false;
        }

        if (this.state.code !== '') {
            this.setState({ inValidCode: false })
        }
        else {
            this.setState({ inValidCode: true })
            isValid = false;
        }

        return isValid;

    }


    render() {

        return (

            <div>
                <Header hideLogout={true}/>
                <div className="mainContainer">
                    <div className="firstRow">
                        <div className="dropdownDiv">
                            <select value={this.state.userType} onChange={this.handleChange} className="selectDropdown" style={{ border: this.state.inValidType ? '1px solid red' : 'none' }}>
                                <option value="0">Select Login Type</option>
                                <option value="1">Operator</option>
                                <option value="2">Supervisor</option>
                            </select>
                        </div>
                        <div className="userInputDiv">
                            <input type='text' placeholder='Enter User Name' className="userInput" onChange={this.userNameChange}
                                style={{ border: this.state.inValidName ? '1px solid red' : 'none' }}
                            />
                        </div>
                    </div>
                    <div className="secondRow">
                        <div className="codeInputDiv userInputDiv">
                            <input type='text' placeholder='Enter Login Code' className="userInput" onChange={this.loginCodeChange}
                                style={{ border: this.state.inValidCode ? '1px solid red' : 'none' }}
                            />
                        </div>
                    </div>
                    <div className="btnSubmit">
                        <input type="submit" value="Submit" onClick={this.handleSubmit} />
                    </div>

                </div>
            </div>

        )
    }
}

export default UniversalLogin;
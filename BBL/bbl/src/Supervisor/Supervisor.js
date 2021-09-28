import React from 'react'
import ApiUrls from '../ApiUrls'
import { Header } from '../Common/Header'
import '../Login/UniversalLogin.css'
import './Supervisor.css'
import moment from 'moment'

export default class Supervisor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      productionTime: 0,
      articleNo: 0,
      cyclesNo: 0,
      rejectedArticle: '',
      kwh: '',
      invalidproductionTime: false,
      invalidarticleNo: false,
      invalidcyclesNo: false,
      invalidrejectedArticle: false,
      invalidkwh: false,
      clientName: 'NA',
    }
  }

  componentDidMount() {
    const clientName = localStorage.getItem('clientName')
    this.setState({ clientName: clientName })
  }

  getCurrentDateTime = () => {
    var now = new Date()
    var datetime =
      now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate()

    datetime +=
      ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()
    return datetime.replaceAll('/', '-')
  }

  handleSubmit = (event) => {
    if (this.isValid()) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: this.state.clientName,
          location: localStorage.getItem('location'),
          machine: 'CUTTING',
          plannedProduction: this.state.productionTime,
          noOfArticles: this.state.articleNo,
          plannedNoOfCycles: this.state.cyclesNo,
          rejectedArticles: this.state.rejectedArticle,
          kwhPerCycle: this.state.kwh,
          timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
        }),
      }

      console.log(requestOptions)

      fetch(ApiUrls.supervisorEntry, requestOptions)
        .then((res) => res.json())
        .then((result) => {
          console.log(result)
          alert('Data submitted succesfully!')
        })
    }
  }

  isValid = () => {
    let isValid = true
    if (this.state.productionTime !== 0) {
      this.setState({ invalidproductionTime: false })
    } else {
      this.setState({ invalidproductionTime: true })
      isValid = false
    }

    if (this.state.articleNo !== 0) {
      this.setState({ invalidarticleNo: false })
    } else {
      this.setState({ invalidarticleNo: true })
      isValid = false
    }
    if (this.state.cyclesNo !== 0) {
      this.setState({ invalidcyclesNo: false })
    } else {
      this.setState({ invalidcyclesNo: true })
      isValid = false
    }

    if (this.state.rejectedArticle !== '') {
      this.setState({ invalidrejectedArticle: false })
    } else {
      this.setState({ invalidrejectedArticle: true })
      isValid = false
    }

    if (this.state.kwh !== '') {
      this.setState({ invalidkwh: false })
    } else {
      this.setState({ invalidkwh: true })
      isValid = false
    }
    return isValid
  }

  render() {
    return (
      <div>
        <Header hideLogout={false} className="supervisorHeader" />
        <div className="mainContainer mainContainer1">
          <div className="clientName clientNameSupr">
            Logged in: {this.state.clientName}
          </div>
          <div className="displayFlexHolder">
            <div className="firstRow displayFlex">
              <div className="pad10">
                <label className="bold">Planned Production Time(min)</label>
              </div>
              <div className="userInputDiv pad2">
                {/* <input type='text' placeholder='Enter Planned Production Time' className="userInput"
                                 style={{border: this.state.invalidproductionTime ? '1px solid red': 'none'}} 
                                onChange={(event)=>{
                                    this.setState({productionTime:event.target.value})
                                }}
                                /> */}

                <select
                  value={this.state.productionTime}
                  onChange={(event) => {
                    this.setState({ productionTime: event.target.value })
                  }}
                  className="selectDropdown"
                  style={{
                    border: this.state.invalidproductionTime
                      ? '1px solid red'
                      : 'none',
                  }}
                >
                  <option value="0">Select Production Time</option>
                  <option value="370">370</option>
                  <option value="370">380</option>
                  <option value="390">390</option>
                </select>
              </div>
            </div>
            <div className="firstRow displayFlex">
              <div className="pad10">
                <label className="bold">No. of Articles/Mould</label>
              </div>
              <div className="userInputDiv pad2">
                {/* <input
                  type="text"
                  placeholder="Enter No. Of Articles/Mould"
                  className="userInput"
                  style={{
                    border: this.state.invalidarticleNo
                      ? '1px solid red'
                      : 'none',
                  }}
                  onChange={(event) => {
                    this.setState({ articleNo: event.target.value })
                  }}
                /> */}
                <div>
                  <select
                    value={this.state.articleNo}
                    onChange={(event) => {
                      this.setState({ articleNo: event.target.value })
                    }}
                    className="selectDropdown"
                    style={{
                      border: this.state.invalidarticleNo
                        ? '1px solid red'
                        : 'none',
                    }}
                  >
                    <option value="0">Select Mould No</option>
                    <option value="T1">T1</option>
                    <option value="B1">B1</option>
                    <option value="R1">R1</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="displayFlexHolder">
            <div className="firstRow displayFlex">
              <div className="pad10">
                <label className="bold">Planned No. of cycles/hr</label>
              </div>
              <div className="userInputDiv pad2">
                {/* <input
                  type="text"
                  placeholder="Enter Planned number of cycles/hr"
                  className="userInput"
                  style={{
                    border: this.state.invalidcyclesNo
                      ? '1px solid red'
                      : 'none',
                  }}
                  onChange={(event) => {
                    this.setState({ cyclesNo: event.target.value })
                  }}
                /> */}
                <div>
                  <select
                    value={this.state.cyclesNo}
                    onChange={(event) => {
                      this.setState({ cyclesNo: event.target.value })
                    }}
                    className="selectDropdown"
                    style={{
                      border: this.state.invalidcyclesNo
                        ? '1px solid red'
                        : 'none',
                    }}
                  >
                    <option value="0">Select No. of cycles/hr</option>
                    <option value="T1">T1</option>
                    <option value="B1">B1</option>
                    <option value="R1">R1</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="firstRow displayFlex">
              <div className="pad10">
                <label className="bold">Rejected Articles</label>
              </div>
              <div className="userInputDiv pad2">
                <input
                  type="text"
                  placeholder="Enter Rejected Articles"
                  className="userInput"
                  style={{
                    border: this.state.invalidrejectedArticle
                      ? '1px solid red'
                      : 'none',
                  }}
                  onChange={(event) => {
                    this.setState({ rejectedArticle: event.target.value })
                  }}
                />
              </div>
            </div>
          </div>
          <div className="displayFlexHolder">
            <div className="firstRow displayFlex">
              <div className="pad10">
                <label className="bold">kWH/Cycle</label>
              </div>
              <div className="userInputDiv pad2 margLeft25">
                <input
                  type="text"
                  placeholder="Enter kWH/Cycle"
                  className="userInput"
                  style={{
                    border: this.state.invalidkwh ? '1px solid red' : 'none',
                  }}
                  onChange={(event) => {
                    this.setState({ kwh: event.target.value })
                  }}
                />
              </div>
            </div>
            <div className="btnSubmit btnSubmitOperator margLeft25 pad2 mar0rem">
              <input type="submit" value="Submit" onClick={this.handleSubmit} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

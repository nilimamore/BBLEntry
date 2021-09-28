import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './MachineDashboard.css'



class MachineDashboard extends React.Component {

    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = {
          machines:[]
        };
      }
    
    componentDidMount() {
        fetch('http://localhost:3000/data')
          .then(response => response.json())
          .then(data => {
            this.setState({
                machines:data.MachineDashboard
            })
          })
    }

    render() {

        const {machines} = this.state;

        const machineUI =(value,index) => <div>
        
            <div className="machineContainer">
            <div style={{textAlign:'center',marginBottom:20}}>Machine_{index} </div>
                        <CircularProgressbar value={value} text={value}
                            styles={buildStyles({ pathColor: `#E59866`, textColor: '#DC7633' })}
                            strokeWidth={12}
                        />
                    </div>
        </div>

        return (
            <div>
                <div>
                {machines && machines.length > 0? machines.map((object,index)=>{
                   return machineUI(Object.values(object),index)
                }) : null}
                    
                </div>
            </div>
        )
    }
}

export default MachineDashboard;
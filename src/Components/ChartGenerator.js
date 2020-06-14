import React from 'react';
import {Line} from 'react-chartjs-2';
import axios from 'axios'


class ChartGenerator extends React.Component{
  
    state = {
      chartData:[],
      labels: ['Blood Pressure', 'Heart Rate', 'Heigth/Weight',
           'BMI'],
  datasets: [
    {
      label: 'Clinical',
      fill: false,
      lineTension: 0.5,
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [65, 59, 80, 71]
    }
  ]
  }

  componentDidMount(){
    let id = this.props.match.params.patientId;
    let compoName = this.props.match.params.componentName;
    axios.get("http://localhost:8080/ClinicalAPI/api/clincal/"+id+'/'+compoName)
    .then(res=>{    
        this.setState(res.data)
      })
  }
    render(){
        return(<div>
                <Line
                data={this.state}
                options={{
                          title:{
                                display:true,
                                text:'Patient Clinical Data',
                                fontSize:20
                              },
                          legend:{
                                  display:true,
                                  position:'right'
                                }
                          }} />
        </div>)
    }
}

export default ChartGenerator;
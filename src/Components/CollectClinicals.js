import React from 'react';
import axios from 'axios'
import { toast } from "react-toastify"
import { Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css'

toast.configure();
const Style = {
    width: '350px'
  };
class CollectClinicals extends React.Component{

    state = {}

    componentDidMount(){
            let id = this.props.match.params.patientId;
            axios.get("http://localhost:8080/ClinicalAPI/api/patient/"+id)
            .then(res=>{
                this.setState(res.data)
            })
    }

    addClinicalData(event){
        event.preventDefault()
        const Clinical = {
            patientId:this.props.match.params.patientId,
            componentName:this.compoName,
            componentValue:this.compoValue
        }

        axios.post("http://localhost:8080/ClinicalAPI/api/clinical" , Clinical).then(res=>{
            toast("Added Sucssefully" , {autoClose:3000 , position:toast.POSITION.BOTTOM_CENTER})
        })
    }

    render(){
        return(<div class="container" style={Style}>
                <h3>Patient Details</h3>
                First Name: {this.state.firstName}  <br/>
                Last Name: {this.state.lastName}    <br/>
                Age: {this.state.age}   <br/><br/>
                
                <h3>Clinical Data</h3>
                
                <form>                    
                <select class="custom-select" onChange={(event)=>(this.compoName = event.target.value)}>
                        <option hidden>Select</option>
                        <option value="heartrate">Heart Rate</option>
                        <option value="hw">Height/Weight</option>
                        <option value="bp">Blood Pressure(Sys/Dys)</option>
                    </select>   <br/><br/>
                    <div class="form-group">
                <input type="text" class="form-control" placeholder="Enter Selected Value" name="componentValue" onChange={event=>this.compoValue = event.target.value} /> 
                </div>
                <button class="btn btn-primary" onClick={this.addClinicalData.bind(this)}> Add Data </button>
                </form>
                        <br/>
                Click <Link to="/">here</Link> to go back Home...

        </div>)
    }
}

export default CollectClinicals;
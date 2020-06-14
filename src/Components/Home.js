import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const tableStyle = {
    width: '750px'
  };
class Home extends React.Component{

    state = {
        patientData:[]
    }
    

    componentDidMount(){
        axios.get("http://localhost:8080/ClinicalAPI/api/patient").then(res=>{
            const patientData = res.data;
            this.setState({patientData})
        })
    }
        
    render(){
        return(
        <div class="container">
            <div class="row">
                
                    <table class="table table-hover" align="center" style={tableStyle}>
                        <thead>
                            <tr>
                                <td><b>id</b></td>
                                <td><b>First Name</b></td>
                                <td><b>Last Name</b></td>
                                <td><b>Age</b></td>
                            </tr>
                        </thead>
                        <tbody>
                                {this.state.patientData.map((patient) => <RowCreater item={patient} />)}
                        </tbody>
                    </table>
                
            </div>
                <br/>
                <Link class="btn btn-primary" to={'/addPatient'} >Add Patient</Link>
        </div>)
    }
}

class RowCreater extends React.Component{
    render(){
        var patient = this.props.item;
        return<tr>
                <td>{patient.id}</td>
                <td>{patient.firstName}</td>
                <td>{patient.lastName}</td>
                <td>{patient.age}</td>
                <td> <Link class="btn btn-outline-primary" to={'patientDetails/'+patient.id}>Add Clinical Data</Link> </td>
                <td> <Link class="btn btn-outline-secondary" to={'analyze/'+patient.id}>Analyze Data</Link> </td>                
            </tr>
    }
}

export default Home;
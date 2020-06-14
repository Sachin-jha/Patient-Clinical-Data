import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

class AnalyzeData extends React.Component{

    state = {
        clinicalData:[]
    }

    componentDidMount(){
            let id = this.props.match.params.patientId;
            axios.get("http://localhost:8080/ClinicalAPI/api/patient/analize/"+id)
            .then(res=>{
                this.setState(res.data)
            })
    }

    render(){
        return(<div>
                 <h3>Patient Details</h3>
               <b> First Name:-</b> {this.state.firstName}  <br/>
               <b> Last Name:</b> {this.state.lastName}    <br/>
               <b>Age:</b> {this.state.age}   <br/><br/>

                <h3>Patient Clinical Data</h3>
                {this.state.clinicalData.map((eachEntry) => <TableCreater item={eachEntry} patientId={this.state.id} />)}
                
        </div>)
    }
}

class TableCreater extends React.Component{
    render(){
        var patientId = this.props.patientId;
        var eachEntry = this.props.item;

        return(<div class="container">
                    <table class="table table-hover">
                        <tr>
                            <b>{eachEntry.componentName} :- </b>
                            {eachEntry.componentValue}
                        </tr>
                    </table>  
                    <Link class="btn btn-primary" to={'/chart/'+patientId+'/'+eachEntry.componentName}>Analyze Data</Link>                      
            </div>)
            
    }
}

export default AnalyzeData;
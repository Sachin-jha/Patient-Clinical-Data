import React from 'react';
import axios from 'axios';
import { toast } from "react-toastify"
import { Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css'

const divStyle = {
    width: '400px'
  };

toast.configure();
class AddPatient extends React.Component{

    render(){
        return(<div class="container-sm" style={divStyle}>
            <h3>Enter Patient Details</h3>
            <form>
                <div class="form-group">
                <input type="text" class="form-control" placeholder="First Name" name="firstName" onChange={(event=>this.fName = event.target.value)} />
                </div>  <br/>
                <div class="form-group">
                <input type="text" class="form-control" placeholder="Last Name" name="lastName" onChange={(event=>this.lName = event.target.value)} />
                </div>  <br/>
                <div class="form-group">
                <input type="text" class="form-control" placeholder="age" name="age" onChange={(event=>this.pAge = event.target.value)} />
                </div> 
                <button class="btn btn-primary" onClick={this.addPatientDetails.bind(this)} >Add Patient</button>
            </form> <br/>
            Click <Link to="/">here</Link> to go back Home...
        </div>)
    }

    addPatientDetails(event){
            event.preventDefault();
            const data = {
                firstName:this.fName,
                lastName:this.lName,
                age:this.pAge
            }

            axios.post("http://localhost:8080/ClinicalAPI/api/savePatient" , data).then(res=>{
                
                toast("Added Sucssefully" , {autoClose:3000 , position:toast.POSITION.BOTTOM_CENTER})
            })
            
    }
}


export default AddPatient
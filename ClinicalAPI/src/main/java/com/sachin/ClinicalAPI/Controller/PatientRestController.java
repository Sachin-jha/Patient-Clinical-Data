package com.sachin.ClinicalAPI.Controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.sachin.ClinicalAPI.Model.ClinicalData;
import com.sachin.ClinicalAPI.Model.Patient;
import com.sachin.ClinicalAPI.Repository.PatientRepository;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class PatientRestController {

	Map<String, String> filter = new HashMap<>();
	
	@Autowired
	private PatientRepository patientRepository;	

	public PatientRepository getPatientRepository() {
		return patientRepository;
	}

	public void setPatientRepository(PatientRepository patientRepository) {
		this.patientRepository = patientRepository;
	}

	@RequestMapping(value = "/patient", method = RequestMethod.GET)
	public List<Patient> getPatientsAllDetails() {
		return getPatientRepository().findAll();
	}

	@RequestMapping(value = "/patient/{id}", method = RequestMethod.GET)
	public Patient getPatientsDetails(@PathVariable("id") int id) {
		return patientRepository.findById(id).get();
	}

	@RequestMapping(value = "/savePatient", method = RequestMethod.POST)
	public Patient savePatient(@RequestBody Patient patient) {
		return patientRepository.save(patient);
	}
	
	@RequestMapping(value = "/patient/analize/{id}", method = RequestMethod.GET)
	public Patient analyze(@PathVariable("id") int id) 
	{
		Patient patient = patientRepository.findById(id).get();
		List<ClinicalData> clinicalData = patient.getClinicalData();
		List<ClinicalData> duplicateClinicalData = new ArrayList<>(clinicalData);
		for(ClinicalData eachEntry:duplicateClinicalData)
		{		
			// this logic for filtering the data, You can also use repository.
			if(filter.containsKey(eachEntry.getComponentName())){
				clinicalData.remove(eachEntry);
				continue;
			}
			else{
				filter.put(eachEntry.getComponentName() , null);
			}
			
			//This Logic for height/weight and calculate the BMI
			if(eachEntry.getComponentName().equals("hw")) {				
				String[] heightAndWeight = eachEntry.getComponentValue().split("/");
				if(heightAndWeight!=null && heightAndWeight.length>1) 
				{
					float heightInMeters = Float.parseFloat(heightAndWeight[0]) * 0.4536f;
					float bmi = Float.parseFloat(heightAndWeight[1])/(heightInMeters*heightInMeters); // Calculate BMI
					ClinicalData data = new ClinicalData();
					data.setComponentName("BMI");
					data.setComponentValue(Float.toString(bmi));
					clinicalData.add(data);
				}
			}
		}	
		filter.clear();
		return patient;
		
	}

}

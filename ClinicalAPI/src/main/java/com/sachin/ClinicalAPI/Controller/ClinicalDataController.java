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

import com.sachin.ClinicalAPI.DTO.PatientClinicalData;
import com.sachin.ClinicalAPI.Model.ClinicalData;
import com.sachin.ClinicalAPI.Model.Patient;
import com.sachin.ClinicalAPI.Repository.ClinicalDataRepository;
import com.sachin.ClinicalAPI.Repository.PatientRepository;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class ClinicalDataController {

	Map<String, String> filter = new HashMap<>();

	@Autowired
	private ClinicalDataRepository clinicalDataRepository;
	@Autowired
	private PatientRepository patientRepository;

	public PatientRepository getPatientRepository() {
		return patientRepository;
	}

	public void setPatientRepository(PatientRepository patientRepository) {
		this.patientRepository = patientRepository;
	}

	public ClinicalDataRepository getClinicalDataRepository() {
		return clinicalDataRepository;
	}

	public void setClinicalDataRepository(ClinicalDataRepository clinicalDataRepository) {
		this.clinicalDataRepository = clinicalDataRepository;
	}

	@RequestMapping(value = "/clinical", method = RequestMethod.POST)
	public ClinicalData saveClinicalData(@RequestBody PatientClinicalData request) {
		Patient patientId = patientRepository.findById(request.getPatientId()).get();
		ClinicalData clinicalData = new ClinicalData();
		clinicalData.setComponentName(request.getComponentName());
		clinicalData.setComponentValue(request.getComponentValue());
		clinicalData.setPatient(patientId);
		return clinicalDataRepository.save(clinicalData);

	}

	@RequestMapping(value = "/clinical/{patientId}/{componentName}", method = RequestMethod.GET)
	public List<ClinicalData> getClinicalData(@PathVariable("patientId") int patientId,
			@PathVariable("componentName") String componentName) {
		List<ClinicalData> clinicalData = clinicalDataRepository
				.findByPatientIdAndComponentNameOrderByMeasuredDateTime(patientId, componentName);

		List<ClinicalData> duplicateClinicalData = new ArrayList<>(clinicalData);
		for (ClinicalData eachEntry : duplicateClinicalData) {
			// This Logic for height/weight and calculate the BMI
			if (eachEntry.getComponentName().equals("hw")) {
				String[] heightAndWeight = eachEntry.getComponentValue().split("/");
				if (heightAndWeight != null && heightAndWeight.length > 1) {
					float heightInMeters = Float.parseFloat(heightAndWeight[0]) * 0.4536f;
					float bmi = Float.parseFloat(heightAndWeight[1]) / (heightInMeters * heightInMeters);
					ClinicalData data = new ClinicalData();
					data.setComponentName("BMI");
					data.setComponentValue(Float.toString(bmi));
					clinicalData.add(data);
				}
			}
		}

		return clinicalData;
	}

}

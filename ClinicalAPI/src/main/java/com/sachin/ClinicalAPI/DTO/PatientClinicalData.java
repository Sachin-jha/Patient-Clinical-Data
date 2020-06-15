package com.sachin.ClinicalAPI.DTO;

public class PatientClinicalData {

	private String componentName;
	private String componentValue;
	private int patientId;

	@Override
	public String toString() {
		return "PatientClinicalData [componentName=" + componentName + ", componentValue=" + componentValue
				+ ", patientId=" + patientId + "]";
	}

	public String getComponentName() {
		return componentName;
	}

	public void setComponentName(String componentName) {
		this.componentName = componentName;
	}

	public String getComponentValue() {
		return componentValue;
	}

	public void setComponentValue(String componentValue) {
		this.componentValue = componentValue;
	}

	public int getPatientId() {
		return patientId;
	}

	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}

}

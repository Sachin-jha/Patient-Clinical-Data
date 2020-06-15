package com.sachin.ClinicalAPI.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sachin.ClinicalAPI.Model.ClinicalData;

public interface ClinicalDataRepository extends JpaRepository<ClinicalData, Integer> {

	List<ClinicalData> findByPatientIdAndComponentNameOrderByMeasuredDateTime(int patientId, String componentName);

}

package com.sachin.ClinicalAPI.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sachin.ClinicalAPI.Model.Patient;

public interface PatientRepository extends JpaRepository<Patient, Integer> {

}

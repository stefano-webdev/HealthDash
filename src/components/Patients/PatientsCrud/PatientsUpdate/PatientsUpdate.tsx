import { useState, useEffect, useRef } from "react";
import type { PatientsProps } from "../../Patients/Patients.tsx";
import type { hospitalShape } from "../../../Home/PatientsToday.tsx";
import type { Patient, PatientsListType } from "../../PatientsList/PatientsList.tsx";

interface PatientsUpdateProps {
    close: () => void;
    patientsData: PatientsProps;
}

function PatientsUpdate({ close, patientsData }: PatientsUpdateProps) {
    const { setPatientsList, setOriginalPatientsList, setConfirmMessage,
        setInputListValue, selectedId } = patientsData;
    const unknownData: string | null = localStorage.getItem("hospitalData");
    const savedData: hospitalShape = unknownData ? JSON.parse(unknownData) : {};
    const patientLocal: Patient | undefined = savedData.patientsList?.find(patient => patient.id === selectedId);
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const onlyOneScroll = useRef<boolean>(false);
    const [formData, setFormData] = useState({
        name: patientLocal?.name.split(" ")[0],
        surname: patientLocal?.name.split(" ").slice(1).join(" "),
        age: patientLocal?.age,
        code: patientLocal?.code,
        state: patientLocal?.state,
        pastDiseases: patientLocal?.pastDiseases,
        chronicDiseases: patientLocal?.chronicDiseases,
        surgeries: patientLocal?.surgeries,
        hospitalizations: patientLocal?.hospitalizations,
        knownAllergies: patientLocal?.knownAllergies,
        currentMedications: patientLocal?.currentMedications,
        currentSymptoms: patientLocal?.currentSymptoms,
        familyContactsName: patientLocal?.familyContacts.name.split(" ")[0],
        familyContactsSurname: patientLocal?.familyContacts.name.split(" ").slice(1).join(" "),
        familyContactsRelation: patientLocal?.familyContacts.relationship,
        familyContactsPhone: patientLocal?.familyContacts.phone,
        prescriptionsMedication: patientLocal?.prescriptions.medication,
        prescriptionsFrequency: patientLocal?.prescriptions.frequency
    });

    useEffect(() => {
        setFormData({
            name: patientLocal?.name.split(" ")[0],
            surname: patientLocal?.name.split(" ").slice(1).join(" "),
            age: patientLocal?.age,
            code: patientLocal?.code,
            state: patientLocal?.state,
            pastDiseases: patientLocal?.pastDiseases,
            chronicDiseases: patientLocal?.chronicDiseases,
            surgeries: patientLocal?.surgeries,
            hospitalizations: patientLocal?.hospitalizations,
            knownAllergies: patientLocal?.knownAllergies,
            currentMedications: patientLocal?.currentMedications,
            currentSymptoms: patientLocal?.currentSymptoms,
            familyContactsName: patientLocal?.familyContacts.name.split(" ")[0],
            familyContactsSurname: patientLocal?.familyContacts.name.split(" ").slice(1).join(" "),
            familyContactsRelation: patientLocal?.familyContacts.relationship,
            familyContactsPhone: patientLocal?.familyContacts.phone,
            prescriptionsMedication: patientLocal?.prescriptions.medication,
            prescriptionsFrequency: patientLocal?.prescriptions.frequency
        });
        if (!onlyOneScroll.current &&
            scrollRef?.current &&
            window.innerWidth >= 1200 &&
            window.matchMedia("(pointer: fine)").matches) {
            window.scrollTo({
                top: scrollRef.current.offsetTop - 30,
                behavior: 'smooth',
            });
            onlyOneScroll.current = true;
        }
    }, [selectedId]);


    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value, maxLength } = e.target;
        if (value.length <= maxLength) {
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    }

    // Update the selected patient
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const updatedPatient = {
            id: selectedId,
            name: `${formData.name} ${formData.surname}`,
            age: Number(formData.age),
            code: formData.code,
            state: formData.state,
            pastDiseases: formData.pastDiseases || "Nessuna",
            chronicDiseases: formData.chronicDiseases || "Nessuna",
            surgeries: formData.surgeries || "Nessuno",
            hospitalizations: formData.hospitalizations || "Nessuno",
            knownAllergies: formData.knownAllergies || "Nessuna",
            currentMedications: formData.currentMedications || "Nessuno",
            currentSymptoms: formData.currentSymptoms || "Nessuno",
            familyContacts: {
                name: `${formData.familyContactsName} ${formData.familyContactsSurname}`,
                relationship: formData.familyContactsRelation,
                phone: formData.familyContactsPhone
            },
            prescriptions: {
                medication: formData.prescriptionsMedication || "Nessuno",
                frequency: formData.prescriptionsFrequency || "Nessuna"
            }
        };

        const updatedPatientsList: PatientsListType = savedData.patientsList?.map(patient => {
            if (patient.id === selectedId) {
                return updatedPatient;
            }
            return patient;
        }) as PatientsListType;

        const newData = {
            ...savedData,
            patientsList: updatedPatientsList
        };

        localStorage.setItem("hospitalData", JSON.stringify(newData));
        setPatientsList(updatedPatientsList);
        setInputListValue('');
        setOriginalPatientsList(updatedPatientsList);
        close();
        setConfirmMessage({ message: "Paziente modificato con successo!", type: "success" });
        setTimeout(() => {
            setConfirmMessage(null);
        }, 3500);
    }

    return (
        <div id="updatePatientCont" className="boxStyle" ref={scrollRef}>
            <div className='titleBox'>
                <div className="titleSVG">
                    <svg className='box' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                        <path d="M100.4 417.2C104.5 402.6 112.2 389.3 123 378.5L304.2 
                        197.3L338.1 163.4C354.7 180 389.4 214.7 442.1 267.4L476 
                        301.3L442.1 335.2L260.9 516.4C250.2 527.1 236.8 534.9 222.2 
                        539L94.4 574.6C86.1 576.9 77.1 574.6 71 568.4C64.9 562.2 62.6 
                        553.3 64.9 545L100.4 417.2zM156 413.5C151.6 418.2 148.4 423.9 
                        146.7 430.1L122.6 517L209.5 492.9C215.9 491.1 221.7 487.8 226.5 
                        483.2L155.9 413.5zM510 267.4C493.4 250.8 458.7 216.1 406 
                        163.4L372 129.5C398.5 103 413.4 88.1 416.9 84.6C430.4 71 448.8 
                        63.4 468 63.4C487.2 63.4 505.6 71 519.1 84.6L554.8 120.3C568.4 
                        133.9 576 152.3 576 171.4C576 190.5 568.4 209 554.8 222.5C551.3 
                        226 536.4 240.9 509.9 267.4z" />
                    </svg>
                    <h3 className='box'>Modifica paziente</h3>
                </div>
                <small className='warning'>I campi contrassegnati con * sono obbligatori</small>
            </div>
            <div className="contentBox">
                <p id='updatedPatient'>Stai modificando i dati di <strong><em className='updatedInline'>{patientLocal?.name}</em></strong></p>
                <form onSubmit={handleSubmit}>
                    {/* General informations */}
                    <div className="formGroup">
                        <label htmlFor="nameUpdate">Nome*</label>
                        <input onChange={handleInputChange} value={formData.name} type="text" autoComplete='off' spellCheck='false' id="nameUpdate" name="name" required maxLength={14} />
                    </div>

                    <div className="formGroup">
                        <label htmlFor="surnameUpdate">Cognome*</label>
                        <input onChange={handleInputChange} value={formData.surname} type="text" autoComplete='off' spellCheck='false' id="surnameUpdate" name="surname" required maxLength={14} />
                    </div>

                    <div className="formGroup">
                        <label htmlFor="ageUpdate">Età*</label>
                        <input onChange={handleInputChange} value={formData.age} type="text" autoComplete='off' spellCheck='false' id="ageUpdate" name="age" required maxLength={3} />
                    </div>

                    <div className="formGroup">
                        <label htmlFor="codeUpdate">Codice paziente*</label>
                        <input onChange={handleInputChange} value={formData.code} type="text" autoComplete='off' spellCheck='false' id="codeUpdate" name="code" required maxLength={8} />
                    </div>

                    <div className="formGroup">
                        <label htmlFor="stateUpdate">Stato (ricoverato o dimesso)*</label>
                        <input onChange={handleInputChange} value={formData.state} type="text" autoComplete='off' spellCheck='false' id="stateUpdate" name="state" required maxLength={15} />
                    </div>

                    {/* Medical history */}
                    <div>
                        <h4 className='sectionTitle'>Anamnesi e prescrizioni</h4>
                        <div className='patientHistoryForm'>
                            <div className="formGroup">
                                <label htmlFor="pastDiseaseUpdate">Malattie pregresse</label>
                                <input onChange={handleInputChange} value={formData.pastDiseases} type="text" autoComplete='off' spellCheck='false' id="pastDiseaseUpdate" name="pastDiseases" maxLength={150} />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="chronicDiseasesUpdate">Malattie croniche</label>
                                <input onChange={handleInputChange} value={formData.chronicDiseases} type="text" autoComplete='off' spellCheck='false' id="chronicDiseasesUpdate" name="chronicDiseases" maxLength={150} />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="surgeriesUpdate">Interventi chirurgici</label>
                                <input onChange={handleInputChange} value={formData.surgeries} type="text" autoComplete='off' spellCheck='false' id="surgeriesUpdate" name="surgeries" maxLength={150} />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="hospitalizationsUpdate">Ricoveri</label>
                                <input onChange={handleInputChange} value={formData.hospitalizations} type="text" autoComplete='off' spellCheck='false' id="hospitalizationsUpdate" name="hospitalizations" maxLength={150} />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="knownAllergiesUpdate">Allergie</label>
                                <input onChange={handleInputChange} value={formData.knownAllergies} type="text" autoComplete='off' spellCheck='false' id="knownAllergiesUpdate" name="knownAllergies" maxLength={150} />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="currentMedicationsUpdate">Farmaci in corso</label>
                                <input onChange={handleInputChange} value={formData.currentMedications} type="text" autoComplete='off' spellCheck='false' id="currentMedicationsUpdate" name="currentMedications" maxLength={150} />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="currentSymptomsUpdate">Sintomi attuali</label>
                                <input onChange={handleInputChange} value={formData.currentSymptoms} type="text" autoComplete='off' spellCheck='false' id="currentSymptomsUpdate" name="currentSymptoms" maxLength={150} />
                            </div>
                        </div>
                    </div>

                    {/* Prescriptions */}
                    <div>
                        <h4 className='sectionTitle'>Prescrizioni</h4>
                        <div className='patientPrescriptionsForm'>
                            <div className="formGroup">
                                <label htmlFor="medicationUpdate">Medicinale</label>
                                <input onChange={handleInputChange} value={formData.prescriptionsMedication} type="text" autoComplete='off' spellCheck='false' id="medicationUpdate" name="prescriptionsMedication" maxLength={150} />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="frequencyUpdate">Frequenza</label>
                                <input onChange={handleInputChange} value={formData.prescriptionsFrequency} type="text" autoComplete='off' spellCheck='false' id="frequencyUpdate" name="prescriptionsFrequency" maxLength={150} />
                            </div>
                        </div>
                    </div>

                    {/* Family contacts */}
                    <div>
                        <h4 className='sectionTitle'>Contatti familiari</h4>
                        <div className='patientFamilyContactsForm'>
                            <div className="formGroup">
                                <label htmlFor="familyNameUpdate">Nome*</label>
                                <input onChange={handleInputChange} value={formData.familyContactsName} type="text" autoComplete='off' spellCheck='false' id="familyNameUpdate" name="familyContactsName" required maxLength={150} />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="familySurnameUpdate">Cognome*</label>
                                <input onChange={handleInputChange} value={formData.familyContactsSurname} type="text" autoComplete='off' spellCheck='false' id="familySurnameUpdate" name="familyContactsSurname" required maxLength={150} />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="familyRelationUpdate">Relazione*</label>
                                <input onChange={handleInputChange} value={formData.familyContactsRelation} type="text" autoComplete='off' spellCheck='false' id="familyRelationUpdate" name="familyContactsRelation" required maxLength={150} />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="familyPhoneUpdate">Telefono*</label>
                                <input onChange={handleInputChange} value={formData.familyContactsPhone} type="text" autoComplete='off' spellCheck='false' id="familyPhoneUpdate" name="familyContactsPhone" required maxLength={30} />
                            </div>
                        </div>
                    </div>

                    <div className='formActions'>
                        <button type="button" onClick={close}>Annulla</button>
                        <button type="submit">Aggiungi</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PatientsUpdate;
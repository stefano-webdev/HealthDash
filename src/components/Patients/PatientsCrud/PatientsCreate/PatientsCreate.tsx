import { useState, useEffect, useRef } from 'react';
import PatientJSON from '../../Patients/Patients.json';
import type { PatientsProps } from "../../Patients/Patients.tsx";
import type { hospitalShape } from "../../../Home/PatientsToday.tsx";
import type { Patient, PatientsListType } from '../../PatientsList/PatientsList.tsx';

interface PatientsCreateProps {
    close: () => void;
    patientsData: PatientsProps;
}

function PatientsCreate({ close, patientsData }: PatientsCreateProps) {
    const { setPatientsList, setOriginalPatientsList, setSelectedId,
        setInputListValue, setConfirmMessage } = patientsData;
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        age: '',
        code: '',
        state: '',
        pastDiseases: '',
        chronicDiseases: '',
        surgeries: '',
        hospitalizations: '',
        knownAllergies: '',
        currentMedications: '',
        currentSymptoms: '',
        familyContactsName: '',
        familyContactsSurname: '',
        familyContactsRelation: '',
        familyContactsPhone: '',
        prescriptionsMedication: '',
        prescriptionsFrequency: ''
    });

    useEffect(() => {
        if (scrollRef?.current && window.innerWidth >= 1200 && window.matchMedia("(pointer: fine)").matches) {
            window.scrollTo({
                top: scrollRef.current.offsetTop - 30,
                behavior: 'smooth',
            });
        }
    }, []);

    // Handle input change
    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value, maxLength } = e.target;
        if (value.length <= maxLength) {
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    }

    // Handle submit
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const unknownData: string | null = localStorage.getItem("hospitalData");
        const savedData: hospitalShape = unknownData ? JSON.parse(unknownData) : {};
        const patientsLocalStorage: PatientsListType | undefined = savedData.patientsList;

        const maxIdLocalStorage: number = Math.max(
            ...patientsLocalStorage?.map((p: Patient) => p.id) || []
        );

        const maxIdJSON: number = Math.max(
            ...PatientJSON.map((p: Patient) => p.id) || []
        );

        const maxId: number = Math.max(maxIdLocalStorage, maxIdJSON);

        const newPatient: Patient = {
            id: maxId + 1,
            name: `${formData.name} ${formData.surname}`,
            age: Number(formData.age),
            code: formData.code,
            state: formData.state,
            pastDiseases: formData.pastDiseases ? formData.pastDiseases : 'Nessuna',
            chronicDiseases: formData.chronicDiseases ? formData.chronicDiseases : 'Nessuna',
            surgeries: formData.surgeries ? formData.surgeries : 'Nessuno',
            hospitalizations: formData.hospitalizations ? formData.hospitalizations : 'Nessuno',
            knownAllergies: formData.knownAllergies ? formData.knownAllergies : 'Nessuna',
            currentMedications: formData.currentMedications ? formData.currentMedications : 'Nessuno',
            currentSymptoms: formData.currentSymptoms ? formData.currentSymptoms : 'Nessuno',
            familyContacts: {
                name: `${formData.familyContactsName} ${formData.familyContactsSurname}`,
                relationship: formData.familyContactsRelation,
                phone: formData.familyContactsPhone
            },
            prescriptions: {
                medication: formData.prescriptionsMedication ? formData.prescriptionsMedication : 'Nessuno',
                frequency: formData.prescriptionsFrequency ? formData.prescriptionsFrequency : 'Nessuna'
            }
        };

        // Save the new patient data
        const updatedPatientsData = patientsLocalStorage ? [newPatient, ...patientsLocalStorage] : [newPatient];
        localStorage.setItem("hospitalData", JSON.stringify({...savedData, patientsList: updatedPatientsData }));
        setPatientsList(updatedPatientsData);
        setInputListValue('');
        setSelectedId(newPatient.id);
        setOriginalPatientsList(updatedPatientsData);
        close();
        setConfirmMessage({ message: "Paziente aggiunto con successo", type: "success" });
        setTimeout(() => {
            setConfirmMessage(null);
        }, 3500);
    }

    return (
        <div id='createPatientCont' className='boxStyle' ref={scrollRef}>
            <div className='titleBox'>
                <svg className='box' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                    <path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 
                            110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 
                            337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 
                            544 320 544C337.7 544 352 529.7 352 512L352 352L512 
                            352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 
                            288L352 288L352 128z" />
                </svg>
                <h3 className='box'>Aggiungi paziente</h3>
            </div>
            <small className='warning'>I campi contrassegnati con * sono obbligatori</small>
            <form onSubmit={handleSubmit}>
                {/* General informations */}
                <div className="formGroup">
                    <label htmlFor="nameCreate">Nome*</label>
                    <input onChange={handleInputChange} value={formData.name} type="text" autoComplete='off' spellCheck='false' id="nameCreate" name="name" required maxLength={14} />
                </div>

                <div className="formGroup">
                    <label htmlFor="surnameCreate">Cognome*</label>
                    <input onChange={handleInputChange} value={formData.surname} type="text" autoComplete='off' spellCheck='false' id="surnameCreate" name="surname" required maxLength={14} />
                </div>

                <div className="formGroup">
                    <label htmlFor="ageCreate">Età*</label>
                    <input onChange={handleInputChange} value={formData.age} type="text" autoComplete='off' spellCheck='false' id="ageCreate" name="age" required maxLength={3} />
                </div>

                <div className="formGroup">
                    <label htmlFor="codeCreate">Codice paziente*</label>
                    <input onChange={handleInputChange} value={formData.code} type="text" autoComplete='off' spellCheck='false' id="codeCreate" name="code" required maxLength={8} />
                </div>

                <div className="formGroup">
                    <label htmlFor="stateCreate">Stato (ricoverato o dimesso)*</label>
                    <input onChange={handleInputChange} value={formData.state} type="text" autoComplete='off' spellCheck='false' id="stateCreate" name="state" required maxLength={15} />
                </div>

                {/* Medical history */}
                <div>
                    <h4 className='sectionTitle'>Anamnesi e prescrizioni</h4>
                    <div className='patientHistoryForm'>
                        <div className="formGroup">
                            <label htmlFor="pastDiseaseCreate">Malattie pregresse</label>
                            <input onChange={handleInputChange} value={formData.pastDiseases} type="text" autoComplete='off' spellCheck='false' id="pastDiseaseCreate" name="pastDiseases" maxLength={150} />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="chronicDiseasesCreate">Malattie croniche</label>
                            <input onChange={handleInputChange} value={formData.chronicDiseases} type="text" autoComplete='off' spellCheck='false' id="chronicDiseasesCreate" name="chronicDiseases" maxLength={150} />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="surgeriesCreate">Interventi chirurgici</label>
                            <input onChange={handleInputChange} value={formData.surgeries} type="text" autoComplete='off' spellCheck='false' id="surgeriesCreate" name="surgeries" maxLength={150} />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="hospitalizationsCreate">Ricoveri</label>
                            <input onChange={handleInputChange} value={formData.hospitalizations} type="text" autoComplete='off' spellCheck='false' id="hospitalizationsCreate" name="hospitalizations" maxLength={150} />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="knownAllergiesCreate">Allergie</label>
                            <input onChange={handleInputChange} value={formData.knownAllergies} type="text" autoComplete='off' spellCheck='false' id="knownAllergiesCreate" name="knownAllergies" maxLength={150} />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="currentMedicationsCreate">Farmaci in corso</label>
                            <input onChange={handleInputChange} value={formData.currentMedications} type="text" autoComplete='off' spellCheck='false' id="currentMedicationsCreate" name="currentMedications" maxLength={150} />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="currentSymptomsCreate">Sintomi attuali</label>
                            <input onChange={handleInputChange} value={formData.currentSymptoms} type="text" autoComplete='off' spellCheck='false' id="currentSymptomsCreate" name="currentSymptoms" maxLength={150} />
                        </div>
                    </div>
                </div>

                {/* Prescriptions */}
                <div>
                    <h4 className='sectionTitle'>Prescrizioni</h4>
                    <div className='patientPrescriptionsForm'>
                        <div className="formGroup">
                            <label htmlFor="medicationCreate">Medicinale</label>
                            <input onChange={handleInputChange} value={formData.prescriptionsMedication} type="text" autoComplete='off' spellCheck='false' id="medicationCreate" name="prescriptionsMedication" maxLength={150} />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="frequencyCreate">Frequenza</label>
                            <input onChange={handleInputChange} value={formData.prescriptionsFrequency} type="text" autoComplete='off' spellCheck='false' id="frequencyCreate" name="prescriptionsFrequency" maxLength={150} />
                        </div>
                    </div>
                </div>

                {/* Family contacts */}
                <div>
                    <h4 className='sectionTitle'>Contatti familiari</h4>
                    <div className='patientFamilyContactsForm'>
                        <div className="formGroup">
                            <label htmlFor="familyNameCreate">Nome*</label>
                            <input onChange={handleInputChange} value={formData.familyContactsName} type="text" autoComplete='off' spellCheck='false' id="familyNameCreate" name="familyContactsName" required maxLength={150} />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="familySurnameCreate">Cognome*</label>
                            <input onChange={handleInputChange} value={formData.familyContactsSurname} type="text" autoComplete='off' spellCheck='false' id="familySurnameCreate" name="familyContactsSurname" required maxLength={150} />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="familyRelationCreate">Relazione*</label>
                            <input onChange={handleInputChange} value={formData.familyContactsRelation} type="text" autoComplete='off' spellCheck='false' id="familyRelationCreate" name="familyContactsRelation" required maxLength={150} />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="familyPhoneCreate">Telefono*</label>
                            <input onChange={handleInputChange} value={formData.familyContactsPhone} type="text" autoComplete='off' spellCheck='false' id="familyPhoneCreate" name="familyContactsPhone" required maxLength={30} />
                        </div>
                    </div>
                </div>

                <div className='formActions'>
                    <button type="button" onClick={close}>Annulla</button>
                    <button type="submit">Aggiungi</button>
                </div>
            </form>
        </div>
    );
}

export default PatientsCreate;
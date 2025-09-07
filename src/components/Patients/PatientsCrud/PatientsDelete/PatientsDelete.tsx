import { useEffect, useRef } from "react";
import type { PatientsProps } from "../../Patients/Patients.tsx";
import type { hospitalShape } from "../../../Home/PatientsToday.tsx";
import type { Patient } from "../../PatientsList/PatientsList.tsx";
import type { PatientsListType } from "../../PatientsList/PatientsList.tsx";

interface PatientsDeleteProps {
    close: () => void;
    patientsData: PatientsProps;
}

function PatientsDelete({ close, patientsData }: PatientsDeleteProps) {
    const { setPatientsList, setOriginalPatientsList, setSelectedId,
        setConfirmMessage, setInputListValue, selectedId } = patientsData;
    const unknownData: string | null = localStorage.getItem("hospitalData");
    const savedData: hospitalShape = unknownData ? JSON.parse(unknownData) : {};
    const patientLocal: Patient | undefined = savedData.patientsList?.find(patient => patient.id === selectedId);
    const scrollRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (scrollRef?.current && window.innerWidth >= 1200 && window.matchMedia("(pointer: fine)").matches) {
            window.scrollTo({
                top: scrollRef.current.offsetTop - 30,
                behavior: 'smooth',
            });
        }
    }, []);

    // Delete the selected patient
    function handleDelete() {
        const updatedPatientsList: PatientsListType = savedData.patientsList?.filter(p => p.id !== selectedId) as PatientsListType;

        const newData = {
            ...savedData,
            patientsList: updatedPatientsList
        };
        localStorage.setItem("hospitalData", JSON.stringify(newData));
        setPatientsList(updatedPatientsList);
        setInputListValue('');
        setOriginalPatientsList(updatedPatientsList);
        setSelectedId(updatedPatientsList[0].id);
        close();
        setConfirmMessage({ message: "Paziente eliminato con successo", type: "error" });
        setTimeout(() => {
            setConfirmMessage(null);
        }, 3500);
    }

    return (
        <div id="deletePatientCont" className="boxStyle" ref={scrollRef}>
            <div className='titleBox'>
                <svg className='box' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                    <path d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 
                                128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 
                                544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 
                                56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 
                                69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 
                                576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z" />
                </svg>
                <h3 className='box'>Elimina paziente</h3>
            </div>
            <p id='deletedPatient'>Stai eliminando i dati di <em style={{ color: 'var(--mainRed' }}>{patientLocal?.name}</em></p>
            <div className='deleteActions'>
                <button type="button" onClick={close}>Annulla</button>
                <button type="button" onClick={handleDelete}>Elimina</button>
            </div>
        </div>
    );
}

export default PatientsDelete;
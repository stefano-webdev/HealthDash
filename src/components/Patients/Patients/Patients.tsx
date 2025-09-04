import { useEffect, useState } from "react";
import type { PatientsListType } from "../PatientsList/PatientsList.tsx";
import PatientsList from "../PatientsList/PatientsList.tsx";
import PatientDetails from "../PatientDetails/PatientDetails.tsx";
import FamilyContacts from "../FamilyContacts/FamilyContacts.tsx";

type PatientsProps = {
    patientsList: PatientsListType | null;
    originalPatientsList: PatientsListType;
    selectedId: number | null;
    inputListValue: string;
    setPatientsList: React.Dispatch<React.SetStateAction<PatientsListType | null>>;
    setOriginalPatientsList: React.Dispatch<React.SetStateAction<PatientsListType>>;
    setInputListValue: React.Dispatch<React.SetStateAction<string>>;
    setSelectedId: React.Dispatch<React.SetStateAction<number | null>>;
}

function Patients() {
    const [patientsList, setPatientsList] = useState<PatientsListType | null>(null);
    const [originalPatientsList, setOriginalPatientsList] = useState<PatientsListType>([]);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [inputListValue, setInputListValue] = useState<string>('');

    const patientsData: PatientsProps = {
        patientsList,
        originalPatientsList,
        selectedId,
        inputListValue,
        setPatientsList,
        setOriginalPatientsList,
        setInputListValue,
        setSelectedId
    }

    // Scroll to top on component mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <div className="currentRoute">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                    <path d="M64 96C81.7 96 96 110.3 96 128L96 352L320 352L320 224C320 206.3 334.3 
                                192 352 192L512 192C565 192 608 235 608 288L608 512C608 529.7 593.7 544 576 
                                544C558.3 544 544 529.7 544 512L544 448L96 448L96 512C96 529.7 81.7 544 64 
                                544C46.3 544 32 529.7 32 512L32 128C32 110.3 46.3 96 64 96zM144 256C144 220.7 
                                172.7 192 208 192C243.3 192 272 220.7 272 256C272 291.3 243.3 320 208 320C172.7 
                                320 144 291.3 144 256z"/>
                </svg>
                <h2>PAZIENTI</h2>
            </div>
            <div className="routeCont">
                <div className='flexGroup'>
                    <PatientsList {...patientsData} />
                    <PatientDetails selectedId={selectedId} />
                </div>

                <div className='flexGroup'>
                    <FamilyContacts selectedId={selectedId} />
                </div>
            </div>
        </>
    );
}

export default Patients;
export type { PatientsProps };
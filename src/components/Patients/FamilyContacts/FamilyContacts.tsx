import type { hospitalShape } from "../../Home/PatientsToday.tsx";
import type { Patient } from "../PatientsList/PatientsList.tsx";
import "./FamilyContacts.css";

function FamilyContacts({ selectedId }: { selectedId: number | null }) {
    const unknownData: string | null = localStorage.getItem("hospitalData");
    const savedData: hospitalShape = unknownData ? JSON.parse(unknownData) : {};
    const patient: Patient | undefined = savedData.patientsList?.find(p => p.id === selectedId);

    return (
        <div id="familyContactsCont" className="boxStyle">
            <div className='titleBox'>
                <svg className="box" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                    <path d="M224.2 89C216.3 70.1 195.7 60.1 176.1 65.4L170.6 66.9C106 84.5 50.8 
                        147.1 66.9 223.3C104 398.3 241.7 536 416.7 573.1C493 589.3 555.5 534 573.1 
                        469.4L574.6 463.9C580 444.2 569.9 423.6 551.1 415.8L453.8 375.3C437.3 368.4 
                        418.2 373.2 406.8 387.1L368.2 434.3C297.9 399.4 241.3 341 208.8 269.3L253 
                        233.3C266.9 222 271.6 202.9 264.8 186.3L224.2 89z" />
                </svg>
                <h3 className='box'>Contatti familiari</h3>
            </div>
            
            <div id="familyDetailsCont">
                <p><strong>Nome:</strong> <em>{patient?.familyContacts.name}</em></p>
                <p><strong>Relazione:</strong> <em>{patient?.familyContacts.relationship}</em></p>
                <p><strong>Telefono:</strong> <em>{patient?.familyContacts.phone}</em></p>
            </div>
        </div>
    );
}

export default FamilyContacts;
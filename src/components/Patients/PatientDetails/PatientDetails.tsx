import type { hospitalShape } from "../../Home/PatientsToday.tsx";
import type { Patient } from "../PatientsList/PatientsList";
import "./PatientDetails.css";

function PatientDetails({ selectedId }: { selectedId: number | null }) {
    const unknownData: string | null = localStorage.getItem("hospitalData");
    const savedData: hospitalShape = unknownData ? JSON.parse(unknownData) : {};
    const patient: Patient | undefined = savedData.patientsList?.find(p => p.id === selectedId);

    return (
        <div id="patientDetailsCont" className="boxStyle">
            <div className='titleBox'>
                <svg className='box' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                    <path d="M96 96C60.7 96 32 124.7 32 160L32 480C32 515.3 
                        60.7 544 96 544L544 544C579.3 544 608 515.3 608 480L608 
                        160C608 124.7 579.3 96 544 96L96 96zM176 352L240 352C284.2 
                        352 320 387.8 320 432C320 440.8 312.8 448 304 448L112 
                        448C103.2 448 96 440.8 96 432C96 387.8 131.8 352 176 
                        352zM152 256C152 225.1 177.1 200 208 200C238.9 200 264 
                        225.1 264 256C264 286.9 238.9 312 208 312C177.1 312 152 
                        286.9 152 256zM392 208L504 208C517.3 208 528 218.7 528 
                        232C528 245.3 517.3 256 504 256L392 256C378.7 256 368 245.3 
                        368 232C368 218.7 378.7 208 392 208zM392 304L504 304C517.3 
                        304 528 314.7 528 328C528 341.3 517.3 352 504 352L392 
                        352C378.7 352 368 341.3 368 328C368 314.7 378.7 304 392 
                        304z" />
                </svg>
                <h3 className='box'>Dettagli paziente</h3>
            </div>
            <div id="patientNameAgeCont">
                <p id="patientName">{patient?.name}</p>
                <small id="patientAge">{patient?.age} anni</small>
            </div>

            <div id="anamnesiCont">
                <h4>Anamnesi</h4>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                    <path d="M64 112C64 85.5 85.5 64 112 64L160 64C177.7 64 192 78.3 192 96C192 
                    113.7 177.7 128 160 128L128 128L128 256C128 309 171 352 224 352C277 352 320 
                    309 320 256L320 128L288 128C270.3 128 256 113.7 256 96C256 78.3 270.3 64 288 
                    64L336 64C362.5 64 384 85.5 384 112L384 256C384 333.4 329 398 256 412.8L256 
                    432C256 493.9 306.1 544 368 544C429.9 544 480 493.9 480 432L480 346.5C442.7 
                    333.3 416 297.8 416 256C416 203 459 160 512 160C565 160 608 203 608 256C608 
                    297.8 581.3 333.4 544 346.5L544 432C544 529.2 465.2 608 368 608C270.8 608 192 
                    529.2 192 432L192 412.8C119 398 64 333.4 64 256L64 112zM512 288C529.7 288 544 
                    273.7 544 256C544 238.3 529.7 224 512 224C494.3 224 480 238.3 480 256C480 273.7 
                    494.3 288 512 288z" />
                </svg>
            </div>

            <div id="anamnesiInfoCont">
                <p><strong>Malattie pregresse:</strong> <em>{patient?.pastDiseases}</em></p>
                <p className="anamnesiInfo"><strong>Malattie croniche:</strong> <em>{patient?.chronicDiseases}</em></p>
                <p className="anamnesiInfo"><strong>Interventi chirurgici:</strong> <em>{patient?.surgeries}</em></p>
                <p className="anamnesiInfo"><strong>Ricoveri:</strong> <em>{patient?.hospitalizations}</em></p>
                <p className="anamnesiInfo"><strong>Allergie:</strong> <em>{patient?.knownAllergies}</em></p>
                <p className="anamnesiInfo"><strong>Farmaci in corso:</strong> <em>{patient?.currentMedications}</em></p>
                <p className="anamnesiInfo"><strong>Sintomi attuali:</strong> <em>{patient?.currentSymptoms}</em></p>
            </div>
        </div>
    );
}

export default PatientDetails;
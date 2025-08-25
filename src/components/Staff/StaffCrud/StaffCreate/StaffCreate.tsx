import { useState } from 'react';
import './StaffCreate.css';
import staffDataJSON from '../../Staff/Staff.json';
import type { StaffMember } from '../../StaffList/StaffList.tsx';
import type { hospitalShape } from '../../../Home/PatientsToday.tsx';
import type { StaffListType } from '../../StaffList/StaffList.tsx';
import type { AllStaffList } from "../../StaffList/StaffList.tsx";

interface StaffCreateProps {
    close: () => void;
    props: {
        changeStaffList: React.Dispatch<React.SetStateAction<StaffListType>>;
        changeId: React.Dispatch<React.SetStateAction<number | null>>;
        changeOriginalList: React.Dispatch<React.SetStateAction<StaffListType>>;
    };
}

function StaffCreate({ close, props }: StaffCreateProps) {
    const { changeStaffList, changeId, changeOriginalList } = props;
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        shortRole: '',
        longRole: '',
        ward: '',
        mondayShift: '',
        tuesdayShift: '',
        wednesdayShift: '',
        thursdayShift: '',
        fridayShift: '',
        saturdayShift: '',
        sundayShift: '',
        phone: '',
        email: ''
    });

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value, maxLength } = e.target;

        if (value.length <= maxLength) {
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    }

    // Add new employee to localStorage
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const unknownData: string | null = localStorage.getItem("hospitalData");
        const savedData: hospitalShape = unknownData ? JSON.parse(unknownData) : {};
        const staffData: StaffListType | undefined = savedData.staffList;

        const maxIdLocalStorage: number = Math.max(
            ...staffData?.flatMap(w => [w.id, ...w.staff.map(s => s.id)]) || []
        );

        const maxIdJSON: number = Math.max(
            ...staffDataJSON.flatMap(w => [w.id, ...w.staff.map(s => s.id)]) || []
        );

        const maxId: number = Math.max(maxIdLocalStorage, maxIdJSON);

        const newEmployee: StaffMember = {
            id: maxId + 1,
            employee: `${formData.name} ${formData.surname}`,
            shortRole: formData.shortRole,
            longRole: formData.longRole,
            ward: formData.ward,
            schedule: {
                mon: formData.mondayShift,
                tue: formData.tuesdayShift,
                wed: formData.wednesdayShift,
                thu: formData.thursdayShift,
                fri: formData.fridayShift,
                sat: formData.saturdayShift,
                sun: formData.sundayShift
            },
            number: formData.phone,
            mail: formData.email
        };

        const newStructure: AllStaffList = {
            id: maxId + 2,
            name: formData.ward,
            staff: [newEmployee]
        }

        // Save the new employee data
        const updatedStaffData = staffData ? [newStructure, ...staffData] : [newStructure];
        localStorage.setItem("hospitalData", JSON.stringify({ ...savedData, staffList: updatedStaffData }));
        changeStaffList(updatedStaffData);
        changeId(newEmployee.id);
        changeOriginalList(updatedStaffData);
        close();
    }

    return (
        <div id="createEmployeeCont" className='boxStyle'>
            <div className='titleBox'>
                <svg className='box' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                    <path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 
                            110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 
                            337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 
                            544 320 544C337.7 544 352 529.7 352 512L352 352L512 
                            352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 
                            288L352 288L352 128z" />
                </svg>
                <h3 className='box'>Aggiungi dipendente</h3>
            </div>
            <form onSubmit={handleSubmit}>
                {/* General informations */}
                <div className="formGroup">
                    <label htmlFor="name">Nome</label>
                    <input onChange={handleInputChange} value={formData.name} type="text" autoComplete='off' spellCheck='false' id="name" name="name" required maxLength={14} />
                </div>

                <div className="formGroup">
                    <label htmlFor="surname">Cognome</label>
                    <input onChange={handleInputChange} value={formData.surname} type="text" autoComplete='off' spellCheck='false' id="surname" name="surname" required maxLength={14} />
                </div>

                <div className="formGroup">
                    <label htmlFor="shortRole">Ruolo breve</label>
                    <input onChange={handleInputChange} value={formData.shortRole} type="text" autoComplete='off' spellCheck='false' id="shortRole" name="shortRole" required maxLength={15} />
                </div>

                <div className="formGroup">
                    <label htmlFor="longRole">Descrizione ruolo</label>
                    <input onChange={handleInputChange} value={formData.longRole} type="text" autoComplete='off' spellCheck='false' id="longRole" name="longRole" required maxLength={100} />
                </div>

                <div className="formGroup">
                    <label htmlFor="ward">Reparto</label>
                    <input onChange={handleInputChange} value={formData.ward} type="text" autoComplete='off' spellCheck='false' id="ward" name="ward" required maxLength={21} />
                </div>

                {/* Shifts */}
                <div>
                    <h4 id='employeeShiftsTitle'>Turni</h4>
                    <div id='employeeShiftsForm'>
                        <div className="formGroup">
                            <label htmlFor="mondayShift">Lunedì</label>
                            <input onChange={handleInputChange} value={formData.mondayShift} type="text" autoComplete='off' spellCheck='false' id="mondayShift" name="mondayShift" required maxLength={12} />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="tuesdayShift">Martedì</label>
                            <input onChange={handleInputChange} value={formData.tuesdayShift} type="text" autoComplete='off' spellCheck='false' id="tuesdayShift" name="tuesdayShift" required maxLength={12} />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="wednesdayShift">Mercoledì</label>
                            <input onChange={handleInputChange} value={formData.wednesdayShift} type="text" autoComplete='off' spellCheck='false' id="wednesdayShift" name="wednesdayShift" required maxLength={12} />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="thursdayShift">Giovedì</label>
                            <input onChange={handleInputChange} value={formData.thursdayShift} type="text" autoComplete='off' spellCheck='false' id="thursdayShift" name="thursdayShift" required maxLength={12} />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="fridayShift">Venerdì</label>
                            <input onChange={handleInputChange} value={formData.fridayShift} type="text" autoComplete='off' spellCheck='false' id="fridayShift" name="fridayShift" required maxLength={12} />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="saturdayShift">Sabato</label>
                            <input onChange={handleInputChange} value={formData.saturdayShift} type="text" autoComplete='off' spellCheck='false' id="saturdayShift" name="saturdayShift" required maxLength={12} />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="sundayShift">Domenica</label>
                            <input onChange={handleInputChange} value={formData.sundayShift} type="text" autoComplete='off' spellCheck='false' id="sundayShift" name="sundayShift" required maxLength={12} />
                        </div>
                    </div>
                </div>

                {/* Contacts */}
                <div>
                    <h4 id='employeeContactsTitle'>Contatti</h4>
                    <div id='employeeContactsForm'>
                        <div className="formGroup">
                            <label htmlFor="phone">Telefono</label>
                            <input onChange={handleInputChange} value={formData.phone} type="tel" autoComplete='off' spellCheck='false' id="phone" name="phone" required maxLength={16} />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="email">Email</label>
                            <input onChange={handleInputChange} value={formData.email} type="email" autoComplete='off' spellCheck='false' id="email" name="email" required maxLength={100} />
                        </div>
                    </div>
                </div>

                <div id='createEmployeeActions'>
                    <button type="submit">Aggiungi</button>
                    <button type="button" onClick={close}>Annulla</button>
                </div>
            </form>
        </div>
    );
}

export default StaffCreate;
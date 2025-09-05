import { useState, useEffect, useRef } from 'react';
import './StaffCreate.css';
import staffDataJSON from '../../Staff/Staff.json';
import type { StaffProps } from '../../Staff/Staff.tsx';
import type { StaffMember } from '../../StaffList/StaffList.tsx';
import type { hospitalShape } from '../../../Home/PatientsToday.tsx';
import type { StaffListType } from '../../StaffList/StaffList.tsx';
import type { AllStaffList } from "../../StaffList/StaffList.tsx";

interface StaffCreateProps {
    close: () => void;
    staffData: StaffProps;
}

function StaffCreate({ close, staffData }: StaffCreateProps) {
    const { setStaffList, setOriginalStaffList, setSelectedId,
        setInputListValue, setConfirmMessage } = staffData;
    const scrollRef = useRef<HTMLDivElement | null>(null);
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

    useEffect(() => {
        if (scrollRef?.current && window.innerWidth >= 1200 && window.matchMedia("(pointer: fine)").matches) {
            window.scrollTo({
                top: scrollRef.current.offsetTop - 20,
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

    // Add new employee
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const unknownData: string | null = localStorage.getItem("hospitalData");
        const savedData: hospitalShape = unknownData ? JSON.parse(unknownData) : {};
        const staffLocalStorage: StaffListType | undefined = savedData.staffList;

        const maxIdLocalStorage: number = Math.max(
            ...staffLocalStorage?.flatMap(w => [w.id, ...w.staff.map(s => s.id)]) || []
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
        const updatedStaffData = staffLocalStorage ? [newStructure, ...staffLocalStorage] : [newStructure];
        localStorage.setItem("hospitalData", JSON.stringify({ ...savedData, staffList: updatedStaffData }));
        setStaffList(updatedStaffData);
        setInputListValue('');
        setSelectedId(newEmployee.id);
        setOriginalStaffList(updatedStaffData);
        close();
        setConfirmMessage({ message: "Dipendente aggiunto con successo", type: "success" });
        setTimeout(() => {
            setConfirmMessage(null);
        }, 3500);
    }

    return (
        <div id="createEmployeeCont" className='boxStyle' ref={scrollRef}>
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
            <small className='warning'>Tutti i campi sono obbligatori</small>
            <form onSubmit={handleSubmit}>
                {/* General informations */}
                <div className="formGroup">
                    <label htmlFor="nameCreate">Nome</label>
                    <input onChange={handleInputChange} value={formData.name} type="text" autoComplete='off' spellCheck='false' id="nameCreate" name="name" required maxLength={14} />
                </div>

                <div className="formGroup">
                    <label htmlFor="surnameCreate">Cognome</label>
                    <input onChange={handleInputChange} value={formData.surname} type="text" autoComplete='off' spellCheck='false' id="surnameCreate" name="surname" required maxLength={14} />
                </div>

                <div className="formGroup">
                    <label htmlFor="shortRoleCreate">Ruolo breve</label>
                    <input onChange={handleInputChange} value={formData.shortRole} type="text" autoComplete='off' spellCheck='false' id="shortRoleCreate" name="shortRole" required maxLength={15} />
                </div>

                <div className="formGroup">
                    <label htmlFor="longRoleCreate">Descrizione ruolo</label>
                    <input onChange={handleInputChange} value={formData.longRole} type="text" autoComplete='off' spellCheck='false' id="longRoleCreate" name="longRole" required maxLength={100} />
                </div>

                <div className="formGroup">
                    <label htmlFor="wardCreate">Reparto</label>
                    <input onChange={handleInputChange} value={formData.ward} type="text" autoComplete='off' spellCheck='false' id="wardCreate" name="ward" required maxLength={21} />
                </div>

                {/* Shifts */}
                <div>
                    <h4 className='sectionTitle'>Turni</h4>
                    <div className='employeeShiftsForm'>
                        <div className="formGroup">
                            <label htmlFor="mondayShiftCreate">Lunedì</label>
                            <input onChange={handleInputChange} value={formData.mondayShift} type="text" autoComplete='off' spellCheck='false' id="mondayShiftCreate" name="mondayShift" required maxLength={12} />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="tuesdayShiftCreate">Martedì</label>
                            <input onChange={handleInputChange} value={formData.tuesdayShift} type="text" autoComplete='off' spellCheck='false' id="tuesdayShiftCreate" name="tuesdayShift" required maxLength={12} />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="wednesdayShiftCreate">Mercoledì</label>
                            <input onChange={handleInputChange} value={formData.wednesdayShift} type="text" autoComplete='off' spellCheck='false' id="wednesdayShiftCreate" name="wednesdayShift" required maxLength={12} />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="thursdayShiftCreate">Giovedì</label>
                            <input onChange={handleInputChange} value={formData.thursdayShift} type="text" autoComplete='off' spellCheck='false' id="thursdayShiftCreate" name="thursdayShift" required maxLength={12} />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="fridayShiftCreate">Venerdì</label>
                            <input onChange={handleInputChange} value={formData.fridayShift} type="text" autoComplete='off' spellCheck='false' id="fridayShiftCreate" name="fridayShift" required maxLength={12} />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="saturdayShiftCreate">Sabato</label>
                            <input onChange={handleInputChange} value={formData.saturdayShift} type="text" autoComplete='off' spellCheck='false' id="saturdayShiftCreate" name="saturdayShift" required maxLength={12} />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="sundayShiftCreate">Domenica</label>
                            <input onChange={handleInputChange} value={formData.sundayShift} type="text" autoComplete='off' spellCheck='false' id="sundayShiftCreate" name="sundayShift" required maxLength={12} />
                        </div>
                    </div>
                </div>

                {/* Contacts */}
                <div>
                    <h4 className='sectionTitle'>Contatti</h4>
                    <div className='employeeContactsForm'>
                        <div className="formGroup">
                            <label htmlFor="phoneCreate">Telefono</label>
                            <input onChange={handleInputChange} value={formData.phone} type="tel" autoComplete='off' spellCheck='false' id="phoneCreate" name="phone" required maxLength={16} />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="emailCreate">Email</label>
                            <input onChange={handleInputChange} value={formData.email} type="email" autoComplete='off' spellCheck='false' id="emailCreate" name="email" required maxLength={100} />
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

export default StaffCreate;
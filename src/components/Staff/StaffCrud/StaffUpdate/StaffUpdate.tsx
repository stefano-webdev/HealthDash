import { useState, useEffect, useRef } from 'react';
import './StaffUpdate.css';
import type { StaffProps } from '../../Staff/Staff.tsx';
import type { hospitalShape } from '../../../Home/PatientsToday.tsx';
import type { StaffListType } from '../../StaffList/StaffList.tsx';
import type { StaffMember } from '../../StaffList/StaffList.tsx';

interface StaffUpdateProps {
    close: () => void;
    staffData: StaffProps;
}

function StaffUpdate({ close, staffData }: StaffUpdateProps) {
    const { setStaffList, setOriginalStaffList, setConfirmMessage, setInputListValue, selectedId } = staffData;
    const unknownData: string | null = localStorage.getItem("hospitalData");
    const savedData: hospitalShape = unknownData ? JSON.parse(unknownData) : {};
    const staffMember: StaffMember | undefined = savedData.staffList?.flatMap(ward => ward.staff).find(member => member.id === selectedId);
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const onlyOneScroll = useRef<boolean>(false);
    const [formData, setFormData] = useState({
        name: staffMember?.employee.split(" ")[0],
        surname: staffMember?.employee.split(" ").slice(1).join(" "),
        shortRole: staffMember?.shortRole,
        longRole: staffMember?.longRole,
        ward: staffMember?.ward,
        mondayShift: staffMember?.schedule?.mon,
        tuesdayShift: staffMember?.schedule?.tue,
        wednesdayShift: staffMember?.schedule?.wed,
        thursdayShift: staffMember?.schedule?.thu,
        fridayShift: staffMember?.schedule?.fri,
        saturdayShift: staffMember?.schedule?.sat,
        sundayShift: staffMember?.schedule?.sun,
        phone: staffMember?.number,
        email: staffMember?.mail
    });

    useEffect(() => {
        setFormData({
            name: staffMember?.employee.split(" ")[0],
            surname: staffMember?.employee.split(" ").slice(1).join(" "),
            shortRole: staffMember?.shortRole,
            longRole: staffMember?.longRole,
            ward: staffMember?.ward,
            mondayShift: staffMember?.schedule?.mon,
            tuesdayShift: staffMember?.schedule?.tue,
            wednesdayShift: staffMember?.schedule?.wed,
            thursdayShift: staffMember?.schedule?.thu,
            fridayShift: staffMember?.schedule?.fri,
            saturdayShift: staffMember?.schedule?.sat,
            sundayShift: staffMember?.schedule?.sun,
            phone: staffMember?.number,
            email: staffMember?.mail
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

    // Update the selected employee
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const updatedStaffMember = {
            id: selectedId,
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

        const updatedStaffList: StaffListType = savedData.staffList?.map(ward => {
            return {
                ...ward,
                staff: ward.staff.map(member => {
                    if (member.id === selectedId) {
                        return updatedStaffMember;
                    }
                    return member;
                })
            }
        }) as StaffListType;

        const newData = {
            ...savedData,
            staffList: updatedStaffList
        };

        localStorage.setItem("hospitalData", JSON.stringify(newData));
        setStaffList(updatedStaffList);
        setInputListValue('');
        setOriginalStaffList(updatedStaffList);
        close();
        setConfirmMessage({ message: "Dipendente modificato con successo", type: "success" });
        setTimeout(() => {
            setConfirmMessage(null);
        }, 3500);
    }

    return (
        <div id='updateEmployeeCont' className='boxStyle' ref={scrollRef}>
            <div className='titleBox'>
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
                <h3 className='box'>Modifica dipendente</h3>
            </div>
            <p id='updatedEmployee'>Stai modificando i dati di <em style={{ color: '#1475d6ff' }}>{staffMember?.employee}</em></p>
            <small className='warning'>Tutti i campi sono obbligatori</small>
            <form onSubmit={handleSubmit}>
                {/* General informations */}
                <div className="formGroup">
                    <label htmlFor="nameUpdate">Nome</label>
                    <input onChange={handleInputChange} value={formData.name} type="text" autoComplete='off' spellCheck='false' id="nameUpdate" name="name" required maxLength={14} />
                </div>

                <div className="formGroup">
                    <label htmlFor="surnameUpdate">Cognome</label>
                    <input onChange={handleInputChange} value={formData.surname} type="text" autoComplete='off' spellCheck='false' id="surnameUpdate" name="surname" required maxLength={14} />
                </div>

                <div className="formGroup">
                    <label htmlFor="shortRoleUpdate">Ruolo breve</label>
                    <input onChange={handleInputChange} value={formData.shortRole} type="text" autoComplete='off' spellCheck='false' id="shortRoleUpdate" name="shortRole" required maxLength={15} />
                </div>

                <div className="formGroup">
                    <label htmlFor="longRoleUpdate">Descrizione ruolo</label>
                    <input onChange={handleInputChange} value={formData.longRole} type="text" autoComplete='off' spellCheck='false' id="longRoleUpdate" name="longRole" required maxLength={100} />
                </div>

                <div className="formGroup">
                    <label htmlFor="wardUpdate">Reparto</label>
                    <input onChange={handleInputChange} value={formData.ward} type="text" autoComplete='off' spellCheck='false' id="wardUpdate" name="ward" required maxLength={21} />
                </div>

                {/* Shifts */}
                <div>
                    <h4 className='sectionTitle'>Turni</h4>
                    <div className='employeeShiftsForm'>
                        <div className="formGroup">
                            <label htmlFor="mondayShiftUpdate">Lunedì</label>
                            <input onChange={handleInputChange} value={formData.mondayShift} type="text" autoComplete='off' spellCheck='false' id="mondayShiftUpdate" name="mondayShift" required maxLength={12} />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="tuesdayShiftUpdate">Martedì</label>
                            <input onChange={handleInputChange} value={formData.tuesdayShift} type="text" autoComplete='off' spellCheck='false' id="tuesdayShiftUpdate" name="tuesdayShift" required maxLength={12} />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="wednesdayShiftUpdate">Mercoledì</label>
                            <input onChange={handleInputChange} value={formData.wednesdayShift} type="text" autoComplete='off' spellCheck='false' id="wednesdayShiftUpdate" name="wednesdayShift" required maxLength={12} />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="thursdayShiftUpdate">Giovedì</label>
                            <input onChange={handleInputChange} value={formData.thursdayShift} type="text" autoComplete='off' spellCheck='false' id="thursdayShiftUpdate" name="thursdayShift" required maxLength={12} />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="fridayShiftUpdate">Venerdì</label>
                            <input onChange={handleInputChange} value={formData.fridayShift} type="text" autoComplete='off' spellCheck='false' id="fridayShiftUpdate" name="fridayShift" required maxLength={12} />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="saturdayShiftUpdate">Sabato</label>
                            <input onChange={handleInputChange} value={formData.saturdayShift} type="text" autoComplete='off' spellCheck='false' id="saturdayShiftUpdate" name="saturdayShift" required maxLength={12} />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="sundayShiftUpdate">Domenica</label>
                            <input onChange={handleInputChange} value={formData.sundayShift} type="text" autoComplete='off' spellCheck='false' id="sundayShiftUpdate" name="sundayShift" required maxLength={12} />
                        </div>
                    </div>
                </div>

                {/* Contacts */}
                <div>
                    <h4 className='sectionTitle'>Contatti</h4>
                    <div className='employeeContactsForm'>
                        <div className="formGroup">
                            <label htmlFor="phoneUpdate">Telefono</label>
                            <input onChange={handleInputChange} value={formData.phone} type="tel" autoComplete='off' spellCheck='false' id="phoneUpdate" name="phone" required maxLength={16} />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="emailUpdate">Email</label>
                            <input onChange={handleInputChange} value={formData.email} type="email" autoComplete='off' spellCheck='false' id="emailUpdate" name="email" required maxLength={100} />
                        </div>
                    </div>
                </div>

                <div className='formActions'>
                    <button type="button" onClick={close}>Annulla</button>
                    <button type="submit">Modifica</button>
                </div>
            </form>
        </div>
    );
}

export default StaffUpdate;
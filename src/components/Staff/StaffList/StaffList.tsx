import { useState, useEffect } from 'react';
import staffData from '../Staff/Staff.json';
import type { hospitalShape } from "../../Home/PatientsToday.tsx";
import "./StaffList.css";

interface StaffMember {
    id: number,
    employee: string,
    shortRole: string,
    longRole: string,
    ward: string,
    number: string,
    mail: string,
}

interface AllStaffList {
    id: number;
    name: string;
    staff: StaffMember[];
}

type StaffListType = AllStaffList[];

function StaffList() {
    const [staffList, setStaffList] = useState<StaffListType>([]);

    useEffect(() => {
        // "YYYY-MM-DD"
        const today: string = new Date().toISOString().split("T")[0];

        const unknownData: string | null = localStorage.getItem("hospitalData");
        const savedData: hospitalShape = unknownData ? JSON.parse(unknownData) : {};

        if (savedData.staffList && savedData.date === today) {
            // If it already exists for today, use again
            setStaffList(savedData.staffList);
        } else {
            // Generate a new staff list
            const newStaffList: StaffListType = randomStaff(staffData);

            const updatedData: hospitalShape = {
                ...savedData,
                date: today,
                staffList: newStaffList
            };

            localStorage.setItem("hospitalData", JSON.stringify(updatedData));
            setStaffList(newStaffList);
        }
    }, []);

    function randomStaff(staffData: StaffListType): StaffListType {
        // Select 5 random staff members from each ward
        return staffData.map((ward: AllStaffList): AllStaffList => {
            const shuffledStaff = [...ward.staff].sort(() => 0.5 - Math.random());
            const selectedStaff = shuffledStaff.slice(0, 5);
            return {
                ...ward,
                staff: selectedStaff
            };
        });
    }

    return (
        <div id='staffListCont' className='boxStyleStaff'>
            <h3>Lista dipendenti</h3>
            <p>La tabella è scrollabile: scorri per vedere tutti i dipendenti e clicca per maggiori informazioni.</p>
            <p>Personale più attivo nelle ultime 24 ore.</p>

            <div id='tableWrapper'>
                <table>
                    <thead>
                        <tr>
                            <th>Cognome</th>
                            <th>Ruolo</th>
                            <th>Reparto</th>
                        </tr>
                    </thead>

                    <tbody>
                        {staffList.map((ward) =>
                            ward.staff.map((person) => (
                                <tr key={person.id}>
                                    <td>{person.employee.split(" ")[1]}</td>
                                    <td>{person.shortRole}</td>
                                    <td>{ward.name}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default StaffList;
export type { StaffListType };
import { useState, useEffect } from 'react';
import staffData from '../Staff/Staff.json';
import type { hospitalShape } from "../../Home/PatientsToday.tsx";
import StaffDetails from '../StaffDetails/StaffDetails.tsx';
import "./StaffList.css";

interface StaffMember {
    id: number,
    employee: string,
    shortRole: string,
    longRole: string,
    ward: string,
    schedule: { [key: string]: string },
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
    const [originalStaffList, setOriginalStaffList] = useState<StaffListType>([]);
    const [staffList, setStaffList] = useState<StaffListType>([]);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    useEffect(() => {
        // "YYYY-MM-DD"
        const today: string = new Date().toISOString().split("T")[0];
        const unknownData: string | null = localStorage.getItem("hospitalData");
        const savedData: hospitalShape = unknownData ? JSON.parse(unknownData) : {};

        if (savedData.staffList && savedData.date === today) {
            // If it already exists for today, use again
            setOriginalStaffList(savedData.staffList);
            setStaffList(savedData.staffList);
            // Automatically click first table employee
            setSelectedId(savedData.staffList[0]?.staff[0]?.id);
        } else {
            // Generate a new staff list
            const newStaffList: StaffListType = randomStaff(staffData);

            const updatedData: hospitalShape = {
                ...savedData,
                date: today,
                staffList: newStaffList
            };

            localStorage.setItem("hospitalData", JSON.stringify(updatedData));
            setOriginalStaffList(newStaffList);
            setStaffList(newStaffList);
            // Automatically click first table employee
            setSelectedId(newStaffList[0]?.staff[0]?.id);
        }
    }, []);

    // Select 3-6 random staff members from each ward
    function randomStaff(staffData: StaffListType): StaffListType {
        return staffData.map((ward: AllStaffList): AllStaffList => {
            const shuffledStaff = [...ward.staff].sort(() => 0.5 - Math.random());
            const selectedStaff = shuffledStaff.slice(0, Math.floor(Math.random() * (6 - 3 + 1)) + 3);
            return {
                ...ward,
                staff: selectedStaff
            };
        });
    }

    // Filter staff based on input
    function filterStaff(e: React.ChangeEvent<HTMLInputElement>) {
        const query: string = e.target.value.toLowerCase();

        const filtered: StaffListType = originalStaffList
            .map(ward => ({
                ...ward,
                staff: ward.staff.filter(person =>
                    person.employee.toLowerCase().split(" ")[1].includes(query) ||
                    person.shortRole.toLowerCase().includes(query) ||
                    person.ward.toLowerCase().includes(query)
                )
            }))
            .filter(ward => ward.staff.length > 0); // remove the empty wards

        setStaffList(filtered);
    }

    return (
        <>
            <div id='staffListCont' className='boxStyleStaff'>
                <h3>Lista dipendenti</h3>
                <div id="updateCont">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                        <path d="M129.9 292.5C143.2 199.5 223.3 128 320 128C373 128 
                            421 149.5 455.8 184.2C456 184.4 456.2 184.6 456.4 184.8L464 
                            192L416.1 192C398.4 192 384.1 206.3 384.1 224C384.1 241.7 398.4 
                            256 416.1 256L544.1 256C561.8 256 576.1 241.7 576.1 224L576.1 
                            96C576.1 78.3 561.8 64 544.1 64C526.4 64 512.1 78.3 512.1 96L512.1 
                            149.4L500.8 138.7C454.5 92.6 390.5 64 320 64C191 64 84.3 159.4 66.6 
                            283.5C64.1 301 76.2 317.2 93.7 319.7C111.2 322.2 127.4 310 129.9 292.6zM573.4 
                            356.5C575.9 339 563.7 322.8 546.3 320.3C528.9 317.8 512.6 330 510.1 347.4C496.8 
                            440.4 416.7 511.9 320 511.9C267 511.9 219 490.4 184.2 455.7C184 455.5 183.8 
                            455.3 183.6 455.1L176 447.9L223.9 447.9C241.6 447.9 255.9 433.6 255.9 415.9C255.9 
                            398.2 241.6 383.9 223.9 383.9L96 384C87.5 384 79.3 387.4 73.3 393.5C67.3 399.6 63.9 
                            407.7 64 416.3L65 543.3C65.1 561 79.6 575.2 97.3 575C115 574.8 129.2 560.4 129 
                            542.7L128.6 491.2L139.3 501.3C185.6 547.4 249.5 576 320 576C449 576 555.7 480.6 
                            573.4 356.5z" />
                    </svg>
                    <small>24 ore</small>
                </div>

                <p>La tabella è scrollabile: scorri per vedere tutti i dipendenti e clicca per maggiori informazioni.</p>
                <p>Personale più attivo nelle ultime 24 ore.</p>

                <small id='filterFor'>Filtra per cognome, ruolo o reparto</small>
                <div id="staffFilterCont">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                        <path d="M480 272C480 317.9 465.1 360.3 440 
                            394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 
                            566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 
                            440C360.3 465.1 317.9 480 272 480C157.1 480 64 
                            386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 
                            157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 
                            192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 
                            351.5 192.5 416 272 416z" />
                    </svg>
                    <input id='staffFilterInput' spellCheck='false' autoComplete='off' onChange={filterStaff} type="text" placeholder="Filtra i dipendenti" />
                </div>

                {staffList.length === 0 ? (
                    <p id='noEmployeeFound'>Nessun dipendente trovato.</p>
                ) : (
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
                                        <tr onClick={() => setSelectedId(person.id)} key={person.id}
                                            className={person.id === selectedId ? "selectedEmployee" : ""}>
                                            <td>{person.employee.split(" ")[1]}</td>
                                            <td>{person.shortRole}</td>
                                            <td>{ward.name}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {selectedId !== null && <StaffDetails id={selectedId} />}
        </>
    );
}

export default StaffList;
export type { StaffListType, StaffMember };
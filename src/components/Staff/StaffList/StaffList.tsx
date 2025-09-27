import { useEffect } from 'react';
import staffDataJSON from '../Staff/Staff.json';
import type { hospitalShape } from "../../Home/PatientsToday.tsx";
import type { StaffProps } from '../Staff/Staff.tsx';
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

function StaffList({ staffData }: { staffData: StaffProps }) {
    const { staffList, originalStaffList, selectedId,
        inputListValue, setStaffList, setOriginalStaffList,
        setSelectedId, setInputListValue } = staffData;

    useEffect(() => {
        // "YYYY-MM-DD"
        const today: string = new Date().toISOString().split("T")[0];
        const unknownData: string | null = localStorage.getItem("hospitalData");
        const savedData: hospitalShape = unknownData ? JSON.parse(unknownData) : {};

        if (savedData.staffList && savedData.date?.StaffDate === today) {
            // If it already exists for today, use again
            setOriginalStaffList(savedData.staffList);
            setStaffList(savedData.staffList);
            // Automatically click first table employee
            setSelectedId(savedData.staffList[0]?.staff[0]?.id);
        } else {
            // Generate a new staff list
            const newStaffList: StaffListType = randomStaff(staffDataJSON);

            const updatedData: hospitalShape = {
                ...savedData,
                date: {
                    ...savedData.date,
                    StaffDate: today
                },
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
    // In a real application this data would be fetched from a real database with an API,
    // but here I generate it randomly each day to simulate recent activity
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

    // Filter staff based on search query
    function filterStaff(e: React.ChangeEvent<HTMLInputElement>) {
        const query: string = e.target.value.toLowerCase();
        const filtered: StaffListType = originalStaffList.map(ward => {
            return {
                ...ward,
                staff: ward.staff.filter(person =>
                    person.employee.toLowerCase().split(" ").slice(1).join(" ").includes(query) ||
                    person.shortRole.toLowerCase().includes(query) ||
                    person.ward.toLowerCase().includes(query)
                )
            };
        })
            .filter(ward => ward.staff.length > 0); // remove the empty wards
        setInputListValue(e.target.value);
        setStaffList(filtered);
    }

    return (
        <div id='staffListCont' className='boxStyle'>
            <div className='titleBox'>
                <div className='titleSVG'>
                    <svg className="box" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                        <path d="M104 112C90.7 112 80 122.7 80 136L80 184C80 197.3 
                            90.7 208 104 208L152 208C165.3 208 176 197.3 176 184L176 
                            136C176 122.7 165.3 112 152 112L104 112zM256 128C238.3 128 
                            224 142.3 224 160C224 177.7 238.3 192 256 192L544 192C561.7 
                            192 576 177.7 576 160C576 142.3 561.7 128 544 128L256 
                            128zM256 288C238.3 288 224 302.3 224 320C224 337.7 238.3 
                            352 256 352L544 352C561.7 352 576 337.7 576 320C576 302.3 
                            561.7 288 544 288L256 288zM256 448C238.3 448 224 462.3 224 
                            480C224 497.7 238.3 512 256 512L544 512C561.7 512 576 497.7 
                            576 480C576 462.3 561.7 448 544 448L256 448zM80 296L80 
                            344C80 357.3 90.7 368 104 368L152 368C165.3 368 176 357.3 
                            176 344L176 296C176 282.7 165.3 272 152 272L104 272C90.7 
                            272 80 282.7 80 296zM104 432C90.7 432 80 442.7 80 456L80 
                            504C80 517.3 90.7 528 104 528L152 528C165.3 528 176 517.3 
                            176 504L176 456C176 442.7 165.3 432 152 432L104 432z" />
                    </svg>
                    <h3 className='box'>Lista dipendenti</h3>
                </div>
                <div className="updateCont">
                    <svg className='updateSvgWhite' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
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
                    <small className='smallWhite'>24 ore</small>
                </div>
            </div>
            <p>Personale più attivo nelle ultime 24 ore.</p>
            <small>Filtra per cognome, ruolo o reparto</small>
            <div className="listFilterCont">
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
                <input id='staffFilterInput' spellCheck='false' autoComplete='off'
                    value={inputListValue} onChange={filterStaff} type="text" placeholder="Filtra i dipendenti" />
            </div>

            {staffList === null ? null : staffList.length === 0 ? (
                <p>Nessun dipendente trovato.</p>
            ) : (
                <div className='tableWrapper'>
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
                                        className={person.id === selectedId ? "selectedRow" : ""}>
                                        <td>{person.employee.split(" ").slice(1).join(" ")}</td>
                                        <td>{person.shortRole}</td>
                                        <td>{person.ward}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default StaffList;
export type { AllStaffList, StaffListType, StaffMember };
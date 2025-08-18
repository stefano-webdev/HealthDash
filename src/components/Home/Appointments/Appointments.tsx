import { useEffect, useState } from "react";
import appointmentsData from "./AppointmentsData.json";
import "./Appointments.css";

type Appointment = {
    patient: string;
    time: string;
    room: string;
};

type Department = {
    name: string;
    appointments: Appointment[];
};

type DailyAppointments = Department[];

function Appointments() {
    const [dailyAppointments, setDailyAppointments] = useState<DailyAppointments>([]);

    useEffect(() => {
        // Today's date (YYYY-MM-DD)
        const today: string = new Date().toISOString().split("T")[0];

        // Check if we have today's appointments in localStorage
        const stored: string | null = localStorage.getItem("dailyAppointments");
        const storedDate: string | null = localStorage.getItem("dailyAppointmentsDate");

        if (stored && storedDate === today) {
            // If we have today's data, we use it
            setDailyAppointments(JSON.parse(stored));
        } else {
            // Otherwise, we generate new data
            const newData: DailyAppointments = generateDailyAppointments(appointmentsData as DailyAppointments);
            setDailyAppointments(newData);

            // Save the new data in localStorage
            localStorage.setItem("dailyAppointments", JSON.stringify(newData));
            localStorage.setItem("dailyAppointmentsDate", today);
        }
    }, []);

    // Take 3 random departments and 2 random appointments
    function generateDailyAppointments(data: DailyAppointments): DailyAppointments {
        // Shuffle the departments
        const shuffledDepartments: DailyAppointments = [...data].sort(() => 0.5 - Math.random());
        const selectedDepartments: DailyAppointments = shuffledDepartments.slice(0, 3);

        return selectedDepartments.map((dept: Department): Department => {
            // Shuffle the appointments and take 2 of them
            const shuffledAppointments: Appointment[] = [...dept.appointments].sort(() => 0.5 - Math.random());
            const selected: Appointment[] = shuffledAppointments.slice(0, 2);

            // Sort the selected appointments by time
            selected.sort((a, b) => a.time.localeCompare(b.time));

            // Return the department with the selected appointments
            return {
                ...dept,
                appointments: selected
            };
        });
    }

    return (
        <div id="appointmentsCont">
            <div id="appointmentsTitleCont">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                    <path d="M320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 
                        320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64zM296 
                        184L296 320C296 328 300 335.5 306.7 340L402.7 404C413.7 411.4 428.6 
                        408.4 436 397.3C443.4 386.2 440.4 371.4 429.3 364L344 307.2L344 
                        184C344 170.7 333.3 160 320 160C306.7 160 296 170.7 296 184z" />
                </svg>
                <h3>Appuntamenti</h3>
            </div>
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
            <div id="allDeparmentsCont">
                {dailyAppointments.map((dept, idx) => (
                    <div key={idx} id="departmentCont">
                        <h4>{dept.name}</h4>
                        <ul id="appointmentsUl">
                            {dept.appointments.map((appt, i) => (
                                <li key={i}>
                                    {appt.time} <br /> {appt.patient} - {appt.room}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Appointments;

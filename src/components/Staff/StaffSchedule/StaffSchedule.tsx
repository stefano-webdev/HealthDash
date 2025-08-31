import './StaffSchedule.css';
import type { StaffMember } from '../StaffList/StaffList.tsx';
import type { hospitalShape } from '../../Home/PatientsToday.tsx';

function StaffSchedule({ id }: { id: number | null }) {
    const unknownData: string | null = localStorage.getItem("hospitalData");
    const savedData: hospitalShape = unknownData ? JSON.parse(unknownData) : {};
    const staffMember: StaffMember | undefined = savedData.staffList?.flatMap(ward => ward.staff).find(member => member.id === id);
    const daysMap: Record<string, string> = {
        mon: 'Lunedì',
        tue: 'Martedì',
        wed: 'Mercoledì',
        thu: 'Giovedì',
        fri: 'Venerdì',
        sat: 'Sabato',
        sun: 'Domenica',
    };

    return (
        <div id='staffScheduleCont' className='boxStyle'>
            <div className='titleBox'>
                <svg className='box' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                    <path d="M224 64C241.7 64 256 78.3 256 96L256 128L384 
                        128L384 96C384 78.3 398.3 64 416 64C433.7 64 448 78.3 448 
                        96L448 128L480 128C515.3 128 544 156.7 544 192L544 480C544 
                        515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 
                        192C96 156.7 124.7 128 160 128L192 128L192 96C192 78.3 206.3 
                        64 224 64zM224 320C206.3 320 192 334.3 192 352L192 416C192 433.7 
                        206.3 448 224 448L416 448C433.7 448 448 433.7 448 416L448 
                        352C448 334.3 433.7 320 416 320L224 320z" />
                </svg>
                <h3 className='box'>Orari di lavoro</h3>
            </div>
            <p id='employeeSchedule'>{staffMember?.employee} ha in programma i seguenti turni:</p>

            <div id='employeeSchedulesCont'>
                {Object.entries(daysMap).map(([dayKey, dayLabel]) => (
                    <div className='dayShiftCont' key={dayKey}>
                        <p>{dayLabel}</p>
                        <p>{staffMember?.schedule[dayKey]}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default StaffSchedule;

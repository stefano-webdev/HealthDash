import { useState, useRef } from 'react';
import './StaffCrud.css';
import staffData from '../Staff/Staff.json';
import type { StaffMember } from '../StaffList/StaffList.tsx';
import type { StaffListType } from '../StaffList/StaffList.tsx';
import StaffCreate from './StaffCreate/StaffCreate.tsx';
import StaffUpdate from './StaffUpdate/StaffUpdate.tsx';
import StaffDelete from './StaffDelete/StaffDelete.tsx';

interface StaffCrudProps {
    id: number | null;
    changeStaffList: React.Dispatch<React.SetStateAction<StaffListType | null>>;
    changeId: React.Dispatch<React.SetStateAction<number | null>>;
    changeOriginalList: React.Dispatch<React.SetStateAction<StaffListType>>;
};

type CrudType = "create" | "update" | "delete" | null;

function StaffCrud({ id, ...rest }: StaffCrudProps) {
    const newCrudCont = useRef<HTMLDivElement>(null);
    // staffMember is undefined for the created employees
    const [activeCrud, setActiveCrud] = useState<CrudType>(null);

    return (
        <>
            <div id='staffCrudCont' className='boxStyle'>
                <div className='titleBox'>
                    <svg className='box' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                        <path d="M256.1 312C322.4 312 376.1 258.3 376.1 192C376.1 
                        125.7 322.4 72 256.1 72C189.8 72 136.1 125.7 136.1 
                        192C136.1 258.3 189.8 312 256.1 312zM226.4 368C127.9 368 
                        48.1 447.8 48.1 546.3C48.1 562.7 61.4 576 77.8 576L274.3 
                        576L285.2 521.5C289.5 499.8 300.2 479.9 315.8 464.3L383.1 
                        397C355.1 378.7 321.7 368.1 285.7 368.1L226.3 368.1zM332.3 
                        530.9L320.4 590.5C320.2 591.4 320.1 592.4 320.1 593.4C320.1 
                        601.4 326.6 608 334.7 608C335.7 608 336.6 607.9 337.6 
                        607.7L397.2 595.8C409.6 593.3 421 587.2 429.9 578.3L548.8 
                        459.4L468.8 379.4L349.9 498.3C341 507.2 334.9 518.6 332.4 
                        531zM600.1 407.9C622.2 385.8 622.2 350 600.1 327.9C578 
                        305.8 542.2 305.8 520.1 327.9L491.3 356.7L571.3 436.7L600.1 
                        407.9z" />
                    </svg>
                    <h3 className='box'>Gestione personale</h3>
                </div>
                <p id='staffCrudDescription'>Puoi gestire il personale in modo semplice e veloce: <em>aggiungi</em>, <em>modifica</em> o <em>rimuovi</em> i dipendenti.</p>
                <p id='staffCrudFeatures'>Funzionalità CRUD</p>

                <div id='staffCrudActionsCont'>
                    <button type="button" aria-label="Add employee" onClick={() => setActiveCrud("create")}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                            <path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 
                                110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 
                                337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 
                                544 320 544C337.7 544 352 529.7 352 512L352 352L512 
                                352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 
                                288L352 288L352 128z" />
                        </svg>
                    </button>

                    <button type="button" aria-label="Edit employee" onClick={() => setActiveCrud("update")}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
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
                    </button>

                    <button type="button" aria-label="Delete employee" onClick={() => setActiveCrud("delete")}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                            <path d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 
                                128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 
                                544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 
                                56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 
                                69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 
                                576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z" />
                        </svg>
                    </button>
                </div>
            </div>

            {activeCrud === 'create' && <StaffCreate close={() => setActiveCrud(null)} props={rest} scrollRef={newCrudCont} />}
            {activeCrud === 'update' && <StaffUpdate />}
            {activeCrud === 'delete' && <StaffDelete />}
        </>
    );
}

export default StaffCrud;
import { useEffect, useState } from "react";
import TransactionsJSON from "../Finance/FinanceTransactions.json";
import "./TransactionList.css";
import type { hospitalShape } from "../../Home/PatientsToday.tsx";

interface Transaction {
    id: number;
    date: string;
    amount: number;
    description: string;
}

interface TransactionsMonth {
    id: number;
    month: string;
    data: Transaction[];
}

interface TransactionListProps {
    transactionList: Transaction[] | null;
    setTransactionList: React.Dispatch<React.SetStateAction<Transaction[] | null>>;
    selectedOperations: number;
    setSelectedOperations: React.Dispatch<React.SetStateAction<number>>;
}

type Menu = "lastOperations" | null;

function TransactionList({ transactionList, setTransactionList, selectedOperations, setSelectedOperations }: TransactionListProps) {
    const [openMenu, setOpenMenu] = useState<Menu>(null);
    const months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const previousMonth: string = months[new Date().getMonth() - 1];
    const monthData: TransactionsMonth | undefined = TransactionsJSON.find(month => month.month === previousMonth);
    const unknownData: string | null = localStorage.getItem("hospitalData");
    const savedData: hospitalShape = unknownData ? JSON.parse(unknownData) : {};

    // Clicking the button opens/closes the filters dropdown
    function handleFiltersOpen(menu: Menu) {
        setOpenMenu(prev => prev === menu ? null : menu);
    }

    // Clicking outside of the filters dropdown closes it
    function handleClickOutside(e: MouseEvent) {
        if (!(e.target as HTMLElement).closest('.dropdownCont')) {
            setOpenMenu(null);
        }
    }

    // Change the number of transactions shown
    function handleSelectedOperations(operations: number) {
        setSelectedOperations(operations);
        setOpenMenu(null);
        const monthSliced: Transaction[] | null = savedData.finance?.invoices.slice(0, operations) ?? null;
        setTransactionList(monthSliced);
    }

    useEffect(() => {
        if (savedData.finance?.month === previousMonth && savedData.finance?.invoices) {
            setTransactionList(savedData.finance.invoices.slice(0, 4));
        } else {
            const monthDataSliced: Transaction[] | null = monthData ? monthData.data.slice(-4).reverse() : null;
            setTransactionList(monthDataSliced);
            localStorage.setItem("hospitalData", JSON.stringify({
                ...savedData,
                finance: {
                    invoices: monthData?.data.slice().reverse(),
                    month: previousMonth
                }
            }));
        }

        window.addEventListener("click", handleClickOutside);
        return () => window.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <div id="transactionListCont" className="boxStyle">
            <div className='titleBox'>
                <div className="titleSVG">
                    <svg className="box" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                        <path d="M64 192L64 224L576 224L576 192C576 
                        156.7 547.3 128 512 128L128 128C92.7 128 64 
                        156.7 64 192zM64 272L64 448C64 483.3 92.7 512 
                        128 512L512 512C547.3 512 576 483.3 576 448L576 
                        272L64 272zM128 424C128 410.7 138.7 400 152 
                        400L200 400C213.3 400 224 410.7 224 424C224 
                        437.3 213.3 448 200 448L152 448C138.7 448 128 
                        437.3 128 424zM272 424C272 410.7 282.7 400 296 
                        400L360 400C373.3 400 384 410.7 384 424C384 
                        437.3 373.3 448 360 448L296 448C282.7 448 272 
                        437.3 272 424z" />
                    </svg>
                    <h3 className='box'>Elenco transazioni</h3>
                </div>
            </div>
            <div className="contentBox">
                <div id="transactionFiltersCont">
                    <div id="lastOperationsCont" className="dropdownCont">
                        <button type="button" onClick={() => handleFiltersOpen('lastOperations')}
                            className={openMenu === 'lastOperations' ? "buttonFiltersActive" : ""}>
                            Ultime {selectedOperations} operazioni
                            <svg viewBox="0 0 200 200" className={openMenu === 'lastOperations' ? "rotate180" : ""}>
                                <polyline
                                    points="15,110 100,180 185,110"
                                    fill="none"
                                    strokeWidth="30" />
                            </svg>
                        </button>
                        <div className={`dropdownFiltersCont ${openMenu === 'lastOperations' ? "fadeDownFilters" : ""}`}>
                            <div onClick={() => handleSelectedOperations(4)}>
                                <svg className={`check ${selectedOperations === 4 ? "checkActive" : ""}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                    <path d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 
                                    543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 
                                    361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z" />
                                </svg>
                                Ultime 4 operazioni
                            </div>
                            <div onClick={() => handleSelectedOperations(5)}>
                                <svg className={`check ${selectedOperations === 5 ? "checkActive" : ""}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                    <path d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 
                                    543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 
                                    361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z" />
                                </svg>
                                Ultime 5 operazioni
                            </div>
                            <div onClick={() => handleSelectedOperations(6)}>
                                <svg className={`check ${selectedOperations === 6 ? "checkActive" : ""}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                    <path d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 
                                    543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 
                                    361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z" />
                                </svg>
                                Ultime 6 operazioni
                            </div>
                            <div onClick={() => handleSelectedOperations(7)}>
                                <svg className={`check ${selectedOperations === 7 ? "checkActive" : ""}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                    <path d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 
                                    543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 
                                    361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z" />
                                </svg>
                                Ultime 7 operazioni
                            </div>
                            <div onClick={() => handleSelectedOperations(8)}>
                                <svg className={`check ${selectedOperations === 8 ? "checkActive" : ""}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                    <path d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 
                                    543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 
                                    361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z" />
                                </svg>
                                Ultime 8 operazioni
                            </div>
                        </div>
                    </div>
                </div>

                {transactionList ? (
                    <div className='tableWrapper'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Data</th>
                                    <th>Importo</th>
                                    <th>Descrizione</th>
                                </tr>
                            </thead>

                            <tbody>
                                {transactionList.map(transaction => (
                                    <tr key={transaction.id}>
                                        <td>{transaction.date.length === 5 ? `${transaction.date}/${new Date().getFullYear().toString().slice(2)}` : transaction.date}</td>
                                        <td>{transaction.amount.toLocaleString('it-IT',
                                            { minimumFractionDigits: 0, maximumFractionDigits: 2 })} €
                                        </td>
                                        <td>{transaction.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default TransactionList;
export type { TransactionsMonth, Transaction };
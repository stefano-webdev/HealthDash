import { useState } from "react";
import type { Transaction } from "../TransactionList/TransactionList.tsx";
import "./CreateInvoice.css";
import type { hospitalShape } from "../../Home/PatientsToday.tsx";

interface CreateInvoiceProps {
    setTransactionList: React.Dispatch<React.SetStateAction<Transaction[] | null>>;
    selectedOperations: number;
    setConfirmMessage: React.Dispatch<React.SetStateAction<{ message: string, type: "success" } | null>>;
}

function CreateInvoice({ setTransactionList, selectedOperations, setConfirmMessage }: CreateInvoiceProps) {
    const months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const previousMonth: string = months[new Date().getMonth() - 1];
    const [formData, setFormData] = useState({
        date: "",
        amount: "",
        description: ""
    });

    // Add a new invoice
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const unknownData: string | null = localStorage.getItem("hospitalData");
        const savedData: hospitalShape = unknownData ? JSON.parse(unknownData) : {};
        const maxIdLocalStorage: number = Math.max(
            ...savedData.finance?.invoices.map(invoice => invoice.id) ?? [0]
        );
        const [year, month, day] = formData.date.split("-");
        const formattedDate = `${day}/${month}/${year.slice(2)}`;

        const newTrasaction: Transaction = {
            id: maxIdLocalStorage + 1,
            date: formattedDate,
            amount: parseFloat(formData.amount),
            description: formData.description
        };

        const newData: hospitalShape = {
            ...savedData,
            finance: {
                invoices: [newTrasaction, ...savedData.finance?.invoices ?? []],
                month: previousMonth
            }
        };

        localStorage.setItem("hospitalData", JSON.stringify(newData));
        setTransactionList(newData.finance?.invoices.slice(0, selectedOperations) ?? null);

        // Reset form
        setFormData({
            date: "",
            amount: "",
            description: ""
        });

        // Show confirmation message
        setConfirmMessage({ message: "Fattura creata con successo", type: "success" });
        setTimeout(() => {
            setConfirmMessage(null);
        }, 3500);
    }

    // Handle input change
    function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        let newValue;

        if (name === "amount") {
            newValue = value.replace(/[^0-9.]/g, ''); // Allow only numbers and dot
        } else {
            newValue = value;
        }

        setFormData(prevData => ({
            ...prevData,
            [name]: newValue
        }));
    }

    return (
        <div id="createInvoiceCont" className="boxStyle">
            <div className='titleBox'>
                <svg className="box" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                    <path d="M192 64C156.7 64 128 92.7 128 128L128 512C128 547.3 156.7 576 192 
                        576L448 576C483.3 576 512 547.3 512 512L512 234.5C512 217.5 505.3 201.2 493.3 
                        189.2L386.7 82.7C374.7 70.7 358.5 64 341.5 64L192 64zM453.5 240L360 240C346.7 
                        240 336 229.3 336 216L336 122.5L453.5 240zM192 448L192 384C192 366.3 206.3 352 
                        224 352L416 352C433.7 352 448 366.3 448 384L448 448C448 465.7 433.7 480 416 
                        480L224 480C206.3 480 192 465.7 192 448zM216 128L264 128C277.3 128 288 138.7 
                        288 152C288 165.3 277.3 176 264 176L216 176C202.7 176 192 165.3 192 152C192 
                        138.7 202.7 128 216 128zM216 224L264 224C277.3 224 288 234.7 288 248C288 261.3 
                        277.3 272 264 272L216 272C202.7 272 192 261.3 192 248C192 234.7 202.7 224 216 
                        224z" />
                </svg>
                <h3 className='box'>Crea fattura</h3>
            </div>
            <small className='warning'>Tutti i campi sono obbligatori</small>

            <form onSubmit={handleSubmit}>
                <div className="formGroup">
                    <label htmlFor="dateInvoice">Data</label>
                    <input onChange={handleInputChange} value={formData.date} type="date" id="dateInvoice" name="date" required />
                </div>
                <div className="formGroup">
                    <label htmlFor="amountInvoice">Importo</label>
                    <input onChange={handleInputChange} onWheel={(e) => e.currentTarget.blur()} value={formData.amount} type="number" max={99999.99} step={0.01} id="amountInvoice" name="amount" inputMode="decimal" required />
                </div>
                <div className="formGroup">
                    <label htmlFor="descriptionInvoice">Descrizione</label>
                    <textarea onChange={handleInputChange} value={formData.description} id="descriptionInvoice" name="description" required />
                </div>
                <button id="saveInvoice" className="buttonRed" type="submit">Salva</button>
            </form>
        </div>
    );
}

export default CreateInvoice;
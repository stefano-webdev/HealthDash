import { useEffect, useState } from 'react';
import { fullData, allMonths } from '../../Home/MonthlyRevenue/MonthlyRevenue.tsx';
import './FinanceOverview.css';

function FinanceOverview() {
    const [cashFlow, setCashFlow] = useState<{ revenue: number; expenses: number; balance: number } | null>(null);
    const previousMonth = allMonths[new Date().getMonth() - 1].full;
    const year = new Date().getFullYear();

    useEffect(() => {
        const months = ["gen", "feb", "mar", "apr", "mag", "giu", "lug", "ago", "set", "ott", "nov", "dic"];
        let currentBalance = 0;

        for (let i = 0; i < new Date().getMonth(); i++) {
            const month: { revenue: number; expenses: number } = fullData[months[i]];
            const balance = month.revenue - month.expenses;
            currentBalance += balance;
        }

        // Set cash flow for the previous month
        setCashFlow({
            revenue: fullData[months[new Date().getMonth() - 1]].revenue,
            expenses: fullData[months[new Date().getMonth() - 1]].expenses,
            balance: currentBalance
        })
    }, []);

    return (
        <div id="financeOverviewCont" className="boxStyle">
            <div className='titleBox'>
                <svg className="box" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                    <path d="M169.3 256C196.8 163.5 282.5 96 384 96L448 96C465.7 96 480 110.3 480 
                        128C480 145.7 465.7 160 448 160L384 160C318.4 160 262 199.5 237.3 256L368 256C381.3 
                        256 392 266.7 392 280C392 293.3 381.3 304 368 304L224.8 304C224.3 309.3 224 314.6 
                        224 320C224 325.4 224.3 330.7 224.8 336L368 336C381.3 336 392 346.7 392 360C392 
                        373.3 381.3 384 368 384L237.3 384C262 440.5 318.4 480 384 480L448 480C465.7 480 
                        480 494.3 480 512C480 529.7 465.7 544 448 544L384 544C282.5 544 196.8 476.5 169.3 
                        384L136 384C122.7 384 112 373.3 112 360C112 346.7 122.7 336 136 336L160.6 336C159.9 
                        325.5 159.9 314.5 160.6 304L136 304C122.7 304 112 293.3 112 280C112 266.7 122.7 256 
                        136 256L169.3 256z" />
                </svg>
                <h3 className='box'>Panoramica economica</h3>
            </div>
            <small style={{ display: "block", textAlign: "center" }}><em>{previousMonth} {year}</em></small>
            <div id="cashFlowCont">
                <div className="cashFlowItem">
                    <p>{cashFlow?.revenue.toLocaleString("it-IT")} €</p>
                    <p>Entrate mensili</p>
                </div>
                <div className="cashFlowItem">
                    <p>{cashFlow?.expenses.toLocaleString("it-IT")} €</p>
                    <p>Uscite mensili</p>
                </div>
                <div className="cashFlowItem">
                    <p>{cashFlow?.balance.toLocaleString("it-IT")} €</p>
                    <p>Saldo attuale</p>
                </div>
            </div>
        </div>
    );
}

export default FinanceOverview;
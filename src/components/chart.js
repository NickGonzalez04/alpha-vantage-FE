import Chart from 'chart.js/auto';
import { useEffect, useRef } from 'react';
import { getQuarterlyIncomeStatement, getQuarterlyBalanceSheet, quarterlyReports } from '../services/apiRequest';

export default function ChartComponent() {
   
    const canvasRef = useRef(null);
 

    // getQuarterlyIncomeStatement('AAPL').then((data) => {
    //     console.log(data);
    // });

    // getQuarterlyBalanceSheet('AAPL').then((data) => {
    //     console.log(data);
    // }   );


        useEffect(() => {

            let filterData = quarterlyReports.map((report) => {
                return {
                    fiscalDateEnding: report.fiscalDateEnding,
                    netIncome: parseFloat(report.netIncome),
                    totalRevenue: parseFloat(report.totalRevenue),
                };
            })

            // let filterData = getQuarterlyIncomeStatement().then((report) => {
            //     // console.log(report);
            //     // return {
            //     //     fiscalDateEnding: report.fiscalDateEnding,
            //     //     netIncome: parseFloat(report.netIncome),
            //     //     totalRevenue: parseFloat(report.totalRevenue),
            //     // };
            // });
    
            console.log(filterData);

            filterData.sort((a, b) => new Date(a.fiscalDateEnding) - new Date(b.fiscalDateEnding));
    
            const labels = filterData.map(data => data.fiscalDateEnding);
            const netIncomeData = filterData.map(data => data.netIncome);
    

            let chartInstance = null;

            if (canvasRef.current) {
                const ctx = canvasRef.current.getContext('2d');

                if (chartInstance) {
                    chartInstance.destroy();
                }

                chartInstance = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Net Income',
                            data: netIncomeData,
                            borderWidth: 1
                        },
                        {
                            label: 'Total Revenue',
                            data: filterData.map(data => data.totalRevenue),
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                    }
                });
            }

            return () => {
                if (chartInstance) {
                    chartInstance.destroy();
                }
            };
        }, []);

        return (
            <div>
                <canvas ref={canvasRef} />
            </div>
        );

}

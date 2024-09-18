import { useState, useEffect } from "react";
import "./App.css";
import { tenureData } from "./constant";

function App() {
  const [cost, setTotalCost] = useState(0);
  const [interest, setInterest] = useState(2);
  const [processingFee, setProcessingFee] = useState(1);
  const [downPayment, setDownPayment] = useState(0);
  const [totalLoan, setTotalLoan] = useState(0);
  const [loanPerMonth, setLoanPerMonth] = useState(0);
  const [tenure, setTenure] = useState(1);

  const calculateEMI = () => {
    const p = cost - downPayment;
    if (p <= 0) return;

    const interestMonthly = interest / 12 / 100;
    const numOfMonths = tenure * 12;

    const emi =
      (p * interestMonthly * (1 + interestMonthly) ** numOfMonths) /
      ((1 + interestMonthly) ** numOfMonths - 1);

    setLoanPerMonth(emi);
  };

  const updateEMI = (value: string) => {
    const val = Number(value);
    setDownPayment(val);

    const principalAmt = cost - val;
    const loan = principalAmt * (processingFee / 100);
    const totalLoan = loan + principalAmt;
    setTotalLoan(totalLoan);
  };

  useEffect(() => {
    // Recalculate EMI whenever the cost, interest, downPayment, or tenure changes
    calculateEMI();
  }, [cost, interest, downPayment, tenure]);

  const updateProcessingFee = (e) => {
    setProcessingFee(Number(e.target.value));
  };

  return (
    <>
      <h1>EMI Calculator</h1>
      <section className="flex">
        <span>
          <label>Cost</label>
          <input
            type="text"
            value={cost}
            onChange={(e) => {
              setTotalCost(Number(e.target.value));
            }}
          />
        </span>
        <span>
          <label>Interest Rate (in %)</label>
          <input
            type="number"
            value={interest}
            onChange={(e) => setInterest(Number(e.target.value))}
          />
        </span>
        <span>
          <label>Processing Fee (in %)</label>
          <input
            type="number"
            min={0}
            max={50}
            value={processingFee}
            onChange={updateProcessingFee}
          />
        </span>
        <span className="">
          <label>Down Payment</label>
          <input
            type="range"
            min={0}
            max={cost}
            onChange={(e) => updateEMI(e.target.value)}
            step={100000}
          />
          <div className="lables">
            <label>{"0%"}</label>
            <label>{downPayment}</label>
            <label>{"100%"}</label>
          </div>
        </span>
        <span>
          <label>Loan Per Month</label>
          <input type="range" min={0} max={loanPerMonth} step={100000} />
          <div className="lables">
            <label>{"0%"}</label>
            <label>{loanPerMonth}</label>
            <label>{loanPerMonth}</label>
          </div>
          <br />
          <label>Total Loan: ₹{totalLoan.toFixed(2)}</label>
          <br />
          <label>EMI: ₹{loanPerMonth.toFixed(2)}</label>
        </span>
        <span className="">
          <label>Tenure (in Years)</label>
          <div className="flex row">
            {tenureData?.map((year) => (
              <button
                key={year}
                type="button"
                className={`${year === tenure ? "buttonSelected" : ""}`}
                onClick={() => {
                  setTenure(Number(year));
                }}
              >
                {year}
              </button>
            ))}
          </div>
        </span>
      </section>
    </>
  );
}

export default App;

import { useEffect, useState } from "react";
import { css } from "@emotion/react";
import useAuth from "../../customHooksAndServices/authContextHook";
import usePaymentSubmission from "../../customHooksAndServices/paymentHook";
const INT_REGEX = /^\d*$/;

export default function PaymentForm() {
  const [months, setMonths] = useState("");
  const [maxMonths, setMaxMonths] = useState(0);
  const [helperText, setHelperText] = useState("");
  const [requestInProgress, setRequestInProgress] = useState(false);
  const { user, setUser } = useAuth();
  const { paymentSubmission } = usePaymentSubmission();
  const inputChangeHandler = (e) => {
    setHelperText("");
    if (!INT_REGEX.test(e.target.value)) {
      return;
    }
    if (e.target.value === "0") {
      setHelperText("Value should be greater than 0");
    }
    if (parseInt(e.target.value) > maxMonths) {
      setHelperText("Value should not exceed " + maxMonths);
    }
    setMonths(e.target.value);
  };

  const formSubmissionHandler = async (e) => {
    e.preventDefault();
    if (helperText || months === "") {
      return;
    }
    setRequestInProgress(true);
    const data = await paymentSubmission({ months });
    setRequestInProgress(false);
    if (data.status === 200) {
      const paymentObj = data.data.payment;
      const paymentArray = paymentObj.paymentMonthYear
        .map((pay) => ({
          date: new Date(paymentObj.date),
          id: paymentObj["_id"],
          ...pay,
        }))
        .reverse();
      setUser((prev) => ({
        ...prev,
        payments: [...paymentArray, ...prev.payments],
      }));
      window.alert("Payment Done successfully!");
    } else {
      window.alert(data.response.data.message);
    }
  };

  useEffect(() => {
    const { month, year } = getLastMonthYear(user);
    const dateprev = new Date(year, month, 1);
    const datecur = new Date();
    const monthDiff = getMonthDiff(dateprev, datecur);
    setMaxMonths(monthDiff);
  }, []);

  return (
    <div css={style}>
      <h1 className={`${maxMonths > 0 ? "" : "no-dues"}`}>
        {maxMonths > 0 ? "Payment Form" : "No Payment Pending"}
      </h1>
      {maxMonths > 0 && (
        <form onSubmit={formSubmissionHandler}>
          <div className="input-set">
            <label htmlFor="months">Months to Pay</label>
            <input
              type="text"
              placeholder="Enter number of months to pay"
              id="months"
              name="months"
              required
              value={months}
              onChange={inputChangeHandler}
            />
            <p className="error-text">{helperText}</p>
          </div>
          <div className="input-set">
            <label htmlFor="amount">Amount to Pay (Rs.)</label>
            <input
              type="text"
              placeholder="Calculating..."
              id="amount"
              name="amount"
              value={months === "" ? "" : parseInt(months) * 500}
              required
              disabled
            />
          </div>
          <button type="submit" disabled={requestInProgress}>
            Pay
          </button>
        </form>
      )}
    </div>
  );
}

const style = css`
  .no-dues {
    margin: 0 !important;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  form {
    width: 100%;
    margin-top: 0.25rem;
    button {
      color: rgb(255 255 255);
      font-weight: 700;
      transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
      border: 2px solid #fff;
      background: transparent;
      font-size: 1.5rem;
      padding: 0.75rem 2.5rem;
      border-radius: 50px;
      cursor: pointer;
      &:hover {
        background: #fff;
        color: hsl(213, 10%, 35%);
        transform: translate(-0.25rem, -0.25rem);
      }
    }
  }
  *:focus {
    outline: none;
  }

  .input-set {
    margin-bottom: 1rem;
    label {
      font-size: 1rem;
      font-weight: 100;
      display: block;
      color: cornsilk;
    }
    input {
      font-size: 1.25rem;
      height: 3rem;
      line-height: 1.75rem;
      padding-inline: 0.75rem;
      width: 100%;
      background: transparent;
      margin: 0;
      border: 1px solid white;
      color: white;
      border-radius: 5px;
      margin-block: 0.3rem;
      &:disabled {
        cursor: not-allowed;
      }
      &::placeholder {
        color: #ffffffa1;
      }
    }
  }
`;

function getLastMonthYear(user) {
  if (user.payments.length === 0) {
    const date = new Date(user.joiningDate);
    const month = date.getMonth() - 1 === -1 ? 11 : date.getMonth() - 1;
    const year = month === 11 ? date.getFullYear() - 1 : date.getFullYear();
    return { month, year };
  } else {
    const { month, year } = user.payments[0];
    return { month, year };
  }
}
function getMonthDiff(startDate, endDate) {
  return (
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth())
  );
}

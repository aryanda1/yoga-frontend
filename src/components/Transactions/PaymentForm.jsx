import { css } from "@emotion/react";

export default function PaymentForm() {
  return (
    <div css={style}>
      <h1>Payment Form</h1>
      <form>
        <div className="input-set">
          <label htmlFor="months">Months to Pay</label>
          <input
            type="text"
            placeholder="Enter number of months to pay"
            id="months"
            name="months"
            required
          />
          <p className="error-text">not all</p>
        </div>
        <div className="input-set">
          <label htmlFor="amount">Months to Pay</label>
          <input
            type="text"
            placeholder="Calculating..."
            id="amount"
            name="amount"
            required
            disabled
          />
        </div>
        <button type="submit">Pay</button>
      </form>
    </div>
  );
}

const style = css`
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

import { css } from "@emotion/react";

const options = {
  month: "short",
  year: "numeric",
};
const options2 = {
  day: "2-digit",
  month: "short",
  year: "numeric",
};

const dateFormat = new Intl.DateTimeFormat("en-GB", options);
const dateFormat2 = new Intl.DateTimeFormat("en-GB", options2);

// function

function TransactionRecord({ date, id, month, year }) {
  const billFor = dateFormat
    .format(new Date(year, month))
    .replace(/\s+/g, ", ");
  const billDate = dateFormat2.format(new Date(date)).replace(/\s+/g, "-");
  return (
    <div className="rTableRow" css={styles}>
      <div className="rTableCell paymentFor">{billFor}</div>
      <div className="rTableCell paymentDate">{billDate}</div>
      <div className="rTableCell paymentId">{id}</div>
      <div className="rTableCell paymentAmount">500</div>
    </div>
  );
}

const styles = css`
  color: cornsilk;
  opacity: 0.7;
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  &:hover {
    background: rgba(0, 0, 0, 0.4);
  }
  @media (max-width: 768px) {
    .paymentFor {
      font-size: 12px;
      display: block;
    }
    .paymentDate {
      font-size: 20px;
      display: block;
      float: left;
      font-weight: bold;
    }
    .paymentAmount {
      font-size: 20px;
      float: right;
      font-weight: bold;
    }
    .paymentMethod {
      font-size: 12px;
      display: block;
      float: none;
      clear: both;
    }
    .paymentId {
      font-size: 12px;
      position: absolute;
      top: 10px;
      right: 10px;
    }
    .paymentNotes {
      font-size: 12px;
      display: inline-block;
      float: left;
    }
    .paymentActions {
      font-size: 12px;
      display: block;
      float: none;
      clear: both;
    }
    .paymentActions a {
      display: block;
      text-align: center;
    }
  }
`;

export default TransactionRecord;

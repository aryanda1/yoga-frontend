import { css } from "@emotion/react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import TransactionRecord from "./TransactionRecord";
import { useState } from "react";
const trans = [
  {
    id: 1,
    date: "12/9/2023",
    paymentMonthYear: [
      { month: 2, year: 2023 },
      { month: 3, year: 2023 },
    ],
  },
  { id: 2, date: "12/10/2023", paymentMonthYear: [{ month: 4, year: 2023 }] },
  {
    id: 3,
    date: "12/11/2023",
    paymentMonthYear: [
      { month: 5, year: 2023 },
      { month: 6, year: 2023 },
    ],
  },
];
export default function TransactionHistory() {
  const [sort, setSort] = useState(true);
  const [filter, setFilter] = useState(1);
  function handleSortChange(event) {
    setSort(event.target.value);
  }
  function handleFilterChange(event) {
    setFilter(event.target.value);
  }
  return (
    <div css={styles}>
      <h1>Recent Transactions</h1>
      <div className="actions">
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="sort-label" sx={{ color: "rgba(255,255,255,0.5)" }}>
            Sort
          </InputLabel>
          <Select
            labelId="sort-label"
            id="sort-select-helper"
            value={sort}
            label="Sort"
            onChange={handleSortChange}
            sx={{ color: "rgba(255,255,255,0.8)" }}
          >
            <MenuItem value={true}>Sort by Date (Decreasing)</MenuItem>
            <MenuItem value={false}>Sort by Date (Increasing)</MenuItem>
          </Select>
          {/* <FormHelperText>With label + helper text</FormHelperText> */}
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="filter-label" sx={{ color: "rgba(255,255,255,0.5)" }}>
            Filter
          </InputLabel>
          <Select
            labelId="filter-label"
            id="filter-select-helper"
            value={filter}
            label="Filter"
            onChange={handleFilterChange}
            sx={{ color: "rgba(255,255,255,0.8)" }}
          >
            <MenuItem value={1}>This Year</MenuItem>
            <MenuItem value={2}>2022</MenuItem>
            <MenuItem value={3}>2021</MenuItem>
          </Select>
          {/* <FormHelperText>With label + helper text</FormHelperText> */}
        </FormControl>
      </div>
      <div className="rTable">
        <div className="rTableHeader">
          <div className="rTableRow">
            <div className="rTableCell">Bill Period</div>
            <div className="rTableCell">Transaction Date</div>
            <div className="rTableCell">Transaction Id</div>
            <div className="rTableCell">Amount (₹)</div>
          </div>
        </div>
        {trans.length > 0 && (
          <div className="rTableBody">
            {trans.map((tran) =>
              tran.paymentMonthYear.map((pmy) => (
                <TransactionRecord
                  key={tran.id}
                  id={tran.id}
                  date={tran.date}
                  month={pmy.month}
                  year={pmy.year}
                />
              ))
            )}
          </div>
        )}
      </div>
      {trans.length === 0 && (
        <p className="error-text">No Transactions Found!</p>
      )}
    </div>
  );
}

const styles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  .error-text {
    font-size: 1.2rem;
    font-weight: 500;
    margin-top: 2rem;
    text-align: center;
  }
  .actions {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    & > * {
      fieldset {
        border-color: rgba(255, 255, 255, 0.5);
      }
      &:hover fieldset {
        border-color: rgba(255, 255, 255, 0.8);
      }
      .Mui-focused {
        color: white;
        fieldset {
          border-color: white;
        }
      }
    }
  }
  .rTable {
    display: table;
    width: 80vw;
    max-width: 900px;
    border-collapse: collapse;
  }
  .rTableHeader {
    display: table-header-group;
    background-color: #ccc;
    font-size: 1.25rem;
    font-weight: 500;
  }
  .rTableBody {
    display: table-row-group;
  }
  .rTableRow {
    display: table-row;
    position: relative;
    text-align: center;
  }
  .rTableRow:before,
  .rTableRow:after {
    display: table;
    content: "";
  }
  .rTableRow:after {
    clear: both;
  }
  .rTableCell {
    display: table-cell;
    vertical-align: top;
    padding: 12px 0px;
    border-bottom: 1px solid #eee;
  }
  @media (max-width: 768px) {
    .rTableHeader {
      display: none;
    }
    .rTableRow {
      display: block;
      padding: 10px;
      border-bottom: 1px solid #ccc;
      text-align: left;
    }
    .rTableCell {
      display: block;
      border: none;
    }
  }
`;

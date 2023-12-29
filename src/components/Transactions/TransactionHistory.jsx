import { css } from "@emotion/react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import TransactionRecord from "./TransactionRecord";
import { useEffect, useState } from "react";
import useAuth from "../../customHooksAndServices/authContextHook";

export default function TransactionHistory() {
  const [sort, setSort] = useState(true); //true for sort in descending order, false for sort in ascending order

  const [filter, setFilter] = useState(0);
  const [filtered, setFiltered] = useState([]);
  const [processed, setProcessed] = useState([]);

  const { payments } = useAuth().user;

  useEffect(() => {
    setFiltered(payments.slice(0, 10));
  }, []);
  useEffect(() => {
    if (sort) setProcessed(filtered);
    else
      setProcessed(
        filtered.map((t, idx, array) => array[array.length - 1 - idx])
      );
  }, [filtered, sort]);

  useEffect(() => {
    if (filter === 0) {
      setFiltered(payments.slice(0, 10));
    } else if (filter === 1)
      setFiltered(
        payments.filter(
          (t) => new Date(t.date).getFullYear() === new Date().getFullYear()
        )
      );
    else if (filter === 2)
      setFiltered(
        payments.filter((t) => new Date(t.date).getFullYear() === 2022)
      );
    else if (filter === 3)
      setFiltered(
        payments.filter((t) => new Date(t.date).getFullYear() === 2021)
      );
  }, [filter]);
  console.log(processed, filtered);
  function handleSortChange(event) {
    if (event.target.value === "" || event.target.value === sort) return;
    setSort(event.target.value);
  }
  function handleFilterChange(event) {
    if (event.target.value === "" || event.target.value === filter) return;
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
        <FormControl sx={{ m: 1, minWidth: 210 }}>
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
            <MenuItem value={0}>Last 10 transactions</MenuItem>
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
        {processed.length > 0 && (
          <div className="rTableBody">
            {processed.map((tran) => (
              <TransactionRecord
                key={Math.random().toString().substring(0, 10)}
                id={tran.id}
                date={tran.date}
                month={tran.month}
                year={tran.year}
              />
            ))}
          </div>
        )}
      </div>
      {processed.length === 0 && (
        <p className="error-text">No Transactions Found!</p>
      )}
    </div>
  );
}

const styles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 90%;
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
    margin-bottom: 1.5rem;
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
  @media (max-width: 630px) {
    .actions {
      justify-content: center;
      margin-bottom: 1rem;
      & > * {
        width: 80%;
      }
    }
  }
`;

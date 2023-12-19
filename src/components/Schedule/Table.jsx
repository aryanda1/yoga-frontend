import { css } from "@emotion/react";

import React, { useState } from "react";

const Table = ({ day }) => {
  return (
    <table css={styles}>
      <tbody>
        <tr>
          <td>Class Name</td>
          <td>Timing</td>
          <td>Teacher</td>
          <td>Fees</td>
        </tr>
        <tr>
          <td>Morning Sadhana</td>
          <td>06:00AM - 07:00AM</td>
          <td>Prasant Jakhmala</td>
          <td>Rs 500</td>
        </tr>
        <tr>
          <td>Hath Yoga</td>
          <td>07:00AM - 08:00AM</td>
          <td>Subham Uniyal</td>
          <td>Rs 500</td>
        </tr>
        <tr>
          <td>Soulful Asanas</td>
          <td>10:00AM - 11:00AM</td>
          <td>Shivam Joshi</td>
          <td>Rs 500</td>
        </tr>
        <tr>
          <td>Women Wellness </td>
          <td>05:00PM - 06:00PM</td>
          <td>Taniya</td>
          <td>Rs 500</td>
        </tr>
      </tbody>
    </table>
  );
};

const styles = css`
  border-collapse: collapse;
  color: #fff;
  margin: 30px 0 0 0;
  td,
  th {
    border: 1px solid #fff;
    border-collapse: collapse;
  }
  tr {
    td {
      padding: 40px 0;
      width: 200px;
      span {
        opacity: 1;
        transition: opacity 900ms ease-in-out;
      }
    }
  }
  .hidden {
    opacity: 0;
  }
  @media (max-width: 640px) {
    font-size: 12px;
    tr {
      td {
        padding: 40px 0;
        width: 200px;
        span {
          font-size: 11px;
        }
      }
    }
  }
`;

export default Table;

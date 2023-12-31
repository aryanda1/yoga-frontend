import { css } from "@emotion/react";

const Output = ({ title, info, img }) => (
  <div css={styles} className="output">
    <img src={img} alt="class" loading="lazy" />
    <h2>{title}</h2>
    <p>{info}</p>
  </div>
);

const styles = css`
  text-align: left;
  img {
    width: 100%;
    height: 330px;
    display: block;
    object-fit: cover;
  }
  h2 {
    margin: 34px 0 0 0;
    font-size: 22px;
    font-weight: 600;
    line-height: 1;
  }
  p {
    margin: 20px 0;
  }
  .btn {
    padding: 14px 26px;
  }
  @media (max-width: 900px) {
    img {
      height: 260px;
    }
  }
`;

export default Output;

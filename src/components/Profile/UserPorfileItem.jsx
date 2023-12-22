import { css } from "@emotion/react";
import { Button } from "@mui/material";
import { useState } from "react";
function UserProfileItem({ title, desc, hideBtn, name, updateHandler }) {
  console.log(updateHandler, name);
  const [showForm, setShowForm] = useState(false);
  function formToggler() {
    setShowForm((prev) => !prev);
  }

  return (
    <div
      css={styles}
      className={`user-profile-item ${showForm ? "active" : ""}  `}
    >
      <div className="title">{title}</div>
      <div className="description">
        {showForm ? (
          <EditForm
            value={desc}
            cancelBtnHandler={formToggler}
            name={name}
            handleUpdate={updateHandler}
          />
        ) : (
          desc
        )}
      </div>
      <div className="right-wrapper">
        {!hideBtn && !showForm && (
          <Button
            sx={{ padding: 0 }}
            css={btnStyleSecondary}
            onClick={formToggler}
          >
            Edit
          </Button>
        )}
      </div>
    </div>
  );
}

function EditForm({ value, cancelBtnHandler, name, handleUpdate }) {
  const [defaultValue, updateValue] = useState(value);
  async function saveBtnHandler() {
    await handleUpdate(name, defaultValue);
    cancelBtnHandler();
  }
  return (
    <div css={styles2}>
      <input
        type="text"
        value={defaultValue}
        onChange={(e) => updateValue(e.target.value)}
        autoFocus
      />
      <div className="action">
        <Button
          variant="contained"
          sx={{ padding: "3px 0", mr: 1 }}
          css={btnStyleContained}
          onClick={saveBtnHandler}
        >
          Save
        </Button>
        <Button css={btnStyleSecondary} onClick={cancelBtnHandler}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

const styles = css`
  &.active {
    background: #fafafa;
  }
  position: relative;
  display: flex;
  gap: 20px;
  padding: 12px;
  border-bottom: 1px solid #eee;
  font-size: 14px;
  .title {
    width: 200px;
    color: rgba(0, 0, 0, 0.65);
  }
  .description {
    color: #797979;
    width: calc(80% - 200px);
    overflow-wrap: break-word;
  }
  .right-wrapper {
    flex: 1 1 20%;
    text-align: right;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    .right-wrapper {
      position: absolute;
      right: 0;
    }
  }
`;

const styles2 = css`
  input {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 4px 10px;
    color: #333;
  }
  .action {
    margin-top: 12px;
    font-size: 13px;
    & > * {
      font-size: inherit;
    }
  }
`;

const btnStyleSecondary = css`
  color: #ed563b;
  &:hover {
    background: hsl(9, 83%, 95%);
  }
`;
const btnStyleContained = css`
  background: #ed563b;
  &:hover {
    background: hsl(9, 83%, 48%);
  }
`;

export default UserProfileItem;
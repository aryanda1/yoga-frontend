import { css } from "@emotion/react";
import { Button } from "@mui/material";

import {
  RadioGroup,
  FormControl,
  FormLabel,
  Grid,
  Radio,
  FormControlLabel,
} from "@mui/material";
import { useState, useRef } from "react";
function UserProfileItem({ title, desc, hideBtn, name, updateHandler, val }) {
  // console.log(name, val);
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
            value={name === "nextBatch" ? val : desc}
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

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,4}$/;
const NAME_REGEX = /^[A-Z]+$/i;

function EditForm({ value, cancelBtnHandler, name, handleUpdate }) {
  const [curValue, updateValue] = useState(value);
  const [requestInProgress, setRequestInProgress] = useState(false);
  const [helperText, setHelperText] = useState("");
  const inputRef = useRef(null);
  function focus() {
    if (inputRef.current) inputRef.current.focus();
  }
  async function saveBtnHandler() {
    if (curValue === value) {
      setHelperText("No changes made");
      focus();
      return;
    }
    if (curValue === "") {
      focus();
      setHelperText("Field cant be empty!");
      return;
    }
    if (
      (name == "firstName" || name == "lastName") &&
      !NAME_REGEX.test(curValue)
    ) {
      focus();
      setHelperText("Only alphabets allowed!");
      return;
    }
    if ((name == "firstName" || name == "lastName") && curValue.length < 3) {
      focus();
      setHelperText("Field must be atleast 3 characters long!");
      return;
    }
    if (name == "email" && !EMAIL_REGEX.test(curValue)) {
      focus();
      setHelperText("Invalid email!");
      return;
    }
    if (name == "password" && !PWD_REGEX.test(curValue)) {
      focus();
      setHelperText(
        "Password must contain atleast one uppercase letter, one lowercase letter, one number and one special character!"
      );
      return;
    }
    setRequestInProgress(true);
    await handleUpdate(name, curValue);
    setRequestInProgress(false);
    cancelBtnHandler();
  }
  function changeHandler(e) {
    setHelperText("");
    updateValue(e.target.value);
  }
  return (
    <div css={styles2}>
      {name == "nextBatch" ? (
        <FormControl
          sx={{
            display: "grid",
            justifyItems: "center",
          }}
        >
          <FormLabel
            id="demo-form-control-label-placement"
            sx={{
              justifySelf: "start",
              // color: "#ed563b",
              // "&.Mui-disabled": { color: "#ed563b" },
              // "&.Mui-focused": { color: "ed563b" },
            }}
            disabled={true}
          >
            Select Batch Timing
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-form-control-label-placement"
            name="batch"
            defaultValue="top"
          >
            <Grid container spacing={0.5}>
              <Grid item xs={6}>
                <FormControlLabel
                  value="1"
                  control={<Radio onChange={changeHandler} color="secondary" />}
                  checked={curValue === "1"}
                  label="6-7AM"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  value="2"
                  control={<Radio onChange={changeHandler} color="secondary" />}
                  checked={curValue === "2"}
                  label="7-8AM"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  value="3"
                  control={<Radio onChange={changeHandler} color="secondary" />}
                  checked={curValue === "3"}
                  label="8-9AM"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  value="4"
                  control={<Radio onChange={changeHandler} color="secondary" />}
                  checked={curValue === "4"}
                  label="5-6PM"
                />
              </Grid>
            </Grid>
          </RadioGroup>
        </FormControl>
      ) : (
        <input
          type="text"
          value={curValue}
          onChange={(e) => updateValue(e.target.value)}
          onBlur={() => setHelperText("")}
          autoFocus
          ref={inputRef}
        />
      )}
      <div style={{ color: "red", marginBottom: "5px" }}>{helperText}</div>
      <div className="action">
        <Button
          variant="contained"
          sx={{
            padding: "3px 0",
            mr: 1,
            "&.Mui-disabled": {
              pointerEvents: "visible",
              cursor: "not-allowed",
            },
          }}
          css={btnStyleContained}
          onClick={saveBtnHandler}
          disabled={requestInProgress}
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
    align-items: unset;
  }
  position: relative;
  display: flex;
  align-items: center;
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
  @media (max-width: 800px) {
    flex-direction: column;
    align-items: baseline;
    .description {
      width: 100%;
    }
    .right-wrapper {
      position: absolute;
      right: 0;
    }
  }
`;

const styles2 = css`
  input:not[type='radio] {
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

import * as React from "react";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/joy/styles";
import Textarea from "@mui/joy/Textarea";
import { FormControl, FormLabel, FormHelperText } from "@mui/joy";

const StyledTextarea = styled(TextareaAutosize)({
  resize: "none",
  border: "none", // remove the native textarea border
  minWidth: 0, // remove the native textarea width
  outline: 0, // remove the native textarea outline
  padding: 0, // remove the native textarea padding
  paddingBlockStart: "1em",
  paddingInlineEnd: `var(--Textarea-paddingInline)`,
  flex: "auto",
  alignSelf: "stretch",
  color: "inherit",
  backgroundColor: "transparent",
  fontFamily: "inherit",
  fontSize: "inherit",
  fontStyle: "inherit",
  fontWeight: "inherit",
  lineHeight: "inherit",
  "&::placeholder": {
    opacity: 0,
    transition: "0.1s ease-out",
  },
  "&:focus::placeholder": {
    opacity: 1,
  },
  // specific to TextareaAutosize, cannot use '&:focus ~ label'
  "&:focus + textarea + label, &:not(:placeholder-shown) + textarea + label": {
    top: "0.5rem",
    fontSize: "0.75rem",
  },
  "&:focus + textarea + label": {
    color: "var(--Textarea-focusedHighlight)",
  },
});

const StyledLabel = styled("label")(({ theme }) => ({
  position: "absolute",
  lineHeight: 1,
  top: "calc((var(--Textarea-minHeight) - 1em) / 2)",
  color: theme.vars.palette.text.tertiary,
  fontWeight: theme.vars.fontWeight.md,
  transition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
}));

const InnerTextarea = React.forwardRef(function InnerTextarea(props, ref) {
  const id = React.useId();
  const { label, ...restProps } = props;
  return (
    <>
      <StyledTextarea minRows={10} {...restProps} ref={ref} id={id} />
      <StyledLabel htmlFor={id}>{label}</StyledLabel>
    </>
  );
});

export default function TextArea({
  label,
  placeholder,
  styles,
  helperText,
  name,
  onChangeHandler,
  value,
  err = false,
}) {
  function onChangeHand(e) {
    e.target.name = name;
    onChangeHandler(e);
  }
  return (
    <FormControl sx={{ ...styles }}>
      <Textarea
        slots={{ textarea: InnerTextarea }}
        slotProps={{
          textarea: { placeholder: "Enter your message here... ", label },
        }}
        sx={{ borderRadius: "6px" }}
        error={err}
        onChange={onChangeHand}
        value={value}
      />
      <FormHelperText>{helperText && helperText}</FormHelperText>
    </FormControl>
  );
}

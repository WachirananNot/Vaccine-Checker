import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { closeDialog } from "../../redux/slices/inputDataSlice";
import { Link } from "react-router-dom";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CheckingInputDialog() {
  const openDialog = useAppSelector((state) => state.inputItems.openDialog);
  const dispatch = useAppDispatch();
  return (
    <Dialog
      open={openDialog}
      TransitionComponent={Transition}
      keepMounted
      fullWidth
      maxWidth="xs"
      onClose={() => {
        dispatch(closeDialog());
      }}
    >
      <DialogTitle>{"ยืนยันข้อมูล"}</DialogTitle>
      <DialogActions>
        <Button
          component={Link}
          to="/result"
          onClick={() => {
            dispatch(closeDialog());
          }}
        >
          ตรวจสอบ
        </Button>
      </DialogActions>
    </Dialog>
  );
}

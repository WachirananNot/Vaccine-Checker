import {
  Autocomplete,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import  { Dayjs } from "dayjs";
import { useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { openDialog, saveInput } from "../../redux/slices/inputDataSlice";
import CheckingInputDialog from "../checkingInputDialog";

export default function InputPage() {
  const dispatch = useAppDispatch();

  const [fullname, setFullname] = useState("");
  const [idcard, setIdcard] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState<Dayjs | null>(null);

  const [errorName, setErrorName] = useState("");
  const [errorId, setErrorId] = useState("");
  const [errorGender, setErrorGender] = useState("");
  const [errorDate, setErrorDate] = useState(false);
  const formatIdCard = (value: string) => {
    const cleaned = ("" + value).replace(/\D/g, "");
    const match = cleaned.match(
      /^(\d{1})(\d{0,4})(\d{0,5})(\d{0,2})(\d{0,1})$/
    );
    if (match) {
      return [match[1], match[2], match[3], match[4], match[5]]
        .filter((group) => group !== "")
        .join("-");
    }
    return value;
  };

  const validateFields = async (initialValidation = false) => {
    let isPass = true;

    if (!initialValidation) {
      if (fullname.trim().length === 0) {
        setErrorName("กรุณาระบุชื่อ - นามสกุล");
        isPass = false;
      } else if (
        !/^[\u0E00-\u0E7F\u0041-\u005A\u0061-\u007A\s]+$/.test(fullname.trim())
      ) {
        setErrorName("กรุณาระบุเป็นภาษาไทย หรือภาษาอังกฤษเท่านั้น");
      } else {
        setErrorName("");
      }
      if (idcard.trim().length === 0) {
        setErrorId("กรุณาระบุเลขบัตรประชาชน");
        isPass = false;
      } else if (idcard.trim().length < 17) {
        setErrorId("กรุณาระบุเลขบัตรประชาชนให้ถูกต้อง");
        isPass = false;
      } else {
        setErrorId("");
      }
      if (gender.trim().length === 0) {
        setErrorGender("กรุณาระบุเพศ");
        isPass = false;
      } else {
        setErrorGender("");
      }
      if (!birthday) {
        setErrorDate(true);
        isPass = false;
      } else {
        setErrorDate(false);
      }
    }

    return isPass;
  };
  const handleClear = () => {
    setFullname("");
    setIdcard("");
    setGender("");
    setBirthday(null);
    setErrorName("");
    setErrorId("");
    setErrorGender("");
    setErrorDate(false);
  };

  const handleSubmit = async () => {
    const isValid = await validateFields();
    if (isValid) {
      const dataJson = {
        fullname: fullname,
        idcard: idcard,
        gender: gender,
        birthday: birthday?.toISOString(),
      };
      dispatch(saveInput(dataJson));
      dispatch(openDialog());
    }
  };
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ width: "80%", height: "100%", p: { xs: 1, lg: 10 } ,py: { xs: 5} }}>
        <Typography
          sx={{
            fontSize: { xs: "16px", sm: "20px", md: "24px", lg: "30px" },
            mb: 5,
            fontWeight: 1000,
          }}
        >
          ตรวจสอบการเข้ารับวัคซีนป้องกันโควิด-19
        </Typography>

        <Box sx={{ bgcolor: "white", p: 3 }}>
          <Grid container spacing={5}>
            <Grid item xs={12} md={6} lg={6}>
              <TextField
                label="ชื่อ - นามสกุล"
                error={!!errorName}
                helperText={errorName}
                fullWidth
                value={fullname}
                onChange={(e: any) => {
                  setFullname(e.target.value);
                  setErrorName("");
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <TextField
                label="เลขบัตรประชาชน"
                error={!!errorId}
                helperText={errorId}
                fullWidth
                value={idcard}
                onChange={(e: any) => {
                  setIdcard(formatIdCard(e.target.value.replace(/\D/g, "")));
                  setErrorId("");
                }}
                inputProps={{ maxLength: 17 }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Autocomplete
                disablePortal
                id="gender-box"
                options={["ชาย", "หญิง"]}
                value={gender}
                onChange={(event, value) => {
                  setGender(value || "");
                  setErrorGender("");
                }}
                isOptionEqualToValue={(option, value) =>
                  option === value || value === ""
                }
                renderInput={(params) => (
                  <TextField
                    error={!!errorGender}
                    helperText={errorGender}
                    {...params}
                    label="เพศ"
                    InputLabelProps={{
                      style: { textAlign: "center" },
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="วัน/เดือน/ปี เกิด (ค.ศ.)"
                  format="DD/MM/YYYY"
                  value={birthday}
                  onChange={(newValue: Dayjs | null) => {
                    setBirthday(newValue);
                    setErrorDate(false);
                  }}
                  disableFuture
                  sx={{ width: "100%" }}
                  slotProps={{
                    textField: {
                      error: errorDate,
                      helperText: errorDate ? "กรุณาระบุวันที่" : "",
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: { xs: "space-around", lg: "end" },
                }}
              >
                <Button
                  variant="contained"
                  color="error"
                  sx={{
                    mr: { xs: 1, md: 5, lg: 1 },
                    width: { xs: "100%", lg: "10%" },
                  }}
                  onClick={handleClear}
                >
                  ล้างค่า
                </Button>
                <Button
                  variant="contained"
                  sx={{ width: { xs: "100%", lg: "10%" } }}
                  onClick={handleSubmit}
                >
                  ยืนยัน
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <CheckingInputDialog />
    </Box>
  );
}

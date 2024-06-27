import { Autocomplete, Box, Grid, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function InputPage() {
  return (
    <>
      <Box sx={{ width: "80%", p: 10 }}>
        <Typography
          sx={{
            fontSize: { xs: "16px", sm: "20px", md: "24px", lg: "30px" },
            mb: 5,
            fontWeight: 1000,
          }}
        >
          ตรวจสอบการเข้ารับวัคซีนป้องกันโควิด 19
        </Typography>

        <Box sx={{ bgcolor: "white", p: 3 }}>
          <Grid container spacing={5}>
            <Grid item xs={12} md={6} lg={12}>
              <TextField label="ชื่อ - นามสกุล" fullWidth></TextField>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <TextField label="เลขบัตรประชาชน" fullWidth></TextField>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Autocomplete
                disablePortal
                id="gender-box"
                options={["ชาย", "หญิง"]}
                // onChange={(event, value) => {
                //   setEmpPosition(value || "");
                //   setErrorPosition(!value);
                // }}

                renderInput={(params) => (
                  <TextField
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
                  disableFuture
                  sx={{ width: "100%" }}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

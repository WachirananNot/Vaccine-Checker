import { Box, Button, Grid, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Link } from "react-router-dom";
import { clearInput, closeDialog } from "../../redux/slices/inputDataSlice";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import duration from "dayjs/plugin/duration";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(duration);
dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

export default function ResultPage() {
  const inputData = useAppSelector((state) => state.inputItems.inputData);
  const changeDateTimeZone = (date: any) => {
    return dayjs(date).tz("Asia/Bangkok").format("DD/MM/YYYY").split("/");
  };
  const dayThai = changeDateTimeZone(inputData.birthday);
  const arrayMonthThai = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];
  const dispatch = useAppDispatch();
  const calDifDate = () => {
    const birthday = dayjs(inputData.birthday);
    const today = dayjs();
    const years = today.diff(birthday, "year");
    const months = today.diff(birthday.add(years, "year"), "month");
    if (
      years >= 65 ||
      (years === 0 && months >= 6) ||
      (years > 0 && years <= 2)
    ) {
      return true;
    } else {
      return false;
    }
  };
  const rangeAge = () => {
    const birthday = dayjs(inputData.birthday);
    const today = dayjs();
    const years = today.diff(birthday, "year");
    var text = "";
    const months = today.diff(birthday.add(years, "year"), "month");
    if (years === 0 && months < 6) {
      const sixmonths = birthday.add(6, "month");
      const dayThai = changeDateTimeZone(sixmonths);
      text = `เนื่องจากอายุจะครบ 6 เดือน วันที่ ${dayThai[0]} ${
        arrayMonthThai[parseInt(dayThai[1]) - 1]
      } พ.ศ. ${parseInt(dayThai[2]) + 543}`;
    } else if (years > 2) {
      const sixfiveyears = birthday.add(65, "year");
      const dayThai = changeDateTimeZone(sixfiveyears);
      text = `เนื่องจากอายุจะครบ 65 ปี วันที่ ${dayThai[0]} ${
        arrayMonthThai[parseInt(dayThai[1]) - 1]
      } พ.ศ. ${parseInt(dayThai[2]) + 543}`;
    }
    return text;
  };
  const isVaccine = calDifDate();
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ width: "80%", height: "100%", p: { xs: 1, lg: 10 } ,py: { xs: 5}}}>
        <Button
          component={Link}
          to="/input"
          variant="text"
          sx={{
            fontSize: { xs: "16px", sm: "20px", md: "20px", lg: "20px" },
            fontWeight: 400,

            textTransform: "none",
            ml: -1,
          }}
          onClick={() => {
            dispatch(clearInput());
            dispatch(closeDialog());
          }}
        >
          {"<"} ย้อนกลับ
        </Button>
        <Typography
          sx={{
            fontSize: { xs: "16px", sm: "20px", md: "24px", lg: "30px" },
            mb: 3,
            fontWeight: 1000,
          }}
        >
          ผลการตรวจสอบการเข้ารับวัคซีนป้องกันโควิด-19
        </Typography>

        <Box sx={{ bgcolor: "white", p: 3 }}>
          <Grid container spacing={5}>
            <Grid container item xs={12} sm={6} md={6} lg={6}>
              <Grid item xs={12} sm={12} md={4} lg={5}>
                <Typography>ชื่อ - นามสกุล : </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={8} lg={7}>
                <Typography>{inputData.fullname}</Typography>
              </Grid>
            </Grid>
            <Grid container item xs={12} sm={6} md={6} lg={6}>
              <Grid item xs={12} sm={12} md={6} lg={5}>
                <Typography>เลขบัตรประชาชน : </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={7}>
                <Typography>{inputData.idcard}</Typography>
              </Grid>
            </Grid>
            <Grid container item xs={12} sm={6} md={6} lg={6}>
              <Grid item xs={12} sm={6} md={4} lg={5}>
                <Typography>เพศ : </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={8} lg={7}>
                <Typography>{inputData.gender}</Typography>
              </Grid>
            </Grid>
            <Grid container item xs={12} sm={6} md={6} lg={6}>
              <Grid item xs={12} sm={12} md={6} lg={5}>
                <Typography>วัน/เดือน/ปี เกิด : </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={7}>
                <Typography>
                  {dayThai[0]} {arrayMonthThai[parseInt(dayThai[1]) - 1]}{" "}
                  {parseInt(dayThai[2]) + 543}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        {isVaccine ? (
          <Typography
            sx={{
              mt: 3,
              color: "green",
              fontSize: { xs: "16px", sm: "20px", md: "20px", lg: "20px" },
            }}
          >
            สามารถเข้ารับบริการได้
          </Typography>
        ) : (
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <Typography
                sx={{
                  mt: 3,
                  color: "red",
                  fontSize: { xs: "16px", sm: "20px", md: "20px", lg: "20px" },
                  mr: 1,
                }}
              >
                ไม่สามารถเข้ารับบริการได้
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={8}>
              <Typography
                sx={{
                  mt: 3,

                  fontSize: { xs: "16px", sm: "20px", md: "20px", lg: "20px" },
                }}
              >
                {rangeAge()}
              </Typography>
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
}

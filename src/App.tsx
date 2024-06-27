import "./App.css";
import { Box, CssBaseline } from "@mui/material";
import InputPage from "./components/InputPage";
import { Navigate, Route, Routes } from "react-router-dom";
import ResultPage from "./components/resultPage";
import { useAppSelector } from "./redux/hooks";

function App() {
  const inputData = useAppSelector((state) => state.inputItems.inputData);
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",

          bgcolor: "#DFEDF3",
        }}
      >
        <Routes>
          <Route path="/" element={<Navigate to="/input" />} />
          <Route path="/input" element={<InputPage />} />
          <Route
            path="/result"
            element={
              Object.keys(inputData).length !== 0 ? (
                <ResultPage />
              ) : (
                <Navigate to="/input" />
              )
            }
          />
        </Routes>
      </Box>
    </>
  );
}

export default App;

import "./App.css";
import { Box } from "@mui/material";
import InputPage from "./components/InputPage";

function App() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        bgcolor: "#DFEDF3",
      }}
    >
      <InputPage />
    </Box>
  );
}

export default App;

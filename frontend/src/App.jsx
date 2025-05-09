import React, { useState, useMemo } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
// import { useProductStore } from "../store/product";

function App() {
  // const {products} =useProductStore
  const [mode, setMode] = useState("light");

  const theme = useMemo(
    () => createTheme({ palette: { mode } }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar colorMode={mode} toggleColorMode={() => setMode(mode === "light" ? "dark" : "light")} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;

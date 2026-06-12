import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./librarys/dayjs.ts"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")!).render(
  <LocalizationProvider dateAdapter={AdapterDayjs} >
    <App />
    <ToastContainer/>
  </LocalizationProvider>,
);

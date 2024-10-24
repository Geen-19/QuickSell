import DashBoard from "./components/DashBoard";
import NavBar from "./components/NavBar";
import "boxicons/css/boxicons.min.css";
import { BoardProvider } from "./context/BoardContext";
import './App.css'
// copilot

function App() {
  return (
    <>
      <BoardProvider>
        <NavBar />
        <DashBoard />
      </BoardProvider>
    </>
  );
}

export default App;

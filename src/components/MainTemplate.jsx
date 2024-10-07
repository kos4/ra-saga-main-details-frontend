import { Outlet } from "react-router-dom";
import Menu from "./Menu";

export default function MainTemplate() {
  return (
    <div className="App">
      <Menu/>
      <Outlet/>
    </div>
  );
}
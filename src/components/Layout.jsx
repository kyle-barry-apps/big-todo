import { useContext, useState } from "react";
import Navigation from "./navigation/Navigation";
import Header from "./header/Header";
import TodoSection from "./todoSection/TodoSection";
import { ModalContext } from "../contexts/ModalContext";
import "./layout.css";
import AddBoard from "./modals/AddBoard/AddBoard";
import DeleteBoard from "./modals/DeleteBoard/DeleteBoard";
import EditBoard from "./modals/EditBoard/EditBoard";
import AddColumn from "./modals/AddColumn/AddColumn";

const Layout = () => {
  const { modal } = useContext(ModalContext);
  const [showNav, setShowNav] = useState(true);

  return (
    <>
      {modal === "addColumn" && <AddColumn />}
      {modal === "editBoard" && <EditBoard />}
      {modal === "addBoard" && <AddBoard />}
      {modal === "deleteBoard" && <DeleteBoard />}
      {modal && <div className="overlay"></div>}
      <div className={showNav ? "layout" : "layout hidden-nav"}>
        <div
          onClick={() => setShowNav(true)}
          className={showNav ? "nav__show-sidebar" : "nav__show-sidebar active"}
        >
          <img src="./assets/icon-show-sidebar.svg" alt="show sidebar icon" />
        </div>
        <Navigation showNav={showNav} setShowNav={setShowNav} />
        <Header />
        <TodoSection />
      </div>
    </>
  );
};

export default Layout;

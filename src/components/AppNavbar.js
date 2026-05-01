import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import {
  DatabaseFillCheck,
  GlobeAmericasFill,
  Diagram3Fill,
  Calendar2WeekFill,
  PeopleFill,
  FileEarmarkRuledFill,
  Sliders,
  CloudArrowDownFill,
  GearFill,
  WalletFill,
} from "react-bootstrap-icons";
import { NavDropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectNearestGamePot } from "store/gameSlice";
import { selectTotalBalance } from "store/playerSlice";

export const AppNavbar = ({ contestName }) => {
  const nearestJackpot = useSelector(selectNearestGamePot);
  const totalBalance = useSelector(selectTotalBalance);
  console.log(nearestJackpot);
  return (
    <>
      <Navbar
        bg="dark"
        data-bs-theme="dark"
        className="mb-3"
        sticky="top"
        style={{ width: "100%" }}
      >
        <Container>
          <Navbar.Brand>
            <GlobeAmericasFill
              color="#81e8f6"
              size={24}
              className=" align-top "
            />
            <span style={{ margin: "auto 15px", color: "coral" }}>
              {contestName}
            </span>
          </Navbar.Brand>
          <Nav className="me-auto" style={{ margin: "0 10rem 0 4rem" }}>
            <Nav.Link as={NavLink} to="/">
              <Diagram3Fill className="navbarIcons" size={20} /> Турнір
            </Nav.Link>
            <Nav.Link as={NavLink} to="/games">
              <Calendar2WeekFill className="navbarIcons" size={20} /> Матчі
            </Nav.Link>
            <Nav.Link as={NavLink} to="/players">
              <PeopleFill className="navbarIcons" size={20} /> Прогнозисти
            </Nav.Link>
            <Nav.Link as={NavLink} to="/rules">
              <FileEarmarkRuledFill className="navbarIcons" size={20} /> Правила
            </Nav.Link>
            <GearFill
              className="settingsNavbarIcon"
              size={20}
              color="dimgray"
            />
            <NavDropdown title={` Налаштування`} id="basic-nav-dropdown">
              <NavDropdown.Item as={NavLink} to="/settings/basicParams">
                <Sliders className="navbarIcons" size={20} /> Базові параметри
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/settings/backUp">
                <CloudArrowDownFill className="navbarIcons" size={20} />{" "}
                Резервне копіювання
              </NavDropdown.Item>
            </NavDropdown>
            <Navbar.Text style={{ marginLeft: "40px" }}>
              <DatabaseFillCheck
                color="goldenRod"
                style={{ marginBottom: "5px", cursor: "pointer" }}
                title="Джекпот найближчого матчу"
              />
              <span className="currentJackpot">
                {nearestJackpot ? nearestJackpot : 0} грн
              </span>
            </Navbar.Text>
            <Navbar.Text style={{ marginLeft: "40px" }}>
              <WalletFill
                color="#8B4513"
                style={{ marginBottom: "5px", cursor: "pointer" }}
                title="Загальна сума"
              />
              <span className="totalBalance">{totalBalance} грн</span>
            </Navbar.Text>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

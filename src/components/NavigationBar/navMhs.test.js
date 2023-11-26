import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import NavMhs from "./navMhs";

describe("Navlink test", () => {
  test("Links should render correctly", () => {
    render(
      <BrowserRouter>
        <NavMhs />
      </BrowserRouter>
    );
    expect(screen.getByText("Mahasiswa")).toBeInTheDocument();
    expect(screen.getByText("Civitas")).toBeInTheDocument();
    expect(screen.getByText("Mendaftar")).toBeInTheDocument();
    expect(screen.getByText("Pendaftaran")).toBeInTheDocument();
    expect(screen.getByText("Pengumuman")).toBeInTheDocument();
  });
});
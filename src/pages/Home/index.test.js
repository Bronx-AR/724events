import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personnel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      setTimeout(() => {
        screen.findByText("Message envoyé !");
      }, 1500);
    });
  });
});

describe("When a page is created", () => {
  it("a list of events is displayed", () => {
    const { queryByTestId } = render(<Home />);
    expect(queryByTestId("events")).toBeTruthy();
  });
  it("a list of people is displayed", () => {
    render(<Home />);
    expect(screen.getByText("CEO")).toBeInTheDocument();
    expect(screen.getByText("Directeur marketing")).toBeInTheDocument();
    expect(screen.getByText("CXO")).toBeInTheDocument();
    expect(screen.getByText("Animateur")).toBeInTheDocument();
    expect(screen.getByText("VP animation")).toBeInTheDocument();
    expect(screen.getByText("VP communication")).toBeInTheDocument();
  });
  it("a footer is displayed", () => {
    const { queryByTestId } = render(<Home />);
    expect(queryByTestId(/footer/i)).toBeTruthy();
  });
  it("an event card, with the last event, is displayed", () => {
    render(<Home />);
    expect(screen.getByText("Notre dernière prestation")).toBeInTheDocument();
  });
});

import { test } from "vitest";
import { render } from "@testing-library/react";
import About from "./About";

test("Should render About page correctly", () => {
  const { container } = render(<About />);

  expect(container).toMatchSnapshot();
});

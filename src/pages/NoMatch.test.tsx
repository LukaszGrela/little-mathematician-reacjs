import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import NoMatch from "./NoMatch";

test("Should render NoMatch page correctly", () => {
  const { container } = render(<NoMatch />);

  expect(container).toMatchSnapshot();
});

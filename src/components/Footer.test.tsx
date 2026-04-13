import { vi } from "vitest";
import Footer from "./Footer";
import { render } from "@testing-library/react";

test("should render Footer correctly", () => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(Date.UTC(2018, 5, 13, 12, 0, 0, 0)));
  vi.stubEnv("VITE_VERSION", "test-0.0.1");
  const { container } = render(<Footer />);

  expect(container).toMatchSnapshot();

  vi.useRealTimers();
});

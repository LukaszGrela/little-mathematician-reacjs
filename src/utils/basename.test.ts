import { describe, expect, test } from "vitest";
import { toBasename } from "./basename";

describe("toBasename", () => {
  test("strips the trailing slash Vite appends to a sub-path base", () => {
    expect(toBasename("/little-mathematician/")).toBe("/little-mathematician");
  });

  test("keeps a base that has no trailing slash", () => {
    expect(toBasename("/little-mathematician")).toBe("/little-mathematician");
  });

  test("strips repeated trailing slashes", () => {
    expect(toBasename("/a/b///")).toBe("/a/b");
    expect(toBasename("/a/b/")).toBe("/a/b");
  });

  test("root deployment keeps the root basename", () => {
    expect(toBasename("/")).toBe("/");
    expect(toBasename("///")).toBe("/");
  });

  test("relative and empty bases fall back to the root basename", () => {
    expect(toBasename("./")).toBe("/");
    expect(toBasename(".")).toBe("/");
    expect(toBasename("little-mathematician/")).toBe("/");
    expect(toBasename("")).toBe("/");
  });

  test("does not leave a dangling slash on a nested base", () => {
    for (const baseUrl of ["/x/", "/x/y/", "/x/y/z/"]) {
      const basename = toBasename(baseUrl);

      expect(basename.endsWith("/")).toBe(false);
      expect(basename).toBe(baseUrl.slice(0, -1));
    }
  });
});

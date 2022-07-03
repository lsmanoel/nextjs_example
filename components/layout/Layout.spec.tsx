/* eslint-disable no-undef */
import {
  render,
  RenderResult,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Layout from "./Layout";

jest.mock("next-auth/react", () => {
  const originalModule = jest.requireActual("next-auth/react");
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: { username: "admin" },
  };
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return { data: mockSession, status: "authenticated" }; // return type is [] in v3 but changed to {} in v4
    }),
  };
});

jest.mock("next/router", () => ({
  useRouter() {
    return {
      replace: () => jest.fn(),
      query: {
        redirect: undefined,
      },
    };
  },
}));

type SutTypes = {
  sut: RenderResult;
};

const makeSut = (): SutTypes => {
  const sut = render(
    <Layout>
      <></>
    </Layout>
  );
  return { sut };
};

describe("Login Page Elements Test", () => {
  afterEach(cleanup);

  test("Login render test", () => {
    makeSut();
  });
});

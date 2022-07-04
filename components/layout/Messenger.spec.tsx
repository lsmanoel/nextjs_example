/* eslint-disable no-undef */
import {
  render,
  RenderResult,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Messenger from "./Messenger";
import { Props } from "./Messenger";
import { statusColor } from "lib/statusColor";
import { Props as SendEmailProps } from "lib/emailjs/sendEmail";

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

const sendEmail = ({ form, setStatus, onSubmit }: SendEmailProps) => {
  console.log("success");
  setStatus("success");
  onSubmit && onSubmit("success");
};

const makeSut = ({ hidden, onSubmit, onClear, sendEmail }: Props): SutTypes => {
  const sut = render(
    <Messenger
      hidden={hidden}
      onSubmit={onSubmit}
      onClear={onClear}
      sendEmail={sendEmail}
    ></Messenger>
  );
  return { sut };
};

describe("Messenger Components Render Test", () => {
  afterEach(cleanup);

  test("Login render test", () => {
    makeSut({ hidden: true, sendEmail });
  });

  test("Login render test", () => {
    const { sut } = makeSut({ hidden: true, sendEmail });
    const emailInput = sut.getByLabelText("Seu email:") as HTMLInputElement;
    const messengerInput = sut.getByLabelText("Mensagem:") as HTMLInputElement;
    const submitButton = sut.getByDisplayValue("Enviar") as HTMLInputElement;
    const clearButton = sut.getByDisplayValue("Limpar") as HTMLInputElement;
    expect(emailInput).toBeTruthy();
    expect(messengerInput).toBeTruthy();
    expect(submitButton).toBeTruthy();
    expect(clearButton).toBeTruthy();
  });
});

describe("Messenger Components Behavior Test", () => {
  afterEach(cleanup);

  test("Success Send Email (happy way)", async () => {
    let status: statusColor;
    const onSubmit = (_status: statusColor): void => {
      console.log(_status);
      status = _status;
    };
    const { sut } = makeSut({ hidden: true, onSubmit, sendEmail });
    const emailInput = sut.getByLabelText("Seu email:") as HTMLInputElement;
    const messengerInput = sut.getByLabelText("Mensagem:") as HTMLInputElement;
    const form = sut.getByRole("form");
    fireEvent.input(emailInput, { target: { value: "abc@abc.com" } });
    fireEvent.input(messengerInput, { target: { value: "TestText" } });
    fireEvent.submit(form);
    await waitFor(() => form);
    expect(status).toBe("success");
  });
});

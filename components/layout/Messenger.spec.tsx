/* eslint-disable no-undef */
import {
  render,
  RenderResult,
  cleanup,
  fireEvent,
  waitFor,
  screen,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { useSession } from "next-auth/react";

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

jest.mock("next-auth/react");

type SutTypes = {
  sut: RenderResult;
};

const successSendEmail = ({ form, setStatus, onSubmit }: SendEmailProps) => {
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

  test("Login Render Test", () => {
    makeSut({ hidden: true, sendEmail: successSendEmail });
  });

  test("Login Components Verify", () => {
    const { sut } = makeSut({ hidden: true, sendEmail: successSendEmail });
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
      status = _status;
    };
    const { sut } = makeSut({
      hidden: true,
      onSubmit,
      sendEmail: successSendEmail,
    });
    const emailInput = sut.getByLabelText("Seu email:") as HTMLInputElement;
    const messengerInput = sut.getByLabelText("Mensagem:") as HTMLInputElement;
    const form = sut.getByRole("form");
    fireEvent.input(emailInput, { target: { value: "abc@abc.com" } });
    fireEvent.input(messengerInput, { target: { value: "TestText" } });
    fireEvent.submit(form);
    await waitFor(() => form);
    expect(status).toBe("success");
  });

  test("Clear Form Button Test", async () => {
    const onSubmit = (): void => {};
    const { sut } = makeSut({
      hidden: true,
      onSubmit,
      sendEmail: successSendEmail,
    });
    const emailInput = sut.getByPlaceholderText(
      "Ensira o seu email..."
    ) as HTMLInputElement;
    const messengerInput = sut.getByPlaceholderText(
      "Ensira sua mensagem..."
    ) as HTMLInputElement;
    const cancelButton = sut.getByDisplayValue("Limpar");
    fireEvent.input(emailInput, { target: { value: "user@mock.com" } });
    fireEvent.input(messengerInput, { target: { value: "TestText" } });
    await waitFor(() =>
      expect(screen.queryByDisplayValue("user@mock.com")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.queryByDisplayValue("TestText")).toBeInTheDocument()
    );
    fireEvent.click(cancelButton);
    await waitFor(() =>
      expect(screen.queryByDisplayValue("TestText")).not.toBeInTheDocument()
    );
  });
});

describe("Messenger Components Behavior Test", () => {
  afterEach(cleanup);

  test("Should set email field with session email.", async () => {
    const mockSession = {
      data: {
        provider: "provider",
        user: {
          name: "Mock User",
          email: "user@mock.com",
          image: "https://user.mock-avatar.net",
        },
        expires: "2022-01-01T12:01:01.001Z",
      },
    };
    (useSession as jest.Mock).mockReturnValueOnce(mockSession);
    const onSubmit = (): void => {};
    const { sut } = makeSut({
      hidden: true,
      onSubmit,
      sendEmail: successSendEmail,
    });
    expect(screen.queryByDisplayValue("user@mock.com")).toBeInTheDocument();
  });

  test("Email field shound be empty without session.", async () => {
    const mockSession = {
      data: null,
    };
    (useSession as jest.Mock).mockReturnValueOnce(mockSession);
    const onSubmit = (): void => {};
    const { sut } = makeSut({
      hidden: true,
      onSubmit,
      sendEmail: successSendEmail,
    });
    const emailInput = sut.getByLabelText("Seu email:") as HTMLInputElement;
    expect(emailInput.value).toBe("");
  });
});

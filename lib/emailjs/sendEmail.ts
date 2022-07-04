import React, { ReactElement, useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { statusColor } from "lib/statusColor";

export interface Props {
  form: React.MutableRefObject<HTMLFormElement>;
  setStatus: React.Dispatch<React.SetStateAction<statusColor>>;
  onSubmit?: (status: statusColor) => void;
}

const sendEmail = ({ form, setStatus, onSubmit }: Props) => {
  emailjs
    .sendForm(
      process.env.SERVICE_ID || "",
      process.env.TEMPLATE_ID || "",
      form.current || "",
      process.env.PUBLIC_KEY || ""
    )
    .then(
      (_) => {
        setStatus("success");
        onSubmit && onSubmit("success");
      },
      (error) => {
        console.log(error.text);
        setStatus("error");
        onSubmit && onSubmit("error");
      }
    );
};

export default sendEmail;

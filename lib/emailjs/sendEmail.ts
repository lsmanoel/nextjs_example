import React, { ReactElement, useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { statusColor } from "lib/statusColor";

export interface Props {
  form: HTMLFormElement;
  setStatus?: React.Dispatch<React.SetStateAction<statusColor>>;
  onSubmit?: (status: statusColor) => void;
}

const sendEmail = ({ form, setStatus, onSubmit }: Props) => {
  emailjs
    .sendForm(
      process.env.SERVICE_ID || "",
      process.env.TEMPLATE_ID || "",
      form || "",
      process.env.PUBLIC_KEY || ""
    )
    .then(
      (_) => {
        setStatus && setStatus("success");
        onSubmit && onSubmit("success");
      },
      (error) => {
        console.log(error.text);
        setStatus && setStatus("error");
        onSubmit && onSubmit("error");
      }
    );
};

export default sendEmail;

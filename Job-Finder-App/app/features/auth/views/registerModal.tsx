"use client"

import React from "react";
import { RegistrationForm } from "../forms/registrationForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/molecules/dialog";
import { Button } from "@/app/components/atoms/button";

const RegisterModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Register</Button>
      </DialogTrigger>
      <DialogContent className="px-6">
        <DialogHeader>
          <DialogTitle>Register</DialogTitle>
          <DialogDescription>
            Please enter your information to sing up.
          </DialogDescription>
        </DialogHeader>
        <RegistrationForm />
      </DialogContent>
    </Dialog>
  );
};

export default RegisterModal;

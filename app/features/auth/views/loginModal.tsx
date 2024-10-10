"use client"

import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/app/components/molecules/dialog";
  import LoginForm from "@/app/features/auth/forms/loginForm";
  
  export default function LoginModal() {
    return (
      <Dialog>
        <DialogTrigger>Login</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login</DialogTitle>
            <DialogDescription>
              Please enter your email and password to log in.
            </DialogDescription>
          </DialogHeader>
          <LoginForm />
        </DialogContent>
      </Dialog>
    );
  }
  
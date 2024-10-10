'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/app/components/molecules/dialog";
import LoginForm from '../forms/loginForm';
import { Button } from '@/app/components/atoms/button';
import { RegistrationForm } from '../forms/registrationForm';

const AuthModal: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const openLogin = () => {
    setIsLogin(true);
    setIsOpen(true);
  };

  const openRegister = () => {
    setIsLogin(false);
    setIsOpen(true);
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <>
      <div className="flex items-center space-x-6">
        <div onClick={openLogin} className="cursor-pointer">
          Sign In
        </div>
        <Button onClick={openRegister} className="cursor-pointer">
          Sign Up
        </Button>
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isLogin ? 'Login' : 'Register'}</DialogTitle>
            <DialogDescription>
              {isLogin ? 'Please login to your account.' : 'Please register for a new account.'}
            </DialogDescription>
          </DialogHeader>
          {isLogin ? <LoginForm /> : <RegistrationForm />}
          <DialogFooter>
            <div>
              {isLogin ? <p>Dont have an Account? <a className='text-primary cursor-pointer hover:opacity-65' onClick={toggleForm}>Sign Up</a></p> : <p>Already have an Account? <a className='text-primary cursor-pointer hover:opacity-65' onClick={toggleForm}>Sign In</a></p>}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AuthModal;

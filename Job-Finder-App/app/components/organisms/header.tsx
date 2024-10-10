'use client';

import React, { useState } from 'react';
import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarContent, NavbarItem, NavbarMenu, Link, Button } from '@nextui-org/react';
import { AcmeLogo } from '../atoms/AcmeLogo.jsx';
import AuthModal from '@/app/features/auth/views/AuthModal';
import useAuthStore from '@/app/stores/useAuthStore';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/molecules/avatar';
import MobileProfile from '@/app/features/list/views/mobileProfile';
import { clearAuthCookies } from '@/app/utils/auth';

export default function GlobalHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, clearAuth } = useAuthStore((state) => ({
    user: state.user,
    clearAuth: state.clearAuth,
  }));
  const router = useRouter();

  const handleLogout = () => {
    clearAuth();
    clearAuthCookies();
    localStorage.clear();
    router.push('/');
  };

  return (
    <Navbar isBordered position="sticky" isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <Link href="/">
            <AcmeLogo />
            <p className="font-bold dark:text-white">ACME</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex">
        <NavbarBrand>
          <Link href="/">
            <AcmeLogo />
            <p className="font-bold dark:text-white">ACME</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        {user ? (
          <>
            <NavbarItem className="hidden sm:flex lg:hidden">
              <MobileProfile />
            </NavbarItem>
            <NavbarItem className="hidden sm:flex">
              <Link href="/list">Jobs</Link>
            </NavbarItem>
            <NavbarItem className="hidden sm:flex">
              <Link className="cursor-pointer" onClick={handleLogout}>
                Logout
              </Link>
            </NavbarItem>
            <NavbarItem className="hidden sm:flex items-center">
              <span className="font-normal text-xs mr-2 dark:text-white">{user?.email}</span>
              <Avatar>
                <AvatarImage src={user?.profileImage || 'https://via.placeholder.com/150'} alt="Profile Image" />
                <AvatarFallback>
                  {user?.name?.charAt(0)}
                  {user?.surname?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </NavbarItem>
          </>
        ) : (
          <>
            {!user && (
              <NavbarItem className="hidden sm:flex">
                <AuthModal />
              </NavbarItem>
            )}
          </>
        )}
      </NavbarContent>

      <NavbarMenu>
        {user ? (
          <>
            <NavbarItem>
              <Link href="/list">Jobs</Link>
            </NavbarItem>
            <NavbarItem>
              <Link className="cursor-pointer" onClick={handleLogout}>
                Logout
              </Link>
            </NavbarItem>
            <NavbarItem className="flex items-center">
              <span className="font-normal text-xs mr-2 dark:text-white">{user?.email}</span>
              <Avatar>
                <AvatarImage src={user?.profileImage || 'https://via.placeholder.com/150'} alt="Profile Image" />
                <AvatarFallback>
                  {user?.name?.charAt(0)}
                  {user?.surname?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </NavbarItem>
            <NavbarItem>
              <MobileProfile />
            </NavbarItem>
          </>
        ) : (
          <>
            {!user && (
              <NavbarItem>
                <AuthModal />
              </NavbarItem>
            )}
          </>
        )}
      </NavbarMenu>
    </Navbar>
  );
}

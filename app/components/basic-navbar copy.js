"use client";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Link,
  Button,
  Divider,
  cn,
  Image,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

import { AcmeIcon } from "./social";

const menuItems = [
  { label: "홈", href: "/" },
  { label: "촬영", href: "/record" },
];

const BasicNavbar = React.forwardRef(({ classNames = {}, ...props }, ref) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const router = useRouter();

  return (
    <Navbar
      ref={ref}
      {...props}
      classNames={{
        base: cn(
          "border-default-100 bg-transparent fixed top-0 left-0 right-0 z-50",
          {
            "bg-default-200/50 dark:bg-default-100/50": isMenuOpen,
          }
        ),
        wrapper: "w-full justify-center relative",
        item: "hidden md:flex",
        ...classNames,
      }}
      height="60px"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      {/* Left Content */}
      <NavbarBrand>
        <div className="rounded-full bg-default-foreground text-background flex items-center justify-center">
          {/* <Image src="/logo/logo.png" alt="logo" width={100} height={50} /> */}
          {/* <img src="/logo/logo.png" alt="logo" /> */}
        </div>
        <Link href="/">
          <img src="/logo/logo.png" alt="logo" className="w-10 h-10" />
        </Link>
      </NavbarBrand>

      {/* Center Content */}
      <NavbarContent justify="center" className="gap-x-10">
        {menuItems.map((item) => (
          <NavbarItem
            key={item.href}
            isActive={router.pathname === item.href}
            className={`text-xl ${
              router.pathname === item.href ? "font-bold" : "text-default-500"
            } text-black`}
          >
            <Link
              className="text-black"
              aria-current={router.pathname === item.href ? "page" : undefined}
              href={item.href}
              size="sm"
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarMenuToggle className="text-default-400 md:hidden z-50" />

      <NavbarMenu
        // className="top-[calc(var(--navbar-height)_-_1px)] max-h-fit bg-default-200/50 pb-6 pt-6 shadow-medium backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50"
        className="top-0 right-0"
        motionProps={{
          initial: { opacity: 0, y: -20 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -20 },
          transition: {
            ease: "easeInOut",
            duration: 0.2,
          },
        }}
      >
        {/* <NavbarMenuItem>
          <Button fullWidth as={Link} href="/#" variant="faded">
            Sign In
          </Button>
        </NavbarMenuItem>
        <NavbarMenuItem className="mb-4">
          <Button fullWidth as={Link} className="bg-foreground text-background" href="/#">
            Get Started
          </Button>
        </NavbarMenuItem> */}
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="mb-2 w-full text-default-500"
              href={item.href}
              size="md"
            >
              {item.label}
            </Link>
            {index < menuItems.length - 1 && <Divider className="opacity-50" />}
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
});

BasicNavbar.displayName = "BasicNavbar";

export default BasicNavbar;

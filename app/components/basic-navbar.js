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
} from "@nextui-org/react";
import {Icon} from "@iconify/react";

import {AcmeIcon} from "./social";

const menuItems = [
  {'label':'홈', 'href':'/'},
  {'label':'촬영', 'href':'/record'},
];

const BasicNavbar = React.forwardRef(({classNames = {}, ...props}, ref) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    if (isMenuOpen) {
      document.documentElement.style.paddingRight = '0px';
    } else {
      document.documentElement.style.paddingRight = '';
    }
  }, [isMenuOpen]);

  return (
    <Navbar
      ref={ref}
      {...props}
      classNames={{
        base: cn("border-default-100 bg-transparent", {
          "bg-default-200/50 dark:bg-default-100/50": isMenuOpen,
        }),
        wrapper: "w-full justify-center",
        item: "hidden md:flex",
        ...classNames,
      }}
      height="60px"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      {/* Left Content */}
      <NavbarBrand>
        {/* <div className="rounded-full bg-default-foreground text-background">
          <AcmeIcon size={34} />
        </div> */}
        <Link href="/">
          <img src="/logo/logo.png" alt="logo" className="w-28 h-auto" />
        </Link>
        
      </NavbarBrand>

      {/* Center Content */}
      <NavbarContent justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem key={index} isActive className="data-[active='true']:font-medium[date-active='true']">
            <Link aria-current="page" className="text-default-foreground" href={item.href} size="sm">
              {item.label}
            </Link>
          </NavbarItem>
        ))}
        
      </NavbarContent>
      <NavbarMenuToggle className="text-default-400 md:hidden" />

      <NavbarMenu
        className="top-[calc(var(--navbar-height)_-_1px)] max-h-fit bg-default-200/50 pb-6 pt-6 shadow-medium backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50"
        motionProps={{
          initial: {opacity: 0, y: -20},
          animate: {opacity: 1, y: 0},
          exit: {opacity: 0, y: -20},
          transition: {
            ease: "easeInOut",
            duration: 0.2,
          },
        }}
      >
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link className="mb-2 w-full text-default-500" href={item.href} size="md">
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

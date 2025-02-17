import { useEffect, useState } from "react";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const navigation = [
  { name: "Home", href: "/", current: false },
  { name: "Favoret", href: "/favoret", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar() {
  const favoriteMovies = useSelector((state) => state.favoret || []);
  const location = useLocation();

  // Update `current` dynamically
  const updatedNavigation = navigation.map((item) => ({
    ...item,
    current: location.pathname === item.href,
  }));

  return (
    <Disclosure as="nav" className="bg-blue-700 dark:bg-gray-900">
      <div className="bg-gray-900 text-white fixed w-full top-0 left-0 shadow-md z-50">
        <div className="relative flex h-16 items-center justify-between pr-16 pl-16">
          {/* Mobile Menu Button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>

          {/* Logo & Navigation */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                alt="Your Company"
                src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {updatedNavigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white dark:bg-gray-700 dark:text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white dark:text-gray-400 dark:hover:bg-gray-800",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Section (Dark Mode & Profile) */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="flex items-center space-x-4">
              {/* Favorite Icon and Count */}
              <div className="flex items-center space-x-1">
                <SolidHeartIcon className="w-6 h-6 text-red-500" />
                <h3 className="text-sm text-gray-400">{favoriteMovies.length}</h3>
              </div>

              {/* Profile Dropdown
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <img
                      alt="User profile"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      className="h-8 w-8 rounded-full"
                    />
                  </MenuButton>
                </div>
                <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/5">
                  <MenuItem>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 dark:hover:bg-gray-700">
                      Your Profile
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 dark:hover:bg-gray-700">
                      Settings
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 dark:hover:bg-gray-700">
                      Sign out
                    </a>
                  </MenuItem>
                </MenuItems>
              </Menu> */}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "bg-gray-900 text-white dark:bg-gray-700 dark:text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white dark:text-gray-400 dark:hover:bg-gray-800",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}

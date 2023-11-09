import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import logoLight from "../assets/img/logoLight.svg";
import logoDark from "../assets/img/logoDark.svg";
import messagesDark from "../assets/img/header/messagesDark.svg";
import messagesLight from "../assets/img/header/messagesLight.svg";
import peoplesLight from "../assets/img/header/peoplesLight.svg";
import peoplesDark from "../assets/img/header/peoplesDark.svg";

import Button from "./Button";
import Container from "./Container";
import { useActions } from "../hooks/actions";
import { socket } from "../hooks/socket";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { IMessage } from "../models/IMessage";

type TProps = {
  onlineUsers?: number;
  theme?: string;
};

const Header: React.FC<TProps> = ({ onlineUsers, theme }) => {
  const dispatch = useAppDispatch();
  const [menuActive, setMenuActive] = useState<boolean>(false);
  const [newMessages, setNewMessages] = useState<IMessage[]>([]);
  const token = localStorage.getItem("token");

  // @ts-ignore
  const userRole = token ? jwt_decode(token).roles : "guest";
  // @ts-ignore
  const userLogin = token ? jwt_decode(token).username : null;
  // @ts-ignore
  const userId = token ? jwt_decode(token).id : null;

  const navigate = useNavigate();

  const { logout } = useActions();

  const logoutHandler = () => {
    logout();
    navigate("/");
  };

  const navLinksList = [
    {
      title: "Мероприятия",
      link: "/events",
    },
    {
      title: "О нас",
      link: "/about",
    },
  ];

  return (
    <>
      <header className="mt-2">
        <Container>
          {theme === "light" ? (
            <div className="relative z-50 flex justify-between items-center h-[60px]">
              <div className="flex">
                <NavLink to="/">
                  <img src={logoLight} alt="" />
                </NavLink>
              </div>
              <nav className="text-white hidden sm:flex">
                {navLinksList.map((item, index) => (
                  <NavLink
                    key={index}
                    to={item.link}
                    className={`ml-4 font-medium text-sm md:text-base md:ml-7 text-white`}
                  >
                    {item.title}
                  </NavLink>
                ))}
              </nav>
              {token ? (
                userRole === "admin" ? (
                  null
                ) : (
                  <div className="flex items-center justify-center">
                    <div
                      className="relative min-w-[65px] flex justify-end"
                      onClick={() => setMenuActive(!menuActive)}
                    >
                      <Button type="secondary" size="md" text={userLogin} />
                      <div
                        className={`${
                          menuActive ? "h-[64px]" : "h-0"
                        } transition-all absolute z-10 top-10 rounded-xl overflow-hidden w-auto`}
                      >
                        <div
                          onClick={logoutHandler}
                          className="px-2 py-1 text-redpal-400 cursor-pointer text-center"
                        >
                          <Button type="secondary" size="sm" text={"Выйти"} />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              ) : (
                <NavLink to="/login">
                  <Button type="secondary" size="md" text="Войти" />
                </NavLink>
              )}
            </div>
          ) : theme === "dark" ? (
            <div className="relative z-50 flex justify-between items-center h-[60px]">
              <div className="flex">
                <NavLink to="/">
                  <img src={logoDark} alt="" />
                </NavLink>
              </div>
              <nav className="hidden sm:flex">
                {navLinksList.map((item, index) => (
                  <NavLink
                    key={index}
                    to={item.link}
                    className={`ml-4 font-medium text-sm md:text-base md:ml-7 text-title`}
                  >
                    {item.title}
                  </NavLink>
                ))}
              </nav>
              {token ? (
                userRole === "admin" ? (
                  null
                ) : (
                  <div className="flex items-center justify-center">
                    <div
                      className="relative"
                      onClick={() => setMenuActive(!menuActive)}
                    >
                      <Button type="primary" size="md" text={userLogin} />
                      <div
                        className={`${
                          menuActive ? "h-[67px]" : "h-0"
                        } transition-all absolute z-10 top-10 rounded-xl overflow-hidden w-auto`}
                      >
                        <div
                          onClick={logoutHandler}
                          className="px-2 py-1 cursor-pointer text-center"
                        >
                          <Button type="primary" size="sm" text={"Выйти"} />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              ) : (
                <NavLink to="/login">
                  <Button type="primary" size="md" text="Войти" />
                </NavLink>
              )}
            </div>
          ) : null}
        </Container>
      </header>
    </>
  );
};

export default Header;

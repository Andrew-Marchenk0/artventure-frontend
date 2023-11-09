import React, { useEffect, useState } from "react";

import loginbg from "../assets/img/auth/loginbg.svg";
import Container from "../components/Container";

import logo from "../assets/img/logoLight.svg";
import { NavLink, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { useActions } from "../hooks/actions";
import { authApi } from "../store/services/authService";

type TProps = {
  setTheme: (theme: string) => void;
};

const Recomendations: React.FC<TProps> = ({ setTheme }) => {
  const [suggestions, setSuggestions] = useState<string>("");

  const navigate = useNavigate();

  const suggestionsHandler = () => {
    navigate("/events");
    setTheme("hidden");
  };

  return (
    <>
      <div className="">
        <div className="">
          <div className="absolute z-20 w-screen h-screen top-[-40px] left-0 overflow-auto">
            <svg
              className="h-[50%] sm:h-auto sm:w-full"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 457"
              fill="none"
            >
              <path
                d="M0 152.68L1440 -19V67.0904L0 457V152.68Z"
                fill="url(#paint0_linear_18_178)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_18_178"
                  x1="720.25"
                  y1="-19"
                  x2="720.25"
                  y2="501.046"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#635BFF" />
                  <stop offset="1" stopColor="#FF5B5B" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <Container border>
            <div className="flex justify-center w-full sm:w-1/3 border-dashed border-x border-[#22222220] mx-auto">
              <div className="flex justify-center items-center w-full h-screen">
                <div className="relative w-full z-30 flex items-center flex-col justify-center h-screen">
                  <div className="mb-8 pl-[15px] w-full">
                    <img className="w-max mr-auto" src={logo} alt="" />
                  </div>
                  <div className="relative z-50 w-full bg-white rounded-md p-5 shadow-md">
                    <div className="text-title font-medium mt-3 mb-5 text-xl">
                      Рекомендательная система
                    </div>
                    <div className="flex flex-col mb-3">
                      <div className="text-sm text-[#222222] mb-2 text-[#22222290]">
                        Пол
                      </div>
                      <div className="radios flex justify-around">
                        <div>
                          <input
                            type="radio"
                            id="female"
                            name="sex"
                            value="female"
                            checked
                          />
                          <label htmlFor="huey" className="ml-3">
                            Женщина
                          </label>
                        </div>

                        <div>
                          <input
                            type="radio"
                            id="male"
                            name="sex"
                            value="male"
                          />
                          <label htmlFor="male" className="ml-3">
                            Мужчина
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="text-sm text-[#222222] mb-1 text-[#22222290]">
                        Интересы
                      </div>
                      <div className="checkbox flex justify-around my-3">
                        <div className="">
                          <input
                            type="checkbox"
                            id="suggestions1"
                            name="suggestions1"
                            className="mr-1"
                            value="Живопись"
                          />
                          <label htmlFor="suggestions ml-2"> Живопись</label>
                        </div>

                        <div className="">
                          <input
                            type="checkbox"
                            id="suggestions2"
                            name="suggestions2"
                            className="mr-1"
                            value="Архитектура"
                          />
                          <label htmlFor="suggestions"> Архитектура</label>
                        </div>

                        <div className="">
                          <input
                            type="checkbox"
                            id="suggestions3"
                            name="suggestions3"
                            className="mr-1"
                            value="Спектакли"
                          />
                          <label htmlFor="suggestions"> Спектакли</label>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col mt-3">
                      <div className="text-sm text-[#222222] mb-2 text-[#22222290]">
                        Ваши увлечения
                      </div>
                      <Input
                        type="auth"
                        placeholder="Ваши интересы"
                        value={suggestions}
                        setValue={setSuggestions}
                      />
                    </div>
                    <div className="mt-2">
                      <div
                        onClick={suggestionsHandler}
                        className="py-2 cursor-pointer bg-accent text-white rounded-md text-center font-medium transition duration-300 hover:opacity-80"
                      >
                        Посмотреть
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Recomendations;

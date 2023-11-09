import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Define a service using a base URL and expected endpoints
const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:5003";

type TProps = {
  img: string;
  link?: string;
  size: string;
  title: string;
  subtitle: string;
  useMargin?: boolean;
  isLoading?: boolean;
  // setCardPictureLoaded?: React.Dispatch<React.SetStateAction<boolean>>;
};

const Card: React.FC<TProps> = ({
  img,
  link,
  size,
  title,
  subtitle,
  useMargin,
  // isLoading,
  // setCardPictureLoaded,
}) => {
  const [cardPictureLoaded, setCardPictureLoaded] = useState<boolean>(true);

  
  return size === "lg" ? (
    cardPictureLoaded ? (
      <div className="relative group cursor-pointer w-[calc(50%-10px)] h-[310px] rounded-xl overflow-hidden">
        {link ? (
          <NavLink to={link}>
            <div className="absolute top-0 left-0 w-full h-full z-20 bg-gradient-to-t from-[#000000ee] to-[#ffffff00]"></div>
          </NavLink>
        ) : (
          <div className="absolute top-0 left-0 w-full h-full z-20 bg-gradient-to-t from-[#000000ee] to-[#ffffff00]"></div>
        )}
        <img
          className="absolute top-0 left-0 w-full z-10 transition-transform duration-500 transform-gpu group-hover:scale-125"
          src={`${img}`}
          alt="pic"
        />
        {link ? (
          <NavLink to={link}>
            <div className="absolute left-4 bottom-4 z-30">
              <p className="w-3/4 text-white text-sm sm:text-lg  font-medium">
                {title}
              </p>
              <p className="text-white">{subtitle}</p>
            </div>
          </NavLink>
        ) : (
          <div className="absolute left-4 bottom-4 z-30">
            <p className="w-3/4 text-white text-sm sm:text-lg font-medium">
              {title}
            </p>
            <p className="text-white">{subtitle}</p>
          </div>
        )}
      </div>
    ) : (
      <div
        className={`${
          useMargin && "mr-[10px]"
        } relative group w-[calc(50%-10px)] h-[310px] rounded-xl overflow-hidden`}
      >
        <Skeleton width={800} height={310} />
      </div>
    )
  ) : size === "xs" ? (
    cardPictureLoaded ? (
      <div
        className={`${
          useMargin && "mr-[10px]"
        } relative group mb-3 cursor-pointer w-[calc(20%-10px)] min-w-[180px] h-[149px] rounded-xl overflow-hidden`}
      >
        {link ? (
          <NavLink to={link}>
            <div className="absolute top-0 left-0 w-full h-full z-20 bg-gradient-to-t from-[#000000ee] to-[#ffffff00]"></div>
          </NavLink>
        ) : (
          <div className="absolute top-0 left-0 w-full h-full z-20 bg-gradient-to-t from-[#000000ee] to-[#ffffff00]"></div>
        )}
        <img
          className="absolute top-0 left-0 w-full z-10 transition-transform duration-500 transform-gpu group-hover:scale-125"
          src={`${baseUrl}/${img}`}
          alt="pic"
        />
        {link ? (
          <NavLink to={link}>
            <div className="absolute left-4 bottom-4 z-30">
              <p className="w-3/4 text-white text-sm sm:text-base font-medium">
                {title}
              </p>
              <p className="text-white text-sm">{subtitle}</p>
            </div>
          </NavLink>
        ) : (
          <div className="absolute left-4 bottom-4 z-30">
            <p className="w-3/4 text-white text-sm sm:text-base text-md font-medium">
              {title}
            </p>
            <p className="text-white text-sm">{subtitle}</p>
          </div>
        )}
      </div>
    ) : (
      <div
        className={`${
          useMargin && "mr-[10px]"
        } relative group mb-3 w-[calc(20%-10px)] h-[149px] rounded-xl overflow-hidden`}
      >
        <Skeleton width={250} height={149} />
      </div>
    )
  ) : size === "sm" ? (
    cardPictureLoaded ? (
      <div
        className={`${
          useMargin && "mr-[10px]"
        } relative group cursor-pointer w-[calc(20%-10px)] min-w-[180px] mb-5 h-[310px] rounded-xl overflow-hidden`}
      >
        {link ? (
          <NavLink to={link}>
            <div className="absolute top-0 left-0 w-full h-full z-20 bg-gradient-to-t from-[#000000ee] to-[#ffffff00]"></div>
          </NavLink>
        ) : (
          <div className="absolute top-0 left-0 w-full h-full z-20 bg-gradient-to-t from-[#000000ee] to-[#ffffff00]"></div>
        )}
        <div className="d-flex h-full items-center justify-center absolute top-0 left-0 z-10">
          <img
            className="h-full object-cover transition-transform duration-500 transform-gpu group-hover:scale-125"
            src={`${baseUrl}/${img}`}
            alt="pic"
          />
        </div>
        {link ? (
          <NavLink to={link}>
            <div className="absolute left-4 bottom-4 z-30">
              <p className="w-3/4 text-white text-sm sm:text-base font-medium">
                {title}
              </p>
              <p className="text-white text-sm w-full pr-4">{subtitle}</p>
            </div>
          </NavLink>
        ) : (
          <div className="absolute left-4 bottom-4 z-30">
            <p className="w-3/4 text-white text-sm sm:text-base font-medium">
              {title}
            </p>
            <p className="text-white text-sm w-full pr-4">{subtitle}</p>
          </div>
        )}
      </div>
    ) : (
      <div
        className={`${
          useMargin && "mr-[10px]"
        } relative group w-[calc(20%-10px)] mb-5 min-w-[180px] h-[310px] rounded-xl overflow-hidden`}
      >
        <Skeleton width={250} height={310} />
      </div>
    )
  ) : null;
};

export default Card;

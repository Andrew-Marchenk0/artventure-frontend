import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { picturesApi } from "../store/services/pictureService";
import Container from "../components/Container";
import Card from "../components/Card";
import Footer from "../components/Footer";
import { events } from '../data/cards'

// Define a service using a base URL and expected endpoints
const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:5003";

type TProps = {
  setTheme: (theme: string) => void;
};

const Event: React.FC<TProps> = ({ setTheme }) => {
  const params = useParams();
  const prodId = params.id || 0;

  const curEvent: any = events.filter((el: any) => Number(el.id) === Number(prodId))[0]
  
  useEffect(() => {
    console.log(curEvent)
    setTheme("dark");
  }, []);


  return (
    <>
      <div className="">
        <div className="">
          <Container>
            <div className="mt-16  border-b border-inputBorder">
              <div className="flex justify-center">
                <div className="flex flex-col items-center h-max pb-10">
                  <img
                    className="w-[80%] h-[80%] object-cover"
                    src={`${baseUrl}/${curEvent.photo}`}
                    alt="pic"
                  />
                </div>
              </div>
            </div>
          </Container>
        </div>
        <div className="">
          <Container>
            <div className="mt-4">
              <div className="flex">
                <div className="flex flex-col h-max pb-10 ">
                  <h1 className="text-xl text-title font-bold">
                    {curEvent.title}
                  </h1>
                  <div className="flex mt-2">
                    <div className="text-link w-full opacity-80">
                      {curEvent.subTitle}
                    </div>
                    <div className="ml-1 text-link w-full opacity-80">
                      {curEvent.cost}
                    </div>
                  </div>

                  <h5 className="mt-2 text-link w-full opacity-80">
                    {curEvent.description}
                  </h5>
                </div>
              </div>
            </div>
          </Container>
        </div>
        {/* cards  */}
        <div className="mt-6">
          <Container border>
            <h2 className="mb-4 font-medium text-title text-2xl">
              От этого художника
            </h2>
            <div className="flex flex-wrap">
              {events.slice(0, 5).map((item, index: number) => {
                return (
                  <Card
                    useMargin
                    size="sm"
                    key={item.id}
                    img={item.photo}
                    link={`/event/${item.id}`}
                    title={item.title}
                    subtitle={item.subTitle}
                  />
                );
              })}
            </div>
          </Container>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Event;

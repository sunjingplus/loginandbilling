/*
 * @Author: Zane
 * @Date: 2024-03-15 18:02:56
 * @Description: 
 * @LastEditors: Zane zanekwok73@gmail.com
 * @LastEditTime: 2024-03-15 18:05:27
 */
import PossessPoint from "@/components/icons/PossessPoint";
import { Subscription } from "@/types/subscribe";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface IProps {
  id?: string;
  info: Subscription;
  clickButton: () => void;
}

export default function SubscribeCard({ id, info, clickButton }: IProps) {
  return (
    <div
      id={id}
      className={cn(
        "flex flex-col p-6 bg-white shadow-lg rounded-lg justify-between border border-gray-300",
        info.mainClassName ? `border-${info.mainClassName} relative` : ""
      )}
    >
      {info.isPopular ? (
        <div className="px-3 py-1 text-sm text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-full inline-block absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          Popular
        </div>
      ) : (
        <></>
      )}
      <div>
        <h3 className="text-2xl font-bold text-center">{info.title}</h3>
        <div className="text-center text-zinc-600">{info.description}</div>
        <div className="mt-4 text-center text-zinc-600">
          <span className="text-4xl font-bold">${info.amount}</span>
          {info.expireType ? `/ ${info.expireType}` : ""}
        </div>
        <ul className="mt-4 space-y-2">
          {info.possess.length ? (
            info.possess.map((i) => {
              return (
                <li key={i} className="flex items-center">
                  <PossessPoint /> {i}
                </li>
              );
            })
          ) : (
            <></>
          )}
        </ul>
      </div>
      <div className="mt-6">
        <Button
          className={cn("w-full", info.buttonClassName)}
          onClick={clickButton}
        >
          {info.buttonText || "Get Started"}
        </Button>
      </div>
    </div>
  );
}
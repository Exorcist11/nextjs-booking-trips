import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function Header() {
  return (
    <div className="py-4 px-6 border-b-2 flex items-center justify-between">
      <h3 className="uppercase text-red-600 text-xl font-bold">
        Booking Manager
      </h3>
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <p>Dung Nguyen</p>
      </div>
    </div>
  );
}

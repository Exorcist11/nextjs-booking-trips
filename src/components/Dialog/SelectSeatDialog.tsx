import React from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Ticket } from "lucide-react";

interface IDialog {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function SelectSeatDialog(props: IDialog) {
  const { open, setOpen } = props;
  return (
    <Dialog open={open} onOpenChange={() => setOpen && setOpen(!open)}>
      <DialogContent className="max-w-[400px] tablet:max-w-[700px] laptop:max-w-[900px] rounded-lg overflow-y-auto max-h-[700px] grid grid-cols-1 laptop:grid-cols-3">
        <div className="flex flex-col gap-3 col-span-1">
          <DialogTitle className="font-bold text-2xl text-red-600">
            Đông Lý
          </DialogTitle>
          <p className="uppercase px-4 py-1 border rounded-md text-sm w-fit font-medium">
            Xe vip 24 phòng
          </p>
          <p className="font-bold">Thanh Hóa - Hà Nội</p>
          <div className="flex justify-between items-center">
            <p className="text-lg">
              <b>12:00</b>
            </p>
            <div className="relative my-4 flex items-center justify-center overflow-hidden">
              <Separator className="h-0 border-t border-dashed bg-transparent w-12" />
              <div className="px-2 text-center bg-background text-sm">3h</div>
              <Separator className="h-0 border-t border-dashed bg-transparent w-12" />
            </div>
            <p className="text-lg">
              <b>12:00</b>
            </p>
          </div>

          <div className="border border-green-600 rounded-lg p-3 flex flex-col gap-3 text-sm">
            <h3 className="font-bold text-green-600">Thông tin đặt vé:</h3>
            <div className="max-h-[250px] hide-scrollbar overflow-y-auto flex flex-col gap-1">
              {Array.from({ length: 44 }).map((item, index) => (
                <div className="flex justify-between font-bold" key={index}>
                  <h3 className=" ">A1</h3>
                  <p>999 VND</p>
                </div>
              ))}
            </div>
            <Separator className="border-t border-dashed w-full h-0 border-green-500" />
            <div className="flex justify-between font-bold">
              <h3 className=" text-green-600">Tổng tiền:</h3>
              <p>999 VND</p>
            </div>
          </div>
        </div>

        <div className="border rounded-lg flex flex-col gap-3 py-4 laptop:col-span-2">
          <h3 className="text-center text-xl font-bold text-red-500">
            Xe khách Đông Lý
          </h3>
          <div className="flex items-center gap-5 justify-center">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-5 h-5 bg-red-500 rounded-md border"></div> Ghế
              trống
            </div>

            <div className="flex items-center gap-2 text-sm">
              <div className="w-5 h-5 bg-red-500 rounded-md border"></div> Đã
              đặt
            </div>

            <div className="flex items-center gap-2 text-sm">
              <div className="w-5 h-5 bg-red-500 rounded-md border"></div> Đã
              bán
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5 px-4 tablet:grid-cols-2">
            <div className="col-span-1 bg-[#f4f4f4] rounded-md py-4">
              <p className="text-center text-blue-600 text-sm font-bold">
                Tầng 1
              </p>
              <table className="w-full mt-4 ">
                <tbody className="space-y-5 px-5">
                  {Array.from({ length: 5 }).map((item, index) => (
                    <tr
                      className=" px-5 w-full flex justify-between"
                      key={index}
                    >
                      <td className="flex justify-center">
                        <div className="flex justify-center items-center text-sm w-10 h-10 font-bold bg-slate-300 rounded-md border">
                          A{index}
                        </div>
                      </td>
                      <td className="flex justify-center">
                        <div className="flex justify-center items-center text-sm w-10 h-10 font-bold bg-red-500 rounded-md border">
                          B{index}
                        </div>
                      </td>
                      <td className="flex justify-center ">
                        <div className="flex justify-center items-center text-sm w-10 h-10 font-bold bg-red-500 rounded-md border">
                          C{index}
                        </div>
                      </td>
                    </tr>
                  ))}
                  <tr className=" px-5 w-full flex justify-between">
                    <td className="flex justify-center ">
                      <div className="flex justify-center items-center text-sm w-10 h-10 font-bold bg-slate-300 rounded-md border">
                        D
                      </div>
                    </td>
                    <td className="flex justify-center ">
                      <div className="flex justify-center items-center text-sm w-10 h-10 font-bold bg-red-500 rounded-md border">
                        D
                      </div>
                    </td>
                    <td className="flex justify-center ">
                      <div className="flex justify-center items-center text-sm w-10 h-10 font-bold bg-red-500 rounded-md border">
                        D
                      </div>
                    </td>
                    <td className="flex justify-center ">
                      <div className="flex justify-center items-center text-sm w-10 h-10 font-bold bg-red-500 rounded-md border">
                        D
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="col-span-1 bg-[#f4f4f4] rounded-md py-4">
              <p className="text-center text-blue-600 text-sm font-bold">
                Tầng 2
              </p>
              <table className="w-full mt-4 ">
                <tbody className="space-y-5 px-5">
                  {Array.from({ length: 5 }).map((item, index) => (
                    <tr
                      className=" px-5 w-full flex justify-between"
                      key={index}
                    >
                      <td className="flex justify-center">
                        <div className="flex justify-center items-center text-sm w-10 h-10 font-bold bg-slate-300 rounded-md border">
                          A{index}
                        </div>
                      </td>
                      <td className="flex justify-center">
                        <div className="flex justify-center items-center text-sm w-10 h-10 font-bold bg-red-500 rounded-md border">
                          B{index}
                        </div>
                      </td>
                      <td className="flex justify-center ">
                        <div className="flex justify-center items-center text-sm w-10 h-10 font-bold bg-red-500 rounded-md border">
                          C{index}
                        </div>
                      </td>
                    </tr>
                  ))}
                  <tr className=" px-5 w-full flex justify-between">
                    <td className="flex justify-center ">
                      <div className="flex justify-center items-center text-sm w-10 h-10 font-bold bg-slate-300 rounded-md border">
                        D
                      </div>
                    </td>
                    <td className="flex justify-center ">
                      <div className="flex justify-center items-center text-sm w-10 h-10 font-bold bg-red-500 rounded-md border">
                        D
                      </div>
                    </td>
                    <td className="flex justify-center ">
                      <div className="flex justify-center items-center text-sm w-10 h-10 font-bold bg-red-500 rounded-md border">
                        D
                      </div>
                    </td>
                    <td className="flex justify-center ">
                      <div className="flex justify-center items-center text-sm w-10 h-10 font-bold bg-red-500 rounded-md border">
                        D
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <Button className="col-span-1">
          <Ticket />
          Đặt vé
        </Button>
      </DialogContent>
    </Dialog>
  );
}

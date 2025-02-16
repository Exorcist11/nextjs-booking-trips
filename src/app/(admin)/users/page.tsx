"use client";
import CustomTable from "@/components/CustomTable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IUserResponse } from "@/constants/interface";
import { dropDownMenus } from "@/lib/dropdownMenu";
import { getAllUsers } from "@/services/users";
import { Ellipsis } from "lucide-react";

import React from "react";

export default function page() {
  const [users, setUsers] = React.useState<IUserResponse>();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const getUsers = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response);
    } catch (error) {
      console.error("Error fetching users: ", error);
    } finally {
      setIsLoading(false);
    }
  };
  React.useEffect(() => {
    getUsers();
  }, []);
  const columns: any[] = React.useMemo(
    () => [
      {
        header: "No.",
        id: "no",
        cell: ({ row }: any) => {
          const pageIndex = users?.index || 1;
          const pageSize = users?.limit || 10;
          return (pageIndex - 1) * pageSize + row.index + 1;
        },
        meta: {
          cellClassName: "py-5 w-[5%]",
        },
      },
      {
        header: "Fullname",
        id: "fullName",
        accessorKey: "fullName",
        cell: ({ row }: any) => {
          return row?.original?.fullName;
        },
        meta: {
          cellClassName: "py-5 w-[25%] ",
        },
      },
      {
        header: "Email",
        id: "email",
        accessorKey: "email",
        cell: ({ row }: any) => {
          return row?.original?.email;
        },
        meta: {
          cellClassName: "py-5 w-[30%]",
        },
      },
      {
        header: "Phone Number",
        id: "phoneNumber",
        accessorKey: "phoneNumber",
        // cell: ({ row }: any) => {
        //   return row?.original?.phoneNumber;
        // },
        meta: {
          cellClassName: "py-5 w-[30%]",
        },
      },
      {
        header: "Acoes",
        id: "_id",
        accessorKey: "action",
        cell: ({ row }: any) => {
          return (
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger className="bg-slate-200 py-1 px-2 rounded-lg focus:outline-none focus:ring-0 focus:ring-transparent focus:ring-offset-0">
                  <Ellipsis size={16} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {dropDownMenus.map((menu, index) => (
                    <DropdownMenuItem key={index} className="hover:cursor-pointer">
                      {menu.icon} {menu.title}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        },
        meta: {
          cellClassName: "py-5 w-[10%]",
        },
      },
    ],
    [JSON.stringify(users)]
  );

  return (
    <div>
      <CustomTable
        // onRowClick={(user) => {
        //   setOpen(true);
        //   setType("view");
        //   setActiveData(user.id);
        // }}
        columns={columns}
        data={users?.data || []}
        isLoading={isLoading}
        wrapperClassName="2xl:max-h-[66vh] xl:max-h-[57vh]"
      />
    </div>
  );
}

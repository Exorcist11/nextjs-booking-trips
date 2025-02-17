"use client";

import React from "react";
import InputWithIcon from "@/components/CustomInput/InputWithIcon";
import CustomTable from "@/components/CustomTable";
import PaginationCustom from "@/components/CustomTable/PaginationCustom";
import UserActionDialog from "@/components/Dialog/UserActionDialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { IUserResponse } from "@/constants/interface";
import { dropDownMenus } from "@/lib/dropdownMenu";
import { getAllUsers } from "@/services/users";
import { Ellipsis, Plus, Search } from "lucide-react";

export default function page() {
  const [users, setUsers] = React.useState<IUserResponse>();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [open, setOpen] = React.useState<boolean>(false);
  const [type, setType] = React.useState<string>("Add");
  const [userId, setUserId] = React.useState<string>("");

  const getUsers = async () => {
    setIsLoading(true);
    try {
      const response = await getAllUsers();
      setUsers(response);
    } catch (error) {
      console.error("Error fetching users: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleActionClick = (id: string, action: string) => {
    setType(action);
    setOpen(true);
    setUserId(id);
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
                    <DropdownMenuItem
                      key={index}
                      className="hover:cursor-pointer"
                      onClick={() =>
                        handleActionClick(row?.original?._id, menu?.title)
                      }
                    >
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
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-5">
        <h3 className="font-bold text-xl">
          {/* All users <span className="text-gray-400">{users?.total}</span> */}
        </h3>

        <div className="flex items-center justify-end gap-5">
          <InputWithIcon
            Icon={Search}
            placeholder="Tìm kiếm tên khách hàng"
            className="w-[35%]"
          />
          <Button
            onClick={() => {
              setOpen(true);
              setType("Add");
            }}
          >
            <Plus color="#fff" /> Thêm mới
          </Button>
        </div>
      </div>
      <div className="flex gap-2 flex-col">
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

        <PaginationCustom
          pageIndex={users?.index || 1}
          pageSize={users?.limit || 10}
          totalCount={users?.total || 0}
          onChangePage={() => getAllUsers()}
        />
      </div>

      {open && type && (
        <UserActionDialog
          open={open}
          setOpen={setOpen}
          type={type}
          userId={userId}
          reload={getAllUsers}
        />
      )}
    </div>
  );
}

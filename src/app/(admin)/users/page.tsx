"use client";
import CustomTable from "@/components/CustomTable";
import { IUserResponse } from "@/constants/interface";
import { getAllUsers } from "@/services/users";

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
          cellClassName: "py-5 ",
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
          cellClassName: "py-5 ",
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
          cellClassName: "py-5 ",
        },
      },
      {
        header: "Phone Number",
        id: "phoneNumber",
        accessorKey: "phoneNumber",
        cell: ({ row }: any) => {
          return row?.original?.phoneNumber;
        },
        meta: {
          cellClassName: "py-5 ",
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

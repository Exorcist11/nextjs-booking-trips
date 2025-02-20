"use client";

import React from "react";
import InputWithIcon from "@/components/CustomInput/InputWithIcon";
import CustomTable from "@/components/CustomTable";
import UserActionDialog from "@/components/Dialog/UserActionDialog";
import { Button } from "@/components/ui/button";
import { IUserResponse } from "@/constants/interface";
import { getAllUsers, IParamsGetUser } from "@/services/users";
import { Plus, Search } from "lucide-react";
import TablePagination from "@/components/CustomTable/PaginationCustom";
import { debounce } from "lodash";
import ActionClick from "@/components/ActionClick";
import { ACTION } from "@/constants/action";

export default function page() {
  const [users, setUsers] = React.useState<IUserResponse>();
  const [search, setSearch] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [open, setOpen] = React.useState<boolean>(false);
  const [type, setType] = React.useState<string>(ACTION.ADD);
  const [userId, setUserId] = React.useState<string>("");
  const [pageSize, setPageSize] = React.useState<number>(10);

  const getUsers = async (pageIndex: number) => {
    setIsLoading(true);
    const params: IParamsGetUser = {
      limit: pageSize,
      index: pageIndex,
      order: "fullName",
      sort: "asc",
      fullName: search,
    };
    try {
      const response = await getAllUsers(params);
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
    getUsers(1);
  }, [pageSize, search]);

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
        header: "Họ tên",
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
        header: "Số điện thoại",
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
        header: "",
        id: "_id",
        accessorKey: "action",
        cell: ({ row }: any) => {
          return (
            <div>
              <ActionClick
                onMenuClick={(action) =>
                  handleActionClick(row?.original?._id, action)
                }
              />
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
            onChange={debounce((e: React.ChangeEvent<HTMLInputElement>) => {
              setSearch(e.target.value);
            }, 1000)}
          />
          <Button
            onClick={() => {
              setOpen(true);
              setType(ACTION.ADD);
            }}
          >
            <Plus color="#fff" /> Thêm mới
          </Button>
        </div>
      </div>
      <div className="flex gap-2 flex-col">
        <CustomTable
          columns={columns}
          data={users?.data || []}
          isLoading={isLoading}
          wrapperClassName="2xl:max-h-[78vh]  xl:max-h-[72vh]"
        />

        {!isLoading && (
          <TablePagination
            pageIndex={users?.index || 1}
            pageSize={users?.limit || pageSize}
            totalCount={users?.total || 0}
            onChangePage={(pageIndex) => getUsers(pageIndex)}
            onChangePageSize={(pageSize) => setPageSize(pageSize)}
          />
        )}
      </div>

      {open && type && (
        <UserActionDialog
          open={open}
          setOpen={setOpen}
          type={type}
          userId={userId}
          reload={getUsers}
          setType={setType}
        />
      )}
    </div>
  );
}

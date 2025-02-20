"use client";
import ActionClick from "@/components/ActionClick";
import InputWithIcon from "@/components/CustomInput/InputWithIcon";
import CustomTable from "@/components/CustomTable";
import TablePagination from "@/components/CustomTable/PaginationCustom";
import CarActionDialog from "@/components/Dialog/CarActionDialog";
import { Button } from "@/components/ui/button";
import { ACTION } from "@/constants/action";
import { ICarResponse } from "@/constants/interface";
import {} from "@/lib/dropdownMenu";
import { getAllCars, IParamsGetCars } from "@/services/cars";
import toastifyUtils from "@/utils/toastify";
import { debounce } from "lodash";
import { Car, Plus, Search } from "lucide-react";
import React from "react";

export default function page() {
  const [cars, setCars] = React.useState<ICarResponse>();
  const [search, setSearch] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [pageSize, setPageSize] = React.useState<number>(10);
  const [open, setOpen] = React.useState<boolean>(false);
  const [type, setType] = React.useState<string>("Add");
  const [carID, setCarID] = React.useState<string>("");

  const getCars = async (pageIndex: number) => {
    setIsLoading(true);
    const params: IParamsGetCars = {
      limit: pageSize,
      index: pageIndex,
      order: "licensePlate",
      sort: "asc",
      licensePlate: search,
    };
    try {
      const response = await getAllCars(params);
      setCars(response);
    } catch (error) {
      console.error("Error fetching cars: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleActionClick = (id: string, action: string) => {
    setType(action);
    setOpen(true);
    setCarID(id);
  };

  React.useEffect(() => {
    getCars(1);
  }, [pageSize, search]);

  const columns: any[] = React.useMemo(
    () => [
      {
        header: "No.",
        id: "no",
        cell: ({ row }: any) => {
          const pageIndex = cars?.index || 1;
          const pageSize = cars?.limit || 10;
          return (pageIndex - 1) * pageSize + row.index + 1;
        },
        meta: {
          cellClassName: "py-5 w-[5%]",
        },
      },
      {
        header: "Biển số",
        id: "licensePlate",
        accessorKey: "licensePlate",
        cell: ({ row }: any) => {
          return row?.original?.licensePlate;
        },
        meta: {
          cellClassName: "py-5 w-[25%] ",
        },
      },
      {
        header: "Tài xế",
        id: "mainDriver",
        accessorKey: "mainDriver",
        cell: ({ row }: any) => {
          return row?.original?.mainDriver;
        },
        meta: {
          cellClassName: "py-5 w-[20%]",
        },
      },
      {
        header: "Phụ xe",
        id: "ticketCollector",
        accessorKey: "ticketCollector",
        cell: ({ row }: any) => {
          return row?.original?.ticketCollector;
        },
        meta: {
          cellClassName: "py-5 w-[20%]",
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
          cellClassName: "py-5 w-[20%]",
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
    [JSON.stringify(cars)]
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
            placeholder="Tìm kiếm biển số xe"
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
          data={cars?.data || []}
          isLoading={isLoading}
          wrapperClassName="2xl:max-h-[78vh]  xl:max-h-[72vh]"
        />

        {!isLoading && (
          <TablePagination
            pageIndex={cars?.index || 1}
            pageSize={cars?.limit || pageSize}
            totalCount={cars?.total || 0}
            onChangePage={(pageIndex) => getCars(pageIndex)}
            onChangePageSize={(pageSize) => setPageSize(pageSize)}
          />
        )}
      </div>

      {open && type && (
        <CarActionDialog
          open={open}
          setOpen={setOpen}
          type={type}
          id={carID}
          reload={getCars}
          setType={setType}
        />
      )}
    </div>
  );
}

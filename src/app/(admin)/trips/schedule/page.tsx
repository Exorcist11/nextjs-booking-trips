"use client";
import ActionClick from "@/components/ActionClick";
import CustomTable from "@/components/CustomTable";
import TablePagination from "@/components/CustomTable/PaginationCustom";
import { Button } from "@/components/ui/button";
import { ACTION } from "@/constants/action";
import { LOCATIONS } from "@/constants/location";
import useLoadingStore from "@/hooks/useLoading";
import { Plus } from "lucide-react";
import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IScheduleResponse } from "@/interface/schedule.interface";
import { getAllSchedule } from "@/services/schedule";
import ScheduleDialog from "@/components/Dialog/ScheduleDialog";
import { OptionsSelect } from "@/components/CustomSelect/ReactSelect";
import { getAllCars } from "@/services/cars";
import { ICar } from "@/interface/car.interface";
import { getAllRoute } from "@/services/route";
import { IRoute } from "@/interface/route.interface";
import { Skeleton } from "@/components/ui/skeleton";

interface IScheduleParams {
  limit?: number;
  index?: number;
  sort?: "asc";
  car?: string;
  route?: string;
}

export default function page() {
  const [schedule, setSchedule] = React.useState<IScheduleResponse>();
  const [OPTION_CAR, SET_OPTION_CAR] = React.useState<OptionsSelect[]>([]);
  const [OPTION_ROUTE, SET_OPTION_ROUTE] = React.useState<OptionsSelect[]>([]);
  const [locations, setLocations] = React.useState({
    car: "",
    route: "",
  });
  const [loadingP, setLoadingP] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);
  const [type, setType] = React.useState<string>(ACTION.ADD);
  const [pageSize, setPageSize] = React.useState<number>(10);
  const { stopLoading, loading, startLoading } = useLoadingStore();
  const [id, setId] = React.useState<string>("");

  const handleActionClick = (id: string, action: string) => {
    setType(action);
    setOpen(true);
    setId(id);
  };

  const columns: any[] = React.useMemo(
    () => [
      {
        header: "No.",
        id: "no",
        cell: ({ row }: any) => {
          const pageIndex = schedule?.index || 1;
          const pageSize = schedule?.limit || 10;
          return (pageIndex - 1) * pageSize + row.index + 1;
        },
        meta: {
          cellClassName: "py-5 w-[5%]",
        },
      },
      {
        header: "Tuyến đường",
        id: "route",
        accessorKey: "route",
        cell: ({ row }: any) => {
          return `${row.original?.route?.departure} - ${row.original?.route?.destination}`;
        },
        meta: {
          cellClassName: "py-5 w-[25%] ",
        },
      },
      {
        header: "Xe chạy",
        id: "car",
        accessorKey: "car",
        cell: ({ row }: any) => {
          return `${row.original?.car?.licensePlate} - ${row.original?.car?.mainDriver}`;
        },
        meta: {
          cellClassName: "py-5 w-[25%] ",
        },
      },
      {
        header: "Giá vé",
        id: "price",
        accessorKey: "price",
        cell: ({ row }: any) => {
          return row?.original?.price.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          });
        },
        meta: {
          cellClassName: "py-5 w-[15%] ",
        },
      },
      {
        header: "Giờ chạy",
        id: "departureTime",
        accessorKey: "departureTime",
        cell: ({ row }: any) => {
          return row?.original?.departureTime;
        },
        meta: {
          cellClassName: "py-5 w-[15%] ",
        },
      },
      {
        header: "Trạng thái",
        id: "isActive",
        accessorKey: "isActive",
        cell: ({ row }: any) => {
          return row?.original?.isActive == true
            ? "Đang hoạt động"
            : "Ngưng hoạt động";
        },
        meta: {
          cellClassName: "py-5 w-[15%] ",
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
          cellClassName: "py-5 w-[5%]",
        },
      },
    ],
    [JSON.stringify(schedule)]
  );

  const getScheduleTrip = async (pageIndex: number) => {
    startLoading();
    const params: IScheduleParams = {
      limit: pageSize,
      index: pageIndex,
      sort: "asc",
      route: locations.route,
      car: locations.car,
    };
    try {
      const response = await getAllSchedule(params);
      setSchedule(response);
    } catch (error) {
      console.error("Error fetching route: ", error);
    } finally {
      stopLoading();
    }
  };

  React.useEffect(() => {
    getScheduleTrip(1);
  }, [pageSize, locations.route, locations.car]);

  React.useEffect(() => {
    const getSelectData = async () => {
      try {
        setLoadingP(true);
        const dataCar = await getAllCars();
        SET_OPTION_CAR(
          dataCar?.data?.map((item: ICar) => ({
            value: item._id,
            label: item.licensePlate + " - " + item.mainDriver,
          }))
        );
        const dataRoute = await getAllRoute();
        SET_OPTION_ROUTE(
          dataRoute?.data?.map((item: IRoute) => ({
            value: item._id,
            label: item.departure + " - " + item.destination,
          }))
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingP(false);
      }
    };
    getSelectData();
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-5">
        <h3 className="font-bold text-xl uppercase">Danh sách lịch trình</h3>

        <div className="flex items-center justify-end gap-5">
          <Select
            onValueChange={(value) =>
              setLocations((prev) => ({
                ...prev,
                route: value,
              }))
            }
          >
            <SelectTrigger className="w-[250px] focus-visible:ring-transparent">
              <SelectValue placeholder="Chọn tuyến đường" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {loadingP ? (
                  <Skeleton className="h-7 w-[250px]" />
                ) : (
                  OPTION_ROUTE?.map((item, index) => (
                    <SelectItem key={index} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))
                )}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select
            onValueChange={(value) =>
              setLocations((prev) => ({
                ...prev,
                car: value,
              }))
            }
          >
            <SelectTrigger className="w-[250px] focus-visible:ring-transparent">
              <SelectValue placeholder="Chọn xe chạy" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {loadingP ? (
                  <Skeleton className="h-7 w-[250px]" />
                ) : (
                  OPTION_CAR?.map((item, index) => (
                    <SelectItem key={index} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))
                )}
              </SelectGroup>
            </SelectContent>
          </Select>

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
          data={schedule?.data || []}
          isLoading={loading}
          wrapperClassName="2xl:max-h-[78vh]  xl:max-h-[72vh]"
        />

        {!loading && (
          <TablePagination
            pageIndex={schedule?.index || 1}
            pageSize={schedule?.limit || pageSize}
            totalCount={schedule?.total || 0}
            onChangePage={(pageIndex) => getScheduleTrip(pageIndex)}
            onChangePageSize={(pageSize) => setPageSize(pageSize)}
          />
        )}
      </div>

      {open && type && (
        <ScheduleDialog
          open={open}
          setOpen={setOpen}
          type={type}
          id={id}
          reload={getScheduleTrip}
          setType={setType}
          CAR_OPTION={OPTION_CAR}
          ROUTE_OPTION={OPTION_ROUTE}
        />
      )}
    </div>
  );
}

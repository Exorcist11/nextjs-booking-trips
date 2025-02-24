"use client";

import InputWithIcon from "@/components/CustomInput/InputWithIcon";
import CustomTable from "@/components/CustomTable";
import TablePagination from "@/components/CustomTable/PaginationCustom";
import { ACTION } from "@/constants/action";
import { LOCATIONS } from "@/constants/location";
import useLoadingStore from "@/hooks/useLoading";

import { getAllTrips, IParamsGetTripSchedule } from "@/services/trips";
import { debounce } from "lodash";
import { Eye, Search } from "lucide-react";
import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { ITripResponse } from "@/interface/trip.interface";
import TripDialog from "@/components/Dialog/TripDialog";

export default function page() {
  const [trips, setTrips] = React.useState<ITripResponse>();
  const [locations, setLocations] = React.useState({
    departure: "",
    destination: "",
  });

  const [search, setSearch] = React.useState<string>("");
  const [open, setOpen] = React.useState<boolean>(false);
  const [type, setType] = React.useState<string>(ACTION.ADD);
  const [pageSize, setPageSize] = React.useState<number>(10);
  const { stopLoading, loading, startLoading } = useLoadingStore();
  const [id, setId] = React.useState<string>("");

  const columns: any[] = React.useMemo(
    () => [
      {
        header: "No.",
        id: "no",
        cell: ({ row }: any) => {
          const pageIndex = trips?.index || 1;
          const pageSize = trips?.limit || 10;
          return (pageIndex - 1) * pageSize + row.index + 1;
        },
        meta: {
          cellClassName: "py-5 w-[5%]",
        },
      },
      {
        header: "Xuất phát",
        id: "departure",
        accessorKey: "departure",
        cell: ({ row }: any) => {
          return row?.original?.departure;
        },
        meta: {
          cellClassName: "py-5 w-[20%] ",
        },
      },
      {
        header: "Điểm đến",
        id: "destination",
        accessorKey: "destination",
        cell: ({ row }: any) => {
          return row?.original?.destination;
        },
        meta: {
          cellClassName: "py-5 w-[20%] ",
        },
      },
      {
        header: "Ghế trống",
        id: "availableSeats",
        accessorKey: "availableSeats",
        meta: {
          cellClassName: "py-5 w-[10%] ",
        },
      },
      {
        header: "Giá vé",
        id: "price",
        accessorKey: "price",
        cell: ({ row }: any) => {
          return row?.original?.price?.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          });
        },
        meta: {
          cellClassName: "py-5 w-[10%] ",
        },
      },
      {
        header: "Ngày xe chạy",
        id: "departureTime",
        accessorKey: "departureTime",
        cell: ({ row }: any) => {
          return format(
            new Date(row?.original?.departureTime),
            "hh:mm a dd/MM/yyyy"
          );
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
              <Eye
                onClick={() => setOpen(true)}
                size={18}
                className="cursor-pointer hover:text-blue-400"
              />
            </div>
          );
        },
        meta: {
          cellClassName: "py-5 w-[5%]",
        },
      },
    ],
    [JSON.stringify(trips)]
  );

  const getTrips = async (pageIndex: number) => {
    startLoading();
    const params: IParamsGetTripSchedule = {
      limit: pageSize,
      index: pageIndex,
      sort: "asc",
      departureTime: search,
      destination: locations.destination,
      departure: locations.departure,
    };
    try {
      const response = await getAllTrips(params);
      setTrips(response);
    } catch (error) {
      console.error("Error fetching cars: ", error);
    } finally {
      stopLoading();
    }
  };

  React.useEffect(() => {
    getTrips(1);
  }, [pageSize, search, locations.departure, locations.destination]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-5">
        <h3 className="font-bold text-xl uppercase">Danh sách chuyến đi</h3>

        <div className="flex items-center justify-end gap-5">
          <Select
            onValueChange={(value) =>
              setLocations((prev) => ({
                ...prev,
                departure: value,
              }))
            }
          >
            <SelectTrigger className="w-[200px] focus-visible:ring-transparent">
              <SelectValue placeholder="Chọn điểm khởi hành" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {LOCATIONS.map((item, index) => (
                  <SelectItem
                    key={index}
                    value={item.value}
                    onClick={() =>
                      setLocations((prev) => ({
                        ...prev,
                        departure: item.value,
                      }))
                    }
                  >
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select
            onValueChange={(value) =>
              setLocations((prev) => ({
                ...prev,
                destination: value,
              }))
            }
          >
            <SelectTrigger className="w-[200px] focus-visible:ring-transparent">
              <SelectValue placeholder="Chọn điểm đến" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {LOCATIONS.map((item, index) => (
                  <SelectItem key={index} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <InputWithIcon
            Icon={Search}
            placeholder="Giờ xe chạy"
            className="w-[35%]"
            onChange={debounce((e: React.ChangeEvent<HTMLInputElement>) => {
              setSearch(e.target.value);
            }, 1000)}
          />
        </div>
      </div>
      <div className="flex gap-2 flex-col">
        <CustomTable
          columns={columns}
          data={trips?.data || []}
          isLoading={loading}
          wrapperClassName="2xl:max-h-[78vh]  xl:max-h-[72vh]"
        />

        {!loading && (
          <TablePagination
            pageIndex={trips?.index || 1}
            pageSize={trips?.limit || pageSize}
            totalCount={trips?.total || 0}
            onChangePage={(pageIndex) => getTrips(pageIndex)}
            onChangePageSize={(pageSize) => setPageSize(pageSize)}
          />
        )}
      </div>

      {open && (
        <TripDialog
          open={open}
          setOpen={setOpen}
          type={type}
          id={id}
          reload={getTrips}
          setType={setType}
        />
      )}
    </div>
  );
}

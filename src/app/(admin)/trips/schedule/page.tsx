"use client";
import ActionClick from "@/components/ActionClick";
import InputWithIcon from "@/components/CustomInput/InputWithIcon";
import CustomTable from "@/components/CustomTable";
import TablePagination from "@/components/CustomTable/PaginationCustom";
import TripScheduleDialog from "@/components/Dialog/TripScheduleDialog";
import { Button } from "@/components/ui/button";
import { ACTION } from "@/constants/action";

import useLoadingStore from "@/hooks/useLoading";
import { IScheduleTripResponse } from "@/interface/schedule.interface";
import { getAllTripSchedule, IParamsGetTripSchedule } from "@/services/trips";
import { debounce } from "lodash";
import { Plus, Search } from "lucide-react";
import React from "react";

export default function page() {
  const [tripSchedule, setTripSchedule] =
    React.useState<IScheduleTripResponse>();
  const [search, setSearch] = React.useState<string>("");
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

  const daysMap: { [key: string]: string } = {
    "2": "Thứ 2",
    "3": "Thứ 3",
    "4": "Thứ 4",
    "5": "Thứ 5",
    "6": "Thứ 6",
    "7": "Thứ 7",
    "cn": "Chủ nhật",
  };

  const columns: any[] = React.useMemo(
    () => [
      {
        header: "No.",
        id: "no",
        cell: ({ row }: any) => {
          const pageIndex = tripSchedule?.index || 1;
          const pageSize = tripSchedule?.limit || 10;
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
          cellClassName: "py-5 w-[10%] ",
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
          cellClassName: "py-5 w-[10%] ",
        },
      },
      {
        header: "Thời gian xe chạy",
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
        header: "Lịch trình",
        id: "schedule",
        accessorKey: "schedule",
        cell: ({ row }: any) => {
          return row?.original?.schedule
            ?.map((day: string) => daysMap[day] || day) 
            .join(" - ");
        },
        meta: {
          cellClassName: "py-5 w-[40%] ",
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
    [JSON.stringify(tripSchedule)]
  );

  const getScheduleTrip = async (pageIndex: number) => {
    startLoading();
    const params: IParamsGetTripSchedule = {
      limit: pageSize,
      index: pageIndex,
      sort: "asc",
      departure: search,
    };
    try {
      const response = await getAllTripSchedule(params);
      setTripSchedule(response);
    } catch (error) {
      console.error("Error fetching cars: ", error);
    } finally {
      stopLoading();
    }
  };

  React.useEffect(() => {
    getScheduleTrip(1);
  }, [pageSize, search]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-5">
        <h3 className="font-bold text-xl uppercase">Danh sách lịch trình</h3>

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
          data={tripSchedule?.data || []}
          isLoading={loading}
          wrapperClassName="2xl:max-h-[78vh]  xl:max-h-[72vh]"
        />

        {!loading && (
          <TablePagination
            pageIndex={tripSchedule?.index || 1}
            pageSize={tripSchedule?.limit || pageSize}
            totalCount={tripSchedule?.total || 0}
            onChangePage={(pageIndex) => getScheduleTrip(pageIndex)}
            onChangePageSize={(pageSize) => setPageSize(pageSize)}
          />
        )}
      </div>

      {open && type && (
        <TripScheduleDialog
          open={open}
          setOpen={setOpen}
          type={type}
          id={id}
          reload={getScheduleTrip}
          setType={setType}
        />
      )}
    </div>
  );
}

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
import { IRouteResponse } from "@/interface/route.interface";
import { getAllRoute } from "@/services/route";
import RouteDialog from "@/components/Dialog/RouteDialog";

interface IRouteParams {
  limit?: number;
  index?: number;
  sort?: "asc";
  destination?: string;
  departure?: string;
}

export default function page() {
  const [route, setRoute] = React.useState<IRouteResponse>();
  const [locations, setLocations] = React.useState({
    departure: "",
    destination: "",
  });

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
          const pageIndex = route?.index || 1;
          const pageSize = route?.limit || 10;
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
          cellClassName: "py-5 w-[37.5%] ",
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
          cellClassName: "py-5 w-[37.5%] ",
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
    [JSON.stringify(route)]
  );

  const getScheduleTrip = async (pageIndex: number) => {
    startLoading();
    const params: IRouteParams = {
      limit: pageSize,
      index: pageIndex,
      sort: "asc",
      destination: locations.destination,
      departure: locations.departure,
    };
    try {
      const response = await getAllRoute(params);
      setRoute(response);
    } catch (error) {
      console.error("Error fetching route: ", error);
    } finally {
      stopLoading();
    }
  };

  React.useEffect(() => {
    getScheduleTrip(1);
  }, [pageSize, locations.departure, locations.destination]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-5">
        <h3 className="font-bold text-xl uppercase">Danh sách tuyến đường</h3>

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
                  <SelectItem key={index} value={item.value}>
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
          data={route?.data || []}
          isLoading={loading}
          wrapperClassName="2xl:max-h-[78vh]  xl:max-h-[72vh]"
        />

        {!loading && (
          <TablePagination
            pageIndex={route?.index || 1}
            pageSize={route?.limit || pageSize}
            totalCount={route?.total || 0}
            onChangePage={(pageIndex) => getScheduleTrip(pageIndex)}
            onChangePageSize={(pageSize) => setPageSize(pageSize)}
          />
        )}
      </div>

      {open && type && (
        <RouteDialog
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

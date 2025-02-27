"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { StarIcon } from "lucide-react";
import { useEffect, useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Nguyễn Văn Hưng",
    designation: "Khách hàng",
    company: "Cá nhân",
    testimonial:
      "Dịch vụ vận chuyển hành khách rất chuyên nghiệp! Xe sạch sẽ, ghế ngồi thoải mái, tài xế thân thiện và luôn đúng giờ. Tôi cảm thấy rất an tâm khi lựa chọn nhà xe này cho những chuyến đi xa.",
    avatar: "https://randomuser.me/api/portraits/men/10.jpg",
  },
  {
    id: 2,
    name: "Trần Thị Mai",
    designation: "Chủ cửa hàng",
    company: "Mai Store",
    testimonial:
      "Dịch vụ vận chuyển hàng hóa nhanh chóng, an toàn. Hàng của tôi luôn đến đúng hẹn và được bảo quản cẩn thận. Tôi hoàn toàn hài lòng và sẽ tiếp tục sử dụng dịch vụ.",
    avatar: "https://randomuser.me/api/portraits/women/11.jpg",
  },
  {
    id: 3,
    name: "Phạm Quốc Anh",
    designation: "Giám đốc điều hành",
    company: "Du Lịch Xanh",
    testimonial:
      "Chúng tôi thường xuyên thuê xe du lịch cho khách hàng của mình. Xe luôn mới, tài xế chuyên nghiệp và giá cả hợp lý. Dịch vụ đặt xe cũng rất nhanh chóng và tiện lợi.",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    id: 4,
    name: "Lê Minh Phúc",
    designation: "Chuyên viên logistics",
    company: "Vận Tải Nhanh",
    testimonial:
      "Dịch vụ vận chuyển xe cộ đáng tin cậy! Tôi đã gửi ô tô của mình đi tỉnh và nhận lại trong tình trạng nguyên vẹn, đúng lịch trình. Quá trình vận chuyển rất chuyên nghiệp và giá hợp lý.",
    avatar: "https://randomuser.me/api/portraits/men/13.jpg",
  },
  {
    id: 5,
    name: "Hoàng Thị Lan",
    designation: "Quản lý vận hành",
    company: "Công ty Xuất Nhập Khẩu ABC",
    testimonial:
      "Chúng tôi đã ký hợp đồng vận tải dài hạn với công ty này và rất hài lòng. Hệ thống xe hiện đại, đội ngũ tài xế chuyên nghiệp và khả năng đáp ứng linh hoạt với nhu cầu vận chuyển của chúng tôi.",
    avatar: "https://randomuser.me/api/portraits/women/14.jpg",
  },
];

const Testimonial06 = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className=" w-full flex justify-center items-center py-12 px-6 bg-gray-50">
      <div className="w-full">
        <h2 className="mb-14 text-3xl laptop:text-4xl font-bold text-center tracking-tight">
          Đánh giá từ khách hàng
        </h2>
        <div className="container w-full lg:max-w-screen-lg xl:max-w-screen-xl mx-auto px-12">
          <Carousel setApi={setApi}>
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id}>
                  <TestimonialCard testimonial={testimonial} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div className="flex items-center justify-center gap-2">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={cn("h-3.5 w-3.5 rounded-full border-2", {
                  "bg-primary border-primary": current === index + 1,
                })}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const TestimonialCard = ({
  testimonial,
}: {
  testimonial: (typeof testimonials)[number];
}) => (
  <div className="mb-8 bg-accent rounded-xl py-8 px-6 sm:py-6">
    <div className="flex items-center justify-between gap-20">
      <div className="hidden lg:block relative shrink-0 aspect-[3/4] max-w-[18rem] w-full bg-muted-foreground/20 rounded-xl">
        <div className="absolute top-1/4 right-0 translate-x-1/2 h-12 w-12 bg-primary rounded-full flex items-center justify-center">
          <svg
            width="102"
            height="102"
            viewBox="0 0 102 102"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
          >
            <path
              d="M26.0063 19.8917C30.0826 19.8625 33.7081 20.9066 36.8826 23.024C40.057 25.1414 42.5746 28.0279 44.4353 31.6835C46.2959 35.339 47.2423 39.4088 47.2744 43.8927C47.327 51.2301 44.9837 58.4318 40.2444 65.4978C35.4039 72.6664 28.5671 78.5755 19.734 83.2249L2.54766 74.1759C8.33598 71.2808 13.2548 67.9334 17.3041 64.1335C21.2515 60.3344 23.9203 55.8821 25.3105 50.7765C20.5179 50.4031 16.6348 48.9532 13.6612 46.4267C10.5864 44.0028 9.03329 40.5999 9.00188 36.2178C8.97047 31.8358 10.5227 28.0029 13.6584 24.7192C16.693 21.5381 20.809 19.9289 26.0063 19.8917ZM77.0623 19.5257C81.1387 19.4965 84.7641 20.5406 87.9386 22.6581C91.1131 24.7755 93.6306 27.662 95.4913 31.3175C97.3519 34.9731 98.2983 39.0428 98.3304 43.5268C98.383 50.8642 96.0397 58.0659 91.3004 65.1319C86.4599 72.3005 79.6231 78.2095 70.79 82.859L53.6037 73.8099C59.392 70.9149 64.3108 67.5674 68.3601 63.7676C72.3075 59.9685 74.9763 55.5161 76.3665 50.4105C71.5739 50.0372 67.6908 48.5873 64.7172 46.0608C61.6424 43.6369 60.0893 40.2339 60.0579 35.8519C60.0265 31.4698 61.5787 27.6369 64.7145 24.3532C67.7491 21.1722 71.865 19.563 77.0623 19.5257Z"
              className="fill-primary-foreground"
            />
          </svg>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <div className="flex items-center justify-between gap-1">
          <div className="hidden sm:flex md:hidden items-center gap-4">
            <Avatar className="w-8 h-8 md:w-10 md:h-10">
              <AvatarImage src={testimonial.avatar} alt="@shadcn" />
              <AvatarFallback className="text-xl font-medium bg-primary text-primary-foreground">
                {testimonial.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-lg font-semibold">{testimonial.avatar}</p>
              <p className="text-sm text-gray-500">{testimonial.designation}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <StarIcon
                key={index}
                className="w-5 h-5 fill-muted-foreground stroke-muted-foreground"
              />
            ))}
          </div>
        </div>
        <p className="mt-6 text-lg sm:text-2xl lg:text-[1.75rem] xl:text-3xl leading-normal lg:!leading-normal font-semibold tracking-tight">
          &quot;{testimonial.testimonial}&quot;
        </p>
        <div className="flex sm:hidden md:flex mt-6 items-center gap-4">
          <Avatar>
            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
            <AvatarFallback className="text-xl font-medium bg-primary text-primary-foreground">
              {testimonial.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-lg font-semibold">{testimonial.name}</p>
            <p className="text-sm text-gray-500">{testimonial.designation}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Testimonial06;

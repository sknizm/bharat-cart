import { BannerType } from "@/lib/types";
import { Card } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

export function Banner({
  name,
  description,
  banner,
}: {
  name?: string;
  description?: string;
  banner?: BannerType[];
}) {
  if (!name) return null;

  return (
    <div className="w-full">
      {banner && banner.length > 0 ? (
        <Carousel className="w-full">
          <CarouselContent>
            {banner.map((item, i) => (
              <CarouselItem key={i} className="w-full">
                <div className="aspect-[16/9] w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.url}
                    alt={name || "banner"}
                    className="w-full h-full object-cover rounded-md md:rounded-lg"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {banner.length > 1 && (
            <>
              <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 p-2 md:p-3 bg-white rounded shadow" />
              <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 p-2 md:p-3 bg-white rounded shadow" />
            </>
          )}
        </Carousel>
      ) : (
        <div className="relative overflow-hidden rounded-xl aspect-[16/9]">
          <Card
            className={`
              w-full h-full flex items-center justify-center 
              bg-gradient-to-r from-green-500 to-green-600
              p-6 text-center relative overflow-hidden
            `}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-20 -left-20 w-64 h-64 rounded-full bg-white" />
              <div className="absolute bottom-10 -right-10 w-80 h-80 rounded-full bg-white" />
            </div>

            <div className="relative z-10 space-y-4">
              <h1 className="text-3xl md:text-5xl font-bold text-white">
                Welcome to{" "}
                <span className="text-yellow-300 block">{name}</span>
              </h1>
              {description && (
                <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto">
                  {description}
                </p>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

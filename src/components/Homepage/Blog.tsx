import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";


const Blog01Page = () => {
  return (
    <div className="max-w-screen-xl mx-auto py-16 px-6 xl:px-0">
      <div className="flex items-center justify-center">
        <h2 className="text-3xl laptop:text-4xl font-bold tracking-tight">Tin tức cập nhật</h2>
      </div>

      <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {[0, 1, 2].map((i) => (
          <Card key={i} className="shadow-none">
            <CardHeader className="p-2">
              <div className="aspect-video bg-muted rounded-lg w-full" />
            </CardHeader>
            <CardContent className="pt-4 pb-5">
              <Badge>Technology</Badge>

              <h3 className="mt-4 text-[1.35rem] font-semibold tracking-tight">
                What is the future of web development?
              </h3>
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-muted"></div>
                  <span className="text-muted-foreground font-semibold">
                    John Doe
                  </span>
                </div>

                <span className="text-muted-foreground text-sm">
                  Nov 30, 2024
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Blog01Page;

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid gap-x-8 p-0 md:grid-cols-2">
          <form className="px-8 py-8 md:px-10 md:py-10">
            <div>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Create an account</h1>
                <p className="text-balance text-muted-foreground">
                  Sign up to get started with CricPitch
                </p>
              </div>
              <div className="mt-6 space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="mt-4 space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="mt-4 space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </div>
              <div className="mt-6">
                <Button className="w-full" type="submit">
                  Sign Up
                </Button>
              </div>

              <p className="mt-4 text-center text-sm text-muted-foreground">
                Already have an account? <Link to="/login" className="underline-offset-4 hover:underline">Login</Link>
              </p>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/auth/login.jpg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <p className="px-6 text-center text-sm text-muted-foreground">
        By clicking continue, you agree to our <Link to="#" className="underline-offset-4 hover:underline">Terms of Service</Link>{" "}
        and <Link to="#" className="underline-offset-4 hover:underline">Privacy Policy</Link>.
      </p>
    </div>
  );
}

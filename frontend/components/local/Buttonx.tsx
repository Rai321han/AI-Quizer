import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ButtonProps } from "react-day-picker";

export default function Buttonx({
  children,
  className,
  isLoading,
  ...rest
}: ButtonProps & { isLoading?: boolean }) {
  return (
    <Button
      disabled={isLoading}
      className={cn(
        "px-3 py-0 font-mono font-semibold cursor-pointer transition-all duration-75  border-border/20 bg-[#2eff9b] hover:bg-[#2eff9b]/80 text-black rounded",
        `${isLoading ? "border-b-1" : "border-b-4 hover:border-b-1"}`,
        className,
      )}
      {...rest}
    >
      {children}
    </Button>
  );
}

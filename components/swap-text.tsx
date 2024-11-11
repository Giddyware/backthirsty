"use client";

import { ReactNode, useState } from "react";

import { cn } from "@/lib/utils";

interface SwapTextProps extends React.ComponentPropsWithoutRef<"div"> {
  /**
   * The initial content to display.
   */
  initialContent: string | ReactNode;

  /**
   * The final content to display.
   */
  finalContent: string | ReactNode;

  /**
   * Whether the component should toggle on hover as well as click.
   */
  supportsHover?: boolean;

  /**
   * The class name for the content.
   */
  textClassName?: string;

  /**
   * The class name for the initial content.
   */
  initialContentClassName?: string;

  /**
   * The class name for the final content.
   */
  finalContentClassName?: string;

  /**
   * Whether to disable the click interaction.
   */
  disableClick?: boolean;
}

export default function SwapText({
  initialContent,
  finalContent,
  className,
  supportsHover = true,
  textClassName,
  initialContentClassName,
  finalContentClassName,
  disableClick,
  // The rest of the props are passed to the container div.
  ...props
}: SwapTextProps) {
  const [active, setActive] = useState(false);
  const common = "block transition-all duration-1000 ease-slow";

  const longWord =
    typeof finalContent === "string" &&
    typeof initialContent === "string" &&
    finalContent.length > initialContent.length
      ? finalContent
      : null;

  return (
    <div
      {...props}
      className={cn(
        "relative overflow-hidden text-[#7A7A7A] border-[#7A7A7A] border-b",
        className
      )}
    >
      <div
        className={cn(
          "group cursor-pointer select-none text-3xl font-normal",
          textClassName
        )}
        onClick={() => !disableClick && setActive((current) => !current)}
      >
        <span
          className={cn(common, initialContentClassName, {
            "flex flex-col": true,
            "-translate-y-full": active,
            "group-hover:-translate-y-full": supportsHover,
          })}
        >
          {initialContent}
          {
            /* Trick to make sure it can always fit all available words after transition as the second word is set to absolute*/
            Boolean(longWord?.length) && (
              <span className="invisible h-0">{longWord}</span>
            )
          }
        </span>
        <span
          className={cn(`${common} absolute top-full`, finalContentClassName, {
            "-translate-y-full": active,
            "group-hover:-translate-y-full": supportsHover,
          })}
        >
          {finalContent}
        </span>
      </div>
    </div>
  );
}

export const BackgroundPattern = () => {
  return (
    <>
      <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] size-[20%] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(13, 27, 26,1),rgba(255,255,255,0))]" />
      <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-[#284137] [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
            width={100}
            height={100}
            x="50%"
            y={-1}
            patternUnits="userSpaceOnUse"
          >
            <path d="M100 200V.5M.5 .5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y={-1} className="overflow-visible fill-[#10251e]">
          <path
            d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
            strokeWidth={0}
          />
        </svg>
        <rect
          width="100%"
          height="100%"
          strokeWidth={0}
          fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
        />
      </svg>
    </>
  );
};

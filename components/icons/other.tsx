const OtherIcon = (props: React.SVGAttributes<SVGElement>) => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 256 256"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M255.31,196.75l-64-144A8,8,0,0,0,184,48H72a8,8,0,0,0-7.31,4.75h0l0,.12v0L.69,196.75A8,8,0,0,0,8,208H248a8,8,0,0,0,7.31-11.25ZM64,192H20.31L64,93.7Zm16,0V93.7L123.69,192Z"></path>
    </svg>
  );
};

export default OtherIcon;

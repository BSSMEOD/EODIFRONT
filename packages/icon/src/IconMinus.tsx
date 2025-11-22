import { SVGProps } from 'react';

const IconMinus = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      viewBox="0 0 10 2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.75 0.75H8.75"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconMinus;

import type { IconProps } from './IconProps';

function Curve({ width = 20, height = 20, stroke = '#000' }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.5 16.6666C13.3333 16.6666 11.6493 13.2986 10 9.99995C8.35067 6.70128 6.66667 3.33328 2.5 3.33328"
        stroke={stroke}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M0.833344 3.33329C0.833344 2.41279 1.57944 1.66663 2.49994 1.66663C3.42044 1.66663 4.16664 2.41279 4.16664 3.33329C4.16664 4.25379 3.42044 4.99996 2.49994 4.99996C1.57944 4.99996 0.833344 4.25379 0.833344 3.33329Z"
        fill={stroke}
        stroke={stroke}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.1667 16.6666C19.1667 15.7461 18.4205 14.9999 17.5 14.9999C16.5795 14.9999 15.8333 15.7461 15.8333 16.6666C15.8333 17.5871 16.5795 18.3333 17.5 18.3333C18.4205 18.3333 19.1667 17.5871 19.1667 16.6666Z"
        fill={stroke}
        stroke={stroke}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Curve;

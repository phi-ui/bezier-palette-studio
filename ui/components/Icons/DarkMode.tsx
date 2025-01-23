import type { IconProps } from './IconProps';

function DarkMode({ width = 20, height = 20, fill = '#000' }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      role="img"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 1.25C6.06292 1.25 1.25 6.06292 1.25 12C1.25 17.9369 6.06291 22.75 12 22.75C17.9371 22.75 22.75 17.9369 22.75 12C22.75 6.06292 17.9371 1.25 12 1.25ZM20.7955 12.0005C20.7955 16.858 16.8576 20.796 12 20.796L12 17C14.7614 17 17 14.7613 17 12C17 9.23857 14.7614 7 12 7L12 3.20508C16.8576 3.20508 20.7955 7.14292 20.7955 12.0005ZM12 7C9.23857 7 7 9.23857 7 12C7 14.7613 9.23857 17 12 17L12 7Z"
        fill={fill}
      />
    </svg>
  );
}

export default DarkMode;

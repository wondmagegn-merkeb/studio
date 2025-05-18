
import type { SVGProps } from 'react';

export function PetalIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="currentColor"
      {...props}
    >
      <path d="M50 0 C20 20, 20 70, 50 100 C80 70, 80 20, 50 0 Z" />
    </svg>
  );
}

// icon:user_male_circle | System UIcons https://systemuicons.com/ | Corey Ginnivan
import * as React from "react";

function IconUser(props) {
  return (
    <svg
      viewBox="0 0 21 21"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(2 2)"
      >
        <path d="M16.5 8.5 A8 8 0 0 1 8.5 16.5 A8 8 0 0 1 0.5 8.5 A8 8 0 0 1 16.5 8.5 z" />
        <path d="M14.5 13.5c-.662-2.274-3.2-3.025-6-3.025-2.727 0-5.27.869-6 3.025" />
        <path d="M8.5 2.5a3 3 0 013 3v2a3 3 0 01-6 0v-2a3 3 0 013-3z" />
      </g>
    </svg>
  );
}

export default IconUser;

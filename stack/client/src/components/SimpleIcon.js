import React from "react";

const SimpleIcon = ({
  path,
  size = 16,
  fill = 'currentcolor',
  ...props,
}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      width={size}
      height={size}
      fill={fill}
      fillRule='evenodd'
      clipRule='evenodd'
      strokeLinejoin='round'
      strokeMiterlimit='1.414'
      {...props}>
      <path
        fillRule='nonzero'
        d={path} />
    </svg>
  )
}

export default SimpleIcon;

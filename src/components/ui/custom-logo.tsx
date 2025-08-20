import React from 'react';

const CustomTextLogo = ({text}:{text:string}) => {
  return (
    <div className="flex items-center text-center justify-center px-4 py-2 bg-green-100 rounded-4xl max-w-40">
     
      <span className=" text-sm font-extrabold tracking-tight text-black">
        <span className="text-green-700"></span>{text}</span>
    </div>
  );
};

export default CustomTextLogo;
import Image, { ImageProps } from "next/image";
import React, { useState } from "react";

const ImageFallBack = ({ src, alt, ...props }: ImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);
  console.log(src);
  return (
    <Image
      {...props}
      alt={alt}
      src={imgSrc}
      onError={() => {
        console.log("on error");
        setImgSrc("/no-image.svg");
      }}
    />
  );
};

export default ImageFallBack;

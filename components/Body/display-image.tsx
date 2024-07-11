import React from 'react';
import { useStateContext } from '@/context';
import Image from 'next/image';

const DisplayImage: React.FC = () => {
  const { bgimage } = useStateContext();

  return (
    <div className="flex flex-wrap gap-4">
      {bgimage.map((imageSrc, index) => (
        <Image
          key={index}
          src={imageSrc}
          alt={`Pexels image ${index}`}
          className="w-full h-auto rounded-md"
          width={100}
          height={100}
        />
      ))}
    </div>
  );
};

export default DisplayImage;

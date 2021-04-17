import SimpleImageSlider from 'react-simple-image-slider';
import React from 'react';
import { generateKey } from '../../helpers';

interface SlideshowProp {
  images: string[];
  width?: number;
  height?: number;
}

const Slideshow: React.FC<SlideshowProp> = ({ images, width, height }) => {
  const data = images.map((image) => ({
    url: image
  }));

  if (!width) {
    width = 200;
  }

  if (!height) {
    height = 280;
  }

  return (
    <div className='slide-container'>
      <SimpleImageSlider width={width} height={height} images={data} showNavs={false} showBullets={true} />
    </div>
  );
};

export default Slideshow;

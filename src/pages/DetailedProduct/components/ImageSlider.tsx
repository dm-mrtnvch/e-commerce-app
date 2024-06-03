import React, { MouseEventHandler } from 'react';
import Slider from 'react-slick';
import { Box } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function NextArrow({ onClick }: { onClick?: MouseEventHandler<HTMLDivElement> }) {
  return (
    <div
      onClick={onClick}
      style={{
        position: 'absolute',
        right: '0',
        padding: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        zIndex: 1,
      }}
    >
      <ArrowForwardIosIcon style={{ color: 'gray' }} />
    </div>
  );
}

function PrevArrow({ onClick }: { onClick?: MouseEventHandler<HTMLDivElement> }) {
  return (
    <div
      onClick={onClick}
      style={{
        position: 'absolute',
        left: '0',
        padding: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        zIndex: 1,
      }}
    >
      <ArrowBackIosNewIcon style={{ color: 'gray' }} />
    </div>
  );
}

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  adaptiveHeight: true,
  appendDots: (dots: React.ReactNode) => (
    <div
      style={{
        position: 'absolute',
        bottom: '10px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ul style={{ margin: 0, padding: 0 }}> {dots} </ul>
    </div>
  ),
};

interface ImageSliderProps {
  images: { url: string }[];
  onImageClick?: (index: number) => void;
  initialSlide?: number;
  fullScreen?: boolean;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, onImageClick, initialSlide = 0, fullScreen = false }) => (
  <Slider {...settings} initialSlide={initialSlide}>
    {images.length &&
      images.map((image, index) => (
        <Box
          key={index}
          component='img'
          sx={{ width: '100%', height: fullScreen ? '100vh' : 400, objectFit: 'contain', cursor: 'pointer' }}
          src={image.url}
          alt={`Product Image ${index}`}
          onClick={() => onImageClick && onImageClick(index)}
        />
      ))}
  </Slider>
);

export default ImageSlider;

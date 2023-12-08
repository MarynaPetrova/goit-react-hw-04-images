import React from 'react';
import {
  StyledImageGalleryItem,
  ImageGalleryItemPic,
} from './ImageGalleryItem.styled';

const ImageGalleryItem = React.memo(({ image, onOpenModal }) => {
  return (
    <StyledImageGalleryItem as="li">
      <ImageGalleryItemPic
        height={260}
        src={image.webformatURL}
        alt={image.tags}
        onClick={() => onOpenModal(image)}
      />
    </StyledImageGalleryItem>
  );
});

export { ImageGalleryItem };

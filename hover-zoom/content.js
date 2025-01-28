document.addEventListener('mouseover', (event) => {
  const img = event.target;
  if (img.tagName === 'IMG') {
    const zoomedImg = new Image();

    // Get the image source, prioritizing the largest from srcset
    let src = img.src;
    const srcset = img.getAttribute('srcset');
    if (srcset) {
      const srcsetParts = srcset.split(', ');
      const bestSrc = srcsetParts.reduce((best, current) => {
        const [width, height, url] = current.split(' ');
        const area = width * height;
        return area > best[0] ? [area, url] : best;
      }, [0, img.src]);
      src = bestSrc[1];
    }

    zoomedImg.src = src;
    zoomedImg.style.position = 'absolute';
    zoomedImg.style.zIndex = 9999;

    // Calculate available space, prioritizing width
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    // Calculate maximum width that fits within the viewport
    const minWidth = 800; // Set your desired minimum width
    const maxWidth = Math.min(viewportWidth - event.clientX - 10);


    // Calculate the corresponding height based on aspect ratio
    const maxHeight = maxWidth * imgHeight / imgWidth;

//    // Adjust height if it exceeds viewport height
//    if (maxHeight > viewportHeight - event.clientY - 10) {
//      maxHeight = viewportHeight - event.clientY - 10;
//     maxWidth = maxHeight * imgWidth / imgHeight;
//    }

    zoomedImg.style.width = maxWidth + 'px';
    zoomedImg.style.height = maxHeight + 'px';
    zoomedImg.style.left = event.clientX + 10 + 'px';
    zoomedImg.style.top = event.clientY + 10 + 'px';

    document.body.appendChild(zoomedImg);

    img.addEventListener('mouseout', () => {
      document.body.removeChild(zoomedImg);
    });
  }
});


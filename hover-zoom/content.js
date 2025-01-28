document.addEventListener('mouseover', (event) => {
  const img = event.target;
  if (img.tagName === 'IMG') {
    const imgRect = img.getBoundingClientRect();
    const zoomedImg = new Image();
    zoomedImg.src = img.src;
    zoomedImg.style.position = 'absolute';
    zoomedImg.style.top = imgRect.top + 'px';
    zoomedImg.style.left = imgRect.left + 'px';
    zoomedImg.style.zIndex = 9999;
    document.body.appendChild(zoomedImg);

    zoomedImg.addEventListener('load', () => {
      zoomedImg.style.width = '200px'; // Adjust the zoomed image size as needed
      zoomedImg.style.height = 'auto';
    });

    img.addEventListener('mouseout', () => {
      document.body.removeChild(zoomedImg);
    });
  }
});

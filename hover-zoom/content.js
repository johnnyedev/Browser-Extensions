document.addEventListener('mouseover', (event) => {
  const img = event.target;
  if (img.tagName === 'IMG') {
    const zoomedImg = new Image();
    zoomedImg.src = img.src;
    zoomedImg.style.position = 'absolute';
    zoomedImg.style.top = img.offsetTop + 'px';
    zoomedImg.style.left = img.offsetLeft + 'px';
    zoomedImg.style.zIndex = 9999;
    zoomedImg.style.width = '200px'; // Adjust the zoomed image size as needed
    zoomedImg.style.height = 'auto';

    // Add a timeout to delay the display of the zoomed image
    setTimeout(() => {
      document.body.appendChild(zoomedImg);
    }, 200); // Adjust the delay as needed

    img.addEventListener('mouseout', () => {
      document.body.removeChild(zoomedImg);
    });
  }
});

document.addEventListener('mouseover', (event) => {
  const img = event.target;
  if (img.tagName === 'IMG') {
    const zoomedImg = new Image();
    zoomedImg.src = img.src;
    zoomedImg.style.position = 'absolute';
    zoomedImg.style.zIndex = 9999;

    // Calculate the available space for the zoomed image
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    // Calculate the maximum width and height that can fit within the viewport
    let maxWidth = viewportWidth - event.clientX - 10;
    let maxHeight = viewportHeight - event.clientY - 10;

    // Adjust the width and height to fit the available space
    if (imgWidth > maxWidth) {
      zoomedImg.style.width = maxWidth + 'px';
      zoomedImg.style.height = (maxHeight * imgHeight / imgWidth) + 'px';
    } else {
      zoomedImg.style.width = imgWidth + 'px';
      zoomedImg.style.height = imgHeight + 'px';
    }

    // Position the zoomed image relative to the mouse cursor
    zoomedImg.style.left = event.clientX + 10 + 'px';
    zoomedImg.style.top = event.clientY + 10 + 'px';

    document.body.appendChild(zoomedImg);

    img.addEventListener('mouseout', () => {
      document.body.removeChild(zoomedImg);
    });
  }
});

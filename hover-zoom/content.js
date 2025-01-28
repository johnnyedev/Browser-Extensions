document.addEventListener('mouseover', (event) => {
  const img = event.target;
  if (img.tagName === 'IMG') {
    const zoomedImg = new Image();
    zoomedImg.src = img.src;
    zoomedImg.style.position = 'absolute';
    zoomedImg.style.width = '1200px'; // Adjust the zoomed image size as needed
    zoomedImg.style.height = 'auto';

    // Calculate the position of the zoomed image relative to the mouse cursor
    const x = event.clientX + 10; // Adjust the offset as needed
    const y = event.clientY + 10; // Adjust the offset as needed
    zoomedImg.style.left = x + 'px';
    zoomedImg.style.top = y + 'px';

    document.body.appendChild(zoomedImg);

    // Remove the zoomed image when the mouse moves away
    img.addEventListener('mouseout', () => {
      document.body.removeChild(zoomedImg);
    });
  }
});

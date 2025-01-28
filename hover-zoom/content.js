//chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//  if (request.action === 'toggleExtension') {
//    if (request.isActive) {

//console.log(scriptStatus);

if (scriptStatus = 'Enabled') {

console.log(scriptStatus);

document.addEventListener('mouseover', (event) => {
  const img = event.target;
  if (img.tagName === 'IMG') {
    zoomedImg = new Image();

    // Get the best image source (prioritizing srcset)
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
      console.log(src);
    };

    zoomedImg.src = src;
    zoomedImg.style.position = 'absolute';
    zoomedImg.style.zIndex = 9999;

    // Calculate available space, prioritizing width
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const imgWidth = zoomedImg.naturalWidth;
    const imgHeight = zoomedImg.naturalHeight;

    // Calculate the maximum area for the zoomed image (half the viewport area)
    const maxArea = viewportWidth * viewportHeight / 2;

    // Calculate the maximum width and height that fit within the max area
    let maxWidth = Math.sqrt(maxArea * imgWidth / imgHeight);
    let maxHeight = maxWidth * imgHeight / imgWidth;
    let whichSide = viewportWidth / 2;

    if (maxHeight > viewportHeight) {
       maxHeight = viewportHeight - 10;
    }

    const scrollYPos = window.scrollY;
    let yPosition = scrollYPos + 20;

    if (event.clientX >= whichSide) {
      zoomedImg.style.left = 100 + 'px';
      console.log("Image on left");
    } else {
      zoomedImg.style.left = (event.clientX + 25) + 'px';
      console.log("Image on right"); 
    }

    zoomedImg.style.top = yPosition + 'px';
    zoomedImg.style.width = maxWidth + 'px';
    zoomedImg.style.height = maxHeight + 'px';

    document.body.appendChild(zoomedImg);

    img.addEventListener('mouseout', (event) => {
        document.body.removeChild(zoomedImg);
     });

 }
});
// Start ending of our code that allows enable/disabling of script
      console.log("Content script enabled");
    } else {
      
      console.log("Content script disabled");
    };

scriptStatus = 'Disabled';
//}});


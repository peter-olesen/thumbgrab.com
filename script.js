document.getElementById("youtubeURL").addEventListener("input", function () {
  this.value = this.value.trim();
});

document
  .getElementById("youtubeURL")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      getThumbnails();
    }
  });

function getThumbnails() {
  const url = document.getElementById("youtubeURL").value;
  const videoID = extractVideoID(url);
  if (!videoID) {
    alert("Invalid YouTube URL");
    return;
  }

  const sizes = ["default", "mqdefault", "hqdefault", "maxresdefault"];
  let output = "";

  sizes.forEach((size) => {
    const imgURL = `https://img.youtube.com/vi/${videoID}/${size}.jpg`;
    output += `
            <div>
                <img src="${imgURL}" alt="Thumbnail">
                <a class="download-btn" href="${imgURL}" download="thumbnail-${size}.jpg">Download ${size}</a>
            </div>
        `;
  });

  document.getElementById("thumbnails").innerHTML = output;
}

function extractVideoID(url) {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

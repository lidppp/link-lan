export function readableBytes(bytes) {
  if (bytes === 0) return '0 B'
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  return `${(bytes / 1024 ** i).toFixed(2)} ${sizes[i]}`
}

export function downloadFile(buf, filename, cb=()=>{}) {
  const file = new File([buf], filename);

  function download(downloadFile) {
    const tmpLink = document.createElement("a");
    const objectUrl = URL.createObjectURL(downloadFile);

    tmpLink.href = objectUrl;
    tmpLink.classList.add("tempDownLink")
    tmpLink.download = downloadFile.name;
    document.body.appendChild(tmpLink);
    tmpLink.click();

    document.body.removeChild(tmpLink);
    URL.revokeObjectURL(objectUrl);
  }

  download(file);
  cb()
}

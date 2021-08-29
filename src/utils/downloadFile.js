import axios from 'axios';

/**
 * 通过URL获取文件后缀
 * @param {*} url
 * @returns
 */
export function getFileSuffix(url) {
  const suffix = url.match(/\.[^\.]*$/);
  return suffix && suffix[0]
}

/**
 * 通过URL的后缀判断文件类型
 * @param {通过} url
 * @returns
 */
export function getFileTypeByUrl(url) {
  const types = [
    {
      type: 'image',
      reg: /\.BMP|JPG|JPEG|PNG|GIF$/i,
    },
    {
      type: 'excel',
      reg: /\.xlsx|xls|csv$/i,
    },
    {
      type: 'pdf',
      reg: /\.pdf$/i,
    },
    {
      type: 'word',
      reg: /\.doc|docx$/i,
    },
  ]
  let type = '';

  types.some(conf => {
    if (conf.reg.test(url)) {
      type = conf.type;
      return true;
    }
  });

  return type;
}

/**
 * 下载图片和pdf避免了浏览器直接打开
 * @param {*} url
 * @param {*} name
 * @returns
 */
export function downloadImageAndPdf(url, name) {

  if (!getFileSuffix(name)) {
    name += '.' + getFileSuffix(url)
  }

  return axios.get(url, {
    responseType: 'blob'
  })
  .then(res => {
    return res.data;
  })
  .then(data => {
    const downloadUrl = window.URL.createObjectURL(data);
    const anchor = document.createElement("a");
    anchor.href = downloadUrl;
    anchor.download = name;
    anchor.click();
    window.URL.revokeObjectURL(data);
  });
}

/**
 * 通过URL下载文件。URL需要带后缀
 * 根据文件后缀来判断文件类型
 * @param {*} url
 * @param {*} name
 */
export function downloadFile(url, name) {
  const fileType = getFileTypeByUrl(url);

  if (/pdf|image/.test(fileType)) {
    downloadImageAndPdf(url, name);
  } else {
    window.open(url);
  }
}
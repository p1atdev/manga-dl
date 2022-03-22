import { JSZip } from "../deps.ts";

export const compress = async (
  datas: Uint8Array[],
): Promise<Blob> => {
  const zip = new JSZip();

  datas.forEach((data, index) => {
    if (!data) return;
    zip.addFile(`${index}.jpg`, data);
  });

  return await zip.generateAsync({
    type: "blob",
  });
};

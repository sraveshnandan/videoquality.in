import { cloudinary } from "@/libs/cloudinary";
import { Readable } from "stream";

// for generating unique refer code
const generateReferCode = (): string => {
  const prefix: string = "VidQ";
  const randomNumber: string = Math.floor(Math.random() * 90000) + 10000 + "";
  return prefix + randomNumber;
};

const UploadVideoToCloudinary = async (file: File, folder: string) => {
  // creating file buffer
  const bufer = await file.arrayBuffer();
  const chunks = new Uint8Array(bufer);

  return new Promise(async (resolve, reject) => {
    await cloudinary.uploader
      .upload_stream(
        { resource_type: "video", folder: folder },
        async (error, result) => {
          if (error) {
            console.log("videoupload error.", error);
            reject(error.message);
          }
          resolve(result);
        }
      )
      .end(chunks);
  });
};

export { generateReferCode, UploadVideoToCloudinary };

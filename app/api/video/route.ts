import { cloudinary } from "@/libs/cloudinary";
import { NextRequest } from "next/dist/server/web/spec-extension/request";
import { NextResponse } from "next/dist/server/web/spec-extension/response";

const handler = async (req: NextRequest) => {
  try {
    if (req.method === "GET") {
      return NextResponse.json({
        message: "Welcome",
      });
    }
    if (req.method === "POST") {
      const data = await req.formData();
      const video = data.get("video") as File;

      const bufer = await video.arrayBuffer();
      const chunks = new Uint8Array(bufer);

      const uploadResponse: any = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: "video",
            folder: "VideoQuality",
          },
          (err, res) => {
            if (err) {
              reject(err);
            } else {
              resolve(res);
            }
          }
        );
        uploadStream.end(chunks);
      });

      if (uploadResponse.secure_url) {
        return NextResponse.json({
          success: true,
          message: "Video uploaded successfully.",
          video_url: uploadResponse.secure_url,
        });
      }

      return NextResponse.json({
        success: false,
        message: "Unable to upload video to the server.",
      });
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
};

export { handler as GET, handler as POST };

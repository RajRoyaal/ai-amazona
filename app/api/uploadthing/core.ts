import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getToken } from "next-auth/jwt";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      const token = await getToken({ req });

      if (!token) throw new Error("Unauthorized");

      return { userId: token.sub };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter; 
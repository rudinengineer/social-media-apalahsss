import cloudinary, { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary'

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
    secure: true,
})

type UploadResponse = 
  { success: true; result?: UploadApiResponse } | 
  { success: false; error: UploadApiErrorResponse }

export const uploadToCloudinary = (
  fileUri: string): Promise<UploadResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader
      .upload(fileUri, {
        invalidate: true,
        resource_type: "auto",
      })
      .then((result: UploadApiResponse) => {
        resolve({ success: true, result })
      })
      .catch((error: any) => {
        reject({ success: false, error })
      })
  })
}

export default cloudinary
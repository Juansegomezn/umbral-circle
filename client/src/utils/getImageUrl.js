export const getImageUrl = (imagePath, defaultImage) => {
  if (!imagePath) return `/${defaultImage}`;
  
  if (imagePath.includes("http")) return imagePath;

  if (imagePath.startsWith("upload/") || imagePath.startsWith("/upload/")) {
    return imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  }

  return imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
};
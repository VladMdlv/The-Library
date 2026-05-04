import { COVERS_ORIGIN, PLACEHOLDER_NO_COVER } from "../constants/constants.js";

/** @param {"M"|"L"} size */
export function getCoverUrl(coverImageId, size) {
  if (!coverImageId) {
    return PLACEHOLDER_NO_COVER;
  }
  return `${COVERS_ORIGIN}/b/id/${coverImageId}-${size}.jpg`;
}

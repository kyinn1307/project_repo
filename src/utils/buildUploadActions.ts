export function buildUploadActions(localFiles: File[]) {
  return localFiles.map((_, idx) => ({
    fileId: null,
    action: "ADD" as const,
    order: idx + 1,
    fileIndex: idx,
  }));
}

import { RemoteFile } from "@/types/feed";

type Act = "KEEP" | "DELETE" | "ADD";
type FileAction = {
  fileId: number | null;
  action: Act;
  order?: number; // ✅ KEEP/ADD만
  fileIndex?: number; // ✅ ADD만
};

export function buildActionsMulti(
  initialServer: RemoteFile[],
  currentServer: RemoteFile[],
  locals: File[]
): FileAction[] {
  const actions: FileAction[] = [];

  const currentIdToIndex = new Map<number, number>();
  currentServer.forEach((f, idx) =>
    currentIdToIndex.set(Number(f.fileId), idx)
  );

  // 1) KEEP / DELETE
  initialServer.forEach((f) => {
    const id = Number(f.fileId);
    const curIdx = currentIdToIndex.get(id);

    if (curIdx !== undefined) {
      // ✅ KEEP: order만 기록
      actions.push({
        fileId: id,
        action: "KEEP",
        order: curIdx, // 필요시 +1
      });
    } else {
      // ✅ DELETE: order, fileIndex 없음
      actions.push({
        fileId: id,
        action: "DELETE",
      });
    }
  });

  // 2) ADD — fileIndex는 0..N-1
  const baseOrder = currentServer.length;
  locals.forEach((_, i) => {
    actions.push({
      fileId: null,
      action: "ADD",
      order: baseOrder + i, // 필요시 +1
      fileIndex: i, // 0,1,2,...
    });
  });

  return actions;
}

import { useMemo, useRef } from "react";
import clsx from "clsx";
import { Button } from "../button";
import { FileItem } from "../profile-detail/FileItem";
import { FileUploadIcon } from "@/assets/Icons/FileUploadIcon";
import { RemoteFile } from "@/types/feed";

type LocalMedia = { type: "image" | "audio"; file: File };

interface ProjectUploadSectionProps {
  serverPreviewFiles?: RemoteFile[];
  onRemoveServerPreview?: (type: "image" | "audio", index: number) => void;

  // 신규(통합)
  localCombined?: LocalMedia[];
  setLocalCombined?: (list: LocalMedia[]) => void;

  // 레거시(부모가 현재 사용 중)
  files?: File[];
  setFiles?: (files: File[]) => void;

  maxCount?: number;
}

export const ProjectUploadSection = ({
  serverPreviewFiles,
  onRemoveServerPreview,
  localCombined,
  setLocalCombined,
  files,
  setFiles,
  maxCount = 5,
}: ProjectUploadSectionProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 길이 계산은 "원천 props" 기준으로
  const serverLen = Array.isArray(serverPreviewFiles)
    ? serverPreviewFiles.length
    : 0;
  const localLen = Array.isArray(localCombined)
    ? localCombined.length
    : Array.isArray(files)
    ? files.length
    : 0;

  const totalCount = serverLen + localLen;
  const remain = Math.max(0, maxCount - totalCount);

  const handleUpload = () => {
    if (remain <= 0) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files ?? []);
    event.target.value = "";
    if (!selected.length) return;

    if (remain <= 0) {
      alert(`최대 ${maxCount}개의 파일 첨부가 가능합니다.`);
      return;
    }

    const allowed = selected.filter((f) => {
      const t = f.type || "";
      return t.startsWith("audio/") || t.startsWith("image/");
    });

    const slice = allowed.slice(0, remain);

    // localCombined 우선, 없으면 files로 업데이트
    if (
      Array.isArray(localCombined) &&
      typeof setLocalCombined === "function"
    ) {
      const toAdd: LocalMedia[] = slice.map((f) => ({
        type: (f.type || "").startsWith("image/") ? "image" : "audio",
        file: f,
      }));
      setLocalCombined([...localCombined, ...toAdd]);
    } else if (typeof setFiles === "function") {
      setFiles([...(files ?? []), ...slice]);
    }

    if (allowed.length > slice.length) {
      alert(
        `최대 ${maxCount}개까지 업로드 가능해요. ${remain}개만 추가되었습니다.`
      );
    }
    const rejected = selected.length - allowed.length;
    if (rejected > 0) {
      alert("지원 형식: MP3, WAV, AAC, FLAC, JPG, PNG, SVG");
    }
  };

  const handleRemoveLocal = (index: number) => {
    if (
      Array.isArray(localCombined) &&
      typeof setLocalCombined === "function"
    ) {
      const next = [...localCombined];
      next.splice(index, 1);
      setLocalCombined(next);
    } else if (typeof setFiles === "function") {
      const base = [...(files ?? [])];
      base.splice(index, 1);
      setFiles(base);
    }
  };

  // ✅ 파생값은 useMemo 안에서 계산하고, deps는 "원천 props"만!
  const combinedList = useMemo(() => {
    const inferTypeFromName = (
      name?: string
    ): "image" | "audio" | "unknown" => {
      const n = (name ?? "").toLowerCase();
      if (/\.(png|jpg|jpeg|gif|webp|svg)$/.test(n)) return "image";
      if (/\.(mp3|wav|aac|flac|ogg|m4a)$/.test(n)) return "audio";
      return "unknown";
    };

    const safeServer = Array.isArray(serverPreviewFiles)
      ? serverPreviewFiles
      : [];

    const localSource: LocalMedia[] = Array.isArray(localCombined)
      ? localCombined
      : Array.isArray(files)
      ? files.map((f) => ({
          type: (f.type || "").startsWith("image/") ? "image" : "audio",
          file: f,
        }))
      : [];

    const server = safeServer
      .filter((f): f is RemoteFile => !!f && !!f.originalFileName)
      .map((f, idx) => ({
        id: `server-${f.fileId ?? idx}`,
        filename: f.originalFileName!,
        isServer: true as const,
        type: inferTypeFromName(f.originalFileName),
        index: idx,
      }));

    const locals = localSource.map((m, idx) => ({
      id: `local-${idx}`,
      filename: m.file.name,
      isServer: false as const,
      type: m.type,
      index: idx,
    }));

    return [...server, ...locals];
  }, [serverPreviewFiles, localCombined, files]);

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center gap-[6px]">
      <FileUploadIcon />
      <Button
        className="w-[94px] h-[22px] bg-[#0050ef] text-white text-[10.5px] font-medium cursor-pointer"
        onClick={handleUpload}
        disabled={remain <= 0}
      >
        컴퓨터에서 선택
      </Button>
      <p className="text-[9px] text-[#777777]">
        지원 파일은 MP3, WAV, AAC, FLAC, JPG, PNG, SVG
      </p>
      <p className="text-[9px] text-[#777777]">
        첨부된 파일은 사용자들에게 공유됩니다.
      </p>
    </div>
  );

  return (
    <div
      className={clsx(
        "relative flex flex-col flex-1 bg-[#111111] p-[7.5px] rounded-[3.75px]",
        totalCount > 0 ? "min-h-[160px]" : "min-h-[132px]"
      )}
    >
      <div className="text-white font-medium text-[10.5px] mb-[7.5px]">
        첨부파일
      </div>
      <div className="flex-1 overflow-y-auto pr-[2px]">
        {totalCount > 0 ? (
          <div>
            <div className="flex flex-col overflow-y-auto max-h-[88px] gap-1">
              {combinedList.map((item) => (
                <FileItem
                  key={item.id}
                  filename={item.filename}
                  onRemove={() => {
                    if (item.isServer) {
                      const t = item.type === "audio" ? "audio" : "image";
                      onRemoveServerPreview?.(t, item.index);
                    } else {
                      handleRemoveLocal(item.index);
                    }
                  }}
                />
              ))}
            </div>
            <Button
              className="absolute bottom-[7.5px] left-1/2 -translate-x-1/2 w-[94px] h-[22px] bg-[#0050ef] text-white text-[10.5px] font-medium cursor-pointer"
              onClick={handleUpload}
            >
              컴퓨터에서 선택
            </Button>
          </div>
        ) : (
          <EmptyState />
        )}
      </div>

      <input
        type="file"
        accept="audio/*,image/*"
        multiple
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

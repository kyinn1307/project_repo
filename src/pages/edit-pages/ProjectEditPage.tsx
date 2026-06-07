import { useState, useEffect, useRef, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GenreSelector } from "@/components/ui/profile-detail/GenreSelector";
import { Button } from "@/components/ui/shadcn/button";
import { ProjectDetailInput } from "@/components/ui/upload/ProjectDetailInput";
import { ProjectUploadSection } from "@/components/ui/upload/ProjectUploadSection";
import { FieldSelector } from "@/components/ui/upload/FieldSelector";
import { CollaborationTypeSelector } from "@/components/ui/upload/CollaborationTypeSelector";
import { TitleInput } from "@/components/ui/profile-detail/TitleInput";
import type { Genre } from "@/types/music";
import { getProjectDetail, updateProject } from "@/apis/project";
import { RemoteFile } from "@/types/feed";
import { buildActionsMulti } from "@/utils/buildActionMulti";

type LocalMedia = { type: "image" | "audio"; file: File };

export const ProjectEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [collaboration, setCollaboration] = useState("");

  const [fields, setFields] = useState<string[]>([]);
  const [isMusician] = useState<boolean>(true);

  const [localCombined, setLocalCombined] = useState<LocalMedia[]>([]);

  // ✅ 서버 미리보기(초기/현재)도 타입별로 분리
  const [serverImagePreviewFiles, setServerImagePreviewFiles] = useState<
    RemoteFile[]
  >([]);
  const [serverAudioPreviewFiles, setServerAudioPreviewFiles] = useState<
    RemoteFile[]
  >([]);

  const initialImagePreviewRef = useRef<RemoteFile[]>([]);
  const initialAudioPreviewRef = useRef<RemoteFile[]>([]);

  // 타입별 로컬 파일 (buildActionsMulti에 넣기 위해 localCombined에서 파생)
  const localImageFiles = useMemo(
    () => localCombined.filter((m) => m.type === "image").map((m) => m.file),
    [localCombined]
  );
  const localAudioFiles = useMemo(
    () => localCombined.filter((m) => m.type === "audio").map((m) => m.file),
    [localCombined]
  );

  // 프로젝트 상세 정보 fetch
  useEffect(() => {
    if (!id) return;

    const fetchProject = async () => {
      try {
        const project = await getProjectDetail(Number(id));
        setTitle(project.title);
        setDescription(project.description);
        setFields(project.fields);
        setGenres(project.genres);
        setCollaboration(project.collaboration);
        // ✅ 이미지 + 오디오 합치기 (이미지 먼저)
        const imageList: RemoteFile[] = Array.isArray(project.imageFiles)
          ? project.imageFiles
          : [];

        const audioList: RemoteFile[] = Array.isArray(project.audioFiles)
          ? project.audioFiles
          : [];

        setServerImagePreviewFiles(imageList);
        setServerAudioPreviewFiles(audioList);

        initialImagePreviewRef.current = imageList;
        initialAudioPreviewRef.current = audioList;

        setLocalCombined([]);
      } catch (err) {
        console.error("프로젝트 조회 실패", err);
      }
    };

    fetchProject();
  }, [id]);

  // 타입별 액션
  const imageFileActions = useMemo(
    () =>
      buildActionsMulti(
        initialImagePreviewRef.current,
        serverImagePreviewFiles,
        localImageFiles
      ),
    [serverImagePreviewFiles, localImageFiles]
  );
  const audioFileActions = useMemo(
    () =>
      buildActionsMulti(
        initialAudioPreviewRef.current,
        serverAudioPreviewFiles,
        localAudioFiles
      ),
    [serverAudioPreviewFiles, localAudioFiles]
  );

  // 서버 미리보기 삭제
  const removeServerPreview = (type: "image" | "audio", index: number) => {
    if (type === "image") {
      setServerImagePreviewFiles((prev) => prev.filter((_, i) => i !== index));
    } else {
      setServerAudioPreviewFiles((prev) => prev.filter((_, i) => i !== index));
    }
  };

  function reindexAddsByGlobalOrder<
    T extends { action: string; fileIndex?: number }
  >(actions: T[], globalPositions: number[]): T[] {
    let p = 0;
    return actions.map((a) => {
      if (a.action === "ADD") {
        const gi = globalPositions[p++];
        return { ...a, fileIndex: gi };
      }
      return a;
    });
  }

  // 프로젝트 정보 수정
  const handleUpdate = async () => {
    if (!id) return;

    // 전역 인덱스 테이블 (새 파일만)
    const imageIndices: number[] = [];
    const audioIndices: number[] = [];
    localCombined.forEach((m, idx) => {
      if (m.type === "image") imageIndices.push(idx);
      else audioIndices.push(idx);
    });

    // 액션을 전역 인덱스로 덮어쓰기
    const fixedImageActions = reindexAddsByGlobalOrder(
      imageFileActions,
      imageIndices
    );
    const fixedAudioActions = reindexAddsByGlobalOrder(
      audioFileActions,
      audioIndices
    );

    const requestData = {
      title,
      description,
      genres,
      fields,
      isMusician,
      collaboration,
      imageFileActions: fixedImageActions,
      audioFileActions: fixedAudioActions,
    };

    console.log("audio file action", audioFileActions);
    console.log("image file action", imageFileActions);
    const formData = new FormData();
    formData.append(
      "data",
      new Blob([JSON.stringify(requestData)], { type: "application/json" })
    );

    // ★ 전역 순서 그대로 files에 담기 (서버가 전역 fileIndex를 해석)
    localCombined.forEach(({ file }) => formData.append("files", file));

    try {
      const res = await updateProject(Number(id), formData);
      console.log("response", res);
      alert("수정이 완료되었습니다.");
      navigate(`/my-profile`);
    } catch (error) {
      console.error("프로젝트 수정 실패:", error);
      alert("수정에 실패했습니다.");
    }
  };

  const mergedServerPreview: RemoteFile[] = [
    ...serverImagePreviewFiles,
    ...serverAudioPreviewFiles,
  ];

  return (
    <div className="w-[540px] bg-[#222222] p-[11.25px] rounded-[7.5px] mt-[5.5px]">
      <div className="flex items-center w-fit px-[22.5px] h-[22.5px] text-xs font-bold rounded-full bg-white/10 text-white mb-[7.5px]">
        프로젝트
      </div>
      <div className="flex flex-col gap-[7.5px]">
        <div>
          <div>
            <TitleInput value={title} setValue={setTitle} />
          </div>
        </div>
        <div className="flex flex-row">
          <CollaborationTypeSelector
            value={collaboration}
            setValue={setCollaboration}
          />
        </div>
        <div className="flex flex-row">
          <GenreSelector
            value={genres}
            setValue={setGenres}
            isRequired={true}
          />
        </div>
        <div className="flex flex-row">
          <FieldSelector
            value={fields}
            setValue={setFields}
            isRequired={true}
          />
        </div>
        <div className="flex flex-row">
          <ProjectDetailInput value={description} setValue={setDescription} />
        </div>
        <div className="flex flex-row gap-[7.5px]">
          <ProjectUploadSection
            serverPreviewFiles={mergedServerPreview}
            onRemoveServerPreview={removeServerPreview}
            localCombined={localCombined}
            setLocalCombined={setLocalCombined}
            maxCount={5}
          />
        </div>

        <div className="flex justify-center mb-[70px]">
          <Button
            className="w-15 h-[22.5px] bg-[#0050ef] text-xs font-medium cursor-pointer"
            onClick={handleUpdate}
          >
            업로드
          </Button>
        </div>
      </div>
    </div>
  );
};

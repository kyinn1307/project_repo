import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GenreSelector } from "@/components/ui/profile-detail/GenreSelector";
import { Button } from "@/components/ui/button";

import { ProjectDetailInput } from "@/components/ui/upload/ProjectDetailInput";
import { ProjectUploadSection } from "@/components/ui/upload/ProjectUploadSection";
import { FieldSelector } from "@/components/ui/upload/FieldSelector";
import { CollaborationTypeSelector } from "@/components/ui/upload/CollaborationTypeSelector";

import { TitleInput } from "@/components/ui/profile-detail/TitleInput";

import type { Genre } from "@/types/music";
import { getProjectDetail, updateProject } from "@/apis/project";

export const ProjectEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);

  const [fields, setFields] = useState<string[]>([]);
  const [isMusician] = useState<boolean>(true);
  const [audioFiles, setAudioFiles] = useState<File[]>([]);
  const [audioPreviewUrls, setAudioPreviewUrls] = useState<string[]>([]);

  // 프로젝트 상세 정보 fetch
  useEffect(() => {
    if (!id) return;

    const fetchTrack = async () => {
      try {
        const track = await getProjectDetail(Number(id));
        console.log(track);
        setTitle(track.title);
        setDescription(track.description);
        setFields(track.fields);
        setGenres(track.genres);
        setAudioPreviewUrls(track.fileUrls ?? []);
      } catch (err) {
        console.error("트랙 조회 실패", err);
      }
    };

    fetchTrack();
  }, [id]);

  // 프로젝트 정보 수정
  const handleUpdate = async () => {
    if (!id) return;

    const requestData = {
      title,
      description,
      genres,
      fields,
      isMusician,
    };

    const formData = new FormData();
    formData.append(
      "data",
      new Blob([JSON.stringify(requestData)], { type: "application/json" })
    );

    audioFiles.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const res = await updateProject(Number(id), formData);
      console.log(res);
      alert("수정이 완료되었습니다.");
      navigate(`/my-profile`);
    } catch (error) {
      console.error("프로젝트 수정 실패:", error);
      alert("수정에 실패했습니다.");
    }
  };

  return (
    <div className="w-[540px] bg-[#222222] px-[11.25px] py-[15px] rounded-[7.5px] mt-[5.5px]">
      <div className="flex flex-col gap-[7.5px]">
        <div>
          <div>
            <TitleInput value={title} setValue={setTitle} />
          </div>
        </div>
        <div className="flex flex-row">
          <CollaborationTypeSelector />
        </div>
        <div className="flex flex-row">
          <GenreSelector value={genres} setValue={setGenres} />
        </div>
        <div className="flex flex-row">
          <FieldSelector value={fields} setValue={setFields} />
        </div>
        <div className="flex flex-row">
          <ProjectDetailInput value={description} setValue={setDescription} />
        </div>
        <div className="flex flex-row gap-[7.5px]">
          <ProjectUploadSection
            files={audioFiles}
            setFiles={setAudioFiles}
            audioPreviewUrls={audioPreviewUrls}
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

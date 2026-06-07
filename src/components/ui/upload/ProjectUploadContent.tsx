import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/shadcn/button";
import { TitleInput } from "../profile-detail/TitleInput";
import { CollaborationTypeSelector } from "./CollaborationTypeSelector";
import { GenreSelector } from "../profile-detail/GenreSelector";
import { FieldSelector } from "./FieldSelector";
import { ProjectDetailInput } from "./ProjectDetailInput";
import { ProjectUploadSection } from "./ProjectUploadSection";
import { uploadProject } from "@/apis/project";
import type { Genre } from "@/types/music";

export const ProjectUploadContent = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [collaboration, setCollaboration] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);

  const [fields, setFields] = useState<string[]>([]);
  const [isMusician] = useState<boolean>(true);
  const [audioFiles, setAudioFiles] = useState<File[]>([]);

  const handleUpload = async () => {
    const requestData = {
      title,
      description,
      genres,
      fields,
      isMusician,
      collaboration,
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
      console.log(requestData);
      const res = await uploadProject(formData);
      console.log(res);
      alert("업로드 성공!");
      navigate("/");
    } catch (error) {
      console.error("업로드 실패:", error);
    }
  };

  return (
    <div className="flex flex-col gap-[7.5px]">
      <div>
        <TitleInput value={title} setValue={setTitle} />
      </div>
      <div>
        <CollaborationTypeSelector
          value={collaboration}
          setValue={setCollaboration}
        />
      </div>
      <div>
        <GenreSelector value={genres} setValue={setGenres} isRequired={true} />
      </div>
      <div>
        <FieldSelector value={fields} setValue={setFields} isRequired={true} />
      </div>
      <div>
        <ProjectDetailInput value={description} setValue={setDescription} />
      </div>
      <div>
        <ProjectUploadSection files={audioFiles} setFiles={setAudioFiles} />
      </div>

      <div className="flex justify-center mb-[70px]">
        <Button
          className="w-15 h-[22.5px] bg-[#0050ef] text-xs font-medium cursor-pointer"
          onClick={handleUpload}
        >
          업로드
        </Button>
      </div>
    </div>
  );
};

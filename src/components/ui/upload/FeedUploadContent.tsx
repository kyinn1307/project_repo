import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TitleInput } from "../profile-detail/TitleInput";
import { MusicTagSelector } from "@/components/ui/profile-detail/MusicTagSelector";
import { Button } from "@/components/ui/button";
import { ImageUploadSection } from "./ImageUploadSection";
import { MusicUploadSection } from "./MusicUploadSection";
import { LyricsInput } from "./LyricsInput";
import type { EmotionTag } from "@/types/music";
import { uploadFeed } from "@/apis/feed";
import { buildUploadActions } from "@/utils/buildUploadActions";

export const FeedUploadContent = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<EmotionTag[]>([]);
  const [audioFiles, setAudioFiles] = useState<File[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const audioFileActions = buildUploadActions(audioFiles);
  const imageFileActions = buildUploadActions(imageFiles);

  const handleUpload = async () => {
    const requestData = {
      title,
      description,
      tags,
      audioFileActions,
      imageFileActions,
    };

    const formData = new FormData();
    formData.append(
      "data",
      new Blob([JSON.stringify(requestData)], { type: "application/json" })
    );

    if (audioFiles) {
      audioFiles.forEach((file) => {
        formData.append("audio", file);
      });
    }

    if (imageFiles.length > 0) {
      imageFiles.forEach((file) => {
        formData.append("image", file);
      });
    }
    try {
      const res = await uploadFeed(formData);
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
        <LyricsInput value={description} setValue={setDescription} />
      </div>
      <div className="flex flex-row gap-[7.5px]">
        <MusicUploadSection files={audioFiles} setFiles={setAudioFiles} />
        <ImageUploadSection files={imageFiles} setFiles={setImageFiles} />
      </div>

      <div>
        <MusicTagSelector value={tags} setValue={setTags} />
      </div>
      <div className="flex justify-center mb-26">
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

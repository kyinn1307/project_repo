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

export const FeedUploadContent = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<EmotionTag[]>([]);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleUpload = async () => {
    const requestData = {
      title,
      description,
      tags,
    };

    const formData = new FormData();
    formData.append(
      "data",
      new Blob([JSON.stringify(requestData)], { type: "application/json" })
    );
    if (audioFile) formData.append("audio", audioFile); // ✅ 'audioFile' → 'audio'
    if (imageFile) formData.append("image", imageFile); // ✅ 'imageFile' → 'image'

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
        <MusicUploadSection file={audioFile} setFile={setAudioFile} />
        <ImageUploadSection file={imageFile} setFile={setImageFile} />
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

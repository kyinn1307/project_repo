import { useState } from "react";
import { uploadTrack } from "@/apis/music";
import { GenreSelector } from "@/components/ui/profile-detail/GenreSelector";
import { MusicTagSelector } from "@/components/ui/profile-detail/MusicTagSelector";
import { Button } from "@/components/ui/button";
import { TitleInput } from "../profile-detail/TitleInput";
import { LyricsInput } from "./LyricsInput";
import { CommentInput } from "./CommentInput";
import { MusicUploadSection } from "./MusicUploadSection";
import { ImageUploadSection } from "./ImageUploadSection";
import { AssignMemberSection } from "./AssignMemberSection";
import type { Genre } from "@/types/music";
import type { EmotionTag } from "@/types/music";
import { useNavigate } from "react-router-dom";

export const MusicUploadContent = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [description, setDescription] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [tags, setTags] = useState<EmotionTag[]>([]);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleUpload = async () => {
    const requestData = {
      title,
      lyrics,
      description,
      genres,
      tags,
    };

    const formData = new FormData();
    formData.append(
      "request",
      new Blob([JSON.stringify(requestData)], { type: "application/json" })
    );
    if (audioFile) formData.append("audioFile", audioFile);
    if (imageFile) formData.append("imageFile", imageFile);

    try {
      const res = await uploadTrack(formData);
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
      <div className="flex flex-row">
        <GenreSelector value={genres} setValue={setGenres} />
      </div>
      <div>
        <LyricsInput value={lyrics} setValue={setLyrics} />
      </div>
      <div>
        <CommentInput value={description} setValue={setDescription} />
      </div>
      <div className="flex flex-row gap-[7.5px]">
        <MusicUploadSection file={audioFile} setFile={setAudioFile} />
        <ImageUploadSection file={imageFile} setFile={setImageFile} />
      </div>
      <div>
        <AssignMemberSection />
      </div>
      <div>
        <MusicTagSelector value={tags} setValue={setTags} />
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

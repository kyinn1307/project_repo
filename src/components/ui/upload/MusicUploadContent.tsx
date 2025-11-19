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
import { Musician } from "@/types/musician";

export const MusicUploadContent = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [description, setDescription] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [tags, setTags] = useState<EmotionTag[]>([]);
  const [audioFiles, setAudioFiles] = useState<File[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<Musician[]>([]);

  const handleUpload = async () => {
    const requestData = {
      title,
      lyrics,
      description,
      genres,
      tags,
      participantUserIds: selectedMembers.map((m) => m.id),
    };

    const formData = new FormData();
    formData.append(
      "request",
      new Blob([JSON.stringify(requestData)], { type: "application/json" })
    );

    if (audioFiles.length > 0) {
      audioFiles.forEach((file) => {
        formData.append("audioFile", file);
      });
    }
    if (imageFiles.length > 0) {
      imageFiles.forEach((file) => {
        formData.append("imageFile", file);
      });
    }

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
        <GenreSelector value={genres} setValue={setGenres} isRequired={true} />
      </div>
      <div>
        <LyricsInput value={lyrics} setValue={setLyrics} />
      </div>
      <div>
        <CommentInput value={description} setValue={setDescription} />
      </div>
      <div className="flex flex-row gap-[7.5px]">
        <MusicUploadSection files={audioFiles} setFiles={setAudioFiles} />
        <ImageUploadSection files={imageFiles} setFiles={setImageFiles} />
      </div>
      <div>
        <AssignMemberSection
          value={selectedMembers}
          setValue={setSelectedMembers}
        />
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

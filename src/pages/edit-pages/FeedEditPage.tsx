import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MusicTagSelector } from "@/components/ui/profile-detail/MusicTagSelector";
import { Button } from "@/components/ui/button";
import { TitleInput } from "@/components/ui/profile-detail/TitleInput";
import { LyricsInput } from "@/components/ui/upload/LyricsInput";
import { MusicUploadSection } from "@/components/ui/upload/MusicUploadSection";
import { ImageUploadSection } from "@/components/ui/upload/ImageUploadSection";
import type { EmotionTag } from "@/types/music";
import { getFeedDetail, updateFeed } from "@/apis/feed";

export const FeedEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [tags, setTags] = useState<EmotionTag[]>([]);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [audioPreviewUrl, setAudioPreviewUrl] = useState<string | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  // 피드 상세 정보 fetch
  useEffect(() => {
    if (!id) return;

    const fetchTrack = async () => {
      try {
        const track = await getFeedDetail(Number(id));
        console.log(track);
        setTitle(track.title);
        setDescription(track.description);
        setTags(track.tags);
        setAudioPreviewUrl(track.audioUrl ?? null);
        setImagePreviewUrl(track.imageUrl ?? null);
      } catch (err) {
        console.error("트랙 조회 실패", err);
      }
    };

    fetchTrack();
  }, [id]);

  // 피드 정보 수정
  const handleUpdate = async () => {
    if (!id) return;

    const requestBody = {
      feedId: Number(id),
      title,
      description,
      tags,
    };

    const formData = new FormData();

    formData.append(
      "data",
      new Blob([JSON.stringify(requestBody)], { type: "application/json" })
    );

    if (audioFile) formData.append("audio", audioFile);
    if (imageFile) formData.append("image", imageFile);

    try {
      const res = await updateFeed(formData);
      console.log(res);
      alert("수정이 완료되었습니다.");
      navigate(`/my-profile`);
    } catch (error) {
      console.error("트랙 수정 실패:", error);
      alert("수정에 실패했습니다.");
    }
  };

  return (
    <div className="w-[540px] bg-[#222222] px-[11.25px] py-[15px] rounded-[7.5px] mt-[5.5px]">
      <div className="flex flex-col gap-[7.5px]">
        <div>
          <TitleInput value={title} setValue={setTitle} />
        </div>
        <div>
          <LyricsInput value={description} setValue={setDescription} />
        </div>
        <div className="flex flex-row gap-[7.5px]">
          <MusicUploadSection
            file={audioFile}
            setFile={setAudioFile}
            audioPreviewUrl={audioPreviewUrl}
          />
          <ImageUploadSection
            file={imageFile}
            setFile={setImageFile}
            imagePreviewUrl={imagePreviewUrl}
          />
        </div>
        <div>
          <MusicTagSelector value={tags} setValue={setTags} />{" "}
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

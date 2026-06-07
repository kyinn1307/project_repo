import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MusicTagSelector } from "@/components/ui/profile-detail/MusicTagSelector";
import { Button } from "@/components/ui/shadcn/button";
import { TitleInput } from "@/components/ui/profile-detail/TitleInput";
import { LyricsInput } from "@/components/ui/upload/LyricsInput";
import { MusicUploadSection } from "@/components/ui/upload/MusicUploadSection";
import { ImageUploadSection } from "@/components/ui/upload/ImageUploadSection";
import type { EmotionTag } from "@/types/music";
import { getFeedDetail, updateFeed } from "@/apis/feed";
import { RemoteFile } from "@/types/feed";
import { buildActionsMulti } from "@/utils/buildActionMulti";

export const FeedEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [tags, setTags] = useState<EmotionTag[]>([]);

  const [audioFiles, setAudioFiles] = useState<File[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const [audioPreviewFiles, setAudioPreviewFiles] = useState<RemoteFile[]>([]);
  const [imagePreviewFiles, setImagePreviewFiles] = useState<RemoteFile[]>([]);

  const initialAudioPreviewRef = useRef<RemoteFile[]>([]);
  const initialImagePreviewRef = useRef<RemoteFile[]>([]);

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
        const aPrev = Array.isArray(track.audioFiles) ? track.audioFiles : [];
        const iPrev = Array.isArray(track.imageFiles) ? track.imageFiles : [];
        setAudioPreviewFiles(aPrev);
        setImagePreviewFiles(iPrev);

        initialAudioPreviewRef.current = aPrev;
        initialImagePreviewRef.current = iPrev;
      } catch (err) {
        console.error("트랙 조회 실패", err);
      }
    };

    fetchTrack();
  }, [id]);

  const removeServerAudioPreview = () => setAudioPreviewFiles([]);
  const removeServerImagePreview = () => setImagePreviewFiles([]);

  const audioFileActions = buildActionsMulti(
    initialAudioPreviewRef.current, // ✅ 초기 서버 파일
    audioPreviewFiles, // ✅ 현재 프리뷰(삭제 반영됨)
    audioFiles // ✅ 로컬 신규
  );

  const imageFileActions = buildActionsMulti(
    initialImagePreviewRef.current,
    imagePreviewFiles,
    imageFiles
  );

  // 피드 정보 수정
  const handleUpdate = async () => {
    if (!id) return;

    const requestBody = {
      feedId: Number(id),
      title,
      description,
      tags,
      audioFileActions,
      imageFileActions,
    };

    const formData = new FormData();

    formData.append(
      "data",
      new Blob([JSON.stringify(requestBody)], { type: "application/json" })
    );

    if (audioFiles.length > 0) {
      audioFiles.forEach((file) => {
        formData.append("audio", file);
      });
    }

    if (imageFiles) {
      imageFiles.forEach((file) => {
        formData.append("image", file);
      });
    }

    try {
      console.log("formdata", formData);
      const res = await updateFeed(Number(id), formData); // ✅ path param 전달
      console.log(res);
      alert("수정이 완료되었습니다.");
      navigate(`/my-profile`);
    } catch (error) {
      console.error("트랙 수정 실패:", error);
      alert("수정에 실패했습니다.");
    }
  };

  return (
    <div className="w-[540px] bg-[#222222] p-[11.25px] rounded-[7.5px] mt-[5.5px]">
      <div className="flex items-center w-fit px-[22.5px] h-[22.5px] text-xs font-bold rounded-full bg-white/10 text-white mb-[7.5px]">
        피드
      </div>
      <div className="flex flex-col gap-[7.5px]">
        <div>
          <TitleInput value={title} setValue={setTitle} />
        </div>
        <div>
          <LyricsInput value={description} setValue={setDescription} />
        </div>
        <div className="flex flex-row gap-[7.5px]">
          <MusicUploadSection
            files={audioFiles}
            setFiles={setAudioFiles}
            audioPreviewFiles={audioPreviewFiles ?? []}
            onRemoveServerPreview={removeServerAudioPreview}
          />
          <ImageUploadSection
            files={imageFiles}
            setFiles={setImageFiles}
            imagePreviewFiles={imagePreviewFiles ?? []}
            onRemoveServerPreview={removeServerImagePreview}
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

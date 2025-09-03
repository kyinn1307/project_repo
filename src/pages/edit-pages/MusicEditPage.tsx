import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { getTrackDetail } from "@/apis/music";
import { GenreSelector } from "@/components/ui/profile-detail/GenreSelector";
import { MusicTagSelector } from "@/components/ui/profile-detail/MusicTagSelector";
import { Button } from "@/components/ui/button";
import { TitleInput } from "@/components/ui/profile-detail/TitleInput";
import { LyricsInput } from "@/components/ui/upload/LyricsInput";
import { CommentInput } from "@/components/ui/upload/CommentInput";
import { MusicUploadSection } from "@/components/ui/upload/MusicUploadSection";
import { ImageUploadSection } from "@/components/ui/upload/ImageUploadSection";
import { AssignMemberSection } from "@/components/ui/upload/AssignMemberSection";
import type { Genre } from "@/types/music";
import type { EmotionTag } from "@/types/music";
import { updateTrack } from "@/apis/music";
import { useNavigate } from "react-router-dom";
import { RemoteFile } from "@/types/feed";
import { buildActionsMulti } from "@/utils/buildActionMulti";

export const MusicEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [description, setDescription] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [tags, setTags] = useState<EmotionTag[]>([]);
  const [audioFiles, setAudioFiles] = useState<File[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const [audioPreviewFiles, setAudioPreviewFiles] = useState<RemoteFile[]>([]);
  const [imagePreviewFiles, setImagePreviewFiles] = useState<RemoteFile[]>([]);

  const initialAudioPreviewRef = useRef<RemoteFile[]>([]);
  const initialImagePreviewRef = useRef<RemoteFile[]>([]);

  // 트랙 상세 정보 fetch
  useEffect(() => {
    if (!id) return;

    const fetchTrack = async () => {
      try {
        const track = await getTrackDetail(Number(id));
        console.log(track);
        setTitle(track.title);
        setLyrics(track.lyrics);
        setDescription(track.description);
        setGenres(track.genres);
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

  // track 정보 수정
  const handleUpdate = async () => {
    if (!id) return;

    const requestBody = {
      title,
      lyrics,
      description,
      genres,
      tags,
      audioFileActions,
      imageFileActions,
    };

    const formData = new FormData();
    formData.append(
      "request",
      new Blob([JSON.stringify(requestBody)], { type: "application/json" })
    );

    if (audioFiles) {
      audioFiles.forEach((file) => {
        formData.append("audioFile", file); // ✅ name은 동일하게 유지
      });
    }

    if (imageFiles) {
      imageFiles.forEach((file) => {
        formData.append("imageFile", file);
      });
    }

    try {
      const res = await updateTrack(Number(id), formData);
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
        음원
      </div>
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
          <AssignMemberSection />
        </div>
        <div>
          <MusicTagSelector value={tags} setValue={setTags} />
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

import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useUserStore } from "@/stores/useUserStore";
import { Business, BusinessResponse } from "@/types/business";
import { getAllBusiness } from "@/apis/business";
import { StarterBusiness } from "@/components/ui/profile/StarterBusinessItem";
import { SearchBar } from "@/components/ui/main/SearchBar";
import { GrowthBusiness } from "@/components/ui/profile/GrowthBusiness";
import { ProBusiness } from "@/components/ui/profile/ProBusiness";
import { useSearchParams } from "react-router-dom";

const GRADE_COMPONENT: Record<
  "Starter" | "Growth" | "Pro",
  React.FC<{
    business: Business;
    isOtherUser?: boolean;
  }>
> = {
  Starter: StarterBusiness,
  Growth: GrowthBusiness,
  Pro: ProBusiness,
};

export const BusinessPage = () => {
  const { userId } = useUserStore();
  const size = 5;

  const [searchParams] = useSearchParams();

  // ✅ 실제 검색 기준은 URL만 사용
  const keywordFromUrl = searchParams.get("keyword") ?? "";

  // ✅ SearchBar에 표시될 입력 중 텍스트
  const [q, setQ] = useState(keywordFromUrl);

  // ✅ URL이 바뀌면 input도 동기화
  useEffect(() => {
    setQ(keywordFromUrl);
  }, [keywordFromUrl]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery<
    BusinessResponse,
    Error,
    InfiniteData<BusinessResponse>,
    [string, string, number],
    number | undefined
  >({
    // ✅ keyword가 바뀔 때만 전체 페이지네이션 초기화
    queryKey: ["business", keywordFromUrl, size],

    queryFn: ({ pageParam }) =>
      getAllBusiness({
        k: keywordFromUrl,
        cursorId: pageParam,
        size,
      }),

    initialPageParam: undefined,
    getNextPageParam: (lastPage: BusinessResponse) => lastPage.nextCursor,
  });

  const allBusiness: Business[] =
    data?.pages.flatMap((page) => page.business) ?? [];

  const { ref, inView } = useInView();

  // ✅ 무한스크롤 트리거
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="flex flex-col pt-[38px] px-[5.2%]">
      <section className="flex flex-col mb-[37.5px] min-w-[1080px]">
        <div className="text-2xl text-white font-bold">비즈니스</div>

        <div className="relative flex flex-row mt-[22.5px] mb-[22.5px]">
          <div className="w-[50%]">
            <SearchBar
              placeholder="비즈니스 찾기"
              value="business"
              inputValue={q} // ✅ 입력 중 텍스트만 관리
              onInputChange={setQ} // ✅ 타이핑은 로컬 상태만 변경
              // ✅ Enter는 SearchBar 내부에서 navigate 처리
            />
          </div>
        </div>

        {isLoading && <div className="text-white">로딩 중...</div>}
        {isError && <div className="text-red-500">비즈니스 불러오기 실패</div>}

        {!!allBusiness.length && (
          <div className="flex flex-wrap gap-x-[22.5px] gap-y-[18.75px]">
            {allBusiness.map((b) => {
              const GradeComp =
                GRADE_COMPONENT[b.grade as "Starter" | "Growth" | "Pro"] ??
                StarterBusiness;

              return (
                <GradeComp
                  key={b.id}
                  business={b}
                  isOtherUser={userId !== b.userId}
                />
              );
            })}
          </div>
        )}

        {/* ✅ 무한스크롤 관찰 대상 */}
        <div ref={ref} className="h-12 mt-6 text-center text-white">
          {isFetchingNextPage
            ? "다음 비즈니스 불러오는 중..."
            : hasNextPage
            ? "더 불러오는 중..."
            : ""}
        </div>
      </section>
    </div>
  );
};

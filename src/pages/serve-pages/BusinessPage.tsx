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
  const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");

  const k = debouncedQ;
  const { userId } = useUserStore();
  const size = 5;

  // 입력 디바운스
  useEffect(() => {
    const id = setTimeout(() => setDebouncedQ(q.trim()), 300);
    return () => clearTimeout(id);
  }, [q]);

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
    [string, string, number], // ✅ queryKey 타입도 k와 size 포함
    number | undefined
  >({
    queryKey: ["business", k, size], // ✅ 검색어를 key에 포함
    queryFn: ({ pageParam }) =>
      getAllBusiness({ k, cursorId: pageParam, size }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage: BusinessResponse) => lastPage.nextCursor,
  });

  const allBusiness: Business[] =
    data?.pages.flatMap((page) => page.business) ?? [];

  const { ref, inView } = useInView();

  useEffect(() => {
    console.log(allBusiness);
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="flex flex-col pt-[38px] px-[15%]">
      <section className="flex flex-col mb-[37.5px]">
        <div className="text-2xl text-white font-bold">비즈니스</div>

        <div className="relative flex flex-row mt-[22.5px] mb-[22.5px]">
          <div className="w-[540px]">
            <SearchBar
              placeholder="비즈니스 찾기"
              value="business"
              inputValue={q}
              onInputChange={setQ}
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

        {/* 👇 관찰 대상 */}
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

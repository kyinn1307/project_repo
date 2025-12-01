const MS_PER_DAY = 1000 * 60 * 60 * 24;

export function formatYMDdot(iso: string | Date) {
  const d = typeof iso === "string" ? new Date(iso) : iso;
  if (isNaN(d.getTime())) return ""; // 안전장치
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
}

/** 등록일 + limitDays(기본 14일) 마감까지 남은 '일' 수 (0 이하면 0) */
export function daysLeftFrom(createdAt: string, limitDays = 14) {
  const created = new Date(createdAt);
  if (isNaN(created.getTime())) return 0;
  const deadline = new Date(created.getTime() + limitDays * MS_PER_DAY);
  const diff = deadline.getTime() - Date.now();
  // '며칠 남았는지'이므로 올림(오늘 남은 몇 시간도 1일로 친다)
  return Math.max(0, Math.ceil(diff / MS_PER_DAY));
}

// createdAt 기준으로 며칠 전에 생성되었는지 날짜 계산 util 함수
export function timeAgo(dateString: string) {
  const now = new Date();
  const created = new Date(dateString);
  const diff = (now.getTime() - created.getTime()) / 1000; // 초 단위 차이

  if (diff < 60) return `${Math.floor(diff)}초 전`;
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)}일 전`;
  if (diff < 31104000) return `${Math.floor(diff / 2592000)}개월 전`;

  return `${Math.floor(diff / 31104000)}년 전`;
}

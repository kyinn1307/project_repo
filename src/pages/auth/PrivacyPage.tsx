export const PrivacyPage = () => {
  return (
    <div className="flex flex-col w-[810px] text-white pt-[90px] pb-[750px] font-medium gap-[30px]">
      <div>
        <h1 className="text-lg mb-3">개인정보 처리방침</h1>
        <span className="text-[10.5px] font-regular">
          SETA(이하 “회사”)는 정보통신서비스제공자가 준수하여야 하는 대한민국의
          관계 법령 및 개인정보보호 규정, 가이드라인을 준수하고 있습니다.
          “개인정보 처리방침”이란 이용자의 소중한 개인정보를 보호함으로써
          이용자가 안심하고 서비스를 이용할 수 있도록 최선을 다하고 있습니다.
          또한 개인정보처리방침의 개정이 있을 경우 여러분께 항상 알리겠으며,
          수시로 확인할 수 있도록 서비스를 통해 게시하도록 하겠습니다. 본
          개인정보 처리방침에서 정하지 않은 용어의정의는 서비스 이용약관을
          따릅니다.
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-[13.5px]">[ 목차 ]</span>
        <div className="flex flex-col gap-[3px] mt-3">
          <label className="text-xs">1. 개인정보의 처리 목적</label>
          <label className="text-xs">
            2. 개인정보의 수집 및 이용 목적, 항목, 보유 및 이용기간
          </label>
          <label className="text-xs">3. 개인정보의 제 3자 제공</label>
          <label className="text-xs">4. 개인정보처리 위탁</label>
          <label className="text-xs">5. 개인정보의 파기</label>
          <label className="text-xs">
            6. 정보주체와 법정대리인의 권리, 의무 및 행사방법
          </label>
          <label className="text-xs">
            7. 개인정보 자동 수집 장치의 설치, 운영 및 거부에 관한 사항
          </label>
          <label className="text-xs">
            8. 형태정보의 수집, 이용 및 거부 등에 관한 사항
          </label>
          <label className="text-xs">9. 개인정보의 안전성 확보조치</label>
          <label className="text-xs">
            10. 개인정보 보호 책임자 및 담당 부서
          </label>
          <label className="text-xs">11. 권익침해 구제방법</label>
          <label className="text-xs">12. 개인정보처리방침 변경 고지</label>
        </div>
      </div>

      {/* 1. 개인정보의 처리 목적 */}
      <div className="flex flex-col gap-3">
        <h2 className="text-xs">1. 개인정보의 처리 목적</h2>
        <div className="flex flex-col text-[10.5px] gap-3 font-normal">
          <span className="flex flex-col">
            <span>1. 회원가입 및 서비스 관리</span>
            회원 가입 의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증,
            회원자격 유지·관리, 제한적 본인확인제 시행에 따른 본인확인, 서비스
            부정이용 방지, 만 14세 미만 아동 여부 확인, 서비스 이용 관련 각종
            고지·통지, 고충처리, 분쟁 조정을 위한 기록 보존 등을 목적으로
            개인정보를 처리합니다.
          </span>
          <span className="flex flex-col">
            <span> 2. 민원사무 처리</span>
            민원인의 신원 확인, 민원사항 확인, 사실조사를 위한 연락·통지,
            처리결과 통보를 목적으로 개인정보를 처리합니다
          </span>
          <span className="flex flex-col">
            <span>3. 재화 또는 서비스 제공</span>
            서비스 제공, 청구서 발송, 콘텐츠 제공, 맞춤 서비스 제공, 요금 결제
            목적으로 개인정보를 처리합니다.
          </span>
          <span className="flex flex-col">
            <span>4. 마케팅 및 광고에의 활용</span>
            신규 서비스(제품) 개발 및 맞춤형 정보 서비스 제공, 이벤트 및 광고성
            정보 제공 및 참여 기회 제공, 인구통계학적 특성에 따른 서비스 제공 및
            광고 게재, 서비스의 유효성 확인, 접속 빈도 파악 또는 회원의 서비스
            이용에 대한 통계 및 설문을 목적으로 개인정보를 처리합니다.
          </span>
        </div>
      </div>

      {/* 2. 개인정보의 수집 및 이용 목적, 항목, 보유 및 이용기간 */}
      <div className="flex flex-col gap-3">
        <h2 className="text-xs">
          2. 개인정보의 수집 및 이용 목적, 항목, 보유 및 이용기간
        </h2>
        <div className="flex flex-col font-normal text-[10.5px]">
          <span>
            회사는 「개인정보 보호법」에 따라 서비스 제공을 위해 필요 최소한의
            범위에서 개인정보를 수집・이용합니다. (선택) 항목의 경우, 「개인정보
            보호법」 제15조 제1항 제1호 및 제22조 제1항 제7호에 따라 정보주체의
            동의를 받아 처리하고 있습니다.
          </span>
          <table className="table-auto text-white w-full mt-6 border-collapse">
            <thead className="bg-[#2b2b2b]">
              <tr className="text-xs">
                <th className="px-4 py-2 border-[0.75px] border-[#5b5b5b]">
                  서비스 구분
                </th>
                <th className="px-4 py-2 border-[0.75px] border-[#5b5b5b]">
                  처리 목적
                </th>
                <th className="px-4 py-2 border-[0.75px] border-[#5b5b5b]">
                  수집 항목
                </th>
                <th className="px-4 py-2 border-[0.75px] border-[#5b5b5b]">
                  보유 및 이용기간
                </th>
              </tr>
            </thead>
            <tbody className="bg-[#1e1e1e] text-[10.5px]">
              {[
                {
                  service: "회원가입",
                  purpose: "회원가입 및 회원관리",
                  items: [
                    "이메일 주소",
                    "SNS ID(구글 가입 시)",
                    "닉네임",
                    "휴대폰 번호",
                    "장르 및 분야",
                  ],
                  duration: "회원 탈퇴 시까지",
                },
                {
                  service: "메신저",
                  purpose: "분쟁 조정",
                  items: [
                    "대화 내역 및 일시",
                    "이메일 주소",
                    "SNS ID(구글 가입 시)",
                    "닉네임",
                    "휴대폰 번호",
                  ],
                  duration: "3년",
                },
                {
                  service: "뮤지션 등록(유료 기능)",
                  purpose: "결제",
                  items: [
                    "이름(실명)",
                    "카드번호",
                    "CVC",
                    "카드 유효기간",
                    "결제 내역",
                  ],
                  duration: "5년",
                },
                {
                  service: "비즈니스 등록",
                  purpose: "서비스 관리",
                  items: ["가격", "작업일 수", "수정 횟수"],
                  duration: "회원 탈퇴 시까지",
                },
                {
                  service: "자동 수집 정보",
                  purpose: "웹/앱 사용자 분석",
                  items: ["이메일 주소", "휴대폰 번호", "닉네임"],
                  duration: "14개월",
                },
                {
                  service: "마케팅 및 홍보(선택)",
                  purpose: "광고 및 홍보, 이벤트 안내 등",
                  items: ["이메일 주소", "휴대폰 번호", "닉네임"],
                  duration: "수신 거부 시까지",
                },
              ].map((row, i) => (
                <tr key={i} className="text-[10.5px] leading-[130%]">
                  <td className="px-4 py-2 border-[0.75px] border-[#5b5b5b]">
                    {row.service}
                  </td>
                  <td className="px-4 py-2 border-[0.75px] border-[#5b5b5b]">
                    {row.purpose}
                  </td>
                  <td className="px-4 py-2 border-[0.75px] border-[#5b5b5b]">
                    <ul className="list-disc list-inside">
                      {row.items.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-4 py-2 border-[0.75px] border-[#5b5b5b]">
                    {row.duration}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. 개인정보의 제 3자 제공 */}
      <div className="flex flex-col gap-3 text-[10.5px]">
        <h2 className="text-xs">3. 개인정보의 제 3자 제공</h2>
        <span className="font-normal">
          회사는 정보주체의 개인정보를 개인정보의 처리 목적에서 명시한 범위
          내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 「개인정보
          보호법」 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게
          제공하고 그 이외에는 정보주체의 개인정보를 제3자에게 제공하지
          않습니다.
        </span>
      </div>

      {/* 4. 개인정보처리 위탁 */}
      <div className="flex flex-col gap-3 text-[10.5px]">
        <h2 className="text-xs">4. 개인정보처리 위탁</h2>
        <span>
          회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보
          처리업무를 위탁하고 있습니다.
        </span>
        <table className="table-auto text-xs text-white w-full mt-6 border-collapse">
          <thead className="bg-[#2b2b2b]">
            <tr className="text-xs">
              <th className="px-4 py-2 border-[0.75px] border-[#5b5b5b]">
                수탁자
              </th>
              <th className="px-4 py-2 border-[0.75px] border-[#5b5b5b]">
                위탁업무 내용
              </th>
              <th className="px-4 py-2 border-[0.75px] border-[#5b5b5b]">
                개인정보 보유 및 이용기간
              </th>
            </tr>
          </thead>
          <tbody className="bg-[#1e1e1e] text-[10.5px] font-normal">
            <tr>
              <td className="px-4 py-2 border-[0.75px] border-[#5b5b5b]">
                Amazon Web Services, Inc.
              </td>
              <td className="px-4 py-2 border-[0.75px] border-[#5b5b5b]">
                클라우드
              </td>
              <td className="px-4 py-2 border-[0.75px] border-[#5b5b5b]">
                회원탈퇴, 계약종료, 폐업 시까지
              </td>
            </tr>
          </tbody>
        </table>
        <span>
          개인정보처리자명{">"} 은(는) 위탁계약 체결 시 「개인정보 보호법」
          제26조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적・관리적
          보호조치, 재위탁 제한, 수탁자에 대한 관리・감독, 손해배상 등 책임에
          관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게
          처리하는지를 감독하고 있습니다.
        </span>
        <span>
          위탁업무의 내용이나 수탁자가 변경될 경우에는 지체없이 본 개인정보
          처리방침을 통하여 공개하도록 하겠습니다.
        </span>
      </div>

      {/* 5. 개인정보의 파기 */}
      <div className="flex flex-col gap-3">
        <h2 className="text-xs">5. 개인정보의 파기</h2>
        <div className="flex flex-col text-[10.5px] font-normal gap-3">
          <span>
            회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가
            불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.
          </span>
          <span>
            정보주체로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이
            달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야
            하는 경우에는, 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나
            보관장소를 달리하여 보존합니다.
          </span>
          <div className="flex flex-col ">
            <span>개인정보 파기의 절차 및 방법은 다음과 같습니다.</span>
            <span>1. 파기절차</span>
            <span>
              SETA는 파기 사유가 발생한 개인정보를 선정하고, 개인정보
              보호책임자의 승인을 받아 개인정보를 파기합니다.
            </span>
            <span>2. 파기방법</span>
            <span>
              SETA는 전자적 파일 형태로 기록・저장된 개인정보는 기록을 재생할 수
              없도록 파기하며, 종이 문서에 기록・저장된 개인정보는 분쇄기로
              분쇄하거나 소각하여 파기합니다.
            </span>
          </div>
        </div>
      </div>

      {/* 6. 정보주체와 법정대리인의 권리, 의무 및 행사방법 */}
      <div className="flex flex-col gap-3">
        <h2 className="text-xs">
          6. 정보주체와 법정대리인의 권리, 의무 및 행사방법
        </h2>
        <div className="flex flex-col text-[10.5px] gap-3 font-normal">
          <span>
            정보주체는 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」,
            「개인정보 보호법」 등 기타 개인정보에 관한 법률을 준수하여야
            합니다.
          </span>
          <span>
            정보주체는 회사에 대해 언제든지 개인정보 열람・정정・삭제・처리정지
            및 철회 요구 등의 권리를 행사(이하 “권리 행사”라 함)할 수 있습니다.
          </span>
          <span>
            권리 행사는 회사에 대해 「개인정보 보호법」 시행령 제41조 제1항에
            따라 서면, 전자우편을 통하여 하실 수 있으며, 회사는 이에 대해
            지체없이 조치하겠습니다. 또한 정보주체는 언제든지 등록되어 있는
            자신의 개인정보를 조회 및 수정(계정 설정{">"} 내 정보)하실 수
            있으며, 정보 삭제 및 처리 정지(계정 설정{">"} 내 정보{">"} 회원
            탈퇴)를 요구할 수도 있습니다.
          </span>
          <span>
            회사는 권리 행사를 아래 이메일을 통해 할 수 있습니다 또한 회사는
            정보주체의 권리 행사가 신속하게 처리되도록 노력하겠습니다.
          </span>
          <table className="table-auto text-white w-full mt-3 border-collapse">
            <thead className="bg-[#2b2b2b]">
              <tr className="text-xs">
                <th className="px-4 py-2 border-[0.75px] border-[#5b5b5b]">
                  이름
                </th>
                <th className="px-4 py-2 border-[0.75px] border-[#5b5b5b]">
                  직위
                </th>
                <th className="px-4 py-2 border-[0.75px] border-[#5b5b5b]">
                  이메일
                </th>
              </tr>
            </thead>
            <tbody className="bg-[#1e1e1e] text-[]10.5px">
              <tr>
                <td className="px-4 py-2 border-[0.75px] border-[#5b5b5b]">
                  박영찬
                </td>
                <td className="px-4 py-2 border-[0.75px] border-[#5b5b5b]">
                  대표
                </td>
                <td className="px-4 py-2 border-[0.75px] border-[#5b5b5b]">
                  jak878942@gmail.com
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 7. 개인정보 자동 수집 장치의 설치, 운영 및 거부에 관한 사항 */}
      <div className="flex flex-col gap-3">
        <h2 className="text-xs">
          7. 개인정보 자동 수집 장치의 설치, 운영 및 거부에 관한 사항
        </h2>
        <div className="flex flex-col text-[10.5px] gap-3 font-normal">
          <span>
            회사는 사용자에게 개별적인 서비스와 편의를 제공하기 위해 이용정보를
            저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용합니다.
          </span>
          <span>
            쿠키는 웹사이트 운영에 이용되는 서버(http)가 정보주체의 브라우저에
            보내는 소량의 정보이며 정보주체의 PC 또는 모바일에 저장됩니다
          </span>
          <table className="table-auto text-white w-full mt-3 mb-3 border-collapse">
            <thead className="bg-[#2b2b2b]">
              <tr className="text-xs">
                <th className="px-4 py-2 border-[0.75px] border-[#5b5b5b]">
                  수집 항목
                </th>
                <th className="px-4 py-2 border-[0.75px] border-[#5b5b5b]">
                  수집 방법
                </th>
                <th className="px-4 py-2 border-[0.75px] border-[#5b5b5b]">
                  수집 목적
                </th>
                <th className="px-4 py-2 border-[0.75px] border-[#5b5b5b]">
                  보유 및 이용기간
                </th>
              </tr>
            </thead>
            <tbody className="bg-[#1e1e1e] text-[10.5px]">
              <tr>
                <td className="px-4 py-2 border-[0.75px] border-[#5b5b5b]">
                  웹사이트 방문 이력
                </td>
                <td className="px-4 py-2 border-[0.75px] border-[#5b5b5b]">
                  웹사이트 방문시 자동 수집
                </td>
                <td className="px-4 py-2 border-[0.75px] border-[#5b5b5b]">
                  관심기반 맞춤형 광고
                </td>
                <td className="px-4 py-2 border-[0.75px] border-[#5b5b5b]">
                  수집일로부터 2년
                </td>
              </tr>
            </tbody>
          </table>

          <span>
            정보주체는 웹 브라우저 옵션 설정을 통해 쿠키 허용, 차단 등의 설정을
            할 수 있습니다. 다만, 쿠키 저장을 거부할 경우 맞춤형 서비스 이용에
            어려움이 발생할 수 있습니다.
          </span>
          <span>
            {"<"} 쿠키 허용 / 차단 방법 {">"}
          </span>
          <span>▶ 웹 브라우저에서 쿠키 허용/차단 </span>
          <span>
            - 크롬(Chrome) : 웹 브라우저 설정 {">"} 개인정보 보호 및 보안 {">"}{" "}
            인터넷 사용 기록 삭제
          </span>
          <span>
            - 엣지(Edge) : 웹 브라우저 설정 {">"} 쿠키 및 사이트 권한 {">"} 쿠키
            및 사이트 데이터 관리 및 삭제
          </span>
          <span>▶ 모바일 브라우저에서 쿠키 허용/차단</span>
          <span>
            - 크롬(Chrome) : 모바일 브라우저 설정 {">"} 개인정보 보호 및 보안{" "}
            {">"} 인터넷 사용 기록 삭제
          </span>
          <span>
            - 사파리(Safari) : 모바일 기기 설정 {">"} 사파리(Safari) {">"} 고급{" "}
            {">"} 모든 쿠키 차단
          </span>
          <span>
            - 삼성 인터넷 : 모바일 브라우저 설정 {">"} 인터넷 사용 기록 {">"}{" "}
            인터넷 사용 기록 삭제
          </span>
        </div>
      </div>

      {/* 8. 형태정보의 수집, 이용 및 거부 등에 관한 사항 */}
      <div className="flex flex-col gap-3">
        <h2 className="text-xs">
          8. 형태정보의 수집, 이용 및 거부 등에 관한 사항{" "}
        </h2>
        <div className="flex flex-col font-normal text-[10.5px] gap-3">
          <span>
            회사는 사용자가 웹사이트・앱을 방문하거나 이용하는 경우, 효과적인
            서비스 이용과 광고 및 마케팅을 위해 쿠키 및 타사가 제공하는 SDK를
            포함한 태그 등을 이용하고 있습니다.
          </span>
          <span>
            회사의 웹/앱으로부터 제3자가 수집해가는 행태정보는 다음과 같습니다.
          </span>

          <table className="table-auto text-white w-full mt-3 mb-3 border-collapse">
            <thead className="bg-[#2b2b2b]">
              <tr className="text-xs">
                <th className="px-4 py-2 border-[0.75px] border-[#5b5b5b]">
                  형태정보의 항목
                </th>
                <th className="px-4 py-2 border-[0.75px] border-[#5b5b5b]">
                  방법
                </th>
                <th className="px-4 py-2 border-[0.75px] border-[#5b5b5b]">
                  목적
                </th>
              </tr>
            </thead>
            <tbody className="bg-[#1e1e1e] text-[10.5px]">
              <tr>
                <td className="px-4 py-2 border-[0.75px] border-[#5b5b5b]">
                  이용자의 서비스 방문 이력, 검색, 콘텐츠 소비, 활동 등
                </td>
                <td className="px-4 py-2 border-[0.75px] border-[#5b5b5b]">
                  이용자 웹/앱 서비스 이용 시 자동 수집 및 전송
                </td>
                <td className="px-4 py-2 border-[0.75px] border-[#5b5b5b]">
                  웹/앱 사용자 분석, 광고 및 홍보
                </td>
              </tr>
            </tbody>
          </table>
          <span className="flex flex-col">
            <span>
              정보주체는 브라우저의 쿠키 설정 변경 등을 통해 제3자가 수집해가는
              행태정보의 허용, 차단 등의 설정을 할 수 있습니다.
            </span>
            <span>
              {"<"}제3자 수집 행태정보의 허용 / 차단 방법{">"}
            </span>
          </span>
          <span>▶ 웹 브라우저에서 제3자가 수집해가는 행태정보의 허용/차단</span>
          <span className="flex flex-col">
            <span>(1) 크롬(Chrome)</span>
            <span>
              - Chrome에서 오른쪽 상단 ‘⋮ ’ 표시를 클릭한 후, 「설정」 표시를
              클릭합니다.
            </span>
            <span>
              - 설정 페이지 좌측에 「개인정보 보호 및 보안」을 클릭하고,
              「서드파티쿠키」를 클릭하여 「서드파티쿠키 차단」 여부를
              선택합니다.
            </span>
            <span>
              - 특정 사이트를 허용하고 싶은 경우, 「서드파티쿠티」 하단에 있는
              「서드 파티 쿠키 사용이 허용됨」 옆에 있는 「추가」를 클릭하고,
              해당 사이트 주소를 입력합니다.
            </span>
          </span>
          <span className="flex flex-col">
            <span>(2) 엣지(Edge)</span>
            <span>
              - Edge에서 오른쪽 상단 ‘…’ 표시를 클릭한 후, 「설정」을
              클릭합니다.
            </span>
            <span>
              - 설정 페이지 좌측의 「개인정보, 검색 및 서비스」를 클릭 후
              「추적방지」 섹션에서 「추적방지」 여부 및 수준을 선택합니다.
            </span>
            <span>
              - 특정 사이트를 허용하고 싶은 경우, 「추적방지」 섹션 하단의
              「예외」를 클릭하고, 「사이트 추가」를 선택하여 해당 사이트 주소를
              입력합니다.
            </span>
          </span>
          <span>
            ▶ 모바일 브라우저에서 제3자가 수집해가는 행태정보의 허용/차단
          </span>
          <span className="flex flex-col">
            <span>(1) 크롬(Chrome)</span>
            <span>
              {"<"} 안드로이드(Android) 기기의 경우 {">"}
            </span>
            <span>
              - 기기에서 크롬(Chrome) 앱을 열고, 오른쪽 상단 ‘⋮ ’ 표시를 클릭한
              후, 「설정」 표시를 클릭합니다.
            </span>
            <span>
              - 「사이트 설정」에서 「서드파티쿠키」를 클릭하고, 「서드파티쿠키
              차단」 여부를 선택합니다.
            </span>
            <span>
              - 특정 사이트를 허용하고 싶은 경우, 「서드파티쿠티」 하단에 있는
              「사이트 예외 추가」를 클릭하고, 해당 사이트 주소를 입력합니다.
            </span>

            <span>
              {"<"} 아이폰(iPhone/iPad) 기기의 경우 {">"}
            </span>
            <span>
              - 기기에서 크롬(Chrome) 앱을 열고, 오른쪽 상단 ‘⋮ ’ 표시를 클릭한
              후, 「설정」 표시를 클릭합니다.
            </span>
            <span>
              - 설정 페이지 좌측에 「개인정보 보호 및 보안」을 클릭하고,
              「인터넷 사용 기록 삭제」를 클릭합니다.
            </span>
            <span>
              - 선택 항목들 중 「쿠키, 사이트 데이터」를 선택하고, 「인터넷 사용
              기록 삭제」를 클릭합니다.
            </span>
          </span>
          <span className="flex flex-col">
            <span>(2) 사파리(Safari)</span>
            <span>
              - 기기에서 「설정」을 열고, 설치된 앱 항목들 중 「Safari」를
              클릭합니다.
            </span>
            <span>- 「고급」을 클릭하고, 「모든 쿠키 차단」을 선택합니다.</span>
          </span>
          <span className="flex flex-col">
            <span>(3) 삼성인터넷</span>
            <span>
              - 기기에서 삼성인터넷 앱을 열고, 하단에 ‘≡’ 표시를 클릭한 후,
              「설정」 표시를 클릭합니다.
            </span>
            <span>
              - 「인터넷 사용 기록」 항목에서 「인터넷 사용 기록 삭제」를
              클릭합니다.
            </span>
            <span>
              - 선택 항목들 중 「쿠키 및 사이트 데이터」를 선택하고, 「데이터
              삭제」를 클릭합니다.
            </span>
          </span>
        </div>
      </div>

      {/* 9. 개인정보의 안전성 확보조치 */}
      <div>
        <div className="flex flex-col gap-3">
          <h2 className="text-xs">9. 개인정보의 안전성 확보조치 </h2>
          <div className="flex flex-col gap-3 text-[10.5px] font-normal">
            <span>
              회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고
              있습니다.
            </span>
            <div className="flex flex-col">
              <span>
                1. 관리적 조치 : 내부관리계획 수립・시행, 전담조직 운영, 정기적
                직원 교육
              </span>
              <span>
                2. 기술적 조치 : 개인정보처리시스템 등의 접근권한 관리,
                접근통제시스템 설치, 개인정보의 암호화, 보안프로그램 설치 및
                갱신
              </span>
              <span>3. 물리적 조치 : 전산실, 자료보관실 등의 접근통제</span>
            </div>
          </div>
        </div>
      </div>

      {/* 10. 개인정보 보호 책임자 및 담당 부서 */}
      <div>
        <div className="flex flex-col gap-3">
          <h2 className="text-xs">10. 개인정보 보호 책임자 및 담당 부서</h2>
          <div className="text-[10.5px]">
            <span>
              회사 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보
              처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와
              같이 개인정보 보호책임자를 지정하고 있습니다
            </span>
            <table className="table-auto text-white w-full mt-6 mb-6 border-collapse">
              <thead className="bg-[#2b2b2b]">
                <tr className="text-xs">
                  <th className="px-4 py-2 border-[0.75px] border-[#5b5b5b]">
                    이름
                  </th>
                  <th className="px-4 py-2 border-[0.75px] border-[#5b5b5b]">
                    직위
                  </th>
                  <th className="px-4 py-2 border-[0.75px] border-[#5b5b5b]">
                    이메일
                  </th>
                </tr>
              </thead>
              <tbody className="bg-[#1e1e1e]">
                <tr>
                  <td className="px-4 py-2 border-[0.75px] border-[#5b5b5b]">
                    박영찬
                  </td>
                  <td className="px-4 py-2 border-[0.75px] border-[#5b5b5b]">
                    대표
                  </td>
                  <td className="px-4 py-2 border-[0.75px] border-[#5b5b5b]">
                    jak878942@gmail.com
                  </td>
                </tr>
              </tbody>
            </table>
            <span>
              정보주체는 회사 의 서비스(또는 사업)을 이용하시면서 발생한 모든
              개인정보보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을
              개인정보 보호책임자 및 담당부서로 문의할 수 있습니다. 회사는
              정보주체의 문의에 대해 지체없이 답변 및 처리해드릴 것입니다.
            </span>
          </div>
        </div>
      </div>

      {/* 11. 권익침해 구제방법 */}
      <div>
        <div className="flex flex-col gap-3">
          <h2 className="text-xs">11. 권익침해 구제방법</h2>
          <div className="text-[10.5px] font-normal">
            <span>
              정보주체는 개인정보침해로 인한 구제를 받기 위하여
              개인정보분쟁조정위원회, 한국인터넷진흥원 개인정보침해신고센터 등에
              분쟁해결이나 상담 등을 신청할 수 있습니다. 이 밖에 기타
              개인정보침해의 신고, 상담에 대하여는 아래의 기관에 문의하시기
              바랍니다.
            </span>
            <table className="table-auto text-white w-full mt-6 mb-6 border-collapse">
              <thead className="bg-[#2b2b2b]">
                <tr className="text-xs">
                  <th className="px-4 py-2 border-[0.75px] border-[#5b5b5b]">
                    구분
                  </th>
                  <th className="px-4 py-2 border-[0.75px] border-[#5b5b5b]">
                    연락처
                  </th>
                  <th className="px-4 py-2 border-[0.75px] border-[#5b5b5b]">
                    링크
                  </th>
                </tr>
              </thead>
              <tbody className="bg-[#1e1e1e]">
                <tr>
                  <td className="px-4 py-2 border-[0.75px] border-[#5b5b5b]">
                    개인정보침해 신고센터
                  </td>
                  <td className="px-4 py-2 border-[0.75px] border-[#5b5b5b]">
                    (국번없이) 118
                  </td>
                  <td className="px-4 py-2 border-[0.75px] border-[#5b5b5b]">
                    <a
                      href="https://privacy.kisa.or.kr/"
                      target="_blank"
                      className="underline text-blue-400"
                    >
                      https://privacy.kisa.or.kr/
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-[0.75px] border-[#5b5b5b]">
                    개인정보분쟁조정위원회
                  </td>
                  <td className="px-4 py-2 border-[0.75px] border-[#5b5b5b]">
                    (국번없이) 1833-6972
                  </td>
                  <td className="px-4 py-2 border-[0.75px] border-[#5b5b5b]">
                    <a
                      href="https://kopico.go.kr/"
                      target="_blank"
                      className="underline text-blue-400"
                    >
                      https://kopico.go.kr/
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-[0.75px] border-[#5b5b5b]">
                    대검찰청
                  </td>
                  <td className="px-4 py-2 border-[0.75px] border-[#5b5b5b]">
                    (국번없이) 1301
                  </td>
                  <td className="px-4 py-2 border-[0.75px] border-[#5b5b5b]">
                    <a
                      href="https://spo.go.kr/"
                      target="_blank"
                      className="underline text-blue-400"
                    >
                      https://spo.go.kr/
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-[0.75px] border-[#5b5b5b]">
                    경찰청
                  </td>
                  <td className="px-4 py-2 border-[0.75px] border-[#5b5b5b]">
                    (국번없이) 182
                  </td>
                  <td className="px-4 py-2 border-[0.75px] border-[#5b5b5b]">
                    <a
                      href="https://ecrm.police.go.kr/"
                      target="_blank"
                      className="underline text-blue-400"
                    >
                      https://ecrm.police.go.kr/
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>

            <span>
              회사는 정보주체의 개인정보 자기결정권을 보장하고 개인정보침해로
              인한 상담 및 피해 구제를 위해 노력하고 있으며, 신고나 상담이
              필요한 경우 아래의 담당 부서로 연락해 주시기 바랍니다.
            </span>
            <table className="table-auto text-white w-full mt-6 border-collapse">
              <thead className="bg-[#2b2b2b]">
                <tr className="text-xs">
                  <th className="px-4 py-2 border-[0.75px] border-[#5b5b5b]">
                    이름
                  </th>
                  <th className="px-4 py-2 border-[0.75px] border-[#5b5b5b]">
                    직위
                  </th>
                  <th className="px-4 py-2 border-[0.75px] border-[#5b5b5b]">
                    이메일
                  </th>
                </tr>
              </thead>
              <tbody className="bg-[#1e1e1e]">
                <tr>
                  <td className="px-4 py-2 border-[0.75px] border-[#5b5b5b]">
                    박영찬
                  </td>
                  <td className="px-4 py-2 border-[0.75px] border-[#5b5b5b]">
                    대표
                  </td>
                  <td className="px-4 py-2 border-[0.75px] border-[#5b5b5b]">
                    jak878942@gmail.com
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* 12. 개인정보처리방침 변경 고지 */}
      <div>
        <div className="flex flex-col gap-3">
          <h2 className="text-xs">12. 개인정보처리방침 변경 고지</h2>
          <div className="flex flex-col text-[10.5px] font-normal gap-3">
            <span>이 개인정보 처리방침은 2025.01.30부터 적용됩니다</span>
            <span>
              ※개인정보 처리방침의 변경 또는 삭제 내용이 있을 시, 아래
              공지하도록 하겠습니다.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

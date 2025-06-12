export default function TermsPage() {
  return (
    <div className="flex flex-col w-[810px] text-white pt-[90px] not-only:font-medium">
      <h1 className="text-lg mb-[30px]">서비스 이용약관</h1>
      <div className="flex flex-col gap-[30px]">
        <span className="text-[13.5px]">제1장 총 칙</span>
        <div className="flex flex-col gap-3">
          {/* 제 1조 */}
          <h2 className="text-xs">제1조(목적)</h2>
          <p className="text-[10.5px]">
            이 약관(이하 “약관”이라 합니다)은 SETA(이하 “회사”라 합니다)과 이용
            고객(이하 “회원”이라 합니다)간에 회사가 제공하는 서비스(이하
            “서비스”라 합니다)를 이용함에 있어 회원과 회사간의 권리, 의무 및
            책임사항, 이용조건 및 절차 등 기본적인 사항을 규정함을 목적으로
            합니다.
          </p>
        </div>
        {/* 제 2조 */}
        <div className="flex flex-col gap-3">
          <h2 className="text-xs">제2조(정의)</h2>
          <div className="flex flex-col gap-[3px] font-regular text-[10.5px]">
            <span>
              1. “서비스”는 회사가 운영하는 플랫폼 SETA(이하 “플랫폼”이라
              합니다)를 통해 이용자에게 제공하는 서비스를 의미합니다.
            </span>
            <span>
              2. “회원” 란 플랫폼에 접속하여 이용약관, 개인정보 수집 및 이용
              동의, 개인정보처리 방침에 동의하고 회원가입을 완료한 자를
              의미합니다.
            </span>
            <span>
              3. “ 뮤지션 등록”이란 “회원” 중, 회원이 구독료를 지불하고 회사는
              유료 “서비스”를 제공하기 위한 각종 지불수단을 의미합니다.
            </span>
            <span>
              4. “프로젝트”란 구인/구직, 홍보, 섭외 등의 목적을 가지고 문의 및
              공고를 띄우는 것을 의미합니다.
            </span>
            <span>
              5. “콘텐츠”란 회원이 플랫폼에 게시 또는 등록하는 자료 또는 정보
              형태의 글, 사진, 음원, 이미지 및 동영상 등을 의미합니다.
            </span>
            <span>
              6. “비즈니스 등록”이란 “뮤지션 등록”을 이용중인 회원이 사용 할 수
              있는 유료 기능으로서 가격, 작업일, 수정횟수, 설명을 게시 할 수
              있는 기능을 의미합니다
            </span>
            <span>
              7. “활동이력”이란 “회원”이 게시 할 수 있는 정보 형태의 글이며,
              별도의 인증 및 확인 절차를 거치지 않은 정보를 의미합니다.
            </span>
            <span>
              8. “메신저”란 플랫폼에서 사용가능한 대화의 수단으로 자료 또는 정보
              형태의 글, 사진, 음원, 이미지 및 동영상 등을 발신/수신 할 수 있는
              기능을 의미합니다. 회원의 뮤지션 등록 여부에 따라 기능의 제한이
              발생 할 수 있습니다.
            </span>
          </div>
        </div>
        {/* 제 3조 */}
        <div className="flex flex-col gap-3">
          <h2 className="text-xs">제3조(명시와 개정)</h2>
          <div className="flex flex-col gap-[3px] font-regular text-[10.5px]">
            <span>
              1. 회사는 이 약관의 내용을 플랫폼에 게시하거나 연결화면을 통해
              제공합니다.
            </span>
            <span>
              2. 회사는 회원이 약관의 내용에 관하여 질의 및 응답을 할 수 있도록
              조치를 취합니다.
            </span>
            <span>
              3. 회사는 전자상거래 등에서의 소비자보호에 관한 법률」, 「약관의
              규제에 관한 법률」, 「전자문서 및 전자거래기본법」,
              「전자금융거래법」, 「전자서명법」, 「정보통신망 이용촉진 및
              정보보호 등에 관한 법률」, 「방문판매 등에 관한 법률」,
              「소비자기본법」 등 관련 법을 위배하지 않는 범위에서 이 약관을
              개정할 수 있습니다.
            </span>
            <span>
              4. 회사는 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여
              현행약관과 함께 플랫폼에 초기화면 또는 연결화면에 그 적용일자 7일
              이전부터 적용일자 전일까지 공지합니다. 다만, 이용자에게 불리하게
              약관내용을 변경하는 경우에는 최소한 30일 이상의 사전 유예기간을
              두고 공지합니다. 이 경우 회사는 개정 전 내용과 개정 후 내용을
              명확하게 비교하여 이용자가 알기 쉽도록 표시합니다.
            </span>
            <span>
              5. 회사는 전 항에 따라 공지 또는 통지를 하면서 공지 또는
              통지일로부터 개정약관 시행일 7일 후까지 거부 의사를 표시하지
              아니하면 승인한 것으로 본다는 뜻을 명확하게 고지하였음에도
              이용자의 의사표시가 없는 경우에는 변경된 약관을 승인한 것으로
              봅니다.
            </span>
            <span>
              6. 회원은 개정약관에 동의하지 않을 권리가 있으며 개정약관에
              동의하지 않을 경우 개정약관의 적용을 받는 서비스의 이용이
              불가합니다. 이용자는 이용을 중단하고 이용계약의 해지를 선택할 수
              있습니다.
            </span>
            <span>
              7. 약관은 회원이 약관에 동의한 날로부터 이용계약의 해지 시까지
              적용하는 것을 원칙으로 합니다. 단, 본 약관의 일부 조항은
              이용계약의 해지 후에도 유효하게 적용될 수 있습니다.
            </span>
            <span>
              8. 약관 또는 관련 운영정책에서 정하지 아니한 사항 및 해석에
              관하여는 약관의 규제 등에 관한 법률 및 기타 서비스와 관련된
              관계법령 또는 상관례에 따릅니다.
            </span>
          </div>
        </div>
        {/* 제 4조 */}
        <div className="flex flex-col gap-3">
          <h2 className="text-xs">제4조(약관 외 합의)</h2>
          <div className="flex flex-col gap-[3px] font-regular text-[10.5px]">
            <span>
              1. 회원간 별도의 합의 내지 계약 체결 시, 회사는 별도의 개입과 관련
              책임을 지지 않습니다.
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[30px]">
        <span className="text-[13.5px]">제2장 이용계약 및 정보보호</span>

        {/* 제 5조 */}
        <div className="flex flex-col gap-3">
          <h2 className="text-xs">제5조(서비스 이용계약)</h2>
          <div className="flex flex-col gap-[3px] font-regular text-[10.5px]">
            <span>
              1. 회사가 제공하는 서비스에 관한 이용계약은 회원의 회원가입 신청에
              회사가 승낙함으로써 성립합니다.
            </span>
            <span>
              2. 이용계약은 회원가입 절차의 완료를 기준으로 성립합니다.
            </span>
            <span>
              3. 회원은 회원가입 절차 중, 약관 동의를 선택함으로써 약관의 내용을
              인지하고 이해하였으며 적용 받음에 동의하는것으로 간주합니다 따라
              회원은 서비스 이용약관을 충분히 인지하여 분쟁발생에
              주의하여합니다.
            </span>
            <span>
              4. 약관에 대한 충분한 이해 부족으로 이한 발생한 상황과 손해에 대해
              회원은 회사에 책임을 묻지 않습니다.
            </span>
          </div>
        </div>
        {/* 제 6조 */}
        <div className="flex flex-col gap-3">
          <h2 className="text-xs">제6조(회원가입 승낙 및 제한)</h2>
          <div className="flex flex-col gap-[3px] font-regular text-[10.5px]">
            <span>
              1. 회원음 회원가입 절차에 따라 회원가입을 완료하고, 회사는
              이과정에서 본인인증절차를 요구할 수 있습니다.
            </span>
            <span>
              2. 회사는 회원가입 신청에 대하여 승낙을 원칙으로합니다. 승낙거부의
              경우 아래 이유를 따름
              <ul className="list-disc list-inside text-[10.5px]">
                <li>이미 가입된 계정정보로 신청하는 경우</li>
                <li>타인의 정보를 이용하는 경우</li>
                <li>서비스 이용제한 기록이 있는 경우</li>
                <li>회사의 이익을 저해하거나 위법행위를 목적인 경우</li>
                <li>만 14세 미만인 경우</li>
              </ul>
            </span>
            <span>
              3. 회사는 천재지변, 사회적 재난 기술상의 문제 등의 이유로 서비스
              제공을 일시중단한 경우 사유가 해소 될 때까지 승낙을 유보 할 수
              있습니다
            </span>
          </div>
        </div>
        {/* 제 7조 */}
        <div className="flex flex-col gap-3">
          <h2 className="text-xs">제7조(회원정보관리)</h2>
          <div className="flex flex-col gap-[3px] font-regular text-[10.5px]">
            <span>
              1. 계정 아이디와 비밀번호에 관한 관리 책임은 회원에게 있습니다.
              회원은 아이디 및 비밀번호를 제3자에게 알려선 안되며, 자신의 아이디
              및 비밀번호를 도난당하거나 제3자가 사용하고 있음을 인지한 경우
              회사에 통보하고 회사의 안내와 조치가 있는 경우 그 조치에
              따라야하며 따르지 않음으로 발생한 손해에 대한 책임은 회원에게
              있습니다.
            </span>
            <span>
              2. 계정에 등록된 정보에 관한 관리 책임은 회원에게 있습니다. 회원은
              휴대폰 번호, 이름(실명), 이메일주소 등의 정보를 최신 상태를
              유지해야합니다. 정보가 서비스에 즉시 반영되지 않을 수 있으며,
              회원은 이를 인지하고 회사의 고의 또는 중과실이 없는 한 회사에
              책임을 묻지 않습니다.
            </span>
          </div>
        </div>
        {/* 제 8조 */}
        <div className="flex flex-col gap-3">
          <h2 className="text-xs">제8조(회원의 의무)</h2>
          <div className="flex flex-col gap-[3px] font-regular text-[10.5px]">
            <span>
              1. 회사가 정한 절차 외의 방법으로 시스템을 이용하거나 접근,
              공격하는 행위
            </span>
            <span>
              2. 비정상적인 서비스 이용행위, 상습 회원가입/탈퇴 반복적인
              결제/환불 등
            </span>
            <span>
              3. 허위 또는 과장된 내용 또는 타인의 정보가 담긴 콘텐츠 등록
            </span>
            <span>
              4. 회사가 운영하는 플랫폼 내에 등록된 회사를 특정하는 내용인 로고
              ,전화번호, 주소, 이메일 주소 등을회사의 동의 없이 무단 활용하는
              행위
            </span>
            <span>
              5. 공공질서 위반, 성별 종교 정치 장애 연령 사회적 신분 등을
              차별하거나 차별을 조장하는 행위
            </span>
            <span>
              6. 다른 회원을 비방하거나 불쾌감을 유발, 허위사실 유포 등의
              부정적인 영향을 미치는 행위
            </span>
            <span>
              7. 제3자의 특허권, 상표권, 저작권 등 지적재산권을 침해하거나
              우려가 있는 행위
            </span>
            <span>
              8. 회사는 이를 위반한 회원에 대하여 제13조제2항에 따른 제재를
              하거나 민형사상 책임을 물을 수 있습니다
            </span>
          </div>
        </div>
        {/* 제 9조 */}
        <div className="flex flex-col gap-3">
          <h2 className="text-xs">제9조(회사의 의무)</h2>
          <div className="flex flex-col gap-[3px] font-regular text-[10.5px]">
            <span>
              1. 회사는 서비스를 제공함에 있어 관계법령과 약관이 금지하거나
              공서양속에 반하는 행위를 하지 않으며 회원에게 지속적이고 안정적인
              서비스 제공을 위해 최선을 다하며 노력합니다.
            </span>
            <span>
              2. 회사는 회원이 안전하게 서비스를 이용할 수 있도록 개인정보
              보호를 위하여 보안시스템을 구비하고 개인정보처리방침을 공시하고
              준수합니다.
            </span>
            <span>
              3. 회사는 회사가 제공하는 서비스로 인하여 회원에게 손해가 발생한
              경우 회사의 고의성과 중과실에 의하여 발생한 경우에 한 하여 책임을
              부담하고 그 책임 범위는 통상손해로 합니다.
            </span>
            <span>
              4. 회사는 아래와 같은 문제들로 회원들의 데이터가 멸실된 경우 고의
              또는 중과실 없는 한 회사는 면책 됩니다.
              <ul className="list-disc list-inside text-[10.5px]">
                <li>서비스 개선을 위한 업데이트</li>
                <li>천재지변, 화재, 홍수, 지진 등과 같은 자연재해</li>
                <li>전쟁, 폭동, 테러 등 사회적 재난</li>
                <li>서버, 네트워크 등 주요 설비의 고장</li>
                <li>정전, 통신망 장애 등 기술적 문제</li>
                <li>법령, 정부 정책 또는 관계 당국의 명령</li>
                <li>기타 회사가 합리적으로 통제할 수 없는 불가항력적인 사유</li>
              </ul>
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[30px]">
        <span className="text-[13.5px]">제3장 서비스 이용</span>

        {/* 제 10조 */}
        <div className="flex flex-col gap-3">
          <h2 className="text-xs">제10조(서비스 제공)</h2>
          <div className="flex flex-col gap-[3px] font-regular text-[10.5px]">
            <span>
              1. 회사는 아래와 같은 서비스 제공합니다.
              <ul className="list-disc list-inside text-[10.5px]">
                <li>
                  중개서비스: 회사가 회원간 용역, 콘텐츠 등을 거래할 수 있는
                  온라인 장소를 제공하며 그에 수반되는 서비스 및 부가서비스를
                  말합니다.
                </li>
                <li>
                  커뮤니케이션서비스: 회원이 홍보를 목적으로 하는 콘텐츠 게시,
                  별도의 메신저 등을 제공하며 그에 수반되는 서비스 및
                  부가서비스를 말합니다.
                </li>
              </ul>
            </span>
            <span>
              2. 각 서비스는 회원의 뮤지션 등록 여부에 따라 서비스의 범위가
              제한될 수 있습니다.
            </span>
          </div>
        </div>
        {/* 제 11조 */}
        <div className="flex flex-col gap-3">
          <h2 className="text-xs">제11조(서비스 중단)</h2>
          <div className="flex flex-col gap-[3px] font-regular text-[10.5px]">
            <span>
              1. 회사는 서비스 제공과 관련한 회사의 정책 변경, 서비스의 기술적
              사양의 변경 필요성이 있는 경우 아래의 사유를 포함한 기타 상당한
              사유가 있는 경우에는 서비스 전부 또는 일부의 내용을 중단할 수
              있습니다.
              <ul className="list-disc list-inside text-[10.5px]">
                <li>서비스용 설비의 유지보수 등을 위한 점검인 경우</li>
                <li>
                  정전,제반 설비의 장애 또는 이용량의 폭주 등으로 정상적인
                  서비스 이용에 지장이 있는 경우
                </li>
                <li>
                  관계사와의 계약 종료, 정부의 명령/규제 등 회사의 제반 사정이
                  있는 경우
                </li>
                <li>
                  기타 천재지변, 국가비상사태 등 불가항력적 사유가 있는 경우
                </li>
              </ul>
            </span>
            <span>
              2. 중단되는 서비스의 내용은 사전에 공지하거나, 회사가 예측할 수
              없거나 통제 불가능한 경우에는 사후에 공지할 수 있습니다.
            </span>
          </div>
        </div>
        {/* 제 12조 */}
        <div className="flex flex-col gap-3">
          <h2 className="text-xs">제12조(회원탈퇴 및 이용제한)</h2>
          <div className="flex flex-col gap-[3px] font-regular text-[10.5px]">
            <span>
              1. 회원은 회사에 언제든지 탈퇴를 요청할수 있으며, 회사는 즉시
              회원탈퇴를 처리합니다.
            </span>
            <span>
              2. 서비스 이용계약의 해지는 회원탈퇴일로 부터 시작됩니다.
            </span>
            <span>
              3. 서비스 이용계약 종료 후 회원의 과실로 인한 분쟁의 경우, 회사는
              해결 및 분쟁조정에 책임과 참여가 없습니다.
            </span>
            <span>
              4. 회사는 아래와 같은 이유로 회원의 이용제한할 수 있습니다.
              <ul className="list-disc list-inside text-[10.5px]">
                <li>6조에서 정한 가입 제한 사유가 확인된 경우</li>
                <li>
                  허위계정을 생성하거나 다수의 계정을 악용해 시스템 조작 및
                  공정성을 해친 경우
                </li>
                <li>회원이 불법적인 활동을 서비스 내에서 수행한 경우</li>
              </ul>
            </span>
          </div>
        </div>
        {/* 제 13조 */}
        <div className="flex flex-col gap-3">
          <h2 className="text-xs">제13조(저작권의 귀속 및 게시물 관련)</h2>
          <div className="flex flex-col gap-[3px] font-regular text-[10.5px]">
            <span>
              1. 약관에 따라 회원이 직접 플랫폼에 게시 내지 업로드한 콘텐츠에
              대한 저작권은 해당 회원이 소유하며, 회원은 회사 플랫폼에 등록한
              콘텐츠에 대한 무상 비족점적 사용권을 부여합니다.
            </span>
            <span>
              2. 회원이 부여한 사용권은 회사가 운영하는 동안 지속되며, 회원이
              회원탈퇴를 하더라도 별도의 게시물에 대한 삭제요청이 없을 시,
              사용권은 유효합니다.
            </span>
            <span>
              3. 회사는 회원이 플랫폼에 게시하는 콘텐츠 등을 아래와 같은 이유
              시, 제한합니다.
              <ul className="list-disc list-inside text-[10.5px]">
                <li>제3자의 개인정보 및 권리를 침해하는 경우</li>
                <li>허위사실, 인격이나 명예 훼손 등이 담긴 경우</li>
                <li>범죄적 행위인 경우</li>
                <li>기타 관계 법령에 위배되는 경우</li>
              </ul>
            </span>
          </div>
        </div>
        {/* 제 14조 */}
        <div className="flex flex-col gap-3">
          <h2 className="text-xs">제14조(유료 서비스)</h2>
          <div className="flex flex-col gap-[3px] font-regular text-[10.5px]">
            <span>
              1. 회사는 서비스의 전부 또는 일부에 대하여 서비스를 유료로 제공할
              수 있습니다.
            </span>
            <span>
              2. 회사는 유료서비스를 제공하는 경우 서비스의 이용요금, 사용법,
              납부방법 등 회원이 이해할 수 있도록 별도 및 연결페이지에
              명시합니다.
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[30px]">
        <span className="text-[13.5px]">제4장 통신 판매업</span>

        {/* 제 15조 */}
        <div className="flex flex-col gap-3">
          <h2 className="text-xs">제15조(구매 규정)</h2>
          <div className="flex flex-col gap-[3px] font-regular text-[10.5px]">
            <span>
              1. 뮤지션 등록의 가격은 인플레이션, 라이선스 제공자의 가격 변동,
              프로모션 혜택 변경 등의 원인으로 변동 될 수 있습니다. 가격을
              변동하는 경우 회원의 동의를 얻은 후 적용되며, 회원이 동의하지 않을
              경우 구독이 경신되지 않으며 기존 구독권 기간이 지난 후 일부 서비스
              이용에 제한이 있을 수 있습니다.
            </span>
            <span>
              2. 뮤지션 등록의 제공 서비스는 아래와 같은 이유로 일부 제한되거나
              변경될 수 있습니다. 서비스가 변경되는 경우 회원의 동의를 얻은 후
              적용되며, 회원이 동의하지 않을 경우 구독이 경신되지 않으며 기존
              구독권 기간이 지난 후 일부 서비스 이용에 제한이 있을 수 있습니다.
              <ul className="list-disc list-inside text-[10.5px]">
                <li>서비스 품질 및 사용자 요구 반영</li>
                <li>비즈니스 전략 및 비용 변화</li>
                <li>기술적 및 운영적 요인</li>
                <li>법적 및 외부 요인</li>
              </ul>
            </span>
          </div>
        </div>

        {/* 제 16조 */}
        <div className="flex flex-col gap-3">
          <h2 className="text-xs">제16조(계약의 성립)</h2>
          <div className="flex flex-col gap-[3px] font-regular text-[10.5px]">
            <span>1. 회원의 뮤지션 등록 구매와 동시에 계약이 성립합니다.</span>
            <span>
              2. 회사의 안내에는 회원의 구매계약에 대한 정보와 기타 안내 사항이
              포함됩니다.
            </span>
            <span>
              3. 회사는 제15조의 구매 규정에 따라 회원에게 확인을 요청하거나
              계약 취소를 안내할 수 있습니다.
            </span>
          </div>
        </div>

        {/* 제 17조 */}
        <div className="flex flex-col gap-3">
          <h2 className="text-xs">제17조(결제 및 해지)</h2>
          <div className="flex flex-col gap-[3px] font-regular text-[10.5px]">
            <span>
              1. 결제 주기. 회사의 유료 서비스를 이용과 관련하여 발생하는 기타
              청구 금액은 계정관리{">"}멤버십(뮤지션 등록) 결제일에 등록된 결제
              수단으로 청구됩니다.
            </span>
            <span>
              2. 결제 수단. 회사의 유료 서비스를 이용하기 위해선 하나 이상의
              결제 수단을 제공해야 하며, 미결제 금액에 대한 책임은 회원에게
              있습니다. 결제 수단의 유효기간 만료, 잔고 부족 등 사유로 결제가
              정상적으로 처리되지 않았음에도 불구하고 회원이 유료 서비스를
              해지하지 않은 경우, 유효한 결제 수단에 청구가 완료될 때까지 회원의
              서비스 이용이 제한 될 수 있습니다.
            </span>
            <span>
              3. 결제 수단 변경. 회원은 계정관리{">"}멤버십(뮤지션 등록)에서
              결제 수단을 변경할 수 있습니다. 회원은 결제 수단 변경 완료 후
              회사가 변경된 결제 수단으로 계속 청구하는 것을 승인합니다.
            </span>
            <span>
              4. 해지. 회원은 언제라도 계정관리{">"}멤버십(뮤지션 등록)에서
              뮤지션 등록을 해지할 수 있으며, 이 경우 주기가 종료될 때까지는
              회사의 유료 서비스를 계속 이용할 수 있습니다.{" "}
            </span>
          </div>
        </div>

        {/* 제 18조 */}
        <div className="flex flex-col gap-3">
          <h2 className="text-xs">제18조(환불 규정)</h2>
          <div className="flex flex-col gap-[3px] font-regular text-[10.5px]">
            <span>
              1. 약관에 따라 회원이 직접 플랫폼에 게시 내지 업로드한 콘텐츠에
              대한 저작권은 해당 회원이 소유하며, 회원은 회사 플랫폼에 등록한
              콘텐츠에 대한 무상 비족점적 사용권을 부여합니다.
            </span>
            <span>
              2. 회원이 부여한 사용권은 회사가 운영하는 동안 지속되며, 회원이
              회원탈퇴를 하더라도 별도의 게시물에 대한 삭제요청이 없을 시,
              사용권은 유효합니다.
            </span>
            <span>
              3. 회사는 회원이 플랫폼에 게시하는 콘텐츠 등을 아래와 같은 이유
              시, 제한합니다.
              <ul className="list-disc list-inside text-[10.5px]">
                <li>제3자의 개인정보 및 권리를 침해하는 경우</li>
                <li>허위사실, 인격이나 명예 훼손 등이 담긴 경우</li>
                <li>범죄적 행위인 경우</li>
                <li>기타 관계 법령에 위배되는 경우</li>
              </ul>
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[30px]">
        <span className="text-[13.5px]">제5장 기타</span>

        {/* 제 19조 */}
        <div className="flex flex-col gap-3">
          <h2 className="text-xs">제19조(책임제한)</h2>
          <div className="flex flex-col gap-[3px] font-regular text-[10.5px]">
            <span>
              1. 회사는 회원에게 약관에 명시되지 않는 사항에 대한 약정이나
              보증을 하지 않습니다. 다만 회사 및 회사의 임직원, 대리인의 고의
              또는 중과실이 인정되는 경우 제20조에 따라 책임을 부담합니다.
            </span>
          </div>
        </div>

        {/* 제 20조 */}
        <div className="flex flex-col gap-3">
          <h2 className="text-xs">제20조(손해배상)</h2>
          <div className="flex flex-col gap-[3px] font-regular text-[10.5px]">
            <span>
              1. 회사는 회사의 고의 또는 중과실로 인하여 회원이 손해를 입게 될
              경우 약관 및 관련 법령에 따라 회원의 손해를 배상하겠습니다, 다만
              아래와 같은 손해에 대해서는 책임을 부담하지 않습니다. 또한 회사는
              법률상 허용되는 한도 내에서 간접 손해, 특별 손해, 결과적 손해,
              징계적 손해, 및 징벌적 손해에 대한 책임을 부담하지 않습니다.
              <ul className="list-disc list-inside text-[10.5px]">
                <li>
                  천재지변 또는 이에 준하는 불가항력의 상태에서 발생한 손해
                </li>
                <li>제11조에 따라 이용자 또는 제3자가 입은 손해</li>
                <li>이용자의 귀책사유로 서비스 이용 장애로 발생하는 손해</li>
                <li>전송된 데이터의 생략, 누락, 파괴 등으로 발생하는 손해</li>
                <li>서비스 접속 또는 이용과정에서 발생하는 개인적인 손해</li>
                <li>
                  제3자가 불법적으로 회사의 서버에 접속하거나 서버를 이용하여
                  발생하는 손해
                </li>
                <li>
                  제3자의 회사 서버에 대한 전송 또는 회사 서버로부터 전송을
                  방해하여 발생하는 손해
                </li>
              </ul>
            </span>
            <span>
              2. 회사는 회사의 고의, 과실이 없는 한 회원 간 또는 회원과 제3자
              상호 간 서비스 매개로 발생한 분쟁에 대해서는 책임이 없습니다.
            </span>
            <span>
              3. 회사는 서비스에 게시된 정보, 자료, 사실의 신뢰도, 정확성 등에
              대해서 보증하지 않습니다.
            </span>
            <span>
              4. 약관 또는 관련 법령을 위반하여 회사에 손해가 발생한 경우 회사는
              회원과 제3자에게 손해배상을 청구 할 수 있습니다.
            </span>
            <span>
              5. 회사가 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를
              제공할 수 없는 경우에는 관련 책임이 면제됩니다.
            </span>
          </div>
        </div>

        {/* 제 21조 */}
        <div className="flex flex-col gap-3">
          <h2 className="text-xs">제21조(분쟁조정)</h2>
          <div className="flex flex-col gap-[3px] font-regular text-[10.5px]">
            <span>
              1. 회원의 서비스 이용과정에서 회원간 분쟁이 발생한 경우, 회사의
              고의 또는 중과실이 없는 경우 분쟁에 개입하거나 관여하지 않으며,
              이에 대한 책임을 지지 않습니다.
            </span>
          </div>
        </div>

        {/* 제 22조 */}
        <div className="flex flex-col gap-3">
          <h2 className="text-xs">제22조(준거법 및 재판권)</h2>
          <div className="flex flex-col gap-[3px] font-regular text-[10.5px]">
            <span>1. 약관은 대한민국 법령에 의하여 규정되고 이행됩니다.</span>
            <span>
              2. 회사는 회원과 분쟁이 발생할 경우 이의 해결을 위해 성실히 협의할
              것이나, 이에 관한 소송이 발생하는 경우 회사의 소재지를 관할하는
              법원을 합의 관할법원으로 정합니다.
            </span>
          </div>
        </div>
      </div>
      <h1 className="text-lg mb-[30px] mt-[90px]">
        개인정보 수집 및 이용 동의서
      </h1>
      <div className="flex flex-col gap-[3px] font-regular text-[10.5px]">
        <span>
          SETA(이하 “회사”)는 “개인정보 보호법”에 따라 아래와 같이수집하는
          개인정보의 항목, 수집 및 이용 목적, 보유 및 이용기간을 안내드리고
          동의를 받음
          <table className="table-auto text-xs text-white w-full mt-6 border-collapse">
            <thead className="bg-[#2b2b2b]">
              <tr className="text-[10.5px]">
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
            <tbody className="bg-[#1e1e1e]">
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
        </span>
        <span className="mt-6">
          (개인정보 수집 및 이용 동의서에 비동의시 서비스 이용에 제한이 발생 할
          수 있음)
        </span>
      </div>
    </div>
  );
}

package kr.co.o2i.util;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;

import kr.co.o2i.common.Const;

public class CommonUtil {

	private String temple_cd   = null; // 사찰코드
	private String user_id     = null; // 사용자명
	private String remote      = null; // 사용자 IP
	private String accept_gbn  = null; // 접수구분
	private String accept_seq  = null; // 접수번호
	private int    seq  	   = 0;    // 순번
	private String jungak_cd   = null; // 전각코드
	private String light_no    = "0";  // 등번호
	private String cash_type   = null ; // 현금/카드 구분 2014.12.18
	private String pgCode			 = null ;	// 카드결제 PG사 코드 2014.12.18
	private String pgAuthCode  = null ; // 카드결제 승인 코드 2014.12.18
	
	
	public static boolean delFile(String path,String name)
    {
      boolean i = false; 
      try
      {
          File f = new File(path+name);

          if(existFile(path,name))
          {
              f.delete();
              i = true;
          }
      }
      catch(Exception e)
      {
          i = false;
      }
      return i;
    }
	
	public static boolean existFile(String path, String filename)
	{
	      boolean i =false;
	     
	      try
	      {
	          File f = new File(path, filename);
	          i = f.exists();
	      }
	      catch(Exception e)
	      {
	          i = false;
	      }
	      return i;
	}
		
		
	/**
	 *	숫자 앞의 공백을 0으로 표시
	 */
	public static String emptyTozero(int OrgInt, int AttachCount) {
		String ReturnString = "";
		String Sign = (OrgInt<0)? "-" : "";
		OrgInt = Math.abs(OrgInt);
			
		int LastShare = 0;
		AttachCount --;
		while ( AttachCount >= 0 ) {
			OrgInt = (int)(OrgInt - LastShare*(int)Math.pow(10,(AttachCount+1)));
			LastShare =(int)(OrgInt / (int)Math.pow(10,AttachCount));
			ReturnString += LastShare;
			--AttachCount;
		}
		return Sign + ReturnString;
	} 
	
	// String 을 int로 변환
	public static int str2int(String val)
	{
		if (isEmptyString(val))
		{
			return 0;
		}

		return (Integer.valueOf(val).intValue());
	}
	// Empty String여부체크
	public static boolean isEmptyString(String val)
	{
		if (val == null || val.equalsIgnoreCase("") || val.length() == 0)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	
	
	public static String selectAcceptSeq(SqlSession sqlSession , CommonMap param)  throws Exception{
		String NAMEPSACE = "REC024w_02DAO.";
		return (String)sqlSession.selectOne(NAMEPSACE+"SELECT_ACCEPT_SEQ", param);
	}
	
	/**
	* Replace String
	* str에서 rep에 해당하는 String을 tok로 replace
	* @param str 대체될 문자를 포함한 값
	* @param regex 대체할 문자
	* @param replacement rep가 대체된 문자
	* @return rep의 값이 replacement로 바뀐 스트링값을 반환한다.
	*/
	public static String getReplaceALL(String str, String regex, String replacement)
	{
		String retStr = "";
		if (str == null || (str != null && str.length() < 1) )
		{
			return "";
		}
		if ( regex == null || (regex != null && regex.length() < 1 ) )
		{
			return str;
		}

		if ( (str.indexOf(regex) == -1) )
		{
			return str;
		}

		for (int i = 0, j = 0; (j = str.indexOf(regex, i)) > -1; i = j + regex.length())
		{
			retStr += (str.substring(i, j) + replacement);
		}

		return retStr + str.substring(str.lastIndexOf(regex) + regex.length(), str.length());
	}
	
	
	public static boolean changeBudCd2( SqlSession sqlSession
			                           ,Map<String, Object> changeInfo  ) throws Exception {
		
		String NAMEPSACE = "SIN001p_01DAO.";
		
		try{
			//개인번호가 들어가 있는 Table Defind
			/*
			 	(2008.10.30)기준 정리 SM.KOO (1~40 : 신도 관련 테이블)
		 		================================================================================================================
		 		순번		테이블명						컬럼명				비고
		 		================================================================================================================
		 		1.		신도카드
		 		1-1.	SIN_CARD_MASTER				BUD_NO				(신도카드에서 변경함)
				1-2.								DAEJU_BUD_NO		(신도카드에서 변경함)
				1-3.								HWAJU_BUD_NO		(신도카드에서 변경함)		
		 		================================================================================================================
		 		2.		분가합가이력										(INSERT)(DELETE)
		 		2-1.	SIN_BRANCH_FAMILY_HIS		BUD_NO				PMFlag가 NULL이 들오어는경우 신도 번호 변경임으로 INSERT하지않는다.
				2-1.								BUD_CODE		    
				2-2.								BUD_CODE_AFTER		
		 		================================================================================================================
		 		3.		영가정보
		 		3-1.	SIN_DEATH_INFO				BUD_NO				
		 		================================================================================================================
		 		4.		영가복위자정보
		 		4-1.	SIN_DEATH_BOKWI_INFO		BUD_NO				
				4-2.								DECE_BUD_NO			
		 		================================================================================================================
		 		5.		신도수계정보
		 		5-1.	SIN_BUDDHISM_INFO			BUD_NO				
		 		================================================================================================================
		 		6.		신도신행활동(경력)
		 		6-1.	SIN_ACTION_HIS				BUD_NO						
		 		================================================================================================================
		 		7.		신도카드이력정보
		 		7-1.	SIN_CARD_HIS				BUD_NO			
		 		================================================================================================================
		 		8.		단체가입정보
		 		8-1.	SIN_GROUP_HIS				BUD_NO		
		 		================================================================================================================
		 		8.		각종가입비이력
		 		8-1.	SIN_GROUP_ENTRANCE_HIS		BUD_NO				
		 		================================================================================================================
		 		9.		각종회비이력
		 		9-1.	SIN_GROUP_FEE				BUD_NO				
		 		================================================================================================================
		 		10.		단체가입정보
		 		10-1.	SIN_GROUP_HIS				BUD_NO				(INSERT)(DELETE)
		 		================================================================================================================
		 		11.		신도신행 장학/포상관리
		 		11-1.	SIN_SCHOLARSHIP_FUND_HIS	BUD_NO		
		 		================================================================================================================
		 		12.		가족메모
		 		12-1.	SIN_FAMILY_MEMO				BUD_NO		
		 		================================================================================================================
		 		13.		기부금영수증 발급
		 		13-1.	SIN_DONATION_BILL			BUD_NO				(INSERT)(DELETE)
		 		================================================================================================================
		 		14.		기부금영수증 세부내역
		 		14-1.	SIN_DONATION_BILL_DETAIL	BUD_NO		
		 		================================================================================================================
		 		15.		년도별 기부금 내역
		 		15-1.	SIN_DONATION_BILL_YEAR		BUD_NO		
		 		================================================================================================================
		 		16.		신도분류정보
		 		16-1.	SIN_CLASS_INFO				BUD_NO
		 		================================================================================================================
		 		17.		템플스테이이력정보
		 		17-1.	SIN_TEMPLE_STAY_HIS			BUD_NO
		 		================================================================================================================
		 		18.		신도 CMS 정보 (2009.09.17) 추가 
		 		18-1.	SIN_CMS_INFO				BUD_NO
		 		================================================================================================================
		 		19.		신도 CMS 회원 이력(2009.09.17) 추가 
		 		19-1.	SIN_CMS_MEMBER_HIS			BUD_NO
		 		================================================================================================================
		 		
		 		
		 		
		 		
		 		
		 		(2008.10.30)기준 정리 SM.KOO (41~80 : 접수관련 테이블)
		 		================================================================================================================
		 		순번		테이블명						컬럼명				비고
		 		================================================================================================================
		 		51.		접수Main
		 		51-1.	REC_MASTER					PROPOSAL_BUD_NO
		 		51-2.								WHAJUBOSAL
		 		================================================================================================================
		 		52.		모연문배포관리
		 		52-1.	REC_MOYEONMUN_DIVISION		BUD_NO			
		 		================================================================================================================
		 		53.		위패/천혼문 동참자
		 		53-1.	REC_WEPAE_CHONHON_JOIN_MGT	DECE_BUD_NO
		 		53-2.								BOKWIJA_NO	
		 		================================================================================================================
		 		54.		인등동참자관리
		 		54-1.	REC_INDEUNG_JOIN_MGT		DONGCHAM_BUD_NO
		 		54-2.								BOKWIJA_NO	
		 		================================================================================================================
		 		55.		연등 동참자
		 		55-1.	REC_YEONDEUNG_JOIN_MGT		DONGCHAM_BUD_NO
		 		55-2.								BOKWIJA_NO	
		 		================================================================================================================					
				56.		49재 영가정보
		 		56-1.	REC_FORTY_NINE_DEATH		DECE_BUD_NO			
		 		================================================================================================================
		 		57.		기제 영가정보
		 		57-1.	REC_GIJE_DEATH				DECE_BUD_NO			
		 		================================================================================================================
		 		58.		천도재 영가정보
		 		58-1.	REC_CHONDOJE_DEATH			DECE_BUD_NO			
		 		================================================================================================================
		 		59.		천도재 영가정보
		 		59-1.	REC_BULSA_DETAIL			BUD_NO			
		 		================================================================================================================
		 		60.		법회/기도 접수세부내역
		 		60-1.	REC_PRAY_DETAIL				BUD_NO				실제 사용되는 컬럼이 아니다.	
		 		================================================================================================================				
				61.		법회/기도 접수세부내역
		 		61-1.	REC_TEMPLE_STAY_DETAIL		BUD_NO				
		 		================================================================================================================
				62.		원불 동참자 (2008.12.15) 추가 
		 		62-1.	REC_WONBUL_JOIN_MGT			DONGCHAM_BUD_NO
		 		62-2.								BOKWIJA_NO	
		 		================================================================================================================
		 		63.		후원 동참자 (2009.05.22) 추가 
		 		63-1.	REC_SUPPORT_DETAIL			DONGCHAM_BUD_NO
		 		================================================================================================================
				
				
											(2008.10.30)기준 정리 SM.KOO (81~100 : 기타 테이블)
		 		================================================================================================================
		 		81.		SMS 예약발송
		 		81-1.	SDK_SMS_SEND					TR_ETC2				
        81-1. SDK_MMS_SEND          TR_ETC2       
		 		================================================================================================================
		 		82.		SMS 발송내역
		 		82-1.	SDK_SMS_REPORT					TR_ETC2				
        82-2. SDK_MMS_REPORT          TR_ETC2       
		 		================================================================================================================
		 		
		 		91.		신도카드 발급내역 (2017.02.01)
		 		91-1  SIN_CARD_ISSUE_DETAIL
		 		================================================================================================================
		 		
			*/
			
			//changeInfo 
			
			String PMFlag = StringUtil.ObjToStr( changeInfo.get("PMFlag"), "");
			System.out.println("PMFlag = "+ PMFlag);
			if( !"".equals(PMFlag) ){
				
				
				Map<String, Object>  SEQ_NO_Map= new HashMap<String, Object>();
				
				SEQ_NO_Map.put("TEMPLE_CD", changeInfo.get("TEMPLE_CD"));
				SEQ_NO_Map.put("BUD_NO"   , changeInfo.get("O_BudCd") );
				
				if(!"2".equals(PMFlag)) {
					SEQ_NO_Map.put("BUD_NO"   , changeInfo.get("N_BudCd") );
				}
				
				System.out.println("changeInfo = "+ changeInfo);
				System.out.println("SEQ_NO_Map = "+ SEQ_NO_Map);
				
				String SEQ_NO =(String)sqlSession.selectOne(NAMEPSACE+"SELECT_SIN_BRANCH_FAMILY_HIS_SEQ_NO",SEQ_NO_Map );
				changeInfo.put("SEQ_NO", SEQ_NO);
				
				sqlSession.insert(NAMEPSACE+"SIN_BRANCH_FAMILY_HIS_INSERT", changeInfo);
			}
			
			//2-2. SIN_BRANCH_FAMILY_HIS : BUD_NO( UPDATE )
			if( (Integer)sqlSession.selectOne(NAMEPSACE+"SELECT_SIN_BRANCH_FAMILY_HIS_CNT", changeInfo) > 0 ){
				sqlSession.update(NAMEPSACE+"SELECT_SIN_BRANCH_FAMILY_HIS_UPDATE", changeInfo);
			}
			
			//3-1. SIN_DEATH_INFO : BUD_NO
			if( (Integer)sqlSession.selectOne(NAMEPSACE+"SIN_DEATH_INFO_CNT", changeInfo) > 0 ){
				sqlSession.update(NAMEPSACE+"SIN_DEATH_INFO_CNT_UPDATE", changeInfo);
			}
			
			//4-2. SIN_DEATH_BOKWI_INFO : DECE_BUD_NO
			if( (Integer)sqlSession.selectOne(NAMEPSACE+"SIN_DEATH_BOKWI_INFO_CNT", changeInfo) > 0 ){
				sqlSession.update(NAMEPSACE+"SIN_DEATH_BOKWI_INFO_UPDATE", changeInfo);
			}
			
			//5-1. SIN_BUDDHISM_INFO : BUD_NO
			if( (Integer)sqlSession.selectOne(NAMEPSACE+"SIN_BUDDHISM_INFO_CNT", changeInfo) > 0 ){
				sqlSession.update(NAMEPSACE+"SIN_BUDDHISM_INFO_UPDATE", changeInfo);
			}
			
			//6-1. SIN_ACTION_HIS : BUD_NO
			if( (Integer)sqlSession.selectOne(NAMEPSACE+"SIN_ACTION_HIS_CNT", changeInfo) > 0 ){
				sqlSession.update(NAMEPSACE+"SIN_ACTION_HIS_UPDATE", changeInfo);
			}
			
			//7-1. SIN_CARD_HIS : BUD_NO
			if( (Integer)sqlSession.selectOne(NAMEPSACE+"SIN_CARD_HIS_CNT", changeInfo) > 0 ){
				sqlSession.update(NAMEPSACE+"SIN_CARD_HIS_UPDATE", changeInfo);
			}
			
			//8-1. SIN_GROUP_HIS : BUD_NO (INSERT)
			if( (Integer)sqlSession.selectOne(NAMEPSACE+"SIN_GROUP_HIS_CNT", changeInfo) > 0 ){
				sqlSession.insert(NAMEPSACE+"SIN_GROUP_HIS_INSERT", changeInfo);
			}
			
			//9-1. SIN_GROUP_ENTRANCE_HIS
			if( (Integer)sqlSession.selectOne(NAMEPSACE+"SIN_GROUP_ENTRANCE_HIS_CNT", changeInfo) > 0 ){
				sqlSession.update(NAMEPSACE+"SIN_GROUP_ENTRANCE_HIS_UPDATE", changeInfo);
			}
			
			//10-1. SIN_GROUP_FEE : BUD_NO
			if( (Integer)sqlSession.selectOne(NAMEPSACE+"SIN_GROUP_FEE_CNT", changeInfo) > 0 ){
				sqlSession.update(NAMEPSACE+"SIN_GROUP_FEE_UPDATE", changeInfo);
			}
			
			//8-2. SIN_GROUP_HIS : BUD_NO (DELETE)
			if( (Integer)sqlSession.selectOne(NAMEPSACE+"SIN_GROUP_HIS_CNT2", changeInfo) > 0 ){
				sqlSession.delete(NAMEPSACE+"SIN_GROUP_HIS_DELETE", changeInfo);
			}
			
			//11-1. SIN_SCHOLARSHIP_FUND_HIS : BUD_NO
			if( (Integer)sqlSession.selectOne(NAMEPSACE+"SIN_SCHOLARSHIP_FUND_HIS_CNT", changeInfo) > 0 ){
				sqlSession.update(NAMEPSACE+"SIN_SCHOLARSHIP_FUND_HIS_UPDATE", changeInfo);
			}
			
			//12-1. SIN_FAMILY_MEMO : BUD_NO
			if( (Integer)sqlSession.selectOne(NAMEPSACE+"SIN_FAMILY_MEMO_CNT", changeInfo) > 0 ){
				sqlSession.update(NAMEPSACE+"SIN_FAMILY_MEMO_UPDATE", changeInfo);
			}
			
			
			//13-1. SIN_DONATION_BILL : BUD_NO (INSERT)
			if( (Integer)sqlSession.selectOne(NAMEPSACE+"SIN_DONATION_BILL_CNT", changeInfo) > 0 ){
				sqlSession.insert(NAMEPSACE+"SIN_DONATION_BILL_INSERT", changeInfo);
			}
			
			//14-1. SIN_DONATION_BILL_DETAIL : BUD_NO
			if( (Integer)sqlSession.selectOne(NAMEPSACE+"SIN_DONATION_BILL_DETAIL_CNT", changeInfo) > 0 ){
				sqlSession.update(NAMEPSACE+"SIN_DONATION_BILL_DETAIL_UPDATE", changeInfo);
			}
			
			//15-1. SIN_DONATION_BILL_YEAR : BUD_NO
			if( (Integer)sqlSession.selectOne(NAMEPSACE+"SIN_DONATION_BILL_YEAR_CNT", changeInfo) > 0 ){
				sqlSession.update(NAMEPSACE+"SIN_DONATION_BILL_YEAR_UPDATE", changeInfo);
			}
			
			//13-2. SIN_DONATION_BILL : BUD_NO (DELETE)
			if( (Integer)sqlSession.selectOne(NAMEPSACE+"SIN_DONATION_BILL_CNT2", changeInfo) > 0 ){
				sqlSession.delete(NAMEPSACE+"SIN_DONATION_BILL_DELETE", changeInfo);
			}
			
			//16-1. SIN_CLASS_INFO : BUD_NO
			if( (Integer)sqlSession.selectOne(NAMEPSACE+"SIN_CLASS_INFO_CNT", changeInfo) > 0 ){
				sqlSession.update(NAMEPSACE+"SIN_CLASS_INFO_UPDATE", changeInfo);
			}
			
			//17-1.SIN_TEMPLE_STAY_HIS : BUD_NO
			if( (Integer)sqlSession.selectOne(NAMEPSACE+"SIN_TEMPLE_STAY_HIS_CNT", changeInfo) > 0 ){
				sqlSession.update(NAMEPSACE+"SIN_TEMPLE_STAY_HIS_UPDATE", changeInfo);
			}
			
			//18-1.SIN_CMS_INFO : BUD_NO
			if( (Integer)sqlSession.selectOne(NAMEPSACE+"SIN_CMS_INFO_CNT", changeInfo) > 0 ){
				sqlSession.update(NAMEPSACE+"SIN_CMS_INFO_UPDATE", changeInfo);
			}
			
			//19-1.SIN_CMS_MEMBER_HIS : BUD_NO
			if( (Integer)sqlSession.selectOne(NAMEPSACE+"SIN_CMS_MEMBER_HIS_CNT", changeInfo) > 0 ){
				sqlSession.update(NAMEPSACE+"SIN_CMS_MEMBER_HIS_UPDATE", changeInfo);
			}
			
			
			//51-1. REC_MASTER : PROPOSAL_BUD_NO
			if( (Integer)sqlSession.selectOne(NAMEPSACE+"REC_MASTER_CNT", changeInfo) > 0 ){
				sqlSession.update(NAMEPSACE+"REC_MASTER_UPDATE", changeInfo);
			}
			
			//51-2. REC_MASTER : WHAJUBOSAL
			if( (Integer)sqlSession.selectOne(NAMEPSACE+"REC_MASTER_WHAJUBOSAL_CNT", changeInfo) > 0 ){
				sqlSession.update(NAMEPSACE+"REC_MASTER_WHAJUBOSAL_UPDATE", changeInfo);
			}
			
			//53-2. REC_WEPAE_CHONHON_JOIN_MGT : BOKWIJA_NO
			if( (Integer)sqlSession.selectOne(NAMEPSACE+"REC_WEPAE_CHONHON_JOIN_MGT_CNT", changeInfo) > 0 ){
				sqlSession.update(NAMEPSACE+"REC_WEPAE_CHONHON_JOIN_MGT_UPDATE", changeInfo);
			}
			
			//54-1. REC_INDEUNG_JOIN_MGT : DONGCHAM_BUD_NO
			if( (Integer)sqlSession.selectOne(NAMEPSACE+"REC_INDEUNG_JOIN_MGT_CNT", changeInfo) > 0 ){
				sqlSession.update(NAMEPSACE+"REC_INDEUNG_JOIN_MGT_UPDATE", changeInfo);
			}
			
			//54-2. REC_INDEUNG_JOIN_MGT : BOKWIJA_NO
			if( (Integer)sqlSession.selectOne(NAMEPSACE+"REC_INDEUNG_JOIN_MGT_BOKWIJA_NO_CNT", changeInfo) > 0 ){
				sqlSession.update(NAMEPSACE+"REC_INDEUNG_JOIN_MGT_BOKWIJA_NO_UPDATE", changeInfo);
			}
			
			//55-1. REC_YEONDEUNG_JOIN_MGT : DONGCHAM_BUD_NO
			if( (Integer)sqlSession.selectOne(NAMEPSACE+"REC_YEONDEUNG_JOIN_MGT_CNT", changeInfo) > 0 ){
				sqlSession.update(NAMEPSACE+"REC_YEONDEUNG_JOIN_MGT_UPDATE", changeInfo);
			}
			
			//55-2. REC_YEONDEUNG_JOIN_MGT : BOKWIJA_NO
			if( (Integer)sqlSession.selectOne(NAMEPSACE+"REC_YEONDEUNG_JOIN_MGT_BOKWIJA_NO_CNT", changeInfo) > 0 ){
				sqlSession.update(NAMEPSACE+"REC_YEONDEUNG_JOIN_MGT_BOKWIJA_NO_UPDATE", changeInfo);
			}
			
			//56-1. REC_FORTY_NINE_DEATH : DECE_BUD_NO
			if( (Integer)sqlSession.selectOne(NAMEPSACE+"REC_FORTY_NINE_DEATH_CNT", changeInfo) > 0 ){
				sqlSession.update(NAMEPSACE+"REC_FORTY_NINE_DEATH_UPDATE", changeInfo);
			}
			
			//57-1. REC_GIJE_DEATH : DECE_BUD_NO
			if( (Integer)sqlSession.selectOne(NAMEPSACE+"REC_GIJE_DEATH_CNT", changeInfo) > 0 ){
				sqlSession.update(NAMEPSACE+"REC_GIJE_DEATH_UPDATE", changeInfo);
			}
			
			//58-1. REC_CHONDOJE_DEATH : DECE_BUD_NO
			if( (Integer)sqlSession.selectOne(NAMEPSACE+"REC_CHONDOJE_DEATH_CNT", changeInfo) > 0 ){
				sqlSession.update(NAMEPSACE+"REC_CHONDOJE_DEATH_UPDATE", changeInfo);
			}
			
			//59-1. REC_BULSA_DETAIL : BUD_NO
			if( (Integer)sqlSession.selectOne(NAMEPSACE+"REC_BULSA_DETAIL_CNT", changeInfo) > 0 ){
				sqlSession.update(NAMEPSACE+"REC_BULSA_DETAIL_UPDATE", changeInfo);
			}
			
			//60-1.	REC_PRAY_DETAIL	: BUD_NO (실제 사용되는 컬럼이 아니다)
			
			//61-1. REC_TEMPLE_STAY_DETAIL : BUD_NO
			if( (Integer)sqlSession.selectOne(NAMEPSACE+"REC_TEMPLE_STAY_DETAIL_CNT", changeInfo) > 0 ){
				sqlSession.update(NAMEPSACE+"REC_TEMPLE_STAY_DETAIL_UPDATE", changeInfo);
			}
			
			
			//62-1. REC_WONBUL_JOIN_MGT : DONGCHAM_BUD_NO
			if( (Integer)sqlSession.selectOne(NAMEPSACE+"REC_WONBUL_JOIN_MGT_CNT", changeInfo) > 0 ){
				sqlSession.update(NAMEPSACE+"REC_WONBUL_JOIN_MGT_UPDATE", changeInfo);
			}
			
			//62-2. REC_WONBUL_JOIN_MGT : BOKWIJA_NO
			if( (Integer)sqlSession.selectOne(NAMEPSACE+"REC_WONBUL_JOIN_MGT_BOKWIJA_NO_CNT", changeInfo) > 0 ){
				sqlSession.update(NAMEPSACE+"REC_WONBUL_JOIN_MGT_BOKWIJA_NO_UPDATE", changeInfo);
			}
			
			//63-3. REC_SUPPORT_DETAIL : DONGCHAM_BUD_NO
			if( (Integer)sqlSession.selectOne(NAMEPSACE+"REC_SUPPORT_DETAIL_CNT", changeInfo) > 0 ){
				sqlSession.update(NAMEPSACE+"REC_SUPPORT_DETAIL_UPDATE", changeInfo);
			}
			
			//63-4. REC_YOUNGTOP_DETAIL : BUD_NO
			if( (Integer)sqlSession.selectOne(NAMEPSACE+"REC_YOUNGTOP_DETAIL_CNT", changeInfo) > 0 ){
				sqlSession.update(NAMEPSACE+"REC_YOUNGTOP_DETAIL_UPDATE", changeInfo);
			}
			
			//81-1.	SMSKT.SDK_SMS_SEND : RESERVED2
			if( (Integer)sqlSession.selectOne(NAMEPSACE+"SDK_SMS_SEND_CNT", changeInfo) > 0 ){
				sqlSession.update(NAMEPSACE+"SDK_SMS_SEND_UPDATE", changeInfo);
			}
			
			//81-2. SMSKT.SDK_MMS_SEND : RESERVED2
			if( (Integer)sqlSession.selectOne(NAMEPSACE+"SDK_MMS_SEND_CNT", changeInfo) > 0 ){
				sqlSession.update(NAMEPSACE+"SDK_MMS_SEND_UPDATE", changeInfo);
			}
			
			//82-3.	SDK_SMS_REPORT : RESERVED2
			if( (Integer)sqlSession.selectOne(NAMEPSACE+"SDK_SMS_REPORT_CNT", changeInfo) > 0 ){
				sqlSession.update(NAMEPSACE+"SDK_SMS_REPORT_UPDATE", changeInfo);
			}
			
			//82-4. SDK_MMS_REPORT : RESERVED2
			if( (Integer)sqlSession.selectOne(NAMEPSACE+"SDK_MMS_REPORT_CNT", changeInfo) > 0 ){
				sqlSession.update(NAMEPSACE+"SDK_MMS_REPORT_UPDATE", changeInfo);
			}
			
			// 91-1 SIN_CARD_ISSUE_DETAIL : BUD_NO
			if( (Integer)sqlSession.selectOne(NAMEPSACE+"SIN_CARD_ISSUE_DETAIL_CNT", changeInfo) > 0 ){
				sqlSession.update(NAMEPSACE+"SIN_CARD_ISSUE_DETAIL_UPDATE", changeInfo);
			}
			
		}catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
	
	
	
	public static void smsSend( SqlSession sqlSession
			                   ,CommonMap param
            				   ,List<Map<String, Object>> smsList  ) throws Exception {
		
		for(int i = 0; i < smsList.size() ; i++) {
			Map<String, Object> info = smsList.get(i);
			
			String TR_SMS_YN = StringUtil.ObjToStr(info.get("TR_SMS_YN")  , "");
			String TR_PHONE  = StringUtil.ObjToStr(info.get("TR_PHONE") , "");
			
			
			if( !"".equals(TR_SMS_YN) &&  !"F".equals(TR_SMS_YN) && !"".equals(TR_PHONE) ) {
				
				String TR_DEST_INFO  = StringUtil.replaceWord(StringUtil.ObjToStr(info.get("TR_DEST_INFO") , ""), "-", "");
				String TR_CALLBACK   = StringUtil.replaceWord(StringUtil.ObjToStr(info.get("TR_CALLBACK") , ""), "-", "");
				
				TR_PHONE = StringUtil.replaceWord(TR_PHONE, "-", "");
				
				info.put("TR_DEST_INFO", TR_DEST_INFO);
				info.put("TR_CALLBACK" , TR_CALLBACK);
				info.put("TR_PHONE"    , TR_PHONE);
				
				String TR_MESSAGE    = StringUtil.ObjToStr(info.get("TR_MESSAGE") , "");
				String TR_MSG_GB     = "SMS";
				
				if( StringUtil.byteLength(TR_MESSAGE) > 80 ) {
					TR_MSG_GB = "LMS";
					info.put("TR_MSG_GB", TR_MSG_GB);
				}
				
				String TR_MSGTYPE    = StringUtil.ObjToStr(info.get("TR_MSGTYPE") , "");
				String SQL_NAME      = "";
				if("LMS".equals(TR_MSG_GB)) {
					SQL_NAME = "INSERT_LMS_NOW";
					if("1".equals(TR_MSGTYPE))   SQL_NAME = "INSERT_LMS_WAIT"; 
					
				}else {
					SQL_NAME = "INSERT_SMS_NOW";
					if("1".equals(TR_MSGTYPE))   SQL_NAME = "INSERT_SMS_WAIT"; 
				}//

				info.put("SMS_USER_ID", Const.SMS_USER_ID);
				SQL_NAME = "INSERT_LMS_NOW";
				
				sqlSession.insert("SmsDAO."+SQL_NAME , info );
				
			}// if
			
		}// for
		
	}// smsSend
	
	
	@SuppressWarnings("unchecked")
	public static boolean saveRecSMS(SqlSession sqlSession
									,Map<String, Object> accRecInfo) throws Exception{
		boolean rValue = true;
		LunarCalendar lc = new LunarCalendar() ; 
		
		try{
			
			String TEMPLE_CD = StringUtil.ObjToStr(accRecInfo.get("TEMPLE_CD"));
			
			
			List<Map<String, Object>> List01 = sqlSession.selectList("REC000w_03DAO.SELECT_REC_MASTER_SUB",accRecInfo);
			for(int i = 0; i< List01.size(); i++){
				Map<String, Object> map01 = List01.get(i);
				
				
				String MASTER_PROPOSAL_BUD_NO         	=	map01.get("MASTER_PROPOSAL_BUD_NO").toString();
				String MASTER_CRT_USER                	=	map01.get("MASTER_CRT_USER").toString();
				String SUB_ACCEPT_GBN                 	=	getReplaceALL(map01.get("SUB_ACCEPT_GBN").toString(), ".0", "");
				String SUB_SEQ                 	        =	getReplaceALL(map01.get("SUB_SEQ").toString(), ".0", "");
				String ACCEPT_SEQ                 	    =	getReplaceALL(accRecInfo.get("ACCEPT_SEQ").toString(), ".0", "");
				
				
				map01.put("ACCEPT_SEQ", accRecInfo.get("ACCEPT_SEQ"));
				map01.put("SEQ"       , SUB_SEQ);
				
				
				String SUB_ACCEPT_GBN_SMS 	   = "";
				String [][] SUB_ACCEPT_GBN_ARR = {
			    	{ "1",  "1"  },
			    	{ "2",  "2"  },
			    	{ "3",  "3"  },
			    	{ "4",  "4"  },
			    	{ "5",  "5"  },
			    	{ "6",  "6"  },
			    	{ "7",  "7"  },
			    	{ "8",  "8"  },
			    	{ "9",  "9"  },
			    	{ "10", "12" },
			    	{ "11", "13" }
				};
				
				Map<String, Object> REC_SMS_INFO = (Map<String, Object>)sqlSession.selectList("REC000w_03DAO.SELECT_REC_SMS_INFO", map01).get(0);
				String SMS_TRAN_FLAG  = StringUtil.ObjToStr( REC_SMS_INFO.get("SMS_TRAN_FLAG") );
				String TR_CALLBACK    = StringUtil.ObjToStr( REC_SMS_INFO.get("TR_CALLBACK") );
				String TEMPLE_NM      = StringUtil.ObjToStr( REC_SMS_INFO.get("TEMPLE_NM") );
				String TR_PHONE       = StringUtil.ObjToStr( REC_SMS_INFO.get("TR_PHONE") );
				
				
				for(int j=0 ; j<SUB_ACCEPT_GBN_ARR.length; j++) { 
					 if(SUB_ACCEPT_GBN_ARR[j][0].equals(SUB_ACCEPT_GBN)){
						 SUB_ACCEPT_GBN_SMS = SUB_ACCEPT_GBN_ARR[j][1]; 
					 }
				 }
				map01.put("SUB_ACCEPT_GBN_SMS", SUB_ACCEPT_GBN_SMS);
				
				
				Map<String, Object> SELECT_SUB_REC_SMS_INFO = null;
				List<Map<String, Object>> List000           = sqlSession.selectList("REC000w_03DAO.SELECT_SUB_REC_SMS_INFO", map01);
				if(List000.size() <= 0) {
					return true;
				}else {
				}
				
				
				SELECT_SUB_REC_SMS_INFO = List000.get(0);
			
				String ALARM_DAY  = StringUtil.ObjToStr( SELECT_SUB_REC_SMS_INFO.get("ALARM_DAY") );
				String ALARM_TIME = StringUtil.ObjToStr( SELECT_SUB_REC_SMS_INFO.get("ALARM_TIME") );
				String CONTENTS   = StringUtil.ObjToStr( SELECT_SUB_REC_SMS_INFO.get("CONTENTS") );
				
				
				List<Map<String, Object>> List02  = sqlSession.selectList("REC000w_03DAO.SELECT_SMS_COL_INFO",map01);
				
				String [][] REPLACE_ARR = new String[2][List02.size()];
				String CONTENTS_TEMP    = "";
				boolean smsFlag = true;
				
				
				
				
				if(SMS_TRAN_FLAG.equals("T") && !ALARM_DAY.equals("") && !ALARM_TIME.equals("") && !CONTENTS.equals("") ){
					
					System.out.println();
					
					switch (str2int(SUB_ACCEPT_GBN)){
					
						case 1:		// 1 : 법회/기도
					
							
							System.out.println("map01 = "+ map01);
							System.out.println("map01 = "+ map01);
							System.out.println("map01 = "+ map01);
							
							List<Map<String, Object>> List10 = sqlSession.selectList("REC000w_03DAO.SELECT_SMS_01",map01);
							for(int l = 0; l< List10.size(); l++){
								Map<String, Object> map03 = List10.get(l);
								
								String FDATE		    =	map03.get("FDATE").toString();
					 			String PRAY_GBN	     	=	map03.get("PRAY_GBN").toString();
					 			String PRAY_CODE	    =	map03.get("PRAY_CODE").toString();
					 			String PLUS_EVENT_DATE	=	FDATE;

					 			CONTENTS_TEMP = CONTENTS;
					 			
					 			for(int k = 0; k< List02.size(); k++){
					 				Map<String, Object> map02 = List02.get(k);
					 				
					 				String COL_ID   = StringUtil.ObjToStr( map02.get("COL_ID") , "");
					 				String COL_NAME = StringUtil.ObjToStr( map02.get("COL_NAME") , "");
					 				
					 				if(!"".equals(COL_ID) &&  !"".equals(COL_NAME)) {
					 					REPLACE_ARR[0][k] = COL_ID;
										REPLACE_ARR[1][k] = COL_NAME;
										
										if("TEMPLE_NM".equals(REPLACE_ARR[0][k])){
											 CONTENTS_TEMP = getReplaceALL(CONTENTS_TEMP, REPLACE_ARR[1][k], TEMPLE_NM);
										}else if("PRAY_NM".equals(REPLACE_ARR[0][k])){
										  String PRAY_NM = StringUtil.ObjToStr( sqlSession.selectOne("REC000w_03DAO.SELECT_PRAY_NM", map03)) ;
										  
										  if("신도증접수".equals(PRAY_NM)) smsFlag = false;
										  
										  CONTENTS_TEMP = getReplaceALL(CONTENTS_TEMP, REPLACE_ARR[1][k], PRAY_NM);
										}else if("FDATE".equals(REPLACE_ARR[0][k])){
										  CONTENTS_TEMP = getReplaceALL(CONTENTS_TEMP, REPLACE_ARR[1][k], FDATE.substring(0, 4)+"/"+FDATE.substring(4, 6)+"/"+FDATE.substring(6));
										}
					 				}// 
					 			}// for k
					 			
					 			
					 			if(smsFlag) {
					 				Map<String, Object> map = new HashMap<String, Object>();
									map.put("V_TR_ID"       ,SUB_ACCEPT_GBN);
						 			map.put("V_TR_MSGTYPE"  ,"1");
						 			map.put("V_TR_MESSAGE"  ,CONTENTS_TEMP);
						 			map.put("V_TR_CALLBACK" ,TR_CALLBACK);
						 			map.put("V_TR_ETC1"     ,TEMPLE_CD);
						 			map.put("V_TR_ETC2"     ,MASTER_PROPOSAL_BUD_NO);
						 			map.put("V_TR_ETC3"     ,"SMSREC");
						 			map.put("V_TR_ETC4"     ,SUB_ACCEPT_GBN_SMS);
						 			map.put("V_TR_ETC5"     ,MASTER_CRT_USER);
						 			map.put("V_TR_ETC6"     ,"");
						 			map.put("V_TR_DESTINFO" ,TR_PHONE);
						 			map.put("V_TR_SENDDATE" ,DateTimeUtil.nextDay(PLUS_EVENT_DATE,(-1)*Integer.parseInt(ALARM_DAY),"yyyyMMdd","yyyyMMdd"));
						 			map.put("V_TR_SENDTIME" ,ALARM_TIME);
						 			saveSmsMessage(sqlSession, map);
					 			} //
					 			
							}// for l
							
							break;
							
							
						case 5:		// 5 : 49	
							
							List<Map<String, Object>> List50 = sqlSession.selectList("REC000w_03DAO.SELECT_NINE_JESA_MGT",map01);
							for(int l = 0; l< List50.size(); l++){
								Map<String, Object> map03 = List50.get(l);
					 			String JESA_GUBUN	=	map03.get("JESA_GUBUN").toString();
					 			String LUNAR_SOLAR	=	map03.get("LUNAR_SOLAR").toString();
					 			String EVENT_DATE	=	map03.get("EVENT_DATE").toString();
					 			String EVENT_TIME	=	map03.get("EVENT_TIME").toString();
					 			String PLUS_EVENT_DATE	=	EVENT_DATE;
					 			
					 			PLUS_EVENT_DATE = PLUS_EVENT_DATE.replaceAll("-", "").replaceAll("/", "");				
					 			PLUS_EVENT_DATE = PLUS_EVENT_DATE.substring(0, 8);
					 			
					 			
					 			if(LUNAR_SOLAR.equals("T")){
					 				PLUS_EVENT_DATE = lc.fromLunar(EVENT_DATE).substring(0, 8);
					 			}
					 			CONTENTS_TEMP = CONTENTS;
					 			
					 			for(int k = 0; k< List02.size(); k++){
					 				 Map<String, Object> map02 = List02.get(k);
					 				 
									 REPLACE_ARR[0][k] = map02.get("COL_ID").toString();
									 REPLACE_ARR[1][k] = map02.get("COL_NAME").toString();

									 if("TEMPLE_NM".equals(REPLACE_ARR[0][k])){
										 CONTENTS_TEMP = getReplaceALL(CONTENTS_TEMP, REPLACE_ARR[1][k], TEMPLE_NM);
									 }else if("PRAY_NM".equals(REPLACE_ARR[0][k])){
										 
										 String NAME = StringUtil.ObjToStr( sqlSession.selectOne("REC000w_03DAO.SELECT_ASP_CODE_MGT", map03)) ;
										 
										 CONTENTS_TEMP = getReplaceALL(CONTENTS_TEMP, REPLACE_ARR[1][k], NAME);
									 }else if("EVENT_DATE".equals(REPLACE_ARR[0][k])){
										 CONTENTS_TEMP = getReplaceALL(CONTENTS_TEMP, REPLACE_ARR[1][k], EVENT_DATE.substring(0, 4)+"/"+EVENT_DATE.substring(4, 6)+"/"+EVENT_DATE.substring(6));
									 }else if("EVENT_TIME".equals(REPLACE_ARR[0][k])){
										 CONTENTS_TEMP = getReplaceALL(CONTENTS_TEMP, REPLACE_ARR[1][k], EVENT_TIME.substring(0, 2)+":"+EVENT_TIME.substring(2));
									 }	
								}// for k
					 			
					 			//System.out.println(CONTENTS_TEMP);
					 			
					 			Map<String, Object> map = new HashMap<String, Object>();
					 			map.put("V_TR_ID"      ,SUB_ACCEPT_GBN);
					 			map.put("V_TR_MSGTYPE" ,"1");
					 			map.put("V_TR_MESSAGE" ,CONTENTS_TEMP);
					 			map.put("V_TR_CALLBACK",TR_CALLBACK);
					 			map.put("V_TR_ETC1"    ,TEMPLE_CD);
					 			map.put("V_TR_ETC2"    ,MASTER_PROPOSAL_BUD_NO);
					 			map.put("V_TR_ETC3"    ,"SMSREC");
					 			map.put("V_TR_ETC4"    ,SUB_ACCEPT_GBN_SMS);
					 			map.put("V_TR_ETC5"    ,MASTER_CRT_USER);
					 			map.put("V_TR_ETC6"    ,ACCEPT_SEQ+"|"+SUB_SEQ);
					 			map.put("V_TR_DESTINFO",TR_PHONE);
					 			map.put("V_TR_SENDDATE",DateTimeUtil.nextDay(PLUS_EVENT_DATE,(-1)*Integer.parseInt(ALARM_DAY),"yyyyMMdd","yyyyMMdd"));
					 			map.put("V_TR_SENDTIME",ALARM_TIME);
					 			saveSmsMessage(sqlSession, map);
					 			
							}//for l
							break;
						case 6:		// 6 : 기제
							List<Map<String, Object>> List60 = sqlSession.selectList("REC000w_03DAO.SELECT_GIJE_DETAIL",map01);
							
							for(int l = 0; l< List60.size(); l++){
								Map<String, Object> map03 = List60.get(l);
								String LUNAR_SOLAR	=	map03.get("LUNAR_SOLAR").toString();
					 			String EVENT_DATE	=	map03.get("EVENT_DATE").toString();
					 			String EVENT_TIME	=	map03.get("EVENT_TIME").toString();
					 			String PLUS_EVENT_DATE	=	EVENT_DATE;
					 			
					 			PLUS_EVENT_DATE = PLUS_EVENT_DATE.replaceAll("-", "").replaceAll("/", "");				
					 			PLUS_EVENT_DATE = PLUS_EVENT_DATE.substring(0, 8);
					 			
					 			
					 			if(LUNAR_SOLAR.equals("T")){
					 				PLUS_EVENT_DATE = lc.fromLunar(EVENT_DATE).substring(0, 8);
					 			}
					 			
					 			CONTENTS_TEMP = CONTENTS;
					 			
					 			for(int k = 0; k< List02.size(); k++){
					 				 Map<String, Object> map02 = List02.get(k);
					 				 
									 REPLACE_ARR[0][k] = map02.get("COL_ID").toString();
									 REPLACE_ARR[1][k] = map02.get("COL_NAME").toString();

									 if("TEMPLE_NM".equals(REPLACE_ARR[0][k])){
										 CONTENTS_TEMP = getReplaceALL(CONTENTS_TEMP, REPLACE_ARR[1][k], TEMPLE_NM);
									 }else if("PRAY_NM".equals(REPLACE_ARR[0][k])){
										 
										 String NAME = StringUtil.ObjToStr( sqlSession.selectOne("REC000w_03DAO.SELECT_ASP_CODE_MGT", map03)) ;
										 
										 CONTENTS_TEMP = getReplaceALL(CONTENTS_TEMP, REPLACE_ARR[1][k], NAME);
									 }else if("EVENT_DATE".equals(REPLACE_ARR[0][k])){
										 CONTENTS_TEMP = getReplaceALL(CONTENTS_TEMP, REPLACE_ARR[1][k], EVENT_DATE.substring(0, 4)+"/"+EVENT_DATE.substring(4, 6)+"/"+EVENT_DATE.substring(6));
									 }else if("EVENT_TIME".equals(REPLACE_ARR[0][k])){
										 CONTENTS_TEMP = getReplaceALL(CONTENTS_TEMP, REPLACE_ARR[1][k], EVENT_TIME.substring(0, 2)+":"+EVENT_TIME.substring(2));
									 }	
								}// for k
					 			
					 			Map<String, Object> map = new HashMap<String, Object>();
					 			map.put("V_TR_ID"      ,SUB_ACCEPT_GBN);
					 			map.put("V_TR_MSGTYPE" ,"1");
					 			map.put("V_TR_MESSAGE" ,CONTENTS_TEMP);
					 			map.put("V_TR_CALLBACK",TR_CALLBACK);
					 			map.put("V_TR_ETC1"    ,TEMPLE_CD);
					 			map.put("V_TR_ETC2"    ,MASTER_PROPOSAL_BUD_NO);
					 			map.put("V_TR_ETC3"    ,"SMSREC");
					 			map.put("V_TR_ETC4"    ,SUB_ACCEPT_GBN_SMS);
					 			map.put("V_TR_ETC5"    ,MASTER_CRT_USER);
					 			map.put("V_TR_ETC6"    ,ACCEPT_SEQ+"|"+SUB_SEQ);
					 			map.put("V_TR_DESTINFO",TR_PHONE);
					 			map.put("V_TR_SENDDATE",DateTimeUtil.nextDay(PLUS_EVENT_DATE,(-1)*Integer.parseInt(ALARM_DAY),"yyyyMMdd","yyyyMMdd"));
					 			map.put("V_TR_SENDTIME",ALARM_TIME);
					 			saveSmsMessage(sqlSession, map);
					 			
							}// for l
							
							break;
						case 7:		// 7 : 천도제
							List<Map<String, Object>> List70 = sqlSession.selectList("REC000w_03DAO.SELECT_CHONDOJE_DETAIL",map01);
							for(int l = 0; l< List70.size(); l++){
								Map<String, Object> map03= List70.get(l);
								String LUNAR_SOLAR	    =	map03.get("LUNAR_SOLAR").toString();
					 			String EVENT_DATE	    =	map03.get("EVENT_DATE").toString();
					 			String EVENT_TIME	    =	map03.get("EVENT_TIME").toString();
					 			String PLUS_EVENT_DATE	=	EVENT_DATE;
					 			PLUS_EVENT_DATE = PLUS_EVENT_DATE.replaceAll("-", "").replaceAll("/", "");				
					 			PLUS_EVENT_DATE = PLUS_EVENT_DATE.substring(0, 8);
					 			
					 			if(LUNAR_SOLAR.equals("T")){
					 				PLUS_EVENT_DATE = lc.fromLunar(EVENT_DATE).substring(0, 8);
					 			}
					 			CONTENTS_TEMP = CONTENTS;
					 			
					 			for(int k = 0; k< List02.size(); k++){
					 				Map<String, Object> map02 = List02.get(k);
									 REPLACE_ARR[0][k] = map02.get("COL_ID").toString();
									 REPLACE_ARR[1][k] = map02.get("COL_NAME").toString();
									 
									 if("TEMPLE_NM".equals(REPLACE_ARR[0][k])){
										 CONTENTS_TEMP = getReplaceALL(CONTENTS_TEMP, REPLACE_ARR[1][k], TEMPLE_NM);
									 }else if("EVENT_DATE".equals(REPLACE_ARR[0][k])){
										 CONTENTS_TEMP = getReplaceALL(CONTENTS_TEMP, REPLACE_ARR[1][k], EVENT_DATE.substring(0, 4)+"/"+EVENT_DATE.substring(4, 6)+"/"+EVENT_DATE.substring(6));
									 }else if("EVENT_TIME".equals(REPLACE_ARR[0][k])){
										 if(EVENT_TIME.equals("0000")){
											 CONTENTS_TEMP = getReplaceALL(CONTENTS_TEMP, REPLACE_ARR[1][k], "");
										 }else{
											 CONTENTS_TEMP = getReplaceALL(CONTENTS_TEMP, REPLACE_ARR[1][k], EVENT_TIME.substring(0, 2)+":"+EVENT_TIME.substring(2));
										 }
									 }	
								}// for k
					 			HashMap map = new HashMap();
				                map.put("V_TR_ID",SUB_ACCEPT_GBN);
				                map.put("V_TR_MSGTYPE","1");
				                map.put("V_TR_MESSAGE",CONTENTS_TEMP);
				                map.put("V_TR_CALLBACK",TR_CALLBACK);
				                map.put("V_TR_ETC1",TEMPLE_CD);
				                map.put("V_TR_ETC2",MASTER_PROPOSAL_BUD_NO);
				                map.put("V_TR_ETC3","SMSREC");
				                map.put("V_TR_ETC4",SUB_ACCEPT_GBN_SMS);
				                map.put("V_TR_ETC5",MASTER_CRT_USER);
				                //map.put("V_TR_ETC6","");
				                map.put("V_TR_ETC6",ACCEPT_SEQ+"|"+SUB_SEQ);
				                map.put("V_TR_DESTINFO",TR_PHONE);
				                map.put("V_TR_SENDDATE",DateTimeUtil.nextDay(PLUS_EVENT_DATE,(-1)*Integer.parseInt(ALARM_DAY),"yyyyMMdd","yyyyMMdd"));
				                map.put("V_TR_SENDTIME",ALARM_TIME);
				                saveSmsMessage(sqlSession, map);
					 			
							}// for l
							break;
						case 8:		// 8 : 위패
							
							List<Map<String, Object>> List80 = sqlSession.selectList("REC000w_03DAO.SELECT_WEPAE_DETAIL",map01);
							
							for(int l = 0; l< List80.size(); l++){
								Map<String, Object> map03 = List80.get(l);
								
								String EVENT_CD			=	map03.get("EVENT_CD").toString();
					 			String EVENT_DATE		=	map03.get("EVENT_DATE").toString();
					 			String EVENT_TIME		=	StringUtil.ObjToStr(map03.get("EVENT_TIME"), "");
					 			String PLUS_EVENT_DATE	=	EVENT_DATE;
								
					 			CONTENTS_TEMP = CONTENTS;
					 			for(int k = 0; k< List02.size(); k++){
					 				 Map<String, Object> map02 = List02.get(k);
									 REPLACE_ARR[0][k] = map02.get("COL_ID").toString();
									 REPLACE_ARR[1][k] = map02.get("COL_NAME").toString();
									 
									 if("TEMPLE_NM".equals(REPLACE_ARR[0][k])){
										 CONTENTS_TEMP = getReplaceALL(CONTENTS_TEMP, REPLACE_ARR[1][k], TEMPLE_NM);
									 }else if("EVENT_NAME".equals(REPLACE_ARR[0][k])){
										 
										 
										 String EVENT_NAME = StringUtil.ObjToStr(sqlSession.selectOne("REC000w_03DAO.SELECT_WEPAE_MGT", map03));
										 CONTENTS_TEMP = getReplaceALL(CONTENTS_TEMP, REPLACE_ARR[1][k], EVENT_NAME);
										 
									 }else if("EVENT_DATE".equals(REPLACE_ARR[0][k])){
										 CONTENTS_TEMP = getReplaceALL(CONTENTS_TEMP, REPLACE_ARR[1][k], EVENT_DATE.substring(0, 4)+"/"+EVENT_DATE.substring(4, 6)+"/"+EVENT_DATE.substring(6));
									 }else if("EVENT_TIME".equals(REPLACE_ARR[0][k])){
										 if(EVENT_TIME.equals("") || EVENT_TIME.equals("0000")){
											 CONTENTS_TEMP = getReplaceALL(CONTENTS_TEMP, REPLACE_ARR[1][k], "");	 
										 }else{
											 CONTENTS_TEMP = getReplaceALL(CONTENTS_TEMP, REPLACE_ARR[1][k], EVENT_TIME.substring(0, 2)+":"+EVENT_TIME.substring(2));
										 }
									 }	
								}// for k
					 			
					 			HashMap map = new HashMap();
				                map.put("V_TR_ID",SUB_ACCEPT_GBN);
				                map.put("V_TR_MSGTYPE","1");
				                map.put("V_TR_MESSAGE",CONTENTS_TEMP);
				                map.put("V_TR_CALLBACK",TR_CALLBACK);
				                map.put("V_TR_ETC1",TEMPLE_CD);
				                map.put("V_TR_ETC2",MASTER_PROPOSAL_BUD_NO);
				                map.put("V_TR_ETC3","SMSREC");
				                map.put("V_TR_ETC4",SUB_ACCEPT_GBN_SMS);
				                map.put("V_TR_ETC5",MASTER_CRT_USER);
				                //map.put("V_TR_ETC6","");
				                map.put("V_TR_ETC6",ACCEPT_SEQ+"|"+SUB_SEQ);
				                map.put("V_TR_DESTINFO",TR_PHONE);
				                map.put("V_TR_SENDDATE",DateTimeUtil.nextDay(PLUS_EVENT_DATE,(-1)*Integer.parseInt(ALARM_DAY),"yyyyMMdd","yyyyMMdd"));
				                map.put("V_TR_SENDTIME",ALARM_TIME);
				                saveSmsMessage(sqlSession, map);
					 			
					 			
							}// for l
							
							break;
						case 11:	// 13 : 템플
							
							
							List<Map<String, Object>> List13 = sqlSession.selectList("REC000w_03DAO.SELECT_WEPAE_DETAIL",map01);
							for(int l = 0; l< List13.size(); l++){
								Map<String, Object> map03 = List13.get(l);
					 			
								String TEMPLE_STAY_CD	 =	map03.get("TEMPLE_STAY_CD").toString(); 	//행사명
					 			String FDATE			 =	map03.get("FDATE").toString();	//행사일
					 			String PLUS_EVENT_DATE	=	FDATE;
					 			CONTENTS_TEMP = CONTENTS;
					 			
					 			
					 			for(int k = 0; k< List02.size(); k++){
					 				 Map map02 = (Map)List02.get(k);
									 REPLACE_ARR[0][k] = map02.get("COL_ID").toString();
									 REPLACE_ARR[1][k] = map02.get("COL_NAME").toString();
									
									 if("TEMPLE_NM".equals(REPLACE_ARR[0][k])){
										 CONTENTS_TEMP = getReplaceALL(CONTENTS_TEMP, REPLACE_ARR[1][k], TEMPLE_NM);
									 }else if("TEMPLE_STAY_NM".equals(REPLACE_ARR[0][k])){
										 String TEMPLE_STAY_NM = StringUtil.ObjToStr( sqlSession.selectOne("REC000w_03DAO.SELECT_TEMPLE_MGT", map03)) ;
										 CONTENTS_TEMP = getReplaceALL(CONTENTS_TEMP, REPLACE_ARR[1][k], TEMPLE_STAY_NM);
									 }else if("FDATE".equals(REPLACE_ARR[0][k])){
										 CONTENTS_TEMP = getReplaceALL(CONTENTS_TEMP, REPLACE_ARR[1][k], FDATE.substring(0, 4)+"/"+FDATE.substring(4, 6)+"/"+FDATE.substring(6));
									 }else if("PERIOD".equals(REPLACE_ARR[0][k])){
										 String PERIOD = StringUtil.ObjToStr( sqlSession.selectOne("REC000w_03DAO.SELECT_TEMPLE_MGT_PERIOD", map03)) ;
										 CONTENTS_TEMP = getReplaceALL(CONTENTS_TEMP, REPLACE_ARR[1][k], PERIOD);
									 }	
								}
					 			
					 			HashMap map = new HashMap();
					 		    map.put("V_TR_ID"      ,SUB_ACCEPT_GBN);
				                map.put("V_TR_MSGTYPE" ,"1");
				                map.put("V_TR_MESSAGE" ,CONTENTS_TEMP);
				                map.put("V_TR_CALLBACK",TR_CALLBACK);
				                map.put("V_TR_ETC1"    ,TEMPLE_CD);
				                map.put("V_TR_ETC2"    ,MASTER_PROPOSAL_BUD_NO);
				                map.put("V_TR_ETC3"    ,"SMSREC");
				                map.put("V_TR_ETC4"    ,SUB_ACCEPT_GBN_SMS);
				                map.put("V_TR_ETC5"    ,MASTER_CRT_USER);
				                map.put("V_TR_ETC6"    ,"");
				                map.put("V_TR_DESTINFO",TR_PHONE);
				                map.put("V_TR_SENDDATE",DateTimeUtil.nextDay(PLUS_EVENT_DATE,(-1)*Integer.parseInt(ALARM_DAY),"yyyyMMdd","yyyyMMdd"));
				                map.put("V_TR_SENDTIME",ALARM_TIME);
				                saveSmsMessage(sqlSession, map);
						}// for i
							
							break;
						default: 
					 		System.out.println("해당 'SMSREC' 가  없습니다.");
					 		break;
						
					}// switch
					
				}// SMS_TRAN_FLAG if
				
			}
			return rValue;
		}catch(Exception e){
			throw e;
		}
	}//smsSend
	
	public static void saveSmsMessage( SqlSession sqlSession
									  ,Map<String, Object> map) throws Exception{
		
		try{
			
			boolean flag = true;
			
			 if("1".equals(map.get("V_TR_MSGTYPE").toString())) {
		        
				if(Integer.parseInt(map.get("V_TR_SENDDATE").toString()) < Integer.parseInt(DateTimeUtil.getDate("yyyyMMdd"))) {
		          System.out.println("예약일은 오늘보다 작을수 없습니다. "+map.get("V_TR_SENDDATE").toString());
		          flag = false;
		        }
		        else if(Integer.parseInt(map.get("V_TR_SENDDATE").toString()) == Integer.parseInt(DateTimeUtil.getDate("yyyyMMdd"))) {
		          if(Integer.parseInt(map.get("V_TR_SENDTIME").toString()) <= Integer.parseInt(DateTimeUtil.getDate("HHmm"))) {
		            System.out.println("예약시간은 현재시간보다 작을수 없습니다. "+map.get("V_TR_SENDTIME").toString());
		            flag = false;
		          }
		        }
		    }// if V_TR_MSGTYPE 
			// System.out.println("map = "+ map);
			 
			if(flag) {
				
				
				map.put("V_TR_CALLBACK",(StringUtil.replaceWord(map.get("V_TR_CALLBACK").toString(), "-", "")));
			    map.put("V_TR_DESTINFO",(StringUtil.replaceWord(map.get("V_TR_DESTINFO").toString(), "-", "")));
			    map.put("USER_ID", "topscom2");
			    
			    if ("LMS".equals(map.get("V_TR_MSG_GB"))) {
			    	sqlSession.insert("REC000w_03DAO.INSERT_LMS_REC", map);
			    }else{
			    	System.out.println("SMS = "+ map);
			    	sqlSession.insert("REC000w_03DAO.INSERT_SMS_REC", map);
			    }
			}
		    
		}catch(Exception e){
			e.printStackTrace();
		    throw e;
		}
		
	}//
	
	
	// 제사 시간 변경시 문자 문구 수정
	public static void uptSmsMsgProc( SqlSession sqlSession
			                         ,Map<String, Object>  info) throws Exception{
		
		String CODE           = StringUtil.ObjToString( info.get("CODE")  ,"");
		String TEMPLE_CD      = StringUtil.ObjToString( info.get("TEMPLE_CD")  ,"");
		String TEMPLE_NM 	  = StringUtil.ObjToStr( sqlSession.selectOne("REC003w_23DAO.GET_TEMPLE_NM", info) );
		String CONTENTS_TEMP  = StringUtil.ObjToStr( sqlSession.selectOne("REC003w_23DAO.GET_CONTENTS_TEMP", info) );
		String ALARM_DAY 	  = StringUtil.ObjToStr( sqlSession.selectOne("REC003w_23DAO.GET_ALARM_DAY", info) );
		String EVENT_DATE     = StringUtil.ObjToString( info.get("EVENT_DATE")  ,"");
		String EVENT_TIME 	  = StringUtil.ObjToString( info.get("EVENT_TIME")  ,"");
		String JESA_GUBUN     = StringUtil.ObjToString( info.get("JESA_GUBUN")  ,"");
		String RESERVED6      = StringUtil.ObjToString( info.get("RESERVED6")  ,"");
		String PRAY_NM        = "";
		String UPT_CONTENTS   = ""; 
		
		String NEW_SEND_DATE =  DateTimeUtil.nextDay(EVENT_DATE,(-1)*Integer.parseInt(ALARM_DAY),"yyyyMMdd","yyyyMMdd");
			   NEW_SEND_DATE = NEW_SEND_DATE.replaceAll("-", "");
			   
		if(NEW_SEND_DATE.length() > 8) {
			NEW_SEND_DATE = NEW_SEND_DATE.substring(0, 8);
		}
		
		if(Integer.parseInt( NEW_SEND_DATE ) < Integer.parseInt(DateTimeUtil.getDate("yyyyMMdd"))) {
		      System.out.println("예약일은 오늘보다 작을수 없습니다. "+NEW_SEND_DATE);
		}else if(Integer.parseInt( NEW_SEND_DATE ) == Integer.parseInt(DateTimeUtil.getDate("yyyyMMdd")) && Integer.parseInt( EVENT_TIME ) <= Integer.parseInt(DateTimeUtil.getDate("HHmm"))  ) {
	        System.out.println("예약시간은 현재시간보다 작을수 없습니다. "+EVENT_TIME);
	    }else{
	    	@SuppressWarnings("unchecked")
			List<Map<String, Object>> list = sqlSession.selectList("REC003w_23DAO.GET_EVENT_ALARM", info);
	    	
	    	for(int k = 0; k< list.size(); k++){
				 Map<String, Object> map02 = list.get(k);
				 
				 String COL_ID   = StringUtil.ObjToString( map02.get("COL_ID") , "");
				 String COL_NAME = StringUtil.ObjToString( map02.get("COL_NAME") , "");
				 
				 if("TEMPLE_NM".equals( COL_ID )){
					 CONTENTS_TEMP = getReplaceALL(CONTENTS_TEMP, COL_NAME, TEMPLE_NM);
				 }
				 else if("PRAY_NM".equals(  COL_ID  ) && "5".equals(CODE) ){ // 49만 기도명 찾는다
					 PRAY_NM =  StringUtil.ObjToStr( sqlSession.selectOne("REC003w_23DAO.GET_49NM", info) );
					 
					 CONTENTS_TEMP = getReplaceALL(CONTENTS_TEMP, COL_NAME, PRAY_NM);
				 }
				 else if("EVENT_DATE".equals( COL_ID  )){
					 CONTENTS_TEMP = getReplaceALL(CONTENTS_TEMP, COL_NAME, EVENT_DATE.substring(0, 4)+"/"+EVENT_DATE.substring(4, 6)+"/"+EVENT_DATE.substring(6));
				 }
				 else if("EVENT_TIME".equals( COL_ID )){
					 CONTENTS_TEMP = getReplaceALL(CONTENTS_TEMP, COL_NAME, EVENT_TIME.substring(0, 2)+":"+EVENT_TIME.substring(2));
				 }	
				 UPT_CONTENTS = CONTENTS_TEMP;
			}// for
	    	
	    	// 발송관리 문구가 70바이트가 안넘기떄문에 단문만
	  		String MSG_ID = StringUtil.ObjToStr( sqlSession.selectOne("REC003w_23DAO.GET_MSG_ID", info) );
	  		
	  		String SmsSendDate = NEW_SEND_DATE+EVENT_TIME+"00";
	  		if(EVENT_TIME == null || "".equals(EVENT_TIME)){
	  			SmsSendDate = NEW_SEND_DATE+"000000";
	  		}
	  		
	  		System.out.println("MSG_ID = "+ MSG_ID);
	  		
	  		
	  		if(MSG_ID != null && !"".equals(MSG_ID) ){
	  			info.put("MSG_ID", MSG_ID);
	  			info.put("UPT_CONTENTS" , UPT_CONTENTS);
	  			info.put("NEW_SEND_DATE", SmsSendDate);
	  			System.out.println(info);
	  			sqlSession.selectOne("REC003w_23DAO.UPT_SMS_MSG", info);
	  		}
	    }
	}
	
	/**
	 * 단체문자 발송(신도관리)
	 * @param  Connection,Map
	 * @return void
	*/
	public static void saveGroupSmsSindo( SqlSession sqlSession
										 ,Map<String, Object>  info) throws Exception{
		try {
			
			String V_TR_MSGTYPE   = StringUtil.ObjToStr(info.get("V_TR_MSGTYPE"), "");
			String V_TR_SENDDATE  = StringUtil.ObjToStr(info.get("V_TR_SENDDATE"), "");
			String V_TR_SENDTIME  = StringUtil.ObjToStr(info.get("V_TR_SENDTIME"), "");
			
			if("1".equals(V_TR_MSGTYPE)) {
				if(Integer.parseInt(V_TR_SENDDATE) < Integer.parseInt(DateTimeUtil.getDate("yyyyMMdd"))) {
					throw new Exception("예약일은 오늘보다 작을수 없습니다.");
				}
				else if( Integer.parseInt(V_TR_SENDDATE) == Integer.parseInt(DateTimeUtil.getDate("yyyyMMdd")) ) {
					if(Integer.parseInt(V_TR_SENDTIME) <= Integer.parseInt(DateTimeUtil.getDate("HHmm"))) {
						throw new Exception("예약시간은 현재시간보다 작을수 없습니다.");
					}
				}
			} // if
			
			
			
			String V_TR_MSG_GB =StringUtil.ObjToStr(info.get("V_TR_MSG_GB"), "");
			
			if ("LMS".equals(V_TR_MSG_GB)) {
				sqlSession.selectOne("SIN011W_01DAO.LMS", info);
			}else {
				sqlSession.selectOne("SIN011W_01DAO.SMS", info);
			}
			
		}catch (Exception e) {
			throw e;
		}
	}
	
	
	/**
	 * 가족 번호 변경기 변경 가족번호에 해한 히스토리 저장(한번 변경된 경우 시스템상에서 알 수 있는 방법이 없어서 추가)
	 * @param  Connection conn, Map map
	 * @return void
	 * @exception Exception
	 */
	public static void insertBudCodeChangeHis( SqlSession sqlSession
            								  ,CommonMap param ) throws Exception{
		
		sqlSession.insert("SIN001p_08DAO.insertBudCodeChangeHis", param);
		
	}
	
	/**
	 * 접수 신청 신도 변경
	 * @param  Connection,Map
	 * @return void
	 */
	public static void updateRecMasterProposal( SqlSession sqlSession
			  								   ,CommonMap param ) throws Exception{

		sqlSession.update("SIN001p_08DAO.updateRecMasterProposal1", param);
		sqlSession.update("SIN001p_08DAO.updateRecMasterProposal2", param);
	
	}
	
	public static List selectImage( SqlSession sqlSession
			   						,Map<String, Object>  info ) throws Exception{
		return sqlSession.selectList("SIN001p_08DAO.selectImage", info);
	}
	
}

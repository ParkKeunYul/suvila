package kr.co.o2i.dao.cms;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.InetAddress;
import java.util.HashMap;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.web.multipart.MultipartFile;

import com.jcraft.jsch.Channel;
import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.Session;
import com.jcraft.jsch.UserInfo;

import kr.co.o2i.ftp.MyUserInfo;
import kr.co.o2i.util.CommonMap;
import kr.co.o2i.util.CommonUtil;
import kr.co.o2i.util.FileUpload;
import kr.co.o2i.util.StringUtil;

public class CMS001W_01PRO {

	
	public void insertTestPro(SqlSession sqlSession, String NAMEPSACE , CommonMap param)throws Exception{
		System.out.println("insertTestPro");
		sqlSession.insert(NAMEPSACE+"TEST_CMS_INSERT", param);
		sqlSession.insert(NAMEPSACE+"TEST_CMS_INSERTBB",param);
			
	}
	
	/**
	 * 신도정보 (주민등록번호, 핸드폰번호 UPDATE)
	 * @param map
	 * @param vo
	 * @throws Exception
	 */
	public void updateSindoInfo(SqlSession sqlSession,String NAMEPSACE ,Map<String, Object> info ){
		
		
		String MOBILE_TELNO1 = StringUtil.ObjToStr(info.get("MOBILE_TELNO1"),"");
		String MOBILE_TELNO2 = StringUtil.ObjToStr(info.get("MOBILE_TELNO2"),"");
		String MOBILE_TELNO3 = StringUtil.ObjToStr(info.get("MOBILE_TELNO3"),"");
		
		if(!"".equals(MOBILE_TELNO1+MOBILE_TELNO2+MOBILE_TELNO3)) {
			System.out.println(info.get("BUD_NO"));
			sqlSession.update(NAMEPSACE+"UPDATE_SIN_CARD_MASTER_MOBILE", info);
		}
		
		String REG_GBN = StringUtil.ObjToStr( info.get("REG_GBN")  );
		
		if("1".equals( REG_GBN )){
			sqlSession.update(NAMEPSACE+"UPDATE_SIN_CARD_MASTER_JUMIN_NO", info);
		}
	}
	
	public void updateSindoCMSInfo(SqlSession sqlSession,String NAMEPSACE ,Map<String, Object> info) throws Exception{
		// 신도 CMS정보 INSERT
		sqlSession.update(NAMEPSACE+"UPDATE_SIN_CMS_INFO", info);
		
		//신도 CMS정보를 처리하기 위한 전문 입력
		insertSindoCMSInfoHis(sqlSession, NAMEPSACE, info);
	}
	
	public void insertSindoCMSInfoHis(SqlSession sqlSession
			                         ,String NAMEPSACE 
			                         ,Map<String, Object> info)throws Exception{
		
		System.out.println("insertSindoCMSInfoHis = "+ info);
		
		int dupleCnt = (Integer)sqlSession.selectOne(NAMEPSACE+"getExistSinCmsMemberHis",info );
		
		System.out.println("dupleCnt = "+dupleCnt);
		if( dupleCnt > 0){
			// 해당 전문이 존재하는 경우
			sqlSession.update(NAMEPSACE+"UPDATE_SIN_CMS_MEMBER_HIS", info);
		}else{
			// 전문을 새로 입력 해야 하는경우
			System.out.println("INSERT_SIN_CMS_MEMBER_HIS = "+ info);
			sqlSession.insert(NAMEPSACE+"INSERT_SIN_CMS_MEMBER_HIS", info);
		}
		
		try{
			String ORG_IF_PAYMENT_BANK_CD = StringUtil.ObjToStr(info.get("ORG_IF_PAYMENT_BANK_CD"));
			
			if(ORG_IF_PAYMENT_BANK_CD != null && !"".equals(ORG_IF_PAYMENT_BANK_CD)){
				sqlSession.update(NAMEPSACE+"UPDATE_REC_MASTER_ACCOUNT_INFO", info);
			}
		}catch (Exception e) {}
		 
		
		
	}
	
	
	
	public void updateBasicCmsInfo( SqlSession sqlSession
						           ,String NAMEPSACE
						           ,Map<String, Object> info)throws Exception{
		
		String ORG_CMS_PAYMENT_DAY = StringUtil.ObjToStr(info.get("ORG_CMS_PAYMENT_DAY"));
		String CMS_PAYMENT_DAY     = StringUtil.ObjToStr(info.get("CMS_PAYMENT_DAY")); 
		
		// 신도 결제일을 변경한 경우
		
		if(!ORG_CMS_PAYMENT_DAY.equals(CMS_PAYMENT_DAY)){
			System.out.println("결제일 변경");
			sqlSession.update(NAMEPSACE+"UPDATE_SIN_CMS_INFO_PAYMENT_DAY", info);
		}
		
		// 신도 CMS 계좌 상태가 변경된 경우
		String ORG_CMS_ACCOUNT_STATUS = StringUtil.ObjToStr(info.get("ORG_CMS_ACCOUNT_STATUS"));
		String CMS_ACCOUNT_STATUS     = StringUtil.ObjToStr(info.get("CMS_ACCOUNT_STATUS")); 
		
		if(!ORG_CMS_ACCOUNT_STATUS.equals(CMS_ACCOUNT_STATUS)){
			System.out.println("상태변경");
			sqlSession.update(NAMEPSACE+"UPDATE_SIN_CMS_INFO", info);
			insertSindoCMSInfoHis(sqlSession, NAMEPSACE, info);
		}
		
		sqlSession.update(NAMEPSACE+"UPDATE_SIN_CMS_INFO_REMARK", info);
		
	}
	
	
	public void updateSindoCMSInfoFail( SqlSession sqlSession
							           ,String NAMEPSACE
							           ,Map<String, Object> info
							           ,MultipartFile FILE_NAME)throws Exception{
		
		String ORG_IF_PAYMENT_BANK_CD = StringUtil.ObjToStr(info.get("ORG_IF_PAYMENT_BANK_CD"));
		String ORG_IF_PAYMENT_ACCOUNT = StringUtil.ObjToStr(info.get("ORG_IF_PAYMENT_ACCOUNT"));
		
		String IF_PAYMENT_BANK_CD = StringUtil.ObjToStr(info.get("IF_PAYMENT_BANK_CD"));
		String IF_PAYMENT_ACCOUNT = StringUtil.ObjToStr(info.get("IF_PAYMENT_ACCOUNT"));
		
		
		
		System.out.println("FILE_NAME = "+ FILE_NAME);
		
		
		String NEW_FILE_NAME =  StringUtil.ObjToStr( FILE_NAME.getOriginalFilename() , "");
		try{
			NEW_FILE_NAME =  FILE_NAME.getOriginalFilename();
		}catch (Exception e) {
			NEW_FILE_NAME = "";
		}
		
		System.out.println("NEW_FILE_NAME = "+ NEW_FILE_NAME);
		
		if( !ORG_IF_PAYMENT_ACCOUNT.equals(IF_PAYMENT_ACCOUNT)  ||  !ORG_IF_PAYMENT_BANK_CD.equals(IF_PAYMENT_BANK_CD) ){
			
			System.out.println("into file proc");
			
			int accountSeq = (Integer)sqlSession.selectOne(NAMEPSACE+"getSinCmsInfoAccountSeq",info );
			
			info.put("ACCOUNT_SEQ", accountSeq);
			// 멤버 아이디 중복되어있는지 체크
			
			String IF_MEMBER_ID = IF_PAYMENT_BANK_CD + IF_PAYMENT_ACCOUNT+"0"+accountSeq;
			if(accountSeq >= 10){
				IF_MEMBER_ID = IF_PAYMENT_BANK_CD + IF_PAYMENT_ACCOUNT+accountSeq;
			}
			
			Map<String, Object> paramInfo = new HashMap<String , Object>();
			paramInfo.put("IF_MEMBER_ID", IF_MEMBER_ID);
			paramInfo.put("V_TEMPLE_CD" , info.get("V_TEMPLE_CD") );
			
			int dupleCnt = (Integer)sqlSession.selectOne(NAMEPSACE+"getDupleMemberId",paramInfo );
			if(dupleCnt > 0){ //ACCOUNT_SEQ를 다시 정의해주자
				IF_MEMBER_ID = IF_PAYMENT_BANK_CD + IF_PAYMENT_ACCOUNT;
				paramInfo.put("IF_MEMBER_ID", IF_MEMBER_ID);
				
				int newAccountSeq = (Integer)sqlSession.selectOne(NAMEPSACE+"getNewAccountSeq",paramInfo );
				
				info.put("ACCOUNT_SEQ", newAccountSeq);
				accountSeq = newAccountSeq;
			}// if
			
			
			info.put("IF_MEMBER_ID", IF_PAYMENT_BANK_CD + IF_PAYMENT_ACCOUNT + accountSeq );
			if(accountSeq < 10){
				info.put("IF_MEMBER_ID", IF_PAYMENT_BANK_CD + IF_PAYMENT_ACCOUNT+"0"+ accountSeq );
			}
			
			insertSindoCMSInfoHis(sqlSession, NAMEPSACE, info);
			// 신도 CMS정보 UPDATE
			sqlSession.update(NAMEPSACE+ "UPDATE_SIN_CMS_INFO_FAIL", info);
			
			// 파일 처리
			FileProc(sqlSession, NAMEPSACE, info, FILE_NAME);
				
			
		} // !ORG_IF_PAYMENT_ACCOUNT.equals(IF_PAYMENT_ACCOUNT)
		else if(!"".equals(NEW_FILE_NAME)){  // 은행 계좌번호 바뀌지 않고 파일만 변경했을경우
			
			insertSindoCMSInfoHis(sqlSession, NAMEPSACE, info);
			
			sqlSession.update(NAMEPSACE+ "UPDATE_SIN_CMS_INFO_FAIL", info);
			
			// 파일 처리
			FileProc(sqlSession, NAMEPSACE, info, FILE_NAME);
		}
		
		
	}//updateBasicCmsInfo
	
	public void insertSindoCMSInfo(SqlSession sqlSession 
			                      ,String NAMEPSACE
			                      ,Map<String, Object> info
			                      ,MultipartFile FILE_NAME)throws Exception{
		
		// 신도정보 (주민등록번호, 핸드폰번호 UPDATE)
		updateSindoInfo(sqlSession, NAMEPSACE, info);
		
		String IF_PAYMENT_BANK_CD = StringUtil.ObjToStr(info.get("IF_PAYMENT_BANK_CD"));
		String IF_PAYMENT_ACCOUNT = StringUtil.ObjToStr(info.get("IF_PAYMENT_ACCOUNT"));
		
		int accountSeq = (Integer)sqlSession.selectOne(NAMEPSACE+"getSinCmsInfoAccountSeq",info );
		
		String IF_MEMBER_ID = IF_PAYMENT_BANK_CD + IF_PAYMENT_ACCOUNT+"0"+accountSeq;
		if(accountSeq >= 10){
			IF_MEMBER_ID = IF_PAYMENT_BANK_CD + IF_PAYMENT_ACCOUNT+accountSeq;
		}
		
		
		Map<String, Object> paramInfo = new HashMap<String , Object>();
		paramInfo.put("IF_MEMBER_ID", IF_MEMBER_ID);
		paramInfo.put("V_TEMPLE_CD" , info.get("V_TEMPLE_CD") );
		
		int dupleCnt = (Integer)sqlSession.selectOne(NAMEPSACE+"getDupleMemberId",paramInfo );
		if(dupleCnt > 0){ //ACCOUNT_SEQ를 다시 정의해주자
			IF_MEMBER_ID = IF_PAYMENT_BANK_CD + IF_PAYMENT_ACCOUNT;
			paramInfo.put("IF_MEMBER_ID", IF_MEMBER_ID);
			
			int newAccountSeq = (Integer)sqlSession.selectOne(NAMEPSACE+"getNewAccountSeq",paramInfo );
			
			info.put("ACCOUNT_SEQ", newAccountSeq);
			accountSeq = newAccountSeq;
		}// if
		
		info.put("IF_MEMBER_ID", IF_PAYMENT_BANK_CD + IF_PAYMENT_ACCOUNT + accountSeq );
		if(accountSeq < 10){
			info.put("IF_MEMBER_ID", IF_PAYMENT_BANK_CD + IF_PAYMENT_ACCOUNT+"0"+ accountSeq );
		}
		
		info.put("ACCOUNT_SEQ", accountSeq);
		
		System.out.println("");
		System.out.println("INSERT_SIN_CMS_INFO");
		System.out.println("info = "+info );
		System.out.println("");
		
		sqlSession.insert(NAMEPSACE+"INSERT_SIN_CMS_INFO" , info);
		//신도 CMS정보를 처리하기 위한 전문 입력
		insertSindoCMSInfoHis(sqlSession, NAMEPSACE, info);
		
		// 파일처리
		FileProc(sqlSession, NAMEPSACE, info, FILE_NAME);
	}
	
	
	
	public void FileProc( SqlSession sqlSession 
			             ,String NAMEPSACE
			             ,Map<String, Object> info
			             ,MultipartFile FILE_NAME)throws Exception{
		String Host_IP        = InetAddress.getLocalHost().getHostAddress();
		/*
		String DATA_CMS_PATH  = "c:/cms/CMS_DATA/SEND/"; 			
		String DATA_PATH 	  = "c:/cms/CMS_DATA/";
		*/
		
		String DATA_CMS_PATH  = "/source/cms_payinfo/data/send"; // 실서버 CMS 파일 발송  디렉토리
		String DATA_PATH      = "/source/suvila/suvila/upload/";  // 실서버  CMS원본 파일 저장 디렉토리
		
		
		Map<String, Object> fileInfo = FileUpload.getFileInfo( FILE_NAME);
		
		String file_name  = StringUtil.ObjToStr(fileInfo.get("FILE_NAME")) ;
		
		if(!"".equals(file_name)){
		
			String sExt 	  = file_name.substring( file_name.indexOf(".")+1 , file_name.length() ); // .jpg
			       sExt       = sExt.toLowerCase();
			       
			       
			System.out.println("FileProc info = "+ info);
			String NEW_CMS_TRADE_CD = (String)sqlSession.selectOne(NAMEPSACE+"SELECT_NEW_CMS_TRADE_CD",info );     
			
			if("".equals(NEW_CMS_TRADE_CD) || NEW_CMS_TRADE_CD == null){
				throw new Exception();
			}
			info.put("NEW_CMS_TRADE_CD", NEW_CMS_TRADE_CD);
			
			String sFileType     = "";
			if("jpg".equals(sExt) || "jpeg".equals(sExt) || "gif".equals(sExt) || "tif".equals(sExt)){
	 			sFileType = "1";
	 		}else if("mp3".equals(sExt) || "wav".equals(sExt) ){
	 			sFileType = "4";
	 		}else{  // 없으면 에러 발생 
	 			throw new Exception();
	 		}
			
			String IF_PAYMENT_BANK_CD = StringUtil.ObjToStr(info.get("IF_PAYMENT_BANK_CD"));
			String IF_PAYMENT_ACCOUNT = StringUtil.ObjToStr(info.get("IF_PAYMENT_ACCOUNT"));
			int  ACCOUNT_SEQ          = StringUtil.ObjToInt(info.get("ACCOUNT_SEQ"));
			
			
			String sDataFile = NEW_CMS_TRADE_CD + "."+IF_PAYMENT_BANK_CD+IF_PAYMENT_ACCOUNT+"0"+ACCOUNT_SEQ+"."+sFileType+"."+sExt;
			if(ACCOUNT_SEQ > 9){
				sDataFile = NEW_CMS_TRADE_CD + "."+IF_PAYMENT_BANK_CD+IF_PAYMENT_ACCOUNT+ACCOUNT_SEQ+"."+sFileType+"."+sExt;
			}
			
			InputStream is       = new BufferedInputStream(FILE_NAME.getInputStream());
			FileOutputStream fos = new FileOutputStream(DATA_PATH+sDataFile); //양식에 맞는 파일명으로 서버에 저장한다
			int i = 0;
		    while((i = is.read()) != -1){
		    	fos.write(i);
		    }
		    fos.close();
		    is.close();
		    
		    //Host_IP = "121.254.224.174";
		    /*
		    if(!"203.245.2.231".equals(Host_IP)){
		    	System.out.println("===============");
		    	System.out.println("203.245.2.231 아니다   현재 접속IP = "+ Host_IP);
		    	System.out.println("DATA_PATH = "+DATA_PATH);
		    	System.out.println("===============");
				FtpFileSend(DATA_PATH, DATA_CMS_PATH, sDataFile);  //FTP 발송
			}else{
				*/
				InputStream is174   	= new FileInputStream(DATA_PATH+sDataFile);
				FileOutputStream fos174 = new FileOutputStream(DATA_CMS_PATH+"/"+sDataFile);
	
				int k = 0;
				while((k = is174.read()) != -1){
				  	fos174.write(k);
			    }
		     
		      	is174.close();
		  		fos174.close();
		   // }
		  		
		  	CommonUtil.delFile(DATA_PATH, sDataFile);
		    
		    // 파일정보 저장
		    Map<String, Object> fileParam = new HashMap<>();
		    fileParam.put("BANK_CD"            , info.get("IF_PAYMENT_BANK_CD"));
		    fileParam.put("V_ACCOUNT"          , info.get("IF_PAYMENT_ACCOUNT"));
		    fileParam.put("ACCOUNT_SEQ"        , info.get("ACCOUNT_SEQ"));
		    fileParam.put("V_TEMPLE_CD"        , info.get("V_TEMPLE_CD"));
		    fileParam.put("CMS_TRADE_CD"       , info.get("CMS_TRADE_CD"));
		    fileParam.put("BUD_NO"             , info.get("BUD_NO"));
		    fileParam.put("FILE_NAME"          , fileInfo.get("FILE_NAME"));
		    fileParam.put("FILE_SIZE"          , fileInfo.get("FILE_SIZE"));
		    fileParam.put("V_USER_ID"          , info.get("V_USER_ID"));
		    fileParam.put("V_REMOTE"           , info.get("V_REMOTE"));
		    fileParam.put("CMS_DATA_FILE_NAME" , sDataFile);
		    fileParam.put("V_HOST_IP"          , Host_IP);
		    fileParam.put("V_NEW_CMS_TRADE_CD" , NEW_CMS_TRADE_CD);
		    
		    
		    sqlSession.insert(NAMEPSACE+"DELETE_CMS_FILE_INFO", fileParam);
		    sqlSession.insert(NAMEPSACE+"INSERT_CMS_FILE_INFO", fileParam);
		}
	    
	}
	
	
	public void FtpFileSend(String DATA_PATH ,String DATA_CMS_PATH , String sDataFile)throws Exception{
		
		System.out.println("FtpFileSend start");
		
		JSch jsch=new JSch();
		Session ftpsession=jsch.getSession(MyUserInfo.user, MyUserInfo.host, MyUserInfo.port);
		
		UserInfo ui=new MyUserInfo();
		ftpsession.setUserInfo(ui);
		ftpsession.connect();
		
		Channel channel=ftpsession.openChannel("sftp");
	    channel.connect();
	    ChannelSftp c=(ChannelSftp)channel;
	  
	    File f 									 = null;
	    FileInputStream sendFile = null;
	   	try{
	   		
	   		f 	  	 = new File(DATA_PATH+sDataFile);
	   		sendFile = new FileInputStream(f);
	   		
	   		c.cd(DATA_CMS_PATH);
	   		c.put(sendFile ,sDataFile);
	    	
	   		System.out.println("FTP 파일 전송 선공 ");
	   		
	   		if(sendFile != null){
	   			sendFile.close();
	   		}
	   		if(c!= null){
	   			c.quit();
	   		}
	   	}finally{
	   		ftpsession.disconnect();	
	   	} // try
	}
	
	
}

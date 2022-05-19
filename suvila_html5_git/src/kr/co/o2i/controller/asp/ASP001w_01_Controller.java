package kr.co.o2i.controller.asp;

import java.io.InputStream;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import kr.co.o2i.common.Const;
import kr.co.o2i.controller.com.DefaultController;
import kr.co.o2i.dao.asp.ASP001w_01DAO;
import kr.co.o2i.util.FileUpload;
import kr.co.o2i.util.StringUtil;
import oracle.sql.BLOB;



@Controller
@RequestMapping ("/asp/asp001w_01/*")
public class ASP001w_01_Controller extends DefaultController {

	@Autowired
	ASP001w_01DAO ASP001w_01dao;
	
//  사찰조회
	@RequestMapping(value="Select.suvila")
	public @ResponseBody Map<String,Object> Select(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			String PARAM_TEMPLE_NM = URLDecoder.decode(param.getString("PARAM_TEMPLE_NM"), "UTF-8");
			
			param.put("PARAM_TEMPLE_NM", PARAM_TEMPLE_NM);
			
			
			storeInfo.put("list", ASP001w_01dao.SELECT_ASP_TEMPLE_MASTER(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	// 사찰 정보 저장
	@RequestMapping(value="Save.suvila")
	public @ResponseBody Map<String,Object> Save(Map<String, Object> map,
											     HttpServletRequest request, 
											     HttpServletResponse response,
											     @RequestParam("FILE_NAME") MultipartFile FILE_NAME){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			
			
			String V_SIN_SMS_ALLYN = param.getString("SIN_SMS_YN", "N")+""+param.getString("SIN_BIRTH_YN", "N")+""+param.getString("SIN_GROUP_YN", "N");
			String V_REP_JUMINNO   = param.getString("REP_JUMINNO").replaceAll("-", "");
			String V_REG_NUMBER    = param.getString("REG_NUMBER").replaceAll("-", "");
			int V_FILE_CNT         = param.getInt("FILE_CNT", 0);
			
			
			storeInfo.put("FILE_CNT", V_FILE_CNT);
			
			param.put("SIN_SMS_YN", V_SIN_SMS_ALLYN);
			param.put("REP_JUMINNO", V_REP_JUMINNO);
			param.put("REG_NUMBER", V_REG_NUMBER);
			param.put("UPT_USER", adminSession.get("USER_ID"));
			param.put("CRT_USER", adminSession.get("USER_ID"));
			
			
			
			String sqlMsg = ""; 
			String sqlMode = param.getString("SQL_MODE");
			boolean saveFlag = false;
			
			param = FileUpload.getFileInfo(param, FILE_NAME);
			boolean uFileDuple = StringUtil.fileIsExit(FILE_NAME);
			
			if("INSERT".equals(sqlMode)){
				int  dupleCnt  = ASP001w_01dao.IsExit_TempleId(param);
				
				if(dupleCnt == 0){
					param.put("ADMIN_ID_TEMP", param.getString("ADMIN_ID"));
					saveFlag =  ASP001w_01dao.INSERT_ASP_TEMPLE_MASTER(param, uFileDuple);
					
					if(!saveFlag) sqlMsg = Const.ERR_MSG;
					
					
				}else{
					saveFlag = false;
					sqlMsg   = param.getString("ADMIN_ID")+ "ID는 이미  사용중입니다.<br>사용하실 ID를 다시 입력하세요.";
				}
			}
			else if("UPDATE".equals(sqlMode)) {  // 수정
				
				saveFlag = ASP001w_01dao.UPDATE_ASP_TEMPLE_MASTER(param , uFileDuple);
				
			}
			
			
			if(saveFlag){
				if(uFileDuple) storeInfo.put("FILE_CNT", 1);
				rtnData = StringUtil.rtnSuc(rtnData,  storeInfo);
			}else{
				rtnData = StringUtil.rtnError(rtnData , sqlMsg);
			}
			
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	/**
	 * 도장이미지 체크
	 * @param map
	 * @return
	 */
	@RequestMapping(value="selectImage.suvila")
	public @ResponseBody Map<String,Object> selectImage( Map<String, Object> map
														,HttpServletRequest request 
														,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			int dbImgCnt =  ASP001w_01dao.ASP_TEMPLE_FILE_CNT(param);
			if(dbImgCnt == 1){
				rtnData = StringUtil.rtnSucMsg(rtnData, "파일존재 IFRAM GOGO");
			}else{
				rtnData = StringUtil.rtnError(rtnData,  "파일이 존재하지 않습니다.");
			}
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	@RequestMapping(value="delectImage.suvila")
	public @ResponseBody Map<String,Object> delectImage( Map<String, Object> map
														,HttpServletRequest request 
														,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			param.put("UPT_USER", adminSession.get("USER_ID"));
			
			boolean dbFlag = ASP001w_01dao.DELETE_ASP_TEMPLE_FILE(param);
			
			if(dbFlag){
				rtnData = StringUtil.rtnSucMsg(rtnData, "삭제되었습니다.");
			}else{
				rtnData = StringUtil.rtnError(rtnData, "다시 시도하세요.");
			}
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
			
	/*
	 * 도장이미지 다운로드
	 */
	@RequestMapping(value="selectImageDown.suvila")
	public void selectImageDown( Map<String, Object> map
								,HttpServletRequest request 
								,HttpServletResponse response){
		try{
			System.out.println(param);
			
			Map<String, Object> fileInfo = ASP001w_01dao.SELECT_ASP_TEMPLE_MASTER_FILE(param);
			System.out.println(fileInfo);
			
			
			response.reset();
			response.setContentType("application/form-data");
			response.setHeader("Content-Transfer-Encoding", "UTF-8");
			response.setCharacterEncoding("UTF-8");
			response.setBufferSize(1024*1024*5);
			
			Map blobmap = (Map)fileInfo;
			
			String filename = blobmap.get("FILE_NAME").toString().trim();
			filename 		= filename.replace(' ', '_');
			filename 		= java.net.URLEncoder.encode(filename, "UTF-8"); 
			response.addHeader("Content-Disposition", "attachment;filename="+filename+ ";" );
			
			BLOB blob = (BLOB)blobmap.get("ATTACH_FILE");
			InputStream is 	= blob.getBinaryStream();
			
			
			int filesize 	= Integer.parseInt( blobmap.get("FILE_SIZE")+"" ) ;
			
			byte[] filebyte = new byte[filesize];
			is.read(filebyte);
			ServletOutputStream os = response.getOutputStream();
			os.write(filebyte);
			
			os.flush();
			os.close();
			is.close();
			response.flushBuffer();
		}catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	
	@RequestMapping(value="Approvalselect.suvila")
	public @ResponseBody Map<String,Object> Approvalselect(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			System.out.println(param);
			
			List<Map<String, Object>> list = ASP001w_01dao.SELECT_ASP_TEMPLE_APPROVAL_MGT(param);
			storeInfo.put("list", list);
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}// Approvalselect
	
	@RequestMapping(value="ApprovalSave.suvila")
	public @ResponseBody Map<String,Object> ApprovalSave(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			
			String appNewData = StringUtil.getJosnParam(param.getString("appNewData"));
			String appUptData = StringUtil.getJosnParam(param.getString("appUptData"));
			
			
			List<Map<String, Object>> addList = StringUtil.jsonToArray(appNewData);
			List<Map<String, Object>> uptList = StringUtil.jsonToArray(appUptData);
		    
			boolean dbFlag = ASP001w_01dao.APPROVAL_SAVE(addList, uptList);
			
			if(dbFlag){
				rtnData = StringUtil.rtnSuc(map, storeInfo);
			}else{
				rtnData = StringUtil.rtnError(rtnData);
			}
			
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}// ApprovalSave
	
	@RequestMapping(value="ApprovalDelete.suvila")
	public @ResponseBody Map<String,Object> ApprovalDelete(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			String V_APPROVAL_TITLE =  URLDecoder.decode(param.getString("V_APPROVAL_TITLE"), "UTF-8");
			param.put("V_APPROVAL_TITLE", V_APPROVAL_TITLE);
			
			
			System.out.println(param);
			
			boolean dbFlag =  ASP001w_01dao.APPROVAL_DELETE(param);
			if(dbFlag){
				rtnData = StringUtil.rtnSuc(map, storeInfo);
			}else{
				rtnData = StringUtil.rtnError(rtnData);
			}
			
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
}


package kr.co.o2i.controller.rec;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.InetAddress;
import java.net.URLDecoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.oreilly.servlet.MultipartRequest;
import com.oreilly.servlet.multipart.DefaultFileRenamePolicy;

import kr.co.o2i.controller.com.DefaultController;
import kr.co.o2i.dao.rec.REC030W_01DAO;
import kr.co.o2i.util.FileUpload;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/rec/REC030W_01/*")
class REC030W_01_Controller extends DefaultController {

	
	@Autowired
	REC030W_01DAO REC030W_01dao;
	
	//public String DATA_FILE_PATH  = "/source/suvila/suvila/upload";
	public String DATA_FILE_PATH  = "C:/workspace_extjs/suvila_html5/WebContent/suvila/upload";
	
	
	@RequestMapping(value="saveSindoCardNew.suvila")
	public @ResponseBody Map<String,Object> saveSindoCardNew( Map<String, Object> map
												     		 ,HttpServletRequest request
												     		 ,HttpServletResponse response
												     		 ,@RequestParam("file") MultipartFile file){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			param.put("V_USER_ID"   , adminSession.get("USER_ID"));
			
			String Host_IP = InetAddress.getLocalHost().getHostAddress();			
			
			Date today = new Date();
			SimpleDateFormat folder_fmt = new SimpleDateFormat("yyyyMMdd");
			
			String newData              = StringUtil.getJosnParam(param.getString("newData",""));
			Map<String, Object> addMap  = StringUtil.jsonToMap(newData);
			addMap.put("V_HOST_IP", Host_IP);
			
			
			Map<String, Object> fileInfo = FileUpload.getFileInfo( file);
			
			if(fileInfo != null) {
				String sExt            		 = StringUtil.ObjToStr(fileInfo.get("sExt")) ;
				
				String folder_name          = folder_fmt.format(today);
				String folder_path          = DATA_FILE_PATH+"/"+ folder_name;
				
				
				File folder_check = new File(folder_path);
				if(!folder_check.exists()){
					folder_check.mkdir();
				}
				
				File folder_check2 = new File(folder_path+"/"+param.get("V_TEMPLE_CD"));
				if(!folder_check2.exists()){
					folder_check2.mkdir();
				}
				
				SimpleDateFormat formater = new SimpleDateFormat("yyyyMMddHHmmss");
				String reName = param.get("V_TEMPLE_CD")+"_"+addMap.get("BUD_NO")+"_"+formater.format(today)+System.currentTimeMillis()+"_0."+sExt;
				
				InputStream is       = new BufferedInputStream(file.getInputStream());
				FileOutputStream fos = new FileOutputStream(folder_path+"/"+param.get("V_TEMPLE_CD")+"/"+reName); //양식에 맞는 파일명으로 서버에 저장한다
				BufferedOutputStream  bos = new BufferedOutputStream(fos);

				
				try {
					int i = 0;
				    while((i = is.read()) != -1){
				    	bos.write(i);
				    }
				}catch (Exception e) {
					e.printStackTrace();
				}finally {
					fos.close();
				    is.close();
				    try {if(bos != null) bos.close();}catch (Exception e) {}
				}
				
				
			    addMap.put("V_RENAME", reName);
				addMap.put("V_FODER" , folder_name);
				addMap.put("V_FILE_YN" , "T");
			    
				
			}else {
				addMap.put("V_RENAME", "");
				addMap.put("V_FODER" , "");
				addMap.put("V_FILE_YN" , "F");
			}
			
			
			boolean dbFlag = REC030W_01dao.saveSindoCard(param, addMap);
			if(dbFlag){
				rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			}else{
				rtnData = StringUtil.rtnError(rtnData);
			}
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//selectIDList
	
	@RequestMapping(value="cancelSinCard.suvila")
	public @ResponseBody Map<String,Object> cancelSinCard( Map<String, Object> map
												     	  ,HttpServletRequest request
												     	  ,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try {
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			param.put("V_USER_ID"   , adminSession.get("USER_ID"));
			
			
			String uptData              	   = StringUtil.getJosnParam(param.getString("uptData",""));
			List<Map<String, Object>> uptList  = StringUtil.jsonToArray(uptData);
			
			boolean dbFlag = REC030W_01dao.cancelSinCard(param, uptList);
			if(dbFlag){
				rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			}else{
				rtnData = StringUtil.rtnError(rtnData);
			}
			
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	
	@RequestMapping(value="deleteSinCard.suvila")
	public @ResponseBody Map<String,Object> deleteSinCard( Map<String, Object> map
												     	  ,HttpServletRequest request
												     	  ,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try {
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			param.put("V_USER_ID"   , adminSession.get("USER_ID"));
			
			
			String uptData              	   = StringUtil.getJosnParam(param.getString("uptData",""));
			List<Map<String, Object>> uptList  = StringUtil.jsonToArray(uptData);
			
			
			boolean dbFlag = REC030W_01dao.deleteSinCard(param, uptList);
			if(dbFlag){
				rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			}else{
				rtnData = StringUtil.rtnError(rtnData);
			}
			
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
}//REC030W_01_Controller 

package kr.co.o2i.controller.rec;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.o2i.controller.com.DefaultController;
import kr.co.o2i.dao.rec.REC001W_07DAO;
import kr.co.o2i.dao.rec.REC001W_10DAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/rec/REC001W_07/*")
public class REC001W_07_Controller extends DefaultController {

	
	@Autowired
	REC001W_07DAO REC001W_07dao;
	
	@RequestMapping(value="JungakSave.suvila")
	public @ResponseBody Map<String,Object> Jungak( Map<String, Object> map
			                                         ,HttpServletRequest request
			                                         ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE",    request.getRemoteAddr());
			
			
			String newData = param.getString("newData","");
			String uptData = param.getString("uptData","");
			
			List<Map<String, Object>> addList = StringUtil.jsonToArray(newData);
			List<Map<String, Object>> uptList = StringUtil.jsonToArray(uptData);
			
			
			boolean dbFlag = REC001W_07dao.JungakSave(param, addList, uptList);

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
	}//
	
	@RequestMapping(value="GradeSave.suvila")
	public @ResponseBody Map<String,Object> GradeSave( Map<String, Object> map
			                                         ,HttpServletRequest request
			                                         ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE",    request.getRemoteAddr());
			
			
			String newData = param.getString("newData","");
			String uptData = param.getString("uptData","");
			
			List<Map<String, Object>> addList = StringUtil.jsonToArray(newData);
			List<Map<String, Object>> uptList = StringUtil.jsonToArray(uptData);
			
			
			boolean dbFlag = REC001W_07dao.GradeSave(param, addList, uptList);

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
	}//
	
	@RequestMapping(value="AmountSave.suvila")
	public @ResponseBody Map<String,Object> AmountSave( Map<String, Object> map
			                                           ,HttpServletRequest request
			                                           ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			
			String newData = param.getString("newData","");
			String uptData = param.getString("uptData","");
			
			List<Map<String, Object>> addList = StringUtil.jsonToArray(newData);
			List<Map<String, Object>> uptList = StringUtil.jsonToArray(uptData);
			
			
			
			boolean dbFlag = REC001W_07dao.AmountSave(param, addList, uptList);
			
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
	
	@RequestMapping(value="Deung.suvila")
	public @ResponseBody Map<String,Object> Deung( Map<String, Object> map
			                                      ,HttpServletRequest request
			                                      ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			
			storeInfo.put("list", REC001W_07dao.select_Deung(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//
	
	@RequestMapping(value="SindoInfo.suvila")
	public @ResponseBody Map<String,Object> SindoInfo( Map<String, Object> map
			                                          ,HttpServletRequest request
			                                          ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_CHUMO" 	, adminSession.get("chumo_yn"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			
			storeInfo.put("list", REC001W_07dao.select_SindoInfo(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//
	
	@RequestMapping(value="Deung_proc.suvila")
	public @ResponseBody Map<String,Object> Deung_proc( Map<String, Object> map
			                                           ,HttpServletRequest request
			                                           ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try {
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"   , adminSession.get("USER_ID"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			
			String newData = param.getString("newData","");
			String uptData = param.getString("uptData","");
			
			List<Map<String, Object>> addList = StringUtil.jsonToArray(newData);
			List<Map<String, Object>> uptList = StringUtil.jsonToArray(uptData);
			
			
			//boolean dbFlag = true;
			boolean dbFlag = REC001W_07dao.Deung_proc( param
					                                  ,addList
					                                  ,uptList);
			
			if(dbFlag){
				rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			}else{
				rtnData = StringUtil.rtnError(rtnData);
			}
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return rtnData;
	}// Deung_proc
	
	
	@RequestMapping(value="clear.suvila")
	public @ResponseBody Map<String,Object> clear( Map<String, Object> map
			                                      ,HttpServletRequest request
			                                      ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try {
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"   , adminSession.get("USER_ID"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			
			boolean dbFlag = REC001W_07dao.select_Clear(param);
			//dbFlag = false;
			if(dbFlag){
				rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			}else{
				rtnData = StringUtil.rtnError(rtnData);
			}
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return rtnData;
	}// Deung_proc
	

}

package kr.co.o2i.controller.sin;

import java.net.URLDecoder;
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
import kr.co.o2i.dao.sin.SIN011W_01DAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/sin/SIN011W_01/*")
public class SIN011W_01_Controller extends DefaultController{
	

	@Autowired
	SIN011W_01DAO Sin011W_01Dao;
	
	
	@RequestMapping(value="select.suvila")
	public @ResponseBody Map<String,Object> select( Map<String, Object> map
												   ,HttpServletRequest request
												   ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			
			String V_SEARCH_WORD = URLDecoder.decode(param.getString("V_SEARCH_WORD"), "UTF-8");
			System.out.println("V_SEARCH_WORD =["+V_SEARCH_WORD+"]");
			
			param.put("V_SEARCH_WORD", V_SEARCH_WORD);
			
			
			storeInfo.put("list", Sin011W_01Dao.SELECT_INFO(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	
	@RequestMapping(value="selectSmsDoc.suvila")
	public @ResponseBody Map<String,Object> selectSmsDoc( Map<String, Object> map
														 ,HttpServletRequest request
														 ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			storeInfo.put("list", Sin011W_01Dao.SELECT_SMS_DOC(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	
	@RequestMapping(value="save.suvila")
	public @ResponseBody Map<String,Object> save( Map<String, Object> map
												 ,HttpServletRequest request
												 ,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try {
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			param.put("V_USER_ID"   , adminSession.get("USER_ID"));
			
			String ds_sms  = param.getString("ds_sms","");
			String uptData = param.getString("uptData","");
			
			System.out.println("ds_sms = "+ ds_sms);
			System.out.println("uptData = "+ uptData);
			
			
			List<Map<String, Object>> smsList = StringUtil.jsonToArray(ds_sms);
			List<Map<String, Object>> uptList = StringUtil.jsonToArray(uptData);
			
			boolean dbFlag =  false;
			
			if(smsList.size() == 1) {
				dbFlag = Sin011W_01Dao.save(param ,smsList.get(0), uptList);
			}
			
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
	}// save
	
	@RequestMapping(value="saveSmsDoc.suvila")
	public @ResponseBody Map<String,Object> saveSmsDoc( Map<String, Object> map
												       ,HttpServletRequest request
												       ,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try {
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_TEMPLE_NM" , adminSession.get("TEMPLE_NM"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			param.put("V_USER_ID"   , adminSession.get("USER_ID"));
			
			String newData = param.getString("newData","");
			String uptData = param.getString("uptData","");
			String delData = param.getString("delData","");
			
			List<Map<String, Object>> addList = StringUtil.jsonToArray(newData);
			List<Map<String, Object>> uptList = StringUtil.jsonToArray(uptData);
			List<Map<String, Object>> delList = StringUtil.jsonToArray(delData);
			
			boolean dbFlag = Sin011W_01Dao.saveSmsDoc(param ,addList, uptList , delList);
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
	}// saveSmsDoc
	
	
	@RequestMapping(value="selectBudNo.suvila")
	public @ResponseBody Map<String,Object> selectBudNo( Map<String, Object> map
												   		,HttpServletRequest request
												   		,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			
			String V_SEARCH_WORD = URLDecoder.decode(param.getString("V_SEARCH_WORD"), "UTF-8");
			System.out.println("V_SEARCH_WORD =["+V_SEARCH_WORD+"]");
			
			param.put("V_SEARCH_WORD", V_SEARCH_WORD);
			
			
			storeInfo.put("list", Sin011W_01Dao.SELECT_INFO(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
}

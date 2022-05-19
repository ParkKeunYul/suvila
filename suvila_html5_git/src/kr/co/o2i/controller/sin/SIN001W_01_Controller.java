package kr.co.o2i.controller.sin;

import java.net.URLDecoder;
import java.util.ArrayList;
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
import kr.co.o2i.dao.sin.SIN001W_01DAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/sin/SIN001W_01/*")
public class SIN001W_01_Controller extends DefaultController{
	

	@Autowired
	SIN001W_01DAO SIN001w_01dao;
	
	
	@RequestMapping(value="selectSindo.suvila")
	public @ResponseBody Map<String,Object> selectSindo(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			
			storeInfo.put("list", SIN001w_01dao.SELECT_SIN_CARD_MASTER(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		
		return rtnData;
	}
	
	@RequestMapping(value="ganji.suvila")
	public @ResponseBody Map<String,Object> ganji(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			
			String V_GANJI       = param.getString("V_GANJI");
			String V_LUNAR_SOLAR = param.getString("V_LUNAR_SOLAR");
			String strGanji = null;
			
			if("F".equals(V_LUNAR_SOLAR)){
				strGanji = StringUtil.P2M(V_GANJI);
			}else{
				strGanji = StringUtil.M2P(V_GANJI);
			}
			int ganjiLen = strGanji.length();
			
			List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
			
			Map<String, Object> info   = new HashMap<String, Object>();
			info.put("LEAP_MONTH", strGanji.substring(ganjiLen-5, ganjiLen-4));
			info.put("SEXAGENARY", strGanji.substring(ganjiLen-2, ganjiLen));
			list.add(info);
			
			storeInfo.put("list", list);
			
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		
		return rtnData;
	}
	
	
	@RequestMapping(value="isNameExist.suvila")
	public @ResponseBody Map<String,Object> isNameExist(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			String V_REPRESEN_REL = URLDecoder.decode(param.getString("V_REPRESEN_REL", ""), "UTF-8");
			param.put("V_REPRESEN_REL", V_REPRESEN_REL);
			
			String V_NAME_KOR = URLDecoder.decode(param.getString("V_NAME_KOR", ""), "UTF-8");
			param.put("V_NAME_KOR", V_NAME_KOR);
			
			
			storeInfo.put("list", SIN001w_01dao.SELECT_SIN_CARD_MASTER_NAME_EXIST(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		
		return rtnData;
	}
	
	@RequestMapping(value="SindoSave.suvila")
	public @ResponseBody Map<String,Object> SindoSave( Map<String, Object> map
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
			String delData = param.getString("delData","");
			
			List<Map<String, Object>> addList = StringUtil.jsonToArray(newData);
			List<Map<String, Object>> uptList = StringUtil.jsonToArray(uptData);
			List<Map<String, Object>> delList = StringUtil.jsonToArray(delData);
			
			boolean dbFlag = SIN001w_01dao.SindoSave(param, addList, uptList, delList);
			
			System.out.println("dbFlag = "+ dbFlag);
			
			if(dbFlag){
				rtnData = StringUtil.rtnSuc(rtnData, storeInfo, param.getString("BUD_CODE"));
			}else{
				rtnData = StringUtil.rtnError(rtnData);
			}
		}catch (Exception e) {
			e.printStackTrace();
			rtnData = StringUtil.rtnError(rtnData);
		}
		return rtnData;
	}
	
	@RequestMapping(value="newSindoSave.suvila")
	public @ResponseBody Map<String,Object> newSindoSave( Map<String, Object> map
												 	     ,HttpServletRequest request
												 	     ,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE",    request.getRemoteAddr());
		
			
			param.put("V_GBN_CODE"     , "01");
			param.put("V_BRANCH_CODE"  , "0");
			
			String newData = param.getString("newData","");
			List<Map<String, Object>> addList = StringUtil.jsonToArray(newData);
			
			param.put("V_BUD_CODE", SIN001w_01dao.SELECT_NEXT_BUDCD(param));
			System.out.println("V_BUD_CODE = " + param.getString("V_BUD_CODE"));
			
			
			boolean dbFlag = SIN001w_01dao.newSindoSave(param, addList);
			if(dbFlag){
				rtnData = StringUtil.rtnSuc(rtnData, storeInfo, "01-"+  param.getString("V_BUD_CODE")+"-0");
				//rtnData = StringUtil.rtnError(rtnData);
			}else{
				rtnData = StringUtil.rtnError(rtnData);
			}
		}catch (Exception e) {
			e.printStackTrace();
			rtnData = StringUtil.rtnError(rtnData);
		}
		return rtnData;
	}
	
	
	@RequestMapping(value="isYoungExist.suvila")
	public @ResponseBody Map<String,Object> isYoungExist(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			storeInfo.put("list", SIN001w_01dao.SELECT_SIN_DEATH_INFO(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		
		return rtnData;
	}
	
	
	//SELECT_YOUNGA_COUNT_EXIST
	
	
}

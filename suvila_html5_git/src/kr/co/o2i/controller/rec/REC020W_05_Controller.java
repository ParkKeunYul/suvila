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
import kr.co.o2i.dao.rec.REC020W_05DAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/rec/REC020W_05/*")
class REC020W_05_Controller extends DefaultController {

	
	@Autowired
	REC020W_05DAO REC020W_05dao;
	
	
	@RequestMapping(value="General")
	public @ResponseBody Map<String,Object> General( Map<String, Object> map
													   ,HttpServletRequest request
													   ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			storeInfo.put("list", REC020W_05dao.SELECT_MGT(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//	
	
	@RequestMapping(value="Detail")
	public @ResponseBody Map<String,Object> Detail( Map<String, Object> map
												   ,HttpServletRequest request
												   ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			storeInfo.put("list", REC020W_05dao.SELECT_MGT_DETAIL(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//
	
	@RequestMapping(value="GeneralSave.suvila")
	public @ResponseBody Map<String,Object> GeneralSave( Map<String, Object> map
										           	    ,HttpServletRequest request
										           	    ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			
			
			String newData = param.getString("newData","");
			String uptData = param.getString("uptData","");
			String delData = param.getString("delData","");
			
			List<Map<String, Object>> addList = StringUtil.jsonToArray(newData);
			List<Map<String, Object>> uptList = StringUtil.jsonToArray(uptData);
			List<Map<String, Object>> delList = StringUtil.jsonToArray(delData);
			
			Map<String, Object> retMap = REC020W_05dao.GeneralSave(param, addList, uptList, delList);
			boolean dbFlag = StringUtil.ObjToBol(retMap.get("success"));
			
			if(dbFlag){
				rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			}else{
				rtnData = StringUtil.rtnError(rtnData, retMap.get("msg")+"");
			}
			
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	@RequestMapping(value="DetailSave.suvila")
	public @ResponseBody Map<String,Object> DetailSave( Map<String, Object> map
										           	    ,HttpServletRequest request
										           	    ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			
			
			String newData = param.getString("newData","");
			String uptData = param.getString("uptData","");
			String delData = param.getString("delData","");
			
			List<Map<String, Object>> addList = StringUtil.jsonToArray(newData);
			List<Map<String, Object>> uptList = StringUtil.jsonToArray(uptData);
			List<Map<String, Object>> delList = StringUtil.jsonToArray(delData);
			
			Map<String, Object> retMap = REC020W_05dao.detailSave(param, addList, uptList, delList);
			
			boolean dbFlag = StringUtil.ObjToBol(retMap.get("success"));
			if(dbFlag){
				rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			}else{
				rtnData = StringUtil.rtnError(rtnData, retMap.get("msg")+"");
			}
			
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
		
}//REC002W_05_Controller 

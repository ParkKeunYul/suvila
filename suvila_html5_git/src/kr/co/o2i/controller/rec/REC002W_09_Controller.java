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
import kr.co.o2i.dao.rec.REC002W_09DAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/rec/REC002W_09/*")
public class REC002W_09_Controller extends DefaultController {

	
	@Autowired
	REC002W_09DAO REC002W_09dao;
	
	@RequestMapping(value="Ing.suvila")
	public @ResponseBody Map<String,Object> Ing( Map<String, Object> map
												,HttpServletRequest request
												,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try {
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			
			storeInfo.put("list", REC002W_09dao.SELECT_Ing(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	
	@RequestMapping(value="General.suvila")
	public @ResponseBody Map<String,Object> General( Map<String, Object> map
										     		,HttpServletRequest request
										     		,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try {
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			
			storeInfo.put("list", REC002W_09dao.SELECT_General(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	@RequestMapping(value="Detail.suvila")
	public @ResponseBody Map<String,Object> Detail( Map<String, Object> map
										     	   ,HttpServletRequest request
										     	   ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try {
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			
			storeInfo.put("list", REC002W_09dao.SELECT_Detail(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	@RequestMapping(value="IngSortSave.suvila")
	public @ResponseBody Map<String,Object> IngSortSave( Map<String, Object> map
										     	   		,HttpServletRequest request
										     	   		,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try {
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			String uptData        = StringUtil.getJosnParam(param.getString("uptData",""));
			
			List<Map<String, Object>> uptList        = StringUtil.jsonToArray(uptData);
			
			boolean dbFlag = REC002W_09dao.IngSortSave(param, uptList);
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
	
	@RequestMapping(value="GeneralSave.suvila")
	public @ResponseBody Map<String,Object> GeneralSave( Map<String, Object> map
										     	   	   ,HttpServletRequest request
										     	   	   ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try {
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			
			String newData        = StringUtil.getJosnParam(param.getString("newData",""));
			String uptData        = StringUtil.getJosnParam(param.getString("uptData",""));
			String delData        = StringUtil.getJosnParam(param.getString("delData",""));
			
			List<Map<String, Object>> newList  = StringUtil.jsonToArray(newData);
			List<Map<String, Object>> uptList  = StringUtil.jsonToArray(uptData);
			List<Map<String, Object>> delList  = StringUtil.jsonToArray(delData);
			
			
			boolean dbFlag = REC002W_09dao.GeneralSave(param,newList, uptList,delList);
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
	
	
	
	@RequestMapping(value="DetailSave.suvila")
	public @ResponseBody Map<String,Object> DetailSave ( Map<String, Object> map
										     	   		,HttpServletRequest request
										     	   		,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try {
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			
			String newData        = StringUtil.getJosnParam(param.getString("newData",""));
			String uptData        = StringUtil.getJosnParam(param.getString("uptData",""));
			String delData        = StringUtil.getJosnParam(param.getString("delData",""));
			
			List<Map<String, Object>> newList        = StringUtil.jsonToArray(newData);
			List<Map<String, Object>> uptList        = StringUtil.jsonToArray(uptData);
			List<Map<String, Object>> delList        = StringUtil.jsonToArray(delData);
			
			
			boolean dbFlag = REC002W_09dao.DetailSave(param,newList, uptList ,delList);
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
}

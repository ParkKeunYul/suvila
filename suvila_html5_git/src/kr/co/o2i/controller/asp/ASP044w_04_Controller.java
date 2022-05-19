package kr.co.o2i.controller.asp;

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
import kr.co.o2i.dao.asp.ASP044w_03DAO;
import kr.co.o2i.dao.asp.ASP044w_04DAO;
import kr.co.o2i.dao.rec.REC000P_02DAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/asp/ASP044W_04/*")
public class ASP044w_04_Controller extends DefaultController {

	@Autowired
	ASP044w_04DAO ASP044w_04Dao;
	
	@Autowired
	REC000P_02DAO cec000p_02Dao;
	
	
	
	@RequestMapping(value="selectSindoInfo.suvila")
	public @ResponseBody Map<String,Object> selectSindoInfo( Map<String, Object> map
			                                         		,HttpServletRequest request
			                                         		,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			System.out.println(param);
			
			param.put("V_TEMPLE_CD", param.getString("VV_TEMPLE_CD"));
			
			storeInfo.put("list", ASP044w_04Dao.SELECT_SINDO_INFO(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	@RequestMapping(value="selectYoungGa.suvila")
	public @ResponseBody Map<String,Object> selectYoungGa( Map<String, Object> map
			                                          	  ,HttpServletRequest request
			                                         	  ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			
			param.put("V_TEMPLE_CD", param.getString("VV_TEMPLE_CD"));
			
			storeInfo.put("list", ASP044w_04Dao.SELECT_SIN_DEATH_INFO(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	@RequestMapping(value="selectBranchFam.suvila")
	public @ResponseBody Map<String,Object> selectBranchFam( Map<String, Object> map
			                                          	    ,HttpServletRequest request
			                                         	    ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			
			param.put("V_TEMPLE_CD", param.getString("VV_TEMPLE_CD"));
			
			storeInfo.put("list", ASP044w_04Dao.SELECT_SIN_BRANCH_FAMILY_HIS(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	@RequestMapping(value="saveSindoInfo.suvila")
	public @ResponseBody Map<String,Object> saveSindoInfo( Map<String, Object> map
			                                          	  ,HttpServletRequest request
			                                         	  ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE",    request.getRemoteAddr());
			
			
			String uptData = param.getString("uptData","");
			String delData = param.getString("delData","");
			
			List<Map<String, Object>> uptList = StringUtil.jsonToArray(uptData);
			List<Map<String, Object>> delList = StringUtil.jsonToArray(delData);
			
			
			boolean dbFlag = ASP044w_04Dao.saveSindoInfo(param,uptList , delList);			
			
			if(dbFlag){
				rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			}else{
				rtnData = StringUtil.rtnError(rtnData);
			}
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	
	@RequestMapping(value="delete_branch.suvila")
	public @ResponseBody Map<String,Object> delete_branch( Map<String, Object> map
			                                          	  ,HttpServletRequest request
			                                         	  ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE",    request.getRemoteAddr());
			
			
			String delData = param.getString("delData","");
			
			List<Map<String, Object>> delList = StringUtil.jsonToArray(delData);
			
			
			boolean dbFlag = ASP044w_04Dao.delete_branch(param, delList);			
			
			if(dbFlag){
				rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			}else{
				rtnData = StringUtil.rtnError(rtnData);
			}
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	
	
}


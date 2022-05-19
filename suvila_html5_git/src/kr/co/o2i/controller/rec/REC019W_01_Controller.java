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
import kr.co.o2i.dao.rec.REC019W_01DAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/rec/REC019W_01/*")
class REC019W_01_Controller extends DefaultController {

	
	@Autowired
	REC019W_01DAO REC019W_01dao;
	
	
	@RequestMapping(value="kindInfo.suvila")
	public @ResponseBody Map<String,Object> kindInfo( Map<String, Object> map
													 ,HttpServletRequest request
													 ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			storeInfo.put("list", REC019W_01dao.SELECT_MGT(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//kindInfo
	
	
	@RequestMapping(value="selectDetail.suvila")
	public @ResponseBody Map<String,Object> selectDetail( Map<String, Object> map
													 	 ,HttpServletRequest request
													 	 ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			storeInfo.put("list", REC019W_01dao.SELECT_DETAIL(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//selectDetail
	
	
	@RequestMapping(value="selectUser.suvila")
	public @ResponseBody Map<String,Object> selectUser( Map<String, Object> map
													 	 ,HttpServletRequest request
													 	 ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			storeInfo.put("list", REC019W_01dao.SELECT_USER(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//selectDetail
	
	@RequestMapping(value="saveMgt.suvila")
	public @ResponseBody Map<String,Object> saveMgt( Map<String, Object> map
												 	,HttpServletRequest request
												 	,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			param.put("V_USER_ID"   , adminSession.get("USER_ID"));
			
			String newData = StringUtil.getJosnParam(param.getString("newData",""));
			String uptData = StringUtil.getJosnParam(param.getString("uptData",""));
			
			
			List<Map<String, Object>> addList = StringUtil.jsonToArray(newData);
			List<Map<String, Object>> uptList = StringUtil.jsonToArray(uptData);
			
			boolean dbFlag = REC019W_01dao.saveMgt(param, addList, uptList);
			
			if(dbFlag){
				rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			}else{
				rtnData = StringUtil.rtnError(rtnData);
			}
			
		}catch (Exception e) {
			e.printStackTrace();
			rtnData = StringUtil.rtnError(rtnData);
		}
		return rtnData;
	}
	
	@RequestMapping(value="saveDetail.suvila")
	public @ResponseBody Map<String,Object> saveDetail( Map<String, Object> map
												 	   ,HttpServletRequest request
												 	   ,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			param.put("V_USER_ID"   , adminSession.get("USER_ID"));
			
			String newData = StringUtil.getJosnParam(param.getString("newData",""));
			
			List<Map<String, Object>> addList  = StringUtil.jsonToArray(newData);
			
			boolean dbFlag = REC019W_01dao.saveDetail(param, addList);
			
			if(dbFlag){
				rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			}else{
				rtnData = StringUtil.rtnError(rtnData);
			}
			
		}catch (Exception e) {
			e.printStackTrace();
			rtnData = StringUtil.rtnError(rtnData);
		}
		return rtnData;
	}
	
	@RequestMapping(value="saveUser.suvila")
	public @ResponseBody Map<String,Object> saveUser( Map<String, Object> map
												     ,HttpServletRequest request
												     ,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			param.put("V_USER_ID"   , adminSession.get("USER_ID"));
			
			String newData = StringUtil.getJosnParam(param.getString("newData",""));
			
			List<Map<String, Object>> addList  = StringUtil.jsonToArray(newData);
			
			boolean dbFlag = REC019W_01dao.saveUser(param, addList);
			
			if(dbFlag){
				rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			}else{
				rtnData = StringUtil.rtnError(rtnData);
			}
			
		}catch (Exception e) {
			e.printStackTrace();
			rtnData = StringUtil.rtnError(rtnData);
		}
		return rtnData;
	}
	
		
}//REC019W_01_Controller 

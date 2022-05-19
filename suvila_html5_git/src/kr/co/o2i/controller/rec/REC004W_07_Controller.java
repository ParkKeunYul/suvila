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
import kr.co.o2i.util.StringUtil;
import kr.co.o2i.dao.rec.REC004W_07DAO;

@Controller
@RequestMapping ("/rec/REC004W_07/*")
public class REC004W_07_Controller extends DefaultController {

	@Autowired
	REC004W_07DAO REC004W_07dao;
	
	@RequestMapping(value="General.suvila")
	public @ResponseBody Map<String,Object> General( Map<String, Object> map
			                                        ,HttpServletRequest request
			                                        ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			
			System.out.println(param);
			
			storeInfo.put("list", REC004W_07dao.SELECT_mgt(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//menuSelect
	
	
	@RequestMapping(value="Detail.suvila")
	public @ResponseBody Map<String,Object> Detail( Map<String, Object> map
			                                       ,HttpServletRequest request
			                                       ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			
			
			storeInfo.put("list", REC004W_07dao.SELECT_event(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//menuSelect
	
	
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
			
			List<Map<String, Object>> addList = StringUtil.jsonToArray(newData);
			List<Map<String, Object>> uptList = StringUtil.jsonToArray(uptData);
			
			
			boolean dbFlag = REC004W_07dao.GeneralSave(param, addList, uptList);
			
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
			
			
			Map<String, Object> rep = REC004W_07dao.DetailSave(param, addList, uptList , delList);
			
			boolean dbFlag = StringUtil.ObjToBol(rep.get("result"));
			
			if(dbFlag){
				rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			}else{
				rtnData = StringUtil.rtnError(rtnData ,rep.get("msg")+"");
			}
			
			
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	
}//REC004W_04_Controller

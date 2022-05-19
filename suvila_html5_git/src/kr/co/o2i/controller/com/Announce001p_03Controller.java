package kr.co.o2i.controller.com;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.o2i.dao.asp.Announce001p_03DAO;
import kr.co.o2i.util.CommonUtil;
import kr.co.o2i.util.LunarCalendar;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/asp/Announce001p_03/*")
public class Announce001p_03Controller extends DefaultController{
	
	@Autowired
	Announce001p_03DAO Announce001p_03Dao;
	
	
	@RequestMapping(value="scheduleDetailSelect.suvila")
	public @ResponseBody Map<String,Object> scheduleDetailSelect( Map<String, Object> map
										 						 ,HttpServletRequest request
										 						 ,HttpServletResponse response){
		
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try {
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			storeInfo.put("list", Announce001p_03Dao.SELECT_DETAIL_SCHEDUEL(param));
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
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE",    request.getRemoteAddr());
			
			
			String newData = StringUtil.getJosnParam(param.getString("newData",""));
			String uptData = StringUtil.getJosnParam(param.getString("uptData",""));
			String delData = StringUtil.getJosnParam(param.getString("delData",""));
			
			List<Map<String, Object>> addList = StringUtil.jsonToArray(newData);
			List<Map<String, Object>> uptList = StringUtil.jsonToArray(uptData);
			List<Map<String, Object>> delList = StringUtil.jsonToArray(delData);
			
			
			boolean dbFlag = Announce001p_03Dao.save(param, addList , uptList ,delList );
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
	
	@RequestMapping(value="scheduleJesaSelect.suvila")
	public @ResponseBody Map<String,Object> scheduleJesaSelect( Map<String, Object> map
										 					   ,HttpServletRequest request
										 					   ,HttpServletResponse response){
		
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try {
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			List<Map<String, Object>>  list = null;
			
			String V_ACCEPT_GBN = param.getString("V_ACCEPT_GBN");
			
			if("5".equals(V_ACCEPT_GBN)) {
				list = Announce001p_03Dao.SELECT_FORTY_NINE_DETAIL(param);
			}else if("6".equals(V_ACCEPT_GBN)) {
				list = Announce001p_03Dao.SELECT_JIJE_DETAIL(param);
			}else {
				list = Announce001p_03Dao.SELECT_CHONDOJE_DETAIL(param);
			}
			
			storeInfo.put("list", list);
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
}

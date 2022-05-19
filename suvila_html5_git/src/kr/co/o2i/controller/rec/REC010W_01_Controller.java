package kr.co.o2i.controller.rec;

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
import kr.co.o2i.dao.rec.REC010W_01DAO;
import kr.co.o2i.util.StringUtil;


@Controller
@RequestMapping ("/rec/REC010W_01/*")
public class REC010W_01_Controller extends DefaultController {

	
	@Autowired
	REC010W_01DAO REC010W_01dao;
	
	
	
	@RequestMapping(value="selectDailyReport.suvila")
	public @ResponseBody Map<String,Object> selectDailyReport( Map<String, Object> map
												   			  ,HttpServletRequest request
												   			  ,HttpServletResponse response){
		
		
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			
			String VV_USER_ID = URLDecoder.decode(param.getString("VV_USER_ID"), "UTF-8");
			param.put("V_USER_ID"   , VV_USER_ID);
			
			
			storeInfo.put("list", REC010W_01dao.SELECT_SELECT_DAILYREPORT(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		
		return rtnData;
	}
	
	
	@RequestMapping(value="selectBreakdown.suvila")
	public @ResponseBody Map<String,Object> selectBreakdown( Map<String, Object> map
															,HttpServletRequest request
															,HttpServletResponse response){
		
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			
			String VV_USER_ID = URLDecoder.decode(param.getString("VV_USER_ID"), "UTF-8");
			param.put("V_USER_ID"   , VV_USER_ID);
			
			
			storeInfo.put("list", REC010W_01dao.SELECT_SELECT_BREAKDOWN(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	
	@RequestMapping(value="selectRecUser.suvila")
	public @ResponseBody Map<String,Object> selectRecUser( Map<String, Object> map
														  ,HttpServletRequest request
														  ,HttpServletResponse response){
		
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			storeInfo.put("list", REC010W_01dao.SELECT_REC_USER(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
}

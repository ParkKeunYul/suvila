package kr.co.o2i.controller.rec;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.o2i.controller.com.DefaultController;
import kr.co.o2i.dao.rec.REC020W_03DAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/rec/REC020W_03/*")
class REC020W_03_Controller extends DefaultController {

	
	@Autowired
	REC020W_03DAO REC020W_03dao;
	
	
	@RequestMapping(value="kindInfo.suvila")
	public @ResponseBody Map<String,Object> kindInfo( Map<String, Object> map
													 ,HttpServletRequest request
													 ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			param.put("V_ACCEPT_GBN", "2");
			
			
			storeInfo.put("list", REC020W_03dao.SELECT_KIND(param));
			
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
			
			
			storeInfo.put("list", REC020W_03dao.SELECT_DETAIL(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//kindInfo
	
	
		
}//REC002W_03_Controller 

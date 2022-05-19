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
import kr.co.o2i.dao.asp.ASP044w_05DAO;
import kr.co.o2i.dao.rec.REC000P_02DAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/asp/ASP044W_05/*")
public class ASP044w_05_Controller extends DefaultController {

	@Autowired
	ASP044w_05DAO ASP044w_05Dao;
	
	
	
	
	@RequestMapping(value="selectCmsInfo.suvila")
	public @ResponseBody Map<String,Object> selectCmsInfo( Map<String, Object> map
			                                         		,HttpServletRequest request
			                                         		,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			System.out.println(param);
			
			param.put("V_TEMPLE_CD", param.getString("VV_TEMPLE_CD"));
			
			storeInfo.put("list", ASP044w_05Dao.SELECT_SINDO_INFO(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	@RequestMapping(value="saveCmsInfo.suvila")
	public @ResponseBody Map<String,Object> saveCmsInfo( Map<String, Object> map
			                                          	,HttpServletRequest request
			                                         	,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE",    request.getRemoteAddr());
			
			
			String uptData = param.getString("uptData","");
			
			List<Map<String, Object>> uptList = StringUtil.jsonToArray(uptData);
			
			
			boolean dbFlag = ASP044w_05Dao.saveCmsInfo(param,uptList );			
			
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


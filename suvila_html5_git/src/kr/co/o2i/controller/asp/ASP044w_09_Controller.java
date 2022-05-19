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
import kr.co.o2i.dao.asp.ASP044w_09DAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/asp/ASP044W_09/*")
public class ASP044w_09_Controller extends DefaultController {

	@Autowired
	ASP044w_09DAO ASP044w_09Dao;
	
	
	@RequestMapping(value="selectLog.suvila")
	public @ResponseBody Map<String,Object> selectLog( Map<String, Object> map
			                                    	  ,HttpServletRequest request
			                                          ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			System.out.println(param);
			
			param.put("V_TEMPLE_CD", param.getString("VV_TEMPLE_CD"));
			
			storeInfo.put("list", ASP044w_09Dao.SELECT_LOG(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	
	
}


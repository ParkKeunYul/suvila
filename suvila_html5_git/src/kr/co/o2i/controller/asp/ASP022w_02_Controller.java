package kr.co.o2i.controller.asp;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.o2i.controller.com.DefaultController;
import kr.co.o2i.dao.asp.ASP022w_02DAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/asp/asp022w_02/*")
public class ASP022w_02_Controller extends DefaultController {

	@Autowired
	ASP022w_02DAO ASP022w_02dao;
	
	@RequestMapping(value="select.suvila")
	public @ResponseBody Map<String,Object> select(Map<String, Object> map
			                                      ,HttpServletRequest request
			                                      ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			System.out.println("param2 = "+ param);
			
			storeInfo.put("list", ASP022w_02dao.SELECT_PG_CARD_COMMISSION(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	
	
	
	
	
	
}


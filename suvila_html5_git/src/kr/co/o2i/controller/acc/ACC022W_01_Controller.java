package kr.co.o2i.controller.acc;

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
import kr.co.o2i.util.StringUtil;
import kr.co.o2i.dao.acc.ACC022W_01DAO;

@Controller
@RequestMapping ("/acc/ACC022W_01/*")
public class ACC022W_01_Controller extends DefaultController {

	@Autowired
	ACC022W_01DAO ACC022W_01dao;
	
	@RequestMapping(value="select.suvila")
	public @ResponseBody Map<String,Object> select(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			
				
			System.out.println(param);
			
			storeInfo.put("list", ACC022W_01dao.SELECT_LIST(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		
		return rtnData;
	}
	
	
}//ACC022W_01_Controller

package kr.co.o2i.controller.cad;

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
import kr.co.o2i.dao.cad.CAD004W_01DAO;

@Controller
@RequestMapping ("/cad/CAD004W_01/*")
public class CAD004W_01_Controller extends DefaultController {

	@Autowired
	CAD004W_01DAO CAD004W_01dao;
	
	
	@RequestMapping(value="select.suvila")
	public @ResponseBody Map<String,Object> selectCmsMgt(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			
			
			String V_NAME_KOR = URLDecoder.decode(param.getString("V_NAME_KOR"), "UTF-8");
			param.put("V_NAME_KOR", V_NAME_KOR);
			
			
			storeInfo.put("list", CAD004W_01dao.SELECT_V_SMS_LOG(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	
	
	
}//CAD004W_01_Controller

package kr.co.o2i.controller.cad;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.o2i.controller.com.DefaultController;
import kr.co.o2i.util.StringUtil;
import kr.co.o2i.dao.cad.CAD001P_01DAO;

@Controller
@RequestMapping ("/cad/CAD001P_01/*")
public class CAD001P_01_Controller extends DefaultController {

	@Autowired
	CAD001P_01DAO CAD001P_01dao;
	
	@RequestMapping(value="select.suvila")
	public @ResponseBody Map<String,Object> selectCmsMgt(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			
			param.put("V_CLASS_CD", param.getString("V_CLASS_CD", "0"));
			
			System.out.println(param);
			
			
			storeInfo.put("list", CAD001P_01dao.SELECT_SINDO(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		
		return rtnData;
	}
	
	
	
	
}//CMS004W_01_Controller

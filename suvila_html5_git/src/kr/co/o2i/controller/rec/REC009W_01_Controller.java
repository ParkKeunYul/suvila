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
import kr.co.o2i.dao.rec.REC009W_01DAO;

@Controller
@RequestMapping ("/rec/REC009W_01/*")
public class REC009W_01_Controller extends DefaultController {

	@Autowired
	REC009W_01DAO REC009W_01dao;
	
	@RequestMapping(value="Moyeonmun.suvila")
	public @ResponseBody Map<String,Object> Moyeonmun( Map<String, Object> map
			                                          ,HttpServletRequest request
			                                          ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			System.out.println(param);
			
			storeInfo.put("list", REC009W_01dao.SELECT_Moyeonmun(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//menuSelect
	
	
	
	
	
	
}//REC004W_04_Controller

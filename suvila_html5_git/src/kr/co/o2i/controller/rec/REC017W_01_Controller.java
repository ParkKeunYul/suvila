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
import kr.co.o2i.dao.rec.REC017W_01DAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/rec/REC017W_01/*")
class REC017W_01_Controller extends DefaultController {

	
	@Autowired
	REC017W_01DAO REC017W_01dao;
	
	
	@RequestMapping(value="groupmgtSelect.suvila")
	public @ResponseBody Map<String,Object> groupmgtSelect( Map<String, Object> map
												    	   ,HttpServletRequest request
												    	   ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			storeInfo.put("list", REC017W_01dao.SELECT_SIN_GROUP_MGT(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//General
	
	
	
		
}//REC017W_01_Controller 

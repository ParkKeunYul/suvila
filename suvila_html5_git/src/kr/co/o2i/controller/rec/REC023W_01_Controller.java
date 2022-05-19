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
import kr.co.o2i.dao.rec.REC015W_01DAO;
import kr.co.o2i.dao.rec.REC023W_01DAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/rec/REC023W_01/*")
class REC023W_01_Controller extends DefaultController {

	
	@Autowired
	REC023W_01DAO REC023W_01dao;
	
	
	
	@RequestMapping(value="select.suvila")
	public @ResponseBody Map<String,Object> select( Map<String, Object> map
												   ,HttpServletRequest request
												   ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			
			storeInfo.put("list", REC023W_01dao.SELECT_REC_PAYMENT_HIS(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//select
	
	
		
}//REC023W_01 

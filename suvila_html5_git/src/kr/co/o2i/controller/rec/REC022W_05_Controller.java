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
import kr.co.o2i.dao.rec.REC020W_05DAO;
import kr.co.o2i.dao.rec.REC022W_05DAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/rec/REC022W_05/*")
class REC022W_05_Controller extends DefaultController {

	
	@Autowired
	REC022W_05DAO REC022W_05dao;
	
	@RequestMapping(value="select")
	public @ResponseBody Map<String,Object> select( Map<String, Object> map
													   ,HttpServletRequest request
													   ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			storeInfo.put("list", REC022W_05dao.SELECT(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//	
	
	
		
}//REC022W_05_Controller 

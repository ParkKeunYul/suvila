package kr.co.o2i.controller.rec;

import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.o2i.controller.com.DefaultController;
import kr.co.o2i.dao.rec.REC002W_18DAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/rec/REC002W_18/*")
class REC002W_18_Controller extends DefaultController {

	
	@Autowired
	REC002W_18DAO REC002W_18dao;
	
	
	@RequestMapping(value="selectID.suvila")
	public @ResponseBody Map<String,Object> selectID( Map<String, Object> map
												     ,HttpServletRequest request
												   	 ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			param.put("V_USER_ID"   , adminSession.get("USER_ID"));
			
			String V_ADDR1 = URLDecoder.decode(param.getString("V_ADDR1"), "UTF-8");
			System.out.println("V_ADDR1 =["+V_ADDR1+"]");
			
			param.put("V_ADDR1", V_ADDR1);
			
			storeInfo.put("list", REC002W_18dao.SELECT_INDEUNG_MONTH_TOT(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//selectIDList
	
}//REC002W_18_Controller 

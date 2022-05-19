package kr.co.o2i.controller.rec;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.o2i.controller.com.DefaultController;
import kr.co.o2i.dao.rec.REC003W_45DAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/rec/REC003W_45/*")
public class REC003W_45_Controller extends DefaultController {

	
	@Autowired
	REC003W_45DAO REC003W_45dao;

	
	@RequestMapping(value="selectChondoje.suvila")
	public @ResponseBody Map<String,Object> selectGije( Map<String, Object> map
													   ,HttpServletRequest request
													   ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try {
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			System.out.println("selectSagu = "+ param);
			
			storeInfo.put("list", REC003W_45dao.SELECT_CHONDOJE(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	
}

package kr.co.o2i.controller.sin;

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
import kr.co.o2i.dao.sin.SIN001P_09DAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/sin/SIN001P_01/*")
public class SIN001P_09_Controller extends DefaultController{
	

	@Autowired
	SIN001P_09DAO SIN001p_09dao;
	
	
	@RequestMapping(value="selectGanji.suvila")
	public @ResponseBody Map<String,Object> selectGanji(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			String V_SEARCH_WORD = URLDecoder.decode(param.getString("V_SEARCH_WORD"), "UTF-8");
			param.put("V_SEARCH_WORD"  ,V_SEARCH_WORD);
			
			
			storeInfo.put("list", SIN001p_09dao.SELECT_GANJI(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		
		return rtnData;
	}
	
}

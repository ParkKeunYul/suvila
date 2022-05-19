package kr.co.o2i.controller.com;

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

import kr.co.o2i.dao.com.MoyeonmunSearchDAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/asp/MoyeonmunSearch/*")
public class MoyeonmunSearchController extends DefaultController{

	
	@Autowired
	MoyeonmunSearchDAO MoyeonmunSearchDao;
	
	
	/* 공통코드조회*/
	@RequestMapping(value="select.suvila")
	public @ResponseBody Map<String,Object> select( Map<String, Object> map
												   ,HttpServletRequest request
												   ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			String V_SEARCH_WORD = URLDecoder.decode(param.getString("V_SEARCH_WORD"), "UTF-8");
			param.put("V_SEARCH_WORD", V_SEARCH_WORD);
			
			List<Map<String, Object>> list = MoyeonmunSearchDao.SELECT_MOYEON(param);
			
			storeInfo.put("list", list);
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
}

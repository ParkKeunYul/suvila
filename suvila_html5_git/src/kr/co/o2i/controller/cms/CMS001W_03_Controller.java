package kr.co.o2i.controller.cms;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.o2i.controller.com.DefaultController;
import kr.co.o2i.dao.cms.CMS001W_03DAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/cms/cms001W_03/*")
public class CMS001W_03_Controller extends DefaultController {

	@Autowired
	CMS001W_03DAO CMS001W_03dao;
	
	@RequestMapping(value="cmsAccUptHisTemple.suvila")
	public @ResponseBody Map<String,Object> cmsAccUptHisTemple(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			
			storeInfo.put("list", CMS001W_03dao.SELECT_CMS_UPT_LIST(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		
		return rtnData;
	}
	
}//CMS001W_02_Controller

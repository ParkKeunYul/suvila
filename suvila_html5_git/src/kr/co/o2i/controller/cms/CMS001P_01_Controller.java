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
import kr.co.o2i.dao.cms.CMS001P_01DAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/cms/CMS001P_01/*")
public class CMS001P_01_Controller extends DefaultController{

	@Autowired
	CMS001P_01DAO CMS001P_01dao;
	
	@RequestMapping(value="cmsAccUptHis.suvila")
	public @ResponseBody Map<String,Object> selectTempleCMSInfo(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			
			System.out.println("cmsAccUptHis = "+ param);
			
			storeInfo.put("list", CMS001P_01dao.SELECT_CMS_UPT_HIS(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		
		return rtnData;
	}
}

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
import kr.co.o2i.dao.cms.CMS002W_01DAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/cms/CMS002W_01/*")
public class CMS002W_01_Controller extends DefaultController {

	@Autowired
	CMS002W_01DAO CMS002W_01dao;
	
	@RequestMapping(value="selectTempleCMSInfoList.suvila")
	public @ResponseBody Map<String,Object> selectTempleCMSInfoList(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			
			storeInfo.put("list", CMS002W_01dao.SELECT_ASP_TEMPLE_CMS_INFO_LIST(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		
		return rtnData;
	}
	
	@RequestMapping(value="selectAllTempleCMSInfoList.suvila")
	public @ResponseBody Map<String,Object> selectAllTempleCMSInfoList(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			
			storeInfo.put("list", CMS002W_01dao.SELECT_ALL_ASP_TEMPLE_CMS_INFO_LIST(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		
		return rtnData;
	}
	
	@RequestMapping(value="selectTempleCMSInfoDetail.suvila")
	public @ResponseBody Map<String,Object> selectTempleCMSInfoDetail(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			
			storeInfo.put("list", CMS002W_01dao.SELECT_ASP_TEMPLE_CMS_INFO_DETAIL(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		
		return rtnData;
	}
	
	@RequestMapping(value="selectTempleCMSInfoPayday.suvila")
	public @ResponseBody Map<String,Object> selectTempleCMSInfoPayday(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			
			storeInfo.put("list", CMS002W_01dao.SELECT_ASP_TEMPLE_CMS_PAYMENT_DAY_MGT(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	@RequestMapping(value="saveTempleCMSInfo.suvila")
	public @ResponseBody Map<String,Object> saveTempleCMSInfo(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			
			param.put("V_USER_ID", adminSession.get("USER_ID"));
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			
			System.out.println(param);
			
			boolean dbFlag = CMS002W_01dao.UPDATE_ASP_TEMPLE_CMS_INFO(param);
			
			if(dbFlag){
				rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			}else{
				rtnData = StringUtil.rtnError(rtnData);
			}
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	
	
}//CMS001W_02_Controller

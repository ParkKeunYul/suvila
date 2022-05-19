package kr.co.o2i.controller.acc;

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
import kr.co.o2i.util.StringUtil;
import kr.co.o2i.dao.acc.ACC003W_01DAO;

@Controller
@RequestMapping ("/acc/ACC003W_01/*")
public class ACC003W_01_Controller extends DefaultController {

	@Autowired
	ACC003W_01DAO ACC003W_01dao;
	
	@RequestMapping(value="selectIn.suvila")
	public @ResponseBody Map<String,Object> selectIn(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_IE_GBN"  , "I");
			
			
			storeInfo.put("list", ACC003W_01dao.SELECT_ACC(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			
			
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		
		return rtnData;
	}
	
	
	@RequestMapping(value="selectOut.suvila")
	public @ResponseBody Map<String,Object> selectOut(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			
			param.put("V_IE_GBN"  , "O");
			
			
			
			storeInfo.put("list", ACC003W_01dao.SELECT_ACC(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			
			
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		
		return rtnData;
	}
	
	
	
}//ACC003W_01_Controller

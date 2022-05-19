package kr.co.o2i.controller.ser;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.o2i.common.Const;
import kr.co.o2i.controller.com.DefaultController;
import kr.co.o2i.dao.ser.SER032W_01DAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/ser/SER032W_01/*")
public class SER032W_01_Controller extends DefaultController {

	@Autowired
	SER032W_01DAO SER032W_01dao;
	
	@RequestMapping(value="select.suvila")
	public @ResponseBody Map<String,Object> select( Map<String, Object> map
			                                       ,HttpServletRequest request
			                                       ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"  , request.getRemoteAddr());
			
			param.put("GV_SMS_U", Const.SMS_TO_USER); // SMS 청구요금
			param.put("GV_LMS_U", Const.LMS_TO_USER); // LMS 청구요금
			
			storeInfo.put("list", SER032W_01dao.SELECT_SMS_LOG(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//menuSelect
	
	
}//SER032W_01_Controller

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
import kr.co.o2i.dao.ser.SER033W_01DAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/ser/SER033W_01/*")
public class SER033W_01_Controller extends DefaultController {

	@Autowired
	SER033W_01DAO SER033W_01dao;
	
	@RequestMapping(value="selectDonationPrint.suvila")
	public @ResponseBody Map<String,Object> selectDonationPrint( Map<String, Object> map
																,HttpServletRequest request
																,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
						
			storeInfo.put("list", SER033W_01dao.SELECT_DONATION_PRINT_MGT(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//menuSelect
	

	@RequestMapping(value="save.suvila")
	public @ResponseBody Map<String,Object> save( Map<String, Object> map
			                                     ,HttpServletRequest request
			                                     ,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE"  , request.getRemoteAddr());
			
			String uptData = param.getString("uptData","");
			
			List<Map<String, Object>> uptList = StringUtil.jsonToArray(uptData);
			
			
			boolean flag =  SER033W_01dao.save(param, uptList);
			
			if(flag){
				rtnData = StringUtil.rtnSuc(rtnData,  storeInfo);
			}else{
				rtnData = StringUtil.rtnError(rtnData);
			}
			
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
}//SER033W_01

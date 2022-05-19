package kr.co.o2i.controller.rec;

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
import kr.co.o2i.dao.rec.REC000P_03DAO;
import kr.co.o2i.dao.rec.REC001W_02DAO;
import kr.co.o2i.dao.rec.REC001W_10DAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/rec/REC000P_03/*")
public class REC000P_03_Controller extends DefaultController {

	
	@Autowired
	REC000P_03DAO REC000P_03dao;
	
	/*@Autowired
	REC001W_10DAO REC001W_10dao;*/
	
	@RequestMapping(value="Deung.suvila")
	public @ResponseBody Map<String,Object> Deung( Map<String, Object> map
			                                       ,HttpServletRequest request
			                                       ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			storeInfo.put("list", REC000P_03dao.SELECT_DENG(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//kindInfo
	
	@RequestMapping(value="ds_reservation.suvila")
	public @ResponseBody Map<String,Object> ds_reservation( Map<String, Object> map
			                                       		   ,HttpServletRequest request
			                                       		   ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("UPT_USER"  , adminSession.get("USER_ID"));
			
			REC000P_03dao.UPDATE_GETLIGHT(param);;
			
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//kindInfo
	
	
}

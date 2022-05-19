package kr.co.o2i.controller.sin;

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
import kr.co.o2i.dao.sin.SIN001P_07DAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/sin/SIN001P_07/*")
public class SIN001P_07_Controller extends DefaultController{
	

	@Autowired
	SIN001P_07DAO SIN001p_07dao;
	
	
	@RequestMapping(value="cheanHonSelect.suvila")
	public @ResponseBody Map<String,Object> cheanHonSelect(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			
			storeInfo.put("list", SIN001p_07dao.cheanHonSelect(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			
			
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	@RequestMapping(value="cheanHonSelectGbn.suvila")
	public @ResponseBody Map<String,Object> cheanHonSelectGbn(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			
			storeInfo.put("list", SIN001p_07dao.cheanHonSelectGbn(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			
			
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	
	@RequestMapping(value="selectBokwija.suvila")
	public @ResponseBody Map<String,Object> selectBokwija(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			
			storeInfo.put("list", SIN001p_07dao.SELECT_SIN_DEATH_BOKWIJA(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			
			
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	@RequestMapping(value="selectcheanHonGbn.suvila")
	public @ResponseBody Map<String,Object> selectcheanHonGbn(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			
			storeInfo.put("list", SIN001p_07dao.selectcheanHonGbn(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			
			
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	
	
}

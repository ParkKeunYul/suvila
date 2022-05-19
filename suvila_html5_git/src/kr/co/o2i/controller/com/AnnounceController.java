package kr.co.o2i.controller.com;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.o2i.dao.asp.AnnounceDAO;
import kr.co.o2i.util.CommonUtil;
import kr.co.o2i.util.LunarCalendar;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/asp/Announce/*")
public class AnnounceController extends DefaultController{
	
	@Autowired
	AnnounceDAO Announcedao;
	
	@RequestMapping(value="AnnounceCalender.suvila")
	public @ResponseBody Map<String,Object> AnnounceCalender( Map<String, Object> map
										 					 ,HttpServletRequest request
										 					 ,HttpServletResponse response){
		
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try {
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			param.put("V_S_SIZE", 12);
			param.put("V_E_SIZE", 11);
			
			
			if(!"".equals(param.getString("V_YEAR"))  &&   !"".equals(param.getString("V_MONTH"))){
				String s = param.getString("V_YEAR")+ param.getString("V_MONTH");
				param.put("V_P_SDATE", s +"01");
				param.put("V_P_EDATE", s +"31");
			}else{
				Map<String, Object> listNextDay = Announcedao.getNextDay(param);
				param.put("V_P_SDATE", listNextDay.get("DATE4").toString());
				param.put("V_P_EDATE", listNextDay.get("DATE3").toString());
			}
			
			
			String V_P_SDATE = StringUtil.ObjToString(param.get("V_P_SDATE"),"");
			String V_P_EDATE = StringUtil.ObjToString(param.get("V_P_EDATE"),"");
			
			LunarCalendar lc = new LunarCalendar();
			param.put("V_P_SDATE_LUNAR",   lc.toLunar(V_P_SDATE).substring(0,8));
			param.put("V_P_EDATE_LUNAR",   lc.toLunar(V_P_EDATE).substring(0,8));
			
			
			storeInfo.put("list", Announcedao.SELECT_CALENDER(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	
	@RequestMapping(value="AnnounceCalenderDay.suvila")
	public @ResponseBody Map<String,Object> AnnounceCalenderDay( Map<String, Object> map
										 					    ,HttpServletRequest request
										 					    ,HttpServletResponse response){
		
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try {
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			param.put("V_S_SIZE", 12);
			param.put("V_E_SIZE", 11);
			
			
			String V_P_DAY = param.getString("V_P_DAY");
			
			LunarCalendar lc = new LunarCalendar();
			param.put("V_P_DAY_LUNAR",   lc.toLunar(V_P_DAY).substring(0,8));
			
			
			System.out.println(param);
			
			
			storeInfo.put("list", Announcedao.SELECT_CALENDER_DAY(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	@RequestMapping(value="AnnounceCalenderYYYY.suvila")
	public @ResponseBody Map<String,Object> AnnounceCalenderYYYY( Map<String, Object> map
										 						 ,HttpServletRequest request
										 						 ,HttpServletResponse response){
		
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try {
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			
			storeInfo.put("list", Announcedao.SELECT_YEAR(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	@RequestMapping(value="AnnounceCalenderMM.suvila")
	public @ResponseBody Map<String,Object> AnnounceCalenderMM( Map<String, Object> map
										 					   ,HttpServletRequest request
										 					   ,HttpServletResponse response){
		
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try {
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			
			storeInfo.put("list", Announcedao.SELECT_MONTH(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	@RequestMapping(value="AnnounceSelectAnc.suvila")
	public @ResponseBody Map<String,Object> AnnounceSelectAnc( Map<String, Object> map
										 						 ,HttpServletRequest request
										 						 ,HttpServletResponse response){
		
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try {
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			String V_TYPE = param.getString("V_TYPE", "");
			if("".equals(V_TYPE)) {
				storeInfo.put("list", Announcedao.ASP_ANCSELECT(param));
			}else {
				storeInfo.put("list", Announcedao.ASP_ANCSELECT_TYPE(param));
			}
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	@RequestMapping(value="AnnounceSelectTempleAnc.suvila")
	public @ResponseBody Map<String,Object> AnnounceSelectTempleAnc( Map<String, Object> map
										 						    ,HttpServletRequest request
										 						    ,HttpServletResponse response){
		
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try {
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			
			
			storeInfo.put("list", Announcedao.TEMPLE_ANCSELECT(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	@RequestMapping(value="AnnounceSelectReq.suvila")
	public @ResponseBody Map<String,Object> AnnounceSelectReq( Map<String, Object> map
										 					  ,HttpServletRequest request
										 					  ,HttpServletResponse response){
		
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try {
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			
			Map<String, Object> mapNextDay = Announcedao.getNextDay(param);
			
			
			param.put("V_P_SDATE", mapNextDay.get("DATE4").toString());
			param.put("V_P_EDATE", mapNextDay.get("DATE2").toString());
			
			param.put("V_M_SDATE", StringUtil.P2M(param.getString("V_P_SDATE")).subSequence(0, 8));
			param.put("V_M_EDATE", StringUtil.P2M(param.getString("V_P_EDATE")).subSequence(0, 8));
			
			storeInfo.put("list", Announcedao.SELECT_REQINFOVO(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	
	@RequestMapping(value="reqSave.suvila")
	public @ResponseBody Map<String,Object> reqSave( Map<String, Object> map
										 			,HttpServletRequest request
										 			,HttpServletResponse response){
		
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try {
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			param.put("V_USER_ID"   , adminSession.get("USER_ID"));
			
			
			String ds_main = StringUtil.getJosnParam(param.getString("ds_main",""));
			String ds_sms  = StringUtil.getJosnParam(param.getString("ds_sms",""));
			
			
			List<Map<String, Object>> mainList = StringUtil.jsonToArray(ds_main);
			List<Map<String, Object>> smsList  = StringUtil.jsonToArray(ds_sms);
			
			boolean dbFlag = Announcedao.reqSave(param, mainList, smsList);
			if(dbFlag){
				rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			}else{
				rtnData = StringUtil.rtnError(rtnData);
			}
			
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
}

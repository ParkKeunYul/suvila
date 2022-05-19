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
import kr.co.o2i.dao.rec.REC000P_02_01DAO;
import kr.co.o2i.dao.rec.REC003W_22DAO;
import kr.co.o2i.dao.rec.REC004W_06DAO;
import kr.co.o2i.util.LunarCalendar;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/rec/REC000P_02_01/*")
public class REC000P_02_01Controller extends DefaultController {

	
	@Autowired
	REC000P_02_01DAO REC000P_02_01dao;
	
	@Autowired
	REC004W_06DAO REC004W_06dao;
	
	@RequestMapping(value="GDprintSelect.suvila")
	public @ResponseBody Map<String,Object> GDprintSelect( Map<String, Object> map
														  ,HttpServletRequest request
														  ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try {
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			storeInfo.put("list", REC000P_02_01dao.SELECT_PRINT_GD(param));
			
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//
	
	@RequestMapping(value="IDprintSelect.suvila")
	public @ResponseBody Map<String,Object> IDprintSelect( Map<String, Object> map
														  ,HttpServletRequest request
														  ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try {
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			storeInfo.put("list", REC000P_02_01dao.SELECT_PRINT_ID(param));
			
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//
	
	@RequestMapping(value="YDprintSelect.suvila")
	public @ResponseBody Map<String,Object> YDprintSelect( Map<String, Object> map
														  ,HttpServletRequest request
														  ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try {
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			String death_YN = REC000P_02_01dao.getDeungGbn(param);
			
			List<Map<String, Object>>  list = null;
			
			if(death_YN != null && !"".equals(death_YN)) {
				
				if(death_YN.equals("F")) {
					list = REC000P_02_01dao.SELECT_PRINT_YD_LIVE(param);
				}else if(death_YN.equals("T")) {
					list = REC000P_02_01dao.SELECT_PRINT_YD_DEATH(param);
				}else {
					System.out.println("등 정보를 확인할 수 없습니다.");
				}
				
			}else {
				System.out.println("등 정보를 확인할 수 없습니다.");
			}
			
			storeInfo.put("list", list);
			
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//
	
	
	@RequestMapping(value="SAGUprintSelect.suvila")
	public @ResponseBody Map<String,Object> SAGUprintSelect( Map<String, Object> map
															,HttpServletRequest request
															,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try {
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			storeInfo.put("list", REC000P_02_01dao.SELECT_PRINT_SAGU(param));
			
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//
	
	@RequestMapping(value="SAGUprintSelect_mas.suvila")
	public @ResponseBody Map<String,Object> SAGUprintSelect_mas( Map<String, Object> map
															   ,HttpServletRequest request
															   ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try {
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			storeInfo.put("list", REC000P_02_01dao.SELECT_PRINT_SAGU_MASTER(param));
			
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	@RequestMapping(value="SAGUprintSelect_eve.suvila")
	public @ResponseBody Map<String,Object> SAGUprintSelect_eve( Map<String, Object> map
															    ,HttpServletRequest request
															    ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try {
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			storeInfo.put("list", REC000P_02_01dao.SELECT_PRINT_SAGU_EVENT(param));
			
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	@RequestMapping(value="SAGUprintSelect_dea.suvila")
	public @ResponseBody Map<String,Object> SAGUprintSelect_dea( Map<String, Object> map
															    ,HttpServletRequest request
															    ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try {
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			storeInfo.put("list", REC000P_02_01dao.SELECT_PRINT_SAGU_DEATH(param));
			
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	@RequestMapping(value="SAGUprintSelect_bok.suvila")
	public @ResponseBody Map<String,Object> SAGUprintSelect_bok( Map<String, Object> map
															    ,HttpServletRequest request
															    ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try {
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			storeInfo.put("list", REC000P_02_01dao.SELECT_PRINT_SAGU_BOKWI(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	
	
	
	
	
	
	
	@RequestMapping(value="GIJEprintSelect.suvila")
	public @ResponseBody Map<String,Object> GIJEprintSelect( Map<String, Object> map
															,HttpServletRequest request
															,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try {
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			storeInfo.put("list", REC000P_02_01dao.SELECT_PRINT_GIJE(param));
			
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//
	
	@RequestMapping(value="GIJEprintSelect_mas.suvila")
	public @ResponseBody Map<String,Object> GIJEprintSelect_eve_mas( Map<String, Object> map
															   ,HttpServletRequest request
															   ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try {
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			storeInfo.put("list", REC000P_02_01dao.SELECT_PRINT_GIJE_MASTER(param));
			
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	@RequestMapping(value="GIJEprintSelect_eve.suvila")
	public @ResponseBody Map<String,Object> GIJEprintSelect_eve_eve( Map<String, Object> map
															    ,HttpServletRequest request
															    ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try {
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			storeInfo.put("list", REC000P_02_01dao.SELECT_PRINT_GIJE_EVENT(param));
			
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	@RequestMapping(value="GIJEprintSelect_dea.suvila")
	public @ResponseBody Map<String,Object> GIJEprintSelect_eve_dea( Map<String, Object> map
															    ,HttpServletRequest request
															    ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try {
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			storeInfo.put("list", REC000P_02_01dao.SELECT_PRINT_GIJE_DEATH(param));
			
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	@RequestMapping(value="GIJEprintSelect_bok.suvila")
	public @ResponseBody Map<String,Object> GIJEprintSelect_eve_bok( Map<String, Object> map
															    ,HttpServletRequest request
															    ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try {
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			storeInfo.put("list", REC000P_02_01dao.SELECT_PRINT_GIJE_BOKWI(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	

	
	
	
	@RequestMapping(value="CDJprintSelect.suvila")
	public @ResponseBody Map<String,Object> CDJprintSelect( Map<String, Object> map
															,HttpServletRequest request
															,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try {
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			storeInfo.put("list", REC000P_02_01dao.SELECT_PRINT_CDJ(param));
			
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//
	
	@RequestMapping(value="CDJprintSelect_mas.suvila")
	public @ResponseBody Map<String,Object> CDJprintSelect_eve_mas( Map<String, Object> map
															   ,HttpServletRequest request
															   ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try {
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			storeInfo.put("list", REC000P_02_01dao.SELECT_PRINT_CDJ_MASTER(param));
			
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	@RequestMapping(value="CDJprintSelect_eve.suvila")
	public @ResponseBody Map<String,Object> CDJprintSelect_eve_eve( Map<String, Object> map
															    ,HttpServletRequest request
															    ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try {
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			storeInfo.put("list", REC000P_02_01dao.SELECT_PRINT_CDJ_EVENT(param));
			
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	@RequestMapping(value="CDJprintSelect_dea.suvila")
	public @ResponseBody Map<String,Object> CDJprintSelect_eve_dea( Map<String, Object> map
															    ,HttpServletRequest request
															    ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try {
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			storeInfo.put("list", REC000P_02_01dao.SELECT_PRINT_CDJ_DEATH(param));
			
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	@RequestMapping(value="CDJprintSelect_bok.suvila")
	public @ResponseBody Map<String,Object> CDJprintSelect_eve_bok( Map<String, Object> map
															    ,HttpServletRequest request
															    ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try {
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			storeInfo.put("list", REC000P_02_01dao.SELECT_PRINT_CDJ_BOKWI(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	@RequestMapping(value="SGDprintSelect.suvila")
	public @ResponseBody Map<String,Object> SGDprintSelect( Map<String, Object> map
														   ,HttpServletRequest request
														   ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try {
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			storeInfo.put("list", REC000P_02_01dao.SELECT_PRINT_SGD(param));
			
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//
	
	
	@RequestMapping(value="WCprintSelect.suvila")
	public @ResponseBody Map<String,Object> WCprintSelect( Map<String, Object> map
														  ,HttpServletRequest request
														  ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try {
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			storeInfo.put("list", REC000P_02_01dao.SELECT_PRINT_WC(param));
			
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//
	
	@RequestMapping(value="WCprintSelect_cc.suvila")
	public @ResponseBody Map<String,Object> WCprintSelect_cc( Map<String, Object> map
														     ,HttpServletRequest request
														     ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try {
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			storeInfo.put("list", REC004W_06dao.SELECT_CHUKWON_CHONHON(param));
			
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//
	
}

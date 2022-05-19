

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
import kr.co.o2i.dao.rec.REC001W_10DAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/rec/REC001W_10/*")
public class REC001W_10_Controller extends DefaultController {

	
	@Autowired
	REC001W_10DAO REC001W_10dao;
	
	@RequestMapping(value="Jungak.suvila")
	public @ResponseBody Map<String,Object> Jungak( Map<String, Object> map
			                                         ,HttpServletRequest request
			                                         ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			
			storeInfo.put("list", REC001W_10dao.SELECT_Jungak(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//
	
	@RequestMapping(value="Grade.suvila")
	public @ResponseBody Map<String,Object> Grade( Map<String, Object> map
			                                      ,HttpServletRequest request
			                                      ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			
			storeInfo.put("list", REC001W_10dao.select_Grade(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//
	
	@RequestMapping(value="amount.suvila")
	public @ResponseBody Map<String,Object> amount( Map<String, Object> map
			                                      ,HttpServletRequest request
			                                      ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			
			storeInfo.put("list", REC001W_10dao.selectAmount(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//
	
	
	
	@RequestMapping(value="Building")
	public @ResponseBody Map<String,Object> Building( Map<String, Object> map
			                                         ,HttpServletRequest request
			                                         ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			
			storeInfo.put("list", REC001W_10dao.SELECT_Building(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//
	
	@RequestMapping(value="SindoInfo.suvila")
	public @ResponseBody Map<String,Object> SindoInfo( Map<String, Object> map
			                                         ,HttpServletRequest request
			                                         ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			
			storeInfo.put("list", REC001W_10dao.SELECT_SindoInfo(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//


	@RequestMapping(value="process.suvila")
	public @ResponseBody Map<String,Object> process( Map<String, Object> map
			                                        ,HttpServletRequest request
			                                        ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"   , adminSession.get("USER_ID"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			
			
			System.out.println(param);
			String V_FLAG = param.getString("V_FLAG");
			boolean dbFlag = false;
			if("A".equals(V_FLAG)) {
				dbFlag = REC001W_10dao.REC_002W_10_A(param);
			}
			else if("B".equals(V_FLAG)) {
				dbFlag = REC001W_10dao.REC_002W_10_B(param);
			}
			else if("D".equals(V_FLAG)) {
				dbFlag = REC001W_10dao.REC_002W_10_D(param);
			}
			else if("C".equals(V_FLAG)) {
				dbFlag = REC001W_10dao.REC_002W_10_C(param);
			}
			
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
	}//
	
	
	@RequestMapping(value="selectPeriodInfo.suvila")
	public @ResponseBody Map<String,Object> selectPeriodInfo( Map<String, Object> map
															 ,HttpServletRequest request
															 ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			
			storeInfo.put("list", REC001W_10dao.SELECT_DEUNG_PERIOD_INFO(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//
	@RequestMapping(value="savePeriodInfo.suvila")
	public @ResponseBody Map<String,Object> savePeriodInfo( Map<String, Object> map
														   ,HttpServletRequest request
			                                               ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"   , adminSession.get("USER_ID"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			
			String uptData = param.getString("uptData","");
			List<Map<String, Object>> uptList = StringUtil.jsonToArray(uptData);
			
			
			
			
			
			boolean dbFlag = REC001W_10dao.savePeriodInfo(param , uptList);
			
			
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
	}//
}

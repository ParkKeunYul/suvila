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
import kr.co.o2i.dao.rec.REC000W_02DAO;
import kr.co.o2i.util.StringUtil;


@Controller
@RequestMapping ("/rec/REC000W_02/*")
public class REC000W_02_Controller extends DefaultController {
	
	@Autowired
	REC000W_02DAO REC000W_02DAO;
	
	
	@RequestMapping(value="selectDaeju.suvila")
	public @ResponseBody Map<String,Object> selectDaeju(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
		
		
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			/* 대주 신도 조회 */
			param.put("V_DAEJU_GBN", "Y");
			storeInfo.put("list", REC000W_02DAO.SELECT_BUDINFO(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	@RequestMapping(value="selectFamily.suvila")
	public @ResponseBody Map<String,Object> selectFamily(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			param.put("V_DAEJU_GBN", 	"N");
			
			
			
			storeInfo.put("list", REC000W_02DAO.SELECT_BUDINFO(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	@RequestMapping(value="selectSpirit.suvila")
	public @ResponseBody Map<String,Object> selectSpirit(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			/* 신도 가족 조회 */
			param.put("V_DAEJU_GBN", "N");
			param.put("V_DAEJU_GBN", "Y");
			storeInfo.put("list", REC000W_02DAO.SELECT_SPIRITINFO(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	
	@RequestMapping(value="selectRecHis.suvila")
	public @ResponseBody Map<String,Object> selectRecHis(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			System.out.println("selectRecHis = "+ param);
			
			storeInfo.put("list", REC000W_02DAO.SELECT_REC_MASTER(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	
	@RequestMapping(value="select_d.suvila")
	public @ResponseBody Map<String,Object> select_d(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
		
		/* 대주 신도 조회 */
		param.put("V_DAEJU_GBN", "Y");
		
		System.out.println(param);
		
		List<Map<String,Object> >  DAEJU_SIN  =  REC000W_02DAO.SELECT_BUDINFO(param);
		
		
		rtnData.put("msg", rtnMsg);
		rtnData.put("data", DAEJU_SIN);
		rtnData.put("success", rtnSuccess);
		
		return rtnData;
	}
	
	
	
}

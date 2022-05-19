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
import kr.co.o2i.dao.rec.REC002W_03DAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/rec/REC002W_03/*")
class REC002W_03_Controller extends DefaultController {

	
	@Autowired
	REC002W_03DAO REC002W_03dao;
	
	
	@RequestMapping(value="kindInfoGD.suvila")
	public @ResponseBody Map<String,Object> kindInfoGD( Map<String, Object> map
			                                           ,HttpServletRequest request
			                                           ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
						
			
			storeInfo.put("list", REC002W_03dao.SELECT_GDKIND(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//kindInfo
	
	@RequestMapping(value="kindInfoBS.suvila")
	public @ResponseBody Map<String,Object> kindInfoBS( Map<String, Object> map
			                                           ,HttpServletRequest request
			                                           ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
						
			
			storeInfo.put("list", REC002W_03dao.SELECT_BSKIND(param));			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//kindInfo
	
	
	@RequestMapping(value="selectGD.suvila")
	public @ResponseBody Map<String,Object> selectGD( Map<String, Object> map
			                                         ,HttpServletRequest request
			                                         ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
						
			
			
			System.out.println(param);
			
			storeInfo.put("list", REC002W_03dao.SELECT_GDREC(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//selectGD
	
	
	@RequestMapping(value="selectBS.suvila")
	public @ResponseBody Map<String,Object> selectBS( Map<String, Object> map
			                                         ,HttpServletRequest request
			                                         ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
						
			
			
			System.out.println(param);
			
			storeInfo.put("list", REC002W_03dao.SELECT_BSREC(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//selectBS
	
	@RequestMapping(value="saveGD")
	public @ResponseBody Map<String,Object> saveGD( Map<String, Object> map
												   ,HttpServletRequest request
												   ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			
			
			String uptData       				 = StringUtil.getJosnParam(param.getString("uptData",""));
			List<Map<String, Object>> uptList    = StringUtil.jsonToArray(uptData);
			
			
			boolean dbFlag = REC002W_03dao.saveGD(param, uptList);
			
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
	
}//REC002W_03_Controller 

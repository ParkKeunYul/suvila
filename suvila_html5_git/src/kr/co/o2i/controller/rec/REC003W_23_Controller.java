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
import kr.co.o2i.dao.rec.REC003W_23DAO;
import kr.co.o2i.util.LunarCalendar;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/rec/REC003W_23/*")
public class REC003W_23_Controller extends DefaultController {

	
	@Autowired
	REC003W_23DAO REC003W_23dao;
	
	@RequestMapping(value="selectSagu.suvila")
	public @ResponseBody Map<String,Object> selectSagu( Map<String, Object> map
													   ,HttpServletRequest request
													   ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try {
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			System.out.println("selectSagu = "+ param);
			
			storeInfo.put("list", REC003W_23dao.SELECT_SAGU(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	
	@RequestMapping(value="saguKind.suvila")
	public @ResponseBody Map<String,Object> saguKind( Map<String, Object> map
													 ,HttpServletRequest request
													 ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try {
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			
			
			storeInfo.put("list", REC003W_23dao.SELECT_49KIND(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	@RequestMapping(value="saguDeath.suvila")
	public @ResponseBody Map<String,Object> saguDeath( Map<String, Object> map
													  ,HttpServletRequest request
													  ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try {
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			
			
			storeInfo.put("list", REC003W_23dao.SELECT_SAGU_DEATH(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	@RequestMapping(value="saguBokwi.suvila")
	public @ResponseBody Map<String,Object> saguBokwi( Map<String, Object> map
													  ,HttpServletRequest request
													  ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try {
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			
			
			storeInfo.put("list", REC003W_23dao.SELECT_SAGU_BOK(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	
	@RequestMapping(value="saveSaguJaeKind.suvila")
	public @ResponseBody Map<String,Object> saveSaguJaeKind( Map<String, Object> map
												 		 	,HttpServletRequest request
												 		 	,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			
			String uptData        = StringUtil.getJosnParam(param.getString("uptData",""));
			
			List<Map<String, Object>> uptList      = StringUtil.jsonToArray(uptData);
			
			boolean dbFlag =  REC003W_23dao.saveSaguJaeKind(param, uptList);
			
			
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
	
	@RequestMapping(value="saveYoungga.suvila")
	public @ResponseBody Map<String,Object> saveYoungga( Map<String, Object> map
												 		,HttpServletRequest request
												 		,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			
			String uptData        = StringUtil.getJosnParam(param.getString("uptData",""));
			
			List<Map<String, Object>> uptList      = StringUtil.jsonToArray(uptData);
			
			boolean dbFlag =  REC003W_23dao.saveYoungga(param, uptList);
			
			
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
	
	@RequestMapping(value="saveBokwi.suvila")
	public @ResponseBody Map<String,Object> saveBokwi( Map<String, Object> map
												 	  ,HttpServletRequest request
												 	  ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			
			String newData        = StringUtil.getJosnParam(param.getString("newData",""));
			
			List<Map<String, Object>> addList      = StringUtil.jsonToArray(newData);
			
			boolean dbFlag =  REC003W_23dao.saveBokwi(param,addList);
			
			
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
	
	
	
	/*@RequestMapping(value="save")
	public @ResponseBody Map<String,Object> save( Map<String, Object> map
												 ,HttpServletRequest request
												 ,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			String ds_saguJae        = StringUtil.getJosnParam(param.getString("ds_saguJae",""));
			String ds_saguJaeSpirit  = StringUtil.getJosnParam(param.getString("ds_saguJaeSpirit",""));
			String ds_saguJaeBokwi   = StringUtil.getJosnParam(param.getString("ds_saguJaeBokwi",""));
			String ds_saguJaeKind    = StringUtil.getJosnParam(param.getString("ds_saguJaeKind",""));
			String ds_acceptRecAmt   = StringUtil.getJosnParam(param.getString("ds_acceptRecAmt",""));
			String ds_sms            = StringUtil.getJosnParam(param.getString("ds_sms",""));
			String ds_pgCardInfo     = StringUtil.getJosnParam(param.getString("ds_pgCardInfo",""));
			
			
			
			List<Map<String, Object>> ds_saguJaeList        = StringUtil.jsonToArray(ds_saguJae);
			List<Map<String, Object>> ds_saguJaeSpiritList  = StringUtil.jsonToArray(ds_saguJaeSpirit);
			List<Map<String, Object>> ds_saguJaeBokwiList   = StringUtil.jsonToArray(ds_saguJaeBokwi);
			List<Map<String, Object>> ds_saguJaeKindList    = StringUtil.jsonToArray(ds_saguJaeKind);			
			List<Map<String, Object>> accList               = StringUtil.jsonToArray(ds_acceptRecAmt);
			List<Map<String, Object>> smsList               = StringUtil.jsonToArray(ds_sms);
			List<Map<String, Object>> cardList              = StringUtil.jsonToArray(ds_pgCardInfo);
			
			
			boolean dbFlag = REC003W_22dao.save( param
												,ds_saguJaeList
												,ds_saguJaeSpiritList
												,ds_saguJaeBokwiList
												,ds_saguJaeKindList
												,accList.get(0)
												,smsList
												,cardList);
			
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
	}*/
	
}

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
import kr.co.o2i.dao.rec.REC004W_02DAO;
import kr.co.o2i.util.LunarCalendar;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/rec/REC004W_02/*")
public class REC004W_02_Controller extends DefaultController {

	
	@Autowired
	REC004W_02DAO REC004W_02dao;
	
	@RequestMapping(value="kindInfo.suvila")
	public @ResponseBody Map<String,Object> kindInfo( Map<String, Object> map
													 ,HttpServletRequest request
													 ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try {
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			storeInfo.put("list", REC004W_02dao.SELECT_WEPAEKIND(param));
			System.out.println(storeInfo);
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	
	@RequestMapping(value="kindDateInfo.suvila")
	public @ResponseBody Map<String,Object> kindDateInfo( Map<String, Object> map
													   ,HttpServletRequest request
													   ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try {
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			
			storeInfo.put("list", REC004W_02dao.SELECT_WEPAEKINDDATE(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	
	@RequestMapping(value="save")
	public @ResponseBody Map<String,Object> save( Map<String, Object> map
												 ,HttpServletRequest request
												 ,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			String ds_detail         = StringUtil.getJosnParam(param.getString("ds_detail",""));
			String ds_dongChamJa     = StringUtil.getJosnParam(param.getString("ds_dongChamJa",""));
			String ds_acceptRecAmt   = StringUtil.getJosnParam(param.getString("ds_acceptRecAmt",""));
			String ds_sms            = StringUtil.getJosnParam(param.getString("ds_sms",""));
			String ds_pgCardInfo     = StringUtil.getJosnParam(param.getString("ds_pgCardInfo",""));
			
			
			
			List<Map<String, Object>> ds_detailList         = StringUtil.jsonToArray(ds_detail);
			List<Map<String, Object>> ds_dongChamJaList     = StringUtil.jsonToArray(ds_dongChamJa);
			List<Map<String, Object>> accList               = StringUtil.jsonToArray(ds_acceptRecAmt);
			List<Map<String, Object>> smsList               = StringUtil.jsonToArray(ds_sms);
			List<Map<String, Object>> cardList              = StringUtil.jsonToArray(ds_pgCardInfo);
			
			
			boolean dbFlag = REC004W_02dao.save( param
												,ds_detailList
												,ds_dongChamJaList
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
	}
	
}

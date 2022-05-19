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
import kr.co.o2i.dao.rec.REC003W_32DAO;
import kr.co.o2i.util.LunarCalendar;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/rec/REC003W_32/*")
public class REC003W_32_Controller extends DefaultController {

	
	@Autowired
	REC003W_32DAO REC003W_32dao;
	
	
	
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
			
			String ds_giJae        = StringUtil.getJosnParam(param.getString("ds_giJae",""));
			String ds_giJaeSpirit  = StringUtil.getJosnParam(param.getString("ds_giJaeSpirit",""));
			String ds_giJaeBokwi   = StringUtil.getJosnParam(param.getString("ds_giJaeBokwi",""));
			String ds_acceptRecAmt   = StringUtil.getJosnParam(param.getString("ds_acceptRecAmt",""));
			String ds_sms            = StringUtil.getJosnParam(param.getString("ds_sms",""));
			String ds_pgCardInfo     = StringUtil.getJosnParam(param.getString("ds_pgCardInfo",""));
			
			
			
			List<Map<String, Object>> ds_giJaeList        = StringUtil.jsonToArray(ds_giJae);
			List<Map<String, Object>> ds_giJaeSpiritList  = StringUtil.jsonToArray(ds_giJaeSpirit);
			List<Map<String, Object>> ds_giJaeBokwiList   = StringUtil.jsonToArray(ds_giJaeBokwi);
			List<Map<String, Object>> accList               = StringUtil.jsonToArray(ds_acceptRecAmt);
			List<Map<String, Object>> smsList               = StringUtil.jsonToArray(ds_sms);
			List<Map<String, Object>> cardList              = StringUtil.jsonToArray(ds_pgCardInfo);
			
			
			boolean dbFlag = REC003W_32dao.save( param
												,ds_giJaeList
												,ds_giJaeSpiritList
												,ds_giJaeBokwiList
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

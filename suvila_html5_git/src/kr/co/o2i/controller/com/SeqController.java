package kr.co.o2i.controller.com;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.o2i.dao.com.SeqDAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/asp/seq/*")
public class SeqController extends DefaultController {

	
	@Autowired
	SeqDAO seqDAO;
	
	@RequestMapping(value="sysdate.suvila")
	public @ResponseBody Map<String,Object> ComCode( Map<String, Object> map
													,HttpServletRequest request
													,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			param.put("V_DATE"     ,  param.getString("V_DATE" , "0") );
			param.put("V_STAN_DAY" ,  param.getString("V_STAN_DAY" , "00000000") );
			param.put("V_AFTER_DAY",  param.getString("V_DATE" , "0") );
			
			storeInfo.put("list", seqDAO.SELECT_SYS_DATE(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
}

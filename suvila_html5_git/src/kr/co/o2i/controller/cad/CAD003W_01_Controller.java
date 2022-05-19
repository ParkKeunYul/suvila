package kr.co.o2i.controller.cad;

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
import kr.co.o2i.util.DateTimeUtil;
import kr.co.o2i.util.StringUtil;
import kr.co.o2i.dao.cad.CAD002W_01DAO;
import kr.co.o2i.dao.cad.CAD003W_01DAO;

@Controller
@RequestMapping ("/cad/CAD003W_01/*")
public class CAD003W_01_Controller extends DefaultController {

	@Autowired
	CAD003W_01DAO CAD003W_01dao;
	
	
	
	
	@RequestMapping(value="save.suvila")
	public @ResponseBody Map<String,Object> save(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			
			
			
			String newData = param.getString("newData");
			
			List<Map<String, Object>> newList = StringUtil.jsonToArray(newData);
			System.out.println("newList = "+ newList.size());
			
			String V_TR_MSGTYPE = param.getString("TR_MSGTYPE");
			boolean sendStat    = true;
			
			if("1".equals(V_TR_MSGTYPE)){
				int V_TR_SENDDATE = param.getInt("TR_SENDDATE");
				int V_TR_SENDTIME = param.getInt("TR_SENDTIME");
				int now           = Integer.parseInt(DateTimeUtil.getDate("yyyyMMdd"));
				
				if( V_TR_SENDDATE <  now){
					sendStat = false;
					
					rtnData = StringUtil.rtnError(rtnData , "예약일은 오늘보다 작을수 없습니다.");
				}
				else if(V_TR_SENDDATE == now ){
					if(V_TR_SENDTIME <= Integer.parseInt(DateTimeUtil.getDate("HHmm"))){
						sendStat = false;
						rtnData = StringUtil.rtnError(rtnData , "예약시간은 현재시간보다 작을수 없습니다.");
					}
				}
			}
			
			System.out.println("sendStat = "+ sendStat);
			
			if(sendStat){
				boolean dbFlag =   CAD003W_01dao.save(param, newList);
				if(dbFlag){
					rtnData = StringUtil.rtnSucMsg(rtnData, "발송되었습니다.");
				}else{
					rtnData = StringUtil.rtnError(rtnData);
				}
			}// if sendStat
			
			
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		
		return rtnData;
	}
	
	
	
	
}//CAD003W_01_Controller

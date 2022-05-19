package kr.co.o2i.controller.pgc;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.o2i.controller.com.DefaultController;
import kr.co.o2i.dao.pgc.PGC002w_01DAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/pgc/PGC002W_01/*")
public class PGC002w_01_Controller extends DefaultController {

	@Autowired
	PGC002w_01DAO PGC002w_01dao;
	
	@RequestMapping(value="select.suvila")
	public @ResponseBody Map<String,Object> select(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			param.put("TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			
			
			
			storeInfo.put("list", PGC002w_01dao.SELECT_PG_CARD_APPROVAL_MAIN(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	@RequestMapping(value="selectDetail.suvila")
	public @ResponseBody Map<String,Object> selectDetail(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			param.put("TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			
			
			
			storeInfo.put("list", PGC002w_01dao.SELECT_PG_CARD_APPROVAL_DETAIL(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
}

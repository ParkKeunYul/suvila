package kr.co.o2i.controller.rec;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.o2i.controller.com.DefaultController;
import kr.co.o2i.dao.rec.REC002W_10DAO;

@Controller
@RequestMapping ("/rec/REC002W_010/*")
public class REC002W_10_Controller extends DefaultController {

	
	@Autowired
	REC002W_10DAO REC002W_10dao;
	
	
	/* 전각코드 */
	@RequestMapping(value="Jungak.suvila")
	public @ResponseBody Map<String,Object> Jungak(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
		
		
		param.put("V_ACCEPT_GBN", 2);
		
		List<Map<String,Object> >  SELECT_Jungak  =  REC002W_10dao.SELECT_Jungak(param);
		
		rtnData.put("msg", rtnMsg);
		rtnData.put("data", SELECT_Jungak);
		rtnData.put("success", rtnSuccess);
		
		return rtnData;
	}
	
	/* 등급 */
	@RequestMapping(value="Grade.suvila")
	public @ResponseBody Map<String,Object> Grade(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
		
		
		param.put("V_ACCEPT_GBN", 2);
		
		List<Map<String,Object> >  SELECT_Grade  =  REC002W_10dao.SELECT_Grade(param);
		
		rtnData.put("msg", rtnMsg);
		rtnData.put("data", SELECT_Grade);
		rtnData.put("success", rtnSuccess);
		
		return rtnData;
	}
	
	
	/* 금액관리 조회 */	
	@RequestMapping(value="amount.suvila")
	public @ResponseBody Map<String,Object> amount(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
		param.put("V_ACCEPT_GBN", 2);
		param.put("V_LIGHT_CODE", 8502);
		
		List<Map<String,Object> >  SELECT_REC_DEUNG_PRICE_MGT  =  REC002W_10dao.SELECT_REC_DEUNG_PRICE_MGT(param);
		
		rtnData.put("msg", rtnMsg);
		rtnData.put("data", SELECT_REC_DEUNG_PRICE_MGT);
		rtnData.put("success", rtnSuccess);
		
		return rtnData;
	}
	
	/* 등번호정보 ( Data ) */
	@RequestMapping(value="Deung.suvila")
	public @ResponseBody Map<String,Object> Deung(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
		
		param.put("V_ACCEPT_GBN", 2);
		param.put("V_LIGHT_CODE", 8502);
		param.put("V_JUNGAK_CD", 8722);
		
		List<Map<String,Object> >  SELECT_Deng_NEW  =  REC002W_10dao.SELECT_Deng_NEW(param);
		
		rtnData.put("msg", rtnMsg);
		rtnData.put("data", SELECT_Deng_NEW);
		rtnData.put("success", rtnSuccess);
		
		return rtnData;
	}
	
	
	/* 등번호 신도정보 */
	@RequestMapping(value="SindoInfo.suvila")
	public @ResponseBody Map<String,Object> SindoInfo(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
		
		param.put("V_ACCEPT_GBN", 2);
		param.put("V_LIGHT_CODE", 8502);
		param.put("V_JUNGAK_CD", 8722);
		param.put("V_LIGHT_NO", 1);
		
		
		List<Map<String,Object> >  SELECT_SindoInfo  =  REC002W_10dao.SELECT_SindoInfo(param);
		
		rtnData.put("msg", rtnMsg);
		rtnData.put("data", SELECT_SindoInfo);
		rtnData.put("success", rtnSuccess);
		
		return rtnData;
	}
	
	
	/* 등번호관리 ( 행 열관리 )  */
	@RequestMapping(value="Building.suvila")
	public @ResponseBody Map<String,Object> Building(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
		
		param.put("V_ACCEPT_GBN", 2);
		param.put("V_LIGHT_CODE", 8502);
		param.put("V_JUNGAK_CD", 8722);
		param.put("V_LIGHT_NO", 1);
		
		
		List<Map<String,Object> >  SELECT_Building  =  REC002W_10dao.SELECT_Building(param);
		
		rtnData.put("msg", rtnMsg);
		rtnData.put("data", SELECT_Building);
		rtnData.put("success", rtnSuccess);
		
		return rtnData;
	}
	
	
	
	
	
	
	
	
}

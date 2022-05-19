package kr.co.o2i.controller.sin;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.o2i.controller.com.DefaultController;
import kr.co.o2i.dao.sin.SIN001W_01DAO;

@Controller
@RequestMapping ("/sin/sin016w_01/*")
public class Sin016w_01_Controller extends DefaultController{
	

	@Autowired
	SIN001W_01DAO Sin001w_01dao;
	
	
	@RequestMapping(value="selectSindoCardNew.suvila")
	public @ResponseBody Map<String,Object> selectSindoCardNew(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
		
		System.out.println(param);
		
		List<Map<String,Object>> SELECT_SIN_CARD_MASTER = Sin001w_01dao.SELECT_SIN_CARD_MASTER(param);
		
		
		rtnData.put("msg", rtnMsg);
		rtnData.put("data", SELECT_SIN_CARD_MASTER);
		rtnData.put("success", rtnSuccess);
		
		return rtnData;
	}
	
}

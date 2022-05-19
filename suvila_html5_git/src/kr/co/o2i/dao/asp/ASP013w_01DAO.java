package kr.co.o2i.dao.asp;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import kr.co.o2i.util.CommonMap;

public interface ASP013w_01DAO {
	public List<Map<String, Object>> SELECT_SMS(@Param("param")CommonMap param);
	public List<Map<String, Object>> SELECT_SMS_SUMMARY(@Param("param")CommonMap param);
	
	public List<Map<String, Object>> SELECT_CMS(@Param("param")CommonMap param);
	
}

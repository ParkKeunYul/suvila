package kr.co.o2i.dao.asp;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import kr.co.o2i.util.CommonMap;

public interface ASP014w_01DAO {

	public  List<Map<String,Object>> SELECT_LOGIN_LOG(@Param("param")CommonMap param);
}

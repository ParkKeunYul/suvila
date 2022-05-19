package kr.co.o2i.dao.asp;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import kr.co.o2i.util.CommonMap;

public interface ASP007w_01DAO {

	/*달력 조회*/
	public  List<Map<String,Object>> SELECT_USER(@Param("param")CommonMap param);
}

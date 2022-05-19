package kr.co.o2i.dao.asp;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import kr.co.o2i.util.CommonMap;

public interface ASP022w_02DAO {

	public  List<Map<String,Object>> SELECT_PG_CARD_COMMISSION(@Param("param")CommonMap param);
}

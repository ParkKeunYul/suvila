package kr.co.o2i.dao.pgc;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import kr.co.o2i.dao.DefaultDAO;
import kr.co.o2i.handler.Result;
import kr.co.o2i.util.CommonMap;

public interface PGC001w_01DAO  {
	
	
	public  List<Map<String,Object>> SELECT_TEMPLE_PG_INFO(@Param("param")CommonMap param);
	
	public  List<Map<String,Object>> SELECT_TEMPLE_PG_INFO_HIS(@Param("param")CommonMap param);
	
	public  List<Map<String,Object>> SELECT_PG_CARD_USE(@Param("param")CommonMap param);

	public  void UPDATE_TEMPLE_PG_INFO(@Param("param")CommonMap param);
}

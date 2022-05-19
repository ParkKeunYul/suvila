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

public interface PGC002w_01DAO  {
	
	
	public  List<Map<String,Object>> SELECT_PG_CARD_APPROVAL_MAIN(@Param("param")CommonMap param);
	
	public  List<Map<String,Object>> SELECT_PG_CARD_APPROVAL_DETAIL(@Param("param")CommonMap param);
	
}

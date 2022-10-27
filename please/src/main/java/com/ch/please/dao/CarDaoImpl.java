package com.ch.please.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ch.please.model.Car;
@Repository
public class CarDaoImpl implements CarDao{
	@Autowired
	private SqlSessionTemplate sst;

	public int getTotal(Car car) {
		return sst.selectOne("carns.getTotal", car);
	}
	public List<Car> list(Car car) {
		return sst.selectList("carns.list", car);
	}
}

package com.ch.please.dao;

import java.util.List;

import com.ch.please.model.Car;

public interface CarDao {

	int getTotal(Car car);

	List<Car> list(Car car);

}

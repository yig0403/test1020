package com.ch.please.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ch.please.dao.CarDao;
import com.ch.please.model.Car;

@Service
public class CarServiceImpl implements CarService {
	@Autowired
	private CarDao cd;

	public int getTotal(Car car) {
		return cd.getTotal(car);
	}

	public List<Car> list(Car car) {
		return cd.list(car);
	}

}

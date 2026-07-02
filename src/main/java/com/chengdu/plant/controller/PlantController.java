package com.chengdu.plant.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.chengdu.plant.entity.Plant;
import com.chengdu.plant.mapper.PlantMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/plant")
public class PlantController {

    @Autowired
    PlantMapper plantMapper;

    @RequestMapping("/health")
    @ResponseBody
    public Map<String, Object> health() {
        Map<String, Object> result = new HashMap<>();
        result.put("status", "ok");
        try {
            result.put("categoryCount", plantMapper.getCategory());
            result.put("database", "ok");
        } catch (Exception e) {
            result.put("database", "error");
            result.put("error", e.getClass().getName());
            result.put("message", e.getMessage());
        }
        return result;
    }

    @RequestMapping("/getAllPlants")
    @ResponseBody
    public List<Plant> getAllPlants() {
        return plantMapper.getAllPlants();
    }

    @RequestMapping("/getCategorys")
    @ResponseBody
    public int getCategorys() {
        return plantMapper.getCategory();
    }

    @RequestMapping("/getAllPlantsPages")
    @ResponseBody
    public Page<Plant> getAllPlantsPages(Integer pages) {
        Page<Plant> page = new Page<>(pages, 10);
        return plantMapper.selectPageVo(page);
    }

    @RequestMapping("/getPlantsByName")
    @ResponseBody
    public List<Plant> getPlantsByName(String name) {
        return plantMapper.getPlantsByName(name);
    }

    @RequestMapping("/getAllPlantsPagesByName")
    @ResponseBody
    public Page<Plant> getAllPlantsPages(Integer pages, String name) {
        Page<Plant> page = new Page<>(pages, 10);
        return plantMapper.selectPageVoByName(page, name);
    }

    @RequestMapping("/getPlantsById")
    @ResponseBody
    public List<Plant> getPlantsById(Integer id) {
        return plantMapper.getPlantsById(id);
    }

    @RequestMapping("/getTingsuiPlants")
    @ResponseBody
    public Page<Plant> getTingsuiPlants(Integer pages) {
        Page<Plant> page = new Page<>(pages, 10);
        return plantMapper.getTingsuiPlants(page);
    }

    @RequestMapping("/getFuyePlants")
    @ResponseBody
    public Page<Plant> getFuyePlants(Integer pages) {
        Page<Plant> page = new Page<>(pages, 10);
        return plantMapper.getFuyePlants(page);
    }

    @RequestMapping("/getPiaofuPlants")
    @ResponseBody
    public Page<Plant> getPiaofuPlants(Integer pages) {
        Page<Plant> page = new Page<>(pages, 10);
        return plantMapper.getPiaofuPlants(page);
    }

    @RequestMapping("/getCengsuiPlants")
    @ResponseBody
    public Page<Plant> getCengsuiPlants(Integer pages) {
        Page<Plant> page = new Page<>(pages, 10);
        return plantMapper.getCengsuiPlants(page);
    }

    @RequestMapping("/getShishengPlants")
    @ResponseBody
    public Page<Plant> getShishengPlants(Integer pages) {
        Page<Plant> page = new Page<>(pages, 10);
        return plantMapper.getShishengPlants(page);
    }

    @RequestMapping("/selectPageVoMultiCondition")
    @ResponseBody
    public Page<Plant> selectPageVoMultiCondition(Integer pages, String name, String men, String gang, String mu, String ke, String shu, String zhong) {
        Page<Plant> page = new Page<>(pages, 10);
        return plantMapper.selectPageVoMultiCondition(page, name, men, gang, mu, ke, shu, zhong);
    }
}

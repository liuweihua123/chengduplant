package com.chengdu.plant.controller;


import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.chengdu.plant.entity.Plant;
import com.chengdu.plant.mapper.PlantMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author liuweihua
 * @since 2023-07-24
 */
@RestController
@RequestMapping("/plant")
public class PlantController {


    @Autowired
    PlantMapper plantMapper;

    //获取所有植物数据
    @RequestMapping("/getAllPlants")
    @ResponseBody
    public List<Plant> getAllPlants() {
        List<Plant> plants=plantMapper.getAllPlants();
        return plants;
    }
    //获取植物种类数值
    @RequestMapping("/getCategorys")
    @ResponseBody
    public int getCategorys() {
        int leibie=plantMapper.getCategory();
        return leibie;
    }

    //分页查询所有植物数据
    @RequestMapping("/getAllPlantsPages")
    @ResponseBody
    public Page<Plant> getAllPlantsPages(Integer pages) {
        Page<Plant> page=new Page<>(pages,10); //pages代表想回去哪一页，size表示一页内容多少条
        Page<Plant> page_content=plantMapper.selectPageVo(page);
        return page_content;
    }

    //根据植物名称查询植物
    @RequestMapping("/getPlantsByName")
    @ResponseBody
    public List<Plant> getPlantsByName(String name) {
        List<Plant> plants=plantMapper.getPlantsByName(name);
        return plants;
    }

    //分页根据名字模糊查询所有植物数据
    @RequestMapping("/getAllPlantsPagesByName")
    @ResponseBody
    public Page<Plant> getAllPlantsPages(Integer pages,String name) {
        Page<Plant> page=new Page<>(pages,10); //pages代表想回去哪一页，size表示一页内容多少条
        Page<Plant> page_content=plantMapper.selectPageVoByName(page,name);
        return page_content;
    }

    //根据id查询植物
    @RequestMapping("/getPlantsById")
    @ResponseBody
    public List<Plant> getPlantsById(Integer id) {
        List<Plant> plants=plantMapper.getPlantsById(id);
        return plants;
    }

    //获取挺水植物
    @RequestMapping("/getTingsuiPlants")
    @ResponseBody
    public Page<Plant> getTingsuiPlants(Integer pages) {
        Page<Plant> page=new Page<>(pages,10); //pages代表想回去哪一页，size表示一页内容多少条
        Page<Plant> page_content=plantMapper.getTingsuiPlants(page);
        return page_content;
    }
    //获取浮叶植物
    @RequestMapping("/getFuyePlants")
    @ResponseBody
    public Page<Plant> getFuyePlants(Integer pages) {
        Page<Plant> page=new Page<>(pages,10); //pages代表想回去哪一页，size表示一页内容多少条
        Page<Plant> page_content=plantMapper.getFuyePlants(page);
        return page_content;
    }
    //获取漂浮植物
    @RequestMapping("/getPiaofuPlants")
    @ResponseBody
    public Page<Plant> getPiaofuPlants(Integer pages) {
        Page<Plant> page=new Page<>(pages,10); //pages代表想回去哪一页，size表示一页内容多少条
        Page<Plant> page_content=plantMapper.getPiaofuPlants(page);
        return page_content;
    }
    //获取沉水植物
    @RequestMapping("/getCengsuiPlants")
    @ResponseBody
    public Page<Plant> getCengsuiPlants(Integer pages) {
        Page<Plant> page=new Page<>(pages,10); //pages代表想回去哪一页，size表示一页内容多少条
        Page<Plant> page_content=plantMapper.getCengsuiPlants(page);
        return page_content;
    }
    //获取湿生植物
    @RequestMapping("/getShishengPlants")
    @ResponseBody
    public Page<Plant> getShishengPlants(Integer pages) {
        Page<Plant> page=new Page<>(pages,10); //pages代表想回去哪一页，size表示一页内容多少条
        Page<Plant> page_content=plantMapper.getShishengPlants(page);
        return page_content;
    }

    //多条件查询
    @RequestMapping("/selectPageVoMultiCondition")
    @ResponseBody
    public Page<Plant> selectPageVoMultiCondition(Integer pages,String name,String men,String gang,String mu,String ke,String shu,String zhong) {
        Page<Plant> page=new Page<>(pages,10); //pages代表想回去哪一页，size表示一页内容多少条
        Page<Plant> page_content=plantMapper.selectPageVoMultiCondition(page,name,men,gang,mu,ke,shu,zhong);
        return page_content;
    }
}

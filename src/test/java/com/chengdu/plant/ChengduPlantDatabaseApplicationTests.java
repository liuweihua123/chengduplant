package com.chengdu.plant;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.chengdu.plant.entity.Plant;
import com.chengdu.plant.mapper.PlantMapper;
import com.chengdu.plant.service.PlantService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
class ChengduPlantDatabaseApplicationTests {

    @Autowired
    PlantMapper plantMapper;

    @Autowired
    PlantService plantService;
    @Test
    void contextLoads() {
        List<Plant> list=plantMapper.getPlantsByName("西");
        System.out.println(list);
    }

    @Test
    void test02(){
        //测试自定义分页
        Page<Plant> page=new Page<>(1,3);
        Page<Plant> page2=plantMapper.selectPageVo(page);

        System.out.println(page);//获取当前页数据 3条记录
//        System.out.println(page.getSize());//获取每页的条数 3
//        System.out.println(page.getCurrent()); //获取当前页码 1
//        System.out.println(page.getPages());//获取总页数 2
//        System.out.println(page.getTotal());//获取总记录数 4
//        System.out.println(page.hasNext());//获取有没有下一页 true
//        System.out.println(page.hasPrevious());//获取是否有上一页 false
    }

}

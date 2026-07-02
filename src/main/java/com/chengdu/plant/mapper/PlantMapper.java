package com.chengdu.plant.mapper;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.chengdu.plant.entity.Plant;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author liuweihua
 * @since 2023-07-24
 */
@Mapper
public interface PlantMapper extends BaseMapper<Plant> {

    List<Plant> getAllPlants();
    int getCategory();
    List<Plant> getPlantsByName(String name);
    List<Plant> getPlantsById(Integer id);
    Page<Plant> getTingsuiPlants(@Param("page") Page<Plant> page);
    Page<Plant> getFuyePlants(@Param("page") Page<Plant> page);
    Page<Plant> getPiaofuPlants(@Param("page") Page<Plant> page);
    Page<Plant> getCengsuiPlants(@Param("page") Page<Plant> page);
    Page<Plant> getShishengPlants(@Param("page") Page<Plant> page);
    Page<Plant> selectPageVo(@Param("page") Page<Plant> page);
    Page<Plant> selectPageVoByName(@Param("page") Page<Plant> page,String name);
    Page<Plant> selectPageVoMultiCondition(@Param("page") Page<Plant> page,String name,String men,String gang,String mu,String ke,String shu,String zhong);

}

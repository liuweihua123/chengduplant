package com.chengdu.plant.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

/**
 * <p>
 * 
 * </p>
 *
 * @author liuweihua
 * @since 2023-07-24
 */
@Getter
@Setter
@Accessors(chain = true)
@TableName("plant")
@ApiModel(value = "Plant对象", description = "")
public class Plant implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    @TableField("name")
    private String name;

    @TableField("nickname")
    private String nickname;

    @TableField("latinname")
    private String latinname;

    @TableField("men")
    private String men;

    @TableField("gang")
    private String gang;

    @TableField("mu")
    private String mu;

    @TableField("ke")
    private String ke;

    @TableField("shu")
    private String shu;

    @TableField("zhong")
    private String zhong;

    @TableField("category")
    private String category;

    @TableField("morphology")
    private String morphology;

    @TableField("environment")
    private String environment;

    @TableField("patronize")
    private String patronize;

    @TableField("propagate")
    private String propagate;

    @TableField("pestcontrol")
    private String pestcontrol;

    @TableField("anthesis")
    private String anthesis;

    @TableField("distributions")
    private String distributions;

    @TableField("usage")
    private String usage;

    @TableField("imgurl")
    private String imgurl;

    @TableField("leibie")
    private String leibie;


}

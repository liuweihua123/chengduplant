package com.chengdu.plant.controller;

import com.chengdu.plant.entity.Plant;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.wltea.analyzer.IKSegmentation;
import org.wltea.analyzer.Lexeme;

import java.io.IOException;
import java.io.StringReader;
import java.util.List;

@RestController
@RequestMapping("/ik")
public class IKController {
    @RequestMapping("/getCutWords")
    @ResponseBody
    public String getCutWords(String words) {
        String str = words;
        IKSegmentation ikSeg = new IKSegmentation(new StringReader(str) , false);
        try {
            Lexeme l = null;
            while( (l = ikSeg.next()) != null){
                System.out.println(l);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return str;
    }
}

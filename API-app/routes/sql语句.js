<?php
//增加：
//插入数据关键字是INSERT  INTO 表名（字段一，字段二，字段三） VALUES（值一，值二，值三）；（字段是不需要加引号的，值如果是字符串需要加引号，关键字可以小写，但一般不用）；
//INSERT INTO product (name,price,type) VALUES ("樱桃",88,"fruit");
//删除：
//DELETE FROM 表名 WHERE 条件语句；
//修改（更新）:
//UPDATE 表名 SET  字段=“值”  WHERE  条件语句
//UPDATE runoob_tbl SET runoob_title='学习 C++' WHERE runoob_id=3;
//查询：
//SELECT * FROM 表名 WHERE 条件语句；
//* 代表所有字段;不给*可以指定字段，直接给字段名称，多个字段用逗号隔开;如果要统计查询出来的数据数量就用COUNT关键字来统计 COUNT(*)  COUNT(name)
//SELECT * FROM `phone` WHERE price >= 3000 
//条件语句：比较运算符，IN()关键字(某个字段在指定的值里面)，NOT IN （某个字段不在指定的值里面）
//BETWEEN 值1 AND 值2 ， 条件语句在值1和值2之间 
//SELECT * FROM `phone` WHERE id IN (1,8,9);
//根据条件进行排序：ORDER BY 字段 顺序(正序(ASC)和倒序(DESC)),不需要加WHERE
//SELECT * FROM `phone` ORDER BY price DESC 
//SELECT * FROM `phone` WHERE price >= 3000 ORDER BY price DESC 


//限制语句：LIMIT 值1，值2；(值不能用括号括起来)（值1：从值1开始查询，不包含值1，值2是查询的个数）
//限制语句要放在最后
//SELECT * FROM `phone` LIMIT 3,3 
//SELECT * FROM `phone` ORDER BY price DESC LIMIT 3,2 
//检索前5个记录行  SELECT * FROM phone LIMIT 5; 
//限制语句主要用来做分页：已知：1.每一页显示的条数 （例子：条数2）2.当前页数（例子：当前页3）；             
//数据=LIMIT (当前页-1)*条数，条数
//模糊查询  LIKE 前面和后面要加%
//SELECT * FROM `phone` WHERE name LIKE "o%" ;
//SELECT name,price FROM `phone` WHERE name LIKE "%e%" ORDER BY price DESC ;
//SELECT name,price FROM `phone` WHERE name LIKE "%e%" AND id>3 ORDER BY price DESC ;
//SELECT * FROM product WHERE price >= 5 AND name LIKE "%a%" ;
//关联查询(联表查询) ：
//关键字 JOIN ON,这种是内联，跟INNER JOIN ON是一样的
//SELECT * FROM phone JOIN product ON phone.id=product.id 
//左关联：LEFT JOIN ON，以左边的表为主表
//SELECT * FROM phone LEFT JOIN product ON phone.id=product.id;
//右关联：RIGHT JOIN ON,以右边的表为主表
 //SELECT * FROM phone RIGHT JOIN product ON phone.id=product.id
 //关键字：AS
 //SELECT * FROM phone AS ph RIGHT JOIN product AS pr ON ph.id=pr.id;  

?>
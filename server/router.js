const express = require('express');
const mysql = require('mysql');
const common = require('../libs/common');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'myigou'
});

module.exports = () => {
    const route = express.Router();
    const getHomeStr = `SELECT product_id,product_name,product_price,product_img_url,product_uprice FROM product`;
    const getCateNames = `SELECT * FROM category ORDER BY category_id desc`;

    route.get('/home', (req, res) => {
        getHomeDatas(getHomeStr, res);
    });

    function getHomeDatas(getHomeStr, res) {
        db.query(getHomeStr, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send('no datas').end();
            } else {
                res.send(data);
            }
        })
    }

    route.get('/category', (req, res) => {
        getCateNamesDatas(getCateNames, res);
    });

    function getCateNamesDatas(getCateNames, res) {
        db.query(getCateNames, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send('no datas').end();
            } else {
                res.send(data);
            }
        });
    }


    route.get('/categorygoods', (req, res) => {
        let mId = req.query.mId;
        const sql = `SELECT * FROM product,category WHRER product.category_id=category.category_id and category.category_id='${mId}'`;
        getCateGoods(sql, res);
    })

    function getCateGoods(sql, res) {
        db.query(sql, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send('database err').end();
            } else {
                if (data.length == 0) {
                    res.status(500).send('no datas').end();
                } else {
                    res.send(data);
                }
            }
        });
    }

    route.get('/detail', (req, res) => {
        let produId = req.query.mId;
        const imagesStr = `select image_url from product_image where product_id='${produId}'`;
        const productStr = `select * from product where product_id='${produId}'`;
        let detailDatas = [];
        db.query(imagesStr, (err, res) => {
            if (err) {
                console.log(err);
                res.status(500).send('database err').end();
            } else {
                detailDatas.push(data);
                res.send(detailDatas);
            }
        })
    });

    route.get('/cart', (req, res) => {
        const cartStr = `select cart_id,user.user_id,product.product_id,product_name,product_uprice,product_img_url,goods_num,product_num,shop_name from product,user,goods_cart,shop where product.product_id=goods_cart.product_id and user.user_id=goods_cart.user_id and shop.shop_id=product.shop_id`;

        db.query(cartStr, (err, res) => {
            if (err) {
                console.log(err);
                res.status(500).send('database err').end();
            } else {
                if (data.length == 0) {
                    res.status(500).send('no datas').end();
                } else {
                    res.send(data);
                }
            }
        })
    });

    route.get('/search', (req, res) => {
        let keyWord = req.query.kw;
        let hot = req.query.hot;
        let priceUp = req.query.priceUp;
        let priceDown = req.query.priceDown;

        const keywordStr = `select * from product,shop where product.shop_id=shop.shop_id and product.product_name like '%${keyWord}%'`;
        const hostStr = `select * from product,shop where product.shop_id=shop.shop_id and product.product_name like '%${keyWord}%' order by product_commont_num_desc`;
        const priceUpStr = `select product,shop where product.shop_id=shop.shop_id and product.product_name like '%${keyWord}%' order by product_uprice asc`;
        const priceDownStr = `select product,shop where product.shop_id=shop.shop_id and product.product_name like '%${keyWord}%' order by product_uprice desc`;

        if (keyWord != '') {
            if (hot != '') {
                getSearchDatas(hotStr, res);
            } else if (priceUp != '') {
                getSearchDatas(priceUpStr, res);
            } else if (priceDown != '') {
                getSearchDatas(priceDownStr, res)
            } else {
                getSearchDatas(keyWordStr, res);
            }
        }
    });

    function getSearchDatas(keyWordsStr, res) {
        db.query(keyWordsStr, (err, data) => {
            if (err) {
                console.log(err);
                req.status(500).send('database err').end();
            } else {
                if (data.length == 0) {
                    res.status(500).send('no data').end();
                } else {
                    res.send(data);
                }
            }
        });
    }

    /**
     * user reg func
     */
    route.post('/reg', (req, res) => {
        let mObj = {};
        for (let obj in req.body) {
            mObj = JSON.parse(obj);
        };
        let resName = mObj.regName;
        let regPassword = mObj.regPassword;
        regPassword = common.md5(regPassword + common.MD5_SUFFXIE);
        const inUserInfo = `insert into user(user_name,login_password,user_number) values('${regName},'${regPassword}','${regName}')`;
        delReg(insUserInfo, res);
    });

    /**
     * deal user register
     */
    function delReg(insUserInfro, res) {
        db.query(insUserInfro, (err) => {
            if (err) {
                console.log(err);
                res.send({ 'msg': '服务器出错', 'status': 0 }).end();
            } else {
                res.send({ 'msg': '注册成功', 'status': 1 });
            }
        })
    }


    route.post('/login', (req, res) => {
        let mObj = {};
        for (let obj in req.body) {
            mObj = JSON.parse(obj);
            console.log(mObj);
        };

        let username = mObj.loginName;
        let password = common.md5(mObj.loginPawd + common.MD5_SUFFEIX);

        const selectUser = `select * from user where username='${username}'`;
        db.query(selectUser, (err, data) => {
            if (err) {
                console.log(err);
                res.send({
                    'msg': '服务器出错',
                    'status': 0
                }).end();
            } else {
                if (data.length == 0) {
                    res.send({
                        'msg': '该用户不存在',
                        'status': -1
                    }).end();
                } else {
                    let dataw = data[0];
                    if (dataw.login_password === password) {
                        req.session['user_id'] = dataw.user_id;
                        dataw.msg = '登录成功';
                        dataw.status = 1;
                        res.send(dataw).end();
                    } else {
                        res.send({ 'msg': '密码不正确', 'status': -2 }).end();
                    }
                }
            }
        })
    });

    route.get('/userinfo', (req, res) => {
        let uId = req.query.uId;
        const getU = `select user_name,user_number from user where user_id='${uId}'`;
        db.query(getU, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send('database err').end();
            } else {
                if (data.length == 0) {
                    res.status(500).send('no data').end();
                } else {
                    res.send(data[0]);
                }
            }
        })
    });


    return route;
}
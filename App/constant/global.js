/**
 * Created by Cral-Gates on 2017/11/16.
 */
/*
* 状态栏高度
* */
const STATUS_BAR_HEIGHT = 20;
/*
 * 导航栏高度
 * */
const NAV_BAR_HEIGHT = 44;
/*
* 头像
* */
const AVATAR = 'https://crm.jtgroup.com.cn:8100/jintianProd/uploader/avatar.png';
/*
* gitHub地址
* */
const GITHUB_URL = 'https://github.com/5ibinbin/react-native-nba';
/*
* blog地址
* */
const BLOG_URL = 'http://www.5ibinbin.com';
/*
* 社区
* */
const TEN_SHE_QU_URL = 'https://shequweb.sports.qq.com';
/*
* 背景图
* */
const DEFAULT_PIC = require('../image/default_pic.png');
/*
 * 默认logo
 * */
const DEFAULT_LOGO = 'https://mat1.gtimg.com/chinanba/images/NBA_APP_Logo_58';
/*
* 热门社区
* */
const HOT_FORUM = [
    {icon: "http://img1.gtimg.com/nba/pics/hv1/161/37/2250/146315846.jpg", name: '热议NBA', id: 69},
    {icon: "http://img1.gtimg.com/nba/pics/hv1/135/37/2250/146315820.jpg", name: '勇士', id: 62},
    {icon: "http://img1.gtimg.com/nba/pics/hv1/118/37/2250/146315803.jpg", name: '骑士', id: 61},
    {icon: "http://img1.gtimg.com/sports/pics/hv1/62/37/2250/146315747.jpg", name: '火箭', id: 70},
    {icon: "http://img1.gtimg.com/sports/pics/hv1/103/37/2250/146315788.jpg", name: '雷霆', id: 73},
    {icon: "http://img1.gtimg.com/sports/pics/hv1/104/37/2250/146315789.jpg", name: '马刺', id: 75},
    {icon: "http://img1.gtimg.com/sports/pics/hv1/78/37/2250/146315763.jpg", name: '凯尔特人', id: 76},
    {icon: "http://img1.gtimg.com/sports/pics/hv1/52/37/2250/146315737.jpg", name: '湖人', id: 71},
    {icon: "http://img1.gtimg.com/sports/pics/hv1/42/37/2250/146315727.jpg", name: '76人', id: 121},
];
/*
* 西部社区
* */
const WEST_FORUM = [
    {icon: "http://img1.gtimg.com/nba/pics/hv1/135/37/2250/146315820.jpg", name: '勇士', id: 62},
    {icon: "http://img1.gtimg.com/sports/pics/hv1/62/37/2250/146315747.jpg", name: '火箭', id: 70},
    {icon: "http://img1.gtimg.com/sports/pics/hv1/104/37/2250/146315789.jpg", name: '马刺', id: 75},
    {icon: "http://img1.gtimg.com/sports/pics/hv1/52/37/2250/146315737.jpg", name: '湖人', id: 71},
    {icon: "http://img1.gtimg.com/nba/pics/hv1/122/37/2250/146315807.jpg", name: '森林狼', id: 99},
    {icon: "http://img1.gtimg.com/sports/pics/hv1/63/37/2250/146315748.jpg", name: '掘金', id: 119},
    {icon: "http://img1.gtimg.com/sports/pics/hv1/77/37/2250/146315762.jpg", name: '开拓者', id: 80},
    {icon: "http://img1.gtimg.com/nba/pics/hv1/125/37/2250/146315810.jpg", name: '鹈鹕', id: 116},
    {icon: "http://img1.gtimg.com/sports/pics/hv1/194/186/2196/142842524.jpg", name: '爵士', id: 117},
    {icon: "http://img1.gtimg.com/sports/pics/hv1/103/37/2250/146315788.jpg", name: '雷霆', id: 73},
    {icon: "http://img1.gtimg.com/sports/pics/hv1/85/37/2250/146315770.jpg", name: '快船', id: 74},
    {icon: "http://img1.gtimg.com/nba/pics/hv1/123/37/2250/146315808.jpg", name: '太阳', id: 112},
    {icon: "http://img1.gtimg.com/sports/pics/hv1/50/37/2250/146315735.jpg", name: '国王', id: 122},
    {icon: "http://img1.gtimg.com/sports/pics/hv1/58/37/2250/146315743.jpg", name: '灰熊', id: 81},
    {icon: "http://img1.gtimg.com/nba/pics/hv1/126/37/2250/146315811.jpg", name: '小牛', id: 77},
];
/*
* 东部社区
* */
const EAST_FORUM = [
    {icon: "http://img1.gtimg.com/sports/pics/hv1/78/37/2250/146315763.jpg", name: '凯尔特人', id: 76},
    {icon: "http://img1.gtimg.com/nba/pics/hv1/118/37/2250/146315803.jpg", name: '骑士', id: 61},
    {icon: "http://img1.gtimg.com/sports/pics/hv1/105/37/2250/146315790.jpg", name: '猛龙', id: 125},
    {icon: "http://img1.gtimg.com/nba/pics/hv1/132/37/2250/146315817.jpg", name: '雄鹿', id: 110},
    {icon: "http://img1.gtimg.com/sports/pics/hv1/48/37/2250/146315733.jpg", name: '步行者', id: 83},
    {icon: "http://img1.gtimg.com/sports/pics/hv1/42/37/2250/146315727.jpg", name: '76人', id: 121},
    {icon: "http://img1.gtimg.com/sports/pics/hv1/112/37/2250/146315797.jpg", name: '奇才', id: 79},
    {icon: "http://img1.gtimg.com/sports/pics/hv1/60/37/2250/146315745.jpg", name: '活塞', id: 111},
    {icon: "http://img1.gtimg.com/sports/pics/hv1/110/37/2250/146315795.jpg", name: '尼克斯', id: 100},
    {icon: "http://img1.gtimg.com/nba/pics/hv1/119/37/2250/146315804.jpg", name: '热火', id: 72},
    {icon: "http://img1.gtimg.com/sports/pics/hv1/87/37/2250/146315772.jpg", name: '篮网', id: 113},
    {icon: "http://img1.gtimg.com/sports/pics/hv1/107/37/2250/146315792.jpg", name: '魔术', id: 124},
    {icon: "http://img1.gtimg.com/sports/pics/hv1/56/37/2250/146315741.jpg", name: '黄蜂', id: 114},
    {icon: "http://img1.gtimg.com/sports/pics/hv1/93/37/2250/146315778.jpg", name: '老鹰', id: 82},
    {icon: "http://img1.gtimg.com/sports/pics/hv1/49/37/2250/146315734.jpg", name: '公牛', id: 78}
];

export default {
    STATUS_BAR_HEIGHT,
    NAV_BAR_HEIGHT,
    GITHUB_URL,
    BLOG_URL,
    TEN_SHE_QU_URL,
    AVATAR,
    DEFAULT_PIC,
    DEFAULT_LOGO,
    HOT_FORUM,
    WEST_FORUM,
    EAST_FORUM
}
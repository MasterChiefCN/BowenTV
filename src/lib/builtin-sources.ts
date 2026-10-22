import type { SourceConfig } from './types';

/**
 * 内置点播源：来自 BowenTV-data-sources-2026-10-22.zip 的普通与成人资源清单。
 * 仅导入启用条目；原清单中已注释停用的源不包含在内。
 * 使用稳定 key，更新列表时保留用户的勾选设置。
 */
export const BUILTIN_SOURCES: SourceConfig[] = [
  {
    "key": "builtin_dyttzy",
    "name": "电影天堂资源",
    "url": "http://caiji.dyttzyapi.com/api.php/provide/vod",
    "detail": "http://caiji.dyttzyapi.com"
  },
  {
    "key": "builtin_ruyi",
    "name": "如意资源",
    "url": "https://cj.rycjapi.com/api.php/provide/vod"
  },
  {
    "key": "builtin_bfzy",
    "name": "暴风资源",
    "url": "https://bfzyapi.com/api.php/provide/vod"
  },
  {
    "key": "builtin_tyyszy",
    "name": "天涯资源",
    "url": "https://tyyszy.com/api.php/provide/vod"
  },
  {
    "key": "builtin_xiaomaomi",
    "name": "小猫咪资源",
    "url": "https://zy.xmm.hk/api.php/provide/vod"
  },
  {
    "key": "builtin_ffzy",
    "name": "非凡影视",
    "url": "http://ffzy5.tv/api.php/provide/vod",
    "detail": "http://ffzy5.tv"
  },
  {
    "key": "builtin_heimuer",
    "name": "黑木耳",
    "url": "https://json.heimuer.xyz/api.php/provide/vod",
    "detail": "https://heimuer.tv"
  },
  {
    "key": "builtin_zy360",
    "name": "360资源",
    "url": "https://360zy.com/api.php/provide/vod"
  },
  {
    "key": "builtin_iqiyi",
    "name": "iqiyi资源",
    "url": "https://www.iqiyizyapi.com/api.php/provide/vod"
  },
  {
    "key": "builtin_wolong",
    "name": "卧龙资源",
    "url": "https://wolongzyw.com/api.php/provide/vod"
  },
  {
    "key": "builtin_hwba",
    "name": "华为吧资源",
    "url": "https://cjhwba.com/api.php/provide/vod"
  },
  {
    "key": "builtin_jisu",
    "name": "极速资源",
    "url": "https://jszyapi.com/api.php/provide/vod",
    "detail": "https://jszyapi.com"
  },
  {
    "key": "builtin_dbzy",
    "name": "豆瓣资源",
    "url": "https://dbzy.tv/api.php/provide/vod"
  },
  {
    "key": "builtin_mozhua",
    "name": "魔爪资源",
    "url": "https://mozhuazy.com/api.php/provide/vod"
  },
  {
    "key": "builtin_mdzy",
    "name": "魔都资源",
    "url": "https://www.mdzyapi.com/api.php/provide/vod"
  },
  {
    "key": "builtin_zuid",
    "name": "最大资源",
    "url": "https://api.zuidapi.com/api.php/provide/vod"
  },
  {
    "key": "builtin_yinghua",
    "name": "樱花资源",
    "url": "https://m3u8.apiyhzy.com/api.php/provide/vod"
  },
  {
    "key": "builtin_baidu",
    "name": "百度云资源",
    "url": "https://api.apibdzy.com/api.php/provide/vod"
  },
  {
    "key": "builtin_wujin",
    "name": "无尽资源",
    "url": "https://api.wujinapi.me/api.php/provide/vod"
  },
  {
    "key": "builtin_wwzy",
    "name": "旺旺短剧",
    "url": "https://wwzy.tv/api.php/provide/vod"
  },
  {
    "key": "builtin_ikun",
    "name": "iKun资源",
    "url": "https://ikunzyapi.com/api.php/provide/vod"
  },
  {
    "key": "builtin_lzi",
    "name": "量子资源站",
    "url": "https://cj.lziapi.com/api.php/provide/vod"
  },
  {
    "key": "builtin_qiqi",
    "name": "七七资源",
    "url": "https://www.qiqidys.com/api.php/provide/vod"
  },
  {
    "key": "builtin_ckzy",
    "name": "CK资源",
    "url": "https://www.ckzy1.com/api.php/provide/vod",
    "isAdult": true
  },
  {
    "key": "builtin_jkun",
    "name": "jkun资源",
    "url": "https://jkunzyapi.com/api.php/provide/vod",
    "isAdult": true
  },
  {
    "key": "builtin_bwzy",
    "name": "百万资源",
    "url": "https://api.bwzym3u8.com/api.php/provide/vod",
    "isAdult": true
  },
  {
    "key": "builtin_souav",
    "name": "souav资源",
    "url": "https://api.souavzy.vip/api.php/provide/vod",
    "isAdult": true
  },
  {
    "key": "builtin_r155",
    "name": "155资源",
    "url": "https://155api.com/api.php/provide/vod",
    "isAdult": true
  },
  {
    "key": "builtin_lsb",
    "name": "lsb资源",
    "url": "https://apilsbzy1.com/api.php/provide/vod",
    "isAdult": true
  },
  {
    "key": "builtin_huangcang",
    "name": "黄色仓库",
    "url": "https://hsckzy.vip/api.php/provide/vod",
    "detail": "https://hsckzy.vip",
    "isAdult": true
  },
  {
    "key": "builtin_yutu",
    "name": "玉兔资源",
    "url": "https://yutuzy10.com/api.php/provide/vod",
    "isAdult": true
  }
];

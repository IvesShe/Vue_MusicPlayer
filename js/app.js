/*
  1:歌曲搜索接口
    請求地址:https://autumnfish.cn/search
    請求方法:get
    請求參數:keywords(查詢關鍵字)
    響應內容:歌曲搜索結果
  2:歌曲url獲取接口
    請求地址:https://autumnfish.cn/song/url
    請求方法:get
    請求參數:id(歌曲id)
    響應內容:歌曲url地址
  3.歌曲詳情獲取
    請求地址:https://autumnfish.cn/song/detail
    請求方法:get
    請求參數:ids(歌曲id)
    響應內容:歌曲詳情(包括封面信息)
  4.熱門評論獲取
    請求地址:https://autumnfish.cn/comment/hot?type=0
    請求方法:get
    請求參數:id(歌曲id,地址中的type固定為0)
    響應內容:歌曲的熱門評論
  5.mv地址獲取
    請求地址:https://autumnfish.cn/mv/url
    請求方法:get
    請求參數:id(mvid,為0表示沒有mv)
    響應內容:mv的地址
*/

var app = new Vue({
    el:"#player",
    data:{
        query:"",       // 查詢關鍵字
        musicList:[],   // 歌曲數組
        musicUrl:"",    // 歌曲地址
        musicCover:"",  // 歌曲封面
        hotComments:[], // 歌曲評論
        isPlaying:false, // 動畫播放狀態
        isShow:false,   // 遮罩層的顯示狀態
        mvUrl:""        // mv地址
    },
    methods:{
        // 歌曲搜索
        searchMusic:function(){
            var that = this;
            axios.get("https://autumnfish.cn/search?keywords="+this.query)
            .then(function(response){
                console.log(response);
                that.musicList = response.data.result.songs;
                console.log(response.data.result.songs)
            },function(err){})
        },

        // 歌曲播放
        playMusic: function(musicId){
            var that = this;
            console.log(musicId);

            // 獲取歌曲地址
            axios.get("https://autumnfish.cn/song/url?id="+musicId)
            .then(function(response){
                //console.log("歌曲地址",response);
                console.log("歌曲地址",response.data.data[0].url);
                that.musicUrl = response.data.data[0].url;
            },function(err){})

            // 歌曲詳情獲取
            axios.get("https://autumnfish.cn/song/detail?ids="+musicId)
            .then(function(response){
                //console.log("歌曲詳情",response);
                console.log("歌曲詳情",response.data.songs[0].al.picUrl);
                that.musicCover = response.data.songs[0].al.picUrl;
            },function(err){})

            // 歌曲評論
            axios.get("https://autumnfish.cn/comment/hot?type=0&id="+musicId)
            .then(function(response){
                //console.log("歌曲評論",response);
                console.log("歌曲評論",response.data.hotComments);
                that.hotComments = response.data.hotComments;
            },function(err){})
        },

        play:function(){
            console.log("play");
            this.isPlaying = true;
        },

        pause:function(){
            console.log("pause");
            this.isPlaying = false;
        },

        // 播放mv
        playMV:function(mvid){
            var that = this;
            axios.get("https://autumnfish.cn/mv/url?id="+mvid)
            .then(function(response){
                console.log("播放mv",response.data.data.url);
                that.isShow = true;
                that.mvUrl = response.data.data.url;
            },function(err){})
        },

        // 隱藏
        hide:function(){
            this.isShow = false;
        }
    }
})
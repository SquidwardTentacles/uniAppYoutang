<template name="index">
  <view class='content'>
    <view class='uni-padding-wrap'>
      <view class='page-section swiper'>
        <view class='page-section-spacing'>
          <swiper class='swiper'
                  autoplay='true'
                  circular='true'>
            <swiper-item v-for="(item,index) in swiperList"
                         :key="index">
              <view class='swiper-item'>
                <image :src='item.url'
                       mode='scaleToFill'
                       lazy-load='false'>
                </image>
              </view>
            </swiper-item>
          </swiper>
        </view>
      </view>
    </view>
    <!-- 全部 潮流时尚 婚礼爱情 商业宣传 家庭相册 生日祝福 节日问候 旅行时光 晚会典礼 毕业留念 通用 -->
    <view class='scoll-view'>
      <text v-for="(item,index) in listArr" :key="index">{{item.label}}</text>
    </view>
	<!-- 视频展示 --> 
	<view class="template-show flexbox">
		<view class="list-box flexbox a-start" v-for="(item,index) in videoListArr" :key="index">
			<view class="inner-box-video">
				<navigator :url="'./make?item='+item.theme_id+'&title='+item.title">
						<image :src="item.cover_url" mode=""></image>
						<view class="title">
							{{item.title}}
						</view>
				</navigator>
			</view>
		</view>
	</view>
	<!-- 弹出框 -->
	<uni-popup ref="popup" type="center">{{dialogContent}}</uni-popup>
  </view>
</template>

<script>
import uniPopup from "@/components/uni-popup/uni-popup.vue"
export default {
components: {uniPopup},
  data () {
    return {
      swiperList: [],
	  listArr:[
		  {label:'全部'},
		  {label:'潮流时尚'},
		  {label:'婚礼爱情'},
		  {label:'商业宣传'},
		  {label:'家庭相册'},
		  {label:'生日祝福'},
		  {label:'节日问候'},
		  {label:'旅行时光'},
		  {label:'晚会典礼'},
		  {label:'毕业留念'},
		  {label:'通用'}
	  ],
	  videoListArr:[],
	  // 弹出层内容 
	  dialogContent:'',
	  page:1,
	  // 请求基地址
	  baseUrl : getApp().globalData.baseUrl
    }
  },
  onLoad () {
   this.onloadFunc()
  },
  // 上拉触底事件
  onReachBottom() {
	  this.page++
	  this.getVideoList()
	  
  },
  methods: {
	onloadFunc() {
	  // 获取轮播图图片
	  
		uni.request({
		  url: this.baseUrl + '/api/activity',
		  success: res => {
		    if (res.data.status === '1') {
		      this.swiperList = res.data.data.list
		    }
		  },
		  fail: err => {
		    console.log(err);
			this.dialogContent = '请求异常，请稍后重试'
				this.$refs.popup.open()
		
		  }
		})
		// 获取页面视频 
		this.getVideoList()
	},
	getVideoList() {
		uni.request({
			url:this.baseUrl+`/api/themes?language=zh&per_page=12&page=${this.page}`,
			success:res=>{
				console.log(res)
				if(res.data.status==='1') {
					this.videoListArr = this.videoListArr.concat(res.data.data.list)
				}
			},
			fail:err=>{
				console.log(err)
			}
		})
	}
  }
}
</script>

<style lang="less" scoped>
.content {
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  // justify-content: center;
	.uni-padding-wrap {
	  width: 100%;
	  padding:10rpx ;
	  box-sizing:border-box ;
	  .swiper {
	  border-radius: 10rpx;
	  overflow: hidden;
		  
	  }
	   image,
	  .swiper-item {
		  width:100%;
		height: 100%;
	  }
	}
	.scoll-view {
	  white-space: nowrap;
	  padding: 5px 0 0 0;
	  -webkit-box-shadow:  0 10px 5px 1px #eeeeee;
	  -moz-box-shadow:  0 10px 5px 1px #eeeeee;
	  box-shadow:  0px 10px 5px 1px #eeeeee;
	  overflow: auto;
	  width: 100%;
	  overflow: auto;
	  &::-webkit-scrollbar {
		width: 0;
	  }
	  text {
		margin: 4rpx 10rpx;
		font-size: 28rpx;
		margin-bottom:0 ;
	  }
	}
	.template-show {
		flex-wrap: wrap;
		max-width: 100% ;
		.list-box {
		navigator{
			width:100% ;
		}
			width: 45%;
			margin-right:10px;
			padding:0 10px ;
			box-sizing:border-box ;
			margin-top:15px ;
			flex-direction: column;
			justify-content: center;
				.inner-box-video {
				border-radius: 5px;
				width:100% ;
				overflow: hidden;
					image {
						width:100% ;
						height:150rpx ;
						object-fit: contain;
					}
					.title {
						width:100% ;
						border:1px solid #f5f6fa ;
						font-size: 28rpx;
						padding:5px 0 ;
						text-align: center;
					}
				}
		}
	}
}

</style>

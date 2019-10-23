<template name="index">
  <view class='content'>
	<!-- 视频展示 --> 
	<view class="template-show flexbox">
		<view class="list-box flexbox a-start" v-for="(item,index) in videoListArr" :key="index">
			<view class="inner-box-video"  @click="openPopup(item.theme_id,item.title)">
				<!-- <navigator :url="'./make?item='+item.theme_id+'&title='+item.title"> -->
						<image :src="item.cover_url" mode=""></image>
						<view class="title">
							{{item.title}}
						</view>
				<!-- </navigator> -->
			</view>
		</view>
	</view>
	<!-- 弹出框 -->
	<uni-popup ref="popup" type="bottom">
		<view class="make">
			<view class="video-title">
				<text>{{videoTitle}}</text>
			</view>
			<view class="choose-img">
				<image :src="imgUrl" mode="" v-if="!errMeage&&imgUrl"></image>
				<view class="errShow flexbox" v-else>{{errMeage}}</view>
			</view>
			<view class="video-sesson">
				<view class="time-out">
					<text>时长不限</text>
				</view>
				<view class="time-out write">
					<text>支持图片、视频、文字</text>
				</view>
				 <view class="picker-box flexbox j-start">
					<view class="uni-list-cell-db">
						<picker @change="bindPickerChange" :value="index" :range="array">
							<view class="uni-input">{{array[index]}}</view>
						</picker>
					</view>
				 </view>
				 <button type="primary" class="free-make" @click="makeVideo">免费制作</button>
			</view>
		</view>
	</uni-popup>
  </view>
</template>

<script>
import uniPopup from "@/components/uni-popup/uni-popup.vue"
export default {
	name:'videoList',
	components: {uniPopup},
	props:{
		currentPage:''
	},
	watch:{
		currentPage() {
			this.page++
			this.getVideoList()
		}
	},
  data () {
    return {
	  videoListArr:[],
	  page:1,
	  // 请求基地址
	  baseUrl : getApp().globalData.baseUrl,
	  
	  imgUrl:'',
	  videoTitle:'',
	  array: ['16:9(横屏)', '1:1(方屏)', '9:16(竖屏)'],
	  index: 0,
	  errMeage:''
    }
  },
  mounted () {
   this.getVideoList()
   this.page = this.currentPage
  },
  // 上拉触底事件
  onReachBottom() {
	  this.page++
	  this.getVideoList()
  },
  methods: {
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
	},
	// 打开弹出层
	 openPopup(id,title){
		 this.imgUrl = id
		 this.videoTitle = title
		 this.getImgUrl(id)
		this.$refs.popup.open()
	 },
	 bindPickerChange: function(e) {
	    console.log('picker发送选择改变，携带值为', e.target.value)
	     this.index = e.target.value
	         },
	 getImgUrl(id) {
	 	uni.request({
	 		url:'http://192.168.1.4:3000/getImgUrl?fileType=image&id='+id,
	 		success:res=>{
	 			console.log(res)
	 			this.imgUrl = res
	 				if(res.data.errCode==='0') {
	 					this.imgUrl = res.data.imgurl
	 					this.errMeage = ''
	 				}else {
	 					console.log('err')
	 					this.errMeage = res.data.message
	 					this.imgUrl = ''
	 				}
	 		},
	 		fail:err=>{
	 			console.log(err)
	 		}
	 	})
	 },
	 makeVideo() {
	 	wx.getSetting({
	 	  success(res) {
	 	    if (!res.authSetting['scope.record']) {
	 	      wx.authorize({
	 	        scope: 'scope.record',
	 	        success () {
	 	          // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
	 	          wx.startRecord()
	 	        }
	 	      })
	 	    }
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
  height:100% ;
	
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
		height:500rpx ;
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
	.make {
		.video-title {
			text-align: center;
			font-size: 28rpx;
			margin:5px 0 ;
		}
		.choose-img {
			width:95% ;
			margin:0 auto ;
			overflow: hidden;
			image {
			border-radius: 5px;
				width:100% ;
				max-height:400rpx ;
			}
			.errShow {
				width:100% ;
				height:400rpx ;
			}
		}
		.video-sesson {
			padding:0 10px ;
			box-sizing:border-box ;
			margin-top:10px ;
			font-size:28rpx ;
			.time-out {
				background: url('~@/static/images/timeOut.jpg') left center no-repeat;
				background-size: 40rpx 40rpx;
				padding-left:50rpx ;
				box-sizing:border-box ;
				margin-bottom: 15px;
				height:45rpx ;
				line-height: 45rpx;
				white-space: nowrap;
				&.write {
					background-image:url('~@/static/images/writeIcon.jpg');
				}
			}
			.picker-box {
				height:65rpx ;
				padding-left:20rpx ;
				box-sizing:border-box ;
				border:1px solid #ccc ;
				background:#f7f7f7 ;
				.uni-list-cell-db {
					width:100% ;
					.uni-input {
						width:100% ;
					}
				}
			}
			.free-make {
				height:100rpx ;
				background:linear-gradient(to right,#568cf9,#ff9ad4);
				margin-top:20px ;
			}
		}
	}
}

</style>

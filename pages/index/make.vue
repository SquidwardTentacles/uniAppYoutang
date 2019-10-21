<template>
	<view class="make">
		<view class="video-title">
			<text>{{videoTitle}}</text>
		</view>
		<view class="choose-img">
			<image :src="imgUrl" mode="" v-if="!errMeage"></image>
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
</template>

<script>
export default {
	data() {
		 
		return {
			imgUrl:'',
			baseUrl : getApp().globalData.baseUrl,
			videoTitle:'',
			array: ['16:9(横屏)', '1:1(方屏)', '9:16(竖屏)'],
			index: 0,
			errMeage:''
		}
	},
	onLoad(option) {
		console.log(option.item)
		this.imgUrl = option.item
		this.videoTitle = option.title
		this.getImgUrl(option.item)
	},
	methods:{
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

<style scoped lang="less"> 
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
			background: url('../../static/images/timeOut.jpg') left center no-repeat;
			background-size: 40rpx 40rpx;
			padding-left:50rpx ;
			box-sizing:border-box ;
			margin-bottom: 15px;
			height:45rpx ;
			line-height: 45rpx;
			white-space: nowrap;
			&.write {
				background-image:url('../../static/images/writeIcon.jpg');
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
</style>
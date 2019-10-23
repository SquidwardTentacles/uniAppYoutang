<template>
	<view class="template">
		<view class="nav-list flexbox between">
			<view class="nav-title" v-if="navTitleShow">
				<view class="flexbox between list-father">
					<view class="center-title">
						选择主题
					</view>
					<view class="hidden-icon" @click="navTitleShow=false">
						<image src="../../static/images/mine/top-icon.svg" mode=""></image>
					</view>
				</view>
				<view class="content-box flexbox j-start">
					<view class="nav-icon" v-for="(item,index) in navList" :key="index">
						{{item.label}}
					</view>
				</view>
			</view>
			<view  v-if="!navTitleShow" class="flexbox between list-father">
				<view class="content-box flexbox j-start">
					<view class="nav-icon" v-for="(item,index) in navList" :key="index" :class="{'active':navlistId===index}" @click="navListClick(index)">
						{{item.label}}
					</view>
				</view>
				<view class="show-icon flexbox" @click="navTitleShow=true">
					<image src="../../static/images/mine/bottom-icon.svg" mode=""></image>
				</view>
			</view>
		</view>
		<view class="video-list">
			<video-list :currentPage="page"></video-list>
		</view>
		<!-- 弹出层 -->
		<uni-popup ref="popup" type="bottom"></uni-popup>
	</view>
</template>

<script>
import videoList from '@/components/videoList.vue';
export default {
	components: {
				videoList
			},
	data() {
		return {
			navList: [
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
			navTitleShow:false,
			navlistId:0,
			page:0
		}
	},
	methods:{
		navListClick(i) {
			this.navlistId=i
		}
		
	},
	// 上拉触底事件
	onReachBottom() {
		console.log('触底')
		  this.page++
		  // this.getVideoList()
	},
}
</script>

<style scoped lang="less">
	.template {
		.nav-list {
			border-bottom: 1px solid #cccccc;
			font-size: 28rpx ;
			width:100% ;
			.list-father {
				width:100% ;
				.content-box{
					&::-webkit-scrollbar{display: none;}
					&.flexbox {
						height:100rpx ;
						flex:1 ;
						overflow: auto;
						height:100% ;
						white-space: nowrap;
					}
					.nav-icon {
						padding-bottom: 5px;
						&.active {
							color:#589fe1;
							border-bottom:2px solid #589fe1 ;
						}
					}
				}
			}
			.nav-icon {
			margin:0 5px ;
			white-space: nowrap;
			}
			.show-icon {
				width:100rpx ;
				image {
					width:30rpx ;
					height:20rpx ;
					}
			}
			.nav-title {
				width:100% ;
				.content-box {
					flex-wrap: wrap;
					// padding:10px ;
					box-sizing:border-box ;
					.nav-icon {
						padding:5px ;
						box-sizing: border-box;
						width:20% ;
						text-align: center;
					}
				}
				.center-title {
					font-size: 30rpx;	
					flex:1 ;
					text-align: center;
				}
				.hidden-icon {
					width:100rpx ;
					text-align: center;
					image {
						width:30rpx ;
						height:20rpx ;
						}
				}
			}
		}
		.video-list {
			height:500rpx ;
		}
	}
</style>

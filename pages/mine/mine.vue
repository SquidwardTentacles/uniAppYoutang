<template>
	<view class="mine-box">
		<view class="login-box">
			<view class="login-linner">
				
			</view>
		</view>
		<view class="setting-list">
			<view class="list-item flexbox between" v-for="(item,index) in settingList" :key="index">
				<view class="list-title flexbox j-start">
					<image :src="'../../static/images/mine/'+item.icon" mode=""></image>
					<view class="title">
						{{item.label}}
					</view>
				</view>
				<image src="../../static/images/mine/right-icon.svg" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				settingList:[
					{label:'意见反馈',icon:'view-icon.jpg'},
					{label:'分享给好友',icon:'share.jpg'},
					{label:'关于我们',icon:'about.jpg'},
					{label:'设置	',icon:'setting.jpg'}
				]
			}
		}
	}
</script>

<style scoped lang="less">
	.mine-box {
		.login-box {
			min-height:300rpx ;
			max-height: 50%;
			width:100% ;
			background:linear-gradient(#cff8fe,#fffcfd);
			display: flex;
			justify-content: center;
			align-items: center;
			.login-linner {
				width:235rpx ;
				height:235rpx ;
				background-color: #fff;
				border-radius: 50%;
			}
		}
		.setting-list {
			padding:0 15px ;
			box-sizing: border-box;
			.list-item {
				border-bottom: 1px solid #e4e4e2;
				height:54rpx ;
				font-size: 28rpx;
				padding:10px 0 ;
				width:100% ;
				image {
					width:30rpx ;
					height:35rpx ;
					margin:0 10px 0 5px;
				}
				.list-title {
					
				}
			}
		}
	}
</style>

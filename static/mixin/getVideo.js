const mixins = {
	data () {
		return {
			videoListArr:[],
			page:1,
			// 请求基地址
			baseUrl : getApp().globalData.baseUrl
		}
	},
	mounted() {
		this.getVideoList()
	},
	methods:{
		getVideoList() {
			console.log('视频获取')
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
export default mixins
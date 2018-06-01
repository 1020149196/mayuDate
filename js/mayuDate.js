(function(window) {

	var col_days_labels = ["日", "一", "二", "三", "四", "五", "六"];
	var col_full_days_labels = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
	var col_months_labels = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
	var cal_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	var isDate = function(date) {
		return date instanceof Date && !isNaN(date.valueOf());
	}

	/*子级,父级,继承*/
	var extend = function(son, father) {
		var prop, hasprop;
		for(var prop in father) {
			hasprop = son[prop] !== undefined;
			if(!hasprop && typeof father[prop] === 'object' && father[prop] !== null) {
				if(isDate(father[prop])) {
					son[prop] = new Date(father[prop].getTime());
				} else if(isArray(father[prop])) {
					son[prop] = father[prop].slice(0);
				} else {
					son[prop] = extend({}, father[prop]);
				}
			} else if(!hasprop) {
				son[prop] = father[prop]
			}
		}
		return son;
	}
	//个位数+0
	var isSingleDgit=function(num){
		return num>9?num:"0"+num;
	}
	function Calendar(option) {
		this.defaultDate = {
			defaultDate: new Date(),
			bigBanner: true,
			format: "XX/MM/YYYY",
			onSelect: null
		}
		var opts = extend(option, this.defaultDate);
		console.log(opts)
		//实例化容器
		this.container = document.querySelector(".mayuyu");
		//具体日期容器
		this.dateMain = this.container.querySelector(".mayu-date-main");
		this.yearBoxes=this.container.querySelector(".mayu-date-year");
		this.monthBoxes=this.container.querySelector(".mayu-date-month");
		this.dateBoxes=this.container.querySelector(".mayu-date-date");
		this.fullYearBoxes=this.container.querySelector(".mayu-date-header-message-year")
		this.fullMonthBoxes=this.container.querySelector(".mayu-date-header-message-month");
		this.fullDateBoxes=this.container.querySelector(".mayu-date-header-message-date");
		this.nextBtn=this.container.querySelector(".mayu-date-next_month");
		this.prevBtn=this.container.querySelector(".mayu-date-prev_month");
		/*点击*/
		this.nextBtn.addEventListener("click",this.nextMonth.bind(this))
		this.prevBtn.addEventListener("click",this.prevMonth.bind(this))
		
		//初始值
		this.defaultDate=opts.defaultDate;
		this.init();
	}
	Calendar.prototype.init = function() {
		this.resetDateParam();
		this.createDateDiv();
		this.resetDateView();
	}
	/*创建日期盒子*/
	Calendar.prototype.createDateDiv = function() {
		var _this=this;
		if(this.currentYear%4==0){
			cal_days_in_month[1]=29;
		}else{
			cal_days_in_month[1]=28;
		}
		var max=cal_days_in_month[this.currentMonth-1], html ="";
		for(var i = 1; i <= max; i++) {
			html +=i==this.currentDate?"<div class='active'>" + i + "</div>":"<div>" + i + "</div>"
		}
		this.dateMain.innerHTML = html;
		this.daysBtn=this.container.querySelectorAll(".mayu-date-main div");
		this.daysBtn.forEach(function(item){
			item.addEventListener("click",function(ev){
				_this.selectDate(ev,_this)
			})
		})
	}
	/*更新日期*/
	Calendar.prototype.resetDateView=function(){
		this.fullYearBoxes.innerText=this.currentYear;
		this.fullMonthBoxes.innerText=col_months_labels[this.currentMonth-1];
		this.fullDateBoxes.innerText=this.currentDate;
		this.yearBoxes.innerText=this.currentYear;
		this.monthBoxes.innerText=this.currentMonth;
		this.dateBoxes.innerText=this.currentDate;
	}
	/*重新获取日期*/
	Calendar.prototype.resetDateParam=function(){
		this.currentYear=this.defaultDate.getFullYear();
		this.currentMonth=this.defaultDate.getMonth()+1;
		this.currentDate=this.defaultDate.getDate();
		this.currentDay=this.defaultDate.getDay();
	}
	//更新Date对象
	Calendar.prototype.resetDateObject=function(){
		var dateStr,timestamp;
		dateStr=this.currentYear+"/"+isSingleDgit(this.currentMonth)+"/"+isSingleDgit(this.currentDate);
		timestamp =Date.parse(dateStr);
		this.defaultDate=new Date(timestamp);
	}
	Calendar.prototype.nextMonth=function(){
		if(this.currentMonth<12){
			this.currentMonth++;
		}else{
			this.currentMonth=1;
			this.currentYear++
		}
		this.resetDateObject();
		this.resetDateParam();
		this.createDateDiv();
		this.resetDateView();
	}
	Calendar.prototype.prevMonth=function(){
		if(this.currentMonth>1){
			this.currentMonth--;
		}else{
			this.currentMonth=12;
			this.currentYear--
		}
		this.resetDateObject();
		this.resetDateParam();
		this.createDateDiv();
		this.resetDateView();
	}
	Calendar.prototype.selectDate=function(ev,_this){
		_this.currentDate=ev.target.innerText;
		_this.resetDateObject();
		_this.resetDateParam();
		_this.createDateDiv();
		_this.resetDateView();
	}
	
	window.mayuDate = Calendar || {}

})(window)

new mayuDate({})
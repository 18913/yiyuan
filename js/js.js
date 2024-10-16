 $(window).load(function(){$(".loading").fadeOut()})  
$(function () {
    echarts_6();
    echarts_5();
    echarts_4();
    echarts_1();
    echarts_2();
    echarts_3();
    echarts_7();
function echarts_1() {
 // 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('echart1'));
option = {
    legend: {
        //orient: 'vertical',
		top:'20',
		left:'center',
       itemWidth: 10,
        itemHeight: 10,
        data:['感冒','止疼','新冠','流感'],
                textStyle: {
            color: 'rgba(255,255,255,.5)',
			fontSize:'12',
        }
    },
    tooltip: {
        trigger: 'item',
        formatter: "{b} : {c} ({d}%)"
    },

    visualMap: {
        show: false,
        min: 500,
        max: 600,
        inRange: {
            //colorLightness: [0, 1]
        }
    },
    series: [{
        name: '分布',
        type: 'pie',
        radius: ['30%', '60%'],
        center: ['50%', '60%'],
        color: ['#0086e5', '#30c5ed', '#9fe7b8', '#fedb5b', '#ff9f7d', '#fb7293', '#e7bcf2'], //'#FBFE27','rgb(11,228,96)','#FE5050'
        data: [{
                value: 13895,
                name: '感冒'
            },
            {
                value: 41620,
                name: '止疼'
            },
            {
                value: 65384,
                name: '新冠'
            },
            {
                value: 57496,
                name: '流感'
            }
        ].sort(function(a, b) {
            return a.value - b.value
        }),
        roseType: 'radius',

        label: {
            normal: {
                formatter: ['{d|{d}%}', '{b|{b}}'].join('\n'),
                rich: {
                    d: {
                        color: 'rgb(241,246,104)',
                        fontSize: 14,
                        fontWeight:'bold',
                 
                    },
                    b: {
                        color: 'rgb(98,137,169)',
                        fontSize: 12,
               
                    },
                },
            }
        },
        labelLine: {
            normal: {
                lineStyle: {
                    color: 'rgb(98,137,169)',
                },
                smooth: 0.2,
                length: 5,
                length2: 9,

            }
        },
        itemStyle: {
            normal: {
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 50,
            }
        }
    }]
};
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
  
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }
	function echarts_2() {
var myChart = echarts.init(document.getElementById('echart2'));
data = [{
	name: "阿莫西林胶囊",
	value: 18400
}, {
	name: "布洛芬缓释片",
	value: 20600
}, {
	name: "头孢拉定胶囊",
	value: 30580
}, {
	name: "氢溴酸右美沙芬口服液",
	value: 10589
} 
	   ];
arrName = getArrayValue(data, "name");
arrValue = getArrayValue(data, "value");
sumValue = eval(arrValue.join('+'));
objData = array2obj(data, "name");
optionData = getData(data);

function getArrayValue(array, key) {
	var key = key || "value";
	var res = [];
	if (array) {
		array.forEach(function(t) {
			res.push(t[key])
		})
	}
	return res
}
function array2obj(array, key) {
	var resObj = {};
	for (var i = 0; i < array.length; i++) {
		resObj[array[i][key]] = array[i]
	}
	return resObj
}
function getData(data) {
	var res = {
		series: [],
		yAxis: []
	};
	for (let i = 0; i < data.length; i++) {
		res.series.push({
			name: '数据',
			type: 'pie',
			clockWise: false,
			hoverAnimation: false,
			radius: [75 - i * 15 + '%', 65 - i * 15 + '%'],
			center: ["50%", "65%"],
			label: {
				show: false
			},
			itemStyle: {
				label: {
					show: false,
				},
				labelLine: {
					show: false
				},
				borderWidth: 5,
			},
			data: [{
				value: data[i].value,
				name: data[i].name
			}, {
				value: sumValue - data[i].value,
				name: '',
				itemStyle: {
					color: "rgba(0,0,0,0)",
					borderWidth: 0
				},
				tooltip: {
					show: false
				},
				hoverAnimation: false
			}]
		});
		res.series.push({
			name: '',
			type: 'pie',
			silent: true,
			z: 1,
			clockWise: false,
			hoverAnimation: false,
			radius: [75 - i * 15 + '%', 65 - i * 15 + '%'],
			center: ["50%", "65%"],
			label: {
				show: false
			},
			itemStyle: {
				label: {
					show: false,
				},
				labelLine: {
					show: false
				},
				borderWidth: 5,
			},
			data: [{
				value: 7.5,
				itemStyle: {
					color: "rgba(255,255,255,.1)",
					borderWidth: 0
				},
				tooltip: {
					show: false
				},
				hoverAnimation: false
			}, {
				value: 2.5,
				name: '',
				itemStyle: {
					color: "rgba(0,0,0,0)",
					borderWidth: 0
				},
				tooltip: {
					show: false
				},
				hoverAnimation: false
			}]
		});
		res.yAxis.push((data[i].value / sumValue * 100).toFixed(2) + "%")
	}
	return res
}
option = {

	legend: {
		orient: 'vertical',
		show: true,
		top: "20",
		left: 'center',
		data: arrName,
		itemWidth: 12,
        itemHeight: 12,

	//itemGap: 15,
		formatter: function(name) {
			return "{title|" + name + "}:{value|" + (objData[name].value) + "盒}"
		},
		textStyle: {
			color: "rgba(255,255,255,.45)",
			rich: {
				title: {
					fontSize: 12,
					color: "rgba(255,255,255,.45)"
				},
				value: {
					fontSize: 12,
					color: "rgba(255,255,255,.85)"
				}
			}
		},
	},
	tooltip: {
		show: true,
		trigger: "item",
		formatter: "{a}<br>{b}:{c}({d}%)"
	},
	color: ['#FF8700', '#ffc300', '#00e473', '#009DFF'],
	grid: {
		top: '44%',
		bottom: '39%',
		left: "52%",
		containLabel: false
	},
	yAxis: [{
		type: 'category',
		inverse: true,
		axisLine: {
			show: false
		},
		axisTick: {
			show: false
		},
		axisLabel: {
			interval: 0,
			inside: true,
			textStyle: {
				color: "#fff",
				fontSize: 10,
			},
			show: true
		},
		data: optionData.yAxis
	}],
	xAxis: [{
		show: false
	}],
	series: optionData.series
};
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }
	function echarts_3() {
var myChart = echarts.init(document.getElementById('echart3'));
data = [{
	name: "盐酸氨溴索口服溶液",
	value: 13211
}, {
	name: "硝酸甘油片",
	value: 42111
}, {
	name: "奥美拉唑肠溶胶囊",
	value: 81711
}, {
	name: "甲硝唑片",
	value: 121711
} 
	   ];
arrName = getArrayValue(data, "name");
arrValue = getArrayValue(data, "value");
sumValue = eval(arrValue.join('+'));
objData = array2obj(data, "name");
optionData = getData(data);

function getArrayValue(array, key) {
	var key = key || "value";
	var res = [];
	if (array) {
		array.forEach(function(t) {
			res.push(t[key])
		})
	}
	return res
}
function array2obj(array, key) {
	var resObj = {};
	for (var i = 0; i < array.length; i++) {
		resObj[array[i][key]] = array[i]
	}
	return resObj
}
function getData(data) {
	var res = {
		series: [],
		yAxis: []
	};
	for (let i = 0; i < data.length; i++) {
		res.series.push({
			name: '数据',
			type: 'pie',
			clockWise: false,
			hoverAnimation: false,
			radius: [75 - i * 15 + '%', 65 - i * 15 + '%'],
			center: ["50%", "65%"],
			label: {
				show: false
			},
			itemStyle: {
				label: {
					show: false,
				},
				labelLine: {
					show: false
				},
				borderWidth: 5,
			},
			data: [{
				value: data[i].value,
				name: data[i].name
			}, {
				value: sumValue - data[i].value,
				name: '',
				itemStyle: {
					color: "rgba(0,0,0,0)",
					borderWidth: 0
				},
				tooltip: {
					show: false
				},
				hoverAnimation: false
			}]
		});
		res.series.push({
			name: '',
			type: 'pie',
			silent: true,
			z: 1,
			clockWise: false,
			hoverAnimation: false,
			radius: [75 - i * 15 + '%', 65 - i * 15 + '%'],
			center: ["50%", "65%"],
			label: {
				show: false
			},
			itemStyle: {
				label: {
					show: false,
				},
				labelLine: {
					show: false
				},
				borderWidth: 5,
			},
			data: [{
				value: 7.5,
				itemStyle: {
					color: "rgba(255,255,255,.1)",
					borderWidth: 0
				},
				tooltip: {
					show: false
				},
				hoverAnimation: false
			}, {
				value: 2.5,
				name: '',
				itemStyle: {
					color: "rgba(0,0,0,0)",
					borderWidth: 0
				},
				tooltip: {
					show: false
				},
				hoverAnimation: false
			}]
		});
		res.yAxis.push((data[i].value / sumValue * 100).toFixed(2) + "%")
	}
	return res
}
option = {

	legend: {
		orient: 'vertical',
		show: true,
		top: "20",
		left: 'center',
		data: arrName,
		itemWidth: 12,
        itemHeight: 12,

	//itemGap: 15,
		formatter: function(name) {
			return "{title|" + name + "}:{value|" + (objData[name].value) + "盒}"
		},
		textStyle: {
			color: "rgba(255,255,255,.45)",
			rich: {
				title: {
					fontSize: 12,
					color: "rgba(255,255,255,.45)"
				},
				value: {
					fontSize: 12,
					color: "rgba(255,255,255,.85)"
				}
			}
		},
	},
	tooltip: {
		show: true,
		trigger: "item",
		formatter: "{a}<br>{b}:{c}({d}%)"
	},
	color: ['#FF8700', '#ffc300', '#00e473', '#009DFF'],
	grid: {
		top: '44%',
		bottom: '39%',
		left: "52%",
		containLabel: false
	},
	yAxis: [{
		type: 'category',
		inverse: true,
		axisLine: {
			show: false
		},
		axisTick: {
			show: false
		},
		axisLabel: {
			interval: 0,
			inside: true,
			textStyle: {
				color: "#fff",
				fontSize: 10,
			},
			show: true
		},
		data: optionData.yAxis
	}],
	xAxis: [{
		show: false
	}],
	series: optionData.series
};
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }
function echarts_5() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart5'));
	option = {
	color: ['#1aa1ff', '#31c17b', '#ff6535'],
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
	 grid: {
        left: '0%',
		top:'15px',
        right: '0%',
        bottom: '3%',
       containLabel: true
    },
    xAxis: {
        data: ['2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015'],
        axisLine: {show:false,},
        axisLabel: {
            color: 'rgba(255,255,255,.6)',
            fontSize: 12
        }
    },
    yAxis: {
        name: "（人）",
		 splitNumber:4,
        nameTextStyle: {
             color: 'rgba(255,255,255,.6)',
            fontSize: 12
        },
        axisLine: { show:false, },
        axisLabel: {
            color: 'rgba(255,255,255,.6)',
            fontSize: 12
        },
        splitLine: {
            lineStyle: {
               color: "rgba(255,255,255,.1)",
				 type: "dotted"
            }
        },
        //interval:100,
        //max:500

    },
    series: [{
        type: 'bar',
        barWidth: '25%',
		  itemStyle: {

                normal: {
 barBorderRadius: 50,	
                    color: function(params) {
                        var colorList = ['#4591e3', '#04b8e5', '#04dde5', '#04e5bd', '#04e57e', '#fedb5b', '#e59e04','#ff632d','#ff639e','#ff82e9', '#b562e4'];

                        return colorList[params.dataIndex]

                    },

                    label: {

                        show: true,
                        position: 'top',
                        formatter: '{c}',
   color: 'rgba(255,255,255,.4)',
            fontSize: 12
                    }

                }

            },

        data: [15624, 34568, 29874, 32654, 32103, 26154, 23167, 28563, 11204, 40235]
    }]
};
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }
function echarts_6() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart6'));
   option = {
                legend: {
                    icon:"circle",
                    top: "0",
                    width:'100%',
                    right: 'center',
                    itemWidth: 10,
                    itemHeight: 10,
                 data: ['就诊人数', '预约人数'],
                 textStyle: {
                     color: "rgba(255,255,255,.5)" },
             },
             
                 tooltip: {
                 trigger: 'axis',
                 axisPointer: {
                     lineStyle: {
                         color: '#dddc6b'
                     }
                 }
             },
             grid: {
                 left: '0',
                 top: '30',
                 right: '10',
                 bottom: '-15',
                 containLabel: true
             },
         
             xAxis: [{
                 type: 'category',
                 boundaryGap: false,
         axisLabel:  {
                         textStyle: {
                              color: "rgba(255,255,255,.5)",
                            //  fontSize:10
                         },
                     },
                 axisLine: {
                     lineStyle: { 
                         color: 'rgba(255,255,255,.1)'
                     }
                 },
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
         
             }, {
         
                 axisPointer: {show: false},
                 axisLine: {  show: false},
                 position: 'bottom',
                 offset: 20,
         
                
         
             }],
         
             yAxis: [{
                 type: 'value',
                 axisTick: {show: false},
                 splitNumber: 4,
                 axisLine: {
                     lineStyle: {
                         color: 'rgba(255,255,255,.1)'
                     }
                 },
                axisLabel:  {
                         textStyle: {
                              color: "rgba(255,255,255,.5)",
                              //fontSize:10
                         },
                     },
         
                 splitLine: {
                     lineStyle: {
                          color: 'rgba(255,255,255,.1)',
               type: 'dotted',
                     }
                 }
             }],
             series: [
                 {
                 name: '就诊人数',
                 type: 'line',
               smooth: true,
                 symbol: 'circle',
                 symbolSize: 5,
                 showSymbol: false,
                 lineStyle: {
                     
                     normal: {
                         color: 'rgba(31, 174, 234, 1)',
                         width: 2
                     }
                 },
                 areaStyle: {
                     normal: {
                         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                             offset: 0,
                             color: 'rgba(31, 174, 234, 0.4)'
                         }, {
                             offset: 0.8,
                             color: 'rgba(31, 174, 234, 0.1)'
                         }], false),
                         shadowColor: 'rgba(0, 0, 0, 0.1)',
                     }
                 },
                     itemStyle: {
                     normal: {
                         color: '#1f7eea',
                         borderColor: 'rgba(31, 174, 234, .1)',
                         borderWidth: 5
                     }
                 },
                 data: [178,356, 387, 308, 560, 722, 731]
         
             }, 
         {
                 name: '预约人数',
                 type: 'line',
               smooth: true,
                 symbol: 'circle',
                 symbolSize: 5,
                 showSymbol: false,
                 lineStyle: {
                     
                     normal: {
                         color: '#6bdd9b',
                         width: 2
                     }
                 },
                 areaStyle: {
                     normal: {
                         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                             offset: 0,
                             color: 'rgba(107, 221, 155, 0.4)'
                         }, {
                             offset: 0.8,
                             color: 'rgba(107, 221, 155, 0.1)'
                         }], false),
                         shadowColor: 'rgba(0, 0, 0, 0.1)',
                     }
                 },
                     itemStyle: {
                     normal: {
                         color: '#6bdd9b',
                         borderColor: 'rgba(107, 221, 155, .1)',
                         borderWidth: 5
                     }
                 },
                 data: [ 201, 365, 432, 346, 591, 765, 763]
         
             }, 
                  ]
         
         };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }
function echarts_4() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart4'));
option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: ['康复中', '治疗中', '住院中'],

		top:'2%',
        textStyle: {
            color: "rgba(255,255,255,.5)",
		    fontSize: '12',

        },
        itemWidth: 12,
        itemHeight: 12,
        //itemGap: 35
    },
    grid: {
        left: '0%',
		top:'40px',
        right: '0%',
        bottom: '0%',
       containLabel: true
    },
    xAxis: [{
        type: 'category',
      		data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        axisLine: {
            show: true,
         lineStyle: {
                color: "rgba(255,255,255,.1)",
                width: 1,
               
            },
        },
		
        axisTick: {
            show: false,
        },
		axisLabel:  {
                interval: 0,
               // rotate:50,
                show: true,
                splitNumber: 15,
                textStyle: {
 					color: "rgba(255,255,255,.6)",
                    fontSize: '12',
					
                },
            },
    }],
    yAxis: [{
        type: 'value',
        axisLabel: {
           //formatter: '{value} %'
			show:true,
			 textStyle: {
 					color: "rgba(255,255,255,.6)",
                    fontSize: '12',
                },
        },
        axisTick: {
            show: false,
        },
        axisLine: {
            show: false,
        },
        splitLine: {
            lineStyle: {
               color: "rgba(255,255,255,.1)",
				 type: "dotted"
            }
        }
    }],
    series: [{
        name: '康复中',
        type: 'bar',
        data: [241, 310, 357, 431, 432, 462, 504, 542, 580],
        barWidth:'15%', //柱子宽度
       // barGap: 1, //柱子之间间距
        itemStyle: {
            normal: {
                color:'#2f89cf',
                opacity: 1,
				barBorderRadius: 5,
            }
        }
    }, {
        name: '治疗中',
        type: 'bar',
		data: [102, 130, 151, 178, 191, 230, 258],
		barWidth:'15%',
       // barGap: 1,
        itemStyle: {
            normal: {
                color:'#62c98d',
                opacity: 1,
				barBorderRadius: 5,
            }
        }
    },
			 {
        name: '住院中',
        type: 'bar',
		data: [230, 340, 431, 423, 451, 478, 512],
		barWidth:'15%',
       // barGap: 1,
        itemStyle: {
            normal: {
                color:'#ffc107',
                opacity: 1,
				barBorderRadius: 5,
            }
        }
    },
	]
};
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }
function echarts_7() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart7'));
 option = {
                tooltip: {
                 trigger: 'axis',
                 axisPointer: {type: 'shadow'},
             },
                 grid: {
                 left: '0',
                 right: '0',
                 bottom: '0',
                 top: '10%',
                 containLabel: true
             },
             xAxis: [{
                 type: 'category',
                 data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                 axisLine: {
                     show: true,
                     lineStyle: {
                         color: "#ffffff",
                         width: 1,
                         type: "solid",
                         opacity: 0.3
                     }
                 },
                 axisTick: {
                     show: false
                 },
                 axisLine:{ show: false},
                 axisLabel: {
                     show: true,
                     textStyle: {
                        color: "rgba(255,255,255,.5)",
                     }
                 },
             }],
             yAxis: [{
                 type: 'value',
                 axisLabel: {
                     formatter: '{value}'
                 },
                 
                 axisLine: {
                     show: false,
                 },
                 axisLabel: {
                     show: true,
                     textStyle: {
                        color: "rgba(255,255,255,.5)",
                     }
                 },
                 axisTick: {
                     show: false
                 },
                 splitNumber:3,
                 splitLine: {
                     lineStyle: {
                         color: "rgba(255,255,255,.05)",
                     }
                 }
             }],
             series: [{
                 type: 'pictorialBar',
                 symbol: 'path://M35,0L35,70L0,70z M35,0L35,70L70,70z', 
                 data: [20889, 50143, 80697, 58547, 183987, 48567, 57623, 80887, 122787, 66451, 42785, 66384],
                 barWidth: '40%', //柱子宽度

                 itemStyle: {
                     normal: {
                         color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                             offset: 0,
                             color: '#173f9a'
                         }, {
                             offset: 0.5,
                             color: '#173f9a'
                         }, {
                             offset: 0.5,
                             color: '#247ed1'
                         }
                         , {
                             offset: 1,
                             color: '#247ed1'
                         }]),
                         opacity: 1,
                     }
                 }
             }]
               };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }
})



		
		
		


		










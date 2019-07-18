<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
  import echarts from 'echarts'
  require('echarts/theme/macarons') // echarts theme
  import resize from './../../common/mixins/resize'

  export default {
    mixins: [resize],
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '350px'
      },
      autoResize: {
        type: Boolean,
        default: true
      },
      chartData: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        chart: null
      }
    },
    watch: {
      chartData: {
        deep: true,
        handler(val) {
          this.setOptions(val)
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.initChart()
      })
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      initChart() {
        this.chart = echarts.init(this.$el, 'macarons')
        this.setOptions(this.chartData)

      },
      setOptions({ clicks, cost, ctr, impressions, title } = {}) {
        this.chart.setOption({
          xAxis: {
            data: ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24"],
            boundaryGap: false,
            axisTick: {
              show: false
            }
          },
          grid: {
            left: 10,
            right: 10,
            bottom: 20,
            top: 30,
            containLabel: true
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            },
            padding: [5, 10]
          },
          yAxis: {
            axisTick: {
              show: false
            }
          },
          legend: {
            data: ['周一', '周二', '周三', '周四',"周五", '周六',"周日"]
          },
          series: [
            {
              name: '周一', itemStyle: {
                normal: {
                  color: '#3b78e7',
                  lineStyle: {
                    color: '#3b78e7',
                    width: 2
                  }
                }
              },
              smooth: true,
              type: 'line',
              data: clicks,
              animationDuration: 2800,
              animationEasing: 'cubicInOut'
            },
            {
              name: '周二',
              smooth: true,
              type: 'line',
              itemStyle: {
                normal: {
                  color: '#d23f31',
                  lineStyle: {
                    color: '#d23f31',
                    width: 2
                  }
                }
              },
              data: impressions,
              animationDuration: 2800,
              animationEasing: 'quadraticOut'
            },
            {
              name: '周三',
              smooth: true,
              type: 'line',
              itemStyle: {
                normal: {
                  color: '#f2a600',
                  lineStyle: {
                    color: '#f2a600',
                    width: 2
                  }
                }
              },
              data: ctr,
              animationDuration: 2800,
              animationEasing: 'quadraticOut'
            },
            {
              name: '周四',
              smooth: true,
              type: 'line',
              itemStyle: {
                normal: {
                  color: '#0d904f',
                  lineStyle: {
                    color: '#0d904f',
                    width: 2
                  }
                }
              },
              data: cost,
              animationDuration: 2800,
              animationEasing: 'quadraticOut'
            },
            {
              name: '周五',
              smooth: true,
              type: 'line',
              itemStyle: {
                normal: {
                  color: '#0d904f',
                  lineStyle: {
                    color: '#0d904f',
                    width: 2
                  }
                }
              },
              data: cost,
              animationDuration: 2800,
              animationEasing: 'quadraticOut'
            },
            {
              name: '周六',
              smooth: true,
              type: 'line',
              itemStyle: {
                normal: {
                  color: '#0d904f',
                  lineStyle: {
                    color: '#0d904f',
                    width: 2
                  }
                }
              },
              data: cost,
              animationDuration: 2800,
              animationEasing: 'quadraticOut'
            },
            {
              name: '周日',
              smooth: true,
              type: 'line',
              itemStyle: {
                normal: {
                  color: '#0d904f',
                  lineStyle: {
                    color: '#0d904f',
                    width: 2
                  }
                }
              },
              data: cost,
              animationDuration: 2800,
              animationEasing: 'quadraticOut'
            }

          ]
        })
      }
    }
  }
</script>

<template>
  <div>

    <el-dialog title="图片支持尺寸和格式" :visible.sync="show" size="small">
      <div class="native-form">
        <div class="row">
          <div class="col-md-10 el-col-md-offset-2">


            <table class="DabYb-b DabYb-f" gwtdebugid="tessera-drag-box-sizes-supported-media" v-if="type == 'IMAGE_AD'">
              <colgroup>
                <col>
                <col>
              </colgroup>
              <tbody>
              <tr>
                <td class="DabYb-h">文件类型</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td class="DabYb-g DabYb-e">格式</td>
                <td class="DabYb-g">GIF, JPG, PNG <span style="display: none">, SWF, ZIP</span></td>
              </tr>
              <tr>
                <td class="DabYb-g DabYb-e">最大尺寸</td>
                <td class="DabYb-g">150KB</td>
              </tr>
              <tr>
                <td class="DabYb-i">广告尺寸</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td class="DabYb-a">方形和矩形</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td class="DabYb-g DabYb-e">200 × 200</td>
                <td class="DabYb-g">小方形</td>
              </tr>
              <tr>
                <td class="DabYb-g DabYb-e">240 × 400</td>
                <td class="DabYb-g">竖向矩形</td>
              </tr>
              <tr>
                <td class="DabYb-g DabYb-e">250 × 250</td>
                <td class="DabYb-g">方形</td>
              </tr>
              <tr>
                <td class="DabYb-g DabYb-e">250 × 360</td>
                <td class="DabYb-g">三倍宽屏</td>
              </tr>
              <tr>
                <td class="DabYb-g DabYb-e">300 × 250</td>
                <td class="DabYb-g">内插矩形</td>
              </tr>
              <tr>
                <td class="DabYb-g DabYb-e">336 × 280</td>
                <td class="DabYb-g">大矩形</td>
              </tr>
              <tr>
                <td class="DabYb-g DabYb-e">580 × 400</td>
                <td class="DabYb-g">展板</td>
              </tr>
              <tr>
                <td class="DabYb-a">摩天大楼</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td class="DabYb-g DabYb-e">120 × 600</td>
                <td class="DabYb-g">摩天大楼</td>
              </tr>
              <tr>
                <td class="DabYb-g DabYb-e">160 × 600</td>
                <td class="DabYb-g">宽幅摩天大楼</td>
              </tr>
              <tr>
                <td class="DabYb-g DabYb-e">300 × 600</td>
                <td class="DabYb-g">半版广告</td>
              </tr>
              <tr>
                <td class="DabYb-g DabYb-e">300 × 1050</td>
                <td class="DabYb-g">纵向</td>
              </tr>
              <tr>
                <td class="DabYb-a">页首横幅</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td class="DabYb-g DabYb-e">468 × 60</td>
                <td class="DabYb-g">横幅</td>
              </tr>
              <tr>
                <td class="DabYb-g DabYb-e">728 × 90</td>
                <td class="DabYb-g">页首横幅</td>
              </tr>
              <tr>
                <td class="DabYb-g DabYb-e">930 × 180</td>
                <td class="DabYb-g">顶部横幅</td>
              </tr>
              <tr>
                <td class="DabYb-g DabYb-e">970 × 90</td>
                <td class="DabYb-g">大型页首横幅</td>
              </tr>
              <tr>
                <td class="DabYb-g DabYb-e">970 × 250</td>
                <td class="DabYb-g">广告牌</td>
              </tr>
              <tr>
                <td class="DabYb-g DabYb-e">980 × 120</td>
                <td class="DabYb-g">全景</td>
              </tr>
              <tr>
                <td class="DabYb-a">移动设备</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td class="DabYb-g DabYb-e">300 × 50</td>
                <td class="DabYb-g">移动横幅</td>
              </tr>
              <tr>
                <td class="DabYb-g DabYb-e">320 × 50</td>
                <td class="DabYb-g">移动横幅</td>
              </tr>
              <tr>
                <td class="DabYb-g DabYb-e">320 × 100</td>
                <td class="DabYb-g">大型移动横幅</td>
              </tr>
              <tr>
                <td class="DabYb-e" colspan="3">
                  <div></div>
                </td>
                <td>&nbsp;</td>
              </tr>
              </tbody>
            </table>

            <table class="DabYb-b DabYb-f" gwtdebugid="tessera-drag-box-sizes-supported-media" v-if="type == 'RESPONSIVE_DISPLAY_AD'">
              <colgroup>
                <col>
                <col>
              </colgroup>
              <tbody>
              <tr>
                <td class="DabYb-h">文件类型</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td class="DabYb-g DabYb-e">格式</td>
                <td class="DabYb-g">GIF, JPG, PNG <span style="display: none">, SWF, ZIP</span></td>
              </tr>
              <tr>
                <td class="DabYb-g DabYb-e">最大文件大小</td>
                <td class="DabYb-g">1MB（1,048,576 字节）</td>
              </tr>
              <tr>
                <td class="DabYb-i">广告尺寸</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td class="DabYb-a">营销图片</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td class="DabYb-g DabYb-e">600 × 314</td>
                <td class="DabYb-g">最小尺寸</td>
              </tr>
              <!--<tr>-->
                <!--<td class="DabYb-g DabYb-e">1.91:1 比例的 1% 范围内</td>-->
                <!--<td class="DabYb-g">大于最小尺寸</td>-->
              <!--</tr>-->
              <tr>
                <td class="DabYb-g DabYb-e">1200 × 628</td>
                <td class="DabYb-g">建议尺寸</td>
              </tr>

              <tr>
                <td class="DabYb-a">  徽标图片（可选）</td>
                <td>&nbsp;</td>
              </tr>
              <!--<tr>-->
                <!--<td class="DabYb-g DabYb-e">128 × 128</td>-->
                <!--<td class="DabYb-g">最小尺寸</td>-->
              <!--</tr>-->
              <!--<tr>-->
                <!--<td class="DabYb-g DabYb-e">256 × 256</td>-->
                <!--<td class="DabYb-g">512尺寸</td>-->
              <!--</tr>-->
              <tr>
                <td class="DabYb-g DabYb-e">512 × 512</td>
                <td class="DabYb-g">512尺寸</td>
              </tr>
              <tr>
                <td class="DabYb-g DabYb-e">1024 × 1024</td>
                <td class="DabYb-g">1024尺寸</td>
              </tr>
              <!--<tr>-->
                <!--<td class="DabYb-g DabYb-e">1:1 比例的 1% 范围内</td>-->
                <!--<td class="DabYb-g">大于最小尺寸</td>-->
              <!--</tr>-->
              <tr>
                <td class="DabYb-g DabYb-e">1200 × 12000</td>
                <td class="DabYb-g">建议尺寸</td>
              </tr>

              <tr>
                <td class="DabYb-e" colspan="3">
                  <div></div>
                </td>
                <td>&nbsp;</td>
              </tr>
              </tbody>
            </table>

          </div>
        </div>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="show = false">关闭</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
	export default {
		props: {
			dialogOptions: {
				type: Object,
				required: false,
			}
		},
		data() {
			return {
				show: false,
        type:''
			}
		}
	};
</script>

<style lang="scss" scoped>
  .DabYb-b {
    min-width: 250px;
    max-width: 400px;
  }

  .DabYb-i, .DabYb-h {
    font-size: 13px;
    font-family: Arial;
    font-weight: bold;
    color: #222;
    padding-right: 10px;
    line-height: 20px;
  }

  .DabYb-e {
    padding-left: 10px;
  }

  .DabYb-g {
    font-size: 13px;
    font-family: Arial;
    color: #555;
    padding-right: 10px;
    line-height: 20px;
  }

  .DabYb-a {
    color: #666;
    font-weight: bold;
    padding-top: 6px;
    line-height: 20px;
  }
</style>
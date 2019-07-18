<template>
  <div >
    <div class="demonstration">
      <div class="header">
        正在预览第 1 页（共 3 页）
      </div>

      <el-carousel trigger="click" class="demonstration-box">
        <!--移动设备-->
        <el-carousel-item>
          <div class="row">
            <div class="device-title">移动设备</div>
            <div class="google-mobile">
              <div class="cod-t">
                <p class="csc-d"><span>{{ form.headline }}</span>-<span>{{ form.headline1 }}</span>
                </p>
                <p class="csc-c"><span class="inline-block csc-b">广告</span> <span>{{ form.final_url }}</span></p>
                <div class="csc-c cod-n">{{ form.description1 }}</div>
              </div>
            </div>
          </div>
        </el-carousel-item>

        <!--桌面设备-->
        <el-carousel-item>
          <div class="row">
            <div class="device-title">桌面设备</div>
            <div class="google-windows">
              <p class="csc-d"><a target="_blank" :href="form.finalUrl">{{ form.headline }} {{ form.headline1 }} {{ form.headline2 }}</a></p>
              <p class="csc-c"><span class="inline-block csc-b">广告</span> <span>{{ form.final_urls }}/ {{ form.path1 }} / {{ form.path2 }}</span></p>
              <div class="csc-c cod-n">{{ form.description1 }} {{ form.description2 }} </div>
            </div>
          </div>
          <p>
            您的广告不一定总是显示全部文字。在某些广告格式中，可能会出现一定程度的省略。不过，您可以确保在广告中始终显示某些文字。
          </p>
        </el-carousel-item>

        <!--展示-->
        <el-carousel-item>
          <div class="row">
            <div class="device-title">展示</div>
            <div class="google-show">
              <div class="line-box">
                <p class="line1">{{ form.headline }}</p>
                <p class="line2">{{ form.headline1 }}</p>
                <p class="line3">{{ form.description1 }}</p>
                <p class="line4">{{ form.final_urls }}</p>
              </div>

              <div class="open-box">
                <a class="open-btn" :herf="form.final_urls">打开</a>
              </div>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
  export default {
    name: "show-text-ad",
    props: ["form"]
  }
</script>

<style lang="scss" scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    margin: 0;
  }

  .demonstration{
    display: block;
    width: 100%;
    padding: 10px;
    .demonstration-box{
      height: 400px;
      margin: 10px 0;
    }
    .header{
      height: 57px;
      line-height: 57px;
      text-align: center;
      width: 100%;
      background-color: #eeeeee;
      border-bottom: 1px solid #f5f5f5;
    }
  }

  .google-mobile {
    border-top-left-radius: 32px;
    border-top-right-radius: 32px;
    border: 3px solid #bcbcbc;
    .cod-t {
      background-color: #f5f5f5;
      border-color: #fff;
      border-style: solid;
      border-top-left-radius: 32px;
      border-top-right-radius: 32px;
      border-width: 32px 8px 0;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      flex: 1;
      justify-content: flex-start;
      padding: 8px;
      img {
        width: 200px;
      }
    }
  }
  .row{
    .device-title{
      margin: 8px;
      color: rgba(0,0,0,.54);
      font-size: 12px;
    }

  }
  .google-windows {
    border: 1px solid #ddd;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 4px 0 rgba(0, 0, 0, 0.2);
    padding: 10px;
    min-height: 100px;
    background-color: #fff;
    p{
      margin: 0;
    };
    img {
      width: 250px;
    }
  }
  .google-show{
     width: 300px;
     margin: 0 auto;
     border: 1px solid #d7d7d7;
    .line-box{
      padding: 10px;
    }
    .line1{
      color: #37474f;
      font-weight: 700;
      font-size: 18px;
    }
    .line2{
      color: #37474f;
      font-weight: 500;
      font-size: 16px;
    }
    .line3{
      color: #888888;
      font-weight: 400;
      font-size: 14px;
    }
    .line4{
      color: #888888;
      font-size: 12px;
    }
    .open-box{
      height: 60px;
      width: 100%;
      padding: 15px;
      background-color: #eeeeee;
    }

    .open-btn{
      margin: 0 auto;
      background-color: #0088ff;
      border-radius: 15px;
      border-width: 0px;
      height: 30px;
      min-width: 150px;
      max-width: 294px;
      width: 100px;
      display: block;
      text-align: center;
      line-height: 30px;
      color: #fff;
      box-shadow: 0 0 2px 0 rgba(0,0,0,0.12), 0 2px 2px 0 rgba(0,0,0,0.24);
      font-family: "Roboto",arial,sans-serif;
      font-weight: 500;
      text-transform: uppercase;
      &:hover{
        background: #2d8fe5;
      }
    }
  }


  .csc-d {
    color: #1a0dab;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
    line-height: 20px;
  }

  .csc-f {
    color: #006621;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .csc-c {
    font-size: 11px;
    color: #545454;
  }

  .cod-n {
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .csc-b {
    border-radius: 2px;
    border: 1px solid #006621;
    color: #006621;
    display: inline-block;
    font-size: 12px;
    line-height: 14px;
    margin-left: 0;
    margin-right: 2px;
    padding: 0 2px;
    vertical-align: baseline;
  }


</style>

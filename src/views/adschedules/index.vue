<template>
    <div class>
        <!--导航-->
        <adschedules-header />

        <!--报表-->
        <el-row v-if="operationName == '' || operationName == 'edit' ">
            <line-chart :chart-data="lineChartData" />
        </el-row>

        <!--添加关键字-->
        <add-adschedules
            v-if="operationName == 'add'"
            v-on:setOperationName="setOperationName"
            :adGroupId="adGroupId"
            :campaignId="campaignId"
        />

        <!--编辑栏-->
        <operation-edit
            v-if="operationName == 'edit'"
            :multipleSelection="multipleSelection"
            v-on:setOperationName="setOperationName"
            v-on:operationStatus="operationStatus"
        />
        <!--操作栏-->
        <operation-table
            v-if="operationName ==''"
            :setKeywordStatus="setKeywordStatus"
            v-on:setOperationName="setOperationName"
        />

        <!--表格-->
        <adschedules-table
            ref="AdschedulesTable"
            :campaignStatus="campaignStatus"
            :campaignType="campaignType"
            :adGroupStatus="adGroupStatus"
            :campaignId="campaignId"
            :adGroupId="adGroupId"
            v-on:setMultipleSelection="setMultipleSelection"
        />
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import LineChart from "./components/LineChart";
import { deleteAdschedules } from "@/api/adschedules";
import AdschedulesHeader from "./components/AdschedulesHeader";
import OperationEdit from "./components/OperationEdit";
import OperationTable from "./components/OperationTable";
import AddAdschedules from "./components/AddAdschedules";
import AdschedulesTable from "./components/AdschedulesTable";

export default {
    name: "Adschedules",
    components: {
        LineChart,
        AdschedulesHeader,
        AddAdschedules,
        AdschedulesTable,
        OperationEdit,
        OperationTable
    },
    data() {
        return {
            lineChartData: {},
            operationName: "", // 正常 | edit 编辑 | add 添加
            multipleSelection: []
        };
    },
    computed: {
        ...mapGetters([
            "campaignType",
            "campaignStatus",
            "adGroupStatus",
            "campaignId",
            "adGroupId"
        ])
    },
    watch: {
        campaignId: function(newd, old) {
            this.$refs.AdschedulesTable.post.table.page = 1;
            this.$refs.AdschedulesTable.post.table.googleCampaignId = this.campaignId;
            this.$refs.AdschedulesTable.fetchData();
        },
        campaignStatus: function(newd, old) {
            this.$refs.AdschedulesTable.post.table.page = 1;
            this.$refs.AdschedulesTable.post.table.googleCampaignStatus = this.campaignStatus;
            this.$refs.AdschedulesTable.fetchData();
        },
        adGroupId: function(newd, old) {
            this.$refs.AdschedulesTable.post.table.page = 1;
            this.$refs.AdschedulesTable.post.table.adGroupId = this.adGroupId;
            this.$refs.AdschedulesTable.fetchData();
        }
    },
    methods: {
        setKeywordStatus() {
            this.$refs.AdschedulesTable.post.table.status = status;
            this.fetchData();
        },
        setMultipleSelection(val) {
            if (val.length == 0) {
                this.operationName = "";
            } else {
                this.operationName = "edit";
            }
            this.multipleSelection = val;
        },
        setOperationName(name) {
            this.operationName = name;
        },
        operationStatus(status) {
            let self = this;
            var ids = [];
            this.multipleSelection.forEach(function(item) {
                ids.push(item.id);
            });
            if (ids.length == 0) {
                self.$message({
                    message: "请选择投放时间",
                    type: "info"
                });
                return;
            }
            // 删除接口
            deleteAdschedules({
                ids: ids
            }).then(response => {
                if (response.success) {
                    self.$message({
                        message: "批量操作成功",
                        type: "success"
                    });
                    this.$refs.AdschedulesTable.fetchData();
                }
            });
        }
    }
};
</script>


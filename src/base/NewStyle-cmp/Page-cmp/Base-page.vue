<!--
  User: gaol
  Date: 2020/7/31
  功能：页面通用 组件  controlType 为
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.basePage-cmp-wrap {
    min-height: 600px;
    padding: 0 20px 20px;
    box-sizing: border-box;
    .back {
        text-align: right;
        &::after {
            cursor pointer
        }
    }
    .sectionItem {
        // border-bottom: 1px dotted silver;
        border: 1px dotted silver;
        padding: 20px;
        box-sizing: border-box;
    }
}
</style>
<template>
    <div :class="['basePage-cmp-wrap', pageModel.lenth<=0? 'not_found':'']" v-loading="pageLoading" >
        <div class="back">
            <icon-svg :icon-class="backIcon" @click.native="backPage"></icon-svg>
        </div>          
        <!-- 通用页面组件 -->
        <!-- pageModel: {{pageModel}} -->
        <!----组件部分------>
        <!-- <up-text-cmp sectionData='<div style="color: red">重新入职说明区1</div>'></up-text-cmp> -->
        <el-row>         
            <el-col 
                :span="24" 
                class="sectionItem marginT20"
                v-for="(section, key) in pageModel"
                :key="key"
            >
                <!-- section.Section: {{section.Section}}
                ------
                section: {{section}} -->
                <component 
                    :is="whichSection(section, key)"
                    :sectionData='section'
                    :textData="section.SectionData"
                ></component>
            </el-col>
        </el-row>
    </div>
</template>

<script type="text/ecmascript-6">
  import { 
    REQ_OK, 
  } from '@/api/config'
  import { fieldControlTypeMixin } from '@/utils/newStyleMixins-components.js'
//   import TabCmp from '@/base/NewStyle-cmp/Content-section-cmp/Tab-cmp/Base-tab'
  import TitleCmp from '@/base/NewStyle-cmp/Title-section-cmp/Base-Title'
  import ShowFieldsCmp from '@/base/NewStyle-cmp/ShowFields-section-cmp/Base-ShowFields'
//   import Search11 from '@/base/NewStyle-cmp/Search11-section-cmp/Base-Search11'
  import NotFoundCmp from '@/base/errorPage/404'
  import UpTextCmp from '@/base/NewStyle-cmp/UpText-section-cmp/Base-Uptext'
  import UpBtnCmp from '@/base/NewStyle-cmp/UpBtn-section-cmp/Base-UpBtn'
  import DownBtnCmp from '@/base/NewStyle-cmp/DownBtn-section-cmp/Base-DownBtn'
  import OutBtnCmp from '@/base/NewStyle-cmp/Content-section-cmp/OutBtn-cmp/Base-OutBtn'
  import ContentCmpComSection from '@/base/NewStyle-cmp/Content-section-cmp/Base-Content-cmp'
  import DownTextCmp from '@/base/NewStyle-cmp/DownText-section-cmp/Base-DownText'
  import LinkCmp from '@/base/NewStyle-cmp/Link-section-cmp/Base-Link'
  import TailCmp from '@/base/NewStyle-cmp/Tail-section-cmp/Base-Tail'
  import {
    GetPageModelData
  } from '@/api/newStyle'
  import iconSvg from '@/base/Icon-svg/index'

  let configData = {
    "State":1,
    "Data":[
        {
            "Section":"ShowF",
            "SortId":1,
            "SectionData":[

            ],
            "Id":0
        },
        {
            "Section":"UpText",
            "SortId":2,
            "SectionData":[
                {
                    "CombineType":"0030300",
                    "AttriType":null,
                    "MetaCode":"",
                    "MetaAttr":null,
                    "RelateId":"",
                    "RelateFieldAttr":null,
                    "Collapsed":null,
                    "ShowDiscrip":null,
                    "IsShow":null,
                    "Value":"<p><span style='color:rgb(230, 0, 0)'>P1上部文本区1</span></p>",
                    "SortId":1,
                    "Paral":"",
                    "State":1
                },
                {
                    "CombineType":"0030300",
                    "AttriType":null,
                    "MetaCode":"",
                    "MetaAttr":null,
                    "RelateId":"",
                    "RelateFieldAttr":null,
                    "Collapsed":null,
                    "ShowDiscrip":null,
                    "IsShow":null,
                    "Value":"<p><span style='color:rgb(230, 0, 0)'>P1上部文本区1</span></p>",
                    "SortId":2,
                    "Paral":"",
                    "State":1
                }
            ],
            "Id":0
        },
        {
            "Section":"UpBtn",
            "SortId":3,
            "SectionData":[
                {
                    "CombineType":"0040401",
                    "AttriType":null,
                    "MetaCode":"AddPFileLocat2",
                    "MetaAttr":{
                        "ModuleCode":"PA",
                        "CombineType":"0040401",
                        "LogicMetaCode":"AddPFileLocat2",
                        "ShortName":"新增",
                        "CAR":"Add-TM",
                        "Pk":"PersonId",
                        "Key":"FBn.AddPFileLocat",
                        "Paral":"",
                        "TemplateId":"TBn01",
                        "Event":"Add-TM",
                        "Icon":"https://www.caihuiyun.cn/Content/CompanySite_New/four-ico-4.png",
                        "IsPc":null,
                        "IsMobile":null,
                        "FuncIsAtom":null,
                        "FuncIsDepend":null,
                        "State":1,
                        "Id":302
                    },
                    "RelateId":"",
                    "RelateFieldAttr":null,
                    "Collapsed":null,
                    "ShowDiscrip":null,
                    "IsShow":null,
                    "Value":"",
                    "SortId":1,
                    "Paral":"",
                    "State":1
                },
                {
                    "CombineType":"0040401",
                    "AttriType":null,
                    "MetaCode":"DelPFileLocat2",
                    "MetaAttr":{
                        "ModuleCode":"PA",
                        "CombineType":"0040401",
                        "LogicMetaCode":"DelPFileLocat2",
                        "ShortName":"删除",
                        "CAR":"Del-TM",
                        "Pk":"PersonId",
                        "Key":"FBn.DelPFileLocat",
                        "Paral":"",
                        "TemplateId":"TBn01",
                        "Event":"Del-TM",
                        "Icon":"https://www.caihuiyun.cn/Content/CompanySite_New/four-ico-4.png",
                        "IsPc":null,
                        "IsMobile":null,
                        "FuncIsAtom":null,
                        "FuncIsDepend":null,
                        "State":1,
                        "Id":303
                    },
                    "RelateId":"",
                    "RelateFieldAttr":null,
                    "Collapsed":null,
                    "ShowDiscrip":null,
                    "IsShow":null,
                    "Value":"",
                    "SortId":2,
                    "Paral":"",
                    "State":1
                },
                {
                    "CombineType":"0040401",
                    "AttriType":null,
                    "MetaCode":"EditPFileLocat2",
                    "MetaAttr":{
                        "ModuleCode":"PA",
                        "CombineType":"0040401",
                        "LogicMetaCode":"EditPFileLocat2",
                        "ShortName":"删除",
                        "CAR":"Edit-TM",
                        "Pk":"PersonId",
                        "Key":"FBn.EditPFileLocat",
                        "Paral":"",
                        "TemplateId":"TBn01",
                        "Event":"Edit-TM",
                        "Icon":"https://www.caihuiyun.cn/Content/CompanySite_New/four-ico-4.png",
                        "IsPc":null,
                        "IsMobile":null,
                        "FuncIsAtom":null,
                        "FuncIsDepend":null,
                        "State":1,
                        "Id":304
                    },
                    "RelateId":"",
                    "RelateFieldAttr":null,
                    "Collapsed":null,
                    "ShowDiscrip":null,
                    "IsShow":null,
                    "Value":"",
                    "SortId":3,
                    "Paral":"",
                    "State":1
                }
            ],
            "Id":0
        },
        {
            "Section":"Content",
            "SortId":4,
            "SectionData":[
                {
                    "CombineType":"0030303",
                    "AttriType":null,
                    "MetaCode":"CPPJobRecord",
                    "MetaAttr":{
                        "ModuleCode":"PA",
                        "CombineType":"0030303",
                        "LogicMetaCode":"CPPJobRecord",
                        "ShortName":"在职记录",
                        "CAR":"",
                        "Pk":"PersonId",
                        "Key":"FCP.PJobRecord",
                        "Paral":"",
                        "TemplateId":"TCTM01",
                        "Event":"",
                        "Icon":"https://www.caihuiyun.cn/Content/CompanySite_New/four-ico-3.png",
                        "IsPc":null,
                        "IsMobile":null,
                        "FuncIsAtom":null,
                        "FuncIsDepend":null,
                        "State":1,
                        "Id":191
                    },
                    "RelateId":"",
                    "RelateFieldAttr":null,
                    "Collapsed":1,
                    "ShowDiscrip":1,
                    "IsShow":1,
                    "Value":"",
                    "SortId":1,
                    "Paral":"",
                    "State":1
                },
                {
                    "CombineType":"0030303",
                    "AttriType":null,
                    "MetaCode":"CPPWorkHis",
                    "MetaAttr":{
                        "ModuleCode":"PA",
                        "CombineType":"0030303",
                        "LogicMetaCode":"CPPWorkHis",
                        "ShortName":"工作",
                        "CAR":"",
                        "Pk":"PersonId",
                        "Key":"FCP.PWorkHis",
                        "Paral":"",
                        "TemplateId":"TCTM01",
                        "Event":"",
                        "Icon":"https://www.caihuiyun.cn/Content/CompanySite_New/four-ico-2.png",
                        "IsPc":null,
                        "IsMobile":null,
                        "FuncIsAtom":null,
                        "FuncIsDepend":null,
                        "State":1,
                        "Id":203
                    },
                    "RelateId":"",
                    "RelateFieldAttr":null,
                    "Collapsed":0,
                    "ShowDiscrip":0,
                    "IsShow":0,
                    "Value":"",
                    "SortId":2,
                    "Paral":"",
                    "State":1
                },
                {
                    "CombineType":"0101001",
                    "AttriType":null,
                    "MetaCode":"SHFamMember",
                    "MetaAttr":{
                        "ModuleCode":"PA",
                        "CombineType":"101001",
                        "LogicMetaCode":"SHFamMember",
                        "ShortName":"家庭成员",
                        "CAR":"",
                        "Pk":"PersonId",
                        "Key":"SH.SHFamMember",
                        "Paral":"",
                        "TemplateId":"TSH01",
                        "Event":"",
                        "Icon":"https://www.caihuiyun.cn/Content/CompanySite_New/four-ico-1.png",
                        "IsPc":1,
                        "IsMobile":1,
                        "FuncIsAtom":1,
                        "FuncIsDepend":0,
                        "State":1,
                        "Id":41
                    },
                    "RelateId":"",
                    "RelateFieldAttr":null,
                    "Collapsed":1,
                    "ShowDiscrip":1,
                    "IsShow":1,
                    "Value":"",
                    "SortId":3,
                    "Paral":"",
                    "State":1
                },
                {
                    "CombineType":"0101001",
                    "AttriType":null,
                    "MetaCode":"SHVocTitles",
                    "MetaAttr":{
                        "ModuleCode":"PA",
                        "CombineType":"101001",
                        "LogicMetaCode":"SHVocTitles",
                        "ShortName":"职称",
                        "CAR":"",
                        "Pk":"PersonId",
                        "Key":"SH.SHVocTitles",
                        "Paral":"",
                        "TemplateId":"TSH01",
                        "Event":"",
                        "Icon":"https://www.caihuiyun.cn/Content/CompanySite_New/four-ico-4.png",
                        "IsPc":1,
                        "IsMobile":1,
                        "FuncIsAtom":1,
                        "FuncIsDepend":0,
                        "State":1,
                        "Id":44
                    },
                    "RelateId":"",
                    "RelateFieldAttr":null,
                    "Collapsed":0,
                    "ShowDiscrip":0,
                    "IsShow":0,
                    "Value":"",
                    "SortId":4,
                    "Paral":"",
                    "State":1
                },
                {
                    "CombineType":"0111102",
                    "AttriType":null,
                    "MetaCode":"MPGender",
                    "MetaAttr":{
                        "ModuleCode":"PA",
                        "CombineType":"111102",
                        "LogicMetaCode":"MPGender",
                        "ShortName":"性别比图",
                        "CAR":"",
                        "Pk":"PersonId",
                        "Key":"MP.MPGender",
                        "Paral":"PRPersReInfo:X,Gender;Y,%",
                        "TemplateId":"TMP01",
                        "Event":"",
                        "Icon":"https://www.caihuiyun.cn/Content/CompanySite_New/four-ico-1.png",
                        "IsPc":1,
                        "IsMobile":1,
                        "FuncIsAtom":1,
                        "FuncIsDepend":0,
                        "State":1,
                        "Id":51
                    },
                    "RelateId":"",
                    "RelateFieldAttr":null,
                    "Collapsed":1,
                    "ShowDiscrip":1,
                    "IsShow":1,
                    "Value":"",
                    "SortId":5,
                    "Paral":"",
                    "State":1
                },
                {
                    "CombineType":"0111101",
                    "AttriType":null,
                    "MetaCode":"MPMariSta",
                    "MetaAttr":{
                        "ModuleCode":"PA",
                        "CombineType":"111101",
                        "LogicMetaCode":"MPMariSta",
                        "ShortName":"婚姻状态图",
                        "CAR":"",
                        "Pk":"PersonId",
                        "Key":"MP.MPMariSta",
                        "Paral":"PPersData:X,PMariStatus;Y:SUM;X,PReligion;Y:SUM",
                        "TemplateId":"TMP01",
                        "Event":"",
                        "Icon":"https://www.caihuiyun.cn/Content/CompanySite_New/four-ico-1.png",
                        "IsPc":1,
                        "IsMobile":1,
                        "FuncIsAtom":1,
                        "FuncIsDepend":0,
                        "State":1,
                        "Id":52
                    },
                    "RelateId":"",
                    "RelateFieldAttr":null,
                    "Collapsed":0,
                    "ShowDiscrip":0,
                    "IsShow":0,
                    "Value":"",
                    "SortId":6,
                    "Paral":"",
                    "State":1
                }
            ],
            "Id":0
        },
        {
            "Section":"DownBtn",
            "SortId":5,
            "SectionData":[
                {
                    "CombineType":"006",
                    "AttriType":null,
                    "MetaCode":"Pre Hire",
                    "MetaAttr":null,
                    "RelateId":"",
                    "RelateFieldAttr":null,
                    "Collapsed":null,
                    "ShowDiscrip":null,
                    "IsShow":null,
                    "Value":"",
                    "SortId":1,
                    "Paral":"",
                    "State":1
                },
                {
                    "CombineType":"006",
                    "AttriType":null,
                    "MetaCode":"Rehire",
                    "MetaAttr":{
                        "ModuleCode":"PA",
                        "CombineType":"006",
                        "LogicMetaCode":"Rehire",
                        "ShortName":"重新入职",
                        "CAR":"",
                        "Pk":"PersonId",
                        "Key":"",
                        "Paral":"",
                        "TemplateId":"TP01",
                        "Event":"",
                        "Icon":"https://www.caihuiyun.cn/Content/CompanySite_New/four-ico-6.png",
                        "IsPc":null,
                        "IsMobile":null,
                        "FuncIsAtom":null,
                        "FuncIsDepend":null,
                        "State":1,
                        "Id":237
                    },
                    "RelateId":"",
                    "RelateFieldAttr":null,
                    "Collapsed":null,
                    "ShowDiscrip":null,
                    "IsShow":null,
                    "Value":"",
                    "SortId":2,
                    "Paral":"",
                    "State":1
                },
                {
                    "CombineType":"006",
                    "AttriType":null,
                    "MetaCode":"Directlyon board",
                    "MetaAttr":null,
                    "RelateId":"",
                    "RelateFieldAttr":null,
                    "Collapsed":null,
                    "ShowDiscrip":null,
                    "IsShow":null,
                    "Value":"",
                    "SortId":3,
                    "Paral":"",
                    "State":1
                }
            ],
            "Id":0
        },
        {
            "Section":"DownText",
            "SortId":6,
            "SectionData":[
                {
                    "CombineType":"0030300",
                    "AttriType":null,
                    "MetaCode":"",
                    "MetaAttr":null,
                    "RelateId":"",
                    "RelateFieldAttr":null,
                    "Collapsed":null,
                    "ShowDiscrip":null,
                    "IsShow":null,
                    "Value":"<p><span style='color:rgb(230, 0, 0)'>P1上部文本区1</span></p>",
                    "SortId":1,
                    "Paral":"",
                    "State":1
                },
                {
                    "CombineType":"0030300",
                    "AttriType":null,
                    "MetaCode":"",
                    "MetaAttr":null,
                    "RelateId":"",
                    "RelateFieldAttr":null,
                    "Collapsed":null,
                    "ShowDiscrip":null,
                    "IsShow":null,
                    "Value":"<p><span style='color:rgb(230, 0, 0)'>P1上部文本区1</span></p>",
                    "SortId":2,
                    "Paral":"",
                    "State":1
                }
            ],
            "Id":0
        },
        {
            "Section":"Link",
            "SortId":7,
            "SectionData":[
                {
                    "CombineType":"0020201",
                    "AttriType":null,
                    "MetaCode":"P2",
                    "MetaAttr":{
                        "ModuleCode":"PA",
                        "CombineType":"0020201",
                        "LogicMetaCode":"P2",
                        "ShortName":"页面2",
                        "CAR":"",
                        "Pk":"PersonId",
                        "Key":"P.P0002",
                        "Paral":"",
                        "TemplateId":"TP01",
                        "Event":"",
                        "Icon":"https://www.caihuiyun.cn/Content/CompanySite_New/four-ico-4.png",
                        "IsPc":null,
                        "IsMobile":null,
                        "FuncIsAtom":null,
                        "FuncIsDepend":null,
                        "State":1,
                        "Id":251
                    },
                    "RelateId":"",
                    "RelateFieldAttr":null,
                    "Collapsed":null,
                    "ShowDiscrip":null,
                    "IsShow":null,
                    "Value":"",
                    "SortId":1,
                    "Paral":"",
                    "State":1
                },
                {
                    "CombineType":"0020201",
                    "AttriType":null,
                    "MetaCode":"P3",
                    "MetaAttr":{
                        "ModuleCode":"PA",
                        "CombineType":"0020201",
                        "LogicMetaCode":"P3",
                        "ShortName":"页面3",
                        "CAR":"",
                        "Pk":"PersonId",
                        "Key":"P.P0003",
                        "Paral":"",
                        "TemplateId":"TP01",
                        "Event":"",
                        "Icon":"https://www.caihuiyun.cn/Content/CompanySite_New/four-ico-1.png",
                        "IsPc":null,
                        "IsMobile":null,
                        "FuncIsAtom":null,
                        "FuncIsDepend":null,
                        "State":1,
                        "Id":252
                    },
                    "RelateId":"",
                    "RelateFieldAttr":null,
                    "Collapsed":null,
                    "ShowDiscrip":null,
                    "IsShow":null,
                    "Value":"",
                    "SortId":2,
                    "Paral":"",
                    "State":1
                },
                {
                    "CombineType":"0020201",
                    "AttriType":null,
                    "MetaCode":"P4",
                    "MetaAttr":{
                        "ModuleCode":"PA",
                        "CombineType":"0020201",
                        "LogicMetaCode":"P4",
                        "ShortName":"页面4",
                        "CAR":"",
                        "Pk":"PersonId",
                        "Key":"P.P0004",
                        "Paral":"",
                        "TemplateId":"TP01",
                        "Event":"",
                        "Icon":"https://www.caihuiyun.cn/Content/CompanySite_New/four-ico-2.png",
                        "IsPc":null,
                        "IsMobile":null,
                        "FuncIsAtom":null,
                        "FuncIsDepend":null,
                        "State":1,
                        "Id":253
                    },
                    "RelateId":"",
                    "RelateFieldAttr":null,
                    "Collapsed":null,
                    "ShowDiscrip":null,
                    "IsShow":null,
                    "Value":"",
                    "SortId":3,
                    "Paral":"",
                    "State":1
                }
            ],
            "Id":0
        },
        {
            "Section":"Tail",
            "SortId":8,
            "SectionData":[
                {
                    "CombineType":"013",
                    "AttriType":null,
                    "MetaCode":"",
                    "MetaAttr":null,
                    "RelateId":"Submitter",
                    "RelateFieldAttr":null,
                    "Collapsed":null,
                    "ShowDiscrip":null,
                    "IsShow":null,
                    "Value":"",
                    "SortId":1,
                    "Paral":"",
                    "State":1
                },
                {
                    "CombineType":"013",
                    "AttriType":null,
                    "MetaCode":"",
                    "MetaAttr":null,
                    "RelateId":"SubmitDT",
                    "RelateFieldAttr":null,
                    "Collapsed":null,
                    "ShowDiscrip":null,
                    "IsShow":null,
                    "Value":"",
                    "SortId":2,
                    "Paral":"",
                    "State":1
                },
                {
                    "CombineType":"013",
                    "AttriType":null,
                    "MetaCode":"",
                    "MetaAttr":null,
                    "RelateId":"Reviewer",
                    "RelateFieldAttr":null,
                    "Collapsed":null,
                    "ShowDiscrip":null,
                    "IsShow":null,
                    "Value":"",
                    "SortId":3,
                    "Paral":"",
                    "State":1
                },
                {
                    "CombineType":"013",
                    "AttriType":null,
                    "MetaCode":"",
                    "MetaAttr":null,
                    "RelateId":"ReiewDT",
                    "RelateFieldAttr":null,
                    "Collapsed":null,
                    "ShowDiscrip":null,
                    "IsShow":null,
                    "Value":"",
                    "SortId":4,
                    "Paral":"",
                    "State":1
                },
                {
                    "CombineType":"013",
                    "AttriType":null,
                    "MetaCode":"",
                    "MetaAttr":null,
                    "RelateId":"Approver",
                    "RelateFieldAttr":null,
                    "Collapsed":null,
                    "ShowDiscrip":null,
                    "IsShow":null,
                    "Value":"",
                    "SortId":5,
                    "Paral":"",
                    "State":1
                },
                {
                    "CombineType":"013",
                    "AttriType":null,
                    "MetaCode":"",
                    "MetaAttr":null,
                    "RelateId":"ApproveDT",
                    "RelateFieldAttr":null,
                    "Collapsed":null,
                    "ShowDiscrip":null,
                    "IsShow":null,
                    "Value":"",
                    "SortId":6,
                    "Paral":"",
                    "State":1
                }
            ],
            "Id":0
        }
    ],
    "Error":"",
    "DataCount":0,
    "PageIndex":0,
    "PageSize":0,
    "Total":0,
    "PageCount":1
  }
  export default {
    name: 'basepage',
    mixins: [ fieldControlTypeMixin ],
    components: {
        iconSvg,
        TitleCmp,
        // Search11,
        NotFoundCmp,
        ContentCmpComSection,
        UpTextCmp,
        UpBtnCmp,
        OutBtnCmp,
        DownBtnCmp,
        DownTextCmp,
        TailCmp
    },
    props: {
        pageCode: {
            type: String,
            default: ''
        },
        authrityObj: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    computed: {

    },
    data () {
      return {
        pageLoading: false,
        backIcon: 'preStep',
        currentPageData: {
            components: [
                {
                    controlType: 'fieldGroup',
                    comsData: {
                        fieldGroup: [
                            {
                                groupName: '分组1',
                                groupCode: 'team1',
                                Fields: [
                                    {
                                        controlType: "1",
                                        FieldName: "字段1",
                                        FieldValue: "ceshi",
                                        Hidden: false,
                                        Tips: '这是tips内容',
                                        isTitle: true,
                                        Required: true
                                    },
                                    {
                                        controlType: "5",
                                        FieldName: "字段2",
                                        FieldValue: "c",
                                        Hidden: false,
                                        Tips: '这是tips内容',
                                        isTitle: true,
                                        Required: true                                   
                                    }
                                ]
                            },
                            {
                                groupName: '分组2',
                                groupCode: 'team2',
                                Fields: [
                                    {
                                        controlType: "1",
                                        FieldName: "字段2",
                                        FieldValue: "test",
                                        Hidden: false,
                                        Tips: '999999999',
                                        isTitle: true,
                                        Required: true     
                                    },
                                    {
                                        controlType: "1",
                                        FieldName: "字段22",
                                        FieldValue: "test",
                                        Hidden: false,
                                        Tips: '555',
                                        isTitle: true,
                                        Required: true     
                                    },                                    
                                ]
                            },                        
                        ]
                    }
                },
                {
                    controlType: 'tableCmp',
                    comsData: {
                        tableContentData: [
                            {
                                label: "中国联通",
                                property: "company",
                                Lock: false,
                                Hidden: false,
                                SortId: 1                         
                            },
                            {
                                label: "李四",
                                property: "empName",
                                Lock: false,
                                Hidden: false,
                                SortId: 1                         
                            },
                            {
                                label: "0001",
                                property: "empNo",
                                Lock: false,
                                Hidden: false,
                                SortId: 1                         
                            },                         
                        ],
                        tableHeadData: [
                            {
                                label: "公司",
                                property: "company",
                                Lock: false,
                                Hidden: false,
                                SortId: 1                         
                            },
                            {
                                label: "员工姓名",
                                property: "empName",
                                Lock: false,
                                Hidden: false,
                                SortId: 1                         
                            },
                            {
                                label: "员工号",
                                property: "empNo",
                                Lock: false,
                                Hidden: false,
                                SortId: 1                         
                            },                         
                        ]
                    }
                },                
            ]
        },
        field: {
            controlType: "1",
            FieldName: "关键字:",
            fieldValue: "ceshi",
            Hidden: false,
            Tips: '',
            isTitle: true
        }, 
        pageModel: []      
      }
    },
    created () {
        // 将当前的 pageCode 存入到store中
        this._setPageCode(this.pageCode)
        // 获取当前页面的动态页面数据
        // this._GetPageModelData()
        this.pageModel = configData.Data

        // 接收 tab 组件中的 tabCmpClick 事件
        this.$bus.$on("tabCmpClick", (tab) => {
            debugger
            this.$message.success({
                type: 'info',
                message: `${tab.label}被点击了`
            })
        })  
    },
    beforeDestroy () {
      // 销毁
      this.$bus.$off("tabCmpClick")
    },
    methods: {
        // 将该页面的pageCode传到 全局中存储
        _setPageCode(pageCode){
            debugger
            if(pageCode){
                this.$store.dispatch('setCurrentPageCode', pageCode)
            }
        },
        whichSection(sectionObj, idx){
            // debugger
            let sectionType = sectionObj.Section || ''
            switch(sectionType){
                case "Title":  //  Title
                    return TitleCmp
                case "ShowF":  // ShowF
                    return ShowFieldsCmp
                case "Content":  // Content
                    // return  ContentCmp
                    return ContentCmpComSection
                case "UpText":   // UpText
                    return UpTextCmp
                case "UpBtn":   // UpBtn  页面中的btn区
                    return UpBtnCmp   
                case "OutBtn":   // OutBtn   content中的 outBtn区
                    return OutBtnCmp
                case "Btn":    // Btn  content中 分组组件中的 Btn区
                    return OutBtnCmp
                case "DownBtn":   // DownBtn   页面中的 DownBtn 区
                    return DownBtnCmp                     
                case "DownText":  // DownText
                    return DownTextCmp
                case "Link":     // Link
                    return LinkCmp
                case "Tail":    // Tail
                    return TailCmp
            }
        },
        _GetPageModelData(){
            this.pageLoading = true
            GetPageModelData(this.pageCode).then(res => {
                this.pageLoading = false
                if(res && res.data.State === REQ_OK){
                    this.pageModel = res.data.Data
                }else {
                    this.$message.success({
                        type: 'warning',
                        message: `${res.data.Error}`
                    })
                }
            })
        },
        backPage(){
            this.$router.go(-1)
        }        
    },
    watch: {
      obj: {
        handler (newValue, oldValue) {
          // 每当obj的值改变则发送事件update:obj , 并且把值传过去
          this.$emit('update:obj', newValue)
        },
        deep: true
      }
    }
  }
</script>


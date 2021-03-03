/**
 * Created by Administrator on 2020/7/31.
 * function : newStyle_mixin
 */

// 字段控件类型----------------------------------------------------------------------------------------------
import BaseInput from '@/base/NewStyle-cmp/Field-cmp/Base-input'
import TextareaInput from '@/base/NewStyle-cmp/Field-cmp/Textarea-input'
import NumInput from '@/base/NewStyle-cmp/Field-cmp/Num-input'
import MoneyInput from '@/base/NewStyle-cmp/Field-cmp/Money-input'
import BaseSelect from '@/base/NewStyle-cmp/Field-cmp/Base-select'
import MultipleSelect from '@/base/NewStyle-cmp/Field-cmp/Multiple-select'
import BaseDate from '@/base/NewStyle-cmp/Field-cmp/Base-date'
import RangeDate from '@/base/NewStyle-cmp/Field-cmp/Range-date'
import TimeDate from '@/base/NewStyle-cmp/Field-cmp/Time-date'
import MonthSelect from '@/base/NewStyle-cmp/Field-cmp/Month-select'
import BaseSwitch from '@/base/NewStyle-cmp/Field-cmp/Base-switch'
import BaseRadio from '@/base/NewStyle-cmp/Field-cmp/Base-radio'
import BaseCheckbox from '@/base/NewStyle-cmp/Field-cmp/Base-checkbox'
import BaseImgUpload from '@/base/NewStyle-cmp/Field-cmp/Base-img-upload'
import BaseFileUpload from '@/base/NewStyle-cmp/Field-cmp/Base-file-upload'
import BaseEmpSelect from '@/base/NewStyle-cmp/Field-cmp/Base-emp-select'
import BaseOrgSelect from '@/base/NewStyle-cmp/Field-cmp/Base-org-select'
import BaseMapSelect from '@/base/NewStyle-cmp/Field-cmp/Base-map-select'
import BaseCalculate from '@/base/NewStyle-cmp/Field-cmp/Base-calculate'
import BaseEditor from '@/base/NewStyle-cmp/Field-cmp/Base-editor'
import BaseExplain from '@/base/NewStyle-cmp/Field-cmp/Base-explain'
import BaseSwitchSelect from '@/base/NewStyle-cmp/Field-cmp/Base-switch-select'
import RangeNum from '@/base/NewStyle-cmp/Field-cmp/Range-num'
// import OrgAndEmpSelect from '@/base/NewStyle-cmp/Field-cmp/Org-and-emp-select'
import BaseProvinces from '@/base/NewStyle-cmp/Field-cmp/Base-provinces'
import BaseFieldSelect from '@/base/NewStyle-cmp/Field-cmp/Base-fieldSelect'
import BaseFieldSet from '@/base/NewStyle-cmp/Field-cmp/Base-fieldSet'
import BasePageLinkField from '@/base/NewStyle-cmp/Field-cmp/Base-pageLink'


// --------高级组件(表布局组件、 分组组件、 选项卡组件)---------
// import BaseTableSection from '@/base/NewStyle-cmp/common-cmp/HighLevel-cmp/table-section'
// import BaseFeildGroupSection from '@/base/NewStyle-cmp/common-cmp/HighLevel-cmp/fieldGroup-section'
// import BaseTabSection from '@/base/NewStyle-cmp/common-cmp/HighLevel-cmp/tab-section'

// ---------------显示组件--------
import showingText from '@/base/NewStyle-cmp/common-cmp/showingComponents-cmp/text-cmp/index'
import showingPic from '@/base/NewStyle-cmp/common-cmp/showingComponents-cmp/pic-cmp/index'
import showingIcon from '@/base/NewStyle-cmp/common-cmp/showingComponents-cmp/icon-cmp/index'
import showingLink from '@/base/NewStyle-cmp/common-cmp/showingComponents-cmp/link-cmp/index'
import showingLinkBox from '@/base/NewStyle-cmp/common-cmp/showingComponents-cmp/linkBox-cmp/index'
import showingPicAndText from '@/base/NewStyle-cmp/common-cmp/showingComponents-cmp/picAndText-cmp/index'
import showingButton from '@/base/NewStyle-cmp/common-cmp/showingComponents-cmp/button-cmp/index'

// ------------------要素组件--------
import gridElementFieldGroup from '@/base/NewStyle-cmp/common-cmp/grid-element-cmp/fieldGroup-grid-cmp/index'
import gridElementTable from '@/base/NewStyle-cmp/common-cmp/grid-element-cmp/table-grid-cmp/index'
import gridElementBarEcharts from '@/base/NewStyle-cmp/common-cmp/grid-element-cmp/barEcharts-grid-cmp/index'
import gridElementLineEcharts from '@/base/NewStyle-cmp/common-cmp/grid-element-cmp/lineEcharts-grid-cmp/index'
import gridElementPieEcharts from '@/base/NewStyle-cmp/common-cmp/grid-element-cmp/pieEcharts-grid-cmp/index'

// ----------带布局的组件-----------
import gridContainerTab from '@/base/NewStyle-cmp/common-cmp/grid-container-cmp/grid-tab-cmp/index'
import gridContainerStep from '@/base/NewStyle-cmp/common-cmp/grid-container-cmp/grid-step-cmp/index'
import gridContainerButtonSection from '@/base/NewStyle-cmp/common-cmp/grid-container-cmp/button-section-cmp/index'
import gridContainerSearchSection from '@/base/NewStyle-cmp/common-cmp/grid-container-cmp/search-section-cmp/index'
import gridContainerSearchEnumerationSection from '@/base/NewStyle-cmp/common-cmp/grid-container-cmp/search-enumeration-section-cmp/index'
import gridContainerFunctionSection from '@/base/NewStyle-cmp/common-cmp/grid-container-cmp/function-section-cmp/index'
import gridContainerLinkSection from '@/base/NewStyle-cmp/common-cmp/grid-container-cmp/link-section-cmp/index'

// -----------分栏容器组件 ------
import BaseSimpleContainer from '@/base/NewStyle-cmp/common-cmp/grid-columnContainer-cmp/simpleContainer-cmp'

// ------------------业务大组件-----------
import gridBusinessFieldGroup from '@/base/NewStyle-cmp/common-cmp/grid-business-cmp/fieldGroup-cmp/index'
import gridBusinessTable from '@/base/NewStyle-cmp/common-cmp/grid-business-cmp/table-cmp/index'
import gridBusinessEcharts from '@/base/NewStyle-cmp/common-cmp/grid-business-cmp/echarts-cmp/index'
import gridBusinessTree from '@/base/NewStyle-cmp/common-cmp/grid-business-cmp/tree-cmp/index'


export const getComponentUtils = function (controltype) {
    switch (controltype) {
        case '1':
        case 1:
            return BaseInput
        case '2':
        case 2:
            return TextareaInput
        case '3':
        case 3:
            return NumInput
        case '4':
        case 4:
            return MoneyInput
        case '5':
        case 5:
            return BaseSelect
        case '6':
        case 6:
            return MultipleSelect
        case '7':
        case 7:
            return BaseDate
        case '8':
        case 8:
            return RangeDate
        case '9':
        case 9:
            return TimeDate
        case '10':
        case 10:
            return MonthSelect
        case '11':
        case 11:
            return BaseSwitch
        case '12':
        case 12:
            return BaseRadio
        case '13':
        case 13:
            return BaseCheckbox
        case '14':
            return BaseImgUpload
        case '15':
        case 15:
            return BaseFileUpload
        case '16':
        case 16:
            return BaseCalculate
        case '17': 
        case 17: 
            // return table     // 表格                
        case '19':
        case 19:
            return BaseEmpSelect
        case '20':
        case 20:
            return BaseOrgSelect
        // case '21':
        // case 21:
        //     return OrgAndEmpSelect
        case '22':
        case 22:
            return BaseMapSelect
        case '23':
        case 23:
            return BaseEditor
        case '24':
        case 24:
            return BaseExplain
        case '25':
        case 25:
            // return 'guanlianshenpi'
        case '27':
        case 27:
            return BaseProvinces
        case '28':
        case 28:
            return BaseFieldSelect    
        case '29':
        case 29:
            return BaseFieldSet
        case '30':
        case 30:
            return BasePageLinkField                                                           
        case '31':
        case 31:
            return RangeNum
        case '32':
        case 32:
            return BaseSwitchSelect
        case 1001:
        case '1001':
            return showingText
        case 1002:
        case '1002':
            return showingPic  
        case 1003:
        case '1003':
            return showingIcon
        case 1004:
        case '1004':
            return showingLink
        case 1005:
        case '1005':
            return showingLinkBox
        case 1006:
        case '1006':
            return  showingPicAndText   
        case 1007:
        case '1007':
            return showingButton      
        case  2001:
        case '2001':
            return gridElementFieldGroup
        case 2002:
        case '2002':
            return gridElementTable 
        case 2003:
        case '2003':
            return  gridElementBarEcharts    
        case 2004:
        case '2004':
            return gridElementLineEcharts   
        case 2005:
        case '2005':
            return gridElementPieEcharts
        case 3002:
        case '3002':
            return gridContainerTab
        case 3003:
        case '3003':
            return gridContainerStep
        case 3004:
        case '3004':
            return gridContainerButtonSection
        case 3005:
        case '3005':
            return gridContainerSearchSection
        case 3006:
        case '3006':
            return gridContainerSearchEnumerationSection
        case 3007:
        case '3007':
            return gridContainerFunctionSection
        case 3008:
        case '3008':
            return gridContainerLinkSection
        case 4001:
        case '4001':
            return gridBusinessFieldGroup
        case 4002:
        case '4002':
            return gridBusinessTable
        case 4003:
        case '4003':
            return gridBusinessEcharts
        case 4004:
        case '4004':
            return gridBusinessTree
        case 5001:
        case '5001':
            return BaseSimpleContainer
        default: 
            return BaseInput
    }
}


// ------判断是否为容器组件-------
export const isContainerFn = function (isContainer) {
    switch(isContainer){
        case 0:
            return false
        case 1:
            return true
        default: 
            return false
    }
}

// ------判断是否为 分栏布局容器组件-------
export const ismultiColumnContainerFn = function (type) {
    switch(type){
        case 5001:  // 注意 列的 controleType 也是 5001
        case '5001':
            return true
        default: 
            return false
    }
}
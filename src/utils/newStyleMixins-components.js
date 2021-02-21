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
import BaseTableSection from '@/base/NewStyle-cmp/common-cmp/HighLevel-cmp/table-section'
import BaseFeildGroupSection from '@/base/NewStyle-cmp/common-cmp/HighLevel-cmp/fieldGroup-section'
import BaseTabSection from '@/base/NewStyle-cmp/common-cmp/HighLevel-cmp/tab-section'

// -----------容器组件 ------
import BaseSimpleContainer from '@/base/NewStyle-cmp/common-cmp/container-cmp/simpleContainer-cmp'

// 组件类型 mixins
export const fieldControlTypeMixin = {
    components: {
        BaseInput,  // 单行文本输入框
        TextareaInput, // 多行文本输入框
        NumInput,   // 数字输入框
        MoneyInput,  // 金额输入框
        BaseSelect,  // 单选下拉框
        MultipleSelect, // 多选下拉框
        BaseDate,  // 时间——年月日
        RangeDate, // 时间区间
        TimeDate,  // 时分
        MonthSelect, // 月份
        BaseSwitch, // switch 选择器
        BaseRadio, // 单选radio
        BaseCheckbox, //多选chekbox
        BaseImgUpload, // 图片
        BaseFileUpload, // 附件
        BaseEmpSelect,  //  人员
        BaseOrgSelect,  // 组织
        BaseMapSelect,  // 地图
        BaseCalculate, // 计算公式
        BaseEditor,  // 富文本编辑器
        BaseExplain,  // 说明
        // OrgAndEmpSelect,  // 组织和人员选择
        BaseProvinces,  //省市区,
        BaseFieldSelect, // 字段选择器
        BaseFieldSet, // 字段设置器
        BasePageLinkField, // 页面跳转字段
        RangeNum,  // 数字区间
        BaseSwitchSelect,  // 是否下拉选择
        BaseTableSection, // 表布局组件
        BaseFeildGroupSection, //分组布局组件
        BaseTabSection,  // 选项卡布局组件
        BaseSimpleContainer,  // 纯容器组件
    },    
    methods: {
        currentComponentMixin (controltype) {
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
                case 1000:
                case '1000':
                    return BaseTableSection
                case 1001:
                case '1001':
                    return BaseFeildGroupSection
                case 1002:
                case '1002':
                    return BaseTabSection                    
                case 2000:
                case '2000':
                    return BaseSimpleContainer
                default: 
                    return BaseInput
            }
        },
        // 判断是否容器
        isContainerMixin (obj) {
            let controlType = obj.controlType
            if(controlType<1000) return false
            if(controlType>=1000) return true
        },
        // 判断是否是 高级组件里面的容器
        isHighLevelCmpMixin (obj) {
            let controlType = obj.controlType
            if((controlType >=1000) && (controlType<2000)){
                return true
            }else {
                return false
            }
        },
        // 判断是否是  纯容器布局组件
        isSimpleContainerMixin (obj) {
            let controlType = obj.controlType
            if(controlType==2000){
                return true
            }else {
                return false
            }             
        }
    },
}

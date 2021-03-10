export const getGuid = function (controlType) {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
}
export const getGuid2 = function (controlType) {  
  let typeStr = controlType + '_'
  switch (controlType) {
    case '-1':
    case -1:
      typeStr = 'page_' + typeStr
      break;
    case '1':
    case 1:
      typeStr = 'TMText_' + typeStr
      break;
    case '2':
    case 2:
      typeStr = 'TMTextArea_' + typeStr
      break;
    case '3':
    case 3:
      typeStr = 'TMNum_' + typeStr
      break;
    case '4':
    case 4:
      typeStr = 'TMMoney_' + typeStr
      break;
    case '5':
    case 5:
      typeStr = 'TMSelectSingle_' + typeStr
      break;
    case '6':
    case 6:
      typeStr = 'TMSelectMulty_' + typeStr
      break;
    case '7':
    case 7:
      typeStr = 'TMYMDD_' + typeStr
      break;
    case '8':
    case 8:
      typeStr = 'TMRYMDD_' + typeStr
      break;
    case '9':
    case 9:
      typeStr = 'TMTime_' + typeStr
      break;
    case '10':
    case 10:
      typeStr = 'TMSwitch_' + typeStr
      break;
    case '11':
    case 11:
      typeStr = 'TMSwitch_' + typeStr
      break;
    case '12':
    case 12:
      typeStr = 'TMRadioSingle_' + typeStr
      break;
    case '13':
    case 13:
      typeStr = 'TMCheckBox_' + typeStr
      break;
    case '14':
      typeStr = 'TMIMG_' + typeStr
      break;
    case '15':
    case 15:
      typeStr = 'TMAttachment_' + typeStr
      break;
    case '16':
    case 16:
      typeStr = 'PersonSelect_' + typeStr
      break;
    case '17':
    case 17:
      typeStr = 'TMSheet_' + typeStr
      break;
    case '18':
    case 18:
      typeStr = 'TMRelatField_' + typeStr
      break;
    case '19':
    case 19:
      typeStr = 'PersonSelect_' + typeStr
      break;
    case '20':
    case 20:
      typeStr = 'OrgSelect_' + typeStr
      break;
      // case '21':
      // case 21:
      // typeStr = 'TMTextArea_' + typeStr
      // break;
    case '22':
    case 22:
      typeStr = 'TMMapSelect_' + typeStr
      break;
    case '23':
    case 23:
      typeStr = 'RichTextEdit_' + typeStr
      break;
    case '24':
    case 24:
      typeStr = 'Remark_' + typeStr
      break;
    case '25':
    case 25:
      typeStr = 'TMRelatSheet_' + typeStr
      break;
    case '26':
    case 26:
      typeStr = 'PositSelect_' + typeStr
      break;
    case '27':
    case 27:
      typeStr = 'TMProvinceCity_' + typeStr
      break;
    case '28':
    case 28:
      typeStr = 'ObjectSelect_' + typeStr
      break;
    case '29':
    case 29:
      typeStr = 'TMObjectSet_' + typeStr
      break;
    case '30':
    case 30:
      typeStr = 'TMPageLink_' + typeStr
      break;
    case '31':
    case 31:
      typeStr = 'TMNumArea_' + typeStr
      break;
    case '32':
    case 32:
      typeStr = 'TMSelectSwitch_' + typeStr
      break;
    case '33':
    case 33:
      typeStr = 'TMScore_' + typeStr
      break;
    case '34':
    case 34:
      typeStr = 'TMTag_' + typeStr
      break;
    case '35':
    case 35:
      typeStr = 'TMHyperlink_' + typeStr
      break;
    case '36':
    case 36:
      typeStr = 'AutoGerCode_' + typeStr
      break;
    case '37':
    case 37:
      typeStr = 'TMScrollBar_' + typeStr
      break;
    case '38':
    case 38:
      typeStr = 'TMRatingScale_' + typeStr
      break;
    case '39':
    case 39:
      typeStr = 'TMScoreSingle_' + typeStr
      break;
    case '40':
    case 40:
      typeStr = 'TMScoreMulty_' + typeStr
      break;
    case '41':
    case 41:
      typeStr = 'TMCaculate_' + typeStr
      break;
    case '42':
    case 42:
      typeStr = 'TMColor_' + typeStr
      break;
    case 1001:
    case '1001':
      typeStr = 'showText_' + typeStr
      break;
    case 1002:
    case '1002':
      typeStr = 'showPic_' + typeStr
      break;
    case 1003:
    case '1003':
      typeStr = 'showIcon_' + typeStr
      break;
    case 1004:
    case '1004':
      typeStr = 'showLink_' + typeStr
      break;
    case 1005:
    case '1005':
      typeStr = 'showLinkBox_' + typeStr
      break;
    case 1006:
    case '1006':
      typeStr = 'showPicText_' + typeStr
      break;
    case 1007:
    case '1007':
      typeStr = 'showBtn_' + typeStr
      break;
    case 2001:
    case '2001':
      typeStr = 'eleFieldGroup_' + typeStr
      break;
    case 2002:
    case '2002':
      typeStr = 'eleTable_' + typeStr
      break;
    case 2003:
    case '2003':
      typeStr = 'eleBarEchart_' + typeStr
      break;
    case 2004:
    case '2004':
      typeStr = 'eleLineEchart_' + typeStr
      break;
    case 2005:
    case '2005':
      typeStr = 'elePieEchart_' + typeStr
      break;
    case 3002:
    case '3002':
      typeStr = 'gridTab_' + typeStr
      break;
    case 3003:
    case '3003':
      typeStr = 'gridStep_' + typeStr
      break;
    case 3004:
    case '3004':
      typeStr = 'gridBtn_' + typeStr
      break;
    case 3005:
    case '3005':
      typeStr = 'gridSearch_' + typeStr
      break;
    case 3006:
    case '3006':
      typeStr = 'gridListSearch_' + typeStr
      break;
    case 3007:
    case '3007':
      typeStr = 'gridFunction_' + typeStr
      break;
    case 3008:
    case '3008':
      typeStr = 'gridLink_' + typeStr
      break;
    case 4001:
    case '4001':
      typeStr = 'businessFieldGroup_' + typeStr
      break;
    case 4002:
    case '4002':
      typeStr = 'businessTable_' + typeStr
      break;
    case 4003:
    case '4003':
      typeStr = 'businessEcharts_' + typeStr
      break;
    case 4004:
    case '4004':
      typeStr = 'businessTree_'+ typeStr
      break;
    case 5001:
    case '5001':
      typeStr = 'columnContainer_'+ typeStr
      break;
    default:
      typeStr = 'atris_'+ typeStr
      break;
  }  
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return typeStr + S4() + S4()
}

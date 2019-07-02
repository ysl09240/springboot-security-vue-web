
var validate={};
/* 是否是公司邮箱*/
export function isWscnEmail(str) {
  const reg = /^[a-z0-9](?:[-_.+]?[a-z0-9]+)*@sykean\.com$/i;
  return reg.test(str.trim());
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return urlregex.test(textval);
}

// 验证是否整数
export function isInteger(rule, value, callback) {
  if (!value) {
    return callback(new Error('输入不可以为空'));
  }
  setTimeout(() => {
    if (!Number(value)) {
      callback(new Error('请输入正整数'));
    } else {
      const re = /^[0-9]*[1-9][0-9]*$/;
      const rsCheck = re.test(value);
      if (!rsCheck) {
        callback(new Error('请输入正整数'));
      } else {
        callback();
      }
    }
  }, 1000);
}
//验证是否ip
export function isIp(rule, value, callback) {
   if (!value) {
       return callback(new Error('IP不可以为空'));
   }
   const re =/^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/;
   const rsCheck = re.test(value);
      if (!rsCheck) {
        callback(new Error('格式不正确格式如：192.168.1.1'));
      } else {
        callback();
      }
}

//验证是否子网掩码
export function isMask(rule, value, callback) {
  if (!value){
      return callback(new Error('子网掩码不可以为空'));
  }
  const re =/^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/;
  const rsCheck = re.test(value);
     if (!rsCheck) {
       callback(new Error('格式不正确格式如：255.255.255.0'));
     } else {
       callback();
     }
}
//验证是否网关
export function isGateway(rule, value, callback) {
  if (!value){
      return callback(new Error('网关不可以为空'));
  }
  const re =/^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/;
  const rsCheck = re.test(value);
     if (!rsCheck) {
       callback(new Error('格式不正确格式如：192.168.1.1'));
     } else {
       callback();
     }
}




// 验证是否是[0-1]的小数
export function isDecimal(rule, value, callback) {
  if (!value) {
    return callback(new Error('输入不可以为空'));
  }
  setTimeout(() => {
    if (!Number(value)) {
      callback(new Error('请输入数字'));
    } else {
      if (value < 0 || value > 1) {
        callback(new Error('请输入[0,1]之间的数字'));
      } else {
        callback();
      }
    }
  }, 1000);
}

// 验证端口是否在[0,65535]之间
export function isPort(rule, value, callback) {
  if (!value) {
    return callback(new Error('输入不可以为空'));
  }
  setTimeout(() => {
    if (value == '' || typeof (value) == undefined) {
      callback(new Error('请输入端口值'));
    } else {
      const re = /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
      const rsCheck = re.test(value);
      if (!rsCheck) {
        callback(new Error('请输入在[0-65535]之间的端口值'));
      } else {
        callback();
      }
    }
  }, 1000);
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/;
  return reg.test(str);
}


export function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
export function get_uuid() {
  return (S4() +""+ S4() + "" + S4() + "" + S4() + "" + S4() + "" + S4() +  "" + S4() + "" +  S4());
}
export function isIdCard (idCard){
  // 1 "验证通过!", 0 //校验不通过
  var format = /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/;
  //号码规则校验
  if(!format.test(idCard)){
     return false;
  }
  //区位码校验
  //出生年月日校验   前正则限制起始年份为1900;
  var year = idCard.substr(6,4),//身份证年
      month = idCard.substr(10,2),//身份证月
      date = idCard.substr(12,2),//身份证日
      time = Date.parse(month+'-'+date+'-'+year),//身份证日期时间戳date
      now_time = Date.parse(new Date()),//当前时间戳
      dates = (new Date(year,month,0)).getDate();//身份证当月天数
  if(time>now_time||date>dates){
    return false;
  }
  //校验码判断
  var c = new Array(7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2);   //系数
  var b = new Array('1','0','X','9','8','7','6','5','4','3','2');  //校验码对照表
  var id_array = idCard.split("");
  var sum = 0;
  for(var k=0;k<17;k++){
      sum+=parseInt(id_array[k])*parseInt(c[k]);
  }
  if(id_array[17].toUpperCase() != b[sum%11].toUpperCase()){
    return false;
  }
    return true;
}

export function isBankNumber(bankNumber){
  if (bankNumber.length < 16 || bankNumber.length > 19) {
    //$("#bankNumber")("银行卡号长度必须在16到19之间");
    return false;
    }
    var num = /^\d*$/; //全数字
    if (!num.exec(bankNumber)) {
    //$("#bankNumber").html("银行卡号必须全为数字");
    return false;
    }
    //开头6位
    var strBin="01,10,18,30,35,36,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,63,64,65,66,68,69,84,87,88,90,91,94,95,96,98,99";

    if (strBin.indexOf(bankNumber.substring(0, 2))== -1) {
    //$("#bankNumber")("银行卡号开头6位不符合规范");
    return false;
    }
    var lastNum=bankNumber.substr(bankNumber.length-1,1);//取出最后一位（与luhm进行比较）
    var first15Num=bankNumber.substr(0,bankNumber.length-1);//前15或18位
    var newArr=new Array();
    for(var i=first15Num.length-1;i>-1;i--){ //前15或18位倒序存进数组
    newArr.push(first15Num.substr(i,1));
    }
    var arrJiShu=new Array(); //奇数位*2的积 <9
    var arrJiShu2=new Array(); //奇数位*2的积 >9
    var arrOuShu=new Array(); //偶数位数组
    for(var j=0;j<newArr.length;j++){
    if((j+1)%2==1){//奇数位
    if(parseInt(newArr[j])*2<9)
    arrJiShu.push(parseInt(newArr[j])*2);
    else
    arrJiShu2.push(parseInt(newArr[j])*2);
    }
    else //偶数位
    arrOuShu.push(newArr[j]);
    }
    var jishu_child1=new Array();//奇数位*2 >9 的分割之后的数组个位数
    var jishu_child2=new Array();//奇数位*2 >9 的分割之后的数组十位数
    for(var h=0;h<arrJiShu2.length;h++){
    jishu_child1.push(parseInt(arrJiShu2[h])%10);
    jishu_child2.push(parseInt(arrJiShu2[h])/10);
    }
    var sumJiShu=0; //奇数位*2 < 9 的数组之和
    var sumOuShu=0; //偶数位数组之和
    var sumJiShuChild1=0; //奇数位*2 >9 的分割之后的数组个位数之和
    var sumJiShuChild2=0; //奇数位*2 >9 的分割之后的数组十位数之和
    var sumTotal=0;
    for(var m=0;m<arrJiShu.length;m++){
    sumJiShu=sumJiShu+parseInt(arrJiShu[m]);
    }
    for(var n=0;n<arrOuShu.length;n++){
    sumOuShu=sumOuShu+parseInt(arrOuShu[n]);
    }
    for(var p=0;p<jishu_child1.length;p++){
    sumJiShuChild1=sumJiShuChild1+parseInt(jishu_child1[p]);
    sumJiShuChild2=sumJiShuChild2+parseInt(jishu_child2[p]);
    }
    //计算总和
    sumTotal=parseInt(sumJiShu)+parseInt(sumOuShu)+parseInt(sumJiShuChild1)+parseInt(sumJiShuChild2);
    //计算Luhm值
    var k= parseInt(sumTotal)%10==0?10:parseInt(sumTotal)%10;
    var luhm= 10-k;
    if(lastNum==luhm){
    //$("#banknoInfo").html("Luhm验证通过");
    console.log("Luhm验证通过");
    return true;
    }
    else{
    //$("#banknoInfo").html("银行卡号必须符合Luhm校验");
    console.log("银行卡号必须符合Luhm校验");
    return false;
    }
}

function businessLicense15(ints){
  let ti = 0;  
  let si = 0;// pi|11+ti  
  let cj = 0;// （si||10==0？10：si||10）*2  
  let pj = 10;// pj=cj|11==0?10:cj|11  
  let lastNum = '';
  for (let i=0;i<ints.length;i++) {  
      ti = parseInt(ints[i]);  
      si = pj + ti; 
      cj = (0 == si % 10 ? 10 : si % 10) * 2; 
      pj = cj % 11;  
       
      if (i == ints.length-1) {  
          //lastNum =(1 - pj < 0 ? 11 - pj : 1 - pj) % 10;  
          lastNum = si%10
      }  
  }  
 
  if(lastNum==1){
      return true;
  }else{
      return false
  }
    
}
export function businessLicense(value){
    
  if(value.length==15){
      return businessLicense15(value);
  }else{
     
      var reg = /^([159Y]{1})([1239]{1})([0-9ABCDEFGHJKLMNPQRTUWXY]{6})([0-9ABCDEFGHJKLMNPQRTUWXY]{9})([0-9ABCDEFGHJKLMNPQRTUWXY])$/;
      if(!reg.test(value)){  
          console.log(334234);
          return false;  
      }  
      var str = '0123456789ABCDEFGHJKLMNPQRTUWXY';  
      var ws =[1,3,9,27,19,26,16,17,20,29,25,13,8,24,10,30,28];  
      var codes  = new Array();  
      codes[0] = value.substr(0,value.length-1);  
      codes[1] = value.substr(value.length-1,value.length);  
      var sum = 0;  
      for(var i=0;i<17;i++){  
          sum += str.indexOf(codes[0].charAt(i)) * ws[i];  
      }  
      var c18 = 31 - (sum % 31);  
    
      if(c18 == 31){  
          
          c18 = 'Y';  
      }else if(c18 == 30){  
        
          c18 = '0';  
      }  
      if(str.charAt(c18) != codes[1].charAt(0)){  
        
          return false;  
      }
      
      return true;
  }
}

export function orgcodevalidate(value){
  if(value!=""){
     var values=value.split("-");
  var ws = [3, 7, 9, 10, 5, 8, 4, 2];  
  var str = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';  
  var reg = /^([0-9A-Z]){8}$/;   
  if (!reg.test(values[0])) {  
    return true;
  }  
  var sum = 0;  
  for (var i = 0; i < 8; i++) {  
    sum += str.indexOf(values[0].charAt(i)) * ws[i];  
  }  
  var C9 = 11 - (sum % 11);
  var YC9=values[1]+'';
  if (C9 == 11) {  
    C9 = '0';  
  } else if (C9 == 10) {  
    C9 = 'X'  ;
  } else {  
    C9 = C9+'';  
  } 
  return YC9!=C9;
  }
}


/**
 * 手机号码11位
 * @param  str 
 */
export function isPoneAvailable(str) {
  var myreg=/^[1][3,4,5,6,7,8,9][0-9]{9}$/;
  if (!myreg.test(str)) {
      return false;
  } else {
      return true;
  }
}

export function iszuoji(str){
  var myreg=/^[1][3,4,5,6,7,8,9][0-9]{9}$/;
  if (!myreg.test(str)) {
      return false;
  } else {
      return true;
  }
}

export function nationValidate(value){
  var nations = ['汉族', '蒙古族', '回族', '藏族', '维吾尔族', '苗族', '彝族', '壮族', '布依族', '朝鲜族', '满族', '侗族', '瑶族',
   '白族', '土家族', '哈尼族', '哈萨克族', '傣族', '黎族', '傈僳族', '佤族', '畲族', '高山族', '拉祜族', '水族', '东乡族', '纳西族', 
   '景颇族', '柯尔克孜族', '土族', '达斡尔族', '仫佬族', '羌族', '布朗族', '撒拉族', '毛难族', '仡佬族', '锡伯族', '阿昌族', 
   '普米族', '塔吉克族', '怒族', '乌孜别克族', '俄罗斯族', '鄂温克族', '崩龙族', '保安族', '裕固族', '京族', '塔塔尔族', 
   '独龙族', '鄂伦春族', '赫哲族', '门巴族', '珞巴族', '基诺族', '其他'];
  if(nations.indexOf&&typeof(nations.indexOf)=='function'){
    var index = nations.indexOf(value);
    if(index >= 0){
      return true;
    }else{
      return false;
    }
  }else{
    return true;
  }
}

validate.businessLicense = businessLicense;
validate.businessLicense15 = businessLicense15;
validate.orgcodevalidate = orgcodevalidate;
export default validate
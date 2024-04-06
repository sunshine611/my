# Dart 函数

## 声明函数

- 直接声明: Dart 中声明函数不需要 function 关键字
- 箭头函数:
  - Dart 中的箭头函数中,**函数体只能写一行且不能带有结束的分号**
  - Dart 中的箭头函数,只是函数的一种简写形式
- 匿名函数
- 立即执行函数

```dart
void main(){
    printInfo();    // result:Hello,World!
    print(getNumber());  // result:1
    List fruits = ['苹果','香蕉','猕猴桃'];
    fruits.forEach(myPrint);    // result:苹果 香蕉 猕猴桃

    // 箭头函数
    fruits.forEach((ele)=>{
        print(ele),     // result:苹果 香蕉 猕猴桃,箭头函数中,不能写结束的分号(;)
        print(ele)      // result:苹果 香蕉 猕猴桃
    });
    // 箭头函数去掉大括号写法({})
    fruits.forEach((ele) => print(ele));    // result:苹果 香蕉 猕猴桃

    // 立即执行函数,写在main入口里面,运行后立即执行函数
    ((int n){
        print(n);
    })(18);
}

// Dart 中声明函数,不需要 function 关键字
void printInfo(){
    print('Hello,World!');
}

// 返回值,必须要和函数声明的类型一致
int getNumber(){
    // return 'Hello';  // 不能返回字符串类型,因为设定的是int类型
    return 1;
}

// 匿名函数
var myPrint = (value) {
    print(value);
};


```

## 函数参数

- 必填参数: 参数类型 参数名称
- 可选参数:
  - 放在必选参数后面
  - 通过 **中括号** 包裹起来
  - 带默认值的可选参数,参数顺序必须一致
- 命名可选参数
  - 用 **大括号** 包裹起来
  - 调用函数时,命名参数的名称与声明函数中的名称保持一致,参数顺序可以不一致
- 函数参数

```dart
void main(){
    // 必填参数
    String res1 = userInfo('张三');
    print(res1); // result:您好:张三

    // 可选参数,参数顺序必须一致
    String res2 = userInfoDetail('李四');
    print(res2); // result:你好:你好:李四,年龄null岁,性别男,因为age没有默认值,所以为null
    res2 = userInfoDetail('李四',18);
    print(res2); // result:你好:李四,年龄18岁,性别男

    // 命名可选参数,参数顺序可以不一致
    String res3 = userInfoName('王五',sex:'女',age:28);
    print(res3);

    // 函数参数,将匿名函数 myPrint 作为参数传递到forEach里面
    List fruits = ['苹果','香蕉','猕猴桃'];
    fruits.forEach(myPrint);    // result:苹果 香蕉 猕猴桃
}

// 必填参数
String userInfo(String name){
    return '您好:$name';
}

// 可选参数
String userInfoDetail(String name,[int? age,String sex='男']){
    return '你好:$name,年龄$age岁,性别$sex';
}

// 命名可选参数,age设定了默认值18
String userInfoName(String name,{int age=18,String sex='男'}){
    return '你好:$name,年龄$age岁,性别$sex';
}

// 函数参数,匿名函数作为参数传递
var myPrint = (value) {
    print(value);
};
```

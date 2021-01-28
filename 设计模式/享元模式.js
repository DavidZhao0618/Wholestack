// var Model = function (sex, underwear) {
//     this.sex = sex;
//     this.underwear = underwear;
// };
// Model.prototype.takePhoto = function () {
//     console.log('sex= ' + this.sex + ' underwear=' + this.underwear);
// };
// for (var i = 1; i <= 50; i++) {
//     var maleModel = new Model('male', 'underwear' + i);
//     maleModel.takePhoto();
// };
// for (var j = 1; j <= 50; j++) {
//     var femaleModel = new Model('female', 'underwear' + j);
//     femaleModel.takePhoto();
// };

/*只需要区别男⼥模特
那我们先把 underwear 参数从构造函数中 移除，构造函数只接收 sex 参数*/
var Model = function (sex) {
    this.sex = sex;
};
Model.prototype.takePhoto = function () {
    console.log('sex= ' + this.sex + ' underwear=' + this.underwear);
};
/*分别创建⼀个男模特对象和⼀个⼥模特对象*/
var maleModel = new Model('male'),
    femaleModel = new Model('female');
/*给男模特依次穿上所有的男装，并进⾏拍照*/
for (var i = 1; i <= 50; i++) {
    maleModel.underwear = 'underwear' + i;
    maleModel.takePhoto();
};
/*给⼥模特依次穿上所有的⼥装，并进⾏拍照*/
for (var j = 1; j <= 50; j++) {
    femaleModel.underwear = 'underwear' + j;
    femaleModel.takePhoto();
};
//只需要两个对象便完成了同样的功能